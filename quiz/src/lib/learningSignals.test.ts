import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  RETENTION_KEYS_KEPT,
  REMINDER_SESSION_HOURS,
  REMINDER_SOURCES,
  conceptRetentionEvents,
  daysSince,
  minutesAfterOpen,
  parseReminderVisit,
  parseRetentionKeys,
  reminderChannelFromSearch,
  reminderSessionDue,
  retentionEpisodeKey,
  withRetentionKeys,
  type ReminderVisit,
} from './learningSignals'
import { DECAY_DAYS_LEVEL1, DECAY_DAYS_LEVEL3, emptyRecord, type ConceptMasteryRecord, type MasteryState } from './mastery'

const NOW = new Date('2026-10-17T12:00:00Z')
const DAY = 24 * 60 * 60 * 1000

function record(slug: string, state: MasteryState, daysAgo: number | null): ConceptMasteryRecord {
  const at = daysAgo === null ? null : new Date(NOW.getTime() - daysAgo * DAY).toISOString()
  return { ...emptyRecord('u', 'P', slug), state, correct_count: 3, last_correct_at: at, last_attempted_at: at }
}

describe('daysSince', () => {
  it('counts whole days and never goes negative', () => {
    expect(daysSince(new Date(NOW.getTime() - 2.9 * DAY).toISOString(), NOW)).toBe(2)
    expect(daysSince(new Date(NOW.getTime() + DAY).toISOString(), NOW)).toBe(0)
  })
  it('is null for a missing or unparseable date', () => {
    expect(daysSince(null, NOW)).toBeNull()
    expect(daysSince('not a date', NOW)).toBeNull()
  })
})

describe('conceptRetentionEvents', () => {
  it('reports a concept past its decay window, by its first answer', () => {
    const prior = [record('Bayes Theorem', 'level1', DECAY_DAYS_LEVEL1 + 1)]
    const { events, keys } = conceptRetentionEvents(
      [
        { exam: 'Exam P-1', concepts: ['Bayes Theorem'], isCorrect: false },
        { exam: 'Exam P-1', concepts: ['Bayes Theorem'], isCorrect: true },
      ],
      prior,
      new Set(),
      NOW,
    )
    expect(events).toEqual([
      { concept: 'Bayes Theorem', exam: 'Exam P-1', retained: false, level: 'level1', days_since_correct: DECAY_DAYS_LEVEL1 + 1 },
    ])
    expect(keys).toEqual([retentionEpisodeKey(prior[0])])
  })

  it('reports a level 3 concept that has stepped down, not only one that is forgotten', () => {
    const prior = [record('Expected Value', 'level3', DECAY_DAYS_LEVEL3 + 2)]
    const { events } = conceptRetentionEvents(
      [{ exam: 'Exam P-1', concepts: ['expected value'], isCorrect: true }],
      prior,
      new Set(),
      NOW,
    )
    expect(events).toHaveLength(1)
    expect(events[0]).toMatchObject({ retained: true, level: 'level3' })
  })

  it('ignores concepts inside their window, new ones, and ones already forgotten in storage', () => {
    const prior = [
      record('Fresh', 'level2', 1),
      record('Never', 'new', null),
      record('Gone', 'forgotten', 90),
    ]
    const { events } = conceptRetentionEvents(
      [{ exam: 'Exam P-1', concepts: ['Fresh', 'Never', 'Gone', 'Unknown'], isCorrect: true }],
      prior,
      new Set(),
      NOW,
    )
    expect(events).toEqual([])
  })

  it('reports an episode once, however many quizzes it takes', () => {
    const prior = [record('Bayes Theorem', 'level1', 10)]
    const answers = [{ exam: 'Exam P-1', concepts: ['Bayes Theorem'], isCorrect: false }]
    const first = conceptRetentionEvents(answers, prior, new Set(), NOW)
    const again = conceptRetentionEvents(answers, prior, new Set(first.keys), NOW)
    expect(first.events).toHaveLength(1)
    expect(again.events).toEqual([])
  })

  it('starts a new episode once the concept is answered correctly again', () => {
    const before = record('Bayes Theorem', 'level1', 10)
    const after = record('Bayes Theorem', 'level1', 9)
    expect(retentionEpisodeKey(before)).not.toBe(retentionEpisodeKey(after))
  })
})

describe('retention key storage', () => {
  it('appends without duplicates and keeps the newest past the cap', () => {
    expect(withRetentionKeys(['a', 'b'], ['b', 'c'])).toEqual(['a', 'b', 'c'])
    const many = Array.from({ length: RETENTION_KEYS_KEPT }, (_, i) => `k${i}`)
    const next = withRetentionKeys(many, ['new'])
    expect(next).toHaveLength(RETENTION_KEYS_KEPT)
    expect(next[0]).toBe('k1')
    expect(next.at(-1)).toBe('new')
  })
  it('parses only a string array', () => {
    expect(parseRetentionKeys(null)).toEqual([])
    expect(parseRetentionKeys('{')).toEqual([])
    expect(parseRetentionKeys('{"a":1}')).toEqual([])
    expect(parseRetentionKeys('["a",2,"b"]')).toEqual(['a', 'b'])
  })
})

describe('reminder attribution', () => {
  const visit: ReminderVisit = { channel: 'email', openedAt: NOW.toISOString(), sessionReported: false }

  it('reads the channel off a reminder link', () => {
    expect(reminderChannelFromSearch('?utm_source=daily-plan-email&utm_medium=email')).toBe('email')
    expect(reminderChannelFromSearch('?utm_source=newsletter')).toBeNull()
    expect(reminderChannelFromSearch('')).toBeNull()
  })

  it('credits the first quiz within the window, once', () => {
    const later = new Date(NOW.getTime() + 20 * 60 * 1000)
    expect(reminderSessionDue(visit, later)).toBe(true)
    expect(minutesAfterOpen(visit, later)).toBe(20)
    expect(reminderSessionDue({ ...visit, sessionReported: true }, later)).toBe(false)
    expect(reminderSessionDue(visit, new Date(NOW.getTime() + (REMINDER_SESSION_HOURS + 1) * 60 * 60 * 1000))).toBe(false)
    expect(reminderSessionDue(null, later)).toBe(false)
  })

  it('round-trips a stored visit and rejects anything else', () => {
    expect(parseReminderVisit(JSON.stringify(visit))).toEqual(visit)
    expect(parseReminderVisit('{"channel":"email"}')).toBeNull()
    expect(parseReminderVisit('{"channel":"email","openedAt":"nope"}')).toBeNull()
    expect(parseReminderVisit('not json')).toBeNull()
  })

  // The edge function can't import from quiz/src, so its links are held to the
  // table here by reading its source — the same contract as dailyEmail.ts.
  it('every link the daily email sends to the app carries a known utm_source', () => {
    const source = readFileSync(
      resolve(__dirname, '../../../supabase/functions/daily-plan-email/index.ts'),
      'utf8',
    )
    const match = source.match(/utm_source=([a-z-]+)/)
    expect(match).not.toBeNull()
    expect(REMINDER_SOURCES[match![1]]).toBe('email')
  })
})
