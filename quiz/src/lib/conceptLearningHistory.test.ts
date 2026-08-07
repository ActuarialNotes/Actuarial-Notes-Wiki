import { describe, it, expect } from 'vitest'
import { syntheticDecayEvents, summarizeAttemptedQuestions } from '@/lib/learningHistory'
import {
  DECAY_DAYS_LEVEL1,
  DECAY_DAYS_LEVEL2,
  DECAY_DAYS_LEVEL3,
} from '@/lib/mastery'

const MS_PER_DAY = 24 * 60 * 60 * 1000

// Fixed reference point — all dates are expressed relative to this.
const NOW = new Date('2026-05-01T12:00:00Z')

function daysAgo(days: number): Date {
  return new Date(NOW.getTime() - days * MS_PER_DAY)
}

// ── level3 decay cascade ──────────────────────────────────────────────────────

describe('syntheticDecayEvents — starting from level3', () => {
  it('returns empty when within the 30-day window', () => {
    expect(syntheticDecayEvents('level3', daysAgo(DECAY_DAYS_LEVEL3 - 1), NOW)).toEqual([])
  })

  it('returns empty when exactly 1ms before the 30-day threshold', () => {
    const justBefore = new Date(NOW.getTime() - DECAY_DAYS_LEVEL3 * MS_PER_DAY + 1)
    expect(syntheticDecayEvents('level3', justBefore, NOW)).toEqual([])
  })

  it('returns one event (level3→level2) at exactly 30 days', () => {
    const events = syntheticDecayEvents('level3', daysAgo(DECAY_DAYS_LEVEL3), NOW)
    expect(events.length).toBe(1)
    expect(events[0].from).toBe('level3')
    expect(events[0].to).toBe('level2')
  })

  it('level3→level2 event timestamp is lastCorrectAt + 30 days', () => {
    const lastCorrectAt = daysAgo(DECAY_DAYS_LEVEL3)
    const events = syntheticDecayEvents('level3', lastCorrectAt, NOW)
    const expectedAt = new Date(lastCorrectAt.getTime() + DECAY_DAYS_LEVEL3 * MS_PER_DAY)
    expect(events[0].at.getTime()).toBe(expectedAt.getTime())
  })

  it('cascades level3→level2→level1 after 44 days (30+14)', () => {
    const events = syntheticDecayEvents('level3', daysAgo(DECAY_DAYS_LEVEL3 + DECAY_DAYS_LEVEL2), NOW)
    expect(events.length).toBe(2)
    expect(events[0]).toMatchObject({ from: 'level3', to: 'level2' })
    expect(events[1]).toMatchObject({ from: 'level2', to: 'level1' })
  })

  it('level2→level1 event is anchored from the level3→level2 event, not from lastCorrectAt', () => {
    const lastCorrectAt = daysAgo(DECAY_DAYS_LEVEL3 + DECAY_DAYS_LEVEL2)
    const events = syntheticDecayEvents('level3', lastCorrectAt, NOW)
    const l3decayAt = new Date(lastCorrectAt.getTime() + DECAY_DAYS_LEVEL3 * MS_PER_DAY)
    const l2decayAt = new Date(l3decayAt.getTime() + DECAY_DAYS_LEVEL2 * MS_PER_DAY)
    expect(events[1].at.getTime()).toBe(l2decayAt.getTime())
  })

  it('fully cascades level3→level2→level1→forgotten after 51 days (30+14+7)', () => {
    const days = DECAY_DAYS_LEVEL3 + DECAY_DAYS_LEVEL2 + DECAY_DAYS_LEVEL1  // 51
    const events = syntheticDecayEvents('level3', daysAgo(days), NOW)
    expect(events.length).toBe(3)
    expect(events[2]).toMatchObject({ from: 'level1', to: 'forgotten' })
  })

  it('does not produce more than 3 events even with extreme neglect', () => {
    const events = syntheticDecayEvents('level3', daysAgo(999), NOW)
    expect(events.length).toBe(3)
  })
})

// ── level2 decay cascade ──────────────────────────────────────────────────────

describe('syntheticDecayEvents — starting from level2', () => {
  it('returns empty when within the 14-day window', () => {
    expect(syntheticDecayEvents('level2', daysAgo(DECAY_DAYS_LEVEL2 - 1), NOW)).toEqual([])
  })

  it('returns one event (level2→level1) at exactly 14 days', () => {
    const events = syntheticDecayEvents('level2', daysAgo(DECAY_DAYS_LEVEL2), NOW)
    expect(events.length).toBe(1)
    expect(events[0]).toMatchObject({ from: 'level2', to: 'level1' })
  })

  it('level2→level1 event timestamp is lastCorrectAt + 14 days', () => {
    const lastCorrectAt = daysAgo(DECAY_DAYS_LEVEL2)
    const events = syntheticDecayEvents('level2', lastCorrectAt, NOW)
    const expectedAt = new Date(lastCorrectAt.getTime() + DECAY_DAYS_LEVEL2 * MS_PER_DAY)
    expect(events[0].at.getTime()).toBe(expectedAt.getTime())
  })

  it('cascades level2→level1→forgotten after 21 days (14+7)', () => {
    const events = syntheticDecayEvents('level2', daysAgo(DECAY_DAYS_LEVEL2 + DECAY_DAYS_LEVEL1), NOW)
    expect(events.length).toBe(2)
    expect(events[0]).toMatchObject({ from: 'level2', to: 'level1' })
    expect(events[1]).toMatchObject({ from: 'level1', to: 'forgotten' })
  })

  it('level1→forgotten event is anchored from the level2→level1 event', () => {
    const lastCorrectAt = daysAgo(DECAY_DAYS_LEVEL2 + DECAY_DAYS_LEVEL1)
    const events = syntheticDecayEvents('level2', lastCorrectAt, NOW)
    const l2decayAt = new Date(lastCorrectAt.getTime() + DECAY_DAYS_LEVEL2 * MS_PER_DAY)
    const l1decayAt = new Date(l2decayAt.getTime() + DECAY_DAYS_LEVEL1 * MS_PER_DAY)
    expect(events[1].at.getTime()).toBe(l1decayAt.getTime())
  })
})

