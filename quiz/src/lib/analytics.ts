// Typed product-analytics layer.
//
// Every analytics event flows through the single typed `track()` sink below.
// `AnalyticsEventMap` is the one source of truth for the event catalogue and the
// exact param shape of each event, so a wrong or missing param is a compile
// error rather than a silently-malformed `gtag` call. Events currently land in
// GA4 (`window.gtag`); swapping in PostHog later is a one-file change here.
//
// Two families of events:
//   • Engagement events (quiz_started, question_answered, …) fire every time.
//   • Activation-funnel events (signup → first_quiz → first_correct →
//     concept_collected → day2_return) fire at most once per device — the
//     "fire once" gating lives in lib/funnel.ts. This funnel is the instrument
//     panel every later roadmap phase is judged against (see docs/roadmap.md).

import { reachMilestone, recordVisitAndCheckDay2 } from './funnel'

/** The full event catalogue: event name → its params. Add events here first. */
export interface AnalyticsEventMap {
  // ── Engagement (fire every time) ──────────────────────────────────────────
  quiz_started: { mode: string; exam: string; question_count: number }
  question_answered: { question_id: string; is_correct: boolean; exam: string; mode: string }
  quiz_completed: { mode: string; exam: string; question_count: number; correct_count: number }
  flashcard_reviewed: { concept: string; kind: string }
  streak_extended: { length: number; longest: number }
  search_query: { query: string; exam: string; difficulty: string }
  upgrade_clicked: Record<string, never>

  // ── Reliability (from lib/errorMonitoring.ts) ─────────────────────────────
  exception: { description: string; fatal: boolean }

  // ── Activation funnel ─────────────────────────────────────────────────────
  // `signup` fires at the point of account creation (naturally once); the rest
  // are gated to fire at most once per device via lib/funnel.ts.
  signup: { method: string }
  first_quiz: { mode: string; exam: string }
  first_correct: { mode: string; exam: string }
  concept_collected: { concept: string }
  day2_return: Record<string, never>
}

export type AnalyticsEvent = keyof AnalyticsEventMap

/**
 * The single typed analytics sink. Events with no params (`Record<string,
 * never>`) are called as `track('day2_return')`; all others require their typed
 * params. No-ops when `gtag` isn't present (SSR, ad-blockers, tests).
 */
export function track<E extends AnalyticsEvent>(
  event: E,
  ...params: AnalyticsEventMap[E] extends Record<string, never> ? [] : [AnalyticsEventMap[E]]
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, params[0])
}

// ── Engagement wrappers ──────────────────────────────────────────────────────
// Thin, named wrappers kept so existing call sites read clearly and the event
// name lives in exactly one place.

export function trackQuizStarted(params: AnalyticsEventMap['quiz_started']) {
  track('quiz_started', params)
}

export function trackQuestionAnswered(params: AnalyticsEventMap['question_answered']) {
  track('question_answered', params)
}

export function trackQuizCompleted(params: AnalyticsEventMap['quiz_completed']) {
  track('quiz_completed', params)
}

export function trackFlashcardReviewed(params: AnalyticsEventMap['flashcard_reviewed']) {
  track('flashcard_reviewed', params)
}

export function trackSearchQuery(params: AnalyticsEventMap['search_query']) {
  track('search_query', params)
}

/** Fires when a day of study lengthens the streak (not on same-day repeats). */
export function trackStreakExtended(params: AnalyticsEventMap['streak_extended']) {
  track('streak_extended', params)
}

export function trackUpgradeClicked() {
  track('upgrade_clicked')
}

// ── Activation-funnel helpers ────────────────────────────────────────────────

/** Account created. Fires at the signup action (inherently once per account). */
export function trackSignup(method: string = 'password') {
  track('signup', { method })
}

/** First quiz ever started on this device. */
export function trackFirstQuiz(params: AnalyticsEventMap['first_quiz']) {
  if (reachMilestone('first_quiz')) track('first_quiz', params)
}

/** First correct answer ever on this device. */
export function trackFirstCorrect(params: AnalyticsEventMap['first_correct']) {
  if (reachMilestone('first_correct')) track('first_correct', params)
}

/** First flashcard/concept ever collected on this device. */
export function trackConceptCollected(params: AnalyticsEventMap['concept_collected']) {
  if (reachMilestone('concept_collected')) track('concept_collected', params)
}

/**
 * Call once on app boot. Records the visit and, if the user is returning on a
 * later calendar day than their first-ever visit, fires `day2_return` once.
 */
export function trackDay2ReturnOnBoot() {
  if (recordVisitAndCheckDay2()) track('day2_return')
}
