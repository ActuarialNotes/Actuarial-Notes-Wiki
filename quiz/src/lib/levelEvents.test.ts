import { describe, expect, it } from 'vitest'
import { dailyCompletionRows, levelEventRows } from './levelEvents'
import { conceptLevelHistory, fillLevelGaps, mergeLoggedEvents } from './learningHistory'
import type { LevelEvent } from './learningHistory'

const at = new Date('2026-10-07T12:00:00Z')
const d = (s: string) => new Date(s)
const steps = (events: LevelEvent[]) => events.map(e => `${e.from}->${e.to}`)

describe('levelEventRows', () => {
  it('writes every step a quiz took, falls included, in order', () => {
    const rows = levelEventRows('u', [
      { conceptSlug: 'Probability', examId: 'P', from: 'level3', to: 'level1', path: ['forgotten', 'level1'] },
    ], null, at)
    expect(rows.map(r => `${r.from_state}->${r.to_state}`)).toEqual(['level3->forgotten', 'forgotten->level1'])
    expect(rows[1].at > rows[0].at).toBe(true)
  })

  it('writes a fall that ends the quiz', () => {
    const rows = levelEventRows('u', [{ conceptSlug: 'Probability', examId: 'P', from: 'level2', to: 'forgotten' }], null, at)
    expect(rows).toHaveLength(1)
    expect(rows[0].to_state).toBe('forgotten')
  })

  it('files each change under its own exam, falling back to the quiz exam', () => {
    const rows = levelEventRows('u', [
      { conceptSlug: 'Probability', examId: 'MAS-I', from: 'new', to: 'level1' },
      { conceptSlug: 'Probability', from: 'new', to: 'level1' },
    ], 'P', at)
    expect(rows.map(r => r.exam_id)).toEqual(['MAS-I', 'P'])
  })
})

describe('dailyCompletionRows', () => {
  it('keeps one row per (exam, concept) so the upsert never touches a row twice', () => {
    const rows = dailyCompletionRows('u', [
      { conceptSlug: 'Probability', examId: 'P', from: 'level1', to: 'level2' },
      { conceptSlug: 'Probability', examId: 'MAS-I', from: 'new', to: 'level1' },
      { conceptSlug: 'Probability', examId: 'P', from: 'level1', to: 'level2' },
      { conceptSlug: 'Bayes Theorem', examId: 'P', from: 'level2', to: 'forgotten' },
    ], 'P', '2026-10-07', at)
    expect(rows.map(r => `${r.exam_id}:${r.concept_slug}`)).toEqual(['P:Probability', 'MAS-I:Probability'])
  })
})

describe('fillLevelGaps', () => {
  it('puts back the fall to Forgotten a relearn implies', () => {
    const filled = fillLevelGaps([
      { at: d('2026-10-01T12:00Z'), from: 'level2', to: 'level3' },
      { at: d('2026-10-07T12:00Z'), from: 'forgotten', to: 'level1' },
    ])
    expect(steps(filled)).toEqual(['level2->level3', 'level3->forgotten', 'forgotten->level1'])
    expect(filled[1].at < filled[2].at).toBe(true)
  })

  it('draws a decay where the clock would have stepped it down', () => {
    const filled = fillLevelGaps([
      { at: d('2026-09-01T12:00Z'), from: 'level1', to: 'level2' },
      { at: d('2026-10-01T12:00Z'), from: 'level1', to: 'level2' },
    ])
    expect(steps(filled)).toEqual(['level1->level2', 'level2->level1', 'level1->level2'])
    expect(filled[1].at.toISOString()).toBe('2026-09-15T12:00:00.000Z')
  })

  it('counts decay from the last correct answer, not the last level change', () => {
    const filled = fillLevelGaps([
      { at: d('2026-09-01T12:00Z'), from: 'level1', to: 'level2' },
      { at: d('2026-10-01T12:00Z'), from: 'level1', to: 'level2' },
    ], [d('2026-09-10T12:00Z')])
    expect(filled[1].at.toISOString()).toBe('2026-09-24T12:00:00.000Z')
  })
})

describe('mergeLoggedEvents', () => {
  it('uses the log from where it begins and the old climbs before it', () => {
    const old = [
      { at: d('2026-09-19T12:00Z'), from: 'new' as const, to: 'level1' as const },
      { at: d('2026-10-20T12:00Z'), from: 'level1' as const, to: 'level2' as const },
    ]
    const log = [{ at: d('2026-10-20T12:00Z'), from: 'level1' as const, to: 'level2' as const }]
    expect(mergeLoggedEvents(old, log)).toEqual([old[0], log[0]])
  })
})

describe('the Probability graph that stepped from Level 3 to Level 1', () => {
  it('dips to Forgotten before relearning', () => {
    // daily_completions as it was kept: climbs only.
    const track = {
      events: [
        { at: d('2026-09-19T12:00Z'), from: 'new' as const, to: 'level1' as const },
        { at: d('2026-09-20T12:00Z'), from: 'level1' as const, to: 'level2' as const },
        { at: d('2026-10-01T12:00Z'), from: 'level2' as const, to: 'level3' as const },
        { at: d('2026-10-07T12:00Z'), from: 'forgotten' as const, to: 'level1' as const },
      ],
      record: {
        user_id: '', exam_id: 'P', concept_slug: 'Probability', state: 'level1' as const,
        correct_count: 9, incorrect_streak: 0, hard_correct_count: 0,
        last_correct_at: '2026-10-25T12:00:00Z', last_attempted_at: '2026-10-25T12:00:00Z',
      },
      lastAttemptAt: d('2026-10-25T12:00Z'),
    }
    const { levelEvents, currentLevel } = conceptLevelHistory([track], d('2026-10-30T12:00Z'))
    expect(steps(levelEvents)).toEqual([
      'new->level1', 'level1->level2', 'level2->level3', 'level3->forgotten', 'forgotten->level1',
    ])
    expect(currentLevel).toBe('level1')
  })
})
