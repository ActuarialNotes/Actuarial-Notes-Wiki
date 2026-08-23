#!/usr/bin/env python3
"""
sync_reports.py — carry in-app reader reports into the append-only sidecar logs.

A student working a question line by line is the best-placed error detector this
project has. `content_reports` is where the app puts what they say; this script
appends each report to the target page's `.verify/` log as a `comment` entry and
marks the row synced. It runs before every sweep, so a report filed on Tuesday is
in the agent's context on Wednesday.

Reports are an inbox. The record is the log in git.

**A report's body ends up in a public repository.** The account identity never
does: an entry is authored as `human:<reporter_name>` or `human:anon`. On top of
that, `redact()` strips the things a reader might paste in without thinking —
email addresses, and anything shaped like a key or token. That is a backstop, not
a promise; the modal tells the reporter their words will be public before they
send them.

Requires the service role (RLS has no UPDATE policy, deliberately):

    export SUPABASE_URL=https://<project>.supabase.co
    export SUPABASE_SERVICE_ROLE_KEY=<service role key>
    python3 scripts/sync_reports.py --dry-run
    python3 scripts/sync_reports.py --commit
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import verify_check as C  # noqa: E402
import verify_lib as V  # noqa: E402

TABLE = "content_reports"
BATCH = 200

# The reporter's vocabulary, mapped to a hint for the agent. The agent still
# decides the severity of anything it opens as a finding — a reader saying
# "wrong answer" is a report, not a verdict.
SEVERITY_HINT = {
    "wrong answer": "reader reports the keyed answer is wrong — recompute before anything else",
    "typo": "reader reports a typo",
    "unclear": "reader reports the wording is unclear",
    "other": "reader report",
}


@dataclass
class Report:
    id: str
    content_path: str
    reporter_name: str | None
    locus: str | None
    body: str
    severity: str | None
    created_at: str


# ─── Redaction ────────────────────────────────────────────────────────────────

EMAIL_RE = re.compile(r"\b[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}\b")
TOKEN_RE = re.compile(r"\b(?:sk|pk|ghp|gho|xox[bp])[-_][A-Za-z0-9_-]{12,}\b")
LONG_SECRET_RE = re.compile(r"\b[A-Za-z0-9_-]{40,}\b")


def redact(text: str) -> str:
    """Strip what a reader might paste in without thinking. A backstop only."""
    text = EMAIL_RE.sub("[email removed]", text)
    text = TOKEN_RE.sub("[token removed]", text)
    text = LONG_SECRET_RE.sub("[redacted]", text)
    return text


def actor(name: str | None) -> str:
    """`human:<name>` — sanitised to the charset the log schema allows."""
    cleaned = re.sub(r"[^A-Za-z0-9._+-]+", "-", (name or "").strip()).strip("-")
    return f"human:{cleaned[:40]}" if cleaned else "human:anon"


def flatten(text: str) -> str:
    """Collapse a report body into log-entry prose.

    Log fields are `- key: value` with indented continuations, so a body with
    blank lines and bullets has to become one flowing value. Nothing is dropped.
    """
    lines = [ln.strip() for ln in redact(text).replace("\r\n", "\n").split("\n")]
    return " ".join(ln for ln in lines if ln)


# ─── Supabase REST ────────────────────────────────────────────────────────────

def _request(method: str, path: str, key: str, base: str, body: object = None) -> object:
    url = f"{base.rstrip('/')}/rest/v1/{path}"
    data = json.dumps(body).encode("utf-8") if body is not None else None
    request = urllib.request.Request(url, data=data, method=method)
    request.add_header("apikey", key)
    request.add_header("Authorization", f"Bearer {key}")
    request.add_header("Content-Type", "application/json")
    request.add_header("Prefer", "return=representation")
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = response.read().decode("utf-8")
            return json.loads(payload) if payload.strip() else []
    except urllib.error.HTTPError as exc:  # pragma: no cover - network shape
        detail = exc.read().decode("utf-8", "replace")[:400]
        raise SystemExit(f"Supabase {method} {path} failed ({exc.code}): {detail}")


def fetch_unsynced(base: str, key: str, limit: int) -> list[Report]:
    query = urllib.parse.urlencode({
        "select": "id,content_path,reporter_name,locus,body,severity,created_at",
        "synced_to_log": "is.false",
        "order": "created_at.asc",
        "limit": str(limit),
    })
    rows = _request("GET", f"{TABLE}?{query}", key, base)
    return [Report(**{k: row.get(k) for k in Report.__annotations__}) for row in rows]  # type: ignore[arg-type]


def mark_synced(base: str, key: str, ids: list[str], commit: str) -> None:
    if not ids:
        return
    quoted = ",".join(f'"{i}"' for i in ids)
    query = urllib.parse.urlencode({"id": f"in.({quoted})"})
    _request("PATCH", f"{TABLE}?{query}", key, base, {
        "synced_to_log": True,
        "sync_commit": commit,
        "synced_at": "now()",
    })


# ─── Appending ────────────────────────────────────────────────────────────────

def next_report_id(log: V.VerificationLog | None) -> str:
    highest = 0
    for entry in (log.entries if log else []):
        match = re.match(r"^R-(\d+)$", entry.entry_id)
        if match:
            highest = max(highest, int(match.group(1)))
    return f"R-{highest + 1:03d}"


def append_report(report: Report) -> str | None:
    """Append one report to its page's log. Returns the entry id, or None."""
    rel = report.content_path.strip().lstrip("./")
    target = V.REPO_ROOT / rel
    if not target.is_file() or not V.is_content_file(target):
        print(f"  ! skipping {report.id}: {rel!r} is not a vault content file", file=sys.stderr)
        return None

    log = V.read_log(rel)
    # Two devices, one impatient reader: don't file the same words twice.
    body = flatten(report.body)
    for entry in (log.entries if log else []):
        if entry.fields.get("report_id") == report.id:
            print(f"  · {rel}: report {report.id} already in the log")
            return entry.entry_id

    entry_id = next_report_id(log)
    hint = SEVERITY_HINT.get((report.severity or "").lower(), "reader report")
    title = f"Reader report: {report.severity}" if report.severity else "Reader report"
    entry_text = V.render_entry(entry_id, title, [
        ("entry_type", "comment"),
        ("author", actor(report.reporter_name)),
        ("date", (report.created_at or "")[:10] or date.today().isoformat()),
        ("locus", redact(report.locus or "").strip()),
        ("reported_severity", report.severity or ""),
        ("note", body),
        ("triage", hint),
        ("report_id", report.id),
    ])
    V.append_entry(rel, entry_text, V.REPO_ROOT)
    C.sync_file(target)
    print(f"  + {rel}: {entry_id} ({actor(report.reporter_name)})")
    return entry_id


