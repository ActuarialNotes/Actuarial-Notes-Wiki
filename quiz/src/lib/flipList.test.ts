import { describe, expect, it } from 'vitest'
import { flipPlan, type Box } from './flipList'

const at = (entries: [string, number, number][]) => new Map<string, Box>(entries.map(([k, left, top]) => [k, { left, top }]))

describe('flipPlan', () => {
  it('slides what stayed from where it was', () => {
    const plan = flipPlan(at([['a', 0, 0], ['b', 0, 100], ['c', 0, 200]]), at([['a', 0, 0], ['c', 0, 100]]))
    expect(plan.moved).toEqual([{ key: 'c', dx: 0, dy: 100 }])
    expect(plan.entered).toEqual([])
  })
  it('fades in what is new', () => {
    const plan = flipPlan(at([['a', 0, 0]]), at([['a', 0, 0], ['b', 0, 100]]))
    expect(plan).toEqual({ moved: [], entered: ['b'] })
  })
  it('draws nothing for a list appearing for the first time', () => {
    expect(flipPlan(at([]), at([['a', 0, 0]]))).toEqual({ moved: [], entered: [] })
  })
  it('ignores a move too small to see', () => {
    expect(flipPlan(at([['a', 0, 0]]), at([['a', 1, 1]])).moved).toEqual([])
  })
  it('fades in a card that would fly too far', () => {
    const plan = flipPlan(at([['a', 0, 0], ['b', 0, 5000]]), at([['b', 0, 0]]), 900)
    expect(plan).toEqual({ moved: [], entered: ['b'] })
  })
})
