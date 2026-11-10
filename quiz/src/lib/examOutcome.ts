// **How did the exam go?** (roadmap L18, `docs/learning-review.md` §3.8, D34.)
//
// The app has no record of whether anyone passed, so nothing it claims about
// readiness can be checked against the goal. After a sitting's results are out,
// the Dashboard asks once about the sitting the reader's exam date sat in:
// passed, didn't pass, didn't sit, or rather not say. No score. The answer is
// private to the account (`exam_outcomes`, own rows only) and read only in
// aggregate.
//
// When results are out is *transcribed*, never guessed: the sitting's own
// `results` milestone in `data/examSittingDetails.ts`, or, for a CAS sitting,
// which publishes none, the rule CAS's candidate guide prints ("6–8 weeks after
// the window closes"), taken at its far end so nobody is asked before their
// result can have arrived. A sitting with neither (an SOA sitting whose results
// date isn't published yet) isn't asked about until it is.
//
// Pure and tested; the card is `components/ExamOutcomePrompt.tsx`, the storage
// `hooks/useExamOutcomes.ts`.

import { EXAM_SITTINGS, sittingContains, type ExamSitting } from '../data/examSittings'
import { sittingDetailsFor } from '../data/examSittingDetails'

export const EXAM_OUTCOMES = ['passed', 'not_passed', 'did_not_sit', 'rather_not_say'] as const
export type ExamOutcome = (typeof EXAM_OUTCOMES)[number]

/** The answers as the card offers them, in order. */
export const OUTCOME_LABELS: Record<ExamOutcome, string> = {
  passed: 'Passed',
  not_passed: "Didn't pass",
  did_not_sit: "Didn't sit it",
  rather_not_say: "I'd rather not say",
}

/** CAS's candidate guide: results 6–8 weeks after the window closes. The far end. */
export const CAS_RESULTS_WEEKS = 8

/** How long after results the question stays on the Dashboard. */
export const ASK_WINDOW_DAYS = 90

/** "Results aren't out yet" puts the question away for this long. */
export const SNOOZE_DAYS = 14

/** The exam keys CAS sets (its sittings rows), for the candidate guide's rule. */
const CAS_EXAMS = new Set(['MAS-I', 'MAS-II', 'CAS-5', 'CAS-6', 'CAS-7', 'CAS-8', 'CAS-9', 'CAS-PCPA'])

export function isOutcome(value: unknown): value is ExamOutcome {
  return typeof value === 'string' && (EXAM_OUTCOMES as readonly string[]).includes(value)
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

/**
 * The sitting a recorded exam date falls in, past or future. Where two rows
 * hold the date (Exam P's paper day inside its CBT window) the narrower one
 * wins: it is the more specific reading of the date.
 */
export function sittingForDate(
  examId: string,
  date: string | null | undefined,
  sittings: readonly ExamSitting[] = EXAM_SITTINGS,
): ExamSitting | null {
  if (!date) return null
  let best: ExamSitting | null = null
  let bestSpan = Infinity
  for (const s of sittings) {
    if (s.examId !== examId || !sittingContains(s, date)) continue
    const span = s.endDate ? Date.parse(s.endDate) - Date.parse(s.startDate) : 0
    if (span < bestSpan) { best = s; bestSpan = span }
  }
  return best
}

export type ResultsBasis = 'published' | 'cas-rule'

/**
 * The first day the sitting's results can be out, and what that rests on —
 * or null when nothing published says.
 */
export function resultsDate(
  examId: string,
  sitting: ExamSitting,
): { date: string; basis: ResultsBasis } | null {
  const results = (sittingDetailsFor(examId, sitting)?.milestones ?? [])
    .filter(m => m.kind === 'results')
    .map(m => m.date)
    .sort()
  if (results.length > 0) return { date: results[0], basis: 'published' }
  if (CAS_EXAMS.has(examId)) {
    return { date: addDays(sitting.endDate ?? sitting.startDate, CAS_RESULTS_WEEKS * 7), basis: 'cas-rule' }
  }
  return null
}

/** One question the Dashboard may ask: this exam, this sitting. */
export interface OutcomeAsk {
  examId: string
  /** The sitting's first day: with the exam, what an answer is stored under. */
  sittingStart: string
  sitting: ExamSitting
  resultsFrom: string
  basis: ResultsBasis
}

/** What an answer, a dismissal or a snooze is keyed by. */
export function outcomeKey(examId: string, sittingStart: string): string {
  return `${examId}:${sittingStart}`
}

export interface OutcomeAskState {
  /** Keys already answered (from the account's `exam_outcomes`). */
  answered: ReadonlySet<string>
  /** Keys the reader closed: never asked again. */
  dismissed: ReadonlySet<string>
  /** Key → the day it may be asked again ("results aren't out yet"). */
  snoozedUntil: Readonly<Record<string, string>>
}

/**
 * The questions due today, the most recent results first: one per tracked
 * exam whose recorded date sat in a known sitting, once that sitting's results
 * are out, for `ASK_WINDOW_DAYS`, unless answered, dismissed or snoozed.
 */
export function dueOutcomeAsks(
  rows: readonly { exam_id: string; target_date: string | null }[],
  state: OutcomeAskState,
  today: string,
  sittings: readonly ExamSitting[] = EXAM_SITTINGS,
): OutcomeAsk[] {
  const asks: OutcomeAsk[] = []
  for (const row of rows) {
    const sitting = sittingForDate(row.exam_id, row.target_date, sittings)
    if (!sitting) continue
    const results = resultsDate(row.exam_id, sitting)
    if (!results) continue
    if (today < results.date || today > addDays(results.date, ASK_WINDOW_DAYS)) continue
    const key = outcomeKey(row.exam_id, sitting.startDate)
    if (state.answered.has(key) || state.dismissed.has(key)) continue
    const until = state.snoozedUntil[key]
    if (until && today < until) continue
    asks.push({ examId: row.exam_id, sittingStart: sitting.startDate, sitting, resultsFrom: results.date, basis: results.basis })
  }
  return asks.sort((a, b) => b.resultsFrom.localeCompare(a.resultsFrom) || a.examId.localeCompare(b.examId))
}

/** The day a snooze taken today ends. */
export function snoozeEnd(today: string): string {
  return addDays(today, SNOOZE_DAYS)
}
