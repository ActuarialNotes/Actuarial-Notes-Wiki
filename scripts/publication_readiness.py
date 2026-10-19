#!/usr/bin/env python3
"""
publication_readiness.py — how far each exam is from `ready`, gate by gate.

An exam leaves Beta / In Development (`quiz/src/lib/examStatus.ts`, mirrored in
`scripts/exam_catalog.json`) when a student can trust everything behind it.
This script is the one definition of "everything", so the content plan
(`docs/content-plan.md`) is measured rather than argued:

  G1 page       the exam page is `verified`
  G2 written    every link in a learning objective lands on a page, and every
                syllabus concept page is not a stub (the stub rule of
                `find_concept_gaps.py`)
  G3 specific   no concept page is linked, *under another name*, from more than
                `MAX_ITEMS` objective lines of one exam page — a link to
                *Commercial General Liability* displayed as "CGL Coverage B", "CGL
                Conditions", "CGL Who is an Insured"… sends a reader to one page
                for a dozen topics. A link whose text names its page ("Premium
                Auditing Process" → *Premium Audit*) is the objective naming its
                subject and doesn't count, nor does one that shortens it ("distributions"
                → *Probability Distributions*).
  G4 checked    every syllabus concept page is `verified`
  G5 sources    every Source Material reading has a `Resources/` page, `verified`
  G6 questions  every syllabus concept has at least one served question in the
                exam's own bank (the coverage rule of `generate_coverage_report.py`)
  G7 bank       every served question in the bank is `verified`

A syllabus concept is a `[[link]]` inside a learning-objective callout, resolved
by `vault_links.canonical_page` — the same set the coverage report counts.

Usage:
  python3 scripts/publication_readiness.py                 # CAS exams, summary table
  python3 scripts/publication_readiness.py --body all      # every exam
  python3 scripts/publication_readiness.py --exam disc-ia  # one exam, every failing item
  python3 scripts/publication_readiness.py --json out.json
  python3 scripts/publication_readiness.py --check 5-1     # exit 1 unless every gate passes
  python3 scripts/publication_readiness.py --hold          # CI: every `ready` exam still holds

`--hold` is the promise kept (docs/content-plan.md, Phase 1). An exam marked
`ready` has passed every gate once; the structural gates (G2 written, G3
specific, G6 questions) are a fact about the vault's pages, links and bank, so a
PR that breaks one on a ready exam fails. The fact-check gates (G1, G4, G5, G7)
move with every edit — any edit makes a file `stale` (P4), and the record is
repaired, not authored, in CI — so they are printed as warnings, the re-check a
ready exam is now owed. A beta exam below the development → beta bar (G2, G3,
G6) is a warning too: it is the worklist, not a regression.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import generate_coverage_report as COV  # noqa: E402
import syllabus_lib as SL  # noqa: E402
import vault_links as VL  # noqa: E402
import verify_lib as V  # noqa: E402

REPO_ROOT = Path(VL.REPO_ROOT)
STUB_WORDS = 100        # find_concept_gaps.STUB_WORDS
MAX_ITEMS = 2           # G3: more renamed links than this to one concept page is a catch-all

GATES = ("page", "written", "specific", "checked", "sources", "questions", "bank")
# The gates a page, link or bank edit can break; the rest are the fact check's.
STRUCTURAL = ("written", "specific", "questions")

GATE_LABELS = {
    "page": "G1 page verified",
    "written": "G2 concepts written",
    "specific": "G3 links specific",
    "checked": "G4 concepts verified",
    "sources": "G5 sources written + verified",
    "questions": "G6 every concept has a question",
    "bank": "G7 bank verified",
}


def status_of(rel: str) -> str:
    path = REPO_ROOT / rel
    if not path.exists():
        return "missing"
    block = V.parse_verification(path.read_text(encoding="utf-8"))
    return (block or {}).get("status", "unverified")


def stub_reason(rel: str) -> str | None:
    """Why a concept page is a stub, or None — find_concept_gaps.find_stubs, without the inbound term."""
    _, body = SL.split_frontmatter((REPO_ROOT / rel).read_text(encoding="utf-8"))
    prose = re.sub(r"!\[\[[^\]]*\]\]", " ", body)
    words = len(re.findall(r"[A-Za-z][A-Za-z'-]*", re.sub(r"\$[^$]*\$", " x ", prose)))
    has_def = bool(re.search(r"\*\*[^*]+\*\*", body[:600]))
    if words < 40:
        return f"{words} words"
    if not has_def and words < STUB_WORDS:
        return f"{words} words, no bold definition"
    return None


IRREGULAR_STEMS = {"lives": "life"}


def _stems(text: str) -> list[str]:
    """Lower-cased words cut to a five-letter stem — "Auditing" and "Audit", "Plots" and "Plot",
    "lives" and "Life" agree."""
    words = re.sub(r"[^a-z0-9 ]+", " ", text.lower().replace("'s", "")).split()
    return [re.sub(r"s$", "", IRREGULAR_STEMS.get(w, w))[:5] for w in words]


def _expand_acronyms(display: str, page_name: str) -> str:
    """`display` with each capitalised acronym spelled out as the run of page-name words whose
    initials it is: "DB plan" for *Defined Benefit Plan* reads "Defined Benefit plan"."""
    words = re.sub(r"[^A-Za-z0-9 ]+", " ", page_name).split()

    def spell(m: re.Match) -> str:
        acronym = m.group(0)
        for i in range(len(words) - len(acronym) + 1):
            run = words[i:i + len(acronym)]
            if "".join(w[0] for w in run).upper() == acronym:
                return " ".join(run)
        return acronym
    return re.sub(r"\b[A-Z]{2,}\b", spell, display)


PREPOSITIONS = {"in", "of", "to", "for", "on", "with", "by", "from", "under", "at"}


def _shared_head(after: str, missing: set[str]) -> bool:
    """True when the text after a link coordinates it with a phrase whose last words are
    exactly `missing` — the head noun the two share: "long-term life *and health insurance*"
    says "long-term life insurance"."""
    m = re.match(r"\s*(?:and|or)\s+([^,;.:()]+)", after)
    if not m or not missing:
        return False
    words = _stems(m.group(1))
    # A parallel noun phrase: a modifier or two before the shared head, no clause of its own
    # ("and manage liquidity in fixed income portfolios" coordinates a verb, not a noun).
    if len(words) > len(missing) + 2 or set(words) & PREPOSITIONS:
        return False
    return set(words[-len(missing):]) == missing


def renamed(link: VL.Link, page_name: str, after: str = "") -> bool:
    """True when a link's text names something other than its page.

    Not renamed: text that contains the page's name ("Premium Auditing Process" names *Premium
    Audit*) or shortens it ("distributions" for *Probability Distributions*), counting a head
    noun shared with the phrase it is coordinated with (`after`, the line's text past the
    link: "long-term life and health insurance" names *Life Insurance*). Renamed: text with
    words of its own that leave part of the page's name out ("CGL Coverage B" does not name
    *Commercial General Liability*)."""
    if not link.display:
        return False
    shown = set(_stems(link.display))
    page = set(_stems(re.sub(r"\s*\([^)]*\)", "", page_name)))
    if _shared_head(after, page - shown):
        shown |= page - shown
    if page <= shown or shown <= page:
        return False
    # An acronym of the page's own name shortens it ("DB plan"), but an acronym followed by
    # words of its own still names something else ("CGL Coverage B").
    return not set(_stems(_expand_acronyms(link.display, page_name))) <= page


def unresolved_links(page: Path, vault: VL.Vault, wiki_id: str, tables: dict) -> list[str]:
    """Link targets in the learning objectives that land on no page at all."""
    missing: list[str] = []
    for s in SL.parse_exam_page(str(page)).sections:
        for line in s.lines:
            for link in VL.iter_links(line):
                name = VL.link_basename(link.target)
                if VL.canonical_page(name, vault, wiki_id, tables) or vault.exists(link.target):
                    continue
                if name not in missing:
                    missing.append(name)
    return missing


def objective_lines(page: Path, vault: VL.Vault, wiki_id: str, tables: dict) -> list[tuple[str, str, list[str], set[str]]]:
    """(section title, the objective line's text, the concept pages it links, those linked under
    another name) per numbered line."""
    exam = SL.parse_exam_page(str(page))
    out: list[tuple[str, str, list[str]]] = []
    for s in exam.sections:
        for line in s.lines:
            if not re.match(r"^\s*(\d+\.|-|\*)\s+", line):
                continue
            names: list[str] = []
            aliased: set[str] = set()
            for link in VL.iter_links(line):
                name = VL.canonical_page(VL.link_basename(link.target), vault, wiki_id, tables)
                if name and vault.is_concept(name):
                    if name not in names:
                        names.append(name)
                    after = SL.strip_links(line[line.index("]]", link.start) + 2:])
                    if renamed(link, name, after):
                        aliased.add(name)
            if names:
                out.append((s.title, SL.strip_links(line).strip(), names, aliased))
    return out


def served_bank(bank: str | None) -> tuple[Counter, list[str]]:
    """Concept tag counts over the questions the quiz serves, and those questions' paths."""
    counts: Counter = Counter()
    paths: list[str] = []
    if not bank:
        return counts, paths
    for path in sorted((REPO_ROOT / "questions" / bank).glob("*.md")):
        tags = COV.question_concepts(path)
        if tags is None:
            continue
        counts.update(tags)
        paths.append(f"questions/{bank}/{path.name}")
    return counts, paths


