import { describe, expect, it } from 'vitest'
import { emptyRecord, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import type { Question } from '@/lib/parser'
import { drawTransmission, selectTransmission, transmissionPath } from './transmission'

const DAY = 24 * 60 * 60 * 1000
const NOW = new Date('2026-09-29T12:00:00Z')

function row(exam: string, concept: string, state: MasteryState, lastCorrectDaysAgo: number | null): ConceptMasteryRecord {
  return {
    ...emptyRecord('u', exam, concept),
    state,
    correct_count: 3,
    last_correct_at: lastCorrectDaysAgo === null ? null : new Date(NOW.getTime() - lastCorrectDaysAgo * DAY).toISOString(),
  }
}

function question(id: string, exam: string, concept: string, difficulty: Question['difficulty'] = 'medium'): Question {
  return {
    id,
    exam,
    topic: 't',
    learning_objective: 'lo',
    difficulty,
    type: 'multiple-choice',
    wiki_link: [`Concepts/${concept.replace(/ /g, '+')}`],
    answer: 'A',
    explanation: '',
    points: 1,
    stem: 'stem',
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }],
  } as Question
}

describe('selectTransmission', () => {
  it('takes concepts decaying within 7 days and forgotten ones, keystones first (§7.5)', () => {
    const rows = [
      row('P', 'Percentile', 'level2', 12),          // L2 → L1 in 2 days
      row('P', 'Joint Distribution', 'level1', 6), // L1 → Forgotten in 1 day
      row('P', 'Bayes Theorem', 'level2', 9),      // keystone, L2 → L1 in 5 days
      row('P', 'Covariance', 'level3', 2),         // safe for 28 days
      row('P', 'Moments', 'forgotten', 60),
    ]
    const picks = selectTransmission(rows, NOW, 3)
    expect(picks.map(p => p.concept)).toEqual(['Bayes Theorem', 'Joint Distribution', 'Percentile'])
    expect(picks[0].keystone).toBe(true)
    expect(picks.map(p => p.reason)).toEqual(['decaying', 'decaying', 'decaying'])
  })

  it('breaks a tie on the date by the higher level — the most to lose', () => {
    const rows = [row('P', 'Moments', 'level1', 5), row('P', 'Covariance', 'level2', 12)]
    // Both step down in 2 days.
    expect(selectTransmission(rows, NOW, 3).map(p => p.concept)).toEqual(['Covariance', 'Moments'])
  })

  it('puts a forgotten concept after the ones still decaying', () => {
    const rows = [row('P', 'Moments', 'forgotten', 90), row('P', 'Covariance', 'level2', 12)]
    const picks = selectTransmission(rows, NOW, 3)
    expect(picks.map(p => [p.concept, p.reason])).toEqual([['Covariance', 'decaying'], ['Moments', 'forgotten']])
  })

  it('counts a concept once, and only on the exams being studied', () => {
    const rows = [row('P', 'Percentile', 'level2', 12), row('MAS-I', 'Percentile', 'level2', 12), row('FM', 'Duration', 'level1', 6)]
    expect(selectTransmission(rows, NOW, 3).map(p => p.concept)).toEqual(['Duration', 'Percentile'])
    expect(selectTransmission(rows, NOW, 3, { activeExams: ['P'] }).map(p => `${p.exam}:${p.concept}`)).toEqual(['P:Percentile'])
  })

  it('fills from today’s study plan when fewer than n are decaying', () => {
    const rows = [row('P', 'Percentile', 'level2', 12)]
    const picks = selectTransmission(rows, NOW, 3, {
      plan: [{ exam: 'P', concept: 'Percentile' }, { exam: 'P', concept: 'Covariance' }, { exam: 'P', concept: 'Moments' }],
    })
    expect(picks.map(p => [p.concept, p.reason])).toEqual([
      ['Percentile', 'decaying'],
      ['Covariance', 'plan'],
      ['Moments', 'plan'],
    ])
  })

  it('is empty with nothing decaying and no plan — “No decay today”', () => {
    expect(selectTransmission([row('P', 'Percentile', 'level3', 1)], NOW)).toEqual([])
  })
})

describe('drawTransmission', () => {
  const bank = [
    question('p-1', 'Probability', 'Percentile', 'easy'),
    question('p-2', 'Probability', 'Percentile', 'hard'),
    question('m-1', 'Exam MAS-I', 'Covariance'),
    question('p-3', 'Probability', 'Moments'),
  ]

  it('draws one question per concept, on its own exam when it has one', () => {
    const picks = selectTransmission(
      [row('P', 'Percentile', 'level2', 12), row('P', 'Covariance', 'level2', 12), row('P', 'Nothing Here', 'level2', 12)],
      NOW,
    )
    const drawn = drawTransmission(picks, bank, () => 0.5)
    expect(drawn.map(d => d.pick.concept)).toEqual(['Covariance', 'Percentile'])
    // Covariance has no Exam P question: any exam that links it.
    expect(drawn[0].question.id).toBe('m-1')
    expect(drawn[1].question.exam).toBe('Probability')
    expect(new Set(drawn.map(d => d.question.id)).size).toBe(drawn.length)
  })

  it('opens an ordinary quiz by id', () => {
    const drawn = drawTransmission(selectTransmission([row('P', 'Moments', 'level1', 6)], NOW), bank)
    expect(transmissionPath(drawn)).toBe('/quiz?ids=p-3')
  })

  it('never serves a question with an open critical finding', () => {
    const flagged = { ...question('p-9', 'Probability', 'Moments'), verification: { status: 'disputed', open_findings: 1, open_critical: 1 } } as unknown as Question
    const drawn = drawTransmission(selectTransmission([row('P', 'Moments', 'level1', 6)], NOW), [flagged])
    expect(drawn).toEqual([])
  })
})
