#!/usr/bin/env python3
"""
verify_route.py — route each concept page to the reading (and pages) that
discusses it, and group the concepts into one packet per reading.

`docs/verification-plan.md` §3–4: a concept page is checked against the syllabus
reading that defines it, and a reading is the expensive part of that check. So a
packet is one reading, loaded once, plus every concept it can verify — and the
reading's own `Resources/Books` page, which is checked against the same
document. The routing is mechanical:

  1. **Concept → exams.** The exam pages that link it in a syllabus section,
     and the exams whose question banks tag it (`wiki_link:`).
  2. **Exam → task codes → readings.** The objective it is linked under gives a
     task code (`A6` — the section's letter and the objective's number); the
     Source Material line of each reading opens with the codes it covers
     (`A2-A3, A6-A8 — …`). A concept's candidates are the readings sharing a
     code with it. An exam page with no codes (the SOA pages, the DISCs) offers
     all of its readings, which is only ever a handful.
  3. **Reading → pages.** The candidate readings, from the shared source cache
     (`verify_sources.py`), are searched for the concept's name and aliases.
     Its *focus* pages — the few that name it most often, where it is defined
     and worked — are the pages a pass reads first.
  4. **Packets.** A greedy set cover over the routed concepts, so the fewest
     readings carry them all, the heaviest first.

Usage:
  python3 scripts/verify_route.py                    # unverified concepts, cached readings only
  python3 scripts/verify_route.py --fetch            # fetch candidate readings into the cache first
  python3 scripts/verify_route.py Concepts/Earned\\ Premium.md --all
  python3 scripts/verify_route.py --json routes.json # machine-readable, read by verify_targets.py
  python3 scripts/verify_route.py --packet "Basics of Reinsurance Pricing (Clark - 2014)"

A concept ends in one of five states — the plan's triage:

  routed      named on known pages of a reading it is assigned to
  unfetched   it has candidates with a URL that are not in the cache (rerun with --fetch)
  closed      not named in a free candidate, and at least one candidate has no free
              document (no resource page, or no `Available from:`) — it may live there
  unnamed     every candidate was searched and none names it — an alias is missing, or the
              page covers something its readings don't
  unlinked    no exam page or question bank links it
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import resource_extract as RE  # noqa: E402
import syllabus_lib as SL  # noqa: E402
import vault_links as VL  # noqa: E402
import verify_lib as V  # noqa: E402
import verify_sources as S  # noqa: E402

REPO_ROOT = V.REPO_ROOT
CONCEPTS = REPO_ROOT / "Concepts"
BOOKS = REPO_ROOT / "Resources" / "Books"
CODE_RE = re.compile(r"\b([A-Z])(\d+)(?:\s*[-–]\s*(?:[A-Z])?(\d+))?\b")
LEAD_CODES_RE = re.compile(r"^\s*((?:[A-Z]\d+(?:\s*[-–]\s*[A-Z]?\d+)?\s*,?\s*)+)")
SECTION_LETTER_RE = re.compile(r"^([A-Z])\.\s")


# ─── Pure helpers ─────────────────────────────────────────────────────────────

def task_codes(spec: str) -> set[str]:
    """`"A1-A3, A6, C1-C5"` → `{A1, A2, A3, A6, C1, …, C5}`."""
    out: set[str] = set()
    for letter, lo, hi in CODE_RE.findall(spec):
        a, b = int(lo), int(hi) if hi else int(lo)
        if 0 <= b - a <= 40:
            out |= {f"{letter}{i}" for i in range(a, b + 1)}
    return out


def assignment_codes(assignment: list[str]) -> set[str]:
    """The task codes a Source Material line opens with, or none."""
    m = LEAD_CODES_RE.match(" ".join(assignment))
    return task_codes(m.group(1)) if m else set()


def concept_terms(name: str, text: str = "") -> list[str]:
    """What a search looks for: the page name, its `aliases:`, and both halves of
    a parenthesised name (`Minimum Capital Test (MCT)` → also `MCT`)."""
    terms = [name]
    fm, _body = V.split_frontmatter(text) if text else (None, "")
    if fm:
        block = re.search(r"^aliases:\s*\n((?:\s+-.*\n?)*)", fm, re.M)
        if block:
            terms += [a.strip().strip('"').strip("'")
                      for a in re.findall(r"^\s+-\s+(.*)$", block.group(1), re.M)]
        inline = re.search(r"^aliases:\s*\[(.*)\]\s*$", fm, re.M)
        if inline:
            terms += [a.strip().strip('"').strip("'") for a in inline.group(1).split(",")]
    m = re.match(r"^(.*?)\s*\(([^)]+)\)$", name)
    if m:
        terms += [m.group(1), m.group(2)]
    seen: set[str] = set()
    out = []
    for t in terms:
        key = t.lower()
        if len(t) > 2 and key not in seen:
            seen.add(key)
            out.append(t)
    return out


def set_cover(need: dict[str, set[str]]) -> list[tuple[str, list[str]]]:
    """Fewest readings that carry every concept: repeatedly take the reading that
    carries the most concepts still unplaced. Ties go to the reading's name, so
    the result is stable."""
    left = {c for c, rs in need.items() if rs}
    packets: list[tuple[str, list[str]]] = []
    while left:
        counts = Counter(r for c in left for r in need[c])
        reading = min(counts, key=lambda r: (-counts[r], r))
        members = sorted(c for c in left if reading in need[c])
        packets.append((reading, members))
        left -= set(members)
    return packets


# ─── The vault side ───────────────────────────────────────────────────────────

def exam_map(path: Path) -> tuple[dict[str, set[str] | None], dict[str, set[str]]]:
    """(concept name → task codes it is linked under, reading name → task codes).

    A concept linked outside any coded objective maps to `None`, meaning "every
    reading of this exam".
    """
    page = SL.parse_exam_page(str(path))
    concepts: dict[str, set[str] | None] = {}
    for section in page.sections:
        m = SECTION_LETTER_RE.match(section.title)
        letter = m.group(1) if m else None
        coded_lines: set[int] = set()
        for obj in section.objectives:
            code = f"{letter}{obj.num}" if letter and str(obj.num).isdigit() else None
            for ln, line in zip([obj.line_no, *obj.extra_line_nos], obj.all_lines()):
                coded_lines.add(ln)
                for link in VL.iter_links(line):
                    if code is None:
                        concepts.setdefault(link.name, None)
                    elif concepts.get(link.name, set()) is not None:
                        concepts.setdefault(link.name, set()).add(code)
        for ln, line in zip(section.line_nos, section.lines):
            if ln in coded_lines:
                continue
            for link in VL.iter_links(line):
                concepts.setdefault(link.name, None)
    readings = {link.name: assignment_codes(assign) for _ln, link, assign in SL.source_entries(page)}
    return concepts, readings


def candidates_for(name: str, exams: list[str], maps: dict[str, tuple]) -> list[str]:
    out: set[str] = set()
    for exam in exams:
        concepts, readings = maps[exam]
        codes = concepts.get(name)
        coded = {r for r, cs in readings.items() if codes and cs & codes}
        out |= coded if coded else set(readings)
    return sorted(out)


def concept_exams(catalog: list[dict]) -> dict[str, list[str]]:
    """Concept name → the exam pages that link it, in the catalogue's ladder order:
    by its syllabus, or by its question bank's tags."""
    order = [e["page"] for e in catalog]
    linked: dict[str, set[str]] = defaultdict(set)
    for exam in order:
        page = SL.parse_exam_page(str(REPO_ROOT / exam))
        for _ln, link in page.links_in_sections():
            linked[link.name].add(exam)
    by_bank = {e["bank"]: e["page"] for e in catalog if e.get("bank")}
    for qfile in (REPO_ROOT / "questions").glob("*/*.md"):
        exam = by_bank.get(qfile.parent.name)
        if not exam:
            continue
        fm, _body = V.split_frontmatter(qfile.read_text(encoding="utf-8"))
        for raw in re.findall(r"^\s+-\s+\"?(Concepts/[^\"\n]+)", fm or "", re.M):
            linked[raw.split("/")[-1].replace("+", " ").strip()].add(exam)
    return {c: sorted(es, key=order.index) for c, es in linked.items()}


