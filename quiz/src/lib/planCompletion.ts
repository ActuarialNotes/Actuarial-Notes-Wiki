// Whether a concept in today's study plan is already done.
//
// Two surfaces ask this question and must answer it identically: the Dashboard's
// "Today" card checklist and the study-guide header's "Today's Study Plan" list
// (`components/wiki/WikiFloatingSearch.tsx`). The rule lives here so a concept
// can't read as done on one and pending on the other.
//
// See docs/concept-learning-progression.md for the mastery ladder itself.

import type { MasteryState } from '@/lib/mastery'
import type { ConceptAssignment } from '@/lib/studyPlan'
import type { DailyLevelUp } from '@/lib/dailyProgressStore'

/** The level a concept advances to when today's study of it succeeds. */
export const NEXT_STATE: Partial<Record<MasteryState, MasteryState>> = {
  new: 'level1', forgotten: 'level1',
  level1: 'level2', level2: 'level3',
}

/** Ladder position, for comparing two states. Forgotten sorts with New. */
export const STATE_ORDER: Record<MasteryState, number> = {
  new: 0, forgotten: 0, level1: 1, level2: 2, level3: 3,
}

/**
 * The level a concept should reach today, given where it stands right now.
 * Level 3 is the top of the ladder, so a Level 3 concept's target is itself.
 */
export function targetStateFor(current: MasteryState): MasteryState {
  return current === 'level3' ? 'level3' : (NEXT_STATE[current] ?? 'level1')
}

/**
 * Per-concept targets for today, keyed by lower-cased concept name.
 *
 * Only assignments scheduled for `today` count. The target is derived from the
 * concept's *current* mastery rather than the assignment's `initialState`, so it
 * stays accurate after same-day quiz progress or decay; `initialState` is the
 * fallback for concepts with no mastery row yet. If a concept somehow has more
 * than one assignment today, the highest target wins.
 */
export function buildTodayTargets(
  assignments: ConceptAssignment[],
  masteryStateByName: Map<string, MasteryState>,
  today: string,
): Map<string, MasteryState> {
  const targets = new Map<string, MasteryState>()
  for (const a of assignments) {
    if (a.scheduledDate !== today) continue
    const key = a.conceptName.toLowerCase()
    const current = masteryStateByName.get(key) ?? a.initialState
    const target = targetStateFor(current)
    const existing = targets.get(key)
    if (!existing || STATE_ORDER[target] > STATE_ORDER[existing]) targets.set(key, target)
  }
  return targets
}

/**
 * Whether a study-plan concept counts as done for today.
 *
 * True when the concept was advanced at all today — on this device or another,
 * hence the merged `levelUps` — or when its mastery already meets today's
 * target. The level-up clause matters on its own: reconfiguring the plan
 * regenerates assignments from current mastery, which can raise the target bar
 * above what the user already achieved earlier the same day.
 *
 * Concepts with no assignment today (review-mode picks) fall back to a Level 1
 * target, so an already-mastered review concept doesn't read as pending.
 */
export function isConceptDoneToday(
  name: string,
  targets: Map<string, MasteryState>,
  masteryStateByName: Map<string, MasteryState>,
  levelUps: DailyLevelUp[],
): boolean {
  const key = name.toLowerCase()
  if (levelUps.some(lu => lu.conceptSlug.toLowerCase() === key)) return true
  const target = targets.get(key) ?? 'level1'
  const current = masteryStateByName.get(key) ?? 'new'
  return STATE_ORDER[current] >= STATE_ORDER[target]
}

export interface DayPlanPctInput {
  /** Today's date, `YYYY-MM-DD` local (`todayISO()`). */
  today: string
  /**
   * Lower-cased concept slugs completed on each day, from `daily_completions`
   * (this exam only) merged with today's device-local level-ups.
   */
  completionsByDay: Map<string, Set<string>>
  /** Today's plan concepts — the review picks when the plan is in review mode. */
  todaysConcepts: string[]
  /** Today's per-concept targets, from `buildTodayTargets`. */
  targets: Map<string, MasteryState>
  masteryStateByName: Map<string, MasteryState>
  /** Today's level-ups for this exam. */
  levelUps: DailyLevelUp[]
  /** The plan's pace — the denominator for past days, which have no stored plan. */
  conceptsPerDay: number
  /** Whether any question was answered for this exam today. */
  studiedToday: boolean
}

/**
 * How much of each day's study plan was completed, 0–100 — the brightness of
 * the Study Schedule heatmap's green (`components/ExamHeatmap.tsx`).
 *
 * Today is scored against today's plan with the same rule the Today card's
 * checklist uses (`isConceptDoneToday`), so a day the user sees fully ticked off
 * is a fully bright cell. That has to be computed from the plan itself rather
 * than from `daily_completions` alone: a concept counts as done when it already
 * meets today's target, which writes no completion row, and a day whose plan is
 * empty — everything the schedule asked for is already done — has no rows at all
 * yet is complete by definition.
 *
 * Past days have no stored plan to score against, so they fall back to the
 * current pace: concepts levelled up that day against `conceptsPerDay`.
 *
 * A day is only given a percentage once it has something to show for itself
 * (work today, or a completion on a past day). Days that were studied without
 * moving the plan are left out entirely so the heatmap can shade them as
 * "studied, quota not met" rather than as an empty 0%.
 */
export function buildDayPlanPct({
  today,
  completionsByDay,
  todaysConcepts,
  targets,
  masteryStateByName,
  levelUps,
  conceptsPerDay,
  studiedToday,
}: DayPlanPctInput): Map<string, number> {
  const result = new Map<string, number>()

  for (const [day, slugs] of completionsByDay) {
    if (day === today) continue
    const pct = conceptsPerDay > 0
      ? Math.min((slugs.size / conceptsPerDay) * 100, 100)
      : (slugs.size > 0 ? 100 : 0)
    if (pct > 0) result.set(day, pct)
  }

  const completedToday = completionsByDay.get(today) ?? new Set<string>()
  if (studiedToday || completedToday.size > 0) {
    const done = todaysConcepts.filter(name =>
      completedToday.has(name.toLowerCase()) ||
      isConceptDoneToday(name, targets, masteryStateByName, levelUps)
    ).length
    const pct = todaysConcepts.length > 0
      ? (done / todaysConcepts.length) * 100
      : 100
    if (pct > 0) result.set(today, pct)
  }

  return result
}

/**
 * Merge device-local level-ups with the cross-device signal from Supabase,
 * de-duplicating on concept+destination state so the same advance recorded in
 * both places is counted once. Order is preserved, local first.
 */
export function mergeLevelUps(
  local: DailyLevelUp[],
  remote: DailyLevelUp[],
): DailyLevelUp[] {
  const merged: DailyLevelUp[] = []
  const seen = new Set<string>()
  for (const lu of [...local, ...remote]) {
    const key = `${lu.conceptSlug.toLowerCase()}::${lu.to}`
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(lu)
  }
  return merged
}
