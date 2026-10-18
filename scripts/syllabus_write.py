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
NOT_PLURAL_RE = re.compile(r"(ss|us|is|ics|ous|ys|as|['’]s)$")   # "Mack's" is a possessive


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

    def __init__(self, vault: vl.Vault, wiki_id: str, tables: dict | None = None):
        self.vault, self.wiki_id = vault, wiki_id
        self.tables = tables or vl.load_aliases()
        self.cache: dict[str, str] = {}

    def target(self, phrase: str) -> str:
        key = phrase.lower()
        if key not in self.cache:
            self.cache[key] = self._target(phrase)
        return self.cache[key]

    def existing(self, phrase: str) -> str | None:
        """The concept page a phrase resolves to, or None."""
        plain = phrase.replace("’", "'")
        for cand in dict.fromkeys([plain, singular_phrase(plain), title_case(plain), title_case(singular_phrase(plain))]):
            page = vl.canonical_page(cand, self.vault, self.wiki_id, self.tables)
            if page:
                return page
        return None

    def _target(self, phrase: str) -> str:
        plain = phrase.replace("’", "'")
        return self.existing(phrase) or clean_name(title_case(singular_phrase(plain))) or clean_name(plain)

    # Words a phrase may grow over to reach the page it names, but never
    # starts or ends on: "the [[American Academy of Actuaries]]", never "the
    # American Academy".
    EDGE_STOPS = frozenset("a an the of and or to in for with by on from at as its their this that these those "
                           "each any all such".split())

    def extend(self, text: str, start: int, end: int,
               others: list[tuple[int, int, str]] = ()) -> tuple[int, int, str] | None:
        """The chunker trims generic words off a phrase's edges ("[[Principal
        Component]] analysis", "Expected [[Loss]] Ratio", "[[Generalized
        Linear]] model"), and that can cut a name short. The longest run of
        up to two words before and three after — whitespace between them, no
        punctuation — that names a page the vault has; or None. A run never
        cuts into one of the line's `others` phrases ("excess of loss" out of
        "excess of [loss reinsurance]") or grows across a verb ("government
        programs providing health")."""
        words = list(sl.WORD_RE.finditer(text))
        inside = [i for i, m in enumerate(words) if m.start() >= start and m.end() <= end]
        if not inside:
            return None
        first, last = inside[0], inside[-1]

        def joined(i: int, j: int) -> bool:   # words i and j (= i + 1) sit side by side
            return not text[words[i].end():words[j].start()].strip()

        lefts = [first]
        while len(lefts) < 3 and lefts[-1] > 0 and joined(lefts[-1] - 1, lefts[-1]):
            lefts.append(lefts[-1] - 1)
        rights = [last]
        while len(rights) < 4 and rights[-1] + 1 < len(words) and joined(rights[-1], rights[-1] + 1):
            rights.append(rights[-1] + 1)
        best: tuple[int, int, str] | None = None
        for i in lefts:
            for j in rights:
                if (i, j) == (first, last):
                    continue
                if words[i].group(0).lower() in self.EDGE_STOPS or words[j].group(0).lower() in self.EDGE_STOPS:
                    continue
                a, b = words[i].start(), words[j].end()
                if any(s2 < b and a < e2 and not (a <= s2 and e2 <= b) for s2, e2, _ in others):
                    continue
                if any(words[k].group(0).lower() in sl.VERBS for k in range(i + 1, j)
                       if not first <= k <= last):
                    continue
                phrase = text[a:b]
                if self.existing(phrase) and (best is None or len(phrase) > len(best[2])):
                    best = (words[i].start(), words[j].end(), phrase)
        return best

    def link(self, text: str, fallback: bool = True) -> str:
        """`text` with every noun phrase that needs a note wrapped in a link
        (`syllabus_lib.needs_note`: a single word only when it has a page). A
        phrase cut short of a page's name is grown to it (`extend`). With
        `fallback`, a line that would otherwise link nothing links its last
        noun phrase — or, with none, its last generic noun ("Calculate and
        recommend assumptions") — so every objective names at least one
        concept; a sub-item or a preamble needn't."""
        out, last = [], 0
        found = sl.noun_phrases(text)
        grown = []
        for start, end, phrase in found:
            ext = self.extend(text, start, end, [f for f in found if f[0] != start])
            grown.append(ext or (start, end, phrase))
        phrases = [p for p in grown if sl.needs_note(p[2], lambda w: self.existing(w) is not None)]
        if not phrases and fallback:
            phrases = grown[-1:]
            if not phrases:
                generic = [m for m in sl.WORD_RE.finditer(text)
                           if m.group(0).lower() in sl.GENERIC_NOUNS and not m.group(0)[0].isdigit()]
                phrases = [self.extend(text, m.start(), m.end()) or (m.start(), m.end(), m.group(0))
                           for m in generic[-1:]]
        for start, end, phrase in phrases:
            if start < last:          # swallowed by the phrase before it, grown
                continue
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

    def match(self, citation: str, year: str | None = None) -> str | None:
        """With `year` (a book list's dated citation), a page filed under
        another year is another edition and doesn't match: Brown & Lennox's
        2015 fourth edition is not the 2022 fifth's page."""
        cited = _norm_words(citation)
        for _, words, name in self.pages:
            if words in cited:
                page_year = re.search(r"\b((?:19|20)\d{2})\)\s*$", name)
                if year and page_year and page_year.group(1) != year:
                    continue
                return name
        return None


