#!/usr/bin/env python3
"""Stage 1 of the syllabus pipeline: a syllabus PDF → `syllabus.json`. No model.

The examining bodies publish what an exam covers as a PDF — the SOA a per-sitting
*Syllabus*, the CAS a per-administration *Content Outline*. This reads one and
writes what it says, verbatim, to `.syllabus/<wiki id>/syllabus.json`: the
sections and their weights, each section's preamble, every numbered objective
with its sub-items, the per-section reading list and the reference table. A model
never retypes any of it — the same rule as the question-bank pipeline
(docs/pdf-question-pipeline.md), for the same reason: retyping is where a
transcription drifts, and nothing downstream can then tell the examining body's
words from the vault's.

Two stages, so the part with rules is testable without the PDF:

  pdf_layout()   the only PyMuPDF call (imported lazily, like pdf_extract.py):
                 every text line with its x position and weight, bullet glyphs
                 merged onto their line, and the reference tables
  parse_layout() pure: a layout → the syllabus dict, by one of two parsers —
                 `soa` (Topic / Learning Objectives / Learning Outcomes / a) b)
                 c), then Suggested Texts) or `cas` (a DOMAINS table, then per
                 domain a preamble, TASKS, Readings, then the Complete Text
                 References table)

`scripts/fixtures/syllabus/<wiki id>.layout.json` is the committed layout of each
current PDF (`--dump-layout`), and scripts/test_syllabus_pipeline.py parses them —
so CI checks the parsers with no PDF and no PyMuPDF.

Strings are the PDF's own: whitespace is normalised, wrapped lines rejoined, and
typographic quotes and dashes straightened (`mdmath`-style clean-up of characters,
never of words). The source is pinned by URL, sha256 and the sitting the document
names for itself.

Usage:
    python3 scripts/syllabus_extract.py --exam 5-1                # fetch the URL in examPdfLinks.ts
    python3 scripts/syllabus_extract.py --exam 5-1 --pdf local.pdf
    python3 scripts/syllabus_extract.py --exam 5-1 --dump-layout  # refresh the test fixture too
    python3 scripts/syllabus_extract.py --exam 5-1 --from-layout scripts/fixtures/syllabus/5-1.layout.json

The URL is read from quiz/src/data/examPdfLinks.ts — transcribed from the
publisher, never built from a filename pattern (see that file). An exam with no
entry there has no syllabus to extract yet.
"""

from __future__ import annotations

import argparse
import datetime
import hashlib
import json
import os
import re
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import vault_links as vl  # noqa: E402

ROOT = vl.REPO_ROOT
SYLLABUS_DIR = os.path.join(ROOT, ".syllabus")
FIXTURE_DIR = os.path.join(ROOT, "scripts", "fixtures", "syllabus")
PDF_LINKS_TS = os.path.join(ROOT, "quiz", "src", "data", "examPdfLinks.ts")
EXTRACTOR_VERSION = 1

BULLET_GLYPHS = {"•", "o", "", "▪", "◦", "§", "", "-", "–"}
# Characters normalised on the way in — typography, not wording.
CHAR_MAP = {
    "’": "'", "‘": "'", "“": '"', "”": '"', " ": " ",
    "–": "–", "—": "—", "ﬁ": "fi", "ﬂ": "fl", "‐": "-", "‑": "-",
}


def clean(text: str) -> str:
    for a, b in CHAR_MAP.items():
        text = text.replace(a, b)
    return re.sub(r"\s+", " ", text).strip()


def join_lines(parts: list[str]) -> str:
    """Rejoin a wrapped paragraph. A line break is a space — except after a
    trailing slash, which the PDF wraps without one (`Operational/` `Marketing`)."""
    out = ""
    for p in (clean(p) for p in parts):
        if not p:
            continue
        if not out:
            out = p
        elif out.endswith("/"):
            out += p
        else:
            out += " " + p
    return out


# ── stage 1a: the PDF → a layout (the only PyMuPDF code) ───────────────────

