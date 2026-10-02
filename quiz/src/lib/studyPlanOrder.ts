// The order the study plan works through a syllabus.
//
// This module answers one question — *in what order should concepts be
// introduced?* — and nothing else. `studyPlan.ts` still owns the state ladder
// (forgotten before level1 before level2 before new), the spacing gaps and the
// daily load; it asks here only how to break ties *within* a state.
//
// The two strategies:
//
//   strong_all  — syllabus order. The exam page lists its concepts in the order
//                 the syllabus teaches them ("Ratemaking, Exposure Base, Line of
//                 Business, …"), so following that order means never meeting a
//                 concept before the one it is defined in terms of. This is the
//                 identity ordering: `allConcepts` is already built by walking
//                 the syllabus top to bottom.
//
//   strong_key  — heaviest topic first. Concepts are ordered by the weight of
//                 the topic that owns them, so the parts of the syllabus worth
//                 the most on the exam are introduced first. Within a weight,
//                 syllabus order still holds.
//
// Neither strategy is alphabetical, which is what the plan used to fall back to
// once state was tied — and with a fresh account *everything* is tied at New, so
// a new learner's first week was whatever the syllabus happened to name starting
// with "A".

import type { TargetStrengthLevel } from '@/lib/studyPlan'

/** The shape `studyPlan.ts` orders — a syllabus concept with its topic weight. */
export interface OrderableConcept {
  /** Display name, as the syllabus links it. */
  name: string
  /** Parsed weight of the topic that owns it. */
  numericWeight?: number
}

export interface OrderOptions {
  strategy: TargetStrengthLevel
}

/**
 * Order a syllabus's concepts for introduction. Returns the same objects, so a
 * caller can build a rank map by identity. Every input concept comes back
 * exactly once under either strategy.
 */
export function orderConceptsForPlan<T extends OrderableConcept>(
  concepts: T[],
  { strategy }: OrderOptions,
): T[] {
  if (strategy !== 'strong_key') return [...concepts]
  // Array.sort is stable, so concepts of equal weight stay in syllabus order.
  return [...concepts].sort((a, b) => (b.numericWeight ?? 0) - (a.numericWeight ?? 0))
}
