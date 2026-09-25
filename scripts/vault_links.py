#!/usr/bin/env python3
"""The vault's one link resolver: what a `[[link]]` points at, and whether it lands.

Three tools used to answer that question three ways — `validate_links.py`
(lower-cased basename), `audit_exam.py` (its own graph) and the app
(`quiz/src/lib/conceptMatch.ts` / `slugForLink`, then an exact-case
`Concepts/<name>.md` fetch). They could disagree about whether a link resolved.
This module is the Python half of one answer, and everything that checks links
imports it:

  - `iter_links` reads links with the app's own regex
    (`quiz/src/lib/wikiParser.ts`): the target stops at the first `|`, so a
    `[[Target\\|Alias]]` written in a table cell has the target `Target\\` —
    exactly what the app sees, which is why the checkers report it.
  - `Vault.resolve` says `exact` (lands in Obsidian *and* the app), `case`
    (Obsidian resolves case-insensitively; the app's fetch of
    `Concepts/<name>.md` from GitHub does not) or `missing`.
  - `question_link_slug` mirrors `slugForLink` for a question's `wiki_link:`
    entries. `scripts/fixtures/link_resolution.json` holds the cases both
    sides are tested against (`scripts/test_vault_links.py` and
    `quiz/src/lib/examCatalog.test.ts`), so the two cannot drift.
  - `canonical_page` turns a term a syllabus writes into the page it means:
    the per-exam namesake table first (`Deductible` on Exam P, `Deductible
    Rating` on Exam 5), then the alias table, then the page names themselves.
    Both tables live in `scripts/concept_aliases.json`.
  - `load_catalog` reads `scripts/exam_catalog.json`: each exam page, its ids,
    its question bank and its status (`ready` / `beta` / `development`, a
    mirror of `quiz/src/lib/examStatus.ts` pinned by the same vitest).

Stdlib only; importable from any script in the repo.
"""

from __future__ import annotations

import json
import os
import re
import urllib.parse
from dataclasses import dataclass
from typing import Iterator

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SCRIPTS = os.path.join(REPO_ROOT, "scripts")

