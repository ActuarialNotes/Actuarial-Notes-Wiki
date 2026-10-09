#!/usr/bin/env python3
"""
verify_paper.py — one past paper as a VERIFY work packet.

`docs/verification-plan.md` §3–4: every remaining past-paper question is checked
against the paper it was sat on, so the paper is the unit of work. This builds
the packet a validate agent works through, with everything that can be done
without a model already done:

  * The packet's members are every vault question that cites the paper, across
    banks: Exam 9's bank holds questions CAS set on Exam 7 and Exam 8 papers
    (`originally_exam`), and they belong with that paper.
  * The paper comes from the shared source cache (`verify_sources.py`), OCR'd
    once. The report side — points, parts, sample answers, the examiner's
    report, a multiple-choice key — comes from `pdf_extract.py`, as the
    converter reads it.
  * Each question's stem is **located** in the booklet by its own tokens and
    diffed against the pages it lands on. A clean diff needs no page image; a
    diverging one says which pages to render. (`pdf_extract.py`'s booklet
    alignment is good enough to write a first draft, but on an OCR'd scan it
    misplaces prompts, so the check locates them independently.)
  * The **blind stem** (no key, no explanation, no sample answer) is written
    apart from the source side, so a pass recomputes before it reads the answer
    (P5).

Usage:
  python3 scripts/verify_paper.py list [--all]
  python3 scripts/verify_paper.py build --exam "Exam 5" --year 2019 --session Fall
  python3 scripts/verify_paper.py build --soa fm --questions <url> --solutions <url> --ids 351-462

`build` writes, under `--out` (default: the paper's folder in the source cache):
  packet.md         read first — the paper, its citation, one row per question
  blind/<n>.md      the stem only: recompute from this before reading anything else
  source/<n>.md     the stem diff, the mechanical checks, the paper's own prompt and
                    the examiner's report or solution for that question
  packet.json       the same, machine-readable
"""

from __future__ import annotations

import argparse
import contextlib
import io
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import verify_lib as V  # noqa: E402
import verify_sources as S  # noqa: E402

REPO_ROOT = V.REPO_ROOT
PDF_LINKS = REPO_ROOT / "quiz" / "src" / "data" / "examPdfLinks.ts"

# Exams sat once a year: pdf_extract leaves the session out of the id.
SINGLE_SITTING = {"Exam 7", "Exam 8", "Exam 9"}

# Section headings whose content is the answer side of a question file.
ANSWER_HEADING_RE = re.compile(
    r"(?i)^(explanation|examiner'?s?\s+report|sample\s+answers?|solution|answer)\b"
)
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*?)\s*$")
QNUM_RE = re.compile(r"-q?(\d+)$")
PAGE_PENALTY = 3.5


# ─── Frontmatter ──────────────────────────────────────────────────────────────

def fm_value(fm: str, key: str) -> str:
    m = re.search(r"^" + re.escape(key) + r":\s*(.*)$", fm, re.M)
    return m.group(1).strip().strip('"').strip("'") if m else ""


