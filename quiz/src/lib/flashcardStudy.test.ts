import { describe, it, expect } from 'vitest'
import {
  MASTERY_STUDY_PRIORITY,
  needsReviewOrder,
  shuffled,
  nextIncompleteIndex,
  summarizeSession,
} from './flashcardStudy'
import type { MasteryState } from './mastery'

// Deterministic rng (LCG) so shuffle tests are reproducible.
function lcg(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 2 ** 32
  }
}

describe('MASTERY_STUDY_PRIORITY', () => {
  it('studies forgotten first and level3 last', () => {
    const states: MasteryState[] = ['forgotten', 'new', 'level1', 'level2', 'level3']
    const priorities = states.map(s => MASTERY_STUDY_PRIORITY[s])
    expect(priorities).toEqual([...priorities].sort((a, b) => a - b))
    expect(MASTERY_STUDY_PRIORITY.forgotten).toBe(0)
    expect(MASTERY_STUDY_PRIORITY.level3).toBe(4)
  })
})

describe('needsReviewOrder', () => {
  const mastery: Record<string, MasteryState> = {
    a: 'level3',
    b: 'forgotten',
    c: 'new',
    d: 'level1',
    e: 'forgotten',
    f: 'level2',
  }
  const masteryOf = (name: string) => mastery[name] ?? 'new'

  it('sorts most-urgent mastery first', () => {
    expect(needsReviewOrder(['a', 'b', 'c', 'd', 'e', 'f'], masteryOf))
      .toEqual(['b', 'e', 'c', 'd', 'f', 'a'])
  })

  it('is stable within the same mastery state', () => {
    expect(needsReviewOrder(['e', 'b', 'a'], masteryOf)).toEqual(['e', 'b', 'a'])
  })

  it('does not mutate the input', () => {
    const input = ['a', 'b']
    needsReviewOrder(input, masteryOf)
    expect(input).toEqual(['a', 'b'])
  })
})

describe('shuffled', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

  it('returns a permutation of the input', () => {
    const out = shuffled(items, lcg(42))
    expect([...out].sort()).toEqual([...items].sort())
  })

  it('is deterministic for the same rng seed', () => {
    expect(shuffled(items, lcg(7))).toEqual(shuffled(items, lcg(7)))
  })

  it('produces different orders for different seeds', () => {
    expect(shuffled(items, lcg(1))).not.toEqual(shuffled(items, lcg(2)))
  })

  it('does not mutate the input', () => {
    const input = ['a', 'b', 'c']
    shuffled(input, lcg(3))
    expect(input).toEqual(['a', 'b', 'c'])
  })

  it('handles empty and single-item arrays', () => {
    expect(shuffled([], lcg(1))).toEqual([])
    expect(shuffled(['only'], lcg(1))).toEqual(['only'])
  })
})

describe('nextIncompleteIndex', () => {
  it('advances to the next incomplete card', () => {
    expect(nextIncompleteIndex([false, false, false], 0)).toBe(1)
  })

  it('skips completed cards', () => {
    expect(nextIncompleteIndex([false, true, true, false], 0)).toBe(3)
  })

  it('wraps around the end of the deck', () => {
    expect(nextIncompleteIndex([false, true, false], 2)).toBe(0)
  })

  it('returns the current index only when it is the sole incomplete card', () => {
    expect(nextIncompleteIndex([true, false, true], 1)).toBe(1)
  })

  it('returns -1 when every card is complete', () => {
    expect(nextIncompleteIndex([true, true, true], 1)).toBe(-1)
  })

  it('returns -1 for an empty deck', () => {
    expect(nextIncompleteIndex([], 0)).toBe(-1)
  })

  it('tolerates an out-of-range fromIndex', () => {
    expect(nextIncompleteIndex([true, false], -1)).toBe(1)
    expect(nextIncompleteIndex([false, true], 5)).toBe(0)
  })
})

describe('summarizeSession', () => {
  it('splits first-try cards from struggled cards', () => {
    const summary = summarizeSession(['a', 'b', 'c'], { b: 2 })
    expect(summary.total).toBe(3)
    expect(summary.firstTry).toBe(2)
    expect(summary.struggled).toEqual([{ name: 'b', againCount: 2 }])
  })

  it('sorts struggled cards by again-count descending, then name', () => {
    const summary = summarizeSession(['a', 'b', 'c', 'd'], { a: 1, c: 3, b: 1 })
    expect(summary.struggled).toEqual([
      { name: 'c', againCount: 3 },
      { name: 'a', againCount: 1 },
      { name: 'b', againCount: 1 },
    ])
  })

  it('ignores counts for cards no longer in the deck', () => {
    const summary = summarizeSession(['a'], { gone: 4 })
    expect(summary.total).toBe(1)
    expect(summary.firstTry).toBe(1)
    expect(summary.struggled).toEqual([])
  })

  it('treats zero and missing counts as first-try', () => {
    const summary = summarizeSession(['a', 'b'], { a: 0 })
    expect(summary.firstTry).toBe(2)
  })
})
