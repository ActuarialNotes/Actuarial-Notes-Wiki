#!/usr/bin/env python3
"""
verify_check.py — CI enforcement for the VERIFY validation layer.

Runs on every PR. The point is that the *record* of what was checked stays
trustworthy even when nobody is looking: a verification that cites no source, a
log entry quietly reworded to say something else, a `verified` badge left
standing on a page that has since been edited — each of those is worse than no
record at all, because a student trusts the badge.

Two modes, matching the spec's split between what fails a build and what the
tooling simply repairs:

  check (default) — FAILS the build on
      * a malformed verification block, or one missing required keys
      * `status: verified` with empty `sources`, no `confidence`, or no log
        entry dated the same day as `last_checked`
      * a `confidence` on a page that isn't verified
      * a sidecar log entry that was modified or deleted rather than appended
        (diffed against the base ref) — this is what protects P3
      * a log whose `target:` names a file that doesn't exist

  --sync         — REPAIRS and exits 0 (the workflow commits the result)
      * `content_hash` mismatch → downgrade a claiming status to `stale` (P4)
      * `open_findings` recomputed from the sidecar log
      * a missing block on a new content file → backfilled as `unverified`

`--sync` never invents a verification: it can only ever downgrade a status, never
raise one. Nothing in this file can move a page to `verified`.

Usage:
  python3 scripts/verify_check.py                    # check everything
  python3 scripts/verify_check.py questions/exam-5   # check a subset
  python3 scripts/verify_check.py --sync             # repair hashes/counters
  python3 scripts/verify_check.py --base origin/main # + append-only diff check
  python3 scripts/verify_check.py --strict           # warnings fail too
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import verify_lib as V  # noqa: E402

REPO_ROOT = V.REPO_ROOT


@dataclass
class Problem:
    level: str  # 'error' | 'warning'
    path: str
    message: str

    def render(self) -> str:
        tag = "ERROR" if self.level == "error" else "warn "
        return f"  {tag}  {self.path}: {self.message}"


# ─── Block validation ─────────────────────────────────────────────────────────

def check_block(rel: str, text: str) -> list[Problem]:
    problems: list[Problem] = []

    def err(msg: str) -> None:
        problems.append(Problem("error", rel, msg))

    def warn(msg: str) -> None:
        problems.append(Problem("warning", rel, msg))

    try:
        block = V.parse_verification(text)
    except ValueError as exc:
        return [Problem("error", rel, str(exc))]

    if block is None:
        return [Problem("error", rel, "missing verification block (run --sync to backfill)")]

    missing = [k for k in V.VERIFICATION_KEYS if k not in block]
    if missing:
        err(f"verification block missing required key(s): {', '.join(missing)}")
        return problems

    unknown = [k for k in block if k not in V.VERIFICATION_KEYS]
    if unknown:
        err(f"unknown verification key(s): {', '.join(sorted(unknown))}")

    status = block.get("status")
    if status not in V.STATUSES:
        err(f"status {status!r} is not one of {', '.join(V.STATUSES)}")
        status = None

    confidence = block.get("confidence")
    if confidence is not None and confidence not in V.CONFIDENCES:
        err(f"confidence {confidence!r} is not one of {', '.join(V.CONFIDENCES)} or null")
    if status == "verified" and confidence is None:
        err("status: verified requires a confidence")
    if status is not None and status != "verified" and confidence is not None:
        err(f"confidence is only meaningful on a verified page (status: {status})")

    last_checked = block.get("last_checked")
    if last_checked is not None and not V.DATE_RE.match(str(last_checked)):
        err(f"last_checked {last_checked!r} is not a YYYY-MM-DD date")
    checked_by = block.get("last_checked_by")
    if checked_by is not None and not V.ACTOR_RE.match(str(checked_by)):
        err(f"last_checked_by {checked_by!r} must look like agent:<name> or human:<name>")
    if status not in (None, "unverified"):
        if last_checked is None:
            err(f"status: {status} requires last_checked")
        if checked_by is None:
            err(f"status: {status} requires last_checked_by")

    stored_hash = block.get("content_hash")
    if not isinstance(stored_hash, str) or not V.HASH_RE.match(stored_hash):
        err(f"content_hash {stored_hash!r} must look like sha256:<64 hex chars>")
    elif stored_hash != V.content_hash(text):
        # P4: content moved on. `--sync` downgrades it; a plain check reports it
        # without failing, so a content-only PR is never blocked by the record.
        warn("content_hash no longer matches the file (run --sync to mark it stale)")

    sources = block.get("sources")
    if not isinstance(sources, list) or any(not isinstance(s, str) or not s.strip() for s in sources):
        err("sources must be a list of non-empty strings (use [] when there are none)")
        sources = []
    if status == "verified" and not sources:
        # P1: an agent cannot verify by reasoning alone.
        err("status: verified requires at least one citable source")

    open_findings = block.get("open_findings")
    if not isinstance(open_findings, int) or isinstance(open_findings, bool) or open_findings < 0:
        err(f"open_findings {open_findings!r} must be a non-negative integer")
        open_findings = None

    expected_log = V.log_rel_for(rel)
    if block.get("log") != expected_log:
        err(f"log must be {expected_log!r}, found {block.get('log')!r}")

    log = V.read_log(rel)
    if log is None:
        if open_findings:
            warn(f"open_findings is {open_findings} but there is no log at {expected_log}")
        if status == "verified":
            err(f"status: verified requires a log entry at {expected_log}")
    else:
        actual_open = len(log.open_findings())
        if open_findings is not None and open_findings != actual_open:
            warn(f"open_findings is {open_findings}, log holds {actual_open} (run --sync)")
        if status == "verified" and last_checked is not None:
            same_day = [e for e in log.entries if e.entry_date == str(last_checked)]
            if not same_day:
                err(
                    f"status: verified requires a log entry dated {last_checked} "
                    f"in {expected_log}"
                )

    return problems


# ─── Log validation ───────────────────────────────────────────────────────────

def iter_log_files() -> list[Path]:
    if not V.VERIFY_DIR.is_dir():
        return []
    logs: list[Path] = []
    for path in sorted(V.VERIFY_DIR.rglob("*.md")):
        parts = path.relative_to(V.VERIFY_DIR).parts
        # `_runs/` holds batch summaries, not logs; a top-level README documents
        # the directory itself. Neither mirrors a vault path.
        if any(part.startswith("_") for part in parts) or parts == ("README.md",):
            continue
        logs.append(path)
    return logs


def check_log_file(path: Path) -> list[Problem]:
    rel = V.rel_path(path)
    problems: list[Problem] = []
    log = V.parse_log(path.read_text(encoding="utf-8"), path)

    expected_target = V.content_rel_for_log(rel)
    if not log.target:
        problems.append(Problem("error", rel, "log frontmatter is missing `target:`"))
    elif log.target != expected_target:
        problems.append(
            Problem("error", rel, f"target must be {expected_target!r}, found {log.target!r}")
        )
    if log.target and not (REPO_ROOT / log.target).is_file():
        problems.append(Problem("error", rel, f"target {log.target!r} does not exist"))

    seen: set[str] = set()
    for entry in log.entries:
        label = f"entry [{entry.entry_id}]"
        if entry.entry_id in seen:
            problems.append(Problem("error", rel, f"{label}: duplicate entry id"))
        seen.add(entry.entry_id)
        if entry.entry_type not in V.ENTRY_TYPES:
            problems.append(
                Problem("error", rel, f"{label}: entry_type {entry.entry_type!r} is not one of "
                                      f"{', '.join(V.ENTRY_TYPES)}")
            )
        if entry.status and entry.status not in V.ENTRY_STATUSES:
            problems.append(
                Problem("error", rel, f"{label}: status {entry.status!r} is not one of "
                                      f"{', '.join(V.ENTRY_STATUSES)}")
            )
        if not entry.author:
            problems.append(Problem("error", rel, f"{label}: missing author"))
        elif not V.ACTOR_RE.match(entry.author):
            problems.append(
                Problem("error", rel, f"{label}: author {entry.author!r} must look like "
                                      "agent:<name> or human:<name>")
            )
        if not V.DATE_RE.match(entry.entry_date):
            problems.append(Problem("error", rel, f"{label}: date {entry.entry_date!r} is not YYYY-MM-DD"))
        if entry.entry_type == "finding":
            if entry.severity not in V.SEVERITIES:
                problems.append(
                    Problem("error", rel, f"{label}: finding severity {entry.severity!r} is not one of "
                                          f"{', '.join(V.SEVERITIES)}")
                )
            if not entry.status:
                problems.append(Problem("error", rel, f"{label}: finding needs a status"))
        if entry.resolves and entry.resolves not in seen:
            problems.append(
                Problem("error", rel, f"{label}: resolves {entry.resolves!r}, which is not an "
                                      "earlier entry in this log")
            )
    return problems


# ─── Append-only enforcement (P3) ─────────────────────────────────────────────

def _git(*args: str) -> str:
    return subprocess.run(
        ["git", *args], cwd=REPO_ROOT, capture_output=True, text=True, check=True
    ).stdout


def resolve_base(base: str | None) -> str | None:
    """Pick a base ref to diff against, preferring an explicit one."""
    candidates = [base] if base else []
    import os

    if not base:
        env_base = os.environ.get("GITHUB_BASE_REF")
        if env_base:
            candidates += [f"origin/{env_base}", env_base]
        candidates += ["origin/main", "main"]
    for ref in candidates:
        if ref is None:
            continue
        try:
            _git("rev-parse", "--verify", "--quiet", f"{ref}^{{commit}}")
            return ref
        except subprocess.CalledProcessError:
            continue
    return None


def _is_append(old: str, new: str) -> bool:
    """True when `new` only adds text to the end of `old`.

    Compared with trailing whitespace normalised, so a missing final newline is
    not a violation — but the last line of the old file may not be *extended*,
    only followed.
    """
    old_n = old.replace("\r\n", "\n").rstrip()
    new_n = new.replace("\r\n", "\n").rstrip()
    return new_n == old_n or new_n.startswith(old_n + "\n")


def check_append_only(base: str) -> list[Problem]:
    """Every `.verify/` file changed since `base` must be new or appended to."""
    problems: list[Problem] = []
    try:
        merge_base = _git("merge-base", base, "HEAD").strip() or base
    except subprocess.CalledProcessError:
        merge_base = base
    try:
        raw = _git("diff", "--name-status", "-z", "--find-renames", merge_base, "--", ".verify")
    except subprocess.CalledProcessError as exc:  # pragma: no cover - git-level failure
        return [Problem("error", ".verify", f"could not diff against {base}: {exc}")]

    fields = [f for f in raw.split("\0") if f != ""]
    i = 0
    while i < len(fields):
        code = fields[i]
        if code[:1] in ("R", "C"):
            old_path, new_path = fields[i + 1], fields[i + 2]
            i += 3
            problems.append(
                Problem("error", old_path, f"log files are append-only: renamed to {new_path}")
            )
            continue
        path = fields[i + 1]
        i += 2
        if code.startswith("A"):
            continue
        if code.startswith("D"):
            problems.append(Problem("error", path, "log files are append-only: deleted"))
            continue
        if code.startswith("M") or code.startswith("T"):
            try:
                old = _git("show", f"{merge_base}:{path}")
            except subprocess.CalledProcessError:
                continue
            new_file = REPO_ROOT / path
            new = new_file.read_text(encoding="utf-8") if new_file.is_file() else ""
            if not _is_append(old, new):
                problems.append(
                    Problem(
                        "error",
                        path,
                        "log files are append-only: existing content was edited or removed. "
                        "Close a finding by appending a resolution entry instead.",
                    )
                )
    return problems


# ─── Sync (repair) ────────────────────────────────────────────────────────────

def sync_file(path: Path) -> str | None:
    """Repair one file's block in place. Returns a description of what changed."""
    rel = V.rel_path(path)
    text = path.read_text(encoding="utf-8")
    try:
        block = V.parse_verification(text)
    except ValueError:
        return None  # malformed: the check run reports it; never silently rewrite
    changes: list[str] = []

    if block is None:
        block = V.new_block(text, V.log_rel_for(rel))
        changes.append("backfilled")
    else:
        block = {k: block.get(k) for k in V.VERIFICATION_KEYS if k in block} | {
            k: v for k, v in block.items() if k not in V.VERIFICATION_KEYS
        }
        for key in V.VERIFICATION_KEYS:
            block.setdefault(key, [] if key == "sources" else (0 if key == "open_findings" else None))

        actual = V.content_hash(text)
        if block.get("content_hash") != actual:
            block["content_hash"] = actual
            if block.get("status") in V.CLAIMING_STATUSES:
                # P4, no manual override: the page changed, the pass no longer
                # speaks for it.
                block["status"] = "stale"
                changes.append("content changed → stale")
            else:
                changes.append("hash refreshed")

        if block.get("status") != "verified" and block.get("confidence") is not None:
            block["confidence"] = None
            changes.append("confidence cleared")

        if block.get("log") != V.log_rel_for(rel):
            block["log"] = V.log_rel_for(rel)
            changes.append("log path corrected")

    log = V.read_log(rel)
    actual_open = len(log.open_findings()) if log else 0
    if block.get("open_findings") != actual_open:
        block["open_findings"] = actual_open
        changes.append(f"open_findings → {actual_open}")

    if not changes:
        return None
    path.write_text(V.upsert_verification(text, block), encoding="utf-8")
    return f"{rel}: {'; '.join(changes)}"


