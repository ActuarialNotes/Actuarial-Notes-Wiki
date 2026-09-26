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
import unicodedata
from collections import Counter
from collections.abc import Callable
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

# Local OCR is resolution-hungry and, unlike a render, costs nothing but CPU —
# so it is deliberately not the rendering budget. At 110 dpi Tesseract reads
# Exam 5 Spring 2016 as "Eamed", "Abenefit", "ofone" and loses a column of the
# exhibit; at 300 the same pages come back clean prose. Keep the two apart.
OCR_DPI = 300

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


def tessdata_dir() -> str | None:
    """Tesseract's language-data directory, or None if it cannot be found.

    PyMuPDF otherwise requires `TESSDATA_PREFIX` in the environment and raises
    without it, so the directory is located here and passed explicitly.
    """
    from glob import glob  # noqa: PLC0415

    env = os.environ.get("TESSDATA_PREFIX")
    if env and os.path.isdir(env):
        return env
    for pattern in (
        "/usr/share/tesseract-ocr/*/tessdata",
        "/usr/share/tessdata",
        "/usr/local/share/tessdata",
        "/opt/homebrew/share/tessdata",
    ):
        for found in sorted(glob(pattern), reverse=True):
            if os.path.isdir(found):
                return found
    return None


def ocr_available() -> bool:
    """Whether a local Tesseract is on PATH with language data to drive it."""
    return bool(shutil.which("tesseract")) and bool(tessdata_dir())


def _ocr_page(page, dpi: int):
    """A text page recovered by local OCR, or None if OCR is unavailable."""
    try:
        return page.get_textpage_ocr(dpi=dpi, full=True, tessdata=tessdata_dir())
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
        raw_text = mdmath.normalize_spaces(page.get_text())
        textpage = None
        ocred = False
        if use_ocr and len(raw_text.strip()) < SCAN_TEXT_THRESHOLD and page.get_images():
            textpage = _ocr_page(page, OCR_DPI)
            if textpage is not None:
                raw_text = mdmath.normalize_spaces(page.get_text(textpage=textpage))
                ocred = bool(raw_text.strip())

        tables: list[tuple[float, float, float, float, str]] = []
        if want_tables and not ocred:
            tables = _find_tables(page)

        blocks: list[tuple[float, float, str]] = []
        raw_blocks = (
            page.get_text("blocks", textpage=textpage, sort=True)
            if textpage is not None
            else page.get_text("blocks", sort=True)
        )
        for x0, y0, x1, y1, text, _no, kind in raw_blocks:
            if kind != 0 or not text.strip():
                continue
            # Every structural regex below keys on plain spaces; a text layer
            # set entirely in U+00A0 (Exam 5 Spring 2016) would match none.
            text = mdmath.normalize_spaces(text)
            if any(
                _overlaps((x0, y0, x1, y1), table[:4]) and _inside_table(text, table[4])
                for table in tables
            ):
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


# Share of a block's words that must appear in a table before the block counts
# as part of it.
INSIDE_TABLE_SHARE = 0.6


def _inside_table(text: str, table_md: str) -> bool:
    """Whether a block's text is really carried by the table it overlaps.

    A detected table's bounding box is routinely larger than the cells it
    extracted, so overlap alone is not enough: withholding on overlap silently
    drops whatever the table did not capture. On a CAS report page that lost
    the `QUESTION 5` heading, and with it the whole question. Compare the
    words instead, and keep any block the table cannot account for.
    """
    words = [w for w in re.findall(r"\w+", text) if len(w) > 2]
    if not words:
        return True
    haystack = table_md
    hits = sum(1 for word in words if word in haystack)
    return hits >= INSIDE_TABLE_SHARE * len(words)


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
            if swallows_structure(rows):
                continue
            if strategy == "text" and not plausible_table(rows):
                continue
            md = rows_to_markdown(rows)
            if md:
                out.append((*table.bbox, md))
        if out:
            return out
    return []


# The markers that carry a document's skeleton. A real CAS report page is full
# of ruled boxes, and PyMuPDF will read the whole page — headings included — as
# one table, which hides `QUESTION 1` inside a markdown cell where no segmenter
# can see it. A candidate holding any of these is a page, not an exhibit.
# Only the *section* headings. A sample answer's own table often sits right
# beside `Sample Answer 2` or `Part b:`, and rejecting on those threw away the
# very tables this is meant to preserve — the worked solutions came out as
# columns of bare numbers. What must never end up inside a table is the
# question's own scaffolding.
STRUCTURE_CELL_RE = re.compile(
    r"(?i)(?:^QUESTION[ \t]*[:#]?[ \t]*\d{1,3}\b|TOTAL POINT VALUE|LEARNING OBJECTIVE"
    r"|SAMPLE ANSWERS\b|EXAMINER'?.?S REPORT"
    # A report that boxes a question's sample answers puts `Part b: 0.5 point`
    # and `Sample 1` inside the box. Read as a table, those markers stop being
    # line-initial and the per-part parse loses every sample after the first.
    r"|^Part\s+[a-h]\b|^Sample\s+\d{1,2}\b)"
)


def swallows_structure(rows: list[list[str | None]]) -> bool:
    """Whether a table candidate has eaten the document's own headings."""
    return any(
        STRUCTURE_CELL_RE.search((cell or "").strip())
        for row in rows
        for cell in row
    )


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

    # A column empty in every row carries nothing. Hand-typed exhibits in a
    # CAS report routinely detect with several of them between the real ones,
    # which turns a three-column table into a twelve-column one.
    keep = [i for i in range(width) if any(row[i] for row in cleaned)]
    if not keep:
        return ""
    cleaned = [[row[i] for i in keep] for row in cleaned]
    width = len(keep)
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
        # A structural marker repeats on nearly every page by design —
        # `Sample Answer 1` heads an answer on most pages of a CAS report — and
        # dropping it as furniture silently merges everything it separated.
        # Repetition is what makes these markers useful, not what makes them
        # noise.
        if is_content_marker(next(iter(concrete))):
            continue
        letters = sum(1 for ch in shape if ch.isalpha())
        if letters >= FURNITURE_MIN_LETTERS or PAGE_NUMBER_RE.match(shape):
            drop |= concrete

    # OCR reads the same running header slightly differently on some pages —
    # `Exam MAS.-I Spring 2019` on eight pages of forty-five — and a variant
    # that never reaches the share threshold lands in the prompt. It has the
    # header's letters in the header's order, which prose never does.
    skeletons = {
        _skeleton(line) for line in drop if len(_skeleton(line)) >= FURNITURE_MIN_LETTERS
    }
    if skeletons:
        drop |= {
            line for concrete in shapes.values() for line in concrete
            if _skeleton(line) in skeletons
        }
    return drop


def _skeleton(line: str) -> str:
    """A line's letters alone, lower-cased: what OCR noise leaves unchanged."""
    return re.sub(r"[^a-z]", "", line.lower())


# ─── Prose reflow ─────────────────────────────────────────────────────────────

# `A.` and `II.` are list items too: the CAS MAS papers letter their options
# `A. I only` and number their statements `I.`/`II.`/`III.`, and reflowing one
# onto the next runs the whole option list into a single line.
LIST_START_RE = re.compile(
    r"^\s*(?:\(?[ivxIVX]+\)|[IVX]+\.|\(?[A-Ea-e]\)|[A-E]\.|[-*•]|\d+[.)])(?:\s|$)"
)
DEHYPHEN_RE = re.compile(r"([a-z])-\n([a-z])")
# A hyphen at a line break is usually the typesetter wrapping one word
# (`expo-\nsure`), and `DEHYPHEN_RE` closes it up. It is *not* when the
# fragment below carries a hyphen of its own: `age-\nto-age` is a compound
# broken at a real hyphen, and de-hyphenating it yields `ageto-age`. Closing
# the break first leaves nothing for `DEHYPHEN_RE` to match.
COMPOUND_WRAP_RE = re.compile(r"([a-z]-)\n(?=[a-z]+-)")
# Lines that carry document structure. A publisher's section markers are what
# the segmenters key on, so they are never folded into the line above. The
# all-caps heading test has to stay case-sensitive — under IGNORECASE it would
# match any word at all.
# The apostrophe may be typographic: a publisher setting EXAMINER'S REPORT with
# U+2019 still means it as a heading, and missing it folds the heading into the
# line above, which loses the split between sample answers and commentary.
CAPS_HEADING_RE = re.compile(r"^\s*[A-Z][A-Z0-9 '\u2018\u2019(),./-]{4,}$")
# The markers that separate one piece of content from the next. These repeat
# on nearly every page *by design*, so they are the one thing furniture
# detection must never eat — unlike a running header or a page number, which
# repeat for the opposite reason.
# The last two are the pre-2014 report's own headings (`Solution 2`,
# `Examiner Comment`): folded into the line below, the comment heading takes
# the first sentence of the commentary with it and the split never finds it.
CONTENT_MARKER_RE = re.compile(
    r"^\s*(?:Part\s+[a-h]\b|Sample(?:\s+Answer)?\s+\d+\b|Solution\s*[:#]"
    r"|Question\s*#?\s*\d+\b|Solution\s*\d+\s*$"
    "|Examiners?['’]?s?\\s+Comments?\\b)",
    re.IGNORECASE,
)
MARKER_RE = re.compile(
    CONTENT_MARKER_RE.pattern.rstrip(")") + r"|Page\s+\d+\b)", re.IGNORECASE
)


