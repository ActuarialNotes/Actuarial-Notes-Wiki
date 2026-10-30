// The rows a finished quiz writes about concept levels: one concept_level_events
// row per step (falls included, in the order the answers caused them) and one
// daily_completions row per climbed (exam, concept) — the study plan's
// "completed today" checkmark. Pure so the shapes can be tested without Supabase.

import type { MasteryState } from './mastery'

/** A quiz's net change for one (exam, concept) mastery row. */
export interface LevelChange {
  conceptSlug: string
  /** The exam whose row changed — absent only on transitions saved before it was recorded. */
  examId?: string
  from: MasteryState
  to: MasteryState
  /**
   * Every state the row passed through, in order, ending at `to` — e.g.
   * `['forgotten', 'level1']` for three misses and then a right answer from
   * Level 3. Absent means the one step from → to.
   */
  path?: MasteryState[]
}

export interface LevelEventRow {
  user_id: string
  exam_id: string
  concept_slug: string
  from_state: MasteryState
  to_state: MasteryState
  at: string
}

export interface DailyCompletionRow extends LevelEventRow {
  day: string
}

function isClimb(state: MasteryState): boolean {
  return state === 'level1' || state === 'level2' || state === 'level3'
}

/**
 * One row per step. Steps of one quiz share its moment, a millisecond apart,
 * so they read back in the order they happened.
 */
export function levelEventRows(
  userId: string,
  changes: readonly LevelChange[],
  fallbackExamId: string | null,
  at: Date,
): LevelEventRow[] {
  const rows: LevelEventRow[] = []
  for (const change of changes) {
    const examId = change.examId ?? fallbackExamId
    if (!examId) continue
    const path = change.path && change.path.length > 0 ? change.path : [change.to]
    let from = change.from
    path.forEach((to, i) => {
      if (to === from) return
      rows.push({
        user_id: userId,
        exam_id: examId,
        concept_slug: change.conceptSlug,
        from_state: from,
        to_state: to,
        at: new Date(at.getTime() + i).toISOString(),
      })
      from = to
    })
  }
  return rows
}

/**
 * The climbs, one per (exam, concept). Each change is filed under its own
 * exam: filing every change under the quiz's first question's exam gave a
 * concept answered on two exams two rows with one key, and Postgres refuses an
 * upsert that touches a row twice — the whole quiz's level-ups were lost.
 */
export function dailyCompletionRows(
  userId: string,
  changes: readonly LevelChange[],
  fallbackExamId: string | null,
  day: string,
  at: Date,
): DailyCompletionRow[] {
  const byKey = new Map<string, DailyCompletionRow>()
  for (const change of changes) {
    if (!isClimb(change.to)) continue
    const examId = change.examId ?? fallbackExamId
    if (!examId) continue
    byKey.set(`${examId}::${change.conceptSlug}`, {
      user_id: userId,
      exam_id: examId,
      concept_slug: change.conceptSlug,
      day,
      from_state: change.from,
      to_state: change.to,
      at: at.toISOString(),
    })
  }
  return [...byKey.values()]
}
