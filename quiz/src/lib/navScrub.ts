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

/* ------------------------------------------------------------------ *
 * Segments — the chapters of a sequence
 * ------------------------------------------------------------------ */

/**
 * A place where a named stretch of the sequence begins, which is all a caller
 * has to know: a PDF's bookmarks say what starts where and never where anything
 * ends. The stretch runs to the item before the next mark.
 */
export interface NavSegmentMark {
  /** 1-indexed first item of the stretch. */
  start: number
  /** What it is called. A stretch that nothing named has none. */
  label?: string
}

/** A mark once it knows where it ends — what the bar actually draws. */
export interface NavSegment extends NavSegmentMark {
  /** 1-indexed last item, inclusive. */
  end: number
}

/**
 * How many stretches a bar can usefully be cut into.
 *
 * Past this the segments are thinner than the gaps between them and the bar
 * stops being a progress read at all — a hatched strip nobody can aim at. A PDF
 * whose outline is one bookmark per paragraph (they exist) is better served by
 * a plain bar than by 400 hairlines, so it gets one.
 */
export const MAX_NAV_SEGMENTS = 60

/**
 * Turn marks into the stretches that cover the whole sequence.
 *
 * Marks arrive in whatever order and shape the source had them: unsorted, off
 * the end of the document, two on the same item, none at the beginning. All of
 * that is settled here so the bar can render straight down the list.
 *
 * Returns `[]` — a plain, unsegmented bar — when the marks say nothing: none of
 * them, all of them on the first item, or so many that the bar would be noise.
 * One stretch covering everything is not a chapter list, it is a bar.
 */
export function navSegments(marks: NavSegmentMark[], total: number): NavSegment[] {
  if (!Number.isFinite(total) || total < 1) return []

  const starts = new Map<number, string | undefined>()
  for (const mark of marks) {
    if (!mark || !Number.isFinite(mark.start)) continue
    const start = Math.min(total, Math.max(1, Math.round(mark.start)))
    // First mark on an item wins: an outline that points two bookmarks at one
    // page is naming that page's first section, not its last.
    if (!starts.has(start)) starts.set(start, mark.label)
  }
  if (starts.size === 0) return []

  const ordered = [...starts.keys()].sort((a, b) => a - b)
  // Anything before the first mark is a stretch of its own — front matter, a
  // cover page — rather than being folded into the chapter that follows it.
  if (ordered[0] !== 1) ordered.unshift(1)
  if (ordered.length < 2 || ordered.length > MAX_NAV_SEGMENTS) return []

  return ordered.map((start, i) => ({
    start,
    end: i + 1 < ordered.length ? ordered[i + 1] - 1 : total,
    label: starts.get(start),
  }))
}

/** The stretch a position falls in, or `null` if the sequence has none. */
export function segmentAt(segments: NavSegment[], position: number): NavSegment | null {
  if (!Number.isFinite(position)) return null
  const at = Math.round(position)
  return segments.find(segment => at >= segment.start && at <= segment.end) ?? null
}

/**
 * How full one stretch's own bar is, 0–100.
 *
 * The whole-bar fill is `current / total`, so item *i* fills the track up to
 * `i / total` — which is the end of the stretch it is the last item of. Reading
 * each stretch the same way keeps the segmented bar and the plain one agreeing
 * about where a given item leaves the fill.
 */
export function segmentFillPercent(segment: NavSegment, current: number): number {
  const length = segment.end - segment.start + 1
  if (!(length > 0) || !Number.isFinite(current)) return 0
  const done = Math.round(current) - segment.start + 1
  return Math.min(100, Math.max(0, (done / length) * 100))
}

/**
 * Where a key press moves a bar whose items are only worth reaching a *chapter*
 * at a time — a syllabus's learning objectives, where a single position is a
 * thousandth of the exam and stepping one of them moves nothing anyone can see.
 *
 * Modelled on a music player's transport rather than a slider: back from inside
 * a chapter goes to the top of that chapter first, and only then to the one
 * before it, so a press can't skip past what you were reading. Forward always
 * goes to the next chapter's start, and from the last one to the very end.
 */
export function segmentKeyTarget(
  key: string,
  current: number,
  segments: NavSegment[],
  total: number,
): number | null {
  if (segments.length === 0 || !Number.isFinite(total) || total < 1) return null
  const at = Math.min(total, Math.max(1, Number.isFinite(current) ? Math.round(current) : 1))
  const index = segments.findIndex(segment => at >= segment.start && at <= segment.end)
  const here = index >= 0 ? index : segments.length - 1

  switch (key) {
    case 'ArrowLeft':
    case 'ArrowDown':
    case 'PageDown':
      // Back to the top of this chapter, unless that is where we already are.
      return at > segments[here].start ? segments[here].start : segments[Math.max(0, here - 1)].start
    case 'ArrowRight':
    case 'ArrowUp':
    case 'PageUp':
      return here + 1 < segments.length ? segments[here + 1].start : total
    case 'Home':
      return segments[0].start
    case 'End':
      return total
    default:
      return null
  }
}
