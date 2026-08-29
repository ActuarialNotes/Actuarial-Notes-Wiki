import { wikiExamIdToProgressKey } from '@/lib/wikiParser'

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
  return EXAM_ID_TO_LABEL[wikiExamIdToProgressKey(syllabus.examId)] ?? syllabus.examTopic
}