# Where link targets live. Root-level pages (the exam pages) plus these trees.
PAGE_DIRS = ("Concepts", "Resources", "Guides", "questions", "comprehension-checks")
IMAGE_SUFFIXES = (".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".pdf")

# The app's link regex (wikiParser.extractWikiLinks / WikiArticle.rewriteWikilinks),
# with the embed marker captured so embeds can be told apart.
LINK_RE = re.compile(r"(!?)\[\[([^\]|]+)(?:\|([^\]]+))?\]\]")


@dataclass(frozen=True)
class Link:
    target: str          # raw target, before `|`, `#heading` still attached
    display: str | None  # the alias after `|`, if any
    embed: bool          # `![[...]]`
    start: int           # offset in the text

    @property
    def name(self) -> str:
        """The page name the link means — last path segment, no heading, no `.md`."""
        return link_basename(self.target)

    @property
    def is_attachment(self) -> bool:
        return self.target.lower().split("#")[0].strip().endswith(IMAGE_SUFFIXES)


def iter_links(text: str, *, embeds: bool = False) -> Iterator[Link]:
    """Every `[[link]]` in `text`, in order. Embeds and attachments are skipped
    unless `embeds` is set."""
    for m in LINK_RE.finditer(text):
        link = Link(target=m.group(2), display=m.group(3), embed=m.group(1) == "!", start=m.start())
        if not embeds and (link.embed or link.is_attachment):
            continue
        yield link


def link_basename(target: str) -> str:
    """`Resources/Books/Risk and Insurance (SOA)#Scope` → `Risk and Insurance (SOA)`."""
    t = target.split("#")[0].strip()
    t = t.rsplit("/", 1)[-1]
    if t.lower().endswith(".md"):
        t = t[:-3]
    return t.strip()


def href_to_entry_ref(href: str) -> tuple[str, str] | None:
    """(kind, name) for a wiki reference — `hrefToEntryRef` in quiz/src/lib/wikiRoutes.ts."""
    if not href:
        return None
    clean = href
    scheme = re.match(r"^([a-z][a-z0-9+.-]*):(//)?([^/?#]*)(.*)$", href, re.I)
    if scheme:
        if scheme.group(3).lower() != "wiki.actuarialnotes.com":
            return None
        clean = scheme.group(4)
    clean = clean.split("#")[0].split("?")[0].lstrip("/").replace("+", " ")
    if not clean:
        return None
    internal = re.match(r"^wiki/(concept|resource|exam|event|regulation|guide)/(.+)$", clean, re.I)
    if internal:
        return internal.group(1).lower(), urllib.parse.unquote(internal.group(2).replace("+", " "))
    decoded = urllib.parse.unquote(clean)
    return path_to_entry_ref(decoded) or ("concept", decoded)


def path_to_entry_ref(path: str) -> tuple[str, str] | None:
    """`pathToEntryRef` in quiz/src/lib/wikiRoutes.ts, reduced to (kind, name)."""
    p = re.sub(r"\.md$", "", path.lstrip("/"), flags=re.I)
    low = p.lower()
    for prefix, kind in (("concepts/", "concept"), ("resources/books/", "resource"),
                         ("resources/events/", "event"), ("resources/regulation/", "regulation"),
                         ("resources/benchmarks/", "resource")):
        if low.startswith(prefix):
            return kind, p[len(prefix):]
    if low.startswith("guides/"):
        return "guide", p.split("/")[-1]
    if re.match(r"^Exam[ -]", p, re.I):
        return "exam", p
    return None


def question_link_slug(link: str) -> str | None:
    """The concept slug a question's `wiki_link:` entry records mastery under.

    Mirrors `slugForLink` in quiz/src/lib/conceptMatch.ts, fallback included: a
    link that doesn't read as a concept (a resource path, an outside URL) keeps
    the raw last segment of the link with hyphens read as spaces.
    """
    ref = href_to_entry_ref(link)
    if ref and ref[0] == "concept" and ref[1]:
        return ref[1]
    parts = [s for s in link.split("/") if s]
    return parts[-1].replace("-", " ") if parts else None


def normalize_term(text: str) -> str:
    """The key the alias tables are written under: lower-case, `-`/`_` as spaces,
    curly quotes straightened, whitespace collapsed."""
    t = text.replace("’", "'").replace("‘", "'").lower()
    t = re.sub(r"[-_]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


class Vault:
    """Every page a link can land on, by exact and by case-folded basename."""

    def __init__(self, root: str = REPO_ROOT):
        self.root = root
        self.by_name: dict[str, str] = {}
        self.by_lower: dict[str, list[str]] = {}
        for rel in _page_paths(root):
            name = os.path.splitext(os.path.basename(rel))[0]
            self.by_name.setdefault(name, rel)
            self.by_lower.setdefault(name.lower(), []).append(name)

    def resolve(self, target: str) -> tuple[str, str | None]:
        """(`exact` | `case` | `missing`, the vault-relative path it lands on)."""
        name = link_basename(target)
        if name in self.by_name:
            return "exact", self.by_name[name]
        folded = self.by_lower.get(name.lower())
        if folded:
            return "case", self.by_name[folded[0]]
        return "missing", None

    def exists(self, target: str) -> bool:
        return self.resolve(target)[0] != "missing"

    def is_concept(self, name: str) -> bool:
        path = self.by_name.get(name)
        return bool(path and path.startswith("Concepts/"))

    def concept_names(self) -> list[str]:
        return sorted(n for n, p in self.by_name.items() if p.startswith("Concepts/"))


def _page_paths(root: str) -> Iterator[str]:
    for name in sorted(os.listdir(root)):
        if name.endswith(".md") and os.path.isfile(os.path.join(root, name)):
            yield name
    for top in PAGE_DIRS:
        base = os.path.join(root, top)
        for dirpath, dirnames, filenames in os.walk(base):
            dirnames[:] = sorted(d for d in dirnames if not d.startswith("."))
            for fn in sorted(filenames):
                if fn.endswith(".md"):
                    yield os.path.relpath(os.path.join(dirpath, fn), root).replace(os.sep, "/")


# ── alias + namesake tables ────────────────────────────────────────────────

def load_aliases(path: str | None = None) -> dict:
    with open(path or os.path.join(SCRIPTS, "concept_aliases.json"), encoding="utf-8") as fh:
        data = json.load(fh)
    return {
        "aliases": {normalize_term(k): v for k, v in data.get("aliases", {}).items()},
        "namesakes": {normalize_term(k): v for k, v in data.get("namesakes", {}).items()},
    }


def canonical_page(term: str, vault: Vault, wiki_id: str | None = None,
                   tables: dict | None = None) -> str | None:
    """The concept page a term means on `wiki_id`'s exam, or None.

    Namesakes first (they are exam-specific by definition), then aliases, then a
    page whose name *is* the term (case-insensitively; the page's own spelling is
    returned so the link will land in the app too).
    """
    tables = tables or load_aliases()
    key = normalize_term(term)
    ns = tables["namesakes"].get(key)
    if ns:
        return ns.get(wiki_id or "", ns.get("default"))
    if key in tables["aliases"]:
        return tables["aliases"][key]
    for cand in vault.by_lower.get(term.strip().lower(), []):
        if vault.is_concept(cand):
            return cand
    spaced = key
    for cand in vault.by_lower.get(spaced, []):
        if vault.is_concept(cand):
            return cand
    return None


def namesake_conflicts(page_names: list[str], wiki_id: str, tables: dict | None = None) -> list[tuple[str, str]]:
    """(linked page, the page this exam means instead) for every namesake an exam
    page links the wrong member of."""
    tables = tables or load_aliases()
    wrong: list[tuple[str, str]] = []
    for ns in tables["namesakes"].values():
        mine = ns.get(wiki_id, ns.get("default"))
        others = {p for k, p in ns.items() if p != mine}
        for name in page_names:
            if name in others and (name, mine) not in wrong:
                wrong.append((name, mine))
    return wrong


# ── the exam catalogue ─────────────────────────────────────────────────────

def load_catalog(path: str | None = None) -> list[dict]:
    with open(path or os.path.join(SCRIPTS, "exam_catalog.json"), encoding="utf-8") as fh:
        return json.load(fh)["exams"]


def exam_for_page(page: str, catalog: list[dict] | None = None) -> dict | None:
    base = os.path.basename(page)
    for exam in catalog or load_catalog():
        if exam["page"] == base:
            return exam
    return None


def exam_for_id(key: str, catalog: list[dict] | None = None) -> dict | None:
    """Look an exam up by any of its keys: wiki id, data-current id, bank or page."""
    k = key.strip().lower()
    for exam in catalog or load_catalog():
        keys = {exam["wiki_id"], exam["exam_id"].lower(), (exam["bank"] or "").lower(),
                exam["page"].lower(), exam["page"][:-3].lower()}
        if k in keys:
            return exam
    return None
