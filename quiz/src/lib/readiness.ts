import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { buildMasteryLookup, resolveConceptState } from '@/lib/conceptMatch'

// Exam readiness scoring
//
// Each concept contributes partial credit based on its mastery level, so
// progress at Level 1/2 is reflected even before a concept reaches full
// mastery (Level 3). Because level3 decays naturally via the SR system
// (30-day threshold), no separate recency calculation is needed — the
// level itself already reflects current retention.
//
//   Concept credit = 0 (New/Forgotten), 1/3 (Level 1), 2/3 (Level 2), 1 (Level 3)
//   Section Readiness = Σ concept credit / topics in section
//   Overall Readiness = Σ (section readiness × section syllabus weight)
//
// Syllabus weight = midpoint of the section's exam weighting range.
//   e.g. "General Probability 23–30%" → weight = 26.5
// Sections with no weight tag receive weight = 1 (equal contribution).
// Adjust DECAY_DAYS_LEVEL3 in mastery.ts to tune how quickly level3 expires.

export function parseSectionWeight(weight?: string): number {
  if (!weight) return 1
  const range = weight.match(/(\d+)\s*[-–]\s*(\d+)%/)
  if (range) return (parseInt(range[1]) + parseInt(range[2])) / 2
  const single = weight.match(/(\d+)%/)
  return single ? parseInt(single[1]) : 1
}

export interface SectionReadiness {
  name: string
  weight: number       // syllabus midpoint weight (e.g. 26.5 for "23–30%")
  level1Count: number
  level2Count: number
  level3Count: number
  forgottenCount: number
  total: number
  readinessPct: number // 0–100, weighted progress credit (see above)
}

export interface ReadinessResult {
  overallPct: number           // 0–100, weighted average across sections
  sections: SectionReadiness[]
}

export function computeReadiness(
  syllabus: WikiExamSyllabus,
  records: ConceptMasteryRecord[],
  now: Date,
): ReadinessResult {
  const lookup = buildMasteryLookup(records)
  const sections: SectionReadiness[] = []
  let weightedSum = 0
  let totalWeight = 0

  for (const topic of syllabus.topics) {
    const weight = parseSectionWeight(topic.weight)
    let level1Count = 0, level2Count = 0, level3Count = 0, forgottenCount = 0
    const total = topic.concepts.length

    for (const concept of topic.concepts) {
      const state = resolveConceptState(lookup, concept, now)
      if (state === 'level3') level3Count++
      else if (state === 'level2') level2Count++
      else if (state === 'level1') level1Count++
      else if (state === 'forgotten') forgottenCount++
    }

    const credit = level1Count * 1 + level2Count * 2 + level3Count * 3
    const readinessPct = total > 0 ? (credit / (total * 3)) * 100 : 0
    sections.push({ name: topic.name, weight, level1Count, level2Count, level3Count, forgottenCount, total, readinessPct })
    weightedSum += readinessPct * weight
    totalWeight += weight
  }

  const overallPct = totalWeight > 0 ? weightedSum / totalWeight : 0
  return { overallPct, sections }
}

// ── Exam readiness assessment ────────────────────────────────────────────────
//
// `computeExamReadiness` is **the** readiness score: the number the exam page's
// readiness card, the Dashboard's Study Guide radial, the exam grid and the
// readiness projection all show. `computeReadiness` above is one input to it,
// not a second opinion — nothing user-facing should print its `overallPct` on
// its own, or the app ends up quoting two different readiness numbers.
//
// The score is one criterion, a 0–100 dial:
//
//   Syllabus coverage — the weighted section score computed above: how far up
//     the mastery ladder the syllabus as a whole has been carried, with each
//     section counted at its exam weighting.
//
// It is still reported as a list of criteria (with one entry) so the card that
// draws the breakdown beside the ring has a shape to draw.
//
// Decay needs no criterion of its own: a concept that goes unreviewed steps
// back down the ladder, so coverage falls on its own. Every state is read
// through `resolveConceptState`, so that happens at read time exactly as it
// does everywhere else.

/** Relative weights of the criteria. */
export const CRITERION_WEIGHTS = { syllabus: 1 } as const

export type ReadinessCriterionId = keyof typeof CRITERION_WEIGHTS

export interface ReadinessCriterion {
  id: ReadinessCriterionId
  label: string
  /** 0–100. */
  pct: number
  /**
   * Share of the headline score this criterion carries, 0–1.
   * The popup draws this rather than printing it — a heavier criterion gets a
   * thicker bar — so nothing on screen has to say "60% of score".
   */
  weight: number
}

