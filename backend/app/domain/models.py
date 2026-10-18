from typing import Literal, Optional

from pydantic import BaseModel, Field


class VehicleCreate(BaseModel):
    year: int = Field(ge=1950, le=2100)
    make: str
    model: str
    trim: Optional[str] = None
    mileage: int = Field(ge=0)
    nickname: Optional[str] = None


class Vehicle(VehicleCreate):
    id: str


class Fitment(BaseModel):
    """Hard compatibility constraint. Omitted fields mean 'any'."""

    make: str
    models: list[str] = []
    year_from: int = 1950
    year_to: int = 2100
    trims: list[str] = []


class Scoped(BaseModel):
    """Anything in the knowledge base that applies to a set of vehicles."""

    universal: bool = False
    fitments: list[Fitment] = []

    def fits(self, v: VehicleCreate) -> bool:
        if self.universal:
            return True
        for f in self.fitments:
            if f.make.lower() != v.make.lower():
                continue
            if f.models and v.model.lower() not in (m.lower() for m in f.models):
                continue
            if not f.year_from <= v.year <= f.year_to:
                continue
            if f.trims and (not v.trim or v.trim.lower() not in (t.lower() for t in f.trims)):
                continue
            return True
        return False


class Mod(Scoped):
    id: str
    name: str
    aliases: list[str] = []
    category: str
    summary: str
    advice: str = ""
    requires: list[str] = []
    recommended_with: list[str] = []
    conflicts_with: list[str] = []
    tags: list[str] = []
    source: str = Field(min_length=1)
    license: str = "unspecified"
    verified: bool = False

    def search_text(self) -> str:
        return f"{self.name}. {self.category}. {self.summary} {self.advice} {' '.join(self.tags)}"


class GuideChunk(Scoped):
    id: str
    title: str
    text: str
    tags: list[str] = []
    source: str = Field(min_length=1)
    license: str = "unspecified"
    verified: bool = False

    def search_text(self) -> str:
        return f"{self.title}. {self.text} {' '.join(self.tags)}"


class Recommendation(BaseModel):
    mod: Mod
    score: float
    scope: Literal["vehicle", "universal"]
    required_mods: list[Mod] = []
    supporting_mods: list[Mod] = []
    conflicts: list[Mod] = []


class GuideSnippet(BaseModel):
    guide: GuideChunk
    score: float
    scope: Literal["vehicle", "universal"]


class AdviceRequest(BaseModel):
    question: str = Field(min_length=3, max_length=500)
    top_k: int = Field(default=5, ge=1, le=20)
    installed_mods: list[str] = Field(default=[], max_length=100)


class AdviceResponse(BaseModel):
    answer: str
    recommendations: list[Recommendation]
    guidance: list[GuideSnippet] = []
    sources: list[str]
    grounded: bool
    installed_ids: list[str] = []
