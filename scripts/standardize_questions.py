#!/usr/bin/env python3
"""
standardize_questions.py — enforce the question ontology across questions/**.

For every question file it:
  1. Resolves a canonical concept + learning objective from ontology_map.ONTOLOGY,
     using `subtopic` as the source when the `topic` is a broad exam area.
  2. Rewrites `topic` to the canonical concept name (one topic per question).
  3. Sets `learning_objective` to the syllabus callout name.
  4. Ensures the topic's concept page is present in `wiki_link`.
  5. Drops the now-redundant `subtopic` field and backfills a missing `exam`.

It then creates a stub Concepts/<name>.md for any canonical concept that lacks a
page, writes scripts/ontology_report.md, and exits non-zero if any topic is
unmapped (so the migration fails loudly rather than silently skipping).

Idempotent: re-running is a no-op because canonical concepts self-map.
"""

import re
import sys
from pathlib import Path
from collections import Counter

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ontology_map import ONTOLOGY  # noqa: E402

REPO = Path(__file__).resolve().parent.parent
QDIR = REPO / "questions"
CONCEPTS = REPO / "Concepts"
REPORT = REPO / "scripts" / "ontology_report.md"

# Make canonical concept names self-mapping so re-runs stay idempotent.
for _concept, _lo in list(ONTOLOGY.values()):
    ONTOLOGY.setdefault(_concept, (_concept, _lo))

FM_RE = re.compile(r"^---\n(.*?)\n---\n(.*)\Z", re.S)


def concept_to_link(name: str) -> str:
    return "Concepts/" + name.replace(" ", "+")


def link_to_name(link: str) -> str:
    seg = link.strip().rstrip("/").split("/")[-1]
    return seg.replace("+", " ")


def dq(value) -> str:
    s = str(value).replace("\\", "\\\\").replace('"', '\\"')
    return f'"{s}"'


def exam_from_path(path: Path) -> str:
    return "Probability" if "exam-p" in str(path) else "Financial Mathematics"


def build_frontmatter(data: dict) -> str:
    """Serialize frontmatter in a fixed field order with consistent formatting."""
    managed = {"id", "exam", "topic", "learning_objective", "subtopic",
               "difficulty", "type", "tags", "wiki_link", "answer", "points",
               "author", "year"}
    lines: list[str] = []

    lines.append(f'id: {dq(data["id"])}')
    lines.append(f'exam: {dq(data["exam"])}')
    lines.append(f'topic: {dq(data["topic"])}')
    lines.append(f'learning_objective: {dq(data["learning_objective"])}')
    if data.get("difficulty") is not None:
        lines.append(f'difficulty: {data["difficulty"]}')
    if data.get("type") is not None:
        lines.append(f'type: {data["type"]}')
    if data.get("tags"):
        items = ", ".join(dq(t) for t in data["tags"])
        lines.append(f"tags: [{items}]")
    lines.append("wiki_link:")
    for link in data["wiki_link"]:
        lines.append(f"  - {link}")
    if data.get("answer") is not None:
        lines.append(f'answer: {dq(data["answer"])}')
    if data.get("points") is not None:
        lines.append(f'points: {data["points"]}')
    if data.get("author") is not None:
        lines.append(f'author: {dq(data["author"])}')
    if data.get("year") is not None:
        lines.append(f'year: {data["year"]}')

    # Preserve any unmanaged fields (e.g. legacy `explanation`) verbatim-ish.
    for key, val in data.items():
        if key in managed:
            continue
        if isinstance(val, str):
            lines.append(f"{key}: {dq(val)}")
        else:
            lines.append(f"{key}: {val}")

    return "\n".join(lines) + "\n"


def main() -> int:
    files = sorted(QDIR.rglob("*.md"))
    unmapped: list[tuple[str, str]] = []
    changed = 0
    topic_norm = Counter()
    needed_concepts: set[str] = set()

    for path in files:
        text = path.read_text(encoding="utf-8")
        m = FM_RE.match(text)
        if not m:
            unmapped.append((str(path.relative_to(REPO)), "<no frontmatter>"))
            continue
        fm_block, body = m.group(1), m.group(2)
        data = yaml.safe_load(fm_block) or {}

        source = data.get("subtopic") or data.get("topic")
        source = str(source).strip() if source is not None else ""
        if source not in ONTOLOGY:
            unmapped.append((str(path.relative_to(REPO)), source))
            continue
        concept, lo = ONTOLOGY[source]
        needed_concepts.add(concept)
        if source != concept:
            topic_norm[f"{source} -> {concept}"] += 1

        if not data.get("exam"):
            data["exam"] = exam_from_path(path)
        data["topic"] = concept
        data["learning_objective"] = lo
        data.pop("subtopic", None)

        wl = data.get("wiki_link")
        if wl is None:
            links = []
        elif isinstance(wl, str):
            links = [wl]
        else:
            links = list(wl)
        links = [str(x).strip() for x in links if str(x).strip()]
        if not any(link_to_name(l).lower() == concept.lower() for l in links):
            links = [concept_to_link(concept)] + links
        data["wiki_link"] = links

        new_text = "---\n" + build_frontmatter(data) + "---\n" + body
        if new_text != text:
            path.write_text(new_text, encoding="utf-8")
            changed += 1

    # Create stub concept pages for canonical concepts lacking one.
    created: list[str] = []
    for concept in sorted(needed_concepts):
        page = CONCEPTS / f"{concept}.md"
        if not page.exists():
            page.write_text(
                f"- **{concept}** — concept summary to be written.\n"
                f"- This page anchors the **{concept}** topic so every review "
                f"question links to a concept.\n\n"
                f"> [!example]- Worked Example {{Example}}\n"
                f"> Example to be added.\n",
                encoding="utf-8",
            )
            created.append(concept)

    # Report
    lines = ["# Ontology Standardization Report", ""]
    lines.append(f"- Questions scanned: **{len(files)}**")
    lines.append(f"- Questions rewritten: **{changed}**")
    lines.append(f"- Concept pages created: **{len(created)}**")
    lines.append(f"- Unmapped topics: **{len(unmapped)}**")
    lines.append("")
    if topic_norm:
        lines.append("## Topic normalizations")
        for k, n in sorted(topic_norm.items()):
            lines.append(f"- {k} ({n})")
        lines.append("")
    if created:
        lines.append("## Concept pages created")
        for c in created:
            lines.append(f"- {c}")
        lines.append("")
    if unmapped:
        lines.append("## UNMAPPED (action required)")
        for f, t in unmapped:
            lines.append(f"- {f}: `{t}`")
        lines.append("")
    REPORT.write_text("\n".join(lines), encoding="utf-8")

    print(f"scanned={len(files)} changed={changed} created={len(created)} unmapped={len(unmapped)}")
    if unmapped:
        print("ERROR: unmapped topics found — see scripts/ontology_report.md", file=sys.stderr)
        for f, t in unmapped[:20]:
            print(f"  {f}: {t}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
