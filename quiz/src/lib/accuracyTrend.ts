// **Accuracy over time** — how often a reader's answers are right, day by day,
// for one exam. The Dashboard's accuracy card draws it
// (`components/AccuracyTrendCard.tsx`, fed by `hooks/useAccuracyTrend.ts`).
//
// It exists because a reader told us they were *estimating* their hit rate
// ("20% to 50% to 70%") while the app was holding every answer they'd given in
// `question_responses`. This turns those rows into what they wanted to see,
// over a span the reader picks (7, 30 or 90 days), and every figure on the card
// covers that one span — the headline, the change, the difficulty split, the
// weakest topics:
//
// - each studied day's rate, with how many answers it rests on (a day of one
//   answer is 0% or 100%, and the card draws it small rather than loud);
// - a **rolling 7-day rate** for every calendar day of the span, pooled over
//   the answers (not an average of daily rates), so a one-answer day moves it
//   by one answer's worth — this is the line the card draws;
// - the span against the span before it, when both rest on enough answers;
// - the split by difficulty and by topic, each with its count.
//
// Pure: rows in, tallies out. Which questions count (one exam's), how hard each
// is and its topic come in as `lookup`, which returns undefined for a question
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

export interface AccuracyAnswer {
  questionId: string
  correct: boolean
  /** The row's timestamp, as stored. */
  at: string
}

export interface AccuracyDay extends Tally {
  /** Local calendar day, YYYY-MM-DD. */
  day: string
  byDifficulty: DifficultyTallies
  /** That day's answers, newest first. */
  answers: AccuracyAnswer[]
}

export interface TopicTally extends Tally {
  topic: string
}

export interface RollingPoint {
  day: string
  /** The rate over the 7 days ending here, or null when none of them was studied. */
  percent: number | null
}

export interface AccuracyTrend {
  /** Days the trend covers, today included. */
  span: number
  /** Days with at least one answer inside the span, oldest first. */
  days: AccuracyDay[]
  /** Every answer inside the span. */
  total: Tally & { byDifficulty: DifficultyTallies }
  /** The same number of days before the span — null when the fetch doesn't reach back that far. */
  previous: Tally | null
  /** One point per calendar day of the span, oldest first. */
  rolling: RollingPoint[]
  /** Every topic answered inside the span, in no particular order. */
  topics: TopicTally[]
}

export interface QuestionFacts {
  difficulty: Difficulty
  topic: string
}

export const ACCURACY_SPANS = [7, 30, 90] as const
export type AccuracySpan = (typeof ACCURACY_SPANS)[number]

export const DIFFICULTY_ORDER: readonly Difficulty[] = ['easy', 'medium', 'hard']

/** Fewest answers in each span before the two are compared — fewer is noise. */
export const MIN_ANSWERS_TO_COMPARE = 5

/** Below this many answers a rate is shown, but stepped back: it can't say much yet. */
export const RELIABLE_ANSWERS = 10

/** The window the trend line pools over. */
export const ROLLING_DAYS = 7

const emptyTally = (): Tally => ({ answered: 0, correct: 0 })
const emptyByDifficulty = (): DifficultyTallies => ({ easy: emptyTally(), medium: emptyTally(), hard: emptyTally() })

function add(t: Tally, correct: boolean) {
  t.answered++
  if (correct) t.correct++
}

/** Whole days from `a` to `b` (both YYYY-MM-DD). */
export function dayDiff(a: string, b: string): number {
  return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86_400_000)
}

function shiftDay(day: string, by: number): string {
  return new Date(Date.parse(day + 'T00:00:00Z') + by * 86_400_000).toISOString().slice(0, 10)
}

/** Percentage right, rounded; null when nothing was answered. */
export function accuracyPercent(t: Tally): number | null {
  return t.answered > 0 ? Math.round((100 * t.correct) / t.answered) : null
}

