// **The pick slides.** When the chosen one of a set changes (the rail's
// place, a tab, a segmented switch, a radio row), the filled shape travels
// from the old choice to the new one rather than one going out and another
// coming on. Nothing opts in: `components/PickSlide.tsx` watches the ARIA
// attributes that say "this one is chosen" and this module, pure, decides
// which changes are one pick moving.

/** The attributes that mark the chosen one of a set. */
export const PICK_ATTRIBUTES = ['aria-current', 'aria-selected', 'aria-checked', 'aria-pressed'] as const

/** Does this attribute value mean chosen? (`aria-current` takes `page`, `true`, `step`…) */
export function isOn(value: string | null | undefined): boolean {
  return value != null && value !== '' && value !== 'false'
}

/** One element whose chosen state flipped. `T` is the element, `P` its parent. */
export interface PickChange<T, P> {
  target: T
  parent: P | null
  /** Its state after the change. */
  on: boolean
}

/**
 * The picks that moved: within one parent, exactly one element went off and
 * exactly one other came on. Anything else (a checkbox ticked on its own, two
 * of a list changing at once) is not one pick moving, and is left alone.
 */
export function movedPicks<T, P>(changes: readonly PickChange<T, P>[]): { from: T; to: T }[] {
  // The last word on each element: a batch can flip one twice.
  const latest = new Map<T, PickChange<T, P>>()
  for (const change of changes) latest.set(change.target, change)
  const byParent = new Map<P, { off: T[]; on: T[] }>()
  for (const change of latest.values()) {
    if (change.parent == null) continue
    const group = byParent.get(change.parent) ?? { off: [], on: [] }
    ;(change.on ? group.on : group.off).push(change.target)
    byParent.set(change.parent, group)
  }
  const moves: { from: T; to: T }[] = []
  for (const { off, on } of byParent.values()) {
    if (off.length === 1 && on.length === 1 && off[0] !== on[0]) moves.push({ from: off[0], to: on[0] })
  }
  return moves
}

/** Is a computed `background-color` nothing to slide (no fill)? */
export function isClearColor(color: string): boolean {
  const c = color.trim().toLowerCase()
  if (c === '' || c === 'transparent') return true
  // An alpha is the part after a slash, or the fourth of an `rgba()` / `hsla()` list.
  const alpha = /\/\s*([\d.]+%?)\s*\)$/.exec(c) ?? (/^(?:rgba|hsla)\(/.test(c) ? /,\s*([\d.]+%?)\s*\)$/.exec(c) : null)
  if (!alpha) return false
  const a = alpha[1].endsWith('%') ? parseFloat(alpha[1]) / 100 : parseFloat(alpha[1])
  return a === 0
}
