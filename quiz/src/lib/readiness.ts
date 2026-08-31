import { wikiExamIdToProgressKey, type WikiExamSyllabus } from '@/lib/wikiParser'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import { buildMasteryLookup, resolveConceptState } from '@/lib/conceptMatch'
import { keystoneProgress, type KeystoneProgress } from '@/lib/keystone'

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
// It breaks readiness into two criteria, each a 0–100 dial in its own right:
//
//   Syllabus coverage (60%) — the weighted section score computed above: how
//     far up the mastery ladder the syllabus as a whole has been carried, with
//     each section counted at its exam weighting.
//   Keystone concepts (40%) — the same credit formula over the exam's authored
//     keystones (docs/keystone-concepts.md). Broad-but-shallow coverage that
//     skips the load-bearing concepts is not readiness, so the few carry a
//     weight far above their share of the syllabus. Omitted (and its weight
//     redistributed) for exams with no keystone catalogue, which leaves the
//     score equal to syllabus coverage there.
//
// Decay needs no criterion of its own: a concept that goes unreviewed steps
// back down the ladder, so both criteria fall on their own. Every state is read
// through `resolveConceptState` / `keystoneProgress`, so that happens at read
// time exactly as it does everywhere else.

/** Relative weights of the criteria; renormalised when one is missing. */
export const CRITERION_WEIGHTS = { syllabus: 0.6, keystone: 0.4 } as const

export type ReadinessCriterionId = keyof typeof CRITERION_WEIGHTS

export interface ReadinessCriterion {
  id: ReadinessCriterionId
  label: string
  /** 0–100. */
  pct: number
  /**
   * Share of the headline score this criterion carries, 0–1 (renormalised).
   * The popup draws this rather than printing it — a heavier criterion gets a
   * thicker bar — so nothing on screen has to say "60% of score".
   */
  weight: number
}

export interface ReadinessBand {
  id: 'not-started' | 'building' | 'progressing' | 'nearly' | 'ready'
  label: string
  blurb: string
}

const BANDS: Array<{ min: number } & ReadinessBand> = [
  { min: 85, id: 'ready', label: 'Exam ready', blurb: 'The syllabus and its keystones are at Level 3 and still fresh. Keep reviewing so nothing decays before the sitting.' },
  { min: 65, id: 'nearly', label: 'Nearly exam ready', blurb: 'Most of the syllabus is carried high. Close the weakest sections and lift any keystone that is short of Level 3.' },
  { min: 40, id: 'progressing', label: 'Making progress', blurb: 'A real base is in place. Push the started concepts up the ladder rather than adding breadth.' },
  { min: 15, id: 'building', label: 'Building foundations', blurb: 'Early days. Work through the keystone concepts first — the rest of the syllabus leans on them.' },
  { min: 0, id: 'not-started', label: 'Not started', blurb: 'Nothing measured yet. Answer questions on this exam and the score fills in.' },
]

export function readinessBand(pct: number): ReadinessBand {
  const band = BANDS.find(b => pct >= b.min) ?? BANDS[BANDS.length - 1]
  return { id: band.id, label: band.label, blurb: band.blurb }
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
  /** Null when the exam has no authored keystones. */
  keystone: KeystoneProgress | null
  counts: ConceptStateCounts
}

/** Credit a mastery state earns toward readiness, 0–3. */
function stateCredit(state: MasteryState): number {
  return state === 'level3' ? 3 : state === 'level2' ? 2 : state === 'level1' ? 1 : 0
}

/**
 * The full readiness assessment for one exam: the headline score, the criteria
 * behind it (including keystone mastery), the per-section breakdown, and the
 * concept-state tally.
 *
 * `records` should already be filtered to this exam — the same way the
 * Dashboard and the exam grid filter by `exam_id`. `examId` is the exam-progress
 * key (`P`, `FM`, `MAS-I`, `5`) the keystone catalogue is keyed by; it defaults
 * to the one the syllabus itself names, so callers that already hold the key can
 * pass it and everyone else gets the same answer without deriving it.
 */
export function computeExamReadiness(
  syllabus: WikiExamSyllabus,
  records: ConceptMasteryRecord[],
  now: Date,
  examId: string = wikiExamIdToProgressKey(syllabus.examId),
): ExamReadinessAssessment {
  const lookup = buildMasteryLookup(records)
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

  const keystone = keystoneProgress(examId, lookup, now)
  const hasKeystones = keystone.total > 0
  const keystoneCredit = keystone.entries.reduce((sum, e) => sum + stateCredit(e.state), 0)
  const keystonePct = hasKeystones ? (keystoneCredit / (keystone.total * 3)) * 100 : 0

  const criteria: ReadinessCriterion[] = [
    {
      id: 'syllabus',
      label: 'Syllabus coverage',
      pct: syllabusPct,
      weight: CRITERION_WEIGHTS.syllabus,
    },
    ...(hasKeystones ? [{
      id: 'keystone' as const,
      label: 'Keystone concepts',
      pct: keystonePct,
      weight: CRITERION_WEIGHTS.keystone,
    }] : []),
  ]

  // Renormalise so a missing criterion redistributes its weight rather than
  // capping the headline score below 100.
  const weightSum = criteria.reduce((sum, c) => sum + c.weight, 0)
  for (const c of criteria) c.weight = weightSum > 0 ? c.weight / weightSum : 0
  const overallPct = criteria.reduce((sum, c) => sum + c.pct * c.weight, 0)

  const weakestSections = sections
    .filter(s => s.total > 0 && s.readinessPct < overallPct)
    .sort((a, b) => (a.readinessPct - b.readinessPct) || (b.weight - a.weight))

  return {
    overallPct,
    band: readinessBand(overallPct),
    criteria,
    sections,
    weakestSections,
    keystone: hasKeystones ? keystone : null,
    counts,
  }
}
