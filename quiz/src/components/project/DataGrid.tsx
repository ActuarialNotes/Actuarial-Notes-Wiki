import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { csvNumber, parseCsv } from '@/lib/csv'
import { cn } from '@/lib/utils'

/**
 * A read-only view of a CSV — what `View()` is in RStudio: every row, scrolled
 * rather than paged, with a click on a column header to sort by it. Rows are
 * drawn only as they scroll into view, so a data set of tens of thousands of
 * rows opens at once. It shows the data and nothing else: no summaries, no
 * missing-value counts. Finding what is wrong with the data is the candidate's
 * work.
 */

const ROW_HEIGHT = 26
const OVERSCAN = 12

export function DataGrid({ text, label }: { text: string; label: string }) {
  const { columns, rows } = useMemo(() => parseCsv(text), [text])
  const [sort, setSort] = useState<{ col: number; dir: 1 | -1 } | null>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [height, setHeight] = useState(480)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const observer = new ResizeObserver(() => setHeight(el.clientHeight || 480))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const order = useMemo(() => {
    const idx = rows.map((_, i) => i)
    if (!sort) return idx
    const { col, dir } = sort
    const numeric = rows.every(r => r[col] === '' || r[col] === undefined || csvNumber(r[col]) !== null)
    return idx.sort((a, b) => {
      const x = rows[a][col] ?? ''
      const y = rows[b][col] ?? ''
      // Blanks sort last whichever way the column runs.
      if (x === '' || y === '') return x === y ? 0 : x === '' ? 1 : -1
      const cmp = numeric ? (csvNumber(x) as number) - (csvNumber(y) as number) : x.localeCompare(y)
      return cmp * dir
    })
  }, [rows, sort])

  const widths = useMemo(() => columns.map((c, i) => {
    let longest = c.length
    for (let r = 0; r < Math.min(rows.length, 200); r++) longest = Math.max(longest, (rows[r][i] ?? '').length)
    return Math.min(260, Math.max(72, longest * 7.5 + 24))
  }), [columns, rows])

  const first = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN)
  const last = Math.min(order.length, Math.ceil((scrollTop + height) / ROW_HEIGHT) + OVERSCAN)
  const gutter = Math.max(44, String(rows.length).length * 8 + 16)
  const total = gutter + widths.reduce((a, b) => a + b, 0)

  function toggle(col: number) {
    setSort(s => (!s || s.col !== col ? { col, dir: 1 } : s.dir === 1 ? { col, dir: -1 } : null))
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        ref={scroller}
        onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
        className="min-h-0 flex-1 overflow-auto font-mono text-xs"
        tabIndex={0}
        role="table"
        aria-label={label}
        aria-rowcount={rows.length + 1}
      >
        <div style={{ width: total }} className="relative">
          <div role="row" className="sticky top-0 z-10 flex bg-muted" style={{ height: ROW_HEIGHT }}>
            <div className="sticky left-0 z-10 shrink-0 bg-muted" style={{ width: gutter }} />
            {columns.map((c, i) => (
              <button
                key={`${c}-${i}`}
                type="button"
                role="columnheader"
                aria-sort={sort?.col === i ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}
                onClick={() => toggle(i)}
                className="flex shrink-0 items-center gap-1 truncate px-2 text-left font-semibold hover:bg-accent"
                style={{ width: widths[i] }}
                title={`Sort by ${c}`}
              >
                <span className="truncate">{c}</span>
                {sort?.col === i && (sort.dir === 1 ? <ArrowUp className="h-3 w-3 shrink-0" /> : <ArrowDown className="h-3 w-3 shrink-0" />)}
              </button>
            ))}
          </div>
          <div style={{ height: order.length * ROW_HEIGHT }} className="relative">
            {order.slice(first, last).map((rowIndex, k) => {
              const row = rows[rowIndex]
              return (
                <div
                  key={rowIndex}
                  role="row"
                  className={cn('absolute left-0 flex', (first + k) % 2 === 1 && 'bg-muted/40')}
                  style={{ top: (first + k) * ROW_HEIGHT, height: ROW_HEIGHT, width: total }}
                >
                  <div className="sticky left-0 shrink-0 bg-card pr-2 text-right leading-[26px] text-muted-foreground" style={{ width: gutter }}>
                    {rowIndex + 1}
                  </div>
                  {columns.map((_, i) => (
                    <div key={i} role="cell" className="shrink-0 truncate px-2 leading-[26px]" style={{ width: widths[i] }}>
                      {row[i] ?? ''}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="shrink-0 border-t border-border px-3 py-1.5 text-xs text-muted-foreground">
        {rows.length.toLocaleString('en-US')} rows × {columns.length} columns
      </div>
    </div>
  )
}
