// The exams the Tutor covers (docs/tutor.md §10) — Exam 5 alone, for now.
//
// An exam can join when it has a bank with sample answers or explanations, a
// syllabus page, and a pace in `quizTiming.ts`. The written CAS exams fit the
// same item model unchanged; the multiple-choice ones need only the
// click-graded item, which `items.ts` already builds.

import { EXAM_PACE, type ExamPace } from '../quizTiming'

export interface TutorExam {
  /** The exam-progress key — what mastery rows, sittings and target dates use. */
  progressKey: string
  /** The question bank's `exam:` label. */
  label: string
  /** The syllabus page's file name, without `.md`. */
  pageFile: string
  /** How it is paced on the day — what an item's minutes are read from. */
  pace: ExamPace
}

export const TUTOR_EXAMS: readonly TutorExam[] = [
  {
    progressKey: 'CAS-5',
    label: 'Exam 5',
    pageFile: 'Exam 5 (CAS)',
    pace: EXAM_PACE['Exam 5'],
  },
]

/** The exam the Tutor walks a candidate through when nothing says otherwise. */
export const DEFAULT_TUTOR_EXAM: TutorExam = TUTOR_EXAMS[0]

export function tutorExamByLabel(label: string | null | undefined): TutorExam | undefined {
  return TUTOR_EXAMS.find(e => e.label === label)
}

export function tutorExamByPage(pageFile: string | null | undefined): TutorExam | undefined {
  return TUTOR_EXAMS.find(e => e.pageFile === pageFile)
}

/**
 * Minutes a unit of the paper is worth on the day: 240 / 55 for Exam 5, a
 * point at a time. An item's minutes are its points at this rate.
 */
export function minutesPerUnit(exam: TutorExam): number {
  return exam.pace.minutes / exam.pace.units
}
