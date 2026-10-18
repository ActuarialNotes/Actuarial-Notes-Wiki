#!/usr/bin/env python3
"""syllabus_extract.py — an SOA syllabus PDF → `.syllabus/<wiki id>/syllabus.json`.

Stage 1 of the syllabus pipeline (docs/syllabus-pipeline.md). Everything a
syllabus says that can be *read* rather than judged is pulled out here — the
topics and their weight ranges, each topic's learning objective, the lettered
learning outcomes and their bullets, and the readings with what each one
assigns — so no model ever retypes an objective. `syllabus_write.py` renders the
exam page from the JSON, and `syllabus_lint.py` holds the page to it word for
word.

The SOA writes every syllabus, preliminary and fellowship alike, in one shape:

    1. Topic: Manual Rates (25%-40%)
    Learning Objectives
    The candidate will understand how to …
    Learning Outcomes
    The Candidate will be able to:
        a) Identify and evaluate sources of data …
        b) …

Its readings come in two layouts, and both are read:

  • a fellowship (FSA) syllabus lists each topic's resources in a two-column
    table under the topic — the resource on the left, the outcomes it serves
    (`2a, 2c`, `Background`) on the right — with a textbook's chapters as
    bullets beneath it;
  • a preliminary (ASA) syllabus lists its readings once, at the end, under
    `Readings:` / `Resources` / `Textbooks`, each citation followed by its
    assigned chapters, indented.

The text is laid out from PyMuPDF's word boxes (each word at its column), which
is what lets the two columns of a resource table be told apart. PyMuPDF is the
only dependency and is imported lazily, as in pdf_extract.py.

Usage:
    python3 scripts/syllabus_extract.py --wiki-id gh-101 --url <syllabus url> [--pdf local.pdf]
    python3 scripts/syllabus_extract.py --all          # every SOA row of SOURCES and MODULES below
    python3 scripts/syllabus_extract.py --wiki-id paf-1   # an e-learning module's objectives

Writes `.syllabus/<wiki id>/syllabus.json`; prints a one-line summary per exam.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
import re
import sys
import urllib.request
from collections import Counter
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, ".syllabus")

# The SOA syllabi this pipeline converts: wiki id → the PDF the SOA's exam page
# links for the next sitting (read off soa.org's exam pages, 2026-10-05). The
# same URLs are the syllabus buttons in quiz/src/data/examPdfLinks.ts, and
# quiz/src/lib/examCatalog.test.ts holds the two together.
SOA = "https://www.soa.org/globalassets/assets/files/edu"
SOURCES: dict[str, str] = {
    "fam-1": f"{SOA}/2026/fall/syllabi/2026-10-fam-syllabus.pdf",
    "srm-1": f"{SOA}/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf",
    "pa-1": f"{SOA}/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf",
    "altam-1": f"{SOA}/2026/fall/syllabi/2026-10-altam-syllabus.pdf",
    "astam-1": f"{SOA}/2026/astam/2026-fall-exam-astam-syllabus.pdf",
    "atpa-1": f"{SOA}/2022/2022-01-atpa-learning-objectives.pdf",
    "cfe-101": f"{SOA}/2026/cfe-101/2026-11-cfe-101-syllabus.pdf",
    "cfe-201": f"{SOA}/2026/cfe-201/2026-2027-cfe-201-syllabus.pdf",
    "cp-311": f"{SOA}/2026/cp-311/2026-2027-cp-311-syllabus.pdf",
    "cp-312": f"{SOA}/2026/cp-312/2026-2027-cp-312-syllabus.pdf",
    "cp-321": f"{SOA}/2026/cp-321/2026-2027-cp-321-syllabus.pdf",
    "cp-341": f"{SOA}/2026/cp-341/2026-2027-cp-341-syllabus.pdf",
    "cp-351": f"{SOA}/2026/cp-351/2026-2027-cp-351-syllabus.pdf",
    "gh-101": f"{SOA}/2026/gh-101/2026-2027-gh-101-syllabus.pdf",
    "gh-201c": f"{SOA}/2026/gh-201c/2026-2027-gh-201c-syllabus.pdf",
    "gh-201u": f"{SOA}/2026/gh-201u/2026-2027-gh-201u-syllabus.pdf",
    "gh-301": f"{SOA}/2026/gh-301/2026-2027-gh-301-syllabus.pdf",
    "gi-101": f"{SOA}/2026/gi-101/2026-2027-gi-101-syllabus.pdf",
    "gi-201": f"{SOA}/2026/gi-201/2026-2027-gi-201-syllabus.pdf",
    "gi-301": f"{SOA}/2026/gi-301/2027-03-gi-301-syllabus.pdf",
    "gi-302": f"{SOA}/2026/gi-302/2027-07-gi-302-syllabus.pdf",
    "ila-101": f"{SOA}/2026/ila-101/2026-2027-ila-101-syllabus.pdf",
    "ila-201i": f"{SOA}/2026/ila-201i/2026-2027-ila-201i-syllabus.pdf",
    "ila-201u": f"{SOA}/2026/ila-201u/2026-2027-ila-201u-syllabus.pdf",
    "inv-101": f"{SOA}/2026/inv-101/2026-2027-inv-101-syllabus.pdf",
    "inv-201": f"{SOA}/2026/inv-201/2026-2027-inv-201-syllabus.pdf",
    "ret-101": f"{SOA}/2026/ret-101/2026-2027-ret-101-syllabus.pdf",
    "ret-201": f"{SOA}/2026/ret-201/2026-2027-ret-201-syllabus.pdf",
    "ret-301": f"{SOA}/2026/ret-301/2026-2027-ret-301-syllabus.pdf",
}

# The SOA's e-learning modules publish no syllabus. Each has a "Module
# Introduction and Objectives" document instead — the module's sections, a
# paragraph on each and the objectives a candidate leaves it with, no weights —
# and a book list (a PDF, or for DMAC a table on the FSA module book-list page).
# Read off each module's soa.org page, 2026-10-17; `module_extract` reads them.
MODULES: dict[str, dict[str, str]] = {
    "paf-1": {"url": f"{SOA}/paf-objectives.pdf", "books": f"{SOA}/2026/edu-paf-booklist.pdf"},
    "asf-1": {"url": f"{SOA}/asf-objectives.pdf", "books": f"{SOA}/2026/edu-asf-booklist.pdf"},
    "fap-1": {"url": f"{SOA}/2023/fap-intro-objectives.pdf", "books": f"{SOA}/edu-fap-booklist.pdf"},
    "dmac-1": {"url": f"{SOA}/dmac-objectives.pdf",
               "books": "https://www.soa.org/education/exam-req/syllabus-study-materials/fsa-module-book-list/",
               "books_table": "Decision Making and Communication Module"},
}

# Characters a PDF text layer carries that the vault spells plainly.
LIGATURES = {"ﬁ": "fi", "ﬂ": "fl", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", " ": " ", "​": ""}

TOPIC_RE = re.compile(
    r"^(\d+)\.\s+(?:Topic:\s*)?(.+?)\s*\(((?:\d+(?:\.\d+)?)\s*%?\s*[-–]\s*\d+(?:\.\d+)?\s*%|\d+(?:\.\d+)?\s*%|Included in [^)]*)\)\s*$")
ITEM_RE = re.compile(r"^([a-z])\)\s+(.*)$")
GROUP_RE = re.compile(r"^(\d+)\.\s+(\S.*)$")            # CFE 101's numbered sub-topics
BULLET_RE = re.compile(r"^[•o▪◦●\-]\s+(.*)$")
ROMAN_RE = re.compile(r"^(?:i|ii|iii|iv|v|vi|vii|viii|ix|x)\.\s+(.*)$")   # CP 311's sub-items
_CODE = r"\d+(?:\.\d+)?[a-z]{0,2}(?:\s*[-–]\s*(?:\d+(?:\.\d+)?)?[a-z]{1,2})?"
# A code is `2a`, `1.2d`, `3a-3d`; after one, a bare letter or letter range
# (`6a, c-d, f`) and a full stop typed for a comma (`2a. 2b`) are still codes.
CODES_RE = re.compile(
    rf"^(?:Background|{_CODE}(?:\s*[,.]?\s*(?:{_CODE}|[a-z](?:\s*[-–]\s*[a-z])?))*\s*,?\s*)$")
LEAD_IN_RE = re.compile(r"^The Candidate will be able to(.*?):?\s*$", re.I)
END_OF_OUTCOMES_RE = re.compile(
    r"^(Resources|Learning|Outcomes|Readings:?|REQUIRED RESOURCES:?|Textbooks|Other Resources:?|OTHER RESOURCES:?)\s*$")
# What a reading list also lists that is no reading: the exam's tables, formula
# sheet and notation note, the sample questions, a text's errata.
READING_SKIP_RE = re.compile(
    r"^(?:sample (?:excel )?questions|(?:\w+ )?formula sheet|tables for|excel workbook|notation and terminology"
    r"|corrections and comments|errata|exam \w+ tables|tables)", re.I)


# ── text layer ───────────────────────────────────────────────────────────────

def clean(text: str) -> str:
    for k, v in LIGATURES.items():
        text = text.replace(k, v)
    return text


def layout_pages(pdf_path: str) -> list[list[str]]:
    """Each page as lines of text with every word at its column, like
    `pdftotext -layout`: indentation and the gap between a resource table's
    two columns survive, which is what the parser reads structure from."""
    import pymupdf  # lazy: the rest of the pipeline is stdlib

    pages: list[list[str]] = []
    with pymupdf.open(pdf_path) as doc:
        for page in doc:
            words = page.get_text("words", sort=True)
            rows: list[list[tuple]] = []
            mid = lambda w: (w[1] + w[3]) / 2   # a bullet glyph sits on the centre line
            for w in sorted(words, key=lambda w: (round(mid(w)), w[0])):
                if rows and abs(mid(rows[-1][0]) - mid(w)) < 3:
                    rows[-1].append(w)
                else:
                    rows.append([w])
            lines: list[str] = []
            last_y = None
            for row in rows:
                row.sort(key=lambda w: w[0])
                y = row[0][3]
                if last_y is not None and y - last_y > 20:
                    lines.append("")
                last_y = y
                line = ""
                prev_x1 = None
                for w in row:
                    if prev_x1 is not None and w[0] - prev_x1 < 9:
                        line += " " + clean(w[4])          # the next word of a phrase
                    else:
                        col = int(round(w[0] / 4.4))   # a new column: pad to its place,
                        if prev_x1 is not None:        # never closer than three spaces
                            col = max(col, len(line) + 3)
                        line = line.ljust(col) + clean(w[4])
                    prev_x1 = w[2]
                lines.append(line.rstrip())
            pages.append(lines)
    return pages


def strip_furniture(pages: list[list[str]]) -> list[str]:
    """One stream of lines with the page furniture gone: page numbers, the
    copyright line, and the running header a fellowship syllabus repeats at
    the top of every page (course name, sittings)."""
    # The running header repeats the document's own title lines.
    title = [l.strip() for l in pages[0] if l.strip()][:3]
    tops = Counter()
    for lines in pages[1:]:
        for l in [l.strip() for l in lines if l.strip()][:2]:
            tops[l] += 1
    structural = {"Learning Objectives", "Learning Outcomes", "Resources", "Learning", "Outcomes"}
    running = {l for l in title if not TOPIC_RE.match(l) and tops[l]}
    running |= {l for l, n in tops.items() if n >= 3 and not TOPIC_RE.match(l) and l not in structural}
    out: list[str] = []
    for i, lines in enumerate(pages):
        for l in lines:
            s = l.strip()
            if re.fullmatch(r"\d{1,2}", s) or s.startswith("Copyright ©"):
                continue
            if i > 0 and s in running:
                continue
            out.append(l.rstrip())
        out.append("")
    return out


def norm(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def join_wrapped(a: str, b: str) -> str:
    """Join a line and its wrapped continuation; a hyphen at a line end that
    splits a compound (`European-` / `style`) is kept, since the PDF prints it."""
    a, b = a.rstrip(), b.strip()
    if a.endswith("-") and not a.endswith(" -"):
        return a + b
    return f"{a} {b}"


# ── objectives ───────────────────────────────────────────────────────────────

def parse_topics(lines: list[str]) -> list[dict]:
    starts = [i for i, l in enumerate(lines) if TOPIC_RE.match(l.strip())]
    topics = []
    for k, i in enumerate(starts):
        end = starts[k + 1] if k + 1 < len(starts) else len(lines)
        m = TOPIC_RE.match(lines[i].strip())
        topics.append(_parse_topic(m, lines[i + 1:end]))
    return topics


def _parse_topic(m: re.Match, body: list[str]) -> dict:
    weight_raw = m.group(3).strip()
    topic = {"num": int(m.group(1)), "title": norm(m.group(2)), "weight_raw": weight_raw,
             "weight": _weight(weight_raw), "objective": "", "outcomes": [], "resources": []}
    if weight_raw.startswith("Included"):
        # GI 101's Topic 7 is weighted inside other topics: the title keeps the
        # SOA's own words, and the topic carries no weight of its own.
        topic["title"] = f"{topic['title']} ({weight_raw})"
    stage = "head"
    objective: list[str] = []
    lead_in: list[str] = []
    group: str | None = None
    rest_at = len(body)
    for j, raw in enumerate(body):
        s = raw.strip()
        if stage == "head":
            if s == "Learning Objectives":
                stage = "objective"
            elif s == "Learning Outcomes":
                stage = "outcomes"
            continue
        if stage == "objective":
            if s == "Learning Outcomes":
                stage = "outcomes"
            elif s:
                objective.append(s)
            continue
        # outcomes. Under its own heading, a lead-in longer than "The Candidate
        # will be able to:" ("Given a context, …, the Candidate will be able
        # to:") heads the outcomes; it is not part of the objective above.
        if objective and not topic["outcomes"] and group is None and s and not LEAD_IN_RE.match(s):
            if ITEM_RE.match(s):
                if lead_in:
                    group = norm(" ".join(lead_in))
            elif not END_OF_OUTCOMES_RE.match(s):
                lead_in.append(s)
                continue
        if not s:
            continue
        if END_OF_OUTCOMES_RE.match(s):   # the resource table (or reading list) begins
            rest_at = j
            break
        lead = LEAD_IN_RE.match(s)
        if lead:
            label = lead.group(1).strip(" ,:")
            if label:   # "The Candidate will be able to, for severity models:"
                group = s.rstrip(":") + ":"
            continue
        item = ITEM_RE.match(s)
        if item:
            topic["outcomes"].append({"letter": item.group(1), "text": item.group(2).strip(),
                                      "bullets": [], "group": group})
            group = None
            continue
        g = GROUP_RE.match(s)
        if g and (not topic["outcomes"] or _looks_like_group(body, j)):
            group = f"{g.group(1)}. {norm(g.group(2))}"
            continue
        bullet = BULLET_RE.match(s) or ROMAN_RE.match(s)
        if bullet and topic["outcomes"]:
            topic["outcomes"][-1]["bullets"].append(bullet.group(1).strip())
            continue
        if topic["outcomes"]:
            last = topic["outcomes"][-1]
            if last["bullets"]:
                last["bullets"][-1] = join_wrapped(last["bullets"][-1], s)
            else:
                last["text"] = join_wrapped(last["text"], s)
        else:
            objective.append(s)
    topic["objective"] = norm(" ".join(objective))
    for o in topic["outcomes"]:
        o["text"] = norm(o["text"])
        o["bullets"] = [norm(b) for b in o["bullets"]]
    topic["resources"] = parse_resource_table(body[rest_at:])
    return topic


def _next(body: list[str], j: int) -> str:
    for l in body[j + 1:]:
        if l.strip():
            return l.strip()
    return ""


def _looks_like_group(body: list[str], j: int) -> bool:
    """A numbered line inside a topic's outcomes is a sub-topic heading (CFE 101)
    when lettered outcomes follow it."""
    return bool(ITEM_RE.match(_next(body, j)))


def _weight(raw: str) -> list[float] | None:
    nums = [float(x) for x in re.findall(r"\d+(?:\.\d+)?", raw)] if not raw.startswith("Included") else []
    if not nums:
        return [0, 0]
    lo, hi = nums[0], nums[-1]
    return [int(lo) if lo.is_integer() else lo, int(hi) if hi.is_integer() else hi]


# ── a fellowship syllabus's per-topic resource table ─────────────────────────

def _split_columns(line: str) -> tuple[str, str]:
    """(left text, outcome codes) of one table line."""
    parts = re.split(r"\s{3,}", line.strip())
    if len(parts) >= 2 and CODES_RE.match(parts[-1].strip()):
        return "   ".join(parts[:-1]).strip(), parts[-1].strip()
    if len(parts) == 1 and CODES_RE.match(parts[0]) and len(line) - len(line.lstrip()) > 40:
        return "", parts[0]
    return line.strip(), ""


def parse_resource_table(lines: list[str]) -> list[dict]:
    rows: list[dict] = []
    pending_codes = ""
    prev_blank = True
    for raw in lines:
        s = raw.strip()
        if not s:
            prev_blank = True
            continue
        if s in ("Learning", "Resources", "Outcomes") or re.fullmatch(r"Resources\s+Outcomes", s):
            continue
        left, codes = _split_columns(raw)
        if not left:
            # Codes alone on a line: the wrapped end of the row above (it ended
            # on a comma, or had none yet), or — when a tall cell centres its
            # codes — the start of the row below.
            if rows and not prev_blank and (rows[-1]["codes"].endswith(",") or not rows[-1]["codes"]):
                rows[-1]["codes"] = _join_codes(rows[-1]["codes"], codes)
            elif rows and rows[-1]["codes"].endswith(","):
                rows[-1]["codes"] = _join_codes(rows[-1]["codes"], codes)
            else:
                pending_codes = _join_codes(pending_codes, codes)
            continue
        bullet = BULLET_RE.match(left)
        if bullet and rows:
            rows[-1]["parts"].append({"text": bullet.group(1).strip(), "codes": codes})
            prev_blank = False
            continue
        if rows and not prev_blank and not rows[-1]["parts"]:
            rows[-1]["citation"] = join_wrapped(rows[-1]["citation"], left)
            rows[-1]["codes"] = _join_codes(rows[-1]["codes"], codes)
        elif rows and not prev_blank and rows[-1]["parts"]:
            p = rows[-1]["parts"][-1]
            p["text"] = join_wrapped(p["text"], left)
            p["codes"] = _join_codes(p["codes"], codes)
        else:
            rows.append({"citation": left, "codes": _join_codes(pending_codes, codes), "parts": []})
            pending_codes = ""
        prev_blank = False
    for r in rows:
        r["citation"] = norm(r["citation"])
        r["codes"] = norm(r["codes"]).rstrip(",")
        for p in r["parts"]:
            p["text"], p["codes"] = norm(p["text"]), norm(p["codes"]).rstrip(",")
    return rows


def _join_codes(a: str, b: str) -> str:
    a, b = a.strip(), b.strip()
    if not a:
        return b
    if not b:
        return a
    return f"{a} {b}"


# ── a preliminary syllabus's reading list ────────────────────────────────────

READINGS_START_RE = re.compile(r"^(Readings:?|Resources|Textbooks|REQUIRED RESOURCES:?)\s*$")
READINGS_STOP_RE = re.compile(r"^(Other Resources:?|OTHER RESOURCES:?|Past Exams and Model Solutions|A NOTE ON .*|Note:.*)$")


def parse_reading_list(lines: list[str]) -> list[dict]:
    """The citations of an ASA syllabus's closing reading list, each with the
    chapters it assigns. A citation starts at the left margin (or at a `•`) and
    may wrap; its chapters are indented under it (or `o` bullets)."""
    start = None
    for i, l in enumerate(lines):
        if READINGS_START_RE.match(l.strip()) and any(TOPIC_RE.match(x.strip()) for x in lines[:i]):
            start = i
            if l.strip().startswith(("Readings", "Resources", "Textbooks")):
                break
    if start is None:
        return []
    out: list[dict] = []
    margin = None
    prev_blank = True
    table: list[tuple[str, int]] | None = None   # a two-edition table: (header, column)
    for raw in lines[start + 1:]:
        s = raw.strip()
        if READINGS_STOP_RE.match(s):
            break
        if not s:
            prev_blank = True
            table = None
            continue
        cols = [(m.group(0), m.start()) for m in re.finditer(r"\S+(?: \S+)*", raw)]
        if out and len(cols) == 2 and all("Edition" in c for c, _ in cols):
            # PA's "First Edition / Second Edition" table under one citation: each
            # row is an assignment per edition, labelled with the column's header.
            table = cols
            for head, _ in table:
                out[-1]["parts"].append({"text": f"{head}:", "codes": ""})
            continue
        if table:
            heads = out[-1]["parts"][-len(table):]
            for text, pos in cols:
                k = 0 if abs(pos - table[0][1]) <= abs(pos - table[1][1]) else 1
                if re.match(r"^(Chapter|Ch\.)\s", text):
                    heads[k]["text"] += f" {text};"
                else:
                    heads[k]["text"] = heads[k]["text"].rstrip(";") + f" {text};"
            continue
        if TOPIC_RE.match(s) or s in ("e-Learning Modules", "R and RStudio", "Textbooks"):
            prev_blank = True
            continue
        indent = len(raw) - len(raw.lstrip())
        bullet = BULLET_RE.match(s)
        sub = re.match(r"^o\s+(.*)$", s)
        if margin is None:
            margin = indent
        if sub or (indent >= margin + 4 and not bullet and out and re.match(r"^(Chapter|Ch\.|Part|Section)s?\s", s)):
            out[-1]["parts"].append({"text": (sub.group(1) if sub else s).strip(), "codes": ""})
            prev_blank = False
            continue
        if bullet:
            out.append({"citation": bullet.group(1).strip(), "codes": "", "parts": []})
        elif out and not prev_blank and not out[-1]["parts"]:
            out[-1]["citation"] = join_wrapped(out[-1]["citation"], s)
        elif out and out[-1]["parts"] and indent >= margin + 4:
            out[-1]["parts"][-1]["text"] = join_wrapped(out[-1]["parts"][-1]["text"], s)
        elif out and prev_blank is False and out[-1]["parts"]:
            out[-1]["parts"][-1]["text"] = join_wrapped(out[-1]["parts"][-1]["text"], s)
        else:
            out.append({"citation": s, "codes": "", "parts": []})
        prev_blank = False
    keep = []
    for r in out:
        r["citation"] = norm(r["citation"])
        for p in r["parts"]:
            p["text"] = norm(p["text"]).rstrip(";")
        # Prose about the readings, not a reading: a citation names a work, so
        # it carries a year, an ISBN or a study-note code.
        if READING_SKIP_RE.search(r["citation"]):
            continue
        if not re.search(r"\b(19|20)\d{2}\b|ISBN|Edition|^[A-Z]{2,5}-\d", r["citation"]):
            continue
        keep.append(r)
    return keep


def embedded_resources(lines: list[str]) -> list[dict]:
    """ATPA lists no reading: its syllabus says every required resource is in
    its e-Learning modules. That sentence is the whole of its reading list."""
    for i, l in enumerate(lines):
        if READINGS_START_RE.match(l.strip()):
            para: list[str] = []
            for x in lines[i + 1:]:
                if not x.strip():
                    if para:
                        break
                    continue
                para.append(x.strip())
            text = norm(" ".join(para))
            if "e-Learning modules" in text:
                return [{"citation": "e-Learning Modules", "codes": "", "parts": [{"text": text, "codes": ""}]}]
    return []


# ── the document ─────────────────────────────────────────────────────────────

FELLOWSHIP_RE = re.compile(r"^[A-Z]{2,3} \d{3}")
SITTINGS_RE = re.compile(r"^(?:[A-Z][a-z]{2} \d{4}/)*[A-Z][a-z]{2} \d{4}$|^(?:JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER) \d{4}$")


def header(lines: list[str]) -> dict:
    """The syllabus's own name for the exam and its sittings, from its first
    lines (`GH 101 – Benefits and Pricing` / `Nov 2026/Mar 2027/Jul 2027`, or
    `Fundamentals of Actuarial Mathematics Exam—October 2026`)."""
    first = [l.strip() for l in lines if l.strip()][:4]
    title, sitting = first[0], ""
    m = re.match(r"^(.*?)\s*[—–-]\s*((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})$", title)
    if m:
        return {"title": m.group(1), "sitting": m.group(2)}
    for l in first[1:]:          # a title that wraps, up to the sittings line
        if SITTINGS_RE.match(l):
            sitting = l
            break
        if l.startswith(("Important", "The ")) or len(l) > 70:
            break
        title = f"{title} {l}"
    return {"title": title, "sitting": sitting}


def intro(lines: list[str], head: dict) -> list[str]:
    """The paragraphs before the learning outcomes begin, verbatim (reflowed)."""
    paras: list[str] = []
    cur = ""
    skip = f"{head['title']} {head['sitting']}"
    i = 0
    while i < len(lines) and (not lines[i].strip() or lines[i].strip() in skip
                              or lines[i].strip().startswith(head["title"])):
        i += 1
    for l in lines[i:] + [""]:
        s = l.strip()
        if re.match(r"^(LEARNING (OUTCOMES|OBJECTIVES)|Important Course Information:?)$", s) or TOPIC_RE.match(s):
            break
        if not s:
            if cur:
                paras.append(norm(cur))
                cur = ""
            continue
        cur = join_wrapped(cur, s) if cur else s
    if cur:
        paras.append(norm(cur))
    return [p for p in paras if not re.match(r"^[A-Z][a-z]{2} \d{4}/", p)]


def extract(wiki_id: str, url: str, pdf_path: str) -> dict:
    with open(pdf_path, "rb") as fh:
        sha = hashlib.sha256(fh.read()).hexdigest()
    lines = strip_furniture(layout_pages(pdf_path))
    topics = parse_topics(lines)
    head = header(lines)
    data = {
        "wiki_id": wiki_id,
        "body": "SOA",
        **head,
        "source_url": url,
        "source_sha256": sha,
        "extracted_at": date.today().isoformat(),
        "intro": intro(lines, head),
        "topics": topics,
        "readings": [],
    }
    if not FELLOWSHIP_RE.match(data["title"]):
        # A preliminary syllabus lists its readings once, at the end; what the
        # last topic's table reader saw there is that list, read again below.
        data["readings"] = parse_reading_list(lines) or embedded_resources(lines)
        for t in topics:
            t["resources"] = []
    return data


# ── an e-learning module's "Introduction and Objectives" ─────────────────────
#
# One shape across the SOA's modules: a title, a *Module Introduction* and a
# *Module Objectives* list, then a heading per section — a paragraph on it,
# "After you complete this section, you will be able to:" and bulleted
# objectives (`o` sub-bullets beneath some). FAP has a level more: a heading
# per module of the course, a heading per section of each, and *Description:* /
# *Objectives:* labels inside a section. The headings are told apart by their
# type, not their wording — the body size is the most common one, the title the
# largest, and a heading level is any other style used three times or more — so
# a sentence set in the heading's words is never taken for one.

INTRO_HEADINGS = re.compile(r"^(?:Module|FAP) Introduction$")
INTRO_OBJECTIVES = re.compile(r"^(?:Module|FAP) Objectives$")
MODULE_BULLET_RE = re.compile(r"^([•o▪])\s+(.*)$")
MODULE_LABEL_RE = re.compile(r"^(Description|Objectives?):\s*(.*)$")
MODULE_LEAD_IN_RE = re.compile(r"\bwill be able to(?: \w+)?:\s*$")


def module_headings(pdf_path: str) -> tuple[str, list[tuple[int, str]]]:
    """The document's title, and every heading in reading order with its level
    (1 the outermost)."""
    import pymupdf  # lazy

    styled: list[tuple[tuple[float, str], str]] = []
    weight: Counter = Counter()
    with pymupdf.open(pdf_path) as doc:
        for page in doc:
            for block in page.get_text("dict")["blocks"]:
                for line in block.get("lines", []):
                    spans = [s for s in line["spans"] if s["text"].strip()]
                    if not spans:
                        continue
                    style = (round(spans[0]["size"], 1), spans[0]["font"])
                    text = norm(clean("".join(s["text"] for s in spans)))
                    styled.append((style, text))
                    weight[style] += len(text)
    body = weight.most_common(1)[0][0]
    title_style = max((s for s, _ in styled), key=lambda s: s[0])
    uses = Counter(s for s, _ in styled)
    levels = sorted({s for s in uses if body[0] < s[0] < title_style[0] and uses[s] >= 3},
                    key=lambda s: -s[0])
    title = norm(" ".join(t for s, t in styled if s == title_style))
    return title, [(levels.index(s) + 1, t) for s, t in styled if s in levels]


def module_lines(pdf_path: str) -> list[str]:
    """The document as one stream of laid-out lines, less its page numbers and
    copyright line. Not `strip_furniture`: a module's sections open pages with
    the same words ("Section 1: Module Overview", "Description:"), which that
    would take for a running header."""
    out: list[str] = []
    for lines in layout_pages(pdf_path):
        for l in lines:
            s = l.strip()
            if re.fullmatch(r"\d{1,2}", s) or s.startswith("Copyright ©"):
                continue
            out.append(l.rstrip())
        out.append("")
    return out


def module_tokens(lines: list[str]) -> list[tuple[str, str]]:
    """Body lines as ("para" | "b1" | "b2" | "label" | "lead", text), each
    wrapped line joined to the one it continues. A paragraph broken by a page
    break (a blank, then a line starting in lower case) is one paragraph."""
    out: list[list[str]] = []
    indent_of = lambda l: len(l) - len(l.lstrip())
    bullet_indent = None
    gap = False
    for raw in lines:
        s = raw.strip()
        if not s:
            gap = True
            continue
        b = MODULE_BULLET_RE.match(s)
        lab = MODULE_LABEL_RE.match(s)
        if b:
            out.append(["b1" if b.group(1) == "•" else "b2", b.group(2).strip()])
            bullet_indent = indent_of(raw)
        elif lab:
            out.append(["label", lab.group(1)])
            if lab.group(2):
                out.append(["para", lab.group(2)])
            bullet_indent = None
        elif out and out[-1][0] in ("b1", "b2") and not gap and bullet_indent is not None and indent_of(raw) > bullet_indent:
            out[-1][1] = join_wrapped(out[-1][1], s)
        elif out and out[-1][0] == "para" and (not gap or s[:1].islower()):
            out[-1][1] = join_wrapped(out[-1][1], s)
        else:
            out.append(["para", s])
            bullet_indent = None
        gap = False
    for t in out:
        t[1] = norm(t[1])
        if t[0] == "para" and MODULE_LEAD_IN_RE.search(t[1]):
            t[0] = "lead"
    return [(k, v) for k, v in out]


def _bullet_block(tokens: list[tuple[str, str]]) -> str:
    return "\n".join(("    - " if k == "b2" else "- ") + v for k, v in tokens)


def parse_module(lines: list[str], headings: list[tuple[int, str]]) -> tuple[list, list[dict]]:
    """(intro, topics). A one-level document makes a topic of each section; FAP
    makes one of each module, its sections the bold groups the outcomes sit
    under and its *Module Overview* description the topic's objective. A
    section's lead-in ("After you complete this section, you will be able to:")
    is dropped, as an exam syllabus's "The Candidate will be able to:" is."""
    two_levels = any(level == 2 for level, _ in headings)
    queue = list(headings)
    chunks: list[tuple[int, str, list[str]]] = []   # (level, heading, its lines)
    for raw in lines:
        s = norm(raw)
        if queue and s == queue[0][1]:
            level, text = queue.pop(0)
            chunks.append((level, text, []))
        elif chunks:
            chunks[-1][2].append(raw)
    intro: list[str] = []
    topics: list[dict] = []
    for level, heading, body in chunks:
        tokens = module_tokens(body)
        if INTRO_HEADINGS.match(heading):
            for k, v in tokens:
                if k == "para":
                    intro.append(v)
                elif k in ("b1", "b2"):
                    if intro and intro[-1].startswith("- "):
                        intro[-1] += "\n" + _bullet_block([(k, v)])
                    else:
                        intro.append(_bullet_block([(k, v)]))
            continue
        if INTRO_OBJECTIVES.match(heading):
            intro.append(f"**{heading}**")
            bullets = [(k, v) for k, v in tokens if k in ("b1", "b2")]
            intro.append(_bullet_block(bullets))
            intro += [v for k, v in tokens if k == "para"]
            continue
        if level == 1:
            topics.append({"num": len(topics) + 1, "title": heading, "weight_raw": "", "weight": None,
                           "objective": "", "outcomes": [], "resources": []})
            group = None
        elif not topics:
            continue
        else:
            group = heading
        topic = topics[-1]
        overview = level == 1 or bool(re.search(r"\bModule Overview$", heading))
        label = None
        for k, v in tokens:
            if k == "label":
                label = v
            elif k == "para":
                # The paragraph on a section is the topic's objective; in FAP
                # only the module overview's is, the sections' are dropped.
                if overview and label != "Objectives" and not (two_levels and level == 1):
                    topic["objective"] = norm(f"{topic['objective']} {v}")
            elif k == "b1":
                topic["outcomes"].append({"letter": "", "num": len(topic["outcomes"]) + 1, "text": v,
                                          "bullets": [], "group": group})
            elif k == "b2" and topic["outcomes"]:
                topic["outcomes"][-1]["bullets"].append(v)
    for t in topics:
        for i, o in enumerate(t["outcomes"]):
            o["letter"] = chr(ord("a") + i) if i < 26 else ""
    return intro, topics


