#!/usr/bin/env python3
"""resource_extract.py — the real document behind a resource page, read mechanically.

Stage 1 of the resource-page pipeline (docs/resource-pages.md). A resource page
may only say what its document says, so before a page is written or rewritten
the document itself is fetched and everything that can be *read* rather than
*judged* is pulled out of it here: its bytes' sha256, its own metadata, its
bookmark outline, its printed table of contents, its headings, the text of each
page, and — for a scan with no text layer — the page images a model has to
read. The outline the page's divisions come from is written out already in the
vault's shape, so a chapter title never passes through a model's recall.

Usage
-----
    # the document a page already links (its `Available from:`)
    python3 scripts/resource_extract.py --page "Resources/Books/OSFI MCT.md"

    # any document, by URL or local file (repeatable: a PDF plus its landing page)
    python3 scripts/resource_extract.py --url https://www.casact.org/.../6C_Davidson.pdf
    python3 scripts/resource_extract.py --file ~/Downloads/asop043.pdf

    # render pages as images (automatic for pages with no text layer)
    python3 scripts/resource_extract.py --url … --render 1-4

Outputs, under `--out` (default: a folder per source under $TMPDIR/resource-extract):
    source.<ext>     the bytes that were read
    extract.json     sha256, size, content type, metadata, outline, per-page text
                     sizes, the pages that look like a table of contents, and for
                     HTML its headings, citation meta tags and linked PDFs
    outline.md       the bookmark outline as `## 1 Title` / `- 1.1 Title` lines
                     (PDF only, when it has bookmarks) — transcribed, not written
    text/p001.txt …  each PDF page's text layer; for HTML, text/page.txt
    pages/p001.png … rendered pages (scans, and any `--render` range)
    summary.md       what was found and what still needs reading, to open first

Nothing here writes to the vault. PyMuPDF is imported lazily (as in
scripts/pdf_extract.py), so the module imports without it; it is needed only
for PDFs. HTTP goes through urllib, which honours the environment's proxy.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
import re
import sys
import tempfile
import urllib.parse
import urllib.request
import zipfile
from html.parser import HTMLParser

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
UA = "Mozilla/5.0 (compatible; ActuarialNotes-resource-extract/1.0)"
TOC_WORDS = re.compile(r"\b(table of contents|contents|table des mati[eè]res)\b", re.I)
NUMBERED_LINE = re.compile(r"^\s*((?:\d+|[A-Z]|[IVXLC]+)(?:\.\d+)*)\.?\s+(\S.{2,120}?)\s*(?:\.{2,}\s*|\s{2,})?(\d+)?\s*$")


# ── fetching ─────────────────────────────────────────────────────────────────

def fetch(url: str) -> tuple[bytes, str, str]:
    """(bytes, content type, final URL)."""
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=90) as resp:
        return resp.read(), resp.headers.get("content-type", ""), resp.geturl()


def kind_of(data: bytes, content_type: str, name: str) -> str:
    if data[:5] == b"%PDF-":
        return "pdf"
    if data[:2] == b"PK" and (name.lower().endswith((".xlsx", ".xlsm")) or "spreadsheet" in content_type):
        return "xlsx"
    if data[:8] == b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1":
        return "xls"
    if "html" in content_type or data.lstrip()[:15].lower().startswith((b"<!doctype html", b"<html")):
        return "html"
    return "other"


def page_link(rel: str) -> str | None:
    """The URL in a page's `Available from:` value."""
    with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
        text = fh.read()
    m = re.search(r'^Available from:\s*"?\[[^\]]*\]\((https?://[^)\s]+)\)', text, re.M)
    return m.group(1) if m else None


def parse_range(spec: str | None, n: int) -> list[int]:
    if not spec:
        return []
    out: set[int] = set()
    for part in spec.split(","):
        a, _, b = part.partition("-")
        lo = int(a)
        hi = int(b) if b else lo
        out.update(p for p in range(lo, hi + 1) if 1 <= p <= n)
    return sorted(out)


# ── PDF ──────────────────────────────────────────────────────────────────────

def outline_markdown(toc: list[list]) -> str:
    """Bookmarks → the vault's outline shape. Level 1 → `##`, deeper → nested bullets.

    Titles are copied as the document carries them; only whitespace is tidied.
    """
    out: list[str] = []
    for level, title, _page, *_ in toc:
        t = re.sub(r"\s+", " ", str(title)).strip()
        if not t:
            continue
        if level <= 1:
            out.append(f"\n## {t}")
        else:
            out.append("    " * (level - 2) + f"- {t}")
    return "\n".join(out).strip() + "\n"


