// Fill colours for the Dashboard's Study Guide radial (components/ReadinessCard.tsx).
//
// Two ladders, same shape: ordinary concepts climb through green, keystone
// concepts (docs/keystone-concepts.md) climb through the matching three shades
// of gold, so the load-bearing spokes are findable in the ring at a glance —
// and a gold ring that stays dim reads directly as "the foundations are
// untouched". A New keystone still shows a faint gold so it reads as a
// keystone before it has been studied.
//
// Forgotten is red in *both* ladders on purpose: a decayed keystone should
// alarm, not sparkle.

import type { MasteryState } from '@/lib/mastery'

export const LEVEL_FILL: Record<MasteryState, string> = {
  new:       'rgba(34,197,94,0.10)',
  level1:    'rgba(34,197,94,0.28)',
  level2:    'rgba(34,197,94,0.62)',
  level3:    '#22c55e',
  forgotten: 'rgba(239,68,68,0.45)',
}

export const KEYSTONE_FILL: Record<MasteryState, string> = {
  new:       'rgba(245,158,11,0.16)',
  level1:    'rgba(245,158,11,0.42)',
  level2:    'rgba(245,158,11,0.72)',
  level3:    '#f59e0b',
  forgotten: 'rgba(239,68,68,0.45)',
}

/** Solid gold, for text that labels a keystone (the radial's centre readout). */
export const KEYSTONE_TEXT = '#f59e0b'
/** Solid green, for text that labels a mastered ordinary concept. */
export const LEVEL3_TEXT = '#22c55e'

export function masteryFill(state: MasteryState, keystone: boolean): string {
  return (keystone ? KEYSTONE_FILL : LEVEL_FILL)[state]
}
