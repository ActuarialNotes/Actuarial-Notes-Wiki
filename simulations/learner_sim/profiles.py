"""Learner profiles: who the simulated student is (YAML, `simulations/profiles/`)."""

from __future__ import annotations

import os
from dataclasses import dataclass, field

import yaml

STRATEGIES = ("read-then-practice", "practice-first", "spaced-review", "self-directed")
TRAIT_DEFAULTS = {
    "reading_thoroughness": 0.6,   # 0 = glances, 1 = reads every line and opens every example
    "skim_tendency": 0.3,          # chance a requested full read turns into a skim
    "derivation_patience": 0.6,    # how much of a long derivation gets followed
    "math_anxiety": 0.3,           # slows maths-heavy reading, colours the persona
    "guess_tendency": 0.2,         # chance of being pressed to commit without working it out
    "confidence_bias": 0.0,        # -1 underconfident … +1 overconfident (persona only)
}


@dataclass
class Profile:
    name: str
    exam: str
    description: str = ""
    prior_knowledge: dict = field(default_factory=dict)
    gaps: list[str] = field(default_factory=list)
    traits: dict = field(default_factory=dict)
    study_strategy: str = "read-then-practice"
    steps_per_session: int = 40
    questions_per_session: int = 8
    reading_speed_wpm: int = 200
    lookups_during_questions: bool = True
    feedback: str = "solution"
    seed: int = 0
    path: str = ""

    @property
    def mastered(self) -> list[str]:
        return [str(x) for x in (self.prior_knowledge.get("mastered_concepts") or [])]

    def trait(self, name: str) -> float:
        return float(self.traits.get(name, TRAIT_DEFAULTS[name]))

    @property
    def slug(self) -> str:
        return os.path.splitext(os.path.basename(self.path))[0] if self.path else self.name.lower().replace(" ", "-")


class ProfileError(ValueError):
    pass


def load_profile(path: str) -> Profile:
    with open(path, encoding="utf-8") as fh:
        data = yaml.safe_load(fh) or {}
    return profile_from_dict(data, path)


def profile_from_dict(data: dict, path: str = "") -> Profile:
    if not isinstance(data, dict):
        raise ProfileError(f"{path}: a profile is a mapping")
    for key in ("name", "exam"):
        if not data.get(key):
            raise ProfileError(f"{path}: `{key}` is required")
    traits = dict(TRAIT_DEFAULTS)
    for k, v in (data.get("traits") or {}).items():
        if k in ("reading_speed_wpm", "lookups_during_questions"):
            continue
        if k not in TRAIT_DEFAULTS:
            raise ProfileError(f"{path}: unknown trait `{k}` (known: {', '.join(TRAIT_DEFAULTS)})")
        lo = -1.0 if k == "confidence_bias" else 0.0
        if not isinstance(v, (int, float)) or not lo <= float(v) <= 1.0:
            raise ProfileError(f"{path}: trait `{k}` must be a number in [{lo:g}, 1]")
        traits[k] = float(v)
    raw_traits = data.get("traits") or {}
    strategy = data.get("study_strategy", "read-then-practice")
    if strategy not in STRATEGIES:
        raise ProfileError(f"{path}: study_strategy must be one of {', '.join(STRATEGIES)}")
    budget = data.get("time_budget") or {}
    feedback = data.get("feedback", "solution")
    if feedback not in ("score", "solution"):
        raise ProfileError(f"{path}: feedback must be `score` or `solution`")
    prior = data.get("prior_knowledge") or {}
    if not isinstance(prior, dict):
        raise ProfileError(f"{path}: prior_knowledge is a mapping")
    return Profile(
        name=str(data["name"]),
        exam=str(data["exam"]),
        description=str(data.get("description") or "").strip(),
        prior_knowledge=prior,
        gaps=[str(g) for g in (data.get("gaps") or [])],
        traits=traits,
        study_strategy=strategy,
        steps_per_session=int(budget.get("steps_per_session", 40)),
        questions_per_session=int(budget.get("questions_per_session", 8)),
        reading_speed_wpm=int(raw_traits.get("reading_speed_wpm", data.get("reading_speed_wpm", 200))),
        lookups_during_questions=bool(raw_traits.get("lookups_during_questions",
                                                     data.get("lookups_during_questions", True))),
        feedback=feedback,
        seed=int(data.get("seed", 0)),
        path=path,
    )
