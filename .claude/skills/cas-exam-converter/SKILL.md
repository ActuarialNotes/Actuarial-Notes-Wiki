---
name: cas-exam-converter
description: Convert a CAS "Sample Answers and Examiner's Report" PDF (Exam 5/6/7/8/9, etc.) into per-question markdown files for the questions/<exam-id>/ bank used by the quiz app. Use when the user provides a CAS exam PDF (question booklet + examiner's report, combined or separate) and asks to add, convert, or import exam questions into the wiki.
---

# CAS Examiner's Report → Question Bank Converter

The conversion is a **scripted pipeline**, not a transcription job. Read
`docs/pdf-question-pipeline.md` once for the design; this file is the operating
procedure. `questions/exam-5/cas5-2018-001.md` is the format reference.

**Do not read the report and type out question files.** The examiner's report
is structured text — `TOTAL POINT VALUE`, `Part a: 0.5 point`, `Sample 1`,
`EXAMINER'S REPORT`, `Part a` — and `pdf_extract.py` parses all of it: point
values, per-part sample answers, per-part commentary, and the booklet's
lettered sub-prompts. Retyping it is the expensive mistake this pipeline exists
to remove.

## 0. Set up

```bash
pip install pymupdf
tesseract --version    # optional; if present, pass --ocr below
```

## 1. Extract

```bash
python3 scripts/pdf_extract.py --exam 5 --year 2019 --session Spring \
    --pdf exam5-spring-2019.pdf --out /tmp/exam-5 --ocr
cat /tmp/exam-5/report.md
```

- `--pdf` for a combined booklet + report (the split is found by the
  `SAMPLE ANSWERS AND EXAMINER'S REPORT` header); `--questions` / `--solutions`
  when they arrive as two files.
- `--year` is the **sitting year**, not a data year inside a question: a Spring
  2019 paper about CY 2018 losses is `2019`.
- `--session` disambiguates the two sittings a year, giving ids
  `cas5-2019s-q1` / `cas5-2019f-q1`. Check `ls questions/exam-<N>/` for what
  the same year already uses and match it; ask the user if it is ambiguous.
- `--ocr` reads scanned booklet pages locally instead of leaving them for
  vision. Always pass it when tesseract is there: on Fall 2016 it recovered 22
  of 26 prompts for nothing. The booklet's question numbers do not survive a
  scan, so the prompts are aligned to the report on their printed point values
  (`align_booklet` — see the design doc); a question that cannot be placed is
  left for vision rather than guessed at.
- **An OCR'd exhibit is never publishable as-is.** OCR reads prose well and
  tables badly — on Fall 2016 it dropped a column of policy counts and turned
  "earned" into "eared". `report.md` names every question whose prompt carries
  an exhibit and renders its pages; check every figure against the image and
  re-transcribe the exhibit into `prompts/<id>.md`.

**Read `report.md`.** It gives the coverage, the questions needing vision, the
OCR'd ones, and any question whose part points do not sum to its
`TOTAL POINT VALUE` — which is the one arithmetic check worth doing by hand
before anything else.

## 2. Classify

```bash
python3 scripts/question_classify.py --records /tmp/exam-5/records.jsonl \
    --out /tmp/exam-5/judgments.jsonl
```

`learning_objective`, `difficulty` and `wiki_link` come out settled — on Exam 5
the objective vote measures 96% accurate, since the syllabus has only two. The
**topic** is the real judgment, and it is asked in `review.md` beside the
judgments file: one line per question with the id, its imperative clause, and
five candidates.

**Read `review.md`, not the questions.** For each line set `topic` in
`judgments.jsonl` to the most specific existing `Concepts/*.md` page for the
question's core technique (`Exposure Base`, `Bornhuetter-Ferguson Method`,
`Trended On-Level Premium`). Exact filename, no `.md`. Never invent one; raise
it with the user instead (`CLAUDE.md`).

Two things to know:

- **Ignore the `LEARNING OBJECTIVE(S): A3` codes** the report prints — CAS
  renumbers them between syllabus years. They stay in the record for reference
  and are never written to frontmatter.
- `difficulty` comes from point value and part count; override it if the report
  says the question was a major differentiator.

## 3. Pilot, then write

Two or three questions first, for the user to check — `topic` and
`learning_objective` choices set precedent for the rest of the paper.

```bash
python3 scripts/question_write.py --records /tmp/exam-5/records.jsonl \
    --judgments /tmp/exam-5/judgments.jsonl --only 1-3 --dry-run
```

Each part becomes `## Part a (0.5 points)` with the booklet's sub-prompt, an
`### Explanation` from the clearest sample answer, and `### Examiner Report`
from that part's commentary. Then drop `--dry-run`, and after the user's review
drop `--only`. The writer refuses a question whose topic is still unreviewed —
`--accept-unreviewed` is for a deliberate fast pass with a review to follow,
not a way past a question you have not looked at.

The report's *overall* commentary stays in `records.jsonl`: every
`### Examiner Report` in the bank's format is per-part, and this pipeline does
not invent a section the app does not render.

## 4. Fill the gaps the scripts name

- **`needs_vision`** — the booklet page is a scan and OCR was unavailable. Its
  page is rendered to `/tmp/exam-5/pages/`. Read the image and write the prompt
  markdown to `/tmp/exam-5/prompts/<id>.md`, then pass `--prompts`. Transcribe
  exactly: wording, all parts and their point values, every exhibit row as a
  markdown table, bullet assumptions before the lettered parts. Skip page
  furniture.
- **A sample answer that does not read as a walkthrough** — CAS samples are
  candidate handwriting transcribed, so this is common. Rewrite into prose plus
  `$$…$$` / `$…$` and save to `/tmp/exam-5/expl/<id>.md`, then pass
  `--explanations`. If a second sample shows a genuinely different valid
  approach, the writer already appends it as `Alternatively:`.
- **A descriptive part with no numeric answer** — no `### Answer` section;
  synthesise a model answer from what the commentary says was expected.
- **An `### Answer` value** — add it to the part in `records.jsonl` if the
  sample states a single final figure worth surfacing. Never compute one the
  report does not give.

## 5. Check

```bash
python3 scripts/question_lint.py questions/exam-5      # --fix for mechanical ones
python3 scripts/validate_content.py
python3 scripts/verify_check.py --sync
```

The linter covers the old per-file checklist: point sums, part sequence, LaTeX
readability, OCR characters. `verification:` is never hand-written
(`docs/verification.md`).

## 6. Commit

```
Add CAS Exam 5 Spring 2019 questions 1-12
```

## Known gaps

- `scripts/standardize_questions.py` and `scripts/update_wiki_links.py` have no
  Exam 5+ entries in `ontology_map.py` — do not run them on these banks.
- Exam 6/7/8/9 have no question bank yet and `examStatus.ts` lists them as *in
  development*; converting a paper for them is fine, but the exam does not
  become studiable until that status moves.
- The classifier leans on `Concepts/` coverage, which is thinner for Exam 5+
  than for P/FM, so expect a longer review list. Every concept page added
  shrinks it for the next paper.
