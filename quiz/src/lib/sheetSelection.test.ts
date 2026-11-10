import { describe, expect, it } from 'vitest'
import { produce } from 'immer'
import { cellSelection } from './sheetSelection'

/** What Fortune-sheet's normalizeSelection does to a range it is given. */
function normalize(range: Record<string, unknown>[]) {
  for (const item of range) {
    item.row = [...(item.row as number[])]
    item.top = 40
    item.height = 19
  }
  return range
}

describe('cellSelection', () => {
  it('survives the same update run twice', () => {
    const range = cellSelection(3, 1)
    const update = (ctx: { sel: unknown }) => produce(ctx, draft => { draft.sel = normalize(range as never) })
    const first = update({ sel: null })
    expect(Object.isFrozen((first.sel as unknown[])[0])).toBe(true)
    // A plain object here throws "Cannot assign to read only property".
    const second = update({ sel: null })
    expect(second.sel).toEqual([expect.objectContaining({ row: [3, 3], column: [1, 1], top: 40, height: 19, row_focus: 3 })])
  })

  it('is needed: a plain range throws on the second run', () => {
    const range = [{ row: [3, 3], column: [1, 1] }]
    const update = (ctx: { sel: unknown }) => produce(ctx, draft => { draft.sel = normalize(range) })
    update({ sel: null })
    expect(() => update({ sel: null })).toThrow(/read only/)
  })

  it('becomes a plain object when the selection next changes', () => {
    const state = produce({ sel: null as unknown }, draft => { draft.sel = normalize(cellSelection(0, 0) as never) })
    const next = produce(state, draft => { (draft.sel as { top: number }[])[0].top = 99 })
    const item = (next.sel as object[])[0]
    expect(Object.getOwnPropertyDescriptor(item, 'top')).toHaveProperty('value', 99)
  })
})
