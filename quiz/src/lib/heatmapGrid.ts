// Which square of the Study Schedule strip a tap landed on — and, at the foot of
// the file, which days the Dashboard's linear strip spans.
//
// The strip draws a whole exam season at once — a phone fits ~17 week columns
// across, so a day is a square of about 18 css px with 3px gutters between.
// That is still under a comfortable touch target, and a tap that lands in a
// gutter hits the container rather than a day, which is what made tapping days
// on the heatmap feel unreliable. `dayCellAt` maps *any* point inside the grid
// to the day whose column/row band contains it, so the gutters belong to their
// neighbours and every pixel of the strip is a live target.
//
// Pure maths, no DOM: `components/ExamHeatmap.tsx` passes the grid's measured
// box and the pointer offset, and gets back grid coordinates.

export interface HeatmapGridBox {
  /** Measured width of the columns container, in css px. */
  width: number
  /** Measured height of the columns container, in css px. */
  height: number
  /** Number of week columns rendered. */
  columns: number
  /** Rows per column — 7, Monday through Sunday. */
  rows: number
  /** Gap between cells, in css px (the `gap-[3px]` of the flex layout). */
  gap: number
}

export interface HeatmapCell {
  col: number
  row: number
}

/**
 * The cell containing `(x, y)`, measured from the grid's top-left corner.
 *
 * Returns null when the point is outside the grid or the box is degenerate.
 * Points inside are always resolved: a gutter belongs to the cell before it, and
 * the trailing edge of the last column/row resolves to that column/row rather
 * than falling off the end.
 */
export function dayCellAt(box: HeatmapGridBox, x: number, y: number): HeatmapCell | null {
  const { width, height, columns, rows, gap } = box
  if (columns <= 0 || rows <= 0 || width <= 0 || height <= 0) return null
  if (x < 0 || y < 0 || x > width || y > height) return null

  // Cells are laid out on an even pitch: n cells and n-1 gaps span the box, so
  // one cell plus one gap is (span + gap) / n.
  const pitchX = (width + gap) / columns
  const pitchY = (height + gap) / rows

  const col = Math.min(columns - 1, Math.max(0, Math.floor(x / pitchX)))
  const row = Math.min(rows - 1, Math.max(0, Math.floor(y / pitchY)))
  return { col, row }
}

// ── The strip's span ─────────────────────────────────────────────────────────
//
// Which days the Dashboard's schedule strip draws. Every day is on screen at
// once, so each day the strip carries is width taken from every other: the
// span is kept to the stretch that says something — a week of lead-in before
// the first session, the exam's sitting window, and a week past it.

/** Days of lead-in before the first session, and of tail past the exam window. */
export const STRIP_MARGIN_DAYS = 7
/** How far ahead the strip runs when no exam date is set. */
export const STRIP_OPEN_ENDED_DAYS = 28

export interface ScheduleStripInput {
  /** Today, ISO `YYYY-MM-DD`. */
  today: string
  /** Day of the earliest quiz session for this exam, or null when there is none. */
  firstSession: string | null
  /** The reader's exam date, or null when none is set. */
  examDate: string | null
  /** The published sitting window around the exam date (`examWindowFor`), if any. */
  examWindow?: { start: string; end: string } | null
  /** The target-ready date, which the strip always reaches. */
  targetReadyDate?: string | null
}

function shiftIso(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10)
}

function maxIso(...dates: (string | null | undefined)[]): string {
  return dates.reduce<string>((max, d) => (d && d > max ? d : max), '')
}

/**
 * First and last day (ISO, inclusive) the schedule strip draws.
 *
 * It opens `STRIP_MARGIN_DAYS` before the first session — or before today, for
 * an exam not yet quizzed on — and closes the same margin past the end of the
 * exam window, or past exam day when the date is in no known window. With no
 * exam date it runs `STRIP_OPEN_ENDED_DAYS` ahead. Today and the target-ready
 * day are always on it, so a date that has passed never leaves the reader off
 * the end of their own timeline.
 */
export function scheduleStripRange(input: ScheduleStripInput): { start: string; end: string } {
  const { today, firstSession, examDate, examWindow, targetReadyDate } = input
  const opening = firstSession && firstSession < today ? firstSession : today
  const start = shiftIso(opening, -STRIP_MARGIN_DAYS)
  const examEnd = maxIso(examDate, examWindow?.end)
  const end = examEnd
    ? shiftIso(examEnd, STRIP_MARGIN_DAYS)
    : shiftIso(today, STRIP_OPEN_ENDED_DAYS)
  return { start, end: maxIso(end, today, targetReadyDate) }
}
