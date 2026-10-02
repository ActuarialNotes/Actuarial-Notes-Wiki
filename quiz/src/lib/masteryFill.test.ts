import { describe, it, expect } from 'vitest'
import { LEVEL_FILL, masteryFill } from './masteryFill'
import type { MasteryState } from './mastery'

const LEVELS: MasteryState[] = ['new', 'level1', 'level2', 'level3']

describe('masteryFill', () => {
  it('paints every level from the green ladder', () => {
    for (const state of LEVELS) expect(masteryFill(state)).toBe(LEVEL_FILL[state])
  })

  it('keeps Forgotten red', () => {
    expect(masteryFill('forgotten')).toContain('239,68,68')
  })

  it('climbs in intensity so the ring reads as progress', () => {
    const alpha = (c: string) => (c.startsWith('#') ? 1 : Number(c.match(/,([\d.]+)\)$/)![1]))
    expect(alpha(LEVEL_FILL.new)).toBeLessThan(alpha(LEVEL_FILL.level1))
    expect(alpha(LEVEL_FILL.level1)).toBeLessThan(alpha(LEVEL_FILL.level2))
    expect(alpha(LEVEL_FILL.level2)).toBeLessThan(alpha(LEVEL_FILL.level3))
  })
})
