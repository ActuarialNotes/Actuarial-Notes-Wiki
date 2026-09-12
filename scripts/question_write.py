#!/usr/bin/env python3
"""
question_write.py — assemble question-bank markdown from extraction records.

Stage 3 of the pipeline in `docs/pdf-question-pipeline.md`. Given a record from
`pdf_extract.py` and a judgment from `question_classify.py`, this writes the
`questions/<bank>/<id>.md` file: frontmatter in the bank's canonical key order,
the prompt, the lettered options, and the explanation — every byte of it either
copied from the PDF or looked up, never retyped by a model.

The `verification:` block is deliberately *not* written. It is derived state
that `python3 scripts/verify_check.py --sync` owns (see `docs/verification.md`),
and it backfills a new file on the next run.

Two things may be supplied per question by dropping `<id>.md` into a directory:

* `--explanations` — a rewritten walkthrough, for a publisher solution too
  terse or too OCR-mangled to read as one. This is the one part of a question
  file genuinely worth a model's attention.
* `--prompts` — the prompt for a question whose booklet page is a scan with no
  text layer (`needs_vision` in the record). Transcribe the rendered page from
  `<out>/pages/`, save it here, and the file assembles like any other.

Usage
-----
    python3 scripts/question_write.py --records /tmp/build/records.jsonl \\
        --judgments /tmp/build/judgments.jsonl --explanations /tmp/build/expl \\
        --only 1-25 --dry-run
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mdmath  # noqa: E402
from validate_content import EXAM_LABEL_BY_DIR  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parent.parent

# Frontmatter key order, matching the files already in the bank.
KEY_ORDER = [
    "id", "exam", "topic", "learning_objective", "difficulty", "type",
    "year", "session", "wiki_link", "answer", "points",
]
QUOTED_KEYS = {"id", "exam", "topic", "learning_objective", "answer"}


def _num(value) -> str:
    """Render a point value the way the bank does: 2.5 stays, 2.0 becomes 2."""
    number = float(value)
    return str(int(number)) if number == int(number) else str(number)


def _scalar(key: str, value) -> str:
    if key in QUOTED_KEYS:
        escaped = str(value).replace("\\", "\\\\").replace('"', '\\"')
        return f'"{escaped}"'
    if key == "points":
        return _num(value)
    return str(value)


def frontmatter(record: dict, judgment: dict) -> str:
    """The YAML block, in canonical key order, omitting what does not apply."""
    bank = record["bank"]
    values: dict[str, object] = {
        "id": record["id"],
        "exam": EXAM_LABEL_BY_DIR.get(bank, bank),
        "topic": judgment.get("topic", ""),
        "learning_objective": judgment.get("learning_objective", ""),
        "difficulty": judgment.get("difficulty", "medium"),
        "type": record["type"],
        "year": record.get("year"),
        "session": record.get("session"),
        "wiki_link": judgment.get("wiki_link") or [],
        "answer": record.get("answer"),
        "points": record.get("points") if record.get("points") is not None else 1,
    }

    lines = ["---"]
    for key in KEY_ORDER:
        value = values.get(key)
        if value is None or value == "" or value == []:
            continue
        if key == "wiki_link":
            lines.append("wiki_link:")
            lines += [f"  - {link}" for link in value]
            continue
        lines.append(f"{key}: {_scalar(key, value)}")
    lines.append("---")
    return "\n".join(lines)


def options_block(options: dict[str, str]) -> str:
    return "\n".join(f"- {letter}) {options[letter]}" for letter in sorted(options))


def part_sections(record: dict, explanation: str | None) -> str:
    """`## Part a (…)` sections for a CAS multi-part question."""
    out: list[str] = []
    for part in record.get("parts") or []:
        label = part["label"]
        header = f"## Part {label}"
        if part.get("points") is not None:
            header += f" ({_num(part['points'])} points)"
        out.append(header)

        if part.get("prompt"):
            out.append(part["prompt"].strip())
        if part.get("answer"):
            out.append("### Answer\n" + str(part["answer"]).strip())

        samples = part.get("samples") or []
        body = (explanation or "").strip() if len(record.get("parts") or []) == 1 else ""
        if not body:
            body = samples[0].strip() if samples else ""
        if body:
            out.append("### Explanation\n" + body)
            if len(samples) > 1 and samples[1].strip():
                out.append("Alternatively:\n\n" + samples[1].strip())
        if part.get("report"):
            out.append("### Examiner Report\n" + part["report"].strip())
    return "\n\n".join(out)


def render(record: dict, judgment: dict, explanation: str | None = None) -> str:
    """The complete markdown file for one question."""
    chunks = [frontmatter(record, judgment), ""]

    body = (record.get("body") or "").strip()
    if body:
        chunks.append(body)

    if record["type"] == "multi-part":
        # The record also carries the report's *overall* commentary, which the
        # bank's format has no slot for — every `### Examiner Report` in a
        # question file is per-part. It stays in records.jsonl rather than
        # being written into a section the app does not render.
        sections = part_sections(record, explanation)
        if sections:
            chunks.append(sections)
    else:
        if record.get("options"):
            chunks.append(options_block(record["options"]))
        text = (explanation if explanation is not None else record.get("solution") or "").strip()
        chunks.append("## Explanation\n\n" + text if text else "## Explanation")

    return mdmath.normalize_markdown("\n\n".join(chunks))


def missing_explanation(record: dict, explanation: str | None) -> bool:
    """True when the file would land with nothing under its explanation heading."""
    if explanation and explanation.strip():
        return False
    if record["type"] == "multi-part":
        return not any(part.get("samples") for part in record.get("parts") or [])
    return not (record.get("solution") or "").strip()


# ─── CLI ──────────────────────────────────────────────────────────────────────


def _load(path: str | None) -> list[dict]:
    if not path:
        return []
    with open(path, encoding="utf-8") as fh:
        return [json.loads(line) for line in fh if line.strip()]


def _parse_only(spec: str | None) -> set[int] | None:
    if not spec:
        return None
    wanted: set[int] = set()
    for piece in spec.split(","):
        piece = piece.strip()
        if "-" in piece:
            lo, hi = piece.split("-", 1)
            wanted |= set(range(int(lo), int(hi) + 1))
        elif piece:
            wanted.add(int(piece))
    return wanted


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    ap.add_argument("--records", required=True)
    ap.add_argument("--judgments", help="judgments.jsonl from question_classify.py")
    ap.add_argument("--explanations", help="directory of per-id explanation overrides")
    ap.add_argument("--prompts", help="directory of per-id prompt transcriptions "
                                      "(for needs_vision questions)")
    ap.add_argument("--root", default=str(REPO_ROOT), help="repo root to write into")
    ap.add_argument("--only", help="question numbers to write, e.g. 1-25,30")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--force", action="store_true", help="overwrite existing files")
    ap.add_argument("--accept-unreviewed", action="store_true",
                    help="write questions whose topic is still flagged needs_review "
                         "(the topic is then a guess — see docs/pdf-question-pipeline.md)")
    args = ap.parse_args(argv)

    records = _load(args.records)
    judgments = {j["id"]: j for j in _load(args.judgments)}
    wanted = _parse_only(args.only)
    overrides = Path(args.explanations) if args.explanations else None
    prompts = Path(args.prompts) if args.prompts else None
    root = Path(args.root)

    written = skipped = 0
    problems: list[str] = []
    for record in records:
        if wanted is not None and record["num"] not in wanted:
            continue
        judgment = judgments.get(record["id"], {})
        explanation = None
        if overrides and (overrides / f"{record['id']}.md").is_file():
            explanation = (overrides / f"{record['id']}.md").read_text(encoding="utf-8")

        if prompts and (prompts / f"{record['id']}.md").is_file():
            record = dict(
                record,
                body=(prompts / f"{record['id']}.md").read_text(encoding="utf-8").strip(),
            )
        if not (record.get("body") or "").strip():
            hint = " (needs_vision — transcribe the rendered page into --prompts)" \
                if record.get("needs_vision") else ""
            problems.append(f"{record['id']}: no prompt text{hint}")
            continue
        if not judgment.get("topic"):
            problems.append(f"{record['id']}: no topic — classify or review it first")
            continue
        if judgment.get("needs_review") and not args.accept_unreviewed:
            problems.append(
                f"{record['id']}: topic '{judgment['topic']}' not settled "
                f"({'; '.join(judgment.get('review_reasons') or [])}) — "
                "answer it in the review sheet, or pass --accept-unreviewed"
            )
            continue
        if missing_explanation(record, explanation):
            problems.append(f"{record['id']}: no explanation available")
            continue

        target = root / "questions" / record["bank"] / f"{record['id']}.md"
        if target.exists() and not args.force:
            skipped += 1
            continue

        text = render(record, judgment, explanation)
        if args.dry_run:
            print(f"--- {target} ---\n{text}")
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(text, encoding="utf-8")
        written += 1

    verb = "would write" if args.dry_run else "wrote"
    print(f"{verb} {written} file(s); skipped {skipped} already present")
    for problem in problems:
        print(f"  needs attention — {problem}")
    if not args.dry_run and written:
        print("next: python3 scripts/verify_check.py --sync && "
              "python3 scripts/validate_content.py")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
