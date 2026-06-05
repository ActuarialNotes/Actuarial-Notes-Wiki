#!/usr/bin/env python3
"""
check_dead_links.py

Scan all Markdown files in the wiki for broken internal links:
  1. Obsidian-style wiki links  [[Concept Name]]  [[Concept Name|alias]]
  2. wiki_link frontmatter entries  wiki_link: Concepts/Foo+Bar
  3. Standard Markdown links  [text](./path/to/file.md)
"""

import re
import sys
from pathlib import Path
from collections import defaultdict
from urllib.parse import unquote

REPO_ROOT = Path("/home/user/Actuarial-Notes-Wiki")

# ── Build file index ──────────────────────────────────────────────────────────
# Maps normalised stem → real path (for fast [[WikiLink]] lookup)
all_md: list[Path] = sorted(REPO_ROOT.rglob("*.md"))
# Exclude .git
all_md = [p for p in all_md if ".git" not in p.parts]

stem_index: dict[str, Path] = {}   # lower-no-space stem → path
for p in all_md:
    key = p.stem.lower().replace(" ", "").replace("+", "")
    stem_index[key] = p

def wiki_target_exists(target: str) -> bool:
    """Return True if [[target]] resolves to a file."""
    # Strip display alias and anchors
    target = target.split("|")[0].split("#")[0].strip()
    if not target:
        return True  # pure anchor, ignore
    key = target.lower().replace(" ", "").replace("+", "")
    return key in stem_index

def md_link_exists(link: str, source_file: Path) -> bool:
    """Return True if a standard markdown link target exists on disk."""
    # Skip external URLs and anchors
    if link.startswith(("http://", "https://", "mailto:", "#")):
        return True
    decoded = unquote(link).split("#")[0]
    if not decoded:
        return True
    p = (source_file.parent / decoded).resolve()
    return p.exists()

def frontmatter_link_exists(link: str) -> bool:
    """Return True if a wiki_link frontmatter value resolves to a file.
    Entries look like  Concepts/Bond+Price  or  Concepts/Bond Price
    """
    link = link.strip()
    # Convert to a Path relative to REPO_ROOT
    rel = link.replace("+", " ")
    candidates = [
        REPO_ROOT / rel,
        REPO_ROOT / (rel + ".md"),
    ]
    return any(c.exists() for c in candidates)

# ── Regex patterns ────────────────────────────────────────────────────────────
WIKI_LINK_RE = re.compile(r"\[\[([^\[\]]+)\]\]")
MD_LINK_RE   = re.compile(r"(?<!!)\[(?:[^\]]*)\]\(([^)]+)\)")   # not image
FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---", re.DOTALL)

def parse_wiki_links_fm(fm_text: str) -> list[str]:
    """Return all wiki_link values from YAML frontmatter."""
    # List form
    block = re.search(r"^wiki_link:\s*\n((?:[ \t]+-[ \t]+\S[^\n]*\n?)+)", fm_text, re.MULTILINE)
    if block:
        return [
            ln.strip().lstrip("-").strip()
            for ln in block.group(1).splitlines()
            if ln.strip()
        ]
    # Single form
    single = re.search(r"^wiki_link:[ \t]+(\S[^\n]*)$", fm_text, re.MULTILINE)
    if single:
        return [single.group(1).strip()]
    return []

# ── Scan ──────────────────────────────────────────────────────────────────────
DeadLink = tuple[str, int, str]   # (link_text, line_number, kind)
results: dict[Path, list[DeadLink]] = defaultdict(list)

SKIP_DIRS = {".git", "node_modules", ".venv", "quiz"}

def should_scan(p: Path) -> bool:
    return not any(part in SKIP_DIRS for part in p.parts)

for md_file in all_md:
    if not should_scan(md_file):
        continue

    text = md_file.read_text(encoding="utf-8")
    lines = text.splitlines()

    # ── Frontmatter wiki_link values ─────────────────────────────────────────
    fm_match = FRONTMATTER_RE.match(text)
    if fm_match:
        fm_text = fm_match.group(1)
        for link in parse_wiki_links_fm(fm_text):
            if not frontmatter_link_exists(link):
                results[md_file].append((link, 0, "frontmatter wiki_link"))

    # ── Per-line checks ───────────────────────────────────────────────────────
    for lineno, line in enumerate(lines, start=1):
        # Skip code blocks (simple heuristic: lines starting with 4 spaces or ```)
        stripped = line.lstrip()
        if stripped.startswith("```") or (line.startswith("    ") and not line.startswith("    -")):
            continue

        for m in WIKI_LINK_RE.finditer(line):
            target = m.group(1)
            if not wiki_target_exists(target):
                results[md_file].append((target, lineno, "[[wiki link]]"))

        for m in MD_LINK_RE.finditer(line):
            href = m.group(1).strip()
            if not md_link_exists(href, md_file):
                results[md_file].append((href, lineno, "markdown link"))

# ── Report ────────────────────────────────────────────────────────────────────
total_dead = sum(len(v) for v in results.values())
files_with_dead = len(results)

print(f"Dead Link Report — {REPO_ROOT.name}")
print(f"Scanned {len([p for p in all_md if should_scan(p)])} markdown files")
print(f"Found {total_dead} dead link(s) across {files_with_dead} file(s)\n")

if not results:
    print("No dead links found.")
    sys.exit(0)

# Sort by relative path for readability
for md_file in sorted(results):
    rel = md_file.relative_to(REPO_ROOT)
    dead = results[md_file]
    print(f"  {rel}  ({len(dead)} dead)")
    for link, lineno, kind in sorted(dead, key=lambda x: x[1]):
        loc = f"line {lineno}" if lineno else "frontmatter"
        print(f"    [{kind}] {loc}: {link!r}")
    print()

# Summary by kind
by_kind: dict[str, int] = defaultdict(int)
for dead_list in results.values():
    for _, _, kind in dead_list:
        by_kind[kind] += 1
print("Summary by type:")
for kind, count in sorted(by_kind.items(), key=lambda x: -x[1]):
    print(f"  {kind}: {count}")

sys.exit(1 if total_dead else 0)
