import { describe, it, expect } from 'vitest'
import {
  MATH_FOCUS_BASE_PX,
  MATH_FOCUS_MAX_SCALE,
  MATH_FOCUS_MIN_SCALE,
  fitScale,
  nearestIndexByY,
  stepIndex,
} from './mathFocus'

describe('fitScale', () => {
  it('scales an equation up to fill the narrower axis', () => {
    // 200×50 into 800×400: width allows 4×, height allows 8× — width wins.
    expect(fitScale(200, 50, 800, 400)).toBe(4)
    // 200×50 into 800×100: height now the tighter constraint.
    expect(fitScale(200, 50, 800, 100)).toBe(2)
  })

  it('never grows past the maximum', () => {
    expect(fitScale(10, 10, 4000, 4000)).toBe(MATH_FOCUS_MAX_SCALE)
  })

  it('stops shrinking at the minimum, leaving wide math to scroll', () => {
    expect(fitScale(4000, 40, 300, 400)).toBe(MATH_FOCUS_MIN_SCALE)
  })

  it('falls back to 1× on degenerate measurements', () => {
    // A font still loading, or a stage that has not been laid out yet.
    expect(fitScale(0, 0, 800, 400)).toBe(1)
    expect(fitScale(200, 50, 0, 0)).toBe(1)
    expect(fitScale(200, -1, 800, 400)).toBe(1)
  })

  it('keeps the fitted size legible at the base font size', () => {
    expect(MATH_FOCUS_BASE_PX * fitScale(200, 50, 800, 400)).toBeGreaterThan(MATH_FOCUS_BASE_PX)
  })
})

describe('nearestIndexByY', () => {
  // A box framing a chain of equations: pressing the padding beside one of them
  // should magnify that one, not whichever is first.
  const centers = [100, 160, 220]

  it('picks the equation the press sits beside', () => {
    expect(nearestIndexByY(centers, 98)).toBe(0)
    expect(nearestIndexByY(centers, 155)).toBe(1)
    expect(nearestIndexByY(centers, 400)).toBe(2)
  })

  it('breaks a tie towards the earlier equation', () => {
    expect(nearestIndexByY(centers, 130)).toBe(0)
  })

  it('falls back to the first entry when there is nothing to compare', () => {
    expect(nearestIndexByY([], 100)).toBe(0)
  })
})

describe('stepIndex', () => {
  it('steps forward and back', () => {
    expect(stepIndex(1, 1, 4)).toBe(2)
    expect(stepIndex(1, -1, 4)).toBe(0)
  })

  it('stops at both ends rather than wrapping', () => {
    expect(stepIndex(0, -1, 4)).toBe(0)
    expect(stepIndex(3, 1, 4)).toBe(3)
  })

  it('survives an empty set', () => {
    expect(stepIndex(0, 1, 0)).toBe(0)
  })
})
