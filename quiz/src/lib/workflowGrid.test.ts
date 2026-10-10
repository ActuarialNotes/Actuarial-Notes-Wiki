import { describe, expect, it } from 'vitest'
import { GRID, NODE, STEP, cellAt, cellCentre, edgeGeometry, fits, freeCellNear, nearestFit, overlaps } from './workflowGrid'

describe('the grid', () => {
  it('snaps a point to the nearest point of the lattice, negative ones too', () => {
    expect(cellAt(cellCentre({ col: 3, row: -2 }))).toEqual({ col: 3, row: -2 })
    expect(cellAt({ x: 3 * GRID + GRID * 0.4, y: -2 * GRID - GRID * 0.4 })).toEqual({ col: 3, row: -2 })
    expect(cellAt({ x: -GRID * 0.6, y: 0 })).toEqual({ col: -1, row: 0 })
  })

  it('keeps a gutter between two cards', () => {
    const a = { col: 0, row: 0 }
    const cols = NODE.w / GRID
    const rows = NODE.h / GRID
    expect(overlaps(a, { col: cols, row: 0 })).toBe(true)
    expect(overlaps(a, { col: cols + 1, row: 0 })).toBe(false)
    expect(overlaps(a, { col: 0, row: rows + 1 })).toBe(false)
    expect(overlaps(a, { col: 3, row: 2 })).toBe(true)
  })

  it('lands a card dropped on another at the nearest place it fits', () => {
    const cards = [{ col: 0, row: 0 }]
    expect(nearestFit(cards, { col: 20, row: 0 })).toEqual({ col: 20, row: 0 })
    const landed = nearestFit(cards, { col: 1, row: 1 })
    expect(fits(cards, landed)).toBe(true)
    // Below is nearest for a card dropped a little low on another.
    expect(landed).toEqual({ col: 1, row: NODE.h / GRID + 1 })
  })

  it('lays new steps a STEP apart: down the column first, below before above, then to the right', () => {
    expect(freeCellNear([], { col: 0, row: 0 })).toEqual({ col: 0, row: 0 })
    const one = [{ col: 12, row: 0 }]
    expect(freeCellNear(one, { col: 12, row: 0 })).toEqual({ col: 12, row: STEP.rows })
    expect(freeCellNear([...one, { col: 12, row: STEP.rows }], { col: 12, row: 0 })).toEqual({ col: 12, row: -STEP.rows })
    // Never to the left of where it was asked for.
    const column = Array.from({ length: 30 }, (_, r) => ({ col: 12, row: (r - 15) * STEP.rows }))
    expect(freeCellNear(column, { col: 12, row: 0 }).col).toBeGreaterThan(12)
  })

  it('runs a line out of one card’s right edge into the next one’s left', () => {
    const { start, end, mid, d } = edgeGeometry({ col: 0, row: 0 }, { col: STEP.cols, row: 0 })
    expect(start.x).toBe(NODE.w / 2)
    expect(end.x).toBeLessThan(STEP.cols * GRID - NODE.w / 2)
    expect(mid.y).toBe(start.y)
    expect(d.startsWith('M')).toBe(true)
  })

  it('bends a line back round to a step behind it', () => {
    const { start, end, d } = edgeGeometry({ col: 24, row: 0 }, { col: 0, row: 6 })
    expect(end.x).toBeLessThan(start.x)
    const [, c1x] = /C(-?[\d.]+)/.exec(d)!
    expect(Number(c1x)).toBeGreaterThan(start.x)
  })
})
