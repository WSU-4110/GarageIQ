from fastapi import APIRouter, Depends, HTTPException

from app.api.deps import get_advisor, get_store, get_uid
from app.domain.models import AdviceRequest, AdviceResponse, Vehicle, VehicleCreate

router = APIRouter(prefix="/vehicles", tags=["vehicles"])


@router.post("", response_model=Vehicle, status_code=201)
def create_vehicle(body: VehicleCreate, uid: str = Depends(get_uid), store=Depends(get_store)):
    return store.create(uid, body)


@router.get("", response_model=list[Vehicle])
def list_vehicles(uid: str = Depends(get_uid), store=Depends(get_store)):
    return store.list(uid)


@router.post("/{vehicle_id}/advice", response_model=AdviceResponse)
def advice(
    vehicle_id: str,
    body: AdviceRequest,
    uid: str = Depends(get_uid),
    store=Depends(get_store),
    advisor=Depends(get_advisor),
):
    vehicle = store.get(uid, vehicle_id)
    if vehicle is None:
        raise HTTPException(404, "Vehicle not found")
    return advisor.advise(vehicle, body.question, body.top_k, body.installed_mods)
