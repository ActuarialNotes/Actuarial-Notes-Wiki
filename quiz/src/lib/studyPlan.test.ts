import { describe, it, expect } from 'vitest'
import { generateStudyPlan, todayISO, addDays, daysBetween, PLAN_CACHE_VERSION, selectQuestionsForCoverage, minQuestionsToCoverConcepts } from './studyPlan'
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

// Weighted syllabus with two topics to test strong_key strategy.
const weightedSyllabus = {
  examId: 'FM-2',
  examLabel: 'Exam FM',
  examTopic: 'Financial Mathematics',
  resources: [],
  topics: [
    {
      name: 'Low Weight Topic',
      weight: '5-10%',
      concepts: [{ name: 'Low Concept', target: 'Low Concept' }],
    },
    {
      name: 'High Weight Topic',
      weight: '40-50%',
      concepts: [{ name: 'High Concept', target: 'High Concept' }],
    },
  ],
} as unknown as WikiExamSyllabus

// Large flat syllabus used to trigger "behind" pacing status.
function largeSyllabus(conceptCount: number): WikiExamSyllabus {
  return {
    examId: 'FM-2',
    examLabel: 'Exam FM',
    examTopic: 'Financial Mathematics',
    resources: [],
    topics: [
      {
        name: 'Big Topic',
        weight: '100%',
        concepts: Array.from({ length: conceptCount }, (_, i) => ({
          name: `Concept ${i + 1}`,
          target: `Concept ${i + 1}`,
        })),
      },
    ],
  } as unknown as WikiExamSyllabus
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

    // "Price" is mastered → it must not be scheduled today as a new/review concept.
    // (It may appear as a future maintenance assignment if its decay window falls
    // within the study period, but that assignment will have initialState 'level3'.)
    expect(plan.todaysConcepts).not.toContain('Price')
    expect(plan.assignments.some(a => a.conceptName === 'Price' && a.initialState !== 'level3')).toBe(false)
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

// ── addDays / daysBetween ─────────────────────────────────────────────────────

describe('addDays', () => {
  it('adds a positive number of days', () => {
    expect(addDays('2026-01-01', 10)).toBe('2026-01-11')
  })

  it('adds zero days (identity)', () => {
    expect(addDays('2026-01-15', 0)).toBe('2026-01-15')
  })

  it('subtracts days with a negative argument', () => {
    expect(addDays('2026-01-11', -10)).toBe('2026-01-01')
  })

  it('crosses month boundaries correctly', () => {
    expect(addDays('2026-01-31', 1)).toBe('2026-02-01')
  })
})

describe('daysBetween', () => {
  it('returns the positive day count when "to" is after "from"', () => {
    expect(daysBetween('2026-01-01', '2026-01-11')).toBe(10)
  })

  it('returns 0 for the same date', () => {
    expect(daysBetween('2026-06-01', '2026-06-01')).toBe(0)
  })

  it('returns a negative count when "to" is before "from"', () => {
    expect(daysBetween('2026-01-11', '2026-01-01')).toBe(-10)
  })

  it('is the inverse of addDays', () => {
    const from = '2026-03-15'
    const to = addDays(from, 17)
    expect(daysBetween(from, to)).toBe(17)
  })
})

// ── Pacing status ─────────────────────────────────────────────────────────────

describe('generateStudyPlan — pacing status', () => {
  it('returns "behind" when needed new concepts per day exceeds MAX_NEW_PER_DAY (5)', () => {
    // 30 concepts, 3 days remaining: neededNewPerDay = ceil(30 / max(1, 3-3)) = 30 > 5
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus: largeSyllabus(30),
      masteryRecords: [],
      config: { ...config, targetReadyDate: addDays(todayISO(), 3) },
      examDate: addDays(todayISO(), 60),
    })
    expect(plan.status).toBe('behind')
  })

  it('returns "on_track" for a comfortable pace', () => {
    // 2 concepts, 30 days remaining: neededNewPerDay = ceil(2/27) = 1 ≤ 5
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [],
      config,
      examDate: addDays(todayISO(), 40),
    })
    expect(plan.status).toBe('on_track')
  })

  it('returns "ahead" when mastered fraction is more than 15% ahead of expected pace', () => {
    // 20-day plan (started 14 days ago, 6 days remain): elapsed fraction = 14/20 = 70%.
    // Mastering 11 of 12 concepts = 91.7% > 70% + 15% = 85% → "ahead".
    const planStartDate = addDays(todayISO(), -14)
    const targetReadyDate = addDays(todayISO(), 6)
    const bigSyllabus = largeSyllabus(12)
    const masteredRecords = Array.from({ length: 11 }, (_, i) =>
      rec(`Concept ${i + 1}`, { state: 'level3', last_correct_at: NOW_ISO }),
    )
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus: bigSyllabus,
      masteryRecords: masteredRecords,
      config: {
        targetReadyDate,
        targetStrengthLevel: 'strong_all',
        planStartDate,
      },
      examDate: addDays(todayISO(), 60),
    })
    expect(plan.status).toBe('ahead')
  })

  it('returns "target_passed" when targetReadyDate is in the past but exam date is future', () => {
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [],
      config: {
        targetReadyDate: addDays(todayISO(), -5),
        targetStrengthLevel: 'strong_all',
        planStartDate: addDays(todayISO(), -10),
      },
      examDate: addDays(todayISO(), 30),
    })
    expect(plan.status).toBe('target_passed')
    expect(plan.effectiveReadyDate).toBe(addDays(todayISO(), 30))
  })
})

