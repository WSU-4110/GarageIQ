import firebase_admin
from firebase_admin import auth


def init_firebase() -> None:
    # Uses Application Default Credentials / GOOGLE_CLOUD_PROJECT; no keys in the repo.
    if not firebase_admin._apps:
        firebase_admin.initialize_app()


def verify_id_token(token: str) -> str:
    init_firebase()
    return auth.verify_id_token(token)["uid"]
