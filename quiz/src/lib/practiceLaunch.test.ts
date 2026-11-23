import { describe, expect, it } from 'vitest'
import { conceptPracticeUrl, objectivePracticeUrl, questionCountLabel } from './practiceLaunch'

const settings = { mode: 'quiz', reveal: 'during', links: '1', timed: false } as const

describe('practiceLaunch', () => {
  it('starts ten questions on a concept with more, and all of a smaller pool', () => {
    expect(conceptPracticeUrl('Bayes Theorem', 152, settings))
      .toBe('/quiz?concept=Bayes+Theorem&mode=quiz&reveal=during&from=home&links=1&count=10')
    expect(conceptPracticeUrl('Bayes Theorem', 4, settings))
      .toBe('/quiz?concept=Bayes+Theorem&mode=quiz&reveal=during&from=home&links=1')
  })

  it('starts an objective from the exam bank, on its concepts', () => {
    expect(objectivePracticeUrl('Probability', ['Event', 'Sample Space'], 3, settings))
      .toBe('/quiz?exam=Probability&mode=quiz&reveal=during&links=1&concepts=Event%2CSample+Space&count=3')
    expect(objectivePracticeUrl('Probability', ['Event'], 40, { ...settings, timed: true }))
      .toBe('/quiz?exam=Probability&mode=quiz&reveal=during&links=1&timed=1&concepts=Event&count=10')
  })

  it('counts questions in words', () => {
    expect(questionCountLabel(1)).toBe('1 question')
    expect(questionCountLabel(1520)).toBe('1,520 questions')
  })
})