def pdf_layout(pdf_path: str) -> dict:
    import pymupdf  # lazy: everything else here runs without it

    doc = pymupdf.open(pdf_path)
    pages = []
    for page in doc:
        raw = []
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                spans = [s for s in line["spans"] if s["text"]]
                if not spans:
                    continue
                text = "".join(s["text"] for s in spans)
                if not text.strip():
                    continue
                bold = all((s["flags"] & 16) or "Bold" in s["font"] for s in spans if s["text"].strip())
                raw.append({"x": round(line["bbox"][0], 1), "y": round(line["bbox"][1], 1),
                            "text": text.rstrip(), "bold": bool(bold)})
        lines = []
        i = 0
        while i < len(raw):
            cur = raw[i]
            # A bullet glyph set as its own line: fold it onto the text beside it.
            if cur["text"].strip() in BULLET_GLYPHS and i + 1 < len(raw) and abs(raw[i + 1]["y"] - cur["y"]) < 3:
                nxt = raw[i + 1]
                lines.append({**nxt, "x": cur["x"], "text": "• " + nxt["text"].strip()})
                i += 2
                continue
            # A marker set as its own line (`i)` then the outcome on the next).
            if re.fullmatch(r"\s*[a-z]\)\s*", cur["text"]) and i + 1 < len(raw):
                nxt = raw[i + 1]
                lines.append({**cur, "text": cur["text"].strip() + " " + nxt["text"].strip()})
                i += 2
                continue
            lines.append(cur)
            i += 1
        tables = []
        for tab in page.find_tables().tables:
            rows = tab.extract()
            if rows and rows[0] and (rows[0][0] or "").strip().startswith("Citation"):
                tables.append([[c if c is not None else None for c in r] for r in rows])
        pages.append({"lines": lines, "tables": tables})
    return {"pages": pages}


# ── stage 1b: a layout → the syllabus (pure) ───────────────────────────────

def parse_layout(layout: dict, body: str) -> dict:
    if body == "SOA":
        return parse_soa(layout)
    if body == "CAS":
        return parse_cas(layout)
    raise ValueError(f"no parser for examining body {body!r}")


def _all_lines(layout: dict) -> list[dict]:
    out = []
    for n, page in enumerate(layout["pages"]):
        for line in page["lines"]:
            out.append({**line, "page": n, "text": clean(line["text"])})
    return [l for l in out if l["text"]]


def _weight(raw: str) -> dict:
    m = re.fullmatch(r"(\d+)\s*(?:[-–]\s*(\d+))?%", raw.strip())
    if not m:
        raise ValueError(f"unreadable weight {raw!r}")
    lo = int(m.group(1))
    return {"lo": lo, "hi": int(m.group(2) or lo)}


def _items_by_indent(lines: list[dict], base_x: float) -> list[dict]:
    """Nest bulleted lines by their x position. A line that isn't a bullet
    continues the item above it."""
    items: list[dict] = []
    stack: list[tuple[float, list]] = [(base_x - 1, items)]
    last: dict | None = None
    for line in lines:
        m = re.match(r"^[•o\-–]\s+(.*)$", line["text"])
        if not m:
            if last is not None:
                last["_parts"].append(line["text"])
            continue
        x = line["x"]
        while len(stack) > 1 and x <= stack[-1][0] + 2:
            stack.pop()
        item = {"_parts": [m.group(1)], "subitems": []}
        stack[-1][1].append(item)
        stack.append((x, item["subitems"]))
        last = item
    return _finish(items)


def _finish(items: list[dict]) -> list[dict]:
    out = []
    for it in items:
        entry = {"text": join_lines(it.pop("_parts"))}
        subs = _finish(it["subitems"])
        if subs:
            entry["subitems"] = subs
        out.append(entry)
    return out


# ── SOA ────────────────────────────────────────────────────────────────────

SOA_TOPIC_RE = re.compile(r"^(\d+)\.\s+Topic:\s+(.*?)\s*\((\d+\s*[-–]\s*\d+%)\)$")
SOA_OUTCOME_RE = re.compile(r"^([a-z])\)\s*(.*)$")


def parse_soa(layout: dict) -> dict:
    lines = _all_lines(layout)
    # Page furniture: running page numbers.
    lines = [l for l in lines if not re.fullmatch(r"\d{1,2}", l["text"])]
    sitting = None
    for l in lines[:6]:
        m = re.search(r"Exam\s*[–—-]\s*(\w+ \d{4})$", l["text"])
        if m:
            sitting = m.group(1)
            break

    sections: list[dict] = []
    i = 0
    ref_start = None
    while i < len(lines):
        t = lines[i]["text"]
        if re.match(r"^(REFERENCES|Text References)$", t):
            ref_start = i
            break
        m = SOA_TOPIC_RE.match(t)
        if not m:
            i += 1
            continue
        sec = {"letter": m.group(1), "title": m.group(2), "weight_raw": m.group(3).replace(" ", ""),
               "weight": _weight(m.group(3).replace(" ", "")), "preamble": [], "objectives": [],
               "readings": []}
        sections.append(sec)
        i += 1
        mode = None
        pre: list[str] = []
        outcome_lines: list[dict] = []
        while i < len(lines):
            t = lines[i]["text"]
            if SOA_TOPIC_RE.match(t) or re.match(r"^(REFERENCES|Text References)$", t):
                break
            if t == "Learning Objectives":
                mode = "objectives"
            elif t == "Learning Outcomes":
                mode = "outcomes"
            elif t == "The Candidate will be able to:":
                pass
            elif mode == "objectives":
                pre.append(t)
            elif mode == "outcomes":
                outcome_lines.append(lines[i])
            i += 1
        if pre:
            sec["preamble"] = [join_lines(pre)]
        sec["objectives"] = _soa_outcomes(outcome_lines)

    readings = _soa_references(lines[ref_start:]) if ref_start is not None else []
    return {"sitting": sitting, "version": None, "sections": sections, "readings": readings}


