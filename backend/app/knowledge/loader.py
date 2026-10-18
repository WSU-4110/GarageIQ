import re
from dataclasses import dataclass
from pathlib import Path

import yaml

from app.domain.models import GuideChunk, Mod
from app.knowledge.hierarchy import PLATFORM_FILE, resolve_scope

FRONT_MATTER = re.compile(r"\A---\s*\n(.*?)\n---\s*\n(.*)\Z", re.DOTALL)
HEADING = re.compile(r"^#{1,3}\s+(.*)$", re.MULTILINE)
MAX_CHUNK_CHARS = 900


@dataclass
class Knowledge:
    mods: list[Mod]
    guides: list[GuideChunk]


def _scope_fields(root: Path, path: Path) -> dict:
    scope = resolve_scope(root, path)
    return {"universal": True} if scope is None else {"fitments": [scope]}


def load_mods(root: Path) -> list[Mod]:
    mods: list[Mod] = []
    for path in sorted(root.rglob("*.yaml")):
        if path.name == PLATFORM_FILE:
            continue
        scope = _scope_fields(root, path)
        for raw in yaml.safe_load(path.read_text(encoding="utf-8")) or []:
            try:
                mods.append(Mod.model_validate({**scope, **raw}))
            except Exception as e:
                raise ValueError(f"{path}: {raw.get('id', '?')}: {e}") from e
    ids = [m.id for m in mods]
    dupes = {i for i in ids if ids.count(i) > 1}
    if dupes:
        raise ValueError(f"Duplicate mod ids: {sorted(dupes)}")
    known = set(ids)
    for m in mods:
        for ref in (*m.requires, *m.recommended_with, *m.conflicts_with):
            if ref not in known:
                raise ValueError(f"Mod {m.id} references unknown mod {ref}")
    return mods


def split_front_matter(text: str) -> tuple[dict, str]:
    m = FRONT_MATTER.match(text)
    if not m:
        return {}, text
    return yaml.safe_load(m.group(1)) or {}, m.group(2)


def chunk_markdown(body: str, max_chars: int = MAX_CHUNK_CHARS) -> list[tuple[str, str]]:
    """Split by headings, then pack paragraphs up to max_chars. Returns (heading, text)."""
    parts = HEADING.split(body)
    sections = [("", parts[0])] + [(parts[i], parts[i + 1]) for i in range(1, len(parts) - 1, 2)]
    chunks: list[tuple[str, str]] = []
    for heading, text in sections:
        current = ""
        for para in (p.strip() for p in re.split(r"\n\s*\n", text)):
            if not para:
                continue
            if current and len(current) + len(para) > max_chars:
                chunks.append((heading, current))
                current = ""
            current = f"{current}\n\n{para}".strip()
        if current:
            chunks.append((heading, current))
    return chunks


def load_guides(root: Path) -> list[GuideChunk]:
    out: list[GuideChunk] = []
    if not root.exists():
        return out
    for path in sorted(root.rglob("*.md")):
        meta, body = split_front_matter(path.read_text(encoding="utf-8"))
        scope = _scope_fields(root, path)
        base_id = path.relative_to(root).with_suffix("").as_posix()
        title = meta.get("title") or path.stem.replace("-", " ").title()
        for n, (heading, text) in enumerate(chunk_markdown(body)):
            try:
                out.append(
                    GuideChunk.model_validate(
                        {
                            **scope,
                            "id": f"{base_id}#{n}",
                            "title": f"{title} - {heading}" if heading else title,
                            "text": text,
                            "tags": meta.get("tags", []),
                            "source": meta.get("source", ""),
                            "license": meta.get("license", "unspecified"),
                            "verified": meta.get("verified", False),
                        }
                    )
                )
            except Exception as e:
                raise ValueError(f"{path}: {e}") from e
    return out


def load_knowledge(mods_dir: Path, guides_dir: Path) -> Knowledge:
    return Knowledge(mods=load_mods(mods_dir), guides=load_guides(guides_dir))