def book_list(path: str, table: str | None) -> list[dict]:
    """A module's book list: the numbered entries of its PDF, or the rows of
    one table on an HTML book-list page (DMAC's)."""
    if table:
        with open(path, encoding="utf-8") as fh:
            page = fh.read()
        at = page.find(f"<strong>{table}</strong>")
        if at < 0:
            return []
        body = page[at:page.find("</table>", at)]
        rows = []
        for row in re.findall(r"<tr>(.*?)</tr>", body, re.S)[0:]:
            cell = re.search(r"<td[^>]*>(.*?)</td>", row, re.S)
            text = norm(html.unescape(re.sub(r"<[^>]+>", " ", cell.group(1)))) if cell else ""
            if text and text != table and text.upper() != "ERRATA":
                rows.append({"citation": text, "codes": "", "parts": []})
        return rows
    entries: list[str] = []
    number_at = None
    for l in module_lines(path):
        s = l.strip()
        m = re.match(r"^\d+\.\s+(.*)$", s)
        if m:
            entries.append(m.group(1))
            number_at = len(l) - len(l.lstrip())
        elif entries and s:
            if len(l) - len(l.lstrip()) <= number_at:
                break
            entries[-1] = join_wrapped(entries[-1], s)
    return [{"citation": norm(e), "codes": "", "parts": []} for e in entries]