def is_content_marker(line: str) -> bool:
    """Whether a line separates content, rather than decorating the page."""
    return bool(CONTENT_MARKER_RE.match(line))


def is_structural(line: str) -> bool:
    return bool(CAPS_HEADING_RE.match(line) or MARKER_RE.match(line))
# Sentence-final punctuation: the line below starts a new one, not a wrap.
TERMINAL_RE = re.compile(r"""[.:;!?]['")\]]?$""")
# A line that ends on a number, a percentage or a closing brace is a finished
# calculation step — `AY 2013: (7,500 - 1,000) * 0.25 / 0.7 = 2,321`. Folding
# the next step into it runs a worked solution into one unreadable paragraph,
# and a CAS sample answer is nothing but such steps. A wrapped sentence that
# happens to end on a number is split instead, which markdown renders as a
# space, so the cost of being wrong here is nil and the cost of joining is the
# whole solution.
STEP_END_RE = re.compile(r"[0-9%\)\]}]$")


# A bullet glyph alone on its line. Word writes the bullet as its own run, so
# a PDF often extracts it separately from the text it introduces — including
# the Wingdings bullets that land in the private-use area.
LONE_BULLET_RE = re.compile(
    r"^\s*[-*\u2022\u00b7\u25aa\u25cf\u25e6\u2023\uf0a7\uf0b7\uf0d8\u00a9\u00b0]\s*$"
)


def merge_lone_bullets(lines: list[str]) -> list[str]:
    """Attach a bullet that sits on its own line to the text it introduces.

    Left alone, the bullet is just another line with no sentence-ending
    punctuation, so `reflow_block` folds it into its neighbour and then folds
    the next item in too — a whole list collapses onto one line.
    """
    out: list[str] = []
    pending = False
    for line in lines:
        if LONE_BULLET_RE.match(line):
            pending = True
            continue
        if pending and line.strip():
            out.append(f"- {line.strip()}")
            pending = False
        else:
            out.append(line)
    return out


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
    text = DEHYPHEN_RE.sub(r"\1\2", COMPOUND_WRAP_RE.sub(r"\1", text))
    out: list[str] = []
    for raw in merge_lone_bullets(text.splitlines()):
        line = raw.strip()
        if not line:
            continue
        runs_on = (
            out
            and not LIST_START_RE.match(line)
            and not is_structural(line)
            and not is_structural(out[-1])
            and not TERMINAL_RE.search(out[-1])
            and not STEP_END_RE.search(out[-1])
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


# A block that opens a new item rather than continuing a sentence: a lettered
# or numbered label (`f)`, `b.`, `(ii)`, `3.`), a bullet (including the `o`
# Word sets for a second-level bullet), or a table row.
NEW_ITEM_RE = re.compile(r"^\s*(?:\(?(?:[a-h]|[ivx]+)[.)]|[-*\u2022o]\s|\d+[.)]|\|)")
PROSE_WORD_RE = re.compile(r"[A-Za-z]{2,}")


def continues(prev: str, nxt: str) -> bool:
    """Whether `nxt` is the rest of a sentence `prev` broke off.

    A PDF ends a text block at a column or page edge as readily as at a
    paragraph, so a sentence can arrive as two blocks — `…the normalized
    residual using the results from` / `part a). A very common error…` — which
    the blank line between blocks turns into two paragraphs. Only prose on both
    sides is joined: the line above must be words that stop without sentence
    punctuation, and the line below must open on a lower-case word. A worked
    step (`= 50k` / `x = 1250k`) is never joined, and neither is a new item.
    """
    last = prev.rstrip().rsplit("\n", 1)[-1].strip()
    first = nxt.lstrip().split("\n", 1)[0].strip()
    # The line below may *look* structural — `part a) of the problem …` — but a
    # real heading is capitalised (`Part a`), and it must open lower-case here.
    if not last or not first or is_structural(last):
        return False
    if TERMINAL_RE.search(last) or STEP_END_RE.search(last) or NEW_ITEM_RE.match(first):
        return False
    if not re.match(r"[a-z]{2,}\b", first) or last.startswith("|"):
        return False
    return len(PROSE_WORD_RE.findall(last)) >= 3 and len(PROSE_WORD_RE.findall(first)) >= 2


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
            if not body.strip():
                continue
            if kind != "table" and chunks and continues(chunks[-1], body):
                chunks[-1] = f"{chunks[-1].rstrip()} {body.lstrip()}"
            else:
                chunks.append(body)
    return "\n\n".join(chunks)


# ─── Question segmentation ────────────────────────────────────────────────────

# Candidate shapes a numbered question start takes across publishers. The best
# one is chosen by score, so a new PDF layout does not need code changes.
QUESTION_PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    ("N.", re.compile(r"(?m)^[ \t]*(\d{1,3})\.[ \t]+(?=\S)")),
    ("N)", re.compile(r"(?m)^[ \t]*(\d{1,3})\)[ \t]+(?=\S)")),
    ("Question N", re.compile(r"(?mi)^[ \t]*question[ \t]*#?[ \t]*(\d{1,3})\b[.:]?")),
    ("QUESTION N", re.compile(r"(?m)^[ \t]*QUESTION[ \t]*[:#]?[ \t]*(\d{1,3})\b")),
    ("**N.**", re.compile(r"(?m)^[ \t]*\*\*(\d{1,3})\.?\*\*[ \t]*")),
    # A scanned CAS booklet OCRs `1.` alone on its line with the point value
    # below it; `N.` needs text after the dot, so it finds only the two-digit
    # questions set on one line (Exam 7 May 2012 placed 6 of 24). Keyed on the
    # point value that must follow, a stray `80.` in an exhibit cannot match.
    ("N. (points)", re.compile(
        r"(?m)^[ \t]*(\d{1,3})\.[ \t]*\n?[ \t]*(?=\(\s*[\d.]+\s*points?\s*\))"
    )),
]

# `(A) 24`, `A) 24`, `A. I only` (the CAS MAS papers) and `- A) 24` — the last
# being the bank's own shape, which is how a transcribed prompt in `--prompts`
# carries corrected options. The full-stop form needs a space after it, so
# `E.g.` at the start of a line is not option E.
# A scan can also set the letter alone on its line, `E.` over `At least 0.12`.
OPTION_RE = re.compile(
    r"(?m)^[ \t]*(?:[-*][ \t]+)?\(?([A-E])(?:\)[ \t]*|\.(?:[ \t]+|[ \t]*$))(.*)$"
)
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


# A question that runs past its page says so in print — MAS-II Fall 2019 sets
# `Question #20 continued on the next page.` at the foot of page 24.
CONTINUED_RE = re.compile(r"(?i)question\s*#?\s*\d{1,3}\s+continued\s+on\s+the\s+next\s+page")
# What OCR leaves of a question's own label on a scan: `1.` comes back as `ly`,
# `2.` as `23`, `32.` as `3)`. Never a real line of prompt, which is longer.
PAGE_LABEL_RE = re.compile(r"\s*\S{1,4}[ \t]*\n")


def page_bounds(
    text: str, index: list[int], pages: list[Page], expected: int
) -> list[Boundary]:
    """One question per page, for a scanned paper whose numbering OCR lost.

    The CAS MAS booklets start every question at the top of a page, and the
    number in its margin is exactly what OCR garbles (`1.` → `ly`, `2.` →
    `23`). The page is the more reliable unit: a question is a page, plus the
    next one wherever the page prints that the question continues. That is
    only trusted when it yields exactly the number of questions the answer key
    has — otherwise nothing is returned rather than a shifted numbering, which
    would file every prompt under its neighbour's answer.
    """
    groups: list[list[int]] = []
    current: list[int] = []
    for page in pages:
        current.append(page.number)
        if not CONTINUED_RE.search(page.text):
            groups.append(current)
            current = []
    if current:
        groups.append(current)
    if not expected or len(groups) != expected:
        return []

    first: dict[int, int] = {}
    last: dict[int, int] = {}
    for i, number in enumerate(index):
        first.setdefault(number, i)
        last[number] = i + 1
    bounds: list[Boundary] = []
    for num, group in enumerate(groups, 1):
        if group[0] not in first:
            return []
        start, end = first[group[0]], last[group[-1]]
        label = PAGE_LABEL_RE.match(text, start)
        if label and label.end() <= end:
            start = label.end()
        bounds.append(Boundary(num=num, start=start, end=end))
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
        # Sliced from after the delimiter, so there is nothing to strip but
        # space: stripping `)` as well cut the close off `…, or (D)`.
        options[m.group(1)] = re.sub(r"\s+", " ", body[m.start(2) : stop]).strip()
    return body[: matches[0].start()].strip(), options


