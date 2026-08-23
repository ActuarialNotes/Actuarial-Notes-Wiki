# The VALIDATE agent

`docs/verification.md` covers the record — the block, the log, what CI enforces.
This covers the thing that produces the record: how a sweep picks what to check,
what it reads, what it is allowed to change, and why the interesting parts live
in scripts rather than in the prompt.

- `.claude/agents/validate.md` — the agent definition (the procedure)
- `.claude/commands/validate.md` — `/validate <path-or-glob> [--depth]`

## Why so much of this is a script

An agent can be told to be idempotent and to never verify without a source. It
will mostly comply. "Mostly" is not good enough for a record whose entire value
is that a student can trust it, so the two rules that matter most are enforced in
code that refuses the command:

- `verify_record.py pass --status verified` **refuses** without `--source`, and
  **refuses** while an open critical finding stands.
- `verify_record.py finding` fingerprints on locus + claim, so re-detecting a
  known issue appends a reaffirming comment (or nothing, if it was already
  reaffirmed today) rather than a second `F-` entry.

And after all that, `verify_check.py` re-checks the result in CI, where the agent
cannot reach it at all. Belt, braces, and a third party.

## Target selection — `verify_targets.py`

Priority bands, highest first:

| Band | What | Why first |
|---|---|---|
| 0 | `disputed`, or `open_findings > 0` | Something is already known to be wrong |
| 1 | `stale` | The content moved after it was checked |
| 2 | never checked | The bulk of the vault |
| 3 | `verified` older than 180 days | Syllabi and sittings roll over |

Within a band, ties break on impact, not alphabetically — on a fresh vault every
file is band 2, so the tiebreak *is* the sweep order:

- **Syllabus weight**, parsed from the exam pages' `{45–55%}` callout weights and
  attributed to every concept linked inside that callout. A question inherits the
  heaviest weight among its `wiki_link` concepts. An exam page scores 100: it is
  the syllabus every other page inherits from.
- **Student traffic**, when a `--traffic` JSON file of attempt counts is supplied
  (the weekly sweep passes one pulled from `question_responses`). Dampened —
  `min(hits, 500) / 10` — so a heavily-attempted easy question still ranks below
  a load-bearing concept on half the syllabus. A local run has no Supabase
  credentials, so traffic is optional and its absence changes nothing else.

## Context loading — `verify_context.py`

The compounding mechanism, and the reason a sweep in November is worth more than
the same sweep in August. Emits, in order:

1. **The content file.**
2. **The complete sidecar log** — never truncated, never summarised. Human
   `comment` entries reach the agent verbatim; there is a test pinning that
   (`test_a_hand_written_human_comment_is_preserved_verbatim`, and its TypeScript
   twin). The agent definition tells the agent that a `human:*` comment outranks
   its own reading of the page.
3. **Sibling files from the same import batch** — `cas5-2013f-009.md` and its
   neighbours came out of one PDF in one conversion pass, and a mistranscribed
   exhibit is usually mistranscribed across the whole batch. This is how one
   finding turns into the four it should have been.
4. **Linked concept pages** — terminology and formula consistency. Rank 4:
   consistency only, never truth.
5. **Source material named by the syllabus** — the reading, its assignment from
   the exam page's `Source Material` callout, and the URL it is available from.
   Metadata only, deliberately: the point is to send the agent to the real
   document, not to let it check the vault against the vault.

## What a sweep may change

| May auto-fix (still via PR) | Must not — open a finding and stop |
|---|---|
| A number that provably diverges from the official PDF | Anything where sources conflict |
| Broken links, LaTeX syntax, frontmatter schema, typos | Anything where the **correct answer** is in question |
| Missing verification blocks (`verify_check.py --sync`) | Rewriting an explanation for clarity or style |
| | Pedagogical judgement calls |

The line: the agent may make the vault say what the source says. It may not
decide what is true.

## Output of a run

- Log entries — findings, or a `pass` comment recording a clean check.
- An updated `verification:` block (status, date, hash, sources, open findings).
- Permitted auto-fixes applied.
- `.verify/_runs/<run_id>.md` — files touched, findings by severity, sources
  consulted, auto-fixes, what was left `in_review` and why, and the run's cost.
- One PR per batch: `Validate: <exam/topic> (<n> files, <m> findings)`, body =
  the run summary with critical findings first. Never a push to `main`.

## Bootstrapping

The Exam 5 questions are the regression suite. The transcription errors found in
the first manual review pass are known, so a sweep over `questions/exam-5/` is
graded on whether it re-finds them and classifies them `critical`. A sweep that
misses them is not ready, whatever its summary says.
