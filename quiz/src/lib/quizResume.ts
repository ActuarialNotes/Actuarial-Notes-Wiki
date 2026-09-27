// A quiz outlives its page.
//
// The quiz session lives in `stores/quizStore.ts`, not in the Quiz page, so a
// reader can leave `/quiz` mid-way — to look a formula up in a study guide, to
// check a flashcard — and come back to the question they left, with the answers
// they had given and the clock still running. These are the rules that make
// that true, kept pure so they can be tested without a store or a router:
//
//  - what counts as a quiz *in progress* (drawn, started, not finished);
//  - when opening `/quiz` resumes that session rather than drawing a new one:
//    when the URL is the one it was started under. A URL is a quiz — its
//    filters, count, mode, reveal and timer — so opening the same one while it
//    is underway returns to it (which is also what makes the browser's Back
//    button a way back in), and any other URL starts afresh;
//  - where the way back leads, and where the "Return to quiz" pill is drawn.

export type QuizSessionStatus = 'idle' | 'loading' | 'active' | 'reviewing' | 'complete'

export interface QuizSessionSnapshot {
  status: QuizSessionStatus
  questions: readonly unknown[]
  /** The `location.search` the session was started under, `?` included. */
  search: string
}

/** Questions drawn, the quiz started, and not yet finished. */
export function isQuizInProgress(state: Pick<QuizSessionSnapshot, 'status' | 'questions'>): boolean {
  return (state.status === 'active' || state.status === 'reviewing') && state.questions.length > 0
}

/**
 * Whether opening `/quiz` with `search` picks the session in `state` back up.
 * Anything else — no session, a finished one, another URL — starts a new quiz.
 */
export function resumesQuiz(state: QuizSessionSnapshot, search: string): boolean {
  return isQuizInProgress(state) && state.search === normalizeSearch(search)
}

/** `location.search` as the store keeps it: `?` first, or empty. */
export function normalizeSearch(search: string): string {
  if (!search || search === '?') return ''
  return search.startsWith('?') ? search : `?${search}`
}

/** The way back into a session started under `search`. */
export function quizResumePath(search: string): string {
  return `/quiz${normalizeSearch(search)}`
}

/**
 * Whether the "Return to quiz" pill is drawn on `pathname`: whenever a quiz is
 * in progress and the reader is anywhere but the quiz itself.
 */
export function showsQuizResume(pathname: string, inProgress: boolean): boolean {
  return inProgress && pathname !== '/quiz'
}

/**
 * What the pill calls the session — "quiz" or, for a practice exam, "exam",
 * the word the quiz page's own Quit button already uses for one.
 */
export function sessionNoun(mode: 'quiz' | 'mock-exam'): 'quiz' | 'exam' {
  return mode === 'mock-exam' ? 'exam' : 'quiz'
}

/**
 * What leaving costs, said beside the Leave button: the answers given so far,
 * which are discarded rather than saved. Nothing to say before the first one —
 * leaving then loses only the draw.
 */
export function leaveConsequence(answered: number): string | null {
  if (answered <= 0) return null
  return `Leaving discards ${answered} answer${answered === 1 ? '' : 's'}.`
}
