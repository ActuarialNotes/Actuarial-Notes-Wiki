// localStorage fallback for concept mastery records.
// Written after each quiz so mastery state survives even when the
// concept_mastery Supabase table is unavailable (e.g. migration not applied).
// DB records take precedence when available — localStorage is a cache/backup.

import type { ConceptMasteryRecord } from '@/lib/mastery'
import { sanitizeMasteryState } from '@/lib/mastery'
import { GUEST_ID, foldGuestMastery, relabelForAccount, type MasteryEvent } from '@/lib/guestMastery'

const KEY = 'actuarial_local_mastery_v1'

type LocalStore = Record<string, ConceptMasteryRecord>

function load(): LocalStore {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as LocalStore) : {}
  } catch {
    return {}
  }
}

function save(store: LocalStore): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(store))
  } catch { /* quota exceeded */ }
}

export function mergeLocalMastery(updates: ConceptMasteryRecord[]): void {
  const store = load()
  for (const r of updates) {
    store[`${r.exam_id}::${r.concept_slug}`] = r
  }
  save(store)
}

export function readLocalMastery(userId: string): ConceptMasteryRecord[] {
  return Object.values(load())
    .filter(r => r.user_id === userId)
    .map(r => ({ ...r, state: sanitizeMasteryState(r.state) }))
}

export function syncLocalMastery(records: ConceptMasteryRecord[]): void {
  const store = load()
  for (const r of records) {
    const key = `${r.exam_id}::${r.concept_slug}`
    const existing = store[key]
    // Only overwrite local if DB record is newer or local doesn't exist
    if (!existing || (r.last_attempted_at ?? '') >= (existing.last_attempted_at ?? '')) {
      store[key] = r
    }
  }
  save(store)
}

/** A visitor's records (lib/guestMastery.ts): what the ladder reads signed out. */
export function readGuestMastery(): ConceptMasteryRecord[] {
  return readLocalMastery(GUEST_ID)
}

/** Fold a visitor's answers into their records, kept in this browser. */
export function recordGuestMastery(events: readonly MasteryEvent[], now: Date = new Date()): void {
  if (events.length === 0) return
  mergeLocalMastery(foldGuestMastery(readGuestMastery(), events, now))
}

/**
 * Hand a visitor's records to the account that has just signed in: they are
 * relabelled in place, so they are taken once, and returned for the caller to
 * save with the account.
 */
export function takeGuestMastery(userId: string): ConceptMasteryRecord[] {
  const adopted = relabelForAccount(Object.values(load()), userId)
    .map(r => ({ ...r, state: sanitizeMasteryState(r.state) }))
  if (adopted.length > 0) mergeLocalMastery(adopted)
  return adopted
}

// Clears cached mastery records — either everything (examId omitted) or just
// the entries for one exam (used by the Settings "reset progress" controls).
export function clearLocalMastery(examId?: string): void {
  if (!examId) {
    try {
      localStorage.removeItem(KEY)
    } catch { /* ignore */ }
    return
  }
  const store = load()
  const prefix = `${examId}::`
  for (const key of Object.keys(store)) {
    if (key.startsWith(prefix)) delete store[key]
  }
  save(store)
}
