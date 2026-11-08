// The reader's place on a credential path (`data/credentialPaths.ts`), as the
// route on a designation page draws it (`components/wiki/CredentialPath.tsx`).
//
// Everything here is read off what the app already holds: each requirement's
// status in `exam_progress` (the same statuses the Study Guides tracks show)
// and, for an exam being studied, the one readiness score
// (`computeExamReadiness`, passed in). Nothing is estimated: an item whose
// rule the tracks can't express (`progress: 'none'`), or that no track holds
// (the CIA's workshop, the continuing-education stage), has no state at all
// rather than a guessed one, and doesn't count toward the tally.

import type { CredentialPath, PathItem, PathStage } from '../data/credentialPaths'

/** `done` — complete; `studying` — something of it is under way; `todo` — nothing yet. */
export type ItemState = 'done' | 'studying' | 'todo'

export interface ItemProgress {
  state: ItemState
  /** The readiness score, 0–100, for an exam being studied that has one. */
  readyPct?: number
}

/** Status per exam_progress key: `completed`, `in_progress`, `not_started`. */
export type ProgressMap = Record<string, string | undefined>

const isDone = (progress: ProgressMap, id: string) => progress[id] === 'completed'

/** Whether an item is tracked at all — whether the route can say anything about it. */
export function isTracked(item: PathItem): boolean {
  return (item.trackIds?.length ?? 0) > 0 && item.progress !== 'none'
}

/**
 * One requirement's state, or null for an untracked one. `readiness` gives the
 * readiness score by exam key; it is shown only while the exam is in progress.
 */
export function itemProgress(
  item: PathItem,
  progress: ProgressMap,
  readiness: Record<string, number> = {},
): ItemProgress | null {
  if (!isTracked(item)) return null
  const ids = item.trackIds ?? []
  const groups = typeof item.progress === 'object' ? item.progress.anyOf : [ids]
  if (groups.some(group => group.every(id => isDone(progress, id)))) return { state: 'done' }
  const started = ids.some(id => progress[id] === 'in_progress' || progress[id] === 'completed')
  if (!started) return { state: 'todo' }
  const readyPct = item.exam && progress[item.exam] === 'in_progress' ? readiness[item.exam] : undefined
  return readyPct === undefined ? { state: 'studying' } : { state: 'studying', readyPct }
}

export interface StageProgress {
  done: number
  /** The stage's tracked requirements. */
  total: number
  /** Every tracked requirement done, and there was at least one. */
  complete: boolean
}

export function stageProgress(stage: PathStage, progress: ProgressMap): StageProgress {
  let done = 0
  let total = 0
  for (const item of stage.items) {
    const p = itemProgress(item, progress)
    if (!p) continue
    total += 1
    if (p.state === 'done') done += 1
  }
  return { done, total, complete: total > 0 && done === total }
}

/**
 * The tally over the stages up to and including `through` (the page's own
 * stage — on the ASA page, the start and the ASA): "2 of 9 done". Null when
 * the reader has nothing on the path yet, so a signed-out reader, or one on
 * another society, sees a plain route rather than "0 of 9".
 */
export function pathTally(
  path: CredentialPath,
  through: number,
  progress: ProgressMap,
): { done: number; total: number } | null {
  let done = 0
  let total = 0
  let any = false
  for (const stage of path.stages.slice(0, through + 1)) {
    for (const item of stage.items) {
      const p = itemProgress(item, progress)
      if (!p) continue
      total += 1
      if (p.state === 'done') done += 1
      if (p.state !== 'todo') any = true
    }
  }
  return any ? { done, total } : null
}

/**
 * The stage a route opens at when the page names none (the general guide):
 * the first stage with a tracked requirement still to do — the start, for a
 * reader with nothing done — or, once every one is done, the last stage.
 */
export function firstOpenStage(path: CredentialPath, progress: ProgressMap): number {
  const at = path.stages.findIndex(stage => {
    const s = stageProgress(stage, progress)
    return s.total > 0 && !s.complete
  })
  return at < 0 ? path.stages.length - 1 : at
}