def reading_source(name: str) -> tuple[str, str]:
    """(resource page, `Available from:` URL) for a reading, either possibly empty."""
    page = BOOKS / f"{name}.md"
    if not page.is_file():
        return "", ""
    return V.rel_path(page), RE.page_link(V.rel_path(page)) or ""


def is_cached(url: str) -> bool:
    return (S.source_dir(url) / "meta.json").is_file()


# ─── Routing ──────────────────────────────────────────────────────────────────

def route(concept_files: list[Path], fetch: bool = False) -> dict:
    catalog = VL.load_catalog()
    maps = {e["page"]: exam_map(REPO_ROOT / e["page"]) for e in catalog}
    exams_of = concept_exams(catalog)
    texts: dict[str, list[str]] = {}

    def pages_of(url: str) -> list[str] | None:
        if url not in texts:
            if not (fetch or is_cached(url)):
                return None
            try:
                texts[url] = [t for _n, t in S.read_pages(url)]
            except Exception as exc:  # a dead link is a finding for the resource page
                print(f"could not fetch {url}: {exc}", file=sys.stderr)
                texts[url] = []
        return texts[url]

    concepts: dict[str, dict] = {}
    for path in concept_files:
        rel, name = V.rel_path(path), path.stem
        exams = exams_of.get(name, [])
        terms = concept_terms(name, path.read_text(encoding="utf-8"))
        cands = []
        for reading in candidates_for(name, exams, maps):
            resource, url = reading_source(reading)
            entry = {"reading": reading, "resource": resource, "url": url, "pages": None,
                     "focus": []}
            if url:
                pages = pages_of(url)
                if pages is not None:
                    hits = S.search_pages(pages, terms)
                    entry["pages"] = sorted({p for ps in hits.values() for p in ps})
                    entry["focus"] = S.focus_pages(pages, terms) if entry["pages"] else []
            cands.append(entry)
        hit = [c for c in cands if c["pages"]]
        if not exams:
            state = "unlinked"
        elif hit:
            state = "routed"
        elif any(c["url"] and c["pages"] is None for c in cands):
            state = "unfetched"
        elif any(not c["url"] for c in cands):
            # The reading it lives in may be the one with no free document.
            state = "closed"
        else:
            state = "unnamed"
        concepts[rel] = {"exams": exams, "terms": terms, "state": state, "candidates": cands}

    need = {rel: {c["reading"] for c in info["candidates"] if c["pages"]}
            for rel, info in concepts.items()}
    packets = []
    for reading, members in set_cover(need):
        resource, url = reading_source(reading)
        pages = sorted({p for rel in members for c in concepts[rel]["candidates"]
                        if c["reading"] == reading for p in c["focus"]})
        for rel in members:
            concepts[rel]["packet"] = reading
        packets.append({"reading": reading, "resource": resource, "url": url,
                        "concepts": members, "pages": pages})
    return {"concepts": concepts, "packets": packets}


