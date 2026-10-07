"""Study strategies and the simulated clock.

A strategy does two things: it briefs the learner at the start of a session
(what its plan is), and — orchestrator-side, where the question tags live —
it chooses which question to serve when the learner asks for one. The learner
can name a focus ("a question on Force of Interest"); the strategy honours it
when the bank has one, without ever showing the learner the tags.
"""

from __future__ import annotations

import random
from dataclasses import dataclass, field

from vault_links import normalize_term

from .profiles import Profile
from .vault_parse import RawQuestion

DIFFICULTY_RANK = {"easy": 0, "medium": 1, "hard": 2}


# ── the simulated clock ────────────────────────────────────────────────────

def reading_minutes(words: int, formulas: int, mode: str, p: Profile) -> float:
    base = words / max(60, p.reading_speed_wpm)
    if mode == "full":
        base *= 0.7 + 0.6 * p.trait("reading_thoroughness")
    per_formula = (0.15 if mode == "skim" else 0.4) * (1 + p.trait("math_anxiety"))
    return round(base + formulas * per_formula, 2)


def question_minutes(stem_words: int, reasoning_words: int, p: Profile) -> float:
    return round(stem_words / max(60, p.reading_speed_wpm) * 1.5 + reasoning_words / 15, 2)


# ── question choice ────────────────────────────────────────────────────────

@dataclass
class PickContext:
    session: int
    rng: random.Random
    pool: dict[str, RawQuestion]
    attempts: dict[str, list[dict]]                 # source id → [{session, score}]
    pages_this_session: list[str] = field(default_factory=list)
    pages_ever: set[str] = field(default_factory=set)
    concept_state: dict[str, dict] = field(default_factory=dict)


def _match(q: RawQuestion, focus: str) -> int:
    f = normalize_term(focus)
    if not f:
        return 0
    concepts = [normalize_term(c) for c in q.concepts]
    if f in concepts:
        return 3
    if any(f in c or (len(c) > 3 and c in f) for c in concepts) or f == normalize_term(q.topic):
        return 2
    if f in normalize_term(q.topic) or f in normalize_term(q.objective):
        return 1
    return 0


def _weighted_choice(ids: list[str], ctx: PickContext) -> str:
    if ctx.session == 1:
        w = [3 - DIFFICULTY_RANK.get(ctx.pool[i].difficulty, 1) for i in ids]
    else:
        w = [1] * len(ids)
    return ctx.rng.choices(ids, weights=w, k=1)[0]


def _fresh(ctx: PickContext) -> list[str]:
    return sorted(i for i in ctx.pool if i not in ctx.attempts)


def _due_concepts(ctx: PickContext) -> list[str]:
    due = []
    for c, st in ctx.concept_state.items():
        if st.get("last_miss_session") is not None and st["last_miss_session"] < ctx.session \
                and (st.get("last_correct_session") or 0) <= st["last_miss_session"]:
            due.append(c)
    return sorted(due)


class Strategy:
    name = "self-directed"
    brief_text = ("Study however you think best: read, look things up, and practise when you feel ready. "
                  "Keep your notes up to date.")

    def brief(self, ctx: PickContext, show_concepts: bool) -> str:
        return self.brief_text

    def default_candidates(self, ctx: PickContext) -> list[str]:
        return _fresh(ctx)

    def pick(self, focus: str, ctx: PickContext) -> tuple[str | None, bool]:
        """(source id, whether it matched the requested focus)."""
        fresh = _fresh(ctx)
        if focus:
            scored = [(i, _match(ctx.pool[i], focus)) for i in fresh]
            best = max((s for _, s in scored), default=0)
            if best > 0:
                return _weighted_choice([i for i, s in scored if s == best], ctx), True
        cands = self.default_candidates(ctx) or fresh
        if not cands:
            missed = [i for i, a in ctx.attempts.items() if a and a[-1]["score"] < 1]
            cands = missed or list(ctx.pool)
        return (_weighted_choice(sorted(cands), ctx) if cands else None), False


class ReadThenPractice(Strategy):
    name = "read-then-practice"
    brief_text = ("Your plan: work through the syllabus in order, picking up where your notes say you left "
                  "off. For each learning objective, read its key concept pages, write what you learned into "
                  "your notes, then practise questions on what you just read (ask for them by concept). "
                  "Move on when you're getting them right.")

    def default_candidates(self, ctx: PickContext) -> list[str]:
        fresh = _fresh(ctx)
        recent = {normalize_term(t) for t in ctx.pages_this_session}
        hit = [i for i in fresh if any(normalize_term(c) in recent for c in ctx.pool[i].concepts)]
        if hit:
            return hit
        ever = {normalize_term(t) for t in ctx.pages_ever}
        return [i for i in fresh if any(normalize_term(c) in ever for c in ctx.pool[i].concepts)]


class PracticeFirst(Strategy):
    name = "practice-first"
    brief_text = ("Your plan: learn by doing. Start with practice questions straight away; when you miss one, "
                  "read the pages that would have helped, fix your notes, and keep going.")


class SpacedReview(Strategy):
    name = "spaced-review"
    brief_text = ("Your plan: begin each session by re-testing what you got wrong before, then read new "
                  "material and practise it. Keep a short 'to review' list at the top of your notes.")

    def brief(self, ctx: PickContext, show_concepts: bool) -> str:
        due = _due_concepts(ctx)
        if not due:
            return self.brief_text
        if show_concepts:
            return self.brief_text + "\nDue for review today: " + ", ".join(due[:12]) + "."
        return self.brief_text + "\nSome questions you missed before will come back today."

    def default_candidates(self, ctx: PickContext) -> list[str]:
        due = {normalize_term(c) for c in _due_concepts(ctx)}
        if not due:
            return []
        fresh = [i for i in _fresh(ctx) if any(normalize_term(c) in due for c in ctx.pool[i].concepts)]
        if fresh:
            return fresh
        return [i for i, a in ctx.attempts.items()
                if a and a[-1]["score"] < 1 and a[-1]["session"] < ctx.session
                and any(normalize_term(c) in due for c in ctx.pool[i].concepts)]

    def pick(self, focus: str, ctx: PickContext) -> tuple[str | None, bool]:
        if not focus:
            cands = self.default_candidates(ctx)
            if cands:
                return _weighted_choice(sorted(cands), ctx), False
        return super().pick(focus, ctx)


STRATEGY_CLASSES = {c.name: c for c in (Strategy, ReadThenPractice, PracticeFirst, SpacedReview)}


def make_strategy(name: str) -> Strategy:
    return STRATEGY_CLASSES[name]()
