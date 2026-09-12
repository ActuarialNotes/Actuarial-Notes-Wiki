#!/usr/bin/env python3
"""
pdf_extract.py — PDF → structured question records, with no model in the loop.

Stage 1 of the pipeline in `docs/pdf-question-pipeline.md`. Everything an exam
PDF says that can be *read* rather than *judged* is pulled out here and written
to a JSONL file: the question number, the prompt, the exhibit tables, the
lettered options, the answer key, the point values, the per-part breakdown, and
the worked solution the publisher supplied. A model never sees the bytes.

Why it matters: in the transcribe-by-hand workflow this replaces, every one of
those characters crossed the context window twice — once as extracted text or a
rendered page image, once as typed output. For a 250-question SOA set that is
the bulk of the spend, and none of it is a judgment call.

Usage
-----
    # SOA: separate question and solution booklets (either may be omitted)
    python3 scripts/pdf_extract.py --exam p \\
        --questions sample-questions.pdf --solutions sample-solutions.pdf \\
        --out /tmp/exam-p-build

    # CAS: one combined booklet + examiner's report
    python3 scripts/pdf_extract.py --exam 5 --year 2019 --session Spring \\
        --pdf exam5-spring-2019.pdf --out /tmp/exam-5-build

Outputs, under `--out`:
    records.jsonl   one JSON object per question (see RECORD SCHEMA below)
    pages/*.png     rendered pages, only for questions with no text layer
                    (pass --ocr to read those locally instead, if tesseract
                    is installed)
    report.md       coverage + what still needs a model, with a token estimate

RECORD SCHEMA
    num            int    question number as printed
    id             str    the bank id (`p-004`, `cas5-2019-q2`)
    bank           str    target directory under questions/
    type           str    multiple-choice | multi-part
    body           str    prompt markdown (exhibits already GFM tables)
    options        dict   {"A": "...", ...} for multiple choice
    answer         str    answer letter, from the solutions PDF
    points         float  total point value
    parts          list   [{label, points, samples, report}] for CAS
    solution       str    publisher's worked solution, normalised
    pages          dict   {"question": [...], "solution": [...]} 1-indexed
    needs_vision   bool   the prompt has no text layer — render and transcribe
    ocr            bool   the prompt came from local OCR, so spot-check it
    warnings       list   anything the extractor could not resolve
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import sys
from dataclasses import dataclass, field, asdict
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mdmath  # noqa: E402

# ─── Tunables ─────────────────────────────────────────────────────────────────

# A page with fewer than this many extractable characters but with images on it
# is a scan: its prompt has to be transcribed by vision.
SCAN_TEXT_THRESHOLD = 80

# Rendering budget. Vision tokens run at roughly (w*h)/750, so a letter page at
# 150 dpi costs ~2.8k tokens. Typed-then-scanned exam text stays legible well
# below that, and trimming the white margin off saves another fifth.
DEFAULT_DPI = 110
PROBE_DPI = 36  # cheap pass used only to find the inked area
MARGIN_PT = 6.0

# A line repeated on at least this share of pages is running furniture.
FURNITURE_SHARE = 0.55

# One `review.md` line — an id, the question's imperative clause and five
# candidate topics — and the one-line answer to it. Measured across the banks
# at 34-51 tokens in; see `question_classify.review_sheet`.
REVIEW_TOKENS_IN = 45
REVIEW_TOKENS_OUT = 12


# ─── Page text ────────────────────────────────────────────────────────────────


@dataclass
class Page:
    number: int  # 1-indexed
    text: str
    blocks: list[tuple[float, float, str]] = field(default_factory=list)
    n_images: int = 0
    tables: list[str] = field(default_factory=list)
    ocred: bool = False

    @property
    def scanned(self) -> bool:
        return len(self.text.strip()) < SCAN_TEXT_THRESHOLD and self.n_images > 0


def _pymupdf():
    try:
        import pymupdf  # noqa: PLC0415
    except ImportError:  # pragma: no cover - exercised only without the dep
        try:
            import fitz as pymupdf  # noqa: PLC0415
        except ImportError:
            raise SystemExit(
                "PyMuPDF is required for PDF extraction: pip install pymupdf"
            )
    return pymupdf


def ocr_available() -> bool:
    """Whether a local Tesseract is on PATH for PyMuPDF to drive."""
    return bool(shutil.which("tesseract"))


def _ocr_page(page, dpi: int):
    """A text page recovered by local OCR, or None if OCR is unavailable."""
    try:
        return page.get_textpage_ocr(dpi=dpi, full=True)
    except Exception:  # pragma: no cover - depends on the local tesseract
        return None


def read_pages(path: str, want_tables: bool = True, ocr: bool = False) -> list[Page]:
    """Read a PDF into `Page` records, exhibits already rendered as GFM tables.

    Tables are located first and their blocks withheld from the prose, so an
    exhibit comes out as one markdown table in reading order instead of as a
    column-shuffled paragraph — the single most error-prone thing about hand
    transcription, done deterministically.

    With `ocr` set, a page that has no text layer is read by the local
    Tesseract instead of being left for vision. That is the difference between
    a scanned booklet costing page images and costing nothing, but OCR is
    fallible in a way a text layer is not: such pages are marked `ocr` in the
    record so the report can ask for a spot-check.
    """
    pymupdf = _pymupdf()
    doc = pymupdf.open(path)
    use_ocr = ocr and ocr_available()
    pages: list[Page] = []
    for index, page in enumerate(doc):
        raw_text = page.get_text()
        textpage = None
        ocred = False
        if use_ocr and len(raw_text.strip()) < SCAN_TEXT_THRESHOLD and page.get_images():
            textpage = _ocr_page(page, DEFAULT_DPI)
            if textpage is not None:
                raw_text = page.get_text(textpage=textpage)
                ocred = bool(raw_text.strip())

        tables: list[tuple[float, float, float, float, str]] = []
        if want_tables and not ocred:
            tables = _find_tables(page)
        table_boxes = [t[:4] for t in tables]

        blocks: list[tuple[float, float, str]] = []
        raw_blocks = (
            page.get_text("blocks", textpage=textpage, sort=True)
            if textpage is not None
            else page.get_text("blocks", sort=True)
        )
        for x0, y0, x1, y1, text, _no, kind in raw_blocks:
            if kind != 0 or not text.strip():
                continue
            if any(_overlaps((x0, y0, x1, y1), box) for box in table_boxes):
                continue
            blocks.append((y0, x0, text))
        for x0, y0, _x1, _y1, md in tables:
            blocks.append((y0, x0, "\x00TABLE\x00" + md))
        blocks.sort(key=lambda b: (round(b[0], 1), b[1]))

        pages.append(
            Page(
                number=index + 1,
                text=raw_text,
                blocks=blocks,
                n_images=len(page.get_images()),
                tables=[t[4] for t in tables],
                ocred=ocred,
            )
        )
    doc.close()
    return pages


def _overlaps(a: tuple[float, ...], b: tuple[float, ...]) -> bool:
    return not (a[2] <= b[0] or a[0] >= b[2] or a[3] <= b[1] or a[1] >= b[3])


def _find_tables(page) -> list[tuple[float, float, float, float, str]]:
    """Exhibits on a page, as (bbox…, markdown).

    Ruling lines are the reliable signal, so they are tried first. Exam
    exhibits are often set with whitespace alignment and no rules at all,
    which only the text strategy finds — used as a fallback so a ruled page
    is never re-read by the looser one.
    """
    for strategy in ("lines", "text"):
        try:
            found = list(page.find_tables(strategy=strategy))
        except Exception:  # pragma: no cover - the table finder is best-effort
            continue
        out = []
        for table in found:
            try:
                rows = table.extract()
            except Exception:  # pragma: no cover
                continue
            if strategy == "text" and not plausible_table(rows):
                continue
            md = rows_to_markdown(rows)
            if md:
                out.append((*table.bbox, md))
        if out:
            return out
    return []


NUMERIC_CELL_RE = re.compile(r"^[\s$(]*-?[\d,]+(?:\.\d+)?[)%\s]*$")
# A cell that is only a list marker: the "table" is an option list. The
# closing paren is required — a CAS exhibit's first column is very often bare
# policy labels A, B, C, and that is a real table.
MARKER_CELL_RE = re.compile(r"^\(?(?:[A-Ea-e]|[ivxIVX]+)\)$|^[-*\u2022]$")
# A cell that opens a numbered question: the "table" swallowed a question.
QUESTION_CELL_RE = re.compile(r"^\d{1,3}[.)]")


def plausible_table(rows: list[list[str | None]]) -> bool:
    """Whether whitespace-aligned rows are really an exhibit and not prose.

    The text strategy will happily read a paragraph as a one-column table and
    swallow the question with it, so a candidate has to look like an exam
    exhibit: several short-celled rows, more than one column, and at least one
    column that is numbers all the way down — which every exhibit has and no
    paragraph does.
    """
    grid = [[(cell or "").strip() for cell in row] for row in rows]
    grid = [row for row in grid if any(row)]
    if len(grid) < 3 or max(len(row) for row in grid) < 2:
        return False
    if any(QUESTION_CELL_RE.match(cell) for cell in grid[0] if cell):
        return False
    first_cells = [row[0] for row in grid[1:] if row and row[0]]
    if first_cells and sum(1 for c in first_cells if MARKER_CELL_RE.match(c)) >= 0.4 * len(first_cells):
        return False
    cells = [cell for row in grid for cell in row if cell]
    if not cells or sum(1 for c in cells if len(c) <= 25) < 0.6 * len(cells):
        return False
    width = max(len(row) for row in grid)
    body = [row + [""] * (width - len(row)) for row in grid[1:]]
    for col in range(width):
        column = [row[col] for row in body if row[col]]
        if len(column) >= 2 and all(NUMERIC_CELL_RE.match(c) for c in column):
            return True
    return False


def rows_to_markdown(rows: list[list[str | None]]) -> str:
    """Render extracted table rows as a GitHub-flavored markdown table."""
    cleaned = [
        [re.sub(r"\s+", " ", (cell or "").strip()) for cell in row] for row in rows
    ]
    cleaned = [row for row in cleaned if any(row)]
    if len(cleaned) < 2:
        return ""
    width = max(len(row) for row in cleaned)
    cleaned = [row + [""] * (width - len(row)) for row in cleaned]
    header, *body = cleaned
    if not any(header):
        header = [f"Column {i + 1}" for i in range(width)]
    lines = [
        "| " + " | ".join(header) + " |",
        "|" + "|".join("---" for _ in range(width)) + "|",
    ]
    lines += ["| " + " | ".join(row) + " |" for row in body]
    return "\n".join(lines)


# ─── Running furniture ────────────────────────────────────────────────────────


# A page-number line: the digits are the whole content, so its shape repeats
# even though no two pages print the same thing.
PAGE_NUMBER_RE = re.compile(r"(?i)^(?:page\s*)?#+(?:\s*(?:of|/)\s*#+)?\.?$")
# Words a running header needs before a repeated *shape* counts as furniture.
FURNITURE_MIN_LETTERS = 10


def furniture_lines(pages: list[Page]) -> set[str]:
    """Lines repeated across most pages: headers, footers, page numbers.

    Page numbers differ per page, so lines are grouped by shape — their digits
    blanked — and the concrete lines sharing a repeated shape are returned.

    A shape only counts as furniture if it carries real words or reads as a
    page number. Without that rule an answer option (`(C) 41` on one page,
    `(C) 24` on the next) shares a shape with its neighbour and the options get
    stripped out of the questions.
    """
    from collections import defaultdict

    shapes: dict[str, set[str]] = defaultdict(set)
    per_page: dict[str, set[int]] = defaultdict(set)
    for page in pages:
        for raw in page.text.splitlines():
            line = raw.strip()
            if not line or len(line) > 90:
                continue
            shape = re.sub(r"\d+", "#", line)
            shapes[shape].add(line)
            per_page[shape].add(page.number)

    threshold = max(2, int(len(pages) * FURNITURE_SHARE))
    drop: set[str] = set()
    for shape, concrete in shapes.items():
        if len(per_page[shape]) < threshold:
            continue
        letters = sum(1 for ch in shape if ch.isalpha())
        if letters >= FURNITURE_MIN_LETTERS or PAGE_NUMBER_RE.match(shape):
            drop |= concrete
    return drop


# ─── Prose reflow ─────────────────────────────────────────────────────────────

LIST_START_RE = re.compile(r"^\s*(?:\(?[ivxIVX]+\)|\(?[A-Ea-e]\)|[-*•]|\d+[.)])\s")
DEHYPHEN_RE = re.compile(r"([a-z])-\n([a-z])")
# Lines that carry document structure. A publisher's section markers are what
# the segmenters key on, so they are never folded into the line above. The
# all-caps heading test has to stay case-sensitive — under IGNORECASE it would
# match any word at all.
CAPS_HEADING_RE = re.compile(r"^\s*[A-Z][A-Z0-9 '(),./-]{4,}$")
MARKER_RE = re.compile(
    r"^\s*(?:Part\s+[a-h]\b|Sample\s+\d+\b|Solution\s*[:#]"
    r"|Question\s*#?\s*\d+\b|Page\s+\d+\b)",
    re.IGNORECASE,
)


def is_structural(line: str) -> bool:
    return bool(CAPS_HEADING_RE.match(line) or MARKER_RE.match(line))
# Sentence-final punctuation: the line below starts a new one, not a wrap.
TERMINAL_RE = re.compile(r"""[.:;!?]['")\]]?$""")


def reflow_block(text: str) -> str:
    """Join a PDF block's visual lines into paragraph text.

    A block is one paragraph as the PDF laid it out, so its internal newlines
    are soft wraps — but only where the line above actually runs on. A line is
    kept on its own whenever the one above it ended a sentence, or it opens a
    list item or a structural marker (`Part a:`, `Sample 1`, `SAMPLE ANSWERS`),
    because those markers are what the segmenters read.

    Being conservative costs nothing on screen: a single newline inside a
    markdown paragraph renders as a space either way.
    """
    text = DEHYPHEN_RE.sub(r"\1\2", text)
    out: list[str] = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        runs_on = (
            out
            and not LIST_START_RE.match(line)
            and not is_structural(line)
            and not is_structural(out[-1])
            and not TERMINAL_RE.search(out[-1])
        )
        if runs_on:
            out[-1] = f"{out[-1]} {line}"
        else:
            out.append(line)
    return "\n".join(out)


# Two or more spaces: a column gap in space-aligned text.
COLUMN_GAP_RE = re.compile(r"\s{2,}")
MIN_COLUMNAR_ROWS = 3


def columnar_table(lines: list[str]) -> str | None:
    """A markdown table from space-aligned lines, or None if they are prose.

    PyMuPDF's table finder needs ruling lines or a clean column geometry, and
    plenty of exam exhibits have neither — they arrive as one text block whose
    lines happen to line up. Splitting on runs of two or more spaces recovers
    them, under the same plausibility test a detected table has to pass.
    """
    rows = [COLUMN_GAP_RE.split(line.strip()) for line in lines if line.strip()]
    if len(rows) < MIN_COLUMNAR_ROWS:
        return None
    widths = {len(row) for row in rows}
    if len(widths) != 1 or widths.pop() < 2:
        return None
    if not plausible_table(rows):
        return None
    return rows_to_markdown(rows)


def split_columnar(lines: list[str]) -> list[tuple[str, str]]:
    """Split a block's lines into `("prose"|"table", text)` segments.

    The longest run of aligned lines starting at each position wins, so an
    exhibit is taken whole rather than in pieces, and the prose around it stays
    in runs long enough for `reflow_block` to rejoin its wrapped lines.
    """
    out: list[tuple[str, str]] = []
    prose: list[str] = []
    i = 0

    def flush() -> None:
        if prose:
            out.append(("prose", "\n".join(prose)))
            prose.clear()

    while i < len(lines):
        table = None
        end = len(lines)
        while end >= i + MIN_COLUMNAR_ROWS:
            table = columnar_table(lines[i:end])
            if table:
                break
            end -= 1
        if table:
            flush()
            out.append(("table", table))
            i = end
        else:
            prose.append(lines[i])
            i += 1
    flush()
    return out


def page_markdown(page: Page, drop: set[str]) -> str:
    """A page's prose and exhibits as markdown, furniture removed."""
    chunks: list[str] = []
    for _y, _x, raw in page.blocks:
        if raw.startswith("\x00TABLE\x00"):
            chunks.append(raw[len("\x00TABLE\x00") :])
            continue
        kept = [ln for ln in raw.splitlines() if ln.strip() not in drop]
        for kind, piece in split_columnar(kept):
            body = piece if kind == "table" else reflow_block(piece)
            if body.strip():
                chunks.append(body)
    return "\n\n".join(chunks)


# ─── Question segmentation ────────────────────────────────────────────────────

# Candidate shapes a numbered question start takes across publishers. The best
# one is chosen by score, so a new PDF layout does not need code changes.
QUESTION_PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    ("N.", re.compile(r"(?m)^[ \t]*(\d{1,3})\.[ \t]+(?=\S)")),
    ("N)", re.compile(r"(?m)^[ \t]*(\d{1,3})\)[ \t]+(?=\S)")),
    ("Question N", re.compile(r"(?mi)^[ \t]*question[ \t]*#?[ \t]*(\d{1,3})\b[.:]?")),
    ("QUESTION N", re.compile(r"(?m)^[ \t]*QUESTION[ \t]+(\d{1,3})\b")),
    ("**N.**", re.compile(r"(?m)^[ \t]*\*\*(\d{1,3})\.?\*\*[ \t]*")),
]

