from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.api.deps import get_advisor, get_uid
from app.domain.models import AdviceRequest, AdviceResponse, VehicleCreate

router = APIRouter(tags=["advice"])


class AdviceForVehicle(AdviceRequest):
    vehicle: VehicleCreate


@router.post("/advice", response_model=AdviceResponse)
def advice(body: AdviceForVehicle, uid: str = Depends(get_uid), advisor=Depends(get_advisor)):
    return advisor.advise(body.vehicle, body.question, body.top_k, body.installed_mods)
