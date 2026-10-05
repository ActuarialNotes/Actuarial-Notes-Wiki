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
    const raw = JSON.stringify({ filter: 'strong', boards: { t: { found: ['a|b'], positions: { a: [1, 2] } } } })
    expect(parseCraftSave(raw)).toEqual({ filter: 'strong', boards: { t: { found: ['a|b'], positions: { a: [1, 2] } } } })
  })

  it('drops bad fields one by one, and duplicates', () => {
    const raw = JSON.stringify({
      filter: 'loud',
      boards: { t: { found: ['a|b', 'nope', 7, 'a|b'], positions: { a: [1], b: [1, 'x'], c: [3, 4] }, placed: ['a'] } },
    })
    expect(parseCraftSave(raw)).toEqual({ filter: 'all', boards: { t: { found: ['a|b'], positions: { c: [3, 4] } } } })
  })
})

describe('boardFor and progressOf', () => {
  it('give an empty board for a topic never opened', () => {
    const board = boardFor({}, 'never')
    expect(board.found).toEqual([])
    expect(progressOf(board)).toEqual({ found: [] })
  })

  it('read a board as the connections found', () => {
    expect(progressOf({ found: ['a|b'], positions: {} })).toEqual({ found: ['a|b'] })
  })
})
