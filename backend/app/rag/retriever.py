import numpy as np

from app.domain.models import GuideChunk, Mod, Scoped, VehicleCreate
from app.knowledge.loader import Knowledge
from app.rag.embeddings import Embedder

# Vehicle-specific knowledge outranks equally relevant generic knowledge.
SPECIFIC_BONUS = 0.05
MIN_SCORE = 0.15
RELATIVE_FLOOR = 0.5


class _Index:
    def __init__(self, items: list[Scoped], embedder: Embedder):
        self.items = items
        self.matrix = (
            embedder.embed([i.search_text() for i in items]) if items else np.zeros((0, 1))
        )

    def search(self, vehicle: VehicleCreate, q: np.ndarray, top_k: int, min_score: float):
        idx = [i for i, item in enumerate(self.items) if item.fits(vehicle)]
        if not idx:
            return []
        scores = self.matrix[idx] @ q
        scores = scores + np.array([0 if self.items[i].universal else SPECIFIC_BONUS for i in idx])
        order = np.argsort(-scores)[:top_k]
        # Drop weak matches: absolute floor, and anything far below the best hit.
        floor = max(min_score, RELATIVE_FLOOR * float(scores[order[0]]))
        return [(self.items[idx[j]], float(scores[j])) for j in order if scores[j] >= floor]


class Retriever:
    """Fitment hard-filter, then vector similarity, then graph expansion."""

    def __init__(self, knowledge: Knowledge, embedder: Embedder):
        self.embedder = embedder
        self.by_id = {m.id: m for m in knowledge.mods}
        self._mods = _Index(knowledge.mods, embedder)
        self._guides = _Index(knowledge.guides, embedder)

    def search(
        self, vehicle: VehicleCreate, query: str, top_k: int = 5, min_score: float = MIN_SCORE
    ) -> list[tuple[Mod, float]]:
        return self._mods.search(vehicle, self.embedder.embed([query])[0], top_k, min_score)

    def search_guides(
        self, vehicle: VehicleCreate, query: str, top_k: int = 3, min_score: float = MIN_SCORE
    ) -> list[tuple[GuideChunk, float]]:
        return self._guides.search(vehicle, self.embedder.embed([query])[0], top_k, min_score)

    def expand(self, mod: Mod, vehicle: VehicleCreate):
        def resolve(ids: list[str]) -> list[Mod]:
            return [self.by_id[i] for i in ids if self.by_id[i].fits(vehicle)]

        return resolve(mod.requires), resolve(mod.recommended_with), resolve(mod.conflicts_with)
