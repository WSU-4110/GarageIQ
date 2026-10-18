"""Import tabular parts datasets (CSV/JSON) into the data/mods hierarchy.

Columns (all optional except name, category, summary, source):
  id, name, category, summary, advice, make, models, year_from, year_to, generation,
  trims, requires, recommended_with, conflicts_with, tags, source, license
List columns use '|' as the separator. Rows with no `make` become universal.
`models` takes one model per row (the folder hierarchy is one model deep).
"""
import csv
import json
from collections import defaultdict
from pathlib import Path

import yaml

from app.domain.models import Mod
from app.knowledge.hierarchy import ensure_scope, slug

LIST_FIELDS = ("trims", "requires", "recommended_with", "conflicts_with", "tags")
MOD_FIELDS = (
    "id", "name", "category", "summary", "advice",
    "requires", "recommended_with", "conflicts_with", "tags", "source", "license",
)


def _read_rows(path: Path) -> list[dict]:
    if path.suffix.lower() == ".json":
        return json.loads(path.read_text(encoding="utf-8"))
    with path.open(newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def _clean(row: dict) -> dict:
    out = {}
    for k, v in row.items():
        if isinstance(v, str):
            v = v.strip()
        if v in ("", None):
            continue
        if k in LIST_FIELDS and isinstance(v, str):
            v = [p.strip() for p in v.split("|") if p.strip()]
        out[k] = v
    return out


def import_dataset(path: Path, mods_root: Path, verified: bool = False) -> dict[str, int]:
    """Validate every row, then write YAML files into the matching hierarchy folders."""
    grouped: dict[Path, list[dict]] = defaultdict(list)
    for n, raw in enumerate(_read_rows(path), start=1):
        row = _clean(raw)
        try:
            make, model = row.get("make", ""), row.get("models", "")
            if isinstance(model, list):
                model = model[0]
            year_from = int(row["year_from"]) if row.get("year_from") else None
            year_to = int(row["year_to"]) if row.get("year_to") else None
            record = {k: row[k] for k in MOD_FIELDS if k in row}
            record.setdefault(
                "id",
                "-".join(filter(None, [slug(row.get("name", "")), slug(make), slug(model),
                                       slug(str(row.get("generation", year_from or "")))])),
            )
            record["verified"] = verified
            Mod.model_validate({**record, "universal": True})
        except Exception as e:
            raise ValueError(f"{path.name} row {n}: {e}") from e
        folder = ensure_scope(
            mods_root, make, model, year_from, year_to,
            str(row.get("generation", "")), row.get("trims"),
        )
        grouped[folder].append(record)
    for folder, records in grouped.items():
        target = folder / f"imported-{slug(path.stem)}.yaml"
        target.write_text(yaml.safe_dump(records, sort_keys=False, allow_unicode=True), encoding="utf-8")
    return {str(f.relative_to(mods_root)): len(r) for f, r in grouped.items()}