# ─── Answer keys ──────────────────────────────────────────────────────────────

ANSWER_PATTERNS = [
    re.compile(r"(?mi)^[ \t]*(?:question[ \t]*#?[ \t]*)?(\d{1,3})[.):]?[ \t]*"
               r"(?:solution|answer)[ \t]*[:=-]?[ \t]*\(?([A-E])\)?\b"),
    re.compile(r"(?mi)^[ \t]*(\d{1,3})[ \t]+([A-E])[ \t]*$"),
    # The CAS MAS keys are a two-column table whose text layer reads a row at
    # a time, one cell to a line: `1` then `B`.
    re.compile(r"(?m)^[ \t]*(\d{1,3})[ \t]*\n[ \t]*([A-E])[ \t]*$"),
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


# A key row that accepts more than one letter: the CAS MAS keys print
# `28   B & E` where a question was found to have two defensible answers.
MULTI_ANSWER_RE = re.compile(
    r"(?m)^[ \t]*(\d{1,3})[ \t]*\n?[ \t]*([A-E](?:[ \t]*(?:&|,|/|and|or)[ \t]*[A-E])+)[ \t]*$"
)


def accepted_answers(text: str) -> dict[int, list[str]]:
    """Questions the key credits with more than one letter, and the letters.

    Transcribed as printed, in the key's own order. The first letter becomes
    the record's `answer` (the bank holds one); the rest ride along in
    `accepted` so the explanation can say the key took both.
    """
    found: dict[int, list[str]] = {}
    for m in MULTI_ANSWER_RE.finditer(text):
        found.setdefault(int(m.group(1)), re.findall(r"[A-E]", m.group(2).upper()))
    return found


SOLUTION_ANSWER_RE = re.compile(r"(?i)\b(?:solution|answer)[ \t]*[:=-]?[ \t]*\(?([A-E])\)?\b")


def strip_solution_header(text: str) -> tuple[str, str | None]:
    """Remove a leading `Solution: C` line, returning the letter it carried."""
    m = SOLUTION_ANSWER_RE.search(text[:120])
    if not m:
        return text.strip(), None
    return (text[: m.start()] + text[m.end() :]).strip(), m.group(1).upper()


# ─── CAS examiner's report ────────────────────────────────────────────────────

# A report's own heading is not typed to one shape either: Fall 2015 prints
# `QUESTION: 1` for its first question and `QUESTION 2` for every one after, so
# a colon that appears once in a paper is enough to lose a question entirely.
# Exam 7 Spring 2018 names the sitting in front of every heading —
# `SPRING 2018 EXAM 7, QUESTION 1` — which a line-anchored `QUESTION` never
# sees, so the whole report segmented to nothing.
CAS_QUESTION_RE = re.compile(
    r"(?m)^[ \t]*(?:(?:SPRING|FALL)[ \t]+\d{4}[ \t]+EXAM[ \t]+[\w-]+[ \t]*,?[ \t]*)?"
    r"QUESTION[ \t]*[:#]?[ \t]*(\d{1,3})\b"
)
# The leading glyph of a field label is sometimes missing from a publisher
# PDF's text layer — Fall 2016 page 45 extracts as `OTAL POINT VALUE: 3.25`,
# the `T` simply absent. The label is being *recognised*, not transcribed, and
# the value after it is intact, so the first letter is optional. Each phrase is
# long enough that this cannot match anything else.
CAS_POINTS_RE = re.compile(r"(?i)T?OTAL POINT VALUE[ \t]*[:=]?[ \t]*([\d.]+)")
CAS_LO_RE = re.compile(r"(?i)L?EARNING OBJECTIVE\(?S?\)?[ \t]*[:=]?[ \t]*(.+)")
CAS_PART_RE = re.compile(r"(?mi)^[ \t]*Part[ \t]+([a-h])[ \t]*[:.]?[ \t]*"
                         r"(?:([\d.]+)[ \t]*points?)?[ \t]*")
# `SAMPLE ANSWERS`, and Spring 2015's `SAMPLE/ACCEPTED ANSWERS:` — the
# qualifier is the publisher's, not a different section. Missing it costs the
# whole paper: with no sample heading there is no block to split, so every
# question ships commentary and no answer at all.
CAS_SAMPLE_RE = re.compile(
    r"(?mi)^[ \t]*S?AMPLE(?:[ \t]*/[ \t]*[A-Z]+)?[ \t]+ANSWERS?\b[ \t]*:?"
)
# `_joined` normalises the curly apostrophe away, but the parser is called
# directly too, so it reads both spellings itself — and both possessives:
# Exam 7 Spring 2015 heads every question's commentary `EXAMINERS' REPORT`,
# and missing it filed all 29 questions' commentary as their sample answers.
CAS_REPORT_RE = re.compile(
    "(?mi)^[ \t]*E?XAMINER(?:['\u2019]?S|S['\u2019])? REPORT\\b[ \t]*:?"
)


# `a. (0.25 points) Calculate …` — how the booklet introduces each sub-part.
CAS_PROMPT_PART_RE = re.compile(
    r"(?m)^[ \t]*([a-h])[.)][ \t]*\n?[ \t]*\(([\d.]+)[ \t]*points?\)[ \t]*"
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

    # A question with no `Part a:` markers is single-part — Fall 2016 has six
    # of them, headed `SAMPLE ANSWER` rather than `SAMPLE ANSWERS`. Its answer
    # has to go somewhere or it is silently dropped, so it becomes the
    # question's own solution.
    samples = _split_samples(samples_block) if not parts else []

    return {
        "points": float(points.group(1)) if points else None,
        "learning_objective_codes": lo.group(1).strip() if lo else "",
        "examiner_report": overall.strip(),
        "solution": samples[0] if samples else "",
        "alternatives": samples[1:],
        "parts": [asdict(parts[k]) for k in sorted(parts)],
    }


def _split_parts(block: str) -> list[tuple[str, str | None, str]]:
    # Parts only climb. A sentence that ends "…the development factor
    # calculation in / Part a." puts `Part a` at the start of a line inside part
    # b's commentary (Exam 7 Spring 2017 Q3), and read as a heading it replaced
    # part a's own report with the tail of part b's.
    matches: list[re.Match[str]] = []
    for m in CAS_PART_RE.finditer(block):
        if not matches or m.group(1).lower() > matches[-1].group(1).lower():
            matches.append(m)
    out = []
    for i, m in enumerate(matches):
        stop = matches[i + 1].start() if i + 1 < len(matches) else len(block)
        out.append((m.group(1).lower(), m.group(2), block[m.end() : stop]))
    return out


# `2-Step Method:` — a heading the report puts above the samples that take
# that approach, rather than inside any one of them.
SAMPLE_HEADING_RE = re.compile(r"^[^\n]{1,60}:$")


def _split_samples(chunk: str) -> list[str]:
    pieces = [p.strip() for p in re.split(
        r"(?mi)^[ \t]*Sample(?:[ \t]+Answer)?[ \t]+\d+[ \t]*:?[ \t]*$", chunk
    )]
    # A heading introducing the samples under it is left by the split either
    # alone in front of the first sample or trailing the one above it — Fall
    # 2015 Q4 heads its five samples `2-Step Method:` and `1-Step Method:`.
    # It describes the approach the *next* sample takes, so it travels with
    # that sample; left where the split put it, it is either read as a sample
    # of its own (and, being first, becomes the question's whole solution) or
    # dangles off the end of the sample before it.
    for i in range(len(pieces) - 1):
        lines = pieces[i].splitlines()
        if lines and SAMPLE_HEADING_RE.match(lines[-1].strip()):
            heading = lines.pop().strip()
            pieces[i] = "\n".join(lines).strip()
            pieces[i + 1] = f"{heading}\n\n{pieces[i + 1]}".strip()
    return [p for p in pieces if len(p) > 2]


# ─── The pre-2014 report layout ───────────────────────────────────────────────
#
# CAS's first examiner's reports (Exam 7 May 2012 and Spring 2013) predate the
# `QUESTION N` / `TOTAL POINT VALUE` / `Part a: 0.5 point` layout. Each question
# opens `Question 1 Sample Answer`, its candidate answers follow as
# `Solution 1`, `Solution 2`, … with the parts lettered `a)` inside them, and
# one `Examiner Comment` closes it. No point value is printed anywhere in the
# report — the booklet's `(2.75 points)` / `a. (1.25 points)` are the only
# source, so `cas_records` reads them from there.
#
# The samples are not ordered one way. Question 1 of 2012 runs Solution 1
# through parts a and b, then Solution 2 through a and b again; Question 9 runs
# six solutions of part a and then starts over at `Solution 1` for part d. So a
# part's samples are collected in reading order from wherever its letter
# appears, which reads both shapes the same way.
LEGACY_QUESTION_RE = re.compile(
    r"(?m)^[ \t]*Question[ \t]+(\d{1,3})[ \t]+Sample[ \t]+(?:Answers?|Solutions?)\b"
)
LEGACY_SAMPLE_RE = re.compile(r"(?mi)^[ \t]*(?:Solution|Sample)[ \t]*\d+[ \t]*:?[ \t]*$")
LEGACY_COMMENT_RE = re.compile("(?mi)^[ \t]*Examiners?['’]?s?[ \t]+Comments?\\b[ \t]*:?[ \t]*")
LEGACY_PART_RE = re.compile(r"(?m)^[ \t]*\(?([a-h])\)[ \t]*")
# The commentary names its parts in prose as often as with a label:
# `Part a) of the problem required …`, `The b. part requires …`,
# `For the a. part, candidates would …`, or `a)` alone on a line.
LEGACY_COMMENT_PART_RE = re.compile(
    r"(?mi)^[ \t]*(?:Part[ \t]+\(?([a-h])\)?(?=[\s),:.]|$)|\(?([a-h])\)"
    r"|(?:The|For[ \t]+the)[ \t]+([a-h])\.?[ \t]+part\b)"
)


def parse_legacy_question(text: str) -> dict:
    """Pull samples and commentary out of one `Question N Sample Answer`
    section of a pre-2014 CAS examiner's report. Same shape as
    `parse_cas_question`, with no point values — the report prints none."""
    comment_at = LEGACY_COMMENT_RE.search(text)
    samples_block = text[: comment_at.start()] if comment_at else text
    report_block = text[comment_at.end() :] if comment_at else ""

    parts: dict[str, CasPart] = {}
    loose: list[str] = []
    current: str | None = None
    for sample in (s for s in LEGACY_SAMPLE_RE.split(samples_block) if s.strip()):
        marks: list[re.Match[str]] = []
        for m in LEGACY_PART_RE.finditer(sample):
            # Letters only climb inside one sample: an `a)` below a `c)` is a
            # list inside the answer, not the start of part a again.
            if not marks or m.group(1) > marks[-1].group(1):
                marks.append(m)
        lead = sample[: marks[0].start()] if marks else sample
        if lead.strip():
            # A sample that opens without a letter continues the part the one
            # before it was answering; before any part at all, the question
            # has none, and the text is its single-part solution.
            if current:
                parts[current].samples.append(lead.strip())
            else:
                loose.append(lead.strip())
        for i, m in enumerate(marks):
            stop = marks[i + 1].start() if i + 1 < len(marks) else len(sample)
            chunk = sample[m.end() : stop].strip()
            current = m.group(1)
            part = parts.setdefault(current, CasPart(label=current))
            if len(chunk) > 2:
                part.samples.append(chunk)

    overall = report_block.strip()
    marks = []
    for m in LEGACY_COMMENT_PART_RE.finditer(report_block):
        label = (m.group(1) or m.group(2) or m.group(3)).lower()
        if label in parts and (not marks or label > marks[-1][0]):
            marks.append((label, m))
    if marks:
        overall = report_block[: marks[0][1].start()].strip()
        for i, (label, m) in enumerate(marks):
            stop = marks[i + 1][1].start() if i + 1 < len(marks) else len(report_block)
            # A label heading its paragraph (`a) Most candidates …`, `Part b)`
            # alone on a line) is dropped; one that is the subject of its
            # sentence (`The a. part involved …`, `Part a) of the problem …`)
            # is kept, or the sentence loses its subject.
            rest = report_block[m.end() : stop]
            prose = bool(m.group(3)) or bool(re.match(r"[ \t]*[a-z,]", rest))
            parts[label].report = (report_block[m.start() : stop] if prose else rest).strip()

    return {
        "points": None,
        "learning_objective_codes": "",
        "examiner_report": overall,
        "solution": loose[0] if loose and not parts else "",
        "alternatives": loose[1:] if not parts else [],
        "parts": [asdict(parts[k]) for k in sorted(parts)],
    }


# `1. (2.75 points)` at the head of a booklet span: the total a pre-2014 report
# never prints, read off the booklet before the stem is stripped of it.
BOOKLET_TOTAL_RE = re.compile(r"^\s*\(\s*([\d.]+)\s*points?\s*\)", re.IGNORECASE)


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
    year: int | None = None,
    session: str | None = None,
    points: float | None = None,
) -> list[dict]:
    """Build records for a multiple-choice set.

    An SOA sample set has no sitting, so its ids are `p-004`. A dated
    multiple-choice paper — the CAS MAS exams — passes `year` and `session`
    and gets the sitting ids the bank already uses for them: `masi-2019s-q1`,
    filed as `masi-2019s-001.md`. `points` is what the paper's instructions
    print per question; a set that prints none keeps the bank's default of 1.
    """
    prefix = SOA_PREFIX.get(exam, exam)
    sitting = ""
    if year:
        sitting = f"{year}" + (("s" if session.lower().startswith("sp") else "f") if session else "")
    q_text, q_index = _joined(question_pages, furniture)
    s_text, s_index = _joined(solution_pages, furniture)
    # Page numbers are the PDF's own, and a booklet cut out of the middle of a
    # combined PDF does not start at page 1 — so look pages up by number.
    by_number = {page.number: page for page in question_pages}

    # A key is a table, and reflow is for prose: joining its rows turns
    # `1 / B / 2 / C` into `1`, `B 2`, `C 3`. So it is read off the pages'
    # own text as well as the reflowed markdown, and the fuller reading wins.
    raw_key_text = "\n".join(page.text for page in solution_pages)
    key = max(answer_key(s_text), answer_key(raw_key_text), key=len)
    multi = accepted_answers(s_text) or accepted_answers(raw_key_text)
    for num, letters in multi.items():
        key.setdefault(num, letters[0])
    sol_bounds = {b.num: b for b in segment(s_text)} if s_text else {}

    bounds = segment(q_text)
    source = "numbered"
    expected = max(key, default=0)
    if expected and len(bounds) < expected and any(
        p.scanned or p.ocred for p in question_pages
    ):
        # A scan whose numbering did not survive OCR: fall back on the page.
        paged = page_bounds(q_text, q_index, question_pages, expected)
        if paged:
            bounds, source = paged, "paged"

    records: list[dict] = []
    for bound in bounds:
        raw = q_text[bound.start : bound.end]
        prompt, options = split_options(raw)
        pages = sorted({q_index[i] for i in range(bound.start, min(bound.end, len(q_index)))})
        scanned = [p for p in pages if by_number[p].scanned]
        ocred = [p for p in pages if by_number[p].ocred]

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
        # A dated MC paper publishes its key and nothing else, so no solution
        # there is expected rather than a gap to chase: the explanation is
        # the one part of such a question that is authored.
        if not solution and not sitting:
            warnings.append("no worked solution found")
        if ocred:
            warnings.append(f"prompt read by OCR (page {_ranges(ocred)}) — spot-check it")
        accepted = multi.get(bound.num) or []
        if len(accepted) > 1:
            warnings.append(
                f"the key accepts {' & '.join(accepted)} — answer the letter the "
                "explanation works to and note that the key took both"
            )

        record_id = f"{prefix}-{sitting}-q{bound.num}" if sitting else f"{prefix}-{bound.num:03d}"
        record = {
            "num": bound.num,
            "id": record_id,
            "bank": SOA_BANK.get(exam, f"exam-{exam}"),
            "type": "multiple-choice",
            "body": mdmath.normalize_markdown(prompt).strip(),
            "options": {k: mdmath.normalize_chars(v) for k, v in options.items()},
            "answer": letter,
            "points": points if points is not None else 1,
            "parts": [],
            "solution": mdmath.normalize_markdown(solution).strip(),
            "pages": {"question": pages, "solution": sol_pages},
            "needs_vision": bool(scanned),
            "ocr": bool(ocred),
            "prompt_source": source,
            "warnings": warnings,
        }
        if sitting:
            record.update(
                year=year,
                session=session,
                # The bank files a sitting's questions zero-padded
                # (`masi-2018f-001.md`) under an unpadded id.
                file=f"{prefix}-{sitting}-{bound.num:03d}",
            )
        if len(accepted) > 1:
            record["accepted"] = accepted
        records.append(record)
    return records


def cas_records(
    exam: str,
    year: int,
    session: str | None,
    booklet_pages: list[Page],
    report_pages: list[Page],
    furniture: set[str] | None = None,
    single_sitting: bool = False,
) -> list[dict]:
    """Build records for a CAS essay/calculation exam.

    `single_sitting` is for an exam sat once a year (Exam 7): the session is
    still recorded — the past-paper shelf filters on it — but the id carries no
    `s`/`f` suffix, since there is no other sitting that year to tell it from.
    """
    b_text, b_index = _joined(booklet_pages, furniture)
    r_text, r_index = _joined(report_pages, furniture)

    numbered = {b.num: (b.start, b.end) for b in segment(b_text)} if b_text.strip() else {}
    suffix = ""
    if session and not single_sitting:
        suffix = "s" if session.lower().startswith("sp") else "f"

    bounds = list(segment(r_text, CAS_QUESTION_RE))
    parse = parse_cas_question
    legacy = not bounds
    if legacy:
        # The pre-2014 layout (see `parse_legacy_question`): no point value in
        # the report, so the booklet is the only place a total comes from.
        bounds = list(segment(r_text, LEGACY_QUESTION_RE))
        parse = parse_legacy_question
    parsed_by_num = {b.num: parse(r_text[b.start : b.end]) for b in bounds}

    # A booklet whose numbering survived is read directly. One whose numbering
    # did not — every scanned CAS booklet — is aligned on its point values
    # against the report's, which is why the report is parsed first.
    #
    # A scan can also land in between: good OCR recovers the `10.` of the later
    # questions while the earlier ones' numbers stay in a margin it reorders
    # (Exam 5 Spring 2016 numbers 10-25 and not 1-9). So the two readings are
    # merged rather than chosen between — direct numbering first, since it is
    # the question's own label, and alignment only for the numbers it missed.
    prompts = dict(numbered)
    if b_text.strip() and len(numbered) < len(bounds):
        aligned = align_booklet(
            b_text,
            [
                (b.num, parsed_by_num[b.num]["points"],
                 [p["points"] for p in parsed_by_num[b.num]["parts"]])
                for b in bounds
            ],
        ) or {}
        taken = sorted(prompts.values())
        for num, span in sorted(aligned.items()):
            if num in prompts:
                continue
            # Never over text another question already owns: a prompt filed
            # under the wrong question is worse than a missing one. An aligned
            # span ends at the *next point marker*, which on a paper whose
            # numbering half survived sits just past the next question's `10.`
            # — so the tail is trimmed back to that label rather than the
            # whole span being thrown away for a few characters of overlap.
            start, end = span
            for other_start, other_end in taken:
                if other_start <= start < other_end:
                    start = end  # begins inside another question: not ours
                    break
                if start < other_start < end:
                    end = other_start
            if start < end:
                prompts[num] = (start, end)
                taken = sorted(taken + [(start, end)])

    records: list[dict] = []
    for bound in bounds:
        parsed = parsed_by_num[bound.num]
        body, pages, needs_vision = "", [], False
        warnings: list[str] = []
        source = "numbered" if bound.num in numbered else (
            "aligned" if bound.num in prompts else ""
        )
        if bound.num in prompts:
            p_start, p_end = prompts[bound.num]
            body = mdmath.normalize_markdown(b_text[p_start:p_end]).strip()
            pages = sorted({b_index[i] for i in range(p_start, min(p_end, len(b_index)))})
            total = BOOKLET_TOTAL_RE.match(body)
            if parsed["points"] is None and total:
                parsed["points"] = float(total.group(1))
            body = _strip_trailing_label(
                attach_part_prompts(body, parsed["parts"], parsed["points"], warnings)
            )
            if parsed["points"] is None:
                parsed["points"] = parts_total(parsed["parts"])
            ocred = sorted({p for p in pages if booklet_pages[p - 1].ocred})
        else:
            # No prompt text for this question. When the booklet has no text
            # layer at all, which page holds which question is exactly what
            # cannot be known — so the record claims no pages rather than all
            # of them, and the rendered booklet is pointed at once in the
            # report instead of being charged to every question.
            ocred = []
            pages = []
            needs_vision = any(p.scanned for p in booklet_pages)

        if not body and not needs_vision and not any(
            (part.get("prompt") or "").strip() for part in parsed["parts"]
        ):
            # A question whose lettered sub-prompts were all placed has no gap
            # to report: some CAS questions simply have no stem above them.
            warnings.append("no prompt text found in the booklet")
        if ocred:
            note = f"prompt read by OCR (page {_ranges(ocred)}) — spot-check it"
            if _has_exhibit(body):
                note = (
                    f"exhibit read by OCR (page {_ranges(ocred)}) — verify every "
                    "figure against pages/, OCR drops and misreads table columns"
                )
            warnings.append(note)
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
                "solution": parsed["solution"],
                "alternatives": parsed["alternatives"],
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
                "prompt_source": source,
                "rewrite_flags": [],
                "warnings": warnings,
            }
        )
    for record in records:
        record["rewrite_flags"] = rewrite_flags(record)
    _locate_unplaced(records)
    return records


