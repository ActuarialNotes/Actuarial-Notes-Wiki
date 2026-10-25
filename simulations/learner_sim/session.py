"""The orchestrator: runs a learner through its study sessions.

Trusted code. It holds the question bank (through the grader and the
strategy's tags), the loader and the learner, and is the only place they meet.
Everything it sends the learner is a string built from loader output or a
grader `Feedback`, and goes through the guard.

Memory model: each session is a fresh conversation that starts from the
persona and the learner's notes file. Nothing else carries over, so what the
learner didn't write down is forgotten — the notes are the mental model.
"""

from __future__ import annotations

import json
import os
import random
import time
from dataclasses import dataclass
from typing import Callable

from . import REPO_ROOT
from .auditor import audit_session, deterministic_flags
from .backends import BackendError, ChatSession, IsolationError, OneShot, Usage
from .content_loader import ContentLoader
from .exams import ExamSpec
from .grader import Grader
from .guard import ContextGuard, SolutionIndex
from .learner import ACTIONS, NOTES_WORD_LIMIT, Learner
from .profiles import Profile
from .strategies import PickContext, make_strategy, question_minutes, reading_minutes
from .textmatch import word_count
from .vault_parse import RawQuestion, is_gradable, load_bank


def _answer_text(response) -> str:
    """The words a learner submitted, for timing: a letter, a value, or a written part's text."""
    if isinstance(response, dict):
        return " ".join(str(v) for v in response.values())
    if isinstance(response, list):
        return " ".join(str(v) for v in response)
    return "" if response is None else str(response)


@dataclass
class RunConfig:
    sessions: int = 3
    feedback: str | None = None          # overrides the profile's
    audit: bool = True
    max_cost_usd: float | None = None
    written: bool = True                 # include written (non-MC) questions
    seed: int | None = None


def build_pool(bank: dict[str, RawQuestion], loader: ContentLoader, written: bool = True) -> tuple[dict, dict]:
    """The questions a learner can be served, and why the rest were left out."""
    pool, excluded = {}, {}
    for sid, q in bank.items():
        if not is_gradable(q):
            excluded[sid] = "not gradable"
        elif q.off_syllabus:
            excluded[sid] = "off syllabus"
        elif q.open_critical:
            excluded[sid] = "open critical fact-check finding"
        elif not written and q.type != "multiple-choice":
            excluded[sid] = "written (excluded by --mc-only)"
        elif loader.learner_question(q, "x").has_figure:
            excluded[sid] = "needs a figure the learner can't see"
        else:
            pool[sid] = q
    return pool, excluded


class EventLog:
    def __init__(self, path: str):
        self.path = path
        self.session = 0
        self.step = 0
        self.minutes = 0.0

    def write(self, type_: str, **data) -> dict:
        ev = {"type": type_, "session": self.session, "step": self.step, "t": round(self.minutes, 2),
              "ts": time.time(), **data}
        with open(self.path, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(ev, ensure_ascii=False) + "\n")
        return ev


