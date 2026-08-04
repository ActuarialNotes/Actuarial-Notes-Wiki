import { describe, it, expect } from 'vitest'
import {
  buildDayPlanPct,
  buildTodayTargets,
  isConceptDoneToday,
  masteryStatesForSyllabus,
  mergeLevelUps,
  planConceptsToday,
  planDoneConceptSlugs,
  targetStateFor,
  type DayPlanPctInput,
} from './planCompletion'
import type { ConceptAssignment, StudyPlan } from './studyPlan'
import type { ConceptMasteryRecord, MasteryState } from './mastery'
import type { DailyLevelUp } from './dailyProgressStore'
import type { WikiExamSyllabus } from './wikiParser'

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

describe('buildDayPlanPct', () => {
  const YESTERDAY = '2026-07-28'

  function pctFor(overrides: Partial<DayPlanPctInput> = {}): Map<string, number> {
    return buildDayPlanPct({
      today: TODAY,
      completionsByDay: new Map(),
      todaysConcepts: [],
      targets: new Map(),
      masteryStateByName: new Map(),
      levelUps: [],
      conceptsPerDay: 4,
      studiedToday: false,
      ...overrides,
    })
  }

  it('scores today against today’s plan', () => {
    const result = pctFor({
      todaysConcepts: ['Perpetuity', 'Annuities', 'Duration', 'Convexity'],
      targets: buildTodayTargets(
        [assignment('Perpetuity', 'new'), assignment('Annuities', 'new'),
         assignment('Duration', 'new'), assignment('Convexity', 'new')],
        mastery([]),
        TODAY,
      ),
      levelUps: [levelUp('Perpetuity'), levelUp('Annuities')],
      studiedToday: true,
    })
    expect(result.get(TODAY)).toBe(50)
  })

  it('gives a finished plan the full 100%', () => {
    const result = pctFor({
      todaysConcepts: ['Perpetuity', 'Annuities'],
      targets: buildTodayTargets(
        [assignment('Perpetuity', 'new'), assignment('Annuities', 'new')],
        mastery([]),
        TODAY,
      ),
      levelUps: [levelUp('Perpetuity'), levelUp('Annuities')],
      studiedToday: true,
    })
    expect(result.get(TODAY)).toBe(100)
  })

  it('counts a concept that already meets today’s target, with no completion row', () => {
    // The bug this guards: completion used to be read off daily_completions
    // alone, so a plan finished by concepts that were already on target left
    // today unscored and the heatmap cell dim.
    const result = pctFor({
      todaysConcepts: ['Perpetuity', 'Annuities'],
      targets: buildTodayTargets([assignment('Perpetuity', 'new')], mastery([]), TODAY),
      masteryStateByName: mastery([['Perpetuity', 'level1'], ['Annuities', 'level2']]),
      studiedToday: true,
    })
    expect(result.get(TODAY)).toBe(100)
  })

  it('counts a day whose plan has nothing left on it as complete', () => {
    // Everything the schedule asked for is done, so `todaysConcepts` is empty —
    // there is nothing to fall short of.
    expect(pctFor({ studiedToday: true }).get(TODAY)).toBe(100)
  })

  it('leaves an empty-plan day alone when nothing was studied', () => {
    expect(pctFor().has(TODAY)).toBe(false)
  })

  it('leaves today unscored when the day’s work moved no plan concept', () => {
    // Studied, but nothing on the plan advanced — ExamHeatmap shades these as
    // "studied, quota not met" rather than as a 0% cell.
    const result = pctFor({
      todaysConcepts: ['Perpetuity'],
      targets: buildTodayTargets([assignment('Perpetuity', 'new')], mastery([]), TODAY),
      studiedToday: true,
    })
    expect(result.has(TODAY)).toBe(false)
  })

  it('picks up today’s completions recorded on another device', () => {
    const result = pctFor({
      completionsByDay: new Map([[TODAY, new Set(['perpetuity'])]]),
      todaysConcepts: ['Perpetuity', 'Annuities'],
      targets: buildTodayTargets(
        [assignment('Perpetuity', 'new'), assignment('Annuities', 'new')],
        mastery([]),
        TODAY,
      ),
    })
    expect(result.get(TODAY)).toBe(50)
  })

  it('scores past days against the plan’s pace', () => {
    const result = pctFor({
      completionsByDay: new Map([[YESTERDAY, new Set(['perpetuity', 'annuities'])]]),
      conceptsPerDay: 4,
    })
    expect(result.get(YESTERDAY)).toBe(50)
  })

  it('caps a past day that beat the pace at 100%', () => {
    const result = pctFor({
      completionsByDay: new Map([[YESTERDAY, new Set(['a', 'b', 'c'])]]),
      conceptsPerDay: 2,
    })
    expect(result.get(YESTERDAY)).toBe(100)
  })

  it('treats any past completion as a full day when the plan has no pace', () => {
    const result = pctFor({
      completionsByDay: new Map([[YESTERDAY, new Set(['perpetuity'])]]),
      conceptsPerDay: 0,
    })
    expect(result.get(YESTERDAY)).toBe(100)
  })
})

