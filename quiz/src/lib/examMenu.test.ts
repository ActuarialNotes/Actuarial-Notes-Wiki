import { describe, expect, it } from 'vitest'
import type { ExamSitting } from '@/data/examSittings'
import {
  daysLeftLabel,
  examCountdown,
  examPageIdFromFile,
  examProgressKeyFromFile,
  todaysPlanConcepts,
  todaysPlanRowState,
} from './examMenu'

const sitting = (startDate: string, endDate: string | null = null): ExamSitting => ({
  examId: 'CAS-9',
  format: 'CBT',
  startDate,
  endDate,
  registrationDeadline: null,
})

describe('examProgressKeyFromFile', () => {
  it('keys every vault exam page the way exam_progress does', () => {
    expect(examProgressKeyFromFile('Exam P-1 (SOA)')).toBe('P')
    expect(examProgressKeyFromFile('Exam FM-2 (SOA)')).toBe('FM')
    expect(examProgressKeyFromFile('Exam MAS-I (CAS)')).toBe('MAS-I')
    expect(examProgressKeyFromFile('Exam 5 (CAS)')).toBe('CAS-5')
    expect(examProgressKeyFromFile('Exam 6C (CAS)')).toBe('CAS-6')
    expect(examProgressKeyFromFile('Exam 9 (CAS)')).toBe('CAS-9')
    expect(examProgressKeyFromFile('Exam PCPA (CAS)')).toBe('CAS-PCPA')
  })

  it('ignores a .md extension', () => {
    expect(examProgressKeyFromFile('Exam 9 (CAS).md')).toBe('CAS-9')
  })
})

describe('examPageIdFromFile', () => {
  it('keeps the variant a shared progress key loses', () => {
    expect(examPageIdFromFile('Exam 6C (CAS)')).toBe('6C')
    expect(examPageIdFromFile('Exam 6U (CAS).md')).toBe('6U')
    expect(examPageIdFromFile('Exam P-1 (SOA)')).toBe('P-1')
  })
})

describe('daysLeftLabel', () => {
  it('counts down, then names the last two days, then says it has gone', () => {
    expect(daysLeftLabel(32)).toBe('32 days left')
    expect(daysLeftLabel(2)).toBe('2 days left')
    expect(daysLeftLabel(1)).toBe('Tomorrow')
    expect(daysLeftLabel(0)).toBe('Today')
    expect(daysLeftLabel(-3)).toBe('Passed')
  })
})

describe('examCountdown', () => {
  const today = '2026-09-27'

  it("counts down to the reader's own exam date first", () => {
    const c = examCountdown('2026-10-29', [sitting('2026-10-20', '2026-10-27')], today)
    expect(c).toEqual({ dateLabel: 'Oct 29, 2026', days: 32, label: '32 days left', source: 'exam-date' })
  })

  it('falls back to the next published sitting', () => {
    const c = examCountdown(null, [sitting('2026-10-27', '2026-11-03'), sitting('2027-04-14')], today)
    expect(c).toEqual({ dateLabel: 'Oct 27 – Nov 3, 2026', days: 30, label: '30 days left', source: 'next-sitting' })
  })

  it('says a sitting window that has opened is open, not passed', () => {
    const c = examCountdown(null, [sitting('2026-09-20', '2026-10-02')], today)
    expect(c?.label).toBe('Window open')
  })

  it('still says a passed exam date has passed', () => {
    expect(examCountdown('2026-09-01', [], today)?.label).toBe('Passed')
  })

  it('invents nothing: no date and no sitting is no countdown', () => {
    expect(examCountdown(null, [], today)).toBeNull()
    expect(examCountdown(undefined, [], today)).toBeNull()
  })
})

describe('todaysPlanConcepts', () => {
  const today = '2026-09-27'

  it("returns today's concepts from a plan generated today", () => {
    expect(todaysPlanConcepts({ generatedDate: today, todaysConcepts: ['Loss Cost', 'Quota Share'] }, today))
      .toEqual(['Loss Cost', 'Quota Share'])
  })

  it("is null for yesterday's plan, an empty day, or no plan", () => {
    expect(todaysPlanConcepts({ generatedDate: '2026-09-26', todaysConcepts: ['Loss Cost'] }, today)).toBeNull()
    expect(todaysPlanConcepts({ generatedDate: today, todaysConcepts: [] }, today)).toBeNull()
    expect(todaysPlanConcepts(null, today)).toBeNull()
    expect(todaysPlanConcepts(undefined, today)).toBeNull()
  })
})

describe('todaysPlanRowState', () => {
  const pro = {
    signedIn: true,
    isPro: true,
    subscriptionLoading: false,
    inDevelopment: false,
    tracked: true,
    hasPlanToday: true,
  }

  it("opens today's plan for a Pro reader sitting the exam", () => {
    expect(todaysPlanRowState(pro)).toBe('open')
  })

  it('sends a Pro reader with no plan yet to the Dashboard, which builds one', () => {
    expect(todaysPlanRowState({ ...pro, hasPlanToday: false })).toBe('build')
  })

  it('asks a Pro reader to add an exam they are not sitting', () => {
    expect(todaysPlanRowState({ ...pro, tracked: false, hasPlanToday: false })).toBe('untracked')
  })

  it('is locked for a free or signed-out reader', () => {
    expect(todaysPlanRowState({ ...pro, isPro: false })).toBe('locked')
    expect(todaysPlanRowState({ ...pro, signedIn: false, isPro: false })).toBe('locked')
  })

  it("doesn't flash a lock at a subscriber while their tier loads", () => {
    expect(todaysPlanRowState({ ...pro, isPro: false, subscriptionLoading: true })).toBe('loading')
  })

  it('has nothing to plan on an exam still in development, whoever is asking', () => {
    expect(todaysPlanRowState({ ...pro, inDevelopment: true })).toBe('unavailable')
    expect(todaysPlanRowState({ ...pro, inDevelopment: true, isPro: false })).toBe('unavailable')
  })
})
