"""Whole-file parsing of question files: stems, options, answer keys, solutions.

TRUSTED CODE ONLY. What this module returns carries the answer key and the
official solutions. The grader, the analysis and the report read it; the
learner's context is never built from a `RawQuestion` directly — the content
loader copies an allowlist of its fields into a `LearnerQuestion` instead.

The section rules mirror the app's parser (quiz/src/lib/parser.ts) and add a
fail-safe: any heading that *names* a solution (Explanation, Examiner Report,
Answer, Solution, Sample Answer …) at any level opens a solution section, and
everything after it — whatever headings follow — stays solution until the next
`## Part` heading. Headings inside code fences (R output in MAS-II stems) are
not headings.
"""

from __future__ import annotations

import os
import re
from dataclasses import dataclass, field

import yaml

from vault_links import question_link_slug  # scripts/, put on sys.path by the package

SOLUTION_HEADINGS = {
    "explanation": "explanation",
    "examiner report": "examiner_report",
    "examiners report": "examiner_report",
    "examiner's report": "examiner_report",
    "answer": "answer",
    "answers": "answer",
    "final answer": "answer",
    "solution": "explanation",
    "solutions": "explanation",
    "worked solution": "explanation",
    "sample answer": "explanation",
    "sample answers": "explanation",
    "model answer": "explanation",
}

HEADING_RE = re.compile(r"^(#{1,6})\s+(.*?)\s*#*\s*$")
PART_RE = re.compile(r"^##\s+Part\s+([A-Za-z0-9]+)\b(.*)$")
POINTS_RE = re.compile(r"\(([0-9.]+)\s*points?\)", re.I)
OPTION_RE = re.compile(r"^\s*[-*]\s+\(?([A-Ea-e])\)\s+")


@dataclass(frozen=True)
class RawPart:
    label: str
    points: float
    stem: str
    option_keys: tuple[str, ...]
    answer: str            # `### Answer` first line (or a letter for an MC part); '' if none
    answer_text: str       # the whole `### Answer` section
    explanation: str
    examiner_report: str

    @property
    def is_choice(self) -> bool:
        return bool(self.option_keys)


@dataclass(frozen=True)
class RawQuestion:
    source_id: str          # frontmatter id
    path: str               # vault-relative
    bank: str
    exam: str
    type: str               # multiple-choice | multi-part
    topic: str
    objective: str
    difficulty: str
    concepts: tuple[str, ...]
    answer: str             # MC key letter; '' for multi-part
    points: float
    year: int | None
    session: str | None
    off_syllabus: bool
    originally_exam: str | None
    open_critical: int
    stem: str               # text before any part / solution heading (options included for MC)
    option_keys: tuple[str, ...]
    answer_text: str        # `### Answer` of an unparted question
    explanation: str
    examiner_report: str
    parts: tuple[RawPart, ...] = field(default_factory=tuple)

    @property
    def sitting(self) -> str | None:
        if self.year and self.session:
            return f"{self.session} {self.year}"
        return str(self.year) if self.year else None

    def solution_texts(self) -> list[str]:
        """Every piece of text a learner must not see before attempting."""
        out = [self.answer_text, self.explanation, self.examiner_report]
        for p in self.parts:
            out += [p.answer_text, p.explanation, p.examiner_report]
        return [t for t in out if t and t.strip()]

    def stem_texts(self) -> list[str]:
        return [self.stem] + [p.stem for p in self.parts]


def split_frontmatter(text: str) -> tuple[dict, str]:
    if not text.startswith("---"):
        return {}, text
    m = re.search(r"^---\s*$", text[3:], re.M)
    if not m:
        return {}, text
    fm_text = text[3:3 + m.start()]
    body = text[3 + m.end():]
    try:
        data = yaml.safe_load(fm_text) or {}
    except yaml.YAMLError:
        data = {}
    return (data if isinstance(data, dict) else {}), body.lstrip("\n")


def _lines_outside_fences(body: str):
    """(line, is_heading_candidate) for every line; fenced lines are never headings."""
    fence = None
    for line in body.split("\n"):
        stripped = line.strip()
        m = re.match(r"^(`{3,}|~{3,})", stripped)
        if m:
            marker = m.group(1)[0]
            if fence is None:
                fence = marker
            elif fence == marker:
                fence = None
            yield line, False
            continue
        yield line, fence is None


