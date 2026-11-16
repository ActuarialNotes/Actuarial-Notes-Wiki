// Where the reader stands on each learning objective of an exam page
// (docs/design-review.md §5.5, F12): the objective's concepts by level, and how
// many of them are learned.
//
// An objective's concepts are the ones its callout links (`parseObjectiveSections`),
// each once. *Learned* is Level 1 or higher: a Forgotten concept was learned and
// isn't now, so it is drawn in its own colour and left out of the count.
//
// Pure.

import type { MasteryState } from './mastery'
import type { ObjectiveSection } from './syllabusChapters'

/** The bar's order, most learned first. */
export const OBJECTIVE_BAR_ORDER: readonly MasteryState[] = ['level3', 'level2', 'level1', 'forgotten', 'new']

export interface ObjectiveProgress {
  /** The objective's title, as its callout writes it (weight tag split off). */
  title: string
  /** Its concepts, each once, in the order the page writes them. */
  concepts: string[]
  /** How many of them are in each state. */
  byState: Record<MasteryState, number>
  /** Concepts at Level 1 or higher. */
  learned: number
  total: number
}

/** One objective's progress, given the reader's level on every concept (by lowercased name). */
export function objectiveProgress(
  section: ObjectiveSection,
  states: ReadonlyMap<string, MasteryState>,
): ObjectiveProgress {
  const seen = new Set<string>()
  const concepts = section.concepts.filter(name => {
    const key = name.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  const byState: Record<MasteryState, number> = { new: 0, level1: 0, level2: 0, level3: 0, forgotten: 0 }
  for (const name of concepts) byState[states.get(name.toLowerCase()) ?? 'new'] += 1
  return {
    title: section.title,
    concepts,
    byState,
    learned: byState.level1 + byState.level2 + byState.level3,
    total: concepts.length,
  }
}

/** Every objective's progress by title. An objective that links no concept has none. */
export function objectiveProgressByTitle(
  sections: readonly ObjectiveSection[],
  states: ReadonlyMap<string, MasteryState>,
): Map<string, ObjectiveProgress> {
  const out = new Map<string, ObjectiveProgress>()
  for (const section of sections) {
    const progress = objectiveProgress(section, states)
    // A title the page uses twice keeps its first objective, as the walk's index does.
    if (progress.total > 0 && !out.has(section.title)) out.set(section.title, progress)
  }
  return out
}

/** The bar's segments, in order, as shares of the objective (0–100); empty states left out. */
export function objectiveBar(progress: ObjectiveProgress): { state: MasteryState; percent: number }[] {
  if (progress.total === 0) return []
  return OBJECTIVE_BAR_ORDER
    .filter(state => progress.byState[state] > 0)
    .map(state => ({ state, percent: (progress.byState[state] / progress.total) * 100 }))
}