def assess(exam: dict, vault: VL.Vault, tables: dict) -> dict:
    page = REPO_ROOT / exam["page"]
    wiki_id = exam["wiki_id"]
    lines = objective_lines(page, vault, wiki_id, tables)
    concepts: list[str] = []
    items: dict[str, list[str]] = defaultdict(list)
    for _, text, names, aliased in lines:
        for n in names:
            if n not in concepts:
                concepts.append(n)
        for n in aliased:
            items[n].append(text)

    counts, bank_paths = served_bank(exam.get("bank"))
    rel = {c: vault.by_name[c] for c in concepts}

    stubs = {c: r for c in concepts if (r := stub_reason(rel[c]))}
    stubs.update({name: "no page" for name in unresolved_links(page, vault, wiki_id, tables)})
    catch_alls = {c: ts for c, ts in items.items() if len(ts) > MAX_ITEMS}
    unchecked = {c: s for c in concepts if (s := status_of(rel[c])) != "verified"}
    no_question = [c for c in concepts if counts[c.lower()] == 0]

    sources: dict[str, str] = {}
    for _, link, _ in SL.source_entries(SL.parse_exam_page(str(page))):
        how, path = vault.resolve(link.target)
        sources[VL.link_basename(link.target)] = status_of(path) if path else "missing"
    bad_sources = {s: st for s, st in sources.items() if st != "verified"}
    bank_status = Counter(status_of(p) for p in bank_paths)

    page_status = status_of(exam["page"])
    failing = {
        "page": page_status != "verified",
        "written": bool(stubs),
        "specific": bool(catch_alls),
        "checked": bool(unchecked),
        "sources": bool(bad_sources),
        "questions": bool(no_question),
        "bank": bool(bank_paths) and bank_status["verified"] < len(bank_paths),
    }
    return {
        "exam": exam["page"][:-3],
        "wiki_id": wiki_id,
        "status": exam["status"],
        "bank": exam.get("bank"),
        "page_status": page_status,
        "concepts": len(concepts),
        "stubs": stubs,
        "catch_alls": catch_alls,
        "unchecked": unchecked,
        "no_question": no_question,
        "sources": sources,
        "bad_sources": bad_sources,
        "bank_served": len(bank_paths),
        "bank_status": dict(bank_status),
        "failing": failing,
        "ready": not any(failing.values()),
    }