def _solution_kind(heading_text: str) -> str | None:
    t = heading_text.lower()
    t = re.sub(r"\(.*?\)", "", t)
    t = re.sub(r"[^a-z' ]+", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return SOLUTION_HEADINGS.get(t)


def _segments(body: str):
    """Split a body into [(part_heading_or_None, stem_lines, {kind: lines})]."""
    segs = [{"heading": None, "stem": [], "sol": {}, "cur": None}]
    for line, can_head in _lines_outside_fences(body):
        if can_head:
            pm = PART_RE.match(line)
            if pm:
                segs.append({"heading": line, "stem": [], "sol": {}, "cur": None})
                continue
            hm = HEADING_RE.match(line)
            if hm:
                kind = _solution_kind(hm.group(2))
                if kind:
                    seg = segs[-1]
                    seg["cur"] = kind
                    seg["sol"].setdefault(kind, [])
                    continue
        seg = segs[-1]
        if seg["cur"]:
            seg["sol"][seg["cur"]].append(line)
        else:
            seg["stem"].append(line)
    return segs


def _clean(lines: list[str]) -> str:
    return "\n".join(lines).strip()


def _option_keys(stem: str) -> tuple[str, ...]:
    keys = []
    for line, can in _lines_outside_fences(stem):
        m = OPTION_RE.match(line)
        if m and m.group(1).upper() not in keys:
            keys.append(m.group(1).upper())
    return tuple(keys)


def _first_line(text: str) -> str:
    for line in text.split("\n"):
        if line.strip():
            return line.strip()
    return ""


def _concepts(links) -> tuple[str, ...]:
    out = []
    for link in links or []:
        if not isinstance(link, str):
            continue
        slug = question_link_slug(link)
        if slug and slug not in out:
            out.append(slug)
    return tuple(out)


def parse_question_text(text: str, path: str = "", bank: str = "") -> RawQuestion | None:
    fm, body = split_frontmatter(text)
    if not fm.get("id"):
        return None
    segs = _segments(body)
    head = segs[0]
    parts: list[RawPart] = []
    for seg in segs[1:]:
        pm = PART_RE.match(seg["heading"])
        label = pm.group(1).lower()
        pts = POINTS_RE.search(pm.group(2) or "")
        stem = _clean(seg["stem"])
        keys = _option_keys(stem)
        answer_text = _clean(seg["sol"].get("answer", []))
        parts.append(RawPart(
            label=label,
            points=float(pts.group(1)) if pts else 0.0,
            stem=stem,
            option_keys=keys,
            answer=_first_line(answer_text),
            answer_text=answer_text,
            explanation=_clean(seg["sol"].get("explanation", [])),
            examiner_report=_clean(seg["sol"].get("examiner_report", [])),
        ))
    ver = fm.get("verification") or {}
    stem = _clean(head["stem"])
    year = fm.get("year")
    try:
        year = int(year) if year is not None else None
    except (TypeError, ValueError):
        year = None
    try:
        points = float(fm.get("points") or 0)
    except (TypeError, ValueError):
        points = 0.0
    return RawQuestion(
        source_id=str(fm["id"]),
        path=path,
        bank=bank,
        exam=str(fm.get("exam") or ""),
        type=str(fm.get("type") or ""),
        topic=str(fm.get("topic") or ""),
        objective=str(fm.get("learning_objective") or ""),
        difficulty=str(fm.get("difficulty") or ""),
        concepts=_concepts(fm.get("wiki_link")),
        answer=str(fm.get("answer") or "").strip().upper() if fm.get("type") == "multiple-choice" else "",
        points=points,
        year=year,
        session=str(fm["session"]) if fm.get("session") else None,
        off_syllabus=bool(fm.get("off_syllabus")),
        originally_exam=str(fm["originally_exam"]) if fm.get("originally_exam") else None,
        open_critical=int((ver.get("open_critical") if isinstance(ver, dict) else 0) or 0),
        stem=stem,
        option_keys=_option_keys(stem) if not parts else (),
        answer_text=_clean(head["sol"].get("answer", [])),
        explanation=_clean(head["sol"].get("explanation", [])),
        examiner_report=_clean(head["sol"].get("examiner_report", [])),
        parts=tuple(parts),
    )


def load_bank(root: str, bank: str) -> dict[str, RawQuestion]:
    """Every parseable question in `questions/<bank>/`, keyed by frontmatter id."""
    base = os.path.join(root, "questions", bank)
    out: dict[str, RawQuestion] = {}
    for fn in sorted(os.listdir(base)):
        if not fn.endswith(".md"):
            continue
        rel = f"questions/{bank}/{fn}"
        with open(os.path.join(root, rel), encoding="utf-8") as fh:
            q = parse_question_text(fh.read(), rel, bank)
        if q and q.source_id not in out:
            out[q.source_id] = q
    return out


def is_gradable(q: RawQuestion) -> bool:
    """Whether a question can be put in front of the learner and marked."""
    if q.type == "multiple-choice":
        return bool(q.answer) and q.answer in q.option_keys
    if q.type == "multi-part":
        if q.parts:
            return all(p.explanation or p.answer for p in q.parts)
        return bool(q.explanation or q.answer_text)
    return False
