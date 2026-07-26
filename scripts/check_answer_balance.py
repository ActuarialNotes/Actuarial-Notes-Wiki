#!/usr/bin/env python3
"""Audit comprehension checks for the "longest option is the answer" tell.

The collect modal shuffles the options, so the authored A/B/C/D position never
leaks. Option *length* does: if the correct answer is reliably the wordiest
choice, a test-wise learner can pass the gate without understanding anything —
which defeats the point of the check.

This is a report, not a gate. Length is only a proxy, and some sound questions
legitimately have one option shaped differently from the rest (Sample Space
lists three die faces against one event phrase). Read the flagged files and use
judgment; a gap of a word or two is noise, a gap of a whole clause is a tell.

Run from the repo root:  python3 scripts/check_answer_balance.py [--threshold N]
"""

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHECKS = ROOT / "comprehension-checks"

CORRECT_RE = re.compile(r'^correct:\s*"?([A-E])', re.M)
OPTION_RE = re.compile(r"^- [A-E]\)\s*(.+)$", re.M)
LETTERS = "ABCDE"


def audit(threshold: int):
    flagged, strictly_longest, total = [], 0, 0

    for path in sorted(CHECKS.glob("*/*.md")):
        text = path.read_text(encoding="utf-8")
        correct = CORRECT_RE.search(text)
        options = OPTION_RE.findall(text)
        if not correct or len(options) != 4:
            continue

        index = LETTERS.index(correct.group(1))
        lengths = [len(o) for o in options]
        ranked = sorted(lengths)
        total += 1

        # Only a *strict* maximum is a tell — a tie gives nothing away.
        if lengths[index] != ranked[-1] or ranked[-1] == ranked[-2]:
            continue
        strictly_longest += 1
        margin = ranked[-1] - ranked[-2]
        if margin >= threshold:
            flagged.append((margin, path.relative_to(ROOT)))

    flagged.sort(reverse=True)
    pct = strictly_longest * 100 // total if total else 0
    print(f"{total} checks audited")
    print(f"correct answer is strictly the longest option: {strictly_longest} ({pct}%) — chance is 25%")
    print(f"{len(flagged)} exceed the runner-up by >= {threshold} characters:")
    for margin, rel in flagged:
        print(f"  +{margin:3d}  {rel}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--threshold", type=int, default=20,
        help="flag checks whose correct answer exceeds the runner-up by this many characters (default 20)",
    )
    return audit(parser.parse_args().threshold)


if __name__ == "__main__":
    sys.exit(main())
