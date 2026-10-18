from typing import Protocol

import httpx

from app.domain.models import GuideSnippet, Recommendation, VehicleCreate


class Generator(Protocol):
    def generate(
        self,
        vehicle: VehicleCreate,
        question: str,
        recs: list[Recommendation],
        guidance: list[GuideSnippet],
    ) -> str: ...


def _context(recs: list[Recommendation], guidance: list[GuideSnippet]) -> str:
    lines = []
    for r in recs:
        lines.append(f"- {r.mod.name} [{r.mod.id}]: {r.mod.summary} {r.mod.advice}")
        if r.required_mods:
            lines.append(f"  Requires: {', '.join(m.name for m in r.required_mods)}")
        if r.supporting_mods:
            lines.append(f"  Pairs well with: {', '.join(m.name for m in r.supporting_mods)}")
        if r.conflicts:
            lines.append(f"  Conflicts with: {', '.join(m.name for m in r.conflicts)}")
    for g in guidance:
        lines.append(f"- Guide [{g.guide.id}] {g.guide.title}: {g.guide.text}")
    return "\n".join(lines)


def _vehicle_label(v: VehicleCreate) -> str:
    return f"{v.year} {v.make} {v.model}" + (f" {v.trim}" if v.trim else "")


class TemplateGenerator:
    """Deterministic, zero-cost summary. The UI renders the detailed cards, so keep this short."""

    def generate(self, vehicle, question, recs, guidance):
        parts = []
        if recs:
            parts.append(f"{len(recs)} matching mod{'s' if len(recs) != 1 else ''}")
        if guidance:
            parts.append(f"{len(guidance)} guide excerpt{'s' if len(guidance) != 1 else ''}")
        return f"Found {' and '.join(parts)} for your {_vehicle_label(vehicle)}."


class OllamaGenerator:
    """Local LLM via Ollama. Falls back to the template if Ollama is unreachable."""

    def __init__(self, url: str, model: str):
        self.url, self.model = url, model
        self.fallback = TemplateGenerator()

    def generate(self, vehicle, question, recs, guidance):
        prompt = (
            "You are a car modification advisor. Answer ONLY using the context below. "
            "If the context is insufficient, say so. Mention required and supporting mods.\n\n"
            f"Vehicle: {_vehicle_label(vehicle)} ({vehicle.mileage} miles)\n"
            f"Context:\n{_context(recs, guidance)}\n\nQuestion: {question}\nAnswer:"
        )
        try:
            r = httpx.post(
                f"{self.url}/api/generate",
                json={"model": self.model, "prompt": prompt, "stream": False},
                timeout=120,
            )
            r.raise_for_status()
            return r.json()["response"].strip()
        except httpx.HTTPError:
            return self.fallback.generate(vehicle, question, recs, guidance)


def build_generator(kind: str, url: str, model: str) -> Generator:
    if kind == "template":
        return TemplateGenerator()
    if kind == "ollama":
        return OllamaGenerator(url, model)
    raise ValueError(f"Unknown generator: {kind}")
