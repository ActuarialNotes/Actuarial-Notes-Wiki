import { describe, it, expect } from 'vitest'
import {
  deriveTodaysConcepts,
  describePacing,
  localDateHour,
  formatHourLabel,
  planQuizPath,
  MAX_QUIZ_LINK_CONCEPTS,
  type EmailPlanSnapshot,
} from './dailyEmail'

const plan = (overrides: Partial<EmailPlanSnapshot>): EmailPlanSnapshot => ({
  generatedDate: '2026-07-20',
  todaysConcepts: ['Cached A', 'Cached B'],
  assignments: [],
  ...overrides,
})

describe('deriveTodaysConcepts', () => {
  it('uses todaysConcepts verbatim when the cache was generated today', () => {
    const p = plan({
      generatedDate: '2026-07-21',
      todaysConcepts: ['Duration', 'Convexity'],
      assignments: [{ conceptName: 'Should Not Appear', scheduledDate: '2026-07-21' }],
    })
    expect(deriveTodaysConcepts(p, '2026-07-21')).toEqual(['Duration', 'Convexity'])
  })

  it('reconstructs today from the schedule when the cache is from an earlier day', () => {
    const p = plan({
      generatedDate: '2026-07-19',
      assignments: [
        { conceptName: 'Gen Day', scheduledDate: '2026-07-19' },   // that day's list — excluded
        { conceptName: 'Missed', scheduledDate: '2026-07-20' },    // skipped day — catch-up
        { conceptName: 'Today A', scheduledDate: '2026-07-21' },
        { conceptName: 'Today B', scheduledDate: '2026-07-21' },
        { conceptName: 'Tomorrow', scheduledDate: '2026-07-22' },  // future — excluded
      ],
    })
    expect(deriveTodaysConcepts(p, '2026-07-21')).toEqual(['Missed', 'Today A', 'Today B'])
  })

  it('dedupes repeat assignments of the same concept (case-insensitive), keeping first', () => {
    const p = plan({
      generatedDate: '2026-07-18',
      assignments: [
        { conceptName: 'Bayes Theorem', scheduledDate: '2026-07-19' },
        { conceptName: 'bayes theorem', scheduledDate: '2026-07-21' },
        { conceptName: 'Variance', scheduledDate: '2026-07-20' },
      ],
    })
    expect(deriveTodaysConcepts(p, '2026-07-21')).toEqual(['Bayes Theorem', 'Variance'])
  })

  it('returns empty for future-dated caches (clock skew) and missing fields', () => {
    expect(deriveTodaysConcepts(plan({ generatedDate: '2026-07-22' }), '2026-07-21')).toEqual([])
    expect(deriveTodaysConcepts({}, '2026-07-21')).toEqual([])
    expect(deriveTodaysConcepts(plan({ generatedDate: '2026-07-19', assignments: undefined }), '2026-07-21')).toEqual([])
  })

  it('ignores malformed assignment entries', () => {
    const p = plan({
      generatedDate: '2026-07-20',
      assignments: [
        { conceptName: undefined, scheduledDate: '2026-07-21' },
        { conceptName: 'Ok', scheduledDate: undefined },
        { conceptName: 'Good', scheduledDate: '2026-07-21' },
      ],
    })
    expect(deriveTodaysConcepts(p, '2026-07-21')).toEqual(['Good'])
  })
})

describe('describePacing', () => {
  it('maps every pacing status to a phrase and unknowns to empty', () => {
    expect(describePacing('on_track')).toContain('on track')
    expect(describePacing('ahead')).toContain('ahead')
    expect(describePacing('behind')).toContain('behind')
    expect(describePacing('review_mode')).toContain('review')
    expect(describePacing('target_passed')).toContain('exam date')
    expect(describePacing(undefined)).toBe('')
    expect(describePacing('unknown')).toBe('')
  })
})

describe('localDateHour', () => {
  // 2026-07-21T03:30:00Z — evening of the 20th in New York (UTC-4 in July)
  const now = new Date('2026-07-21T03:30:00Z')

  it('resolves date and hour in the given timezone', () => {
    expect(localDateHour('UTC', now)).toEqual({ date: '2026-07-21', hour: 3 })
    expect(localDateHour('America/New_York', now)).toEqual({ date: '2026-07-20', hour: 23 })
    expect(localDateHour('Australia/Sydney', now)).toEqual({ date: '2026-07-21', hour: 13 })
  })

  it('falls back to UTC for invalid timezones instead of throwing', () => {
    expect(localDateHour('Not/A_Zone', now)).toEqual({ date: '2026-07-21', hour: 3 })
    expect(localDateHour('', now)).toEqual({ date: '2026-07-21', hour: 3 })
  })
})

describe('formatHourLabel', () => {
  it('formats 24h hours as 12h labels', () => {
    expect(formatHourLabel(0)).toBe('12:00 AM')
    expect(formatHourLabel(8)).toBe('8:00 AM')
    expect(formatHourLabel(12)).toBe('12:00 PM')
    expect(formatHourLabel(17)).toBe('5:00 PM')
    expect(formatHourLabel(23)).toBe('11:00 PM')
  })
})

describe('planQuizPath', () => {
  it("links the exam's bank, today's concepts and the plan draw", () => {
    const path = planQuizPath('P', ['Bayes Theorem', 'Independence'])!
    const params = new URLSearchParams(path.split('?')[1])
    expect(path.startsWith('/quiz?')).toBe(true)
    expect(params.get('exam')).toBe('Probability')
    expect(params.get('concepts')).toBe('Bayes Theorem,Independence')
    expect(params.get('plan')).toBe('1')
    expect(params.get('mode')).toBe('quiz')
    expect(params.get('from')).toBe('email')
  })

  it('uses the bank label, not the progress key, for the CAS exams', () => {
    const params = new URLSearchParams(planQuizPath('CAS-6', ['Solvency'])!.split('?')[1])
    expect(params.get('exam')).toBe('Exam 6C')
  })

  it('drops repeats, blanks and names a comma would split, and caps the list', () => {
    const params = new URLSearchParams(planQuizPath('FM', ['A', 'a', ' ', 'B, C', 'D'])!.split('?')[1])
    expect(params.get('concepts')).toBe('A,D')
    const many = Array.from({ length: MAX_QUIZ_LINK_CONCEPTS + 5 }, (_, i) => `C${i}`)
    const capped = new URLSearchParams(planQuizPath('FM', many)!.split('?')[1])
    expect(capped.get('concepts')!.split(',')).toHaveLength(MAX_QUIZ_LINK_CONCEPTS)
  })

  it('is null with no bank or nothing to quiz', () => {
    expect(planQuizPath('CAS-PCPA', ['Anything'])).toBeNull()
    expect(planQuizPath('P', [])).toBeNull()
  })
})
