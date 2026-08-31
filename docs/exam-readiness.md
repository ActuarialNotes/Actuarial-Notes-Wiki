# Exam Readiness Score

The card at the top of every exam study guide — the Dashboard's Study Guide radial shrunk to
a mark, which opens an assessment popup. It answers one question: *how ready am I to sit this
exam?*, and the popup then says why the number is what it is.

- Scoring: `quiz/src/lib/readiness.ts` (`computeExamReadiness`), tested in `readiness.test.ts`
- Ring geometry: `quiz/src/lib/readinessRing.ts`, drawn by `components/ReadinessRing.tsx`
- UI: `quiz/src/components/wiki/ExamReadinessCard.tsx`
- Placement: `components/wiki/WikiArticle.tsx` + `ExamGuideCards.tsx`; wired in `pages/wiki/WikiExam.tsx`

## One score, everywhere

`computeExamReadiness(...).overallPct` is **the** readiness number. Every surface that prints
a readiness percentage calls it, so they can never disagree:

| Surface | Where |
|---|---|
| Exam Readiness Score card + popup | `components/wiki/ExamReadinessCard.tsx` |
| Dashboard Study Guide radial (the `NN% readiness` in the ring) | `components/ReadinessCard.tsx` |
| Exam grid cards ("Readiness NN%") | `pages/wiki/WikiHome.tsx` |
| Readiness projection ("now → exam day") | `lib/masteryAnalytics.ts` → `components/HeatmapInfoPanel.tsx` |

`computeReadiness` (the weighted section score) is an *input* to it, not a second opinion.
Nothing user-facing should print that function's `overallPct` on its own — it is what the
syllabus-coverage criterion is made of, and the ranked-sections helpers reuse its per-section
output. Adding a new readiness readout means calling `computeExamReadiness`.

## The two criteria

Each criterion is a 0–100 dial in its own right. The headline score is their weighted mean.

| Criterion | Weight | What it measures |
|---|---|---|
| **Syllabus coverage** | 60% | The weighted section score (`computeReadiness`): how far up the mastery ladder the syllabus as a whole has been carried, each section counted at its exam weighting (the `{23-30%}` tag on the learning-objective callout, taken at its midpoint). |
| **Keystone concepts** | 40% | The same credit formula over the exam's authored keystones (`docs/keystone-concepts.md`). |

Concept credit is the same ladder used everywhere else: 0 for New/Forgotten, 1/3 at Level 1,
2/3 at Level 2, 1 at Level 3. Every state is read through `resolveConceptState` /
`keystoneProgress`, so decay is applied at read time — a Level 3 left alone for two months
scores as what it has decayed to, not as what the row says.

**Why keystones carry 40% when they are ~11 of ~70 concepts.** Broad-but-shallow coverage
that skips the load-bearing concepts is not readiness. Weighting the keystones at their share
of the syllabus would make them invisible in the score; weighting them here means a candidate
cannot reach "nearly ready" with the foundations untouched. This is the deliberate
disagreement between this score and a plain concept count.

**Why there is no retention criterion.** Decay is already in both numbers: a concept left
unreviewed steps back down the ladder, so it stops paying into syllabus coverage and, if it
is a keystone, into that criterion too. A separate retention dial measured over *studied*
concepts only would double-count the same decay and read high for a learner three concepts
in. The popup surfaces decay as a count ("… , 4 decayed") instead of a third number.

**Exams with no keystone catalogue** drop that criterion, so their readiness is exactly
syllabus coverage. Adding a `KEYSTONE_EXAMS` block for the exam makes it appear — nothing
else to wire.

## Bands

`readinessBand(pct)` maps the score onto the verdict shown on the card and as the popup's
heading: **Not started** (<15), **Building foundations** (<40), **Making progress** (<65),
**Nearly exam ready** (<85), **Exam ready** (85+). Each also carries a one-sentence `blurb`
saying what to do next; nothing renders it today — the band name says where the reader
stands and the criterion rows say what is holding the number down, so the sentence was
repeating both.

## What the card shows

The overall dial and the band label. Nothing else: the criteria, the tally and the sections
are all one tap away, and a card that is a third of a phone wide has room for one number.

## What the popup shows

1. The overall dial and the band.
2. One expandable row per criterion — **Syllabus coverage** and **Keystone concepts** — and
   nothing else. Each row is its name, its percentage and a bar. No prose explaining the
   scoring, no heading over the pair, and **no grey caption under the bar**: a tally like
   `7/87 at Level 3 · 49 new` restates a number the reader has already read, and this
   document is where the reasoning lives.

   The criterion's **weight is drawn, not written**. Nothing says "60% of score"; instead the
   bar's thickness scales with `criterion.weight` (4px + 6px × weight), so the heavier
   criterion is visibly the heavier line. Weight and tally stay in the row's `aria-label`
   and in the panel it opens onto — available, just not stacked on screen under a number
   that already said it.

Both rows start **collapsed** and expand (chevron on the right; the whole row is the tap
target) onto the evidence behind their own number, so the breakdown is nested under the
criterion it scores rather than sitting in a section of its own:

- **Syllabus coverage** → the per-learning-objective bars, in syllabus order. The bars
  themselves show which sections are behind, so no line names them, and each row carries its
  percentage only — the `n/total` beside it was the same fact in a second notation.
- **Keystone concepts** → the exam's keystone list as chips with mastery dots; tapping one
  opens that concept in the concept popup, on the exam's full concept list so Previous/Next
  still walks the whole syllabus. **This is the only surface that names all of an exam's
  keystones.**

A criterion with nothing to expand (no sections parsed, or an exam with no keystone
catalogue) renders without a chevron rather than opening onto an empty panel.

Signed-out readers see the card at 0 and a bare **Sign in** button (to `/auth`) under the
dial — mastery is a server-side record, so there is nothing to show until they do. The button
carries no caption: a dial reading zero next to a Sign in button is the whole message, and
"Track learning progress" underneath it was the reader's third reading of it.

## Placement

The card leads the orientation row (`ExamGuideCards`), beside the guide card and shaped like
it: a horizontal `rounded-lg bg-card` row at `px-4 py-3`, the same shape a learning objective
below it wears, so the row reads as the head of that list rather than a banner over it. The
readiness card sizes to its content and the guide card takes the rest of the width — one
carries a number, the other a title. Below ~400px the card drops its words and is the ring
alone, so the guide card's title keeps its room.

Exam pages that carry no `<div class="exam-guides"></div>` (everything but P, FM, MAS-I,
MAS-II and Exam 5 today) get the card from a marker `WikiArticle` inserts under the "Learning
Objectives" heading instead, in the same row wrapper so it lands at the same size.

## What the ring shows

The mark is `components/ReadinessRing.tsx` at 48px: one arc per syllabus concept, each section
sized by its exam weight, each arc filled by that concept's mastery state — green for an
ordinary concept, gold for a keystone (`lib/masteryFill.ts`). It is the Dashboard's Study
Guide radial with the legend, the section labels and the hover readout stripped off, and both
draw their arcs from `lib/readinessRing.ts`, so the two can never disagree about the shape of
a syllabus. At card size the individual arcs are thinner than a hairline, which is the point:
what survives the shrink is how much of the ring has colour in it, and where the gold is. The
number in the middle is `overallPct` — the same one the popup opens with.

## Colour

The dials and bars are green at every value (`LEVEL3_TEXT` from `lib/masteryFill.ts`) — the
arc length carries the score, so the hue doesn't have to. A readiness dial that turned red at
low scores would collide with the mastery ladder's use of red for decay, where red means
*something you had has slipped*, not *you haven't started*.
