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

  it('opens the overview, or the results once submitted, when none is asked for', () => {
    expect(resolveAttemptView(null, 'open')).toBe('overview')
    expect(resolveAttemptView('nonsense', 'closed')).toBe('overview')
    expect(resolveAttemptView(null, 'submitted')).toBe('results')
  })

  it('has no results before submission, and no overview after it', () => {
    expect(resolveAttemptView('results', 'open')).toBe('overview')
    expect(resolveAttemptView('results', 'closed')).toBe('overview')
    expect(resolveAttemptView('overview', 'submitted')).toBe('results')
    expect(resolveAttemptView('overview', 'open')).toBe('overview')
  })
})

describe('attemptViewTab', () => {
  it('lists Submit as Results on a submitted attempt', () => {
    expect(attemptViewTab('submit', 'submitted')).toBe('results')
    expect(attemptViewTab('submit', 'open')).toBe('submit')
    expect(attemptViewTab('brief', 'submitted')).toBe('brief')
  })

  it('lands every view but the overview on one the switcher lists', () => {
    for (const phase of ['open', 'closed', 'submitted'] as const) {
      for (const requested of ['brief', 'workspace', 'report', 'submit']) {
        expect(attemptViews(phase)).toContain(attemptViewTab(resolveAttemptView(requested, phase), phase))
      }
    }
  })
})
