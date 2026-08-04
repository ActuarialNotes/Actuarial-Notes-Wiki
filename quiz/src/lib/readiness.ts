import type { WikiExamSyllabus } from '@/lib/wikiParser'
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
// The exam page's readiness card needs more than the single number above: it
// has to say *why* the score is what it is. The assessment below breaks
// readiness into three criteria, each a 0–100 dial in its own right, and
// combines them into the headline score:
//
//   Syllabus coverage (50%) — the weighted section score computed above: how
//     far up the mastery ladder the syllabus as a whole has been carried, with
//     each section counted at its exam weighting.
//   Keystone concepts (35%) — the same credit formula over the exam's authored
//     keystones (docs/keystone-concepts.md). Broad-but-shallow coverage that
//     skips the load-bearing concepts is not readiness, so the few carry a
//     weight far above their share of the syllabus. Omitted (and its weight
//     redistributed) for exams with no keystone catalogue.
//   Retention (15%) — of the concepts already studied, the share that has not
//     decayed back to Forgotten. This is a hygiene measure over *studied*
//     concepts only, which is why it carries the smallest weight: it says
//     nothing about how much of the syllabus has been touched.
//
// Every state is read through `resolveConceptState` / `keystoneProgress`, so
// decay is applied at read time exactly as it is everywhere else.

/** Relative weights of the three criteria; renormalised when one is missing. */
export const CRITERION_WEIGHTS = { syllabus: 0.5, keystone: 0.35, retention: 0.15 } as const

export type ReadinessCriterionId = keyof typeof CRITERION_WEIGHTS

export interface ReadinessCriterion {
  id: ReadinessCriterionId
  label: string
  /** 0–100. */
  pct: number
  /** Share of the headline score this criterion carries, 0–1 (renormalised). */
  weight: number
  /** What the number counts, e.g. "12 of 74 concepts at Level 3". */
  detail: string
  /** What would raise it. */
  hint: string
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

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`
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
 * Dashboard and the exam grid filter by `exam_id` — and `examId` is the
 * exam-progress key (`P`, `FM`, `MAS-I`, `5`) the keystone catalogue is keyed by.
 */
export function computeExamReadiness(
  syllabus: WikiExamSyllabus,
  records: ConceptMasteryRecord[],
  examId: string,
  now: Date,
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

  // Retention is measured over studied concepts only: with nothing studied
  // there is nothing to retain, and the criterion sits at 0 like the others.
  const retentionPct = counts.studied > 0
    ? ((counts.studied - counts.forgotten) / counts.studied) * 100
    : 0

  const criteria: ReadinessCriterion[] = [
    {
      id: 'syllabus',
      label: 'Syllabus coverage',
      pct: syllabusPct,
      weight: CRITERION_WEIGHTS.syllabus,
      detail: counts.total > 0
        ? `${counts.level3} of ${plural(counts.total, 'concept')} at Level 3, ${counts.new} untouched`
        : 'No syllabus concepts parsed for this exam',
      hint: 'Every concept carried a level higher lifts this, weighted by its section’s exam weighting.',
    },
    ...(hasKeystones ? [{
      id: 'keystone' as const,
      label: 'Keystone concepts',
      pct: keystonePct,
      weight: CRITERION_WEIGHTS.keystone,
      detail: `${keystone.mastered} of ${plural(keystone.total, 'keystone')} mastered`
        + (keystone.forgotten > 0 ? `, ${keystone.forgotten} decayed` : ''),
      hint: 'The load-bearing concepts of this exam. They carry more weight here than their share of the syllabus.',
    }] : []),
    {
      id: 'retention',
      label: 'Retention',
      pct: retentionPct,
      weight: CRITERION_WEIGHTS.retention,
      detail: counts.studied > 0
        ? `${counts.studied - counts.forgotten} of ${plural(counts.studied, 'studied concept')} still fresh`
        : 'Nothing studied yet',
      hint: 'Concepts decay back to Forgotten when they go unreviewed. Reviving them restores this.',
    },
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
