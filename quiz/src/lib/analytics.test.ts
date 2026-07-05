import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  track,
  trackQuizStarted,
  trackUpgradeClicked,
  trackSignup,
  trackFirstQuiz,
  trackConceptCollected,
} from './analytics'

// analytics.ts sends via window.gtag and gates funnel milestones through
// localStorage. Both are absent under Node, so stub them per-test.
let gtag: ReturnType<typeof vi.fn>

beforeEach(() => {
  gtag = vi.fn()
  const memory = new Map<string, string>()
  const storage = {
    getItem: (k: string) => (memory.has(k) ? memory.get(k)! : null),
    setItem: (k: string, v: string) => void memory.set(k, v),
    removeItem: (k: string) => void memory.delete(k),
    clear: () => memory.clear(),
    key: () => null,
    length: 0,
  }
  vi.stubGlobal('window', { gtag })
  vi.stubGlobal('localStorage', storage)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('track', () => {
  it('forwards the event name and params to gtag', () => {
    track('quiz_completed', { mode: 'quiz', exam: 'P', question_count: 10, correct_count: 7 })
    expect(gtag).toHaveBeenCalledWith('event', 'quiz_completed', {
      mode: 'quiz',
      exam: 'P',
      question_count: 10,
      correct_count: 7,
    })
  })

  it('sends param-less events with undefined params', () => {
    track('day2_return')
    expect(gtag).toHaveBeenCalledWith('event', 'day2_return', undefined)
  })

  it('no-ops when gtag is unavailable', () => {
    vi.stubGlobal('window', {})
    expect(() => track('upgrade_clicked')).not.toThrow()
  })
})

describe('engagement wrappers', () => {
  it('trackQuizStarted forwards its params', () => {
    trackQuizStarted({ mode: 'flashcards', exam: 'FM', question_count: 20 })
    expect(gtag).toHaveBeenCalledWith('event', 'quiz_started', {
      mode: 'flashcards',
      exam: 'FM',
      question_count: 20,
    })
  })

  it('trackUpgradeClicked sends the bare event', () => {
    trackUpgradeClicked()
    expect(gtag).toHaveBeenCalledWith('event', 'upgrade_clicked', undefined)
  })
})

describe('activation-funnel wrappers', () => {
  it('trackSignup always fires with the method', () => {
    trackSignup('password')
    expect(gtag).toHaveBeenCalledWith('event', 'signup', { method: 'password' })
  })

  it('trackFirstQuiz fires only once per device', () => {
    trackFirstQuiz({ mode: 'quiz', exam: 'P' })
    trackFirstQuiz({ mode: 'quiz', exam: 'P' })
    const firstQuizCalls = gtag.mock.calls.filter(c => c[1] === 'first_quiz')
    expect(firstQuizCalls).toHaveLength(1)
  })

  it('trackConceptCollected fires only once per device', () => {
    trackConceptCollected({ concept: 'Bayes Theorem' })
    trackConceptCollected({ concept: 'Poisson Distribution' })
    const collectedCalls = gtag.mock.calls.filter(c => c[1] === 'concept_collected')
    expect(collectedCalls).toHaveLength(1)
    expect(collectedCalls[0]![2]).toEqual({ concept: 'Bayes Theorem' })
  })
})
