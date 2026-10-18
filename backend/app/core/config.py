from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

APP_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="GARAGEIQ_", env_file=".env", extra="ignore")

    # "firestore" uses GCP (Application Default Credentials); "memory" is for local dev/tests.
    vehicle_store: str = "memory"
    # "fastembed" is local and free; "hashing" is a dependency-free fallback.
    embedder: str = "hashing"
    embedding_model: str = "BAAI/bge-small-en-v1.5"
    # "template" is deterministic and free; "ollama" uses a local LLM.
    generator: str = "template"
    ollama_url: str = "http://localhost:11434"
    ollama_model: str = "llama3.2:3b"
    knowledge_dir: Path = APP_DIR / "data" / "mods"
    guides_dir: Path = APP_DIR / "data" / "guides"
    # When true, requests must carry a valid Firebase ID token.
    require_auth: bool = False


@lru_cache
def get_settings() -> Settings:
    return Settings()
