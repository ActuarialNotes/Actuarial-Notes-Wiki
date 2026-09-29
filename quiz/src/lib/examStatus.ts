import type { ItemStatus } from '@/data/tracks'

// How far along an exam's material is — the one definition of "is this exam
// ready to study from?", keyed by the exam_progress key used everywhere else
// (`P`, `FM`, `MAS-I`, `CAS-5`, `CAS-7`, … — see `wikiExamIdToProgressKey`).
//
// Three states:
//   'ready'       — a mature syllabus page plus a full question bank (P, FM)
//   'beta'        — usable, still being filled out (MAS-I, MAS-II, Exams 5,
//                   6C, 7, 8 and 9 — their banks converted from the released
//                   papers — and PCPA and the three DISCs, which have no
//                   paper to convert but a syllabus whose concept pages are
//                   written)
//   'development' — syllabus scaffolding only: no question bank, concept
//                   pages mostly unwritten. Not something a candidate can
//                   study from yet (Exam 6U).
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
 * because they are usable. None today: a whole progress key in development
 * would go here, a variant of a shared key in `IN_DEVELOPMENT_VARIANTS` below.
 */
// Beta with no bank is possible. The three DISC courses have none because The
// Institutes sells their sample questions in a course guide and publishes none,
// so their pages transcribe the course syllabi — but every concept those
// syllabi link has a page, which is material to study from. (PCPA has none
// either — CAS releases no PCPA paper or sample questions to convert — and is
// beta for the same reason: its page and the Projects tab's simulator.)
const IN_DEVELOPMENT_EXAMS: ReadonlySet<string> = new Set<string>()

/**
 * Variants of a shared progress key whose material lags the rest of the key.
 * Exam 6 is sat in regional variants that share `CAS-6`: 6C has its bank (the
 * Fall 2013–Fall 2019 Exam 6-Canada papers) and is beta, 6U has none and is
 * still a syllabus outline. Keyed by the page's own exam id — the ids
 * `bankLabelFor` in `lib/examIds.ts` and `LOCALIZED_EXAM_VARIANT_IDS` use.
 */
const IN_DEVELOPMENT_VARIANTS: Record<string, ReadonlySet<string>> = {
  'CAS-6': new Set(['6U']),
}

/**
 * `examId` is the exam page's own id (`6C`, `6U`) where a surface knows which
 * page it is drawing. Without one a shared key reads as its furthest-along
 * variant — `CAS-6` is beta, since 6C can be studied.
 */
export function examStatus(progressKey: string | null | undefined, examId?: string | null): ExamStatus {
  if (!progressKey) return 'beta'
  if (READY_EXAMS.has(progressKey)) return 'ready'
  if (IN_DEVELOPMENT_EXAMS.has(progressKey)) return 'development'
  if (examId && IN_DEVELOPMENT_VARIANTS[progressKey]?.has(examId)) return 'development'
  return 'beta'
}

/** True for the exams that are still scaffolding (Exam 6U). */
export function isExamInDevelopment(progressKey: string | null | undefined, examId?: string | null): boolean {
  return examStatus(progressKey, examId) === 'development'
}

/** True for the exams that are usable but still being filled out. */
export function isExamBeta(progressKey: string | null | undefined, examId?: string | null): boolean {
  return examStatus(progressKey, examId) === 'beta'
}

/** Label shown on the status pill / banner, or null when there is nothing to say. */
export const EXAM_STATUS_LABEL: Record<ExamStatus, string | null> = {
  ready: null,
  beta: 'Beta',
  development: 'In Development',
}

/**
 * What the end of a credential-path row offers (`components/ExamsPopout.tsx`).
 *
 *   'add'  — nothing started and there is material to study: the Add button,
 *            which marks the exam in progress and opens the study-plan wizard
 *   'plan' — being studied: set or change the exam date
 *   'none' — nothing to offer, for one of two reasons the row states itself.
 *            Either the material isn't there ("In development" / "Not covered
 *            yet"), or the exam is passed — and a passed exam is struck
 *            through, so offering to add it read as "start studying the exam
 *            you just ticked off". Un-tick the dot and 'add' comes back.
 *
 * `canStudy` is `examStatus` above reduced to a yes/no: 'ready' or 'beta'.
 */
export type ExamRowAction = 'add' | 'plan' | 'none'

export function examRowAction(status: ItemStatus, canStudy: boolean): ExamRowAction {
  if (!canStudy) return 'none'
  if (status === 'in_progress') return 'plan'
  return status === 'not_started' ? 'add' : 'none'
}
