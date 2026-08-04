import { describe, it, expect } from 'vitest'
import { KEYSTONE_FILL, LEVEL_FILL, masteryFill } from './masteryFill'
import type { MasteryState } from './mastery'

const LEVELS: MasteryState[] = ['new', 'level1', 'level2', 'level3']

describe('masteryFill', () => {
  it('paints ordinary concepts green and keystones gold at every level', () => {
    for (const state of LEVELS) {
      expect(masteryFill(state, false)).toBe(LEVEL_FILL[state])
      expect(masteryFill(state, true)).toBe(KEYSTONE_FILL[state])
      expect(masteryFill(state, true)).not.toBe(masteryFill(state, false))
    }
  })

  it('keeps Forgotten red in both ladders — a decayed keystone alarms, not sparkles', () => {
    expect(masteryFill('forgotten', true)).toBe(masteryFill('forgotten', false))
    expect(masteryFill('forgotten', true)).toContain('239,68,68')
  })

  it('climbs in intensity so the ring reads as progress', () => {
    const alpha = (c: string) => (c.startsWith('#') ? 1 : Number(c.match(/,([\d.]+)\)$/)![1]))
    for (const palette of [LEVEL_FILL, KEYSTONE_FILL]) {
      expect(alpha(palette.new)).toBeLessThan(alpha(palette.level1))
      expect(alpha(palette.level1)).toBeLessThan(alpha(palette.level2))
      expect(alpha(palette.level2)).toBeLessThan(alpha(palette.level3))
    }
  })
})
