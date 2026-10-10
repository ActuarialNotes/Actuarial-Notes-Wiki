---
name: question-writer
description: Write original practice questions for any concept in Actuarial Notes — pedagogically sound, aligned to the exam's learning objectives, and deliberately spread across Bloom's taxonomy (Remember → Understand → Apply → Analyze → Evaluate → Create). Writes any question format the quiz app can serve — single-best-answer multiple choice, CAS-style I/II/III multiple true-false, true/false, matching, ordering, numeric or one-word short answer, multi-step calculations and self-graded written answers — as `questions/<exam-id>/<prefix>-an-<nnn>.md` files. Use whenever the user asks to write, generate, draft or add practice questions, quiz questions, exam-style questions or a question set for a concept, a learning objective or an exam ("write questions on the Kolmogorov-Smirnov test", "add MAS-I questions for the concepts with none", "make a Bloom's-ladder set for Tweedie", "fill the coverage gaps in Exam 5"), including when they name a format ("a matching question on GLM link functions", "short-answer questions on QQ plots"). Not for importing questions from a past paper or sample PDF — that is soa-exam-converter / cas-exam-converter, which never write a question themselves — and not for the parked flashcard comprehension checks (flashcard-comprehension-check).
---

# Question Writer

Writes **original** questions for the bank the quiz app serves. A past paper is
transcribed, never written (`docs/pdf-question-pipeline.md`); this skill is the
other half — what the vault adds where the examining bodies published nothing.

It grew out of `flashcard-comprehension-check`, whose rules for a single
misconception-driven multiple-choice item (the **fork**, distractor design, the
longest-option tell, `$` escaping) are kept here and extended to every format and
every level of Bloom's taxonomy.

Read these before the first question of a session:

- `references/bloom.md` — the six levels, the verbs and question stems for each,
  what each level looks like on an actuarial exam, and the mix to aim for.
- `references/formats.md` — every format as a copy-ready markdown template, with
  which Bloom levels it suits and how the app grades it.

## What a sound question is

Six principles, in the order they are applied. A question that breaks one is
rewritten, not shipped.

1. **Aligned.** Every question tests one stated learning objective of the exam
   page that links the concept (constructive alignment). Find the objective
   *before* writing; if the concept serves no objective at the level you were
   about to test, test it at the level the objective names. MAS-I objective C.8
   says *analyze* diagnostic plots — so a QQ-plot question asks the reader to read
   a described plot and diagnose the model, not to recall what "QQ" stands for.
2. **Leveled.** Every question is written to one Bloom level, chosen before the
   stem is, and recorded in `bloom:`. The level is set by *what the reader must
   do* — the verb — not by how hard it is: a long calculation is still *Apply*,
   and a one-line question that makes the reader pick between two defensible
   models is *Evaluate*. `difficulty` and `bloom` are independent axes.
3. **Built on a fork.** The item separates a reader who understands from one who
   holds a specific, common misconception — the fork principle. Find the fork
   first (definition → the one to three things a half-informed reader would
   substitute → the scenario where the two give different answers); every
   distractor, every wrong-but-tempting number, is one of those substitutions.
4. **One construct.** The question tests the concept, not reading speed, algebra
   stamina or a trick of wording. Numbers are clean enough that a mistake is a
   conceptual one; the stem carries everything needed and nothing that isn't
   (except a deliberately irrelevant fact at Analyze, where ignoring it *is* the
   skill).
5. **Correct and checkable.** Every number in a stem, option and explanation is
   computed by code you ran in this session (Python, or the connector's
   `run_tool` for the calculators it covers), never mental arithmetic. Every
   claim matches the concept page and the syllabus reading; where the page and
   the reading disagree, the reading wins and the page gets a finding, not a
   silent workaround.
6. **Teaching feedback.** The explanation is where the learning happens. It
   works the right answer step by step, then says **why each wrong option is
   wrong** — naming the misconception it was built from — so a reader who chose
   it learns what they believed. A bare "the answer is C" fails this skill.

## Workflow

### 1. Scope the concept

