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
//    its sitting. A paper is its examining body's, so the publisher is the body
//    that sets the exam the paper was sat as: `originally_exam` when the
//    syllabus has since moved the material (an Exam 7 paper's ERM question is
//    still the CAS's, whatever exam it counts towards now).
//  - **A published sample question** — the Exam P and FM banks, which are the
//    SOA's sample sets. The SOA administers both exams and publishes their
//    sample questions; the bank files sample question n as `p-<n>` / `fm-<n>`.
//  - **The vault's own question** — written for Actuarial Notes, published by
//    no examining body. Listed below by id, because a file that names no
//    sitting reads the same either way and the frontmatter can't be given a
//    new key without staling every fact check on it (`docs/verification.md`,
//    P4). `questionPublisher.test.ts` holds the list to the vault both ways.

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
  'MAS-I': 'CAS',
  'MAS-II': 'CAS',
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

/** The publisher of a question, or null for an exam this module doesn't know. */
export function questionPublisher(
  q: Pick<Question, 'id' | 'exam' | 'originally_exam'>,
): QuestionPublisher | null {
  if (VAULT_QUESTION_IDS.has(q.id)) return 'Actuarial Notes'
  const paperExam = q.originally_exam?.trim() || q.exam
  const examId = EXAM_LABEL_TO_ID[paperExam]
  return (examId && EXAM_BODIES[examId]) || null
}