// ── Spacing: eligible dates ───────────────────────────────────────────────────

describe('generateStudyPlan — spacing for partially-learned concepts', () => {
  it('schedules a level1 concept today when its eligible date (last_correct_at + 1) is in the past', () => {
    // last_correct_at was 3 days ago → eligible 2 days ago → today is fine
    const lastCorrectAt = addDays(todayISO(), -3) + 'T12:00:00Z'
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [
        rec('Coupon Rate', { state: 'level1', correct_count: 1, last_correct_at: lastCorrectAt }),
      ],
      config,
      examDate: addDays(todayISO(), 40),
    })
    const assignment = plan.assignments.find(
      a => a.conceptName === 'Coupon Rate' && a.initialState === 'level1',
    )
    expect(assignment?.scheduledDate).toBe(todayISO())
  })

  it('schedules a level2 concept at last_correct_at + 2 when that date is in the future', () => {
    // last_correct_at was yesterday → eligible in 1 day from now (yesterday + 2)
    const lastCorrectDate = addDays(todayISO(), -1)
    const lastCorrectAt = lastCorrectDate + 'T12:00:00Z'
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [
        rec('Coupon Rate', { state: 'level2', correct_count: 2, last_correct_at: lastCorrectAt }),
      ],
      config,
      examDate: addDays(todayISO(), 40),
    })
    const assignment = plan.assignments.find(
      a => a.conceptName === 'Coupon Rate' && a.initialState === 'level2',
    )
    expect(assignment?.scheduledDate).toBe(addDays(lastCorrectDate, 2))
  })
})

// ── New concept pipeline: 3 staged assignments ────────────────────────────────

describe('generateStudyPlan — new concept pipeline', () => {
  it('generates exactly 3 assignments for a new concept (intro, level1→level2, level2→level3)', () => {
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [],
      config,
      examDate: addDays(todayISO(), 40),
    })
    const couponAssignments = plan.assignments.filter(a => a.conceptName === 'Coupon Rate')
    expect(couponAssignments.length).toBe(3)
    const states = couponAssignments.map(a => a.initialState).sort()
    expect(states).toEqual(['level1', 'level2', 'new'].sort())
  })

  it('stages intro on D, level1→level2 on D+1, level2→level3 on D+3', () => {
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [],
      config,
      examDate: addDays(todayISO(), 40),
    })
    const couponAssignments = plan.assignments.filter(a => a.conceptName === 'Coupon Rate')
    const introDate = couponAssignments.find(a => a.initialState === 'new')?.scheduledDate
    const l1Date = couponAssignments.find(a => a.initialState === 'level1')?.scheduledDate
    const l2Date = couponAssignments.find(a => a.initialState === 'level2')?.scheduledDate
    expect(introDate).toBeDefined()
    expect(l1Date).toBe(addDays(introDate!, 1))
    expect(l2Date).toBe(addDays(introDate!, 3))
  })

  it('does not schedule the same concept more than once per day in todaysConcepts', () => {
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [],
      config,
      examDate: addDays(todayISO(), 40),
    })
    const unique = new Set(plan.todaysConcepts)
    expect(unique.size).toBe(plan.todaysConcepts.length)
  })
})

