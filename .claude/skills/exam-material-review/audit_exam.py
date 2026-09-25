#!/usr/bin/env python3
"""Audit one exam's material for the gaps a candidate would actually hit.

Builds the exam's concept graph — the syllabus page, every concept it links,
and every concept its question bank links — then reports the defects that are
invisible when reading any single file:

  1. Stub concept pages ("concept summary to be written") that questions link
     into, so a candidate following a question's concept link lands on a
     placeholder.
  2. Broken `[[wiki-links]]` anywhere in the exam's concept graph.
  3. Syllabus concepts with no review questions, and concepts carrying an
     outsized share of the bank.
  4. Syllabus concepts missing a comprehension check, which leaves the
     flashcard-collect gate unable to advance that concept past New.
  5. Thin pages: word count, number of worked examples, and pages whose only
     example is a single-step plug-in.
  6. Difficulty mix of the question bank.

Reports, never edits. Read the numbers, then read the pages the numbers point
at — the counts locate the problem, they do not diagnose it.

Usage:
    python3 .claude/skills/exam-material-review/audit_exam.py --exam exam-p
    python3 .claude/skills/exam-material-review/audit_exam.py --exam exam-fm --verbose

`--exam` takes the question-bank directory name — any key of
`SYLLABUS_BY_EXAM` below (exam-p, exam-fm, exam-mas-i, exam-mas-ii, exam-5,
exam-6c, exam-6u, exam-7, exam-8, exam-9). An exam with no bank directory yet
stops with a note — `scripts/syllabus_gaps.py` covers the syllabus side of those. The matching syllabus page is found automatically;
override it with `--syllabus "Exam P-1 (SOA).md"` if the guess is wrong.
"""

import argparse
import os
import re
import sys
from collections import Counter

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
sys.path.insert(0, os.path.join(REPO_ROOT, "scripts"))
import vault_links  # noqa: E402 — the shared resolver, see scripts/vault_links.py

# Question-bank directory -> the syllabus page that defines that exam, from the
# one exam catalogue (scripts/exam_catalog.json).
SYLLABUS_BY_EXAM = {
    (e["bank"] or "exam-" + e["exam_id"].lower()): e["page"] for e in vault_links.load_catalog()
}

STUB_MARKERS = ("to be written", "to be added", "TODO")
VAULT = vault_links.Vault(REPO_ROOT)


def read(path):
    with open(os.path.join(REPO_ROOT, path), encoding="utf-8") as fh:
        return fh.read()


def concept_exists(name):
    """True when `[[name]]` lands on a concept page — in the app, not only in
    Obsidian (which also forgives a case mismatch the app's fetch does not)."""
    status, path = VAULT.resolve(name)
    return status == "exact" and path.startswith("Concepts/")


def link_targets(text):
    """Every [[wiki-link]] target in `text`, as the app reads it.

    A `[[Page\\|Display]]` written in a table cell keeps its backslash in the
    target (the app's regex stops at the first `|`), so it is reported as
    broken — which is the correct result; `scripts/page_lint.py` fails it too.
    """
    return [link.name for link in vault_links.iter_links(text)]


def question_files(exam):
    root = os.path.join(REPO_ROOT, "questions", exam)
    if not os.path.isdir(root):
        sys.exit(f"No question bank at questions/{exam}")
    out = []
    for dirpath, _, names in os.walk(root):
        out.extend(os.path.join(dirpath, n) for n in names if n.endswith(".md"))
    return sorted(out)


def frontmatter(text):
    parts = text.split("---")
    return parts[1] if len(parts) > 2 else ""


