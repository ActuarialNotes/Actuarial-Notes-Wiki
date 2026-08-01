import { describe, it, expect } from 'vitest'
import { navProgressPercent } from './NavProgressBar'

describe('navProgressPercent', () => {
  it('fills proportionally to the 1-indexed position', () => {
    expect(navProgressPercent(1, 4)).toBe(25)
    expect(navProgressPercent(2, 4)).toBe(50)
    expect(navProgressPercent(4, 4)).toBe(100)
  })

  it('is full on the last item, never partial', () => {
    expect(navProgressPercent(83, 83)).toBe(100)
  })

  it('clamps out-of-range positions', () => {
    expect(navProgressPercent(0, 10)).toBe(0)
    expect(navProgressPercent(-3, 10)).toBe(0)
    expect(navProgressPercent(99, 10)).toBe(100)
  })

  it('returns 0 for an empty or invalid sequence', () => {
    expect(navProgressPercent(1, 0)).toBe(0)
    expect(navProgressPercent(1, -5)).toBe(0)
    expect(navProgressPercent(NaN, 10)).toBe(0)
    expect(navProgressPercent(1, NaN)).toBe(0)
  })
})
