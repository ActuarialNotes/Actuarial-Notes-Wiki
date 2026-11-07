import { describe, expect, it } from 'vitest'
import { countOptions } from './builderOptions'

describe('countOptions', () => {
  it('leads with the full plan when there is one', () => {
    const options = countOptions({ fullPlanCount: 3, available: 0 })
    expect(options.map(o => o.value)).toEqual(['full', '1', '3', '5', '10'])
    expect(options[0].ariaLabel).toBe('Full plan, 3 questions')
    expect(options.some(o => o.disabled)).toBe(false)
  })

  it("disables a count the pool can't fill", () => {
    const options = countOptions({ fullPlanCount: 0, available: 4 })
    expect(options.map(o => [o.value, o.disabled])).toEqual([['1', false], ['3', false], ['5', true], ['10', true]])
    expect(options[0].ariaLabel).toBe('1 question')
  })
})