def _soa_outcomes(lines: list[dict]) -> list[dict]:
    objectives: list[dict] = []
    cur: dict | None = None
    for line in lines:
        m = SOA_OUTCOME_RE.match(line["text"])
        if m and (cur is None or line["x"] <= cur["_x"] + 3):
            cur = {"num": m.group(1), "_x": line["x"], "_parts": [m.group(2)], "_sub": []}
            objectives.append(cur)
            continue
        if cur is None:
            continue
        if cur["_sub"] or re.match(r"^[•o]\s", line["text"]):
            cur["_sub"].append(line)
        else:
            cur["_parts"].append(line["text"])
    out = []
    for o in objectives:
        entry = {"num": o["num"], "text": join_lines(o["_parts"])}
        subs = _items_by_indent(o["_sub"], o["_x"]) if o["_sub"] else []
        if subs:
            entry["subitems"] = subs
        out.append(entry)
    return out


def _soa_references(lines: list[dict]) -> list[dict]:
    """The suggested texts: a citation (up to its ISBN) and the chapter lines under it."""
    readings: list[dict] = []
    started = False
    cite: list[str] = []
    cur: dict | None = None
    for line in lines:
        t = line["text"]
        if re.match(r"^(Suggested Texts|Suggested Textbooks)$", t):
            started = True
            continue
        if not started:
            continue
        if re.match(r"^(Other Resources|Tables for Exam)", t):
            break
        is_chapter = re.match(r"^Chapter \d", t)
        if cur is not None and is_chapter:
            cur["detail"].append(t)
            continue
        if cur is not None and cur["detail"] and not cite and not re.search(r"ISBN|Edition", t):
            cur.setdefault("notes", []).append(t)
            continue
        if re.search(r"(Edition\)|ISBN|, \d{4},)", t) or cite:
            cite.append(t)
            if "ISBN" in t:
                cur = {"citation": join_lines(cite), "abbreviation": None, "assignment": None,
                       "detail": [], "source_type": None}
                readings.append(cur)
                cite = []
            continue
        # Front matter of the list (the "no required text" paragraph).
    for r in readings:
        if "notes" in r:
            r["notes"] = [join_lines(r["notes"])]
    return readings


# ── CAS ────────────────────────────────────────────────────────────────────

CAS_FURNITURE_RE = re.compile(r"^(Casualty Actuarial Society Exam .* Content Outline|\d{1,2}|TASKS \(Continued\))$")
CAS_TASK_RE = re.compile(r"^(\d+)\.\s+(.*)$")
WEIGHT_ONLY_RE = re.compile(r"^\d+\s*(?:[-–]\s*\d+)?%$")


