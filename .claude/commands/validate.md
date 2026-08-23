---
description: Validate vault content against citable external sources, record findings in the append-only .verify/ log, and open a PR for the batch
argument-hint: "[path-or-glob] [--depth quick|standard|deep] [--limit N]"
allowed-tools: Task, Read, Write, Edit, Bash, Glob, Grep, WebFetch, WebSearch
---

Run a VERIFY validation sweep.

**Arguments given:** `$ARGUMENTS`

Interpret them as:

- a **path or glob** — validate exactly these files (`questions/exam-5/`,
  `Concepts/Loss*.md`, a single file). When absent, ask
  `scripts/verify_targets.py` for the next priority batch.
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
RUN_ID=$(python3 scripts/verify_record.py run-id) # one id for the whole batch
```

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
   the run summary with critical findings first.

Then report back here: files checked, findings by severity with the critical ones
spelled out, what was auto-fixed, what was left `in_review` and which source you
could not reach.
