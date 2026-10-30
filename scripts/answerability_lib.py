#!/usr/bin/env python3
"""
answerability_lib.py — G8, the answerability gate, and the record it reads.

`simulations/check-answerable` (docs/simulated-learner.md, *Answerability*) asks,
for every question an exam serves, what its official solution uses and where the
vault teaches each item, and checks every quote in code. That check calls a
model, so it can't run in CI. What it leaves behind can: one committed record
per bank, `simulations/answerability/<bank>.json`, holding each question's
requirements and the passages that teach them. This module reads that record
against the vault *as it is now* (docs/content-plan.md §1, G8):

  An exam passes G8 when every question it serves has been checked since its
  text last changed, and every requirement of every one is either

  - **taught within reach**: a quote of the teaching passage is on a page, now,
    and that page is one the question is tagged with, one link from such a
    page, a page this exam's own learning objectives link (its syllabus — a
    candidate studies every one of them, as they study a prerequisite exam's),
    or a page of an exam this exam's *Prerequisite knowledge* callout names
    (transitively — MAS-II's names MAS-I, MAS-I's names P and FM), or
  - **not required**: a reviewer recorded why the item isn't course content
    the vault must teach (the extractor listed arithmetic, or data the
    question gives), with a note.

So the gate is a fact about the vault's pages, tags and links, re-read on every
run: a passage deleted, a tag dropped or a question rewritten re-opens the item.
What closes one is an edit, recorded with `resolve` — which refuses a quote
that isn't on the page, as `verify_record.py` refuses a `verified` with no
source (VERIFY's P1). Writing the passage, retagging the question and finding
a passage the check missed all end the same way: a quote on a page in reach.

"Changed since checked" compares `input_hash` — the sha256 of the question
file below its frontmatter (stem, options, solution: what the check read) — so
a retag, a fact-check sync or a status change doesn't send a question back to
the model; a reworded stem or solution does.

Usage:
  python3 scripts/answerability_lib.py status --exam MAS-II        # what G8 still needs
  python3 scripts/answerability_lib.py resolve --exam MAS-II --item masii-2018f-q41:r1 \
      --page "Principal Components Analysis" --quote "…" --note "written from ISLR §12.2.3" --run 3f2a
  python3 scripts/answerability_lib.py not-required --exam MAS-II --item masii-2019s-q4:r3 \
      --note "arithmetic: the question gives both exposures"
  python3 scripts/answerability_lib.py import-report --exam MAS-II simulations/runs/<run>/report.md

Standard library only: `publication_readiness.py --hold` runs it in CI.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import re
import sys
from bisect import bisect_right
from dataclasses import dataclass, field
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import vault_links as VL  # noqa: E402

REPO_ROOT = Path(VL.REPO_ROOT)
RECORD_DIR = REPO_ROOT / "simulations" / "answerability"
MIN_QUOTE_CHARS = 12          # a shorter "quote" (a symbol, a name) proves nothing
RECORD_VERSION = 1

# Where a requirement is taught, nearest first. `syllabus` is a page the exam's own learning objectives link
# (content decision D30); `elsewhere` is in the vault but out of the question's reach — a tagging or linking
# gap; `missing` is on no page.
TIERS = ("tagged", "linked", "syllabus", "prerequisite", "elsewhere", "missing")
IN_REACH = ("tagged", "linked", "syllabus", "prerequisite")


# ── a page's text, for quote matching ──────────────────────────────────────


def body_of(text: str) -> str:
    """A file's text below its YAML frontmatter (`vault_parse.split_frontmatter`'s body)."""
    if not text.startswith("---"):
        return text
    m = re.search(r"^---\s*$", text[3:], re.M)
    return text[3 + m.end():].lstrip("\n") if m else text


def input_hash(text: str) -> str:
    """What the check read of a question: its file below the frontmatter."""
    return "sha256:" + hashlib.sha256(body_of(text).strip().encode("utf-8")).hexdigest()


_CALLOUT_HEAD = re.compile(r"^\[!([^\]]+)\]([+-]?)")


def _strip_markers(line: str) -> tuple[int, str]:
    """A line's callout depth and its text without the `>` markers."""
    depth = 0
    s = line.lstrip()
    while s.startswith(">"):
        depth += 1
        s = s[1:].lstrip()
    return depth, s


