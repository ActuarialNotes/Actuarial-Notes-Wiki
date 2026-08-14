import { describe, it, expect } from 'vitest'
import { advanceProgressMark, navProgressPercent } from './NavProgressBar'

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

describe('advanceProgressMark', () => {
  const start = { scope: 'syllabus|100', percent: 0 }

  it('grows toward a further position', () => {
    const mark = advanceProgressMark(start, 'syllabus|100', 40)
    expect(mark).toEqual({ scope: 'syllabus|100', percent: 40 })
  })

  it('holds when the position moves back', () => {
    const at40 = advanceProgressMark(start, 'syllabus|100', 40)
    // Jumping to a concept covered earlier — the fill must not rewind.
    expect(advanceProgressMark(at40, 'syllabus|100', 2).percent).toBe(40)
    // Nor does stepping forward again from there, until it passes the mark.
    expect(advanceProgressMark(at40, 'syllabus|100', 3).percent).toBe(40)
    expect(advanceProgressMark(at40, 'syllabus|100', 41).percent).toBe(41)
  })

  it('returns the same object when nothing moved, so a re-render can bail', () => {
    const at40 = advanceProgressMark(start, 'syllabus|100', 40)
    expect(advanceProgressMark(at40, 'syllabus|100', 40)).toBe(at40)
    expect(advanceProgressMark(at40, 'syllabus|100', 10)).toBe(at40)
  })

  it('resets to the new position when the sequence changes', () => {
    const at90 = advanceProgressMark(start, 'syllabus|100', 90)
    // Switching the Viewing filter swaps the list out — the old mark is
    // meaningless against it, so the run starts over.
    expect(advanceProgressMark(at90, 'study-plan|6', 16.7)).toEqual({ scope: 'study-plan|6', percent: 16.7 })
  })

  it('resets when only the total changes', () => {
    const at90 = advanceProgressMark(start, 'syllabus|100', 90)
    expect(advanceProgressMark(at90, 'syllabus|101', 50)).toEqual({ scope: 'syllabus|101', percent: 50 })
  })
})
