#!/usr/bin/env python3
"""syllabus_write.py — `.syllabus/<wiki id>/syllabus.json` → the exam page.

Stages 2 and 3 of the syllabus pipeline (docs/syllabus-pipeline.md). The JSON is
what `syllabus_extract.py` read off the examining body's PDF; this renders it as
an `Exam *.md` page in the one canonical shape `syllabus_lint.py` checks:

  • each topic a `> [!example]- Title {lo–hi%}` callout; its learning objective
    as the callout's first paragraph; its lettered outcomes as a numbered list
    (`a)` is 1., `b)` is 2. — the page parser numbers objectives, and the
    readings' outcome codes keep the SOA's letters); an outcome's bullets as
    sub-items; a fellowship topic's resources under `**Readings:**`;
  • `## Source Material` last: one entry per reading, its assignments beneath.

**Links wrap the syllabus's own words, and nothing else changes.** Every noun
phrase of an objective (`syllabus_lib.noun_phrases`, the chunker the lint uses)
becomes a link: to the concept page it names when one resolves
(`vault_links.canonical_page` — aliases, namesakes, then the name itself, then
its singular), or else to the page that *should* exist, named as the vault names
concepts (Title Case, singular). An unwritten page is a gap on the Pipeline B
worklist, which is the point — `syllabus_lint.py` warns about it on an
in-development exam. A reading links its `Resources/Books/` page when one's
title appears in the citation, or else the page that should exist, named
`Title (Author - Year)`; the citation itself is the link's text.

The page's `syllabus:` frontmatter records the PDF it was transcribed from (url
and sha256). `fidelity_problems` is the lint's check that the page's objectives,
with their links stripped, are still the extracted text word for word — so a
hand edit can add a link or a `*Key concepts:*` line, but can't change what the
SOA says.

Usage:
    python3 scripts/syllabus_write.py gh-101 fam-1      # these exams
    python3 scripts/syllabus_write.py --all             # every .syllabus/*/syllabus.json
    python3 scripts/syllabus_write.py --all --check     # exit 1 if a page would change

Then run `python3 scripts/verify_check.py --sync` to add the verification block.
Stdlib only.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import syllabus_lib as sl  # noqa: E402
import vault_links as vl  # noqa: E402

ROOT = vl.REPO_ROOT
SYLLABUS_DIR = os.path.join(ROOT, ".syllabus")

# Words kept lower-case inside a Title Case page name (unless first).
SMALL_WORDS = frozenset("a an and as at but by for from in into nor of on or per the to vs via with".split())
# Characters a page name can't carry (a path separator, or what Obsidian forbids).
NAME_FORBIDDEN_RE = re.compile(r'[\\/:*?"<>|#^\[\]“”]')


# ── naming ───────────────────────────────────────────────────────────────────

def exam_identity(data: dict) -> dict:
    """The page's ids from the syllabus's own name for the exam.

    `GH 101 – Benefits and Pricing` → exam id `GH-101`, title `Benefits and
    Pricing`; `GH 201-C – …` → `GH-201C`; `Fundamentals of Actuarial
    Mathematics Exam` (wiki id `fam-1`) → `FAM`."""
    title = data["title"]
    m = re.match(r"^([A-Z]{2,3}) (\d{3})(?:-([A-Z]))?\s*[–—-]?\s*(.+)$", title)
    if m:
        exam_id = f"{m.group(1)}-{m.group(2)}{m.group(3) or ''}"
        code = f"{m.group(1)} {m.group(2)}" + (f"-{m.group(3)}" if m.group(3) else "")
        return {"exam_id": exam_id, "code": code, "name": m.group(4).strip(), "fellowship": True}
    exam_id = data["wiki_id"].upper().removesuffix("-1")
    name = re.sub(r"\s+(Exam|Syllabus)$", "", title)
    return {"exam_id": exam_id, "code": exam_id, "name": name, "fellowship": False}


def page_name(data: dict) -> str:
    return f"Exam {exam_identity(data)['exam_id']} (SOA).md"


def clean_name(text: str) -> str:
    # `%` too: a page's URL is percent-decoded, so a bare one breaks it.
    text = text.replace(":", " -").replace("/", "-").replace("’", "'").replace("%", " percent")
    text = NAME_FORBIDDEN_RE.sub("", text)
    return re.sub(r"\s+", " ", text).strip(" -.,;")


def title_case(phrase: str) -> str:
    words = phrase.split()
    out = []
    for i, w in enumerate(words):
        if any(c.isupper() for c in w):           # an acronym or a name keeps its case
            out.append(w)
        elif i and w.lower() in SMALL_WORDS:
            out.append(w.lower())
        else:
            out.append("-".join(p[:1].upper() + p[1:] for p in w.split("-")))
    return " ".join(out)


IRREGULAR_PLURALS = {"analyses": "analysis", "bases": "basis", "criteria": "criterion",
                     "indices": "index", "data": "data", "statistics": "statistics",
                     "economics": "economics", "dynamics": "dynamics", "series": "series",
                     "losses": "loss", "processes": "process", "businesses": "business",
                     "classes": "class", "taxes": "tax", "annuities": "annuity",
                     "liabilities": "liability", "policies": "policy", "companies": "company"}
NOT_PLURAL_RE = re.compile(r"(ss|us|is|ics|ous|ys|as|s's)$")


def singular(word: str) -> str:
    low = word.lower()
    if low in IRREGULAR_PLURALS:
        rep = IRREGULAR_PLURALS[low]
        return word[: len(word) - len(low)] + (rep if word.islower() else rep[:1].upper() + rep[1:]) if word[0].isupper() else rep
    if len(low) < 4 or NOT_PLURAL_RE.search(low) or not low.endswith("s") or word.isupper():
        return word
    if low.endswith("ies"):
        return word[:-3] + "y"
    if low.endswith(("sses", "xes", "ches", "shes", "zes")):
        return word[:-2]
    return word[:-1]


def singular_phrase(phrase: str) -> str:
    words = phrase.split()
    return " ".join(words[:-1] + [singular(words[-1])]) if words else phrase


class Linker:
    """Resolves a noun phrase to the concept page it names (or should name)."""

    def __init__(self, vault: vl.Vault, wiki_id: str):
        self.vault, self.wiki_id = vault, wiki_id
        self.tables = vl.load_aliases()
        self.cache: dict[str, str] = {}

    def target(self, phrase: str) -> str:
        key = phrase.lower()
        if key not in self.cache:
            self.cache[key] = self._target(phrase)
        return self.cache[key]

    def _target(self, phrase: str) -> str:
        plain = phrase.replace("’", "'")
        for cand in dict.fromkeys([plain, singular_phrase(plain), title_case(plain), title_case(singular_phrase(plain))]):
            page = vl.canonical_page(cand, self.vault, self.wiki_id, self.tables)
            if page:
                return page
        return clean_name(title_case(singular_phrase(plain))) or clean_name(plain)

    def link(self, text: str) -> str:
        """`text` with every noun phrase wrapped in a link. A line whose only
        nouns are generic ones ("Calculate and recommend assumptions") links
        its last, so every objective names at least one concept."""
        out, last = [], 0
        phrases = sl.noun_phrases(text)
        if not phrases:
            generic = [m for m in sl.WORD_RE.finditer(text)
                       if m.group(0).lower() in sl.GENERIC_NOUNS and not m.group(0)[0].isdigit()]
            phrases = [(m.start(), m.end(), m.group(0)) for m in generic[-1:]]
        for start, end, phrase in phrases:
            target = self.target(phrase)
            out.append(text[last:start])
            out.append(f"[[{phrase}]]" if target == phrase else f"[[{target}|{phrase}]]")
            last = end
        out.append(text[last:])
        return "".join(out)


# ── readings ─────────────────────────────────────────────────────────────────

def _norm_words(text: str) -> str:
    return " " + " ".join(re.findall(r"[a-z0-9]+", text.lower())) + " "


class Shelf:
    """The `Resources/Books/` pages, matched to a citation the strict way
    `quiz/src/lib/factCheckSources.ts` matches a fact-check source: the page's
    whole title must appear in the citation (here as a run of words, which is
    stricter still — `Risk and Insurance` doesn't match a citation that merely
    uses all three words)."""

    def __init__(self, vault: vl.Vault):
        self.pages = []
        for name, path in vault.by_name.items():
            if path.startswith("Resources/Books/"):
                title = re.sub(r"\s*\([^)]*\)\s*$", "", name)
                words = _norm_words(title)
                if len(words.split()) >= 2:
                    self.pages.append((len(words), words, name))
        self.pages.sort(reverse=True)

    def match(self, citation: str) -> str | None:
        cited = _norm_words(citation)
        for _, words, name in self.pages:
            if words in cited:
                return name
        return None


EDITION_RE = re.compile(
    r"\(?\b(?:First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|\d+(?:st|nd|rd|th))\s+(?:Edition|ed\.?)\)?\s*",
    re.I)
ASSIGNMENT_RE = re.compile(
    r"\s*\((?=[^()]*\b(?:sections?|excluding|exclude|slides|pp\.|pages?|chapters?|ch\.|background|appendi\w*|parts?)\b)"
    r"[^()]*\)", re.I)
NON_AUTHORS = frozenset({"New York", "Cambridge", "Springer", "Wiley", "Boston"})


def reading_target(citation: str, shelf: Shelf) -> str:
    """The page a citation should link: the shelf's own page for the work, or
    the name one would be written under — `Title (Author - Year)`, the vault's
    convention, or `CODE - Title` for an SOA study note."""
    page = shelf.match(citation)
    if page:
        return page
    # An assignment in brackets ("(sections 3.1, 3.2 …)", "(excluding pp. 27-29)")
    # says what to read, not what the work is called.
    citation = ASSIGNMENT_RE.sub("", citation).strip()
    asop = re.match(r"^ASOP (?:No\.\s*)?(\d+):?\s*([^(,]+)", citation)
    if asop:
        return clean_name(f"ASOP {asop.group(1)} - {asop.group(2)}")
    note = re.match(r"^([A-Z]{2,5}\d{0,3}-\d{2,3}-\d{2}):\s*(.*)$", citation)
    if note:
        return clean_name(f"{note.group(1)} - {note.group(2).split(', ')[0]}")
    segs = [s.strip() for s in re.split(r",\s+", citation)]
    title = EDITION_RE.sub("", segs[0]).strip()
    years = re.findall(r"\b(?:19|20)\d{2}\b", citation)
    year = years[0] if years else ""
    by = re.search(r"\bby ([A-Z][\w'’-]+)", citation)
    author = by.group(1) if by else ""
    if not author:
        for seg in segs[1:]:
            seg = EDITION_RE.sub("", seg).strip(" ()")
            if not seg or re.search(r"\d", seg):
                if re.search(r"\b(?:19|20)\d{2}\b", seg):
                    break
                continue
            if seg in NON_AUTHORS or not seg[0].isupper() or len(seg.split()) > 4:
                continue
            words = seg.split()
            # "Edward W. Frees" — a forename first; the surname is the last word.
            author = words[-1] if len(words) > 1 and re.fullmatch(r"[A-Z]\.", words[-2]) else seg
            break
    tail = " - ".join(x for x in (author, year) if x)
    return clean_name(title) + (f" ({tail})" if tail else "")


def split_note(citation: str) -> tuple[str, list[str]]:
    """A citation's bracketed asides (`[Candidates may also use …]`) can't sit
    in a link's text, which `]` would end; they become notes beneath it."""
    notes = re.findall(r"\[([^\]]*)\]", citation)
    return re.sub(r"\s*\[[^\]]*\]", "", citation).strip(), notes