- Read `Concepts/<Concept>.md` in full, and the exam page(s) that link it:
  which objective(s) (`> [!example]-` callouts) and which reading.
- Choose the bank: the exam the user named, else the earliest exam page linking
  the concept (`questions/<exam-id>/`, labels in `scripts/validate_content.py`
  `EXAM_LABEL_BY_DIR`).
- Look at what the bank already asks about it —
  `grep -l "Concepts/<Concept+With+Pluses>" questions/<exam-id>/*.md` — and at the
  shape of the real exam's questions (a past paper's file in the same bank), so a
  new item looks like what the candidate will sit. MAS-I is five-option (A–E)
  multiple choice, often with numeric ranges as options.
- For a gap sweep: `Concepts Without Review Questions.md` lists, per exam, the
  syllabus concepts no question is tagged with (regenerate with
  `python3 scripts/generate_coverage_report.py`).

### 2. Plan the ladder before writing

For each concept write a one-line plan per question: **objective · Bloom level ·
format · fork**. For a concept with no questions, write **two**, at different
levels and in different formats — the lower one checks the idea is understood,
the higher one checks it can be used; a third (Evaluate/Create) where the
objective reaches that high. A purely generic term (*Claim*, *Random Variable*)
may get one, but it must still be a real question about how the term is *used*
on this exam, not a definition quiz. See `references/bloom.md` for the target mix.

### 3. Write

Use the template from `references/formats.md` for the chosen format. The
frontmatter:

```yaml
---
id: "masi-an-001"
exam: "Exam MAS-I"
topic: "Kolmogorov-Smirnov Test"          # the concept under test, as its page is named
learning_objective: "Statistics"          # the exam's domain, as the bank already spells it
difficulty: medium                        # easy | medium | hard
type: multiple-choice                     # multiple-choice | free-entry | multi-part
bloom: analyze                            # remember | understand | apply | analyze | evaluate | create
wiki_link:
  - Concepts/Kolmogorov-Smirnov+Test      # the concept under test first
  - Concepts/Empirical+Distribution       # then every other concept the reader must use
answer: "C"                               # omit for multi-part
points: 1
---
```

- **id and filename** are the same: the bank's id prefix (`p`, `fm`, `masi`,
  `masii`, `cas5`, `cas6c`, `cas7`, …), then `-an-`, then the next free number,
  three digits (`masi-an-001.md`). `questionPublisher.ts` reads any `-an-` id as
  the vault's own question — never reuse a past paper's id shape, and never add
  `year:` or `session:` (`questionPublisher.test.ts` fails a dated `-an-` file).
- `topic` is the concept's page name; `learning_objective` the domain label the
  bank already uses (MAS-I: `Probability Models (Stochastic Processes and Survival
  Models)`, `Statistics`, `Extended Linear Models`).
- `wiki_link` paths are `Concepts/` + the page name with spaces as `+`. The first
  is the concept under test; tag every other concept a correct answer genuinely
  uses (that is what the app's mastery tracking credits) and no more.
- `points`: 1 for a single item; for multi-part, the sum of the parts.
- Leave out `verification:` — step 5 backfills it.

Writing rules that apply to every format:

- **Stem first, complete on its own.** A reader who covers the options should be
  able to answer (the "cover test"). Put the problem in the stem, not in the
  options; keep it as short as the scenario allows.
- **Positive phrasing.** Ask what *is*; when a negative is the point, bold it
  (**NOT**, **least**) and never stack two negatives.
- **Homogeneous options.** All numbers, or all statements of the same kind and
  length; in ascending order for numbers; no "all of the above" / "none of the
  above" (I/II/III items use CAS's fixed key instead — see formats).
- **No clues.** The concept's name is not in the correct option; no grammatical
  mismatch between stem and options; no absolute words ("always", "never") only
  in the distractors; and **the correct answer is not the longest option** — give
  each distractor its own reason clause or trim the key to its claim.
- **One right answer**, defensible against the reading. If an expert could argue
  for a second option, rewrite the stem or the option.
- **Numeric options** are each a specific mistake's result (wrong formula, the
  sample variance with `n` instead of `n−1`, a forgotten offset, `exp` not taken)
  or CAS-style ranges built so each mistake lands in a different range.