def summary_table(results: list[dict]) -> str:
    rows = [
        "| Exam | Status | Page | Concepts | Missing / stub | Catch-alls | Unverified concepts | Concepts w/o question "
        "| Sources not verified | Bank verified | Gates passed |",
        "|---|---|---|---:|---:|---:|---:|---:|---:|---|---:|",
    ]
    for r in results:
        served = r["bank_served"]
        bank = f"{r['bank_status'].get('verified', 0)} / {served}" if served else "no bank"
        passed = sum(not v for v in r["failing"].values())
        rows.append(
            f"| {r['exam']} | {r['status']} | {r['page_status']} | {r['concepts']} | {len(r['stubs'])} "
            f"| {len(r['catch_alls'])} | {len(r['unchecked'])} | {len(r['no_question'])} "
            f"| {len(r['bad_sources'])} / {len(r['sources'])} | {bank} | {passed} / {len(GATES)} |"
        )
    return "\n".join(rows)


def detail(r: dict) -> str:
    out = [f"# {r['exam']} — {r['status']}", ""]
    for g in GATES:
        out.append(f"- [{' ' if r['failing'][g] else 'x'}] {GATE_LABELS[g]}")
    out.append("")
    if r["stubs"]:
        out += ["## G2 missing pages and stubs", *[f"- {c} ({why})" for c, why in r["stubs"].items()], ""]
    if r["catch_alls"]:
        out.append("## G3 catch-all links")
        for c, ts in sorted(r["catch_alls"].items(), key=lambda kv: -len(kv[1])):
            out.append(f"- **{c}** stands in, renamed, for {len(ts)} objective lines:")
            out += [f"    - {t}" for t in ts]
        out.append("")
    if r["unchecked"]:
        by: dict[str, list[str]] = defaultdict(list)
        for c, s in r["unchecked"].items():
            by[s].append(c)
        out.append("## G4 concepts not verified")
        for s, cs in sorted(by.items()):
            out.append(f"- {s} ({len(cs)}): " + ", ".join(sorted(cs)))
        out.append("")
    if r["bad_sources"]:
        out += ["## G5 sources", *[f"- {s}: {st}" for s, st in r["bad_sources"].items()], ""]
    if r["no_question"]:
        out += [f"## G6 concepts with no question ({len(r['no_question'])})", *[f"- {c}" for c in r["no_question"]], ""]
    if r["failing"]["bank"]:
        out += ["## G7 bank", *[f"- {s}: {n}" for s, n in sorted(r["bank_status"].items())], ""]
    return "\n".join(out)


