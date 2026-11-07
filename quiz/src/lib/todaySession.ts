// **Today's session** — the Dashboard's one card of work for the day, as data.
//
// The session is what the reader is asked to do today, in the order they should
// do it: fix the questions they've missed and not yet answered right, learn
// the concepts today's plan introduces, then review the ones it brings back.
// Each step is numbered, and the same number is the pin the Dashboard's wheel
// puts on that step's concepts (`components/dashboard/SessionWheel.tsx`), so
// the list and the syllabus read as one picture.
//
// The session's size is the quizzes it launches, never an estimate of study
// time: the plan's questions are `questionsNeededForPlan`'s count (the size of
// the quiz Start builds), the mistakes are the outstanding missed questions,
// and minutes are those questions at the exam's own pace (`lib/quizTiming.ts`).
// An exam paced by the point has no per-question pace, so it gets no minutes
// rather than invented ones.
//
// Pure and tested (`todaySession.test.ts`); the card is
// `components/dashboard/TodaySessionCard.tsx`.

import type { MasteryState } from './mastery'
import { secondsPerUnit, type ExamPace } from './quizTiming'

export type SessionStepKind = 'mistakes' | 'learn' | 'review'

export interface SessionRow {
  /** The concept's display name. */
  name: string
  /** The syllabus section it sits in, when it is on this exam's syllabus. */
  section: string | null
  /** Today's target level (plan rows). */
  target: MasteryState | null
  /** Missed questions still to fix that point at this concept (mistake rows). */
  questions: number | null
  done: boolean
}

export interface SessionStep {
  kind: SessionStepKind
  /** 1-based, in the order the steps are done — the wheel's pin number. */
  number: number
  title: string
  rows: SessionRow[]
  /** Questions this step still asks for. */
  questions: number
  done: boolean
}

export interface SessionMistake {
  /** The concept most likely behind the miss, if any. */
  concept: string | null
}

export interface SessionInput {
  /** Outstanding missed questions, one entry each. */
  mistakes: readonly SessionMistake[]
  /** Today's plan concepts, in display order. */
  planConcepts: readonly string[]
  /** A plan concept's state when today's plan scheduled it (`initialState`), if it did. */
  scheduledStateOf: (name: string) => MasteryState | null
  /** Today's target level for a plan concept. */
  targetOf: (name: string) => MasteryState
  /** Whether a plan concept is already done today (`isConceptDoneToday`). */
  isDone: (name: string) => boolean
  /** The syllabus section a concept sits in, or null. */
  sectionOf: (name: string) => string | null
  /** Fewest questions still needed to cover these plan concepts. */
  questionsFor: (concepts: readonly string[]) => number
}

