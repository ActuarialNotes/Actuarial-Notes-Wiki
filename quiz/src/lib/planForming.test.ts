import { describe, it, expect } from 'vitest'
import {
  buildFormingTimeline,
  buildPlanFormingDays,
  peakDailyLoad,
  planFormingStepMs,
  summarizeFormingDays,
  MAX_FORMING_DAYS,
  TOTAL_REVEAL_MS,
} from './planForming'
import { addDays, type ConceptAssignment, type StudyPlan } from './studyPlan'

const TODAY = '2026-03-01'

function assignment(conceptName: string, scheduledDate: string): ConceptAssignment {
  return { conceptName, topicName: 'Ratemaking', scheduledDate, initialState: 'new' }
}

function plan(overrides: Partial<StudyPlan> = {}): StudyPlan {
  return {
    examId: '5',
    generatedDate: TODAY,
    config: { targetReadyDate: addDays(TODAY, 10), targetStrengthLevel: 'strong_all', planStartDate: TODAY },
    todaysConcepts: [],
    assignments: [],
    dayNumber: 1,
    totalDays: 10,
    daysRemaining: 10,
    conceptsPerDay: 2,
    status: 'on_track',
    reviewConcepts: [],
    effectiveReadyDate: addDays(TODAY, 10),
    targetPassedFallback: false,
    ...overrides,
  }
}

describe('buildPlanFormingDays', () => {
  it('runs from today through exam day, one entry per calendar day', () => {
    const days = buildPlanFormingDays({
      plan: plan(),
      examDate: addDays(TODAY, 14),
      today: TODAY,
    })

    expect(days).toHaveLength(15)
    expect(days[0].date).toBe(TODAY)
    expect(days[0].isToday).toBe(true)
    expect(days[14].date).toBe(addDays(TODAY, 14))
    expect(days[14].isExamDay).toBe(true)
    expect(days.filter(d => d.isReadyDay).map(d => d.date)).toEqual([addDays(TODAY, 10)])
  })

  it('groups each day\'s concepts and deduplicates repeats on the same day', () => {
    const days = buildPlanFormingDays({
      plan: plan({
        assignments: [
          assignment('Trend Selection', addDays(TODAY, 1)),
          assignment('Loss Development', addDays(TODAY, 1)),
          assignment('Trend Selection', addDays(TODAY, 1)),
          assignment('Credibility', addDays(TODAY, 3)),
        ],
      }),
      examDate: addDays(TODAY, 5),
      today: TODAY,
    })

    expect(days[1].concepts).toEqual(['Trend Selection', 'Loss Development'])
    expect(days[2].concepts).toEqual([])
    expect(days[3].concepts).toEqual(['Credibility'])
  })

  it('prefers the plan\'s own todaysConcepts over raw assignments for today', () => {
    const days = buildPlanFormingDays({
      plan: plan({
        todaysConcepts: ['Already Worked On'],
        assignments: [assignment('Scheduled Elsewhere', TODAY)],
      }),
      examDate: addDays(TODAY, 3),
      today: TODAY,
    })

    expect(days[0].concepts).toEqual(['Already Worked On'])
  })

  it('marks days past the last scheduled concept as buffer', () => {
    const days = buildPlanFormingDays({
      plan: plan({
        assignments: [assignment('Credibility', addDays(TODAY, 2))],
        effectiveReadyDate: addDays(TODAY, 4),
      }),
      examDate: addDays(TODAY, 5),
      today: TODAY,
    })

    expect(days.map(d => d.isBuffer)).toEqual([false, false, false, true, true, true])
  })

  it('ignores assignments left in the past', () => {
    const days = buildPlanFormingDays({
      plan: plan({
        assignments: [assignment('Stale', addDays(TODAY, -3))],
        effectiveReadyDate: addDays(TODAY, 2),
      }),
      examDate: addDays(TODAY, 2),
      today: TODAY,
    })

    expect(days).toHaveLength(3)
    expect(days.every(d => d.concepts.length === 0)).toBe(true)
  })

  it('falls back to the ready date when there is no exam date', () => {
    const days = buildPlanFormingDays({
      plan: plan({ effectiveReadyDate: addDays(TODAY, 6) }),
      examDate: null,
      today: TODAY,
    })

    expect(days).toHaveLength(7)
    expect(days.some(d => d.isExamDay)).toBe(false)
  })

  it('extends past the ready date when assignments run longer', () => {
    const days = buildPlanFormingDays({
      plan: plan({ assignments: [assignment('Late', addDays(TODAY, 20))] }),
      examDate: null,
      today: TODAY,
    })

    expect(days).toHaveLength(21)
  })

  it('caps the strip so a distant exam can\'t build an enormous grid', () => {
    const days = buildPlanFormingDays({
      plan: plan(),
      examDate: addDays(TODAY, 900),
      today: TODAY,
    })

    expect(days).toHaveLength(MAX_FORMING_DAYS)
  })

  it('always returns at least today', () => {
    const days = buildPlanFormingDays({
      plan: plan({ effectiveReadyDate: TODAY }),
      examDate: null,
      today: TODAY,
    })

    expect(days).toHaveLength(1)
    expect(days[0].isToday).toBe(true)
  })
})

