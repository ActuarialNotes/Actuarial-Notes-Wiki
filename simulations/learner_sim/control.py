"""The control learner: the same student, before studying.

The auditor can only catch knowledge the learner shows it used, and with no
working recorded a multiple-choice answer shows almost nothing. So instead of
policing the learner we measure the guide: after a run, every question the
learner attempted is put to a fresh learner with the same persona and prior
knowledge but no study pages and no notes (`build_control_persona`). What the
control gets right, the model knew without the guide; the difference between
the two scores is what studying added (analysis.py, "What studying added").

The control runs in one conversation through its own context guard, with
nothing released: it is never told how it did, so it learns nothing from one
question to the next, and no solution text can reach it. Its answers are
marked by the run's grader and written to `control.jsonl`; its messages to
`control-context.jsonl`.
"""

from __future__ import annotations

import os
import random
from typing import Callable

from .analysis import CONTROL_LOG, read_events
from .backends import ChatSession, Usage
from .guard import ContextGuard
from .learner import Learner
from .session import EventLog, SimulationRun

CONTROL_CONTEXT = "control-context.jsonl"


def control_questions(run: SimulationRun, sample: int | None = None, seed: int = 0) -> list[str]:
    """The learner's attempted questions the control hasn't answered yet, at most
    `sample` answered in all, chosen reproducibly."""
    path = os.path.join(run.out_dir, CONTROL_LOG)
    done = {e["source_id"] for e in read_events(path) if e["type"] == "control_attempt"} \
        if os.path.exists(path) else set()
    todo = sorted(sid for sid in run.state["attempts"] if sid in run.pool and sid not in done)
    if sample is not None:
        room = max(0, sample - len(done))
        if len(todo) > room:
            todo = sorted(random.Random(seed).sample(todo, room))
    return todo


def run_control(run: SimulationRun, chat_factory: Callable[[], ChatSession], sample: int | None = None) -> int:
    """Put the learner's questions to the control learner; returns how many were asked.
    The run's `max_cost_usd` covers the control too; a stopped control resumes on a continued run."""
    seed = run.cfg.seed if run.cfg.seed is not None else run.profile.seed
    todo = control_questions(run, sample, seed)
    if not todo:
        return 0
    log = EventLog(os.path.join(run.out_dir, CONTROL_LOG))
    guard = ContextGuard(chat_factory(), run.index, os.path.join(run.out_dir, CONTROL_CONTEXT))
    learner = Learner(guard, run.profile, run.exam.title, control=True)
    agent = run.grading_agent
    grading_before = agent.usage.cost_usd if agent is not None and getattr(agent, "usage", None) else 0.0
    usage = Usage()
    log.write("control_start", questions=len(todo))
    try:
        learner.start()
        lead = (f"Practice questions for {run.exam.title}, closed book. Answer each as you would on the day; "
                "you won't be told how you did.")
        for i, sid in enumerate(todo):
            limit = run.cfg.max_cost_usd
            if limit is not None and run._cost() + guard.usage.cost_usd >= limit:
                log.write("control_stopped", reason=f"cost limit ${limit:g} reached", asked=i)
                return i
            qid = run.state["qids"].get(sid) or f"C{i + 1}"
            text = run.loader.learner_question(run.pool[sid], qid).render()
            action = learner.act((lead if i == 0 else "Recorded. Next question.") + "\n\n" + text)
            if action.name != "answer":
                action = learner.act(f"Answer {qid} with the answer action.")
            a = action.args if action.name == "answer" else {}
            try:
                conf = max(0, min(100, int(float(a.get("confidence")))))
            except (TypeError, ValueError):
                conf = None
            sources = a.get("sources") if isinstance(a.get("sources"), list) else []
            fb = run.grader.grade(sid, qid, a.get("answer"))
            log.write("control_attempt", qid=qid, source_id=sid, answered=action.name == "answer",
                      answer=a.get("answer"), confidence=conf, sources=[str(s) for s in sources][:30],
                      verdict=fb.verdict, score=fb.score)
    finally:
        usage.add(guard.usage)
        learner.close()
        grading = (agent.usage.cost_usd if agent is not None and getattr(agent, "usage", None) else 0.0) \
            - grading_before
        log.write("control_end", cost_usd=round(usage.cost_usd + grading, 4), turns=usage.turns,
                  near_misses=len(guard.near_misses))
    return len(todo)