class SimulationRun:
    def __init__(self, profile: Profile, exam: ExamSpec, out_dir: str, cfg: RunConfig,
                 chat_factory: Callable[[], ChatSession], grading_agent: OneShot | None = None,
                 auditor: OneShot | None = None, loader: ContentLoader | None = None,
                 bank: dict[str, RawQuestion] | None = None, root: str = REPO_ROOT):
        self.profile = profile
        self.exam = exam
        self.cfg = cfg
        self.out_dir = out_dir
        self.chat_factory = chat_factory
        self.auditor = auditor
        self.loader = loader or ContentLoader(exam, root)
        self.bank = bank if bank is not None else load_bank(root, exam.bank)
        self.pool, self.excluded = build_pool(self.bank, self.loader, cfg.written)
        self.feedback_mode = cfg.feedback or profile.feedback
        self.grader = Grader(self.pool, grading_agent, self.feedback_mode)
        self.grading_agent = grading_agent
        self.strategy = make_strategy(profile.study_strategy)
        self.index = SolutionIndex(self.bank.values(), self.loader.allowed_texts().values())
        os.makedirs(os.path.join(out_dir, "notes"), exist_ok=True)
        self.log = EventLog(os.path.join(out_dir, "events.jsonl"))
        self.context_log = os.path.join(out_dir, "context.jsonl")
        self.state_path = os.path.join(out_dir, "state.json")
        self.state = self._load_state()
        self.usage = Usage()
        self.stopped_reason: str | None = None

    # persistent state ------------------------------------------------------

    def _load_state(self) -> dict:
        if os.path.exists(self.state_path):
            with open(self.state_path, encoding="utf-8") as fh:
                return json.load(fh)
        return {"sessions_done": 0, "qids": {}, "attempts": {}, "concepts": {}, "pages_ever": []}

    def _save_state(self) -> None:
        with open(self.state_path, "w", encoding="utf-8") as fh:
            json.dump(self.state, fh, indent=1)

    @property
    def notes_path(self) -> str:
        return os.path.join(self.out_dir, "notes.md")

    def _notes(self) -> str:
        if os.path.exists(self.notes_path):
            with open(self.notes_path, encoding="utf-8") as fh:
                return fh.read()
        return ""

    def _qid(self, sid: str) -> str:
        if sid not in self.state["qids"]:
            self.state["qids"][sid] = f"Q{len(self.state['qids']) + 1}"
        return self.state["qids"][sid]

    def _cost(self) -> float:
        total = self.usage.cost_usd
        for agent in (self.grading_agent, self.auditor):
            if agent is not None and getattr(agent, "usage", None):
                total += agent.usage.cost_usd
        return total

    # the run ---------------------------------------------------------------

    def run(self) -> None:
        self.log.write("run_start", profile=self.profile.name, profile_path=self.profile.path, exam=self.exam.key,
                       exam_title=self.exam.title, strategy=self.strategy.name, feedback=self.feedback_mode,
                       sessions=self.cfg.sessions, pool=len(self.pool), excluded=len(self.excluded),
                       excluded_reasons=_tally(self.excluded.values()))
        start = self.state["sessions_done"] + 1
        for n in range(start, start + self.cfg.sessions):
            if self.stopped_reason:
                break
            self.run_session(n, start + self.cfg.sessions - 1)
        self.log.write("run_end", cost_usd=round(self._cost(), 4), learner_turns=self.usage.turns,
                       grading_calls=self.grader.grading_calls, stopped=self.stopped_reason,
                       near_misses=self._near_misses)

    _near_misses = 0

    def _fold(self, session_usage: Usage) -> None:
        """Add what the current session has used since the last fold."""
        f = self._folded
        self.usage.add(Usage(session_usage.cost_usd - f.cost_usd, session_usage.turns - f.turns,
                             session_usage.input_tokens - f.input_tokens,
                             session_usage.output_tokens - f.output_tokens))
        self._folded = Usage(session_usage.cost_usd, session_usage.turns, session_usage.input_tokens,
                             session_usage.output_tokens)

    def run_session(self, n: int, last: int) -> None:
        p = self.profile
        seed = (self.cfg.seed if self.cfg.seed is not None else p.seed) * 1000 + n
        rng = random.Random(seed)
        self.log.session, self.log.step = n, 0
        notes_at_start = self._notes()
        guard = ContextGuard(self.chat_factory(), self.index, self.context_log)
        for sid in self.state.get("released", []):
            guard.release(sid)
        learner = Learner(guard, p, self.exam.title)
        ctx = PickContext(session=n, rng=rng, pool=self.pool, attempts=self.state["attempts"],
                          pages_ever=set(self.state["pages_ever"]), concept_state=self.state["concepts"])
        show_concepts = self.feedback_mode == "solution"
        self.log.write("session_start", notes_words=word_count(notes_at_start))
        opening = (
            f"Study session {n} of {last} for {self.exam.title}.\n"
            f"Budget for this session: {p.steps_per_session} actions, at most {p.questions_per_session} "
            f"practice questions.\n\n"
            f"Your notes file (your memory of earlier sessions):\n-----\n"
            f"{notes_at_start.strip() or '(empty — this is your first session)'}\n-----\n\n"
            f"{self.strategy.brief(ctx, show_concepts)}\n\nWhat do you do first?"
        )
        self._folded = Usage()
        session_attempts: list[dict] = []
        pending: dict | None = None
        steps = 0
        questions = 0
        wrapup = 0
        try:
            learner.start()
            action = learner.act(opening)
            while True:
                steps += 1
                self.log.step = steps
                obs, done, pending, asked, attempt = self._execute(action, pending, ctx, guard, questions)
                questions += asked
                if attempt:
                    session_attempts.append(attempt)
                if done:
                    break
                self._fold(guard.usage)
                over_cost = self.cfg.max_cost_usd is not None and self._cost() >= self.cfg.max_cost_usd
                if over_cost and not self.stopped_reason:
                    self.stopped_reason = f"cost limit ${self.cfg.max_cost_usd:g} reached"
                if steps >= p.steps_per_session or self.stopped_reason:
                    wrapup += 1
                    if wrapup > 2 or (wrapup > 1 and not pending):
                        break
                    if pending:
                        obs += f"\n\nTime is up. Answer {pending['qid']} now (answer)."
                    else:
                        obs += "\n\nTime is up. Update your notes now (update_notes) — it's your last action."
                else:
                    obs += (f"\n\n[Session {n}: {p.steps_per_session - steps} actions and "
                            f"{max(0, p.questions_per_session - questions)} questions left · "
                            f"{self.log.minutes:.0f} simulated minutes so far]")
                action = learner.act(obs)
        except (BackendError, IsolationError) as e:
            self.log.write("error", kind=type(e).__name__, message=str(e))
            if isinstance(e, IsolationError):
                self.stopped_reason = f"isolation: {e}"
                raise
        finally:
            self._fold(guard.usage)
            self._near_misses += len(guard.near_misses)
            learner.close()
            self.state["released"] = sorted(guard.released)
        notes = self._notes()
        with open(os.path.join(self.out_dir, "notes", f"session-{n}.md"), "w", encoding="utf-8") as fh:
            fh.write(notes)
        self.log.write("session_end", steps=steps, questions=questions, notes_words=word_count(notes))
        self._audit(n, notes_at_start, session_attempts)
        self.state["sessions_done"] = n
        self._save_state()

    def _audit(self, n: int, notes_at_start: str, attempts: list[dict]) -> None:
        if not attempts:
            return
        pages = list(self.state["pages_ever"])
        model = audit_session(self.auditor, self.profile, pages, notes_at_start, attempts) if self.cfg.audit else {}
        for a in attempts:
            det = deterministic_flags(a, set(a.get("pages_ever_at_attempt") or []))
            m = model.get(a["qid"], {})
            self.log.write("audit", qid=a["qid"], source_id=a["source_id"], deterministic=det,
                           model_checked=bool(model), violations=m.get("violations", []),
                           in_character=not det and m.get("in_character", True))

    # actions ---------------------------------------------------------------

    def _execute(self, action, pending, ctx: PickContext, guard: ContextGuard, questions: int):
        p = self.profile
        a = action.args
        log = self.log
        name = action.name
        if name == "invalid":
            log.write("invalid_action", error=a.get("error"))
            return ("Your last reply couldn't be used. Reply with one JSON action.", False, pending, 0, None)

        if name == "end_session":
            log.write("end_session", reflection=str(a.get("reflection") or "")[:4000], pending=bool(pending))
            return ("", True, pending, 0, None)

        if name == "syllabus":
            text = self.loader.syllabus()
            mins = reading_minutes(word_count(text), 0, "full", p)
            log.minutes += mins
            log.write("syllabus", minutes=mins)
            return (text, False, pending, 0, None)

        if name == "search":
            q = str(a.get("query") or "")
            res = self.loader.search(q)
            log.minutes += 0.5
            log.write("search", query=q, results=[t for t, _ in res], during_question=pending and pending["qid"])
            if not res:
                return (f'No study pages match "{q}".', False, pending, 0, None)
            return ("Search results:\n" + "\n".join(f"- {t}: {s}" for t, s in res), False, pending, 0, None)

        if name == "read_page":
            title = str(a.get("title") or "")
            if pending and not p.lookups_during_questions:
                return (f"You're working {pending['qid']} closed-book. Answer it first.", False, pending, 0, None)
            mode = "skim" if str(a.get("mode") or "full").lower() == "skim" else "full"
            forced = False
            if mode == "full" and ctx.rng.random() < p.trait("skim_tendency") * 0.6:
                mode, forced = "skim", True
            page = self.loader.page(title, mode, p.trait("derivation_patience"))
            if page is None:
                log.write("page_missing", requested=title, during_question=pending and pending["qid"])
                return (f'There is no study page called "{title}". (search can help.)', False, pending, 0, None)
            mins = reading_minutes(page.words, page.formulas, page.mode, p)
            log.minutes += mins
            missing = [ln.target for ln in page.links if ln.status == "missing"]
            case = [ln.target for ln in page.links if ln.status == "case"]
            log.write("page_read", title=page.title, kind=page.kind, requested=title, mode=page.mode,
                      forced_skim=forced, words=page.words, formulas=page.formulas, minutes=mins,
                      truncated_derivations=page.truncated_derivations, links_missing=missing,
                      links_case=case, during_question=pending and pending["qid"])
            ctx.pages_this_session.append(page.title)
            if page.title not in self.state["pages_ever"]:
                self.state["pages_ever"].append(page.title)
            ctx.pages_ever.add(page.title)
            if pending:
                pending["pages_during"].append(page.title)
            head = f'Page: {page.title} ({"skimmed" if page.mode == "skim" else "read in full"}, {mins:.1f} min)'
            if forced:
                head += " — you meant to read it properly, but found yourself skimming."
            marks = {"ok": "✓", "case": "✓", "missing": "✗ no such page", "unavailable": "○ not available here"}
            links = " · ".join(f"{ln.target} {marks[ln.status]}" if ln.status in ("missing", "unavailable")
                               else ln.target for ln in page.links)
            body = f"{head}\n\n{page.text}"
            if links:
                body += f"\n\nLinks on this page: {links}"
            return (body, False, pending, 0, None)

        if name == "update_notes":
            notes = str(a.get("notes") or "")
            words = notes.split()
            msg = "Notes saved."
            if len(words) > NOTES_WORD_LIMIT:
                notes = " ".join(words[:NOTES_WORD_LIMIT])
                msg = f"Notes saved, but cut to {NOTES_WORD_LIMIT} words — you ran out of room."
            before = self._notes()
            with open(self.notes_path, "w", encoding="utf-8") as fh:
                fh.write(notes)
            log.minutes += round(len(notes.split()) / 40, 2)
            log.write("notes_updated", words=len(notes.split()), words_before=word_count(before))
            return (msg, False, pending, 0, None)

        if name == "next_question":
            if pending:
                return (f"You still have {pending['qid']} open. Answer it first.", False, pending, 0, None)
            if questions >= p.questions_per_session:
                return ("That's all the practice questions for this session.", False, pending, 0, None)
            focus = str(a.get("focus") or "").strip()
            sid, matched = self.strategy.pick(focus, ctx)
            if sid is None:
                return ("There are no more practice questions available.", False, pending, 0, None)
            qid = self._qid(sid)
            lq = self.loader.learner_question(self.pool[sid], qid)
            text = lq.render()
            pressed = ctx.rng.random() < p.trait("guess_tendency") * 0.5
            if focus and not matched:
                text = f"(No practice question is filed under \"{focus}\"; here is another one.)\n\n" + text
            if pressed:
                text += ("\n\nYou're tired and short on time for this one: give it a quick go and commit — "
                         "a guess is fine.")
            repeat = sid in self.state["attempts"]
            pending = {"sid": sid, "qid": qid, "pages_during": [], "pressed": pressed, "text": lq.render(),
                       "stem_words": word_count(lq.render()), "repeat": repeat,
                       "seen_in_guide": self.loader.guide_overlap(self.pool[sid].stem)}
            log.write("question_served", qid=qid, source_id=sid, focus=focus, matched=matched,
                      pressed_to_guess=pressed, repeat=repeat, kind=lq.kind)
            return (text, False, pending, 1, None)

        if name == "answer":
            if not pending:
                return ("You have no open question. Use next_question.", False, pending, 0, None)
            sid, qid = pending["sid"], pending["qid"]
            response = a.get("answer")
            if response is None or (isinstance(response, str) and not response.strip()):
                # A reply with no answer in it is a protocol slip, not a wrong answer: the
                # question stays open and nothing is graded or released.
                log.write("invalid_answer", qid=qid, source_id=sid)
                return (f'That answer to {qid} had no "answer" field. Put the answer inside "args": '
                        + ACTIONS["answer"].split("  —")[0], False, pending, 0, None)
            try:
                conf = max(0, min(100, int(float(a.get("confidence")))))
            except (TypeError, ValueError):
                conf = None
            answer_text = _answer_text(response)
            mins = question_minutes(pending["stem_words"], word_count(answer_text), p)
            log.minutes += mins
            fb = self.grader.grade(sid, qid, response)
            if fb.solution is not None:
                guard.release(sid)
            sources = a.get("sources") if isinstance(a.get("sources"), list) else []
            attempt = {
                "qid": qid, "source_id": sid, "answer": response, "confidence": conf,
                "sources": [str(s) for s in sources][:30],
                "pages_before": list(ctx.pages_this_session), "pages_during": pending["pages_during"],
                "pages_ever_at_attempt": sorted(ctx.pages_ever), "minutes": mins,
                "pressed_to_guess": pending["pressed"], "repeat": pending["repeat"],
                "seen_in_guide": pending["seen_in_guide"], "question_text": pending["text"],
            }
            log.write("attempt", **{k: v for k, v in attempt.items() if k != "question_text"})
            log.write("graded", qid=qid, source_id=sid, verdict=fb.verdict, score=fb.score, awarded=fb.awarded,
                      points=fb.points, parts=[{"label": r.label, "verdict": r.verdict, "awarded": r.awarded,
                                                "points": r.points, "note": r.note} for r in fb.parts])
            self.state["attempts"].setdefault(sid, []).append({"session": log.session, "score": fb.score})
            for c in self.pool[sid].concepts:
                st = self.state["concepts"].setdefault(c, {"attempts": 0, "score": 0.0})
                st["attempts"] += 1
                st["score"] += fb.score
                if fb.verdict == "correct":
                    st["last_correct_session"] = log.session
                elif fb.verdict in ("incorrect", "partial"):
                    st["last_miss_session"] = log.session
            obs = fb.render()
            obs += "\n\nIf you learned something, put it in your notes."
            return (obs, False, None, 0, attempt)

        if name == "flag_question":
            target = pending or {}
            qid = target.get("qid") or a.get("qid")
            sid = target.get("sid") or next((s for s, q in self.state["qids"].items() if q == qid), None)
            log.write("flag", qid=qid, source_id=sid, reason=str(a.get("reason") or "")[:2000])
            return ("Flag noted.", False, pending, 0, None)

        return (f"Unknown action {name}.", False, pending, 0, None)


def _tally(values) -> dict:
    out: dict = {}
    for v in values:
        out[v] = out.get(v, 0) + 1
    return out
