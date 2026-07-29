// View-model for the "schedule forming" playback that runs on the Dashboard's
// Study Schedule card when a study plan is locked in (see
// hooks/useSchedulePlayback.ts).
//
// A generated StudyPlan is a flat list of assignments keyed by date; the
// playback needs the opposite shape — one entry per calendar day from today
// through exam day, each carrying the concepts that day's plan schedules. The
// card walks the result backwards (exam day → today), so the schedule reads as
// rewinding toward the present.

import { addDays, daysBetween, todayISO, type StudyPlan } from '@/lib/studyPlan'

export interface PlanFormingDay {
  date: string                  // YYYY-MM-DD
  concepts: string[]            // distinct concepts scheduled that day, in plan order
  isToday: boolean
  isReadyDay: boolean           // the target ready date
  isExamDay: boolean
  /** Past the last scheduled concept — the buffer left for review and rest. */
  isBuffer: boolean
}

export interface PlanFormingSummary {
  /** Days that schedule at least one concept. */
  studyDays: number
  /** Distinct concepts across the whole strip. */
  concepts: number
}

/**
 * Fired when a study plan is locked in, so the Dashboard's Study Schedule card
 * can play the schedule forming. The config modal is opened from four places
 * and none of them own that card, so the two are joined by an event rather than
 * by threading a callback through every caller.
 */
export const PLAN_LOCKED_EVENT = 'actuarial_study_plan_locked'

export interface PlanLockedDetail {
  /** exam_progress key (e.g. "P", "FM", "5") the plan was saved for. */
  examId: string
}

export function emitPlanLocked(examId: string): void {
  window.dispatchEvent(new CustomEvent<PlanLockedDetail>(PLAN_LOCKED_EVENT, { detail: { examId } }))
}

/** Hard ceiling on the strip so an exam years out can't build an enormous grid. */
export const MAX_FORMING_DAYS = 400

/** Wall-clock budget for the whole sweep, before the settle beat. */
export const TOTAL_REVEAL_MS = 4000

/**
 * How much of a beat a day with nothing scheduled gets. Plans usually end in a
 * stretch of empty buffer days, and that's where the sweep starts — at an even
 * pace the playback would open on a second of nothing to read. Kept close to a
 * full beat all the same: the strip has to travel to each new day, and a sharp
 * speed-up over the buffer turns that travel into a jump.
 */
const EMPTY_DAY_WEIGHT = 0.6

export interface FormingTimeline {
  /** When the sweep reaches each day, in ms. Index 0 is today, reached last. */
  delays: number[]
  /** When the sweep arrives at today. */
  durationMs: number
}

/**
 * Per-beat delay for the sweep. Held inside a fixed budget so a 3-week plan
 * and a 6-month plan both finish in roughly the same time, with a floor and
 * ceiling so a long plan never blurs past and a short one never crawls.
 */
export function planFormingStepMs(totalWeight: number): number {
  if (totalWeight <= 0) return 0
  return Math.min(90, Math.max(14, Math.round(TOTAL_REVEAL_MS / totalWeight)))
}

/**
 * When the sweep reaches each day, walking backwards from the end of the plan
 * to today. Days that schedule concepts hold a full beat so they can be read;
 * empty days go by in a fraction of one.
 */
export function buildFormingTimeline(days: PlanFormingDay[]): FormingTimeline {
  const n = days.length
  if (n === 0) return { delays: [], durationMs: 0 }

  const weight = (d: PlanFormingDay) => (d.concepts.length > 0 ? 1 : EMPTY_DAY_WEIGHT)
  let totalWeight = 0
  for (let i = 0; i < n - 1; i++) totalWeight += weight(days[i])
  const step = planFormingStepMs(totalWeight)

  const delays = new Array<number>(n)
  delays[n - 1] = 0
  for (let i = n - 2; i >= 0; i--) {
    delays[i] = delays[i + 1] + step * weight(days[i])
  }
  return { delays, durationMs: delays[0] }
}

/**
 * One entry per calendar day from today through the end of the plan — exam day
 * when it's set and still ahead, otherwise the (effective) ready date. Days
 * with no assignments are kept: the gaps and the tail of empty buffer days
 * before the exam are part of what the schedule looks like.
 */
export function buildPlanFormingDays(input: {
  plan: StudyPlan
  examDate: string | null
  today?: string
  maxDays?: number
}): PlanFormingDay[] {
  const { plan, examDate } = input
  const today = input.today ?? todayISO()
  const maxDays = input.maxDays ?? MAX_FORMING_DAYS

  // Concepts per day, deduplicated — a concept can hold two assignments on one
  // day (e.g. a maintenance refresher landing on its own review slot).
  const conceptsByDate = new Map<string, string[]>()
  let lastScheduled = today
  for (const a of plan.assignments) {
    if (a.scheduledDate < today) continue
    const existing = conceptsByDate.get(a.scheduledDate)
    if (existing) {
      if (!existing.some(n => n.toLowerCase() === a.conceptName.toLowerCase())) {
        existing.push(a.conceptName)
      }
    } else {
      conceptsByDate.set(a.scheduledDate, [a.conceptName])
    }
    if (a.scheduledDate > lastScheduled) lastScheduled = a.scheduledDate
  }

  // Today's concepts come from the plan itself rather than the assignment list:
  // generation can substitute concepts already worked on today.
  if (plan.todaysConcepts.length > 0) conceptsByDate.set(today, [...plan.todaysConcepts])

  const readyDate = plan.config?.targetReadyDate ?? plan.effectiveReadyDate

  // ISO dates compare correctly as strings.
  let endDate = lastScheduled
  if (plan.effectiveReadyDate > endDate) endDate = plan.effectiveReadyDate
  if (examDate && examDate > endDate) endDate = examDate

  const count = Math.min(maxDays, Math.max(1, daysBetween(today, endDate) + 1))

  const days: PlanFormingDay[] = []
  for (let i = 0; i < count; i++) {
    const date = addDays(today, i)
    days.push({
      date,
      concepts: conceptsByDate.get(date) ?? [],
      isToday: date === today,
      isReadyDay: date === readyDate,
      isExamDay: !!examDate && date === examDate,
      isBuffer: date > lastScheduled,
    })
  }
  return days
}

export function summarizeFormingDays(days: PlanFormingDay[]): PlanFormingSummary {
  const seen = new Set<string>()
  let studyDays = 0
  for (const d of days) {
    if (d.concepts.length > 0) studyDays++
    for (const c of d.concepts) seen.add(c.toLowerCase())
  }
  return { studyDays, concepts: seen.size }
}

/**
 * The busiest day's concept count, used to scale each cell's fill so the grid
 * reads as a workload map rather than a flat block of colour.
 */
export function peakDailyLoad(days: PlanFormingDay[]): number {
  return days.reduce((max, d) => Math.max(max, d.concepts.length), 0)
}

/**
 * Which day the sweep has reached at `elapsed` — an index into the day strip,
 * starting at `days.length - 1` and arriving at 0 (today) after `durationMs`.
 */
export function formingIndexAt(timeline: FormingTimeline, elapsed: number): number {
  const { delays } = timeline
  const n = delays.length
  if (n === 0) return 0
  if (elapsed <= 0) return n - 1
  if (elapsed >= timeline.durationMs) return 0

  // Delays descend as the index grows, so walk down to the first day reached.
  let i = n - 1
  while (i > 0 && delays[i - 1] <= elapsed) i--
  return i
}