def _locate_unplaced(records: list[dict]) -> None:
    """Give a question the alignment could not place the pages around it.

    A question the booklet alignment skipped has no prompt and no page, which
    leaves nothing to transcribe *from*. Its neighbours do have pages, and the
    paper is in order, so it lies between them: the pages from where the
    previous question ended to where the next one starts. That is a located
    range, not a match, so it is labelled as one — but it is the difference
    between "read these two pages" and "search the booklet".
    """
    placed = [(i, r) for i, r in enumerate(records) if r["pages"]["question"]]
    for index, record in enumerate(records):
        if record["pages"]["question"]:
            continue
        before = [r for i, r in placed if i < index]
        after = [r for i, r in placed if i > index]
        low = before[-1]["pages"]["question"][-1] if before else None
        high = after[0]["pages"]["question"][0] if after else None
        if low is None and high is None:
            continue
        first, last = low or high, high or low
        record["pages"]["question"] = list(range(first, last + 1))
        record["warnings"].append(
            f"prompt not located — it lies in page {_ranges(record['pages']['question'])}, "
            "between the questions either side; transcribe it from pages/"
        )


# A bare point-value line: `(1.25 points)` for a whole question, `(0.5 point)`
# for a part. In a scanned booklet these survive OCR when the question numbers
# do not — the numbers sit in a margin the OCR engine reorders.
POINT_MARKER_RE = re.compile(r"(?mi)^[ \t]*\(\s*([\d.]+)\s*points?\s*\)")
POINT_EPS = 0.01
# Markers the alignment may step over to resync across a question the report
# omits. Small on purpose: a long skip is a desync, not a gap.
MAX_ALIGN_SKIP = 8


