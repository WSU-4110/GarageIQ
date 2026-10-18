import shutil

import pytest
from fastapi.testclient import TestClient

from app.core.config import get_settings
from app.domain.models import VehicleCreate
from app.ingest.datasets import import_dataset
from app.ingest.guides import import_guide
from app.knowledge.loader import load_knowledge, load_mods
from app.main import app
from app.rag.embeddings import HashingEmbedder
from app.rag.retriever import Retriever


def _advice(c, vehicle, question):
    vid = c.post("/vehicles", json={**vehicle, "mileage": 1}).json()["id"]
    return c.post(f"/vehicles/{vid}/advice", json={"question": question}).json()


def test_specific_mods_and_graph_expansion():
    with TestClient(app) as c:
        body = _advice(c, {"year": 2018, "make": "Subaru", "model": "WRX"}, "better handling in corners lowering")
        assert body["grounded"]
        coil = next(r for r in body["recommendations"] if r["mod"]["id"] == "wrx-va-coilovers")
        assert coil["scope"] == "vehicle"
        assert [m["id"] for m in coil["required_mods"]] == ["performance-alignment"]


def test_query_ranks_matching_mod_first_and_hides_noise():
    with TestClient(app) as c:
        body = _advice(c, {"year": 2018, "make": "Subaru", "model": "WRX"}, "coilovers")
        assert [r["mod"]["id"] for r in body["recommendations"]] == ["wrx-va-coilovers"]


def test_installed_mods_are_flagged():
    with TestClient(app) as c:
        r = c.post(
            "/advice",
            json={
                "vehicle": {"year": 2018, "make": "Subaru", "model": "WRX", "mileage": 1},
                "question": "more power",
                "installed_mods": ["Stage 1 tune", "Perrin cold air intake"],
            },
        ).json()
        assert {"wrx-va-ecu-tune", "wrx-va-cold-air-intake"} <= set(r["installed_ids"])
        assert "wrx-va-catback-exhaust" not in r["installed_ids"]


def test_universal_defaults_apply_to_unknown_vehicle():
    with TestClient(app) as c:
        body = _advice(c, {"year": 1990, "make": "Lada", "model": "Niva"}, "brakes stopping fade")
        assert body["grounded"]
        assert all(r["scope"] == "universal" for r in body["recommendations"])


def test_wrong_generation_gets_no_specific_mods():
    s = get_settings()
    r = Retriever(load_knowledge(s.knowledge_dir, s.guides_dir), HashingEmbedder())
    old = VehicleCreate(year=2005, make="Subaru", model="WRX", mileage=1)
    assert all(m.universal for m, _ in r.search(old, "power", top_k=20))


def test_trim_level_folder_restricts_fitment():
    mods = {m.id: m for m in load_mods(get_settings().knowledge_dir)}
    base = VehicleCreate(year=2018, make="Honda", model="Civic", mileage=1)
    assert mods["civic-10-coilovers"].fits(base)
    assert not mods["civic-10-turbo-ecu-tune"].fits(base)
    assert mods["civic-10-turbo-ecu-tune"].fits(base.model_copy(update={"trim": "Si"}))


def test_guides_are_retrieved_with_scope():
    with TestClient(app) as c:
        body = _advice(c, {"year": 2018, "make": "Subaru", "model": "WRX"}, "turbo reliability knock")
        ids = [g["guide"]["id"] for g in body["guidance"]]
        assert any(i.startswith("subaru/wrx/va-2015-2021/turbo-reliability") for i in ids)


@pytest.fixture
def tmp_roots(tmp_path):
    mods, guides = tmp_path / "mods", tmp_path / "guides"
    shutil.copytree(get_settings().knowledge_dir, mods)
    shutil.copytree(get_settings().guides_dir, guides)
    return mods, guides


def test_dataset_import_creates_hierarchy(tmp_roots, tmp_path):
    mods, guides = tmp_roots
    csv_file = tmp_path / "parts.csv"
    csv_file.write_text(
        "name,category,summary,make,models,year_from,year_to,generation,tags,source,license\n"
        "Big Brake Kit,brakes,Larger rotors,Toyota,GR86,2022,2025,zn8,brakes|track,https://example.com,CC0\n"
        "Wiper Blades,maintenance,Clear view,,,,,,visibility,https://example.com,CC0\n",
        encoding="utf-8",
    )
    written = import_dataset(csv_file, mods)
    assert set(written) == {"toyota\\gr86\\zn8", "_universal"} or set(written) == {"toyota/gr86/zn8", "_universal"}
    assert (mods / "toyota" / "gr86" / "zn8" / "_platform.yaml").exists()
    found = {m.id: m for m in load_knowledge(mods, guides).mods}
    gr = found["big-brake-kit-toyota-gr86-zn8"]
    assert gr.fits(VehicleCreate(year=2023, make="Toyota", model="GR86", mileage=1))
    assert not gr.fits(VehicleCreate(year=2020, make="Toyota", model="GR86", mileage=1))
    assert found["wiper-blades"].universal


def test_dataset_import_requires_source(tmp_roots, tmp_path):
    mods, _ = tmp_roots
    bad = tmp_path / "bad.csv"
    bad.write_text("name,category,summary\nX,y,z\n", encoding="utf-8")
    with pytest.raises(ValueError, match="row 1"):
        import_dataset(bad, mods)


def test_guide_import_and_chunking(tmp_roots, tmp_path):
    mods, guides = tmp_roots
    doc = tmp_path / "gr86-tips.md"
    doc.write_text("# Intro\n\nBreak in the engine gently.\n\n# Oil\n\nUse the specified grade.\n", encoding="utf-8")
    import_guide(doc, guides, "https://example.com/tips", "CC-BY-4.0", make="Toyota", model="GR86",
                 year_from=2022, year_to=2025, generation="zn8")
    chunks = [g for g in load_knowledge(mods, guides).guides if g.id.startswith("toyota/gr86/zn8/")]
    assert len(chunks) == 2 and chunks[0].source == "https://example.com/tips"
    with pytest.raises(ValueError, match="source"):
        import_guide(doc, guides, "", "CC0")
