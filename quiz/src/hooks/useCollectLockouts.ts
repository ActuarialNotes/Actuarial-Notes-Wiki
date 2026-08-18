import { useEffect, useState } from 'react'
import { create } from 'zustand'
import {
  clearLockout,
  lockoutFor,
  lockoutKey,
  registerMiss,
  remainingLockoutMs,
  sanitizeLockouts,
  type CollectLockout,
  type CollectLockouts,
} from '@/lib/collectLockout'

// Missed collect checks, by concept. A wrong answer on a flashcard's
// comprehension check shuts it for 30 minutes, and for a day the next time (see
// lib/collectLockout.ts for the escalation, docs/flashcard-collection.md for
// why). This store is the persistence half: localStorage only, like the
// collected-cards store's guest path, so `isLocked` can be read synchronously
// during render.
//
// Device-local is a deliberate limit, not an oversight. The wait exists to send
// a reader who was guessing back to the concept page, not to police them — so
// it costs nothing that clearing site data or picking up another phone resets
// it, while a server round-trip on every render of a lock icon would cost
// plenty. If it ever needs to follow the learner across devices it belongs in
// the flashcard sync tables alongside the collected set.

const STORAGE_KEY = 'actuarial_collect_lockouts'

function load(): CollectLockouts {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return sanitizeLockouts(JSON.parse(raw))
  } catch {
    return {}
  }
}

function persist(lockouts: CollectLockouts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lockouts))
  } catch { /* ignore quota errors */ }
}

interface CollectLockoutsState {
  lockouts: CollectLockouts
  /** Record a wrong answer and return the concept's new lockout. */
  recordMiss: (name: string, now?: number) => CollectLockout
  /** Forget a concept's misses — called when its card is finally collected. */
  clear: (name: string) => void
}

export const useCollectLockouts = create<CollectLockoutsState>((set, get) => ({
  lockouts: load(),
  recordMiss: (name, now = Date.now()) => {
    const next = registerMiss(get().lockouts, name, now)
    persist(next)
    set({ lockouts: next })
    return next[lockoutKey(name)]!
  },
  clear: name => {
    const next = clearLockout(get().lockouts, name)
    if (next === get().lockouts) return
    persist(next)
    set({ lockouts: next })
  },
}))

/**
 * One concept's lockout, with the countdown kept live: the hook re-renders each
 * second while a wait is running and stops the moment it lifts, so a check
 * reopens under the reader without a reload and a "28m" chip never goes stale.
 *
 * Pass `null` (or a concept with no misses) and it simply reports an open check.
 */
export function useCollectLockout(name: string | null): {
  lockout: CollectLockout | undefined
  /** Milliseconds until the check reopens; 0 when it is open now. */
  remainingMs: number
} {
  const lockouts = useCollectLockouts(s => s.lockouts)
  const lockout = name ? lockoutFor(lockouts, name) : undefined
  const [now, setNow] = useState(() => Date.now())
  const lockedUntil = lockout?.lockedUntil ?? 0

  useEffect(() => {
    // Re-read the clock on every change of concept or deadline: the collect
    // modal is mounted for the life of the app, so the value captured at mount
    // can be hours old by the time a locked card is opened.
    setNow(Date.now())
    if (lockedUntil <= Date.now()) return
    const id = window.setInterval(() => {
      const t = Date.now()
      setNow(t)
      if (lockedUntil <= t) window.clearInterval(id)
    }, 1000)
    return () => window.clearInterval(id)
  }, [name, lockedUntil])

  return { lockout, remainingMs: remainingLockoutMs(lockout, now) }
}