def parse_cas(layout: dict) -> dict:
    lines = [l for l in _all_lines(layout) if not CAS_FURNITURE_RE.match(l["text"])]
    version = sitting = None
    for l in lines:
        m = re.match(r"^Version:\s*(.*?)(?:\.docx)?$", l["text"])
        if m:
            version = m.group(1).strip()
            y = re.search(r"(?:_(\d{4})_([SF])\b|_([SF])_(\d{4})\b)", version)
            if y:
                year, season = (y.group(1), y.group(2)) if y.group(1) else (y.group(4), y.group(3))
                sitting = f"{'Spring' if season == 'S' else 'Fall'} {year}"

    # The DOMAINS table: title lines, then the weight.
    i = next(k for k, l in enumerate(lines) if l["text"] == "DOMAINS")
    i += 1
    while lines[i]["text"] in ("DOMAIN WEIGHT", "DOMAIN", "WEIGHT"):
        i += 1
    domains: list[dict] = []
    buf: list[str] = []
    while i < len(lines):
        t = lines[i]["text"]
        if WEIGHT_ONLY_RE.match(t):
            title = join_lines(buf)
            m = re.match(r"^([A-Z])\.\s+(.*)$", title)
            domains.append({"letter": m.group(1), "title": m.group(2), "weight_raw": t.replace(" ", ""),
                            "weight": _weight(t.replace(" ", ""))})
            buf = []
        elif buf == [] and domains and re.match(r"^[A-Z]\.\s", t) and t[0] == domains[0]["letter"]:
            break  # the first domain's own section heading: the table is over
        else:
            buf.append(t)
        i += 1

    sections = []
    for d_i, dom in enumerate(domains):
        start = _find_domain_heading(lines, i, dom["letter"])
        nxt = _find_domain_heading(lines, start + 1, domains[d_i + 1]["letter"]) if d_i + 1 < len(domains) else \
            next(k for k in range(start, len(lines)) if lines[k]["text"].startswith("Complete Text References"))
        sections.append(_cas_section(dom, lines[start:nxt]))
        i = nxt

    ref_rows = []
    for page in layout["pages"]:
        for table in page["tables"]:
            ref_rows.extend(table[1:])
    return {"sitting": sitting, "version": version, "sections": sections, "readings": _cas_references(ref_rows)}


def _find_domain_heading(lines: list[dict], start: int, letter: str) -> int:
    for k in range(start, len(lines)):
        if lines[k]["bold"] and re.match(rf"^{letter}\.\s", lines[k]["text"]):
            return k
    raise ValueError(f"no heading for domain {letter}")


def _cas_section(dom: dict, lines: list[dict]) -> dict:
    sec = {**dom, "preamble": [], "objectives": [], "readings": []}
    # Skip the heading (it may wrap over two bold lines).
    k = 1
    while k < len(lines) and lines[k]["bold"] and lines[k]["text"] != "TASKS":
        k += 1
    pre_lines, task_lines, reading_lines = [], [], []
    mode = "preamble"
    for line in lines[k:]:
        t = line["text"]
        if t == "TASKS":
            mode = "tasks"
            continue
        if re.match(r"^Readings:?$", t):
            mode = "readings"
            continue
        {"preamble": pre_lines, "tasks": task_lines, "readings": reading_lines}[mode].append(line)

    sec["preamble"] = _paragraphs(pre_lines)
    group = None
    cur = None
    for line in task_lines:
        t = line["text"]
        m = CAS_TASK_RE.match(t)
        if m:
            cur = {"num": m.group(1), "_parts": [m.group(2)]}
            if group:
                cur["group"] = group
            sec["objectives"].append(cur)
        elif line["bold"]:
            group = t
            cur = None
        elif cur is not None:
            cur["_parts"].append(t)
    for o in sec["objectives"]:
        o["text"] = join_lines(o.pop("_parts"))

    note: list[str] = []
    for line in reading_lines:
        m = re.match(r"^-\s+(.*)$", line["text"])
        if m:
            sec["readings"].append(clean(m.group(1)))
        elif sec["readings"]:
            sec["readings"][-1] = join_lines([sec["readings"][-1], line["text"]])
        else:
            note.append(line["text"])
    if note:
        sec["readings_note"] = join_lines(note)
    return sec


def _paragraphs(lines: list[dict]) -> list[str]:
    """Preamble lines → paragraphs and `- ` bullet items, rejoined. A vertical gap
    wider than a line's own leading starts a new paragraph."""
    out: list[str] = []
    buf: list[str] = []
    prev = None
    bullet = False
    for line in lines:
        t = line["text"]
        is_bullet = t.startswith("- ")
        gap = prev is not None and (line["page"] != prev["page"] or line["y"] - prev["y"] > 18)
        if buf and (is_bullet or gap or (bullet and line["x"] < prev["x"] - 2 and not is_bullet)):
            out.append(join_lines(buf))
            buf = []
        buf.append(t)
        bullet = is_bullet or (bullet and not gap)
        prev = line
    if buf:
        out.append(join_lines(buf))
    return out


