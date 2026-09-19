import { describe, it, expect } from 'vitest'
import {
  DEFAULT_REVEAL,
  parseRevealMode,
  revealFromStored,
  storedWithReveal,
} from './revealMode'

describe('parseRevealMode', () => {
  it('accepts the two reveal modes', () => {
    expect(parseRevealMode('during')).toBe('during')
    expect(parseRevealMode('end')).toBe('end')
  })

  it('rejects anything else', () => {
    expect(parseRevealMode('later')).toBeNull()
    expect(parseRevealMode('')).toBeNull()
    expect(parseRevealMode(null)).toBeNull()
    expect(parseRevealMode(undefined)).toBeNull()
  })
})

describe('revealFromStored', () => {
  it('defaults a quiz to answering as you go and an exam to holding them back', () => {
    expect(revealFromStored(null, 'quiz')).toBe('during')
    expect(revealFromStored(null, 'mock-exam')).toBe('end')
    expect(DEFAULT_REVEAL['quiz']).toBe('during')
    expect(DEFAULT_REVEAL['mock-exam']).toBe('end')
  })

  it('reads back a stored choice', () => {
    const raw = JSON.stringify({ 'quiz': 'end', 'mock-exam': 'during' })
    expect(revealFromStored(raw, 'quiz')).toBe('end')
    expect(revealFromStored(raw, 'mock-exam')).toBe('during')
  })

  it('falls back to the default for junk, a wrong shape or a missing mode', () => {
    expect(revealFromStored('not json', 'quiz')).toBe('during')
    expect(revealFromStored('"during"', 'mock-exam')).toBe('end')
    expect(revealFromStored(JSON.stringify({ quiz: 'whenever' }), 'quiz')).toBe('during')
    expect(revealFromStored(JSON.stringify({ quiz: 'end' }), 'mock-exam')).toBe('end')
  })
})

describe('storedWithReveal', () => {
  it('records a choice the reader can get back', () => {
    const raw = storedWithReveal(null, 'quiz', 'end')
    expect(revealFromStored(raw, 'quiz')).toBe('end')
  })

  it('leaves the other mode alone — one checkbox per mode, not one shared setting', () => {
    const raw = storedWithReveal(null, 'mock-exam', 'during')
    expect(revealFromStored(raw, 'mock-exam')).toBe('during')
    expect(revealFromStored(raw, 'quiz')).toBe('during')

    const both = storedWithReveal(raw, 'quiz', 'end')
    expect(revealFromStored(both, 'quiz')).toBe('end')
    expect(revealFromStored(both, 'mock-exam')).toBe('during')
  })

  it('overwrites junk rather than carrying it forward', () => {
    const raw = storedWithReveal('not json', 'quiz', 'end')
    expect(revealFromStored(raw, 'quiz')).toBe('end')
    expect(revealFromStored(raw, 'mock-exam')).toBe('end')
  })
})
