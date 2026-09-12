import { describe, it, expect } from 'vitest'
import { examRowAction, examStatus, isExamBeta, isExamInDevelopment, EXAM_STATUS_LABEL } from './examStatus'
import { wikiExamIdToProgressKey } from './wikiParser'

describe('examStatus', () => {
  it('treats P and FM as ready — no status label', () => {
    expect(examStatus('P')).toBe('ready')
    expect(examStatus('FM')).toBe('ready')
    expect(EXAM_STATUS_LABEL[examStatus('P')]).toBeNull()
  })

  it('treats the exams with a question bank but unfinished material as beta', () => {
    for (const key of ['MAS-I', 'MAS-II', 'CAS-5']) {
      expect(examStatus(key)).toBe('beta')
      expect(isExamBeta(key)).toBe(true)
      expect(isExamInDevelopment(key)).toBe(false)
    }
  })

  it('treats Exams 6-9 as in development, never beta', () => {
    for (const key of ['CAS-6', 'CAS-7', 'CAS-8', 'CAS-9']) {
      expect(examStatus(key)).toBe('development')
      expect(isExamInDevelopment(key)).toBe(true)
      expect(isExamBeta(key)).toBe(false)
      expect(EXAM_STATUS_LABEL[examStatus(key)]).toBe('In Development')
    }
  })

  it('matches the progress keys the exam pages resolve to', () => {
    // The vault's file names, cleaned the way WikiHome/WikiExam clean them.
    const devPages = ['6C', '6U', '7', '8', '9']
    for (const id of devPages) {
      expect(isExamInDevelopment(wikiExamIdToProgressKey(id))).toBe(true)
    }
    expect(isExamInDevelopment(wikiExamIdToProgressKey('5'))).toBe(false)
    expect(isExamInDevelopment(wikiExamIdToProgressKey('P-1'))).toBe(false)
    expect(isExamInDevelopment(wikiExamIdToProgressKey('MAS-II'))).toBe(false)
  })

  it('falls back to beta for an unknown or missing key', () => {
    expect(examStatus(undefined)).toBe('beta')
    expect(examStatus(null)).toBe('beta')
    expect(examStatus('NOPE')).toBe('beta')
  })
})

describe('examRowAction', () => {
  it('offers Add only from Not Started', () => {
    expect(examRowAction('not_started', true)).toBe('add')
  })

  it('never offers Add for a passed exam', () => {
    // The row is struck through with a green tick: "Add" there read as an
    // invitation to start studying for the exam just ticked off.
    expect(examRowAction('completed', true)).toBe('none')
  })

  it('brings Add back when a passed exam is un-ticked', () => {
    // What the status dot does to a passed exam (STATUS_CYCLE in ExamsPopout).
    expect(examRowAction('completed', true)).toBe('none')
    expect(examRowAction('not_started', true)).toBe('add')
  })

  it('offers the exam date while an exam is being studied', () => {
    expect(examRowAction('in_progress', true)).toBe('plan')
  })

  it('offers nothing for an exam there is no material for', () => {
    // In development or not covered yet: the row says so where the button
    // would be, and a study plan over an empty question bank is not a plan.
    for (const status of ['not_started', 'in_progress', 'completed'] as const) {
      expect(examRowAction(status, false)).toBe('none')
    }
  })
})
