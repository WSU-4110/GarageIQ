import hashlib
from typing import Protocol

import numpy as np

from app.rag.text import tokens


class Embedder(Protocol):
    def embed(self, texts: list[str]) -> np.ndarray:
        """Return L2-normalised vectors, shape (len(texts), dim)."""


class HashingEmbedder:
    """Dependency-free embedder: stemmed words plus character trigrams for fuzzy matches."""

    def __init__(self, dim: int = 1024):
        self.dim = dim

    def _add(self, row: np.ndarray, feature: str, weight: float) -> None:
        h = int(hashlib.md5(feature.encode()).hexdigest(), 16)
        row[h % self.dim] += weight

    def embed(self, texts: list[str]) -> np.ndarray:
        out = np.zeros((len(texts), self.dim), dtype=np.float32)
        for i, text in enumerate(texts):
            for tok in tokens(text):
                self._add(out[i], tok, 1.0)
                padded = f"#{tok}#"
                for j in range(len(padded) - 2):
                    self._add(out[i], padded[j : j + 3], 0.3)
        return _normalise(out)


class FastEmbedEmbedder:
    """Local ONNX embeddings (no API cost). Requires `pip install fastembed`."""

    def __init__(self, model: str):
        from fastembed import TextEmbedding

        self._model = TextEmbedding(model_name=model)

    def embed(self, texts: list[str]) -> np.ndarray:
        return _normalise(np.array(list(self._model.embed(texts)), dtype=np.float32))


def _normalise(m: np.ndarray) -> np.ndarray:
    norms = np.linalg.norm(m, axis=1, keepdims=True)
    return m / np.where(norms == 0, 1, norms)


def build_embedder(kind: str, model: str) -> Embedder:
    if kind == "fastembed":
        return FastEmbedEmbedder(model)
    if kind == "hashing":
        return HashingEmbedder()
    raise ValueError(f"Unknown embedder: {kind}")
