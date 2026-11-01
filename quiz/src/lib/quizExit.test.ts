import { describe, expect, it } from 'vitest'
import { quizExitStage, unansweredExit, type QuizExitSnapshot } from './quizExit'

function snap(over: Partial<QuizExitSnapshot> = {}): QuizExitSnapshot {
  return {
    status: 'active',
    loading: false,
    answered: 0,
    awaitingConceptList: false,
    showingConceptList: false,
    mode: 'quiz',
    exam: 'Exam P',
    questionCount: 10,
    newConcepts: 4,
    questionType: 'multiple-choice',
    firstQuiz: true,
    ...over,
  }
}

describe('quizExitStage', () => {
  it('names what was on screen', () => {
    expect(quizExitStage(snap({ status: 'idle', loading: true }))).toBe('loading_questions')
    expect(quizExitStage(snap({ awaitingConceptList: true }))).toBe('loading_concepts')
    expect(quizExitStage(snap({ showingConceptList: true }))).toBe('concept_list')
    expect(quizExitStage(snap())).toBe('question')
  })

  it('is nothing once an answer is in, or the quiz is over', () => {
    expect(quizExitStage(snap({ answered: 1 }))).toBeNull()
    expect(quizExitStage(snap({ status: 'complete' }))).toBeNull()
    expect(quizExitStage(snap({ status: 'reviewing', answered: 0 }))).toBeNull()
  })

  it('is nothing for an idle page that is not loading — no questions matched, or the quiz was just quit', () => {
    expect(quizExitStage(snap({ status: 'idle', loading: false }))).toBeNull()
  })
})

describe('unansweredExit', () => {
  it('reports the concept list with how many concepts it introduced', () => {
    expect(unansweredExit(snap({ showingConceptList: true }), 'quit', 41.6)).toEqual({
      stage: 'concept_list',
      how: 'quit',
      mode: 'quiz',
      exam: 'Exam P',
      question_count: 10,
      new_concepts: 4,
      question_type: '',
      seconds_on_page: 42,
      first_quiz: true,
    })
  })

  it('reports the first question with its type, and no concept count', () => {
    const event = unansweredExit(snap({ questionType: 'multi-part', firstQuiz: false }), 'navigated', 12)
    expect(event).toMatchObject({ stage: 'question', question_type: 'multi-part', new_concepts: 0, first_quiz: false })
  })

  it('reports a wait for the bank as a quiz with no questions yet', () => {
    const event = unansweredExit(snap({ status: 'idle', loading: true, exam: '' }), 'hidden', 8)
    expect(event).toMatchObject({ stage: 'loading_questions', exam: 'Unknown', question_count: 0, how: 'hidden' })
  })

  it('reports nothing for a quiz that has an answer', () => {
    expect(unansweredExit(snap({ answered: 2 }), 'quit', 5)).toBeNull()
  })

  it('never reports a negative time', () => {
    expect(unansweredExit(snap(), 'quit', -3)?.seconds_on_page).toBe(0)
  })
})
