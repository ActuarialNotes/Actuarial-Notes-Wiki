// **Accuracy over time** — how often a reader's answers are right, day by day,
// for one exam. The Dashboard's accuracy card draws it
// (`components/AccuracyTrendCard.tsx`, fed by `hooks/useAccuracyTrend.ts`).
//
// It exists because a reader told us they were *estimating* their hit rate
// ("20% to 50% to 70%") while the app was holding every answer they'd given in
// `question_responses`. This turns those rows into what they wanted to see:
// the rate on each day they studied, this week against last week, and the
// same split by the question's difficulty.
//
// Pure: rows in, tallies out. Which questions count (one exam's) and how hard
// each is come in as `difficultyOf`, which returns undefined for a question
// outside the exam — that row is skipped.

import type { Difficulty } from './parser'
import { localDayKey } from './streak'

export interface AnswerRow {
  question_id: string
  is_correct: boolean
  answered_at: string
}

export interface Tally {
  answered: number
  correct: number
}

export type DifficultyTallies = Record<Difficulty, Tally>

export interface AccuracyDay extends Tally {
  /** Local calendar day, YYYY-MM-DD. */
  day: string
  byDifficulty: DifficultyTallies
}

export interface AccuracyTrend {
  /** Days with at least one answer inside the span, oldest first. */
  days: AccuracyDay[]
  /** The last 7 days, today included. */
  recent: Tally & { byDifficulty: DifficultyTallies }
  /** The 7 days before those. */
  previous: Tally
}

export const DIFFICULTY_ORDER: readonly Difficulty[] = ['easy', 'medium', 'hard']

/** Fewest answers in each week before the two are compared — fewer is noise. */
export const MIN_ANSWERS_TO_COMPARE = 5

const emptyTally = (): Tally => ({ answered: 0, correct: 0 })
const emptyByDifficulty = (): DifficultyTallies => ({ easy: emptyTally(), medium: emptyTally(), hard: emptyTally() })

function add(t: Tally, correct: boolean) {
  t.answered++
  if (correct) t.correct++
}

/** Whole days from `a` to `b` (both YYYY-MM-DD). */
function dayDiff(a: string, b: string): number {
  return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86_400_000)
}

/** Percentage right, rounded; null when nothing was answered. */
export function accuracyPercent(t: Tally): number | null {
  return t.answered > 0 ? Math.round((100 * t.correct) / t.answered) : null
}

export function accuracyTrend(
  rows: readonly AnswerRow[],
  difficultyOf: (questionId: string) => Difficulty | undefined,
  today: string,
  opts: { span?: number; dayOf?: (iso: string) => string } = {},
): AccuracyTrend {
  const span = opts.span ?? 30
  const dayOf = opts.dayOf ?? ((iso: string) => localDayKey(new Date(iso)))
  const byDay = new Map<string, AccuracyDay>()
  const recent = { ...emptyTally(), byDifficulty: emptyByDifficulty() }
  const previous = emptyTally()

  for (const row of rows) {
    const difficulty = difficultyOf(row.question_id)
    if (!difficulty) continue
    const day = dayOf(row.answered_at)
    const ago = dayDiff(day, today)
    if (ago < 0) continue
    if (ago < 7) {
      add(recent, row.is_correct)
      add(recent.byDifficulty[difficulty], row.is_correct)
    } else if (ago < 14) {
      add(previous, row.is_correct)
    }
    if (ago >= span) continue
    let entry = byDay.get(day)
    if (!entry) {
      entry = { day, ...emptyTally(), byDifficulty: emptyByDifficulty() }
      byDay.set(day, entry)
    }
    add(entry, row.is_correct)
    add(entry.byDifficulty[difficulty], row.is_correct)
  }

  const days = [...byDay.values()].sort((a, b) => (a.day < b.day ? -1 : 1))
  return { days, recent, previous }
}

/**
 * This week's rate against last week's, in points — null unless both weeks
 * have enough answers to mean something.
 */
export function weeklyChange(trend: AccuracyTrend): number | null {
  if (trend.recent.answered < MIN_ANSWERS_TO_COMPARE || trend.previous.answered < MIN_ANSWERS_TO_COMPARE) return null
  return accuracyPercent(trend.recent)! - accuracyPercent(trend.previous)!
}
