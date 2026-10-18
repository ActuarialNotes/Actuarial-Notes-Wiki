import { describe, expect, it } from 'vitest'
import { isAnswerCorrect, questionCredit } from '../parser'
import { slugForLink } from '../conceptMatch'
import { bankQuestion, bankRounds, conceptLink } from './bank'
import type { TutorItem } from './items'

function item(id: string, concepts: string[], extra: Partial<TutorItem> = {}): TutorItem {
  return {
    id, questionId: id.split('#')[0], partLabel: 'a', exam: 'Exam 5', topic: 'Trend', preamble: 'Given…', prompt: 'Calculate it.',
    kind: 'calculation', concepts, questionConcepts: concepts, points: 1, minutes: 4.4, difficulty: 'hard', sitting: 'Fall 2019',
    answerKey: '', sampleAnswer: 's', examinerReport: '', options: [], ...extra,
  }
}

describe('banking an item', () => {
  it('writes its concepts the way the bank does, so the ladder keys them the same', () => {
    expect(conceptLink('Loss Trend')).toBe('Concepts/Loss+Trend')
    expect(slugForLink(conceptLink('Bornhuetter-Ferguson Method'))).toBe('Bornhuetter-Ferguson Method')
  })

  it('banks a written part as a free-entry question under its question’s id, with only the part’s concepts', () => {
    const q = bankQuestion(item('cas5-2019f-q3#c', ['Large Loss']))
    expect(q.id).toBe('cas5-2019f-q3')
    expect(q.type).toBe('free-entry')
    expect(q.wiki_link).toEqual(['Concepts/Large+Loss'])
    expect(q.answer).not.toBe('')
  })

  it('banks a choice as a multiple-choice question, graded on the click', () => {
    const mc = bankQuestion(item('cas5-an-001', ['Exposure Base'], { options: [{ key: 'A', text: 'x' }, { key: 'B', text: 'y' }], answerKey: 'B' }))
    expect(mc.type).toBe('multiple-choice')
    expect(isAnswerCorrect(mc, 'B')).toBe(true)
  })

  it('counts full credit as correct and partial as not, the quiz’s rule', () => {
    const [round] = bankRounds([{ item: item('q1#a', ['X']), grade: 'partial', answer: '', seconds: 30 }])
    const q = round.questions[0]
    expect(round.manualGrades[q.id]).toBe('partial')
    expect(questionCredit(q, round.responses[q.id].chosen, round.manualGrades)).toBe(0.5)
    expect(round.responses[q.id].chosen).toBe('(worked on paper)')
  })

  it('never puts two parts of one question in one round', () => {
    const rounds = bankRounds([
      { item: item('q1#a', ['X']), grade: 'correct', answer: '1', seconds: 30 },
      { item: item('q2#a', ['Y']), grade: 'correct', answer: '2', seconds: 30 },
      { item: item('q1#b', ['Z']), grade: 'incorrect', answer: '3', seconds: 30 },
    ])
    expect(rounds.map(r => r.questions.map(q => q.id))).toEqual([['q1', 'q2'], ['q1']])
    expect(rounds[1].questions[0].wiki_link).toEqual(['Concepts/Z'])
  })
})
