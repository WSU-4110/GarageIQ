"""Import .md/.txt guides into the data/guides hierarchy with provenance front matter."""
from pathlib import Path
from typing import Optional

import yaml

from app.knowledge.hierarchy import ensure_scope, slug
from app.knowledge.loader import split_front_matter


def import_guide(
    path: Path,
    guides_root: Path,
    source: str,
    license: str,
    title: Optional[str] = None,
    tags: Optional[list[str]] = None,
    make: str = "",
    model: str = "",
    year_from: Optional[int] = None,
    year_to: Optional[int] = None,
    generation: str = "",
    trims: Optional[list[str]] = None,
    verified: bool = False,
) -> Path:
    if not source:
        raise ValueError("A source (URL or citation) is required for every guide")
    existing, body = split_front_matter(path.read_text(encoding="utf-8"))
    meta = {
        "title": title or existing.get("title") or path.stem.replace("-", " ").title(),
        "source": source,
        "license": license,
        "verified": verified,
        "tags": tags or existing.get("tags", []),
    }
    folder = ensure_scope(guides_root, make, model, year_from, year_to, generation, trims)
    target = folder / f"{slug(path.stem)}.md"
    front = yaml.safe_dump(meta, sort_keys=False, allow_unicode=True)
    target.write_text(f"---\n{front}---\n{body.lstrip()}", encoding="utf-8")
    return target
