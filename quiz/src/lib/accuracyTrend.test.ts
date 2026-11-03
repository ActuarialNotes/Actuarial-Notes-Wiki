import { describe, expect, it } from 'vitest'
import {
  accuracyPercent,
  accuracyTrend,
  axisTicks,
  dayQuestions,
  firstAttempts,
  isThin,
  rollingWindow,
  spanChange,
  todaysMisses,
  weakestTopics,
  type AnswerRow,
  type QuestionFacts,
} from './accuracyTrend'

const facts: Record<string, QuestionFacts> = {
  e1: { difficulty: 'easy', topic: 'Trend' },
  m1: { difficulty: 'medium', topic: 'Trend' },
  h1: { difficulty: 'hard', topic: 'Credibility' },
  h2: { difficulty: 'hard', topic: 'Reserving' },
}
const lookup = (id: string) => facts[id]
const dayOf = (iso: string) => iso.slice(0, 10)
const row = (question_id: string, day: string, is_correct: boolean, time = '15:00:00'): AnswerRow =>
  ({ question_id, is_correct, answered_at: `${day}T${time}Z` })
const TODAY = '2026-10-31'

describe('accuracyTrend', () => {
  it('tallies each studied day, oldest first, skipping questions outside the exam', () => {
    const t = accuracyTrend([
      row('h1', '2026-10-30', true),
      row('e1', '2026-10-28', false),
      row('h2', '2026-10-30', true),
      row('other-exam', '2026-10-30', false),
      row('m1', '2026-10-30', false),
    ], lookup, TODAY, { dayOf })
    expect(t.days.map(d => [d.day, d.correct, d.answered])).toEqual([
      ['2026-10-28', 0, 1],
      ['2026-10-30', 2, 3],
    ])
    expect(t.days[1].byDifficulty.hard).toEqual({ answered: 2, correct: 2 })
    expect(t.days[1].byDifficulty.medium).toEqual({ answered: 1, correct: 0 })
  })

  it('splits the span (today included) from the same number of days before it', () => {
    const t = accuracyTrend([
      row('h1', '2026-10-31', true),   // today
      row('h1', '2026-10-25', true),   // 6 days ago — this week
      row('e1', '2026-10-24', false),  // 7 days ago — last week
      row('e1', '2026-10-18', true),   // 13 days ago — last week
      row('e1', '2026-10-17', true),   // 14 days ago — neither
    ], lookup, TODAY, { dayOf, span: 7 })
    expect(t.total.answered).toBe(2)
    expect(t.total.byDifficulty.hard.correct).toBe(2)
    expect(t.previous).toEqual({ answered: 2, correct: 1 })
    expect(t.days.map(d => d.day)).toEqual(['2026-10-25', '2026-10-31'])
  })

  it('has no previous span when the rows do not reach back that far', () => {
    const t = accuracyTrend([row('h1', TODAY, true)], lookup, TODAY, { dayOf, span: 90, history: 91 })
    expect(t.previous).toBeNull()
    expect(accuracyTrend([row('h1', TODAY, true)], lookup, TODAY, { dayOf, span: 30, history: 91 }).previous)
      .toEqual({ answered: 0, correct: 0 })
  })

  it('ignores answers dated after today', () => {
    const t = accuracyTrend([row('h1', '2026-11-02', true)], lookup, TODAY, { dayOf })
    expect(t.days).toEqual([])
    expect(t.total.answered).toBe(0)
  })

  it('pools the rolling line over the window ending at each day, reaching before the span', () => {
    const t = accuracyTrend([
      row('h1', '2026-10-22', true),   // outside a 7-day span, inside the first day's window
      row('h1', '2026-10-25', false),
      row('h1', '2026-10-25', false),
      row('h1', '2026-10-31', true),
    ], lookup, TODAY, { dayOf, span: 7, window: 7 })
    expect(t.rolling).toHaveLength(7)
    expect(t.rolling[0]).toEqual({ day: '2026-10-25', percent: 33 })  // 22nd + 25th
    expect(t.rolling[5].percent).toBe(0)                               // 30th: only the 25th
    expect(t.rolling[6]).toEqual({ day: TODAY, percent: 33 })          // 25th + 31st
  })

  it('leaves the rolling line empty across a week with no answers', () => {
    const t = accuracyTrend([row('h1', '2026-10-01', true)], lookup, TODAY, { dayOf, span: 30 })
    expect(t.rolling.filter(p => p.percent !== null).map(p => p.day))
      .toEqual(['2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05', '2026-10-06', '2026-10-07'])
  })

  it('keeps each day’s answers, newest first', () => {
    const t = accuracyTrend([
      row('h1', TODAY, true, '09:00:00'),
      row('e1', TODAY, false, '11:00:00'),
    ], lookup, TODAY, { dayOf })
    expect(t.days[0].answers.map(a => a.questionId)).toEqual(['e1', 'h1'])
  })
})

describe('accuracyPercent', () => {
  it('rounds, and is null for nothing answered', () => {
    expect(accuracyPercent({ answered: 3, correct: 2 })).toBe(67)
    expect(accuracyPercent({ answered: 0, correct: 0 })).toBeNull()
  })
})

