// Whether a concept in today's study plan is already done.
//
// Every surface that asks this question must answer it identically: the
// Dashboard's "Today" card checklist, the study-guide header's "Today's Study
// Plan" list (`components/wiki/WikiFloatingSearch.tsx`), *and* the sizing of the
// quiz those surfaces launch — the "questions left today" badge
// (`lib/todayPlanCount.ts`) and the plan quiz built in `pages/Landing.tsx`.
// The rule lives here so a concept can't read as ticked off on the checklist yet
// still be asked for by the badge.
//
// See docs/concept-learning-progression.md for the mastery ladder itself.

import { buildMasteryLookup, resolveConceptState } from '@/lib/conceptMatch'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import type { ConceptAssignment, StudyPlan } from '@/lib/studyPlan'
import type { DailyLevelUp } from '@/lib/dailyProgressStore'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

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

/** The concepts a plan is asking for today (review mode swaps in its own list). */
export function planConceptsToday(plan: StudyPlan | null): string[] {
  if (!plan) return []
  return plan.status === 'review_mode' ? (plan.reviewConcepts ?? []) : plan.todaysConcepts
}

/**
 * Every lower-cased key today's plan concepts can be recognised by: the
 * syllabus display name, plus the raw `[[target]]` basename for aliased links
 * (`[[Bond Price|Price]]` is scheduled as "Price" but stored — and referenced
 * by a question's `wiki_link` — as "Bond Price").
 *
 * Lets a caller holding `slugForLink` slugs (the pre-quiz collect gate) ask
 * whether a concept is in today's plan without re-deriving the alias mapping.
 */
export function planConceptKeys(
  plan: StudyPlan | null,
  syllabus: WikiExamSyllabus | null,
): Set<string> {
  const keys = new Set<string>()
  const targetByName = new Map<string, string>()
  for (const topic of syllabus?.topics ?? []) {
    for (const c of topic.concepts) {
      const base = c.target?.split('/').pop()?.replace(/\.md$/i, '')
      if (base) targetByName.set(c.name.toLowerCase(), base.toLowerCase())
    }
  }
  for (const name of planConceptsToday(plan)) {
    const key = name.toLowerCase()
    keys.add(key)
    const target = targetByName.get(key)
    if (target) keys.add(target)
  }
  return keys
}

/**
 * Decay-adjusted mastery for every concept in a syllabus, keyed by lower-cased
 * display name — the map `buildTodayTargets`/`isConceptDoneToday` read.
 *
 * Goes through `resolveConceptState` rather than the raw `concept_slug` so an
 * aliased syllabus link (`[[Bond Price|Price]]`) still finds its mastery row.
 */
export function masteryStatesForSyllabus(
  syllabus: WikiExamSyllabus | null,
  masteryRecords: ConceptMasteryRecord[],
  examProgressKey: string | null,
  now: Date = new Date(),
): Map<string, MasteryState> {
  const map = new Map<string, MasteryState>()
  if (!syllabus) return map
  const records = examProgressKey
    ? masteryRecords.filter(r => r.exam_id === examProgressKey)
    : masteryRecords
  const lookup = buildMasteryLookup(records)
  for (const topic of syllabus.topics) {
    for (const c of topic.concepts) {
      map.set(c.name.toLowerCase(), resolveConceptState(lookup, c, now))
    }
  }
  return map
}

export interface PlanDoneInput {
  plan: StudyPlan | null
  syllabus: WikiExamSyllabus | null
  masteryRecords: ConceptMasteryRecord[]
  /** exam_progress key (`P`, `FM`, …) — scopes the mastery rows to this exam. */
  examProgressKey: string | null
  /** Today's level-ups: device-local merged with `daily_completions`. */
  levelUps: DailyLevelUp[]
  /** Today's date, `YYYY-MM-DD` local (`todayISO()`). */
  today: string
  now?: Date
}

/**
 * Which of today's plan concepts are already finished, as lower-cased names.
 *
 * This is the set the quiz sizing subtracts from — the "questions left today"
 * badge and the plan quiz itself — and it is deliberately the *same* rule the
 * checklist ticks with (`isConceptDoneToday`): advanced today on any device, or
 * already sitting at today's target. Sizing off today's level-ups alone
 * over-counts, because a concept that needs no work today (a Level 3
 * maintenance refresher is already at its target) never produces a level-up and
 * so would be asked for all day.
 */
export function planDoneConceptSlugs({
  plan,
  syllabus,
  masteryRecords,
  examProgressKey,
  levelUps,
  today,
  now,
}: PlanDoneInput): Set<string> {
  const concepts = planConceptsToday(plan)
  if (concepts.length === 0) return new Set()
  const masteryStateByName = masteryStatesForSyllabus(syllabus, masteryRecords, examProgressKey, now)
  const targets = buildTodayTargets(plan?.assignments ?? [], masteryStateByName, today)
  // Level-ups read back from `daily_completions` know which exam they were
  // credited to; device-local ones don't and apply to whichever plan asks.
  const examLevelUps = examProgressKey
    ? levelUps.filter(lu => !lu.examId || lu.examId === examProgressKey)
    : levelUps
  const done = new Set<string>()
  for (const name of concepts) {
    if (isConceptDoneToday(name, targets, masteryStateByName, examLevelUps)) done.add(name.toLowerCase())
  }
  return done
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
 *
 * When both sources have the same advance, the server row's `examId` is carried
 * onto the kept entry — the local record doesn't know which exam it belonged to,
 * and a tagged entry lets a per-exam reader (`planDoneConceptSlugs`) keep one
 * exam's completions out of another's plan.
 */
export function mergeLevelUps(
  local: DailyLevelUp[],
  remote: DailyLevelUp[],
): DailyLevelUp[] {
  const merged: DailyLevelUp[] = []
  const byKey = new Map<string, DailyLevelUp>()
  for (const lu of [...local, ...remote]) {
    const key = `${lu.conceptSlug.toLowerCase()}::${lu.to}`
    const existing = byKey.get(key)
    if (existing) {
      if (!existing.examId && lu.examId) existing.examId = lu.examId
      continue
    }
    const entry = { ...lu }
    byKey.set(key, entry)
    merged.push(entry)
  }
  return merged
}
