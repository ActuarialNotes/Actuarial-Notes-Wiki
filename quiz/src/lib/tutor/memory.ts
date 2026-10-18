// **When a concept is due** — the Tutor's memory model (docs/tutor.md §6).
//
// The mastery ladder (lib/mastery.ts) is what a candidate *sees*: five states
// and fixed decay. It is too coarse to schedule with — it can't tell a concept
// recalled on its due date from one recalled the day after it was learned, and
// that difference is the whole of the spacing effect. So the Tutor keeps a
// scheduler, never a score: nothing here is ever printed as a level.
//
// The model is FSRS-4.5's (Jarrett Ye, open-spaced-repetition): its published
// equations with its published default weights, which were fitted to hundreds
// of millions of real reviews. Per concept it keeps a **stability** S — the
// days after which recall falls to 90% — and a **difficulty** D, 1 to 10.
// Two rules are the Tutor's own, both about the exam: no gap is longer than a
// share of the days left (Cepeda et al. 2008), and none runs past the day
// before the exam.

import type { ConceptMasteryRecord } from '../mastery'
import type { SelfGrade } from '../parser'

/** FSRS's four ratings. The Tutor never gives `4` (see `ratingFor`). */
export type Rating = 1 | 2 | 3 | 4

/** FSRS-4.5's default parameters, w0 … w16. */
export const FSRS_WEIGHTS = [
  0.4872, 1.4003, 3.7145, 13.8206, // w0–w3: first-review stability per rating
  5.1618, 1.2298,                  // w4, w5: first-review difficulty
  0.8975, 0.031,                   // w6, w7: difficulty step, mean reversion
  1.6474, 0.1367, 1.0461,          // w8–w10: stability growth on a success
  2.1072, 0.0793, 0.3246, 1.587,   // w11–w14: stability after a lapse
  0.2272, 2.8755,                  // w15, w16: Hard penalty, Easy bonus
] as const

const w = FSRS_WEIGHTS
const DECAY = -0.5
const FACTOR = 19 / 81
const DAY_MS = 24 * 60 * 60 * 1000

/** The recall a scheduled review aims for. */
export const TARGET_RETENTION = 0.9

/**
 * The longest gap, as a share of the days left to the exam. Cepeda et al.
 * (2008) found the best gap between study sessions is 10–30% of how long the
 * knowledge must last, at horizons of one to three months; a quarter keeps
 * every concept coming back before the sitting at least four times.
 */
export const HORIZON_SHARE = 0.25

/** The longest gap with no exam date to measure against. */
export const MAX_INTERVAL_DAYS = 180

export interface MemoryState {
  /** Days until recall falls to 90%. */
  stability: number
  /** 1 (easy) – 10 (hard). */
  difficulty: number
  /** When it was last reviewed (ISO timestamp). */
  lastReview: string
  reps: number
  lapses: number
}

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x))
}

/** Recall probability `elapsedDays` after a review: FSRS's power forgetting curve. */
export function retrievability(elapsedDays: number, stability: number): number {
  if (elapsedDays <= 0) return 1
  return Math.pow(1 + (FACTOR * elapsedDays) / stability, DECAY)
}

/** Days until recall falls to `target` — `stability` days for 0.9. */
export function intervalDays(stability: number, target = TARGET_RETENTION): number {
  return (stability / FACTOR) * (Math.pow(target, 1 / DECAY) - 1)
}

function initialDifficulty(rating: Rating): number {
  return clamp(w[4] - (rating - 3) * w[5], 1, 10)
}

export function elapsedDays(fromIso: string, to: Date): number {
  return Math.max(0, (to.getTime() - new Date(fromIso).getTime()) / DAY_MS)
}

/** The state after a concept's first review. */
export function initialState(rating: Rating, at: Date): MemoryState {
  return {
    stability: w[rating - 1],
    difficulty: initialDifficulty(rating),
    lastReview: at.toISOString(),
    reps: 1,
    lapses: rating === 1 ? 1 : 0,
  }
}

/**
 * The state after a review. A success grows stability, by more the harder the
 * recall was (lower R): reviewed the same day, R is 1 and the growth term is
 * zero — massed repetition earns nothing, which is the spacing effect in one
 * line. A lapse cuts stability back, and never above where it was.
 */
