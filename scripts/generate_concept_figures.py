#!/usr/bin/env python3
"""Generate (and embed) the Exam P / Exam FM concept-page figures.

Every concept linked from `Exam P-1 (SOA).md` and `Exam FM-2 (SOA).md` should
carry one figure that makes the idea visible — a Venn diagram, a payment
timeline, an annotated density, a price–yield curve. This script draws them all
into `Media/Figures/` and can insert the Obsidian embed into the matching
`Concepts/*.md` page.

    python3 scripts/generate_concept_figures.py            # write the SVGs
    python3 scripts/generate_concept_figures.py --embed    # ...and embed them
    python3 scripts/generate_concept_figures.py --check    # report coverage only

The embed is placed after the definition/formula block and before the first
`> [!example]` callout, matching the hand-authored pages (e.g. Bayes Theorem).
Pages that already contain an `![[...]]` embed are left alone, so re-running is
safe.

The figures are theme-aware: each SVG carries its own light palette plus a
`@media (prefers-color-scheme: dark)` override, because an `<img>`-embedded SVG
cannot inherit the app's CSS variables. See `scripts/figure_kit.py`.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))

from figure_registry import REGISTRY  # noqa: E402
import figures_exam_p  # noqa: F401,E402
import figures_exam_fm  # noqa: F401,E402

OUT_DIR = ROOT / "Media" / "Figures"
CONCEPTS = ROOT / "Concepts"
EXAM_PAGES = ["Exam P-1 (SOA).md", "Exam FM-2 (SOA).md"]

EMBED_RE = re.compile(r"!\[\[")
EXAMPLE_RE = re.compile(r"^> \[!(example|answer|quote|info|tip|warning)\]", re.M)


def exam_concepts() -> list[str]:
    """Concept pages linked from the two exam syllabus pages, in order."""
    seen: list[str] = []
    for page in EXAM_PAGES:
        text = (ROOT / page).read_text(encoding="utf-8")
        for link in re.findall(r"\[\[([^\]]+)\]\]", text):
            name = link.split("|")[0].strip()
            if name.startswith("Resources/"):
                continue
            if not (CONCEPTS / f"{name}.md").exists():
                continue
            if name not in seen:
                seen.append(name)
    return seen


def embed_line(spec) -> str:
    return f"![[Media/Figures/{spec.slug}.svg|{spec.width}]]"


def insert_embed(text: str, line: str) -> str | None:
    """Insert `line` before the first example callout, else at the end.

    Returns None when the page already has an embed.
    """
    if EMBED_RE.search(text):
        return None
    match = EXAMPLE_RE.search(text)
    if match:
        head = text[: match.start()].rstrip("\n")
        tail = text[match.start():]
        return f"{head}\n\n{line}\n\n{tail}"
    return text.rstrip("\n") + f"\n\n{line}\n"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--embed", action="store_true",
                    help="insert the embed into each Concepts/*.md page")
    ap.add_argument("--check", action="store_true",
                    help="report which exam concepts still lack a figure")
    ap.add_argument("--only", help="regenerate a single concept by name")
    args = ap.parse_args()

    by_concept = {spec.concept: spec for spec in REGISTRY}
    duplicates = len(REGISTRY) - len(by_concept)
    if duplicates:
        print(f"warning: {duplicates} duplicate concept registration(s)", file=sys.stderr)

    if args.check:
        missing = []
        for name in exam_concepts():
            page = (CONCEPTS / f"{name}.md").read_text(encoding="utf-8")
            if EMBED_RE.search(page) or name in by_concept:
                continue
            missing.append(name)
        print(f"{len(exam_concepts())} exam concepts, {len(missing)} without a figure")
        for name in missing:
            print("  ", name)
        return 1 if missing else 0

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    written = embedded = 0
    for spec in REGISTRY:
        if args.only and spec.concept != args.only:
            continue
        page_path = CONCEPTS / f"{spec.concept}.md"
        if not page_path.exists():
            print(f"  ! no page for {spec.concept!r}", file=sys.stderr)
            continue
        fig = spec.build()
        fig.alt = spec.alt
        fig.save(OUT_DIR, spec.slug)
        written += 1
        if args.embed:
            text = page_path.read_text(encoding="utf-8")
            updated = insert_embed(text, embed_line(spec))
            if updated is not None:
                page_path.write_text(updated, encoding="utf-8")
                embedded += 1

    print(f"wrote {written} figure(s) to {OUT_DIR.relative_to(ROOT)}")
    if args.embed:
        print(f"embedded {embedded} figure(s) into Concepts/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
