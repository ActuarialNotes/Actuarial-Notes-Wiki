import { describe, expect, it } from 'vitest'
import type { ExamSitting } from '../data/examSittings'
import { daysBetween, formatStepDate, sittingTimeline, stepCountdown, type SittingMilestone } from './sittingTimeline'

const oct: ExamSitting = { examId: 'CAS-5', format: 'CBT', startDate: '2026-10-19', endDate: '2026-10-27', registrationDeadline: '2026-08-27' }
const paperDay: ExamSitting = { examId: 'FM', format: 'P/P', startDate: '2026-10-01', endDate: null, registrationDeadline: null }

const results: SittingMilestone = { kind: 'results', label: 'Results release', date: '2026-12-18' }
const opens: SittingMilestone = { kind: 'registration-opens', label: 'Registration opens', date: '2026-06-01' }

describe('sittingTimeline', () => {
  it("carries the sittings row's own dates with nothing transcribed", () => {
    const steps = sittingTimeline(oct, [], '2026-09-27')
    expect(steps.map(s => [s.kind, s.label, s.date, s.endDate])).toEqual([
      ['registration-deadline', 'Registration deadline', '2026-08-27', undefined],
      ['window', 'Exam window', '2026-10-19', '2026-10-27'],
    ])
  })

  it('calls a one-day sitting an exam day', () => {
    expect(sittingTimeline(paperDay, [], '2026-09-27')).toEqual([
      { kind: 'window', label: 'Exam day', date: '2026-10-01', state: 'next' },
    ])
  })

  it('orders transcribed dates among the row’s', () => {
    const steps = sittingTimeline(oct, [results, opens], '2026-09-27')
    expect(steps.map(s => s.kind)).toEqual(['registration-opens', 'registration-deadline', 'window', 'results'])
  })

  it("lets a transcribed window or deadline replace the row's, under the publisher's name", () => {
    const pcpa: ExamSitting = { examId: 'CAS-PCPA', format: 'CBT', startDate: '2026-12-16', endDate: '2026-12-31', registrationDeadline: null }
    const steps = sittingTimeline(pcpa, [
      { kind: 'deadline', label: 'Exam deadline', date: '2026-11-25' },
      { kind: 'registration-deadline', label: 'Registration deadline', date: '2026-12-09' },
      { kind: 'window', label: 'Project window', date: '2026-12-16', endDate: '2026-12-31' },
    ], '2026-09-27')
    expect(steps.map(s => s.label)).toEqual(['Exam deadline', 'Registration deadline', 'Project window'])
  })

  it('marks what has passed, and the one thing coming next', () => {
    const steps = sittingTimeline(oct, [opens, results], '2026-09-27')
    expect(steps.map(s => s.state)).toEqual(['done', 'done', 'next', 'later'])
  })

  it('puts an open window ahead of everything after it', () => {
    const steps = sittingTimeline(oct, [results], '2026-10-21')
    expect(steps.map(s => s.state)).toEqual(['done', 'now', 'later'])
  })

  it('counts a window as open on its first and last day', () => {
    expect(sittingTimeline(oct, [], '2026-10-19')[1].state).toBe('now')
    expect(sittingTimeline(oct, [], '2026-10-27')[1].state).toBe('now')
    expect(sittingTimeline(oct, [], '2026-10-28')[1].state).toBe('done')
  })

  it('leaves nothing next once the last date has passed', () => {
    const steps = sittingTimeline(oct, [results], '2027-01-05')
    expect(steps.every(s => s.state === 'done')).toBe(true)
  })
})

describe('stepCountdown', () => {
  it('counts down to the next step only', () => {
    const [deadline, window] = sittingTimeline(oct, [], '2026-08-20')
    expect(stepCountdown(deadline, '2026-08-20')).toBe('In 7 days')
    expect(stepCountdown(window, '2026-08-20')).toBeNull()
    expect(stepCountdown(sittingTimeline(oct, [], '2026-08-26')[0], '2026-08-26')).toBe('Tomorrow')
  })

  it('says how long an open window has left', () => {
    const at = (today: string) => stepCountdown(sittingTimeline(oct, [], today)[1], today)
    expect(at('2026-10-19')).toBe('Open · 8 days left')
    expect(at('2026-10-26')).toBe('Open · 1 day left')
    expect(at('2026-10-27')).toBe('Last day')
  })

  it('says today for a one-day step that is today', () => {
    expect(stepCountdown(sittingTimeline(paperDay, [], '2026-10-01')[0], '2026-10-01')).toBe('Today')
  })

  it('says nothing about a step that has passed', () => {
    expect(stepCountdown(sittingTimeline(oct, [], '2026-09-27')[0], '2026-09-27')).toBeNull()
  })
})

describe('daysBetween', () => {
  it('counts calendar days across a DST change', () => {
    expect(daysBetween('2026-10-30', '2026-11-02')).toBe(3)
    expect(daysBetween('2026-11-02', '2026-10-30')).toBe(-3)
  })
})

describe('formatStepDate', () => {
  it('writes a day, a span within a month, across months and across years', () => {
    expect(formatStepDate({ date: '2026-11-30' })).toBe('Nov 30, 2026')
    expect(formatStepDate({ date: '2026-10-19', endDate: '2026-10-27' })).toBe('Oct 19–27, 2026')
    expect(formatStepDate({ date: '2026-10-28', endDate: '2026-11-05' })).toBe('Oct 28 – Nov 5, 2026')
    expect(formatStepDate({ date: '2026-12-16', endDate: '2027-01-04' })).toBe('Dec 16, 2026 – Jan 4, 2027')
  })
})
