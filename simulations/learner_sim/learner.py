"""The learner: a persona built from a profile, and the action protocol it uses.

This module never reads the vault and never imports the grader, the question
parser or the loader — it only turns text observations (already filtered by
the loader and passed through the guard) into actions. The isolation test
holds it to that.

Staying in character can only be asked of a model, not forced: the persona
draws an explicit knowledge boundary, and each answer lists the sources it
relied on — `page: <title>`, `notes`, `prior: <item>` or `guess` — which the auditor
(auditor.py) then checks. The learner's working is not requested, and
`trim_reply` keeps nothing of a reply but its action and that action's fields.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field

from .backends import extract_json
from .profiles import Profile

ACTIONS = {
    "syllabus": "{}  — the exam's learning objectives and the concept pages each names",
    "read_page": '{"title": "<page title>", "mode": "full" | "skim"}',
    "search": '{"query": "<words>"}  — find study pages',
    "update_notes": '{"notes": "<your COMPLETE notes file, markdown, at most %d words>"}  — replaces the file',
    "next_question": '{"focus": "<a concept or topic you want to practise, or empty>"}',
    "answer": '{"answer": <see the question>, "confidence": <0-100>, '
              '"sources": ["page: <title>", "notes", "prior: <item>", "guess"]}  — the answer as you would submit it',
    "flag_question": '{"reason": "<what is ambiguous, missing or wrong in the question>"}',
    "end_session": '{"reflection": "<what you learned, what still confuses you>"}',
}
# The fields each action takes. Anything else in a reply — prose around the JSON, or
# a key no action defines — is never kept (see trim_reply).
ARG_FIELDS = {
    "syllabus": (),
    "read_page": ("title", "mode"),
    "search": ("query",),
    "update_notes": ("notes",),
    "next_question": ("focus",),
    "answer": ("answer", "confidence", "sources"),
    "flag_question": ("reason",),
    "end_session": ("reflection",),
}
NOTES_WORD_LIMIT = 1500


def trim_reply(reply: str) -> str:
    """What is kept of a model reply: its action and that action's own fields, as JSON."""
    try:
        obj = extract_json(reply)
    except ValueError:
        return "(no action in reply; text not kept)"
    name = str(obj.get("action") or "")
    args = obj.get("args") if isinstance(obj.get("args"), dict) else {}
    return json.dumps({"action": name, "args": {k: args[k] for k in ARG_FIELDS.get(name, ()) if k in args}})


def _band(x: float, low: str, mid: str, high: str) -> str:
    return low if x < 0.34 else (mid if x < 0.67 else high)


def trait_sentences(p: Profile) -> list[str]:
    t = p.trait
    out = [
        _band(t("reading_thoroughness"),
              "You read fast and shallow; you rarely open folded examples or follow every step.",
              "You read reasonably carefully but don't open every example.",
              "You read every line, open the worked examples and check the steps."),
        _band(t("skim_tendency"),
              "You almost never skim.",
              "When a page looks long you are tempted to skim it.",
              "You skim most pages and only slow down when something looks directly useful."),
        _band(t("derivation_patience"),
              "Long derivations lose you after a few lines; you jump to the boxed result.",
              "You follow derivations of moderate length.",
              "You enjoy working through long derivations line by line."),
        _band(t("math_anxiety"),
              "Maths doesn't worry you.",
              "Dense maths makes you a little uneasy.",
              "Dense notation makes you anxious; you second-guess yourself on algebra-heavy problems."),
        _band(t("guess_tendency"),
              "You work problems out rather than guess.",
              "When stuck you will make an educated guess.",
              "You often pick the answer that 'looks right' rather than work it fully."),
    ]
    cb = t("confidence_bias")
    if cb > 0.3:
        out.append("You tend to rate your confidence higher than your accuracy warrants.")
    elif cb < -0.3:
        out.append("You tend to rate your confidence lower than your accuracy warrants.")
    return out


def _prior_lines(prior: dict) -> list[str]:
    lines = []
    for k, v in prior.items():
        if k == "mastered_concepts":
            continue
        label = k.replace("_", " ")
        if isinstance(v, list):
            lines.append(f"- {label}: " + "; ".join(str(x) for x in v))
        else:
            lines.append(f"- {label}: {v}")
    return lines


def build_persona(p: Profile, exam_title: str) -> str:
    mastered = ", ".join(p.mastered) or "none in particular"
    gaps = "\n".join(f"- {g}" for g in p.gaps) or "- (none listed)"
    actions = "\n".join(f"- {name} {spec % NOTES_WORD_LIMIT if '%d' in spec else spec}"
                        for name, spec in ACTIONS.items())
    return f"""You are role-playing a real person studying for the actuarial exam {exam_title}, using the \
Actuarial Notes study wiki. You are not an AI assistant with encyclopedic knowledge: you are this student, \
and the point of the exercise is to find out how well the wiki teaches *them*.

## Who you are
{p.name}. {p.description}

What you already know:
{chr(10).join(_prior_lines(p.prior_knowledge)) or '- nothing relevant beyond high-school maths'}
Concepts you already have down: {mastered}.

What you are weak on, or have never learned:
{gaps}

How you study:
{chr(10).join('- ' + s for s in trait_sentences(p))}

## The knowledge boundary — the most important rule
- You may use only (1) the prior knowledge above, (2) what the study pages shown to you in this \
conversation say, and (3) your own notes file.
- If something you need — a formula, a definition, a technique, a fact about insurance or finance — is \
not in those three places, you do not know it. Do not fill it in from general knowledge. Look for it in \
the wiki, reason from what you have, or guess, as this student would.
- Your notes are your memory. Between sessions you remember only what your notes say. Anything worth \
keeping goes into them with update_notes.
- With each answer, list in `sources` what you used: `page: <title>` for a study page, `notes`, or \
`prior: <item>`, or `guess` if you used nothing. List only what you actually used. Something you used but did not list counts as knowledge \
you were not supposed to have.
- Give each answer as you would submit it. You are not asked to show your working.
- Perform like this student, not better: their misreadings, slips and doubts are the data we need.

## How you act
Reply with exactly ONE JSON object and nothing else:
{{"action": "<name>", "args": {{...}}}}

Actions:
{actions}

The study session tells you your remaining budget after every action. Practice questions are marked; \
what you are told after an answer depends on the study mode."""


@dataclass
class Action:
    name: str
    args: dict = field(default_factory=dict)
    parse_failures: int = 0


class Learner:
    def __init__(self, guard, profile: Profile, exam_title: str, max_retries: int = 2):
        self.guard = guard
        self.profile = profile
        self.exam_title = exam_title
        self.max_retries = max_retries
        self.system_prompt = build_persona(profile, exam_title)

    def start(self) -> None:
        self.guard.start(self.system_prompt)

    def act(self, observation: str) -> Action:
        reply = self.guard.send(observation)
        failures = 0
        while True:
            try:
                obj = extract_json(reply)
                name = str(obj.get("action") or "").strip()
                if name not in ACTIONS:
                    raise ValueError(f"unknown action {name!r}")
                args = obj.get("args") or {}
                if not isinstance(args, dict):
                    raise ValueError("args must be an object")
                return Action(name, args, failures)
            except ValueError as e:
                failures += 1
                if failures > self.max_retries:
                    return Action("invalid", {"error": str(e)}, failures)
                reply = self.guard.send(
                    f"That reply could not be used ({e}). Reply with exactly one JSON object: "
                    '{"action": "<one of ' + ", ".join(ACTIONS) + '>", "args": {...}}')

    def close(self) -> None:
        self.guard.close()