def question_meta(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    fm, _body = V.split_frontmatter(text)
    fm = fm or ""
    block = V.parse_verification(text) or {}
    qid = fm_value(fm, "id")
    m = QNUM_RE.search(qid)
    return {
        "path": V.rel_path(path),
        "id": qid,
        "num": int(m.group(1)) if m else None,
        "exam": fm_value(fm, "exam"),
        "paper_exam": fm_value(fm, "originally_exam") or fm_value(fm, "exam"),
        "year": fm_value(fm, "year"),
        "session": fm_value(fm, "session"),
        "type": fm_value(fm, "type"),
        "points": fm_value(fm, "points"),
        "answer": fm_value(fm, "answer"),
        "off_syllabus": fm_value(fm, "off_syllabus") == "true",
        "status": str(block.get("status") or "unverified"),
    }


# ─── The paper table ──────────────────────────────────────────────────────────

def paper_links(text: str | None = None) -> dict[tuple[str, str, str], str]:
    """`('Exam 5', '2019', 'fall')` → the paper's URL, from the app's table."""
    if text is None:
        text = PDF_LINKS.read_text(encoding="utf-8") if PDF_LINKS.is_file() else ""
    out: dict[tuple[str, str, str], str] = {}
    for m in re.finditer(r"'(Exam [^|']+)\|(\d{4})\|(\w+)':\s*\{\s*url:\s*'([^']+)'", text):
        out[(m.group(1), m.group(2), m.group(3).lower())] = m.group(4)
    return out


def paper_key(meta: dict) -> tuple[str, str, str] | None:
    if not meta["year"]:
        return None
    return (meta["paper_exam"], meta["year"], meta["session"].lower())


def all_questions() -> list[dict]:
    return [question_meta(p) for p in sorted((REPO_ROOT / "questions").glob("*/*.md"))
            if V.is_content_file(p)]


def extract_code(exam: str) -> str:
    """`Exam 6C` → `6c`, `Exam MAS-II` → `mas-ii`: pdf_extract's `--exam`."""
    return exam.replace("Exam", "").strip().lower()


# ─── Blind stem and token diff ────────────────────────────────────────────────

def blind_stem(body: str) -> str:
    """A question body with every answer-side section removed.

    A heading that names an explanation, examiner's report, sample answer or
    solution starts a cut that runs to the next heading of the same or higher
    level — so `## Part b` survives its part a's `### Examiner Report`, and the
    prompt of each part stays.
    """
    out: list[str] = []
    cut_level: int | None = None
    for line in body.split("\n"):
        h = HEADING_RE.match(line)
        if h:
            level = len(h.group(1))
            if cut_level is not None and level <= cut_level:
                cut_level = None
            if cut_level is None and ANSWER_HEADING_RE.match(h.group(2)):
                cut_level = level
                continue
        if cut_level is None:
            out.append(line)
    return re.sub(r"\n{3,}", "\n\n", "\n".join(out)).strip() + "\n"


def diffable(stem: str) -> str:
    """The stem as the booklet prints it: no options (checked against the key's
    record instead) and no headings — `## Part a (0.25 points)` is the vault's
    furniture, and its points are checked mechanically."""
    return "\n".join(
        l for l in stem.split("\n")
        if not re.match(r"^\s*-\s+[A-E]\)", l) and not HEADING_RE.match(l)
    )


def _delatex(text: str) -> str:
    # An environment's name (`\begin{cases}`) is markup, not a word the page prints.
    text = re.sub(r"\\(?:begin|end)\{[^}]*\}", " ", text)
    text = text.replace("{,}", ",").replace("\\,", "").replace("\\%", "%").replace("\\$", "$")
    return re.sub(r"\\[A-Za-z]+", " ", text)


def numbers(text: str) -> list[str]:
    """Every number as printed, thousands separators dropped: `4,200,000` → `4200000`."""
    text = re.sub(r"(?<=\d),(?=\d{3}\b)", "", _delatex(text))
    out = []
    for m in re.finditer(r"\d+(?:\.\d+)?", text):
        n = m.group(0)
        if "." in n:
            n = n.rstrip("0").rstrip(".") or "0"
        out.append(n)
    return out


def words(text: str) -> list[str]:
    return re.findall(r"[a-z]{4,}", _delatex(text).lower())


def locate(stem: str, pages: dict[int, str], max_span: int = 3) -> dict:
    """Find the run of consecutive pages that best holds `stem`, and diff it.

    Scored on the stem's numbers and words found in the run, less a little per
    page so a question is not padded with its neighbours' pages. Returns the
    pages, the stem numbers the run lacks (counted as a multiset, so a number
    printed twice has to be there twice), word recall and a verdict:

      clean     every number found, ≥95% of the words
      check     at most two numbers missing, or ≥85% of the words
      diverges  anything worse — read the page image
    """
    s_nums, s_words = Counter(numbers(stem)), Counter(words(stem))
    total_n, total_w = sum(s_nums.values()), sum(s_words.values())
    order = sorted(pages)
    best: tuple[float, list[int], Counter, Counter] | None = None
    for i in range(len(order)):
        for span in range(1, max_span + 1):
            run = order[i:i + span]
            if len(run) < span or run[-1] - run[0] != span - 1:
                break
            joined = "\n".join(pages[p] for p in run)
            p_nums, p_words = Counter(numbers(joined)), Counter(words(joined))
            got_n = sum(min(c, p_nums[k]) for k, c in s_nums.items())
            got_w = sum(min(c, p_words[k]) for k, c in s_words.items())
            # A page beyond the first has to earn its place: two more numbers
            # or three more words, or the run is a neighbour's padding.
            score = got_n * 2 + got_w - PAGE_PENALTY * (span - 1)
            if best is None or score > best[0]:
                best = (score, run, p_nums, p_words)
    if best is None:
        return {"pages": [], "missing_numbers": sorted(s_nums.elements()), "word_recall": 0.0,
                "missing_words": [], "verdict": "diverges"}
    _score, run, p_nums, p_words = best
    missing_n = sorted((s_nums - p_nums).elements())
    missing_w = sorted((s_words - p_words).elements())
    recall = 1.0 if not total_w else (total_w - len(missing_w)) / total_w
    if not missing_n and recall >= 0.95:
        verdict = "clean"
    elif len(missing_n) <= 2 and recall >= 0.85:
        verdict = "check"
    else:
        verdict = "diverges"
    return {"pages": run, "missing_numbers": missing_n, "word_recall": round(recall, 3),
            "missing_words": missing_w[:25], "verdict": verdict, "stem_numbers": total_n}


# ─── Mechanical checks against the extracted record ───────────────────────────

PART_HEADING_RE = re.compile(r"(?im)^##\s+Part\s+([a-z])\b[^\n]*?\(([\d.]+)\s*points?\)")


def _num(value) -> float | None:
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _clip(text: str, width: int = 80) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    return text if len(text) <= width else text[: width - 1] + "…"


def mechanical_checks(meta: dict, body: str, record: dict | None) -> list[str]:
    """What the paper's own record says that the vault file contradicts.

    Points, part labels and points, and for multiple choice the key and the
    options. Each line is a lead for the pass to confirm on the page, not a
    finding on its own: the extractor can misread too.
    """
    if record is None:
        return ["the paper's report has no record for this question number"]
    issues: list[str] = []
    vp, rp = _num(meta["points"]), _num(record.get("points"))
    if vp is not None and rp is not None and abs(vp - rp) > 1e-9:
        issues.append(f"points: vault {meta['points']}, report {record.get('points')}")
    v_parts = {m.group(1): float(m.group(2)) for m in PART_HEADING_RE.finditer(body)}
    r_parts = {str(p.get("label")): _num(p.get("points")) for p in record.get("parts") or []}
    if v_parts and r_parts:
        if sorted(v_parts) != sorted(r_parts):
            issues.append(f"parts: vault {','.join(sorted(v_parts))}, report {','.join(sorted(r_parts))}")
        for label in sorted(set(v_parts) & set(r_parts)):
            if r_parts[label] is not None and abs(v_parts[label] - r_parts[label]) > 1e-9:
                issues.append(f"part {label} points: vault {v_parts[label]:g}, report {r_parts[label]:g}")
    key = record.get("answer")
    if key and meta["answer"] and key.strip().upper() != meta["answer"].strip().upper():
        issues.append(f"key: vault {meta['answer']}, publisher {key}")
    r_opts = record.get("options") or {}
    if r_opts:
        v_opts = dict(re.findall(r"(?m)^\s*-\s+([A-E])\)\s*(.*)$", body))
        for letter in sorted(set(v_opts) | set(r_opts)):
            if letter not in v_opts or letter not in r_opts:
                issues.append(f"option {letter}: missing on one side")
            else:
                # A formula option comes out of a PDF's text layer scrambled — its
                # tokens in another order — so compare what numbers each holds,
                # and flag only the direction that is a transcription error: a
                # number the vault prints that the publisher's option does not.
                extra = Counter(numbers(v_opts[letter])) - Counter(numbers(r_opts[letter]))
                if extra:
                    issues.append(f"option {letter}: vault has {', '.join(sorted(extra.elements()))} "
                                  f"not in the publisher's {_clip(r_opts[letter])!r}")
    return issues


# ─── Extraction ───────────────────────────────────────────────────────────────

def _run_extract(argv: list[str]) -> None:
    import pdf_extract  # noqa: PLC0415

    sink = io.StringIO()
    with contextlib.redirect_stdout(sink), contextlib.redirect_stderr(sink):
        code = pdf_extract.main(argv)
    if code:
        raise SystemExit(f"pdf_extract failed:\n{sink.getvalue()[-2000:]}")


def cas_records(exam: str, year: str, session: str, url: str) -> list[dict]:
    """The report side of a CAS paper, read by the converter's own extractor.

    Run without OCR: the report has a text layer, and the booklet is located
    from the source cache's OCR instead. Cached beside the source.
    """
    pdf = S.source_file(url)
    out = S.source_dir(url) / "extract"
    records = out / "records.jsonl"
    if not records.is_file():
        argv = ["--exam", extract_code(exam), "--year", year, "--session", session.title(),
                "--pdf", str(pdf), "--out", str(out), "--no-render"]
        if exam in SINGLE_SITTING:
            argv.append("--single-sitting")
        _run_extract(argv)
    return [json.loads(l) for l in records.read_text(encoding="utf-8").splitlines() if l.strip()]


def soa_records(code: str, q_url: str, s_url: str) -> list[dict]:
    q_pdf, s_pdf = S.source_file(q_url), S.source_file(s_url)
    out = S.source_dir(q_url) / f"extract-{S.cache_key(s_url)}"
    records = out / "records.jsonl"
    if not records.is_file():
        _run_extract(["--exam", code, "--questions", str(q_pdf), "--solutions", str(s_pdf),
                      "--out", str(out), "--no-render"])
    return [json.loads(l) for l in records.read_text(encoding="utf-8").splitlines() if l.strip()]


# ─── Packet ───────────────────────────────────────────────────────────────────

def _source_text(record: dict | None) -> str:
    if record is None:
        return "_No record for this question in the extracted paper._\n"
    out: list[str] = []
    if record.get("body"):
        source = record.get("prompt_source") or ""
        note = " (OCR; spot-check against the page)" if record.get("ocr") else ""
        out.append(f"### The paper's prompt, as extracted{note}\n\n{record['body'].strip()}\n")
        if source == "aligned" or record.get("ocr"):
            out.append("_The extractor aligned this prompt on an OCR'd scan; the stem diff above "
                       "is the better guide to which pages hold the question._\n")
    for letter, text in sorted((record.get("options") or {}).items()):
        out.append(f"- {letter}) {text}")
    if record.get("options"):
        out.append("")
    if record.get("answer"):
        out.append(f"**Publisher's key:** {record['answer']}\n")
    for part in record.get("parts") or []:
        out.append(f"### Part {part.get('label')} ({part.get('points')} points)\n")
        if part.get("prompt"):
            out.append(f"{part['prompt'].strip()}\n")
        for i, sample in enumerate(part.get("samples") or [], 1):
            out.append(f"**Sample answer {i}**\n\n{sample.strip()}\n")
        if part.get("report"):
            out.append(f"**Examiner's report**\n\n{part['report'].strip()}\n")
    if record.get("solution"):
        out.append(f"### Publisher's solution\n\n{record['solution'].strip()}\n")
    if record.get("examiner_report") and not record.get("parts"):
        out.append(f"### Examiner's report\n\n{record['examiner_report'].strip()}\n")
    for alt in record.get("alternatives") or []:
        out.append(f"### Alternative\n\n{str(alt).strip()}\n")
    return "\n".join(out).strip() + "\n"


def build_packet(members: list[dict], records: list[dict], urls: list[str], label: str,
                 booklet_url: str, booklet_pages: list[int], out: Path,
                 titles: list[str] | None = None) -> dict:
    by_num = {r["num"]: r for r in records}
    meta = S.fetch(booklet_url)
    texts = dict(S.read_pages(booklet_url))
    booklet = {p: texts[p] for p in booklet_pages if p in texts}
    (out / "blind").mkdir(parents=True, exist_ok=True)
    (out / "source").mkdir(parents=True, exist_ok=True)

    rows = []
    for m in sorted(members, key=lambda m: (m["num"] or 0, m["path"])):
        text = (REPO_ROOT / m["path"]).read_text(encoding="utf-8")
        _fm, body = V.split_frontmatter(text)
        stem = blind_stem(body)
        record = by_num.get(m["num"])
        loc = locate(diffable(stem), booklet)
        checks = mechanical_checks(m, body, record)
        ocr_hit = sorted(set(loc["pages"]) & set(meta.get("ocr_pages") or []))
        n = m["num"]

        head = (f"# {m['id']} — blind stem\n\n`{m['path']}` · {m['type']} · "
                f"{m['points'] or '?'} points{' · off-syllabus' if m['off_syllabus'] else ''}\n\n"
                "Recompute from this before opening the source file.\n\n---\n\n")
        (out / "blind" / f"{n}.md").write_text(head + stem, encoding="utf-8")

        pages = S.ranges(loc["pages"]) if loc["pages"] else "?"
        diff_lines = [f"- booklet page(s): {pages}"
                      + (f" (OCR'd: {S.ranges(ocr_hit)})" if ocr_hit else ""),
                      f"- verdict: **{loc['verdict']}** — word recall {loc['word_recall']:.0%}"]
        if loc["missing_numbers"]:
            diff_lines.append("- stem numbers not on those pages: " + ", ".join(loc["missing_numbers"]))
        if loc["missing_words"]:
            diff_lines.append("- stem words not on those pages: " + ", ".join(loc["missing_words"]))
        if loc["verdict"] != "clean" and loc["pages"]:
            diff_lines.append(f"- read it: `python3 scripts/verify_sources.py render "
                              f"\"{booklet_url}\" --pages {pages}`")
        report_pages = (record or {}).get("pages", {}).get("solution") or []
        body_lines = [f"# {m['id']} — source side\n", "## Stem diff against the booklet\n",
                      *diff_lines, "", "## Mechanical checks\n",
                      *([f"- {c}" for c in checks] or ["- none: points, parts and key agree"]), "",
                      f"## The paper (report pages {S.ranges(report_pages) or '?'})\n",
                      _source_text(record)]
        (out / "source" / f"{n}.md").write_text("\n".join(body_lines), encoding="utf-8")
        rows.append({**m, "booklet_pages": loc["pages"], "verdict": loc["verdict"],
                     "missing_numbers": loc["missing_numbers"], "word_recall": loc["word_recall"],
                     "report_pages": report_pages, "checks": checks})

    titles = titles or [""] * len(urls)
    citations = [S.citation(S.fetch(u), title=t) for u, t in zip(urls, titles)]
    verdicts = Counter(r["verdict"] for r in rows)
    lines = [
        f"# Packet: {label}\n",
        f"{len(rows)} question(s) · stems {verdicts['clean']} clean, {verdicts['check']} to check, "
        f"{verdicts['diverges']} diverging · "
        f"{sum(1 for r in rows if r['checks'])} with mechanical leads\n",
        "## Source\n",
        *[f"- {c}" for c in citations],
        f"- booklet pages {S.ranges(booklet_pages)}"
        + (f"; OCR'd {S.ranges(meta.get('ocr_pages') or [])}" if meta.get("ocr_pages") else "")
        + (f"; image-only {S.ranges(meta.get('image_pages') or [])}" if meta.get("image_pages") else ""),
        "",
        "Cite a question as the line above with its locator, e.g. "
        f"`python3 scripts/verify_sources.py cite \"{urls[0]}\" --locator \"Q12, pp.6-7, 58-59\"`.\n",
        "## For each question\n",
        "1. Read `blind/<n>.md` and recompute (P5) — before anything else.",
        "2. Read `source/<n>.md`: key or sample answers, then the stem diff and the mechanical leads.",
        "3. `clean` needs no image. `check` and `diverges` do: render the pages it names and read them.",
        "4. Record the pass (or the finding) in this packet's batch file for `verify_record.py batch`.\n",
        "## Questions\n",
        "| # | File | Status | Stem | Booklet | Report | Leads |",
        "|---:|---|---|---|---|---|---:|",
    ]
    for r in rows:
        lines.append(f"| {r['num']} | `{r['path']}` | {r['status']} | {r['verdict']} | "
                     f"{S.ranges(r['booklet_pages']) or '?'} | {S.ranges(r['report_pages']) or '?'} | "
                     f"{len(r['checks'])} |")
    (out / "packet.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    packet = {"label": label, "sources": citations, "booklet_pages": booklet_pages, "questions": rows}
    (out / "packet.json").write_text(json.dumps(packet, indent=1, ensure_ascii=False), encoding="utf-8")
    return packet


# ─── CLI ──────────────────────────────────────────────────────────────────────

def cmd_list(args: argparse.Namespace) -> int:
    links = paper_links()
    groups: dict[tuple, list[dict]] = defaultdict(list)
    for q in all_questions():
        key = paper_key(q) or ("SOA sample set", q["path"].split("/")[1], "")
        groups[key].append(q)
    print("| Paper | Questions | Not verified | Off-syllabus | Banks | Source |")
    print("|---|---:|---:|---:|---|---|")
    for key in sorted(groups):
        qs = groups[key]
        todo = [q for q in qs if q["status"] != "verified"]
        if not todo and not args.all:
            continue
        banks = ",".join(sorted({q["path"].split("/")[1] for q in qs}))
        url = links.get(key, "") if key[0] != "SOA sample set" else ""
        print(f"| {' '.join(k for k in key if k).strip()} | {len(qs)} | {len(todo)} | "
              f"{sum(q['off_syllabus'] for q in todo)} | {banks} | "
              f"{url or ('—' if key[0] != 'SOA sample set' else 'pass --questions/--solutions')} |")
    return 0


def _select(qs: list[dict], include_verified: bool) -> list[dict]:
    return [q for q in qs if include_verified or q["status"] != "verified"]


def cmd_build(args: argparse.Namespace) -> int:
    if args.soa:
        if not (args.questions and args.solutions):
            raise SystemExit("--soa needs --questions and --solutions URLs")
        bank = f"exam-{args.soa}"
        wanted = set(S.page_spec(args.ids, 10_000)) if args.ids else None
        members = [q for q in all_questions() if q["path"].split("/")[1] == bank
                   and q["num"] is not None and (wanted is None or q["num"] in wanted)]
        members = _select(members, args.all)
        records = soa_records(args.soa, args.questions, args.solutions)
        meta = S.fetch(args.questions)
        booklet_pages = list(range(1, meta["pages"] + 1))
        urls, booklet_url = [args.questions, args.solutions], args.questions
        label = f"SOA {args.soa.upper()} sample questions" + (f" {args.ids}" if args.ids else "")
        titles = [f"SOA Exam {args.soa.upper()} Sample Questions",
                  f"SOA Exam {args.soa.upper()} Sample Solutions"]
    else:
        if not (args.exam and args.year and args.session):
            raise SystemExit("give --exam, --year and --session (or --soa)")
        key = (args.exam, str(args.year), args.session.lower())
        url = args.url or paper_links().get(key)
        if not url:
            raise SystemExit(f"no paper for {key} in {V.rel_path(PDF_LINKS)}; pass --url")
        members = _select([q for q in all_questions() if paper_key(q) == key], args.all)
        records = cas_records(args.exam, str(args.year), args.session, url)
        report_start = min((p for r in records for p in r.get("pages", {}).get("solution") or []),
                           default=S.fetch(url)["pages"] + 1)
        booklet_pages = list(range(1, report_start))
        urls, booklet_url = [url], url
        label = f"{args.exam} {args.session.title()} {args.year}"
        titles = [f"CAS {label} — exam and examiner's report"]
    if not members:
        print("nothing to check: every question on this paper is verified (pass --all to include them)")
        return 0
    slug = re.sub(r"[^a-z0-9]+", "-", label.lower()).strip("-")
    out = Path(args.out) if args.out else S.cache_root() / "packets" / slug
    packet = build_packet(members, records, urls, label, booklet_url, booklet_pages, out, titles)
    print(f"{out / 'packet.md'} — {len(packet['questions'])} question(s)")
    return 0


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="command", required=True)
    p = sub.add_parser("list", help="every past paper, with what is left to check on it")
    p.add_argument("--all", action="store_true", help="include fully verified papers")
    p = sub.add_parser("build", help="build one paper's packet")
    p.add_argument("--exam", help='the paper\'s exam label, e.g. "Exam 5"')
    p.add_argument("--year")
    p.add_argument("--session", help="Spring | Fall")
    p.add_argument("--url", help="override the paper URL from examPdfLinks.ts")
    p.add_argument("--soa", help="an SOA sample set instead: fm | p")
    p.add_argument("--questions", help="SOA questions PDF URL")
    p.add_argument("--solutions", help="SOA solutions PDF URL")
    p.add_argument("--ids", help="SOA question numbers, e.g. 351-462")
    p.add_argument("--all", action="store_true", help="include already verified questions")
    p.add_argument("--out", help="output folder")
    args = ap.parse_args(argv)
    return cmd_list(args) if args.command == "list" else cmd_build(args)


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except BrokenPipeError:  # `list | head`
        sys.stderr.close()
