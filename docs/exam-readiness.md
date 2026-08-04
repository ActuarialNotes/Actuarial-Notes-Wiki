# Exam Readiness Score

The card at the top of every exam study guide — a row of green dials that opens an
assessment popup. It answers one question: *how ready am I to sit this exam?*, and then says
why the number is what it is.

- Scoring: `quiz/src/lib/readiness.ts` (`computeExamReadiness`), tested in `readiness.test.ts`
- UI: `quiz/src/components/wiki/ExamReadinessCard.tsx`
- Placement: `components/wiki/WikiArticle.tsx` + `ExamGuideCards.tsx`; wired in `pages/wiki/WikiExam.tsx`

## The three criteria

Each criterion is a 0–100 dial in its own right. The headline score is their weighted mean.

| Criterion | Weight | What it measures |
|---|---|---|
| **Syllabus coverage** | 50% | The weighted section score (`computeReadiness`): how far up the mastery ladder the syllabus as a whole has been carried, each section counted at its exam weighting (the `{23-30%}` tag on the learning-objective callout, taken at its midpoint). |
| **Keystone concepts** | 35% | The same credit formula over the exam's authored keystones (`docs/keystone-concepts.md`). |
| **Retention** | 15% | Of the concepts already studied, the share that has **not** decayed back to Forgotten. |

Concept credit is the same ladder used everywhere else: 0 for New/Forgotten, 1/3 at Level 1,
2/3 at Level 2, 1 at Level 3. Every state is read through `resolveConceptState` /
`keystoneProgress`, so decay is applied at read time — a Level 3 left alone for two months
scores as what it has decayed to, not as what the row says.

**Why keystones carry 35% when they are ~11 of ~70 concepts.** Broad-but-shallow coverage
that skips the load-bearing concepts is not readiness. Weighting the keystones at their share
of the syllabus would make them invisible in the score; weighting them here means a candidate
cannot reach "nearly ready" with the foundations untouched. This is the deliberate
disagreement between this score and a plain concept count.

**Why retention is only 15%, and why it is measured over studied concepts only.** It is a
hygiene measure — it says nothing about how much of the syllabus has been touched, so a
learner three concepts in can sit at 100% retention. That is fine at 15% next to two criteria
that do measure breadth and depth, and it keeps the criterion doing its actual job: flagging
decay before the sitting. With nothing studied it reports 0 rather than a vacuous 100.

**Exams with no keystone catalogue** drop that criterion, and its weight is redistributed
across the other two (so a perfect score stays reachable). Adding a `KEYSTONE_EXAMS` block
for the exam makes it appear — nothing else to wire.

## Bands

`readinessBand(pct)` maps the score onto the verdict shown on the card and as the popup's
heading: **Not started** (<15), **Building foundations** (<40), **Making progress** (<65),
**Nearly exam ready** (<85), **Exam ready** (85+). Each carries a one-sentence blurb telling
the reader what to do next.

## What the popup shows

1. The overall dial, the band and its blurb.
2. **How it's scored** — one row per criterion: its percentage, its weight, what the number
   counts (`detail`), and what would raise it (`hint`). The keystone row carries the exam's
   keystone list as chips with mastery dots; tapping one opens that concept in the concept
   popup, on the exam's full concept list so Previous/Next still walks the whole syllabus.
   **This is the only surface that names all of an exam's keystones.**
3. **Syllabus sections** — the per-section bars, in syllabus order, with the sections below
   the overall score named as "furthest behind".

Signed-out readers see the card at 0 with a line explaining that the score is built from
answered questions — mastery is a server-side record, so there is nothing to show.

## Placement

The card borrows the orientation cards' shell (`ExamGuideCards`) and is passed to them as
`leadCard`, spanning the two-column row above them — a dial reads badly at half width, and
this is the one card on an exam page that is about the reader rather than the exam. Exam
pages that carry no `<div class="exam-guides"></div>` (everything but P and FM today) get the
card from a marker `WikiArticle` inserts under the "Learning Objectives" heading instead.

## Colour

The dials and bars are green at every value (`LEVEL3_TEXT` from `lib/masteryFill.ts`) — the
arc length carries the score, so the hue doesn't have to. A readiness dial that turned red at
low scores would collide with the mastery ladder's use of red for decay, where red means
*something you had has slipped*, not *you haven't started*.
