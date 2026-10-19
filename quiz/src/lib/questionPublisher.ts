import type { ExamBody } from './bodyFilter'
import { EXAM_LABEL_TO_ID } from './examIds'
import type { Question } from './parser'

// Who published a question — the **Source** filter every list of questions
// offers (`lib/questionFilters.ts`).
//
// Nothing here is guessed from a question's wording. A question is one of
// three things, and the bank already says which:
//
//  - **A past paper's question** — the CAS banks, every file of which names
//    its sitting but for the few sample questions the CAS published undated
//    (`masi-sample-*`), which are the CAS's all the same. A paper is its
//    examining body's, so the publisher is the body that sets the exam the
//    paper was sat as: `originally_exam` when the
//    syllabus has since moved the material (an Exam 7 paper's ERM question is
//    still the CAS's, whatever exam it counts towards now).
//  - **A published sample question** — the Exam P, FM, FAM and SRM banks, which
//    are the SOA's sample sets. The SOA administers these exams and publishes
//    their sample questions; the bank files sample question n as `p-<n>` /
//    `fm-<n>` / `srm-<n>`, and FAM's two sets as `fams-<n>` and
//    `faml-<chapter>-<n>` (FAM-L numbers its questions by AMLCR chapter).
//  - **The vault's own question** — written for Actuarial Notes, published by
//    no examining body. Listed below by id, because a file that names no
//    sitting reads the same either way and the frontmatter can't be given a
//    new key without staling every fact check on it (`docs/verification.md`,
//    P4) — the first Exam P set by a list, everything since by an `-an-` id.
//    `questionPublisher.test.ts` holds both to the vault.

export type QuestionPublisher = ExamBody | 'Actuarial Notes'

/** The order the Source filter lists publishers in: up the ladder, then the vault's own. */
export const PUBLISHER_ORDER: readonly QuestionPublisher[] = ['SOA', 'CAS', 'Actuarial Notes']

/**
 * The body that sets each exam with a question bank, by progress key — the
 * `body` column of `scripts/exam_catalog.json`, which `examCatalog.test.ts`
 * holds this to.
 */
export const EXAM_BODIES: Readonly<Record<string, ExamBody>> = {
  'P': 'SOA',
  'FM': 'SOA',
  'FAM': 'SOA',
  'SRM': 'SOA',
  'MAS-I': 'CAS',
  'MAS-II': 'CAS',
  'CAS-DA': 'CAS',
  'CAS-RM': 'CAS',
  'CAS-IA': 'CAS',
  'CAS-5': 'CAS',
  'CAS-6': 'CAS',
  'CAS-7': 'CAS',
  'CAS-8': 'CAS',
  'CAS-9': 'CAS',
}

/**
 * The questions written for Actuarial Notes: the vault's own Exam P practice
 * set, numbered from `p-901` so its ids stay clear of the SOA sample set's.
 */
export const VAULT_QUESTION_IDS: ReadonlySet<string> = new Set(
  Array.from({ length: 64 }, (_, i) => `p-${901 + i}`),
)

/**
 * Every question written for Actuarial Notes since: the bank's own id prefix,
 * then `an-` and a number (`masi-an-001`) — the shape the `question-writer`
 * skill files them under, so a new one needs no entry here.
 */
export const VAULT_QUESTION_ID_RE = /^[a-z0-9]+-an-\d+$/

/** Whether a question id is one the vault wrote rather than a body published. */
export function isVaultQuestionId(id: string): boolean {
  return VAULT_QUESTION_IDS.has(id) || VAULT_QUESTION_ID_RE.test(id)
}

/** The publisher of a question, or null for an exam this module doesn't know. */
export function questionPublisher(
  q: Pick<Question, 'id' | 'exam' | 'originally_exam'>,
): QuestionPublisher | null {
  if (isVaultQuestionId(q.id)) return 'Actuarial Notes'
  const paperExam = q.originally_exam?.trim() || q.exam
  const examId = EXAM_LABEL_TO_ID[paperExam]
  return (examId && EXAM_BODIES[examId]) || null
}
