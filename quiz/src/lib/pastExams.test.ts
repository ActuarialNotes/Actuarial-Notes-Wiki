import { describe, it, expect } from 'vitest'
import {
  buildPastExamRows,
  formatPassRate,
  hasPublishedStats,
  normalizeSession,
  sittingLabel,
} from './pastExams'
import type { Question } from './parser'

function q(partial: Partial<Question>): Question {
  return {
    id: partial.id ?? Math.random().toString(36).slice(2),
    exam: partial.exam ?? 'Exam 5',
    topic: partial.topic ?? 'Ratemaking',
    difficulty: partial.difficulty ?? 'medium',
    type: partial.type ?? 'multiple-choice',
    question: partial.question ?? 'Q',
    explanation: partial.explanation ?? '',
    year: partial.year,
    session: partial.session,
  } as Question
}

describe('normalizeSession', () => {
  it('accepts the abbreviations and casings used across the question bank', () => {
    expect(normalizeSession('Spring')).toBe('Spring')
    expect(normalizeSession('spring')).toBe('Spring')
    expect(normalizeSession('SP')).toBe('Spring')
    expect(normalizeSession('Fall')).toBe('Fall')
    expect(normalizeSession(' fa ')).toBe('Fall')
  })

  it('returns undefined for a missing or unrecognized session', () => {
    expect(normalizeSession(undefined)).toBeUndefined()
    expect(normalizeSession('')).toBeUndefined()
    expect(normalizeSession('Q3')).toBeUndefined()
  })
})

describe('sittingLabel', () => {
  it('names the sitting, falling back to the bare year', () => {
    expect(sittingLabel(2019, 'spring')).toBe('Spring 2019')
    expect(sittingLabel(2013, 'Fall')).toBe('Fall 2013')
    expect(sittingLabel(2013)).toBe('2013')
  })
})

describe('buildPastExamRows', () => {
  it('counts the bank questions in each sitting and marks it available', () => {
    const rows = buildPastExamRows(
      [
        q({ year: 2019, session: 'Spring' }),
        q({ year: 2019, session: 'Spring' }),
        q({ year: 2013, session: 'Fall' }),
      ],
      'Exam 5',
    )

    const spring2019 = rows.find(r => r.key === '2019|Spring')!
    expect(spring2019.bankCount).toBe(2)
    expect(spring2019.available).toBe(true)

    const fall2013 = rows.find(r => r.key === '2013|Fall')!
    expect(fall2013.bankCount).toBe(1)
    expect(fall2013.available).toBe(true)
  })

  it('still lists catalogued sittings the bank has no questions for, as unavailable', () => {
    const rows = buildPastExamRows([q({ year: 2019, session: 'Spring' })], 'Exam 5')

    const fall2017 = rows.find(r => r.key === '2017|Fall')!
    expect(fall2017.bankCount).toBe(0)
    expect(fall2017.available).toBe(false)
  })

  it('lists a sitting present in the bank but missing from the catalogue', () => {
    const rows = buildPastExamRows([q({ exam: 'Exam 5', year: 2099, session: 'Fall' })], 'Exam 5')
    const imported = rows.find(r => r.key === '2099|Fall')!
    expect(imported.available).toBe(true)
    expect(imported.bankCount).toBe(1)
  })

  it('ignores questions from other exams and questions with no year', () => {
    const rows = buildPastExamRows(
      [
        q({ exam: 'Exam MAS-I', year: 2018, session: 'Spring' }),
        q({ exam: 'Exam 5', year: undefined }),
        q({ exam: 'Exam 5', year: 2019, session: 'Spring' }),
      ],
      'Exam 5',
    )
    expect(rows.filter(r => r.available).map(r => r.key)).toEqual(['2019|Spring'])
  })

  it('orders newest sitting first, with Fall ahead of Spring in the same year', () => {
    const rows = buildPastExamRows([], 'Exam 5')
    const keys = rows.map(r => r.key)
    expect(keys[0]).toBe('2019|Spring')
    expect(keys.indexOf('2018|Fall')).toBeLessThan(keys.indexOf('2018|Spring'))
    expect(keys.indexOf('2018|Spring')).toBeLessThan(keys.indexOf('2017|Fall'))
  })

  it('returns nothing for an exam with no dated papers', () => {
    expect(buildPastExamRows([q({ exam: 'Probability' })], 'Probability')).toEqual([])
  })

  it('normalizes bank sessions so one sitting never splits into two rows', () => {
    const rows = buildPastExamRows(
      [
        q({ year: 2019, session: 'Spring' }),
        q({ year: 2019, session: 'spring' }),
        q({ year: 2019, session: 'SP' }),
      ],
      'Exam 5',
    )
    expect(rows.filter(r => r.year === 2019 && r.session === 'Spring')).toHaveLength(1)
    expect(rows.find(r => r.key === '2019|Spring')!.bankCount).toBe(3)
  })
})

describe('formatPassRate', () => {
  it('prints whole percentages plainly and keeps one decimal otherwise', () => {
    expect(formatPassRate(40)).toBe('40%')
    expect(formatPassRate(40.62)).toBe('40.6%')
  })

  it('has nothing to print when the figure was never published to the app', () => {
    expect(formatPassRate(undefined)).toBeNull()
  })
})

describe('hasPublishedStats', () => {
  const base = { key: '2019|Spring', year: 2019, label: 'Spring 2019', bankCount: 0, available: false }

  it('is false while no sitting carries a figure', () => {
    expect(hasPublishedStats([base])).toBe(false)
  })

  it('is true as soon as one sitting has a pass ratio', () => {
    expect(hasPublishedStats([base, { ...base, key: 'x', effectivePassRate: 46 }])).toBe(true)
  })
})
