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

  4. Links that resolve only case-insensitively. Obsidian forgives the case;
     the app fetches `Concepts/<name>.md` from GitHub, which does not.

Resolution is `scripts/vault_links.py` — the one resolver the syllabus lint and
`audit_exam.py` use too, so the three can't disagree about whether a link lands.

Usage:
    python3 .claude/skills/actuarial-concept-definitions/validate_links.py
    python3 .claude/skills/actuarial-concept-definitions/validate_links.py --exam "Exam 5 (CAS)"
    python3 .claude/skills/actuarial-concept-definitions/validate_links.py --studiable

`--studiable` is the CI scope: every exam page whose status is `ready` or `beta`
(scripts/exam_catalog.json), the pages each links, and those exams' question
banks. The bare vault-wide run is a report — Exams 6–9 carry a large known
backlog of unwritten pages (see scripts/syllabus_gaps.py).

Exits non-zero if any problem is found, so it can gate a commit.
"""

import argparse
import os
import re
import sys
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "scripts"))
import vault_links  # noqa: E402

SKIP_DIRS = {".git", "node_modules", "dist", "quiz", ".vercel"}
CONTENT_DIRS = ("Concepts", "Resources", "questions", "comprehension-checks")
LINK_RE = vault_links.LINK_RE
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
    """The shared resolver's view of the vault."""
    return vault_links.Vault(root)


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
        return [link.target.split("#")[0].strip() for link in vault_links.iter_links(fh.read())]


def check_wiki_links(root, vault, scopes=None):
    """Broken and case-only [[links]]. `scopes` limits to those pages and
    everything each links."""
    if scopes:
        pages = []
        for scope in scopes:
            seed = os.path.join(root, scope + ".md")
            if not os.path.exists(seed):
                sys.exit(f"error: scope page not found: {seed}")
            pages.append(seed)
            for target in links_in(seed):
                status, hit = vault.resolve(target)
                if hit:
                    pages.append(os.path.join(root, hit))
        pages = list(dict.fromkeys(pages))
    else:
        pages = sorted(os.path.join(root, p) for p in set(vault.by_name.values()))

    broken, case_only = defaultdict(set), defaultdict(set)
    for page in pages:
        src = os.path.splitext(os.path.basename(page))[0]
        for target in links_in(page):
            if not target:
                continue
            status, hit = vault.resolve(target)
            if status == "missing":
                broken[target].add(src)
            elif status == "case":
                case_only[f"{target} -> {os.path.splitext(os.path.basename(hit))[0]}"].add(src)
    return broken, case_only


def check_question_links(root, vault, exam_dirs=None):
    """Question `wiki_link:` entries whose slug lands on no page — exactly, since
    mastery is recorded under the slug and the app fetches the page by it."""
    qroot = os.path.join(root, "questions")
    if not os.path.isdir(qroot):
        return {}, 0
    exams = exam_dirs if exam_dirs else sorted(os.listdir(qroot))
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
                page = vault_links.question_link_slug(entry) or entry
                if vault.resolve(page)[0] != "exact":
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
    ap.add_argument("--studiable", action="store_true",
                    help="CI scope: every ready/beta exam page, what it links, and its bank.")
    args = ap.parse_args()

    root = repo_root()
    vault = build_index(root)
    failures = 0
    scopes = [args.exam] if args.exam else None
    banks = [args.questions] if args.questions else None
    if args.studiable:
        studiable = [e for e in vault_links.load_catalog() if e["status"] in ("ready", "beta")]
        scopes = [e["page"][:-3] for e in studiable]
        banks = [e["bank"] for e in studiable if e["bank"]]

    print(f"Vault: {root}")
    print(f"Indexed {len(vault.by_name)} pages\n")

    stray = find_extensionless(root)
    print("== Content files missing the .md extension ==")
    if stray:
        failures += len(stray)
        for p in stray:
            print(f"  MISSING .md  {p}")
        print("  -> these are invisible to the vite collectors; git mv them to add .md")
    else:
        print("  none")

    scope = f" (scope: {', '.join(scopes)})" if scopes else ""
    print(f"\n== Broken [[wiki-links]]{scope} ==")
    broken, case_only = check_wiki_links(root, vault, scopes)
    if broken:
        failures += len(broken)
        for target, srcs in sorted(broken.items()):
            shown = ", ".join(sorted(srcs)[:4])
            more = f" (+{len(srcs) - 4} more)" if len(srcs) > 4 else ""
            print(f"  {target:45s} <- {shown}{more}")
    else:
        print("  none")

    print("\n== Links that resolve only case-insensitively (Obsidian yes, the app no) ==")
    if case_only:
        failures += len(case_only)
        for target, srcs in sorted(case_only.items()):
            shown = ", ".join(sorted(srcs)[:4])
            more = f" (+{len(srcs) - 4} more)" if len(srcs) > 4 else ""
            print(f"  {target:45s} <- {shown}{more}")
    else:
        print("  none")

    print("\n== Question wiki_link entries with no matching page ==")
    qbroken, qtotal = check_question_links(root, vault, banks)
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
