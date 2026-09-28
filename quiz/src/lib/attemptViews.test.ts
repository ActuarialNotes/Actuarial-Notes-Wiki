import { describe, expect, it } from 'vitest'
import { ATTEMPT_VIEW_ICON, ATTEMPT_VIEW_LABEL, attemptViewTab, attemptViews, resolveAttemptView } from './attemptViews'

describe('attemptViews', () => {
  it('lists the brief, workspace and report, then submission', () => {
    expect(attemptViews('open')).toEqual(['brief', 'workspace', 'report', 'submit'])
    // A closed window still shows Submit — it says why nothing can go in.
    expect(attemptViews('closed')).toEqual(['brief', 'workspace', 'report', 'submit'])
  })

  it('offers the results in place of submission once submitted', () => {
    expect(attemptViews('submitted')).toEqual(['brief', 'workspace', 'report', 'results'])
  })

  it('names and draws every view', () => {
    for (const view of [...attemptViews('open'), ...attemptViews('submitted')]) {
      expect(ATTEMPT_VIEW_LABEL[view]).toBeTruthy()
      expect(ATTEMPT_VIEW_ICON[view]).toBeTruthy()
    }
  })
})

describe('resolveAttemptView', () => {
  it('opens the view asked for', () => {
    expect(resolveAttemptView('workspace', 'open')).toBe('workspace')
    expect(resolveAttemptView('report', 'submitted')).toBe('report')
  })

  it('opens the brief, or the results once submitted, when none is asked for', () => {
    expect(resolveAttemptView(null, 'open')).toBe('brief')
    expect(resolveAttemptView('nonsense', 'closed')).toBe('brief')
    expect(resolveAttemptView(null, 'submitted')).toBe('results')
  })

  it('has no results before submission', () => {
    expect(resolveAttemptView('results', 'open')).toBe('brief')
    expect(resolveAttemptView('results', 'closed')).toBe('brief')
  })
})

describe('attemptViewTab', () => {
  it('lists Submit as Results on a submitted attempt', () => {
    expect(attemptViewTab('submit', 'submitted')).toBe('results')
    expect(attemptViewTab('submit', 'open')).toBe('submit')
    expect(attemptViewTab('brief', 'submitted')).toBe('brief')
  })

  it('always lands on a view the attempt lists', () => {
    for (const phase of ['open', 'closed', 'submitted'] as const) {
      for (const requested of [null, 'brief', 'workspace', 'report', 'submit', 'results']) {
        expect(attemptViews(phase)).toContain(attemptViewTab(resolveAttemptView(requested, phase), phase))
      }
    }
  })
})
