import { describe, it, expect } from 'vitest'
import type { MasteryState } from '@/lib/mastery'
import { flashcardFoilClass, FOIL_LEVEL_CLASS } from '@/lib/flashcardFoil'

const STATES: MasteryState[] = ['new', 'level1', 'level2', 'level3', 'forgotten']

describe('flashcardFoilClass', () => {
  it('gives an uncollected card no material at all, whatever its mastery', () => {
    for (const state of STATES) expect(flashcardFoilClass(false, state)).toBe('')
  })

  it('gives every collected card the base foil class', () => {
    for (const state of STATES) {
      expect(flashcardFoilClass(true, state)).toContain('flashcard-collected')
    }
  })

  // The border is the only level readout on the card now — the mastery label
  // was removed — so two states must never render the same edge.
  it('draws a distinguishable edge for each mastery state', () => {
    const classes = STATES.map(state => flashcardFoilClass(true, state))
    expect(new Set(classes).size).toBe(STATES.length)
  })

  it('climbs the rainbow ladder in order and steps off it when forgotten', () => {
    expect(FOIL_LEVEL_CLASS.new).toBe('')
    expect(FOIL_LEVEL_CLASS.level1).toBe('flashcard-sheen-l1')
    expect(FOIL_LEVEL_CLASS.level2).toBe('flashcard-sheen-l2')
    expect(FOIL_LEVEL_CLASS.level3).toBe('flashcard-sheen-l3')
    expect(FOIL_LEVEL_CLASS.forgotten).toBe('flashcard-sheen-forgotten')
  })

  it('adds the smaller-surface tuning only for picker tiles', () => {
    expect(flashcardFoilClass(true, 'level2', { tile: true })).toContain('flashcard-tile')
    expect(flashcardFoilClass(true, 'level2')).not.toContain('flashcard-tile')
  })

  it('emits no stray whitespace for a New card', () => {
    expect(flashcardFoilClass(true, 'new')).toBe('flashcard-collected')
  })
})
