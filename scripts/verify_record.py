#!/usr/bin/env python3
"""
verify_record.py — write the outcome of a VALIDATE pass into the log and the
`verification:` block.

Every write to the record goes through here rather than through the agent
editing markdown directly, for three reasons:

  * **Idempotency is mechanical, not a matter of prompt discipline.** A finding
    carries a fingerprint derived from its locus and claim. Re-detecting a known
    issue appends a short reaffirming comment (or does nothing, if it was already
    reaffirmed today) instead of a duplicate `F-` entry. "Running the same sweep
    twice produces no duplicate findings" is enforced here.
  * **P1 is mechanical too.** `pass --status verified` refuses without at least
    one `--source`, and refuses while an open critical finding stands. No agent
    can talk its way past either.
  * **P3 holds by construction.** Nothing here rewrites an earlier entry; every
    command appends.

Usage:
  python3 scripts/verify_record.py run-id
  python3 scripts/verify_record.py finding <path> --run-id R --severity critical \\
      --title "Stem value contradicts official PDF" --locus "stem, line 12" \\
      --claim "..." --evidence "..." --proposed-action "..." [--applied]
  python3 scripts/verify_record.py resolution <path> --resolves F-001 \\
      --author human:jordan --note "Fixed in commit 8ac31f2"
  python3 scripts/verify_record.py comment <path> --note "..." [--author human:jordan]
  python3 scripts/verify_record.py pass <path> --status verified --confidence high \\
      --source "CAS Exam 5 Fall 2019 Q17 — official solution PDF p.4" --run-id R
  python3 scripts/verify_record.py run --run-id R --summary summary.md
"""

from __future__ import annotations

import argparse
import hashlib
import os
import re
import secrets
import sys
from datetime import date, datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import verify_check as C  # noqa: E402
import verify_lib as V  # noqa: E402

DEFAULT_AUTHOR = "agent:validate-v1"


def today() -> str:
    return os.environ.get("VERIFY_TODAY") or date.today().isoformat()


def make_run_id() -> str:
    """`2026-08-19T14:02Z/a3f9` — timestamp plus a short nonce, as in the spec."""
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%MZ")
    return f"{stamp}/{secrets.token_hex(2)}"


def fingerprint(locus: str, claim: str) -> str:
    """A stable identity for "this same problem, in this same place".

    Normalised hard — case, whitespace and punctuation all collapse — so that a
    later sweep phrasing the same finding slightly differently still recognises
    it as the one already on file.
    """
    def norm(text: str) -> str:
        lowered = (text or "").lower()
        # Thousands separators first: "4,200,000", "4 200 000" and "4200000" are
        # the same claim about the same number, and numeric transcription errors
        # are the case this dedupe exists for.
        lowered = re.sub(r"(?<=\d)[,\s](?=\d)", "", lowered)
        return re.sub(r"[^a-z0-9]+", " ", lowered).strip()

    payload = f"{norm(locus)}|{norm(claim)}"
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()[:12]


def _require_content(rel: str) -> Path:
    path = V.REPO_ROOT / rel
    if not path.is_file() or not V.is_content_file(path):
        raise SystemExit(f"not a vault content file: {rel}")
    return path


def _next_comment_id(log: V.VerificationLog | None) -> str:
    highest = 0
    for entry in (log.entries if log else []):
        match = re.match(r"^C-(\d+)$", entry.entry_id)
        if match:
            highest = max(highest, int(match.group(1)))
    return f"C-{highest + 1:03d}"


def _next_resolution_id(log: V.VerificationLog | None, finding_id: str) -> str:
    taken = {e.entry_id for e in (log.entries if log else [])}
    candidate = f"{finding_id}/R"
    suffix = 2
    while candidate in taken:
        candidate = f"{finding_id}/R{suffix}"
        suffix += 1
    return candidate


def _sync(rel: str) -> None:
    """Refresh the block's derived fields after touching the log."""
    C.sync_file(V.REPO_ROOT / rel)


def _set_block(rel: str, **updates) -> None:
    path = V.REPO_ROOT / rel
    text = path.read_text(encoding="utf-8")
    block = V.parse_verification(text) or V.new_block(text, V.log_rel_for(rel))
    block.update(updates)
    path.write_text(V.upsert_verification(text, block), encoding="utf-8")


# ─── Commands ─────────────────────────────────────────────────────────────────

