import { describe, it, expect } from 'vitest'
import {
  DEFAULT_SECONDS_PER_QUESTION,
  DEFAULT_SESSION_LENGTH,
  PLAN_LENGTH,
  planBudget,
  sessionMinutes,
  buildSession,
  countsSummary,
  learnCandidates,
  lengthFor,
  lengthFromStored,
  planTickPct,
  readSession,
  reviewCandidates,
  secondsPerQuestion,
  sessionBudget,
  sessionConceptKeys,
  sessionCounts,
  sessionFromStored,
  sessionIsCurrent,
  sessionRemaining,
  sessionWalk,
  splitSession,
  weekOf,
  weeksAround,
  planDayView,
  dayPractice,
  dayNote,
  weekSummary,
  withLength,
  type ConceptStanding,
  type SessionFacts,
} from './todaySession'
import { EXAM_PACE } from './quizTiming'

const NOTHING: SessionFacts = {
  isOutstanding: () => true,
  answeredToday: () => false,
  conceptAttempted: () => false,
  conceptAchieved: () => false,
  conceptOfMistake: () => null,
}

describe('the session length', () => {
  it('is today\'s plan until the reader picks a length', () => {
    expect(lengthFromStored(null)).toEqual({ everyDay: PLAN_LENGTH })
    expect(lengthFromStored({ everyDay: 7 })).toEqual({ everyDay: PLAN_LENGTH })
    expect(lengthFromStored({ everyDay: 25 })).toEqual({ everyDay: DEFAULT_SESSION_LENGTH })
  })

  it('keeps a choice for every day, or for today alone', () => {
    const every = withLength({ everyDay: 25 }, 45, '2026-11-23', true)
    expect(every).toEqual({ everyDay: 45 })
    const once = withLength(every, 10, '2026-11-23', false)
    expect(lengthFor(once, '2026-11-23')).toBe(10)
    expect(lengthFor(once, '2026-11-24')).toBe(45)
  })

  it('drops a stored value it cannot read', () => {
    expect(lengthFromStored({ everyDay: 45, today: { day: 3, minutes: 10 } })).toEqual({ everyDay: 45 })
  })
})

describe('the budget', () => {
  it('is the minutes at the exam\'s own pace per question', () => {
    const each = secondsPerQuestion(EXAM_PACE['Probability'])
    expect(each).toBe(360)
    expect([10, 25, 45, 120].map(m => sessionBudget(m, each))).toEqual([2, 4, 8, 20])
  })

  it('prices a question of a paper paced by the point at the bank\'s average points', () => {
    const pace = EXAM_PACE['Exam 5']
    // 240 minutes over 55 points, 2.5 points a question on average.
    expect(secondsPerQuestion(pace, 2.5)).toBeCloseTo((240 * 60 / 55) * 2.5)
    expect(sessionBudget(25, secondsPerQuestion(pace, 2.5))).toBe(2)
    // With no average to go on, the paper's own points over its question count.
    expect(secondsPerQuestion(EXAM_PACE['Exam ASTAM'])).toBe(1800)
  })

  it('uses the default for an exam with no pace on file, and says so', () => {
    expect(secondsPerQuestion(null)).toBe(DEFAULT_SECONDS_PER_QUESTION)
    expect(sessionBudget(25, secondsPerQuestion(null))).toBe(5)
  })

  it('always holds one question', () => {
    expect(sessionBudget(10, 1800)).toBe(1)
  })
})

