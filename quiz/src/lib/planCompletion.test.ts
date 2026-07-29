import { describe, it, expect } from 'vitest'
import {
  buildTodayTargets,
  isConceptDoneToday,
  mergeLevelUps,
  targetStateFor,
} from './planCompletion'
import type { ConceptAssignment } from './studyPlan'
import type { MasteryState } from './mastery'
import type { DailyLevelUp } from './dailyProgressStore'

const TODAY = '2026-07-29'

function assignment(
  conceptName: string,
  initialState: MasteryState,
  scheduledDate = TODAY,
): ConceptAssignment {
  return { conceptName, topicName: 'Annuities', scheduledDate, initialState }
}

function levelUp(conceptSlug: string, to: MasteryState = 'level1'): DailyLevelUp {
  return { conceptSlug, from: 'new', to, at: `${TODAY}T12:00:00.000Z` }
}

function mastery(entries: [string, MasteryState][]): Map<string, MasteryState> {
  return new Map(entries.map(([n, s]) => [n.toLowerCase(), s]))
}

describe('targetStateFor', () => {
  it('advances one rung up the ladder', () => {
    expect(targetStateFor('new')).toBe('level1')
    expect(targetStateFor('level1')).toBe('level2')
    expect(targetStateFor('level2')).toBe('level3')
  })

  it('sends a forgotten concept back to Level 1', () => {
    expect(targetStateFor('forgotten')).toBe('level1')
  })

  it('keeps Level 3 at the top of the ladder', () => {
    expect(targetStateFor('level3')).toBe('level3')
  })
})

describe('buildTodayTargets', () => {
  it('only counts assignments scheduled for today', () => {
    const targets = buildTodayTargets(
      [assignment('Perpetuity', 'new'), assignment('Term of Annuity', 'new', '2026-07-30')],
      mastery([]),
      TODAY,
    )
    expect(targets.get('perpetuity')).toBe('level1')
    expect(targets.has('term of annuity')).toBe(false)
  })

  it('derives the target from current mastery, not the cached initial state', () => {
    // Scheduled when the concept was New, but a quiz already took it to Level 1
    // today — so today's remaining target is Level 2, not Level 1.
    const targets = buildTodayTargets(
      [assignment('Perpetuity', 'new')],
      mastery([['Perpetuity', 'level1']]),
      TODAY,
    )
    expect(targets.get('perpetuity')).toBe('level2')
  })

  it('falls back to the assignment initial state when mastery has no row', () => {
    const targets = buildTodayTargets([assignment('Perpetuity', 'level2')], mastery([]), TODAY)
    expect(targets.get('perpetuity')).toBe('level3')
  })

  it('keeps the highest target when a concept is assigned twice today', () => {
    const targets = buildTodayTargets(
      [assignment('Perpetuity', 'new'), assignment('Perpetuity', 'level2')],
      mastery([]),
      TODAY,
    )
    expect(targets.get('perpetuity')).toBe('level3')
  })

  it('is case-insensitive on concept names', () => {
    const targets = buildTodayTargets([assignment('PERPETUITY', 'new')], mastery([]), TODAY)
    expect(targets.get('perpetuity')).toBe('level1')
  })
})

describe('isConceptDoneToday', () => {
  const targets = buildTodayTargets([assignment('Perpetuity', 'new')], mastery([]), TODAY)

  it('is not done when untouched and short of the target', () => {
    expect(isConceptDoneToday('Perpetuity', targets, mastery([]), [])).toBe(false)
  })

  it('is done once the concept levelled up today', () => {
    expect(isConceptDoneToday('Perpetuity', targets, mastery([]), [levelUp('Perpetuity')])).toBe(true)
  })

  it('matches level-ups case-insensitively', () => {
    expect(isConceptDoneToday('Perpetuity', targets, mastery([]), [levelUp('perpetuity')])).toBe(true)
  })

  it('ignores level-ups for other concepts', () => {
    expect(isConceptDoneToday('Perpetuity', targets, mastery([]), [levelUp('Annuities')])).toBe(false)
  })

  it('is done when mastery already meets the target', () => {
    const atLevel1 = mastery([['Perpetuity', 'level1']])
    // Target map built from the pre-quiz state, so the bar is still Level 1.
    expect(isConceptDoneToday('Perpetuity', targets, atLevel1, [])).toBe(true)
  })

  it('stays done after a plan regen raises the bar above today’s achievement', () => {
    // Regenerating the plan re-derives the target from current mastery (Level 1
    // → Level 2), which alone would un-tick the row; the level-up record keeps it.
    const regenerated = buildTodayTargets(
      [assignment('Perpetuity', 'new')],
      mastery([['Perpetuity', 'level1']]),
      TODAY,
    )
    expect(regenerated.get('perpetuity')).toBe('level2')
    expect(isConceptDoneToday('Perpetuity', regenerated, mastery([['Perpetuity', 'level1']]), []))
      .toBe(false)
    expect(
      isConceptDoneToday(
        'Perpetuity',
        regenerated,
        mastery([['Perpetuity', 'level1']]),
        [levelUp('Perpetuity')],
      ),
    ).toBe(true)
  })

  it('treats an unassigned review concept as done once it reaches Level 1', () => {
    const empty = buildTodayTargets([], mastery([]), TODAY)
    expect(isConceptDoneToday('Annuities', empty, mastery([['Annuities', 'level1']]), [])).toBe(true)
    expect(isConceptDoneToday('Annuities', empty, mastery([]), [])).toBe(false)
  })

  it('does not treat a forgotten concept as done', () => {
    const empty = buildTodayTargets([], mastery([]), TODAY)
    expect(isConceptDoneToday('Annuities', empty, mastery([['Annuities', 'forgotten']]), []))
      .toBe(false)
  })
})

describe('mergeLevelUps', () => {
  it('de-duplicates the same advance recorded locally and on the server', () => {
    const merged = mergeLevelUps([levelUp('Perpetuity')], [levelUp('perpetuity')])
    expect(merged).toHaveLength(1)
  })

  it('keeps distinct destination states for the same concept', () => {
    const merged = mergeLevelUps([levelUp('Perpetuity', 'level1')], [levelUp('Perpetuity', 'level2')])
    expect(merged).toHaveLength(2)
  })

  it('keeps cross-device level-ups the local store never saw', () => {
    const merged = mergeLevelUps([levelUp('Perpetuity')], [levelUp('Annuities')])
    expect(merged.map(l => l.conceptSlug)).toEqual(['Perpetuity', 'Annuities'])
  })

  it('returns an empty list when neither source has anything', () => {
    expect(mergeLevelUps([], [])).toEqual([])
  })
})
