# Case studies

Some sittings hand the candidate a **supplemental booklet** alongside the question
paper, and a handful of questions on the paper cannot be answered without it. CAS
does this on MAS-II: Spring 2019 shipped a 24-page "Systolic Blood Pressure Case
Study" — exploratory output, six fitted linear mixed models, and the residual
diagnostics for each — and questions 1 and 2 are read entirely off it.

A case study is therefore **not a page of its own**. It's a document a question
opens, so the candidate reads it the way they would in the exam room: next to the
paper, without losing their place.

## The content

One markdown file per study, under `case-studies/<exam-id>/<id>.md`:

```markdown
---
id: "masii-2019s-systolic"
exam: "Exam MAS-II"
title: "Systolic Blood Pressure Case Study"
year: 2019
session: Spring
source: "CAS Exam MAS-II, Spring 2019 — supplemental material"
---

Prose introducing the study.

## B. Exploratory Data Output

```
## Linear mixed-effects model fit by REML
##        AIC      BIC    logLik
##   7327.429 7361.313 -3657.715
```

![alt text](https://raw.githubusercontent.com/.../Media/Attachments/....png)
```

- `id` is the join key and must be **unique across the whole tree** — a question
  references it by exactly this string.
- `exam` must match the `exam` label on the questions that reference it.
- `title`, and a non-empty body, are required; everything else is optional.
- The body is plain markdown, rendered through the same pipeline as a question
  stem, so fenced blocks, tables, KaTeX and `![](…)` embeds all work.

**Transcribe R output verbatim into fenced blocks.** Column alignment is load-
bearing — a candidate reads a p-value out of a table by eye — so the fences are
never reflowed and the panel scrolls them horizontally rather than wrapping.
Plots are cropped from the source PDF into `Media/Attachments/` and embedded,
because redrawing them would change what the question is asked about.

Transcribe faithfully even where the source is internally inconsistent. The
Spring 2019 study, for instance, labels section C.2 "restricted maximum
likelihood" over output that reads `fit by maximum likelihood`, and C.4 describes
"two main effects" over a formula carrying an interaction. Those mismatches are
in the booklet the candidates sat with; the questions are answered off the
output, not the headings, so they stay.

## Wiring a question to one

Add `case_study` to the question's frontmatter:

```yaml
case_study: "masii-2019s-systolic"
```

That's the whole opt-in. Set it only on questions that genuinely need the
booklet — it puts a button on the card, and a button that opens 24 pages of
output nobody needs is noise.

Leave the question stem **as authored**. The real paper says "In the supplemental
material, you have been given a case study…" and nothing more; the booklet is
what the button is for. Don't paste excerpts into the stem to make the question
self-contained — that duplicates the study, and the two copies drift.

## How it reaches the screen

```
case-studies/<exam-id>/*.md
  → virtual:case-studies          (vite.config.ts, mirrors virtual:comprehension-checks)
  → lib/caseStudies.ts            parseAllCaseStudies → id-keyed lookup
  → data/caseStudies.ts           getCaseStudy(id)
  → components/CaseStudyLink.tsx  the button + panel state
  → components/CaseStudyPanel.tsx the reader
```

`CaseStudyLink` renders **nothing** unless the question declares a `case_study`
that resolves, so it sits unconditionally in all three `QuestionCard` branches
(multiple-choice, free-entry, multi-part). That's why the button lives on the
question card rather than in the quiz chrome: a candidate meeting one of these
questions in search, in review, in the mistakes panel or in a mock exam needs the
booklet just as much as one meeting it mid-quiz, and the card is the one thing
all those surfaces share.

## Why the panel is not a dialog

`CaseStudyPanel` is the shared `.concept-popup-aside` surface — the same
bottom-anchored, drag-resizable, **non-modal** panel as the concept popup and the
fix-mistakes panel, with the same persisted height.

That is the whole design decision. In the exam room the booklet lies open on the
desk next to the paper. A modal would take the question away every time the
candidate wanted to check a number, which is precisely backwards; instead the
page behind stays live and the answer options remain clickable with the study
open. Focus mode is there for the moments when the candidate does want to pore
over the output full-screen, and Esc steps back out of focus mode before it
closes the panel.

An e2e spec (`e2e/case-study.spec.ts`) pins both halves: that the button opens
the study, and that an option behind it can still be answered while it's open.

## Known gap

Fall 2019 MAS-II questions 1 and 2 reference a "Warranty Payments Case Study"
that CAS did not include in the published paper. Those two questions are **not**
in the bank: every statement they ask about refers to model output nobody has.
If the booklet ever surfaces, adding it here and dropping the two question files
in is all that's needed — no code changes.
