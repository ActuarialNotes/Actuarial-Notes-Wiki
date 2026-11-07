import { describe, expect, it } from 'vitest'
import { difficultySummary, estimateSeconds, formatEstimate, questionsWord, topicPills } from './quizSetup'

describe('estimateSeconds', () => {
  it('times a per-question exam at its pace', () => {
    // MAS-I: 240 minutes for 45 questions.
    const pool = Array.from({ length: 30 }, () => ({ exam: 'Exam MAS-I', points: 1 }))
    expect(estimateSeconds(pool, 10)).toBe(Math.round((240 * 60 / 45) * 10))
  })

  it('averages a per-point exam over the pool', () => {
    const pool = [{ exam: 'Exam 5', points: 1 }, { exam: 'Exam 5', points: 3 }]
    const one = estimateSeconds(pool.slice(0, 1), 1)!
    const three = estimateSeconds(pool.slice(1), 1)!
    expect(estimateSeconds(pool, 2)).toBe(Math.round(one + three))
  })

  it("gives a paper that states its question count each question's share", () => {
    // ALTAM: three hours, six questions — whatever the pool's points.
    const pool = [{ exam: 'Exam ALTAM', points: 8 }, { exam: 'Exam ALTAM', points: 11 }]
    expect(estimateSeconds(pool, 6)).toBe(180 * 60)
    expect(formatEstimate(estimateSeconds(pool, 3)!)).toBe('~1 h 30 min')
  })

  it('says nothing for an empty draw or an exam with no pace', () => {
    expect(estimateSeconds([], 5)).toBeNull()
    expect(estimateSeconds([{ exam: 'Exam MAS-I', points: 1 }], 0)).toBeNull()
    expect(estimateSeconds([{ exam: 'Exam Nowhere', points: 1 }], 3)).toBeNull()
  })
})

describe('formatEstimate', () => {
  it('prints minutes under the hour', () => {
    expect(formatEstimate(20)).toBe('~1 min')
    expect(formatEstimate(53 * 60)).toBe('~53 min')
  })

  it('prints hours, and the minutes to the nearest five', () => {
    expect(formatEstimate(240 * 60)).toBe('~4 h')
    expect(formatEstimate(76 * 60)).toBe('~1 h 15 min')
    expect(formatEstimate(119 * 60)).toBe('~2 h')
  })
})

describe('topicPills', () => {
  const groups = [
    { name: 'A. Probability Models', subtopics: ['Poisson Process', 'Hazard Rate'] },
    { name: 'C. Extended Linear Models', subtopics: ['AIC', 'Deviance', 'Link Function'] },
  ]

  it('reads nothing picked, or everything, as all topics', () => {
    expect(topicPills(groups, [])).toEqual({ labels: ['All topics'], more: 0 })
    expect(topicPills(groups, ['Poisson Process', 'Hazard Rate', 'AIC', 'Deviance', 'Link Function']))
      .toEqual({ labels: ['All topics'], more: 0 })
  })

  it('names a whole objective once, then the loose concepts in syllabus order', () => {
    expect(topicPills(groups, ['Poisson Process', 'Link Function', 'Deviance', 'AIC']))
      .toEqual({ labels: ['C. Extended Linear Models', 'Poisson Process'], more: 0 })
    expect(topicPills(groups, ['Link Function', 'Poisson Process']))
      .toEqual({ labels: ['Poisson Process', 'Link Function'], more: 0 })
  })

  it('caps the pills and counts the rest', () => {
    expect(topicPills(groups, ['AIC', 'Deviance', 'Poisson Process', 'Old Concept'], 2))
      .toEqual({ labels: ['Poisson Process', 'AIC'], more: 2 })
  })
})

describe('difficultySummary', () => {
  it('names the levels picked, easiest first', () => {
    expect(difficultySummary(['medium', 'easy'])).toBe('Easy + Medium')
    expect(difficultySummary(['hard'])).toBe('Hard')
    expect(difficultySummary(['easy', 'medium', 'hard'])).toBe('All levels')
  })
})

describe('questionsWord', () => {
  it('agrees with the count', () => {
    expect(questionsWord(1)).toBe('question')
    expect(questionsWord(3)).toBe('questions')
  })
})