/** Mistake concepts listed by name before the rest are counted. */
export const MISTAKE_ROWS = 4

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`
}

/**
 * The session's steps, numbered in the order they are done; a step with
 * nothing in it is left out, so the numbers never skip.
 */
export function buildSessionSteps(input: SessionInput): SessionStep[] {
  const steps: Omit<SessionStep, 'number'>[] = []

  if (input.mistakes.length > 0) {
    const byConcept = new Map<string, { name: string; count: number }>()
    let unattributed = 0
    for (const m of input.mistakes) {
      if (!m.concept) { unattributed++; continue }
      const key = m.concept.toLowerCase()
      const entry = byConcept.get(key) ?? { name: m.concept, count: 0 }
      entry.count++
      byConcept.set(key, entry)
    }
    const ranked = [...byConcept.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    const rows: SessionRow[] = ranked.slice(0, MISTAKE_ROWS).map(c => ({
      name: c.name,
      section: input.sectionOf(c.name),
      target: null,
      questions: c.count,
      done: false,
    }))
    const rest = ranked.slice(MISTAKE_ROWS).reduce((n, c) => n + c.count, 0) + unattributed
    if (rest > 0) {
      rows.push({ name: rows.length > 0 ? 'Other questions' : 'Missed questions', section: null, target: null, questions: rest, done: false })
    }
    steps.push({
      kind: 'mistakes',
      title: `Fix ${plural(input.mistakes.length, 'mistake')}`,
      rows,
      questions: input.mistakes.length,
      done: false,
    })
  }

  const learn: string[] = []
  const review: string[] = []
  for (const name of input.planConcepts) {
    const scheduled = input.scheduledStateOf(name)
    if (scheduled === 'new') learn.push(name)
    else review.push(name)
  }

  const planStep = (kind: 'learn' | 'review', names: string[]) => {
    if (names.length === 0) return
    const rows = names.map((name): SessionRow => ({
      name,
      section: input.sectionOf(name),
      target: input.targetOf(name),
      questions: null,
      done: input.isDone(name),
    }))
    const remaining = rows.filter(r => !r.done).map(r => r.name)
    steps.push({
      kind,
      title: kind === 'learn'
        ? `Learn ${plural(names.length, 'new concept')}`
        : `Review ${plural(names.length, 'concept')}`,
      rows,
      questions: remaining.length > 0 ? input.questionsFor(remaining) : 0,
      done: remaining.length === 0,
    })
  }
  planStep('learn', learn)
  planStep('review', review)

  return steps.map((s, i) => ({ ...s, number: i + 1 }))
}

/**
 * What the session's Start does next: fix the mistakes, launch today's plan
 * quiz (which covers both plan steps), relaunch a finished plan for extra
 * credit, or — with no plan at all — open the quiz builder.
 */
export type SessionAction = 'mistakes' | 'plan' | 'extra' | 'quiz'

export function nextSessionAction(steps: readonly SessionStep[]): SessionAction {
  const next = steps.find(s => !s.done)
  if (next) return next.kind === 'mistakes' ? 'mistakes' : 'plan'
  return steps.some(s => s.kind !== 'mistakes') ? 'extra' : 'quiz'
}

/** The step the Start button is on, for its label — null once every step is done. */
export function currentStep(steps: readonly SessionStep[]): SessionStep | null {
  return steps.find(s => !s.done) ?? null
}

/**
 * Whole minutes `questions` take at the exam's pace — null for an exam paced by
 * the point (its questions run from half a point to several) or with no pace.
 */
export function sessionMinutes(questions: number, pace: ExamPace | null): number | null {
  if (!pace || pace.per !== 'question' || questions <= 0) return null
  return Math.max(1, Math.round((questions * secondsPerUnit(pace)) / 60))
}

export interface SessionBarSegment {
  number: number
  /** Share of the bar, 0–1. */
  share: number
  /** The step's minutes, as a share of the session's — null with no pace. */
  minutes: number | null
  questions: number
}

/**
 * The time bar: one segment per step still to do, as wide as its share of the
 * questions. A step's minutes are its share of the session's total, apportioned
 * so the labels add up to the number above them.
 */
export function sessionBar(steps: readonly SessionStep[], totalMinutes: number | null): SessionBarSegment[] {
  const open = steps.filter(s => !s.done && s.questions > 0)
  const sum = open.reduce((n, s) => n + s.questions, 0)
  if (sum === 0) return []
  return open.map((s, i) => ({
    number: s.number,
    share: s.questions / sum,
    minutes: totalMinutes === null ? null : apportion(totalMinutes, open.map(o => o.questions))[i],
    questions: s.questions,
  }))
}

/**
 * Whole parts of `total` in proportion to `weights` that add up to it exactly
 * (largest remainder; a tie goes to the earlier step).
 */
export function apportion(total: number, weights: readonly number[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0)
  if (sum === 0) return weights.map(() => 0)
  const raw = weights.map(w => (total * w) / sum)
  const parts = raw.map(Math.floor)
  let left = total - parts.reduce((a, b) => a + b, 0)
  const order = raw.map((r, i) => ({ i, frac: r - Math.floor(r) })).sort((a, b) => b.frac - a.frac || a.i - b.i)
  for (const { i } of order) {
    if (left <= 0) break
    parts[i]++
    left--
  }
  return parts
}

/**
 * Which concepts the wheel pins, and with which step's number, keyed by
 * lower-cased name. A concept in two steps keeps the earlier one's number.
 */
export function sessionPins(steps: readonly SessionStep[]): Map<string, number> {
  const pins = new Map<string, number>()
  for (const s of steps) {
    for (const r of s.rows) {
      if (r.section === null) continue
      const key = r.name.toLowerCase()
      if (!pins.has(key)) pins.set(key, s.number)
    }
  }
  return pins
}