# ── the page ─────────────────────────────────────────────────────────────────

def weight_tag(t: dict) -> str:
    lo, hi = t["weight"]
    fmt = lambda x: f"{x:g}"
    return f"{{{fmt(lo)}%}}" if lo == hi else f"{{{fmt(lo)}–{fmt(hi)}%}}"


def outcome_num(letter: str) -> int:
    return ord(letter) - ord("a") + 1


def codes_note(codes: str) -> str:
    return f" ({codes})" if codes else ""


def render(data: dict, vault: vl.Vault) -> str:
    ident = exam_identity(data)
    linker = Linker(vault, data["wiki_id"])
    shelf = Shelf(vault)
    L: list[str] = []
    fm = [
        "---",
        "syllabus:",
        f'  source_url: "{data["source_url"]}"',
        f'  sitting: "{data["sitting"]}"',
        f"  source_sha256: {data['source_sha256']}",
        f"  extracted_at: {data['extracted_at']}",
        "---",
    ]
    L += fm + ["", '<div class="exam-nav"', f'     data-current="{ident["exam_id"]}|{ident["name"]}">', "</div>", ""]
    L.append(f"# Exam {ident['exam_id']}")
    sittings = data["sitting"]
    if ident["fellowship"]:
        when = f" Its syllabus covers the {sittings} sittings." if sittings else ""
        L.append(f"**{ident['code']} – {ident['name']}** is an exam of the Society of Actuaries' "
                 f"Fellowship (FSA) pathway.{when}")
    else:
        L.append(data["intro"][0] if data["intro"] else f"**{ident['name']}** is an exam of the Society of Actuaries.")
    L.append("")
    if not ident["fellowship"] and len(data["intro"]) > 1:
        L += ["> [!question]- About the exam", ">"]
        for p in data["intro"][1:]:
            L += [f"> {p}", ">"]
        L.pop()
        L.append("")
    edition = f"the {sittings} " if sittings else "the "
    L += [f"The learning objectives below are transcribed from {edition}[syllabus]({data['source_url']}) the SOA publishes, "
          "word for word; the SOA lists its outcomes a), b), c), numbered 1, 2, 3 here."]
    L += ["", "## Learning Objectives", ""]

    for t in data["topics"]:
        L.append(f"> [!example]- {t['title']} {weight_tag(t)}")
        if t["objective"]:
            L.append(f"> {linker.link(t['objective'])}")
        L.append(">")
        group = None
        for o in t["outcomes"]:
            if o["group"] and o["group"] != group:
                if L[-1] != ">":
                    L.append(">")
                L += [f"> **{o['group']}**", ">"]
                group = o["group"]
            n = outcome_num(o["letter"])
            L.append(f"> {n}. {linker.link(o['text'])}")
            pad = " " * len(f"{n}. ")
            for b in o["bullets"]:
                L.append(f">{pad} - {linker.link(b)}")
        if t["resources"]:
            L += [">", "> **Readings:**"]
            for r in t["resources"]:
                cite, _ = split_note(r["citation"])
                L.append(f"> - {cite}{codes_note(r['codes'])}")
                for p in r["parts"]:
                    L.append(f">     - {p['text']}{codes_note(p['codes'])}")
        L.append("")

    L += ["## Source Material", "> [!answer]- Source Material", ">"]
    entries: dict[str, dict] = {}
    readings = [r for t in data["topics"] for r in t["resources"]] or data["readings"]
    for r in readings:
        cite, notes = split_note(r["citation"])
        target = reading_target(cite, shelf) if r["citation"] != "e-Learning Modules" \
            else f"{ident['name']} e-Learning Modules (SOA)"
        e = entries.setdefault(target, {"cite": cite, "lines": []})
        lines = notes + [p["text"] + codes_note(p["codes"]) for p in r["parts"]]
        if r["codes"] and not r["parts"]:
            lines.append("Background" if r["codes"] == "Background" else f"Outcomes {r['codes']}")
        elif r["codes"]:
            lines = [f"{x}" if p["codes"] else f"{x} ({r['codes']})" for x, p in zip(lines[len(notes):], r["parts"])]
            lines = notes + lines
        for x in lines:
            if x not in e["lines"]:
                e["lines"].append(x)
    for target, e in entries.items():
        shown = e["cite"].replace("|", "-")
        L.append(f"> - [[{target}]]" if shown == target else f"> - [[{target}|{shown}]]")
        for x in e["lines"]:
            L.append(f">      - {x}")
    return "\n".join(L).rstrip() + "\n"


