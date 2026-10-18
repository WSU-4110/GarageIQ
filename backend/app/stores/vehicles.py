from typing import Optional, Protocol
from uuid import uuid4

from app.domain.models import Vehicle, VehicleCreate


class VehicleStore(Protocol):
    def create(self, uid: str, data: VehicleCreate) -> Vehicle: ...
    def get(self, uid: str, vehicle_id: str) -> Optional[Vehicle]: ...
    def list(self, uid: str) -> list[Vehicle]: ...


class MemoryVehicleStore:
    def __init__(self):
        self._data: dict[str, dict[str, Vehicle]] = {}

    def create(self, uid, data):
        v = Vehicle(id=uuid4().hex, **data.model_dump())
        self._data.setdefault(uid, {})[v.id] = v
        return v

    def get(self, uid, vehicle_id):
        return self._data.get(uid, {}).get(vehicle_id)

    def list(self, uid):
        return list(self._data.get(uid, {}).values())


class FirestoreVehicleStore:
    """Stores vehicles at users/{uid}/vehicles/{id} in the shared Firebase project."""

    def __init__(self):
        from firebase_admin import firestore

        from app.core.firebase import init_firebase

        init_firebase()
        self._db = firestore.client()

    def _col(self, uid):
        return self._db.collection("users").document(uid).collection("vehicles")

    def create(self, uid, data):
        ref = self._col(uid).document()
        ref.set(data.model_dump())
        return Vehicle(id=ref.id, **data.model_dump())

    def get(self, uid, vehicle_id):
        snap = self._col(uid).document(vehicle_id).get()
        return Vehicle(id=snap.id, **snap.to_dict()) if snap.exists else None

    def list(self, uid):
        return [Vehicle(id=s.id, **s.to_dict()) for s in self._col(uid).stream()]


def build_vehicle_store(kind: str) -> VehicleStore:
    if kind == "firestore":
        return FirestoreVehicleStore()
    if kind == "memory":
        return MemoryVehicleStore()
    raise ValueError(f"Unknown vehicle store: {kind}")