export interface ReadinessBand {
  id: 'not-started' | 'started' | 'building' | 'progressing' | 'nearly' | 'ready'
  label: string
}

// A band carries its label and nothing else. It used to carry a `blurb` — one
// generic sentence per band, printed under the label on the Dashboard card —
// but a line that is the same for every learner in a forty-point range is not
// an insight, and at the bottom band ("Answer questions on this exam and the
// score fills in") it was the label paraphrased (docs/visual-noise-review.md,
// test 1). `readinessInsight` below replaces it with something derived from
// this learner's own records, and says nothing when there is nothing to say.
//
// **`not-started` means zero, not "low".** It used to cover everything under 15,
// so a card could read "Not started" beside a 5% score, contradicting work the
// learner had just done. It is now reserved for a record with nothing in it, and
// `started` below is the band between it and "Building foundations".
const BANDS: Array<{ min: number } & ReadinessBand> = [
  { min: 85, id: 'ready', label: 'Exam ready' },
  { min: 65, id: 'nearly', label: 'Nearly exam ready' },
  { min: 40, id: 'progressing', label: 'Making progress' },
  { min: 15, id: 'building', label: 'Building foundations' },
  { min: 1, id: 'started', label: 'Getting started' },
  { min: 0, id: 'not-started', label: 'Not started' },
]

/**
 * The verdict for a score. Banded on the **rounded** percentage, so the label
 * always agrees with the number printed beside it (the same rule
 * `readinessDelta` follows).
 *
 * `started` says whether this record has any progress in it at all; it defaults
 * to "the score rounds above zero". Pass it when you know better — a single
 * concept on a 300-concept syllabus rounds to 0%, and that record is still not
 * one nobody has started.
 */
export function readinessBand(pct: number, started?: boolean): ReadinessBand {
  const rounded = Math.round(pct)
  // A started record never bands below `started`; an empty one bands on its
  // score alone, which is 0 in every case that matters.
  const effective = (started ?? rounded > 0) ? Math.max(rounded, 1) : rounded
  const band = BANDS.find(b => effective >= b.min) ?? BANDS[BANDS.length - 1]
  return { id: band.id, label: band.label }
}

export interface ConceptStateCounts {
  total: number
  new: number
  level1: number
  level2: number
  level3: number
  forgotten: number
  /** Concepts with any recorded progress — everything that isn't New. */
  studied: number
}

export interface ExamReadinessAssessment {
  /** 0–100, the weighted combination of `criteria`. */
  overallPct: number
  band: ReadinessBand
  criteria: ReadinessCriterion[]
  sections: SectionReadiness[]
  /** Sections below the overall score, weakest (and heaviest) first. */
  weakestSections: SectionReadiness[]
  counts: ConceptStateCounts
  /**
   * One sentence about *this* record, or null when there is nothing worth
   * saying — see `readinessInsight`. Null is the normal state of an exam
   * nobody has started.
   */
  insight: ReadinessInsight | null
}

/**
 * The full readiness assessment for one exam: the headline score, the criteria
 * behind it, the per-section breakdown, and the concept-state tally.
 *
 * `records` should already be filtered to this exam — the same way the
 * Dashboard and the exam grid filter by `exam_id`.
 */
export function computeExamReadiness(
  syllabus: WikiExamSyllabus,
  records: ConceptMasteryRecord[],
  now: Date,
): ExamReadinessAssessment {
  const { overallPct: syllabusPct, sections } = computeReadiness(syllabus, records, now)

  const counts: ConceptStateCounts = { total: 0, new: 0, level1: 0, level2: 0, level3: 0, forgotten: 0, studied: 0 }
  for (const section of sections) {
    counts.total += section.total
    counts.level1 += section.level1Count
    counts.level2 += section.level2Count
    counts.level3 += section.level3Count
    counts.forgotten += section.forgottenCount
  }
  counts.studied = counts.level1 + counts.level2 + counts.level3 + counts.forgotten
  counts.new = counts.total - counts.studied

  const criteria: ReadinessCriterion[] = [
    {
      id: 'syllabus',
      label: 'Syllabus coverage',
      pct: syllabusPct,
      weight: CRITERION_WEIGHTS.syllabus,
    },
  ]
  const overallPct = criteria.reduce((sum, c) => sum + c.pct * c.weight, 0)

  const weakestSections = sections
    .filter(s => s.total > 0 && s.readinessPct < overallPct)
    .sort((a, b) => (a.readinessPct - b.readinessPct) || (b.weight - a.weight))

  const assessment: Omit<ExamReadinessAssessment, 'insight'> = {
    overallPct,
    band: readinessBand(overallPct, counts.studied > 0),
    criteria,
    sections,
    weakestSections,
    counts,
  }

  return { ...assessment, insight: readinessInsight(assessment) }
}

