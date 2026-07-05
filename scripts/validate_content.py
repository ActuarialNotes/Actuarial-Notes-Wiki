#!/usr/bin/env python3
"""
validate_content.py — content-integrity checks for the question bank (roadmap P0.2).

This is a *read-only* validator. It never edits files. It exists so that broken
content fails a PR in CI instead of silently disappearing from the app: the quiz
app's parser (`quiz/src/lib/parser.ts`) drops any question it can't parse and any
duplicate id, so a malformed frontmatter block or a mismatched answer key means
the question just never shows up. These checks reproduce that contract.

What it enforces (ERRORS — non-zero exit):
  * A parseable YAML frontmatter block.
  * Required keys present and non-empty: id, exam, topic, learning_objective,
    difficulty, type, points, wiki_link.
  * `answer` present for the answerable types (multiple-choice, free-entry).
  * difficulty in {easy, medium, hard}.
  * type in the known set.
  * points is a positive number.
  * exam label matches the bank directory it lives in.
  * id is unique across the whole bank.
  * multiple-choice: the answer key matches one of the `- X)` options in the body.
  * multiple-choice / free-entry carry an `## Explanation` section.
  * orphan wiki_link (target Concepts/*.md page does not exist) — an error in the
    mature banks, a warning in banks still missing concept pages (see
    ORPHAN_WARN_ONLY).

What it flags (WARNINGS — printed, non-fatal unless --strict):
  * orphan wiki_link in a warn-only bank.
  * a `type` the app parser can't render (the question won't appear in-app).

Usage:
  python3 scripts/validate_content.py                 # validate the whole bank
  python3 scripts/validate_content.py questions/exam-p # validate a subset
  python3 scripts/validate_content.py --strict         # warnings fail too
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
CONCEPTS_DIR = REPO_ROOT / "Concepts"
QUESTIONS_ROOT = REPO_ROOT / "questions"

# ─── Schema constants ─────────────────────────────────────────────────────────

REQUIRED_KEYS = [
    "id", "exam", "topic", "learning_objective", "difficulty", "type",
    "points", "wiki_link",
]
VALID_DIFFICULTY = {"easy", "medium", "hard"}
# Types the app parser (parser.ts) understands and renders.
RENDERABLE_TYPES = {"multiple-choice", "free-entry", "multi-part"}
# Additional types authored in the bank (free-response CAS questions). These are
# accepted by the validator but the app can't render them yet (see warning).
OTHER_KNOWN_TYPES = {"calculation", "essay", "written-answer"}
VALID_TYPES = RENDERABLE_TYPES | OTHER_KNOWN_TYPES
# Types for which a single frontmatter `answer` is required.
ANSWER_REQUIRED_TYPES = {"multiple-choice", "free-entry"}

# Bank directory → the exam label every question in it must carry.
EXAM_LABEL_BY_DIR = {
    "exam-p": "Probability",
    "exam-fm": "Financial Mathematics",
    "exam-mas-i": "Exam MAS-I",
    "exam-5": "Exam 5",
}
# Banks whose concept pages are not fully authored yet: an orphan wiki_link there
# is a warning, not an error, so their questions can link ahead of page creation.
ORPHAN_WARN_ONLY = {"exam-5"}

OPTION_RE = re.compile(r"^- ([A-E])\)\s+.+", re.MULTILINE)
FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)


# ─── Frontmatter parsing ──────────────────────────────────────────────────────

def parse_frontmatter(text: str) -> tuple[dict, str] | tuple[None, None]:
    """Parse the leading `--- ... ---` block into a dict + return the body.

    Handles the two shapes used in the bank: `key: value` scalars (optionally
    quoted) and `key:` followed by an indented `- item` list. Returns
    (None, None) when there is no frontmatter block.
    """
    m = FRONTMATTER_RE.match(text)
    if not m:
        return None, None
    fm, body = m.group(1), text[m.end():]
    data: dict[str, object] = {}
    lines = fm.split("\n")
    i = 0
    while i < len(lines):
        km = re.match(r"^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$", lines[i])
        if not km:
            i += 1
            continue
        key, val = km.group(1), km.group(2).strip()
        if val == "":
            items: list[str] = []
            j = i + 1
            while j < len(lines) and re.match(r"^[ \t]+-\s+", lines[j]):
                items.append(re.sub(r"^[ \t]+-\s+", "", lines[j]).strip())
                j += 1
            if items:
                data[key] = items
                i = j
                continue
            data[key] = ""
        else:
            data[key] = val.strip().strip('"').strip("'")
        i += 1
    return data, body


# ─── Concept index (for orphan detection) ─────────────────────────────────────

def build_concept_index() -> set[str]:
    """Normalised set of concept page stems (space form) that exist on disk."""
    return {cf.stem for cf in CONCEPTS_DIR.glob("*.md")}


def wiki_link_to_stem(link: str) -> str:
    return link.replace("Concepts/", "").replace(".md", "").replace("+", " ")


def collect_built_questions(report: "Report") -> list[Path]:
    """Mirror the app's collector (`collectQuestions` in quiz/vite.config.ts).

    The build reads only the *top level* of each `questions/<exam>/` directory —
    it does not recurse. Any `.md` in a deeper subdirectory is authored content
    that never reaches the app, so we flag it (stranded) and exclude it from the
    validated set to reflect what actually ships.
    """
    targets: list[Path] = []
    for exam_dir in sorted(p for p in QUESTIONS_ROOT.iterdir() if p.is_dir()):
        targets.extend(sorted(exam_dir.glob("*.md")))
        stranded = sorted(exam_dir.rglob("*.md"))
        for f in stranded:
            if f.parent != exam_dir:  # lives in a nested subdirectory
                report.warn(f, "stranded: not collected by the build (nested subdirectory); "
                               "move it up into the exam directory or remove it")
    return targets


# ─── Validation ───────────────────────────────────────────────────────────────

class Report:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    @staticmethod
    def _rel(path: Path) -> str:
        try:
            return str(path.relative_to(REPO_ROOT))
        except ValueError:
            return str(path)

    def error(self, path: Path, msg: str) -> None:
        self.errors.append(f"{self._rel(path)}: {msg}")

    def warn(self, path: Path, msg: str) -> None:
        self.warnings.append(f"{self._rel(path)}: {msg}")


def validate_question(path: Path, concepts: set[str], report: Report) -> str | None:
    """Validate one question file. Returns its id (for uniqueness) or None."""
    text = path.read_text(encoding="utf-8")
    data, body = parse_frontmatter(text)
    if data is None:
        report.error(path, "missing or malformed frontmatter block")
        return None

    bank = path.parent.name

    # Required keys present and non-empty.
    for key in REQUIRED_KEYS:
        v = data.get(key)
        if v is None or v == "" or v == []:
            report.error(path, f"missing required frontmatter key '{key}'")

    qtype = data.get("type")
    difficulty = data.get("difficulty")

    if difficulty is not None and difficulty not in VALID_DIFFICULTY:
        report.error(path, f"invalid difficulty '{difficulty}' (expected {sorted(VALID_DIFFICULTY)})")

    if qtype is not None and qtype not in VALID_TYPES:
        report.error(path, f"invalid type '{qtype}' (expected one of {sorted(VALID_TYPES)})")
    elif qtype in OTHER_KNOWN_TYPES:
        report.warn(path, f"type '{qtype}' is not renderable by the app parser — this question will not appear in-app")

    # points must be a positive number.
    pts = data.get("points")
    if pts is not None and pts != "":
        try:
            if float(str(pts)) <= 0:
                report.error(path, f"points must be positive, got '{pts}'")
        except ValueError:
            report.error(path, f"points is not a number: '{pts}'")

    # exam label must match the bank directory.
    expected_exam = EXAM_LABEL_BY_DIR.get(bank)
    if expected_exam and data.get("exam") not in (None, "") and data.get("exam") != expected_exam:
        report.error(path, f"exam '{data.get('exam')}' does not match bank '{bank}' (expected '{expected_exam}')")

    # answer required for answerable types; MC answer must match an option.
    answer = data.get("answer")
    if qtype in ANSWER_REQUIRED_TYPES and (answer is None or answer == ""):
        report.error(path, f"type '{qtype}' requires an 'answer'")

    if qtype in ("multiple-choice", "free-entry") and body is not None:
        if not re.search(r"^## Explanation\s*$", body, re.MULTILINE):
            report.error(path, "missing '## Explanation' section")

    if qtype == "multiple-choice" and body is not None and answer:
        option_keys = set(OPTION_RE.findall(body))
        if not option_keys:
            report.error(path, "multiple-choice question has no '- X)' answer options")
        elif answer not in option_keys:
            report.error(path, f"answer '{answer}' is not among the options {sorted(option_keys)}")

    # orphan wiki_link detection.
    wl = data.get("wiki_link")
    links = wl if isinstance(wl, list) else ([wl] if isinstance(wl, str) and wl else [])
    for link in links:
        if not link.startswith("Concepts/"):
            continue
        if wiki_link_to_stem(link) not in concepts:
            msg = f"orphan wiki_link '{link}' (no matching Concepts/ page)"
            if bank in ORPHAN_WARN_ONLY:
                report.warn(path, msg)
            else:
                report.error(path, msg)

    raw_id = data.get("id")
    return str(raw_id) if raw_id else None


def main() -> int:
    ap = argparse.ArgumentParser(description="Validate question-bank content integrity.")
    ap.add_argument("paths", nargs="*", help="question dirs/files to validate (default: all)")
    ap.add_argument("--strict", action="store_true", help="treat warnings as failures")
    args = ap.parse_args()

    concepts = build_concept_index()
    report = Report()

    if args.paths:
        targets: list[Path] = []
        for p in args.paths:
            pp = Path(p)
            if not pp.is_absolute():
                pp = REPO_ROOT / pp
            if pp.is_dir():
                targets.extend(sorted(pp.glob("*.md")))
            elif pp.is_file():
                targets.append(pp)
    else:
        targets = collect_built_questions(report)

    ids: dict[str, list[Path]] = defaultdict(list)

    for path in targets:
        qid = validate_question(path, concepts, report)
        if qid:
            ids[qid].append(path)

    for qid, paths in sorted(ids.items()):
        if len(paths) > 1:
            joined = ", ".join(Report._rel(p) for p in paths)
            report.errors.append(f"duplicate id '{qid}' in: {joined}")

    print(f"Validated {len(targets)} question file(s) across {len(concepts)} concept pages.")

    if report.warnings:
        print(f"\n⚠ {len(report.warnings)} warning(s):")
        for w in report.warnings:
            print(f"  - {w}")

    if report.errors:
        print(f"\n✗ {len(report.errors)} error(s):")
        for e in report.errors:
            print(f"  - {e}")
        print("\nContent validation FAILED.")
        return 1

    if args.strict and report.warnings:
        print("\nContent validation FAILED (--strict: warnings are errors).")
        return 1

    print("\n✓ Content validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