export function nextState(state: MemoryState, rating: Rating, at: Date): MemoryState {
  const t = elapsedDays(state.lastReview, at)
  const R = retrievability(t, state.stability)
  const S = state.stability
  const D = state.difficulty

  const difficulty = clamp(w[7] * w[4] + (1 - w[7]) * (D - w[6] * (rating - 3)), 1, 10)

  let stability: number
  if (rating === 1) {
    const lapse = w[11] * Math.pow(D, -w[12]) * (Math.pow(S + 1, w[13]) - 1) * Math.exp(w[14] * (1 - R))
    stability = Math.min(lapse, S)
  } else {
    const hard = rating === 2 ? w[15] : 1
    const easy = rating === 4 ? w[16] : 1
    stability = S * (Math.exp(w[8]) * (11 - D) * Math.pow(S, -w[9]) * (Math.exp(w[10] * (1 - R)) - 1) * hard * easy + 1)
  }

  return {
    stability: Math.max(0.1, stability),
    difficulty,
    lastReview: at.toISOString(),
    reps: state.reps + 1,
    lapses: state.lapses + (rating === 1 ? 1 : 0),
  }
}

/** Fold a review into a state that may not exist yet. */
export function review(state: MemoryState | null, rating: Rating, at: Date): MemoryState {
  return state ? nextState(state, rating, at) : initialState(rating, at)
}

/**
 * The rating a review counts as, from the candidate's own mark and how sure
 * they were before they saw the answer. A right answer while guessing is a
 * fragile one — Hard. The Tutor never rates Easy: a self-marked answer is
 * evidence, not proof, and Easy would push a concept out of sight for weeks.
 */
export type Confidence = 'sure' | 'unsure' | 'guess'

export function ratingFor(grade: SelfGrade, confidence: Confidence | null): Rating {
  if (grade === 'incorrect') return 1
  if (grade === 'partial') return 2
  return confidence === 'guess' ? 2 : 3
}

/**
 * The gap, in whole days, before the next review: the interval that keeps
 * recall at the target, at least a day, at most a quarter of the days that were
 * left to the exam at the review, and never past the day before it.
 */
export function scheduledIntervalDays(stability: number, daysToExam: number | null): number {
  let days = Math.max(1, Math.round(intervalDays(stability)))
  if (daysToExam == null) return Math.min(days, MAX_INTERVAL_DAYS)
  if (daysToExam >= 2) {
    days = Math.min(days, Math.max(1, Math.floor(daysToExam * HORIZON_SHARE)), daysToExam - 1)
  } else {
    days = 1
  }
  return Math.max(1, days)
}

/** The local calendar day of a moment, `YYYY-MM-DD`. */
export function dayKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Whole calendar days from one day key to another. */
export function daysFromTo(from: string, to: string): number {
  const a = new Date(`${from}T12:00:00`)
  const b = new Date(`${to}T12:00:00`)
  return Math.round((b.getTime() - a.getTime()) / DAY_MS)
}

export function addDayKey(day: string, n: number): string {
  const d = new Date(`${day}T12:00:00`)
  d.setDate(d.getDate() + n)
  return dayKey(d)
}

/**
 * The day a concept is next due. Measured from its last review, with the exam
 * as it stood then — so a date set later still bounds it, and a review is
 * never scheduled past the exam.
 */
export function dueDay(state: MemoryState, examDay: string | null): string {
  const reviewed = dayKey(new Date(state.lastReview))
  const daysToExam = examDay ? daysFromTo(reviewed, examDay) : null
  return addDayKey(reviewed, scheduledIntervalDays(state.stability, daysToExam != null && daysToExam > 0 ? daysToExam : null))
}

export function isDue(state: MemoryState, today: string, examDay: string | null): boolean {
  return dueDay(state, examDay) <= today
}

/** Recall now, as the model sees it. */
export function recallNow(state: MemoryState, now: Date): number {
  return retrievability(elapsedDays(state.lastReview, now), state.stability)
}

/**
 * A starting state for a concept the Tutor has never reviewed but the ladder
 * has: Level 3 as 21 days' stability, Level 2 as 7, Level 1 as 2, each from its
 * last correct answer; Forgotten as a lapse at half a day. New, or a record with
 * no correct answer, starts nothing — the Tutor treats it as unmet.
 */
export const LADDER_SEED_STABILITY = { level1: 2, level2: 7, level3: 21, forgotten: 0.5 } as const

export function seedFromLadder(record: Pick<ConceptMasteryRecord, 'state' | 'last_correct_at' | 'last_attempted_at'>): MemoryState | null {
  if (record.state === 'new') return null
  const at = record.state === 'forgotten'
    ? record.last_attempted_at ?? record.last_correct_at
    : record.last_correct_at
  if (!at) return null
  return {
    stability: LADDER_SEED_STABILITY[record.state],
    difficulty: w[4],
    lastReview: at,
    reps: record.state === 'level3' ? 3 : record.state === 'level2' ? 2 : 1,
    lapses: record.state === 'forgotten' ? 1 : 0,
  }
}
