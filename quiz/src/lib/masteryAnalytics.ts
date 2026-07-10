// Learner-facing mastery analytics (roadmap P2.5).
//
// Pure, read-only derivations over the mastery records the Dashboard already
// loads — no I/O, no React — surfacing three things the learning engine knows
// but never showed the student:
//
//   1. Concepts about to decay — mastered concepts whose spaced-repetition timer
//      is about to step them down a level (or to Forgotten).
//   2. Predicted exam-readiness-by-date — where readiness lands over time
//      assuming no further study (decay is deterministic, so this is exact).
//   3. Weakest topics — syllabus sections ranked by readiness, each carrying the
//      concept names needed to launch a targeted quiz.
//
// Everything reuses the existing engine rather than re-deriving decay/readiness:
// the DECAY_DAYS_* thresholds and record shape from mastery.ts, the alias-safe
// lookups from conceptMatch.ts, and the scoring formula from readiness.ts.

import {
  DECAY_DAYS_LEVEL1,
  DECAY_DAYS_LEVEL2,
  DECAY_DAYS_LEVEL3,
  type ConceptMasteryRecord,
  type MasteryState,
} from '@/lib/mastery'
import { buildMasteryLookup, lookupConceptRecord, resolveConceptState } from '@/lib/conceptMatch'
import { computeReadiness, type SectionReadiness } from '@/lib/readiness'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

const MS_PER_DAY = 24 * 60 * 60 * 1000

/** A single downward decay transition and the date it fires. */
export interface DecayStep {
  at: Date
  from: MasteryState
  to: MasteryState
}

// The full ordered decay ladder for a record, measured from last_correct_at.
// Cascades level3 → level2 → level1 → forgotten using the same thresholds as
// decayIfStale() in mastery.ts, so the "when" here always agrees with the
// "what state" the state machine reports. Returns [] for new/forgotten records
// or ones that have never been answered correctly (no timer to run).
function decaySteps(record: ConceptMasteryRecord): DecayStep[] {
  if (!record.last_correct_at) return []
  const steps: DecayStep[] = []
  let t = new Date(record.last_correct_at).getTime()
  let state: MasteryState = record.state

  if (state === 'level3') {
    t += DECAY_DAYS_LEVEL3 * MS_PER_DAY
    steps.push({ at: new Date(t), from: 'level3', to: 'level2' })
    state = 'level2'
  }
  if (state === 'level2') {
    t += DECAY_DAYS_LEVEL2 * MS_PER_DAY
    steps.push({ at: new Date(t), from: 'level2', to: 'level1' })
    state = 'level1'
  }
  if (state === 'level1') {
    t += DECAY_DAYS_LEVEL1 * MS_PER_DAY
    steps.push({ at: new Date(t), from: 'level1', to: 'forgotten' })
  }
  return steps
}

/**
 * The next downward decay transition strictly after `now`, or null if the
 * concept has no pending decay (new/forgotten/never-correct). `step.from` is the
 * concept's current decay-adjusted state; `step.to` is where it's headed.
 */
export function nextDecayStep(record: ConceptMasteryRecord, now: Date): DecayStep | null {
  const nowMs = now.getTime()
  for (const step of decaySteps(record)) {
    if (step.at.getTime() > nowMs) return step
  }
  return null
}

/** The date the concept next steps down a level, or null if none pending. */
export function nextDecayDate(record: ConceptMasteryRecord, now: Date): Date | null {
  return nextDecayStep(record, now)?.at ?? null
}

/**
 * Fractional days until the concept next steps down a level, or null if none
 * pending. Raw (not rounded) so callers can compare against a horizon precisely.
 */
export function daysUntilNextDecay(record: ConceptMasteryRecord, now: Date): number | null {
  const step = nextDecayStep(record, now)
  if (!step) return null
  return (step.at.getTime() - now.getTime()) / MS_PER_DAY
}

/** One concept whose mastery is about to decay within the warning horizon. */
export interface DecayWarning {
  /** Canonical concept name — matches question wiki_links, so it deep-links a quiz. */
  concept: string
  currentState: MasteryState
  nextState: MasteryState
  decaysAt: Date
  daysUntil: number
}

