// The level-up ceremony's clock (components/ConceptLevelUpCeremony.tsx). Pure
// and tested, so the pace is decided in one place and the CSS keyframes it has
// to agree with are named beside each number.
//
// Two shapes, by how many concepts moved:
//
// - **One concept** gets the card to itself: it spins, blooms into light and —
//   if this was the level-up that collected it — settles back in on a
//   "Collected!" beat. `SINGLE` is that timeline.
// - **Several** pop into a grid together, each spinning and landing a beat after
//   the one before, so a ten-concept quiz takes about as long to celebrate as a
//   two-concept one instead of ten times as long. `gridTimeline` is that one.
//
// Either way the ceremony ends on the summary, which recaps every concept.

/** How long a card's rainbow snake chases its border before the card lands —
 *  the `.collect-card-snake-ring::before` animation in index.css. */
export const SPIN_MS = 650

/** The lone card's timeline, after its spin. */
export const SINGLE = {
  /** The card growing and dissolving into the bloom — `.collect-card-absorb`. */
  absorbMs: 380,
  /** How long the "Collected!" beat holds before the summary. */
  collectedHoldMs: 750,
} as const

/** The grid's pacing. */
export const GRID = {
  /** The longest the cascade of cards popping in may take, whatever the count. */
  cascadeMs: 1200,
  /** The widest gap between two cards — a short run still reads as a ripple,
   *  not as cards arriving one at a time. */
  maxStaggerMs: 160,
  /** How long the finished grid holds before the summary. */
  holdMs: 700,
} as const

/** Most cards the grid draws at `md` — past this they shrink to `sm`, so a big
 *  run still fits a phone screen without scrolling far. */
export const GRID_MD_MAX = 4

export interface GridTimeline {
  /** Gap between one card popping in and the next. */
  staggerMs: number
  /** When each card pops into the grid, from the ceremony's start. */
  appearAt: number[]
  /** When each card lands — its spin over, its new level showing. */
  landAt: number[]
  /** When the grid hands over to the summary. */
  doneAt: number
}

/**
 * When each of `count` cards pops in and lands. The cascade is spread across
 * `GRID.cascadeMs` but never slower than `GRID.maxStaggerMs` a card, so the
 * whole grid is up in the same second and a bit however long the list is.
 */
export function gridTimeline(count: number): GridTimeline {
  const n = Math.max(0, Math.floor(count))
  if (n === 0) return { staggerMs: 0, appearAt: [], landAt: [], doneAt: 0 }
  const staggerMs = n === 1 ? 0 : Math.min(GRID.maxStaggerMs, GRID.cascadeMs / (n - 1))
  const appearAt = Array.from({ length: n }, (_, i) => Math.round(i * staggerMs))
  const landAt = appearAt.map(t => t + SPIN_MS)
  return { staggerMs, appearAt, landAt, doneAt: landAt[n - 1] + GRID.holdMs }
}

/** The card size the grid draws `count` cards at. */
export function gridCardSize(count: number): 'md' | 'sm' {
  return count <= GRID_MD_MAX ? 'md' : 'sm'
}
