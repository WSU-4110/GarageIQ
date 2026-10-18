from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth
from app.firebase_config import db
from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel


app = FastAPI(
    title="GarageIQ API",
    version="1.0.0"
)

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
