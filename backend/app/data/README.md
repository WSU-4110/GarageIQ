# GarageIQ knowledge base

Folder position decides which vehicles an entry applies to. Never repeat fitment inside entries.

```
data/
  mods/                         structured mods (YAML lists)
    _universal/                 recommended for EVERY vehicle (default set)
    <make>/_platform.yaml       make: Subaru
      <model>/_platform.yaml    models: [WRX]
        <generation>/_platform.yaml   year_from / year_to
          <trim-...>/_platform.yaml   trims: [Si, Type R]   (optional level)
  guides/                       prose guides (Markdown + front matter), same layout
  datasets/                     raw source files you import from (kept for provenance)
```

`_platform.yaml` files merge top-down, so a file only inherits what the folders above declare.
An entry may still set its own `fitments:` to override the folder scope.

## Mod entry
Required: `id` (globally unique), `name`, `category`, `summary`, `source`.
Optional: `advice`, `requires`, `recommended_with`, `conflicts_with` (mod ids, may point at
universal mods), `tags`, `license`, `verified` (default false).

## Guide file
Markdown with front matter `title`, `source` (required), `license`, `tags`, `verified`.
Split into chunks by headings (max ~900 chars). Chunk ids are `<path>#<n>`.

## Ingesting (run from `backend/`)
```
python -m app.ingest dataset app/data/datasets/parts.csv [--verified]
python -m app.ingest guide notes.md --source URL --license CC-BY-4.0 \
    --make Subaru --model WRX --year-from 2015 --year-to 2021 --generation va-2015-2021
python -m app.ingest scrape https://example.com/guide --license CC-BY-4.0 \
    --make Subaru --model WRX --year-from 2015 --year-to 2021 --generation va-2015-2021
python -m app.ingest check          # validate everything
```
Dataset columns: `id,name,category,summary,advice,make,models,year_from,year_to,generation,trims,
requires,recommended_with,conflicts_with,tags,source,license`. Lists use `|`. Rows without `make`
become universal. Rows are validated before anything is written; imports re-run safely
(`imported-<file>.yaml` is overwritten).

Only import content you have the right to use: record the real `source` and `license`, and pass
`--verified` only after a human has checked the entries.

`scrape` accepts HTML pages, removes scripts and markup, and imports the result as an unverified
guide with the page URL as its source. Review licensing, accuracy, and the generated guide before
marking it verified. It is intended for individual source pages, not unrestricted crawling.
