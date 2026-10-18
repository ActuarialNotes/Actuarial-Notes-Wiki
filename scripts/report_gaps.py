#!/usr/bin/env python3
"""
report_gaps.py — find, and restore, the examiner's report paragraphs the
converter dropped (C13, `docs/content-plan.md` §3.5).

A CAS examiner's report often opens a question's commentary with a paragraph on
the question as a whole — "Candidates were expected to…" — before `Part a`.
`pdf_extract.py` always read it (the record's `examiner_report`), but
`question_write.py` wrote it only when no part had commentary of its own, so
most multi-part questions in the CAS banks shipped without it. The writer now
seats it at the head of the first part's `### Examiner Report`
(`with_overall_report`); this finds the files written before that.

For every CAS paper in the bank it re-reads the report side with the
converter's own extractor (through `verify_paper.cas_records`, cached in the
shared source cache) and scores each question file on how much of that opening
paragraph its reports already carry:

  present      the paragraph is there, word for word or nearly (≥ 80% of its
               words, and its opening run)
  paraphrased  most of its words are there but not as printed — a bank written
               before the pipeline, which reworded the report (Exam 5); a packet
               reading the page decides, never this script
  missing      the paragraph is not in the file

`apply` writes the **missing** ones back, verbatim (normalised by `mdmath` as
the writer normalises everything), at the head of the first
`### Examiner Report` — the place the writer now puts it and the Exam 7 packets
put it by hand. Nothing a PDF prints is retyped by a model. By default only
files that are not `verified` are touched: an edit makes a verified file stale
(P4), so those are listed for their paper's packet to restore as a delta.

Usage:
  python3 scripts/report_gaps.py list [--exam "Exam 5"] [--json out.json]
  python3 scripts/report_gaps.py apply [--exam "Exam 9"] [--include-verified] [--dry-run]

Needs the network (the first time a paper is read) and PyMuPDF. The scoring
and the insertion are pure and tested in `test_pdf_pipeline.py`.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import mdmath  # noqa: E402

# The CAS papers whose questions carry written parts and an examiner's report.
# MAS-I and MAS-II are multiple choice: their reports print no commentary.
CAS_WRITTEN_EXAMS = ("Exam 5", "Exam 6C", "Exam 7", "Exam 8", "Exam 9")

PRESENT_SHARE = 0.8
PARAPHRASE_SHARE = 0.5
# How many of the paragraph's opening words must appear as one run for it to
# count as printed rather than reworded.
OPENING_RUN = 8

REPORT_HEADING_RE = re.compile(r"(?m)^###\s+Examiner\s+Report\s*$")
NEXT_HEADING_RE = re.compile(r"(?m)^#{1,3}\s")
WORD_RE = re.compile(r"[a-z0-9]+")


# ─── Pure: scoring and insertion ──────────────────────────────────────────────

def words(text: str) -> list[str]:
    return WORD_RE.findall(mdmath.normalize_chars(text or "").lower())


def report_text(markdown: str) -> str:
    """Every `### Examiner Report` section of a question file, joined."""
    out = []
    for m in REPORT_HEADING_RE.finditer(markdown):
        nxt = NEXT_HEADING_RE.search(markdown, m.end())
        out.append(markdown[m.end() : nxt.start() if nxt else len(markdown)])
    return "\n".join(out)


def _has_run(needle: list[str], hay: list[str]) -> bool:
    n = len(needle)
    if not n:
        return True
    first = needle[0]
    return any(hay[i : i + n] == needle for i, w in enumerate(hay) if w == first)


def score(overall: str, markdown: str) -> str:
    """`present`, `paraphrased`, `missing` — or `none` when there is no paragraph."""
    want = words(overall)
    if not want:
        return "none"
    have_words = words(report_text(markdown) or markdown)
    have = Counter(have_words)
    need = Counter(w for w in want if len(w) > 3) or Counter(want)
    share = sum(min(c, have[w]) for w, c in need.items()) / sum(need.values())
    opening = _has_run(want[: min(OPENING_RUN, len(want))], have_words)
    if share >= PRESENT_SHARE and opening:
        return "present"
    if share >= PARAPHRASE_SHARE:
        return "paraphrased"
    return "missing"


def insert_overall(markdown: str, overall: str) -> str | None:
    """The file with `overall` opening its first `### Examiner Report`.

    None when the file has no such section to open — a question whose parts
    carry no commentary, which the writer always gave the paragraph to anyway.
    """
    m = REPORT_HEADING_RE.search(markdown)
    if not m:
        return None
    paragraph = mdmath.normalize_markdown(overall.strip()).strip()
    rest = markdown[m.end() :].lstrip("\n")
    return f"{markdown[: m.end()]}\n{paragraph}\n\n{rest}"


# ─── The bank against the papers ──────────────────────────────────────────────

def survey(exams: tuple[str, ...]) -> list[dict]:
    import verify_paper as VP  # noqa: PLC0415 — pulls in the source cache
    import verify_sources as S  # noqa: PLC0415

    links = VP.paper_links()
    by_paper: dict[tuple, list[dict]] = {}
    for q in VP.all_questions():
        key = VP.paper_key(q)
        if key and key[0] in exams and q["num"] is not None:
            by_paper.setdefault(key, []).append(q)
    rows: list[dict] = []
    for key in sorted(by_paper):
        url = links.get(key)
        if not url:
            print(f"  no paper URL for {key}; skipped", file=sys.stderr)
            continue
        S.fetch(url, ocr=False)
        try:
            records = {r["num"]: r for r in VP.cas_records(key[0], key[1], key[2], url)}
        except SystemExit as err:
            # One paper the extractor can't segment shouldn't stop the survey.
            print(f"  {key}: {str(err).splitlines()[-1]}; skipped", file=sys.stderr)
            continue
        for q in by_paper[key]:
            record = records.get(q["num"])
            overall = (record or {}).get("examiner_report") or ""
            if not record or not overall.strip():
                continue
            path = VP.REPO_ROOT / q["path"]
            rows.append({
                "paper": f"{key[0]} {key[2].title()} {key[1]}",
                "path": q["path"],
                "id": q["id"],
                "status": q["status"],
                "score": score(overall, path.read_text(encoding="utf-8")),
                "overall": overall.strip(),
            })
    return rows


def cmd_list(args: argparse.Namespace) -> int:
    rows = survey(tuple(args.exam) if args.exam else CAS_WRITTEN_EXAMS)
    tally: dict[str, Counter] = {}
    for r in rows:
        tally.setdefault(r["paper"].rsplit(" ", 2)[0], Counter())[r["score"]] += 1
    print("| Exam | Present | Paraphrased | Missing (not verified) | Missing (verified) |")
    print("|---|---:|---:|---:|---:|")
    for exam, c in sorted(tally.items()):
        miss_v = sum(1 for r in rows if r["paper"].startswith(exam + " ")
                     and r["score"] == "missing" and r["status"] == "verified")
        print(f"| {exam} | {c['present']} | {c['paraphrased']} | {c['missing'] - miss_v} | {miss_v} |")
    if args.json:
        Path(args.json).write_text(json.dumps(rows, indent=1, ensure_ascii=False), encoding="utf-8")
        print(f"\n{len(rows)} rows → {args.json}")
    return 0


def cmd_apply(args: argparse.Namespace) -> int:
    import verify_paper as VP  # noqa: PLC0415

    rows = survey(tuple(args.exam) if args.exam else CAS_WRITTEN_EXAMS)
    written = held = unplaced = 0
    for r in rows:
        if r["score"] != "missing":
            continue
        if r["status"] == "verified" and not args.include_verified:
            held += 1
            continue
        path = VP.REPO_ROOT / r["path"]
        text = insert_overall(path.read_text(encoding="utf-8"), r["overall"])
        if text is None:
            unplaced += 1
            print(f"  no Examiner Report section to open: {r['path']}")
            continue
        if not args.dry_run:
            path.write_text(text, encoding="utf-8")
        written += 1
    verb = "would restore" if args.dry_run else "restored"
    print(f"{verb} {written}; {held} verified file(s) held for their paper's packet; "
          f"{unplaced} with nowhere to put it")
    if written and not args.dry_run:
        print("next: python3 scripts/verify_check.py --sync")
    return 0


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="command", required=True)
    p = sub.add_parser("list", help="score every CAS question against its report")
    p.add_argument("--exam", action="append", help='a paper\'s exam, e.g. "Exam 5" (repeatable)')
    p.add_argument("--json", help="write every row here")
    p = sub.add_parser("apply", help="restore the missing paragraphs")
    p.add_argument("--exam", action="append")
    p.add_argument("--include-verified", action="store_true",
                   help="also edit verified files (each becomes stale)")
    p.add_argument("--dry-run", action="store_true")
    args = ap.parse_args(argv)
    return cmd_list(args) if args.command == "list" else cmd_apply(args)


if __name__ == "__main__":
    raise SystemExit(main())