describe('the split', () => {
  const plenty = { fix: 99, learn: 99, review: 99 }

  it('gives Fix a third, Learn a third of the rest, Review the rest', () => {
    expect(splitSession(9, plenty)).toEqual({ fix: 3, learn: 2, review: 4 })
    expect(splitSession(4, plenty)).toEqual({ fix: 1, learn: 1, review: 2 })
    expect(splitSession(16, plenty)).toEqual({ fix: 5, learn: 4, review: 7 })
    expect(splitSession(20, plenty)).toEqual({ fix: 7, learn: 4, review: 9 })
  })

  it('spends the whole budget whenever there is that much work', () => {
    for (let n = 1; n <= 40; n++) {
      const s = splitSession(n, plenty)
      expect(s.fix + s.learn + s.review).toBe(n)
    }
  })

  it('gives every step with work at least one question when the budget allows', () => {
    for (let n = 3; n <= 40; n++) {
      const s = splitSession(n, plenty)
      expect(Math.min(s.fix, s.learn, s.review)).toBeGreaterThanOrEqual(1)
    }
    expect(splitSession(2, plenty)).toEqual({ fix: 1, learn: 0, review: 1 })
  })

  it('never lets one step take the budget while another has work waiting', () => {
    const s = splitSession(6, { fix: 50, learn: 1, review: 1 })
    expect(s).toEqual({ fix: 4, learn: 1, review: 1 })
  })

  it('hands a share a step cannot fill to Review, then Fix, then Learn', () => {
    // No mistakes: their third goes to Review.
    expect(splitSession(9, { fix: 0, learn: 99, review: 99 })).toEqual({ fix: 0, learn: 2, review: 7 })
    // Review runs out, then Fix takes what is left.
    expect(splitSession(9, { fix: 99, learn: 99, review: 1 })).toEqual({ fix: 6, learn: 2, review: 1 })
    // A first day: only new concepts.
    expect(splitSession(4, { fix: 0, learn: 99, review: 0 })).toEqual({ fix: 0, learn: 4, review: 0 })
  })

  it('stops at the work there is', () => {
    expect(splitSession(24, { fix: 15, learn: 2, review: 7 })).toEqual({ fix: 15, learn: 2, review: 7 })
    expect(splitSession(40, { fix: 1, learn: 1, review: 0 })).toEqual({ fix: 1, learn: 1, review: 0 })
    expect(splitSession(5, { fix: 0, learn: 0, review: 0 })).toEqual({ fix: 0, learn: 0, review: 0 })
  })
})

describe('a free session\'s concepts', () => {
  const now = new Date('2026-11-23T12:00:00')
  const ago = (days: number) => new Date(now.getTime() - days * 86_400_000).toISOString()
  const dayOf = (iso: string) => iso.slice(0, 10)
  const concepts: ConceptStanding[] = [
    { name: 'A', state: 'new', lastCorrectAt: null },
    { name: 'B', state: 'level3', lastCorrectAt: ago(29) }, // 1 day from stepping down
    { name: 'C', state: 'level1', lastCorrectAt: ago(2) },  // 5 days
    { name: 'D', state: 'forgotten', lastCorrectAt: ago(40) },
    { name: 'E', state: 'level2', lastCorrectAt: ago(11) }, // 3 days
    { name: 'F', state: 'level1', lastCorrectAt: now.toISOString() }, // answered right today
    { name: 'G', state: 'new', lastCorrectAt: null },
  ]

  it('learns the New concepts in the order given', () => {
    expect(learnCandidates(concepts)).toEqual(['A', 'G'])
  })

  it('reviews what is closest to stepping down, a Forgotten concept first', () => {
    expect(reviewCandidates(concepts, now, '2026-11-23', dayOf)).toEqual(['D', 'B', 'E', 'C'])
  })
})