OPTION_RE = re.compile(r"(?m)^[ \t]*\(?([A-E])\)[ \t]*(.*)$")
INLINE_OPTION_RE = re.compile(r"\(([A-E])\)[ \t]*")


@dataclass
class Boundary:
    num: int
    start: int
    end: int


def score_pattern(matches: list[tuple[int, int]]) -> float:
    """How much a candidate pattern looks like a question sequence.

    Rewards a long run of numbers that step by one; a pattern that fires on
    every numbered list item inside the questions scores badly because its
    numbers restart.
    """
    if len(matches) == 1:
        # A one-question document still segments, but only just: any pattern
        # with a real sequence behind it outscores it.
        return 0.5
    if not matches:
        return 0.0
    nums = [n for n, _ in matches]
    steps = sum(1 for a, b in zip(nums, nums[1:]) if b == a + 1)
    return steps / (len(nums) - 1) * len(nums)


def segment(text: str, pattern: re.Pattern[str] | None = None) -> list[Boundary]:
    """Split a document's text into per-question spans.

    With no pattern given, every candidate in `QUESTION_PATTERNS` is tried and
    the best-scoring one wins. Out-of-sequence hits (a `(3.)` inside a table,
    say) are dropped so the surviving numbers only ever increase.
    """
    if pattern is None:
        best, best_score = None, 0.0
        for _name, candidate in QUESTION_PATTERNS:
            hits = [(int(m.group(1)), m.start()) for m in candidate.finditer(text)]
            score = score_pattern(hits)
            if score > best_score:
                best, best_score = candidate, score
        if best is None:
            return []
        pattern = best

    hits = [(int(m.group(1)), m.start(), m.end()) for m in pattern.finditer(text)]
    kept: list[tuple[int, int, int]] = []
    for num, start, end in hits:
        if kept and num <= kept[-1][0]:
            continue
        kept.append((num, start, end))

    bounds: list[Boundary] = []
    for i, (num, _start, end) in enumerate(kept):
        stop = kept[i + 1][1] if i + 1 < len(kept) else len(text)
        bounds.append(Boundary(num=num, start=end, end=stop))
    return bounds


