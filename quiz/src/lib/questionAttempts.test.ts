import { describe, it, expect } from 'vitest'
import { summarizeAttempts, isAttempted, tallyAttempts } from './questionAttempts'

describe('summarizeAttempts', () => {
  it('treats a missing row as new', () => {
    const d = summarizeAttempts(undefined)
    expect(d.status).toBe('new')
    expect(d.attempts).toBe(0)
    expect(d.description).toBe('Not attempted yet')
  })

  it('treats a zero-attempt row as new', () => {
    expect(summarizeAttempts({ attempt_count: 0, correct_count: 0 }).status).toBe('new')
  })

  it('reports an all-correct history', () => {
    const d = summarizeAttempts({ attempt_count: 2, correct_count: 2 })
    expect(d.status).toBe('correct')
    expect(d.correct).toBe(2)
    expect(d.incorrect).toBe(0)
    expect(d.label).toBe('2✓')
    expect(d.description).toBe('Attempted 2 times — all correct')
  })

  it('reports a never-correct history', () => {
    const d = summarizeAttempts({ attempt_count: 3, correct_count: 0 })
    expect(d.status).toBe('incorrect')
    expect(d.incorrect).toBe(3)
    expect(d.label).toBe('3✗')
    expect(d.description).toBe('Attempted 3 times — never correct')
  })

  it('reports both counts for a mixed history', () => {
    const d = summarizeAttempts({ attempt_count: 5, correct_count: 2 })
    expect(d.status).toBe('mixed')
    expect(d.correct).toBe(2)
    expect(d.incorrect).toBe(3)
    expect(d.label).toBe('2✓ 3✗')
    expect(d.description).toBe('Attempted 5 times — 2 correct, 3 incorrect')
  })

  it('singularizes a single attempt', () => {
    expect(summarizeAttempts({ attempt_count: 1, correct_count: 1 }).description)
      .toBe('Attempted 1 time — all correct')
  })

  it('clamps nonsense counts instead of rendering negatives', () => {
    const more = summarizeAttempts({ attempt_count: 2, correct_count: 5 })
    expect(more.correct).toBe(2)
    expect(more.incorrect).toBe(0)

    const negative = summarizeAttempts({ attempt_count: -3, correct_count: -1 })
    expect(negative.status).toBe('new')
    expect(negative.incorrect).toBe(0)
  })
})

describe('isAttempted', () => {
  it('is false for missing and empty rows, true once answered', () => {
    expect(isAttempted(undefined)).toBe(false)
    expect(isAttempted({ attempt_count: 0, correct_count: 0 })).toBe(false)
    expect(isAttempted({ attempt_count: 1, correct_count: 0 })).toBe(true)
  })
})

describe('tallyAttempts', () => {
  it('rolls up a list of questions', () => {
    const totals = tallyAttempts([
      undefined,
      { attempt_count: 2, correct_count: 2 },
      { attempt_count: 3, correct_count: 1 },
    ])
    expect(totals).toEqual({ total: 3, attempted: 2, unattempted: 1, correct: 3, incorrect: 2 })
  })

  it('handles an empty list', () => {
    expect(tallyAttempts([])).toEqual({
      total: 0, attempted: 0, unattempted: 0, correct: 0, incorrect: 0,
    })
  })
})
