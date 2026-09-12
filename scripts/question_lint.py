#!/usr/bin/env python3
"""
question_lint.py — the converter checklist, as code.

Stage 4 of the pipeline in `docs/pdf-question-pipeline.md`. The per-file
checklists in the two converter skills used to be read and applied by whatever
was doing the conversion, which meant paying for them again on every question.
Everything mechanical on those lists lives here instead:

* the render and readability rules from `scripts/mdmath.py` — a literal `\\n`
  escape, un-normalised OCR characters, an `align*` row that packs a formula
  and its result onto one line;
* per-part point values that do not sum to the question's `points`;
* an explanation heading with nothing under it;
* an option list that skips a letter.

Schema-level checks (required keys, valid difficulty, orphan `wiki_link`, the
answer letter matching an option) belong to `scripts/validate_content.py` and
are not repeated here — run both.

`--fix` applies the repairs `mdmath.normalize_markdown` can make safely and
leaves everything else reported. Frontmatter is never rewritten: `verification.
content_hash` is taken over the file's bytes, so a body edit correctly
downgrades the file to `stale` on the next `verify_check.py --sync`.

Usage
-----
    python3 scripts/question_lint.py questions/exam-p
    python3 scripts/question_lint.py --fix questions/exam-5/cas5-2019s-q3.md
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mdmath  # noqa: E402
from validate_content import parse_frontmatter  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parent.parent

PART_HEADER_RE = re.compile(r"(?m)^##\s+Part\s+([a-h])\s*(?:\(([\d.]+)\s*points?\))?")
OPTION_RE = re.compile(r"(?m)^-\s+([A-E])\)\s+\S")
EXPLANATION_RE = re.compile(r"(?m)^(##|###)\s+Explanation\s*$")


def lint_file(path: Path) -> list[str]:
    """Mechanical issues in one question file."""
    text = path.read_text(encoding="utf-8")
    data, body = parse_frontmatter(text)
    if body is None:
        return ["missing or malformed frontmatter block"]

    issues = list(mdmath.lint_markdown(body))

    parts = PART_HEADER_RE.findall(body)
    if parts:
        labels = [label for label, _ in parts]
        expected = [chr(ord("a") + i) for i in range(len(labels))]
        if labels != expected:
            issues.append(f"part headers out of sequence: {' '.join(labels)}")
        values = [float(points) for _label, points in parts if points]
        total = data.get("points")
        if len(values) == len(parts) and total not in (None, ""):
            if abs(sum(values) - float(total)) > 0.01:
                issues.append(
                    f"part points sum to {sum(values):g}, frontmatter says {total}"
                )
    else:
        letters = OPTION_RE.findall(body)
        if letters and letters != sorted(letters):
            issues.append(f"options out of order: {' '.join(letters)}")
        if letters and letters != [chr(ord("A") + i) for i in range(len(letters))]:
            issues.append(f"option letters skip: {' '.join(letters)}")

    for match in EXPLANATION_RE.finditer(body):
        after = body[match.end() :]
        nxt = re.search(r"(?m)^#{2,3}\s", after)
        if not after[: nxt.start() if nxt else len(after)].strip():
            issues.append("explanation heading with no explanation under it")
            break

    return issues


def fix_file(path: Path) -> bool:
    """Apply the safe repairs to one file's body. True when it changed."""
    text = path.read_text(encoding="utf-8")
    _data, body = parse_frontmatter(text)
    if body is None:
        return False
    fixed = mdmath.normalize_markdown(body)
    if fixed.strip() == body.strip():
        return False
    head = text[: len(text) - len(body)]
    path.write_text(head.rstrip("\n") + "\n\n" + fixed.lstrip("\n"), encoding="utf-8")
    return True


def collect(paths: list[str]) -> list[Path]:
    targets: list[Path] = []
    for raw in paths or ["questions"]:
        path = Path(raw)
        if not path.is_absolute():
            path = REPO_ROOT / path
        if path.is_dir():
            targets += sorted(p for p in path.rglob("*.md"))
        elif path.is_file():
            targets.append(path)
    return targets


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    ap.add_argument("paths", nargs="*", help="files or directories (default: questions/)")
    ap.add_argument("--fix", action="store_true", help="apply the safe repairs")
    ap.add_argument("--quiet", action="store_true", help="print only the summary")
    args = ap.parse_args(argv)

    files = collect(args.paths)
    fixed = 0
    flagged = 0
    for path in files:
        if args.fix and fix_file(path):
            fixed += 1
        issues = lint_file(path)
        if not issues:
            continue
        flagged += 1
        if not args.quiet:
            rel = path.relative_to(REPO_ROOT) if path.is_relative_to(REPO_ROOT) else path
            for issue in issues:
                print(f"{rel}: {issue}")

    print(f"\nchecked {len(files)} file(s); {flagged} with issues"
          + (f"; fixed {fixed}" if args.fix else ""))
    if args.fix and fixed:
        print("run `python3 scripts/verify_check.py --sync` to re-hash what changed")
    return 1 if flagged else 0


if __name__ == "__main__":
    raise SystemExit(main())