def split_options(body: str) -> tuple[str, dict[str, str]]:
    """Peel the lettered options off the end of a multiple-choice prompt."""
    matches = list(OPTION_RE.finditer(body))
    letters = [m.group(1) for m in matches]
    if letters[:2] != ["A", "B"]:
        # Some booklets set the options on one line: `(A) 24 (B) 36 …`.
        inline = list(INLINE_OPTION_RE.finditer(body))
        if [m.group(1) for m in inline][:2] == ["A", "B"]:
            options: dict[str, str] = {}
            for i, m in enumerate(inline):
                stop = inline[i + 1].start() if i + 1 < len(inline) else len(body)
                options[m.group(1)] = body[m.end() : stop].strip().rstrip(",;")
            return body[: inline[0].start()].strip(), options
        return body.strip(), {}

    options = {}
    for i, m in enumerate(matches):
        stop = matches[i + 1].start() if i + 1 < len(matches) else len(body)
        options[m.group(1)] = re.sub(r"\s+", " ", body[m.end(1) + 1 : stop]).strip(" )\n")
    return body[: matches[0].start()].strip(), options


# ─── Answer keys ──────────────────────────────────────────────────────────────

ANSWER_PATTERNS = [
    re.compile(r"(?mi)^[ \t]*(?:question[ \t]*#?[ \t]*)?(\d{1,3})[.):]?[ \t]*"
               r"(?:solution|answer)[ \t]*[:=-]?[ \t]*\(?([A-E])\)?\b"),
    re.compile(r"(?mi)^[ \t]*(\d{1,3})[ \t]+([A-E])[ \t]*$"),
    re.compile(r"(?mi)\bquestion[ \t]*#?[ \t]*(\d{1,3})\b[^A-E\n]{0,40}?"
               r"answer[ \t]*[:=-][ \t]*\(?([A-E])\)?"),
]