// ── todaysLevelUps grounding ──────────────────────────────────────────────────

describe('generateStudyPlan — todaysLevelUps grounding', () => {
  it('surfaces leveled-up concepts first in todaysConcepts', () => {
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [],
      config,
      examDate: addDays(todayISO(), 40),
      todaysLevelUps: ['Coupon Rate'],
    })
    if (plan.todaysConcepts.length > 0) {
      expect(plan.todaysConcepts[0]).toBe('Coupon Rate')
    }
  })

  it('caps todaysConcepts at the original count when todaysLevelUps exceeds it', () => {
    const baselineCount = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [],
      config,
      examDate: addDays(todayISO(), 40),
    }).todaysConcepts.length

    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [],
      config,
      examDate: addDays(todayISO(), 40),
      todaysLevelUps: ['Price', 'Coupon Rate', 'Extra Concept', 'Another One'],
    })
    expect(plan.todaysConcepts.length).toBe(baselineCount)
  })
})

// ── strong_key strategy ───────────────────────────────────────────────────────

describe('generateStudyPlan — strong_key strategy', () => {
  it('schedules high-weight topic concepts before low-weight concepts', () => {
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus: weightedSyllabus,
      masteryRecords: [],
      config: { ...config, targetStrengthLevel: 'strong_key' },
      examDate: addDays(todayISO(), 40),
    })
    const todayAssignments = plan.assignments
      .filter(a => a.scheduledDate === todayISO())
      .map(a => a.conceptName)
    // "High Concept" (weight 45%) should appear before "Low Concept" (weight 7.5%)
    const highIdx = todayAssignments.indexOf('High Concept')
    const lowIdx = todayAssignments.indexOf('Low Concept')
    if (highIdx >= 0 && lowIdx >= 0) {
      expect(highIdx).toBeLessThan(lowIdx)
    } else {
      // At minimum, high-weight concept must be scheduled
      expect(todayAssignments).toContain('High Concept')
    }
  })
})

// ── Proactive maintenance for level3 concepts approaching decay ───────────────

describe('generateStudyPlan — level3 decay prevention', () => {
  it('schedules a maintenance review within 7 days before a level3 concept decays', () => {
    // last_correct_at was 24 days ago → decays in 6 days → deadline = today + 5
    const lastCorrectDate = addDays(todayISO(), -24)
    const lastCorrectAt = lastCorrectDate + 'T12:00:00Z'
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [
        rec('Bond Price', { state: 'level3', correct_count: 3, last_correct_at: lastCorrectAt }),
      ],
      config,  // targetReadyDate = today + 30
      examDate: addDays(todayISO(), 40),
    })
    const maintenanceAssignment = plan.assignments.find(
      a => a.conceptName === 'Price' && a.initialState === 'level3',
    )
    expect(maintenanceAssignment).toBeDefined()
    // Must be scheduled no later than the day before decay (today + 5)
    expect(maintenanceAssignment!.scheduledDate <= addDays(todayISO(), 5)).toBe(true)
  })

  it('does not schedule maintenance for a level3 concept that decays on or after the target date', () => {
    // last_correct_at = today → decays in 30 days = exactly on the target date → skip
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [rec('Bond Price', { state: 'level3', correct_count: 3, last_correct_at: NOW_ISO })],
      config,  // targetReadyDate = today + 30
      examDate: addDays(todayISO(), 40),
    })
    expect(plan.assignments.some(a => a.conceptName === 'Price' && a.initialState === 'level3')).toBe(false)
  })

  it('schedules the most urgent level3 concept first when multiple approach decay', () => {
    const urgent = addDays(todayISO(), -27) + 'T12:00:00Z'   // decays in 3 days
    const lessSo = addDays(todayISO(), -22) + 'T12:00:00Z'   // decays in 8 days
    const bigSyllabus = largeSyllabus(2)
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus: bigSyllabus,
      masteryRecords: [
        rec('Concept 1', { state: 'level3', correct_count: 3, last_correct_at: urgent }),
        rec('Concept 2', { state: 'level3', correct_count: 3, last_correct_at: lessSo }),
      ],
      config,
      examDate: addDays(todayISO(), 40),
    })
    const a1 = plan.assignments.find(a => a.conceptName === 'Concept 1' && a.initialState === 'level3')
    const a2 = plan.assignments.find(a => a.conceptName === 'Concept 2' && a.initialState === 'level3')
    expect(a1).toBeDefined()
    expect(a2).toBeDefined()
    // The more urgent concept must be scheduled no later than the less urgent one
    expect(a1!.scheduledDate <= a2!.scheduledDate).toBe(true)
  })
})