// ── level1 decay ──────────────────────────────────────────────────────────────

describe('syntheticDecayEvents — starting from level1', () => {
  it('returns empty when within the 7-day window', () => {
    expect(syntheticDecayEvents('level1', daysAgo(DECAY_DAYS_LEVEL1 - 1), NOW)).toEqual([])
  })

  it('returns empty exactly 1ms before the 7-day threshold', () => {
    const justBefore = new Date(NOW.getTime() - DECAY_DAYS_LEVEL1 * MS_PER_DAY + 1)
    expect(syntheticDecayEvents('level1', justBefore, NOW)).toEqual([])
  })

  it('returns one event (level1→forgotten) at exactly 7 days', () => {
    const events = syntheticDecayEvents('level1', daysAgo(DECAY_DAYS_LEVEL1), NOW)
    expect(events.length).toBe(1)
    expect(events[0]).toMatchObject({ from: 'level1', to: 'forgotten' })
  })

  it('level1→forgotten event timestamp is lastCorrectAt + 7 days', () => {
    const lastCorrectAt = daysAgo(DECAY_DAYS_LEVEL1)
    const events = syntheticDecayEvents('level1', lastCorrectAt, NOW)
    const expectedAt = new Date(lastCorrectAt.getTime() + DECAY_DAYS_LEVEL1 * MS_PER_DAY)
    expect(events[0].at.getTime()).toBe(expectedAt.getTime())
  })
})

// ── non-decaying states ───────────────────────────────────────────────────────

describe('syntheticDecayEvents — non-decaying start states', () => {
  it('returns empty for "new" regardless of elapsed time', () => {
    expect(syntheticDecayEvents('new', daysAgo(999), NOW)).toEqual([])
  })

  it('returns empty for "forgotten" regardless of elapsed time', () => {
    expect(syntheticDecayEvents('forgotten', daysAgo(999), NOW)).toEqual([])
  })
})

// ── summarizeAttemptedQuestions ───────────────────────────────────────────────

function dot(questionId: string, isCorrect: boolean, at: Date) {
  return { questionId, isCorrect, at }
}

describe('summarizeAttemptedQuestions', () => {
  it('returns nothing for no attempts', () => {
    expect(summarizeAttemptedQuestions([])).toEqual([])
  })

  it('rolls repeat attempts on one question into a single row', () => {
    const rows = summarizeAttemptedQuestions([
      dot('q1', false, daysAgo(3)),
      dot('q1', true, daysAgo(1)),
    ])
    expect(rows.length).toBe(1)
    expect(rows[0].attempt_count).toBe(2)
    expect(rows[0].correct_count).toBe(1)
  })

  it('keeps the latest attempt time for a question', () => {
    const latest = daysAgo(1)
    const rows = summarizeAttemptedQuestions([
      dot('q1', true, latest),
      dot('q1', false, daysAgo(5)),
    ])
    expect(rows[0].lastAttemptAt).toEqual(latest)
  })

  it('orders questions by most recent attempt first', () => {
    const rows = summarizeAttemptedQuestions([
      dot('old', true, daysAgo(9)),
      dot('recent', false, daysAgo(1)),
      dot('middle', true, daysAgo(4)),
    ])
    expect(rows.map(r => r.questionId)).toEqual(['recent', 'middle', 'old'])
  })

  it('breaks ties by question id so one quiz session orders stably', () => {
    const sameTime = daysAgo(2)
    const rows = summarizeAttemptedQuestions([
      dot('q-b', true, sameTime),
      dot('q-a', true, sameTime),
    ])
    expect(rows.map(r => r.questionId)).toEqual(['q-a', 'q-b'])
  })

  it('counts an all-wrong question as attempted with zero correct', () => {
    const rows = summarizeAttemptedQuestions([
      dot('q1', false, daysAgo(2)),
      dot('q1', false, daysAgo(1)),
    ])
    expect(rows[0]).toMatchObject({ attempt_count: 2, correct_count: 0 })
  })

  it('ignores attempts with no question id', () => {
    const rows = summarizeAttemptedQuestions([
      dot('', true, daysAgo(1)),
      dot('q1', true, daysAgo(2)),
    ])
    expect(rows.map(r => r.questionId)).toEqual(['q1'])
  })
})