def answer_key(text: str) -> dict[int, str]:
    """Best-effort question → answer-letter map from a solutions document."""
    best: dict[int, str] = {}
    for pattern in ANSWER_PATTERNS:
        found: dict[int, str] = {}
        for m in pattern.finditer(text):
            found.setdefault(int(m.group(1)), m.group(2).upper())
        if len(found) > len(best):
            best = found
    return best


SOLUTION_ANSWER_RE = re.compile(r"(?i)\b(?:solution|answer)[ \t]*[:=-]?[ \t]*\(?([A-E])\)?\b")


def strip_solution_header(text: str) -> tuple[str, str | None]:
    """Remove a leading `Solution: C` line, returning the letter it carried."""
    m = SOLUTION_ANSWER_RE.search(text[:120])
    if not m:
        return text.strip(), None
    return (text[: m.start()] + text[m.end() :]).strip(), m.group(1).upper()


# ─── CAS examiner's report ────────────────────────────────────────────────────

CAS_QUESTION_RE = re.compile(r"(?m)^[ \t]*QUESTION[ \t]+(\d{1,3})\b")
CAS_POINTS_RE = re.compile(r"(?i)TOTAL POINT VALUE[ \t]*[:=]?[ \t]*([\d.]+)")
CAS_LO_RE = re.compile(r"(?i)LEARNING OBJECTIVE\(?S?\)?[ \t]*[:=]?[ \t]*(.+)")
CAS_PART_RE = re.compile(r"(?mi)^[ \t]*Part[ \t]+([a-h])[ \t]*[:.]?[ \t]*"
                         r"(?:([\d.]+)[ \t]*points?)?[ \t]*")
