import { describe, expect, it } from 'vitest'
import { DEFAULT_SETUP, configFromSetup, difficultyTarget, matchSettings, pickExam, pickLobbyExam, roomConfig, setupFromStored } from './battleSetup'

describe('setupFromStored', () => {
  it('falls back to the defaults for nothing, or junk', () => {
    expect(setupFromStored(null)).toEqual(DEFAULT_SETUP)
    expect(setupFromStored('not json')).toEqual(DEFAULT_SETUP)
    expect(setupFromStored('null')).toEqual(DEFAULT_SETUP)
  })

  it('keeps what is still valid and drops the rest', () => {
    const raw = JSON.stringify({ exam: 'Probability', rounds: 7, time: 'exam', difficulty: 'hard', names: ['Ada', 'x'.repeat(99)], lobbyExam: 'Exam MAS-I' })
    expect(setupFromStored(raw)).toEqual({ exam: 'Probability', rounds: 7, time: 'exam', difficulty: 'hard', names: ['Ada', 'x'.repeat(20)], lobbyExam: 'Exam MAS-I', abilities: false })
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

describe('matched battles', () => {
  it('play five questions at the standard pace, a mixed draw, locked in', () => {
    expect(matchSettings('Probability')).toEqual({
      config: { rules: 'simultaneous', exam: 'Probability', rounds: 5, roundSeconds: 120 },
      difficulty: 0.5,
    })
  })

  it('ask the lobby for the remembered exam while it can be battled, else any', () => {
    expect(pickLobbyExam('Exam MAS-I', ['Probability', 'Exam MAS-I'])).toBe('Exam MAS-I')
    expect(pickLobbyExam('Exam 5', ['Probability'])).toBe('any')
    expect(pickLobbyExam('any', ['Probability'])).toBe('any')
  })
})

describe('abilities — a private room’s setting (docs/actuaria-online.md §7.2)', () => {
  const setup = { ...DEFAULT_SETUP, exam: 'Probability', abilities: true }

  it('is off by default, and remembered when turned on', () => {
    expect(DEFAULT_SETUP.abilities).toBe(false)
    expect(setupFromStored(JSON.stringify(setup)).abilities).toBe(true)
    expect(setupFromStored(JSON.stringify({ ...setup, abilities: 'yes' })).abilities).toBe(false)
  })

  it('turns a room’s abilities on only where they are offered', () => {
    expect(roomConfig(setup, true)).toMatchObject({ rules: 'simultaneous', abilities: true })
    expect(roomConfig(setup, false).abilities).toBe(false)
    expect(roomConfig({ ...setup, abilities: false }, true).abilities).toBe(false)
  })

  it('never enables them for two strangers the lobby matched', () => {
    expect(matchSettings('Probability').config.abilities).toBeFalsy()
  })
})
