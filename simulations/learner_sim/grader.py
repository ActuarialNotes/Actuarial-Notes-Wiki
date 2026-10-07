"""The grader: holds the answer key, marks an attempt, and hands back only what
a real student would get.

Multiple choice is marked exactly. Written parts go to the *grading agent* — a
separate, isolated Claude Code call that sees the official sample answer and
examiner's report the learner never does, and awards a fraction of the part's
points (snapped to quarters, like a marker would). A part with a numeric
`### Answer` key that the response reproduces is credited without the agent.

What comes back to the learner is a `Feedback`. Under `feedback: score` it is
the verdict and the points; under `feedback: solution` (the default — what the
app's quiz shows) it adds the answer key, the official solution, the examiner's
report, the marker's notes and the question's topic / concepts, which the app
also keeps hidden until an answer is in.
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field

from .backends import OneShot, extract_json
from .content_loader import scrub
from .vault_parse import RawPart, RawQuestion, _first_line

FEEDBACK_MODES = ("score", "solution")

GRADING_SYSTEM = """You are an experienced actuarial exam marker (SOA/CAS). You mark one candidate \
response against the official sample answer and the examiner's report, the way the examining body's \
graders do: credit for correct method and correct results, partial credit where the examiner's report \
says partial credit is given, no credit for a bare restatement or an unsupported claim. Alternative \
approaches that the sample answer or examiner's report accept get full credit. You do not reward \
confident tone. Reply with ONE JSON object and nothing else."""


@dataclass(frozen=True)
class PartResult:
    label: str
    points: float
    awarded: float
    verdict: str          # correct | partial | incorrect | ungraded
    note: str = ""


@dataclass(frozen=True)
class Feedback:
    qid: str
    verdict: str
    score: float          # 0..1
    points: float
    awarded: float
    parts: tuple[PartResult, ...] = field(default_factory=tuple)
    solution: str | None = None
    revealed: dict | None = None

    def render(self) -> str:
        head = {"correct": "Correct.", "partial": "Partially correct.", "incorrect": "Incorrect.",
                "ungraded": "Not marked (no marker available)."}[self.verdict]
        out = [f"Result for {self.qid}: {head}"]
        if self.points:
            out[0] += f" {self.awarded:g} / {self.points:g} points."
        for p in self.parts:
            if p.label:
                line = f"- Part {p.label}: {p.verdict}, {p.awarded:g}/{p.points:g}"
                if p.note and self.solution is not None:
                    line += f" — marker: {p.note}"
                out.append(line)
            elif p.note and self.solution is not None:
                out.append(f"Marker: {p.note}")
        if self.revealed:
            r = self.revealed
            out.append(f"Topic: {r.get('topic') or '—'}; objective: {r.get('objective') or '—'}; "
                       f"difficulty: {r.get('difficulty') or '—'}; concepts: {', '.join(r.get('concepts') or []) or '—'}")
        if self.solution:
            out += ["", "Official solution:", self.solution]
        return "\n".join(out)


def normalize_choice(response) -> str:
    s = str(response or "").strip().upper()
    m = re.match(r"^\(?([A-E])\b", s) or re.search(r"\b([A-E])\)", s) or re.search(r"\b([A-E])\b", s)
    return m.group(1) if m else ""


NUM_RE = re.compile(r"-?\d[\d,]*(?:\.\d+)?")


def _numbers(text: str) -> list[float]:
    out = []
    for m in NUM_RE.findall(str(text).replace("\\$", "").replace("{,}", ",")):
        try:
            out.append(float(m.replace(",", "")))
        except ValueError:
            pass
    return out


def numeric_match(key: str, response: str, rel: float = 0.001) -> bool:
    """The response states the key's headline number (to 0.1%)."""
    keys = [k for k in _numbers(key) if abs(k) >= 1e-9]
    if not keys:
        return False
    target = max(keys, key=abs)
    return any(abs(r - target) <= rel * abs(target) for r in _numbers(response))


def _verdict(score: float) -> str:
    if score >= 0.999:
        return "correct"
    if score > 0:
        return "partial"
    return "incorrect"


def _snap(x) -> float:
    try:
        x = float(x)
    except (TypeError, ValueError):
        return 0.0
    return max(0.0, min(1.0, round(x * 4) / 4))


