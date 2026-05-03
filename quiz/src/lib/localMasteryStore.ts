// localStorage fallback for concept mastery records.
// Written after each quiz so mastery state survives even when the
// concept_mastery Supabase table is unavailable (e.g. migration not applied).
// DB records take precedence when available — localStorage is a cache/backup.

import type { ConceptMasteryRecord } from '@/lib/mastery'

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
  return Object.values(load()).filter(r => r.user_id === userId)
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
