import { describe, it, expect } from 'vitest'
import {
  LEVEL_SQUARE_LOOK,
  LEVEL_SQUARE_ORDER,
  levelSquareLabel,
  levelSquaresSummary,
} from './levelSquare'
import type { MasteryState } from './mastery'

describe('the level square', () => {
  it('draws every state, each differently', () => {
    const looks = LEVEL_SQUARE_ORDER.map(s => LEVEL_SQUARE_LOOK[s])
    expect(new Set(looks).size).toBe(5)
  })

  it('uses neutral shades only: green is for a correct answer', () => {
    for (const look of Object.values(LEVEL_SQUARE_LOOK)) {
      expect(look).not.toMatch(/green|emerald|amber|red|answer-/)
    }
  })

  it('leaves New and Forgotten empty, told apart by the outline', () => {
    expect(LEVEL_SQUARE_LOOK.new).not.toMatch(/\bbg-/)
    expect(LEVEL_SQUARE_LOOK.forgotten).not.toMatch(/\bbg-/)
    expect(LEVEL_SQUARE_LOOK.new).toContain('border-border')
    expect(LEVEL_SQUARE_LOOK.forgotten).toContain('border-dashed')
    expect(LEVEL_SQUARE_LOOK.forgotten).toContain('border-foreground')
  })

  it('names its level, and that it is in today\'s session', () => {
    expect(levelSquareLabel('level2')).toBe('Level 2')
    expect(levelSquareLabel('new', true)).toBe("New, in today's session")
  })

  it('reads a row of squares as one sentence', () => {
    const states: MasteryState[] = [
      'level3', 'level3', 'level2', 'forgotten', 'new', 'new', 'new',
    ]
    expect(levelSquaresSummary(states, 2)).toBe(
      "7 concepts: 2 at Level 3, 1 at Level 2, 1 forgotten, 3 new. 2 in today's session",
    )
    expect(levelSquaresSummary(['level1'])).toBe('1 concept: 1 at Level 1')
    expect(levelSquaresSummary([])).toBe('0 concepts')
  })
})
