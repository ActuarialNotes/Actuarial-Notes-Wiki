// Flashcard study-session helpers — pure, deterministic, and fully testable.
//
// The Flashcards study view is a self-assessment loop: flip a card, rate it
// "Again" (keep it in rotation) or "Got it" (mark it complete), and keep going
// until every card in the deck is complete. This module holds the logic that
// loop needs — deck orderings (mastery-priority "needs review" and shuffle)
// and the wrap-around "next unfinished card" navigation — with no I/O and no
// React, mirroring lib/streak.ts and lib/xp.ts. The UI layer in
// pages/Flashcards.tsx owns the state; vitest covers the math here.

import type { MasteryState } from './mastery'

/** How the learner rated the current card after flipping it. */
export type StudyRating = 'again' | 'got'

/**
 * Study priority per mastery state — lower studies first. Forgotten cards are
 * the most urgent (the memory trace has decayed), then never-studied cards,
 * then the learning ladder bottom-up: the stronger the recall, the later the
 * card can wait.
 */
export const MASTERY_STUDY_PRIORITY: Record<MasteryState, number> = {
  forgotten: 0,
  new: 1,
  level1: 2,
  level2: 3,
  level3: 4,
}

/**
 * Order items most-urgent-first by mastery state ("Needs review" sort).
 * Stable: items with the same priority keep their input order.
 */
export function needsReviewOrder<T>(
  items: readonly T[],
  masteryOf: (item: T) => MasteryState,
): T[] {
  return items
    .map((item, index) => ({ item, index, priority: MASTERY_STUDY_PRIORITY[masteryOf(item)] }))
    .sort((a, b) => a.priority - b.priority || a.index - b.index)
    .map(entry => entry.item)
}

/**
 * Fisher–Yates shuffle. Returns a new array; the input is not mutated. The
 * random source is injectable so tests can be deterministic.
 */
export function shuffled<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Index of the next incomplete card after `fromIndex`, scanning forward and
 * wrapping around the deck. The card at `fromIndex` itself is considered last,
 * so a still-incomplete current card comes back around only after everything
 * else has been visited. Returns -1 when every card is complete (or the deck
 * is empty).
 */
export function nextIncompleteIndex(completed: readonly boolean[], fromIndex: number): number {
  const n = completed.length
  if (n === 0) return -1
  for (let step = 1; step <= n; step++) {
    const i = (((fromIndex + step) % n) + n) % n
    if (!completed[i]) return i
  }
  return -1
}

export interface StudySessionSummary {
  /** Cards in the deck when the session finished. */
  total: number
  /** Cards that never needed an "Again". */
  firstTry: number
  /** Cards that needed at least one "Again", hardest first. */
  struggled: { name: string; againCount: number }[]
}

/**
 * Build the end-of-session summary from the deck and the per-card "Again"
 * tallies. Counts for cards no longer in the deck are ignored; struggled cards
 * sort by again-count descending, then alphabetically for a stable display.
 */
export function summarizeSession(
  cardNames: readonly string[],
  againCounts: Record<string, number>,
): StudySessionSummary {
  const struggled = cardNames
    .filter(name => (againCounts[name] ?? 0) > 0)
    .map(name => ({ name, againCount: againCounts[name] }))
    .sort((a, b) => b.againCount - a.againCount || a.name.localeCompare(b.name))
  return {
    total: cardNames.length,
    firstTry: cardNames.length - struggled.length,
    struggled,
  }
}
