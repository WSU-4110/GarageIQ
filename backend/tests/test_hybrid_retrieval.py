
from app.core.config import get_settings
from app.domain.models import VehicleCreate
from app.knowledge.loader import load_knowledge
from app.rag.embeddings import HashingEmbedder
from app.rag.retriever import Retriever


def make_retriever():
    s = get_settings()
    knowledge = load_knowledge(
        s.knowledge_dir,
        s.guides_dir,
    )
    return Retriever(knowledge, HashingEmbedder())


def test_alias_indexing():
    r = make_retriever()

    mod = r.by_id["wrx-va-cold-air-intake"]

    assert "CAI" in mod.search_text()


def test_exact_alias_retrieval():
    r = make_retriever()

    vehicle = VehicleCreate(
        year=2018,
        make="Subaru",
        model="WRX",
        mileage=50000,
    )

    results = r.search(vehicle, "CAI")

    assert results
    assert results[0][0].id == "wrx-va-cold-air-intake"


def test_wrong_generation_excluded():
    r = make_retriever()

    vehicle = VehicleCreate(
        year=2005,
        make="Subaru",
        model="WRX",
        mileage=100000,
    )

    results = r.search(vehicle, "cold air intake")

    assert all(mod.universal for mod, _ in results)


def test_retrieval_respects_top_k():
    r = make_retriever()

    vehicle = VehicleCreate(
        year=2018,
        make="Subaru",
        model="WRX",
        mileage=50000,
    )

    results = r.search(vehicle, "better handling", top_k=2)

    assert len(results) <= 2
