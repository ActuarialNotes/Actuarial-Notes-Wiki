// Relative, not `@/`-aliased: `lib/seo.ts` imports this into the vite config's
// own Node graph.
import { wikiExamIdToProgressKey } from './wikiParser'

// Canonical mapping between a Question's `exam` label (e.g. "Probability", as
// stored on Question.exam and quiz_sessions.exam) and the short exam id used
// to key concept_mastery, daily_completions and exam_progress rows (e.g. "P").
//
// This map has to cover **every** `exam:` label the question bank actually
// uses. An unmapped label is silently dropped by the mastery write path
// (`upsertMasteryFromResponses` / `computeMasteryTransitions` in quizStore skip
// a question whose exam has no id), so a missing entry means correct answers on
// that exam never level a concept up. `examIds.test.ts` reads the bank and
// fails if a label is missing.

export const EXAM_LABEL_TO_ID: Record<string, string> = {
  'Probability': 'P',
  'Financial Mathematics': 'FM',
  'Exam MAS-I': 'MAS-I',
  'Exam MAS-II': 'MAS-II',
  'Exam 5': 'CAS-5',
  // Exam 6 is sat in regional variants that share the `CAS-6` progress key.
  // Only the Canadian one has a bank (the 2013–2019 Exam 6-Canada papers), so
  // its label owns the key — and `bankLabelFor` keeps the 6U syllabus off it.
  'Exam 6C': 'CAS-6',
  'Exam 7': 'CAS-7',
  'Exam 8': 'CAS-8',
  // Exam 9's bank so far is what the syllabus moved there from older papers:
  // the ERM questions of the 2012–2019 Exam 7 papers (CAS moved Brehm's ERM to
  // Exam 9) and the reinsurance and catastrophe questions of the 2012–2019
  // Exam 8 papers, each carrying `originally_exam`.
  'Exam 9': 'CAS-9',
}

export const EXAM_ID_TO_LABEL: Record<string, string> = Object.fromEntries(
  Object.entries(EXAM_LABEL_TO_ID).map(([label, id]) => [id, label])
)

// Exams with tracked quiz history / learning progress, for use in exam-scoped
// data controls (e.g. per-exam history reset).
export const RESETTABLE_EXAMS: Array<{ id: string; label: string }> =
  Object.entries(EXAM_ID_TO_LABEL).map(([id, label]) => ({ id, label }))

// The `exam:` label the question bank — and therefore `quiz_sessions.exam` and
// `Question.exam` — uses for a wiki syllabus.
//
// A syllabus page's `examTopic` is its *subject line* ("Probability",
// "Basic Techniques for Ratemaking and Estimating Claim Liabilities"), which
// happens to equal the bank label for the SOA exams and never does for the CAS
// ones (the bank says "Exam 5", "Exam MAS-I"). Comparing `session.exam` or
// `question.exam` to `examTopic` therefore silently matched nothing on Exam 5 /
// MAS-I / MAS-II — the Study Schedule reported "No quizzes finished yet today"
// on a day that had quizzes. Route every syllabus → bank-label lookup through
// here so the two spellings can't drift apart again.
export function questionExamLabel(syllabus: { examId: string; examTopic: string }): string {
  return bankLabelFor(syllabus) ?? syllabus.examTopic
}

// A bank belongs to one syllabus, and a progress key can be shared by several:
// Exam 6's regional variants are all `CAS-6`, but only 6C's syllabus is the one
// its questions were sat on. Keyed by progress key, then wiki exam id; a
// variant not listed (6U) has no bank, whatever its key maps to.
const VARIANT_BANK_LABELS: Record<string, Record<string, string>> = {
  'CAS-6': { '6C': 'Exam 6C' },
}

/** The bank label a syllabus's questions carry, or undefined when it has no bank. */
export function bankLabelFor(syllabus: { examId: string }): string | undefined {
  const key = wikiExamIdToProgressKey(syllabus.examId)
  const variants = VARIANT_BANK_LABELS[key]
  return variants ? variants[syllabus.examId] : EXAM_ID_TO_LABEL[key]
}
