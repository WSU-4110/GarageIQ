"""Folder layout is the source of truth for fitment.

    <root>/_universal/...                        applies to every vehicle
    <root>/<make>/_platform.yaml                 {make: Subaru}
    <root>/<make>/<model>/_platform.yaml         {models: [WRX]}
    <root>/<make>/<model>/<gen>/_platform.yaml   {year_from: 2015, year_to: 2021}
    <root>/<make>/<model>/<gen>/<trim>/...       {trims: [Si, Type R]}

Each level's `_platform.yaml` is merged over its parent's, so a file only
inherits what the folders above it declare.
"""
import re
from pathlib import Path
from typing import Optional

import yaml

from app.domain.models import Fitment

PLATFORM_FILE = "_platform.yaml"
UNIVERSAL_DIR = "_universal"


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def resolve_scope(root: Path, path: Path) -> Optional[Fitment]:
    """Return the Fitment implied by `path`'s folders, or None if it is universal."""
    rel = path.resolve().relative_to(root.resolve()).parent
    if rel.parts[:1] == (UNIVERSAL_DIR,):
        return None
    merged: dict = {}
    current = root
    for part in ("", *rel.parts):
        current = current / part if part else current
        platform = current / PLATFORM_FILE
        if platform.exists():
            merged.update(yaml.safe_load(platform.read_text(encoding="utf-8")) or {})
    if "make" not in merged:
        raise ValueError(
            f"{path} is not under '{UNIVERSAL_DIR}' and no parent {PLATFORM_FILE} declares a make"
        )
    return Fitment.model_validate(merged)


def ensure_scope(
    root: Path,
    make: str = "",
    model: str = "",
    year_from: Optional[int] = None,
    year_to: Optional[int] = None,
    generation: str = "",
    trims: Optional[list[str]] = None,
) -> Path:
    """Create the folder chain (and missing _platform.yaml files) for a scope; return its dir."""
    if not make:
        path = root / UNIVERSAL_DIR
        path.mkdir(parents=True, exist_ok=True)
        return path
    levels: list[tuple[str, dict]] = [(slug(make), {"make": make})]
    if model:
        levels.append((slug(model), {"models": [model]}))
        if year_from or year_to or generation:
            label = generation or f"{year_from or 'any'}-{year_to or 'any'}"
            fields = {}
            if year_from:
                fields["year_from"] = year_from
            if year_to:
                fields["year_to"] = year_to
            levels.append((slug(label), fields))
            if trims:
                levels.append((f"trim-{slug('-'.join(trims))}", {"trims": trims}))
    path = root
    for name, fields in levels:
        path = path / name
        path.mkdir(parents=True, exist_ok=True)
        platform = path / PLATFORM_FILE
        if not platform.exists():
            platform.write_text(yaml.safe_dump(fields, sort_keys=False), encoding="utf-8")
    return path