def _cas_references(rows: list[list]) -> list[dict]:
    out = []
    for row in rows:
        if len(row) != 4 or not row[0] or not (row[1] or "").strip():
            continue
        cite, abbr, tasks, source = row
        cite_lines = [clean(x) for x in cite.split("\n")]
        head, detail = [], []
        for l in cite_lines:
            if l.startswith("- "):
                detail.append(l[2:])
            elif detail:
                detail[-1] = join_lines([detail[-1], l])
            else:
                head.append(l)
        out.append({
            "citation": join_lines(head),
            "abbreviation": join_lines(abbr.split("\n")),
            "assignment": re.sub(r"\s*,\s*", ", ", join_lines(tasks.split("\n"))),
            "detail": detail,
            "source_type": clean(source or "") or None,
        })
    return out


# ── the command ────────────────────────────────────────────────────────────

def syllabus_url(wiki_id: str) -> str | None:
    """The syllabus URL transcribed in quiz/src/data/examPdfLinks.ts, or None."""
    with open(PDF_LINKS_TS, encoding="utf-8") as fh:
        ts = fh.read()
    table = ts[ts.index("const SYLLABUS_PDF_LINKS"):]
    table = table[: table.index("\n}\n")]
    m = re.search(rf"'{re.escape(wiki_id)}':\s*\{{\s*url:\s*'([^']+)'", table)
    return m.group(1) if m else None


def build(exam: dict, layout: dict, source_url: str, sha256: str, extracted_at: str) -> dict:
    parsed = parse_layout(layout, exam["body"])
    return {
        "exam_page": exam["page"],
        "wiki_id": exam["wiki_id"],
        "body": exam["body"],
        "source_url": source_url,
        "source_sha256": sha256,
        "sitting": parsed["sitting"],
        "version": parsed["version"],
        "extracted_at": extracted_at,
        "extractor": EXTRACTOR_VERSION,
        "sections": parsed["sections"],
        "readings": parsed["readings"],
    }


def write_json(path: str, data: dict) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
        fh.write("\n")


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--exam", required=True, help="wiki id, data-current id, bank or page (5-1, 5, exam-5, …)")
    ap.add_argument("--pdf", help="a local copy of the PDF instead of fetching the URL")
    ap.add_argument("--from-layout", help="parse a saved layout (a fixture) instead of a PDF")
    ap.add_argument("--dump-layout", action="store_true", help="also write the layout fixture")
    ap.add_argument("--stdout", action="store_true", help="print the JSON instead of writing it")
    args = ap.parse_args(argv)

    exam = vl.exam_for_id(args.exam)
    if not exam:
        sys.exit(f"unknown exam {args.exam!r} — see scripts/exam_catalog.json")
    url = syllabus_url(exam["wiki_id"])
    if not url:
        sys.exit(f"{exam['page']}: no syllabus URL in quiz/src/data/examPdfLinks.ts. Locate the "
                 "publisher's current document and transcribe its URL there first.")

    if args.from_layout:
        with open(args.from_layout, encoding="utf-8") as fh:
            layout = json.load(fh)
        sha = layout.get("source_sha256", "")
    else:
        if args.pdf:
            with open(args.pdf, "rb") as fh:
                pdf_bytes = fh.read()
            pdf_path = args.pdf
        else:
            with urllib.request.urlopen(url, timeout=60) as resp:
                pdf_bytes = resp.read()
            pdf_path = os.path.join(SYLLABUS_DIR, exam["wiki_id"], "_source.pdf")
            os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
            with open(pdf_path, "wb") as fh:
                fh.write(pdf_bytes)
        sha = "sha256:" + hashlib.sha256(pdf_bytes).hexdigest()
        layout = pdf_layout(pdf_path)
        layout["source_sha256"] = sha
        if not args.pdf:
            os.remove(pdf_path)
        if args.dump_layout:
            write_json(os.path.join(FIXTURE_DIR, f"{exam['wiki_id']}.layout.json"), layout)

    out_path = os.path.join(SYLLABUS_DIR, exam["wiki_id"], "syllabus.json")
    extracted_at = datetime.date.today().isoformat()
    if os.path.exists(out_path):
        with open(out_path, encoding="utf-8") as fh:
            prev = json.load(fh)
        if prev.get("source_sha256") == sha:
            extracted_at = prev.get("extracted_at", extracted_at)  # same document: keep the date stable
    data = build(exam, layout, url, sha, extracted_at)
    if args.stdout:
        print(json.dumps(data, ensure_ascii=False, indent=2))
        return 0
    write_json(out_path, data)
    n_obj = sum(len(s["objectives"]) for s in data["sections"])
    print(f"{exam['page']}: {len(data['sections'])} sections, {n_obj} objectives, "
          f"{len(data['readings'])} readings — {data['sitting'] or 'sitting not stated'} → "
          f"{os.path.relpath(out_path, ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