export function accuracyTrend(
  rows: readonly AnswerRow[],
  lookup: (questionId: string) => QuestionFacts | undefined,
  today: string,
  opts: {
    span?: number
    dayOf?: (iso: string) => string
    /** How many days back the rows reach (today included); `previous` needs twice the span. */
    history?: number
  } = {},
): AccuracyTrend {
  const span = opts.span ?? 30
  const dayOf = opts.dayOf ?? ((iso: string) => localDayKey(new Date(iso)))
  const history = opts.history ?? Infinity
  // Every day answered, inside the span or not: the rolling line at the
  // span's first day reaches back into the week before it.
  const byDay = new Map<string, AccuracyDay>()
  const total = { ...emptyTally(), byDifficulty: emptyByDifficulty() }
  const previous = emptyTally()
  const topics = new Map<string, TopicTally>()

  for (const row of rows) {
    const facts = lookup(row.question_id)
    if (!facts) continue
    const day = dayOf(row.answered_at)
    const ago = dayDiff(day, today)
    if (ago < 0) continue
    let entry = byDay.get(day)
    if (!entry) {
      entry = { day, ...emptyTally(), byDifficulty: emptyByDifficulty(), answers: [] }
      byDay.set(day, entry)
    }
    add(entry, row.is_correct)
    add(entry.byDifficulty[facts.difficulty], row.is_correct)
    entry.answers.push({ questionId: row.question_id, correct: row.is_correct, at: row.answered_at })

    if (ago < span) {
      add(total, row.is_correct)
      add(total.byDifficulty[facts.difficulty], row.is_correct)
      let t = topics.get(facts.topic)
      if (!t) {
        t = { topic: facts.topic, ...emptyTally() }
        topics.set(facts.topic, t)
      }
      add(t, row.is_correct)
    } else if (ago < 2 * span) {
      add(previous, row.is_correct)
    }
  }

  for (const d of byDay.values()) d.answers.sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0))

  const rolling: RollingPoint[] = []
  for (let ago = span - 1; ago >= 0; ago--) {
    const day = shiftDay(today, -ago)
    const pooled = emptyTally()
    for (let back = 0; back < ROLLING_DAYS; back++) {
      const d = byDay.get(shiftDay(day, -back))
      if (d) {
        pooled.answered += d.answered
        pooled.correct += d.correct
      }
    }
    rolling.push({ day, percent: accuracyPercent(pooled) })
  }

  const days = [...byDay.values()]
    .filter(d => dayDiff(d.day, today) < span)
    .sort((a, b) => (a.day < b.day ? -1 : 1))
  return {
    span,
    days,
    total,
    previous: 2 * span <= history ? previous : null,
    rolling,
    topics: [...topics.values()],
  }
}

/**
 * The span's rate against the span before's, in points — null unless both
 * have enough answers to mean something (and the earlier one was fetched).
 */
export function spanChange(trend: AccuracyTrend): number | null {
  const { total, previous } = trend
  if (!previous || total.answered < MIN_ANSWERS_TO_COMPARE || previous.answered < MIN_ANSWERS_TO_COMPARE) return null
  return accuracyPercent(total)! - accuracyPercent(previous)!
}

/** Fewest answers on a topic before it can be called weak. */
export const MIN_TOPIC_ANSWERS = 3

/**
 * The topics the reader gets wrong most often, worst first: only topics with
 * enough answers to judge and at least one miss. Ties go to the topic with more
 * answers (the surer verdict), then by name.
 */
export function weakestTopics(trend: AccuracyTrend, limit = 3): TopicTally[] {
  return trend.topics
    .filter(t => t.answered >= MIN_TOPIC_ANSWERS && t.correct < t.answered)
    .sort((a, b) =>
      a.correct / a.answered - b.correct / b.answered
      || b.answered - a.answered
      || a.topic.localeCompare(b.topic))
    .slice(0, limit)
}

export interface DayQuestion extends Tally {
  questionId: string
}

/** One day's questions, each once, in the order last answered (newest first). */
export function dayQuestions(day: AccuracyDay): DayQuestion[] {
  const out = new Map<string, DayQuestion>()
  for (const a of day.answers) {
    let q = out.get(a.questionId)
    if (!q) {
      q = { questionId: a.questionId, ...emptyTally() }
      out.set(a.questionId, q)
    }
    add(q, a.correct)
  }
  return [...out.values()]
}

/**
 * Where the x-axis is labelled, as days ago (oldest first, today last): every
 * day of a week, every 7th day of a month, every 30th of three.
 */
export function axisTicks(span: number): number[] {
  const step = span <= 7 ? 1 : span <= 31 ? 7 : 30
  const ticks: number[] = []
  for (let ago = 0; ago < span; ago += step) ticks.push(ago)
  return ticks.reverse()
}
