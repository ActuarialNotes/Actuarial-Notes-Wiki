---
name: soa-exam-converter
description: Convert SOA sample question PDFs (Exam P, FM, etc.) into per-question markdown files for the questions/<exam-id>/ bank used by the quiz app. Use when the user provides SOA sample question and solution PDFs and asks to add, convert, or import exam questions into the wiki.
---

# SOA Sample Questions → Question Bank Converter

The conversion is a **scripted pipeline**, not a transcription job. Four stages
do the reading, the lookups, the assembly and the checklist; you spend tokens
only on what the scripts flag. Read `docs/pdf-question-pipeline.md` once for the
design; this file is the operating procedure.

**Do not read the PDF and type out question files.** Everything a booklet
prints — prompts, exhibits, the five options, the answer key, the worked
solutions — is extracted mechanically. Retyping it is the expensive mistake
this pipeline exists to remove.

## 0. Set up

```bash
pip install pymupdf          # the only dependency, and only for stage 1
```

## 1. Extract

```bash
python3 scripts/pdf_extract.py --exam p \
    --questions sample-questions.pdf --solutions sample-solutions.pdf \
    --out /tmp/exam-p
cat /tmp/exam-p/report.md
```

`--exam` is `p`, `fm`, `mas-i` or `mas-ii` (it sets the bank and the id prefix:
`p-004` → `questions/exam-p/p-004.md`, matching the SOA question number
zero-padded to three digits). A combined PDF goes in `--questions` alone.

**Read `report.md` before anything else.** It is the cheapest statement of what
is left: how many questions segmented, how many have an answer letter and a
solution, which need vision, and every warning. If it says `no questions
segmented`, or the count is well short of the set, see the failure-mode table in
the design doc — the fix is a pattern in `QUESTION_PATTERNS` or
`ANSWER_PATTERNS`, not a hand transcription.

Questions already in the bank are not skipped by the extractor; stage 3 skips
them (it will not overwrite without `--force`).

## 2. Classify

```bash
python3 scripts/question_classify.py --records /tmp/exam-p/records.jsonl \
    --out /tmp/exam-p/judgments.jsonl
```

`learning_objective`, `difficulty` and `wiki_link` come out settled. The
**topic** is the one real judgment, and it is asked in `review.md` beside the
judgments file: one line per question — the id, the question's imperative
clause, and five candidate concepts.

**Read `review.md`, not the questions.** That is the whole design: the prompt,
the options and the solution are already extracted, and re-reading them to
choose a topic is what made the old flow expensive. For each line pick a
candidate (or another existing `Concepts/*.md` page — `ls Concepts/ | grep -i
<keyword>`) and set `topic` in `judgments.jsonl`. Never invent a page name; if
nothing close exists, raise it with the user rather than creating one silently
(`CLAUDE.md`).

The authored topic is among the five candidates about three-quarters of the
time, so expect to reach past the list occasionally. A question whose objective
could not be voted is listed separately at the end of the sheet — give it one of
`grep -h learning_objective questions/exam-p/*.md | sort -u`.

`references/topic-map.md` has the Exam P and FM topic → concept → objective
table. Load it only if the candidate lists are not enough.

## 3. Pilot, then write

Do five questions first and have the user check the topic/objective choices —
they set precedent for the rest of the set.

```bash
python3 scripts/question_write.py --records /tmp/exam-p/records.jsonl \
    --judgments /tmp/exam-p/judgments.jsonl --only 1-5 --dry-run
```

Then drop `--dry-run`, and once the user is happy, drop `--only`. Anything the
writer refuses it names — no prompt, no explanation, or a topic still flagged
unreviewed. Fix the cause; do not force a file out. `--accept-unreviewed`
exists for a deliberate fast pass with a review to follow, not as a way past a
question you have not looked at.

## 4. Explanations, only where needed

The SOA's own worked solution becomes the `## Explanation` after normalisation,
which is usually right. Rewrite one only when it reads badly — raw OCR
fragments, no steps, a table that needs prose around it. Write the replacement
to `/tmp/exam-p/expl/<id>.md` and pass `--explanations /tmp/exam-p/expl`.

When you do rewrite: prose + LaTeX, one `align*` block per derivation with each
step on its own `&=` line, no repeat of the options, no `### Answer` heading
(the answer is in the frontmatter). The linter enforces the rest — do not
re-derive the style rules, run stage 5.

A question whose booklet page is a scan is marked `needs_vision` and its page is
rendered to `/tmp/exam-p/pages/`. Read that image, write the prompt markdown to
`/tmp/exam-p/prompts/<id>.md`, and pass `--prompts`. Transcribe exactly:
wording, numbers, dates, all five options, tables as markdown tables.

## 5. Check

```bash
python3 scripts/question_lint.py questions/exam-p     # --fix for the mechanical ones
python3 scripts/validate_content.py
python3 scripts/verify_check.py --sync                # backfills verification:
```

All three must be clean. `verification:` is never hand-written
(`docs/verification.md`): a new question is `unverified` until an auditor checks
it against a citable source.

## 6. Commit

One commit per batch of ~25–50 questions:

```
Add SOA Exam P sample questions 101-150

Questions from the SOA official sample set (last revised <date>).
```

The revision date goes in the message, never in a filename or frontmatter.

## Known gaps

- `scripts/standardize_questions.py` + `scripts/update_wiki_links.py` cover
  `exam-p` and `exam-fm` and are safe to run after a batch there.
- The SOA sometimes renumbers questions between revisions of a sample set. If
  the ids collide with existing files, read the existing ones before passing
  `--force` — the numbers may no longer mean the same question.
- FM leans on annuity-factor tables; check a few exhibits in the pilot batch
  before scaling up.