// ── Even daily load distribution ─────────────────────────────────────────────

describe('generateStudyPlan — even load distribution', () => {
  it('spreads converging level2 concepts across days instead of piling them on one day', () => {
    // 10 concepts all at level2 with the same last_correct_at 2 days ago → all eligible today.
    // With 30 days remaining and 10 sessions total, targetDailyLoad = ceil(10/30) = 1.
    // Each should be assigned to a different day rather than all landing on today.
    const lastCorrectAt = addDays(todayISO(), -2) + 'T12:00:00Z'
    const bigSyllabus = largeSyllabus(10)
    const masteryRecords = Array.from({ length: 10 }, (_, i) =>
      rec(`Concept ${i + 1}`, { state: 'level2', correct_count: 2, last_correct_at: lastCorrectAt }),
    )
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus: bigSyllabus,
      masteryRecords,
      config,
      examDate: addDays(todayISO(), 40),
    })
    const countByDay = new Map<string, number>()
    for (const a of plan.assignments) {
      countByDay.set(a.scheduledDate, (countByDay.get(a.scheduledDate) ?? 0) + 1)
    }
    const maxOnAnyDay = Math.max(...countByDay.values())
    // With 10 concepts spread across 30 days, no day should have more than 2 sessions
    expect(maxOnAnyDay).toBeLessThanOrEqual(2)
    // All 10 concepts must still be scheduled
    expect(plan.assignments.length).toBe(10)
  })

  it('does not assign more sessions per day than targetDailyLoad for new concepts', () => {
    // 20 new concepts, 30 days remaining → totalSessions = 60, targetDailyLoad = 2
    const bigSyllabus = largeSyllabus(20)
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus: bigSyllabus,
      masteryRecords: [],
      config,
      examDate: addDays(todayISO(), 40),
    })
    const countByDay = new Map<string, number>()
    for (const a of plan.assignments) {
      countByDay.set(a.scheduledDate, (countByDay.get(a.scheduledDate) ?? 0) + 1)
    }
    const targetDailyLoad = Math.ceil((20 * 3) / 30)
    for (const [, count] of countByDay) {
      expect(count).toBeLessThanOrEqual(targetDailyLoad)
    }
  })
})

// ── Review concepts: oldest-first sorting ─────────────────────────────────────

describe('generateStudyPlan — reviewConcepts order', () => {
  it('sorts review concepts oldest last_correct_at first in review_mode', () => {
    const oldDate = addDays(todayISO(), -20) + 'T12:00:00Z'
    const newDate = addDays(todayISO(), -2) + 'T12:00:00Z'
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [
        rec('Bond Price', { state: 'level3', last_correct_at: newDate }),
        rec('Coupon Rate', { state: 'level3', last_correct_at: oldDate }),
      ],
      config,
      examDate: addDays(todayISO(), 40),
    })
    expect(plan.status).toBe('review_mode')
    // Oldest (Coupon Rate) should appear first in reviewConcepts
    expect(plan.reviewConcepts[0]).toBe('Coupon Rate')
  })

  it('caps reviewConcepts at 5 in review_mode', () => {
    const bigSyllabus = largeSyllabus(10)
    const masteredAll = Array.from({ length: 10 }, (_, i) =>
      rec(`Concept ${i + 1}`, { state: 'level3', last_correct_at: NOW_ISO }),
    )
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus: bigSyllabus,
      masteryRecords: masteredAll,
      config,
      examDate: addDays(todayISO(), 40),
    })
    expect(plan.status).toBe('review_mode')
    expect(plan.reviewConcepts.length).toBeLessThanOrEqual(5)
  })

  it('caps reviewConcepts at 3 in normal (non-review) mode', () => {
    // Only one concept mastered, one unmastered → not review_mode
    const plan = generateStudyPlan({
      examId: 'FM',
      syllabus,
      masteryRecords: [rec('Bond Price', { state: 'level3', last_correct_at: NOW_ISO })],
      config,
      examDate: addDays(todayISO(), 40),
    })
    expect(plan.status).not.toBe('review_mode')
    expect(plan.reviewConcepts.length).toBeLessThanOrEqual(3)
  })
})

