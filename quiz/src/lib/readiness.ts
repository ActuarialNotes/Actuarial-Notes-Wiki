import { wikiExamIdToProgressKey, type WikiExamSyllabus } from '@/lib/wikiParser'
import { DECAY_DAYS_LEVEL3, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
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
}

// A band carries its label and nothing else. It used to carry a `blurb` — one
// generic sentence per band, printed under the label on the Dashboard card —
// but a line that is the same for every learner in a forty-point range is not
// an insight, and at the bottom band ("Answer questions on this exam and the
// score fills in") it was the label paraphrased (docs/visual-noise-review.md,
// test 1). `readinessInsight` below replaces it with something derived from
// this learner's own records, and says nothing when there is nothing to say.
const BANDS: Array<{ min: number } & ReadinessBand> = [
  { min: 85, id: 'ready', label: 'Exam ready' },
  { min: 65, id: 'nearly', label: 'Nearly exam ready' },
  { min: 40, id: 'progressing', label: 'Making progress' },
  { min: 15, id: 'building', label: 'Building foundations' },
  { min: 0, id: 'not-started', label: 'Not started' },
]

export function readinessBand(pct: number): ReadinessBand {
  const band = BANDS.find(b => pct >= b.min) ?? BANDS[BANDS.length - 1]
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
  /** Null when the exam has no authored keystones. */
  keystone: KeystoneProgress | null
  counts: ConceptStateCounts
  /**
   * One sentence about *this* record, or null when there is nothing worth
   * saying — see `readinessInsight`. Null is the normal state of an exam
   * nobody has started.
   */
  insight: ReadinessInsight | null
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

  const assessment: Omit<ExamReadinessAssessment, 'insight'> = {
    overallPct,
    band: readinessBand(overallPct),
    criteria,
    sections,
    weakestSections,
    keystone: hasKeystones ? keystone : null,
    counts,
  }

  return { ...assessment, insight: readinessInsight(assessment) }
}

// ── The insight line ─────────────────────────────────────────────────────────
//
// The one sentence under the band label on the Dashboard's Exam readiness card.
// It is derived from *this* learner's records, and every rule below names
// something the card does not already draw — a concept, a section, a tally.
// Nothing here may restate the ring, the headline score or the two criterion
// bars (docs/visual-noise-review.md, test 1): "syllabus coverage is low" is the
// bar said twice, and a sentence that would read the same for everyone in a
// forty-point band is not an insight at all.
//
// **Returning null is a normal outcome, not a fallback.** An exam nobody has
// started has no insight in it — the empty ring and the "Not started" label are
// the whole story — and a record where none of these rules finds anything is
// not worth a line of grey either. The card renders nothing when this is null.
//
// The rules are ordered by what costs a candidate the most, and the first hit
// wins: a decayed keystone outranks a thin section, which outranks the reminder
// that Level 3 does not hold by itself.

export type ReadinessInsightId =
  | 'keystone-decay'
  | 'broad-decay'
  | 'keystones-untouched'
  | 'second-pass'
  | 'costliest-section'
  | 'hold-the-keystones'

export interface ReadinessInsight {
  id: ReadinessInsightId
  text: string
}

/** Decay is only the headline once it is a pattern, not one stale concept. */
const BROAD_DECAY_MIN = 3
const BROAD_DECAY_SHARE = 0.25
/** How far the keystone criterion must trail coverage before it is the story. */
const KEYSTONE_LAG_POINTS = 15
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
  const { counts, keystone, sections, criteria } = assessment

  // Nothing started — nothing to be insightful about.
  if (counts.total === 0 || counts.studied === 0) return null

  // 1. A decayed keystone is the most expensive row on the board: it is a
  //    concept already earned once, and it pays into both criteria.
  if (keystone) {
    const decayed = keystone.entries.filter(e => e.state === 'forgotten')
    if (decayed.length === 1) {
      return {
        id: 'keystone-decay',
        text: `${decayed[0].concept.name} — a keystone — has decayed back to Forgotten; review it before adding anything new.`,
      }
    }
    if (decayed.length > 1) {
      return {
        id: 'keystone-decay',
        text: `${decayed.length} keystone concepts have decayed back to Forgotten, ${decayed[0].concept.name} among them — review those before adding anything new.`,
      }
    }
  }

  // 2. Decay across the syllabus at a scale that outruns new study.
  if (counts.forgotten >= BROAD_DECAY_MIN && counts.forgotten >= counts.studied * BROAD_DECAY_SHARE) {
    return {
      id: 'broad-decay',
      text: counts.forgotten === counts.studied
        ? `All ${counts.forgotten} concepts you have started have decayed back to Forgotten — recovering those moves the score further than new material does.`
        : `${counts.forgotten} of the ${counts.studied} concepts you have started have decayed back to Forgotten — recovering those moves the score further than new material does.`,
    }
  }

  // 3. Coverage running ahead of the concepts the coverage rests on. The bars
  //    show the gap; this names how many keystones are behind it and one of them.
  const syllabusPct = criteria.find(c => c.id === 'syllabus')?.pct ?? 0
  const keystonePct = criteria.find(c => c.id === 'keystone')?.pct ?? 0
  if (keystone && keystonePct + KEYSTONE_LAG_POINTS <= syllabusPct) {
    const untouched = keystone.entries.filter(e => e.state === 'new')
    if (untouched.length === 1) {
      return {
        id: 'keystones-untouched',
        text: `${untouched[0].concept.name} is the one keystone concept you have not started — the rest of the syllabus leans on it.`,
      }
    }
    if (untouched.length > 1) {
      return {
        id: 'keystones-untouched',
        text: untouched.length === keystone.total
          ? `None of the ${keystone.total} keystone concepts are started yet, ${untouched[0].concept.name} included — the rest of the syllabus leans on them.`
          : `${untouched.length} of the ${keystone.total} keystone concepts are still untouched, ${untouched[0].concept.name} among them — the rest of the syllabus leans on them.`,
      }
    }
  }

  // 4. A record that is wide and shallow: most of it parked on the bottom rung,
  //    where each concept is earning a third of what it could.
  if (counts.level1 >= SECOND_PASS_MIN && counts.level1 >= counts.studied * SECOND_PASS_SHARE) {
    return {
      id: 'second-pass',
      text: `${counts.level1} concepts are sitting at Level 1 — a second pass on those lifts the score further than starting new ones.`,
    }
  }

  // 5. Where the missing score actually is. Ranked by weight × shortfall — the
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
        ? `Most of the missing score is in ${costliest.name} — ${share}% of the exam, ${covered}% covered.`
        : `Most of the missing score is in ${costliest.name}, at ${covered}% covered.`,
    }
  }

  // 6. Everything is up. The one thing left to say is that it does not stay up
  //    on its own — a fact no bar on the card can carry.
  if (keystone && keystone.total > 0 && keystone.mastered === keystone.total) {
    return {
      id: 'hold-the-keystones',
      text: `All ${keystone.total} keystone concepts are at Level 3 — that lapses after ${DECAY_DAYS_LEVEL3} days unreviewed, so keep them in rotation.`,
    }
  }

  return null
}
