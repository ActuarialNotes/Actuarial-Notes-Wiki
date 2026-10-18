import { describe, expect, it } from 'vitest'
import { countOptions, sourceOptions } from './builderOptions'

describe('sourceOptions', () => {
  const base = { isPro: true, planConceptCount: 4, selectedCount: 0, papersLabel: 'Past Papers' }

  it("offers Today's Plan only when it is a choice, and widens the tabs beside it", () => {
    const withToday = sourceOptions({ ...base, showToday: true })
    expect(withToday.map(o => [o.value, o.flex])).toEqual([['today', 2], ['custom', 2], ['papers', 2]])
    expect(withToday[0].ariaLabel).toBe("Today's plan, 4 concepts")
    const without = sourceOptions({ ...base, showToday: false })
    expect(without.map(o => [o.value, o.flex])).toEqual([['custom', 1], ['papers', 1]])
  })

  it("says the plan is Pro's, and how many topics are picked", () => {
    const options = sourceOptions({ ...base, showToday: true, isPro: false, selectedCount: 3 })
    expect(options[0].ariaLabel).toBe("Today's plan (Pro)")
    expect(options[1].ariaLabel).toBe('By topic, 3 selected')
  })
})

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