/**
 * Concepts across the syllabus whose next decay step falls within `horizonDays`,
 * soonest first. Alias-safe (matches stored slugs by display name then target).
 */
export function conceptsAboutToDecay(
  syllabus: WikiExamSyllabus,
  records: ConceptMasteryRecord[],
  now: Date,
  horizonDays = 7,
): DecayWarning[] {
  const lookup = buildMasteryLookup(records)
  const seen = new Set<string>()
  const warnings: DecayWarning[] = []

  for (const topic of syllabus.topics) {
    for (const concept of topic.concepts) {
      const key = concept.name.toLowerCase()
      if (seen.has(key)) continue
      const rec = lookupConceptRecord(lookup, concept)
      if (!rec) continue
      const step = nextDecayStep(rec, now)
      if (!step) continue
      const daysUntil = (step.at.getTime() - now.getTime()) / MS_PER_DAY
      if (daysUntil > horizonDays) continue
      seen.add(key)
      warnings.push({
        concept: concept.name,
        currentState: step.from,
        nextState: step.to,
        decaysAt: step.at,
        daysUntil,
      })
    }
  }

  warnings.sort((a, b) => a.daysUntil - b.daysUntil)
  return warnings
}

/** Overall readiness sampled at a point in time. */
export interface ReadinessProjectionPoint {
  date: Date
  overallPct: number
}

/**
 * Overall readiness sampled from `from` to `to` (inclusive) every `stepDays`,
 * assuming no further study. Exact because decay is a pure function of the
 * evaluation date — each point is `computeReadiness(...).overallPct` at that
 * date. The final `to` point is always included even if the step overshoots.
 */
export function projectReadiness(
  syllabus: WikiExamSyllabus,
  records: ConceptMasteryRecord[],
  from: Date,
  to: Date,
  stepDays = 1,
): ReadinessProjectionPoint[] {
  const startMs = from.getTime()
  const endMs = to.getTime()
  if (endMs <= startMs) {
    return [{ date: new Date(startMs), overallPct: computeReadiness(syllabus, records, from).overallPct }]
  }

  const step = Math.max(1, stepDays) * MS_PER_DAY
  const points: ReadinessProjectionPoint[] = []
  for (let t = startMs; t <= endMs; t += step) {
    const date = new Date(t)
    points.push({ date, overallPct: computeReadiness(syllabus, records, date).overallPct })
  }
  if (points[points.length - 1].date.getTime() < endMs) {
    points.push({ date: new Date(endMs), overallPct: computeReadiness(syllabus, records, to).overallPct })
  }
  return points
}

/** A syllabus section plus the concept names needed to launch a targeted quiz. */
export interface WeakTopic extends SectionReadiness {
  /** All concept names in the topic (canonical — match question wiki_links). */
  conceptNames: string[]
  /** Concepts not yet at level3 — the ones worth practising. */
  weakConceptNames: string[]
}

/**
 * Syllabus topics ranked weakest-first by readiness (heavier syllabus weight
 * breaks ties). Empty topics are dropped. Reuses computeReadiness for the
 * scoring formula, then does one light pass for the deep-link concept names.
 */
export function weakestTopics(
  syllabus: WikiExamSyllabus,
  records: ConceptMasteryRecord[],
  now: Date,
  limit?: number,
): WeakTopic[] {
  const { sections } = computeReadiness(syllabus, records, now)
  const lookup = buildMasteryLookup(records)
  const topicByName = new Map(syllabus.topics.map(t => [t.name, t]))

  const ranked = sections
    .filter(s => s.total > 0)
    .map<WeakTopic>(s => {
      const concepts = topicByName.get(s.name)?.concepts ?? []
      return {
        ...s,
        conceptNames: concepts.map(c => c.name),
        weakConceptNames: concepts
          .filter(c => resolveConceptState(lookup, c, now) !== 'level3')
          .map(c => c.name),
      }
    })
    .sort((a, b) => a.readinessPct - b.readinessPct || b.weight - a.weight)

  return typeof limit === 'number' ? ranked.slice(0, limit) : ranked
}