describe('building a session', () => {
  const supply = {
    mistakes: ['q1', 'q2', 'q3', 'q4', 'q5'],
    learn: ['Covariance', 'Joint Probability Function', 'covariance'],
    review: ['Median', 'Covariance', 'Moment', 'Percentile'],
  }

  it('takes the oldest misses and the first concepts, each concept once', () => {
    const s = buildSession('2026-11-23', 25, 25, 6, supply)
    expect(s).toEqual({
      day: '2026-11-23',
      choice: 25,
      minutes: 25,
      fix: ['q1', 'q2'],
      fixOf: 5,
      learn: ['Covariance'],
      review: ['Median', 'Moment', 'Percentile'],
    })
    expect(sessionCounts(6, supply)).toEqual({ fix: 2, learn: 1, review: 3 })
  })

  it('reads back only what it wrote', () => {
    const s = buildSession('2026-11-23', 25, 25, 6, supply)
    expect(sessionFromStored(JSON.parse(JSON.stringify(s)))).toEqual(s)
    expect(sessionFromStored({ day: '2026-11-23', minutes: 30, fix: [], learn: [], review: [] })).toBeNull()
    expect(sessionFromStored({ day: '2026-11-23', minutes: 25, fix: [], learn: [], review: [] }))
      .toEqual({ day: '2026-11-23', choice: 25, minutes: 25, fix: [], fixOf: 0, learn: [], review: [] })
    const plan = buildSession('2026-11-23', PLAN_LENGTH, 35, 6, supply)
    expect(sessionFromStored(JSON.parse(JSON.stringify(plan)))).toEqual(plan)
    expect(sessionFromStored({ day: '2026-11-23', minutes: 25, fix: [1], learn: [], review: [] })).toBeNull()
  })

  it('is kept for its day and its length only', () => {
    const s = buildSession('2026-11-23', 25, 25, 6, supply)
    expect(sessionIsCurrent(s, '2026-11-23', 25)).toBe(true)
    expect(sessionIsCurrent(s, '2026-11-24', 25)).toBe(false)
    expect(sessionIsCurrent(s, '2026-11-23', 45)).toBe(false)
    expect(sessionIsCurrent(null, '2026-11-23', 25)).toBe(false)
    expect(sessionIsCurrent(s, '2026-11-23', PLAN_LENGTH)).toBe(false)
  })
})

describe('a session with a plan', () => {
  const supply = {
    mistakes: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'],
    learn: ['Covariance', 'Correlation'],
    review: [],
    more: { learn: ['Moment', 'Covariance', 'Median'], review: ['Percentile', 'Mode'] },
  }

  it('takes as long as the shortest session holding all of today\'s plan', () => {
    const n = planBudget(supply)
    expect(n).toBe(7)
    expect(sessionCounts(n!, supply)).toEqual({ fix: 5, learn: 2, review: 0 })
    expect(sessionCounts(n! - 1, supply).learn).toBeLessThan(2)
    expect(planBudget({ ...supply, more: undefined })).toBeNull()
    expect(planBudget({ ...supply, learn: [] })).toBeNull()
  })

  it('takes the first of the plan in a shorter session', () => {
    const s = buildSession('2026-11-23', 10, 10, 3, supply)
    expect(s.learn).toEqual(['Covariance'])
    expect(s.review).toEqual([])
  })

  it('finishes the plan and goes on past it in a longer one', () => {
    const s = buildSession('2026-11-23', 45, 45, 16, supply)
    expect(s.learn.slice(0, 2)).toEqual(['Covariance', 'Correlation'])
    expect(s.learn).toContain('Moment')
    expect(s.learn.filter(n => n === 'Covariance')).toHaveLength(1)
    expect(s.review.length).toBeGreaterThan(0)
    expect(s.fix.length + s.learn.length + s.review.length).toBe(16)
    // Each longer length holds more.
    const sizes = [3, 7, 12, 30].map(n => {
      const c = sessionCounts(n, supply)
      return c.fix + c.learn + c.review
    })
    expect(sizes).toEqual([3, 7, 12, 16])
  })
})

describe('minutes for a number of questions', () => {
  it('rounds up to the next five, never under five', () => {
    expect(sessionMinutes(7, 300)).toBe(35)
    expect(sessionMinutes(1, 60)).toBe(5)
    expect(sessionMinutes(3, 340)).toBe(20)
  })
})

