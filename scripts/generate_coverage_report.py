#!/usr/bin/env python3
"""
generate_coverage_report.py — write `Concepts Without Review Questions.md`, the
per-exam list of syllabus concepts no practice question is tagged with.

Generated: edit this script, not the page. Read-only over the vault — unlike
`update_wiki_links.py`, which used to write this report as a side effect of
rewriting question frontmatter, it touches nothing but the report.

What counts:
  - An exam's *syllabus concepts* are the `[[links]]` inside its learning-objective
    callouts (`> [!example]`), resolved to a `Concepts/` page by
    `vault_links.canonical_page` (namesakes, aliases, then page names). The
    `## Source Material` shelf is not part of it.
  - A concept is *covered* when a question in that exam's own bank (the `bank` of
    `scripts/exam_catalog.json`) carries it in `wiki_link:` — the bank the quiz
    builder draws from. Questions the quiz never serves are left out:
    `off_syllabus: true`, and any with an open critical finding.
  - A concept missing from its own bank but tagged in another bank is marked, so
    a re-tagging gap reads differently from a question nobody has written.

Coverage is by tag: a question that tests a concept without naming it in
`wiki_link:` doesn't count, which is the point — the app records mastery by tag.

Usage:
  python3 scripts/generate_coverage_report.py
  python3 scripts/generate_coverage_report.py --check   # non-zero if stale
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from collections import Counter
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import vault_links as VL  # noqa: E402

REPO_ROOT = Path(VL.REPO_ROOT)
REPORT = REPO_ROOT / "Concepts Without Review Questions.md"

OBJECTIVE_RE = re.compile(r"^>\s*\[!example\][-+]?\s*(.*)$")
FRONTMATTER_RE = re.compile(r"\A---\n(.*?)\n---", re.S)
WIKI_LINK_ENTRY_RE = re.compile(r"^\s+-\s+(.+?)\s*$")


def syllabus_objectives(page: Path, vault: VL.Vault, wiki_id: str, tables: dict) -> list[tuple[str, list[str]]]:
    """(objective title, its concepts in page order) for every learning objective."""
    text = page.read_text(encoding="utf-8").split("\n## Source Material")[0]
    objectives: list[tuple[str, list[str]]] = []
    current: list[str] | None = None
    for line in text.splitlines():
        m = OBJECTIVE_RE.match(line)
        if m:
            current = []
            objectives.append((m.group(1).strip(), current))
            continue
        if current is None:
            continue
        if not line.startswith(">"):
            current = None
            continue
        for link in VL.iter_links(line):
            name = VL.canonical_page(VL.link_basename(link.target), vault, wiki_id, tables)
            if name and vault.is_concept(name) and name not in current:
                current.append(name)
    return [(title, concepts) for title, concepts in objectives if concepts]


def question_concepts(path: Path) -> set[str] | None:
    """Lower-cased concept slugs a question is tagged with; None if the quiz never serves it."""
    m = FRONTMATTER_RE.match(path.read_text(encoding="utf-8"))
    if not m:
        return None
    fm = m.group(1)
    if re.search(r"^off_syllabus:\s*true\s*$", fm, re.M) or re.search(r"^\s+open_critical:\s*[1-9]", fm, re.M):
        return None
    slugs: set[str] = set()
    in_links = False
    for line in fm.splitlines():
        if re.match(r"^wiki_link:\s*$", line):
            in_links = True
            continue
        if in_links:
            e = WIKI_LINK_ENTRY_RE.match(line)
            if not e:
                in_links = False
                continue
            slug = VL.question_link_slug(e.group(1).strip().strip("\"'"))
            if slug:
                slugs.add(slug.lower())
    return slugs


def bank_counts(bank: str) -> tuple[Counter, int]:
    counts: Counter = Counter()
    served = 0
    for path in sorted((REPO_ROOT / "questions" / bank).glob("*.md")):
        tags = question_concepts(path)
        if tags is None:
            continue
        served += 1
        counts.update(tags)
    return counts, served


def pct(part: int, whole: int) -> str:
    return f"{(100 * part / whole):.0f}%" if whole else "—"


def build() -> str:
    vault = VL.Vault()
    tables = VL.load_aliases()
    catalog = VL.load_catalog()

    banks = sorted(d.name for d in (REPO_ROOT / "questions").iterdir() if d.is_dir())
    per_bank = {b: bank_counts(b) for b in banks}
    any_bank: Counter = Counter()
    for counts, _ in per_bank.values():
        any_bank.update(counts)

    rows: list[str] = []
    sections: list[str] = []
    tot_with = tot_all = 0
    for exam in catalog:
        page = REPO_ROOT / exam["page"]
        if not page.exists():
            continue
        title = exam["page"][:-3]
        objectives = syllabus_objectives(page, vault, exam["wiki_id"], tables)
        concepts: list[str] = []
        for _, cs in objectives:
            concepts += [c for c in cs if c not in concepts]
        bank = exam.get("bank")
        counts, served = per_bank.get(bank, (Counter(), 0)) if bank else (Counter(), 0)

        def covered(c: str) -> bool:
            return counts[c.lower()] > 0

        n_with = sum(covered(c) for c in concepts)
        obj_empty = sum(1 for _, cs in objectives if not any(covered(c) for c in cs))
        tot_with += n_with
        tot_all += len(concepts)
        bank_cell = f"`{bank}` ({served})" if bank else "none"
        rows.append(
            f"| [[{title}]] | {bank_cell} | {n_with} / {len(concepts)} | {pct(n_with, len(concepts))} "
            f"| {obj_empty} / {len(objectives)} |"
        )

        out = [f"## {title}", ""]
        if not bank:
            out += [
                f"*No question bank yet — all {len(concepts)} syllabus concepts are uncovered.*",
                "",
            ]
        elif n_with == len(concepts):
            out += ["*Every syllabus concept has at least one question.*", ""]
        else:
            out += [
                f"*{len(concepts) - n_with} of {len(concepts)} syllabus concepts have no question in "
                f"`questions/{bank}/`.*",
                "",
            ]
        for obj_title, cs in objectives:
            missing = [c for c in cs if not covered(c)]
            if not missing:
                continue
            note = " — **no questions at all**" if len(missing) == len(cs) else ""
            out += [f"### {obj_title}", "", f"*{len(missing)} of {len(cs)} uncovered{note}*", ""]
            for c in missing:
                elsewhere = any_bank[c.lower()] if bank else 0
                mark = f" — tagged in another bank ({elsewhere})" if elsewhere else ""
                out.append(f"- [[{c}]]{mark}")
            out.append("")
        sections += out

    on_syllabus: set[str] = set()
    for exam in catalog:
        page = REPO_ROOT / exam["page"]
        if page.exists():
            for _, cs in syllabus_objectives(page, vault, exam["wiki_id"], tables):
                on_syllabus.update(cs)
    off = len(set(vault.concept_names()) - on_syllabus)

    head = [
        "# Concepts Without Review Questions",
        "",
        f"> Generated {date.today().isoformat()} by `scripts/generate_coverage_report.py` — edit the "
        "script, not this page.",
        f"> **{tot_with} of {tot_all} syllabus concept entries ({pct(tot_with, tot_all)})** have at least "
        "one question in their exam's own bank.",
        "",
        "A concept is a `[[link]]` inside an exam page's learning-objective callouts; it is covered when a "
        "question in that exam's bank lists it in `wiki_link:`. Off-syllabus questions and questions "
        "withheld for an open critical finding don't count. A concept also tagged in another exam's bank "
        "is marked — those are re-tagging gaps rather than missing questions. Generic terms (Insurer, "
        "Risk, Claim) will rarely be tagged and can be read past.",
        "",
        "## Summary",
        "",
        "| Exam | Bank (questions served) | Concepts covered | % | Objectives with no questions |",
        "|---|---|---|---|---|",
        *rows,
        f"| **Total** | | **{tot_with} / {tot_all}** | **{pct(tot_with, tot_all)}** | |",
        "",
        f"{off} concept pages are linked from no exam's learning objectives and are not counted.",
        "",
        "---",
        "",
    ]
    return "\n".join(head + sections).rstrip() + "\n"


def strip_date(text: str) -> str:
    return re.sub(r"Generated \d{4}-\d{2}-\d{2}", "Generated", text)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--check", action="store_true", help="exit non-zero if the report is stale")
    args = ap.parse_args()
    report = build()
    if args.check:
        current = REPORT.read_text(encoding="utf-8") if REPORT.exists() else ""
        if strip_date(current) != strip_date(report):
            print(f"{REPORT.name} is stale — run python3 scripts/generate_coverage_report.py", file=sys.stderr)
            return 1
        return 0
    REPORT.write_text(report, encoding="utf-8")
    print(f"Wrote {os.path.relpath(REPORT, REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
