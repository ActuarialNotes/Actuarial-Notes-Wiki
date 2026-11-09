import { describe, expect, it } from 'vitest'
import type { MasteryState } from './mastery'
import { EXAM_PACE } from './quizTiming'
import {
  buildSessionSteps,
  currentStep,
  MISTAKE_ROWS,
  nextSessionAction,
  sessionMinutes,
  sessionPins,
  sessionWalk,
  type SessionInput,
} from './todaySession'

const SECTIONS: Record<string, string> = {
  'exponential distribution': 'Univariate Random Variables',
  'conditional probability': 'General Probability',
  'joint probability density function': 'Multivariate Random Variables',
  'bayes theorem': 'General Probability',
}

function input(over: Partial<SessionInput> = {}): SessionInput {
  const scheduled: Record<string, MasteryState> = {
    'conditional probability': 'new',
    'joint probability density function': 'new',
    'bayes theorem': 'level2',
  }
  return {
    mistakes: [{ concept: 'Exponential Distribution' }],
    planConcepts: ['Conditional Probability', 'Joint Probability Density Function', 'Bayes Theorem'],
    scheduledStateOf: n => scheduled[n.toLowerCase()] ?? null,
    targetOf: n => (scheduled[n.toLowerCase()] === 'level2' ? 'level3' : 'level1'),
    isDone: () => false,
    sectionOf: n => SECTIONS[n.toLowerCase()] ?? null,
    questionsFor: c => c.length,
    ...over,
  }
}

describe('buildSessionSteps', () => {
  it('orders the day: mistakes, then new concepts, then review', () => {
    const steps = buildSessionSteps(input())
    expect(steps.map(s => [s.number, s.kind, s.title])).toEqual([
      [1, 'mistakes', 'Fix 1 mistake'],
      [2, 'learn', 'Learn 2 new concepts'],
      [3, 'review', 'Review 1 concept'],
    ])
    expect(steps[1].rows.map(r => [r.name, r.section, r.target])).toEqual([
      ['Conditional Probability', 'General Probability', 'level1'],
      ['Joint Probability Density Function', 'Multivariate Random Variables', 'level1'],
    ])
  })

  it('numbers without gaps when a step is empty', () => {
    const steps = buildSessionSteps(input({ mistakes: [] }))
    expect(steps.map(s => [s.number, s.kind])).toEqual([[1, 'learn'], [2, 'review']])
  })

  it('files a concept the plan did not schedule (review mode) under review', () => {
    const steps = buildSessionSteps(input({ mistakes: [], scheduledStateOf: () => null }))
    expect(steps.map(s => s.kind)).toEqual(['review'])
    expect(steps[0].rows).toHaveLength(3)
  })

  it('groups mistakes by concept, most first, and counts the rest in one row', () => {
    const many = [
      ...Array.from({ length: 3 }, () => ({ concept: 'Bayes Theorem' })),
      ...['A', 'B', 'C', 'D', 'E'].map(c => ({ concept: c })),
      { concept: null },
    ]
    const [step] = buildSessionSteps(input({ mistakes: many, planConcepts: [] }))
    expect(step.title).toBe('Fix 9 mistakes')
    expect(step.questions).toBe(9)
    expect(step.rows).toHaveLength(MISTAKE_ROWS + 1)
    expect(step.rows[0]).toMatchObject({ name: 'Bayes Theorem', questions: 3 })
    expect(step.rows.at(-1)).toMatchObject({ name: 'Other questions', questions: 3, section: null })
  })

  it('sizes a plan step by what is left, and marks it done when nothing is', () => {
    const done = new Set(['conditional probability', 'joint probability density function'])
    const steps = buildSessionSteps(input({ isDone: n => done.has(n.toLowerCase()) }))
    const learn = steps.find(s => s.kind === 'learn')!
    expect(learn.done).toBe(true)
    expect(learn.questions).toBe(0)
    expect(learn.rows.every(r => r.done)).toBe(true)
  })
})

describe('the next action', () => {
  it('fixes mistakes first, then the plan, then extra credit', () => {
    const steps = buildSessionSteps(input())
    expect(nextSessionAction(steps)).toBe('mistakes')
    expect(currentStep(steps)?.number).toBe(1)
    const noMistakes = buildSessionSteps(input({ mistakes: [] }))
    expect(nextSessionAction(noMistakes)).toBe('plan')
    const allDone = buildSessionSteps(input({ mistakes: [], isDone: () => true }))
    expect(nextSessionAction(allDone)).toBe('extra')
    expect(currentStep(allDone)).toBeNull()
  })

  it('opens the quiz builder when there is no plan and nothing to fix', () => {
    expect(nextSessionAction(buildSessionSteps(input({ mistakes: [], planConcepts: [] })))).toBe('quiz')
  })
})

describe('timing', () => {
  it('times questions at a per-question exam’s pace', () => {
    // Exam P: 180 minutes over 30 questions.
    expect(sessionMinutes(5, EXAM_PACE['Probability'])).toBe(30)
    expect(sessionMinutes(0, EXAM_PACE['Probability'])).toBeNull()
  })

  it('gives no minutes to an exam paced by the point, or with no pace', () => {
    expect(sessionMinutes(5, EXAM_PACE['Exam 5'])).toBeNull()
    expect(sessionMinutes(5, null)).toBeNull()
  })
})

describe('sessionPins', () => {
  it('pins each syllabus concept with its step’s number', () => {
    const pins = sessionPins(buildSessionSteps(input({ mistakes: [{ concept: 'Bayes Theorem' }, { concept: 'Off syllabus' }] })))
    expect(Object.fromEntries(pins)).toEqual({
      'bayes theorem': 1,
      'conditional probability': 2,
      'joint probability density function': 2,
    })
  })
})

describe('sessionWalk', () => {
  it('walks the rows in the order they are listed, each concept once, skipping the aggregate row', () => {
    const mistakes = [
      { concept: 'Bayes Theorem' },
      ...['A', 'B', 'C', 'D', 'E'].map(c => ({ concept: c })),
    ]
    const steps = buildSessionSteps(input({ mistakes }))
    const walk = sessionWalk(steps)
    const listed = steps.flatMap(s => s.rows).filter(r => !r.aggregate).map(r => r.name)
    expect(steps[0].rows.some(r => r.aggregate)).toBe(true)
    expect(walk).toEqual([...new Set(listed)])
    expect(walk.filter(n => n === 'Bayes Theorem')).toHaveLength(1)
  })
})
