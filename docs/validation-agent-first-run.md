# VALIDATE — notes from the first real run

**Run:** `2026-09-05T16:45Z/fb4a` · one file,
`Resources/Books/Basic Ratemaking (Werner - 2016).md` · scoped to the chapter outline
and frontmatter · sources: the official Werner & Modlin PDF and the CAS Exam 5 content
outline.

This is a record of what the agent got right and what the *definition and tooling* got
wrong, from the first time `.claude/agents/validate.md` was pointed at real content
against a real PDF. Read it alongside `docs/validation-agent.md`, which is the design;
this is the field report. Every tooling claim below was reproduced independently of the
agent's own report — and one of them did not survive that reproduction, which is noted
in place rather than quietly deleted.

> **Status.** Every defect below has since been fixed, and the ten findings on the page
> itself are all resolved (it now reads `verified`). Each section is annotated with what
> changed; `docs/validation-agent.md` carries the summary table. The report is kept in
> its original shape because the *reasoning* is the reusable part — the next content type
> the agent meets will expose a similar set of gaps.

## Does PDF-from-the-web actually work?

Yes, cleanly, and this was the precondition the whole run depended on.

Both URLs the page carries — the `Available from:` frontmatter link
(`casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf`) and the
one in the `## Links` section (`.../2021-03/5_Werner_Modlin.pdf`) — return HTTP 200
`application/pdf` with identical `content-length: 2545456`. They are the same file:
423 pages, PDF 1.7, sha256 `6b214d4b…`, produced 2016-05-09 from
`Basic Ratemaking_Version 5_May 2016_2.docx`. That last detail independently corroborates
the page's `Edition: 5th` and `Year: 2016` without needing a second source.

**Environment caveat worth pinning:** `pypdf` is installed in the remote container but
**broken** — its `cryptography` backend dies with `ModuleNotFoundError: _cffi_backend`
followed by a `pyo3_runtime.PanicException`. There is no `pdftotext`/poppler either.
`pip install pymupdf` works and is what both this session and the agent used
(`pymupdf.open(path).get_toc()` for the bookmark outline, `.get_text()` per page).
A sweep that assumes `pypdf` will fail on its first PDF. Either the agent definition or
a session-start hook should name `pymupdf` as the supported reader.

## What the agent found

The page's scope sentence was not merely wrong about the phantom Chapter 17 — it had
**both syllabus exclusions inverted**. CAS Exam 5 Content Outline, Fall 2026
(`.../2026-03/Exam_5_CO_2026_Fall.pdf`, sha256 `a7ba8953…`), p.6, verbatim:

> Werner, G., and Modlin, C., *Basic Ratemaking*, Casualty Actuarial Society, Fifth
> Edition, May 2016. The Appendices are an integral part of the textbook and will be used
> for creating questions. **Chapter 2 is excluded.** — **Chapters 1, 3-16.** Including errata.

So Chapter 2 (Rating Manuals) is *off* the syllabus and Chapter 16 (Claims-Made
Ratemaking) is *on* it — the page said the reverse. A candidate using the page as their
reading map skipped an examinable chapter and studied an unexaminable one. That is the
exact failure mode `docs/verification.md` exists to catch.

The numbering question is settled too: `A1-15, A17` is the content outline's
**Domains/Task** column — CAS task numbers within Domain A, which has 18 tasks.
`Exam 5 (CAS).md:91` uses that string correctly as a task range; the resource page's
"Chapters 1–15 and 17" was a corrupted transplant of it, and the source of the bogus
`## 17 Appendices` heading.

Ten findings in total (1 critical resolved, 1 critical open, 3 major, 5 minor). Two were
auto-fixed as pure transcription; the rest were left open because the correction requires
authoring. Detail is in the sidecar log and `.verify/_runs/2026-09-05T16-45Z-fb4a.md`.

### The check that earned its keep

Two of the three highest-value non-syllabus findings came from a check **the definition
does not mention**: full-text-searching the source for every named term the outline
asserts. `"Lee diagram"` occurs **zero** times in all 423 pages, and so does
`"self-insured"` — both independently reconfirmed here with hyphenation-joined,
case-folded search. Both are real actuarial concepts that belong to the Exam 5 *subject
matter* but not to *this book*, which is the signature of an outline written from memory
of the exam rather than from the text.

This is the resource-page analogue of "recompute the answer independently before reading
it," and it should be named in the definition.

### Grading the agent

Spot-checked against an independently built answer key: the verbatim CAS quote, the
zero-occurrence claims, the Chapter 2 worked examples (Homeowners / Medical Malpractice /
U.S. Workers Compensation, with "personal auto" appearing only as table rows), and the
permissible-loss-ratio chapter boundary (printed p.139 is inside Ch 7; Ch 8 opens at
printed p.141) all hold. No overstated evidence found. It also correctly declined to
treat a discrepancy in the PDF's *own* bookmark outline (Ch 12 bookmarked
"Credibitiliy", printed TOC and body both read "Credibility") as a vault error — a
bookmark-only check would have filed a false finding there.