- **Context is actuarial where it can be** — claims, exposures, policies,
  reserves, a pricing model — because that is how the exam frames it.
- **Math is LaTeX**: `$…$` inline, `$$…$$` display on their own lines. **Escape
  currency** (`\$1,200`), and never open inline math on a bare digit
  (`$0.72$` is ambiguous to the corpus checks — write `$p = 0.72$`, or plain 0.72).
- Free-entry answers are compared after stripping `$ , €` and rounding to four
  decimals, case-insensitively — so the stem must say exactly what to enter
  ("to two decimal places", "as a whole number", "the letters in order, e.g.
  BCAD") and `answer:` must be that exact form.

### 4. Write the explanation

Every type carries one (`## Explanation` for single items, `### Explanation` per
part):

1. The reasoning that leads to the answer — formulas in display math, each step
   on its own line, the final value in bold.
2. **Why not the others:** one line per wrong option naming the misconception
   (`- **A** uses the population variance, dividing by $n$ …`). For free-entry,
   the two or three most likely wrong entries and where they come from.
3. No `[[wiki links]]`: question markdown doesn't render them, and the
   concepts are already reachable — `wiki_link` puts them in the quiz's Info
   panel, and a tagged concept written out in the stem becomes tappable
   (`lib/conceptMentions.ts`). Name the concept in the stem in plain words.

For a written (self-graded) part, the explanation *is* the sample answer: write
what a full-credit answer contains, as the examiners would — the points to make,
then a model answer — so a reader can grade themselves against it.

### 5. Check

From the repo root, after each batch:

```bash
python3 scripts/verify_check.py --sync                       # backfills verification: (unverified)
python3 scripts/validate_content.py questions/<exam-id>      # schema, answer key, orphan links
python3 scripts/question_lint.py questions/<exam-id>         # math, part points, option order
python3 .claude/skills/question-writer/scripts/audit_questions.py questions/<exam-id>
cd quiz && npx vitest run src/lib/questionBank.test.ts src/lib/questionPublisher.test.ts
python3 scripts/generate_coverage_report.py                  # the gap list, refreshed
```

`audit_questions.py` reports what batch authoring drifts on: a missing or invalid
`bloom:`, the level and format spread per concept and across the batch, the
answer-letter spread, the correct option being the longest, an unescaped `$`
before a digit, a question with no "why not" feedback, and a concept tested at a
single level only.

Then reread every question once as the **candidate**: cover the options and
answer; check the key by working it again; ask whether a test-wise guesser could
pass without the concept. Fix before committing.

### 6. Hand over

New questions are `unverified`: per `docs/verification.md` (P1), reasoning is
not verification, and nothing this skill writes may be marked `verified` — the
VALIDATE agent does that against a cited source. Per `CLAUDE.md`, vault content
is AI-assisted, not AI-final: tell the user what was written (per concept: level,
format, key), any concept page that disagreed with its reading, and that the set
awaits their review.

## Gotchas

- **Parser shapes.** A `multiple-choice` file needs `- A) …` option lines and
  `## Explanation`; a `multi-part` file needs `## Part a (N points)` headings with
  `### Answer` / `### Explanation` under each — or, for a single written answer,
  no part heading and no `### Answer`. `questionBank.test.ts` fails any file that
  doesn't parse.
- **A written part counts for nothing.** It is self-graded and recorded but
  earns no credit or mastery. Use it where the skill is genuinely constructing
  (Evaluate/Create — "recommend and justify"), pair it with a graded part where
  you can, and don't make it the only question on a concept.
- **Option letters.** A–E only, in order, no gaps; the app doesn't shuffle
  bank options, so spread the keys across a batch yourself.
- **Don't test the page's wording.** A question answerable only by someone who
  memorised the concept page's sentence is a Remember item at best, and a bad one;
  paraphrase, or move up a level.
- **Stub pages.** If the concept page is a stub or wrong, write the question from
  the syllabus reading and report the page — don't write to the stub.
