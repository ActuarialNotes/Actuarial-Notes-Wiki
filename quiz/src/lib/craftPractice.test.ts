import { describe, expect, it } from 'vitest'
import { parsePracticeScores, practiceResult } from './craftPractice'

describe('practiceResult', () => {
  const pending = { key: 'frequency|severity', ids: ['q1', 'q2', 'q3'] }

  it('scores the practice the connection started, keeping its best run', () => {
    expect(practiceResult(pending, {}, ['q1', 'q2', 'q3'], ['q1', 'q3'])).toEqual({ 'frequency|severity': 2 })
    expect(practiceResult(pending, { 'frequency|severity': 3 }, ['q1', 'q2', 'q3'], ['q1'])).toEqual({ 'frequency|severity': 3 })
  })

  it('scores a practice quiz that served only some of its questions', () => {
    expect(practiceResult(pending, {}, ['q2'], ['q2'])).toEqual({ 'frequency|severity': 1 })
  })

  it('scores nothing for a quiz that isn’t the practice', () => {
    expect(practiceResult(pending, {}, ['q1', 'q9'], ['q1', 'q9'])).toBeNull()
    expect(practiceResult(null, {}, ['q1'], ['q1'])).toBeNull()
    expect(practiceResult(pending, {}, [], [])).toBeNull()
  })

  it('counts only the questions served', () => {
    expect(practiceResult(pending, {}, ['q1'], ['q1', 'q2'])).toEqual({ 'frequency|severity': 1 })
  })
})

describe('parsePracticeScores', () => {
  it('keeps only pair keys with a positive count', () => {
    expect(parsePracticeScores({ 'a|b': 2.7, c: 3, 'd|e': -1, 'f|g': 'x' })).toEqual({ 'a|b': 2 })
    expect(parsePracticeScores(null)).toEqual({})
    expect(parsePracticeScores([1])).toEqual({})
  })
})