def align_booklet(
    booklet_text: str, questions: list[tuple[int, float | None, list[float | None]]]
) -> dict[int, tuple[int, int]] | None:
    """Map question number → span in a booklet whose numbering did not survive.

    A scanned CAS booklet OCRs its prose well and loses the `1.` that starts
    each question, so there is nothing for `segment` to key on. But it prints
    each point value, and the examiner's report prints the same values as
    `TOTAL POINT VALUE` and `Part a: 0.5 point` — so the two can be aligned on
    published data rather than on a guess about page order.

    A question matches only when its whole point signature — an optional
    leading marker equal to its total, then exactly its parts' values in order,
    summing to that total — appears in sequence. A question that does not match
    is left out and the next one resumes the search from the same place, so one
    unreadable question (a marker OCR missed, a part the report never labelled)
    costs its own prompt and no other.

    A matched span ends at its own last marker rather than at the next matched
    question, so an unaligned question in between can never have its text
    absorbed into a neighbour. That is the property that makes a partial
    alignment safe: a prompt attached to the wrong question would be far worse
    than no prompt at all.

    Returns the spans it is sure of — empty if none — never a guess.
    """
    markers = [
        (float(m.group(1)), m.start()) for m in POINT_MARKER_RE.finditer(booklet_text)
    ]
    if not markers or not questions:
        return None

    spans: dict[int, tuple[int, int]] = {}
    pos = 0
    for num, total, parts in questions:
        if total is None:
            continue
        start = pos
        match = _match_question(markers, start, total, parts)
        if match is None:
            # Step over markers belonging to a question this one is not: the
            # report may skip a question the booklet prints (Fall 2016 has no
            # QUESTION 8), or a marker may have been misread.
            for skip in range(1, MAX_ALIGN_SKIP + 1):
                match = _match_question(markers, start + skip, total, parts)
                if match is not None:
                    start += skip
                    break
        if match is None:
            continue
        end = markers[match][1] if match < len(markers) else len(booklet_text)
        spans[num] = (markers[start][1], end)
        pos = match
    return spans or None