# ─── Entry point ──────────────────────────────────────────────────────────────

def select_files(paths: list[str]) -> list[Path]:
    if not paths:
        return list(V.iter_content_files())
    selected: list[Path] = []
    for raw in paths:
        target = (REPO_ROOT / raw).resolve()
        if target.is_dir():
            selected.extend(p for p in sorted(target.rglob("*.md")) if V.is_content_file(p))
        elif target.is_file() and V.is_content_file(target):
            selected.append(target)
        else:
            print(f"skipping {raw!r}: not a vault content file", file=sys.stderr)
    return selected


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("paths", nargs="*", help="limit to these files/directories")
    ap.add_argument("--sync", action="store_true", help="repair hashes, statuses and counters, then exit 0")
    ap.add_argument("--base", help="git ref to diff .verify/ against for the append-only check")
    ap.add_argument("--no-append-check", action="store_true", help="skip the append-only diff check")
    ap.add_argument("--strict", action="store_true", help="treat warnings as errors")
    args = ap.parse_args()

    files = select_files(args.paths)

    if args.sync:
        changes = [c for c in (sync_file(p) for p in files) if c]
        print(f"verify --sync: {len(files)} file(s) scanned, {len(changes)} updated")
        for change in changes:
            print(f"  {change}")
        return 0

    problems: list[Problem] = []
    for path in files:
        problems.extend(check_block(V.rel_path(path), path.read_text(encoding="utf-8")))
    for log_file in iter_log_files():
        problems.extend(check_log_file(log_file))

    if not args.no_append_check:
        base = resolve_base(args.base)
        if base is None:
            print("note: no base ref available; skipping the append-only check", file=sys.stderr)
        else:
            problems.extend(check_append_only(base))

    errors = [p for p in problems if p.level == "error"]
    warnings = [p for p in problems if p.level == "warning"]

    if errors:
        print(f"\n{len(errors)} error(s):")
        for problem in errors:
            print(problem.render())
    if warnings:
        print(f"\n{len(warnings)} warning(s):")
        for problem in warnings:
            print(problem.render())

    print(
        f"\nverify: {len(files)} content file(s), {len(iter_log_files())} log(s), "
        f"{len(errors)} error(s), {len(warnings)} warning(s)"
    )
    if errors:
        return 1
    if warnings and args.strict:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
