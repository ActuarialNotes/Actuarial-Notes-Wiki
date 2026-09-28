import { describe, it, expect } from 'vitest'
import {
  syntheticDecayEvents,
  summarizeAttemptedQuestions,
  trackLevelTimeline,
  combineLevelTimelines,
  conceptLevelHistory,
  levelAtTime,
} from '@/lib/learningHistory'
import type { LevelEvent, MasteryTrack } from '@/lib/learningHistory'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
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

// ── one concept across several exams ─────────────────────────────────────────

function ev(at: Date, from: MasteryState, to: MasteryState): LevelEvent {
  return { at, from, to }
}

function row(state: MasteryState, lastCorrectAt: Date | null, lastAttemptedAt: Date | null = lastCorrectAt): ConceptMasteryRecord {
  return {
    user_id: 'u', exam_id: 'P', concept_slug: 'Probability',
    state,
    correct_count: 0, incorrect_streak: 0, hard_correct_count: 0,
    last_correct_at: lastCorrectAt?.toISOString() ?? null,
    last_attempted_at: lastAttemptedAt?.toISOString() ?? null,
  }
}

function track(events: LevelEvent[], record: ConceptMasteryRecord | null, lastAttemptAt: Date | null = null): MasteryTrack {
  return { events, record, lastAttemptAt }
}

describe('conceptLevelHistory — a concept shared by two exams', () => {
  // Level 2 on one exam, then a first correct answer on the other: that exam's
  // New → Level 1 must not read as the concept falling from 2 to 1.
  const examA = track(
    [ev(daysAgo(12), 'new', 'level1'), ev(daysAgo(9), 'level1', 'level2')],
    row('level2', daysAgo(6)),
  )
  const examB = track([ev(daysAgo(1), 'new', 'level1')], row('level1', daysAgo(1)))

  it('never drops on the other exam\'s first correct answer', () => {
    const { levelEvents } = conceptLevelHistory([examA, examB], NOW)
    expect(levelEvents.map(e => e.to)).toEqual(['level1', 'level2'])
    expect(levelAtTime(daysAgo(1), levelEvents)).toBe('level2')
  })

  it('ends at the best level either exam holds — the pill\'s level', () => {
    expect(conceptLevelHistory([examA, examB], NOW).currentLevel).toBe('level2')
    expect(conceptLevelHistory([examB, examA], NOW).currentLevel).toBe('level2')
  })

  it('climbs when the other exam overtakes', () => {
    const examBHigher = track(
      [ev(daysAgo(3), 'new', 'level1'), ev(daysAgo(2), 'level1', 'level2'), ev(daysAgo(1), 'level2', 'level3')],
      row('level3', daysAgo(1)),
    )
    const { levelEvents, currentLevel } = conceptLevelHistory([examA, examBHigher], NOW)
    expect(levelEvents.map(e => e.to)).toEqual(['level1', 'level2', 'level3'])
    expect(currentLevel).toBe('level3')
  })

  it('an exam not yet started does not hold a forgotten concept up at New', () => {
    const forgotten = track(
      [ev(daysAgo(40), 'new', 'level1')],
      row('level1', daysAgo(40)),
    )
    const later = track([ev(daysAgo(1), 'new', 'level1')], row('level1', daysAgo(1)))
    const { levelEvents } = conceptLevelHistory([forgotten, later], NOW)
    expect(levelEvents.map(e => e.to)).toEqual(['level1', 'forgotten', 'level1'])
  })

  it('is empty with nothing earned', () => {
    expect(conceptLevelHistory([], NOW)).toEqual({ levelEvents: [], currentLevel: 'new' })
    expect(conceptLevelHistory([track([], row('new', null, daysAgo(1)))], NOW).currentLevel).toBe('new')
  })
})

describe('combineLevelTimelines', () => {
  it('passes a single timeline through unchanged', () => {
    const only = [ev(daysAgo(5), 'forgotten', 'level1'), ev(daysAgo(2), 'level1', 'level2')]
    expect(combineLevelTimelines([only])).toEqual(only)
  })

  it('takes the best level at each moment, merging simultaneous steps', () => {
    const a = [ev(daysAgo(5), 'new', 'level1'), ev(daysAgo(2), 'level1', 'level2')]
    const b = [ev(daysAgo(5), 'new', 'level1'), ev(daysAgo(3), 'level1', 'level2')]
    expect(combineLevelTimelines([a, b])).toEqual([
      ev(daysAgo(5), 'new', 'level1'),
      ev(daysAgo(3), 'level1', 'level2'),
    ])
  })
})

describe('trackLevelTimeline', () => {
  it('returns the recorded events when they already end at the current level', () => {
    const events = [ev(daysAgo(3), 'new', 'level1')]
    expect(trackLevelTimeline(track(events, row('level1', daysAgo(3))), NOW)).toEqual(events)
  })

  it('adds the decay steps the clock explains', () => {
    const levelUp = daysAgo(DECAY_DAYS_LEVEL2 + 1)
    const timeline = trackLevelTimeline(track([ev(levelUp, 'level1', 'level2')], row('level2', levelUp)), NOW)
    expect(timeline).toHaveLength(2)
    expect(timeline[1]).toMatchObject({ from: 'level2', to: 'level1' })
    expect(timeline[1].at.getTime()).toBe(levelUp.getTime() + DECAY_DAYS_LEVEL2 * MS_PER_DAY)
  })

  it('drops to Forgotten just after the failing answers of a fail streak', () => {
    const levelUp = daysAgo(3)
    const failedAt = daysAgo(1)
    const answeredAt = new Date(failedAt.getTime() + 50)
    const timeline = trackLevelTimeline(
      track([ev(levelUp, 'level1', 'level2')], row('forgotten', levelUp, failedAt), answeredAt),
      NOW,
    )
    expect(timeline[timeline.length - 1]).toMatchObject({ from: 'level2', to: 'forgotten' })
    expect(timeline[timeline.length - 1].at.getTime()).toBe(answeredAt.getTime() + 1)
    expect(levelAtTime(answeredAt, timeline)).toBe('level2')
  })

  it('draws a level the row holds that no event recorded', () => {
    const correctAt = daysAgo(2)
    const timeline = trackLevelTimeline(track([], row('level1', correctAt)), NOW)
    expect(timeline).toEqual([ev(correctAt, 'new', 'level1')])
  })

  it('trusts a level-up over a row left at New by a failed upsert', () => {
    const levelUp = daysAgo(2)
    const timeline = trackLevelTimeline(track([ev(levelUp, 'new', 'level1')], row('new', null)), NOW)
    expect(timeline).toEqual([ev(levelUp, 'new', 'level1')])
  })
})
