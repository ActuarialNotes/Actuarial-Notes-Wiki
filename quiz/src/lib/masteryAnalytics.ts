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
import { selectQuestionsForCoverage, type StudyPlan } from '@/lib/studyPlan'
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

// ── Coverage-optimized review selection ──────────────────────────────────────
// Reuse the app's greedy set-cover (selectQuestionsForCoverage) so a decay
// review is one or a few questions that hit as many fading concepts as possible,
// rather than every question tagged to a concept.

/** A minimal question shape for coverage selection. */
export interface CoverableQuestion {
  id: string
  wiki_link: string[]
}

// Does any of a question's wiki_links resolve to `lowerConcept`? Mirrors the
// last-segment/lowercase normalization selectQuestionsForCoverage matches on.
function linksIncludeConcept(wikiLinks: string[], lowerConcept: string): boolean {
  for (const link of wikiLinks) {
    const name = link.replace(/\+/g, ' ').replace(/\.md$/i, '').split('/').filter(Boolean).pop()?.toLowerCase()
    if (name === lowerConcept) return true
  }
  return false
}

/**
 * The single question that best reviews `requiredConcept`: among questions that
 * cover it, the one touching the most of `conceptNames` (the other fading
 * concepts). Returns null when no question covers the required concept.
 */
export function pickReviewQuestionForConcept<T extends CoverableQuestion>(
  questions: T[],
  conceptNames: string[],
  requiredConcept: string,
): T | null {
  const pool = questions.filter(q => linksIncludeConcept(q.wiki_link, requiredConcept.toLowerCase()))
  const [best] = selectQuestionsForCoverage(pool, conceptNames, 1)
  return best ?? null
}

/**
 * The fewest questions that together cover every concept in `conceptNames`
 * (greedy set-cover). Concepts with no matching question are simply skipped.
 */
export function pickReviewQuestionsForConcepts<T extends CoverableQuestion>(
  questions: T[],
  conceptNames: string[],
): T[] {
  return selectQuestionsForCoverage(questions, conceptNames)
}

// ── Plan-completion readiness projection ─────────────────────────────────────

const MASTERED_STATE: MasteryState = 'level3'

// A fresh level3 record so a plan-mastered concept doesn't pre-decay before the
// sample date (models "learned and maintained on schedule").
function freshlyMastered(concept_slug: string, at: Date): ConceptMasteryRecord {
  const iso = at.toISOString()
  return {
    user_id: '',
    exam_id: '',
    concept_slug,
    state: MASTERED_STATE,
    correct_count: 3,
    incorrect_streak: 0,
    hard_correct_count: 1,
    last_correct_at: iso,
    last_attempted_at: iso,
  }
}

/**
 * Overall readiness projected from `from` to `to` **assuming the study plan is
 * completed on schedule** — the optimistic counterpart to `projectReadiness`
 * (which assumes no study). Each concept's mastery date is the latest
 * `scheduledDate` among its plan assignments (realized at the end of that day);
 * at each sample date, concepts due by then are treated as freshly mastered and
 * the rest keep their current (naturally decaying) record. The curve rises to
 * the plan's target and then holds as maintenance keeps concepts fresh.
 */
export function projectReadinessWithPlan(
  syllabus: WikiExamSyllabus,
  records: ConceptMasteryRecord[],
  plan: StudyPlan,
  from: Date,
  to: Date,
  stepDays = 1,
): ReadinessProjectionPoint[] {
  // Latest scheduled date per concept = its mastery date, realized at end of day
  // (start of the next) so today's uncompleted plan doesn't inflate "today".
  const masteryDateByConcept = new Map<string, number>()
  for (const a of plan.assignments) {
    const key = a.conceptName.toLowerCase()
    const doneMs = new Date(a.scheduledDate + 'T00:00:00').getTime() + MS_PER_DAY
    const prev = masteryDateByConcept.get(key)
    if (prev == null || doneMs > prev) masteryDateByConcept.set(key, doneMs)
  }

  const lookup = buildMasteryLookup(records)
  const masteryDateFor = (concept: { name: string; target?: string | null }): number | undefined =>
    masteryDateByConcept.get(concept.name.toLowerCase()) ??
    (concept.target ? masteryDateByConcept.get(concept.target.toLowerCase()) : undefined)

  const readinessAt = (d: Date): number => {
    const dMs = d.getTime()
    const synthetic: ConceptMasteryRecord[] = []
    for (const topic of syllabus.topics) {
      for (const concept of topic.concepts) {
        const rec = lookupConceptRecord(lookup, concept)
        const masteredBy = masteryDateFor(concept)
        if (masteredBy != null && masteredBy <= dMs) {
          synthetic.push(freshlyMastered(concept.name, d))
        } else if (rec) {
          synthetic.push(rec)
        }
      }
    }
    return computeReadiness(syllabus, synthetic, d).overallPct
  }

  const startMs = from.getTime()
  const endMs = to.getTime()
  if (endMs <= startMs) return [{ date: new Date(startMs), overallPct: readinessAt(from) }]

  const step = Math.max(1, stepDays) * MS_PER_DAY
  const points: ReadinessProjectionPoint[] = []
  for (let t = startMs; t <= endMs; t += step) {
    const date = new Date(t)
    points.push({ date, overallPct: readinessAt(date) })
  }
  if (points[points.length - 1].date.getTime() < endMs) {
    points.push({ date: new Date(endMs), overallPct: readinessAt(to) })
  }
  return points
}
