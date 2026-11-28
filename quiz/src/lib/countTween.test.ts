import { describe, expect, it } from 'vitest'
import { tweenMs, tweenValue } from './countTween'

describe('tweenMs', () => {
  it('is nothing for no change', () => {
    expect(tweenMs(40, 40)).toBe(0)
  })
  it('grows with the change, between 240 and 600ms', () => {
    expect(tweenMs(40, 41)).toBe(252)
    expect(tweenMs(41, 40)).toBe(252)
    expect(tweenMs(0, 100)).toBe(600)
  })
})

describe('tweenValue', () => {
  it('starts at the old value and ends at the new one', () => {
    expect(tweenValue(10, 60, 0)).toBe(10)
    expect(tweenValue(10, 60, 1)).toBe(60)
    expect(tweenValue(10, 60, 2)).toBe(60)
  })
  it('moves one way only, up or down', () => {
    let last = 10
    for (let t = 0; t <= 1; t += 0.05) {
      const v = tweenValue(10, 60, t)
      expect(v).toBeGreaterThanOrEqual(last)
      expect(v).toBeLessThanOrEqual(60)
      last = v
    }
    last = 60
    for (let t = 0; t <= 1; t += 0.05) {
      const v = tweenValue(60, 10, t)
      expect(v).toBeLessThanOrEqual(last)
      expect(v).toBeGreaterThanOrEqual(10)
      last = v
    }
  })
  it('covers most of the way early', () => {
    expect(tweenValue(0, 100, 0.5)).toBeGreaterThan(80)
  })
})
