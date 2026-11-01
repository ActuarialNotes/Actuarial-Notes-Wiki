// Where a quiz is left before its first answer (roadmap L10).
//
// Of the people who started a first quiz, about half never answered a question
// (docs/analytics-audit-2026-10-19.md: 31 → 17), and nothing said where they
// went: the pre-quiz concept list, the first question, or the wait before
// either. `quiz_left_unanswered` says so — fired once when the quiz page is
// left, or its tab hidden, with no answer confirmed yet — and this module is
// what it says, pure and tested (quizExit.test.ts). The page
// (pages/Quiz.tsx) only takes the snapshot and picks the moment.

/** What was on screen when the reader left. */
export type QuizExitStage =
  /** The question bank still loading — the quiz hadn't started. */
  | 'loading_questions'
  /** Started, holding for mastery to decide whether the concept list shows. */
  | 'loading_concepts'
  /** The pre-quiz concept list (components/PreQuizConcepts.tsx). */
  | 'concept_list'
  /** A question, none answered. */
  | 'question'

/** How they left: the quiz's own Quit, another page in the app, or the tab hidden or closed. */
export type QuizExitHow = 'quit' | 'navigated' | 'hidden'

export interface QuizExitSnapshot {
  /** The quiz store's status (`idle` until the questions are in). */
  status: string
  /** The questions are still loading. */
  loading: boolean
  /** Answers confirmed so far. */
  answered: number
  awaitingConceptList: boolean
  showingConceptList: boolean
  mode: string
  exam: string
  questionCount: number
  /** The New concepts the list introduces (0 when it doesn't show). */
  newConcepts: number
  /** The question on screen's `type` — a written CAS question is a different first sight from a multiple choice one. */
  questionType: string
  /** This quiz was the device's first (the `first_quiz` milestone fired for it). */
  firstQuiz: boolean
}

// A type, not an interface: GA's params must be indexable (lib/analytics.ts).
export type QuizLeftUnanswered = {
  stage: QuizExitStage
  how: QuizExitHow
  mode: string
  exam: string
  question_count: number
  new_concepts: number
  question_type: string
  seconds_on_page: number
  first_quiz: boolean
}

/** What was on screen, or `null` when the quiz is over, answered, or there is nothing to leave. */
export function quizExitStage(s: QuizExitSnapshot): QuizExitStage | null {
  if (s.answered > 0) return null
  if (s.status === 'idle') return s.loading ? 'loading_questions' : null
  if (s.status !== 'active') return null
  if (s.awaitingConceptList) return 'loading_concepts'
  if (s.showingConceptList) return 'concept_list'
  return 'question'
}

/** The event for leaving this quiz now, or `null` when it isn't one to report. */
export function unansweredExit(s: QuizExitSnapshot, how: QuizExitHow, secondsOnPage: number): QuizLeftUnanswered | null {
  const stage = quizExitStage(s)
  if (!stage) return null
  const started = stage !== 'loading_questions'
  return {
    stage,
    how,
    mode: s.mode,
    exam: s.exam || 'Unknown',
    question_count: started ? s.questionCount : 0,
    new_concepts: stage === 'concept_list' ? s.newConcepts : 0,
    question_type: stage === 'question' ? s.questionType : '',
    seconds_on_page: Math.max(0, Math.round(secondsOnPage)),
    first_quiz: s.firstQuiz,
  }
}
