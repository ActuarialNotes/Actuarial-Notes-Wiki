#!/usr/bin/env python3
"""The CI gate for exam pages (`Exam *.md`) — Stage 4 of the syllabus pipeline.

An exam page is the most load-bearing file in the vault: every link inside a
learning-objective callout becomes a syllabus concept, which enters mastery,
the study plan and the readiness score. Until
this lint, nothing checked one. It fails a page for:

  structure   the exam-nav div, `## Learning Objectives` then `## Source
              Material` (last), each callout titled `> [!example]- Title
              {lo–hi%}` (en-dash, single spaces), weights whose ranges contain
              100%, at least one objective per section, no `### Title` repeating
              the callout's own title
  links       every noun phrase of an objective links a note (a warning — the
              chunker is a heuristic); every objective links at least one concept (its own words or its
              `*Key concepts:*` line); no dated `(Author - YYYY)` reading linked
              inside a callout (the app would make it a concept); no link in a
              table row, no target ending in `\\` (the table-pipe bug); every
              link lands exactly — Obsidian forgives case, the app does not
  questions   every `learning_objective` in the exam's bank names one of its
              sections (`objective_key`: the CAS `A. ` prefix and case ignored)
  fidelity    on a page generated from a syllabus PDF (it carries a `syllabus:`
              frontmatter block), the objectives with their links stripped are the
              extracted text, word for word, and the page is what
              `syllabus_write.py` renders from `.syllabus/<id>/` — see
              docs/syllabus-pipeline.md

Severity follows the exam's status (scripts/exam_catalog.json, mirroring
quiz/src/lib/examStatus.ts): unresolved links and unlinked objectives are errors
on a `ready`/`beta` exam and warnings on a `development` one, whose pages are a
syllabus outline by definition. A link to the wrong member of a namesake pair
(scripts/concept_aliases.json), are warnings everywhere.

Usage:
    python3 scripts/syllabus_lint.py                    # every exam page
    python3 scripts/syllabus_lint.py "Exam 5 (CAS).md"  # one or more pages
    python3 scripts/syllabus_lint.py --quiet            # errors only

Exits 1 on any error. Stdlib only.
"""

from __future__ import annotations

import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import syllabus_lib as sl  # noqa: E402
import vault_links as vl  # noqa: E402

ROOT = vl.REPO_ROOT


class Report:
    def __init__(self):
        self.items: list[tuple[str, str, int, str, str]] = []

    def add(self, severity: str, path: str, line: int, code: str, msg: str) -> None:
        self.items.append((severity, path, line, code, msg))

    def error(self, *a) -> None:
        self.add("error", *a)

    def warn(self, *a) -> None:
        self.add("warning", *a)

    def by(self, severity: str) -> list:
        return [i for i in self.items if i[0] == severity]


def lint_page(rel: str, vault: vl.Vault, report: Report, exam: dict) -> sl.ExamPage:
    path = os.path.join(ROOT, rel)
    page = sl.parse_exam_page(path)
    studiable = exam["status"] in ("ready", "beta")
    strict = report.error if studiable else report.warn

    _lint_structure(rel, page, report)
    _lint_links(rel, page, vault, report, strict, exam)
    if exam.get("bank"):
        _lint_questions(rel, page, report, exam)
    if re.search(r"^syllabus:", page.frontmatter, re.M):
        import syllabus_write  # the renderer owns the fidelity rule
        for line, code, msg in syllabus_write.fidelity_problems(rel, page, vault):
            report.error(rel, line, code, msg)
    return page


def _lint_structure(rel: str, page: sl.ExamPage, report: Report) -> None:
    nav = re.search(r'^<div class="exam-nav"\n((?:\s+data-[\w-]+="[^"]*"\n)*?\s+data-[\w-]+="[^"]*">)\n</div>$',
                    page.body, re.M)
    if not nav or 'data-current="' not in nav.group(1):
        report.error(rel, page.body_offset + 1, "exam-nav",
                     'the exam-nav div must open `<div class="exam-nav"`, carry data-current, close its tag with `>` and end `</div>`')

    h2 = [(ln, t) for ln, lvl, t in page.headings if lvl == 2]
    names = [t for _, t in h2]
    for want in ("Learning Objectives", "Source Material"):
        if names.count(want) != 1:
            report.error(rel, 1, "headings", f"expected exactly one `## {want}` (found {names.count(want)})")
    if "Learning Objectives" in names and "Source Material" in names:
        if names.index("Learning Objectives") > names.index("Source Material"):
            report.error(rel, 1, "headings", "`## Learning Objectives` must come before `## Source Material`")
        if names[-1] != "Source Material":
            report.error(rel, h2[-1][0], "headings", "`## Source Material` must be the page's last section")
    if not page.sections:
        report.error(rel, 1, "no-objectives", "no `> [!example]-` learning-objective callouts")
        return

    lo_sum = hi_sum = 0
    weighted = True
    for s in page.sections:
        if not sl.CANONICAL_TITLE_RE.match(s.title_line):
            report.error(rel, s.line_no, "callout-title",
                         f"`{s.title_line.strip()}` — write `> [!example]- Title {{lo–hi%}}` "
                         "(en-dash, single spaces, a weight on every section)")
        w = s.weight
        if w is None:
            weighted = False
        else:
            lo_sum, hi_sum = lo_sum + w[0], hi_sum + w[1]
        if not s.objectives:
            report.error(rel, s.line_no, "empty-section", f"`{s.title}` has no numbered objective")
        for ln, line in zip(s.line_nos, s.lines):
            h = re.match(r"^#{1,6}\s+(.*?)\s*$", line)
            if h and sl.objective_key(h.group(1)) == sl.objective_key(s.title):
                report.error(rel, ln, "repeated-title", f"`{line.strip()}` repeats the callout's own title")
    if weighted and not (lo_sum <= 100 <= hi_sum):
        report.error(rel, page.sections[0].line_no, "weights",
                     f"section weights run {lo_sum}–{hi_sum}%, a range that doesn't contain 100%")


