// Signed-out mastery: the mastery ladder kept in localStorage for a reader with
// no account, and carried onto the account they sign up for (or sign in to).
//
// Before this, a signed-out quiz scored every concept from scratch — the prior
// records were always empty — so a reader could practise for weeks and never get
// past Level 1, and nothing they earned survived the day. Now a guest's quizzes
// fold into this store exactly as a signed-in quiz folds into concept_mastery
// (`foldMasteryEvents` is the one fold both paths run), `useConceptMastery`
// reads it while signed out, and `components/GuestMasterySync.tsx` merges it
// into the account on sign-in (`mergeGuestIntoAccount`) and then clears it.

import {
  applyAnswer,
  decayIfStale,
  emptyRecord,
  sanitizeMasteryState,
  type ConceptMasteryRecord,
  type MasteryState,
} from '@/lib/mastery'
import type { LevelChange } from '@/lib/levelEvents'

/** The `user_id` a guest record carries; replaced by the account's on merge. */
export const GUEST_USER_ID = 'guest'

const KEY = 'actuarial_guest_mastery_v1'

/** Fired on window whenever the guest store changes (a quiz, a merge, a reset). */
export const GUEST_MASTERY_EVENT = 'actuarial:guest-mastery'

/** One answered question's effect on one concept. */
export interface MasteryEvent {
  examId: string
  conceptSlug: string
  isCorrect: boolean
  isHard: boolean
}

const keyOf = (examId: string, conceptSlug: string) => `${examId}::${conceptSlug}`

function appendStep(paths: Map<string, MasteryState[]>, key: string, start: MasteryState, state: MasteryState): void {
  const path = paths.get(key) ?? []
  if ((path[path.length - 1] ?? start) !== state) path.push(state)
  paths.set(key, path)
}

/**
 * Folds a quiz's answer events, in order, into the records they touch.
 * `prior` holds the starting record of any touched concept that has one; a
 * concept missing from it starts from an empty record for `userId`. Returns the
 * touched records after the quiz and the transitions it caused, each `from`
 * being the decay-adjusted state the reader actually met.
 */
export function foldMasteryEvents(
  userId: string,
  events: MasteryEvent[],
  prior: Map<string, ConceptMasteryRecord>,
  now: Date,
): { rows: ConceptMasteryRecord[]; transitions: LevelChange[] } {
  const byKey = new Map<string, ConceptMasteryRecord>()
  const preStates = new Map<string, MasteryState>()
  for (const ev of events) {
    const key = keyOf(ev.examId, ev.conceptSlug)
    if (byKey.has(key)) continue
    const start = prior.get(key)
    const record = start
      ? { ...start, state: sanitizeMasteryState(start.state) }
      : emptyRecord(userId, ev.examId, ev.conceptSlug)
    byKey.set(key, record)
    preStates.set(key, decayIfStale(record, now).state)
  }

  // Every state each row passes through, so a quiz that forgets a concept and
  // relearns it logs both steps rather than a net Level 3 → Level 1.
  const paths = new Map<string, MasteryState[]>()
  for (const ev of events) {
    const key = keyOf(ev.examId, ev.conceptSlug)
    const next = applyAnswer(byKey.get(key)!, { isCorrect: ev.isCorrect, isHard: ev.isHard, at: now })
    byKey.set(key, next)
    appendStep(paths, key, preStates.get(key)!, next.state)
  }

  const transitions: LevelChange[] = []
  for (const [key, record] of byKey) {
    const from = preStates.get(key)!
    if (from !== record.state) {
      transitions.push({
        conceptSlug: record.concept_slug,
        examId: record.exam_id,
        from,
        to: record.state,
        path: paths.get(key),
      })
    }
  }
  return { rows: [...byKey.values()], transitions }
}

const RANK: Record<MasteryState, number> = { new: 0, forgotten: 1, level1: 2, level2: 3, level3: 4 }

/**
 * Which guest records to write onto the account, re-owned by `userId`. A guest
 * record goes over when the account has none for that concept, or when it
 * stands higher on the ladder today (both decayed to `now`) — or as high, and
 * was answered more recently. An account's own progress is never lowered.
 */
export function mergeGuestIntoAccount(
  guest: ConceptMasteryRecord[],
  account: ConceptMasteryRecord[],
  userId: string,
  now: Date,
): ConceptMasteryRecord[] {
  const accountByKey = new Map(account.map(r => [keyOf(r.exam_id, r.concept_slug), r]))
  const out: ConceptMasteryRecord[] = []
  for (const g of guest) {
    const a = accountByKey.get(keyOf(g.exam_id, g.concept_slug))
    if (a) {
      const gRank = RANK[decayIfStale({ ...g, state: sanitizeMasteryState(g.state) }, now).state]
      const aRank = RANK[decayIfStale({ ...a, state: sanitizeMasteryState(a.state) }, now).state]
      const guestNewer = (g.last_attempted_at ?? '') > (a.last_attempted_at ?? '')
      if (gRank < aRank || (gRank === aRank && !guestNewer)) continue
    }
    out.push({ ...g, state: sanitizeMasteryState(g.state), user_id: userId })
  }
  return out
}

// ── Storage ────────────────────────────────────────────────────────────────

type Store = Record<string, ConceptMasteryRecord>

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Store) : {}
  } catch {
    return {}
  }
}

function announce(): void {
  try {
    window.dispatchEvent(new Event(GUEST_MASTERY_EVENT))
  } catch { /* no window (tests) */ }
}

export function readGuestMastery(): ConceptMasteryRecord[] {
  return Object.values(load()).map(r => ({ ...r, state: sanitizeMasteryState(r.state) }))
}

export function writeGuestMastery(rows: ConceptMasteryRecord[]): void {
  const store = load()
  for (const r of rows) store[keyOf(r.exam_id, r.concept_slug)] = { ...r, user_id: GUEST_USER_ID }
  try {
    localStorage.setItem(KEY, JSON.stringify(store))
  } catch { /* quota exceeded */ }
  announce()
}

/** Clears the guest store — everything, or one exam's records. */
export function clearGuestMastery(examId?: string): void {
  try {
    if (!examId) {
      localStorage.removeItem(KEY)
    } else {
      const store = load()
      for (const key of Object.keys(store)) if (key.startsWith(`${examId}::`)) delete store[key]
      localStorage.setItem(KEY, JSON.stringify(store))
    }
  } catch { /* ignore */ }
  announce()
}