describe('reading a session against the day', () => {
  const session = buildSession('2026-11-23', 25, 25, 9, {
    mistakes: Array.from({ length: 15 }, (_, i) => `q${i + 1}`),
    learn: ['Joint Probability Function', 'Covariance'],
    review: ['Set Function', 'Moment', 'Median', 'Percentile'],
  })

  it('lists the steps in the order they are done, Fix saying how many wait', () => {
    const view = readSession(session, NOTHING)
    expect(view.steps.map(s => [s.kind, s.count, s.of])).toEqual([
      ['fix', 3, 15],
      ['learn', 2, null],
      ['review', 4, null],
    ])
    expect(view.questions).toBe(9)
    expect(view.started).toBe(false)
    expect(view.finished).toBe(false)
  })

  it('leaves out a step with nothing in it', () => {
    const first = buildSession('2026-11-23', 10, 10, 3, { mistakes: [], learn: ['Simple Interest', 'Compound Interest', 'Present Value'], review: [] })
    expect(readSession(first, NOTHING).steps.map(s => s.kind)).toEqual(['learn'])
  })

  it('names a miss by the concept behind it', () => {
    const view = readSession(session, { ...NOTHING, conceptOfMistake: id => (id === 'q1' ? 'Variance' : null) })
    expect(view.steps[0].items.map(i => i.concept)).toEqual(['Variance', null, null])
  })

  it('is finished once everything has been tried, whatever was got right', () => {
    const tried: SessionFacts = {
      ...NOTHING,
      isOutstanding: id => id === 'q2',
      answeredToday: () => true,
      conceptAttempted: () => true,
      conceptAchieved: name => name !== 'Percentile',
    }
    const view = readSession(session, tried)
    expect(view.finished).toBe(true)
    expect(view.steps.map(s => [s.kind, s.achieved, s.count])).toEqual([
      ['fix', 2, 3],
      ['learn', 2, 2],
      ['review', 3, 4],
    ])
    expect(sessionRemaining(view)).toEqual({ fixIds: ['q2'], concepts: ['Percentile'] })
  })

  it('is started, not finished, part-way through', () => {
    const view = readSession(session, { ...NOTHING, isOutstanding: id => id !== 'q1' })
    expect(view.started).toBe(true)
    expect(view.finished).toBe(false)
    expect(view.steps[0].finished).toBe(false)
    expect(sessionRemaining(view).fixIds).toEqual(['q2', 'q3'])
  })

  it('walks the concepts its rows name, each once, and outlines the plan\'s on the syllabus', () => {
    const view = readSession(session, { ...NOTHING, conceptOfMistake: () => 'Moment' })
    expect(sessionWalk(view)).toEqual(['Moment', 'Joint Probability Function', 'Covariance', 'Set Function', 'Median', 'Percentile'])
    expect([...sessionConceptKeys(view)]).toEqual(['joint probability function', 'covariance', 'set function', 'moment', 'median', 'percentile'])
    expect(sessionConceptKeys(null).size).toBe(0)
  })
})

describe('words', () => {
  it('says what a length holds', () => {
    expect(countsSummary({ fix: 3, learn: 2, review: 4 })).toBe('3 fix, 2 learn, 4 review')
    expect(countsSummary({ fix: 0, learn: 3, review: 0 })).toBe('3 learn')
    expect(countsSummary({ fix: 0, learn: 0, review: 0 })).toBe('nothing waiting')
  })
})

describe('the week', () => {
  it('runs Monday to Sunday around today', () => {
    // 2026-11-26 is a Thursday.
    const week = weekOf('2026-11-26', new Set(['2026-11-23', '2026-11-24', '2026-11-25', '2026-11-19']))
    expect(week.map(d => d.day)).toEqual([
      '2026-11-23', '2026-11-24', '2026-11-25', '2026-11-26', '2026-11-27', '2026-11-28', '2026-11-29',
    ])
    expect(week.map(d => d.state)).toEqual(['studied', 'studied', 'studied', 'today', 'open', 'open', 'open'])
    expect(weekSummary(week)).toBe('This week: 3 days studied, today not yet')
  })

  it('fills today once it is studied, and starts a Sunday\'s week the Monday before', () => {
    const week = weekOf('2026-11-29', new Set(['2026-11-29']))
    expect(week[0].day).toBe('2026-11-23')
    expect(week[6]).toMatchObject({ isToday: true, state: 'studied' })
    expect(weekSummary(week)).toBe('This week: 1 day studied, today done')
  })
})

