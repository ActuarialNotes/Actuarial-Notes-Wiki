import { describe, expect, it } from 'vitest'
import {
  isQuizInProgress,
  leaveConsequence,
  normalizeSearch,
  quizResumePath,
  resumesQuiz,
  sessionNoun,
  showsQuizResume,
  type QuizSessionSnapshot,
} from './quizResume'

const session = (over: Partial<QuizSessionSnapshot> = {}): QuizSessionSnapshot => ({
  status: 'active',
  questions: [{ id: 'p-001' }, { id: 'p-002' }],
  search: '?exam=Probability&count=2',
  ...over,
})

describe('isQuizInProgress', () => {
  it('is true for a started quiz, on a question or reviewing an answer', () => {
    expect(isQuizInProgress(session({ status: 'active' }))).toBe(true)
    expect(isQuizInProgress(session({ status: 'reviewing' }))).toBe(true)
  })

  it('is false before the questions are drawn and once the quiz is finished', () => {
    expect(isQuizInProgress(session({ status: 'idle' }))).toBe(false)
    expect(isQuizInProgress(session({ status: 'loading' }))).toBe(false)
    expect(isQuizInProgress(session({ status: 'complete' }))).toBe(false)
  })

  it('is false with no questions, whatever the status says', () => {
    expect(isQuizInProgress(session({ questions: [] }))).toBe(false)
  })
})

describe('resumesQuiz', () => {
  it('resumes a quiz in progress opened at the URL it was started under', () => {
    expect(resumesQuiz(session(), '?exam=Probability&count=2')).toBe(true)
  })

  it('starts afresh at any other URL', () => {
    expect(resumesQuiz(session(), '?exam=Probability&count=5')).toBe(false)
    expect(resumesQuiz(session(), '')).toBe(false)
  })

  it('never resumes a finished or unstarted session', () => {
    expect(resumesQuiz(session({ status: 'complete' }), '?exam=Probability&count=2')).toBe(false)
    expect(resumesQuiz(session({ status: 'idle' }), '?exam=Probability&count=2')).toBe(false)
  })

  it('compares the query with or without its leading "?"', () => {
    expect(resumesQuiz(session(), 'exam=Probability&count=2')).toBe(true)
    expect(resumesQuiz(session({ search: '' }), '?')).toBe(true)
  })
})

describe('normalizeSearch', () => {
  it('keeps one leading "?" and turns an empty query into ""', () => {
    expect(normalizeSearch('?a=1')).toBe('?a=1')
    expect(normalizeSearch('a=1')).toBe('?a=1')
    expect(normalizeSearch('?')).toBe('')
    expect(normalizeSearch('')).toBe('')
  })
})

describe('quizResumePath', () => {
  it('leads back to /quiz under the same query', () => {
    expect(quizResumePath('?ids=p-004,p-005&timed=1')).toBe('/quiz?ids=p-004,p-005&timed=1')
    expect(quizResumePath('')).toBe('/quiz')
  })
})

describe('showsQuizResume', () => {
  it('shows everywhere but the quiz itself while a quiz is in progress', () => {
    expect(showsQuizResume('/dashboard', true)).toBe(true)
    expect(showsQuizResume('/wiki/concept/variance', true)).toBe(true)
    expect(showsQuizResume('/', true)).toBe(true)
    expect(showsQuizResume('/quiz', true)).toBe(false)
  })

  it('never shows without a quiz in progress', () => {
    expect(showsQuizResume('/dashboard', false)).toBe(false)
  })
})

describe('sessionNoun', () => {
  it('calls a practice exam an exam and anything else a quiz', () => {
    expect(sessionNoun('mock-exam')).toBe('exam')
    expect(sessionNoun('quiz')).toBe('quiz')
  })
})

describe('leaveConsequence', () => {
  it('counts the answers leaving would discard', () => {
    expect(leaveConsequence(1)).toBe('Leaving discards 1 answer.')
    expect(leaveConsequence(7)).toBe('Leaving discards 7 answers.')
  })

  it('says nothing before the first answer', () => {
    expect(leaveConsequence(0)).toBeNull()
  })
})