def extract_pdf(data: bytes, out: str, render: str | None, text_pages: int) -> dict:
    try:
        import pymupdf  # type: ignore
    except ImportError:  # pragma: no cover - older wheels
        try:
            import fitz as pymupdf  # type: ignore
        except ImportError:
            sys.exit("PyMuPDF is needed for PDFs: pip install pymupdf")
    doc = pymupdf.open(stream=data, filetype="pdf")
    n = doc.page_count
    os.makedirs(os.path.join(out, "text"), exist_ok=True)
    sizes: list[int] = []
    toc_pages: list[int] = []
    numbered: list[dict] = []
    for i in range(n):
        text = doc[i].get_text()
        sizes.append(len(text.strip()))
        if not text_pages or i < text_pages:
            with open(os.path.join(out, "text", f"p{i + 1:03d}.txt"), "w", encoding="utf-8") as fh:
                fh.write(text)
        if i < 25 and TOC_WORDS.search(text[:400]):
            toc_pages.append(i + 1)
        if i < 25:
            for line in text.split("\n"):
                m = NUMBERED_LINE.match(line)
                if m and len(numbered) < 400:
                    numbered.append({"page": i + 1, "label": m.group(1), "title": m.group(2).strip()})
    scanned = [i + 1 for i, s in enumerate(sizes) if s < 25]
    to_render = sorted(set(parse_range(render, n)) | set(p for p in scanned if p <= 30))
    if to_render:
        os.makedirs(os.path.join(out, "pages"), exist_ok=True)
        for p in to_render:
            doc[p - 1].get_pixmap(dpi=110).save(os.path.join(out, "pages", f"p{p:03d}.png"))
    toc = doc.get_toc(simple=True)
    if toc:
        with open(os.path.join(out, "outline.md"), "w", encoding="utf-8") as fh:
            fh.write(outline_markdown(toc))
    return {
        "pages": n,
        "metadata": {k: v for k, v in (doc.metadata or {}).items() if v},
        "outline": [{"level": lv, "title": t, "page": pg} for lv, t, pg in toc],
        "text_chars_per_page": sizes,
        "scanned_pages": scanned,
        "toc_pages": toc_pages,
        "numbered_lines": numbered,
        "rendered": to_render,
    }


# ── HTML ─────────────────────────────────────────────────────────────────────

class _Html(HTMLParser):
    def __init__(self, base: str) -> None:
        super().__init__(convert_charrefs=True)
        self.base = base
        self.title = ""
        self.meta: dict[str, list[str]] = {}
        self.headings: list[dict] = []
        self.pdfs: list[str] = []
        self.text: list[str] = []
        self._skip = 0
        self._in: str | None = None
        self._buf: list[str] = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style", "noscript", "svg"):
            self._skip += 1
        elif tag == "meta":
            key = (a.get("name") or a.get("property") or "").lower()
            if key.startswith(("citation_", "dc.", "og:title", "description", "og:description", "book:")) and a.get("content"):
                self.meta.setdefault(key, []).append(html.unescape(a["content"]).strip())
        elif tag == "a" and a.get("href"):
            href = urllib.parse.urljoin(self.base, a["href"])
            # A PDF by extension, or a download endpoint (the CIA serves its
            # publications through `dl_file.php`).
            if re.search(r"\.pdf(\?|#|$)|dl_file\.php|/download\b", href, re.I) and href not in self.pdfs:
                self.pdfs.append(href)
        elif tag in ("h1", "h2", "h3", "h4", "title"):
            self._in, self._buf = tag, []
        elif tag in ("p", "li", "br", "div", "tr"):
            self.text.append("\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg"):
            self._skip = max(0, self._skip - 1)
        elif tag == self._in:
            t = re.sub(r"\s+", " ", "".join(self._buf)).strip()
            if tag == "title":
                self.title = t
            elif t:
                self.headings.append({"level": int(tag[1]), "text": t})
            self._in = None

    def handle_data(self, data):
        if self._skip:
            return
        if self._in:
            self._buf.append(data)
        self.text.append(data)


def extract_html(data: bytes, url: str, out: str) -> dict:
    page = _Html(url)
    page.feed(data.decode("utf-8", errors="replace"))
    os.makedirs(os.path.join(out, "text"), exist_ok=True)
    text = re.sub(r"\n\s*\n+", "\n\n", re.sub(r"[ \t]+", " ", "".join(page.text))).strip()
    with open(os.path.join(out, "text", "page.txt"), "w", encoding="utf-8") as fh:
        fh.write(text)
    return {"title": page.title, "meta": page.meta, "headings": page.headings, "pdf_links": page.pdfs}


# ── spreadsheets (the OSFI returns) ─────────────────────────────────────────

def extract_xlsx(path: str) -> dict:
    with zipfile.ZipFile(path) as z:
        wb = z.read("xl/workbook.xml").decode("utf-8", errors="replace")
    sheets = [html.unescape(s) for s in re.findall(r'<sheet\b[^>]*\bname="([^"]+)"', wb)]
    return {"sheets": sheets}