describe('the weeks the row scrolls through', () => {
  it('run from the first day studied to the exam date, this week among them', () => {
    const { weeks, current } = weeksAround('2026-11-26', new Set(['2026-11-10', '2026-11-24']), '2026-12-09')
    expect(weeks.map(w => w[0].day)).toEqual(['2026-11-09', '2026-11-16', '2026-11-23', '2026-11-30', '2026-12-07'])
    expect(current).toBe(2)
    expect(weeks[0][1].state).toBe('studied')
    expect(weeks[2][3]).toMatchObject({ isToday: true, state: 'today' })
    expect(weeks[3].every(d => d.state === 'open')).toBe(true)
  })

  it('are this week alone with nothing studied and no date ahead', () => {
    expect(weeksAround('2026-11-26', new Set(), null).weeks).toHaveLength(1)
    expect(weeksAround('2026-11-26', new Set(), '2026-01-01')).toMatchObject({ current: 0 })
    expect(weeksAround('2026-11-26', new Set(), '2026-01-01').weeks).toHaveLength(1)
  })

  it('stop half a year back and a year ahead', () => {
    const { weeks, current } = weeksAround('2026-11-26', new Set(['2020-01-01']), '2030-01-01')
    expect(current).toBe(26)
    expect(weeks).toHaveLength(26 + 1 + 52)
  })
})

describe('another day in the card', () => {
  const plan = {
    status: 'on_track',
    assignments: [
      { conceptName: 'Annuity', scheduledDate: '2026-11-27', initialState: 'new' },
      { conceptName: 'Bond', scheduledDate: '2026-11-27', initialState: 'level1' },
      { conceptName: 'Annuity', scheduledDate: '2026-11-27', initialState: 'new' },
      { conceptName: 'Duration', scheduledDate: '2026-11-28', initialState: 'new' },
    ],
  }

  it('lists a plan day as Learn and Review, nothing done', () => {
    const view = planDayView(plan, '2026-11-27')!
    expect(view.steps.map(s => [s.kind, s.items.map(i => i.concept)])).toEqual([['learn', ['Annuity']], ['review', ['Bond']]])
    expect(view.finished).toBe(false)
    expect(planDayView(plan, '2026-11-29')).toBeNull()
    expect(planDayView(null, '2026-11-27')).toBeNull()
  })

  it('puts everything under Review once the plan only reviews', () => {
    const view = planDayView({ ...plan, status: 'review_mode' }, '2026-11-28')!
    expect(view.steps.map(s => s.kind)).toEqual(['review'])
  })

  it('counts one exam\'s practice on a day', () => {
    const sessions = [
      { exam: 'Exam FM', total_questions: 5, correct_count: 3, completed_at: '2026-11-24T10:00:00' },
      { exam: 'Exam FM', total_questions: 2, correct_count: 2, completed_at: '2026-11-24T18:00:00' },
      { exam: 'Exam P', total_questions: 9, correct_count: 9, completed_at: '2026-11-24T10:00:00' },
      { exam: 'Exam FM', total_questions: 4, correct_count: 1, completed_at: '2026-11-25T10:00:00' },
    ]
    const practice = dayPractice(sessions, 'Exam FM', '2026-11-24', iso => iso.slice(0, 10))
    expect(practice).toEqual({ answered: 7, correct: 5 })
    expect(dayNote('2026-11-24', '2026-11-26', practice, 'Exam FM', true)).toBe('7 questions answered, 5 right.')
  })

  it('says what a day with no list holds', () => {
    const none = { answered: 0, correct: 0 }
    expect(dayNote('2026-11-24', '2026-11-26', none, 'Exam FM', false)).toBe('No practice on Exam FM this day.')
    expect(dayNote('2026-11-28', '2026-11-26', none, 'Exam FM', true)).toBe('Nothing is planned for this day.')
    expect(dayNote('2026-11-28', '2026-11-26', none, 'Exam FM', false)).toBe("This day's session is built when the day comes.")
  })
})

describe('the plan\'s tick', () => {
  it('is a straight line from the plan\'s first day to its ready date', () => {
    expect(planTickPct({ dayNumber: 1, totalDays: 100, status: 'on_track' })).toBe(0)
    expect(planTickPct({ dayNumber: 32, totalDays: 100, status: 'behind' })).toBe(31)
    expect(planTickPct({ dayNumber: 101, totalDays: 100, status: 'ahead' })).toBe(100)
  })

  it('is absent with nothing to be paced against', () => {
    expect(planTickPct(null)).toBeNull()
    expect(planTickPct({ dayNumber: 5, totalDays: 10, status: 'target_passed' })).toBeNull()
    expect(planTickPct({ dayNumber: 5, totalDays: 10, status: 'review_mode' })).toBeNull()
  })
})
