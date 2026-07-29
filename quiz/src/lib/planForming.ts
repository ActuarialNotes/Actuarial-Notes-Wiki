// View-model for the "schedule forming" animation played when a study plan is
// locked in (see components/StudyPlanFormingOverlay.tsx).
//
// A generated StudyPlan is a flat list of assignments keyed by date; the
// animation needs the opposite shape — one entry per calendar day from today
// through exam day, each carrying the concepts that day's plan schedules. The
// overlay walks the result backwards (exam day → today) so the schedule reads
// as filling in toward the present.

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

/** Hard ceiling on the strip so an exam years out can't build an enormous grid. */
export const MAX_FORMING_DAYS = 400

/** Wall-clock budget for the whole reveal, before the settle beat. */
export const TOTAL_REVEAL_MS = 2600

/**
 * How much of a beat a day with nothing scheduled gets. Plans usually end in a
 * stretch of empty buffer days, and that's where the wave starts — at an even
 * pace the animation opens with a second of nothing to read.
 */
const EMPTY_DAY_WEIGHT = 0.3

export interface FormingTimeline {
  /** Reveal delay per day index. Index 0 is today, revealed last. */
  delays: number[]
  /** When the last cell (today) lands. */
  durationMs: number
}

/**
 * Per-beat delay for the reveal wave. Held inside a fixed budget so a 3-week
 * plan and a 6-month plan both finish in roughly the same time, with a floor
 * and ceiling so a long plan never flickers and a short one never crawls.
 */
export function planFormingStepMs(totalWeight: number): number {
  if (totalWeight <= 0) return 0
  return Math.min(90, Math.max(14, Math.round(TOTAL_REVEAL_MS / totalWeight)))
}

/**
 * When each day's cell appears, walking backwards from the end of the plan to
 * today. Days that schedule concepts hold a full beat so they can be read;
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
