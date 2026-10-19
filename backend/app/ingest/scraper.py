"""Fetch a web page and import its readable text as a sourced guide."""
from html.parser import HTMLParser
from pathlib import Path
from tempfile import NamedTemporaryFile
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from app.ingest.guides import import_guide

USER_AGENT = "GarageIQ-knowledge-ingest/1.0"
SKIP_ELEMENTS = {"script", "style", "noscript", "svg", "template"}


class _TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts: list[str] = []
        self.skip_depth = 0
        self.title = ""
        self.in_title = False

    def handle_starttag(self, tag: str, attrs):
        tag = tag.lower()
        if tag in SKIP_ELEMENTS:
            self.skip_depth += 1
        elif tag == "title" and not self.skip_depth:
            self.in_title = True
        elif tag in {"p", "br", "div", "li", "h1", "h2", "h3", "h4", "section"}:
            self.parts.append("\n")

    def handle_endtag(self, tag: str):
        tag = tag.lower()
        if tag in SKIP_ELEMENTS and self.skip_depth:
            self.skip_depth -= 1
        elif tag == "title":
            self.in_title = False
        elif tag in {"p", "br", "div", "li", "h1", "h2", "h3", "h4", "section"}:
            self.parts.append("\n")

    def handle_data(self, data: str):
        if self.skip_depth:
            return
        text = " ".join(data.split())
        if not text:
            return
        if self.in_title:
            self.title = f"{self.title} {text}".strip()
        self.parts.append(text)

    def markdown(self) -> str:
        lines = []
        for part in " ".join(self.parts).splitlines():
            line = " ".join(part.split())
            if line and (not lines or lines[-1] != line):
                lines.append(line)
        return "\n\n".join(lines)


def scrape_page(url: str, max_bytes: int = 2_000_000) -> tuple[str, str]:
    """Return (title, readable text), rejecting unsupported or oversized responses."""
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError("URL must use http or https")
    request = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "text/html"})
    try:
        with urlopen(request, timeout=20) as response:
            content_type = response.headers.get_content_type()
            if content_type != "text/html":
                raise ValueError(f"URL returned {content_type}, expected text/html")
            content = response.read(max_bytes + 1)
    except (HTTPError, URLError, TimeoutError) as e:
        raise RuntimeError(f"Could not fetch {url}: {e}") from e
    if len(content) > max_bytes:
        raise ValueError(f"Response exceeds {max_bytes} bytes")
    parser = _TextExtractor()
    parser.feed(content.decode(response.headers.get_content_charset() or "utf-8", errors="replace"))
    text = parser.markdown()
    if not text:
        raise ValueError("Page did not contain readable text")
    return parser.title or parsed.path.rsplit("/", 1)[-1] or parsed.netloc, text


def import_web_page(
    url: str,
    guides_root: Path,
    license: str,
    title: str | None = None,
    tags: list[str] | None = None,
    make: str = "",
    model: str = "",
    year_from: int | None = None,
    year_to: int | None = None,
    generation: str = "",
    trims: list[str] | None = None,
) -> Path:
    page_title, text = scrape_page(url)
    with NamedTemporaryFile("w", suffix=".md", encoding="utf-8", delete=False) as file:
        source = Path(file.name)
        file.write(f"# {title or page_title}\n\n{text}\n")
    try:
        return import_guide(
            source, guides_root, url, license, title or page_title, tags, make, model,
            year_from, year_to, generation, trims, False,
        )
    finally:
        source.unlink()