def _match_question(
    markers: list[tuple[float, int]],
    pos: int,
    total: float,
    parts: list[float | None],
) -> int | None:
    """Consume one question's point markers from `pos`, or None if they differ.

    A question takes an optional leading marker equal to its total (the booklet
    prints it for some questions and not others), then exactly its parts'
    values in order.
    """
    if pos >= len(markers):
        return None
    if abs(markers[pos][0] - total) < POINT_EPS:
        pos += 1
    elif not parts:
        return None  # no parts to sum, and the total is not printed here

    for value in parts:
        if value is None or pos >= len(markers):
            return None
        if abs(markers[pos][0] - value) > POINT_EPS:
            return None
        pos += 1
    if parts and abs(sum(v for v in parts if v is not None) - total) > POINT_EPS:
        return None  # the report's own arithmetic does not close
    return pos


# ─── Which sample answers will not read as a walkthrough ──────────────────────
#
# A publisher's sample answer is shipped as the explanation whenever it reads
# as one, and rewriting the rest is the largest model cost left in a
# conversion. Finding them by reading all 25 costs as much as the rewriting
# does, so the shapes that *always* read badly are detected here and named in
# the report — every one of them a way a table or an equation loses its
# structure on the way out of a PDF, never a judgment about style.

# A line that is nothing but a number is the same shape as a table cell that
# is nothing but a number, so the exhibit finder's test is reused verbatim.
BARE_NUMBER_RE = NUMERIC_CELL_RE
COLUMN_LINE_RE = re.compile(r"\S {2,}\S")
# A run this long is a table that lost its shape; two numbers under each other
# are just two steps of a calculation.
FLAT_RUN = 3
# An equation line this long with this many `=` is several steps run together
# (`EP x OLF = 1500 x 1.0484 = 1572.54 = On-Level EP 2013 Loss x ...`). The
# length gate is what separates it from an honest `A = 1 + 2 = 3`.
CHAIN_EQUALS = 3
CHAIN_CHARS = 80


def _line_run(text: str, matches: Callable[[str], bool]) -> int:
    """The longest run of consecutive non-blank lines satisfying `matches`."""
    run = best = 0
    for line in (text or "").splitlines():
        stripped = line.strip()
        if not stripped:
            continue
        if matches(stripped):
            run += 1
            best = max(best, run)
        else:
            run = 0
    return best


def _collapsed_row(text: str) -> bool:
    """A markdown row whose every cell holds a whole column of numbers.

    The table finder sometimes reads a report's hand-typed exhibit as one row
    per *column*, so `| A B C | 76.7% 71.9% 79.0% |` is what reaches the file —
    a table on screen, unreadable as one.
    """
    for line in (text or "").splitlines():
        stripped = line.strip()
        if not stripped.startswith("|") or set(stripped) <= set("|- "):
            continue
        for cell in stripped.strip("|").split("|"):
            tokens = cell.split()
            if len(tokens) >= 3 and all(BARE_NUMBER_RE.match(t) for t in tokens):
                return True
    return False


def _broken_font(text: str) -> bool:
    """Letters no English exam solution contains: the PDF's font map failed.

    A solution set in a maths font with no usable encoding extracts as runs of
    unrelated letters (`0146ത`, `൅`, `ൌ`), which no normalisation can repair.
    """
    strange = 0
    for ch in text or "":
        if ord(ch) < 0x250 or not unicodedata.category(ch).startswith("L"):
            continue
        if unicodedata.name(ch, "").startswith(("GREEK", "MATHEMATICAL")):
            continue
        strange += 1
        if strange >= 2:
            return True
    return False


def unreadable_sample(text: str) -> str | None:
    """Why a sample answer will not read as a walkthrough, or None if it will.

    Reported, never acted on: the pipeline does not rewrite anything by
    itself, and a sample this misses is still a sample worth a second look.
    """
    if not (text or "").strip():
        return None
    if _line_run(text, lambda line: bool(BARE_NUMBER_RE.match(line))) >= FLAT_RUN:
        return "a column of bare numbers — the triangle lost its shape"
    if _collapsed_row(text):
        return "a markdown row holding a whole column per cell"
    if _line_run(text, lambda line: len(COLUMN_LINE_RE.findall(line)) >= 2) >= FLAT_RUN:
        return "space-aligned columns that never became a table"
    if any(
        line.count("=") >= CHAIN_EQUALS and len(line) > CHAIN_CHARS
        for line in text.splitlines()
    ):
        return "several calculation steps run onto one line"
    if _broken_font(text):
        return "characters from a font the PDF could not map"
    return None


def rewrite_flags(record: dict) -> list[str]:
    """The parts of one question whose sample answer needs rewriting."""
    flags = []
    for label, text in [("the solution", record.get("solution") or "")] + [
        (f"part {part['label']}", (part.get("samples") or [""])[0])
        for part in record.get("parts") or []
    ]:
        reason = unreadable_sample(text)
        if reason:
            flags.append(f"{label}: {reason}")
    return flags


# A markdown table or a run of aligned columns in a prompt: the exhibit a
# ratemaking question turns on, and the part of a scan OCR is worst at.
def _has_exhibit(body: str) -> bool:
    return "|---" in body or bool(COLUMN_GAP_RE.search(body))


def attach_part_prompts(
    body: str,
    parts: list[dict],
    total: float | None = None,
    warnings: list[str] | None = None,
) -> str:
    """Move the booklet's lettered sub-prompts onto the report's parts.

    Returns the question stem. A part the booklet prices but the report never
    mentions is appended, so the file still carries every prompt the candidate
    was given — *unless* adding it would break the report's own total. A
    scanned booklet's spans can over-run into the next question's page, and a
    `c. (0.5 point)` borrowed from the question after this one is a part that
    will never have an answer under it. The report prices the paper, so it
    decides: the surplus part is dropped and `warnings` says so.
    """
    stem, prompts = split_part_prompts(body)
    if not prompts:
        return stem  # a single-part question: its total is already frontmatter
    by_label = {part["label"]: part for part in parts}
    priced = sum(p["points"] for p in parts if p.get("points") is not None)
    for label, found in sorted(prompts.items()):
        part = by_label.get(label)
        if part is None:
            over = (
                total is not None
                and priced + (found["points"] or 0) - total > POINT_EPS
            )
            if over:
                if warnings is not None:
                    warnings.append(
                        f"booklet part {label} ({points_label(found['points'])}) dropped: "
                        f"the report prices only {points_label(total)} and never mentions "
                        "it — an over-run into the next question's page"
                    )
                continue
            part = {"label": label, "points": found["points"], "samples": [], "report": ""}
            parts.append(part)
            by_label[label] = part
            priced += found["points"] or 0
        part["prompt"] = found["prompt"]
        if part.get("points") is None:
            part["points"] = found["points"]
            priced += found["points"] or 0
    parts.sort(key=lambda p: p["label"])
    _prefer_closing_points(parts, prompts, total, warnings)
    return stem


def _prefer_closing_points(
    parts: list[dict], prompts: dict[str, dict], total: float | None, warnings: list[str] | None
) -> None:
    """Take the booklet's part values when only the booklet's add up.

    Two printings of one paper can disagree on a part: Exam 7 Spring 2014's
    report gives Q21 part c 1.5 points where the booklet — and its own point
    table — give 1, and only the booklet's values sum to the report's
    `TOTAL POINT VALUE`. The total is the one figure both sides agree on, so
    the split that closes on it is the one printed correctly.
    """
    if total is None or not parts or any(p["label"] not in prompts for p in parts):
        return
    report_sum = sum(p.get("points") or 0 for p in parts)
    booklet_sum = sum(prompts[p["label"]]["points"] or 0 for p in parts)
    if abs(report_sum - total) <= POINT_EPS or abs(booklet_sum - total) > POINT_EPS:
        return
    for part in parts:
        booklet = prompts[part["label"]]["points"]
        if part.get("points") != booklet and warnings is not None:
            warnings.append(
                f"part {part['label']} priced at {points_label(booklet)} from the booklet, "
                f"not the report's {points_label(part.get('points'))}: only the booklet's "
                f"parts sum to the total of {points_label(total)}"
            )
        part["points"] = booklet