EDITION_RE = re.compile(
    r"\(?\b(?:First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|\d+(?:st|nd|rd|th))\s+(?:Edition|ed\.?)\)?\s*",
    re.I)
ASSIGNMENT_RE = re.compile(
    r"\s*\((?=[^()]*\b(?:sections?|excluding|exclude|slides|pp\.|pages?|chapters?|ch\.|background|appendi\w*|parts?)\b)"
    r"[^()]*\)", re.I)
NON_AUTHORS = frozenset({"New York", "Cambridge", "Springer", "Wiley", "Boston"})


DATED_RE = re.compile(r"^([A-Z][\w'’-]+),[^()]*?\b((?:19|20)\d{2})\.\s*(.+)$")


def reading_target(citation: str, shelf: Shelf) -> str:
    """The page a citation should link: the shelf's own page for the work, or
    the name one would be written under — `Title (Author - Year)`, the vault's
    convention, or `CODE - Title` for an SOA study note."""
    dated = DATED_RE.match(citation)
    page = shelf.match(citation, dated.group(2) if dated else None)
    if page:
        return page
    # An assignment in brackets ("(sections 3.1, 3.2 …)", "(excluding pp. 27-29)")
    # says what to read, not what the work is called.
    citation = ASSIGNMENT_RE.sub("", citation).strip()
    # A book list's author–date citation: `Segal, S., 2011. Title, Wiley.`,
    # `Lessing, Julia. 2025. Title. Greenland, NH: ACTEX.` The title runs from
    # the year to its edition, its first full stop, or the publisher.
    dated = DATED_RE.match(citation)
    if dated:
        rest = dated.group(3)
        title = re.split(r"\s*\(|\.\s", rest, maxsplit=1)[0] if re.search(r"\(|\.\s", rest) \
            else rest.rsplit(", ", 1)[0]
        return clean_name(title.strip(" ,.")) + f" ({dated.group(1)} - {dated.group(2)})"
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


class Chosen:
    """The Source Material links a page already carries: citation → page.

    The shelf matches a citation by its words, and that can't tell apart two
    works that share a title (*The Importance of Centralization …*, Part 1 of
    2019 and Part 2 of 2020) or know that a reading's page was written under
    another name (`OSFI Reinsurance`, `CIA FCT 1`). Once a person or a session
    has chosen the page a citation links, a re-render keeps that choice: an
    entry's shown text is the citation it was rendered from, so the page itself
    is the citation → page table. A citation the page doesn't carry yet (a new
    sitting's reading) falls back to the shelf. A top-level line that was left
    as plain text — a footnote the extractor read as a reading — stays plain.

    The same goes for an objective's `*Key concepts:*` line, the concept a
    person chose for an objective whose own words name none ("Analyze and
    interpret gains by source" → *Analysis of Surplus*): it is kept under the
    objective whose words it follows, and that objective needs no fallback
    link (`Linker.link`)."""

    def __init__(self, text: str = ""):
        self.target: dict[str, str] = {}
        self.plain: set[str] = set()
        self.key_concepts: dict[str, list[str]] = {}   # objective's words → its *Key concepts:* lines
        if not text:
            return
        page = sl.parse_exam_page("", text)
        for section in page.sections:
            for o in section.objectives:
                lines = [x for x in o.extra if sl.KEY_CONCEPTS_RE.match(x)]
                if lines:
                    self.key_concepts[" ".join(_words(o.text))] = lines
        for line in page.source_lines:
            top = re.match(r"^-\s+(.*?)\s*$", line)
            if not top:
                continue
            links = list(vl.iter_links(top.group(1)))
            if not links:
                self.plain.add(top.group(1))
                continue
            link = links[0]
            shown = link.display or link.target
            self.target.setdefault(shown, link.target)


def split_note(citation: str) -> tuple[str, list[str]]:
    """A citation's bracketed asides (`[Candidates may also use …]`) can't sit
    in a link's text, which `]` would end; they become notes beneath it."""
    notes = re.findall(r"\[([^\]]*)\]", citation)
    return re.sub(r"\s*\[[^\]]*\]", "", citation).strip(), notes


# ── the page ─────────────────────────────────────────────────────────────────