def _norm(text: str) -> str:
    text = text.replace("**", "").replace("__", "").replace(" ", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip().lower()


@dataclass
class PageIndex:
    """A page's text normalised for quote matching, remembering which characters sit in a collapsed callout."""
    text: str
    starts: list[int]          # offset of each line in `text`
    collapsed: list[bool]      # per line

    @classmethod
    def build(cls, markdown: str) -> "PageIndex":
        stack: list[tuple[int, bool]] = []
        parts: list[str] = []
        starts: list[int] = []
        flags: list[bool] = []
        pos = 0
        for raw in body_of(markdown).split("\n"):
            depth, line = _strip_markers(raw)
            m = _CALLOUT_HEAD.match(line) if depth else None
            if depth == 0:
                stack = []
            elif m:
                stack = [s for s in stack if s[0] < depth] + [(depth, m.group(2) == "-")]
                line = line[m.end():]
            else:
                stack = [s for s in stack if s[0] <= depth]
            n = _norm(line)
            starts.append(pos)
            flags.append(any(c for _, c in stack))
            parts.append(n)
            pos += len(n) + 1
        return cls(" ".join(parts), starts, flags)

    def find(self, quote: str) -> tuple[bool, bool]:
        """(found, every piece of it inside a collapsed callout)."""
        pieces = [_norm(p) for p in re.split(r"…|\.\.\.", quote or "")]
        pieces = [p for p in pieces if p]
        if not pieces or sum(len(p) for p in pieces) < MIN_QUOTE_CHARS:
            return False, False
        at, hidden = 0, True
        for p in pieces:
            i = self.text.find(p, at)
            if i < 0:
                return False, False
            line = bisect_right(self.starts, i) - 1
            hidden = hidden and self.collapsed[line]
            at = i + len(p)
        return True, hidden


# ── the pages a question can reach ─────────────────────────────────────────


def _scrub_links_text(md: str) -> str:
    """What a reader sees of a page, as far as its links go (`content_loader.scrub`, less the images)."""
    body = re.sub(r"<!--.*?-->", "", body_of(md), flags=re.S)
    return re.sub(r"%%.*?%%", "", body, flags=re.S)


class Pages:
    """The study pages of one exam's view of the vault — the same set `ContentLoader` opens: every exam
    page, `Concepts/`, the general guides and this exam's tip pages, by title."""

    def __init__(self, exam: dict, root: Path = REPO_ROOT):
        self.root = Path(root)
        self.exam_title = exam["page"][:-3]
        self.wiki_id = exam["wiki_id"]
        self.vault = VL.Vault(str(self.root))
        self.aliases = VL.load_aliases()
        self.paths: dict[str, str] = {}
        self.kind: dict[str, str] = {}
        for fn in sorted(os.listdir(self.root)):
            if fn.startswith("Exam ") and fn.endswith(".md"):
                self._add(fn[:-3], fn, "exam")
        for folder, kind in (("Concepts", "concept"), ("Guides", "guide"),
                             (f"Guides/{self.exam_title}", "guide")):
            base = self.root / folder
            if base.is_dir():
                for fn in sorted(os.listdir(base)):
                    if fn.endswith(".md"):
                        self._add(fn[:-3], f"{folder}/{fn}", kind)
        self._lower = {t.lower(): t for t in self.paths}
        self._text: dict[str, str] = {}
        self._index: dict[str, PageIndex] = {}
        self._links: dict[str, list[str]] = {}

    def _add(self, title: str, rel: str, kind: str) -> None:
        if title not in self.paths:
            self.paths[title], self.kind[title] = rel, kind

    def text(self, title: str) -> str:
        if title not in self._text:
            self._text[title] = (self.root / self.paths[title]).read_text(encoding="utf-8")
        return self._text[title]

    def index(self, title: str) -> PageIndex:
        if title not in self._index:
            self._index[title] = PageIndex.build(self.text(title))
        return self._index[title]

    def resolve_tag(self, slug: str) -> str | None:
        """The page a question's concept tag opens (`ContentLoader.resolve_title`)."""
        name = VL.link_basename(slug)
        if name in self.paths:
            return name
        if name.lower() in self._lower:
            return self._lower[name.lower()]
        canon = VL.canonical_page(name, self.vault, self.wiki_id, self.aliases)
        return canon if canon in self.paths else None

    def resolve_link(self, target: str) -> str | None:
        """The page a `[[link]]` opens (`ContentLoader.link_status`): exact or case-folded title."""
        name = VL.link_basename(target)
        return name if name in self.paths else self._lower.get(name.lower())

    def links(self, title: str) -> list[str]:
        """The pages a page links to, in order."""
        if title not in self._links:
            out: list[str] = []
            for link in VL.iter_links(_scrub_links_text(self.text(title))):
                t = self.resolve_link(link.target)
                if t and t not in out:
                    out.append(t)
            self._links[title] = out
        return self._links[title]

    # The exam pages' own structure ----------------------------------------------------------

    def _callouts(self, title: str, kind: str, heading: str | None = None) -> list[str]:
        """The text of each top-level callout of `kind` on an exam page (optionally only the one whose title
        starts with `heading`)."""
        out: list[str] = []
        lines = body_of(self.text(title)).split("\n")
        i = 0
        while i < len(lines):
            m = re.match(r"^>\s*\[!(\w+)\][-+]?\s*(.*)$", lines[i])
            if m and m.group(1).lower() == kind and (heading is None or m.group(2).lower().startswith(heading)):
                block = []
                i += 1
                while i < len(lines) and lines[i].startswith(">"):
                    block.append(lines[i])
                    i += 1
                out.append("\n".join(block))
                continue
            i += 1
        return out

    def objective_concepts(self, title: str) -> list[str]:
        """The concept pages an exam page's learning-objective callouts (`[!example]`) link."""
        out: list[str] = []
        for block in self._callouts(title, "example"):
            for link in VL.iter_links(_scrub_links_text(block)):
                t = self.resolve_link(link.target)
                if t and self.kind[t] == "concept" and t not in out:
                    out.append(t)
        return out

    def prerequisite_pages(self, title: str | None = None) -> set[str]:
        """Every page an exam assumes: what its *Prerequisite knowledge* callout links — a concept page as
        itself, an exam page as that exam's learning-objective concepts — and, through each exam it names,
        what that exam assumes in turn. Read off the pages, never inferred: an exam page with no such
        callout assumes nothing."""
        seen: set[str] = set()
        out: set[str] = set()
        todo = [title or self.exam_title]
        while todo:
            exam = todo.pop()
            if exam in seen or exam not in self.paths:
                continue
            seen.add(exam)
            for block in self._callouts(exam, "question", "prerequisite"):
                for link in VL.iter_links(_scrub_links_text(block)):
                    t = self.resolve_link(link.target)
                    if not t:
                        continue
                    if self.kind[t] == "exam":
                        out.update(self.objective_concepts(t))
                        todo.append(t)
                    else:
                        out.add(t)
        return out


def question_tags(text: str) -> list[str]:
    """A question's `wiki_link:` entries as concept slugs (`vault_parse._concepts`)."""
    m = re.match(r"^---\s*\n(.*?)\n---\s*$", text, re.S | re.M)
    out: list[str] = []
    if not m:
        return out
    in_links = False
    for line in m.group(1).splitlines():
        if re.match(r"^wiki_link:\s*$", line):
            in_links = True
            continue
        inline = re.match(r"^wiki_link:\s*\[(.*)\]\s*$", line)
        if inline:
            entries = [e.strip().strip("\"'") for e in inline.group(1).split(",")]
        elif in_links and (e := re.match(r"^\s*-\s*(.+?)\s*$", line)):
            entries = [e.group(1).strip("\"'")]
        else:
            in_links = False
            continue
        for entry in entries:
            slug = VL.question_link_slug(entry) if entry else None
            if slug and slug not in out:
                out.append(slug)
    return out


def question_id(text: str) -> str | None:
    m = re.search(r"^id:\s*[\"']?([^\"'\n]+?)[\"']?\s*$", text, re.M)
    return m.group(1).strip() if m else None


def is_served(text: str) -> bool:
    """What a quiz can draw (`generate_coverage_report.question_concepts`): not off-syllabus, no open critical."""
    m = re.match(r"^---\s*\n(.*?)\n---\s*$", text, re.S | re.M)
    if not m:
        return False
    fm = m.group(1)
    return not (re.search(r"^off_syllabus:\s*true\s*$", fm, re.M)
                or re.search(r"^\s+open_critical:\s*[1-9]", fm, re.M))


@dataclass
class Reach:
    tagged: list[str]
    linked: set[str]
    prerequisite: set[str]
    syllabus: set[str] = field(default_factory=set)

    def tier(self, page: str) -> str:
        if page in self.tagged:
            return "tagged"
        if page in self.linked:
            return "linked"
        if page in self.syllabus:
            return "syllabus"
        if page in self.prerequisite:
            return "prerequisite"
        return "elsewhere"


def reach(pages: Pages, tags: list[str], prerequisite: set[str], syllabus: set[str] | None = None) -> Reach:
    """Tagged pages and the pages one link from them — the exam page itself is neither (an objective line
    names a concept, it doesn't teach it) — with the exam's own syllabus pages and its prerequisites'."""
    tagged: list[str] = []
    for slug in tags:
        t = pages.resolve_tag(slug)
        if t and pages.kind[t] != "exam" and t not in tagged:
            tagged.append(t)
    linked = {t for page in tagged for t in pages.links(page) if pages.kind[t] != "exam" and t not in tagged}
    return Reach(tagged, linked, prerequisite, set(syllabus or ()))


# ── the record ─────────────────────────────────────────────────────────────


def record_path(bank: str) -> Path:
    return RECORD_DIR / f"{bank}.json"


def load_record(bank: str) -> dict | None:
    path = record_path(bank)
    if not path.exists():
        return None
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def save_record(record: dict) -> Path:
    path = record_path(record["bank"])
    path.parent.mkdir(parents=True, exist_ok=True)
    record["questions"] = dict(sorted(record["questions"].items()))
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(record, fh, indent=1, ensure_ascii=False, sort_keys=False)
        fh.write("\n")
    return path


def new_record(exam: dict) -> dict:
    return {"version": RECORD_VERSION, "exam": exam["page"][:-3], "bank": exam["bank"], "questions": {}}


def merge_results(record: dict, results: dict[str, dict], run: str, hashes: dict[str, str]) -> dict:
    """Write one run's results into the bank's standing record. A question checked again replaces its entry;
    a `not-required` call on a requirement worded exactly as before carries over (anything else is the new
    check's to make). `results` is `answerability.run_check`'s output; `hashes` each question's input hash."""
    for sid, r in results.items():
        old = record["questions"].get(sid) or {}
        kept = {req["statement"]: req["resolution"] for req in old.get("requirements") or []
                if (req.get("resolution") or {}).get("kind") == "not-required"}
        reqs = []
        for req in r.get("requirements") or []:
            item = {"id": req["id"], "kind": req.get("kind"), "statement": req["statement"],
                    "concept": req.get("concept") or "", "status": req["status"],
                    "places": [{"page": p["page"], "quote": p["quote"]} for p in req.get("places") or []
                               if p.get("page") and p.get("quote")]}
            if item["statement"] in kept:
                item["resolution"] = kept[item["statement"]]
            reqs.append(item)
        record["questions"][sid] = {"path": r.get("path"), "run": run, "input_hash": hashes.get(sid),
                                    "verdict": r.get("verdict"), "requirements": reqs}
        if r.get("error"):
            record["questions"][sid]["error"] = r["error"]
    return record


# ── the gate ───────────────────────────────────────────────────────────────


def requirement_state(req: dict, pages: Pages, where: Reach) -> tuple[str, str | None]:
    """(tier, page) for a requirement now: the nearest tier any of its places — the check's, or the one its
    resolution added — reaches with a quote that is really on the page. `not-required` is its own state;
    `gone` means it had places and none of them holds any more."""
    res = req.get("resolution") or {}
    if res.get("kind") == "not-required":
        return "not-required", None
    places = list(req.get("places") or [])
    if res.get("kind") == "taught":
        places.append({"page": res.get("page"), "quote": res.get("quote")})
    best: tuple[int, str] | None = None
    for p in places:
        page = p.get("page")
        if page not in pages.paths or pages.kind[page] == "exam":
            continue
        if not pages.index(page).find(p.get("quote") or "")[0]:
            continue
        t = TIERS.index(where.tier(page))
        if best is None or t < best[0]:
            best = (t, page)
    if best:
        return TIERS[best[0]], best[1]
    return ("gone" if places else "missing"), None


def assess_bank(exam: dict, root: Path = REPO_ROOT, record: dict | None = None) -> dict:
    """G8 for one exam: every served question checked and current, every requirement in reach or not
    required. Returns the counts and every open item, each with what would close it."""
    bank = exam.get("bank")
    out = {"recorded": False, "served": 0, "checked": 0, "not_checked": [], "changed": [], "errors": [],
           "open": [], "passes": True}
    if not bank:
        return out
    files: dict[str, tuple[str, str]] = {}
    for path in sorted((Path(root) / "questions" / bank).glob("*.md")):
        text = path.read_text(encoding="utf-8")
        sid = question_id(text)
        if sid and is_served(text) and sid not in files:
            files[sid] = (f"questions/{bank}/{path.name}", text)
    out["served"] = len(files)
    if not files:
        return out
    record = record if record is not None else load_record(bank)
    if record is None:
        out["not_checked"] = sorted(files)
        out["passes"] = False
        return out
    out["recorded"] = True
    pages = Pages(exam, root)
    prereq = pages.prerequisite_pages()
    syllabus = set(pages.objective_concepts(pages.exam_title))
    for sid, (rel, text) in sorted(files.items()):
        entry = record["questions"].get(sid)
        if not entry:
            out["not_checked"].append(sid)
            continue
        if entry.get("input_hash") != input_hash(text):
            out["changed"].append(sid)
            continue
        if entry.get("verdict") in ("error", None):
            out["errors"].append(sid)
            continue
        out["checked"] += 1
        where = reach(pages, question_tags(text), prereq, syllabus)
        for req in entry.get("requirements") or []:
            state, _ = requirement_state(req, pages, where)
            if state in IN_REACH or state == "not-required":
                continue
            item = {"question": sid, "item": f"{sid}:{req['id']}", "statement": req["statement"],
                    "concept": req.get("concept") or "", "state": state}
            if state == "elsewhere":
                item["pages"] = sorted({p["page"] for p in req.get("places") or []
                                        if p.get("page") in pages.paths
                                        and pages.index(p["page"]).find(p.get("quote") or "")[0]})
            out["open"].append(item)
    out["passes"] = not (out["not_checked"] or out["changed"] or out["errors"] or out["open"])
    return out


WHY = {
    "missing": "taught on no page — write it from the reading, on the page it belongs on",
    "elsewhere": "taught, but on a page the question neither tags nor reaches by a link, and not on the exam's "
                 "syllabus — retag it or link it",
    "gone": "the quoted passage is no longer on its page — re-quote it, or re-run the check on this question",
}


def describe(r: dict) -> list[str]:
    """`r` (from `assess_bank`) as lines for a report."""
    out: list[str] = []
    if not r["served"]:
        return out
    if not r["recorded"]:
        return [f"- no answerability record: run `simulations/check-answerable --exam …` ({r['served']} served questions)"]
    out.append(f"- {r['checked']} of {r['served']} served questions checked and current")
    if r["not_checked"]:
        out.append(f"- never checked ({len(r['not_checked'])}): " + ", ".join(r["not_checked"]))
    if r["changed"]:
        out.append(f"- changed since checked — re-run `--ids` ({len(r['changed'])}): " + ", ".join(r["changed"]))
    if r["errors"]:
        out.append(f"- the check failed — re-run ({len(r['errors'])}): " + ", ".join(r["errors"]))
    by: dict[str, list[dict]] = {}
    for item in r["open"]:
        by.setdefault(item["state"], []).append(item)
    for state in ("missing", "elsewhere", "gone"):
        items = by.get(state) or []
        if not items:
            continue
        out.append(f"- {len(items)} requirement(s) {WHY[state]}:")
        for item in items:
            where = f" (on {', '.join(item['pages'])})" if item.get("pages") else ""
            concept = f" [{item['concept']}]" if item["concept"] and state == "missing" else ""
            out.append(f"    - `{item['item']}`{concept}{where}: {item['statement'][:200]}")
    return out


# ── closing an item ────────────────────────────────────────────────────────


def find_requirement(record: dict, item: str) -> dict:
    sid, _, rid = item.partition(":")
    entry = record["questions"].get(sid)
    if not entry:
        raise ValueError(f"{sid} is not in the record")
    for req in entry.get("requirements") or []:
        if req["id"] == rid:
            return req
    raise ValueError(f"{sid} has no requirement {rid!r}")


def resolve(record: dict, exam: dict, item: str, *, note: str, page: str | None = None,
            quote: str | None = None, not_required: bool = False, run: str | None = None,
            root: Path = REPO_ROOT, today: str | None = None) -> dict:
    """Record what closed an item. A `taught` resolution must quote a passage that is on the page now (and
    says whether that page is in the question's reach); `not-required` needs a note saying why."""
    if not note or not note.strip():
        raise ValueError("a resolution needs --note: what was done, or why the item isn't required")
    req = find_requirement(record, item)
    stamp = {"note": note.strip(), "date": today or dt.date.today().isoformat()}
    if run:
        stamp["run"] = run
    if not_required:
        req["resolution"] = {"kind": "not-required", **stamp}
        return req
    pages = Pages(exam, root)
    title = pages.resolve_link(page or "")
    if not title:
        raise ValueError(f"no page {page!r} in this exam's view of the vault")
    if pages.kind[title] == "exam":
        raise ValueError("an exam page names concepts; it doesn't teach them")
    if not pages.index(title).find(quote or "")[0]:
        raise ValueError(f"the quote is not on {title!r} (at least {MIN_QUOTE_CHARS} characters, copied exactly)")
    req["resolution"] = {"kind": "taught", "page": title, "quote": quote, **stamp}
    return req


# ── rebuilding a record from a committed report ────────────────────────────


def _uncell(text: str) -> str:
    return text.replace("\\|", "|").strip()


def import_report(md: str, exam: dict, run: str, root: Path = REPO_ROOT) -> dict:
    """A record rebuilt from a run's committed `report.md`, for a run whose `results.jsonl` (never committed)
    is gone. The report prints every requirement with its status and the start of its quote; a quote cut
    short ends in "…", which `PageIndex.find` reads as a piece of the passage, so the gate re-checks it like
    any other. A gap's full wording comes from the report's gap list. Questions changed since the report was
    written get no input hash, so the gate sends them back to the check."""
    full: dict[tuple[str, str], list[tuple[str, str]]] = {}
    for m in re.finditer(r"^- `([^`]+)` \((\w+)\): (.+?)(?: — \*the locator quoted.*)?$", md, re.M):
        full.setdefault((m.group(1), m.group(2)), []).append((m.group(3).rstrip("…"), m.group(3)))
    files = {}
    bank = exam["bank"]
    for path in sorted((Path(root) / "questions" / bank).glob("*.md")):
        text = path.read_text(encoding="utf-8")
        sid = question_id(text)
        if sid:
            files[sid] = (f"questions/{bank}/{path.name}", text)
    record = new_record(exam)
    blocks = re.split(r"^<details><summary><code>", md, flags=re.M)[1:]
    for block in blocks:
        head = re.match(r"([^<]+)</code> · ([^<]+)</summary>", block)
        if not head:
            continue
        sid, verdict = head.group(1), head.group(2).strip()
        reqs = []
        for row in re.finditer(r"^\| (.+?) \| (definition|formula|procedure|fact) \| (\w+) \| (.*) \|$", block, re.M):
            statement, kind, status, where = (_uncell(row.group(1)), row.group(2), row.group(3), row.group(4))
            cut = statement.rstrip("…")
            for prefix, whole in full.get((sid, kind), []):
                if whole.startswith(cut) or prefix.startswith(cut):
                    statement = whole
                    break
            places = []
            wm = re.match(r"^(.*?)(?: \(collapsed\))?: “(.*?)…?”$", where)
            if wm and status != "missing":
                # The report escapes the quote's pipes twice (once as a quote, once in its cell).
                places.append({"page": _uncell(wm.group(1)), "quote": _uncell(_uncell(wm.group(2)))})
            reqs.append({"id": f"r{len(reqs) + 1}", "kind": kind, "statement": statement, "concept": "",
                         "status": "prerequisite" if status == "prerequisite" else status, "places": places})
        rel, text = files.get(sid, (None, None))
        record["questions"][sid] = {"path": rel, "run": run, "input_hash": input_hash(text) if text else None,
                                    "verdict": verdict, "requirements": reqs, "imported_from": "report.md"}
    # The gap list names the page each missing item belongs on — keep it as the concept.
    for m in re.finditer(r"^### (?:`Concepts/(.+?)\.md`|\*\*no page for (.+?)\*\*|\*\*(.+?)\*\*) — \d+ question",
                         md, re.M):
        concept = next(g for g in m.groups() if g)
        section = md[m.end():].split("\n### ", 1)[0].split("\n## ", 1)[0]
        for im in re.finditer(r"^- `([^`]+)` \((\w+)\): (.+?)(?: — \*the locator quoted.*)?$", section, re.M):
            entry = record["questions"].get(im.group(1))
            for req in (entry or {}).get("requirements") or []:
                if req["status"] == "missing" and req["kind"] == im.group(2) and req["statement"] == im.group(3) \
                        and not req["concept"]:
                    req["concept"] = concept
                    break
    return record


# ── CLI ────────────────────────────────────────────────────────────────────


def _exam(key: str) -> dict:
    exam = VL.exam_for_id(key, VL.load_catalog())
    if not exam or not exam.get("bank"):
        raise SystemExit(f"no exam with a question bank for {key!r} in scripts/exam_catalog.json")
    return exam


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    sub = ap.add_subparsers(dest="cmd", required=True)
    st = sub.add_parser("status", help="what G8 still needs for one exam")
    st.add_argument("--exam", required=True)
    for name in ("resolve", "not-required"):
        p = sub.add_parser(name, help="close one item: a quote on a page in reach" if name == "resolve"
                           else "close one item as not course content the vault must teach")
        p.add_argument("--exam", required=True)
        p.add_argument("--item", required=True, help="<question id>:<requirement id>, e.g. masii-2018f-q41:r1")
        p.add_argument("--note", required=True)
        p.add_argument("--run", help="the run (agent, PR) that did it")
        if name == "resolve":
            p.add_argument("--page", required=True)
            p.add_argument("--quote", required=True)
    im = sub.add_parser("import-report", help="rebuild a bank's record from a run's committed report.md")
    im.add_argument("--exam", required=True)
    im.add_argument("report")
    args = ap.parse_args(argv)
    exam = _exam(args.exam)

    if args.cmd == "status":
        r = assess_bank(exam)
        print(f"# G8 answerability — {exam['page'][:-3]}: {'passes' if r['passes'] else 'fails'}")
        print("\n".join(describe(r)))
        return 0 if r["passes"] else 1
    if args.cmd == "import-report":
        if load_record(exam["bank"]) is not None:
            raise SystemExit(f"{record_path(exam['bank'])} exists; a report never overwrites a record")
        md = Path(args.report).read_text(encoding="utf-8")
        run = Path(args.report).resolve().parent.name
        print(f"record → {save_record(import_report(md, exam, run))}")
        return 0
    record = load_record(exam["bank"])
    if record is None:
        raise SystemExit(f"no record for {exam['bank']}: run simulations/check-answerable first")
    try:
        req = resolve(record, exam, args.item, note=args.note, page=getattr(args, "page", None),
                      quote=getattr(args, "quote", None), not_required=args.cmd == "not-required", run=args.run)
    except ValueError as e:
        print(f"refused: {e}", file=sys.stderr)
        return 2
    save_record(record)
    pages = Pages(exam)
    path = REPO_ROOT / record["questions"][args.item.partition(":")[0]]["path"]
    text = path.read_text(encoding="utf-8")
    where = reach(pages, question_tags(text), pages.prerequisite_pages(), set(pages.objective_concepts(pages.exam_title)))
    state, page = requirement_state(req, pages, where)
    print(f"{args.item}: {state}" + (f" on {page}" if page else ""))
    if state == "elsewhere":
        print("  the page is out of the question's reach — tag it on the question, or link it from a tagged page")
    return 0


if __name__ == "__main__":
    sys.exit(main())
