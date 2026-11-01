import { describe, expect, it } from 'vitest'
import { accuracyPercent, accuracyTrend, weeklyChange, type AnswerRow } from './accuracyTrend'
import type { Difficulty } from './parser'

const difficulty: Record<string, Difficulty> = { e1: 'easy', m1: 'medium', h1: 'hard', h2: 'hard' }
const difficultyOf = (id: string) => difficulty[id]
const dayOf = (iso: string) => iso.slice(0, 10)
const row = (question_id: string, day: string, is_correct: boolean): AnswerRow =>
  ({ question_id, is_correct, answered_at: `${day}T15:00:00Z` })

describe('accuracyTrend', () => {
  it('tallies each studied day, oldest first, skipping questions outside the exam', () => {
    const t = accuracyTrend([
      row('h1', '2026-10-30', true),
      row('e1', '2026-10-28', false),
      row('h2', '2026-10-30', true),
      row('other-exam', '2026-10-30', false),
      row('m1', '2026-10-30', false),
    ], difficultyOf, '2026-10-31', { dayOf })
    expect(t.days.map(d => [d.day, d.correct, d.answered])).toEqual([
      ['2026-10-28', 0, 1],
      ['2026-10-30', 2, 3],
    ])
    expect(t.days[1].byDifficulty.hard).toEqual({ answered: 2, correct: 2 })
    expect(t.days[1].byDifficulty.medium).toEqual({ answered: 1, correct: 0 })
  })

  it('splits the last 7 days (today included) from the 7 before', () => {
    const t = accuracyTrend([
      row('h1', '2026-10-31', true),   // today
      row('h1', '2026-10-25', true),   // 6 days ago — this week
      row('e1', '2026-10-24', false),  // 7 days ago — last week
      row('e1', '2026-10-18', true),   // 13 days ago — last week
      row('e1', '2026-10-17', true),   // 14 days ago — neither
    ], difficultyOf, '2026-10-31', { dayOf })
    expect(t.recent.answered).toBe(2)
    expect(t.recent.byDifficulty.hard.correct).toBe(2)
    expect(t.previous).toEqual({ answered: 2, correct: 1 })
  })

  it('keeps only days inside the span on the chart', () => {
    const t = accuracyTrend([row('h1', '2026-09-01', true), row('h1', '2026-10-31', true)], difficultyOf, '2026-10-31', { dayOf, span: 30 })
    expect(t.days.map(d => d.day)).toEqual(['2026-10-31'])
  })

  it('ignores answers dated after today', () => {
    const t = accuracyTrend([row('h1', '2026-11-02', true)], difficultyOf, '2026-10-31', { dayOf })
    expect(t.days).toEqual([])
    expect(t.recent.answered).toBe(0)
  })
})

describe('accuracyPercent', () => {
  it('rounds, and is null for nothing answered', () => {
    expect(accuracyPercent({ answered: 3, correct: 2 })).toBe(67)
    expect(accuracyPercent({ answered: 0, correct: 0 })).toBeNull()
  })
})

describe('weeklyChange', () => {
  const rows = (day: string, right: number, wrong: number) => [
    ...Array.from({ length: right }, () => row('h1', day, true)),
    ...Array.from({ length: wrong }, () => row('h1', day, false)),
  ]
  it('is the change in points between the two weeks', () => {
    const t = accuracyTrend([...rows('2026-10-30', 7, 3), ...rows('2026-10-22', 2, 8)], difficultyOf, '2026-10-31', { dayOf })
    expect(weeklyChange(t)).toBe(50)
  })
  it('is null when either week has too few answers', () => {
    const t = accuracyTrend([...rows('2026-10-30', 7, 3), ...rows('2026-10-22', 2, 2)], difficultyOf, '2026-10-31', { dayOf })
    expect(weeklyChange(t)).toBeNull()
  })
})
