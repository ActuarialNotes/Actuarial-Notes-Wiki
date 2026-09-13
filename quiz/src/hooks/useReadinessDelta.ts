import { useEffect } from 'react'
import { create } from 'zustand'
import { localDayKey } from '@/lib/streak'
import {
  observeReadiness,
  readinessDelta,
  sanitizeMarks,
  type ReadinessMarks,
} from '@/lib/readinessDelta'

// Where each exam's readiness score stood when today started — the persistence half of
// `lib/readinessDelta.ts`, which holds the rules. The readiness card calls `useReadinessDelta`
// with the score it is about to print; the hook records the sighting and hands back how far
// that score has moved today.
//
// localStorage only, like the daily gem/level-up buckets in `lib/dailyProgressStore.ts` and
// the collect lockouts. Device-local is the deliberate limit: the arrow is a nudge about the
// session in front of the learner, and studying on a phone and then a laptop starting each
// day's arrow separately costs nothing — while a table and a round-trip to carry one integer
// across devices would. The score itself is derived from mastery, which *does* sync, so
// nothing about the number on screen depends on this store.

const STORAGE_KEY = 'actuarial_readiness_marks'

function load(): ReadinessMarks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? sanitizeMarks(JSON.parse(raw)) : {}
  } catch {
    return {}
  }
}

function persist(marks: ReadinessMarks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(marks))
  } catch { /* ignore quota errors */ }
}

interface ReadinessMarksState {
  marks: ReadinessMarks
  /** Record where `examKey`'s score stands now. */
  observe: (examKey: string, score: number, day: string) => void
}

export const useReadinessMarks = create<ReadinessMarksState>((set, get) => ({
  marks: load(),
  observe: (examKey, score, day) => {
    const next = observeReadiness(get().marks, examKey, score, day)
    if (next === get().marks) return
    persist(next)
    set({ marks: next })
  },
}))

/**
 * How far `examKey`'s readiness score has moved today, in whole percentage points, and
 * the recording of `score` that makes tomorrow's answer possible.
 *
 * Pass `score` as `null` while the numbers behind it are still loading — an empty mastery
 * set scores near zero, and baselining the day on that would invent a double-digit jump
 * the moment the records arrive.
 */
export function useReadinessDelta(examKey: string | null, score: number | null): number {
  const marks = useReadinessMarks(s => s.marks)
  const observe = useReadinessMarks(s => s.observe)
  const day = localDayKey(new Date())

  useEffect(() => {
    if (!examKey || score === null) return
    observe(examKey, score, day)
  }, [examKey, score, day, observe])

  return examKey ? readinessDelta(marks, examKey, day) : 0
}
