import { describe, expect, it } from 'vitest'
import type { Part, Question } from './parser'
import * as checks from './answerChecks'
import { hasWrittenFeedback, suggestedGrade, writtenGradeDrafts, writtenGradeRows } from './writtenGrades'

function part(label: string, extra: Partial<Part> = {}): Part {
  return { label, points: 1, stem: `Part ${label} prompt.`, type: 'free-entry', options: [], answer: '', explanation: 'Sample.', ...extra }
}

function multi(id: string, parts: Part[], extra: Partial<Question> = {}): Question {
  return {
    id, exam: 'Exam 5', topic: 'Trend', learning_objective: '', difficulty: 'medium', type: 'multi-part',
    wiki_link: [], answer: '', explanation: '', points: 2, stem: 'Given the data below.', options: [], parts, ...extra,
  }
}

describe('writtenGradeDrafts', () => {
  it('keeps one row per self-graded part, and nothing for a part left ungraded or graded on the click', () => {
    const q = multi('cas5-2019f-q3', [
      part('a'),
      part('b', { points: 0.5 }),
      part('c', { type: 'multiple-choice', options: [{ key: 'A', text: 'x' }], answer: 'A' }),
    ])
    const drafts = writtenGradeDrafts(
      [q],
      { [q.id]: { chosen: JSON.stringify({ a: 'my answer', b: 'other', c: 'A' }) } },
      { [`${q.id}__a`]: 'partial', [`${q.id}__c`]: 'correct' },
    )
    expect(drafts).toEqual([
      { question_id: q.id, part_label: 'a', exam: 'Exam 5', grade: 'partial', suggested: null, points: 1 },
    ])
  })

  it('records an unlettered question with no part label, at the question’s points', () => {
    const q = multi('cas5-2014s-q9', [part('a', { stem: '', points: 0 })], { points: 1.75 })
    const [row] = writtenGradeDrafts([q], { [q.id]: { chosen: '{"a":"x"}' } }, { [`${q.id}__a`]: 'incorrect' })
    expect(row.part_label).toBeNull()
    expect(row.points).toBe(1.75)
  })

  it('skips a question never answered', () => {
    const q = multi('q', [part('a')])
    expect(writtenGradeDrafts([q], {}, { 'q__a': 'correct' })).toEqual([])
  })

  it('records a free-entry question standing for one part under that part', () => {
    const q: Question = { ...multi('cas5-2019f-q3', []), type: 'free-entry', parts: undefined, answer: 'x', points: 0.5 }
    const [row] = writtenGradeDrafts([q], { [q.id]: { chosen: '(worked on paper)' } }, { [q.id]: 'correct' }, { partLabels: { [q.id]: 'c' } })
    expect(row).toMatchObject({ part_label: 'c', grade: 'correct', points: 0.5 })
  })

  it('records what the final figure suggested', () => {
    const q = multi('q', [part('a', { stem: 'Calculate the rate change.', answer: '', explanation: 'Rate change = 1.05 - 1 = 5.0%\n\n### Answer\n5.0%' })])
    const [row] = writtenGradeDrafts([q], { q: { chosen: '{"a":"I get 5.0%"}' } }, { 'q__a': 'partial' }, { checks })
    expect(row.suggested).toBe(suggestedGrade(checks, q.parts![0], q.stem, 'I get 5.0%'))
  })
})

describe('writtenGradeRows', () => {
  it('gives each draft its owner, session, source and time', () => {
    const rows = writtenGradeRows(
      [{ question_id: 'q', part_label: 'a', exam: 'Exam 7', grade: 'correct', suggested: null, points: 1 }],
      { userId: 'u', sessionId: 's', source: 'review', at: '2026-11-28T10:00:00.000Z' },
    )
    expect(rows[0]).toMatchObject({ user_id: 'u', session_id: 's', source: 'review', graded_at: '2026-11-28T10:00:00.000Z' })
  })
})

describe('hasWrittenFeedback', () => {
  it('is the CAS’s written papers', () => {
    for (const e of ['Exam 5', 'Exam 6C', 'Exam 7', 'Exam 8', 'Exam 9']) expect(hasWrittenFeedback(e)).toBe(true)
    expect(hasWrittenFeedback('Exam MAS-I')).toBe(false)
    expect(hasWrittenFeedback(null)).toBe(false)
  })
})
