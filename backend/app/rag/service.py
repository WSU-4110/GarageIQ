from app.domain.models import AdviceResponse, GuideSnippet, Mod, Recommendation, VehicleCreate
from app.rag.generate import Generator
from app.rag.retriever import Retriever
from app.rag.text import tokens

NO_DATA = (
    "I don't have verified data for this vehicle and question yet. "
    "Try rephrasing, or check back as the knowledge base grows."
)


def _scope(item) -> str:
    return "universal" if item.universal else "vehicle"


def is_installed(mod: Mod, installed: list[set[str]]) -> bool:
    """A mod counts as installed if any entry contains all words of its name or an alias."""
    names = [tokens(mod.name), *(tokens(a) for a in mod.aliases)]
    return any(set(n) <= entry for n in names if n for entry in installed)


class AdvisorService:
    def __init__(self, retriever: Retriever, generator: Generator):
        self.retriever = retriever
        self.generator = generator

    def advise(
        self,
        vehicle: VehicleCreate,
        question: str,
        top_k: int = 5,
        installed_mods: list[str] | None = None,
    ) -> AdviceResponse:
        mod_hits = self.retriever.search(vehicle, question, top_k)
        guide_hits = self.retriever.search_guides(vehicle, question)
        if not mod_hits and not guide_hits:
            return AdviceResponse(answer=NO_DATA, recommendations=[], sources=[], grounded=False)
        recs = []
        for mod, score in mod_hits:
            req, sup, conf = self.retriever.expand(mod, vehicle)
            recs.append(
                Recommendation(
                    mod=mod,
                    score=score,
                    scope=_scope(mod),
                    required_mods=req,
                    supporting_mods=sup,
                    conflicts=conf,
                )
            )
        guidance = [GuideSnippet(guide=g, score=s, scope=_scope(g)) for g, s in guide_hits]
        installed = [set(tokens(m)) for m in installed_mods or []]
        every_mod = {r.mod.id: r.mod for r in recs}
        for r in recs:
            for m in (*r.required_mods, *r.supporting_mods, *r.conflicts):
                every_mod[m.id] = m
        return AdviceResponse(
            answer=self.generator.generate(vehicle, question, recs, guidance),
            recommendations=recs,
            guidance=guidance,
            sources=[r.mod.id for r in recs] + [g.guide.id for g in guidance],
            grounded=True,
            installed_ids=[i for i, m in every_mod.items() if is_installed(m, installed)],
        )
