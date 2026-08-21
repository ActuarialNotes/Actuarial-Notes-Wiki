// The maths behind a *scrubbable* progress bar — dragging along the bar to move
// through the sequence it measures, the way a video's timeline works.
//
// This is the inverse of `navProgressPercent` in `components/NavProgressBar`:
// that turns a position into a fill, this turns a place on the track back into
// a position. Keeping the two consistent is the whole job — if they disagree,
// the bar lands on an item whose fill doesn't reach the finger, which reads as
// the drag being off by one.
//
// Pure, so the awkward parts — a pointer dragged past either end of the track, a
// track that hasn't been laid out yet, an empty sequence — are settled here
// rather than inside a pointer handler.

/**
 * How far along a track a pointer landed, as 0–1.
 *
 * Clamped, because a pointer capture keeps sending moves long after the finger
 * has left the bar: a drag that continues off the left edge should pin to the
 * first item rather than run negative.
 */
export function scrubRatio(clientX: number, trackLeft: number, trackWidth: number): number {
  if (!(trackWidth > 0) || !Number.isFinite(clientX) || !Number.isFinite(trackLeft)) return 0
  return Math.min(1, Math.max(0, (clientX - trackLeft) / trackWidth))
}

/**
 * The 1-indexed item a ratio lands on.
 *
 * `ceil` rather than `round` because the fill is `current / total`: item *i*
 * owns the band the fill covers when it is current, `((i-1)/total, i/total]`.
 * So the item under the finger is always the one whose fill ends at or after
 * it — drag to the far right and the bar is full on the last item, which is
 * where `round` would leave you a half-item short.
 */
export function scrubPosition(ratio: number, total: number): number {
  if (!Number.isFinite(ratio) || !Number.isFinite(total) || total < 1) return 1
  const clamped = Math.min(1, Math.max(0, ratio))
  return Math.min(total, Math.max(1, Math.ceil(clamped * total)))
}

/** Both halves at once — what a pointer handler actually wants. */
export function scrubPositionAt(
  clientX: number,
  trackLeft: number,
  trackWidth: number,
  total: number,
): number {
  return scrubPosition(scrubRatio(clientX, trackLeft, trackWidth), total)
}

/**
 * How much of the sequence PageUp / PageDown covers.
 *
 * A tenth, so the key is a real jump on a long document (42 pages of a 423-page
 * examiner's report) without being uselessly coarse on a short one — where the
 * floor of 1 makes it behave like the arrow keys.
 */
export const SCRUB_PAGE_FRACTION = 0.1

export function scrubPageStep(total: number): number {
  if (!Number.isFinite(total) || total < 1) return 1
  return Math.max(1, Math.round(total * SCRUB_PAGE_FRACTION))
}

/**
 * Where a key press should move a focused scrubber to, or `null` when the key
 * isn't one of ours and the event should be left alone.
 *
 * Both axes step, because a horizontal slider is still driven with Up/Down by
 * plenty of people; Home/End go to the ends. Everything lands inside the
 * sequence, so a press at either end is a no-op rather than an error.
 */
export function scrubKeyTarget(key: string, current: number, total: number): number | null {
  if (!Number.isFinite(total) || total < 1) return null
  const clamp = (value: number) => Math.min(total, Math.max(1, value))
  const at = clamp(Number.isFinite(current) ? Math.round(current) : 1)

  switch (key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      return clamp(at - 1)
    case 'ArrowRight':
    case 'ArrowUp':
      return clamp(at + 1)
    case 'PageDown':
      return clamp(at - scrubPageStep(total))
    case 'PageUp':
      return clamp(at + scrubPageStep(total))
    case 'Home':
      return 1
    case 'End':
      return total
    default:
      return null
  }
}
