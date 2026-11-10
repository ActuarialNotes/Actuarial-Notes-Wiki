/**
 * **A range to hand Fortune-sheet's `setSelection`.**
 *
 * `setSelection` stores the range it is given in the sheet's state and then
 * writes its geometry (top, height, focus…) onto the range's own objects.
 * Immer freezes those objects once the update is done, and React may run the
 * same update again — always in development's Strict Mode, and in production
 * when it replays a batch — so the second run's writes threw "Cannot assign to
 * read only property 'row'" and took the page down.
 *
 * The objects here keep every field behind a getter and setter. A frozen
 * object's setters still run, so a second run writes the same values again
 * instead of throwing; and once Fortune-sheet next changes the selection, Immer
 * copies the object into a plain one, as it does any other.
 */

const FIELDS = [
  'row', 'column', 'row_focus', 'column_focus',
  'left', 'width', 'top', 'height', 'left_move', 'width_move', 'top_move', 'height_move',
] as const

export interface SheetRange { row: [number, number]; column: [number, number] }

/** One cell, or a block of them, as a range `setSelection` can be given. */
export function sheetSelection(row: [number, number], column: [number, number]): SheetRange[] {
  const store: Record<string, unknown> = { row, column, row_focus: row[0], column_focus: column[0] }
  const item = {}
  for (const field of FIELDS) {
    Object.defineProperty(item, field, {
      get: () => store[field],
      set: (value: unknown) => { store[field] = value },
      enumerable: true,
      configurable: true,
    })
  }
  return [item as SheetRange]
}

/** One cell. */
export function cellSelection(row: number, column: number): SheetRange[] {
  return sheetSelection([row, row], [column, column])
}
