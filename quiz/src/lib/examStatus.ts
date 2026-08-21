// How far along an exam's material is — the one definition of "is this exam
// ready to study from?", keyed by the exam_progress key used everywhere else
// (`P`, `FM`, `MAS-I`, `CAS-5`, `CAS-7`, … — see `wikiExamIdToProgressKey`).
//
// Three states:
//   'ready'       — a mature syllabus page plus a full question bank (P, FM)
//   'beta'        — usable, still being filled out (MAS-I, MAS-II, Exam 5)
//   'development' — syllabus scaffolding only: no question bank, no
//                   comprehension checks, concept pages mostly unwritten. Not
//                   something a candidate can study from yet (Exams 6–9).
//
// Surfaces read this rather than re-deriving "not P and not FM" locally: the
// study-guide exam grid (`pages/wiki/WikiHome.tsx`), the exam page's status
// banner (`pages/wiki/WikiExam.tsx` → `WikiFloatingSearch`) and the quiz
// builder's exam cards (`pages/Landing.tsx`).
export type ExamStatus = 'ready' | 'beta' | 'development'

/** Exams whose material is finished enough to carry no status label at all. */
const READY_EXAMS = new Set(['P', 'FM'])

/**
 * Exams that exist only as a syllabus outline so far. Greyed out wherever they
 * are listed — they are visible so candidates can see what is coming, not
 * because they are usable.
 */
const IN_DEVELOPMENT_EXAMS = new Set(['CAS-6', 'CAS-7', 'CAS-8', 'CAS-9'])

export function examStatus(progressKey: string | null | undefined): ExamStatus {
  if (!progressKey) return 'beta'
  if (READY_EXAMS.has(progressKey)) return 'ready'
  if (IN_DEVELOPMENT_EXAMS.has(progressKey)) return 'development'
  return 'beta'
}

/** True for the exams that are still scaffolding (Exams 6–9). */
export function isExamInDevelopment(progressKey: string | null | undefined): boolean {
  return examStatus(progressKey) === 'development'
}

/** True for the exams that are usable but still being filled out. */
export function isExamBeta(progressKey: string | null | undefined): boolean {
  return examStatus(progressKey) === 'beta'
}

/** Label shown on the status pill / banner, or null when there is nothing to say. */
export const EXAM_STATUS_LABEL: Record<ExamStatus, string | null> = {
  ready: null,
  beta: 'Beta',
  development: 'In Development',
}
