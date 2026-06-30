// Canonical mapping between a Question's `exam` label (e.g. "Probability", as
// stored on Question.exam and quiz_sessions.exam) and the short exam id used
// to key concept_mastery, daily_completions and exam_progress rows (e.g. "P").

export const EXAM_LABEL_TO_ID: Record<string, string> = {
  'Probability': 'P',
  'Financial Mathematics': 'FM',
  'Exam MAS-I': 'MAS-I',
}

export const EXAM_ID_TO_LABEL: Record<string, string> = Object.fromEntries(
  Object.entries(EXAM_LABEL_TO_ID).map(([label, id]) => [id, label])
)

// Exams with tracked quiz history / learning progress, for use in exam-scoped
// data controls (e.g. per-exam history reset).
export const RESETTABLE_EXAMS: Array<{ id: string; label: string }> =
  Object.entries(EXAM_ID_TO_LABEL).map(([id, label]) => ({ id, label }))