def weight_tag(t: dict) -> str:
    """`{lo–hi%}`, or nothing for a section an outline gives no weight (an
    e-learning module's)."""
    if not t.get("weight"):
        return ""
    lo, hi = t["weight"]
    fmt = lambda x: f"{x:g}"
    return f"{{{fmt(lo)}%}}" if lo == hi else f"{{{fmt(lo)}–{fmt(hi)}%}}"


def outcome_num(o: dict) -> int:
    """`a)` is 1. A module's objectives are bulleted, not lettered, and carry
    their number (FAP's first module has more than twenty-six)."""
    return o.get("num") or ord(o["letter"]) - ord("a") + 1


def codes_note(codes: str) -> str:
    return f" ({codes})" if codes else ""


def render(data: dict, vault: vl.Vault, chosen: Chosen | None = None) -> str:
    """The page for `data`. `chosen` is the Source Material links the page on
    disk already carries (see `Chosen`); without it every reading is matched
    afresh."""
    chosen = chosen or Chosen()
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
    module = data.get("shape") == "module"
    L.append(f"# {ident['exam_id']}" if module else f"# Exam {ident['exam_id']}")
    sittings = data["sitting"]
    if ident["fellowship"]:
        when = f" Its syllabus covers the {sittings} sittings." if sittings else ""
        L.append(f"**{ident['code']} – {ident['name']}** is an exam of the Society of Actuaries' "
                 f"Fellowship (FSA) pathway.{when}")
    else:
        L.append(data["intro"][0] if data["intro"] else f"**{ident['name']}** is an exam of the Society of Actuaries.")
    L.append("")
    about = data["intro"][1:]
    # A module's first paragraph can end on a colon over a list ("The concepts
    # you will learn in this module include:"); the list stays with it.
    while module and about and about[0].startswith("- "):
        L += about.pop(0).split("\n") + [""]
    if not ident["fellowship"] and about:
        L += [f"> [!question]- About the {'module' if module else 'exam'}", ">"]
        for p in about:
            L += [f"> {line}" for line in p.split("\n")] + [">"]
        L.pop()
        L.append("")
    L += ["## Learning Objectives", ""]

    for t in data["topics"]:
        L.append(f"> [!example]- {t['title']} {weight_tag(t)}".rstrip())
        if t["objective"]:
            L.append(f"> {linker.link(t['objective'], fallback=False)}")
        L.append(">")
        group = None
        for o in t["outcomes"]:
            if o["group"] and o["group"] != group:
                if L[-1] != ">":
                    L.append(">")
                L += [f"> **{o['group']}**", ">"]
                group = o["group"]
            n = outcome_num(o)
            bullets = [linker.link(b, fallback=False) for b in o["bullets"]]
            key_concepts = chosen.key_concepts.get(" ".join(_words(o["text"])), [])
            linked = key_concepts or any("[[" in b for b in bullets)
            L.append(f"> {n}. {linker.link(o['text'], fallback=not linked)}")
            pad = " " * len(f"{n}. ")
            for b in bullets:
                L.append(f">{pad} - {b}")
            L += [f"> {k}" for k in key_concepts]
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
    by_target: dict[str, str] = {}     # target → the key of the first entry linking it
    readings = [r for t in data["topics"] for r in t["resources"]] or data["readings"]
    for r in readings:
        cite, notes = split_note(r["citation"])
        shown = cite.replace("|", "-")
        if shown in chosen.target or shown in chosen.plain:
            # The page's own choice: an entry of its own, as the page has it.
            target = chosen.target.get(shown, "")
            key = "cite:" + shown
        else:
            target = reading_target(cite, shelf) if r["citation"] != "e-Learning Modules" \
                else f"{ident['name']} e-Learning Modules (SOA)"
            key = by_target.get(target, target)
        by_target.setdefault(target, key)
        e = entries.setdefault(key, {"cite": cite, "target": target, "lines": []})
        lines = notes + [p["text"] + codes_note(p["codes"]) for p in r["parts"]]
        if r["codes"] and not r["parts"]:
            lines.append("Background" if r["codes"] == "Background" else f"Outcomes {r['codes']}")
        elif r["codes"]:
            lines = [f"{x}" if p["codes"] else f"{x} ({r['codes']})" for x, p in zip(lines[len(notes):], r["parts"])]
            lines = notes + lines
        for x in lines:
            if x not in e["lines"]:
                e["lines"].append(x)
    for e in entries.values():
        shown, target = e["cite"].replace("|", "-"), e["target"]
        if not target:
            L.append(f"> - {shown}")
        else:
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
        out.append((f"{t['title']}", f"{t['title']} {weight_tag(t)}".rstrip()))
        if t["objective"]:
            out.append((f"{t['title']} objective", t["objective"]))
        for o in t["outcomes"]:
            out.append((f"{t['title']} {o['letter']})", f"{outcome_num(o)}. {o['text']}"))
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
    old = ""
    if os.path.exists(path):
        with open(path, encoding="utf-8") as fh:
            old = fh.read()
    text = render(data, vault, Chosen(old))
    if old:
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
