"""A scripted learner policy: exercises the whole pipeline with no model.

Used by the tests and by `run-learner --backend scripted` (a free dry run that
checks plumbing, logging and reports). It reads the syllabus, opens a few
concept pages, writes notes, then asks for questions and answers them — picking
the first option, or writing a stock answer — until the budget runs out.
"""

from __future__ import annotations

import json
import re


class ScriptedPolicy:
    def __init__(self, pages_per_session: int = 3, seed: int = 0):
        self.pages_per_session = pages_per_session
        self.seed = seed
        self.queue: list[str] = []
        self.read = 0
        self.turn = 0

    def __call__(self, transcript: list[str]) -> str:
        last = transcript[-1]
        self.turn += 1
        if last.startswith("Study session"):
            self.read = 0
            return self._act("syllabus", {})
        if "learning objectives" in last and not self.queue:
            for line in last.split("\n"):
                m = re.match(r"^\d+\.\s.*?:\s(.+)$", line)
                if m:
                    self.queue += [t.strip() for t in m.group(1).split(",")][:2]
        if "Time is up" in last:
            m = re.search(r"Answer (Q\d+) now", last)
            if m:
                return self._answer(last)
            return self._act("update_notes", {"notes": f"Notes after turn {self.turn}."})
        if last.startswith("Question Q") or "\nQuestion Q" in last[:200]:
            return self._answer(last)
        if self.queue and self.read < self.pages_per_session:
            self.read += 1
            return self._act("read_page", {"title": self.queue.pop(0), "mode": "full"})
        if last.startswith("Page:"):
            return self._act("update_notes", {"notes": f"Read some pages (turn {self.turn})."})
        if "That's all the practice questions" in last or "no more practice questions" in last:
            return self._act("end_session", {"reflection": "Done for today."})
        return self._act("next_question", {"focus": ""})

    def _answer(self, text: str) -> str:
        m = re.search(r"Answer with one letter: ([A-E])", text)
        if m:
            ans = m.group(1)
        else:
            labels = re.findall(r'"([a-z0-9]+)": ', text)
            ans = {lab: "I would apply the method from the reading." for lab in labels} or \
                "I would apply the method from the reading."
        return self._act("answer", {"answer": ans, "confidence": 40, "sources": ["notes", "page: Syllabus"]})

    def _act(self, name: str, args: dict) -> str:
        return json.dumps({"action": name, "args": args})
