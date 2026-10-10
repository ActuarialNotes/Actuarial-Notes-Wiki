import { describe, expect, it } from 'vitest'
import { CELL, NODE, cellAt, cellCentre, edgeGeometry, freeCellNear } from './workflowGrid'

describe('the grid', () => {
  it('centres a card in its cell, and finds the cell a point is in', () => {
    const c = { col: 2, row: 1 }
    expect(cellAt(cellCentre(c))).toEqual(c)
    // Anywhere in the cell is that cell — a card dropped off-centre snaps.
    expect(cellAt({ x: 2 * CELL.w + 1, y: 2 * CELL.h - 1 })).toEqual(c)
  })

  it('finds the nearest free cell down the column first, below before above, then to the right', () => {
    expect(freeCellNear(new Set(), { col: 0, row: 0 })).toEqual({ col: 0, row: 0 })
    expect(freeCellNear(new Set(['1,1']), { col: 1, row: 1 })).toEqual({ col: 1, row: 2 })
    expect(freeCellNear(new Set(['1,1', '1,2']), { col: 1, row: 1 })).toEqual({ col: 1, row: 0 })
    // Never to the left of where it was asked for.
    const column = new Set(Array.from({ length: 40 }, (_, r) => `1,${r}`))
    expect(freeCellNear(column, { col: 1, row: 0 }).col).toBe(2)
  })

  it('never offers a negative cell', () => {
    const c = freeCellNear(new Set(['0,0', '1,0', '0,1', '1,1']), { col: 0, row: 0 })
    expect(c.col).toBeGreaterThanOrEqual(0)
    expect(c.row).toBeGreaterThanOrEqual(0)
  })

  it('runs a line out of one card’s right edge into the next one’s left', () => {
    const { start, end, mid, d } = edgeGeometry({ col: 0, row: 0 }, { col: 1, row: 0 })
    expect(start.x).toBe(cellCentre({ col: 0, row: 0 }).x + NODE.w / 2)
    expect(end.x).toBeLessThan(cellCentre({ col: 1, row: 0 }).x - NODE.w / 2)
    expect(mid.y).toBe(start.y)
    expect(d.startsWith('M')).toBe(true)
  })

  it('bends a line back round to a step behind it', () => {
    const { start, end, d } = edgeGeometry({ col: 2, row: 0 }, { col: 0, row: 1 })
    expect(end.x).toBeLessThan(start.x)
    const [, c1x] = /C(-?[\d.]+)/.exec(d)!
    expect(Number(c1x)).toBeGreaterThan(start.x)
  })
})
