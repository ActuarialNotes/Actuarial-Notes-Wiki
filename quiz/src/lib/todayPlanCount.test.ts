import { describe, it, expect } from 'vitest'
import { todayPlanCountForExam, questionsNeededForPlan, badgeCountFor } from './todayPlanCount'
import type { StudyPlan } from '@/lib/studyPlan'
import type { Question } from '@/lib/parser'

function makePlan(over: Partial<StudyPlan> = {}): StudyPlan {
  return {
    examId: 'P',
    generatedDate: '2026-07-29',
    config: { targetReadyDate: null, targetStrengthLevel: 'strong_all', planStartDate: null },
    todaysConcepts: [],
    assignments: [],
    dayNumber: 1,
    totalDays: 30,
    daysRemaining: 29,
    conceptsPerDay: 2,
    status: 'on_track',
    reviewConcepts: [],
    effectiveReadyDate: '2026-08-28',
    targetPassedFallback: false,
    ...over,
  }
}

function makeQuestion(id: string, concepts: string[], exam = 'Probability'): Question {
  return {
    id,
    exam,
    topic: 'Topic',
    learning_objective: 'LO',
    difficulty: 'medium',
    type: 'multiple-choice',
    wiki_link: concepts.map(c => `Concepts/${c.replace(/ /g, '+')}.md`),
    answer: 'A',
    explanation: '',
    points: 1,
    stem: '',
    options: [],
  }
}

const QUESTIONS: Question[] = [
  makeQuestion('q1', ['Bayes Theorem']),
  makeQuestion('q2', ['Poisson Distribution']),
  makeQuestion('q3', ['Bayes Theorem', 'Poisson Distribution']),
  makeQuestion('fm1', ['Annuities'], 'Financial Mathematics'),
]

describe('todayPlanCountForExam', () => {
  it('returns nothing when there is no plan', () => {
    expect(todayPlanCountForExam(null, 'Probability', QUESTIONS)).toEqual({ count: 0, complete: false })
  })

  it('returns nothing when today has no concepts scheduled', () => {
    const plan = makePlan({ todaysConcepts: [] })
    expect(todayPlanCountForExam(plan, 'Probability', QUESTIONS)).toEqual({ count: 0, complete: false })
  })

  it('counts the fewest questions that cover today\'s concepts', () => {
    const plan = makePlan({ todaysConcepts: ['Bayes Theorem', 'Poisson Distribution'] })
    // q3 alone covers both concepts.
    expect(todayPlanCountForExam(plan, 'Probability', QUESTIONS)).toEqual({ count: 1, complete: false })
  })

  it('only counts questions from the exam it was asked about', () => {
    const plan = makePlan({ todaysConcepts: ['Annuities'] })
    expect(todayPlanCountForExam(plan, 'Probability', QUESTIONS)).toEqual({ count: 0, complete: false })
    expect(todayPlanCountForExam(plan, 'Financial Mathematics', QUESTIONS).count).toBe(1)
  })

  it('drops concepts already levelled up today', () => {
    const plan = makePlan({ todaysConcepts: ['Bayes Theorem', 'Poisson Distribution'] })
    const done = new Set(['bayes theorem'])
    const result = todayPlanCountForExam(plan, 'Probability', QUESTIONS, done)
    expect(result).toEqual({ count: 1, complete: false })
  })

  it('reports complete once every concept is levelled up, still sizing a re-launch', () => {
    const plan = makePlan({ todaysConcepts: ['Bayes Theorem', 'Poisson Distribution'] })
    const done = new Set(['bayes theorem', 'poisson distribution'])
    const result = todayPlanCountForExam(plan, 'Probability', QUESTIONS, done)
    expect(result.complete).toBe(true)
    expect(result.count).toBe(1) // full plan is still re-launchable for extra practice
  })

  it('uses reviewConcepts in review mode', () => {
    const plan = makePlan({
      status: 'review_mode',
      todaysConcepts: ['Bayes Theorem', 'Poisson Distribution'],
      reviewConcepts: ['Bayes Theorem'],
    })
    expect(todayPlanCountForExam(plan, 'Probability', QUESTIONS).count).toBe(1)
  })

  it('questionsNeededForPlan is the count-only form', () => {
    const plan = makePlan({ todaysConcepts: ['Bayes Theorem'] })
    expect(questionsNeededForPlan(plan, 'Probability', QUESTIONS)).toBe(1)
  })
})

describe('badgeCountFor', () => {
  it('is 0 for a missing exam', () => {
    expect(badgeCountFor(undefined)).toBe(0)
  })

  it('is 0 once the plan is complete, so finished surfaces stop nagging', () => {
    expect(badgeCountFor({ count: 4, complete: true })).toBe(0)
  })

  it('is the outstanding count while work remains', () => {
    expect(badgeCountFor({ count: 4, complete: false })).toBe(4)
  })
})