describe('planFormingStepMs', () => {
  it('keeps the whole reveal inside its budget for a typical plan', () => {
    expect(planFormingStepMs(90) * 90).toBeLessThanOrEqual(TOTAL_REVEAL_MS + 90)
  })

  it('never flickers on a long plan or crawls on a short one', () => {
    expect(planFormingStepMs(400)).toBe(14)
    expect(planFormingStepMs(5)).toBe(90)
    expect(planFormingStepMs(0)).toBe(0)
  })
})

describe('buildFormingTimeline', () => {
  function daysWithConceptsOn(offsets: number[], span: number) {
    return buildPlanFormingDays({
      plan: plan({
        assignments: offsets.map(o => assignment('Credibility', addDays(TODAY, o))),
        effectiveReadyDate: addDays(TODAY, span),
      }),
      examDate: addDays(TODAY, span),
      today: TODAY,
    })
  }

  it('reveals the last day first and today last', () => {
    const days = daysWithConceptsOn([1, 2, 3], 5)
    const { delays, durationMs } = buildFormingTimeline(days)

    expect(delays[days.length - 1]).toBe(0)
    expect(delays[0]).toBe(durationMs)
    // Strictly decreasing: every cell lands before the one before it.
    for (let i = 1; i < delays.length; i++) expect(delays[i]).toBeLessThan(delays[i - 1])
  })

  it('spends less time on days with nothing scheduled', () => {
    const days = daysWithConceptsOn([1, 3], 4)
    const { delays } = buildFormingTimeline(days)

    const gapForDay = (i: number) => delays[i] - delays[i + 1]
    // Day 1 and 3 carry concepts; day 2 does not.
    expect(gapForDay(2)).toBeLessThan(gapForDay(1))
    expect(gapForDay(2)).toBeLessThan(gapForDay(3))
  })

  // The 14ms floor wins over the budget on a very long plan — a wave that fast
  // is already at the edge of reading as motion rather than a flicker.
  it('stays close to the reveal budget even for a long plan', () => {
    const days = buildPlanFormingDays({
      plan: plan({
        assignments: Array.from({ length: 200 }, (_, i) => assignment(`C${i}`, addDays(TODAY, i))),
        effectiveReadyDate: addDays(TODAY, 240),
      }),
      examDate: addDays(TODAY, 240),
      today: TODAY,
    })

    expect(buildFormingTimeline(days).durationMs).toBeLessThanOrEqual(TOTAL_REVEAL_MS * 1.25)
  })

  it('handles a one-day and an empty strip', () => {
    expect(buildFormingTimeline([])).toEqual({ delays: [], durationMs: 0 })
    const oneDay = buildFormingTimeline(daysWithConceptsOn([], 0))
    expect(oneDay).toEqual({ delays: [0], durationMs: 0 })
  })
})

describe('summarizeFormingDays / peakDailyLoad', () => {
  it('counts study days and distinct concepts', () => {
    const days = buildPlanFormingDays({
      plan: plan({
        assignments: [
          assignment('Trend Selection', addDays(TODAY, 1)),
          assignment('Loss Development', addDays(TODAY, 1)),
          assignment('Trend Selection', addDays(TODAY, 4)),
        ],
      }),
      examDate: addDays(TODAY, 6),
      today: TODAY,
    })

    expect(summarizeFormingDays(days)).toEqual({ studyDays: 2, concepts: 2 })
    expect(peakDailyLoad(days)).toBe(2)
  })

  it('handles an empty plan', () => {
    const days = buildPlanFormingDays({ plan: plan(), examDate: null, today: TODAY })
    expect(summarizeFormingDays(days)).toEqual({ studyDays: 0, concepts: 0 })
    expect(peakDailyLoad(days)).toBe(0)
  })
})