CAS_SAMPLE_RE = re.compile(r"(?mi)^[ \t]*SAMPLE ANSWERS?\b")
CAS_REPORT_RE = re.compile(r"(?mi)^[ \t]*EXAMINER'?S? REPORT\b")


# `a. (0.25 points) Calculate …` — how the booklet introduces each sub-part.
CAS_PROMPT_PART_RE = re.compile(
    r"(?m)^[ \t]*([a-h])[.)][ \t]*\(([\d.]+)[ \t]*points?\)[ \t]*"
)


@dataclass
class CasPart:
    label: str
    points: float | None = None
    samples: list[str] = field(default_factory=list)
    report: str = ""


def split_part_prompts(body: str) -> tuple[str, dict[str, dict]]:
    """Split a CAS question's stem from its lettered sub-prompts.

    The stem (the "Given the following:" narrative and its exhibits) stays with
    the question; each `a. (0.25 points)` prompt belongs under its own
    `## Part a` heading, which is where the target format puts it.
    """
    matches = list(CAS_PROMPT_PART_RE.finditer(body))
    kept: list[re.Match[str]] = []
    for m in matches:
        if kept and m.group(1) <= kept[-1].group(1):
            continue  # a lettered line further down the page, not the next part
        kept.append(m)
    if not kept:
        return _strip_total_points(body), {}

    prompts: dict[str, dict] = {}
    for i, m in enumerate(kept):
        stop = kept[i + 1].start() if i + 1 < len(kept) else len(body)
        prompts[m.group(1)] = {
            "points": float(m.group(2)),
            "prompt": body[m.end() : stop].strip(),
        }
    return _strip_total_points(body[: kept[0].start()]), prompts


# `1. (2.5 points)` — the question's own total, already in frontmatter.
TOTAL_POINTS_RE = re.compile(r"^\s*\(\s*[\d.]+\s*points?\s*\)\s*", re.IGNORECASE)


def _strip_total_points(stem: str) -> str:
    return TOTAL_POINTS_RE.sub("", stem.strip()).strip()


def parse_cas_question(text: str) -> dict:
    """Pull points, learning objectives, samples and commentary out of one
    `QUESTION N` section of a CAS examiner's report."""
    points = CAS_POINTS_RE.search(text)
    lo = CAS_LO_RE.search(text)

    sample_at = CAS_SAMPLE_RE.search(text)
    report_at = CAS_REPORT_RE.search(text)
    samples_block = text[sample_at.end() : report_at.start() if report_at else len(text)] if sample_at else ""
    report_block = text[report_at.end() :] if report_at else ""

    parts: dict[str, CasPart] = {}
    for label, points_text, chunk in _split_parts(samples_block):
        part = parts.setdefault(label, CasPart(label=label))
        if points_text:
            part.points = float(points_text)
        part.samples = _split_samples(chunk)
    for label, _points_text, chunk in _split_parts(report_block):
        part = parts.setdefault(label, CasPart(label=label))
        part.report = chunk.strip()

    overall = report_block
    first_part = CAS_PART_RE.search(report_block)
    if first_part:
        overall = report_block[: first_part.start()]

    return {
        "points": float(points.group(1)) if points else None,
        "learning_objective_codes": lo.group(1).strip() if lo else "",
        "examiner_report": overall.strip(),
        "parts": [asdict(parts[k]) for k in sorted(parts)],
    }


def _split_parts(block: str) -> list[tuple[str, str | None, str]]:
    matches = list(CAS_PART_RE.finditer(block))
    out = []
    for i, m in enumerate(matches):
        stop = matches[i + 1].start() if i + 1 < len(matches) else len(block)
        out.append((m.group(1).lower(), m.group(2), block[m.end() : stop]))
    return out


def _split_samples(chunk: str) -> list[str]:
    pieces = re.split(r"(?mi)^[ \t]*Sample[ \t]+\d+[ \t]*:?[ \t]*$", chunk)
    return [p.strip() for p in pieces if len(p.strip()) > 2]


# ─── Page rendering (vision, only where unavoidable) ──────────────────────────


