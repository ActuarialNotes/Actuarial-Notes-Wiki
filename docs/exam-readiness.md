# Exam Readiness Score

The one number that answers *how ready am I to sit this exam?* It is computed in one place
and read by every surface that prints a readiness percentage.

- Scoring: `quiz/src/lib/readiness.ts` (`computeExamReadiness`), tested in `readiness.test.ts`
- Ring geometry: `quiz/src/lib/readinessRing.ts`, drawn by the Dashboard's **Study Guide**
  card (`StudyGuideRadial` in `components/ReadinessCard.tsx`)

**The exam study guide no longer shows a readiness card.** The card, its assessment popup and
the 48px `ReadinessRing` badge were removed along with the exam page's orientation row; the
score itself and the surfaces below are unchanged.

## One score, everywhere

`computeExamReadiness(...).overallPct` is **the** readiness number. Every surface that prints
a readiness percentage calls it, so they can never disagree:

| Surface | Where |
|---|---|
| Dashboard **Exam readiness** card (the `NN%` KPI beside the band verdict, over the primary actions) | `components/ReadinessCard.tsx` |
| Dashboard **Study Guide** card (the ring and the criterion bars — the breakdown of that one score, which it no longer reprints) | `components/ReadinessCard.tsx` |
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
**Nearly exam ready** (<85), **Exam ready** (85+). A band is a label and nothing else.

It used to carry a one-sentence `blurb` as well, printed under the label on the Dashboard
card. That field is gone. One sentence shared by everyone inside a forty-point range cannot
be an insight about any of them, and at the bottom band it was the label paraphrased —
*Not started* over *"Answer questions on this exam and the score fills in."*
(`docs/visual-noise-review.md`, test 1). The line under the label is now `insight`.

## The insight line

`readinessInsight(assessment)` — already called for you, so read `assessment.insight` — is the
one sentence under the band label, derived from **this** learner's records. It returns
`ReadinessInsight | null`.

**Null is a normal outcome, not a fallback.** There is no insight to be had from an empty
record, so an exam nobody has started gets no line at all; the empty ring and the *Not
started* label are the whole story. A record where no rule below finds anything gets no line
either. The card renders the paragraph only when the insight is non-null — nothing generic
stands in for it.

Two rules govern what may be said:

1. **It must name something the card does not already draw** — a concept, a section, a tally.
   "Syllabus coverage is low" is the criterion bar said twice.
2. **It must be true of this learner specifically.** Anything that would read identically for
   every account in the band belongs in the band label, not here.

The rules are ordered by what costs a candidate the most, and the first hit wins:

| # | `id` | Fires when | Says |
|---|---|---|---|
| 1 | `keystone-decay` | any keystone has decayed to Forgotten | names it (or counts them and names one) — a concept already earned once, paying into both criteria |
| 2 | `broad-decay` | ≥3 concepts Forgotten **and** ≥25% of everything studied | the tally, and that recovery outruns new material |
| 3 | `keystones-untouched` | the keystone criterion trails coverage by ≥15 points, with keystones still New | how many are behind and one of their names |
| 4 | `second-pass` | ≥5 concepts at Level 1 **and** ≥60% of everything studied | the record is wide and shallow; a second pass beats breadth |
| 5 | `costliest-section` | some section is under 80% covered (and there is more than one section) | the section with the largest **weight × shortfall** — the points actually on the table — with its share of the exam and its coverage |
| 6 | `hold-the-keystones` | every keystone is at Level 3 | that Level 3 lapses after `DECAY_DAYS_LEVEL3` days unreviewed |

Rule 5 deliberately does **not** reuse `weakestSections`, which ranks by coverage alone: a
40%-of-the-exam section half-done is leaving more score on the table than a 3% section
untouched, and the line is about where the missing score is. It drops the "% of the exam"
clause for a syllabus whose sections carry no weight tags, since every share would be the
same number.

Adding a rule means a new `id` on `ReadinessInsightId`, a block in `readinessInsight` at the
position its urgency earns, and a pair of tests in `readiness.test.ts`: one that it fires with
the right text, and one that it stays quiet when it should.

## The Dashboard cards

**Exam readiness is the first card on the Dashboard**, and it leads a group of three that
`ReadinessCard` portals into the slot the Dashboard puts there (`readinessSlot`, the same
mechanism as `studyScheduleSlot`), so the cards' state and logic stay with the study plan
while they render at the top of the page:

1. **Exam readiness** — the **title and band verdict** with the insight line under it, the
   score itself as a KPI to their right, then the **primary actions**. Nothing sits between
   the number and the two ways to change it.
2. **Today's Study Plan** — what to do about that score today. It follows the number rather
   than the ring: a reader who has just read *Not started* is looking for the next step, not
   for a breakdown of how the number was reached.
3. **Study Guide** — the **ring** beside the **criteria**, the breakdown for the reader who
   wants one.

Then the **Study Schedule** heatmap, in its own slot below the group.

The actions (*Read concepts* / *Fix mistakes* / *Start Quiz*) are the Dashboard's: it owns
their triggers and the pinned-header copies, and hands them to `ReadinessCard` as the
`actions` prop, which renders them as the readiness card's last row. The score and the two
ways to move it are one surface, not a card with a detached button row under it.

It is one call — `computeExamReadiness` — read three ways:

- **The ring** (`StudyGuideRadial`, the surface the docs elsewhere call the Study Guide
  radial): one arc per syllabus concept, each section sized by its exam weight, each arc
  filled by that concept's mastery state — green for an ordinary concept, gold for a keystone
  (`lib/masteryFill.ts`). Its arcs come from `lib/readinessRing.ts`, so geometry lives in one
  place. The number in the middle is `overallPct`, printed while nothing is hovered or
  selected and replaced by the hovered concept's readout while one is. It carries no caption:
  the two criteria beside it and the *Exam readiness* KPI two cards up already name what it
  measures (`docs/visual-noise-review.md`, test 1). It is printed here as well as in the KPI
  because by the time a reader has scrolled to the ring the KPI is off screen — a ring that
  measures something unnamed is worse than the number said twice.
- **The band**, as the headline verdict at the top of the card under its title, with the
  insight line under it when there is one (see above) and nothing under it when there is not.
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
