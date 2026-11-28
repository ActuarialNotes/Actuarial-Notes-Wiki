// **Numbers that move.** A figure that changes on screen (the syllabus
// covered, an objective's share) counts from the value it showed to the new
// one rather than swapping, so the reader sees which way it went. This is the
// pure half of `components/AnimatedNumber.tsx`: how long the count takes and
// what it shows part-way.

/** How long (ms) a count from `from` to `to` takes: longer for a bigger change, 240 to 600ms. */
export function tweenMs(from: number, to: number): number {
  const change = Math.abs(to - from)
  if (change === 0) return 0
  return Math.round(Math.min(600, 240 + change * 12))
}

/**
 * The whole number on screen `t` of the way (0 to 1) through a count from
 * `from` to `to`. It starts fast and eases in, and never passes `to`.
 */
export function tweenValue(from: number, to: number, t: number): number {
  if (!(t > 0)) return from
  if (t >= 1) return to
  const eased = 1 - Math.pow(1 - t, 3)
  const value = Math.round(from + (to - from) * eased)
  return to >= from ? Math.min(to, value) : Math.max(to, value)
}
