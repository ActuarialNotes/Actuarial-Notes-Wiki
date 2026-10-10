#!/usr/bin/env python3
"""Audit a batch of written questions for what bulk authoring drifts on.

The schema (required keys, answer key among the options, orphan links) is
`scripts/validate_content.py`'s job and the render rules are
`scripts/question_lint.py`'s; this covers what neither can see because it is
about the *set* and about pedagogy:

* `bloom:` missing or not one of the six levels;
* the id not matching the filename, or a vault id (`-an-`) carrying a sitting;
* the concept under test (`topic`) not first in `wiki_link`;
* a multiple-choice key that is conspicuously the longest option;
* a bare `$` before a digit (currency swallowed into math);
* no "why not" feedback — a multiple-choice explanation that never names a
  wrong option in bold, a free-entry one that names no likely wrong entry;
* a `[[wiki link]]`, which question markdown shows as raw brackets;
and, as a report: the Bloom-level and format spread across the batch, per
concept, and the spread of answer letters.

Only vault-written questions (`-an-` ids) are audited unless `--all` is given.

    python3 .claude/skills/question-writer/scripts/audit_questions.py questions/exam-mas-i
    python3 .claude/skills/question-writer/scripts/audit_questions.py --all questions/exam-p/p-901.md
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

BLOOM = ["remember", "understand", "apply", "analyze", "evaluate", "create"]
VAULT_ID_RE = re.compile(r"^[a-z0-9]+-an-\d+$")
OPTION_RE = re.compile(r"^- ([A-E])\)\s+(.+)$", re.M)
PART_RE = re.compile(r"^## Part ([a-h])\b", re.M)
BARE_DOLLAR_RE = re.compile(r"(?<![\\$])\$(?=\d)")
FM_RE = re.compile(r"^---\n(.*?)\n---\n", re.S)


def frontmatter(text: str) -> tuple[dict, str]:
    m = FM_RE.match(text)
    if not m:
        return {}, text
    data: dict = {}
    key = None
    for line in m.group(1).splitlines():
        item = re.match(r"^\s+-\s+(.*)$", line)
        if item and key:
            data.setdefault(key, [])
            if isinstance(data[key], list):
                data[key].append(item.group(1).strip().strip('"'))
            continue
        kv = re.match(r"^([A-Za-z_]+):\s*(.*)$", line)
        if kv:
            key = kv.group(1)
            value = kv.group(2).strip().strip('"')
            data[key] = value if value else []
    return data, text[m.end():]


def question_format(qtype: str, body: str) -> str:
    """The format the question is written in, read off its shape."""
    if qtype == "multiple-choice":
        options = [t.strip() for _, t in OPTION_RE.findall(body)]
        if [o.lower() for o in options] == ["true", "false"]:
            return "true-false"
        if re.search(r"^- I+\.", body, re.M):
            return "multiple-true-false"
        if options and all(re.match(r"^(less than|at least)", o, re.I) for o in options):
            return "numeric-ranges"
        return "single-best-answer"
    if qtype == "free-entry":
        if re.search(r"^- \([A-F]\)", body, re.M):
            return "ordering"
        return "short-answer"
    if qtype == "multi-part":
        parts = re.split(PART_RE, body)
        blocks = parts[2::2] if len(parts) > 1 else [body]
        if all("### Answer" not in b for b in blocks):
            return "written"
        option_sets = {tuple(t for _, t in OPTION_RE.findall(b)) for b in blocks}
        if len(blocks) > 1 and len(option_sets) == 1 and next(iter(option_sets)):
            return "matching"
        return "multi-step"
    return qtype or "?"


def explanation_of(qtype: str, body: str) -> str:
    if qtype == "multi-part":
        return "\n".join(re.findall(r"^### Explanation\s*\n(.*?)(?=^## |^### |\Z)", body, re.M | re.S))
    parts = re.split(r"^## Explanation\s*$", body, flags=re.M)
    return parts[1] if len(parts) > 1 else ""


def audit_file(path: Path) -> tuple[dict | None, list[str]]:
    text = path.read_text(encoding="utf-8")
    data, body = frontmatter(text)
    qid = str(data.get("id", ""))
    issues: list[str] = []
    if not data:
        return None, ["no frontmatter"]

    bloom = str(data.get("bloom", "")).lower()
    if bloom not in BLOOM:
        issues.append(f"bloom '{bloom or '(missing)'}' is not one of {', '.join(BLOOM)}")
    if VAULT_ID_RE.match(path.stem) and qid != path.stem:
        issues.append(f"id '{qid}' does not match the filename")
    if VAULT_ID_RE.match(qid) and (data.get("year") or data.get("session")):
        issues.append("a vault question names a sitting (year/session)")

    links = data.get("wiki_link") or []
    links = links if isinstance(links, list) else [links]
    topic = str(data.get("topic", ""))
    if links and links[0] != "Concepts/" + topic.replace(" ", "+"):
        issues.append(f"wiki_link should lead with the concept under test (Concepts/{topic.replace(' ', '+')})")

    qtype = str(data.get("type", ""))
    fmt = question_format(qtype, body)
    explanation = explanation_of(qtype, body)

    if qtype == "multiple-choice":
        stem_and_options = re.split(r"^## Explanation\s*$", body, flags=re.M)[0]
        options = dict(OPTION_RE.findall(stem_and_options))
        key = str(data.get("answer", ""))
        if key in options and len(options) > 2 and fmt != "multiple-true-false":
            lengths = {k: len(v.split()) for k, v in options.items()}
            others = [n for k, n in lengths.items() if k != key]
            if lengths[key] > max(others) and lengths[key] - max(others) >= 4:
                issues.append(f"the key ({key}) is the longest option by {lengths[key] - max(others)} words")
        wrong = [k for k in options if k != key]
        unnamed = [k for k in wrong if not re.search(rf"\*\*{k}\*\*|\({k}\)", explanation)]
        if fmt not in ("true-false",) and unnamed:
            issues.append(f"explanation never says why {', '.join(unnamed)} is wrong")
    elif qtype == "free-entry":
        if not re.search(r"wrong|mistake|instead|not ", explanation, re.I):
            issues.append("explanation names no likely wrong entry")

    for line_no, line in enumerate(text.splitlines(), 1):
        if BARE_DOLLAR_RE.search(line) and not line.startswith(("  ", "content_hash")):
            issues.append(f"line {line_no}: '$' before a digit — escape currency as \\$, don't open math on a digit")
            break

    if "[[" in body:
        issues.append("[[wiki link]] in the question — question markdown renders it as raw brackets")

    record = {
        "id": qid,
        "topic": topic,
        "bloom": bloom,
        "format": fmt,
        "answer": str(data.get("answer", "")) if qtype == "multiple-choice" else "",
    }
    return record, issues


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("paths", nargs="+")
    ap.add_argument("--all", action="store_true", help="audit every question, not only -an- ids")
    args = ap.parse_args()

    files: list[Path] = []
    for p in map(Path, args.paths):
        files += sorted(p.glob("*.md")) if p.is_dir() else [p]

    records, problems = [], 0
    for path in files:
        if not args.all and not VAULT_ID_RE.match(path.stem):
            continue
        record, issues = audit_file(path)
        for issue in issues:
            print(f"{path}: {issue}")
        problems += len(issues)
        if record:
            records.append(record)

    if not records:
        print("no questions audited")
        return 0

    n = len(records)
    print(f"\n{n} questions, {problems} issue(s)\n")
    levels = Counter(r["bloom"] for r in records)
    print("Bloom level   " + "  ".join(f"{b}: {levels.get(b, 0)} ({levels.get(b, 0) / n:.0%})" for b in BLOOM))
    formats = Counter(r["format"] for r in records)
    print("Formats       " + "  ".join(f"{f}: {c}" for f, c in formats.most_common()))
    letters = Counter(r["answer"] for r in records if r["answer"])
    if letters:
        print("MC keys       " + "  ".join(f"{k}: {letters[k]}" for k in sorted(letters)))

    by_topic: dict[str, list[dict]] = defaultdict(list)
    for r in records:
        by_topic[r["topic"]].append(r)
    flat = [t for t, rs in by_topic.items() if len(rs) > 1 and len({r["bloom"] for r in rs}) == 1]
    same_format = [t for t, rs in by_topic.items() if len(rs) > 1 and len({r["format"] for r in rs}) == 1]
    if flat:
        print("\nConcepts tested at one level only: " + "; ".join(flat))
    if same_format:
        print("Concepts tested in one format only: " + "; ".join(same_format))
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