# The next question's own `10.`, left at the end of a span that reaches to the
# following point marker. A prompt never ends on an empty list marker, so a
# bare number and full stop with nothing under it is always the neighbour's.
TRAILING_LABEL_RE = re.compile(r"\n\s*\d{1,3}\.\s*$")


def _strip_trailing_label(body: str) -> str:
    return TRAILING_LABEL_RE.sub("", body).rstrip()


def parts_total(parts: list[dict]) -> float | None:
    """A question's total from its parts, when every part is priced.

    For a total nothing printed legibly — the pre-2014 reports print none, and
    OCR can lose the booklet's `(3 points)` — the parts' own printed values are
    still the publisher's figures, and their sum is the total.
    """
    values = [p.get("points") for p in parts]
    if not values or any(v is None for v in values):
        return None
    return round(sum(values), 4)


def points_label(value: float | None) -> str:
    """`1 point`, `0.5 points` — a point value as the publisher prints it.

    Shared with `question_write`, which heads each `## Part a` with it, so a
    warning about a part and the part itself are weighed the same way.
    """
    if value is None:
        return "no points"
    number = float(value)
    shown = str(int(number)) if number == int(number) else str(number)
    return f"{shown} point" + ("" if number == 1 else "s")


SOA_PREFIX = {"p": "p", "fm": "fm", "mas-i": "masi", "mas-ii": "masii"}
SOA_BANK = {"p": "exam-p", "fm": "exam-fm", "mas-i": "exam-mas-i", "mas-ii": "exam-mas-ii"}


UNESCAPED_DOLLAR_RE = re.compile(r"(?<!\\)\$")
# Letters set in a maths font come out of a text layer as Unicode's
# Mathematical Alphanumeric Symbols (`𝑁𝑃𝑉`, `𝜙`): the same letters in an
# italic face, which a reader sees as a different alphabet. NFKC folds each
# to its plain letter.
MATH_ALNUM_RE = re.compile("[\U0001D400-\U0001D7FF]")
# Word's list bullets from a symbol font (`\uf0b7`, `\uf0a7`, `\uf0d8`),
# private-use code points that render as nothing. At the head of a line they
# are that line's bullet; mid-line, each starts the next item.
SYMBOL_BULLET_HEAD_RE = re.compile("(?m)^[ \t]*[\uf0a7\uf0b7\uf0d8][ \t]*")
SYMBOL_BULLET_INLINE_RE = re.compile("[ \t]+[\uf0a7\uf0b7\uf0d8][ \t]+")


def normalize_text_layer(md: str) -> str:
    """What a PDF's text layer gets wrong on its way to markdown, fixed.

    A text layer carries no LaTeX, so every `$` is money — and left bare, the
    app's markdown pairs `$25,000 … $10,000` into one span of math. Maths-font
    letters are folded to plain ones and symbol-font bullets become list items.
    """
    md = UNESCAPED_DOLLAR_RE.sub(r"\\$", md)
    md = MATH_ALNUM_RE.sub(lambda m: unicodedata.normalize("NFKC", m.group()), md)
    md = SYMBOL_BULLET_HEAD_RE.sub("- ", md)
    # Word autocorrects `-->` to a Wingdings arrow, which extracts as U+F0E0.
    md = md.replace("\uf0e0", "\u2192")
    return SYMBOL_BULLET_INLINE_RE.sub("\n- ", md)


def _joined(pages: list[Page], furniture: set[str] | None = None) -> tuple[str, list[int]]:
    """Concatenate page markdown, plus a char-index → page-number map."""
    drop = furniture if furniture is not None else (furniture_lines(pages) if pages else set())
    chunks: list[str] = []
    index: list[int] = []
    for page in pages:
        # Normalise here rather than per record: the publisher writes
        # `EXAMINER’S REPORT` with a curly apostrophe, and every marker regex
        # downstream is written with a straight one.
        md = normalize_text_layer(mdmath.normalize_chars(page_markdown(page, drop)))
        if chunks and md.strip() and continues(chunks[-1], md):
            # A sentence carried over the page break: the page's first words
            # finish the last paragraph of the page before.
            chunks[-1] = chunks[-1].rstrip("\n") + " "
            del index[len("".join(chunks)):]
            md = md.lstrip()
        piece = md + "\n\n"
        chunks.append(piece)
        index.extend([page.number] * len(piece))
    return "".join(chunks), index


# ─── Reporting ────────────────────────────────────────────────────────────────