# ── driver ───────────────────────────────────────────────────────────────────

def summarize(info: dict) -> str:
    lines = [f"# {info['source']}", "", f"- kind: {info['kind']}", f"- sha256: {info['sha256']}",
             f"- bytes: {info['bytes']}", f"- retrieved from: {info.get('final_url') or info['source']}"]
    k = info["kind"]
    if k == "pdf":
        p = info["pdf"]
        lines += [f"- pages: {p['pages']}", f"- metadata: {json.dumps(p['metadata'], ensure_ascii=False)}",
                  f"- bookmark outline: {len(p['outline'])} entries" + (" → outline.md" if p["outline"] else " (none)"),
                  f"- pages that look like a table of contents: {p['toc_pages'] or 'none found'}",
                  f"- pages with no text layer: {p['scanned_pages'] or 'none'}"]
        if p["scanned_pages"]:
            lines.append("  READ THESE AS IMAGES (pages/*.png) — there is no text to extract")
        if p["numbered_lines"]:
            lines += ["", "## Numbered lines in the first pages (heading candidates, not headings)", ""]
            lines += [f"- p{d['page']}: {d['label']} {d['title']}" for d in p["numbered_lines"][:120]]
    elif k == "html":
        h = info["html"]
        lines += [f"- title: {h['title']}", f"- linked PDFs / downloads: {len(h['pdf_links'])}"]
        lines += [f"  - {u}" for u in h["pdf_links"][:25]]
        if h["meta"]:
            lines += ["", "## Citation metadata", ""]
            lines += [f"- {key}: {' | '.join(v)}" for key, v in h["meta"].items()]
        lines += ["", "## Headings", ""]
        lines += ["  " * (d["level"] - 1) + f"- {d['text']}" for d in h["headings"][:200]]
    elif k == "xlsx":
        lines += ["", "## Sheets", ""] + [f"- {s}" for s in info["xlsx"]["sheets"]]
    return "\n".join(lines) + "\n"


def run(source: str, out: str | None, render: str | None, text_pages: int) -> dict:
    if os.path.exists(os.path.expanduser(source)):
        path = os.path.expanduser(source)
        with open(path, "rb") as fh:
            data = fh.read()
        ctype, final = "", path
    else:
        data, ctype, final = fetch(source)
    sha = hashlib.sha256(data).hexdigest()
    name = urllib.parse.urlparse(final).path.rsplit("/", 1)[-1] or "source"
    kind = kind_of(data, ctype, name)
    out = out or os.path.join(tempfile.gettempdir(), "resource-extract", sha[:12])
    os.makedirs(out, exist_ok=True)
    ext = {"pdf": "pdf", "html": "html", "xlsx": "xlsx", "xls": "xls"}.get(kind, "bin")
    src_path = os.path.join(out, f"source.{ext}")
    with open(src_path, "wb") as fh:
        fh.write(data)
    info: dict = {"source": source, "final_url": final, "sha256": sha, "bytes": len(data),
                  "content_type": ctype, "kind": kind, "out": out}
    if kind == "pdf":
        info["pdf"] = extract_pdf(data, out, render, text_pages)
    elif kind == "html":
        info["html"] = extract_html(data, final, out)
    elif kind == "xlsx":
        info["xlsx"] = extract_xlsx(src_path)
    with open(os.path.join(out, "extract.json"), "w", encoding="utf-8") as fh:
        json.dump(info, fh, indent=2, ensure_ascii=False)
    with open(os.path.join(out, "summary.md"), "w", encoding="utf-8") as fh:
        fh.write(summarize(info))
    return info


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--page", action="append", default=[], help="a resource page; its `Available from:` link is read")
    ap.add_argument("--url", action="append", default=[], help="a document URL (repeatable)")
    ap.add_argument("--file", action="append", default=[], help="a local document (repeatable)")
    ap.add_argument("--out", help="output folder (only with a single source)")
    ap.add_argument("--render", help="PDF pages to render as images, e.g. 1-3,9")
    ap.add_argument("--text-pages", type=int, default=0,
                    help="write the text layer of only the first N pages (default: every page)")
    args = ap.parse_args(argv)

    sources = list(args.url) + list(args.file)
    for rel in args.page:
        link = page_link(rel)
        if not link:
            print(f"{rel}: no `Available from:` link — pass --url for its document", file=sys.stderr)
            continue
        sources.append(link)
    if not sources:
        ap.error("nothing to extract — give --page, --url or --file")
    if args.out and len(sources) > 1:
        ap.error("--out takes a single source")
    for src in sources:
        info = run(src, args.out, args.render, args.text_pages)
        print(f"{src}\n  → {info['out']}/summary.md ({info['kind']}, sha256 {info['sha256'][:16]}…)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
