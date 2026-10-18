import re

_TOKEN = re.compile(r"[a-z0-9]+")


def stem(token: str) -> str:
    for suffix in ("ing", "es", "s"):
        if token.endswith(suffix) and len(token) - len(suffix) >= 3:
            return token[: -len(suffix)]
    return token


def tokens(text: str) -> list[str]:
    return [stem(t) for t in _TOKEN.findall(text.lower())]
