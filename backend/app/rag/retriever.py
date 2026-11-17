
import numpy as np
from rank_bm25 import BM25Okapi

from app.domain.models import GuideChunk, Mod, Scoped, VehicleCreate
from app.knowledge.loader import Knowledge
from app.rag.embeddings import Embedder
from app.rag.text import tokens

SPECIFIC_BONUS = 0.05
MIN_SCORE = 0.15
RELATIVE_FLOOR = 0.5
RRF_K = 60


class _Index:
    """Hybrid semantic/BM25 index with vehicle fitment filtering."""

    def __init__(self, items: list[Scoped], embedder: Embedder):
        self.items = items

        corpus = [item.search_text() for item in items]

        self.matrix = (
            embedder.embed(corpus)
            if corpus
            else np.zeros((0, 1), dtype=np.float32)
        )

        self.bm25 = (
            BM25Okapi([tokens(text) for text in corpus])
            if corpus
            else None
        )

    def search(
        self,
        vehicle: VehicleCreate,
        query: str,
        q: np.ndarray,
        top_k: int,
        min_score: float,
    ):
        eligible = [
            i for i, item in enumerate(self.items)
            if item.fits(vehicle)
        ]

        if not eligible:
            return []

        semantic = self.matrix @ q

        # Prefer vehicle-specific material when relevance is equal.
        for i in eligible:
            if not self.items[i].universal:
                semantic[i] += SPECIFIC_BONUS

        lexical = self.bm25.get_scores(tokens(query))

        # Only rank entries compatible with this vehicle.
        semantic_order = sorted(
            eligible,
            key=lambda i: (-semantic[i], i),
        )

        lexical_order = sorted(
            eligible,
            key=lambda i: (-lexical[i], i),
        )

        best_semantic = float(
            max(semantic[i] for i in eligible)
        )

        floor = max(
            min_score,
            RELATIVE_FLOOR * best_semantic,
        )

        best_lexical = max(float(lexical[i]) for i in eligible)

        # BM25 can return negative scores on small corpora.
        # Semantic relevance remains the main noise gate.
        candidates = {
            i for i in eligible
            if semantic[i] >= floor
            or (
                best_lexical > 0
                and lexical[i] > 0
                and lexical[i] >= RELATIVE_FLOOR * best_lexical
            )
        }

        if not candidates:
            return []

        rrf = {i: 0.0 for i in candidates}

        # Fuse rankings across the eligible entries.
        for order in (semantic_order, lexical_order):
            for rank, i in enumerate(order, start=1):
                if i in candidates:
                    rrf[i] += 1.0 / (RRF_K + rank)

        ranked = sorted(
            candidates,
            key=lambda i: (-rrf[i], -semantic[i], i),
        )

        # Keep the original semantic score scale in the API.
        # RRF controls ordering, not displayed scores.
        return [
            (self.items[i], float(semantic[i]))
            for i in ranked[:top_k]
        ]


class Retriever:
    """Vehicle-aware hybrid retrieval with mod graph expansion."""

    def __init__(self, knowledge: Knowledge, embedder: Embedder):
        self.embedder = embedder
        self.by_id = {m.id: m for m in knowledge.mods}

        self._mods = _Index(knowledge.mods, embedder)
        self._guides = _Index(knowledge.guides, embedder)

    def search(
        self,
        vehicle: VehicleCreate,
        query: str,
        top_k: int = 5,
        min_score: float = MIN_SCORE,
    ) -> list[tuple[Mod, float]]:
        q = self.embedder.embed([query])[0]
        return self._mods.search(
            vehicle, query, q, top_k, min_score
        )

    def search_guides(
        self,
        vehicle: VehicleCreate,
        query: str,
        top_k: int = 3,
        min_score: float = MIN_SCORE,
    ) -> list[tuple[GuideChunk, float]]:
        q = self.embedder.embed([query])[0]
        return self._guides.search(
            vehicle, query, q, top_k, min_score
        )

    def expand(self, mod: Mod, vehicle: VehicleCreate):
        def resolve(ids: list[str]) -> list[Mod]:
            return [
                self.by_id[i]
                for i in ids
                if i in self.by_id
                and self.by_id[i].fits(vehicle)
            ]

        return (
            resolve(mod.requires),
            resolve(mod.recommended_with),
            resolve(mod.conflicts_with),
        )
