"""The character auditor: did the learner use knowledge it wasn't supposed to have?

We cannot take knowledge out of a model, so we make its use visible instead.
Two checks run on every attempt:

* deterministic — a `page:` source the learner never opened, or an answer
  with no sources listed at all;
* a separate, isolated model call per session, which reads the profile's
  knowledge boundary, the titles of the pages read, the notes the session
  started from and each attempt's answer with the sources it listed, and names
  any claim that is plausibly from none of them. It never sees the official
  solution, and it never sees the learner's working (there is none to see).

Attempts with a violation are reported as *out of character*: still scored,
but called out, so a guide is not credited with teaching what the model
already knew.
"""

from __future__ import annotations

from .backends import OneShot, extract_json
from .profiles import Profile

AUDIT_SYSTEM = """You audit a role-play. A language model is playing a specific actuarial student and must \
use only (1) the student's stated prior knowledge, (2) the study pages it has read, and (3) its own notes. \
Your job is to catch knowledge it could not have had: a formula, definition, rule of thumb or fact that is \
beyond the stated prior knowledge, does not appear in its notes, and would not plausibly be on any of the \
pages it read (judge from the page titles). Ordinary arithmetic and maths at the student's stated level are \
allowed. Be specific and conservative: flag only clear cases. Reply with ONE JSON object and nothing else."""


def deterministic_flags(attempt: dict, pages_ever: set[str]) -> list[str]:
    flags = []
    for src in attempt.get("sources") or []:
        s = str(src)
        if s.lower().startswith("page:"):
            title = s.split(":", 1)[1].strip()
            if title and title.lower() not in {p.lower() for p in pages_ever}:
                flags.append(f"cites a page it never opened: {title}")
    if not attempt.get("sources"):
        flags.append("no sources listed")
    return flags


def audit_session(one_shot: OneShot | None, profile: Profile, pages_read: list[str], notes_at_start: str,
                  attempts: list[dict]) -> dict[str, dict]:
    """qid → {"in_character": bool, "violations": [{"claim", "why"}]} from the model call."""
    if one_shot is None or not attempts:
        return {}
    prior = "\n".join(f"- {k}: {v}" for k, v in profile.prior_knowledge.items())
    gaps = "\n".join(f"- {g}" for g in profile.gaps) or "- (none)"
    blocks = [
        f"STUDENT: {profile.name}. {profile.description}",
        "STATED PRIOR KNOWLEDGE:", prior or "- (none)",
        "STATED GAPS (things the student does NOT know):", gaps,
        "PAGES READ SO FAR (titles):", ", ".join(pages_read) or "(none)",
        "NOTES AT THE START OF THIS SESSION:", notes_at_start.strip() or "(empty)",
    ]
    for a in attempts:
        blocks += ["", f"=== ATTEMPT {a['qid']} ===", "QUESTION:", a.get("question_text", "")[:3000],
                   "STUDENT'S ANSWER:", str(a.get("answer"))[:4000],
                   "SOURCES THE STUDENT LISTED:", ", ".join(str(s) for s in a.get("sources") or []) or "(none)"]
    blocks += ["", 'Reply: {"attempts": [{"qid": "<id>", "in_character": true|false, '
                   '"violations": [{"claim": "<the knowledge used>", "why": "<why it was out of bounds>"}]}]}']
    for _ in range(2):
        try:
            obj = extract_json(one_shot(AUDIT_SYSTEM, "\n".join(blocks)))
            out = {}
            for item in obj.get("attempts") or []:
                qid = str(item.get("qid"))
                viol = [v for v in (item.get("violations") or []) if isinstance(v, dict)]
                out[qid] = {"in_character": bool(item.get("in_character", not viol)) and not viol,
                            "violations": viol}
            return out
        except (ValueError, AttributeError, TypeError):
            continue
    return {}
