#!/usr/bin/env python3
"""Regenerate docs/comprehension-check-backlog.md.

Lists every concept page in Concepts/ that has no authored flashcard-collect
check under comprehension-checks/<exam-id>/. Concepts are bucketed by the
earliest Exam *.md syllabus page that wiki-links them, which is the folder a
new check should go in; concepts no exam page links land in "unassigned".

Run from the repo root:  python3 scripts/list_missing_checks.py
"""

import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "comprehension-check-backlog.md"

# Syllabus page -> question-bank exam id, in the order a student sits them.
# When a concept appears on several pages, the earliest one wins.
EXAMS = [
    ("Exam P-1 (SOA).md", "exam-p"),
    ("Exam FM-2 (SOA).md", "exam-fm"),
    ("Exam MAS-I (CAS).md", "exam-mas-i"),
    ("Exam MAS-II (CAS).md", "exam-mas-ii"),
    ("Exam 5 (CAS).md", "exam-5"),
    ("Exam 6C (CAS).md", "exam-6c"),
    ("Exam 6U (CAS).md", "exam-6u"),
    ("Exam 7 (CAS).md", "exam-7"),
    ("Exam 8 (CAS).md", "exam-8"),
    ("Exam 9 (CAS).md", "exam-9"),
]

WIKI_LINK = re.compile(r"\[\[([^\]]+)\]\]")


def wiki_links(path: Path) -> set:
    """Concept names linked from a page, with any |display alias stripped."""
    return {m.split("|")[0].strip() for m in WIKI_LINK.findall(path.read_text(encoding="utf-8"))}


def main() -> int:
    concepts = sorted(p.stem for p in (ROOT / "Concepts").glob("*.md"))
    authored = {p.stem for p in (ROOT / "comprehension-checks").glob("*/*.md")}
    missing = [c for c in concepts if c not in authored]

    links = {}
    for filename, exam_id in EXAMS:
        page = ROOT / filename
        links[exam_id] = wiki_links(page) if page.exists() else set()

    order = [exam_id for _, exam_id in EXAMS]
    buckets = defaultdict(list)
    for concept in missing:
        owners = [e for e in order if concept in links[e]]
        buckets[owners[0] if owners else "unassigned"].append((concept, ", ".join(owners[1:])))

    lines = [
        "# Comprehension-check backlog",
        "",
        "Concepts in `Concepts/*.md` that have **no authored flashcard-collect check** under",
        "`comprehension-checks/<exam-id>/`. Until a check is authored, the collect modal falls back",
        'to the "which concept does this describe?" question built from the concept\'s own definition —',
        "the too-easy fallback `docs/flashcard-collection.md` wants retired.",
        "",
        "Author these with the `flashcard-comprehension-check` skill. The `<exam-id>` heading below is",
        "derived from which `Exam *.md` syllabus page links the concept (earliest exam wins when several",
        "do, noted in a trailing comment); the folder is organisational only — the parser keys checks by",
        "concept name, not by folder.",
        "",
        f"**{len(missing)} of {len(concepts)} concepts remain.**",
        "Regenerate with `python3 scripts/list_missing_checks.py`.",
        "",
    ]
    for exam_id in order + ["unassigned"]:
        entries = buckets.get(exam_id)
        if not entries:
            continue
        label = exam_id if exam_id != "unassigned" else "unassigned — not linked from any Exam page"
        lines.append(f"## {label} ({len(entries)})")
        lines.append("")
        for concept, also in sorted(entries):
            lines.append(f"- [ ] {concept}" + (f"  <!-- also on {also} -->" if also else ""))
        lines.append("")

    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"{len(missing)} of {len(concepts)} concepts missing a check → {OUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