def render_page(doc, index: int, out_path: Path, dpi: int = DEFAULT_DPI) -> tuple[int, int]:
    """Render one page to greyscale PNG, cropped to the inked area.

    A cheap probe render finds the content box first, so the white margin —
    about a fifth of a letter page's pixels, and a fifth of its vision tokens —
    is never sent.
    """
    pymupdf = _pymupdf()
    page = doc[index]
    clip = _ink_box(page, pymupdf)
    pix = page.get_pixmap(
        dpi=dpi, clip=clip, colorspace=pymupdf.csGRAY
    )
    pix.save(out_path)
    return pix.width, pix.height


def _ink_box(page, pymupdf):
    probe = page.get_pixmap(dpi=PROBE_DPI, colorspace=pymupdf.csGRAY)
    data = probe.samples
    stride, width, height = probe.stride, probe.width, probe.height
    top, bottom, left, right = height, -1, width, -1
    for y in range(height):
        row = data[y * stride : y * stride + width]
        dark = [x for x, v in enumerate(row) if v < 200]
        if not dark:
            continue
        top = min(top, y)
        bottom = max(bottom, y)
        left = min(left, dark[0])
        right = max(right, dark[-1])
    if bottom < 0:
        return page.rect
    scale = 72.0 / PROBE_DPI
    box = pymupdf.Rect(
        page.rect.x0 + left * scale - MARGIN_PT,
        page.rect.y0 + top * scale - MARGIN_PT,
        page.rect.x0 + (right + 1) * scale + MARGIN_PT,
        page.rect.y0 + (bottom + 1) * scale + MARGIN_PT,
    )
    return box & page.rect


# ─── Record assembly ──────────────────────────────────────────────────────────


def soa_records(
    exam: str,
    question_pages: list[Page],
    solution_pages: list[Page],
    furniture: set[str] | None = None,
) -> list[dict]:
    """Build records for an SOA-style multiple-choice set."""
    prefix = SOA_PREFIX.get(exam, exam)
    q_text, q_index = _joined(question_pages, furniture)
    s_text, s_index = _joined(solution_pages, furniture)

    key = answer_key(s_text)
    sol_bounds = {b.num: b for b in segment(s_text)} if s_text else {}

    records: list[dict] = []
    for bound in segment(q_text):
        raw = q_text[bound.start : bound.end]
        prompt, options = split_options(raw)
        pages = sorted({q_index[i] for i in range(bound.start, min(bound.end, len(q_index)))})
        scanned = [p for p in pages if question_pages[p - 1].scanned]
        ocred = [p for p in pages if question_pages[p - 1].ocred]

        solution = ""
        sol_pages: list[int] = []
        letter = key.get(bound.num)
        if bound.num in sol_bounds:
            sb = sol_bounds[bound.num]
            solution, inline = strip_solution_header(s_text[sb.start : sb.end])
            letter = letter or inline
            sol_pages = sorted({s_index[i] for i in range(sb.start, min(sb.end, len(s_index)))})

        warnings = []
        if not options:
            warnings.append("no A-E options found")
        if not letter:
            warnings.append("no answer letter found")
        if not solution:
            warnings.append("no worked solution found")
        if ocred:
            warnings.append(f"prompt read by OCR (page {_ranges(ocred)}) — spot-check it")

        records.append(
            {
                "num": bound.num,
                "id": f"{prefix}-{bound.num:03d}",
                "bank": SOA_BANK.get(exam, f"exam-{exam}"),
                "type": "multiple-choice",
                "body": mdmath.normalize_markdown(prompt).strip(),
                "options": {k: mdmath.normalize_chars(v) for k, v in options.items()},
                "answer": letter,
                "points": 1,
                "parts": [],
                "solution": mdmath.normalize_markdown(solution).strip(),
                "pages": {"question": pages, "solution": sol_pages},
                "needs_vision": bool(scanned),
                "ocr": bool(ocred),
                "warnings": warnings,
            }
        )
    return records


def cas_records(
    exam: str,
    year: int,
    session: str | None,
    booklet_pages: list[Page],
    report_pages: list[Page],
    furniture: set[str] | None = None,
) -> list[dict]:
    """Build records for a CAS essay/calculation exam."""
    b_text, b_index = _joined(booklet_pages, furniture)
    r_text, r_index = _joined(report_pages, furniture)

    prompts = {b.num: b for b in segment(b_text)} if b_text.strip() else {}
    suffix = ""
    if session:
        suffix = "s" if session.lower().startswith("sp") else "f"

    records: list[dict] = []
    for bound in segment(r_text, CAS_QUESTION_RE):
        parsed = parse_cas_question(r_text[bound.start : bound.end])
        body, pages, needs_vision = "", [], False
        if bound.num in prompts:
            pb = prompts[bound.num]
            body = mdmath.normalize_markdown(b_text[pb.start : pb.end]).strip()
            pages = sorted({b_index[i] for i in range(pb.start, min(pb.end, len(b_index)))})
            body = _attach_part_prompts(body, parsed["parts"])
            ocred = sorted({p for p in pages if booklet_pages[p - 1].ocred})
        else:
            ocred = []
            pages = [p.number for p in booklet_pages if p.scanned]
            needs_vision = bool(pages)

        warnings = []
        if not body and not needs_vision:
            warnings.append("no prompt text found in the booklet")
        if ocred:
            warnings.append(f"prompt read by OCR (page {_ranges(ocred)}) — spot-check it")
        part_points = [p["points"] for p in parsed["parts"]]
        if parsed["points"] and all(pp is not None for pp in part_points) and part_points:
            if abs(sum(part_points) - parsed["points"]) > 0.01:
                warnings.append(
                    f"part points {sum(part_points)} != TOTAL POINT VALUE {parsed['points']}"
                )

        records.append(
            {
                "num": bound.num,
                "id": f"cas{exam}-{year}{suffix}-q{bound.num}",
                "bank": f"exam-{exam}",
                "type": "multi-part",
                "body": body,
                "options": {},
                "answer": None,
                "points": parsed["points"],
                "year": year,
                "session": session,
                "parts": parsed["parts"],
                "solution": "",
                "examiner_report": parsed["examiner_report"],
                "learning_objective_codes": parsed["learning_objective_codes"],
                "pages": {
                    "question": pages,
                    "solution": sorted(
                        {r_index[i] for i in range(bound.start, min(bound.end, len(r_index)))}
                    ),
                },
                "needs_vision": needs_vision,
                "ocr": bool(ocred),
                "warnings": warnings,
            }
        )
    return records


