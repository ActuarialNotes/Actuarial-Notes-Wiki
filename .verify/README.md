# `.verify/` — the validation logs

One append-only log per content file, mirroring the vault path:

```
questions/exam-5/q-2019-fall-17.md  →  .verify/questions/exam-5/q-2019-fall-17.md
Concepts/Loss Development Factor.md →  .verify/Concepts/Loss Development Factor.md
```

`_runs/` holds one summary per validation sweep. Neither it nor this README is a
log, and the checks skip both.

## Adding a comment by hand

You are meant to. Open the log for the page you are looking at — create it if it
does not exist yet — and append an entry at the bottom:

```markdown
## [C-004] The 2019 paper reuses this exhibit
- entry_type: comment
- author: human:jordan
- date: 2026-08-21
- locus: stem, exhibit 2
- note: Q14 on the same paper reuses this exhibit — if the premium is wrong here
  it is wrong there too. Check both before closing F-001.
```

Pick an id that is not already used in that file. Anything you write here is read
in full by the next validation sweep, and a `human:` comment outranks the agent's
own reading of the page.

## The one rule

**Nothing in here is ever edited or deleted — only appended to.** Closing a
finding means appending a `resolution` entry that names it:

```markdown
## [F-001/R] Correction applied
- entry_type: resolution
- author: human:jordan
- date: 2026-08-22
- resolves: F-001
- status: resolved
- note: Confirmed against the PDF, fixed in commit 8ac31f2.
```

CI diffs this directory against the base branch on every PR and fails the build
if an existing entry was reworded, removed, or the file renamed. That is the
whole point: corrections to content are normal git commits, but the record of
what was believed, and when, is immutable.

Full schema and rationale: `docs/verification.md`.