It also flagged an unattributed `ground_truth_toc.txt` in its working directory and
refused to open it. That file was this session's answer key, left in the shared
scratchpad by accident; the refusal was the correct call under the rank hierarchy, and the
leak was a **harness** mistake, not an agent one. Grading artifacts must not share a
directory with the agent under test.

## Definition defects

**1. §6's must-not-fix list has a hole where this run landed.** Its four categories are
sources-conflict / correct-answer-in-question / style-rewrite / pedagogical-judgement.
The actual blocking case was none of them: *the source is unambiguous and the error is
certain, but writing the correction means composing new prose* (a missing Chapter 16
section, four rewritten bullets). The agent reasoned its way to the right answer; it
should not have had to.

> Suggested addition to the must-not-fix list: **"Anything whose correction requires
> composing new prose — a missing section, a rewritten bullet — even when the source is
> unambiguous. Fix only what can be transcribed."**

**2. §6 and `docs/verification.md` contradict each other on `disputed`.** §6 gives a
single coupled instruction — "open a finding, `--set-status disputed`, and stop" — which
reads as though `disputed` is the status for *every* must-not-fix case.
`docs/verification.md` defines `disputed` narrowly: a source conflict, or an unresolved
critical finding. Had F-004 (Lee diagram — major, unambiguous, no critical) been the only
finding, the two documents would have given opposite instructions. **The agent definition
is the wrong one here.** Decouple the status from the stop.

**3. Nothing tells a sweep to fetch the syllabus for a resource page.** §4 lumps
"Resources / Exam pages" together and phrases the syllabus check as an exam-page concern.
But a `Resources/Books/*.md` page's single most consequential claim is *which parts of me
are examinable*, and the definition never says "go get the exam's content outline and diff
the chapter range." This run only found the Ch 2 / Ch 16 inversion because the invoking
prompt pushed for it; an unprompted sweep would plausibly have stopped at "the book has 16
chapters, so 17 is wrong" and shipped a page that still tells candidates to skip Chapter
16. **This is the largest single gap.**

**4. §4 has no checklist for a book/outline page.** The per-type lists cover Questions,
Concepts, and Resources/Exam-pages-as-one. What a resource outline actually needs, all of
it improvised on the run:

- Diff every `## N <Title>` against the source's printed TOC **and** its bookmark outline,
  and treat disagreement between the two as a source-internal conflict to log, not as a
  vault error.
- Build the chapter list from the source **before** re-reading the page's — the transfer
  of "recompute before you look at the answer".
- **Full-text-search the source for every proper noun and named method the page asserts.**
- Hunt for **omissions**, not just errors. §4 is written entirely around things that are
  present and wrong; for a syllabus map, absence (a missing chapter, missing appendices)
  is the more dangerous failure and it must be looked for deliberately.
- Check section→chapter **attribution**, not just existence.
- Verify every frontmatter field against the source's own title page, and fetch every
  `Available from:` URL.

**5. §7 is unconditional about branching and opening a PR.** The whole step is git
plumbing, and it had to be overridden in the invoking prompt. A sub-agent that
auto-branches is a mild footgun. Add a documented record-only mode: *if the caller is
handling git, stop after `verify_record.py run`; do not branch, commit or push.*

**6. The idempotency claim is false as written** — see below.

## Tooling defects

**`scripts/validate_content.py` — misfires on non-question content.**
§4 of the definition called it "the authority" for frontmatter schema. Reproduced:

```
$ python3 scripts/validate_content.py "Resources/Books/Basic Ratemaking (Werner - 2016).md"
Validated 1 question file(s) across 611 concept pages.
✗ 8 error(s):
  - …: missing required frontmatter key 'id'
  - …: missing required frontmatter key 'exam'      (…and topic, learning_objective,
                                                     difficulty, type, points, wiki_link)
Content validation FAILED.
```

It applied the **question** schema to any explicitly-passed path — calling a book
page "1 question file" and demanding `id`, `points` and the rest. A less careful
agent files eight bogus `nit` findings against it, or "fixes" the frontmatter.

> **Correction.** The first version of this report also claimed it "prints FAILED
> while exiting 0, so a wrapper script reads that run as success." **That is
> wrong.** `main()` returns 1 and `sys.exit(main())` propagates it; the real exit
> code is 1. The claim came from measuring `$?` after piping the command through
> `tail`, which reports `tail`'s status, not Python's — an error the agent made
> and this session repeated instead of catching. Only the schema-dispatch half of
> this finding was real. The lesson generalises: a shell check is evidence about
> the shell as much as about the program, and `cmd | tail; echo $?` is not a test
> of `cmd`.

