import { describe, expect, it } from 'vitest'
import { currentSitting, examWindowFor, selectVersion, sittingContains, sittingKey, sittingVersionLabel, type ExamSitting } from './examSittings'

const sep: ExamSitting = { examId: 'P', format: 'CBT', startDate: '2026-09-10', endDate: '2026-09-21', registrationDeadline: null }
const nov: ExamSitting = { examId: 'P', format: 'CBT', startDate: '2026-11-04', endDate: '2026-11-15', registrationDeadline: null }
const day: ExamSitting = { examId: 'FAM', format: 'P/P', startDate: '2026-10-23', endDate: null, registrationDeadline: null }

describe('sittingContains', () => {
  it('matches any day inside a windowed sitting', () => {
    expect(sittingContains(nov, '2026-11-04')).toBe(true)
    expect(sittingContains(nov, '2026-11-15')).toBe(true)
    expect(sittingContains(nov, '2026-11-16')).toBe(false)
  })

  it('matches only the day of a single-day sitting', () => {
    expect(sittingContains(day, '2026-10-23')).toBe(true)
    expect(sittingContains(day, '2026-10-24')).toBe(false)
  })

  it('never matches a missing date', () => {
    expect(sittingContains(nov, null)).toBe(false)
  })
})

describe('currentSitting', () => {
  it("is the reader's own sitting when their exam date falls in one", () => {
    expect(currentSitting([sep, nov], '2026-11-15')).toBe(nov)
  })

  it('falls back to the next sitting when the date matches none', () => {
    expect(currentSitting([sep, nov], '2026-08-01')).toBe(sep)
    expect(currentSitting([sep, nov], null)).toBe(sep)
  })

  it('is null when no sitting is known', () => {
    expect(currentSitting([], '2026-11-15')).toBeNull()
  })
})

describe('selectVersion', () => {
  const paper: ExamSitting = { examId: 'P', format: 'P/P', startDate: '2026-09-10', endDate: null, registrationDeadline: null }

  it('follows the recorded exam date', () => {
    expect(selectVersion([sep, nov], '2026-11-15', null)).toBe(nov)
  })

  it('uses the pick to say which of two sittings the date means', () => {
    // The paper day sits inside the CBT window: the date alone reads as CBT.
    expect(selectVersion([sep, paper], '2026-09-10', null)).toBe(sep)
    expect(selectVersion([sep, paper], '2026-09-10', sittingKey(paper))).toBe(paper)
  })

  it('does not let a pick override a record that disagrees with it', () => {
    expect(selectVersion([sep, nov], '2026-11-15', sittingKey(sep))).toBe(nov)
  })

  it('takes the pick when nothing is recorded, else the next sitting', () => {
    expect(selectVersion([sep, nov], null, sittingKey(nov))).toBe(nov)
    expect(selectVersion([sep, nov], null, null)).toBe(sep)
    expect(selectVersion([sep, nov], null, 'gone|gone|CBT')).toBe(sep)
  })

  it('is null with no sittings', () => {
    expect(selectVersion([], '2026-11-15', null)).toBeNull()
  })
})

describe('sittingVersionLabel', () => {
  it('names a sitting by the month it opens in', () => {
    expect(sittingVersionLabel(nov)).toBe('Nov 2026')
    expect(sittingVersionLabel({ ...sep, startDate: '2025-10-23', endDate: '2026-10-29' })).toBe('Oct 2025')
  })
})

describe('examWindowFor', () => {
  const paper: ExamSitting = { examId: 'P', format: 'P/P', startDate: '2026-09-10', endDate: null, registrationDeadline: null }
  const span: ExamSitting = { examId: 'FAM', format: 'CBT', startDate: '2025-10-23', endDate: '2026-10-29', registrationDeadline: null }

  it('is the window the exam date falls in', () => {
    expect(examWindowFor('P', '2026-11-10', [sep, nov])).toEqual({ start: '2026-11-04', end: '2026-11-15' })
  })

  it('is null for a date in no window, or no date at all', () => {
    expect(examWindowFor('P', '2026-10-01', [sep, nov])).toBeNull()
    expect(examWindowFor('P', null, [sep, nov])).toBeNull()
  })

  it("belongs to the reader's exam only", () => {
    expect(examWindowFor('FM', '2026-11-10', [sep, nov])).toBeNull()
  })

  it('takes the CBT window over a paper day inside it', () => {
    expect(examWindowFor('P', '2026-09-10', [paper, sep])).toEqual({ start: '2026-09-10', end: '2026-09-21' })
  })

  it('treats a single-day sitting as no window', () => {
    expect(examWindowFor('P', '2026-09-10', [paper])).toBeNull()
  })

  it('ignores a registration span of more than a month', () => {
    expect(examWindowFor('FAM', '2026-07-01', [span])).toBeNull()
  })

  it('finds the published CAS-5 window from the sittings table', () => {
    expect(examWindowFor('CAS-5', '2026-10-27')).toEqual({ start: '2026-10-19', end: '2026-10-27' })
  })
})
