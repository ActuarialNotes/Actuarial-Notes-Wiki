import { describe, expect, it } from 'vitest'
import { DEFAULT_SETUP, configFromSetup, difficultyTarget, pickExam, setupFromStored } from './battleSetup'

describe('setupFromStored', () => {
  it('falls back to the defaults for nothing, or junk', () => {
    expect(setupFromStored(null)).toEqual(DEFAULT_SETUP)
    expect(setupFromStored('not json')).toEqual(DEFAULT_SETUP)
    expect(setupFromStored('null')).toEqual(DEFAULT_SETUP)
  })

  it('keeps what is still valid and drops the rest', () => {
    const raw = JSON.stringify({ exam: 'Probability', rounds: 7, time: 'exam', difficulty: 'hard', names: ['Ada', 'x'.repeat(99)] })
    expect(setupFromStored(raw)).toEqual({ exam: 'Probability', rounds: 7, time: 'exam', difficulty: 'hard', names: ['Ada', 'x'.repeat(20)] })
    const bad = JSON.stringify({ rounds: 6, time: 'slow', difficulty: 'brutal', names: 'Ada' })
    expect(setupFromStored(bad)).toEqual(DEFAULT_SETUP)
  })
})

describe('configFromSetup', () => {
  it('times a round by the preset, on the exam picked', () => {
    const setup = { ...DEFAULT_SETUP, exam: 'Financial Mathematics', time: 'exam' as const }
    expect(configFromSetup(setup, 'buzzer')).toEqual({ rules: 'buzzer', exam: 'Financial Mathematics', rounds: 5, roundSeconds: 300 })
  })
})

describe('pickExam', () => {
  it('opens on the remembered exam while it can be battled, else the first', () => {
    expect(pickExam('Exam MAS-I', ['Probability', 'Exam MAS-I'])).toBe('Exam MAS-I')
    expect(pickExam('Exam 5', ['Probability', 'Exam MAS-I'])).toBe('Probability')
    expect(pickExam('', [])).toBe('')
  })
})

describe('difficultyTarget', () => {
  it('maps the three levels onto the quiz slider', () => {
    expect(['easy', 'mixed', 'hard'].map(d => difficultyTarget(d as 'easy'))).toEqual([0, 0.5, 1])
  })
})
