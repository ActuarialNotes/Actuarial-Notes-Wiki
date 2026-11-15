import { createContext, useContext } from 'react'
import type { ObjectiveProgress } from '@/lib/objectiveProgress'

/**
 * The reader's standing on an exam page's learning objectives
 * (docs/design-review.md §5.5), handed down by the exam page to the callouts
 * that draw its objectives. Anywhere else there is no provider, and an
 * objective callout is drawn as it always was.
 */
export interface ObjectiveProgressValue {
  /** Progress by objective title (`lib/objectiveProgress.ts`). */
  byTitle: ReadonlyMap<string, ObjectiveProgress>
  /** Whether there is a record to show: signed out, a row carries no count. */
  tracked: boolean
  /**
   * Start a quiz on one objective's concepts, or undefined for an objective
   * (or an exam) with no question to serve.
   */
  practice: (title: string) => (() => void) | undefined
}

export const ObjectiveProgressContext = createContext<ObjectiveProgressValue | null>(null)

/** This objective's progress and its practice, when the page it is on tracks them. */
export function useObjectiveProgress(title: string | null): { progress: ObjectiveProgress; tracked: boolean; practice?: () => void } | null {
  const value = useContext(ObjectiveProgressContext)
  const progress = title ? value?.byTitle.get(title) : undefined
  if (!value || !progress) return null
  return { progress, tracked: value.tracked, practice: value.practice(progress.title) }
}
