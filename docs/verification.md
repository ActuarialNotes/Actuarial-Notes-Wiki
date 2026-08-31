# VERIFY — the fact-check layer

**Fact Check** is what this feature is called on screen; VERIFY is the vault-side
toolchain behind it, and keeps its name (the `verification:` frontmatter key, the
`.verify/` logs, `scripts/verify_*.py`, the CI gate) because the schema is bound
to content hashes and to git history. When writing anything a student reads, call
it a fact check.

A wrong number in a stem is worse than a missing question. A student trusts it,
learns it, and carries it into the exam. VERIFY exists so that "has this been
checked?" has an answer that lives in git, survives the session that produced it,
and compounds instead of being re-derived every time someone looks.

Three moving parts:

1. A **`verification:` frontmatter block** on every content file — the current
   state of that page, in the page.
2. An **append-only sidecar log** per page under `.verify/` — the history of what
   was found, by whom, against what, and what happened next.
3. A **CI checker** (`scripts/verify_check.py`) that makes both of those hard to
   lie with.

## The five principles

These constrain everything below; read them before changing any of it.

| | |
|---|---|
| **P1** | An AI cannot verify by reasoning alone. A page reaches `verified` only when its claims were checked against a citable external source. Agent reasoning with no source produces a *finding*, never a verification. |
| **P2** | Source-of-truth hierarchy (below). Higher rank wins, and the conflict gets logged. |
| **P3** | Append-only. Entries are never edited or deleted, only superseded by later entries that reference them. |
| **P4** | Verification is bound to content, not to a filename. Any edit after verification silently downgrades the status to `stale`. No manual override. |
| **P5** | Two independent sources for anything numeric: recompute from scratch *before* looking at the stated answer, then compare against the official solution. |

### P2 — source-of-truth hierarchy

| Rank | Source | Example |
|---|---|---|
| 1 | Official exam material | SOA/CAS sample question + solution PDF, syllabus PDF |
| 2 | Syllabus-listed textbook / paper | `Resources/Books/*`, Werner & Modlin, Brown & Lennox |
| 3 | Other reputable reference | Published errata, university course notes |
| 4 | Internal wiki cross-reference | `Concepts/*.md` — consistency only, **not truth** |
| 5 | Model reasoning / independent recomputation | Can falsify, cannot confirm alone |

Rank 5 is the one to keep straight. A recomputation that disagrees with the page
is decisive evidence that *something* is wrong — that is a finding. A
recomputation that agrees with the page proves nothing on its own, because the
model may simply have made the same mistake the transcriber did.

## The `verification:` block

Lives as the last key of the frontmatter of every file under `questions/`,
`Concepts/`, `Resources/`, and every root-level `Exam *.md`.

```yaml
verification:
  status: unverified        # unverified | in_review | verified | disputed | stale
  confidence: null          # high | medium | low — null unless verified
  last_checked: 2026-08-23  # null when never checked
  last_checked_by: agent:validate-v1   # or human:jordan
  content_hash: sha256:9f2c…           # the file, excluding this block
  sources:
    - "CAS Exam 5 Fall 2019, Q17 — official solution PDF, p.4"
  open_findings: 1          # unresolved entries in the log
  open_critical: 1          # how many of those are `critical`
  log: .verify/questions/exam-5/q-2019-fall-17.md
```

`open_critical` is an addition to the original spec's block, for one concrete
reason. The app keeps a question with an unresolved critical finding out of quiz
sessions, and sidecar logs are deliberately **not** bundled at build time — so
severity has to reach the client some other way, and one integer in the block is
cheaper than a second bundled index. Like `open_findings`, it is *derived*:
`verify_check.py --sync` recomputes it from the log, and CI warns when it drifts.
Nothing hand-sets it.

`quiz/src/lib/verification.ts` is the read side; `scripts/verify_lib.py` is the
read/write side. Both hand-parse the block rather than handing it to a YAML
library — the schema is small and fixed, it keeps the CI check dependency-free,
and anything outside the documented shapes *raises* instead of being coerced. A
malformed block has to fail CI, not quietly read as "unverified".

### The statuses

