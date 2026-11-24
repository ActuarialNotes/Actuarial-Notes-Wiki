import { describe, expect, it } from 'vitest'
import { paperKey, paperResultLabel, resultsFromStored, sittingOf, tallyStates } from './paperResults'

const q = (over: Partial<{ exam: string; year: number; session: string; originally_exam: string }> = {}) => ({
  exam: 'Exam 5', year: 2019, session: 'Spring', ...over,
})

describe('sittingOf', () => {
  it('names the sitting of a whole paper sat as a practice exam', () => {
    expect(sittingOf('mock-exam', [q(), q({ session: 'Sp' })])).toEqual({ exam: 'Exam 5', year: 2019, session: 'Spring' })
  })
  it('is no paper for a quiz, one question, a mix, or a moved question', () => {
    expect(sittingOf('quiz', [q(), q()])).toBeNull()
    expect(sittingOf('mock-exam', [q()])).toBeNull()
    expect(sittingOf('mock-exam', [q(), q({ year: 2018 })])).toBeNull()
    expect(sittingOf('mock-exam', [q(), q({ session: 'Fall' })])).toBeNull()
    expect(sittingOf('mock-exam', [q(), q({ originally_exam: 'Exam 8' })])).toBeNull()
    expect(sittingOf('mock-exam', [{ exam: 'Exam P' }, { exam: 'Exam P' }])).toBeNull()
  })
})

describe('results', () => {
  it('tallies the states and says them', () => {
    const r = tallyStates(['correct', 'correct', 'incorrect', 'unanswered', 'partial'], '2026-11-23T00:00:00Z')
    expect(r).toMatchObject({ correct: 2, incorrect: 1, partial: 1, unanswered: 1 })
    expect(paperResultLabel(r)).toBe('Last sat: 2 correct, 1 incorrect, 1 partial, 1 unanswered')
    expect(paperResultLabel({ ...r, incorrect: 0, partial: 0, unanswered: 0 })).toBe('Last sat: 2 correct')
  })
  it('keys a sitting by its normalized session', () => {
    expect(paperKey('Exam 5', 2019, 'sp')).toBe('Exam 5|2019|Spring')
    expect(paperKey('Exam 5', 2019)).toBe('Exam 5|2019|')
  })
  it('drops anything malformed from storage', () => {
    expect(resultsFromStored(null)).toEqual({})
    expect(resultsFromStored('nope')).toEqual({})
    const good = { correct: 1, incorrect: 0, partial: 0, unanswered: 0, at: 'x' }
    expect(resultsFromStored(JSON.stringify({ a: good, b: { correct: -1 }, c: { ...good, correct: 0 }, d: null }))).toEqual({ a: good })
  })
})
