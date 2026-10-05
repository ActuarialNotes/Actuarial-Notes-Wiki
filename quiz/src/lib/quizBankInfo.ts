// What the quiz builder's **info button** says about one exam's question bank:
// how many questions it holds, where they came from, and the real paper's
// length and pace they are timed against.
//
// The bank is read, never described from memory: a question is a past paper's
// when it names a sitting, an examining body's published sample when it names
// none, the vault's own when `questionPublisher` says so, and carried over when
// it was sat as another exam's paper (`originally_exam`). The paper's length
// and pace are `lib/quizTiming.ts`'s table — transcribed from each exam's
// "Format and pacing" guide — so an exam with no pace on file gets no pace
// here either rather than an invented one.

import { isFromAnotherExamsPaper, type Question } from './parser'
import { normalizeSession } from './pastExams'
import { questionPublisher, type QuestionPublisher } from './questionPublisher'
import { paceForExam, formatClock, secondsPerUnit, type ExamPace } from './quizTiming'

export interface QuizBankSources {
  /** Questions from the exam's own released papers. */
  pastPapers: number
  /** How many sittings those questions come from. */
  sittings: number
  /** The earliest and latest sitting year, when there are any. */
  firstYear: number | null
  lastYear: number | null
  /** Undated questions an examining body published as samples. */
  samples: number
  /** Who published the samples (the body that sets the exam), when known. */
  samplePublisher: QuestionPublisher | null
  /** Questions written for Actuarial Notes. */
  vault: number
  /** Questions sat on another exam's paper whose material has since moved here. */
  carried: number
}

export interface QuizBankInfo {
  /** Questions a quiz on this exam can draw. */
  total: number
  /** Kept for the record — no longer on any syllabus, out of quiz draws. */
  offSyllabus: number
  sources: QuizBankSources
  /** The real paper's pace, or null for an exam with none on file. */
  pace: ExamPace | null
}

/**
 * Summarise an exam's bank. `questions` is the whole bank for the exam, off-
 * syllabus questions included (`filterQuestions(…, { exam, includeOffSyllabus })`)
 * — they are counted apart from the drawable total.
 */
export function quizBankInfo(questions: readonly Question[], exam: string): QuizBankInfo {
  const sittings = new Set<string>()
  let firstYear: number | null = null
  let lastYear: number | null = null
  let pastPapers = 0
  let samples = 0
  let vault = 0
  let carried = 0
  let offSyllabus = 0
  let samplePublisher: QuestionPublisher | null = null

  for (const q of questions) {
    if (q.off_syllabus) {
      offSyllabus++
      continue
    }
    const publisher = questionPublisher(q)
    if (publisher === 'Actuarial Notes') {
      vault++
    } else if (isFromAnotherExamsPaper(q, exam)) {
      carried++
    } else if (q.year !== undefined) {
      pastPapers++
      sittings.add(`${q.year}|${normalizeSession(q.session) ?? ''}`)
      firstYear = firstYear === null ? q.year : Math.min(firstYear, q.year)
      lastYear = lastYear === null ? q.year : Math.max(lastYear, q.year)
    } else {
      samples++
      samplePublisher ??= publisher
    }
  }

  return {
    total: questions.length - offSyllabus,
    offSyllabus,
    sources: {
      pastPapers,
      sittings: sittings.size,
      firstYear,
      lastYear,
      samples,
      samplePublisher,
      vault,
      carried,
    },
    pace: paceForExam(exam),
  }
}

/** "3 hours", "2.5 hours", "100 minutes" — a sitting's length. */
export function formatExamLength(minutes: number): string {
  if (minutes % 60 === 0) {
    const h = minutes / 60
    return `${h} hour${h === 1 ? '' : 's'}`
  }
  if (minutes % 30 === 0) return `${minutes / 60} hours`
  return `${minutes} minutes`
}

/** "30 questions", "About 55 points" — what the sitting's time is divided over. */
export function formatExamUnits(pace: ExamPace): string {
  return pace.per === 'point' ? `About ${pace.units} points` : `${pace.units} questions`
}

/** "6:00", "4:22" — the clock each question (or point) gets. */
export function formatUnitTime(pace: ExamPace): string {
  return formatClock(Math.round(secondsPerUnit(pace)))
}

/** "2012–2019", "2019", or null — the span a bank's past papers cover. */
export function formatYearSpan(first: number | null, last: number | null): string | null {
  if (first === null || last === null) return null
  return first === last ? String(first) : `${first}–${last}`
}
