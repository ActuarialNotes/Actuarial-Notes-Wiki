#!/usr/bin/env python3
"""
verify_context.py — assemble everything a VALIDATE pass needs to read about one
content file, in the order the spec prescribes.

This is the compounding mechanism. A sweep that only reads the page in front of
it repeats last month's work; a sweep that reads the page *and the full history
of what has already been found about it* builds on it. So the sidecar log is
emitted in full, never truncated, never summarised — including comment entries a
human typed in by hand, which reach the agent verbatim.

The order is deliberate:

  1. the content file itself
  2. its sidecar log, complete
  3. sibling files imported in the same batch — transcription errors cluster,
     and a wrong exhibit is usually wrong in every question that shares it
  4. linked concept pages, for terminology and formula consistency
  5. the source material the exam page names for this topic — the rank-1/2
     sources a real verification has to be checked against

Usage:
  python3 scripts/verify_context.py questions/exam-5/cas5-2013f-009.md
  python3 scripts/verify_context.py Concepts/Convexity.md --json
  python3 scripts/verify_context.py <path> --max-concepts 4 --max-siblings 6
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field, asdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import verify_lib as V  # noqa: E402

REPO_ROOT = V.REPO_ROOT

DEFAULT_MAX_CONCEPTS = 6
DEFAULT_MAX_SIBLINGS = 6

LINK_RE = re.compile(r"\[\[([^\]|]+)(?:\|[^\]]+)?\]\]")


@dataclass
class Attachment:
    path: str
    role: str
    note: str
    text: str


@dataclass
class Context:
    target: str
    status: str
    open_findings: int
    log_path: str
    log_text: str
    attachments: list[Attachment] = field(default_factory=list)


# ─── Frontmatter helpers ──────────────────────────────────────────────────────

def _fm_scalar(fm_text: str, key: str) -> str | None:
    match = re.search(rf"^{re.escape(key)}:\s*(.+)$", fm_text, re.MULTILINE)
    return match.group(1).strip().strip('"').strip("'") if match else None


def _fm_list(fm_text: str, key: str) -> list[str]:
    lines = fm_text.split("\n")
    for i, line in enumerate(lines):
        if not re.match(rf"^{re.escape(key)}:\s*$", line):
            continue
        items = []
        for follow in lines[i + 1:]:
            item = re.match(r"^\s+-\s+(.*)$", follow)
            if not item:
                break
            items.append(item.group(1).strip().strip('"').strip("'"))
        return items
    return []


def linked_concepts(rel: str, text: str) -> list[str]:
    """Concept page names this file leans on, in source order."""
    fm_text, body = V.split_frontmatter(text)
    names: list[str] = []
    if fm_text:
        for raw in _fm_list(fm_text, "wiki_link"):
            names.append(raw.split("/")[-1].replace("+", " ").strip())
    for raw in LINK_RE.findall(body):
        name = raw.split("/")[-1].strip()
        if not raw.startswith("Resources/"):
            names.append(name)
    seen: set[str] = set()
    ordered: list[str] = []
    self_name = Path(rel).stem
    for name in names:
        key = name.lower()
        if key in seen or name == self_name:
            continue
        seen.add(key)
        if (REPO_ROOT / "Concepts" / f"{name}.md").is_file():
            ordered.append(name)
    return ordered


# ─── Siblings ─────────────────────────────────────────────────────────────────

BATCH_SUFFIX_RE = re.compile(r"^(.*?)[-_]?(?:q)?\d+$", re.IGNORECASE)


def sibling_questions(rel: str, limit: int) -> list[str]:
    """Other questions imported from the same paper.

    `cas5-2013f-009.md` and `cas5-2013f-010.md` came out of one PDF in one
    conversion pass. If the exhibit was mistranscribed once it is very likely
    mistranscribed across the batch, so the whole batch is worth having in view.
    """
    path = REPO_ROOT / rel
    if not rel.startswith("questions/") or not path.is_file():
        return []
    match = BATCH_SUFFIX_RE.match(path.stem)
    if not match or not match.group(1):
        return []
    prefix = match.group(1)
    found = [
        V.rel_path(p)
        for p in sorted(path.parent.glob(f"{prefix}*.md"))
        if p != path
    ]
    return found[:limit]


# ─── Source material ──────────────────────────────────────────────────────────

def exam_page_for(label: str) -> Path | None:
    """`Exam 5` → `Exam 5 (CAS).md`, matching on the `data-current` exam id."""
    wanted = label.strip().lower().removeprefix("exam").strip()
    best: Path | None = None
    for page in sorted(REPO_ROOT.glob("Exam *.md")):
        text = page.read_text(encoding="utf-8")
        meta = re.search(r'data-current="([^|"]+)\|', text)
        exam_id = meta.group(1).strip().lower() if meta else page.stem.lower()
        stripped = re.sub(r"-\d+$", "", exam_id)
        if stripped == wanted or exam_id == wanted:
            return page
        if best is None and wanted and wanted in page.stem.lower():
            best = page
    return best


def source_material(exam_page: Path) -> list[tuple[str, str]]:
    """`(reading, assignment)` pairs from the exam page's Source Material callout."""
    lines = exam_page.read_text(encoding="utf-8").split("\n")
    entries: list[tuple[str, str]] = []
    in_block = False
    current: str | None = None
    for line in lines:
        header = re.match(r"^>\s*\[!(\w+)\]", line)
        if header:
            in_block = header.group(1).lower() == "answer"
            continue
        if not in_block or not line.startswith(">"):
            continue
        body = line.replace(">", "", 1).rstrip()
        top = re.match(r"^\s?-\s+(.*)$", body)
        nested = re.match(r"^\s{2,}-\s+(.*)$", body)
        if nested and current:
            entries[-1] = (current, nested.group(1).strip())
        elif top:
            links = LINK_RE.findall(top.group(1))
            current = links[0] if links else top.group(1).strip()
            entries.append((current, ""))
    return entries