def token_estimate(
    records: list[dict], dpi: int = DEFAULT_DPI, rendered_pages: int = 0
) -> dict[str, int]:
    """Model-token cost of this conversion, and of the workflow it replaces.

    Three rows, because they answer different questions:

    * `baseline` — transcribe by hand: the prompt, options and solution read
      into context (or the page image, for a scan) and the whole file typed
      back out. This is the floor of the workflow this pipeline replaces, not
      its real cost — that ran a tool call per question, so the batch context
      was re-sent every turn.
    * `residual` — what stage 1 leaves: page images for prompts with no text
      layer, and nothing else, because the prompt, the options, the answer and
      the solution are already in the record. `rendered_pages` covers a booklet
      with no text layer anywhere, where no question can be tied to a page and
      the whole booklet is read once rather than per question.
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

    est["residual_in"] += rendered_pages * per_page
    est["baseline_in"] += rendered_pages * 2805

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


@dataclass
class SplitInfo:
    """Where a combined CAS PDF was cut, and how big each half came out.

    Carried into the report because the cut is the one decision everything
    downstream depends on and the one nothing downstream can question: a
    split in the wrong place still yields questions, solutions and a clean
    report — just no prompts.
    """

    total_pages: int
    booklet_pages: int
    combined: bool = True

    @property
    def report_pages(self) -> int:
        return self.total_pages - self.booklet_pages


def _coverage_lines(
    split: SplitInfo | None, by_source: "Counter[str]", total: int
) -> list[str]:
    """How the booklet was read, and a banner when it was not read at all."""
    if split is None:
        return []
    placed = total - by_source.get("unplaced", 0)
    routes = ", ".join(
        f"{by_source[key]} by {name}"
        for key, name in (("numbered", "the booklet's own numbering"),
                          ("aligned", "point-value alignment"),
                          ("paged", "page order, checked against the key's count"))
        if by_source.get(key)
    )
    lines = [
        "## Booklet coverage",
        "",
        f"- the combined PDF was cut at page **{split.booklet_pages + 1}** of "
        f"{split.total_pages}: {split.booklet_pages} booklet page(s), "
        f"{split.report_pages} report page(s)"
        if split.combined else
        f"- booklet: **{split.booklet_pages}** page(s); "
        f"report: {split.report_pages} page(s)",
        f"- prompts placed: **{placed} of {total}**"
        + (f" ({routes})" if routes else ""),
        "",
    ]
    if split.booklet_pages and not placed:
        lines += [
            "> **No prompt came out of the booklet at all.** Every question "
            "below has a point value, a sample answer and commentary — from "
            "the report — and no question text, so the extraction looks "
            "healthy and is not. Suspect the parse, not the paper: check that "
            "the split landed in the right place, and that the booklet half "
            "holds text a `QUESTION 1` / `1.` / `(2.5 points)` pattern can "
            "match (a text layer set in exotic spaces or a scan with no "
            "`--ocr` are the two that have done this).",
            "",
        ]
    elif not split.booklet_pages and split.combined:
        lines += [
            "> **The split put every page in the report half.** A combined CAS "
            "PDF is a booklet followed by `SAMPLE ANSWERS AND EXAMINER'S "
            "REPORT`; finding that header on page 1 means the header search "
            "matched nothing and fell through. No prompt can be read this way.",
            "",
        ]
    return lines


def write_report(
    path: Path,
    records: list[dict],
    dpi: int,
    rendered_pages: int = 0,
    split: SplitInfo | None = None,
) -> str:
    have_answer = sum(1 for r in records if r.get("answer"))
    have_solution = sum(1 for r in records if r.get("solution") or r.get("parts"))
    vision = [r["num"] for r in records if r["needs_vision"]]
    ocred = [r["num"] for r in records if r.get("ocr")]
    flagged = [r for r in records if r["warnings"]]
    rewrites = [r for r in records if r.get("rewrite_flags")]
    est = token_estimate(records, dpi, rendered_pages)
    by_source = Counter(r.get("prompt_source") or "unplaced" for r in records)

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
        f"- booklet pages rendered for transcription: **{rendered_pages}**",
        f"- flagged with warnings: **{len(flagged)}**",
        f"- explanations the publisher wrote unreadably: **{len(rewrites)}**"
        + (f" (questions {_ranges([r['num'] for r in rewrites])})" if rewrites else ""),
        "",
        *_coverage_lines(split, by_source, len(records)),
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
    unplaced = [r for r in records if r["needs_vision"] and not r["pages"]["question"]]
    if unplaced:
        lines += [
            "## The booklet has no text layer",
            "",
            f"No page could be tied to a question, so all {rendered_pages} booklet "
            "page(s) were rendered to `pages/`. Transcribe each prompt into "
            "`prompts/<id>.md` and pass `--prompts` to `question_write.py`. "
            "Where a page was read by OCR instead, check its exhibit tables "
            "against the image — OCR drops columns.",
            "",
        ]

    if rewrites:
        lines += [
            "## Explanations worth rewriting",
            "",
            "These sample answers lost their structure in the PDF — a triangle "
            "flattened into a column of numbers, a row holding a whole column, "
            "calculation steps run together. Rewrite each into "
            "`<build>/../expl/<id>.md` (a `## Part a` heading per part) and pass "
            "`--explanations`. Everything not listed here reads as the "
            "publisher wrote it and should be shipped unchanged.",
            "",
        ]
        for rec in rewrites:
            for flag in rec["rewrite_flags"]:
                lines.append(f"- **{rec['id']}** {flag}")
        lines.append("")

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
    ap.add_argument("--single-sitting", action="store_true",
                    help="the exam is sat once a year (Exam 7): record --session "
                         "but leave it out of the id")
    ap.add_argument("--dpi", type=int, default=DEFAULT_DPI)
    ap.add_argument("--no-tables", action="store_true", help="skip table detection")
    ap.add_argument("--no-render", action="store_true", help="skip page rendering")
    ap.add_argument("--render-all", action="store_true",
                    help="render every booklet page, not just the ones a prompt "
                         "still has to be read off — what a full transcription needs")
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

    points = None
    if args.pdf and not cas:
        # A multiple-choice paper in one PDF — the CAS MAS exams — is
        # instructions, then the booklet, then the answer key on its own page.
        pages = read_pages(args.pdf, want_tables, args.ocr)
        start, stop = _split_mc_paper(pages)
        booklet, report = pages[start:stop], pages[stop:]
        points = points_per_question(pages[:start])
        sources = {"question": args.pdf, "solution": args.pdf}
        offsets = {"question": 0, "solution": 0}
        furniture = furniture_lines(booklet) | furniture_lines(report)
        split_info = SplitInfo(len(booklet) + len(report), len(booklet), combined=False)
    elif args.pdf:
        pages = read_pages(args.pdf, want_tables, args.ocr)
        split = _split_combined(pages)
        booklet, report = pages[:split], pages[split:]
        sources = {"question": args.pdf, "solution": args.pdf}
        offsets = {"question": 0, "solution": split}
        # One document, two halves with different furniture: the report's
        # header repeats across the whole file, while the booklet's
        # "CONTINUED ON NEXT PAGE" only repeats across its own 31 pages and
        # never reaches the share threshold measured over all 96.
        furniture = (
            furniture_lines(pages)
            | furniture_lines(pages[:split])
            | furniture_lines(pages[split:])
        )
        split_info = SplitInfo(len(pages), len(booklet))
    else:
        booklet = read_pages(args.questions, want_tables, args.ocr) if args.questions else []
        report = read_pages(args.solutions, want_tables, args.ocr) if args.solutions else []
        sources = {"question": args.questions, "solution": args.solutions}
        offsets = {"question": 0, "solution": 0}
        furniture = None  # two documents, each with its own furniture
        split_info = SplitInfo(len(booklet) + len(report), len(booklet), combined=False)

    if cas:
        if not args.year:
            ap.error("--year is required for CAS exams (the sitting year)")
        records = cas_records(args.exam, args.year, args.session, booklet, report, furniture,
                              single_sitting=args.single_sitting)
    else:
        records = soa_records(
            args.exam.lower(), booklet, report, furniture,
            year=args.year, session=args.session, points=points,
        )

    if not records:
        print("no questions segmented — check the PDF layout", file=sys.stderr)
        return 1

    rendered = 0
    if not args.no_render:
        rendered = _render_needed(
            records, sources["question"], offsets["question"], out, args.dpi, booklet,
            render_all=args.render_all,
        )

    with (out / "records.jsonl").open("w", encoding="utf-8") as fh:
        for rec in records:
            fh.write(json.dumps(rec, ensure_ascii=False) + "\n")

    print(write_report(out / "report.md", records, args.dpi, rendered, split_info))
    print(f"wrote {out / 'records.jsonl'}")
    return 0


def _split_combined(pages: list[Page]) -> int:
    """Index of the first examiner's-report page in a combined CAS PDF."""
    for page in pages:
        if re.search(r"(?i)sample answers and examiner", page.text):
            return page.number - 1
    # The pre-2014 reports title themselves the other way round — Exam 7 May
    # 2012's cover page reads `Examiners' Report with Sample Solutions`.
    for page in pages:
        if re.search("(?i)examiners?['’]?s?\\s+report\\s+with\\s+sample", page.text):
            return page.number - 1
    for page in pages:
        if CAS_QUESTION_RE.search(page.text) and CAS_POINTS_RE.search(page.text):
            return page.number - 1
        if LEGACY_QUESTION_RE.search(page.text):
            return page.number - 1
    return 0


INSTRUCTIONS_END_RE = re.compile(r"(?i)end\s+of\s+instructions")
KEY_PAGE_RE = re.compile(r"(?i)\banswer\s*key\b")
# A page with this many `question → letter` rows is a key, whatever its title.
KEY_PAGE_ROWS = 10
POINTS_EACH_RE = re.compile(r"(?i)each\s+worth\s+(\d+(?:\.\d+)?)\s+points?")


def _split_mc_paper(pages: list[Page]) -> tuple[int, int]:
    """Where a combined multiple-choice paper's booklet starts and stops.

    The CAS MAS PDFs open on several pages of numbered instructions — which
    `segment` would otherwise take for questions 1-10 — and close on the
    answer key. The booklet is what lies between `END OF INSTRUCTIONS` and the
    first page headed as a key. Either marker missing leaves that end open.
    """
    start = 0
    for page in pages:
        if INSTRUCTIONS_END_RE.search(page.text):
            start = page.number  # the page after it, as an index
            break
    stop = len(pages)
    for page in pages[start:]:
        # Headed `Final Answer Key` on three papers and just `FINAL` over two
        # `Answer` columns on the fourth, so the rows count as much as the title.
        if KEY_PAGE_RE.search(page.text) or len(answer_key(page.text)) >= KEY_PAGE_ROWS:
            stop = page.number - 1
            break
    return start, stop


def points_per_question(pages: list[Page]) -> float | None:
    """The per-question value the instructions print, if they print one.

    `This 90 point examination consists of 45 multiple choice questions each
    worth 2 points.` A value is read or absent, never assumed.
    """
    for page in pages:
        m = POINTS_EACH_RE.search(page.text)
        if m:
            return float(m.group(1))
    return None


def _render_needed(
    records, source, offset, out: Path, dpi: int, booklet=(), render_all: bool = False
) -> int:
    """Render the pages a prompt still has to be read off, and count them.

    A question that names its pages gets just those. A booklet with no text
    layer at all names none — nothing says which page holds which question —
    so every scanned page is rendered once for the whole document. With
    `render_all`, every booklet page is rendered regardless: transcribing a
    whole paper needs the pages whose prompts OCR read cleanly too.
    """
    if render_all:
        wanted = sorted(p.number for p in booklet if p.scanned or p.ocred)
        return _render(wanted, source, offset, out, dpi)

    wanted = sorted(
        {
            p
            for r in records
            if r["needs_vision"] or (r.get("ocr") and _has_exhibit(r.get("body") or ""))
            for p in r["pages"]["question"]
        }
    )
    if not wanted and any(r["needs_vision"] for r in records):
        wanted = sorted(p.number for p in booklet if p.scanned)
    return _render(wanted, source, offset, out, dpi)


def _render(wanted, source, offset, out: Path, dpi: int) -> int:
    if not wanted or not source:
        return 0
    pymupdf = _pymupdf()
    doc = pymupdf.open(source)
    for number in wanted:
        index = number - 1 + offset
        if 0 <= index < len(doc):
            render_page(doc, index, out / "pages" / f"page-{number:03d}.png", dpi)
    doc.close()
    print(f"rendered {len(wanted)} page(s) to {out / 'pages'}")
    return len(wanted)


if __name__ == "__main__":
    raise SystemExit(main())