def module_extract(wiki_id: str, spec: dict[str, str], pdf_path: str, books_path: str) -> dict:
    with open(pdf_path, "rb") as fh:
        sha = hashlib.sha256(fh.read()).hexdigest()
    with open(books_path, "rb") as fh:
        books_sha = hashlib.sha256(fh.read()).hexdigest()
    title, headings = module_headings(pdf_path)
    lines = module_lines(pdf_path)
    intro_paras, topics = parse_module(lines, headings)
    name = re.sub(r"\s+(?:Module\s+)?Introduction and Objectives$", "", title)
    name = re.sub(r"\s+Module$", "", name)
    return {
        "wiki_id": wiki_id,
        "body": "SOA",
        "shape": "module",
        "title": name,
        "sitting": "",
        "source_url": spec["url"],
        "source_sha256": sha,
        "readings_url": spec["books"],
        "readings_sha256": books_sha,
        "extracted_at": date.today().isoformat(),
        "intro": intro_paras,
        "topics": topics,
        "readings": book_list(books_path, spec.get("books_table")),
    }


def run_module(wiki_id: str) -> dict:
    spec = MODULES[wiki_id]
    out = os.path.join(OUT_DIR, wiki_id)
    os.makedirs(out, exist_ok=True)
    pdf = os.path.join(out, "source.pdf")
    books = os.path.join(out, "books.html" if spec.get("books_table") else "books.pdf")
    for url, dest in ((spec["url"], pdf), (spec["books"], books)):
        if not os.path.exists(dest):
            fetch(url, dest)
    data = module_extract(wiki_id, spec, pdf, books)
    with open(os.path.join(out, "syllabus.json"), "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    n_out = sum(len(t["outcomes"]) for t in data["topics"])
    print(f"{wiki_id}: {len(data['topics'])} sections, {n_out} objectives, {len(data['readings'])} readings — {data['title']}")
    return data


def fetch(url: str, dest: str) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (actuarial-notes syllabus_extract)"})
    with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as fh:
        fh.write(r.read())


def run(wiki_id: str, url: str, pdf: str | None) -> dict:
    out = os.path.join(OUT_DIR, wiki_id)
    os.makedirs(out, exist_ok=True)
    if not pdf:
        pdf = os.path.join(out, "source.pdf")   # .gitignored: the JSON is the record
        if not os.path.exists(pdf):
            fetch(url, pdf)
    data = extract(wiki_id, url, pdf)
    with open(os.path.join(out, "syllabus.json"), "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    n_out = sum(len(t["outcomes"]) for t in data["topics"])
    n_res = sum(len(t["resources"]) for t in data["topics"]) + len(data["readings"])
    print(f"{wiki_id}: {len(data['topics'])} topics, {n_out} outcomes, {n_res} readings — {data['title']}")
    return data


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--wiki-id")
    ap.add_argument("--url")
    ap.add_argument("--pdf", help="a local copy of the PDF (default: download --url)")
    ap.add_argument("--all", action="store_true", help="every syllabus in SOURCES")
    args = ap.parse_args(argv)
    if args.all:
        for wid, url in SOURCES.items():
            run(wid, url, None)
        for wid in MODULES:
            run_module(wid)
        return 0
    if not args.wiki_id:
        ap.error("--wiki-id (or --all) is required")
    if args.wiki_id in MODULES:
        run_module(args.wiki_id)
        return 0
    url = args.url or SOURCES.get(args.wiki_id)
    if not url:
        ap.error("--url is required for a wiki id not in SOURCES")
    run(args.wiki_id, url, args.pdf)
    return 0


if __name__ == "__main__":
    sys.exit(main())
