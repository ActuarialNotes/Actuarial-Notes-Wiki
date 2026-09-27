import { describe, it, expect } from 'vitest'
import {
  buildPastExamRows,
  examSourceLabel,
  formatPassRate,
  hasPublishedStats,
  inPaperOrder,
  normalizeSession,
  paperQuestionNumber,
  questionSittingLabel,
  sittingLabel,
  sittingLabels,
} from './pastExams'
import type { PastExamRow } from './pastExams'
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
    originally_exam: partial.originally_exam,
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
    expect(keys[0]).toBe('2019|Fall')
    expect(keys.indexOf('2019|Fall')).toBeLessThan(keys.indexOf('2019|Spring'))
    expect(keys.indexOf('2018|Fall')).toBeLessThan(keys.indexOf('2018|Spring'))
    expect(keys.indexOf('2018|Spring')).toBeLessThan(keys.indexOf('2017|Fall'))
  })

  it('returns nothing for an exam with no dated papers', () => {
    expect(buildPastExamRows([q({ exam: 'Probability' })], 'Probability')).toEqual([])
  })

  it('builds no row from a question carried over from another exam’s paper', () => {
    // The CAS moved Time Series to MAS-II, so the bank holds MAS-I Spring 2018
    // questions tagged `Exam MAS-II`. MAS-II was first sat in Fall 2018 — a
    // Spring 2018 row would be a paper that never existed.
    const rows = buildPastExamRows(
      [
        q({ exam: 'Exam MAS-II', year: 2018, session: 'Spring', originally_exam: 'Exam MAS-I' }),
        q({ exam: 'Exam MAS-II', year: 2019, session: 'Spring' }),
      ],
      'Exam MAS-II',
    )
    expect(rows.find(r => r.key === '2018|Spring')).toBeUndefined()
    expect(rows.find(r => r.key === '2019|Spring')!.bankCount).toBe(1)
  })

  it('leaves a real sitting unavailable when only carried-over questions carry its date', () => {
    // MAS-II Fall 2018 happened, so it stays on the shelf — but the questions
    // tagged with it came off the MAS-I paper, so the sitting is still unimported.
    const rows = buildPastExamRows(
      [q({ exam: 'Exam MAS-II', year: 2018, session: 'Fall', originally_exam: 'Exam MAS-I' })],
      'Exam MAS-II',
    )
    const fall2018 = rows.find(r => r.key === '2018|Fall')!
    expect(fall2018.bankCount).toBe(0)
    expect(fall2018.available).toBe(false)
  })

  it('still counts a question whose recorded origin is this same exam', () => {
    const rows = buildPastExamRows(
      [q({ exam: 'Exam 5', year: 2019, session: 'Fall', originally_exam: 'Exam 5' })],
      'Exam 5',
    )
    expect(rows.find(r => r.key === '2019|Fall')!.bankCount).toBe(1)
  })

  it('catalogues no MAS-II paper before its first sitting in Fall 2018', () => {
    const years = buildPastExamRows([], 'Exam MAS-II').map(r => r.key)
    expect(years).toEqual(['2019|Fall', '2019|Spring', '2018|Fall'])
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

describe('questionSittingLabel', () => {
  it('names the sitting from the question\'s own frontmatter', () => {
    expect(questionSittingLabel(q({ year: 2019, session: 'Sp' }))).toBe('Spring 2019')
  })

  it('is the bare year when the file tags no session', () => {
    expect(questionSittingLabel(q({ year: 2019 }))).toBe('2019')
  })

  it('is null for an undated question rather than a guess', () => {
    expect(questionSittingLabel(q({}))).toBeNull()
  })
})

describe('sittingLabels', () => {
  it('lists the sittings the pool holds, newest first', () => {
    const labels = sittingLabels([
      q({ year: 2018, session: 'Spring' }),
      q({ year: 2019, session: 'Fall' }),
      q({ year: 2019, session: 'Spring' }),
      q({ year: 2019, session: 'Fall' }),
    ])
    expect(labels).toEqual(['Fall 2019', 'Spring 2019', 'Spring 2018'])
  })

  it('leaves undated questions out', () => {
    expect(sittingLabels([q({}), q({ year: 2019, session: 'Fall' })])).toEqual(['Fall 2019'])
  })

  it('is empty for a pool with no dated questions', () => {
    expect(sittingLabels([q({})])).toEqual([])
  })
})

describe('paperQuestionNumber', () => {
  it('reads the number the paper printed off the id', () => {
    expect(paperQuestionNumber('cas5-2019s-q12')).toBe(12)
    expect(paperQuestionNumber('cas7-2012-q1')).toBe(1)
    expect(paperQuestionNumber('masii-2019f-q42')).toBe(42)
  })

  it('is null for an id that names no place on a paper', () => {
    expect(paperQuestionNumber('p-004')).toBeNull()
    expect(paperQuestionNumber('fm-120')).toBeNull()
  })
})

describe('inPaperOrder', () => {
  it('sits a paper question 1 first, Q10 after Q9 rather than after Q1', () => {
    const paper = [10, 2, 1, 9, 3].map(n => q({ id: `cas5-2019s-q${n}`, year: 2019, session: 'Spring' }))
    expect(inPaperOrder(paper).map(x => x.id)).toEqual([
      'cas5-2019s-q1', 'cas5-2019s-q2', 'cas5-2019s-q3', 'cas5-2019s-q9', 'cas5-2019s-q10',
    ])
  })

  it('keeps papers apart, oldest first and Spring before Fall', () => {
    const questions = [
      q({ id: 'masi-2019f-q1', year: 2019, session: 'Fall' }),
      q({ id: 'masi-2019s-q2', year: 2019, session: 'Spring' }),
      q({ id: 'masi-2018f-q1', year: 2018, session: 'Fall' }),
      q({ id: 'masi-2019s-q1', year: 2019, session: 'sp' }),
    ]
    expect(inPaperOrder(questions).map(x => x.id)).toEqual([
      'masi-2018f-q1', 'masi-2019s-q1', 'masi-2019s-q2', 'masi-2019f-q1',
    ])
  })

  it('puts a question with no number behind the numbered ones instead of guessing its place', () => {
    const questions = [
      q({ id: 'stray', year: 2019, session: 'Spring' }),
      q({ id: 'cas5-2019s-q2', year: 2019, session: 'Spring' }),
      q({ id: 'cas5-2019s-q1', year: 2019, session: 'Spring' }),
    ]
    expect(inPaperOrder(questions).map(x => x.id)).toEqual(['cas5-2019s-q1', 'cas5-2019s-q2', 'stray'])
  })

  it('leaves the input as it was', () => {
    const questions = [q({ id: 'cas5-2019s-q2', year: 2019 }), q({ id: 'cas5-2019s-q1', year: 2019 })]
    inPaperOrder(questions)
    expect(questions.map(x => x.id)).toEqual(['cas5-2019s-q2', 'cas5-2019s-q1'])
  })
})

describe('examSourceLabel', () => {
  const row = (year: number): PastExamRow => ({
    key: `${year}|Fall`,
    year,
    session: 'Fall',
    label: `Fall ${year}`,
    bankCount: 24,
    available: true,
  })

  it('names the source after real papers when the exam has them', () => {
    expect(examSourceLabel([row(2019), row(2018)])).toBe('Past Papers')
  })

  it('falls back to Practice Exam when the shelf is the generated Mix alone', () => {
    // Exam P and FM release no dated sittings, so their shelf has no rows.
    expect(examSourceLabel([])).toBe('Practice Exam')
  })
})
