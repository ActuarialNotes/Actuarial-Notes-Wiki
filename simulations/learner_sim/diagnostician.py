"""The diagnostician: a model-written explanation of *why* the learner got stuck,
and the edits to the study pages that would have helped.

It runs only after the simulation, as a separate isolated Claude Code call, and
it does see everything — the official solutions, the pages, the learner's
working — because its job is to compare what the guide teaches with what the
question needed. Its output goes into the report; it never edits the vault.
"""

from __future__ import annotations

import os

from . import REPO_ROOT
from .backends import OneShot, extract_json
from .content_loader import ContentLoader, scrub
from .vault_parse import RawQuestion

CATEGORIES = ("missing_prerequisite", "unclear_explanation", "guide_question_gap", "broken_or_missing_link",
              "learner_behaviour", "question_issue")
QUESTION_ISSUES = ("too_hard_for_guide", "ambiguous_wording", "answer_key_suspect", "needs_unlisted_prerequisite",
                   "relies_on_missing_information", "fine")

SYSTEM = """You are reviewing an actuarial study wiki using evidence from a simulated student. The student \
studied only the wiki's pages, then attempted practice questions. For each place it got stuck you get: the \
concept page(s) it read, its working, its confidence, and the official solution. Decide WHY it got stuck, \
judging the wiki rather than the student wherever the evidence allows:
- missing_prerequisite: the question needs knowledge the student lacked and the wiki assumes without teaching or linking
- unclear_explanation: the page covers it, but in a way this student misread or couldn't follow
- guide_question_gap: the official solution uses a formula, step or fact that is not on the pages read (or reachable from them)
- broken_or_missing_link: the page the student needed doesn't exist or isn't linked where it was looked for
- learner_behaviour: the page was fine; the student skimmed, guessed or slipped
- question_issue: the question itself is the problem (ambiguous, miscalibrated, suspect key)
Then propose concrete, minimal edits to specific wiki files (exact file path, which section, what to add or \
change — write the actual sentence or formula to add). Do not propose edits to question files' answers; \
report suspect questions instead. Reply with ONE JSON object and nothing else."""


def _clip(text: str, n: int) -> str:
    text = text.strip()
    return text if len(text) <= n else text[:n] + " …[cut]"


def build_prompt(analysis: dict, bank: dict[str, RawQuestion], loader: ContentLoader, solution_of,
                 max_concepts: int = 8, max_questions: int = 10) -> str:
    out = [f"STUDENT PROFILE: {analysis['profile']} — {analysis.get('profile_description', '')}",
           f"Exam: {analysis['exam_title']}. Strategy: {analysis['strategy']}. Overall score: {analysis['overall']}."]
    attempts = {(a["session"], a["qid"]): a for a in analysis["attempts"]}
    for s in analysis["stuck"][:max_concepts]:
        out += ["", f"##### STUCK CONCEPT: {s['concept']} (score {s['score']}, {s['misses']} misses)",
                f"Concept page: {s['page_path'] or 'NONE — no page exists'}",
                f"Deterministic signals: {'; '.join(s['signals']) or 'none'}",
                f"Pages read before the misses: {', '.join(s['pages_before_misses']) or 'none'}"]
        if s["page"]:
            out += ["CONCEPT PAGE TEXT:", _clip(scrub(loader.source(s["page"])), 3500)]
        for att in [x for x in s["attempts"] if x["score"] < 0.5][:2]:
            a = attempts.get((att["session"], att["qid"]))
            q = bank.get(att["source_id"])
            if not a or not q:
                continue
            out += [f"-- Missed {q.source_id} ({q.path}), confidence {a['confidence']}",
                    "QUESTION:", _clip(scrub(q.stem + "\n" + "\n".join(p.stem for p in q.parts)), 2000),
                    "STUDENT'S WORKING:", _clip(str(a.get("reasoning") or ""), 2000),
                    f"STUDENT'S ANSWER: {_clip(str(a.get('answer')), 600)}",
                    "OFFICIAL SOLUTION:", _clip(solution_of(q), 2500)]
    qi = [i for i in analysis["question_issues"] if not any("worked example" in w for w in i["why"])]
    if qi:
        out += ["", "##### QUESTIONS THAT LOOK MISCALIBRATED"]
        for i in qi[:max_questions]:
            q = bank.get(i["source_id"])
            if not q:
                continue
            out += [f"-- {q.source_id} ({q.path}): {'; '.join(i['why'])}",
                    "QUESTION:", _clip(scrub(q.stem), 1200), "OFFICIAL SOLUTION:", _clip(solution_of(q), 1200)]
    if analysis["broken_links"]:
        out += ["", "BROKEN LINKS SEEN: " + "; ".join(f"[[{t}]] on {', '.join(v)}"
                                                    for t, v in list(analysis["broken_links"].items())[:20])]
    out += ["", "Reply:", '{"root_causes": [{"concept": "...", "category": "<one of ' + "|".join(CATEGORIES) +
            '>", "evidence": "<one or two sentences quoting the page/working>", "confidence": "low|medium|high"}],',
            ' "question_issues": [{"source_id": "...", "issue": "<one of ' + "|".join(QUESTION_ISSUES) +
            '>", "evidence": "..."}],',
            ' "edits": [{"file": "<vault-relative path>", "section": "<where>", "change": "<the text to add or '
            'the change to make>", "rationale": "<which stuck point it fixes>"}]}']
    return "\n".join(out)


def diagnose(one_shot: OneShot | None, analysis: dict, bank: dict[str, RawQuestion], loader: ContentLoader,
             solution_of, root: str = REPO_ROOT) -> dict | None:
    if one_shot is None or not (analysis["stuck"] or analysis["question_issues"]):
        return None
    prompt = build_prompt(analysis, bank, loader, solution_of)
    for _ in range(2):
        try:
            obj = extract_json(one_shot(SYSTEM, prompt))
        except ValueError:
            continue
        edits = []
        for e in obj.get("edits") or []:
            if not isinstance(e, dict):
                continue
            path = str(e.get("file") or "").strip().lstrip("/")
            e["exists"] = bool(path) and os.path.exists(os.path.join(root, path))
            e["file"] = path
            edits.append(e)
        return {"root_causes": [r for r in obj.get("root_causes") or [] if isinstance(r, dict)],
                "question_issues": [r for r in obj.get("question_issues") or [] if isinstance(r, dict)],
                "edits": edits}
    return None