describe('mergeLevelUps', () => {
  it('de-duplicates the same advance recorded locally and on the server', () => {
    const merged = mergeLevelUps([levelUp('Perpetuity')], [levelUp('perpetuity')])
    expect(merged).toHaveLength(1)
  })

  it('carries the server row’s exam onto the kept local entry', () => {
    const merged = mergeLevelUps(
      [levelUp('Perpetuity')],
      [{ ...levelUp('perpetuity'), examId: 'FM' }],
    )
    expect(merged).toHaveLength(1)
    expect(merged[0].examId).toBe('FM')
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

// ── The done-set the quiz sizing subtracts from ──────────────────────────────

const NOW = new Date(`${TODAY}T12:00:00.000Z`)

function syllabus(conceptNames: string[]): WikiExamSyllabus {
  return {
    examId: 'P-1',
    examLabel: 'Exam P',
    examTopic: 'Probability',
    topics: [{
      name: 'General Probability',
      concepts: conceptNames.map(name => ({ name, target: name })),
    }],
    resources: [],
  }
}

function record(
  concept_slug: string,
  state: MasteryState,
  exam_id = 'P',
  last_correct_at: string | null = `${TODAY}T09:00:00.000Z`,
): ConceptMasteryRecord {
  return {
    user_id: 'u1',
    exam_id,
    concept_slug,
    state,
    correct_count: 3,
    incorrect_streak: 0,
    hard_correct_count: 1,
    last_correct_at,
    last_attempted_at: last_correct_at,
  }
}

function plan(todaysConcepts: string[], assignments: ConceptAssignment[]): StudyPlan {
  return {
    examId: 'P-1',
    generatedDate: TODAY,
    config: { targetReadyDate: null, targetStrengthLevel: 'exam_ready', planStartDate: TODAY },
    todaysConcepts,
    assignments,
    dayNumber: 1,
    totalDays: 30,
    daysRemaining: 29,
    conceptsPerDay: 2,
    status: 'on_track',
    reviewConcepts: [],
    effectiveReadyDate: TODAY,
    targetPassedFallback: false,
  }
}

describe('planConceptsToday', () => {
  it('reads today’s concepts from a normal plan', () => {
    expect(planConceptsToday(plan(['Bayes Theorem'], []))).toEqual(['Bayes Theorem'])
  })

  it('swaps in the review picks in review mode', () => {
    const reviewing: StudyPlan = {
      ...plan(['Bayes Theorem'], []),
      status: 'review_mode',
      reviewConcepts: ['Covariance'],
    }
    expect(planConceptsToday(reviewing)).toEqual(['Covariance'])
  })

  it('is empty without a plan', () => {
    expect(planConceptsToday(null)).toEqual([])
  })
})

describe('masteryStatesForSyllabus', () => {
  it('scopes mastery rows to the exam', () => {
    const states = masteryStatesForSyllabus(
      syllabus(['Bayes Theorem']),
      [record('Bayes Theorem', 'level3', 'MAS-I')],
      'P',
      NOW,
    )
    expect(states.get('bayes theorem')).toBe('new')
  })

  it('applies decay to a stale row', () => {
    // 35 days without a correct answer — one rung down from Level 3.
    const states = masteryStatesForSyllabus(
      syllabus(['Bayes Theorem']),
      [record('Bayes Theorem', 'level3', 'P', '2026-06-24T09:00:00.000Z')],
      'P',
      NOW,
    )
    expect(states.get('bayes theorem')).toBe('level2')
  })
})

describe('planDoneConceptSlugs', () => {
  const concepts = ['Bayes Theorem', 'Central Limit Theorem']

  function doneFor(
    masteryRecords: ConceptMasteryRecord[],
    levelUps: DailyLevelUp[] = [],
    assignments: ConceptAssignment[] = [
      assignment('Bayes Theorem', 'level2'),
      assignment('Central Limit Theorem', 'level2'),
    ],
  ): Set<string> {
    return planDoneConceptSlugs({
      plan: plan(concepts, assignments),
      syllabus: syllabus(concepts),
      masteryRecords,
      examProgressKey: 'P',
      levelUps,
      today: TODAY,
      now: NOW,
    })
  }

  it('drops a concept advanced today', () => {
    expect([...doneFor([], [levelUp('Bayes Theorem', 'level3')])]).toEqual(['bayes theorem'])
  })

  it('drops a Level 3 maintenance refresher that needs no work today', () => {
    // The case the "questions left today" badge used to get wrong: a concept
    // already at its target can never produce a level-up, so counting level-ups
    // alone kept asking for a question the checklist showed as ticked off.
    const done = doneFor(
      [record('Bayes Theorem', 'level3')],
      [],
      [assignment('Bayes Theorem', 'level3'), assignment('Central Limit Theorem', 'level2')],
    )
    expect(done.has('bayes theorem')).toBe(true)
    expect(done.has('central limit theorem')).toBe(false)
  })

  it('keeps a concept still short of today’s target', () => {
    expect(doneFor([record('Central Limit Theorem', 'level2')]).has('central limit theorem'))
      .toBe(false)
  })

  it('counts a level-up synced from another device', () => {
    // Nothing device-local, nothing at target — only the daily_completions row.
    expect(doneFor([], [levelUp('central limit theorem', 'level3')]).has('central limit theorem'))
      .toBe(true)
  })

  it('ignores a completion credited to another exam', () => {
    const elsewhere: DailyLevelUp = { ...levelUp('Central Limit Theorem', 'level3'), examId: 'MAS-I' }
    expect(doneFor([], [elsewhere]).has('central limit theorem')).toBe(false)
  })

  it('is empty when the plan has nothing scheduled today', () => {
    expect(planDoneConceptSlugs({
      plan: plan([], []),
      syllabus: syllabus(concepts),
      masteryRecords: [record('Bayes Theorem', 'level3')],
      examProgressKey: 'P',
      levelUps: [],
      today: TODAY,
      now: NOW,
    }).size).toBe(0)
  })
})
