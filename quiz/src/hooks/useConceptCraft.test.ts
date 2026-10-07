import { describe, expect, it } from 'vitest'
import { EMPTY_BOARD, migratePerTopicSave, parseCraftSave, progressOf } from './useConceptCraft'

// What a Concept Craft board reads back from localStorage: whatever is there is
// untrusted (an old shape, a hand edit, a truncated write), so every field is
// checked and anything that fails is dropped rather than crashing the board.
describe('parseCraftSave', () => {
  it('falls back to an empty board on nothing, or on junk', () => {
    for (const raw of [null, '{not json', '[]', 'null']) {
      expect(parseCraftSave(raw)).toEqual({ filter: 'all', board: EMPTY_BOARD })
    }
  })

  it('keeps a well-formed board', () => {
    const board = { packs: ['exam-p-general-probability'], found: ['a|b'], positions: { a: [1, 2] } }
    expect(parseCraftSave(JSON.stringify({ filter: 'strong', board }))).toEqual({ filter: 'strong', board })
  })

  it('drops bad fields one by one, and duplicates', () => {
    const raw = JSON.stringify({
      filter: 'loud',
      board: { packs: ['t', 't', 3, ''], found: ['a|b', 'nope', 7, 'a|b'], positions: { a: [1], b: [1, 'x'], c: [3, 4] }, placed: ['a'] },
    })
    expect(parseCraftSave(raw)).toEqual({ filter: 'all', board: { packs: ['t'], found: ['a|b'], positions: { c: [3, 4] } } })
  })
})

// The third version kept a board per topic, each picked before it opened; the
// topics played become packs on the one board.
describe('migratePerTopicSave', () => {
  it('folds every topic played into one board, its finds and positions kept', () => {
    const raw = JSON.stringify({
      filter: 'moderate',
      boards: {
        t1: { found: ['a|b'], positions: { a: [1, 2], b: [3, 4] } },
        never: { found: [], positions: { z: [0, 0] } },
        t2: { found: ['a|b', 'c|d'], positions: { a: [9, 9], c: [5, 6] } },
      },
    })
    expect(migratePerTopicSave(raw)).toEqual({
      filter: 'moderate',
      board: { packs: ['t1', 't2'], found: ['a|b', 'c|d'], positions: { a: [1, 2], b: [3, 4], c: [5, 6] } },
    })
  })

  it('carries nothing over when nothing was played', () => {
    expect(migratePerTopicSave(null)).toBeNull()
    expect(migratePerTopicSave('{"boards":{"t":{"found":[]}}}')).toBeNull()
    expect(migratePerTopicSave('junk')).toBeNull()
  })
})

describe('progressOf', () => {
  it('reads a board as the connections found', () => {
    expect(progressOf(EMPTY_BOARD)).toEqual({ found: [] })
    expect(progressOf({ packs: ['t'], found: ['a|b'], positions: {} })).toEqual({ found: ['a|b'] })
  })
})