def _attach_part_prompts(body: str, parts: list[dict]) -> str:
    """Move the booklet's lettered sub-prompts onto the report's parts.

    Returns the question stem. A part the booklet prices but the report never
    mentions is appended, so the file still carries every prompt the candidate
    was given.
    """
    stem, prompts = split_part_prompts(body)
    if not prompts:
        return body
    by_label = {part["label"]: part for part in parts}
    for label, found in prompts.items():
        part = by_label.get(label)
        if part is None:
            part = {"label": label, "points": found["points"], "samples": [], "report": ""}
            parts.append(part)
            by_label[label] = part
        part["prompt"] = found["prompt"]
        if part.get("points") is None:
            part["points"] = found["points"]
    parts.sort(key=lambda p: p["label"])
    return stem


SOA_PREFIX = {"p": "p", "fm": "fm", "mas-i": "mas1", "mas-ii": "mas2"}
SOA_BANK = {"p": "exam-p", "fm": "exam-fm", "mas-i": "exam-mas-i", "mas-ii": "exam-mas-ii"}


def _joined(pages: list[Page], furniture: set[str] | None = None) -> tuple[str, list[int]]:
    """Concatenate page markdown, plus a char-index → page-number map."""
    drop = furniture if furniture is not None else (furniture_lines(pages) if pages else set())
    chunks: list[str] = []
    index: list[int] = []
    for page in pages:
        md = page_markdown(page, drop)
        piece = md + "\n\n"
        chunks.append(piece)
        index.extend([page.number] * len(piece))
    return "".join(chunks), index


# ─── Reporting ────────────────────────────────────────────────────────────────