# ── fidelity: the lint's check ───────────────────────────────────────────────

def _words(text: str) -> list[str]:
    return re.findall(r"\S+", sl.strip_links(text).replace("**", ""))


def expected_lines(data: dict) -> list[tuple[str, str]]:
    """(where, text) for every line of syllabus text the page must carry."""
    out = []
    for t in data["topics"]:
        out.append((f"{t['title']}", f"{t['title']} {weight_tag(t)}"))
        if t["objective"]:
            out.append((f"{t['title']} objective", t["objective"]))
        for o in t["outcomes"]:
            out.append((f"{t['title']} {o['letter']})", f"{outcome_num(o['letter'])}. {o['text']}"))
            for b in o["bullets"]:
                out.append((f"{t['title']} {o['letter']}) bullet", f"- {b}"))
    return out


def fidelity_problems(rel: str, page: sl.ExamPage, vault: vl.Vault) -> list[tuple[int, str, str]]:
    """Where an exam page generated from a syllabus PDF no longer says what the
    PDF says: each section's title, weight, objective, outcomes and their
    bullets, links stripped, compared word for word with the extracted JSON."""
    exam = vl.exam_for_page(os.path.basename(rel))
    wiki_id = exam["wiki_id"] if exam else ""
    path = os.path.join(SYLLABUS_DIR, wiki_id, "syllabus.json")
    if not os.path.exists(path):
        return [(1, "fidelity", f"carries a `syllabus:` block but .syllabus/{wiki_id}/syllabus.json is missing")]
    with open(path, encoding="utf-8") as fh:
        data = json.load(fh)
    url = re.search(r'^\s+source_url:\s*"?([^"\n]+)"?', page.frontmatter, re.M)
    problems: list[tuple[int, str, str]] = []
    if not url or url.group(1) != data["source_url"]:
        problems.append((1, "fidelity", "the `syllabus:` block's source_url isn't the extracted syllabus's"))
    have: list[tuple[int, str]] = []
    for s in page.sections:
        have.append((s.line_no, s.title_line.removeprefix("> [!example]- ")))
        for ln, line in zip(s.line_nos, s.lines):
            if line in s.preamble and line.strip():
                have.append((ln, line))
        for o in s.objectives:
            have.append((o.line_no, f"{o.num}. {o.text}"))
            for ln, x in zip(o.extra_line_nos, o.extra):
                b = re.match(r"^\s+(- .*)$", x)
                if b and not sl.KEY_CONCEPTS_RE.match(x):
                    have.append((ln, b.group(1)))
    got = [(ln, _words(x)) for ln, x in have]
    i = 0
    for where, text in expected_lines(data):
        want = _words(text)
        while i < len(got) and got[i][1] != want:
            i += 1
        if i == len(got):
            problems.append((1, "fidelity", f"{where}: the page no longer carries the syllabus's words "
                                            f"“{' '.join(want)[:120]}”"))
            i = 0
            continue
        i += 1
    return problems


