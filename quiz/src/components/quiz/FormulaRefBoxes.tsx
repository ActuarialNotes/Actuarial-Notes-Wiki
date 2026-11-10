import { useLayoutEffect, useState, type RefObject } from 'react'
import type { WorkbookInstance } from '@fortune-sheet/react'
import type { FormulaRef } from '@/lib/formulaRefs'

/**
 * The cells a formula being edited uses, outlined on the grid in the colour
 * its reference takes in the entry line (lib/formulaRefs.ts), as a desktop
 * spreadsheet does. Drawn over the grid's cell area and moved with its scroll;
 * it takes no touches.
 *
 * Fortune-sheet places column c at the sum of the widths before it, each plus
 * one pixel of grid line (its `visibledatacolumn`), and rows the same way.
 */

interface Box { key: string; left: number; top: number; width: number; height: number; color: string }
interface Layer { left: number; top: number; width: number; height: number; boxes: Box[] }

function starts(sizes: Record<number, number>, last: number): number[] {
  const at = [0]
  for (let i = 0; i <= last; i++) at.push(at[i] + (sizes[i] ?? 0) + 1)
  return at
}

export default function FormulaRefBoxes({ refs, grid, api }: {
  refs: FormulaRef[]
  grid: RefObject<HTMLDivElement | null>
  api: RefObject<WorkbookInstance | null>
}) {
  const [tick, setTick] = useState(0)
  const [layer, setLayer] = useState<Layer | null>(null)

  // Redraw as the grid scrolls or the pane changes size.
  useLayoutEffect(() => {
    const el = grid.current
    if (!el || !refs.length) return
    const bump = () => setTick(n => n + 1)
    const bars = el.querySelectorAll('.luckysheet-scrollbars')
    bars.forEach(bar => bar.addEventListener('scroll', bump, { passive: true }))
    window.addEventListener('resize', bump)
    return () => {
      bars.forEach(bar => bar.removeEventListener('scroll', bump))
      window.removeEventListener('resize', bump)
    }
  }, [grid, refs.length])

  const key = refs.map(r => `${r.top},${r.left},${r.bottom},${r.right},${r.color}`).join(';')
  useLayoutEffect(() => {
    const el = grid.current
    const sheet = api.current
    const area = el?.querySelector('.fortune-cell-area')
    if (!el || !sheet || !area || !refs.length) { setLayer(null); return }
    const outer = el.getBoundingClientRect()
    const inner = area.getBoundingClientRect()
    const scrollLeft = el.querySelector('.luckysheet-scrollbar-x')?.scrollLeft ?? 0
    const scrollTop = el.querySelector('.luckysheet-scrollbar-y')?.scrollTop ?? 0
    const lastColumn = Math.max(...refs.map(r => r.right))
    const lastRow = Math.max(...refs.map(r => r.bottom))
    const x = starts(sheet.getColumnWidth(Array.from({ length: lastColumn + 1 }, (_, i) => i)), lastColumn)
    const y = starts(sheet.getRowHeight(Array.from({ length: lastRow + 1 }, (_, i) => i)), lastRow)
    const seen = new Set<string>()
    const boxes: Box[] = []
    for (const r of refs) {
      const id = `${r.top},${r.left},${r.bottom},${r.right}`
      if (seen.has(id)) continue
      seen.add(id)
      boxes.push({
        key: id,
        left: x[r.left] - scrollLeft - 1,
        top: y[r.top] - scrollTop - 1,
        width: x[r.right + 1] - x[r.left] + 1,
        height: y[r.bottom + 1] - y[r.top] + 1,
        color: r.color,
      })
    }
    setLayer({ left: inner.left - outer.left, top: inner.top - outer.top, width: inner.width, height: inner.height, boxes })
    // `key` stands for `refs`, which is a new array on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, tick, grid, api])

  if (!layer || !refs.length) return null
  return (
    <div
      aria-hidden="true"
      data-testid="formula-ref-boxes"
      className="pointer-events-none absolute z-[1004] overflow-hidden"
      style={{ left: layer.left, top: layer.top, width: layer.width, height: layer.height }}
    >
      {layer.boxes.map(box => (
        <div
          key={box.key}
          className="absolute rounded-[1px]"
          style={{
            left: box.left, top: box.top, width: box.width, height: box.height,
            border: `2px solid ${box.color}`, background: `${box.color}1f`,
          }}
        />
      ))}
    </div>
  )
}