// ── The insight line ─────────────────────────────────────────────────────────
//
// The one sentence under the band label on the Dashboard's Exam readiness card.
// It is derived from *this* learner's records, and every rule below names
// something the card does not already draw — a section, a tally.
// Nothing here may restate the ring, the headline score or the criterion
// bar (docs/visual-noise-review.md, test 1): "syllabus coverage is low" is the
// bar said twice, and a sentence that would read the same for everyone in a
// forty-point band is not an insight at all.
//
// **Returning null is a normal outcome, not a fallback.** An exam nobody has
// started has no insight in it — the empty ring and the "Not started" label are
// the whole story — and a record where none of these rules finds anything is
// not worth a line of grey either. The card renders nothing when this is null.
//
// The rules are ordered by what costs a candidate the most, and the first hit
// wins: broad decay outranks a shallow record, which outranks a thin section.
//
// **Say it the way a tutor would.** Each line is at most two short sentences:
// the fact, then what to do about it. No em-dash asides, no "moves the score
// further than new material does" hedging, no sentence that has to be read
// twice on a phone. The card is already dense; the line under the verdict is
// the one place a plain voice costs nothing.

export type ReadinessInsightId =
  | 'broad-decay'
  | 'second-pass'
  | 'costliest-section'

export interface ReadinessInsight {
  id: ReadinessInsightId
  text: string
}

/** Decay is only the headline once it is a pattern, not one stale concept. */
const BROAD_DECAY_MIN = 3
const BROAD_DECAY_SHARE = 0.25
/** A Level 1 pile-up big enough to read as a habit rather than a starting point. */
const SECOND_PASS_MIN = 5
const SECOND_PASS_SHARE = 0.6
/** A section past this is not where the missing score is. */
const SECTION_DONE_PCT = 80

/**
 * The insight line for one assessment, or null when there is nothing to say.
 * Exported for testing and for any surface that holds an assessment built
 * elsewhere; `computeExamReadiness` already calls it, so read
 * `assessment.insight` rather than calling this a second time.
 */
export function readinessInsight(
  assessment: Omit<ExamReadinessAssessment, 'insight'>,
): ReadinessInsight | null {
  const { counts, sections } = assessment

  // Nothing started — nothing to be insightful about.
  if (counts.total === 0 || counts.studied === 0) return null

  // 1. Decay across the syllabus at a scale that outruns new study.
  if (counts.forgotten >= BROAD_DECAY_MIN && counts.forgotten >= counts.studied * BROAD_DECAY_SHARE) {
    return {
      id: 'broad-decay',
      text: counts.forgotten === counts.studied
        ? `All ${counts.forgotten} concepts you've started have slipped to Forgotten. Review those before you add new ones.`
        : `${counts.forgotten} of the ${counts.studied} concepts you've started have slipped to Forgotten. Review those before you add new ones.`,
    }
  }

  // 2. A record that is wide and shallow: most of it parked on the bottom rung,
  //    where each concept is earning a third of what it could.
  if (counts.level1 >= SECOND_PASS_MIN && counts.level1 >= counts.studied * SECOND_PASS_SHARE) {
    return {
      id: 'second-pass',
      text: `${counts.level1} concepts are still at Level 1. Another pass on those is worth more than starting new ones.`,
    }
  }

  // 3. Where the missing score actually is. Ranked by weight × shortfall — the
  //    points the section is leaving on the table — rather than by coverage
  //    alone, so a big section half-done outranks a tiny one untouched. (That
  //    is why this does not reuse `weakestSections`, which ranks by coverage.)
  const totalWeight = sections.reduce((sum, s) => sum + s.weight, 0)
  const weighted = sections.some(s => s.weight !== 1)
  const costliest = sections
    .filter(s => s.total > 0 && s.readinessPct < SECTION_DONE_PCT)
    .sort((a, b) => (b.weight * (100 - b.readinessPct)) - (a.weight * (100 - a.readinessPct)))[0]
  if (costliest && sections.length > 1) {
    const covered = Math.round(costliest.readinessPct)
    const share = totalWeight > 0 ? Math.round((costliest.weight / totalWeight) * 100) : 0
    return {
      id: 'costliest-section',
      text: weighted
        ? `Your biggest gap is ${costliest.name}: ${share}% of the exam, ${covered}% covered.`
        : `Your biggest gap is ${costliest.name}, at ${covered}% covered.`,
    }
  }

  return null
}
