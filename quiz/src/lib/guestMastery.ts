/**
 * A visitor's concept levels, kept in the browser.
 *
 * A signed-in reader's levels live in `concept_mastery`. A visitor has no
 * account to hold them, so the same records are kept in the local mastery
 * store (`localMasteryStore.ts`) under one fixed owner, `GUEST_ID`, and folded
 * forward by the same ladder (`applyAnswer`). That is what lets Today, the
 * readiness score and an exam page's progress work signed out
 * (docs/design-review.md §5.4).
 *
 * When the visitor signs in, the records are handed to the account once
 * (`takeGuestMastery`, then `adoptGuestMastery` in `stores/quizStore.ts`):
 * only for concepts the account has no record of, so an account's own history
 * is never overwritten by what was done signed out. Pure and tested; the
 * storage is passed in by the callers.
 */
import { applyAnswer, emptyRecord, type ConceptMasteryRecord } from './mastery'

/** The owner a visitor's records are kept under. */
export const GUEST_ID = 'guest'

/** One answer's bearing on one concept. */
export interface MasteryEvent {
  examId: string
  conceptSlug: string
  isCorrect: boolean
  isHard: boolean
}

const keyOf = (examId: string, conceptSlug: string) => `${examId}::${conceptSlug}`

/**
 * The visitor's records after these answers, in the order they were given:
 * only the records an answer touched.
 */
export function foldGuestMastery(
  prior: readonly ConceptMasteryRecord[],
  events: readonly MasteryEvent[],
  now: Date,
): ConceptMasteryRecord[] {
  const byKey = new Map<string, ConceptMasteryRecord>()
  for (const r of prior) byKey.set(keyOf(r.exam_id, r.concept_slug), r)
  const touched = new Set<string>()
  for (const ev of events) {
    const key = keyOf(ev.examId, ev.conceptSlug)
    const current = byKey.get(key) ?? emptyRecord(GUEST_ID, ev.examId, ev.conceptSlug)
    byKey.set(key, applyAnswer(current, { isCorrect: ev.isCorrect, isHard: ev.isHard, at: now }))
    touched.add(key)
  }
  return [...touched].map(key => ({ ...byKey.get(key)!, user_id: GUEST_ID }))
}

/** A visitor's records, made the account's. */
export function relabelForAccount(records: readonly ConceptMasteryRecord[], userId: string): ConceptMasteryRecord[] {
  return records.filter(r => r.user_id === GUEST_ID).map(r => ({ ...r, user_id: userId }))
}

/**
 * The exam a visitor is studying, as Today reads it: the one they last answered
 * a question on, by its `exam_progress` key. Nothing is picked or stored for
 * it; a visitor who has answered nothing has none.
 */
export function guestExamKey(records: readonly ConceptMasteryRecord[]): string | null {
  let latest: ConceptMasteryRecord | null = null
  for (const r of records) {
    if (r.user_id !== GUEST_ID || !r.last_attempted_at) continue
    if (!latest || r.last_attempted_at > (latest.last_attempted_at ?? '')) latest = r
  }
  return latest?.exam_id ?? null
}
