import { describe, expect, it } from 'vitest'
import { findingLine, formatMinutes, offerLine, planLine } from './copy'

const plan = (relearn: number, due: number, newConcepts: string[], minutes = 20) => ({ relearn, due, newConcepts, minutes })

describe('the Tutor’s own sentences', () => {
  it('brief the day in one line', () => {
    expect(offerLine({ kind: 'arrival' }, plan(2, 6, ['Ratemaking']))).toBe('Today: 2 misses to relearn · 6 due, then Ratemaking.')
    expect(offerLine({ kind: 'arrival' }, plan(1, 0, []))).toBe('Today: 1 miss to relearn.')
    expect(offerLine({ kind: 'arrival' }, plan(0, 0, ['Ratemaking']))).toBe('Today starts with Ratemaking.')
    expect(offerLine({ kind: 'arrival' }, plan(0, 0, []))).toBe('Nothing due today.')
  })

  it('offer the check after reading by name', () => {
    expect(offerLine({ kind: 'post-read', concept: 'Cape Cod Method' }, null)).toBe('Check yourself on Cape Cod Method?')
  })

  it('say the plan and the minutes plainly', () => {
    expect(planLine(plan(0, 3, ['A', 'B'], 31))).toBe('3 due · 2 new — about 31 min')
    expect(formatMinutes(0)).toBe('0 min')
    expect(formatMinutes(75)).toBe('1 h 15 min')
  })

  it('say a finding about the candidate’s own record, with numbers', () => {
    expect(findingLine({ type: 'kind-gap', weak: 'judgment', weakRate: 0.41, strong: 'calculation', strongRate: 0.82 }))
      .toBe('You score 82% on calculation parts and 41% on judgment parts.')
    expect(findingLine({ type: 'calibration', sureRate: 0.64, sureAnswers: 14, guessRate: null, overconfident: true }))
      .toBe("When you're sure, you're right 64% of the time.")
  })
})
