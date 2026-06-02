function send(event: string, params?: Record<string, unknown>) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', event, params)
}

export function trackQuizStarted(params: {
  mode: string
  exam: string
  question_count: number
}) {
  send('quiz_started', params)
}

export function trackQuestionAnswered(params: {
  question_id: string
  is_correct: boolean
  exam: string
  mode: string
}) {
  send('question_answered', params)
}

export function trackQuizCompleted(params: {
  mode: string
  exam: string
  question_count: number
  correct_count: number
}) {
  send('quiz_completed', params)
}

export function trackFlashcardReviewed(params: {
  concept: string
  kind: string
}) {
  send('flashcard_reviewed', params)
}

export function trackSearchQuery(params: {
  query: string
  exam: string
  difficulty: string
}) {
  send('search_query', params)
}

export function trackUpgradeClicked() {
  send('upgrade_clicked')
}
