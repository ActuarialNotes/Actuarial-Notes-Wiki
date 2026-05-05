// Concept mastery state machine.
//
// States advance as a learner answers questions. The Learning→Strong transition
// requires at least one hard-difficulty correct answer to prevent grinding
// easy questions to mastery. Stale concepts (15+ days since last correct) and
// runs of three failures both flip back to `forgotten`, which then re-enters
// the Learning track on the next correct answer — Strong must be re-earned.

export type MasteryState = 'new' | 'level1' | 'level2' | 'level3' | 'forgotten'

const VALID_MASTERY_STATES = new Set<string>(['new', 'level1', 'level2', 'level3', 'forgotten'])

/** Coerce legacy or unknown state values from storage/DB to a valid MasteryState. */
export function sanitizeMasteryState(state: string): MasteryState {
  if (state === 'learning') return 'level1'
  if (state === 'strong') return 'level3'
  if (VALID_MASTERY_STATES.has(state)) return state as MasteryState
  return 'new'
}

export interface ConceptMasteryRecord {
  user_id: string
  exam_id: string
  concept_slug: string
  state: MasteryState
  correct_count: number
  incorrect_streak: number
  hard_correct_count: number
  last_correct_at: string | null
  last_attempted_at: string | null
}

export const FORGET_AFTER_DAYS = 15
export const LEVEL2_CORRECT_THRESHOLD = 2
export const LEVEL3_CORRECT_THRESHOLD = 3
export const FORGET_FAIL_STREAK = 3

const MS_PER_DAY = 24 * 60 * 60 * 1000

export function emptyRecord(
  user_id: string,
  exam_id: string,
  concept_slug: string,
): ConceptMasteryRecord {
  return {
    user_id,
    exam_id,
    concept_slug,
    state: 'new',
    correct_count: 0,
    incorrect_streak: 0,
    hard_correct_count: 0,
    last_correct_at: null,
    last_attempted_at: null,
  }
}

interface AnswerInput {
  isCorrect: boolean
  isHard: boolean
  at: Date
}

export function applyAnswer(
  prev: ConceptMasteryRecord,
  { isCorrect, isHard, at }: AnswerInput,
): ConceptMasteryRecord {
  // Decay first so a stale Strong record doesn't skip the Forgotten checkpoint
  // when the user finally gets back to it.
  const decayed = decayIfStale(prev, at)

  const atIso = at.toISOString()
  const next: ConceptMasteryRecord = {
    ...decayed,
    last_attempted_at: atIso,
  }

  if (isCorrect) {
    // A concept may only advance one level per calendar day. If the concept
    // was already answered correctly today (last_correct_at is today's date),
    // it already used its daily advance — lock the state until tomorrow.
    // new/forgotten→level1 is always allowed because last_correct_at is null
    // or stale, never today.
    const prevCorrectDate = decayed.last_correct_at?.slice(0, 10)
    const todayDate = at.toISOString().slice(0, 10)
    const alreadyAdvancedToday = prevCorrectDate === todayDate

    next.correct_count = decayed.correct_count + 1
    next.incorrect_streak = 0
    next.hard_correct_count = decayed.hard_correct_count + (isHard ? 1 : 0)
    next.last_correct_at = atIso
    next.state = nextStateOnCorrect(decayed.state, next.correct_count, next.hard_correct_count, alreadyAdvancedToday)
  } else {
    next.incorrect_streak = decayed.incorrect_streak + 1
    if (next.incorrect_streak >= FORGET_FAIL_STREAK && decayed.state !== 'new') {
      next.state = 'forgotten'
    }
  }

  return next
}

function nextStateOnCorrect(
  state: MasteryState,
  correctCount: number,
  hardCorrectCount: number,
  alreadyAdvancedToday: boolean,
): MasteryState {
  // new/forgotten always promote to level1 (last_correct_at was null/stale so
  // alreadyAdvancedToday is guaranteed false here, but be explicit for clarity).
  if (state === 'new' || state === 'forgotten') return 'level1'
  // Enforce one-level-per-day: if the concept was already answered correctly
  // today it already used its single daily advance.
  if (alreadyAdvancedToday) return state
  if (state === 'level1') {
    if (correctCount >= LEVEL2_CORRECT_THRESHOLD) return 'level2'
    return 'level1'
  }
  if (state === 'level2') {
    if (correctCount >= LEVEL3_CORRECT_THRESHOLD && hardCorrectCount >= 1) return 'level3'
    return 'level2'
  }
  return state // level3 stays level3
}

export function decayIfStale(
  record: ConceptMasteryRecord,
  now: Date,
): ConceptMasteryRecord {
  if (record.state === 'new' || record.state === 'forgotten') return record
  if (!record.last_correct_at) return record
  const ageMs = now.getTime() - new Date(record.last_correct_at).getTime()
  if (ageMs < FORGET_AFTER_DAYS * MS_PER_DAY) return record
  return { ...record, state: 'forgotten', incorrect_streak: 0 }
}

export interface TopicAggregate {
  total: number
  strong: number    // level3 count (alias for backwards compat)
  learning: number  // level1+level2 count (alias for backwards compat)
  level1: number
  level2: number
  level3: number
  newCount: number
  forgotten: number
  /** Percentage of concepts in the topic that are at level3 (0-100). */
  strongPct: number
}

export function aggregateForTopic(
  records: ConceptMasteryRecord[],
  conceptSlugs: string[],
  now: Date,
): TopicAggregate {
  const byConcept = new Map(records.map(r => [r.concept_slug.toLowerCase(), r]))
  let level1 = 0, level2 = 0, level3 = 0, forgotten = 0, newCount = 0

  for (const slug of conceptSlugs) {
    const rec = byConcept.get(slug.toLowerCase())
    const state: MasteryState = rec ? decayIfStale(rec, now).state : 'new'
    if (state === 'level3') level3++
    else if (state === 'level2') level2++
    else if (state === 'level1') level1++
    else if (state === 'forgotten') forgotten++
    else newCount++
  }

  const total = conceptSlugs.length
  const strongPct = total > 0 ? Math.round((level3 / total) * 100) : 0
  return { total, strong: level3, learning: level1 + level2, level1, level2, level3, newCount, forgotten, strongPct }
}
