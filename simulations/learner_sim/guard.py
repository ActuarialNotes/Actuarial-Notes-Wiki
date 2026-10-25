"""The context guard: the one door between the simulation and the learner model.

Every byte the learner model receives — its system prompt and every message —
goes through `ContextGuard`, which

1. records it (`context.jsonl`, so a run can be audited after the fact), and
2. refuses to send it (`IsolationError`) if it carries the solution of a
   question whose solution has not been *released* — released means the
   learner has committed an answer to that question and the feedback mode
   shows solutions.

Recognising solution text: every question's solution is fingerprinted as
8-word shingles (`textmatch.shingles`, robust to LaTeX, punctuation and line
breaks). Shingles that also occur in any question stem or on any page the
learner may read are dropped first — an explanation that restates its stem, or
a worked example lifted onto a concept page, is not a leak — and so is a
shingle that is a public 7-word run plus one word (a stem's last sentence
followed by whatever the next block starts with). A message trips the
guard when it contains `threshold` or more shingles belonging only to
unreleased solutions of one question; isolated coincidences are logged as
near-misses but let through.
"""

from __future__ import annotations

import json
import time
from collections import defaultdict
from typing import Iterable

from .backends import ChatSession, IsolationError
from .learner import trim_reply
from .textmatch import shingles
from .vault_parse import RawQuestion


class SolutionIndex:
    def __init__(self, questions: Iterable[RawQuestion], public_texts: Iterable[str], n: int = 8):
        self.n = n
        questions = list(questions)
        public: set[tuple[str, ...]] = set()
        texts = list(public_texts) + [t for q in questions for t in q.stem_texts()]
        for t in texts:
            public |= shingles(t, n - 1)
        self.owners: dict[tuple[str, ...], set[str]] = defaultdict(set)
        for q in questions:
            for t in q.solution_texts():
                for sh in shingles(t, n):
                    if sh[:-1] in public or sh[1:] in public:
                        continue
                    self.owners[sh].add(q.source_id)

    def hits(self, text: str, released: set[str]) -> dict[str, int]:
        """Unreleased question id → how many of its solution shingles `text` carries."""
        out: dict[str, int] = defaultdict(int)
        for sh in shingles(text, self.n):
            owners = self.owners.get(sh)
            if owners and not (owners & released):
                for sid in owners:
                    out[sid] += 1
        return dict(out)


class ContextGuard:
    def __init__(self, backend: ChatSession, index: SolutionIndex, log_path: str | None = None,
                 threshold: int = 3):
        self.backend = backend
        self.index = index
        self.log_path = log_path
        self.threshold = threshold
        self.released: set[str] = set()
        self.near_misses: list[dict] = []

    @property
    def usage(self):
        return self.backend.usage

    def release(self, source_id: str) -> None:
        self.released.add(source_id)

    def check(self, text: str, role: str) -> None:
        hits = self.index.hits(text, self.released)
        bad = {sid: n for sid, n in hits.items() if n >= self.threshold}
        if bad:
            self._log(role, text, blocked=bad)
            raise IsolationError(f"blocked a {role} message carrying unreleased solution text of {sorted(bad)}")
        if hits:
            self.near_misses.append({"role": role, "hits": hits})

    def _log(self, role: str, text: str, **extra) -> None:
        if not self.log_path:
            return
        with open(self.log_path, "a", encoding="utf-8") as fh:
            fh.write(json.dumps({"ts": time.time(), "role": role, "text": text,
                                 "released": sorted(self.released), **extra}) + "\n")

    def start(self, system_prompt: str) -> None:
        self.check(system_prompt, "system")
        self._log("system", system_prompt)
        self.backend.start(system_prompt)

    def send(self, text: str) -> str:
        self.check(text, "user")
        self._log("user", text)
        reply = self.backend.send(text)
        self._log("assistant", trim_reply(reply))
        return reply

    def close(self) -> None:
        self.backend.close()