describe('spanChange', () => {
  const rows = (day: string, right: number, wrong: number) => [
    ...Array.from({ length: right }, () => row('h1', day, true)),
    ...Array.from({ length: wrong }, () => row('h1', day, false)),
  ]
  it('is the change in points between the two spans', () => {
    const t = accuracyTrend([...rows('2026-10-30', 7, 3), ...rows('2026-10-22', 2, 8)], lookup, TODAY, { dayOf, span: 7 })
    expect(spanChange(t)).toBe(50)
  })
  it('is null when either span has too few answers', () => {
    const t = accuracyTrend([...rows('2026-10-30', 7, 3), ...rows('2026-10-22', 2, 2)], lookup, TODAY, { dayOf, span: 7 })
    expect(spanChange(t)).toBeNull()
  })
  it('is null when the span before was never fetched', () => {
    const t = accuracyTrend(rows('2026-10-30', 7, 3), lookup, TODAY, { dayOf, span: 90, history: 91 })
    expect(spanChange(t)).toBeNull()
  })
})

describe('weakestTopics', () => {
  it('ranks the topics with misses, worst first, ignoring thin ones', () => {
    const t = accuracyTrend([
      // Trend: 1 of 4
      row('e1', TODAY, true), row('e1', TODAY, false), row('m1', TODAY, false), row('m1', TODAY, false),
      // Credibility: 2 of 3
      row('h1', TODAY, true), row('h1', TODAY, true), row('h1', TODAY, false),
      // Reserving: 0 of 2 — too few to judge
      row('h2', TODAY, false), row('h2', TODAY, false),
    ], lookup, TODAY, { dayOf })
    expect(weakestTopics(t).map(x => [x.topic, x.correct, x.answered])).toEqual([
      ['Trend', 1, 4],
      ['Credibility', 2, 3],
    ])
  })
  it('leaves out a topic with no misses', () => {
    const t = accuracyTrend([row('h1', TODAY, true), row('h1', TODAY, true), row('h1', TODAY, true)], lookup, TODAY, { dayOf })
    expect(weakestTopics(t)).toEqual([])
  })
})

describe('dayQuestions', () => {
  it('lists each question once with its tally that day', () => {
    const t = accuracyTrend([
      row('h1', TODAY, false, '09:00:00'),
      row('e1', TODAY, true, '10:00:00'),
      row('h1', TODAY, true, '11:00:00'),
    ], lookup, TODAY, { dayOf })
    expect(dayQuestions(t.days[0])).toEqual([
      { questionId: 'h1', answered: 2, correct: 1 },
      { questionId: 'e1', answered: 1, correct: 1 },
    ])
  })
})

describe('axisTicks', () => {
  it('labels every day of a week, every week of a month, every month of three', () => {
    expect(axisTicks(7)).toEqual([6, 5, 4, 3, 2, 1, 0])
    expect(axisTicks(30)).toEqual([28, 21, 14, 7, 0])
    expect(axisTicks(90)).toEqual([60, 30, 0])
  })
})

describe('rollingWindow', () => {
  it('pools fewer days than the span, so the line can move inside it', () => {
    expect(rollingWindow(7)).toBe(3)
    expect(rollingWindow(30)).toBe(7)
    expect(rollingWindow(90)).toBe(14)
    for (const span of [7, 30, 90]) expect(rollingWindow(span)).toBeLessThan(span)
  })

  it('is the window a trend pools over by default', () => {
    const t = accuracyTrend([row('h1', '2026-10-28', true)], lookup, TODAY, { dayOf, span: 7 })
    expect(t.window).toBe(3)
    // The 28th reaches the 30th (3 days ending there) but not the 31st.
    expect(t.rolling.map(p => p.percent)).toEqual([null, null, null, 100, 100, 100, null])
  })
})

describe('isThin', () => {
  it('is true under ten answers', () => {
    expect(isThin({ answered: 1, correct: 1 })).toBe(true)
    expect(isThin({ answered: 9, correct: 0 })).toBe(true)
    expect(isThin({ answered: 10, correct: 0 })).toBe(false)
  })
})

describe('todaysMisses', () => {
  it('lists the questions missed at least once today', () => {
    const t = accuracyTrend([
      row('h1', TODAY, false, '09:00:00'),
      row('h1', TODAY, true, '10:00:00'),
      row('e1', TODAY, true, '11:00:00'),
      row('h2', '2026-10-30', false),
    ], lookup, TODAY, { dayOf })
    expect(todaysMisses(t, TODAY).map(q => q.questionId)).toEqual(['h1'])
  })

  it('is empty on a day not studied', () => {
    const t = accuracyTrend([row('h2', '2026-10-30', false)], lookup, TODAY, { dayOf })
    expect(todaysMisses(t, TODAY)).toEqual([])
  })
})

describe('first tries and retries', () => {
  it('splits the span by whether each question had been answered before', () => {
    const t = accuracyTrend([
      row('h1', '2026-10-30', false),             // h1, first ever: a miss
      row('h1', TODAY, true),                     // h1 again: a retry
      row('e1', TODAY, true),                     // e1, answered before the fetch: a retry
      row('m1', TODAY, true),                     // m1, first ever
    ], lookup, TODAY, { dayOf, priorIds: new Set(['e1']) })
    expect(t.attempts).toEqual({
      first: { answered: 2, correct: 1 },
      retry: { answered: 2, correct: 2 },
    })
  })

  it('is null without the history before the fetch', () => {
    expect(accuracyTrend([row('h1', TODAY, true)], lookup, TODAY, { dayOf }).attempts).toBeNull()
  })

  it('takes the earliest row of a question as its first, whatever order the rows come in', () => {
    const late = row('h1', TODAY, true)
    const early = row('h1', '2026-10-01', false)
    expect([...firstAttempts([late, early], new Set())]).toEqual([early])
  })
})