def cmd_finding(args: argparse.Namespace) -> int:
    rel = args.path
    _require_content(rel)
    log = V.read_log(rel)
    fp = fingerprint(args.locus, args.claim)
    stamp = args.date or today()

    prior = None
    for entry in (log.entries if log else []):
        if entry.entry_type == "finding" and entry.fields.get("fingerprint") == fp:
            prior = entry

    if prior is not None:
        still_open = any(f.entry_id == prior.entry_id for f in log.open_findings())
        if still_open:
            # A finding recorded today is its own reaffirmation: re-detecting it
            # on a second sweep the same day says nothing the entry above does not
            # already say. Without this, the first repeat sweep of the day appends
            # a reaffirming comment and only the *second* one is a no-op, which
            # breaks the "running the same sweep twice leaves the log the same
            # length" contract the agent definition states.
            already = prior.entry_date == stamp or any(
                e.fields.get("reaffirms") == prior.entry_id and e.entry_date == stamp
                for e in log.entries
            )
            if already:
                print(f"{rel}: {prior.entry_id} already reaffirmed today — nothing appended")
                return 0
            entry_text = V.render_entry(
                _next_comment_id(log),
                f"Still present: {prior.title}",
                [
                    ("entry_type", "comment"),
                    ("author", args.author),
                    ("run_id", args.run_id or ""),
                    ("date", stamp),
                    ("reaffirms", prior.entry_id),
                    ("note", args.reaffirm_note or
                        "Re-detected on this sweep; the finding above still stands unchanged."),
                ],
            )
            V.append_entry(rel, entry_text, V.REPO_ROOT)
            _sync(rel)
            print(f"{rel}: reaffirmed {prior.entry_id} (no duplicate finding created)")
            return 0
        # Closed, but back. That is a regression, and it gets its own entry that
        # names the one it recurs from.
        recurrence_of = prior.entry_id
    else:
        recurrence_of = ""

    log_for_id = log or V.parse_log(V.new_log_text(rel))
    finding_id = log_for_id.next_finding_id()
    title = args.title or (args.claim or "Finding")[:80]
    entry_text = V.render_entry(finding_id, title, [
        ("entry_type", "finding"),
        ("author", args.author),
        ("run_id", args.run_id or ""),
        ("date", stamp),
        ("severity", args.severity),
        ("status", "open"),
        ("locus", args.locus),
        ("claim", args.claim),
        ("evidence", args.evidence),
        ("source_rank", str(args.source_rank) if args.source_rank else ""),
        ("proposed_action", args.proposed_action),
        ("applied", "true" if args.applied else "false"),
        ("recurrence_of", recurrence_of),
        ("fingerprint", fp),
    ])
    V.append_entry(rel, entry_text, V.REPO_ROOT)

    if args.set_status:
        _set_block(rel, status=args.set_status, confidence=None,
                   last_checked=stamp, last_checked_by=args.author)
    _sync(rel)
    suffix = f" (recurrence of {recurrence_of})" if recurrence_of else ""
    print(f"{rel}: recorded {finding_id} [{args.severity}]{suffix}")
    return 0


def cmd_resolution(args: argparse.Namespace) -> int:
    rel = args.path
    _require_content(rel)
    log = V.read_log(rel)
    if log is None:
        raise SystemExit(f"no log at {V.log_rel_for(rel)} — nothing to resolve")
    if not any(e.entry_id == args.resolves for e in log.entries):
        raise SystemExit(f"{args.resolves} is not an entry in {V.log_rel_for(rel)}")

    entry_text = V.render_entry(
        _next_resolution_id(log, args.resolves),
        args.title or "Correction applied",
        [
            ("entry_type", "resolution"),
            ("author", args.author),
            ("run_id", args.run_id or ""),
            ("date", args.date or today()),
            ("resolves", args.resolves),
            ("status", args.status),
            ("note", args.note),
        ],
    )
    V.append_entry(rel, entry_text, V.REPO_ROOT)
    _sync(rel)
    print(f"{rel}: {args.resolves} → {args.status}")
    return 0


def cmd_comment(args: argparse.Namespace) -> int:
    rel = args.path
    _require_content(rel)
    log = V.read_log(rel)
    entry_text = V.render_entry(
        _next_comment_id(log),
        args.title or "Comment",
        [
            ("entry_type", args.entry_type),
            ("author", args.author),
            ("run_id", args.run_id or ""),
            ("date", args.date or today()),
            ("locus", args.locus),
            ("note", args.note),
        ],
    )
    V.append_entry(rel, entry_text, V.REPO_ROOT)
    _sync(rel)
    print(f"{rel}: appended {args.entry_type}")
    return 0


