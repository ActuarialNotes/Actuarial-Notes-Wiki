import { formatSittingDate, type ExamSitting } from '@/data/examSittings'
import { daysBetween, type StudyPlan } from '@/lib/studyPlan'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'

// The exam's action menu, as data — what the study guide's title opens
// (`components/ConceptActionMenu.tsx`, its exam branch). An exam isn't a concept:
// nothing about it is quizzed, kept as a card or levelled up, so its menu leads
// with where the reader stands on it instead — the readiness score, how long is
// left before it is sat, and today's plan for it. Pure and tested; the
// component only reads.

/**
 * An exam page's own exam id, from its vault file name — "Exam 6U (CAS)" →
 * `6U`, "Exam P-1 (SOA)" → `P-1`. The id the syllabus parser gives the page,
 * which tells apart the variants that share a progress key.
 */
export function examPageIdFromFile(fileName: string): string {
  return fileName
    .replace(/\.md$/i, '')
    .replace(/^Exam\s+/i, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim()
}

/**
 * The exam_progress key (`P`, `MAS-I`, `CAS-9`) of an exam page, from its vault
 * file name — "Exam 9 (CAS)" → `CAS-9`, "Exam P-1 (SOA)" → `P`.
 */
export function examProgressKeyFromFile(fileName: string): string {
  return wikiExamIdToProgressKey(examPageIdFromFile(fileName))
}

/**
 * "12 days left" / "Tomorrow" / "Today" / "Passed" — how the app says how far
 * off an exam date is. One wording, shared with the Dashboard's exam-date row.
 */
export function daysLeftLabel(days: number): string {
  if (days > 1) return `${days} days left`
  if (days === 1) return 'Tomorrow'
  if (days === 0) return 'Today'
  return 'Passed'
}

export interface ExamCountdown {
  /** The date as the menu prints it: the reader's day, or the sitting's window. */
  dateLabel: string
  /** Whole days from today to the exam (to the window's first day for a sitting). */
  days: number
  /** The right-hand half of the line: "32 days left", "Window open"… */
  label: string
  /**
   * Whose date it is. The reader's own exam date wins; without one the
   * countdown runs to the next published sitting, the same one the study
   * guide's version button names.
   */
  source: 'exam-date' | 'next-sitting'
}

/**
 * How long until the exam. Nothing is inferred: the date is either the one the
 * reader chose or a sitting transcribed in `data/examSittings.ts`, and with
 * neither there is no countdown at all.
 *
 * `sittings` are the exam's upcoming sittings (`getSittingsForExam`), soonest
 * first; `today` is the local day key (`todayISO`).
 */
export function examCountdown(
  examDate: string | null | undefined,
  sittings: readonly ExamSitting[],
  today: string,
): ExamCountdown | null {
  if (examDate) {
    const days = daysBetween(today, examDate)
    return {
      dateLabel: formatSittingDate({ examId: '', format: 'CBT', startDate: examDate, endDate: null, registrationDeadline: null }),
      days,
      label: daysLeftLabel(days),
      source: 'exam-date',
    }
  }
  const next = sittings[0]
  if (!next) return null
  const days = daysBetween(today, next.startDate)
  // A CBT window that has already opened is still upcoming until it closes;
  // counting down to its first day would read "Passed" for an exam that can
  // still be sat.
  return {
    dateLabel: formatSittingDate(next),
    days,
    label: days < 0 ? 'Window open' : daysLeftLabel(days),
    source: 'next-sitting',
  }
}

/**
 * Today's concepts from an exam's cached plan, or null when there is no plan
 * for today — none generated, generated on an earlier day (the Dashboard
 * regenerates it), or an empty day.
 */
export function todaysPlanConcepts(
  cache: Pick<StudyPlan, 'generatedDate' | 'todaysConcepts'> | null | undefined,
  today: string,
): string[] | null {
  if (!cache || cache.generatedDate !== today || !cache.todaysConcepts?.length) return null
  return cache.todaysConcepts
}

/**
 * What the menu's **Today's Study Plan** row does:
 *
 *   'locked'      — signed out or not Pro: a lock and the Pro badge, to Upgrade
 *                   (or sign-in). The daily plan is a Pro feature everywhere.
 *   'loading'     — Pro status not known yet; the row waits rather than
 *                   flashing a lock at a subscriber.
 *   'unavailable' — the exam is still a syllabus outline (`examStatus`
 *                   'development'): there is nothing to plan, for anyone.
 *   'untracked'   — Pro, but the exam isn't one they are sitting: the row opens
 *                   the exams popout, where it is added — a plan needs an exam.
 *   'open'        — today's plan exists: the row opens it.
 *   'build'       — tracked, but no plan for today yet: the Dashboard builds
 *                   it, so the row goes there and opens it.
 */
export type TodaysPlanRowState = 'locked' | 'loading' | 'unavailable' | 'untracked' | 'open' | 'build'

export function todaysPlanRowState(s: {
  signedIn: boolean
  isPro: boolean
  subscriptionLoading: boolean
  inDevelopment: boolean
  tracked: boolean
  hasPlanToday: boolean
}): TodaysPlanRowState {
  if (s.inDevelopment) return 'unavailable'
  if (!s.signedIn) return 'locked'
  if (s.subscriptionLoading) return 'loading'
  if (!s.isPro) return 'locked'
  if (!s.tracked) return 'untracked'
  return s.hasPlanToday ? 'open' : 'build'
}
