// Fill colours for the readiness ring on the Dashboard's Exam readiness card
// (StudyGuideRadial in components/ReadinessCard.tsx).
//
// Concepts climb through green, so the ring reads as progress at a glance.
// Forgotten leaves the ladder for red.

import type { MasteryState } from '@/lib/mastery'

export const LEVEL_FILL: Record<MasteryState, string> = {
  new:       'rgba(34,197,94,0.10)',
  level1:    'rgba(34,197,94,0.28)',
  level2:    'rgba(34,197,94,0.62)',
  level3:    '#22c55e',
  forgotten: 'rgba(239,68,68,0.45)',
}

/** Solid green, for text that labels a mastered concept. */
export const LEVEL3_TEXT = '#22c55e'

export function masteryFill(state: MasteryState): string {
  return LEVEL_FILL[state]
}
