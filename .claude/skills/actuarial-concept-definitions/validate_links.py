#!/usr/bin/env python3
"""Validate the wiki link graph of the content vault.

Catches the failure modes that are invisible in the markdown itself but break
the built app:

  1. Content files missing the `.md` extension. The vite collectors filter on
     `.endsWith('.md')` (quiz/vite.config.ts), so an extensionless file is
     silently dropped from the bundle and every link to it dead-ends — even
     though the file looks fine in the repo and in Obsidian.
  2. `[[wiki-links]]` whose target page does not exist, usually a naming
     variant: underscore vs space, hyphen vs space, singular vs plural.
  3. Question `wiki_link:` entries pointing at concept pages that do not
     exist. These fail silently: slugForLink() still produces a slug, so the
     question records mastery against a concept the app can never display.

Usage:
    python3 .claude/skills/actuarial-concept-definitions/validate_links.py
    python3 .claude/skills/actuarial-concept-definitions/validate_links.py --exam "Exam 5 (CAS)"

Exits non-zero if any problem is found, so it can gate a commit.
"""

import argparse
import os
import re
import sys
from collections import defaultdict

SKIP_DIRS = {".git", "node_modules", "dist", "quiz", ".vercel"}
CONTENT_DIRS = ("Concepts", "Resources", "questions", "comprehension-checks")
LINK_RE = re.compile(r"\[\[([^\]\[]+)\]\]")
WIKI_LINK_ENTRY_RE = re.compile(r"^\s*-\s*((?:Concepts|Resources)/\S+)\s*$", re.M)
IMAGE_SUFFIXES = (".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp")


def repo_root() -> str:
    here = os.path.abspath(__file__)
    # .claude/skills/<skill>/validate_links.py -> repo root is four levels up
    return os.path.abspath(os.path.join(here, "..", "..", "..", ".."))


def walk_content(root):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        rel = os.path.relpath(dirpath, root)
        if rel != "." and not rel.startswith(CONTENT_DIRS):
            continue
        for name in filenames:
            yield dirpath, name


def build_index(root):
    """Map lowercased page basename -> path, for every .md page in the vault."""
    index = {}
    for dirpath, name in walk_content(root):
        if name.endswith(".md"):
            index[os.path.splitext(name)[0].lower()] = os.path.join(dirpath, name)
    return index


def find_extensionless(root):
    """Content files that look like pages but lack the .md extension."""
    out = []
    for dirpath, name in walk_content(root):
        if name.endswith(".md") or name.startswith("."):
            continue
        if name.endswith(IMAGE_SUFFIXES) or name.endswith((".py", ".csv", ".json")):
            continue
        path = os.path.join(dirpath, name)
        if not os.path.isfile(path):
            continue
        try:
            with open(path, encoding="utf-8") as fh:
                head = fh.read(2048)
        except (UnicodeDecodeError, OSError):
            continue
        # Heuristic: markdown-ish content (bold term, heading, or a wiki link)
        if head.lstrip().startswith(("**", "#", "---")) or LINK_RE.search(head):
            out.append(os.path.relpath(path, root))
    return out


def links_in(path):
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    targets = []
    for m in LINK_RE.finditer(text):
        raw = m.group(1)
        # Skip Obsidian embeds (![[...]]) and image/attachment links
        if m.start() > 0 and text[m.start() - 1] == "!":
            continue
        target = raw.split("|")[0].split("#")[0].strip()
        if not target or target.lower().endswith(IMAGE_SUFFIXES):
            continue
        targets.append(target)
    return targets


def check_wiki_links(root, index, scope=None):
    """Broken [[links]]. `scope` limits to a page and everything it links."""
    if scope:
        seed = os.path.join(root, scope + ".md")
        if not os.path.exists(seed):
            sys.exit(f"error: scope page not found: {seed}")
        pages = [seed]
        for target in links_in(seed):
            hit = index.get(target.lower())
            if hit:
                pages.append(hit)
    else:
        pages = sorted(set(index.values()))

    broken = defaultdict(set)
    for page in pages:
        src = os.path.splitext(os.path.basename(page))[0]
        for target in links_in(page):
            if target.lower() not in index:
                broken[target].add(src)
    return broken


def check_question_links(root, index, exam_dir=None):
    """Question `wiki_link:` entries that resolve to no page."""
    qroot = os.path.join(root, "questions")
    if not os.path.isdir(qroot):
        return {}, 0
    exams = [exam_dir] if exam_dir else sorted(os.listdir(qroot))
    broken = defaultdict(set)
    total = 0
    for exam in exams:
        d = os.path.join(qroot, exam)
        if not os.path.isdir(d):
            continue
        for name in sorted(os.listdir(d)):
            if not name.endswith(".md"):
                continue
            path = os.path.join(d, name)
            with open(path, encoding="utf-8") as fh:
                text = fh.read()
            parts = text.split("---")
            if len(parts) < 3:
                continue
            for entry in WIKI_LINK_ENTRY_RE.findall(parts[1]):
                total += 1
                page = entry.split("/")[-1].replace("+", " ").strip()
                if page.lower() not in index:
                    broken[page].add(f"{exam}/{name}")
    return broken, total


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--exam", metavar="PAGE",
                    help='Limit the link check to one syllabus and the pages it '
                         'links, e.g. "Exam 5 (CAS)".')
    ap.add_argument("--questions", metavar="DIR",
                    help="Limit the question check to questions/<DIR>, e.g. exam-5.")
    args = ap.parse_args()

    root = repo_root()
    index = build_index(root)
    failures = 0

    print(f"Vault: {root}")
    print(f"Indexed {len(index)} pages\n")

    stray = find_extensionless(root)
    print("== Content files missing the .md extension ==")
    if stray:
        failures += len(stray)
        for p in stray:
            print(f"  MISSING .md  {p}")
        print("  -> these are invisible to the vite collectors; git mv them to add .md")
    else:
        print("  none")

    scope = f" (scope: {args.exam})" if args.exam else ""
    print(f"\n== Broken [[wiki-links]]{scope} ==")
    broken = check_wiki_links(root, index, args.exam)
    if broken:
        failures += len(broken)
        for target, srcs in sorted(broken.items()):
            shown = ", ".join(sorted(srcs)[:4])
            more = f" (+{len(srcs) - 4} more)" if len(srcs) > 4 else ""
            print(f"  {target:45s} <- {shown}{more}")
    else:
        print("  none")

    print("\n== Question wiki_link entries with no matching page ==")
    qbroken, qtotal = check_question_links(root, index, args.questions)
    if qbroken:
        failures += len(qbroken)
        for page, files in sorted(qbroken.items(), key=lambda kv: -len(kv[1])):
            shown = ", ".join(sorted(files)[:3])
            more = f" (+{len(files) - 3} more)" if len(files) > 3 else ""
            print(f"  {len(files):3d}x  {page:40s} {shown}{more}")
        print("  -> these silently break mastery tracking; remap to the real page name")
    else:
        print(f"  none ({qtotal} question links checked)")

    print()
    if failures:
        print(f"FAIL: {failures} problem group(s) found")
        return 1
    print("OK: link graph is clean")
    return 0


if __name__ == "__main__":
    sys.exit(main())