# ── cli ──────────────────────────────────────────────────────────────────────

def write(wiki_id: str, vault: vl.Vault, check: bool) -> bool:
    with open(os.path.join(SYLLABUS_DIR, wiki_id, "syllabus.json"), encoding="utf-8") as fh:
        data = json.load(fh)
    rel = page_name(data)
    path = os.path.join(ROOT, rel)
    text = render(data, vault)
    old = ""
    if os.path.exists(path):
        with open(path, encoding="utf-8") as fh:
            old = fh.read()
        fm, body = sl.split_frontmatter(old)
        verification = re.search(r"^verification:.*\Z", fm, re.S | re.M)
        if verification:   # keep the block verify_check.py owns, last
            new_fm, new_body = sl.split_frontmatter(text)
            text = f"---\n{new_fm}\n{verification.group(0)}\n---\n{new_body}"
    if text == old:
        return False
    if not check:
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(text)
    print(f"{'would write' if check else 'wrote'} {rel}")
    return True


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("ids", nargs="*", help="wiki ids (directories under .syllabus/)")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--check", action="store_true", help="write nothing; exit 1 if a page would change")
    args = ap.parse_args(argv)
    ids = args.ids
    if args.all:
        ids = sorted(d for d in os.listdir(SYLLABUS_DIR) if os.path.exists(os.path.join(SYLLABUS_DIR, d, "syllabus.json")))
    vault = vl.Vault(ROOT)
    changed = [i for i in ids if write(i, vault, args.check)]
    return 1 if args.check and changed else 0


if __name__ == "__main__":
    sys.exit(main())
