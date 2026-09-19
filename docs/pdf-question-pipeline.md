# PDF → question bank: the conversion pipeline

How an examiner's report, a released exam or an SOA sample-question booklet
becomes `questions/<bank>/*.md` files. Read this before changing
`scripts/pdf_extract.py`, `scripts/question_classify.py`,
`scripts/question_write.py`, `scripts/question_lint.py` or `scripts/mdmath.py`,
and before touching the `soa-exam-converter` / `cas-exam-converter` skills —
the skills are the operating instructions for these four stages, not a separate
method.

## The problem this solves

The first version of the converter was one instruction: *read the PDF and write
the files.* It produced good results, and it was extremely expensive, because
almost everything it spent tokens on was not a judgment:

- The question prompt, its exhibits and its five options crossed the context
  window **twice** — once as extracted text or a rendered page image, once as
  typed output.
- So did the publisher's worked solution.
- The 400-line skill, with its conventions and per-file checklist, was reloaded
  into every subagent that took a batch.
- And because the work ran as one tool call per question, the whole batch's
  context was re-sent on every turn of the loop.

None of the first three needs a model at all. A PDF's text layer *is* the
prompt; the answer key *is* in the solutions booklet; the point values *are*
printed next to each part. The expensive step was retyping them.

## The shape of the fix

Four stages. The first, third and fourth cost nothing; the second costs almost
nothing; a model is asked only for what is genuinely a judgment.

```
          ┌─ pdf_extract.py ──────────────────────────────┐   0 tokens
PDF(s) ──▶│ page text · exhibits → GFM tables · options   │
          │ answer key · point values · parts · solutions │
          └───────────────┬───────────────────────────────┘
                          ▼  records.jsonl + report.md
          ┌─ question_classify.py ────────────────────────┐   0 tokens
          │ learning_objective ← the bank's neighbours    │
          │ difficulty         ← the publisher's solution │
          │ topic · wiki_link  ← proposed, 5 candidates   │
          └───────────────┬───────────────────────────────┘
                          ▼  judgments.jsonl + review.md
          ┌─ the model, on the residue only ──────────────┐   the whole spend
          │ · one review.md line per topic decision       │
          │ · explanations the publisher wrote too terse  │
          │ · prompts on scanned pages with no text layer │
          └───────────────┬───────────────────────────────┘
                          ▼  explanations/<id>.md, prompts/<id>.md
          ┌─ question_write.py ───────────────────────────┐   0 tokens
          │ frontmatter in canonical order · body · parts │
          └───────────────┬───────────────────────────────┘
                          ▼  questions/<bank>/<id>.md
          ┌─ question_lint.py + validate_content.py ──────┐   0 tokens
          │ the per-file checklist, as code               │
          └───────────────────────────────────────────────┘
```

### What a scanned booklet costs

A CAS booklet is a scan with no text layer, so its prompts and exhibits cannot
be read the way the report can. Three routes, in order of preference:

1. **A text layer.** Nothing to do. Post-2020 papers increasingly have one.
2. **Local OCR (`--ocr`, needs `tesseract` on PATH).** Free, and good at prose:
   on Fall 2016 it recovered 22 of 26 prompts and every lettered sub-prompt.
   It reads at `OCR_DPI`, which is deliberately **not** the rendering budget:
   a render is paid for in vision tokens and OCR is paid for in CPU, so it runs
   at 300 dpi while pages render at 110. At the render budget the same Spring
   2016 pages come back as "Eamed", "Abenefit" and "ofone", with a column of
   the exhibit missing; at 300 the prose is clean.
   It is *not* good at tables — it dropped a column of policy counts from
   Q1's exhibit and misread "earned" as "eared" — so a record read this way is
   marked `ocr`, and one whose prompt contains an exhibit has its pages
   rendered anyway and says so in `report.md`. **Never ship an OCR'd exhibit
   without checking every figure against the image.**
3. **Vision on the rendered page.** The fallback, and the only route for a
   question OCR could not place at all.

