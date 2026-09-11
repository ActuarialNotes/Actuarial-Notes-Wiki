# Exam Readiness Score

The one number that answers *how ready am I to sit this exam?* It is computed in one place
and read by every surface that prints a readiness percentage.

- Scoring: `quiz/src/lib/readiness.ts` (`computeExamReadiness`), tested in `readiness.test.ts`
- Ring geometry: `quiz/src/lib/readinessRing.ts`, drawn by the Dashboard's **Exam readiness**
  card (`StudyGuideRadial` in `components/ReadinessCard.tsx`)

**The exam study guide no longer shows a readiness card.** The card, its assessment popup and
the 48px `ReadinessRing` badge were removed along with the exam page's orientation row; the
score itself and the surfaces below are unchanged.

## One score, everywhere

`computeExamReadiness(...).overallPct` is **the** readiness number. Every surface that prints
a readiness percentage calls it, so they can never disagree:

| Surface | Where |
|---|---|
| Dashboard **Exam readiness** card (the `NN%` in the ring, the band verdict and the criterion bars) | `components/ReadinessCard.tsx` |
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
in.

**Exams with no keystone catalogue** drop that criterion, so their readiness is exactly
syllabus coverage. Adding a `KEYSTONE_EXAMS` block for the exam makes it appear — nothing
else to wire.

## Bands

`readinessBand(pct)` maps the score onto a verdict: **Not started** (<15), **Building foundations** (<40), **Making progress** (<65),
**Nearly exam ready** (<85), **Exam ready** (85+). Each also carries a one-sentence `blurb`
saying what to do next. The Dashboard's Exam readiness card renders both — the label as its
headline, the blurb as the one muted line under it — so a blurb has to read true anywhere in
its band, not just at the bottom of it.

## The Dashboard card

**Exam readiness is the first card on the Dashboard** — above the Study Schedule and the
primary actions. `ReadinessCard` portals it into the slot the Dashboard puts there
(`readinessSlot`, the same mechanism as `studyScheduleSlot`), so the card's state and logic
stay with the study plan while it renders at the top of the page.

It is one call — `computeExamReadiness` — read three ways:

- **The ring** (`StudyGuideRadial`, the surface the docs elsewhere call the Study Guide
  radial): one arc per syllabus concept, each section sized by its exam weight, each arc
  filled by that concept's mastery state — green for an ordinary concept, gold for a keystone
  (`lib/masteryFill.ts`). Its arcs come from `lib/readinessRing.ts`, so geometry lives in one
  place. The number in the middle is `overallPct`, and it carries no caption: the card is
  titled *Exam readiness* a few pixels away (`docs/visual-noise-review.md`, test 1).
- **The band**, as the headline verdict beside the ring, with its blurb under it.
- **The criteria**, as one bar each. A bar's *thickness* is the weight that criterion carries
  in the score (`4px + 6px × weight`), so the heavier one is visibly the heavier line and
  nothing has to print "60% of score" — the worked example in
  `docs/visual-noise-review.md` §3.1, reused here.

There is no concept tally card beside it. A `Topics Learned` bar (`N/M at Level 3`) used to
sit under the ring; it restated what the ring already draws, so it and the topic list it
expanded onto were removed.

## Colour

The dials and bars are green at every value (`LEVEL3_TEXT` from `lib/masteryFill.ts`) — the
arc length carries the score, so the hue doesn't have to. A readiness dial that turned red at
low scores would collide with the mastery ladder's use of red for decay, where red means
*something you had has slipped*, not *you haven't started*.

The one exception is the **keystone criterion's** bar, which is drawn in the keystone gold
(`KEYSTONE_TEXT`) rather than green. That is not a value signal either: it is the same gold
as the keystone spokes in the ring beside it, so the bar and the arcs it measures read as the
same thing (`docs/keystone-concepts.md`).
