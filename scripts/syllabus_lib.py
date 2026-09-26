#!/usr/bin/env python3
"""Reading an exam page (`Exam *.md`) the way the app does, for the syllabus scripts.

Shared by `syllabus_lint.py` (the CI gate), `syllabus_write.py` (the renderer)
and `syllabus_gaps.py` (the Pipeline B worklist), so all three agree on what a
learning objective is. The app's own reader is `parseExamSyllabus` in
quiz/src/lib/wikiParser.ts; `quiz/src/lib/examCatalog.test.ts` runs it over the
same pages so the two can't drift.

The page shape (docs/syllabus-pipeline.md has the full account):

    ## Learning Objectives

    > [!example]- A. Ratemaking {45–55%}          ← a section (the parser's "topic")
    > Candidates should …                          ← preamble, verbatim
    >
    > 1. Define and describe [[Exposure Base|exposure bases]] as used in …
    >    - *Key concepts:* [[Line of Business]]    ← editorial, marked, still a concept
    > 2. …
    >
    > **Readings:**
    > - Werner & Modlin

    ## Source Material

    > [!answer]- Source Material
    >
    > - [[Basic Ratemaking (Werner - 2016)]]
    >      - A1-15, A17-A18

Stdlib only.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field

import vault_links

CALLOUT_RE = re.compile(r"^>\s*\[!(\w+)\][-+]?\s*(.*?)\s*$")
# The canonical title line: one space after the marker, one before the weight,
# an en-dash range (or a single figure), nothing after.
CANONICAL_TITLE_RE = re.compile(r"^> \[!example\]- (\S(?:.*\S)?) \{(\d+)(?:–(\d+))?%\}$")
WEIGHT_TAG_RE = re.compile(r"\s*\{([^}]*)\}\s*$")
OBJECTIVE_RE = re.compile(r"^(\s{0,3})(\d+)\.\s+(.*)$")
KEY_CONCEPTS_RE = re.compile(r"^\s*(?:[-*]\s+)?\*Key concepts:\*\s*(.*)$")
READINGS_RE = re.compile(r"^\*\*Readings:?\*\*\s*$")
LETTER_PREFIX_RE = re.compile(r"^[A-Z]\.\s+")
DATED_NAME_RE = re.compile(r" \([^)]*\d{4}\)$")


def split_frontmatter(text: str) -> tuple[str, str]:
    """(frontmatter block without its fences, body). ('', text) when there is none."""
    if text.startswith("---\n"):
        end = text.find("\n---\n", 4)
        if end != -1:
            return text[4:end], text[end + 5:]
    return "", text


def parse_weight(raw: str | None) -> tuple[int, int] | None:
    """`45–55%` / `23-30%` / `100%` → (lo, hi)."""
    if not raw:
        return None
    m = re.fullmatch(r"\s*(\d+)\s*(?:[-–—]\s*(\d+))?\s*%\s*", raw)
    if not m:
        return None
    lo = int(m.group(1))
    return lo, int(m.group(2)) if m.group(2) else lo


def format_weight(lo: int, hi: int) -> str:
    return f"{lo}%" if lo == hi else f"{lo}–{hi}%"


def objective_key(title: str) -> str:
    """How a question's `learning_objective` is matched to a section title: the
    CAS letter prefix dropped (`A. Ratemaking` ≡ `Ratemaking`), case and
    whitespace ignored. Mirrors `objectiveKey` in quiz/src/lib/parser.ts."""
    t = LETTER_PREFIX_RE.sub("", title.strip())
    return re.sub(r"\s+", " ", t).casefold()


def strip_links(text: str) -> str:
    """Link markup removed, the words a reader sees kept: `[[T|shown]]` → `shown`."""
    def shown(m: re.Match) -> str:
        return m.group(3) if m.group(3) else vault_links.link_basename(m.group(2))
    return vault_links.LINK_RE.sub(shown, text)


@dataclass
class Objective:
    num: str
    line_no: int                 # 1-based line in the file
    text: str                    # the numbered line, marker removed
    extra: list[str] = field(default_factory=list)   # continuation / sub-item lines
    key_concepts: list[str] = field(default_factory=list)  # link targets on *Key concepts:* lines

    def all_lines(self) -> list[str]:
        return [self.text, *self.extra]


@dataclass
class Section:
    title_line: str
    line_no: int
    title: str
    weight_raw: str | None
    lines: list[str] = field(default_factory=list)        # callout body, `> ` stripped
    line_nos: list[int] = field(default_factory=list)
    objectives: list[Objective] = field(default_factory=list)
    preamble: list[str] = field(default_factory=list)     # lines before the first objective
    readings: list[str] = field(default_factory=list)

    @property
    def weight(self) -> tuple[int, int] | None:
        return parse_weight(self.weight_raw)


@dataclass
class ExamPage:
    path: str
    text: str
    frontmatter: str
    body: str
    sections: list[Section]
    source_lines: list[str]      # the [!answer] Source Material callout body
    source_line_nos: list[int]
    headings: list[tuple[int, int, str]]   # (line_no, level, text)
    body_offset: int             # line number of the body's first line, minus one

    def links_in_sections(self) -> list[tuple[int, "vault_links.Link"]]:
        out = []
        for s in self.sections:
            for ln, line in zip(s.line_nos, s.lines):
                out.extend((ln, link) for link in vault_links.iter_links(line))
        return out


def parse_exam_page(path: str, text: str | None = None) -> ExamPage:
    if text is None:
        with open(path, encoding="utf-8") as fh:
            text = fh.read()
    fm, body = split_frontmatter(text)
    offset = text[: len(text) - len(body)].count("\n")
    sections: list[Section] = []
    source_lines: list[str] = []
    source_line_nos: list[int] = []
    headings: list[tuple[int, int, str]] = []
    current: Section | None = None
    in_source = False

    for i, line in enumerate(body.split("\n")):
        ln = offset + i + 1
        h = re.match(r"^(#{1,6})\s+(.*?)\s*$", line)
        if h:
            headings.append((ln, len(h.group(1)), h.group(2)))
        header = CALLOUT_RE.match(line)
        if header:
            current, in_source = None, False
            kind = header.group(1).lower()
            if kind == "example":
                raw_title = header.group(2)
                w = WEIGHT_TAG_RE.search(raw_title)
                title = raw_title[: w.start()].strip() if w else raw_title.strip()
                current = Section(line, ln, title, w.group(1).strip() if w else None)
                sections.append(current)
            elif kind == "answer":
                in_source = True
            continue
        if line.startswith(">"):
            inner = re.sub(r"^>\s?", "", line)
            if current:
                current.lines.append(inner)
                current.line_nos.append(ln)
            elif in_source:
                source_lines.append(inner)
                source_line_nos.append(ln)
        elif line.strip():
            current, in_source = None, False

    for s in sections:
        _split_section(s)
    return ExamPage(path, text, fm, body, sections, source_lines, source_line_nos, headings, offset)


def _split_section(s: Section) -> None:
    """Cut a callout body into preamble, objectives and the readings list."""
    obj: Objective | None = None
    in_readings = False
    for ln, line in zip(s.line_nos, s.lines):
        if READINGS_RE.match(line.strip()):
            in_readings, obj = True, None
            continue
        if in_readings:
            m = re.match(r"^\s*[-*]\s+(.*)$", line)
            if m:
                s.readings.append(m.group(1).strip())
                continue
            if line.strip():
                in_readings = False
        m = OBJECTIVE_RE.match(line)
        if m:
            obj = Objective(m.group(2), ln, m.group(3).rstrip())
            s.objectives.append(obj)
            continue
        kc = KEY_CONCEPTS_RE.match(line)
        if obj is None:
            if kc is None:
                s.preamble.append(line)
            continue
        if kc:
            obj.key_concepts.extend(l.name for l in vault_links.iter_links(kc.group(1)))
        if line.strip():
            obj.extra.append(line.rstrip())


def source_entries(page: ExamPage) -> list[tuple[int, "vault_links.Link", list[str]]]:
    """The Source Material shelf: (line, the reading's link, its assignment lines)."""
    out: list[tuple[int, vault_links.Link, list[str]]] = []
    for ln, line in zip(page.source_line_nos, page.source_lines):
        top = re.match(r"^-\s+(.*)$", line)
        if top:
            links = list(vault_links.iter_links(top.group(1)))
            if links:
                out.append((ln, links[0], []))
            continue
        sub = re.match(r"^\s+-\s+(.*)$", line)
        if sub and out:
            out[-1][2].append(sub.group(1).strip())
    return out
