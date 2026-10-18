import { describe, expect, it } from 'vitest'
import type { Question } from './parser'
import { questionPoints, quizPoints } from './quizScore'

function mc(id: string, points: number, answer = 'A'): Question {
  return {
    id, exam: 'Exam 5', topic: 't', learning_objective: '', difficulty: 'medium',
    type: 'multiple-choice', wiki_link: [], points, stem: '', options: [], answer, explanation: '',
  } as unknown as Question
}

describe('questionPoints', () => {
  it('is the question\'s points', () => expect(questionPoints(mc('a', 2.5))).toBe(2.5))
  it('is one when the question carries none', () => {
    expect(questionPoints(mc('a', 0))).toBe(1)
    expect(questionPoints(mc('a', NaN))).toBe(1)
  })
})

describe('quizPoints', () => {
  const questions = [mc('big', 2.5), mc('small', 0.5)]

  it('weights each question by its points', () => {
    const score = quizPoints(questions, { big: { chosen: 'A' }, small: { chosen: 'B' } }, {})
    expect(score.earned).toBe(2.5)
    expect(score.possible).toBe(3)
    expect(score.percentage).toBe(83)
    expect(score.unitPoints).toBe(false)
  })

  it('a missed big question costs more than a missed small one', () => {
    const score = quizPoints(questions, { big: { chosen: 'B' }, small: { chosen: 'A' } }, {})
    expect(score.percentage).toBe(17)
  })

  it('unanswered questions still count toward what was possible', () => {
    expect(quizPoints(questions, {}, {})).toMatchObject({ earned: 0, possible: 3, percentage: 0 })
  })

  it('a quiz of one-point questions is a count', () => {
    const score = quizPoints([mc('a', 1), mc('b', 1)], { a: { chosen: 'A' } }, {})
    expect(score).toMatchObject({ earned: 1, possible: 2, percentage: 50, unitPoints: true })
  })
})