def render_markdown(result: dict) -> str:
    states = Counter(info["state"] for info in result["concepts"].values())
    lines = [f"# Concept routing — {len(result['concepts'])} concept page(s)\n",
             " · ".join(f"{k} {states[k]}" for k in
                        ("routed", "unfetched", "closed", "unnamed", "unlinked") if states[k]) + "\n",
             f"## {len(result['packets'])} reading packet(s)\n",
             "| Concepts | Reading | Focus pages | Resource page |",
             "|---:|---|---|---|"]
    for p in result["packets"]:
        lines.append(f"| {len(p['concepts'])} | {p['reading']} | {S.ranges(p['pages'])} | "
                     f"{'`' + p['resource'] + '`' if p['resource'] else '—'} |")
    for state in ("unfetched", "closed", "unnamed", "unlinked"):
        rows = sorted(rel for rel, info in result["concepts"].items() if info["state"] == state)
        if rows:
            lines += ["", f"## {state} ({len(rows)})\n", *[f"- `{r}`" for r in rows]]
    return "\n".join(lines) + "\n"


def render_packet(result: dict, reading: str) -> str:
    """One reading's packet: what to fetch, and each concept's focus pages."""
    packet = next((p for p in result["packets"] if p["reading"].lower() == reading.lower()), None)
    if packet is None:
        raise SystemExit(f"no packet for {reading!r}")
    lines = [f"# Packet: {packet['reading']}\n",
             f"- source: {packet['url'] or '— no free document'}",
             f"- its resource page, checked in the same load: "
             f"{'`' + packet['resource'] + '`' if packet['resource'] else '— none'}", "",
             "| Concept | Focus pages | Also named on |", "|---|---|---|"]
    for rel in packet["concepts"]:
        cand = next(c for c in result["concepts"][rel]["candidates"] if c["reading"] == packet["reading"])
        rest = sorted(set(cand["pages"]) - set(cand["focus"]))
        lines.append(f"| `{rel}` | {S.ranges(cand['focus'])} | "
                     f"{S.ranges(rest[:40]) + (' …' if len(rest) > 40 else '') or '—'} |")
    return "\n".join(lines) + "\n"


def _concept_files(paths: list[str], include_verified: bool) -> list[Path]:
    if paths:
        files = []
        for raw in paths:
            p = (REPO_ROOT / raw).resolve()
            files += sorted(p.glob("*.md")) if p.is_dir() else [p]
    else:
        files = sorted(CONCEPTS.glob("*.md"))
    out = []
    for f in files:
        if not V.is_content_file(f) or not V.rel_path(f).startswith("Concepts/"):
            continue
        block = V.parse_verification(f.read_text(encoding="utf-8")) or {}
        if include_verified or block.get("status") != "verified":
            out.append(f)
    return out


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("paths", nargs="*", help="concept pages or folders (default: Concepts/)")
    ap.add_argument("--all", action="store_true", help="include verified concepts")
    ap.add_argument("--fetch", action="store_true", help="fetch candidate readings not yet cached")
    ap.add_argument("--json", help="also write the full routing to this file")
    ap.add_argument("--packet", help="print one reading's packet: its concepts and their focus pages")
    args = ap.parse_args(argv)
    result = route(_concept_files(args.paths, args.all), fetch=args.fetch)
    if args.json:
        Path(args.json).write_text(json.dumps(result, indent=1, ensure_ascii=False), encoding="utf-8")
    print(render_packet(result, args.packet) if args.packet else render_markdown(result))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
