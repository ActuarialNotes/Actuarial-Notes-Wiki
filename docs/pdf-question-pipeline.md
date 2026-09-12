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

**25-question CAS paper with a scanned booklet:** about **2.6×**. The
examiner's report parses for free, but the page images are irreducible —
unless `tesseract` is on PATH, in which case `--ocr` reads them locally and the
paper behaves like a text-layer one. Budget a few vision spot-checks of OCR'd
prompts against that.

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