def hold(results: list[dict]) -> tuple[list[str], list[str]]:
    """Errors (a ready exam failing a structural gate) and warnings, for `--hold`."""
    errors: list[str] = []
    warnings: list[str] = []
    for r in results:
        failing = [g for g in GATES if r["failing"][g]]
        if r["status"] == "ready":
            for g in failing:
                (errors if g in STRUCTURAL else warnings).append(
                    f"{r['exam']} is ready but fails {GATE_LABELS[g]} (--exam {r['wiki_id']} lists the items)")
        elif r["status"] == "beta":
            for g in failing:
                if g in STRUCTURAL:
                    warnings.append(f"{r['exam']} is beta but fails {GATE_LABELS[g]}")
    return errors, warnings


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--body", default="CAS", help="CAS (default), SOA or all")
    ap.add_argument("--exam", help="one exam (wiki id, exam id, bank or page): print every failing item")
    ap.add_argument("--check", metavar="EXAM", help="exit 1 unless EXAM passes every gate")
    ap.add_argument("--json", metavar="PATH", help="write the full assessment as JSON")
    ap.add_argument("--hold", action="store_true",
                    help="exit 1 if a ready exam fails a structural gate (G2, G3, G6); warn on the rest")
    args = ap.parse_args()

    vault, tables, catalog = VL.Vault(), VL.load_aliases(), VL.load_catalog()
    key = args.exam or args.check
    if key:
        exam = VL.exam_for_id(key, catalog)
        if not exam:
            print(f"no exam {key!r} in scripts/exam_catalog.json", file=sys.stderr)
            return 2
        r = assess(exam, vault, tables)
        print(detail(r))
        return 1 if args.check and not r["ready"] else 0

    if args.hold:
        results = [assess(e, vault, tables) for e in catalog if (REPO_ROOT / e["page"]).exists()]
        errors, warnings = hold(results)
        for w in warnings:
            print(f"warning: {w}")
        for e in errors:
            print(f"error: {e}")
        ready = sum(r["status"] == "ready" for r in results)
        print(f"hold: {ready} ready exam(s), {len(errors)} error(s), {len(warnings)} warning(s)")
        return 1 if errors else 0

    exams = [e for e in catalog if args.body.lower() == "all" or e["body"] == args.body.upper()]
    results = [assess(e, vault, tables) for e in exams if (REPO_ROOT / e["page"]).exists()]
    print(summary_table(results))
    if args.json:
        with open(args.json, "w", encoding="utf-8") as fh:
            json.dump(results, fh, indent=1)
    return 0


if __name__ == "__main__":
    sys.exit(main())
