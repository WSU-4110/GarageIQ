"""Performance-shop search, using the application's existing FastAPI backend."""
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, HttpUrl

from app.api.deps import get_uid
from app.core.config import get_settings
from app.services.shop_finder import ShopFinderService

router = APIRouter(prefix="/shops", tags=["shops"])


class Shop(BaseModel):
    id: str
    name: str
    address: str
    rating: float | None = None
    phone: str | None = None
    website: HttpUrl | None = None
    maps_url: HttpUrl | None = None
    directions_url: HttpUrl


class ShopSearchResponse(BaseModel):
    shops: list[Shop]


@router.get("", response_model=ShopSearchResponse)
def search_shops(
    location: str = Query(min_length=2, max_length=100),
    service: Literal["performance", "tuning", "exhaust", "suspension", "brakes", "general"] = "performance",
    make: str = Query(default="", max_length=40),
    uid: str = Depends(get_uid),
):
    del uid  # Authentication is enforced by get_uid when enabled in settings.
    if any(ord(ch) < 32 for ch in location + make):
        raise HTTPException(status_code=422, detail="Invalid location or specialization")
    finder = ShopFinderService(get_settings().google_places_api_key)
    try:
        return ShopSearchResponse(shops=finder.search(location, service, make))
    except ValueError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
