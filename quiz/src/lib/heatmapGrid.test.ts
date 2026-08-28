import { describe, it, expect } from 'vitest'
import { dayCellAt } from './heatmapGrid'

// A phone-sized strip: 17 week columns across ~334px, 7 rows of 14px.
const BOX = { width: 334, height: 110, columns: 17, rows: 7, gap: 2 }

describe('dayCellAt', () => {
  it('resolves a point in the middle of a cell', () => {
    const pitchX = (BOX.width + BOX.gap) / BOX.columns
    const pitchY = (BOX.height + BOX.gap) / BOX.rows
    expect(dayCellAt(BOX, pitchX * 3 + 4, pitchY * 5 + 4)).toEqual({ col: 3, row: 5 })
  })

  it('resolves the first and last cells at the box corners', () => {
    expect(dayCellAt(BOX, 0, 0)).toEqual({ col: 0, row: 0 })
    expect(dayCellAt(BOX, BOX.width, BOX.height)).toEqual({ col: 16, row: 6 })
  })

  it('gives a gutter tap to the cell it follows', () => {
    // The 2px gutter after the first row sits at y = 14..16.
    expect(dayCellAt(BOX, 10, 15)).toEqual({ col: 0, row: 0 })
    // …and the pixel after it belongs to the second row.
    expect(dayCellAt(BOX, 10, 17)).toEqual({ col: 0, row: 1 })
  })

  it('covers every pixel of the grid', () => {
    for (let y = 0; y <= BOX.height; y++) {
      for (let x = 0; x <= BOX.width; x++) {
        const hit = dayCellAt(BOX, x, y)
        expect(hit).not.toBeNull()
        expect(hit!.col).toBeGreaterThanOrEqual(0)
        expect(hit!.col).toBeLessThan(BOX.columns)
        expect(hit!.row).toBeGreaterThanOrEqual(0)
        expect(hit!.row).toBeLessThan(BOX.rows)
      }
    }
  })

  it('rejects points outside the grid', () => {
    expect(dayCellAt(BOX, -1, 10)).toBeNull()
    expect(dayCellAt(BOX, 10, -1)).toBeNull()
    expect(dayCellAt(BOX, BOX.width + 1, 10)).toBeNull()
    expect(dayCellAt(BOX, 10, BOX.height + 1)).toBeNull()
  })

  it('rejects a degenerate box', () => {
    expect(dayCellAt({ ...BOX, width: 0 }, 0, 0)).toBeNull()
    expect(dayCellAt({ ...BOX, columns: 0 }, 0, 0)).toBeNull()
  })
})
