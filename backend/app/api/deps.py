from fastapi import Depends, Header, HTTPException, Request

from app.core.config import Settings, get_settings


def get_uid(
    authorization: str | None = Header(default=None),
    settings: Settings = Depends(get_settings),
) -> str:
    if not settings.require_auth:
        return "dev-user"
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(401, "Missing bearer token")
    from app.core.firebase import verify_id_token

    try:
        return verify_id_token(authorization.split(" ", 1)[1])
    except Exception:
        raise HTTPException(401, "Invalid token")


def get_store(request: Request):
    return request.app.state.vehicle_store


def get_advisor(request: Request):
    return request.app.state.advisor
