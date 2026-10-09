#!/usr/bin/env python3
"""
verify_sources.py — the shared source cache for VERIFY sweeps.

`docs/verification-plan.md` §2: the cost of a sweep is the source material read
into context, and the Exam P sweep spent most of its tokens re-fetching and
re-reading the same documents in every agent. This fetches a document **once**,
hashes it, splits it into pages of text (OCR'ing scanned pages when Tesseract is
installed) and keeps the lot outside the repo, keyed by URL. Every packet then
reads the pages it needs from the cache, and every pass in a packet cites the
same sha256.

Usage:
  python3 scripts/verify_sources.py fetch <url> [<url> …] [--no-ocr] [--refresh]
  python3 scripts/verify_sources.py meta <url>
  python3 scripts/verify_sources.py text <url> --pages 3-7,12
  python3 scripts/verify_sources.py search <url> "loss ratio" "permissible loss ratio"
  python3 scripts/verify_sources.py render <url> --pages 3-4 [--dpi 150]
  python3 scripts/verify_sources.py cite <url> --locator "Q12, p.4" [--title "…"]

The cache lives in `$VERIFY_SOURCE_CACHE`, else `<tmp>/verify-sources`. Each
source is a folder named by `cache_key(url)` holding the original bytes, a
`meta.json` and one `pages/NNNN.txt` per page (an HTML document is one page).

`meta.json` records which pages came from OCR (`ocr_pages`: spot-check those
against the image) and which have no text at all (`image_pages`: render them —
those are what a model has to read with vision).

Fetching and extraction need the network and PyMuPDF; everything else here is
pure and tested in `test_verify_wave0.py`.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
import tempfile
import urllib.parse
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import resource_extract as RE  # noqa: E402

CACHE_ENV = "VERIFY_SOURCE_CACHE"
# A page with less text than this and an image on it is a scan.
SCAN_TEXT_THRESHOLD = 200
OCR_DPI = 300


# ─── Pure helpers ─────────────────────────────────────────────────────────────

def cache_root() -> Path:
    env = os.environ.get(CACHE_ENV)
    return Path(env) if env else Path(tempfile.gettempdir()) / "verify-sources"


def cache_key(url: str) -> str:
    """A stable folder name for a URL: its sha256, cut to 16 hex digits."""
    return hashlib.sha256(url.strip().encode("utf-8")).hexdigest()[:16]


def source_dir(url: str, root: Path | None = None) -> Path:
    return (root or cache_root()) / cache_key(url)


def page_spec(spec: str | None, n: int) -> list[int]:
    """`"3-5,9"` → `[3, 4, 5, 9]`, clipped to the document. Empty → every page."""
    if not spec:
        return list(range(1, n + 1))
    return RE.parse_range(spec, n)


def normalize(text: str) -> str:
    """Text as a search sees it: a word broken across a line rejoined,
    case folded, whitespace collapsed, typographic quotes and dashes flattened."""
    text = re.sub(r"(\w)-\s*\n\s*(\w)", r"\1\2", text)
    text = text.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    text = re.sub(r"[‐‑‒–—]", "-", text)
    return re.sub(r"\s+", " ", text).strip().lower()


def search_pages(pages: list[str], terms: list[str]) -> dict[str, list[int]]:
    """Each term → the 1-indexed pages it occurs on (whole-word, normalised)."""
    normed = [normalize(p) for p in pages]
    hits: dict[str, list[int]] = {}
    for term in terms:
        t = normalize(term)
        if not t:
            continue
        pattern = re.compile(r"(?<![a-z0-9])" + re.escape(t) + r"(?![a-z0-9])")
        hits[term] = [i + 1 for i, page in enumerate(normed) if pattern.search(page)]
    return hits


def focus_pages(pages: list[str], terms: list[str], limit: int = 5) -> list[int]:
    """The pages that name the terms most often, at most `limit`, in page order.

    A common term ("loss ratio") is on most pages of a ratemaking text; the
    pages where it is named most are where it is defined and worked, which is
    what a check has to read.
    """
    normed = [normalize(p) for p in pages]
    patterns = [re.compile(r"(?<![a-z0-9])" + re.escape(normalize(t)) + r"(?![a-z0-9])")
                for t in terms if normalize(t)]
    counts = {i + 1: sum(len(p.findall(page)) for p in patterns) for i, page in enumerate(normed)}
    ranked = sorted((n for n, c in counts.items() if c), key=lambda n: (-counts[n], n))
    return sorted(ranked[:limit])


def citation(meta: dict, locator: str = "", title: str = "") -> str:
    """The `--source` line a pass cites: the work, where in it, its digest, its URL.

    The shape the Exam P/FM sweeps used, which `summarizeSource` in the app cuts
    back down to the work's name, its locator and its link.
    """
    name = title or meta.get("title") or meta.get("url", "")
    parts = [name]
    if locator:
        parts.append(locator)
    parts.append(f"sha256:{meta.get('sha256', '')}")
    return ", ".join(parts) + f" — {meta.get('url', '')}"


# ─── Fetch and extract ────────────────────────────────────────────────────────

def _ocr_tools():
    """(ocr_available, ocr_page) from the PDF pipeline, which already locates
    Tesseract's language data; None when the pipeline can't be imported."""
    try:
        import pdf_extract  # noqa: PLC0415
    except Exception:  # pragma: no cover - import guard
        return None
    return pdf_extract.ocr_available, pdf_extract._ocr_page


def _extract_pdf(path: Path, ocr: bool) -> dict:
    try:
        import pymupdf  # noqa: PLC0415
    except ImportError:
        raise SystemExit("PyMuPDF is required to read a PDF: pip install pymupdf")
    tools = _ocr_tools() if ocr else None
    use_ocr = bool(tools and tools[0]())
    doc = pymupdf.open(str(path))
    texts: list[str] = []
    ocr_pages: list[int] = []
    image_pages: list[int] = []
    for i, page in enumerate(doc):
        text = page.get_text()
        scanned = len(text.strip()) < SCAN_TEXT_THRESHOLD and bool(page.get_images())
        if scanned and use_ocr:
            tp = tools[1](page, OCR_DPI)
            if tp is not None:
                ocr_text = page.get_text(textpage=tp)
                if ocr_text.strip():
                    text = ocr_text
                    ocr_pages.append(i + 1)
                    scanned = False
        if scanned:
            image_pages.append(i + 1)
        texts.append(text)
    info = {
        "title": (doc.metadata or {}).get("title") or "",
        "pages": doc.page_count,
        "outline": [[lvl, str(t), pg] for lvl, t, pg, *_ in doc.get_toc()],
        "ocr_pages": ocr_pages,
        "image_pages": image_pages,
        "ocr": use_ocr,
    }
    doc.close()
    return {"texts": texts, **info}


def _extract_html(data: bytes, url: str) -> dict:
    parser = RE._Html(url)
    parser.feed(data.decode("utf-8", errors="replace"))
    text = re.sub(r"\n\s*\n+", "\n\n", re.sub(r"[ \t]+", " ", "".join(parser.text))).strip()
    return {
        "texts": [text], "title": parser.title, "pages": 1,
        "outline": [[h["level"], h["text"], 1] for h in parser.headings],
        "ocr_pages": [], "image_pages": [], "ocr": False, "pdf_links": parser.pdfs,
    }


def fetch(url: str, ocr: bool = True, refresh: bool = False, root: Path | None = None) -> dict:
    """Fetch, hash and extract a source into the cache; return its meta.

    A source already cached is returned as is — that is the point — unless
    `refresh` is set, which re-downloads it. A changed sha256 on refresh means
    the publisher replaced the file under the same URL.
    """
    folder = source_dir(url, root)
    meta_path = folder / "meta.json"
    if meta_path.is_file() and not refresh:
        return json.loads(meta_path.read_text(encoding="utf-8"))

    data, ctype, final = RE.fetch(url)
    kind = RE.kind_of(data, ctype, urllib.parse.urlparse(final).path)
    folder.mkdir(parents=True, exist_ok=True)
    ext = {"pdf": ".pdf", "html": ".html"}.get(kind, ".bin")
    original = folder / f"source{ext}"
    original.write_bytes(data)

    if kind == "pdf":
        info = _extract_pdf(original, ocr)
    elif kind == "html":
        info = _extract_html(data, final)
    else:
        info = {"texts": [], "title": "", "pages": 0, "outline": [],
                "ocr_pages": [], "image_pages": [], "ocr": False}

    pages_dir = folder / "pages"
    pages_dir.mkdir(exist_ok=True)
    for old in pages_dir.glob("*.txt"):
        old.unlink()
    for i, text in enumerate(info.pop("texts"), 1):
        (pages_dir / f"{i:04d}.txt").write_text(text, encoding="utf-8")

    meta = {
        "url": url,
        "final_url": final,
        "sha256": hashlib.sha256(data).hexdigest(),
        "bytes": len(data),
        "kind": kind,
        "file": original.name,
        "fetched": date.today().isoformat(),
        **info,
    }
    meta_path.write_text(json.dumps(meta, indent=1, ensure_ascii=False), encoding="utf-8")
    return meta


def source_file(url: str, root: Path | None = None) -> Path:
    meta = fetch(url, root=root)
    return source_dir(url, root) / meta["file"]


def read_pages(url: str, spec: str | None = None, root: Path | None = None) -> list[tuple[int, str]]:
    """`(page number, text)` for the pages in `spec`, fetching the source if needed."""
    meta = fetch(url, root=root)
    folder = source_dir(url, root) / "pages"
    return [
        (n, (folder / f"{n:04d}.txt").read_text(encoding="utf-8"))
        for n in page_spec(spec, meta["pages"])
    ]


def render(url: str, spec: str, dpi: int = 150, root: Path | None = None) -> list[Path]:
    """PNGs of the given pages, for the residue a model has to read by eye."""
    import pymupdf  # noqa: PLC0415

    meta = fetch(url, root=root)
    if meta["kind"] != "pdf":
        raise SystemExit("only a PDF can be rendered")
    folder = source_dir(url, root)
    out_dir = folder / "render"
    out_dir.mkdir(exist_ok=True)
    doc = pymupdf.open(str(folder / meta["file"]))
    out: list[Path] = []
    for n in page_spec(spec, meta["pages"]):
        target = out_dir / f"{n:04d}-{dpi}.png"
        if not target.is_file():
            doc[n - 1].get_pixmap(dpi=dpi).save(str(target))
        out.append(target)
    doc.close()
    return out


# ─── CLI ──────────────────────────────────────────────────────────────────────

def _summary(meta: dict) -> str:
    bits = [f"{meta['kind']}", f"{meta['pages']} page(s)", f"sha256:{meta['sha256']}"]
    if meta.get("ocr_pages"):
        bits.append(f"OCR pages {ranges(meta['ocr_pages'])}")
    if meta.get("image_pages"):
        bits.append(f"image-only pages {ranges(meta['image_pages'])}")
    return f"{meta['url']}\n  " + " · ".join(bits) + f"\n  {source_dir(meta['url'])}"


def ranges(nums: list[int]) -> str:
    """`[1,2,3,7]` → `1-3,7`."""
    out: list[str] = []
    for n in sorted(nums):
        if out and "-" in out[-1] and int(out[-1].split("-")[1]) == n - 1:
            out[-1] = f"{out[-1].split('-')[0]}-{n}"
        elif out and "-" not in out[-1] and int(out[-1]) == n - 1:
            out[-1] = f"{out[-1]}-{n}"
        else:
            out.append(str(n))
    return ",".join(out)


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="command", required=True)

    p = sub.add_parser("fetch", help="fetch and extract sources into the cache")
    p.add_argument("urls", nargs="+")
    p.add_argument("--no-ocr", action="store_true")
    p.add_argument("--refresh", action="store_true", help="re-download even if cached")

    p = sub.add_parser("meta", help="print a cached source's meta.json")
    p.add_argument("url")

    p = sub.add_parser("text", help="print pages of text")
    p.add_argument("url")
    p.add_argument("--pages", default="")

    p = sub.add_parser("search", help="which pages name each term")
    p.add_argument("url")
    p.add_argument("terms", nargs="+")

    p = sub.add_parser("render", help="render pages to PNG for reading by eye")
    p.add_argument("url")
    p.add_argument("--pages", required=True)
    p.add_argument("--dpi", type=int, default=150)

    p = sub.add_parser("cite", help="the --source line for a pass")
    p.add_argument("url")
    p.add_argument("--locator", default="")
    p.add_argument("--title", default="")

    args = ap.parse_args(argv)
    if args.command == "fetch":
        for url in args.urls:
            print(_summary(fetch(url, ocr=not args.no_ocr, refresh=args.refresh)))
    elif args.command == "meta":
        print(json.dumps(fetch(args.url), indent=1, ensure_ascii=False))
    elif args.command == "text":
        for n, text in read_pages(args.url, args.pages):
            print(f"===== page {n} =====\n{text.rstrip()}\n")
    elif args.command == "search":
        texts = [t for _n, t in read_pages(args.url)]
        for term, pages in search_pages(texts, args.terms).items():
            print(f"{term}: {ranges(pages) if pages else '— not in the document'}")
    elif args.command == "render":
        for path in render(args.url, args.pages, args.dpi):
            print(path)
    elif args.command == "cite":
        print(citation(fetch(args.url), args.locator, args.title))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