- **`unverified`** — never checked. The backfill state, and the honest default.
- **`in_review`** — a pass is in progress.
- **`verified`** — checked against the cited sources on `last_checked`.
  Requires non-empty `sources`, a `confidence`, and a log entry dated the same
  day. CI enforces all three.
- **`disputed`** — a real conflict between sources, or an unresolved critical
  finding. A human has to settle it.
- **`stale`** — set *only* by tooling, when `content_hash` stops matching.

### What the hash covers (P4)

`content_hash` is a sha256 of the file with its own `verification:` block
removed and whitespace normalised (line endings, trailing spaces, leading and
trailing blank lines). Two consequences worth stating plainly:

- **Writing the block is not an edit.** The backfill, and every later status
  update, leaves the hash it records still correct. There is no fixpoint problem.
- **The hash covers the rest of the frontmatter, not just the body.** The spec
  phrase is "body only, excluding this block", and the *excluding* is the
  operative half: for a question file, `answer:` and `wiki_link:` live in the
  frontmatter and are exactly what a verification pass checks. An edit to them
  must invalidate the pass.

On a mismatch, `verify_check.py --sync` refreshes the hash and downgrades
`verified` and `in_review` to `stale`. `disputed` deliberately survives an edit:
a dispute is an unresolved conflict a human still has to settle, and collapsing
it into `stale` on the next unrelated edit would hide the one status that means
"we know something here is wrong".

## The sidecar logs

One log per content file, mirroring the vault path under `.verify/`:

```
questions/exam-5/q-2019-fall-17.md  →  .verify/questions/exam-5/q-2019-fall-17.md
Concepts/Loss Development Factor.md →  .verify/Concepts/Loss Development Factor.md
```

Sidecars rather than inline sections: student-facing pages stay clean, Obsidian
rendering is unchanged, and a log can grow without bloating what the app bundles
at build time. Logs are **not** bundled — `fetchVerificationLog` pulls one on
demand when a reader opens the log panel. Everything a badge needs is in the
block.

Format is YAML frontmatter plus append-only entries, newest at the bottom:

```markdown
---
target: questions/exam-5/q-2019-fall-17.md
created: 2026-08-19
---

## [F-001] Stem value contradicts official PDF
- entry_type: finding          # finding | correction | comment | question | resolution
- author: agent:validate-v1
- run_id: 2026-08-19T14:02Z/a3f9
- date: 2026-08-19
- severity: critical           # critical | major | minor | nit
- status: open                 # open | resolved | wontfix | superseded
- locus: stem, line 12
- claim: Stem gives earned premium of 4,200,000.
- evidence: CAS Exam 5 Fall 2019 Q17 official PDF p.4 states 4,200,000 for *written*
  premium and 3,850,000 for earned. Recomputing the LR with 3,850,000 reproduces the
  stated answer of 0.62; 4,200,000 gives 0.568, which is not among the options.
- proposed_action: Change earned premium to 3,850,000.
- applied: false

## [F-001/R] Correction applied
- entry_type: resolution
- author: human:jordan
- date: 2026-08-20
- resolves: F-001
- status: resolved
- note: Confirmed against the PDF, fixed in commit 8ac31f2.
```

Rules that matter:

- **Finding ids are stable and never reused** (`F-001`, `F-002`, …), even after
  a finding is closed. `next_finding_id()` reads the high-water mark.
- **Nothing is ever removed.** Closing a finding means appending a `resolution`
  that `resolves:` it. "Is F-001 still open?" is always a question about the
  entries *after* it.
- **Hand-writable, and hand-written entries are first-class.** A human can open
  a log in Obsidian and append a `comment` entry by hand, in exactly the format
  above. That entry reaches the next sweep's context verbatim — it is the whole
  compounding mechanism, and there is a test pinning it
  (`test_a_hand_written_human_comment_is_preserved_verbatim`).
- **Wrapped values.** A long `evidence:` runs onto indented continuation lines
  and is rejoined on parse.

`.verify/_runs/<run_id>.md` holds per-batch run summaries. They are not logs and
are excluded from the log checks.

## CI enforcement

`scripts/verify_check.py` runs on every PR, in two modes with a deliberate split
between what fails a build and what tooling simply repairs.

**Fails the build:**

