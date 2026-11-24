import { describe, expect, it } from 'vitest'
import { conceptPracticeUrl, objectivePracticeUrl, questionCountLabel } from './practiceLaunch'

const settings = { mode: 'quiz', reveal: 'during', links: '1', timed: false } as const

describe('practiceLaunch', () => {
  it("opens the search on a concept's questions, named the way the Concepts filter names it", () => {
    expect(conceptPracticeUrl('Bayes Theorem')).toBe('/search?tab=questions&concept=Bayes+Theorem')
    expect(conceptPracticeUrl('Law of Total Probability'))
      .toBe('/search?tab=questions&concept=Law+Of+Total+Probability')
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
