import { describe, expect, it } from 'vitest'
import { currentSitting, sittingContains, sittingVersionLabel, type ExamSitting } from './examSittings'

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

describe('sittingVersionLabel', () => {
  it('names a sitting by the month it opens in', () => {
    expect(sittingVersionLabel(nov)).toBe('Nov 2026')
    expect(sittingVersionLabel({ ...sep, startDate: '2025-10-23', endDate: '2026-10-29' })).toBe('Oct 2025')
  })
})
