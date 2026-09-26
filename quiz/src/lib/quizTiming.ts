// The timed-quiz budget: how long a set of questions would get on the real
// paper, and the clock that counts it down.
//
// Every figure below is transcribed from the exam's own "Format and pacing"
// guide in the vault (`Guides/<exam page>/Format and pacing.md`), never
// estimated: the sitting's length over what it is budgeted by. A multiple-choice
// paper is budgeted per *question* — each is worth the same — and a written one
// per *point*, because its questions run from half a point to several and the
// guide says to pace by the marks, not the count. A question whose exam isn't
// in the table gives the quiz no budget at all rather than an invented one.

import type { QuizMode } from './parser'

export interface ExamPace {
  /** The sitting's length, in minutes. */
  minutes: number
  /** What the sitting is divided over. */
  per: 'question' | 'point'
  /** How many of them the sitting holds. */
  units: number
}

/** Keyed by a question's `exam` field. */
export const EXAM_PACE: Record<string, ExamPace> = {
  // Guides/Exam P-1 (SOA): 3 hours, 30 multiple-choice questions.
  'Probability': { minutes: 180, per: 'question', units: 30 },
  // Guides/Exam FM-2 (SOA): 2.5 hours, 35 multiple-choice questions.
  'Financial Mathematics': { minutes: 150, per: 'question', units: 35 },
  // Guides/Exam MAS-I (CAS): 4 hours, 45 multiple-choice questions.
  'Exam MAS-I': { minutes: 240, per: 'question', units: 45 },
  // Guides/Exam MAS-II (CAS): 4 hours, 45 multiple-choice questions.
  'Exam MAS-II': { minutes: 240, per: 'question', units: 45 },
  // Guides/Exam 5 (CAS): a 4-hour written paper worth roughly 55 points.
  'Exam 5': { minutes: 240, per: 'point', units: 55 },
}

/** Seconds a pace allows per question (or per point). */
export function secondsPerUnit(pace: ExamPace): number {
  return (pace.minutes * 60) / pace.units
}

export function paceForExam(exam: string | null | undefined): ExamPace | null {
  if (!exam) return null
  return EXAM_PACE[exam] ?? null
}

/**
 * The time a set of questions gets, in whole seconds — each question at its own
 * exam's pace, so a mixed set is still budgeted fairly. Null when any question's
 * exam has no pace, or the set is empty: no timer is better than a wrong one.
 */
export function timeAllowanceSeconds(
  questions: readonly { exam: string; points: number }[],
): number | null {
  if (questions.length === 0) return null
  let total = 0
  for (const q of questions) {
    const pace = paceForExam(q.exam)
    if (!pace) return null
    const units = pace.per === 'point' ? (q.points > 0 ? q.points : 1) : 1
    total += units * secondsPerUnit(pace)
  }
  return Math.round(total)
}

/** "6:00 per question", "4:22 per point" — the pace as the settings menu says it. */
export function formatPace(pace: ExamPace): string {
  return `${formatClock(Math.round(secondsPerUnit(pace)))} per ${pace.per}`
}

/** A duration as a clock: "4:05", "1:02:09". Negative input is read as its size. */
export function formatClock(totalSeconds: number): string {
  const s = Math.floor(Math.abs(totalSeconds))
  const hours = Math.floor(s / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60
  const ss = String(seconds).padStart(2, '0')
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${ss}`
  return `${minutes}:${ss}`
}

export type TimerTone = 'normal' | 'low' | 'over'

/**
 * How the clock should read: `low` for the last tenth of the budget (never less
 * than the last minute), `over` once it has run out — the quiz carries on, and
 * the clock counts the overrun rather than snatching the paper away.
 */
export function timerTone(remainingSeconds: number, allowanceSeconds: number): TimerTone {
  if (remainingSeconds <= 0) return 'over'
  if (remainingSeconds <= Math.max(60, allowanceSeconds * 0.1)) return 'low'
  return 'normal'
}

// ── The reader's choice ─────────────────────────────────────────────────────
// Per mode, like the reveal choice: a practice exam is the natural thing to sit
// against the clock, a quiz is not, and turning one on shouldn't turn on both.

export const TIMED_STORAGE_KEY = 'actuarial_quiz_timed_v1'

type StoredTimed = Partial<Record<QuizMode, boolean>>

function parseStored(raw: string | null): StoredTimed {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    const out: StoredTimed = {}
    for (const mode of ['quiz', 'mock-exam'] as const) {
      const value = (parsed as Record<string, unknown>)[mode]
      if (typeof value === 'boolean') out[mode] = value
    }
    return out
  } catch {
    return {}
  }
}

/** The stored choice for `mode`; untimed unless the reader said otherwise. */
export function timedFromStored(raw: string | null, mode: QuizMode): boolean {
  return parseStored(raw)[mode] ?? false
}

export function storedWithTimed(raw: string | null, mode: QuizMode, timed: boolean): string {
  return JSON.stringify({ ...parseStored(raw), [mode]: timed })
}

export function loadTimed(mode: QuizMode): boolean {
  try {
    return timedFromStored(localStorage.getItem(TIMED_STORAGE_KEY), mode)
  } catch {
    return false
  }
}

export function saveTimed(mode: QuizMode, timed: boolean): void {
  try {
    localStorage.setItem(TIMED_STORAGE_KEY, storedWithTimed(localStorage.getItem(TIMED_STORAGE_KEY), mode, timed))
  } catch {
    /* ignore quota/private-mode errors */
  }
}
