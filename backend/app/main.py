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