def token_estimate(records: list[dict], dpi: int = DEFAULT_DPI) -> dict[str, int]:
    """Model-token cost of this conversion, and of the workflow it replaces.

    Three rows, because they answer different questions:

    * `baseline` — transcribe by hand: the prompt, options and solution read
      into context (or the page image, for a scan) and the whole file typed
      back out. This is the floor of the workflow this pipeline replaces, not
      its real cost — that ran a tool call per question, so the batch context
      was re-sent every turn.
    * `residual` — what stage 1 leaves: page images for prompts with no text
      layer, and nothing else, because the prompt, the options, the answer and
      the solution are already in the record.
    * `review` — the topic decision stage 2 cannot make for you, at the
      measured cost of one `review.md` line per question. Counted for every
      question, since most of them need it.
    * `rewrite` — the extra if *every* explanation were rewritten rather than
      taken from the publisher. An upper bound; in practice only a minority
      read badly enough to need it.
    """
    def chars(value) -> int:
        return len(value or "")

    # A greyscale page cropped to its inked area, at `dpi`: vision tokens run
    # at about (w*h)/750, and the crop saves roughly a fifth of a letter page.
    per_page = int((8.5 * dpi) * (11 * dpi) * 0.8 / 750)
    est = dict.fromkeys(
        ("baseline_in", "baseline_out", "residual_in", "residual_out",
         "review_in", "review_out", "rewrite_in", "rewrite_out"),
        0,
    )

    for rec in records:
        solution = chars(rec.get("solution")) + sum(
            chars(s) for part in rec.get("parts") or [] for s in part.get("samples") or []
        )
        content = (
            chars(rec.get("body"))
            + sum(map(chars, (rec.get("options") or {}).values()))
            + solution
            + chars(rec.get("examiner_report"))
        )
        n_pages = len(rec.get("pages", {}).get("question") or [])

        if rec.get("needs_vision"):
            est["baseline_in"] += n_pages * 2805 + solution // 4  # 150-dpi colour page
            est["residual_in"] += n_pages * per_page
            est["residual_out"] += 220
        else:
            est["baseline_in"] += content // 4
        est["baseline_out"] += max(content // 4, 200)
        est["review_in"] += REVIEW_TOKENS_IN
        est["review_out"] += REVIEW_TOKENS_OUT
        est["rewrite_in"] += solution // 4
        est["rewrite_out"] += max(solution // 4, 120)

    return est


def write_report(path: Path, records: list[dict], dpi: int) -> str:
    have_answer = sum(1 for r in records if r.get("answer"))
    have_solution = sum(1 for r in records if r.get("solution") or r.get("parts"))
    vision = [r["num"] for r in records if r["needs_vision"]]
    ocred = [r["num"] for r in records if r.get("ocr")]
    flagged = [r for r in records if r["warnings"]]
    est = token_estimate(records, dpi)

    lines = [
        "# Extraction report",
        "",
        f"- questions segmented: **{len(records)}**",
        f"- with an answer letter: **{have_answer}**",
        f"- with a publisher solution: **{have_solution}**",
        f"- needing vision transcription: **{len(vision)}**"
        + (f" (questions {_ranges(vision)})" if vision else ""),
        f"- read by OCR (spot-check these): **{len(ocred)}**"
        + (f" (questions {_ranges(ocred)})" if ocred else ""),
        f"- flagged with warnings: **{len(flagged)}**",
        "",
        "## Token estimate",
        "",
        "| | input | output |",
        "|---|---|---|",
        f"| transcribe-by-hand baseline | {est['baseline_in']:,} | {est['baseline_out']:,} |",
        f"| left after this stage (vision only) | {est['residual_in']:,} "
        f"| {est['residual_out']:,} |",
        f"| + the topic review sheet | {est['residual_in'] + est['review_in']:,} "
        f"| {est['residual_out'] + est['review_out']:,} |",
        f"| + if every explanation were rewritten | "
        f"{est['residual_in'] + est['review_in'] + est['rewrite_in']:,} | "
        f"{est['residual_out'] + est['review_out'] + est['rewrite_out']:,} |",
        "",
    ]
    if flagged:
        lines += ["## Warnings", ""]
        for rec in flagged:
            lines.append(f"- **Q{rec['num']}** ({rec['id']}): " + "; ".join(rec["warnings"]))
        lines.append("")
    report = "\n".join(lines)
    path.write_text(report, encoding="utf-8")
    return report


def _ranges(nums: list[int]) -> str:
    if not nums:
        return ""
    out, start, prev = [], nums[0], nums[0]
    for n in nums[1:] + [None]:
        if n != prev + 1:
            out.append(str(start) if start == prev else f"{start}-{prev}")
            start = n
        prev = n if n is not None else prev
    return ", ".join(out)


# ─── CLI ──────────────────────────────────────────────────────────────────────


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    ap.add_argument("--exam", required=True, help="p | fm | mas-i | 5 | 6 | 7 …")
    ap.add_argument("--questions", help="question booklet PDF")
    ap.add_argument("--solutions", help="solutions / examiner's report PDF")
    ap.add_argument("--pdf", help="one combined PDF (CAS booklet + report)")
    ap.add_argument("--out", required=True, help="output directory")
    ap.add_argument("--year", type=int, help="sitting year (CAS)")
    ap.add_argument("--session", help="Spring | Fall (CAS)")
    ap.add_argument("--dpi", type=int, default=DEFAULT_DPI)
    ap.add_argument("--no-tables", action="store_true", help="skip table detection")
    ap.add_argument("--no-render", action="store_true", help="skip page rendering")
    ap.add_argument("--ocr", action="store_true",
                    help="read pages with no text layer via local tesseract "
                         "instead of leaving them for vision")
    args = ap.parse_args(argv)

    out = Path(args.out)
    (out / "pages").mkdir(parents=True, exist_ok=True)
    want_tables = not args.no_tables
    cas = not re.fullmatch(r"p|fm|mas-i|mas-ii", args.exam.lower())

    if args.ocr and not ocr_available():
        print("--ocr asked for but tesseract is not on PATH; "
              "scanned pages will be rendered for vision instead", file=sys.stderr)

    if args.pdf:
        pages = read_pages(args.pdf, want_tables, args.ocr)
        split = _split_combined(pages)
        booklet, report = pages[:split], pages[split:]
        sources = {"question": args.pdf, "solution": args.pdf}
        offsets = {"question": 0, "solution": split}
        # One document: its running headers repeat across both halves, so they
        # are found over all the pages rather than within each half.
        furniture = furniture_lines(pages)
    else:
        booklet = read_pages(args.questions, want_tables, args.ocr) if args.questions else []
        report = read_pages(args.solutions, want_tables, args.ocr) if args.solutions else []
        sources = {"question": args.questions, "solution": args.solutions}
        offsets = {"question": 0, "solution": 0}
        furniture = None  # two documents, each with its own furniture

    if cas:
        if not args.year:
            ap.error("--year is required for CAS exams (the sitting year)")
        records = cas_records(args.exam, args.year, args.session, booklet, report, furniture)
    else:
        records = soa_records(args.exam.lower(), booklet, report, furniture)

    if not records:
        print("no questions segmented — check the PDF layout", file=sys.stderr)
        return 1

    if not args.no_render:
        _render_needed(records, sources["question"], offsets["question"], out, args.dpi)

    with (out / "records.jsonl").open("w", encoding="utf-8") as fh:
        for rec in records:
            fh.write(json.dumps(rec, ensure_ascii=False) + "\n")

    print(write_report(out / "report.md", records, args.dpi))
    print(f"wrote {out / 'records.jsonl'}")
    return 0


def _split_combined(pages: list[Page]) -> int:
    """Index of the first examiner's-report page in a combined CAS PDF."""
    for page in pages:
        if re.search(r"(?i)sample answers and examiner", page.text):
            return page.number - 1
    for page in pages:
        if CAS_QUESTION_RE.search(page.text) and CAS_POINTS_RE.search(page.text):
            return page.number - 1
    return 0


def _render_needed(records, source, offset, out: Path, dpi: int) -> None:
    wanted = sorted({p for r in records if r["needs_vision"] for p in r["pages"]["question"]})
    if not wanted or not source:
        return
    pymupdf = _pymupdf()
    doc = pymupdf.open(source)
    for number in wanted:
        index = number - 1 + offset
        if 0 <= index < len(doc):
            render_page(doc, index, out / "pages" / f"page-{number:03d}.png", dpi)
    doc.close()
    print(f"rendered {len(wanted)} page(s) to {out / 'pages'}")


if __name__ == "__main__":
    raise SystemExit(main())