**Fixed** by dispatching on path: an explicit path outside `questions/` is now
refused by name, with a message pointing at `verify_check.py`, and exits 2. The
repo-wide invocation CI runs is unchanged.

**Same-day sweeps are not idempotent.** The definition asserts "running the same sweep
twice must leave the log the same length the second time." Demonstrated on a throwaway
probe file (created, recorded three times, deleted):

| run | result | log lines |
|---|---|---|
| 1 | `recorded F-001 [nit]` | 19 |
| 2 | `reaffirmed F-001 (no duplicate finding created)` | **27** |
| 3 | `F-001 already reaffirmed today — nothing appended` | 27 |

The log stabilized on the **third** run, not the second. The cause was in
`verify_record.py`: the "already reaffirmed today" guard looked only for an existing
*reaffirm comment* dated today, and never considered that the finding itself was created
today. The duplicate-finding guard itself worked correctly — no `F-002` was ever created.

**Fixed.** A finding whose own entry is dated today now counts as already reaffirmed, so
the same sweep repeated the same day appends nothing (19 → 19 → 19). Reaffirmation across
days is unchanged: a re-detection tomorrow still appends one comment. Pinned by
`test_the_same_sweep_run_twice_leaves_the_log_byte_identical`, and the definition's claim
is now stated as byte-identical rather than same-length.

**`verify_context.py` — under-serves resource pages.** §2 of the definition promises "the
source material the syllabus names for that exam, with the URL each is available from."
For a `Resources/` path it delivers none of that: no exam content-outline URL, no surfaced
`Available from:` URL, and no back-link to `Exam 5 (CAS).md` — which is the file that
cites this resource *and* the one containing the `A1–A15, A17` string that decoded the
whole error. The agent found it by grepping. It also dumped ~200 irrelevant lines of
`Concepts/Ratemaking.md` into the bundle.

**Fixed.** A `Resources/` path now gets a section 6, "Exam pages citing this resource, and
their published syllabus": `exams_citing()` inverts the exam pages' Source Material
callouts (the same inversion `quiz/src/lib/resourceExams.ts` does for the app), and
`syllabus_url_for()` reads the exam's outline URL out of `quiz/src/data/examPdfLinks.ts` —
applying the app's own key rule, where a dash-less exam id picks up a `-1` suffix, so
Exam 5 resolves at `5-1`. The page's own `Available from:` URL is now surfaced as an
explicit fetch target. The concept-dump cap (`--max-concepts`) already existed and is
unchanged.

> For a `Resources/` path, the bundle should invert `quiz/src/lib/resourceExams.ts` to
> list the exam pages naming this resource, include that exam's syllabus URL from
> `quiz/src/data/examPdfLinks.ts`, and offer the page's own `Available from:` URL as a
> fetch target. Cap the linked-concept dump.

**`verify_record.py` — the best-built piece here.** The `--applied` / later-`resolution`
two-step is momentarily alarming (an applied finding stays `open` until separately
resolved) but is defensible: "applied in the tree" and "closed" are genuinely different
states. One missing affordance: no structured `--source-url` / `--source-hash` on a
finding, so provenance ends up embedded in `evidence:` prose.

**`verify_check.py`** — clean and fast. `0 error(s), 0 warning(s)` across 1700 content
files after the run.

## Where the guardrails were load-bearing

The agent reported three moments it was tempted to cut a corner. Two were held by rules
worth keeping:

- **Marking the page `verified`.** Two agreeing rank-1/rank-2 sources and a thorough check
  create real pull toward "the checking was good, so the page is verified" — while the page
  was still missing an examinable chapter. `verify_record.py` refuses `verified` while an
  open critical stands. Mechanical enforcement beat in-the-moment judgement, exactly as P1
  intends.
- **Rewriting the four bad bullets.** §6's line — *make the vault say what the source says,
  don't decide what is true* — held, but only via the reasoning that defect 1 above says
  should have been written down.

The third is a warning: after two 404s guessing at syllabus URLs, quitting with
"couldn't reach the syllabus, `in_review`" was available and §3 explicitly blesses it.
Scraping the CAS landing page for links took one more call and produced the finding that
justified the entire run. §3's escape hatch is correct, but it is one call away from
laundering a give-up into a legitimate outcome.

## Follow-up not in this run's scope

`quiz/src/data/examPdfLinks.ts` (~line 210) points Exam 5's syllabus at
`.../2023-06/Exam_5_Content_Outline.pdf`; CAS now serves
`.../2026-03/Exam_5_CO_2026_Fall.pdf`. Recorded in the page log as a note. Not changed
here — `docs/mock-exam-browser.md` requires those links be transcribed from the publisher
under its own rules, so it deserves its own pass.