Because a scanned booklet loses the `1.` that starts each question, there is
nothing for `segment` to key on. `align_booklet` recovers the boundaries from
the point values instead: the booklet prints `(1.25 points)` and `(0.5 point)`,
the report prints the same numbers as `TOTAL POINT VALUE` and `Part a: 0.5
point`, so the two sequences can be walked together. A question matches only
when its whole signature appears in order and its parts sum to its total; one
that does not is skipped and the next resumes from the same place. A matched
span ends at its own last marker, so an unmatched question can never have its
text absorbed into a neighbour — the property that makes a partial alignment
safe. On Fall 2016 that placed 22 of 26 prompts, stepping over the markers of
QUESTION 8, which the report omits entirely.

A scan can also land **between** the two cases, and Spring 2016 does: OCR good
enough to recover the `10.` of the later questions still loses the `1.` of the
earlier ones, whose numbers sit in a margin the engine reorders. So the two
readings are merged rather than chosen between — the booklet's own numbering
first, since it is the question's own label, and alignment only for the numbers
numbering missed. An aligned span may not begin inside a span numbering already
owns, and where it merely runs past one (its end is the *next* point marker,
which sits just after the next question's label) its tail is trimmed back to
that label rather than the span being thrown away.

### What `report.md` says about all this

Two lines under **Booklet coverage** state the things nothing downstream can
question: where the combined PDF was cut, and how many prompts each route
placed. They exist because a split in the wrong place still yields a full set
of questions, point values, sample answers and commentary — everything except
the question text — so the run *looks* healthy. When the booklet half produced
no prompt at all, the report says so in a banner instead of leaving it to be
inferred from 25 identical warnings.

### Stage 1 — `pdf_extract.py`

Reads the PDFs and writes `records.jsonl`, one JSON object per question (the
schema is in the module docstring). What it does that is worth knowing:

- **Segmentation auto-detects its pattern.** Several candidate shapes for a
  question start (`1.`, `Question 1`, `QUESTION 1`, `**1.**`) are each scored
  by how much the numbers they find look like a question sequence, and the best
  wins. A new publisher layout does not need a code change, and a `2.` inside
  an exhibit does not start a question, because out-of-sequence hits are
  dropped.
- **Exhibits come out as markdown tables.** Ruled tables via PyMuPDF's table
  finder; unruled ones — which is most exam exhibits — by splitting
  space-aligned runs of lines (`columnar_table`). Both go through
  `plausible_table`, which rejects what is actually prose or an option list: a
  candidate needs several short-celled rows, more than one column, and a column
  that is numbers all the way down. Column-shuffled exhibits were the single
  most error-prone part of hand transcription.
- **Running furniture is removed.** Lines repeated across most pages, compared
  with their digits blanked so page numbers group together. A repeated *shape*
  only counts as furniture if it carries real words or reads as a page number —
  otherwise `(C) 41` and `(C) 24` on consecutive pages would take the options
  out of the questions.
- **Reflow is conservative.** A PDF block's newlines are soft wraps, but a line
  is only joined to the one above when that line actually runs on: not after
  sentence-final punctuation, and never across a list item or a structural
  marker (`Part a:`, `Sample 1`, `SAMPLE ANSWERS`) — those markers are what the
  rest of the parse keys on. Being conservative is free on screen, since a
  single newline inside a markdown paragraph renders as a space.
- **Characters are normalised on the way through** by `mdmath.normalize_markdown`,
  which is math-aware: `×` becomes `\times` inside `$…$` and stays a literal in
  prose, `½` becomes `\frac{1}{2}` or `1/2` for the same reason.
- **Vision is the last resort.** A page with no text layer is rendered to
  greyscale PNG, cropped to the inked area (a cheap 36-dpi probe finds the
  box), at 110 dpi rather than 150 — together about a **2.4×** saving per page
  over a full-page 150-dpi colour render. With `--ocr` and a local `tesseract`
  on PATH, those pages are read locally instead and cost nothing; the record is
  marked `ocr` and the report asks for a spot-check, because OCR is fallible in
  a way a text layer is not.

`report.md` says how many questions were segmented, how many have an answer
letter and a solution, which need vision, which came from OCR, and every
warning — plus the token estimate below. **Read it before going further**: it is
the cheapest possible statement of what is left to do.

### Which explanations to rewrite

A publisher's sample answer ships as the explanation whenever it reads as one,
and rewriting the rest is the largest model cost left in a conversion — so
*finding* them by reading every sample costs about as much as the rewriting
does. `unreadable_sample` names them instead, from the shapes that always read
badly because a PDF lost their structure: a column of bare numbers where a
triangle was, a markdown row holding a whole column per cell, space-aligned
columns that never became a table, several calculation steps run onto one line,
and letters from a font the PDF could not map. They are listed in `report.md`
under **Explanations worth rewriting**; measured against a hand review of
Spring 2016 the list named 10 of the 12 that needed work and nothing that did
not. It is advisory in both directions — nothing is rewritten automatically,
and a sample it does not name is still worth a glance.

### Stage 2 — `question_classify.py`

Two signals, used for what each is measurably good at.

**The bank's nearest neighbours.** The 1,400 questions already in the bank are
1,400 classifications a person made, which makes them the best predictor
available. TF-IDF over the question body, cosine similarity, a
similarity-weighted vote among the five closest. That vote decides
`learning_objective`, and — fused with the other signal — proposes the topic.

**Phrase matching against `Concepts/`.** The concept pages whose names the
question's own text uses, scored by specificity so "Conditional Probability"
beats the "Probability" inside it, and plural-tolerant so "written exposures"
finds `Written Exposure`. This also builds `wiki_link`.

The two rankings are combined by reciprocal-rank fusion (`rank_candidates`) —
no tuned weight, and measurably better than concatenating them. A voted
objective is reconciled with what the bank already writes: the Exam 5 syllabus
says `B. Estimating Claim Liabilities (Reserving)` and every question in the
bank says `Reserving`, and grouping with the existing questions matters more
than matching the PDF.

`difficulty` is a proxy from the publisher's own solution — how many steps and
display equations they needed; for a CAS question, its point value and part
count.

`topic` is written to the leading candidate so `judgments.jsonl` is usable, but
`needs_review` stays set unless both signals agree. See **What the review is
buying** below for why that is the right call and what it costs.

### Stage 3 — `question_write.py`

Assembles the file: frontmatter in the bank's canonical key order, the prompt,
the options as `- A) …`, `## Part a (… points)` sections for CAS, and the
explanation. Two per-question overrides, each a directory of `<id>.md`:
`--explanations` (a rewritten walkthrough) and `--prompts` (a transcribed
scanned page). `--only 1-25`, `--dry-run` and `--force` bound a run.

**Keep both directories outside `--out`.** Everything in the build directory is
regenerable — re-running stage 1 rewrites it, and clearing it is the usual way
to re-extract — while a transcription and a rewritten solution are the one part
of the run that cost real attention and cannot be recovered from the PDF. Put
them beside it (`<build>/../prompts`, `<build>/../expl`), not inside.

It refuses to write a file that would land incomplete — no prompt, no topic, or
nothing under its explanation heading — and names it instead. A missing
`verification:` block is **correct**: that is derived state owned by
`verify_check.py --sync` (see `docs/verification.md`), which backfills it.

### Stage 4 — `question_lint.py`

The per-file checklist the skills used to spell out, as code: literal `\n`
escapes, un-normalised characters, `align*` rows that pack a formula and its
result onto one line, part points that do not sum to `points`, options that
skip a letter, an explanation heading with nothing under it. `--fix` applies
what `mdmath` can repair safely.

Schema checks — required keys, valid difficulty, the answer letter matching an
option, orphan `wiki_link`s — stay in `scripts/validate_content.py`. Run both.

## The token budget

Measured, not asserted. The figures below come from `token_estimate` in
`pdf_extract.py` run over the real bank's own sizes — median Exam P question
418 characters of prompt and 575 of explanation; median Exam 5 question 878 and
2,312 — so they can be reproduced, and every conversion prints its own numbers
in `report.md`.

**250-question SOA sample set, text-layer PDFs:**

| | input | output | total |
|---|---|---|---|
| transcribe by hand (content floor) | 72,000 | 72,000 | 144,000 |
| this pipeline, topic review included | 11,250 | 3,000 | **14,250** — 10.1× |
| …with a tenth of the explanations rewritten | 14,825 | 8,975 | **23,800** — 6.1× |

The baseline is a *floor*: each character once in, once out, and nothing else.
The old flow also reloaded the 400-line skill into every batch subagent
(≈ 5.5k tokens × 9 batches ≈ 50k) and ran one tool call per question, so the
batch's whole context was re-sent on every turn. Counting the skill reload
alone takes the comparison past 13×; counting the per-turn re-send takes it
several times further.

**CAS Exam 5, Fall 2016** — measured on the real paper (96 pages: a 31-page
scanned booklet, a 65-page text-layer report), which is what the CAS
`admissions_studytools_exam5_*` PDFs look like generally:

| | input | output |
|---|---|---|
| transcribe by hand (content floor) | 61,032 | 13,766 |
| pipeline with `--ocr`, exhibit pages rendered for checking | 21,672 | 1,192 |

About **3.3×**, and the shape of it matters more than the ratio. The report side
is free and complete: 26 questions, every point value, every per-part sample
answer and commentary. The booklet side is a scan, and that is where the
remaining cost sits — see **What a scanned booklet costs** below.

### What the review is buying

Measured leave-one-out over the current bank, so it can be re-run:

| bank | topic: leading candidate | topic: in the 5 candidates | objective correct | needs review |
|---|---|---|---|---|
| exam-p | 40% | 74% | 78% | 89% |
| exam-fm | 55% | 89% | 88% | 94% |
| exam-5 | 31% | 73% | 96% | 91% |
| exam-mas-i | 51% | 87% | 87% | 85% |
| exam-mas-ii | 46% | 86% | 83% | 90% |

Two things follow. The **objective** is accurate enough to assign, so it is.
The **topic** is not — not because the matcher is weak but because the authored
topic is frequently a broader page than the question's own words name, which is
a judgment about where the question belongs in the syllabus. So the pipeline
does not pretend to make it: it narrows the choice to five candidates and asks,
at ~45 tokens a question instead of ~600.

`--accept-unreviewed` writes the leading candidate and skips the asking. That
is a ~60× run with a topic wrong roughly half the time — worth it only if the
plan is a review pass afterwards (for `exam-p` / `exam-fm`,
`scripts/standardize_questions.py` will at least canonicalise whatever it is
given, and `scripts/ontology_report.md` lists what it could not map).

Where the remaining spend goes, and what moves it:

- **`needs_review` rate.** Every question the classifier resolves is free. The
  rate falls as `Concepts/` and `scripts/ontology_map.py` fill in — so adding a
  missing concept page makes every future conversion cheaper.
- **Explanation rewrites.** SOA solutions are usually clean enough to ship as
  the explanation after normalisation. CAS sample answers often are not. Only
  rewrite the ones that read badly; do not rewrite for style.
- **Scanned pages.** The irreducible cost, unless `--ocr` is available.

The estimate is always in `report.md`, computed by `token_estimate` — there is
no separate `--stats` flag — so the claim is checkable on each real exam rather
than taken on faith.

## Running it

```bash
pip install pymupdf   # once; the only non-stdlib dependency, and only for stage 1

# SOA: separate question and solution booklets
python3 scripts/pdf_extract.py --exam p \
    --questions sample-questions.pdf --solutions sample-solutions.pdf \
    --out /tmp/exam-p

# CAS: one combined booklet + examiner's report (add --ocr for a scanned booklet)
python3 scripts/pdf_extract.py --exam 5 --year 2019 --session Spring \
    --pdf exam5-spring-2019.pdf --out /tmp/exam-5

cat /tmp/exam-p/report.md

python3 scripts/question_classify.py --records /tmp/exam-p/records.jsonl \
    --out /tmp/exam-p/judgments.jsonl          # then settle the review list

python3 scripts/question_write.py --records /tmp/exam-p/records.jsonl \
    --judgments /tmp/exam-p/judgments.jsonl --only 1-5 --dry-run   # pilot first

python3 scripts/question_lint.py questions/exam-p
python3 scripts/validate_content.py
python3 scripts/verify_check.py --sync
```

Tests: `python3 -m unittest discover -s scripts` (see
`scripts/test_pdf_pipeline.py`, which builds its own fixture PDFs and skips the
PDF-reading cases when PyMuPDF is absent).

## Failure modes and what they look like

| symptom | cause | what to do |
|---|---|---|
| `no questions segmented` | none of the candidate patterns matched | look at the PDF's text (`python3 -c "import pymupdf; print(pymupdf.open('x.pdf')[3].get_text())"`) and add a pattern to `QUESTION_PATTERNS` |
| question count is short by a few | a start line was mis-numbered or out of sequence | the skipped numbers are the gap in `report.md`; write those few by hand with `--only` |
| an exhibit came out as a joined paragraph | the table was neither ruled nor space-aligned | transcribe that one prompt into `--prompts` |
| `no answer letter found` for many | the solutions booklet uses a key shape not in `ANSWER_PATTERNS` | add the pattern; do **not** infer an answer from the worked solution |
| options are missing | the booklet sets them in a way `split_options` does not read | check whether they were eaten as furniture or as a table first |
| a prompt looks subtly wrong and the record says `ocr` | OCR error | that is what the spot-check is for; fix in `--prompts` |
| a question's numbers disagree with its exhibit, record says `ocr` | OCR dropped or misread a table column | re-transcribe that exhibit from `pages/` into `--prompts`; never publish the OCR'd figures |
| the report skips a question number | the publisher omitted it (Fall 2016 has no QUESTION 8) | nothing to do — it is not in the paper's report |
| a field parses as `OTAL POINT VALUE` | the PDF's text layer dropped a leading glyph | already handled: the field labels accept a missing first letter |
| every question has a solution and **no prompt at all** | the booklet half was never read — see the `Booklet coverage` banner in `report.md` | check where the split landed and whether the booklet's text needs `--ocr`; this looks like a healthy run and is not |
| the split lands at page 1 (no booklet half) | the `SAMPLE ANSWERS AND EXAMINER'S REPORT` header did not match | already handled for exotic whitespace (below); otherwise the header shape is new and belongs in `_split_combined` |
| a whole question's parts carry the *commentary* as their answer | `EXAMINER'S REPORT` was not recognised as a heading, so the sample/commentary split never happened | already handled for a typographic apostrophe; a new heading shape goes in `CAPS_HEADING_RE` |
| one question loses every sample after the first | the report boxes its samples, and the box was read as a table, so `Part b:` stopped being line-initial | already handled: `Part a`/`Sample 1` in a cell mark the candidate as structure |
| every question ships commentary and **no sample answer at all** | the report heads its samples with a qualifier — Spring 2015 prints `SAMPLE/ACCEPTED ANSWERS:` — so the sample block was never found | already handled: the heading takes an optional `/QUALIFIER`, and both it and `EXAMINER'S REPORT` swallow their trailing colon |
| the whole report is parsed but question 1 is missing | its heading reads `QUESTION: 1` where the rest read `QUESTION 2` (Fall 2015) | already handled: the heading accepts an optional `:` or `#` before the number |
| a single-part question's explanation is one short heading | the report heads its samples by approach (`2-Step Method:`) and the heading landed in front of the first `Sample Answer 1` marker | already handled: a heading travels with the sample it introduces |
| a single-part question ships only the first of several samples | the publisher's other approaches were parsed but never written | already handled: `alternatives` rides along under `Alternatively:`, as it does for a part |
| the writer refuses a question for `no prompt text` and its parts read fine | the question has no stem — Fall 2015 Q2 and Q15 open straight on `a. (0.75 point)` | already handled: an empty stem is only a gap when the parts are empty too |
| part points do not sum to `TOTAL POINT VALUE` | a booklet span over-ran into the next question's page and took its `c. (0.5 point)` with it | already handled: the surplus part is dropped and the warning says so — the report prices the paper |

## The rules this pipeline does not bend

- **Transcribed, never constructed.** An answer letter comes from the solutions
  document or the question has none. A point value is printed or absent. The
  same rule the pass-rate and examiner's-report tables follow
  (`docs/mock-exam-browser.md`).
- **An unresolvable question yields no file**, not a guessed one. Stage 3
  refuses and names it.
- **`verification:` is never hand-written** (`docs/verification.md`): a new file
  is unverified until an auditor checks it against a citable source, and a body
  edit correctly downgrades it to `stale`.
- **New concept pages are flagged to a human**, per `CLAUDE.md` — the
  classifier never invents a `Concepts/` page, it only matches existing ones.
