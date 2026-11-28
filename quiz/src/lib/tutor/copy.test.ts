import { describe, expect, it } from 'vitest'
import { findingLine, formatMinutes } from './copy'

describe('the Tutor’s own sentences', () => {
  it('say minutes plainly', () => {
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
