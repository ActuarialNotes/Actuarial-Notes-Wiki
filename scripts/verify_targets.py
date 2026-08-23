#!/usr/bin/env python3
"""
verify_targets.py — pick the next batch of files for a VALIDATE sweep.

Target selection is a script rather than a judgement call in the agent prompt so
that two sweeps a week apart don't keep re-checking whatever is alphabetically
first. The priority order is the spec's:

  1. `disputed`, or carrying open findings — something is already known wrong
  2. `stale` — the content moved after it was checked
  3. never checked, weighted by student traffic and syllabus weight
  4. `verified` but older than the re-check horizon (default 180 days)

Within a band, ties break on *impact*: how heavily the syllabus weights the
material (parsed from the exam pages' `{45–55%}` callout weights) and, when a
traffic file is supplied, how often students actually attempt it. That second
input needs Supabase, which a local run has no credentials for, so it is an
optional `--traffic` JSON file (`{"<question id or path>": <attempt count>}`)
rather than a hard dependency.

Usage:
  python3 scripts/verify_targets.py                       # default batch of 10
  python3 scripts/verify_targets.py --limit 25
  python3 scripts/verify_targets.py questions/exam-5      # restrict to a subtree
  python3 scripts/verify_targets.py --json                # machine-readable
  python3 scripts/verify_targets.py --traffic traffic.json
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, asdict
from datetime import date, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import verify_lib as V  # noqa: E402

REPO_ROOT = V.REPO_ROOT

DEFAULT_LIMIT = 10
DEFAULT_RECHECK_DAYS = 180

# Priority bands. Lower sorts first.
BAND_FINDINGS = 0
BAND_STALE = 1
BAND_NEVER = 2
BAND_EXPIRED = 3
BAND_FRESH = 9  # not a sweep target

BAND_LABELS = {
    BAND_FINDINGS: "open findings",
    BAND_STALE: "stale — content changed since the last check",
    BAND_NEVER: "never checked",
    BAND_EXPIRED: "verification older than the re-check horizon",
    BAND_FRESH: "recently verified",
}


@dataclass
class Target:
    path: str
    band: int
    reason: str
    status: str
    open_findings: int
    last_checked: str | None
    weight: float
    traffic: int
    score: float
    log: str

    def sort_key(self) -> tuple:
        # Band first, then impact (descending), then path for a stable order.
        return (self.band, -self.score, self.path)


# ─── Syllabus weight ──────────────────────────────────────────────────────────

CALLOUT_RE = re.compile(r"^>\s*\[!example\]-?\s*([^{}\n]*?)\s*\{([^}]+)\}\s*$")
WEIGHT_RE = re.compile(r"(\d+(?:\.\d+)?)\s*(?:[-–—]\s*(\d+(?:\.\d+)?))?\s*%")
LINK_RE = re.compile(r"\[\[([^\]|]+)(?:\|[^\]]+)?\]\]")


def _weight_value(text: str) -> float:
    """`{45–55%}` → 50.0. A single `{10%}` → 10.0. Anything else → 0."""
    match = WEIGHT_RE.search(text)
    if not match:
        return 0.0
    low = float(match.group(1))
    high = float(match.group(2)) if match.group(2) else low
    return (low + high) / 2


def concept_weights(root: Path | None = None) -> dict[str, float]:
    """Concept name (lowercased) → the heaviest syllabus weight that links it.

    A concept that several exams lean on takes the largest of its weights: a
    transcription error there costs the most students the most marks.
    """
    root = root or REPO_ROOT
    weights: dict[str, float] = {}
    for page in sorted(root.glob("Exam *.md")):
        current = 0.0
        in_topic = False
        for line in page.read_text(encoding="utf-8").split("\n"):
            header = re.match(r"^>\s*\[!(\w+)\]", line)
            if header:
                callout = CALLOUT_RE.match(line)
                if callout and header.group(1).lower() == "example":
                    current, in_topic = _weight_value(callout.group(2)), True
                else:
                    current, in_topic = 0.0, False
                continue
            if not in_topic or not line.startswith(">"):
                continue
            for target in LINK_RE.findall(line):
                name = target.split("/")[-1].strip().lower()
                weights[name] = max(weights.get(name, 0.0), current)
    return weights


def _question_concepts(text: str) -> list[str]:
    """The `wiki_link:` list of a question file, as bare concept names."""
    fm_text, _body = V.split_frontmatter(text)
    if fm_text is None:
        return []
    names: list[str] = []
    lines = fm_text.split("\n")
    for i, line in enumerate(lines):
        if not re.match(r"^wiki_link:\s*$", line):
            continue
        for follow in lines[i + 1:]:
            item = re.match(r"^\s+-\s+(.*)$", follow)
            if not item:
                break
            raw = item.group(1).strip().strip('"').strip("'")
            names.append(raw.split("/")[-1].replace("+", " ").strip())
        break
    return names


def impact_weight(rel: str, text: str, weights: dict[str, float]) -> float:
    """How much a wrong fact on this page would cost, 0–100ish."""
    if rel.startswith("questions/"):
        linked = [weights.get(n.lower(), 0.0) for n in _question_concepts(text)]
        return max(linked) if linked else 0.0
    if rel.startswith("Concepts/"):
        return weights.get(Path(rel).stem.lower(), 0.0)
    if V.EXAM_PAGE_RE.match(Path(rel).name):
        # An exam page is the syllabus itself: every downstream page inherits its
        # topic list and weights, so it outranks any single concept.
        return 100.0
    if rel.startswith("Resources/"):
        return 25.0
    return 0.0


def _question_id(text: str) -> str | None:
    fm_text, _body = V.split_frontmatter(text)
    if fm_text is None:
        return None
    match = re.search(r"^id:\s*(.+)$", fm_text, re.MULTILINE)
    return match.group(1).strip().strip('"').strip("'") if match else None


# ─── Selection ────────────────────────────────────────────────────────────────

def classify(
    rel: str,
    text: str,
    weights: dict[str, float],
    traffic: dict[str, int],
    recheck_days: int,
    today: date,
) -> Target:
    try:
        block = V.parse_verification(text)
    except ValueError:
        block = None
    block = block or {}
    status = str(block.get("status") or "unverified")
    open_count = block.get("open_findings")
    open_count = open_count if isinstance(open_count, int) else 0
    last_checked = block.get("last_checked")
    last_checked = str(last_checked) if last_checked else None

    if status == "disputed" or open_count > 0:
        band = BAND_FINDINGS
    elif status == "stale":
        band = BAND_STALE
    elif status == "unverified":
        band = BAND_NEVER
    elif status == "verified" and last_checked and V.DATE_RE.match(last_checked):
        age = today - date.fromisoformat(last_checked)
        band = BAND_EXPIRED if age > timedelta(days=recheck_days) else BAND_FRESH
    else:
        band = BAND_NEVER if status == "in_review" else BAND_FRESH

    weight = impact_weight(rel, text, weights)
    qid = _question_id(text) if rel.startswith("questions/") else None
    hits = max(traffic.get(rel, 0), traffic.get(qid, 0) if qid else 0)

    reason = BAND_LABELS[band]
    if band == BAND_FINDINGS and status == "disputed":
        reason = "disputed — sources conflict or a critical finding is unresolved"
    elif band == BAND_FINDINGS:
        reason = f"{open_count} open finding{'s' if open_count != 1 else ''}"
    elif band == BAND_EXPIRED and last_checked:
        reason = f"last verified {last_checked}, past the {recheck_days}-day horizon"

    return Target(
        path=rel,
        band=band,
        reason=reason,
        status=status,
        open_findings=open_count,
        last_checked=last_checked,
        weight=weight,
        traffic=hits,
        # Traffic is dampened: a heavily-attempted easy question still matters
        # less than a load-bearing concept on 50% of the syllabus.
        score=weight + min(hits, 500) / 10,
        log=V.log_rel_for(rel),
    )


def select(
    paths: list[str],
    limit: int,
    recheck_days: int,
    traffic: dict[str, int],
    today: date | None = None,
) -> list[Target]:
    today = today or date.today()
    weights = concept_weights()
    files = _files_for(paths)
    targets = []
    for path in files:
        rel = V.rel_path(path)
        targets.append(
            classify(rel, path.read_text(encoding="utf-8"), weights, traffic, recheck_days, today)
        )
    targets = [t for t in targets if t.band != BAND_FRESH]
    targets.sort(key=Target.sort_key)
    return targets[:limit] if limit > 0 else targets


def _files_for(paths: list[str]) -> list[Path]:
    if not paths:
        return list(V.iter_content_files())
    selected: list[Path] = []
    for raw in paths:
        target = (REPO_ROOT / raw).resolve()
        if target.is_dir():
            selected.extend(p for p in sorted(target.rglob("*.md")) if V.is_content_file(p))
        elif target.is_file() and V.is_content_file(target):
            selected.append(target)
    return selected


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("paths", nargs="*", help="restrict the pool to these files/directories")
    ap.add_argument("--limit", type=int, default=DEFAULT_LIMIT, help="batch size (0 = no limit)")
    ap.add_argument("--recheck-days", type=int, default=DEFAULT_RECHECK_DAYS)
    ap.add_argument("--traffic", help="JSON file of {question id or path: attempt count}")
    ap.add_argument("--json", action="store_true", help="emit JSON instead of a table")
    args = ap.parse_args()

    traffic: dict[str, int] = {}
    if args.traffic:
        raw = json.loads(Path(args.traffic).read_text(encoding="utf-8"))
        traffic = {str(k): int(v) for k, v in raw.items()}

    targets = select(args.paths, args.limit, args.recheck_days, traffic)

    if args.json:
        print(json.dumps([asdict(t) for t in targets], indent=2))
        return 0

    if not targets:
        print("Nothing to validate: every file in scope is freshly verified.")
        return 0

    print(f"{len(targets)} target(s), highest priority first:\n")
    for target in targets:
        print(f"  {target.path}")
        print(
            f"      {target.reason} · status={target.status}"
            f" · syllabus weight={target.weight:.0f}"
            + (f" · {target.traffic} attempts" if target.traffic else "")
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
