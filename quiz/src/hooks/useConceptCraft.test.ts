import { describe, expect, it } from 'vitest'
import { boardFor, parseCraftSave, progressOf } from './useConceptCraft'

// What a Concept Craft board reads back from localStorage: whatever is there is
// untrusted (an old shape, a hand edit, a truncated write), so every field is
// checked and anything that fails is dropped rather than crashing the board.
describe('parseCraftSave', () => {
  it('falls back to an empty save on nothing, or on junk', () => {
    expect(parseCraftSave(null)).toEqual({ filter: 'all', boards: {} })
    expect(parseCraftSave('{not json')).toEqual({ filter: 'all', boards: {} })
    expect(parseCraftSave('[]')).toEqual({ filter: 'all', boards: {} })
    expect(parseCraftSave('null')).toEqual({ filter: 'all', boards: {} })
  })

  it('keeps a well-formed board', () => {
    const raw = JSON.stringify({
      filter: 'strong',
      boards: { t: { placed: ['a', 'b'], found: ['a|b'], positions: { a: [1, 2] }, challenges: ['2026-10-05'] } },
    })
    expect(parseCraftSave(raw)).toEqual({
      filter: 'strong',
      boards: { t: { placed: ['a', 'b'], found: ['a|b'], positions: { a: [1, 2] }, challenges: ['2026-10-05'] } },
    })
  })

  it('drops bad fields one by one, and duplicates', () => {
    const raw = JSON.stringify({
      filter: 'loud',
      boards: {
        t: { placed: ['A', 'a', 3], found: ['a|b', 'nope', 'a|b'], positions: { a: [1], b: [1, 'x'], c: [3, 4] }, challenges: 'today' },
      },
    })
    expect(parseCraftSave(raw)).toEqual({
      filter: 'all',
      boards: { t: { placed: ['a'], found: ['a|b'], positions: { c: [3, 4] }, challenges: [] } },
    })
  })

  it('reads a first-version board as an empty one', () => {
    const v1 = JSON.stringify({ mode: 'mastery', boards: { m: { recipes: ['a|b'], positions: {}, challenges: [], right: 1, wrong: 0 } } })
    expect(progressOf(parseCraftSave(v1).boards.m)).toEqual({ placed: [], found: [] })
  })
})

describe('boardFor and progressOf', () => {
  it('give an empty board for a topic never opened', () => {
    const board = boardFor({}, 'never')
    expect(board.found).toEqual([])
    expect(progressOf(board)).toEqual({ placed: [], found: [] })
  })
})
