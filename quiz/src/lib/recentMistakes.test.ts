import { describe, expect, it } from 'vitest'
import { buildRecentMistakes, PROBLEM_SCORE_THRESHOLD, type MistakeResponseRow } from './recentMistakes'
import type { Question } from './parser'
import type { ConceptMasteryRecord } from './mastery'

function q(id: string, links: string[]): Question {
  return {
    id,
    exam: 'Exam P',
    topic: 'Probability',
    learning_objective: 'General Probability',
    difficulty: 'medium',
    type: 'multiple-choice',
    wiki_link: links,
    answer: 'A',
    explanation: '',
    points: 1,
    stem: `Stem for ${id}`,
    options: [],
  }
}

function rec(partial: Partial<ConceptMasteryRecord> = {}): ConceptMasteryRecord {
  return {
    user_id: 'u',
    exam_id: 'P',
    concept_slug: 'Bayes Theorem',
    state: 'new',
    correct_count: 0,
    incorrect_streak: 0,
    hard_correct_count: 1,
    last_correct_at: null,
    last_attempted_at: null,
    ...partial,
  }
}

const NOW = new Date('2026-07-21T12:00:00Z')

function row(question_id: string, is_correct: boolean, answered_at: string): MistakeResponseRow {
  return { question_id, is_correct, answered_at }
}

describe('buildRecentMistakes', () => {
  it('returns the questions whose latest attempt was wrong, most recent first', () => {
    const questions = [q('q1', ['Bayes Theorem']), q('q2', ['Axioms of Probability'])]
    const rows = [
      row('q1', false, '2026-07-20T10:00:00Z'),
      row('q2', false, '2026-07-21T09:00:00Z'),
    ]
    const out = buildRecentMistakes(rows, questions, [], NOW)
    expect(out.map(m => m.question.id)).toEqual(['q2', 'q1'])
  })

  it('drops a question that was missed but later re-answered correctly', () => {
    const questions = [q('q1', ['Bayes Theorem'])]
    const rows = [
      row('q1', false, '2026-07-19T10:00:00Z'),
      row('q1', true, '2026-07-20T10:00:00Z'),
    ]
    expect(buildRecentMistakes(rows, questions, [], NOW)).toEqual([])
  })

  it('keeps a question re-missed after a correct answer (latest attempt wins)', () => {
    const questions = [q('q1', ['Bayes Theorem'])]
    const rows = [
      row('q1', true, '2026-07-18T10:00:00Z'),
      row('q1', false, '2026-07-20T10:00:00Z'),
    ]
    expect(buildRecentMistakes(rows, questions, [], NOW).map(m => m.question.id)).toEqual(['q1'])
  })

  it('honors the limit', () => {
    const questions = Array.from({ length: 6 }, (_, i) => q(`q${i}`, ['Bayes Theorem']))
    const rows = questions.map((qq, i) =>
      row(qq.id, false, `2026-07-2${i}T10:00:00Z`),
    )
    expect(buildRecentMistakes(rows, questions, [], NOW, 3)).toHaveLength(3)
  })

  it('ignores responses whose question is not in the bank', () => {
    const questions = [q('q1', ['Bayes Theorem'])]
    const rows = [row('unknown', false, '2026-07-21T10:00:00Z')]
    expect(buildRecentMistakes(rows, questions, [], NOW)).toEqual([])
  })

  it('flags a New / weak concept as problematic', () => {
    const questions = [q('q1', ['Bayes Theorem'])]
    const rows = [row('q1', false, '2026-07-21T10:00:00Z')]
    const [mistake] = buildRecentMistakes(rows, questions, [], NOW)
    expect(mistake.problemConcepts[0].state).toBe('new')
    expect(mistake.problemConcepts[0].isProblem).toBe(true)
  })

  it('does not flag a strong concept with a clean miss-rate', () => {
    // A Level 3 concept (weakness 0.1) missed exactly once: smoothing keeps the
    // score at (1 + 3*0.1)/(1+3) = 0.325, below the threshold, so a lone miss on
    // an otherwise-strong concept isn't flagged.
    const questions = [q('q1', ['Bayes Theorem'])]
    const rows = [row('q1', false, '2026-07-21T10:00:00Z')]
    const mastery = [rec({ state: 'level3', last_correct_at: NOW.toISOString() })]
    const [mistake] = buildRecentMistakes(rows, questions, mastery, NOW)
    const bayes = mistake.problemConcepts.find(c => c.slug === 'Bayes Theorem')!
    expect(bayes.score).toBeLessThan(PROBLEM_SCORE_THRESHOLD)
    expect(bayes.isProblem).toBe(false)
  })

  it('ranks the concept with the higher miss-rate first for a multi-concept question', () => {
    // q1 touches both concepts. History: "Conditional Probability" missed a lot,
    // "Axioms of Probability" mostly right. Both start New, so the miss-rate
    // signal should break the tie.
    const questions = [
      q('q1', ['Conditional Probability', 'Axioms of Probability']),
      q('q2', ['Conditional Probability']),
      q('q3', ['Axioms of Probability']),
    ]
    const rows = [
      row('q1', false, '2026-07-21T10:00:00Z'),
      row('q2', false, '2026-07-19T10:00:00Z'),
      row('q3', true, '2026-07-18T10:00:00Z'),
    ]
    const [mistake] = buildRecentMistakes(rows, questions, [], NOW)
    expect(mistake.problemConcepts[0].slug).toBe('Conditional Probability')
    expect(mistake.problemConcepts[0].score).toBeGreaterThan(mistake.problemConcepts[1].score)
  })
})
