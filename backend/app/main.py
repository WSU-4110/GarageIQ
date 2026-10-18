from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api import advice, vehicles
from app.core.config import get_settings
from app.knowledge.loader import load_knowledge
from app.rag.embeddings import build_embedder
from app.rag.generate import build_generator
from app.rag.retriever import Retriever
from app.rag.service import AdvisorService
from app.stores.vehicles import build_vehicle_store


@asynccontextmanager
async def lifespan(app: FastAPI):
    s = get_settings()
    knowledge = load_knowledge(s.knowledge_dir, s.guides_dir)
    retriever = Retriever(knowledge, build_embedder(s.embedder, s.embedding_model))
    app.state.advisor = AdvisorService(
        retriever, build_generator(s.generator, s.ollama_url, s.ollama_model)
    )
    app.state.vehicle_store = build_vehicle_store(s.vehicle_store)
    yield


app = FastAPI(title="GarageIQ API", version="1.1.0", lifespan=lifespan)
app.include_router(vehicles.router)
app.include_router(advice.router)


@app.get("/")
def root():
    return {"message": "GarageIQ backend is running"}


@app.get("/health")
def health():
    return {"status": "ok"}