describe('selectQuestionsForCoverage', () => {
  const q = (id: string, ...concepts: string[]) => ({ id, wiki_link: concepts })

  it('covers every concept when count equals the number of concepts', () => {
    const concepts = ['Accumulated Value', 'Accumulation Function', 'Annuity Due', 'Discount Rate', 'Effective Discount Rate']
    // Two questions double up on the first two concepts; the rest are single-concept.
    const questions = [
      q('q1', 'Accumulated Value', 'Accumulation Function'),
      q('q2', 'Accumulated Value', 'Accumulation Function'),
      q('q3', 'Annuity Due'),
      q('q4', 'Discount Rate'),
      q('q5', 'Effective Discount Rate'),
      q('q6', 'Accumulated Value'),
    ]

    const selected = selectQuestionsForCoverage(questions, concepts, 5)

    expect(selected).toHaveLength(5)
    const covered = new Set(selected.flatMap(s => s.wiki_link))
    for (const c of concepts) expect(covered.has(c)).toBe(true)
  })

  it('maximizes concept coverage when count is less than the number of concepts', () => {
    const concepts = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5']
    const questions = [
      q('multi-a', 'Topic 1', 'Topic 2', 'Topic 3'),
      q('multi-b', 'Topic 4', 'Topic 5'),
      q('single', 'Topic 1'),
    ]

    const selected = selectQuestionsForCoverage(questions, concepts, 3)

    expect(selected).toHaveLength(3)
    const covered = new Set(selected.flatMap(s => s.wiki_link))
    for (const c of concepts) expect(covered.has(c)).toBe(true)
    // The two multi-concept questions alone cover everything; greedy should pick both.
    expect(selected.some(s => s.id === 'multi-a')).toBe(true)
    expect(selected.some(s => s.id === 'multi-b')).toBe(true)
  })

  it('returns at most the available questions when the pool is smaller than count', () => {
    const concepts = ['Topic 1', 'Topic 2', 'Topic 3']
    const questions = [q('q1', 'Topic 1'), q('q2', 'Topic 2')]

    const selected = selectQuestionsForCoverage(questions, concepts, 5)

    expect(selected).toHaveLength(2)
  })

  it('returns an empty array when count is 0', () => {
    const concepts = ['Topic 1']
    const questions = [q('q1', 'Topic 1')]

    expect(selectQuestionsForCoverage(questions, concepts, 0)).toHaveLength(0)
  })

  it('returns the minimum covering set (no padding) when count is omitted', () => {
    const concepts = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5']
    const questions = [
      q('multi-a', 'Topic 1', 'Topic 2', 'Topic 3'),
      q('multi-b', 'Topic 4', 'Topic 5'),
      q('single-1', 'Topic 1'),
      q('single-2', 'Topic 2'),
      q('single-3', 'Topic 3'),
    ]

    const selected = selectQuestionsForCoverage(questions, concepts)

    // Two multi-concept questions cover all five concepts — nothing extra added.
    expect(selected).toHaveLength(2)
    const covered = new Set(selected.flatMap(s => s.wiki_link))
    for (const c of concepts) expect(covered.has(c)).toBe(true)
  })

  it('only counts coverable concepts (uncovered ones do not inflate the count)', () => {
    const concepts = ['Topic 1', 'Topic 2', 'Unavailable']
    const questions = [q('q1', 'Topic 1', 'Topic 2')]

    expect(minQuestionsToCoverConcepts(questions, concepts)).toBe(1)
  })
})

describe('minQuestionsToCoverConcepts', () => {
  const q = (id: string, ...concepts: string[]) => ({ id, wiki_link: concepts })

  it('is one question per concept when no questions share concepts', () => {
    const concepts = ['A', 'B', 'C']
    const questions = [q('q1', 'A'), q('q2', 'B'), q('q3', 'C')]
    expect(minQuestionsToCoverConcepts(questions, concepts)).toBe(3)
  })

  it('collapses to fewer questions when one question covers several concepts', () => {
    const concepts = ['A', 'B', 'C', 'D']
    const questions = [q('q1', 'A', 'B', 'C'), q('q2', 'D')]
    expect(minQuestionsToCoverConcepts(questions, concepts)).toBe(2)
  })

  it('is zero when there are no questions', () => {
    expect(minQuestionsToCoverConcepts([], ['A', 'B'])).toBe(0)
  })
})
