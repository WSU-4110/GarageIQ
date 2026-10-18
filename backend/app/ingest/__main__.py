"""GarageIQ knowledge ingestion.

  python -m app.ingest dataset data.csv [--verified]
  python -m app.ingest guide guide.md --source URL --license CC-BY-4.0 \
      [--make Subaru --model WRX --year-from 2015 --year-to 2021 --generation va-2015-2021]
  python -m app.ingest check
"""
import argparse
import sys
from pathlib import Path

from app.core.config import get_settings
from app.ingest.datasets import import_dataset
from app.ingest.guides import import_guide
from app.knowledge.loader import load_knowledge


def _split(value: str | None) -> list[str]:
    return [v.strip() for v in value.split("|") if v.strip()] if value else []


def check() -> None:
    s = get_settings()
    k = load_knowledge(s.knowledge_dir, s.guides_dir)
    universal = sum(m.universal for m in k.mods)
    unverified = sum(not m.verified for m in k.mods)
    print(
        f"OK: {len(k.mods)} mods ({universal} universal, {unverified} unverified), "
        f"{len(k.guides)} guide chunks"
    )


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(prog="app.ingest")
    sub = p.add_subparsers(dest="cmd", required=True)

    d = sub.add_parser("dataset")
    d.add_argument("file", type=Path)
    d.add_argument("--verified", action="store_true")

    g = sub.add_parser("guide")
    g.add_argument("file", type=Path)
    g.add_argument("--source", required=True)
    g.add_argument("--license", required=True)
    g.add_argument("--title")
    g.add_argument("--tags", help="'|' separated")
    g.add_argument("--make", default="")
    g.add_argument("--model", default="")
    g.add_argument("--year-from", type=int)
    g.add_argument("--year-to", type=int)
    g.add_argument("--generation", default="")
    g.add_argument("--trims", help="'|' separated")
    g.add_argument("--verified", action="store_true")

    sub.add_parser("check")
    a = p.parse_args(argv)
    s = get_settings()

    if a.cmd == "dataset":
        for folder, count in import_dataset(a.file, s.knowledge_dir, a.verified).items():
            print(f"{count:4d} mods -> mods/{folder}")
    elif a.cmd == "guide":
        target = import_guide(
            a.file, s.guides_dir, a.source, a.license, a.title, _split(a.tags), a.make, a.model,
            a.year_from, a.year_to, a.generation, _split(a.trims), a.verified,
        )
        print(f"Guide written to {target}")
    check()
    return 0


if __name__ == "__main__":
    sys.exit(main())