def resource_note(reading: str, assignment: str) -> tuple[str, str]:
    """The `Resources/Books` page for a reading, plus where to actually find it."""
    name = reading.split("/")[-1].strip()
    page = REPO_ROOT / "Resources" / "Books" / f"{name}.md"
    detail = f"reading assignment: {assignment}" if assignment else "syllabus reading"
    if not page.is_file():
        return "", f"{detail} (no Resources/Books page)"
    fm_text, _body = V.split_frontmatter(page.read_text(encoding="utf-8"))
    where = _fm_scalar(fm_text or "", "Available from") or _fm_scalar(fm_text or "", "Find at your local library at")
    if where:
        detail = f"{detail} · available from: {where}"
    return V.rel_path(page), detail


# ─── Assembly ─────────────────────────────────────────────────────────────────

def build(rel: str, max_concepts: int, max_siblings: int) -> Context:
    path = REPO_ROOT / rel
    if not path.is_file():
        raise SystemExit(f"no such content file: {rel}")
    text = path.read_text(encoding="utf-8")

    try:
        block = V.parse_verification(text) or {}
    except ValueError:
        block = {}

    log_path = V.log_path_for(rel)
    log_text = log_path.read_text(encoding="utf-8") if log_path.is_file() else ""

    ctx = Context(
        target=rel,
        status=str(block.get("status") or "unverified"),
        open_findings=int(block.get("open_findings") or 0),
        log_path=V.log_rel_for(rel),
        log_text=log_text,
    )

    for sibling in sibling_questions(rel, max_siblings):
        ctx.attachments.append(Attachment(
            path=sibling,
            role="sibling",
            note="imported in the same batch — transcription errors cluster",
            text=(REPO_ROOT / sibling).read_text(encoding="utf-8"),
        ))

    for name in linked_concepts(rel, text)[:max_concepts]:
        concept_rel = f"Concepts/{name}.md"
        ctx.attachments.append(Attachment(
            path=concept_rel,
            role="concept",
            note="linked concept — check terminology and formulas for consistency",
            text=(REPO_ROOT / concept_rel).read_text(encoding="utf-8"),
        ))

    fm_text, _body = V.split_frontmatter(text)
    exam_label = _fm_scalar(fm_text or "", "exam") if fm_text else None
    if exam_label is None and V.EXAM_PAGE_RE.match(path.name):
        exam_page: Path | None = path
    else:
        exam_page = exam_page_for(exam_label) if exam_label else None
    if exam_page is not None:
        for reading, assignment in source_material(exam_page):
            resource_rel, note = resource_note(reading, assignment)
            ctx.attachments.append(Attachment(
                path=resource_rel or f"(no page) {reading}",
                role="source",
                note=note,
                # Only the metadata: the point of a source entry is to send the
                # agent to the real document, not to let it check the vault
                # against the vault (that is rank 4, consistency not truth).
                text="",
            ))

    return ctx


def render(ctx: Context) -> str:
    out: list[str] = []
    out.append(f"# Validation context: {ctx.target}\n")
    out.append(
        f"Current status: **{ctx.status}** · open findings: **{ctx.open_findings}** · "
        f"log: `{ctx.log_path}`\n"
    )

    out.append("## 1. The content file\n")
    out.append(f"`{ctx.target}`\n")
    out.append("```markdown")
    out.append((REPO_ROOT / ctx.target).read_text(encoding="utf-8").rstrip())
    out.append("```\n")

    out.append("## 2. Prior validation log (complete — do not skim)\n")
    if ctx.log_text:
        out.append(
            "Every finding, comment and resolution recorded about this page. "
            "Comment entries authored by `human:*` are reader- or maintainer-"
            "reported and take precedence over your own reading of the page.\n"
        )
        out.append("```markdown")
        out.append(ctx.log_text.rstrip())
        out.append("```\n")
    else:
        out.append("_No log yet — this page has never been through a validation pass._\n")

    groups = [
        ("3. Sibling files from the same import batch", "sibling"),
        ("4. Linked concept pages", "concept"),
        ("5. Source material named by the syllabus", "source"),
    ]
    for heading, role in groups:
        items = [a for a in ctx.attachments if a.role == role]
        out.append(f"## {heading}\n")
        if not items:
            out.append("_None._\n")
            continue
        for item in items:
            out.append(f"### `{item.path}`")
            out.append(f"_{item.note}_\n")
            if item.text:
                out.append("```markdown")
                out.append(item.text.rstrip())
                out.append("```\n")
    return "\n".join(out)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("path", help="repo-relative content file")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--max-concepts", type=int, default=DEFAULT_MAX_CONCEPTS)
    ap.add_argument("--max-siblings", type=int, default=DEFAULT_MAX_SIBLINGS)
    args = ap.parse_args()

    ctx = build(args.path.lstrip("./"), args.max_concepts, args.max_siblings)
    print(json.dumps(asdict(ctx), indent=2) if args.json else render(ctx))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