def _lint_links(rel: str, page: sl.ExamPage, vault: vl.Vault, report: Report, strict, exam: dict) -> None:
    for ln, line in enumerate(page.text.split("\n"), 1):
        if re.match(r"^>?\s*\|", line) and "[[" in line:
            report.error(rel, ln, "table-link", "a [[link]] in a table row — the escaped pipe breaks it; use a list")
        for link in vl.iter_links(line):
            if link.target.rstrip().endswith("\\"):
                report.error(rel, ln, "pipe-link", f"`[[{link.target}` ends in a backslash (the table-pipe bug)")

    names: list[str] = []
    for ln, link in page.links_in_sections():
        name = link.name
        names.append(name)
        if sl.DATED_NAME_RE.search(name):
            report.error(rel, ln, "dated-link",
                         f"`[[{name}]]` is a reading, not a concept — inside a callout the app makes it a syllabus concept")
            continue
        status, _ = vault.resolve(link.target)
        if status == "case":
            report.error(rel, ln, "case-link", f"`[[{link.target}]]` only matches a page in another case; the app won't find it")
        elif status == "missing":
            strict(rel, ln, "broken-link", f"`[[{link.target}]]` has no page")

    for s in page.sections:
        for o in s.objectives:
            if not any(list(vl.iter_links(l)) for l in o.all_lines()):
                strict(rel, o.line_no, "unlinked-objective",
                       f"{s.title} {o.num}. links no concept — link its own words or give it a `*Key concepts:*` line")

    # Every noun phrase an objective (or a section's preamble) names should be a
    # note. A chunker can't be sure what a noun phrase is, so this only warns.
    for s in page.sections:
        lines = [(ln, l) for ln, l in zip(s.line_nos, s.lines) if l in s.preamble and l.strip()
                 and not re.match(r"^\s*\*\*.*\*\*\s*$", l)]
        lines += [(o.line_no, o.text) for o in s.objectives]
        for ln, line in lines:
            missing = sl.unlinked_noun_phrases(line)
            if missing:
                report.warn(rel, ln, "unlinked-noun",
                            "noun phrase(s) with no note: " + ", ".join(f"`{m}`" for m in missing))

    for ln, link, _ in sl.source_entries(page):
        status, _ = vault.resolve(link.target)
        if status == "case":
            report.error(rel, ln, "case-link", f"source `[[{link.target}]]` only matches a page in another case")
        elif status == "missing":
            strict(rel, ln, "broken-source", f"source `[[{link.target}]]` has no page")

    for linked, meant in vl.namesake_conflicts(list(dict.fromkeys(names)), exam["wiki_id"]):
        report.warn(rel, 1, "namesake", f"links `[[{linked}]]`, but on this exam the term means `[[{meant}]]`")


def _lint_questions(rel: str, page: sl.ExamPage, report: Report, exam: dict) -> None:
    keys = {sl.objective_key(s.title): s.title for s in page.sections}
    bank = os.path.join(ROOT, "questions", exam["bank"])
    bad: dict[str, list[str]] = {}
    for dirpath, _, files in os.walk(bank):
        for fn in sorted(files):
            if not fn.endswith(".md"):
                continue
            with open(os.path.join(dirpath, fn), encoding="utf-8") as fh:
                fm, _ = sl.split_frontmatter(fh.read())
            # A question kept only for the record declares that no current
            # syllabus covers it (the 2012–2019 Exam 7 valuation questions),
            # so its objective is the old syllabus's and is not held to this page.
            if re.search(r"^off_syllabus:\s*true\s*$", fm, re.M):
                continue
            m = re.search(r'^learning_objective:\s*"?(.*?)"?\s*$', fm, re.M)
            lo = m.group(1) if m else ""
            if sl.objective_key(lo) not in keys:
                bad.setdefault(lo, []).append(fn)
    for lo, files in sorted(bad.items()):
        shown = ", ".join(files[:3]) + (f" (+{len(files) - 3} more)" if len(files) > 3 else "")
        report.error(rel, 1, "question-objective",
                     f"{len(files)} question(s) in questions/{exam['bank']} name learning objective "
                     f"`{lo}`, which is no section of this page ({shown})")


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pages", nargs="*", help="exam pages to lint (default: every one in the catalogue)")
    ap.add_argument("--quiet", action="store_true", help="print errors only")
    args = ap.parse_args(argv)

    catalog = vl.load_catalog()
    pages = [os.path.basename(p) for p in args.pages] or [e["page"] for e in catalog]
    vault = vl.Vault(ROOT)
    report = Report()
    for rel in pages:
        exam = vl.exam_for_page(rel, catalog)
        if exam is None:
            report.error(rel, 1, "catalog", "not in scripts/exam_catalog.json — add a row for it")
            continue
        lint_page(rel, vault, report, exam)

    shown = report.items if not args.quiet else report.by("error")
    for severity, path, line, code, msg in shown:
        print(f"{path}:{line}: {severity}: [{code}] {msg}")
    errors, warnings = len(report.by("error")), len(report.by("warning"))
    print(f"\nsyllabus-lint: {len(pages)} page(s), {errors} error(s), {warnings} warning(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