class Grader:
    def __init__(self, questions: dict[str, RawQuestion], grading_agent: OneShot | None = None,
                 feedback_mode: str = "solution"):
        if feedback_mode not in FEEDBACK_MODES:
            raise ValueError(f"feedback mode must be one of {FEEDBACK_MODES}")
        self._questions = questions
        self._agent = grading_agent
        self.feedback_mode = feedback_mode
        self.grading_calls = 0

    # the official solution, as a learner would be shown it ----------------

    def solution_text(self, q: RawQuestion) -> str:
        out = []
        if q.type == "multiple-choice":
            out.append(f"Answer key: {q.answer}")
        if q.answer_text:
            out.append(f"Answer: {scrub(q.answer_text)}")
        if q.explanation:
            out.append(scrub(q.explanation))
        if q.examiner_report:
            out += ["Examiner's report:", scrub(q.examiner_report)]
        for p in q.parts:
            out.append(f"Part {p.label}:")
            if p.option_keys and p.answer:
                out.append(f"Answer key: {p.answer}")
            elif p.answer_text:
                out.append(f"Answer: {scrub(p.answer_text)}")
            if p.explanation:
                out.append(scrub(p.explanation))
            if p.examiner_report:
                out += ["Examiner's report:", scrub(p.examiner_report)]
        return "\n\n".join(out).strip()

    # marking --------------------------------------------------------------

    def grade(self, source_id: str, qid: str, response) -> Feedback:
        q = self._questions[source_id]
        if q.type == "multiple-choice":
            ok = normalize_choice(response) == q.answer
            pts = q.points or 1.0
            parts = (PartResult("", pts, pts if ok else 0.0, "correct" if ok else "incorrect"),)
        elif q.parts:
            answers = response if isinstance(response, dict) else {p.label: str(response or "") for p in q.parts}
            answers = {str(k).lower().strip("() "): v for k, v in answers.items()}
            parts = self._grade_parts(q, answers)
        else:
            parts = self._grade_parts(q, {"": response if not isinstance(response, dict)
                                          else json.dumps(response)})
        return self._feedback(q, qid, parts)

    def _grade_parts(self, q: RawQuestion, answers: dict) -> tuple[PartResult, ...]:
        if q.parts:
            specs = list(q.parts)
        else:
            specs = [RawPart("", q.points, "", (), _first_line(q.answer_text), q.answer_text, q.explanation,
                             q.examiner_report)]
        n = len(specs)
        results: dict[str, PartResult] = {}
        to_agent: list[RawPart] = []
        for p in specs:
            pts = p.points or ((q.points / n) if q.points else 1.0)
            resp = str(answers.get(p.label, "") or "").strip()
            if not resp:
                results[p.label] = PartResult(p.label, pts, 0.0, "incorrect", "no answer given")
            elif p.option_keys and p.answer:
                ok = normalize_choice(resp) == p.answer.strip().upper()
                results[p.label] = PartResult(p.label, pts, pts if ok else 0.0, "correct" if ok else "incorrect")
            elif p.answer and numeric_match(p.answer, resp):
                results[p.label] = PartResult(p.label, pts, pts, "correct", "matches the answer key")
            else:
                to_agent.append(p)
        if to_agent:
            marks = self._agent_marks(q, to_agent, answers)
            for p in to_agent:
                pts = p.points or ((q.points / n) if q.points else 1.0)
                if marks is None:
                    results[p.label] = PartResult(p.label, pts, 0.0, "ungraded")
                else:
                    frac, note = marks.get(p.label, (0.0, "not marked"))
                    results[p.label] = PartResult(p.label, pts, round(frac * pts, 4), _verdict(frac), note)
        return tuple(results[p.label] for p in specs)

    def _agent_marks(self, q: RawQuestion, parts: list[RawPart], answers: dict) -> dict | None:
        if self._agent is None:
            return None
        blocks = [f"QUESTION ({q.exam}{', ' + q.sitting if q.sitting else ''})", scrub(q.stem)]
        for p in parts:
            label = p.label or "(whole question)"
            blocks += [
                "", f"=== PART {label} ({p.points:g} points) ===" if p.points else f"=== PART {label} ===",
                scrub(p.stem) if p.stem else "",
                "OFFICIAL ANSWER KEY:", scrub(p.answer_text) or "(none — mark against the sample answer)",
                "OFFICIAL SAMPLE ANSWER / SOLUTION:", scrub(p.explanation) or "(none)",
                "EXAMINER'S REPORT:", scrub(p.examiner_report) or "(none)",
                "CANDIDATE RESPONSE:", str(answers.get(p.label, "")).strip() or "(blank)",
            ]
        labels = ", ".join(f'"{p.label}"' for p in parts)
        blocks += ["", "Mark each part. Reply with exactly:",
                   '{"parts": [{"label": <one of ' + labels + '>, "fraction": <0, 0.25, 0.5, 0.75 or 1>, '
                   '"note": "<at most 40 words: what earned or lost credit>"}]}']
        self.grading_calls += 1
        for _ in range(2):
            try:
                obj = extract_json(self._agent(GRADING_SYSTEM, "\n".join(blocks)))
                out = {}
                for item in obj.get("parts") or []:
                    label = str(item.get("label", "")).lower().strip("() ")
                    out[label] = (_snap(item.get("fraction")), str(item.get("note") or "")[:400])
                if len(parts) == 1 and parts[0].label not in out and len(out) == 1:
                    out = {parts[0].label: next(iter(out.values()))}
                return out
            except (ValueError, AttributeError, TypeError):
                continue
        return None

    def _feedback(self, q: RawQuestion, qid: str, parts: tuple[PartResult, ...]) -> Feedback:
        graded = [p for p in parts if p.verdict != "ungraded"]
        total = sum(p.points for p in parts)
        awarded = sum(p.awarded for p in parts)
        if not graded:
            verdict, score = "ungraded", 0.0
        else:
            denom = sum(p.points for p in graded) or 1.0
            score = sum(p.awarded for p in graded) / denom
            verdict = _verdict(score)
        reveal = self.feedback_mode == "solution"
        return Feedback(
            qid=qid, verdict=verdict, score=round(score, 4), points=round(total, 4), awarded=round(awarded, 4),
            parts=parts,
            solution=self.solution_text(q) if reveal else None,
            revealed={"topic": q.topic, "objective": q.objective, "difficulty": q.difficulty,
                      "concepts": list(q.concepts)} if reveal else None,
        )
