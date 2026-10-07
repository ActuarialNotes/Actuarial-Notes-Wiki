"""`--exam FM` → the exam page, the question bank and the tip folder it means."""

from __future__ import annotations

import os
import re
from dataclasses import dataclass

from vault_links import load_catalog

from . import REPO_ROOT


@dataclass(frozen=True)
class ExamSpec:
    key: str            # progress key: P, FM, MAS-I, CAS-5 …
    title: str          # the exam page's name, e.g. "Exam FM-2 (SOA)"
    page: str           # vault-relative exam page
    bank: str           # questions/<bank>
    wiki_id: str
    body: str           # SOA | CAS
    guides_dir: str | None


def _norm(s: str) -> str:
    s = s.strip().upper().replace("_", "-")
    s = re.sub(r"^EXAM[\s-]*", "", s)
    s = re.sub(r"\s+", "-", s)
    return s


def resolve_exam(key: str, root: str = REPO_ROOT) -> ExamSpec:
    want = _norm(key)
    for e in load_catalog():
        if not e.get("bank"):
            continue
        keys = {_norm(e["progress_key"]), _norm(e["exam_id"]), _norm(e["wiki_id"]), _norm(e["bank"]),
                _norm(e["page"][:-3]), _norm(e["body"] + "-" + e["exam_id"])}
        keys |= {k.replace("CAS-", "") for k in keys}
        if want in keys:
            title = e["page"][:-3]
            guides = os.path.join("Guides", title)
            return ExamSpec(
                key=e["progress_key"], title=title, page=e["page"], bank=e["bank"], wiki_id=e["wiki_id"],
                body=e["body"], guides_dir=guides if os.path.isdir(os.path.join(root, guides)) else None,
            )
    known = ", ".join(e["progress_key"] for e in load_catalog() if e.get("bank"))
    raise SystemExit(f"Unknown exam {key!r}. Exams with a question bank: {known}")
