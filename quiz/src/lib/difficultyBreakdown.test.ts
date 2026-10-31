import { describe, expect, it } from 'vitest'
import { difficultyHeadline, scoreByDifficulty } from './difficultyBreakdown'
import type { Difficulty, Question } from './parser'

const q = (difficulty: Difficulty) => ({ difficulty }) as Question

describe('scoreByDifficulty', () => {
  it('tallies each difficulty the quiz held, easiest first', () => {
    const scores = scoreByDifficulty([q('hard'), q('easy'), q('hard')], [true, false, false])
    expect(scores).toEqual([
      { difficulty: 'easy', correct: 0, total: 1 },
      { difficulty: 'hard', correct: 1, total: 2 },
    ])
  })
})

describe('difficultyHeadline', () => {
  it('names a perfect quiz of hard questions', () => {
    expect(difficultyHeadline(scoreByDifficulty([q('hard'), q('hard'), q('hard')], [true, true, true]))).toBe('All 3 were rated Hard.')
    expect(difficultyHeadline(scoreByDifficulty([q('hard'), q('hard')], [true, true]))).toBe('Both were rated Hard.')
    expect(difficultyHeadline(scoreByDifficulty([q('hard')], [true]))).toBe('It was rated Hard.')
  })
  it('counts the hard ones in a mixed perfect quiz', () => {
    expect(difficultyHeadline(scoreByDifficulty([q('easy'), q('hard'), q('medium')], [true, true, true]))).toBe('1 of the 3 was rated Hard.')
  })
  it('agrees in number', () => {
    expect(difficultyHeadline(scoreByDifficulty([q('easy'), q('hard'), q('hard')], [true, true, true]))).toBe('2 of the 3 were rated Hard.')
  })
  it('says nothing for a quiz with a miss, or with no hard questions', () => {
    expect(difficultyHeadline(scoreByDifficulty([q('hard'), q('hard')], [true, false]))).toBeNull()
    expect(difficultyHeadline(scoreByDifficulty([q('easy'), q('medium')], [true, true]))).toBeNull()
    expect(difficultyHeadline([])).toBeNull()
  })
})
