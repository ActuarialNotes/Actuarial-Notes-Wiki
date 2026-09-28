---
description: Validate vault content against citable external sources, record findings in the append-only .verify/ log, and open a PR for the batch
argument-hint: "[path-or-glob | --new] [--depth quick|standard|deep] [--limit N]"
allowed-tools: Task, Read, Write, Edit, Bash, Glob, Grep, WebFetch, WebSearch
---

Run a VERIFY validation sweep.

**Arguments given:** `$ARGUMENTS`

Interpret them as:

- a **path or glob** — validate exactly these files (`questions/exam-5/`,
  `Concepts/Loss*.md`, a single file). When absent, ask
  `scripts/verify_targets.py` for the next priority batch.
- `--new` — the **creation check**: the pages this branch adds that have not been
  fact checked yet, or were edited after their check
  (`python3 scripts/verify_targets.py --new`, never truncated — it is exactly what
  `verify_check.py` fails the PR for). This is how a skill that has just written a
  page gets it checked before it commits; see "At creation" below.
- `--limit N` — batch size when no path was given (default 10).
- `--depth` — how far to go per file:
  - `quick` — structural checks and internal consistency only; no external source
    fetching. Produces findings, and **never** a `verified` status, because
    nothing was checked against a source.
  - `standard` (default) — the full check list against the highest-rank source
    you can reach, including independent recomputation of every numeric answer.
  - `deep` — also pull the whole sibling import batch, cross-check the concept
    pages the file links to, and fetch every source the syllabus names for the
    topic.

## How to run it

Delegate to the `validate` subagent (`.claude/agents/validate.md`), which holds
the full procedure. Pass it the resolved batch and the depth. For a batch of more
than about 5 files, run them in groups so each file gets a real pass rather than
a skim.

Before delegating, orient yourself:

```bash
python3 scripts/verify_targets.py --limit 10      # what is most worth checking
python3 scripts/verify_targets.py --new           # …or, with --new, what this branch adds
RUN_ID=$(python3 scripts/verify_record.py run-id) # one id for the whole batch
```

## At creation (`--new`)

A page is fact checked in the change that adds it (`docs/verification.md`,
"Checked at creation"). The session that wrote it calls this with `--new` once
the page is final — after `--sync`, covers, lint fixes; anything edited after the
check has to be checked again. Three things differ from a sweep:

- **Record-only.** The caller owns the branch and the PR. The subagent writes the
  log entries, the block and the run summary into the working tree and stops —
  no branch, no commit, no PR.
- **Pass the source, not the reasoning.** Give the subagent each page's path and
  the document it was written from — the URL, or the local PDF and its sha256 if
  the caller already downloaded it, and the chapter or question it came from.
  Never the author's notes or working: the check is worth something because a
  second reader goes to the source cold.
- **Findings go back to the caller.** Report every finding with its proposed
  action. The caller fixes the page (writing prose is the author's job, not the
  checker's) and runs `/validate --new` again, which picks the edited page back
  up; the second pass resolves what was fixed and records the status the final
  page earns. Done when `verify_targets.py --new` lists nothing.

## The rules that are not negotiable

The agent definition covers these in full; they are repeated here because they
are the ones that get lost when a sweep is going quickly:

- **Nothing reaches `verified` on model reasoning alone.** A source you actually
  read this session, cited in `--source`, or the status stays `in_review`.
  `verify_record.py` refuses otherwise, and CI refuses after that.
- **Recompute before reading the stated answer.** Reading it first turns the
  check into a rationalisation.
- **Disagreement is a finding, never a quiet fix.** Fix a transcription; never
  decide an answer.
- **The log is append-only.** Close a finding by appending a resolution.
- **One PR per batch, never a push to `main`.**

## Finishing

1. `python3 scripts/verify_check.py --base origin/main` — must pass.
2. `python3 scripts/verify_record.py run --run-id "$RUN_ID" --summary <file>`.
3. Open one PR titled `Validate: <exam/topic> (<n> files, <m> findings)`, body =
   the run summary with critical findings first. **Not with `--new`**: the
   caller's own PR carries the pages and their record together.

Then report back here: files checked, findings by severity with the critical ones
spelled out, what was auto-fixed, what was left `in_review` and which source you
could not reach.