def audit(exam, syllabus_file, verbose):
    problems = 0
    syllabus = read(syllabus_file)

    # Syllabus concepts, in document order, de-duplicated.
    syl_targets = list(dict.fromkeys(link_targets(syllabus)))
    syl_concepts = [t for t in syl_targets if concept_exists(t)]
    syl_missing = [t for t in syl_targets if VAULT.resolve(t)[0] != "exact"]

    # Question bank: wiki_link targets and metadata.
    qfiles = question_files(exam)
    linked = Counter()
    difficulty = Counter()
    for path in qfiles:
        fm = frontmatter(open(path, encoding="utf-8").read())
        for entry in re.findall(r"^\s*-\s*(Concepts/\S+)\s*$", fm, re.M):
            linked[vault_links.question_link_slug(entry)] += 1
        d = re.search(r"difficulty:\s*(\S+)", fm)
        difficulty[d.group(1).strip('"') if d else "unset"] += 1

    graph = {c for c in list(syl_concepts) + list(linked) if concept_exists(c)}

    print(f"== {exam} — {syllabus_file}")
    print(f"   {len(syl_concepts)} syllabus concepts | {len(graph)} in the concept graph "
          f"| {len(qfiles)} questions")

    # 1. Syllabus links that resolve to nothing.
    if syl_missing:
        print("\n== Syllabus links with no page")
        for t in syl_missing:
            print(f"   {t}")
        print("   (Resources/Books pages are expected here; concept names are not.)")

    # 2. Stub pages inside the graph.
    stubs = [c for c in sorted(graph)
             if any(m in read(f"Concepts/{c}.md") for m in STUB_MARKERS)]
    print("\n== Stub concept pages in this exam's graph")
    if stubs:
        problems += len(stubs)
        for c in stubs:
            print(f"   {c}  ({linked.get(c, 0)} questions link here)")
    else:
        print("   none")

    # 3. Broken links across the graph.
    broken = {}
    for c in sorted(graph):
        for t in link_targets(read(f"Concepts/{c}.md")):
            if t.startswith(("Media/", "Resources/", "Exam ")):
                continue
            if not concept_exists(t) and not os.path.exists(os.path.join(REPO_ROOT, t + ".md")):
                broken.setdefault(t, []).append(c)
    print("\n== Broken concept links in this exam's graph")
    if broken:
        problems += len(broken)
        for target, sources in sorted(broken.items()):
            print(f"   {target}  <- {', '.join(sources)}")
    else:
        print("   none")

    # 4. Comprehension-check coverage (gates flashcard collection).
    check_dir = os.path.join(REPO_ROOT, "comprehension-checks", exam)
    if os.path.isdir(check_dir):
        checks = {n[:-3] for n in os.listdir(check_dir) if n.endswith(".md")}
        missing = [c for c in syl_concepts if c not in checks]
        print("\n== Syllabus concepts with no comprehension check")
        if missing:
            problems += len(missing)
            for c in missing:
                print(f"   {c}")
        else:
            print("   none")

    # 5. Question coverage.
    zero = [c for c in syl_concepts if linked.get(c, 0) == 0]
    print("\n== Syllabus concepts with no review questions")
    print("   " + (", ".join(zero) if zero else "none"))
    if zero:
        print("   (Prerequisite umbrellas like Calculus are fine to leave; a named"
              "\n    distribution or a testable technique is a real coverage hole.)")

    print("\n== Difficulty mix")
    total = sum(difficulty.values()) or 1
    for level in ("easy", "medium", "hard", "unset"):
        if difficulty.get(level):
            print(f"   {difficulty[level]:>4}  {level:<7} {difficulty[level]*100//total:>3}%")

    # 6. Page depth. One short example is the signature of a page that teaches
    #    recall but not the multi-step work the exam asks for.
    print("\n== Thinnest pages (words / worked examples)")
    rows = []
    for c in sorted(graph):
        text = read(f"Concepts/{c}.md")
        rows.append((len(text.split()), text.count("{Example}"), c))
    rows.sort()
    shown = rows if verbose else rows[:15]
    for words, examples, name in shown:
        flag = "  <- single plug-in example" if examples <= 1 and words < 200 else ""
        print(f"   {words:>5}w  {examples} ex  {name}{flag}")
    if not verbose and len(rows) > 15:
        print(f"   … {len(rows) - 15} more (--verbose for all)")

    single = [n for w, e, n in rows if e <= 1]
    print(f"\n   {len(single)} of {len(rows)} pages carry one example or fewer.")

    print(f"\n{'FAIL' if problems else 'OK'}: {problems} hard defect(s) "
          f"(stubs, broken links, missing checks)")
    return 1 if problems else 0


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--exam", required=True, help="question-bank dir, e.g. exam-p")
    ap.add_argument("--syllabus", help="override the syllabus page filename")
    ap.add_argument("--verbose", action="store_true", help="list every page, not the thinnest 15")
    args = ap.parse_args()

    syllabus = args.syllabus or SYLLABUS_BY_EXAM.get(args.exam)
    if not syllabus or not os.path.exists(os.path.join(REPO_ROOT, syllabus)):
        sys.exit(f"No syllabus page for {args.exam}; pass --syllabus explicitly.")
    sys.exit(audit(args.exam, syllabus, args.verbose))


if __name__ == "__main__":
    main()
