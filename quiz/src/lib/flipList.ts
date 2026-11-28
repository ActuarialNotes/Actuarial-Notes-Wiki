// **A list that rearranges, rather than redraws.** When a filter changes what
// a shelf holds, the cards that stay slide from where they were to where they
// are now, and the cards that are new fade in. This is the pure half of
// `hooks/useFlipList.ts`: from two sets of positions, which items moved and
// by how much, and which are new.

export interface Box { left: number; top: number }

export interface FlipPlan {
  /** Items in both lists that moved: how far back (px) each starts from. */
  moved: { key: string; dx: number; dy: number }[]
  /** Items the list didn't hold before. */
  entered: string[]
}

/** A move shorter than this (px) isn't drawn. */
const MIN_MOVE = 2

/**
 * What to draw when a list goes from `before` to `after`. An item that moved
 * further than `maxTravel` is treated as new: a card flying across two
 * screens says less than one fading in. With nothing before, nothing is drawn.
 */
export function flipPlan(
  before: ReadonlyMap<string, Box>,
  after: ReadonlyMap<string, Box>,
  maxTravel = 900,
): FlipPlan {
  const plan: FlipPlan = { moved: [], entered: [] }
  if (before.size === 0) return plan
  for (const [key, now] of after) {
    const was = before.get(key)
    if (!was) { plan.entered.push(key); continue }
    const dx = was.left - now.left
    const dy = was.top - now.top
    if (Math.abs(dx) < MIN_MOVE && Math.abs(dy) < MIN_MOVE) continue
    if (Math.hypot(dx, dy) > maxTravel) plan.entered.push(key)
    else plan.moved.push({ key, dx, dy })
  }
  return plan
}
