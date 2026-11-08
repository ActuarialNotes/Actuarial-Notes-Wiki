#!/usr/bin/env python3
"""
run.py — produce the usage report in one command.

  python3 scripts/usage_report/run.py                       # window_start → today
  python3 scripts/usage_report/run.py --end 2026-11-07
  python3 scripts/usage_report/run.py --previous last.html  # say what changed since then
  python3 scripts/usage_report/run.py --notes notes.html    # the day's reading, at the top
  python3 scripts/usage_report/run.py --from-data usage-reports/2026-11-07/data.json  # re-render offline

Writes usage-reports/<end>/ (git-ignored): data.json (everything pulled),
figures.json, report.html, and changes.md when --previous is given.
The full procedure, including publishing, is docs/usage-report.md.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
from pathlib import Path
from zoneinfo import ZoneInfo

sys.path.insert(0, str(Path(__file__).resolve().parent))

import config  # noqa: E402
import figures  # noqa: E402
import render  # noqa: E402

REPO = Path(__file__).resolve().parents[2]

LABELS = {  # the scalars worth reading first in a diff, in order
    "engaged": "Engaged people", "visitors": "Visitors (filtered)", "first_quiz": "Opened a quiz",
    "question_answered": "Answered a question", "quiz_drop_pct": "Quiz openers who never answer (%)",
    "quiz_completed": "Finished a quiz", "day2_return": "Came back on a later day",
    "next_day_pct": "Next-day return rate (%)", "engaged_this_week": "Engaged this week",
    "search_new": "Search visitors", "search_quiz": "Search visitors who started a quiz",
    "question_landing_sessions": "Sessions landing on a question page",
    "first_quiz_from_question_pages": "First quizzes from question pages",
    "chatgpt_engaged": "Engaged visitors from ChatGPT", "exception": "People who hit a JS error",
    "accounts_created": "Accounts created by readers", "accounts_practised": "Accounts that ever practised",
    "accounts_returned": "Accounts that came back", "accounts_practised_on_return": "Accounts that practised on a return",
    "db_answers": "Answers saved by reader accounts", "paying_subscribers": "Paying subscribers",
    "pro_keys_readers": "Pro keys redeemed by readers", "content_reports": "Content reports from readers",
}


def previous_scalars(path: str) -> dict:
    text = Path(path).read_text()
    m = re.search(r'<script type="application/json" id="usage-figures">(.*?)</script>', text, re.S)
    blob = json.loads(m.group(1) if m else text)
    return blob.get("scalars", blob)


def diff(prev: dict, cur: dict) -> str:
    lines = ["| Figure | Before | Now |", "|---|---:|---:|"]
    keys = [k for k in LABELS if k in cur] + sorted(k for k in cur if k not in LABELS)
    changed = [k for k in keys if prev.get(k) != cur.get(k)]
    for k in changed:
        lines.append(f"| {LABELS.get(k, k)} | {prev.get(k, '—')} | {cur[k]} |")
    return "\n".join(lines) if changed else "No figure changed."


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--config", help="config JSON file (default: $USAGE_REPORT_CONFIG or config.local.json)")
    ap.add_argument("--start")
    ap.add_argument("--end", help="last day, YYYY-MM-DD (default: today in the configured time zone)")
    ap.add_argument("--out", help="output directory (default: usage-reports/<end>)")
    ap.add_argument("--notes", help="HTML fragment for the 'what changed and what to do' section")
    ap.add_argument("--previous", help="a previous report.html (e.g. the published page) or figures.json")
    ap.add_argument("--from-data", help="re-render from a saved data.json instead of pulling")
    a = ap.parse_args()

    cfg = config.load(a.config)
    now = dt.datetime.now(ZoneInfo(cfg.timezone))
    if a.from_data:
        data = json.loads(Path(a.from_data).read_text())
    else:
        import pull  # network only when pulling
        start, end = a.start or cfg.window_start, a.end or now.date().isoformat()
        print(f"Pulling GA4 and Supabase for {start} → {end} …", file=sys.stderr)
        data = pull.pull(cfg, start, end)
    out = Path(a.out or REPO / "usage-reports" / data["end"])
    out.mkdir(parents=True, exist_ok=True)
    (out / "data.json").write_text(json.dumps(data))
    F = figures.compute(data)
    (out / "figures.json").write_text(json.dumps(F["scalars"], indent=1, sort_keys=True))
    notes = Path(a.notes).read_text() if a.notes else ""
    (out / "report.html").write_text(render.render(F, notes, now.strftime("%Y-%m-%d %H:%M %Z")))
    print(f"Wrote {out / 'report.html'}", file=sys.stderr)
    if a.previous:
        md = diff(previous_scalars(a.previous), F["scalars"])
        (out / "changes.md").write_text(md + "\n")
        print(md)


if __name__ == "__main__":
    main()