- a malformed block, or one missing required keys
- `status: verified` with empty `sources`, no `confidence`, or no log entry dated
  `last_checked` — this is P1, mechanically
- a `confidence` on a page that is not verified
- a `.verify/` file that was **modified other than by appending**, or deleted, or
  renamed, diffed against the base ref — this is P3, mechanically
- a log whose `target:` names a file that does not exist

**Repairs and exits 0** (`--sync`; the workflow commits the result):

- `content_hash` mismatch → downgrade a claiming status to `stale`
- `open_findings` recomputed from the log
- a missing block on a newly added content file → backfilled as `unverified`

A content-only PR is never *blocked* by the record: a hash mismatch is a warning
in check mode and a repair in sync mode. What is blocked is a false claim.

Note the asymmetry, which is the point: **`--sync` can only ever lower a status,
never raise one.** No code path anywhere in `scripts/` can move a page to
`verified`. That takes a fact-check pass that cites a source, and CI checks the
citation is there.

```bash
python3 scripts/verify_check.py                     # check everything
python3 scripts/verify_check.py questions/exam-5    # check a subset
python3 scripts/verify_check.py --sync              # repair hashes/counters
python3 scripts/verify_check.py --base origin/main  # + the append-only check
python3 -m unittest discover -s scripts -p 'test_*.py'
```

## What a reader sees

`lib/verification.ts` is the read side; `components/FactCheckBadge.tsx` is the one
badge, and `factCheckBadge()` the one verdict it and every other surface reads
out (*Fact checked · 12 Aug 2026*, *Not fact checked*, *Re-check needed*, *Under
review*, *Disputed*, *Known issue* — plus a one-word `short` for a dense row).

Where the way in sits depends on the surface:

- **Concept and resource pages** — the **Fact Check** item in the page's action
  menu (`components/wiki/ConceptPagePanel.tsx`), a check mark with the current
  verdict as a tinted pill beside it. The standalone `/wiki/concept/…` and
  `/wiki/resource/…` pages, which have no action menu, keep the badge in the
  title row.
- **Questions** — the badge on the explanation panel, the moment a student who
  has just disagreed with a question is already looking at the discrepancy.
- **Exam pages** — nothing. An exam page is a syllabus outline; the claims worth
  checking live on the concept and resource pages it links to.

Either way opens `FactCheckDialog` over `FactCheckPanel`: the block's own summary
(status, date, the sources cited) with no fetch, then the page's full log,
fetched on demand through `fetchWikiFile`. Showing the work is the point. A reader who can
see that someone has already flagged the exact thing they were about to flag has
a reason to trust the rest of the vault that no badge alone can give them.

Two consequences of the record reach further than display:

- **A critical finding outranks every other badge state**, `verified` included.
  It is the one thing a reader has to know before trusting the page.
- **A question with an unresolved critical finding is kept out of quiz sessions**
  (`filterQuestions`, ahead of the `ids` short-circuit so a saved mistake-review
  link cannot serve one either). `hooks/useShowFlaggedQuestions.ts` is the
  preference that turns them back on — a maintainer's switch, with no Settings
  control, because a question nobody can see is a question nobody fixes.

The surfaces are gated by `FACT_CHECK_UI_ENABLED`, which is **on**. Note what
the badge says on a freshly backfilled vault: *Not fact checked*, on almost every
page.
That is the honest state, and the reason to ship it on — a trust signal that only
ever appears once something is green is not a trust signal.

## The reader's write path

`ReportIssueModal` → `content_reports` → `scripts/sync_reports.py` → the page's
log, as a `comment` entry the next sweep reads in full. A student working a
question line by line is the best-placed error detector this project has.

The account identity never leaves the database: an entry is authored as
`human:<the name they chose>` or `human:anon`, and the sync redacts emails and
token-shaped strings on the way out. The modal says the report will be public
*before* it is written, not after.

## Related

- `.claude/agents/validate.md` — the VALIDATE agent that produces findings.
- `docs/validation-agent.md` — how a sweep picks targets, loads context, and
  what it is and is not allowed to change.
- `Validation Status.md` — the generated vault-level dashboard
  (`scripts/generate_validation_status.py`).