def git(*args: str) -> str:
    return subprocess.run(
        ["git", *args], cwd=V.REPO_ROOT, capture_output=True, text=True, check=True
    ).stdout


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--dry-run", action="store_true", help="show what would be appended, write nothing")
    ap.add_argument("--commit", action="store_true", help="git-commit the appended entries")
    ap.add_argument("--limit", type=int, default=BATCH)
    ap.add_argument("--from-json", help="read reports from a JSON file instead of Supabase (for testing)")
    args = ap.parse_args()

    if args.from_json:
        rows = json.loads(Path(args.from_json).read_text(encoding="utf-8"))
        reports = [Report(**{k: row.get(k) for k in Report.__annotations__}) for row in rows]
        base = key = ""
    else:
        base = os.environ.get("SUPABASE_URL", "")
        key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
        if not base or not key:
            raise SystemExit(
                "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set "
                "(the service role bypasses RLS, which has no UPDATE policy by design)"
            )
        reports = fetch_unsynced(base, key, args.limit)

    if not reports:
        print("No unsynced reports.")
        return 0

    print(f"{len(reports)} unsynced report(s):")
    if args.dry_run:
        for report in reports:
            print(f"  {report.content_path} · {actor(report.reporter_name)} · "
                  f"{report.severity or 'unclassified'}")
            print(f"      {flatten(report.body)[:160]}")
        return 0

    synced = [report.id for report in reports if append_report(report) is not None]

    commit_sha = ""
    if args.commit and synced:
        git("add", ".verify", *[r.content_path for r in reports if r.id in synced])
        status = git("status", "--porcelain", "--", ".verify").strip()
        if status:
            git("commit", "-q", "-m",
                f"Sync {len(synced)} reader report(s) into the validation logs")
            commit_sha = git("rev-parse", "HEAD").strip()
            print(f"committed {commit_sha[:8]}")

    if base and synced:
        mark_synced(base, key, synced, commit_sha)
        print(f"marked {len(synced)} report(s) synced")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
