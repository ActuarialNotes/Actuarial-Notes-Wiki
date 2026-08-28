// Which square of the Study Schedule strip a tap landed on.
//
// The strip draws a whole exam season at once — a phone fits ~17 week columns
// across, so a day is about 18×14 css px with 2px gutters between. That is well
// under a comfortable touch target, and a tap that lands in a gutter hits the
// container rather than a day, which is what made tapping days on the heatmap
// feel unreliable. `dayCellAt` maps *any* point inside the grid to the day whose
// column/row band contains it, so the gutters belong to their neighbours and
// every pixel of the strip is a live target.
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
  /** Gap between cells, in css px (the `gap-[2px]` of the flex layout). */
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
