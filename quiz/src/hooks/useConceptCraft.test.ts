import { describe, expect, it } from 'vitest'
import { boardFor, parseCraftSave, progressOf } from './useConceptCraft'

// What a Concept Craft board reads back from localStorage: whatever is there is
// untrusted (an old shape, a hand edit, a truncated write), so every field is
// checked and anything that fails is dropped rather than crashing the board.
describe('parseCraftSave', () => {
  it('falls back to an empty Explore board on nothing, or on junk', () => {
    expect(parseCraftSave(null)).toEqual({ mode: 'explore', boards: {} })
    expect(parseCraftSave('{not json')).toEqual({ mode: 'explore', boards: {} })
    expect(parseCraftSave('[]')).toEqual({ mode: 'explore', boards: {} })
  })

  it('keeps a well-formed board', () => {
    const raw = JSON.stringify({
      mode: 'mastery',
      boards: { m: { recipes: ['a|b'], positions: { a: [1, 2] }, challenges: ['2026-10-05'], right: 3, wrong: 1 } },
    })
    expect(parseCraftSave(raw)).toEqual({
      mode: 'mastery',
      boards: { m: { recipes: ['a|b'], positions: { a: [1, 2] }, challenges: ['2026-10-05'], right: 3, wrong: 1 } },
    })
  })

  it('drops bad fields one by one, and duplicate recipes', () => {
    const raw = JSON.stringify({
      mode: 'turbo',
      boards: {
        m: { recipes: ['a|b', 7, 'a|b'], positions: { a: [1], b: [1, 'x'], c: [3, 4] }, challenges: 'today', right: -2, wrong: 'many' },
      },
    })
    expect(parseCraftSave(raw)).toEqual({
      mode: 'explore',
      boards: { m: { recipes: ['a|b'], positions: { c: [3, 4] }, challenges: [], right: 0, wrong: 0 } },
    })
  })
})

describe('boardFor and progressOf', () => {
  it('give an empty board for a module never opened', () => {
    const board = boardFor({}, 'never')
    expect(board.recipes).toEqual([])
    expect(progressOf(board)).toEqual({ recipes: [] })
  })
})