def cmd_pass(args: argparse.Namespace) -> int:
    """Record the outcome of a check on one file, and update its block.

    The two refusals here are the spec's core rule made mechanical: an agent
    cannot verify by reasoning alone, and cannot call a page verified while it
    knows something critical is wrong with it.
    """
    rel = args.path
    path = _require_content(rel)
    stamp = args.date or today()

    if args.status == "verified":
        if not args.source:
            raise SystemExit(
                "refusing: status 'verified' requires at least one --source (P1 — an "
                "agent cannot verify by reasoning alone). Record a finding, or use "
                "--status in_review."
            )
        log = V.read_log(rel)
        critical = log.open_critical() if log else []
        if critical:
            raise SystemExit(
                "refusing: "
                + ", ".join(f.entry_id for f in critical)
                + " is an open critical finding. Use --status disputed."
            )

    if args.status != "verified" and args.confidence:
        raise SystemExit("confidence is only meaningful on a verified page")

    entry_text = V.render_entry(
        _next_comment_id(V.read_log(rel)),
        args.title or f"Validation pass — {args.status}",
        [
            ("entry_type", "comment"),
            ("author", args.author),
            ("run_id", args.run_id or ""),
            ("date", stamp),
            ("status_set", args.status),
            ("confidence", args.confidence or ""),
            ("checks_run", args.checks or ""),
            ("sources_checked", "; ".join(args.source) if args.source else ""),
            ("note", args.note or ""),
        ],
    )
    V.append_entry(rel, entry_text, V.REPO_ROOT)

    text = path.read_text(encoding="utf-8")
    block = V.parse_verification(text) or V.new_block(text, V.log_rel_for(rel))
    block.update(
        status=args.status,
        confidence=args.confidence if args.status == "verified" else None,
        last_checked=stamp,
        last_checked_by=args.author,
        content_hash=V.content_hash(text),
        sources=list(args.source or block.get("sources") or []),
        log=V.log_rel_for(rel),
    )
    path.write_text(V.upsert_verification(text, block), encoding="utf-8")
    _sync(rel)

    problems = [p for p in C.check_block(rel, path.read_text(encoding="utf-8")) if p.level == "error"]
    if problems:
        for problem in problems:
            print(problem.render(), file=sys.stderr)
        raise SystemExit(f"{rel}: the resulting block would fail CI; nothing was claimed")
    print(f"{rel}: status → {args.status}")
    return 0


def cmd_run(args: argparse.Namespace) -> int:
    """Write the per-batch run summary under `.verify/_runs/`."""
    safe = re.sub(r"[^0-9A-Za-z._-]+", "-", args.run_id).strip("-")
    path = V.VERIFY_DIR / V.RUNS_DIRNAME / f"{safe}.md"
    if path.exists():
        raise SystemExit(f"run summary already exists: {V.rel_path(path)}")
    path.parent.mkdir(parents=True, exist_ok=True)
    body = Path(args.summary).read_text(encoding="utf-8") if args.summary else sys.stdin.read()
    header = (
        f"---\nrun_id: {args.run_id}\nagent: {args.author}\n"
        f"date: {args.date or today()}\n---\n\n"
    )
    path.write_text(header + body.rstrip() + "\n", encoding="utf-8")
    print(V.rel_path(path))
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="command", required=True)

    def common(parser: argparse.ArgumentParser, with_path: bool = True) -> None:
        if with_path:
            parser.add_argument("path", help="repo-relative content file")
        parser.add_argument("--author", default=DEFAULT_AUTHOR)
        parser.add_argument("--run-id", default="")
        parser.add_argument("--date", help="YYYY-MM-DD (defaults to today)")

    sub.add_parser("run-id", help="print a fresh run id")

    p = sub.add_parser("finding", help="record a finding (deduped by fingerprint)")
    common(p)
    p.add_argument("--severity", required=True, choices=V.SEVERITIES)
    p.add_argument("--title", default="")
    p.add_argument("--locus", required=True, help="e.g. 'stem, line 12' or 'option C'")
    p.add_argument("--claim", required=True, help="what the page currently says")
    p.add_argument("--evidence", required=True, help="what the source says, and how you checked")
    p.add_argument("--proposed-action", default="")
    p.add_argument("--source-rank", type=int, choices=[1, 2, 3, 4, 5],
                   help="P2 rank of the evidence's strongest source")
    p.add_argument("--applied", action="store_true", help="the fix is in this same PR")
    p.add_argument("--set-status", choices=V.STATUSES, help="also set the block's status")
    p.add_argument("--reaffirm-note", default="")

    p = sub.add_parser("resolution", help="close a finding by appending a resolution")
    common(p)
    p.add_argument("--resolves", required=True)
    p.add_argument("--status", default="resolved", choices=list(V.CLOSING_STATUSES))
    p.add_argument("--title", default="")
    p.add_argument("--note", required=True)

    p = sub.add_parser("comment", help="append a comment or question entry")
    common(p)
    p.add_argument("--entry-type", default="comment", choices=["comment", "question", "correction"])
    p.add_argument("--title", default="")
    p.add_argument("--locus", default="")
    p.add_argument("--note", required=True)

    p = sub.add_parser("pass", help="record the outcome of a check and update the block")
    common(p)
    p.add_argument("--status", required=True, choices=V.STATUSES)
    p.add_argument("--confidence", choices=V.CONFIDENCES)
    p.add_argument("--source", action="append", default=[],
                   help="citable source, repeatable; required for --status verified")
    p.add_argument("--checks", default="", help="which checks were run")
    p.add_argument("--title", default="")
    p.add_argument("--note", default="")

    p = sub.add_parser("run", help="write the batch run summary")
    common(p, with_path=False)
    p.add_argument("--summary", help="file to read the summary body from (default: stdin)")

    args = ap.parse_args()
    if args.command == "run-id":
        print(make_run_id())
        return 0
    return {
        "finding": cmd_finding,
        "resolution": cmd_resolution,
        "comment": cmd_comment,
        "pass": cmd_pass,
        "run": cmd_run,
    }[args.command](args)


if __name__ == "__main__":
    raise SystemExit(main())
