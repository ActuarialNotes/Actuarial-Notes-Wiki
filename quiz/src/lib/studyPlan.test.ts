import { describe, it, expect } from 'vitest'
import { generateStudyPlan, todayISO, addDays, PLAN_CACHE_VERSION } from './studyPlan'
import { emptyRecord, type ConceptMasteryRecord } from './mastery'
import type { WikiExamSyllabus } from './wikiParser'

// last_correct_at "now" keeps a level3 concept inside the 30-day decay window
// regardless of when the test runs (generateStudyPlan uses real `new Date()`).
const NOW_ISO = new Date().toISOString()

function rec(slug: string, overrides: Partial<ConceptMasteryRecord> = {}): ConceptMasteryRecord {
  return { ...emptyRecord('u1', 'FM', slug), ...overrides }
}

// One topic, one aliased concept ([[Bond Price|Price]]) and one plain concept.
const syllabus = {
  examId: 'FM-2',
  examLabel: 'Exam FM',
  examTopic: 'Financial Mathematics',
  resources: [],
  topics: [
    {
      name: 'Bonds',
      weight: '15-25%',
      concepts: [
        { name: 'Price', target: 'Bond Price' },        // aliased: stored under "Bond Price"
        { name: 'Coupon Rate', target: 'Coupon Rate' },  // plain
      ],
    },
  ],
} as unknown as WikiExamSyllabus

const config = {
  targetReadyDate: addDays(todayISO(), 30),
  targetStrengthLevel: 'strong_all' as const,
  planStartDate: todayISO(),
}

describe('generateStudyPlan — aliased concept mastery', () => {
  it('treats an aliased level3 concept (stored under its target) as mastered, not "new"', () => {
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [rec('Bond Price', { state: 'level3', last_correct_at: NOW_ISO })],
      config,
      examDate: addDays(todayISO(), 40),
    })

    // "Price" is mastered → it must not be scheduled today or appear as an assignment.
    expect(plan.todaysConcepts).not.toContain('Price')
    expect(plan.assignments.some(a => a.conceptName === 'Price')).toBe(false)
    // The plain unmastered concept should be scheduled.
    expect(plan.todaysConcepts).toContain('Coupon Rate')
  })

  it('enters review_mode once every concept (incl. aliased) is level3', () => {
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [
        rec('Bond Price', { state: 'level3', last_correct_at: NOW_ISO }),
        rec('Coupon Rate', { state: 'level3', last_correct_at: NOW_ISO }),
      ],
      config,
      examDate: addDays(todayISO(), 40),
    })
    expect(plan.status).toBe('review_mode')
  })

  it('schedules everything when mastery is empty (matches the un-mastered path)', () => {
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [],
      config,
      examDate: addDays(todayISO(), 40),
    })
    expect(plan.status).not.toBe('review_mode')
    expect(plan.todaysConcepts.length).toBeGreaterThan(0)
  })

  it('stamps the current plan cache version on generated plans', () => {
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [],
      config,
      examDate: addDays(todayISO(), 40),
    })
    expect(plan.planVersion).toBe(PLAN_CACHE_VERSION)
  })
})
