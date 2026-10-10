import type { ItemStatus } from '@/data/tracks'

// How far along an exam's material is — the one definition of "is this exam
// ready to study from?", keyed by the exam_progress key used everywhere else
// (`P`, `FM`, `MAS-I`, `CAS-5`, `CAS-7`, … — see `wikiExamIdToProgressKey`).
//
// Three states:
//   'ready'       — a mature syllabus page plus a full question bank, all of it
//                   fact checked (P, FM, MAS-I, DISC-DA and DISC-IA — the CAS exams
//                   that pass every gate of `scripts/publication_readiness.py`)
//   'beta'        — usable, still being filled out (MAS-II, Exams 5,
//                   6C, 7, 8 and 9 — their banks converted from the released
//                   papers — PCPA, which has no paper to convert, and DISC-RM,
//                   whose pages and bank are the vault's own)
//   'development' — syllabus scaffolding only: no question bank, concept
//                   pages mostly unwritten. Not something a candidate can
//                   study from yet (Exam 6U, the SOA exams past FM).
//
// An exam moves up when `scripts/publication_readiness.py --check` says so:
// development → beta once every objective links a written, specific page and
// every concept has a question; beta → ready once all of it is fact checked
// (docs/cas-publication-plan.md).
//
// Surfaces read this rather than re-deriving "not P and not FM" locally: the
// exam rows on the Study Guides and Quiz tabs (`components/ExamRow.tsx`, its
// status tag) and the exam page's status banner (`pages/wiki/WikiExam.tsx` →
// `WikiFloatingSearch`).
export type ExamStatus = 'ready' | 'beta' | 'development'

/** Exams whose material is finished enough to carry no status label at all. */
const READY_EXAMS = new Set(['P', 'FM', 'MAS-I', 'CAS-DA', 'CAS-IA'])

/**
 * Exams that exist only as a syllabus outline so far. Greyed out wherever they
 * are listed — they are visible so candidates can see what is coming, not
 * because they are usable.
 */
// (PCPA has no bank — CAS releases no PCPA paper or sample questions to
// convert — but it is beta: its page and the Projects tab's simulator are
// material to study from. The three DISCs left this set once their pages were
// written section by section and their banks — the vault's own questions,
// since The Institutes publishes none — covered every concept.)
// The SOA exams past FM — FAM, SRM, PA, ALTAM, ASTAM, the ATPA assessment and
// the FSA pathway's fellowship exams — have pages transcribed from their
// syllabi by the syllabus pipeline (docs/syllabus-pipeline.md), and nothing else
// yet: no question bank, concept pages mostly unwritten.
const IN_DEVELOPMENT_EXAMS = new Set([
  'FAM', 'SRM', 'PA', 'ALTAM', 'ASTAM', 'ATPA',
  'FSA-CFE101', 'FSA-CFE201',
  'FSA-CP311', 'FSA-CP312', 'FSA-CP321', 'FSA-CP341', 'FSA-CP351',
  'FSA-GH101', 'FSA-GH201', 'FSA-GH301',
  'FSA-GI101', 'FSA-GI201', 'FSA-GI301', 'FSA-GI302',
  'FSA-ILA101', 'FSA-ILA201',
  'FSA-INV101', 'FSA-INV201',
  'FSA-RET101', 'FSA-RET201', 'FSA-RET301',
])

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

/** True for the exams that are still scaffolding (Exam 6U, the SOA exams past FM). */
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
