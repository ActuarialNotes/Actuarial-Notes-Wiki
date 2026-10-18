// **The walk through the exam** (docs/tutor.md §3): which phase of preparation
// a candidate is in, from two facts they can't argue with — how many days are
// left, and how much of the syllabus they have met — and what that phase asks
// of a session.

import { daysFromTo } from './memory'
import type { TutorModel } from './log'

export type JourneyPhase = 'setup' | 'learn' | 'consolidate' | 'rehearse' | 'taper' | 'exam' | 'after'

/** The phases a candidate walks through, in order (the map in the Journey view). */
export const JOURNEY_STEPS: readonly JourneyPhase[] = ['setup', 'learn', 'consolidate', 'rehearse', 'taper', 'exam']

export interface PhaseInfo {
  label: string
  /** One line: what this phase is for. */
  purpose: string
  /** The most new concepts a session introduces in this phase. */
  newPerDay: number
}

export const PHASES: Record<JourneyPhase, PhaseInfo> = {
  setup: { label: 'Set up', purpose: 'Choose your sitting so the Tutor can pace you.', newPerDay: 5 },
  learn: { label: 'Learn', purpose: 'Meet every concept: read it, try its worked example, check yourself.', newPerDay: 5 },
  consolidate: { label: 'Consolidate', purpose: 'Spaced, mixed review — and the concepts you mix up, side by side.', newPerDay: 2 },
  rehearse: { label: 'Rehearse', purpose: 'Practise at exam pace. Points per minute, not questions per minute.', newPerDay: 1 },
  taper: { label: 'Taper', purpose: 'Nothing new. A last look at what is heavy and what you got wrong while sure.', newPerDay: 0 },
  exam: { label: 'Exam', purpose: 'Good luck. Nothing to do here.', newPerDay: 0 },
  after: { label: 'After the sitting', purpose: 'Set the next target when you know it.', newPerDay: 5 },
}

/** Days left at which a phase begins. */
export const REHEARSE_DAYS = 21
export const TAPER_DAYS = 5
/** The share of syllabus concepts met before Learn gives way to Consolidate. */
export const LEARNED_SHARE = 0.8

export interface SittingWindow {
  startDate: string
  endDate: string | null
  registrationDeadline?: string | null
}

export interface ExamDate {
  /** The day the candidate is preparing for, or null when there is none. */
  day: string | null
  /**
   * Where it came from: the date the candidate set (`exam_progress.target_date`),
   * the next window the examining body has published, or nothing at all.
   */
  source: 'target' | 'sitting' | 'none'
  /** The published window the day falls in, if any. */
  window: SittingWindow | null
}

function contains(w: SittingWindow, day: string): boolean {
  return w.endDate ? day >= w.startDate && day <= w.endDate : day === w.startDate
}

/**
 * The exam date, in the order docs/tutor.md §3 gives: the candidate's own;
 * else the next published sitting (a window still open counts); else none —
 * an unpublished sitting is never guessed at.
 */
export function resolveExamDate(
  targetDate: string | null | undefined,
  sittings: readonly SittingWindow[],
  today: string,
): ExamDate {
  const sorted = [...sittings].sort((a, b) => a.startDate.localeCompare(b.startDate))
  if (targetDate) {
    return { day: targetDate, source: 'target', window: sorted.find(w => contains(w, targetDate)) ?? null }
  }
  const next = sorted.find(w => (w.endDate ?? w.startDate) >= today)
  if (next) return { day: next.startDate, source: 'sitting', window: next }
  return { day: null, source: 'none', window: null }
}

/** Whole days from today to the exam day; null with no date. */
export function daysToExam(exam: ExamDate, today: string): number | null {
  return exam.day ? daysFromTo(today, exam.day) : null
}

export function journeyPhase(exam: ExamDate, coverage: number, today: string): JourneyPhase {
  if (!exam.day) return 'setup'
  // A published window the candidate hasn't named a day in: while it is open
  // they may be sitting any day, so the Tutor stands back.
  if (exam.source === 'sitting' && exam.window && contains(exam.window, today)) return 'exam'
  const days = daysFromTo(today, exam.day)
  if (days === 0) return 'exam'
  if (days < 0) return 'after'
  if (days > REHEARSE_DAYS) return coverage < LEARNED_SHARE ? 'learn' : 'consolidate'
  if (days > TAPER_DAYS) return 'rehearse'
  return 'taper'
}

export interface Coverage {
  met: number
  total: number
  share: number
}

/**
 * How much of the syllabus a candidate has met: concepts with a memory — the
 * Tutor's own, or seeded from Level 1 or above on the ladder. A count, never a
 * readiness score: that is `computeExamReadiness`'s, and there is only one.
 */
export function syllabusCoverage(syllabus: readonly string[], model: TutorModel): Coverage {
  const total = syllabus.length
  let met = 0
  for (const name of syllabus) {
    const c = model.concepts.get(name.toLowerCase())
    if (c?.memory) met++
  }
  return { met, total, share: total ? met / total : 0 }
}

/** The day each later phase begins, for an exam day — the Journey view's dates. */
export function phaseStartDays(examDay: string): Partial<Record<JourneyPhase, string>> {
  const at = (n: number) => {
    const d = new Date(`${examDay}T12:00:00`)
    d.setDate(d.getDate() - n)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }
  return { rehearse: at(REHEARSE_DAYS), taper: at(TAPER_DAYS), exam: examDay }
}
