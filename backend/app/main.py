from contextlib import asynccontextmanager

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth
from app.firebase_config import db
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


class VehicleCreate(BaseModel):
    year: int
    make: str
    model: str
    trim: Optional[str] = None
    mileage: int
    nickname: Optional[str] = None


vehicles = []
next_vehicle_id = 1


@app.post("/vehicles")
def create_vehicle(vehicle: VehicleCreate):
    global next_vehicle_id

    vehicle_data = {
        "id": next_vehicle_id,
        **vehicle.model_dump()
    }

    vehicles.append(vehicle_data)
    next_vehicle_id += 1

    return vehicle_data
    
bearer_auth = HTTPBearer()


@app.get("/me/profile")
def get_my_profile(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_auth)
):
    try:
        decoded_token = auth.verify_id_token(credentials.credentials)
    except (
        auth.InvalidIdTokenError,
        auth.ExpiredIdTokenError,
        auth.RevokedIdTokenError,
        ValueError,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired Firebase token"
        )

    user_id = decoded_token["uid"]

    document = db.collection("users").document(user_id).get()

    if not document.exists:
        raise HTTPException(
            status_code=404,
            detail="User profile not found"
        )

    return document.to_dict()
