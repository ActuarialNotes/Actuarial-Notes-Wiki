import { describe, expect, it } from 'vitest'
import type { AnswerRow } from './accuracyTrend'
import type { Question } from './parser'
import {
  MAX_TIMING_SECONDS,
  clock,
  linkConceptKey,
  paceRatio,
  pacing,
  rowsInSpan,
  sectionLeaks,
} from './performanceAnalytics'

const TODAY = '2026-10-31'
const dayOf = (iso: string) => iso.slice(0, 10)
const row = (question_id: string, is_correct: boolean, time_spent_seconds: number | null = null, day = TODAY): AnswerRow =>
  ({ question_id, is_correct, answered_at: `${day}T15:00:00Z`, time_spent_seconds })

type Q = Pick<Question, 'wiki_link' | 'difficulty' | 'points'>
const questions = new Map<string, Q>([
  ['a1', { wiki_link: ['Concepts/Bayes+Theorem'], difficulty: 'easy', points: 0 }],
  ['a2', { wiki_link: ['Concepts/Bayes+Theorem'], difficulty: 'hard', points: 0 }],
  ['b1', { wiki_link: ['Concepts/Poisson+Distribution'], difficulty: 'medium', points: 2 }],
  ['ab', { wiki_link: ['Concepts/Bayes+Theorem', 'Concepts/Poisson+Distribution'], difficulty: 'medium', points: 0.5 }],
])

const syllabus = {
  topics: [
    { name: 'Probability', weight: '20-30%', concepts: [{ name: 'Bayes Theorem', target: 'Bayes Theorem' }] },
    { name: 'Distributions', weight: '70-80%', concepts: [{ name: 'Poisson Distribution', target: 'Poisson Distribution' }] },
    { name: 'Unpractised', weight: '5%', concepts: [{ name: 'Nothing', target: 'Nothing' }] },
  ],
}

describe('rowsInSpan', () => {
  it('keeps the last span days, today included, and nothing dated after today', () => {
    const rows = [row('a1', true, null, '2026-10-25'), row('a1', true, null, '2026-10-24'), row('a1', true, null, '2026-11-01')]
    expect(rowsInSpan(rows, TODAY, { span: 7, dayOf }).map(r => r.answered_at.slice(0, 10))).toEqual(['2026-10-25'])
  })
})

describe('linkConceptKey', () => {
  it('reads the concept off a wiki_link, plus signs as spaces', () => {
    expect(linkConceptKey('Concepts/Bayes+Theorem')).toBe('bayes theorem')
    expect(linkConceptKey('Concepts/Bayes Theorem.md')).toBe('bayes theorem')
  })
})

describe('sectionLeaks', () => {
  it('weighs each section’s misses by its share of the paper, costliest first', () => {
    const rows = [
      row('a1', false), row('a2', false), row('a1', true), row('a2', true),   // Probability 2 of 4
      row('b1', true), row('b1', true), row('b1', true), row('b1', false),    // Distributions 3 of 4
    ]
    const leaks = sectionLeaks(rows, questions, syllabus)
    // Shares: 25, 75, 5 over 105.
    expect(leaks.map(l => l.name)).toEqual(['Distributions', 'Probability', 'Unpractised'])
    expect(leaks[0].share).toBeCloseTo(71.43, 1)
    expect(leaks[0].marksLost).toBeCloseTo(71.43 * 0.25, 1)
    expect(leaks[1].marksLost).toBeCloseTo(23.81 * 0.5, 1)
    expect(leaks[2]).toMatchObject({ answered: 0, marksLost: null })
  })

  it('counts a question in every section its concepts belong to', () => {
    const leaks = sectionLeaks([row('ab', true)], questions, syllabus)
    expect(leaks.find(l => l.name === 'Probability')!.answered).toBe(1)
    expect(leaks.find(l => l.name === 'Distributions')!.answered).toBe(1)
  })

  it('leaves a section with too few answers unjudged, listed after the judged by share', () => {
    const rows = [row('a1', false), row('a1', false), row('a1', false), row('b1', false)]
    const leaks = sectionLeaks(rows, questions, syllabus)
    expect(leaks.map(l => [l.name, l.marksLost === null])).toEqual([
      ['Probability', false],
      ['Distributions', true],
      ['Unpractised', true],
    ])
  })
})

describe('pacing', () => {
  it('reads the median per question against the exam’s pace', () => {
    const rows = [10, 20, 30, 40, 500].map((t, i) => row(i % 2 ? 'a1' : 'a2', true, t))
    const p = pacing(rows, questions, 'Probability')!
    expect(p.allowed).toBe(360)  // 180 minutes over 30 questions
    expect(p.overall).toEqual({ answered: 5, median: 30 })
    expect(p.byDifficulty.easy.median).toBeNull()  // two timed — too few
  })

  it('paces a paper marked by the point by the point', () => {
    const rows = Array.from({ length: 5 }, () => row('b1', true, 600))
    const p = pacing(rows, questions, 'Exam 5')!
    expect(p.pace.per).toBe('point')
    expect(p.overall.median).toBe(300)  // 600 s over 2 points
  })

  it('sets aside untimed answers and ones left open past the hour', () => {
    const rows = [row('a1', true, null), row('a1', true, 0), row('a1', true, MAX_TIMING_SECONDS + 1), row('a1', true, 50)]
    expect(pacing(rows, questions, 'Probability')!.overall).toEqual({ answered: 1, median: null })
  })

  it('is null for an exam with no pace on file', () => {
    expect(pacing([row('a1', true, 30)], questions, 'Exam 9')).toBeNull()
  })
})

describe('clock and paceRatio', () => {
  it('writes minutes and seconds, and the pace as a share of the allowance', () => {
    expect(clock(245)).toBe('4:05')
    expect(clock(59.6)).toBe('1:00')
    expect(paceRatio({ answered: 5, median: 432 }, 360)).toBe(120)
    expect(paceRatio({ answered: 2, median: null }, 360)).toBeNull()
  })
})
