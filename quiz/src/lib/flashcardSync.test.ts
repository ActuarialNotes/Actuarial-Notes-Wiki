import { describe, it, expect, vi } from 'vitest'

// The merge functions under test are pure; the module also holds the Supabase
// IO, so stub the client out the way the other store tests do.
vi.mock('@/lib/supabase', () => ({ supabase: {} }))

import {
  cardKey,
  mergeCollected,
  mergeDeck,
  snapshotsEqual,
  type FlashcardSnapshot,
} from './flashcardSync'
import type { FlashCard } from '@/hooks/useFlashcards'

const card = (name: string, addedAt: number, completedAt?: number): FlashCard => ({
  kind: 'concept',
  name,
  addedAt,
  ...(completedAt ? { completedAt } : {}),
})

describe('mergeCollected', () => {
  it('unions both sides', () => {
    const merged = mergeCollected(
      [{ name: 'Bayes Theorem', collectedAt: 200 }],
      [{ name: 'Expected Value', collectedAt: 100 }],
    )
    expect(merged.map(c => c.name)).toEqual(['Expected Value', 'Bayes Theorem'])
  })

  it('keeps the earliest collection when both sides know a card', () => {
    const merged = mergeCollected(
      [{ name: 'Bayes Theorem', collectedAt: 500 }],
      [{ name: "bayes theorem", collectedAt: 100 }],
    )
    expect(merged).toHaveLength(1)
    expect(merged[0].collectedAt).toBe(100)
  })

  it('matches names case-insensitively, the way the store does', () => {
    const merged = mergeCollected(
      [{ name: 'variance', collectedAt: 10 }],
      [{ name: 'Variance', collectedAt: 20 }],
    )
    expect(merged).toHaveLength(1)
  })

  it('drops malformed entries rather than throwing', () => {
    const merged = mergeCollected(
      [{ name: 'Variance', collectedAt: 1 }, null as never, { name: 42 as never, collectedAt: 2 }],
      [],
    )
    expect(merged.map(c => c.name)).toEqual(['Variance'])
  })

  it('is a no-op against an empty server (the guest-signing-in case)', () => {
    const local = [{ name: 'Variance', collectedAt: 1 }, { name: 'Poisson', collectedAt: 2 }]
    expect(mergeCollected(local, [])).toHaveLength(2)
  })
})

describe('mergeDeck', () => {
  it('unions cards and keeps the earliest add', () => {
    const merged = mergeDeck(
      { cards: [card('Variance', 500)], order: ['Variance'] },
      { cards: [card('variance', 100), card('Poisson', 200)], order: ['variance', 'Poisson'] },
    )
    expect(merged.cards).toHaveLength(2)
    expect(merged.cards.find(c => cardKey(c.name) === 'variance')!.addedAt).toBe(100)
  })

  it('keeps a card completed on either device completed, at the later time', () => {
    const merged = mergeDeck(
      { cards: [card('Variance', 10, 300)], order: [] },
      { cards: [card('Variance', 10, 100)], order: [] },
    )
    expect(merged.cards[0].completedAt).toBe(300)
  })

  it('leaves completedAt unset when neither side completed the card', () => {
    const merged = mergeDeck(
      { cards: [card('Variance', 10)], order: [] },
      { cards: [card('Variance', 10)], order: [] },
    )
    expect(merged.cards[0].completedAt).toBeUndefined()
  })

  it('puts server order first, then local-only names', () => {
    const merged = mergeDeck(
      { cards: [card('Local', 5)], order: ['Local'] },
      { cards: [card('A', 1), card('B', 2)], order: ['B', 'A'] },
    )
    expect(merged.order).toEqual(['B', 'A', 'Local'])
  })

  it('places cards missing from both order lists, so none are unreachable', () => {
    const merged = mergeDeck(
      { cards: [card('Orphan', 9)], order: [] },
      { cards: [card('A', 1)], order: ['A'] },
    )
    expect(merged.order).toEqual(['A', 'Orphan'])
  })

  it('never leaves an order entry for a card that is gone', () => {
    const merged = mergeDeck(
      { cards: [], order: ['Deleted'] },
      { cards: [card('A', 1)], order: ['A'] },
    )
    expect(merged.order).toEqual(['A'])
  })
})

describe('snapshotsEqual', () => {
  const base: FlashcardSnapshot = {
    collected: [{ name: 'Variance', collectedAt: 1 }],
    cards: [card('Variance', 1)],
    order: ['Variance'],
  }

  it('ignores ordering and name casing', () => {
    expect(snapshotsEqual(base, {
      ...base,
      collected: [{ name: 'variance', collectedAt: 1 }],
    })).toBe(true)
  })

  it('sees an added card', () => {
    expect(snapshotsEqual(base, {
      ...base,
      cards: [...base.cards, card('Poisson', 2)],
    })).toBe(false)
  })

  it('sees a reordered deck', () => {
    expect(snapshotsEqual(
      { ...base, order: ['A', 'B'] },
      { ...base, order: ['B', 'A'] },
    )).toBe(false)
  })
})
