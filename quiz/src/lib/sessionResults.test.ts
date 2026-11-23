import { describe, expect, it } from 'vitest'
import type { ConceptMasteryRecord } from './mastery'
import {
  askLine,
  ceremonyMoves,
  conceptName,
  levelledUp,
  recordsBefore,
  resultRows,
  rowConcept,
  syllabusGain,
  timeTaken,
  toFix,
} from './sessionResults'
import { askedPhrase, gradePoints } from './gradeWords'
import { mc } from './sessionFixtures.testutil'

const moves = [
  { conceptSlug: 'Bayes Theorem', from: 'new', to: 'level1', collected: true },
  { conceptSlug: 'Variance', from: 'level1', to: 'level2' },
  { conceptSlug: 'Moment', from: 'level2', to: 'level3' },
  { conceptSlug: 'Median', from: 'forgotten', to: 'level1' },
  { conceptSlug: 'Mode', from: 'level2', to: 'level1' },
  { conceptSlug: 'Mean', from: 'level1', to: 'forgotten' },
] as const

describe('level moves', () => {
  it('lists every move up, and no move down', () => {
    expect(levelledUp(moves).map(m => m.conceptSlug)).toEqual(['Bayes Theorem', 'Variance', 'Moment', 'Median'])
    expect(levelledUp(undefined)).toEqual([])
  })

  it('keeps the ceremony for a card collected and for Level 3', () => {
    expect(ceremonyMoves(moves).map(m => m.conceptSlug)).toEqual(['Bayes Theorem', 'Moment'])
    // A re-earned Level 1 collects nothing: no ceremony.
    expect(ceremonyMoves([{ conceptSlug: 'Median', from: 'forgotten', to: 'level1' }])).toEqual([])
    expect(ceremonyMoves([{ conceptSlug: 'Variance', from: 'level1', to: 'level2' }])).toEqual([])
  })
})

describe('result rows', () => {
  const questions = [
    mc('q1', { wiki_link: ['Concepts/Poisson+Distribution'], stem: 'Errors are Poisson with mean 0.10. Calculate the probability of more than four errors in a 100-page document.' }),
    mc('q2', { wiki_link: [], topic: 'Statistics' }),
    mc('q3'),
  ]

  it('names a row for its first concept, or its topic', () => {
    expect(rowConcept(questions[0])).toBe('Poisson Distribution')
    expect(rowConcept(questions[1])).toBe('Statistics')
    expect(conceptName('Concepts/Bayes+Theorem')).toBe('Bayes Theorem')
  })

  it('keeps the questions short of full credit, in the order asked', () => {
    const rows = resultRows(questions, ['incorrect', 'correct', 'unanswered'], toFix)
    expect(rows.map(r => [r.question.id, r.index, r.state])).toEqual([['q1', 0, 'incorrect'], ['q3', 2, 'unanswered']])
    expect(toFix('partial')).toBe(true)
    expect(toFix('correct')).toBe(false)
  })

  it('gives one line of the question: what it asks', () => {
    expect(askLine(questions[0])).toBe('Calculate the probability of more than four errors in a 100-page document.')
    const long = askLine({ stem: `Calculate ${'the very long quantity '.repeat(12)}now.` }, 60)
    expect(long.length).toBeLessThanOrEqual(61)
    expect(long.endsWith('…')).toBe(true)
    expect(askLine({ stem: '', parts: [{ label: 'a', stem: 'Describe the trend selection.' }] })).toContain('Describe the trend selection.')
  })
})

describe('the syllabus gain', () => {
  const rec = (slug: string, state: ConceptMasteryRecord['state']): ConceptMasteryRecord => ({
    user_id: 'u', exam_id: 'P', concept_slug: slug, state,
    correct_count: 1, incorrect_streak: 0, hard_correct_count: 0,
    last_correct_at: '2026-01-01T00:00:00Z', last_attempted_at: '2026-01-01T00:00:00Z',
  })

  it('puts each moved concept back where it started', () => {
    const now = '2026-11-23T00:00:00Z'
    const before = recordsBefore(
      [rec('Bayes Theorem', 'level1'), rec('Variance', 'level2'), rec('Mean', 'level3')],
      [
        { conceptSlug: 'bayes theorem', from: 'new', to: 'level1' },
        { conceptSlug: 'Variance', from: 'level1', to: 'level2' },
      ],
      now,
    )
    expect(before.map(r => [r.concept_slug, r.state])).toEqual([['Variance', 'level1'], ['Mean', 'level3']])
    expect(before[0].last_correct_at).toBe(now)
    expect(before[1].last_correct_at).toBe('2026-01-01T00:00:00Z')
  })

  it('leaves another exam\'s record alone', () => {
    const before = recordsBefore([rec('Variance', 'level2')], [{ conceptSlug: 'Variance', examId: 'FM', from: 'new', to: 'level1' }], 'now')
    expect(before).toHaveLength(1)
    expect(before[0].state).toBe('level2')
  })

  it('reports the rounded figures the bar draws, never a fall', () => {
    expect(syllabusGain(26.6, 29.2)).toEqual({ pct: 29, gain: 2 })
    expect(syllabusGain(30, 28)).toEqual({ pct: 28, gain: 0 })
  })
})

describe('words', () => {
  it('prints the time a quiz took', () => {
    expect(timeTaken(45)).toBe('45 sec')
    expect(timeTaken(23 * 60)).toBe('23 min')
    expect(timeTaken(3900)).toBe('1 hr 5 min')
    expect(timeTaken(7200)).toBe('2 hr')
    expect(timeTaken(null)).toBeNull()
  })

  it('prints the points a grade gives', () => {
    expect(gradePoints(1, 1)).toBe('1 point')
    expect(gradePoints(1, 0.5)).toBe('½ point')
    expect(gradePoints(0.5, 0.5)).toBe('¼ point')
    expect(gradePoints(1.25, 0.5)).toBe('0.63 points')
    expect(gradePoints(2, 1)).toBe('2 points')
    expect(gradePoints(2, 0)).toBe('0')
  })

  it('says how many points a part asks for', () => {
    expect(askedPhrase(2)).toBe('any two')
    expect(askedPhrase(12)).toBe('any 12')
    expect(askedPhrase(null)).toBeNull()
  })
})
