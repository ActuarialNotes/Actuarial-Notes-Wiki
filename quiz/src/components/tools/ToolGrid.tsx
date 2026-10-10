// The grids a tool card draws (docs/actuarial-tools.md §6.3).
//
// `EditableTable` is a table tool's grid, which is both its input and its
// output: the field's own columns are typed into, and the result's computed
// columns sit beside them, shaded. `TriangleGrid` is a development triangle,
// with the cumulative ↔ incremental switch every triangle carries. Both take a
// paste from Excel (tab-separated rows) into the cell it lands on and fill
// down and across from there — the way an actuary's data actually arrives.

import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowDownToLine, ChevronDown, ChevronUp, Minus, Plus, X } from 'lucide-react'
import { formatValue, readNumber, toolById, type NumberUnit, type ResultTable, type TableField } from '@/lib/tools'
import {
  cellCandidates,
  columnSources,
  formatCell,
  formatTotal,
  mapColumn,
  nudge,
  parseScale,
  setColumn,
  sliderRange,
  type Candidate,
  type ColumnSource,
} from '@/lib/toolColumns'
import { lastRun } from '@/lib/toolRuns'
import { fromMode, parseClipboardBlock, toMode, type TriangleMode } from '@/lib/toolDraft'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { cn } from '@/lib/utils'

export type DraftRow = Record<string, unknown>
export interface DraftTriangle {
  origins: unknown[]
  ages: unknown[]
  values: unknown[][]
}

const cellInput =
  'w-full min-w-[4.5rem] bg-transparent px-2 py-1.5 text-sm tabular-nums outline-none rounded focus:bg-background focus:ring-2 focus:ring-ring'

const asText = (v: unknown) => (v == null ? '' : String(v))

export function EditableTable({
  field,
  rows,
  result,
  onChange,
  toolId,
  onFillFrom,
}: {
  field: TableField
  rows: DraftRow[]
  result?: ResultTable
  onChange: (rows: DraftRow[]) => void
  /** The tool the grid belongs to: what its assumption columns can be filled from (§6.6). */
  toolId?: string
  /** Open a source tool's card to fill a column from its result. */
  onFillFrom?: (key: string, source: ColumnSource) => void
}) {
  const inputKeys = new Set(field.columns.map(c => c.key))
  const computed = (result?.columns ?? []).filter(c => c.computed && !inputKeys.has(c.key))
  const tableRef = useRef<HTMLTableElement>(null)
  const coarse = useCoarsePointer()
  const [panel, setPanel] = useState<Panel>(null)
  const [focused, setFocused] = useState<{ r: number; key: string } | null>(null)

  const setCell = (r: number, key: string, value: unknown) =>
    onChange(rows.map((row, i) => (i === r ? { ...row, [key]: value } : row)))

  const paste = (r: number, c: number) => (e: ClipboardEvent<HTMLInputElement>) => {
    const block = parseClipboardBlock(e.clipboardData.getData('text/plain'))
    if (!block) return
    e.preventDefault()
    const next = rows.map(row => ({ ...row }))
    block.forEach((cells, dr) => {
      const at = r + dr
      if (at >= field.maxRows) return
      while (next.length <= at) next.push(Object.fromEntries(field.columns.map(col => [col.key, ''])))
      cells.forEach((cell, dc) => {
        const col = field.columns[c + dc]
        if (col) next[at][col.key] = cell
      })
    })
    onChange(next)
  }

  /** Focus another cell of the grid, if there is one there. */
  const moveTo = (r: number, c: number) => {
    const el = tableRef.current?.querySelector<HTMLInputElement>(`[data-cell="${r}:${c}"]`)
    if (el) {
      el.focus()
      el.select()
    }
  }

  // The spreadsheet keys (§6.6): Enter and the arrows move down and up the
  // column, ⌘/Ctrl+D fills a cell from the one above it.
  const onKey = (r: number, c: number, key: string) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || (e.key === 'ArrowDown' && !e.altKey)) {
      e.preventDefault()
      moveTo(r + 1, c)
    } else if (e.key === 'ArrowUp' && !e.altKey) {
      e.preventDefault()
      moveTo(r - 1, c)
    } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd' && r > 0) {
      e.preventDefault()
      setCell(r, key, rows[r - 1][key])
    }
  }

  const candidates = (r: number, key: string) => (toolId ? cellCandidates(toolId, key, rows, r, lastRun) : [])
  const focusCell = (r: number, key: string) => {
    setFocused({ r, key })
    if (coarse) setPanel({ kind: 'cell', r, key })
  }
  const shownCell = panel?.kind === 'cell' ? panel : focused && !coarse && candidates(focused.r, focused.key).length ? { kind: 'cell' as const, ...focused } : null
  const panelColumn = panel?.kind === 'column' ? field.columns.find(c => c.key === panel.key) : undefined
  const cellColumn = shownCell ? field.columns.find(c => c.key === shownCell.key) : undefined

  // The first computed column — the answer the reader came for — is pinned
  // at the right edge; the rest of the result scrolls in after it.
  const pinRight = (k: number) => (k === 0 ? { position: 'sticky' as const, right: 0 } : undefined)

  return (
    <div className="space-y-1">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table ref={tableRef} className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              {field.columns.map((c, ci) => (
                <th
                  key={c.key}
                  scope="col"
                  className={cn('px-2 py-1.5 font-medium', c.kind === 'number' ? 'text-right' : 'text-left', ci === 0 && PIN_LEFT)}
                >
                  {c.kind === 'number' ? (
                    <button
                      type="button"
                      onClick={() => setPanel(p => (p?.kind === 'column' && p.key === c.key ? null : { kind: 'column', key: c.key }))}
                      aria-expanded={panel?.kind === 'column' && panel.key === c.key}
                      aria-label={`${c.label} column`}
                      className="-mx-1 inline-flex items-center gap-0.5 whitespace-nowrap rounded px-1 py-0.5 hover:bg-accent hover:text-foreground"
                    >
                      {c.label}
                      <ChevronDown className="h-3 w-3" aria-hidden />
                    </button>
                  ) : (
                    c.label
                  )}
                </th>
              ))}
              <th className="w-8" aria-hidden />
              {computed.map((c, k) => (
                <th key={c.key} scope="col" style={pinRight(k)} className={cn('px-2 py-1.5 text-right font-semibold text-foreground', SHADED, k === 0 && EDGE)}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-b border-border/60 last:border-0">
                {field.columns.map((c, ci) => (
                  <td key={c.key} className={cn('p-0.5', ci === 0 && PIN_LEFT)}>
                    <GridCell
                      label={`${c.label}, row ${r + 1}`}
                      dataCell={`${r}:${ci}`}
                      value={row[c.key]}
                      unit={c.kind === 'number' ? c.unit : undefined}
                      number={c.kind === 'number'}
                      noKeyboard={coarse && c.kind === 'number'}
                      selected={shownCell?.r === r && shownCell.key === c.key}
                      onChange={v => setCell(r, c.key, v)}
                      onPaste={paste(r, ci)}
                      onKeyDown={onKey(r, ci, c.key)}
                      onFocus={() => (c.kind === 'number' ? focusCell(r, c.key) : setFocused(null))}
                      onBlur={() => setFocused(f => (f?.r === r && f.key === c.key ? null : f))}
                    />
                  </td>
                ))}
                <td className="p-0.5 text-right">
                  {rows.length > field.minRows && (
                    <button
                      type="button"
                      onClick={() => onChange(rows.filter((_, i) => i !== r))}
                      aria-label={`Remove row ${r + 1}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  )}
                </td>
                {computed.map((c, k) => {
                  const v = result?.rows[r]?.[c.key]
                  return (
                    <td key={c.key} style={pinRight(k)} className={cn('px-2 py-1.5 text-right font-semibold tabular-nums whitespace-nowrap', SHADED, k === 0 && EDGE)}>
                      {typeof v === 'number' ? formatValue(v, c.unit ?? 'plain') : ''}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
          {result?.footer && (
            <tfoot>
              <tr className="border-t border-border font-semibold">
                {field.columns.map((c, ci) => {
                  const v = result.footer![c.key]
                  return (
                    <td key={c.key} className={cn('px-2 py-1.5 tabular-nums whitespace-nowrap', c.kind === 'number' ? 'text-right' : 'text-left', ci === 0 && PIN_LEFT)}>
                      {typeof v === 'number' ? formatTotal(v, c.unit) : asText(v)}
                    </td>
                  )
                })}
                <td aria-hidden />
                {computed.map((c, k) => {
                  const v = result.footer![c.key]
                  return (
                    <td key={c.key} style={pinRight(k)} className={cn('px-2 py-1.5 text-right tabular-nums whitespace-nowrap', SHADED, k === 0 && EDGE)}>
                      {typeof v === 'number' ? formatValue(v, c.unit ?? 'plain') : asText(v)}
                    </td>
                  )
                })}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      {rows.length < field.maxRows && (
        <button
          type="button"
          onClick={() => onChange([...rows, Object.fromEntries(field.columns.map(c => [c.key, '']))])}
          className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <Plus className="h-4 w-4" aria-hidden /> Row
        </button>
      )}
      {panelColumn && (
        <ColumnPanel
          column={panelColumn}
          sources={toolId ? columnSources(toolId, panelColumn.key) : []}
          onFillFrom={source => {
            setPanel(null)
            onFillFrom?.(panelColumn.key, source)
          }}
          onSet={v => onChange(setColumn(rows, panelColumn.key, v))}
          onScale={f => onChange(mapColumn(rows, panelColumn.key, panelColumn.unit, f))}
          onClose={() => setPanel(null)}
        />
      )}
      {shownCell && cellColumn && (
        <CellStepper
          key={`${shownCell.r}:${shownCell.key}`}
          title={`${asText(rows[shownCell.r]?.[field.columns[0].key]) || `Row ${shownCell.r + 1}`} · ${cellColumn.label}`}
          value={rows[shownCell.r]?.[cellColumn.key]}
          unit={cellColumn.unit}
          full={coarse}
          candidates={candidates(shownCell.r, cellColumn.key)}
          onChange={v => setCell(shownCell.r, cellColumn.key, v)}
          onMove={d => {
            const r = shownCell.r + d
            if (r < 0 || r >= rows.length) return
            setPanel({ kind: 'cell', r, key: cellColumn.key })
          }}
          canMove={d => shownCell.r + d >= 0 && shownCell.r + d < rows.length}
          onClose={() => setPanel(null)}
        />
      )}
    </div>
  )
}

type Panel = { kind: 'column'; key: string } | { kind: 'cell'; r: number; key: string } | null

/** The origin column stays at the left edge while the inputs scroll under it. */
const PIN_LEFT = 'sticky left-0 z-[1] bg-card'
/** A computed column: shaded, opaque (it is pinned over scrolling cells), at the right edge. */
const SHADED = 'z-[1] bg-card [background-image:linear-gradient(hsl(var(--muted)/0.6),hsl(var(--muted)/0.6))]'
/** The first pinned column's edge, so the scrolled cells read as passing under it. */
const EDGE = 'shadow-[-6px_0_6px_-6px_rgb(0_0_0/0.35)]'

/** Whether the main pointer is a finger: a number cell then opens the stepper, not the keyboard. */
function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.('(pointer: coarse)').matches)
  useEffect(() => {
    const mq = window.matchMedia?.('(pointer: coarse)')
    if (!mq) return
    const on = () => setCoarse(mq.matches)
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return coarse
}

/**
 * One cell. While it has focus it shows what was typed; once it loses focus,
 * a number prints the way its column does (`1700` → `1,700`), and arithmetic
 * typed into it (`1700*1.05`) is kept as its value.
 */
function GridCell({
  label,
  dataCell,
  value,
  unit,
  number,
  noKeyboard,
  selected,
  onChange,
  onPaste,
  onKeyDown,
  onFocus,
  onBlur,
}: {
  label: string
  dataCell: string
  value: unknown
  unit?: NumberUnit
  number: boolean
  noKeyboard: boolean
  selected: boolean
  onChange: (v: unknown) => void
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
}) {
  const [editing, setEditing] = useState(false)
  const raw = asText(value)
  return (
    <input
      aria-label={label}
      data-cell={dataCell}
      inputMode={noKeyboard ? 'none' : number ? 'decimal' : 'text'}
      value={number && !editing ? formatCell(value, unit) : raw}
      onChange={e => onChange(e.target.value)}
      onPaste={onPaste}
      onKeyDown={onKeyDown}
      onFocus={e => {
        // Swap the printed number for what was typed, and select it, in the
        // focus event itself: left to the re-render, the swap lands after the
        // selection, and typing appends to "1,700" instead of replacing it.
        if (number) {
          e.currentTarget.value = raw
          e.currentTarget.select()
        }
        setEditing(true)
        onFocus()
      }}
      onBlur={() => {
        setEditing(false)
        if (number && typeof value === 'string' && value.trim() !== '' && !Number.isFinite(Number(value.replace(/[,$\s]/g, '')))) {
          const n = readNumber(value, unit === 'percent')
          if (n !== null && !value.trim().endsWith('%')) onChange(Math.round(n * 1e10) / 1e10)
        }
        onBlur()
      }}
      className={cn(cellInput, number && 'text-right', selected && 'bg-background ring-2 ring-ring')}
    />
  )
}

/** A column's menu (§6.6): where its values can come from, and the moves a spreadsheet makes on a column. */
function ColumnPanel({
  column,
  sources,
  onFillFrom,
  onSet,
  onScale,
  onClose,
}: {
  column: TableField['columns'][number]
  sources: ColumnSource[]
  onFillFrom: (s: ColumnSource) => void
  onSet: (v: number) => void
  onScale: (f: (n: number) => number) => void
  onClose: () => void
}) {
  const [setText, setSetText] = useState('')
  const [scaleText, setScaleText] = useState('')
  const setValue = readNumber(setText, column.unit === 'percent')
  const scale = parseScale(scaleText)
  return (
    <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-2.5 text-sm" role="region" aria-label={`${column.label} column`} data-testid="column-panel">
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold">{column.label}</span>
        <button type="button" onClick={onClose} aria-label="Close" className="inline-flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground">
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      {sources.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {sources.map(s => (
            <button
              key={s.tool}
              type="button"
              onClick={() => onFillFrom(s)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <ArrowDownToLine className="h-4 w-4" aria-hidden /> From {toolById(s.tool)?.name ?? s.tool}
            </button>
          ))}
        </div>
      )}
      <form
        className="flex items-center gap-1.5"
        onSubmit={e => {
          e.preventDefault()
          if (setValue !== null) onSet(setValue)
        }}
      >
        <label className="w-24 shrink-0 text-muted-foreground" htmlFor={`set-${column.key}`}>Every row</label>
        <input id={`set-${column.key}`} inputMode="decimal" value={setText} onChange={e => setSetText(e.target.value)} placeholder={column.unit === 'percent' ? '5%' : '1.05'} className={PANEL_INPUT} />
        <button type="submit" disabled={setValue === null} className={PANEL_BUTTON}>Set</button>
      </form>
      <form
        className="flex items-center gap-1.5"
        onSubmit={e => {
          e.preventDefault()
          if (scale) onScale(scale)
        }}
      >
        <label className="w-24 shrink-0 text-muted-foreground" htmlFor={`scale-${column.key}`}>Scale by</label>
        <input id={`scale-${column.key}`} value={scaleText} onChange={e => setScaleText(e.target.value)} placeholder="×1.05 or +5%" className={PANEL_INPUT} />
        <button type="submit" disabled={!scale} className={PANEL_BUTTON}>Apply</button>
      </form>
    </div>
  )
}

const PANEL_INPUT = 'h-9 min-w-0 flex-1 rounded-md border border-border bg-background px-2 text-[16px] tabular-nums sm:text-sm'
const PANEL_BUTTON = 'h-9 shrink-0 rounded-md border border-border bg-background px-3 text-sm font-medium hover:bg-accent disabled:opacity-40'

/**
 * A number cell's stepper (§6.6). On a touch screen it is the way a cell is
 * edited — the value large, − and + at the column's step, a slider centred on
 * the value, ‹ › to the cell above and below — so a CDF is nudged rather than
 * typed on a phone keyboard. Its chips are the candidates the session's last
 * runs offer (the triangle's averages, the last CDFs); with a mouse and
 * keyboard only the chips are shown, under the focused cell.
 */
function CellStepper({
  title,
  value,
  unit,
  full,
  candidates,
  onChange,
  onMove,
  canMove,
  onClose,
}: {
  title: string
  value: unknown
  unit?: NumberUnit
  full: boolean
  candidates: Candidate[]
  onChange: (v: number | string) => void
  onMove: (d: 1 | -1) => void
  canMove: (d: 1 | -1) => boolean
  onClose: () => void
}) {
  const n = readNumber(value, unit === 'percent')
  const [range] = useState(() => sliderRange(unit, n ?? 0))
  const keep = (e: { preventDefault: () => void }) => { if (!full) e.preventDefault() }
  return (
    <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-2.5" role="group" aria-label={`${title} stepper`} data-testid="cell-stepper" onMouseDown={keep}>
      {full && (
        <div className="flex items-center gap-1.5">
          <StepButton label="Previous row" disabled={!canMove(-1)} onClick={() => onMove(-1)}><ChevronUp className="h-4 w-4" aria-hidden /></StepButton>
          <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{title}</span>
          <StepButton label="Next row" disabled={!canMove(1)} onClick={() => onMove(1)}><ChevronDown className="h-4 w-4" aria-hidden /></StepButton>
          <StepButton label="Close" onClick={onClose}><X className="h-4 w-4" aria-hidden /></StepButton>
        </div>
      )}
      {candidates.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Candidates">
          {candidates.map(c => (
            <button
              key={c.label}
              type="button"
              onMouseDown={keep}
              onClick={() => onChange(c.value)}
              aria-pressed={n !== null && Math.abs(n - c.value) < 1e-9}
              className={cn(
                'rounded-full px-2.5 py-1 text-xs font-medium tabular-nums transition-colors',
                n !== null && Math.abs(n - c.value) < 1e-9 ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-accent',
              )}
            >
              {c.label} {formatValue(c.value, unit ?? 'plain')}
            </button>
          ))}
        </div>
      )}
      {full && (
        <>
          <div className="flex items-center gap-2">
            <StepButton label="Decrease" onClick={() => n !== null && onChange(nudge(n, unit, -1))}><Minus className="h-4 w-4" aria-hidden /></StepButton>
            <input
              aria-label={`${title} value`}
              inputMode="decimal"
              value={asText(value)}
              onChange={e => onChange(e.target.value)}
              className="h-10 min-w-0 flex-1 rounded-md border border-border bg-background px-2 text-center text-lg font-semibold tabular-nums"
            />
            <StepButton label="Increase" onClick={() => n !== null && onChange(nudge(n, unit, 1))}><Plus className="h-4 w-4" aria-hidden /></StepButton>
          </div>
          <input
            type="range"
            aria-label={`${title} slider`}
            min={range.min}
            max={range.max}
            step={range.step}
            value={n ?? range.min}
            onChange={e => onChange(Number(e.target.value))}
            className="sim-slider"
          />
        </>
      )}
    </div>
  )
}

function StepButton({ label, disabled, onClick, children }: { label: string; disabled?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-40"
    >
      {children}
    </button>
  )
}

/** A read-only result table: a tool whose view is its output alone. */
export function ResultTableView({ table }: { table: ResultTable }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            {table.columns.map(c => (
              <th key={c.key} scope="col" className={cn('px-2 py-1.5 font-medium', c.kind === 'number' ? 'text-right' : 'text-left', c.computed && 'text-foreground')}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r} className="border-b border-border/60 last:border-0">
              {table.columns.map(c => {
                const v = row[c.key]
                return (
                  <td key={c.key} className={cn('px-2 py-1.5 tabular-nums', c.kind === 'number' ? 'text-right' : 'text-left', c.computed && 'font-semibold')}>
                    {typeof v === 'number' ? formatValue(v, c.unit ?? 'plain') : asText(v)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
        {table.footer && (
          <tfoot>
            <tr className="border-t border-border bg-muted/50 font-semibold">
              {table.columns.map(c => {
                const v = table.footer![c.key]
                return (
                  <td key={c.key} className={cn('px-2 py-1.5 tabular-nums', c.kind === 'number' ? 'text-right' : 'text-left')}>
                    {typeof v === 'number' ? formatValue(v, c.unit ?? 'plain') : asText(v)}
                  </td>
                )
              })}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}

export function TriangleGrid({ value, onChange }: { value: DraftTriangle; onChange: (t: DraftTriangle) => void }) {
  const [mode, setMode] = useState<TriangleMode>('cumulative')
  const [display, setDisplay] = useState<unknown[][]>(() => toMode(value.values, mode))
  // What this grid last sent up: a value arriving from anywhere else (a reset,
  // a pasted run link) re-seeds the display.
  const emitted = useRef<DraftTriangle | null>(null)
  useEffect(() => {
    if (value !== emitted.current) setDisplay(toMode(value.values, mode))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const width = Math.max(value.ages.length, ...display.map(r => r.length))
  const emit = (next: Partial<DraftTriangle>, nextDisplay = display) => {
    const t = { ...value, ...next, values: fromMode(nextDisplay, mode) }
    emitted.current = t
    setDisplay(nextDisplay)
    onChange(t)
  }

  const setCell = (r: number, c: number, cell: string) => {
    const next = display.map(row => [...row])
    while (next[r].length <= c) next[r].push('')
    next[r][c] = cell
    emit({}, next)
  }

  const paste = (r: number, c: number) => (e: ClipboardEvent<HTMLInputElement>) => {
    const block = parseClipboardBlock(e.clipboardData.getData('text/plain'))
    if (!block) return
    e.preventDefault()
    const next = display.map(row => [...row])
    const origins = [...value.origins]
    const ages = [...value.ages]
    block.forEach((cells, dr) => {
      const at = r + dr
      while (next.length <= at) {
        next.push([])
        origins.push(String(origins.length + 1))
      }
      cells.forEach((cell, dc) => {
        const col = c + dc
        while (ages.length <= col) ages.push((Number(ages[ages.length - 1]) || 0) + 12)
        while (next[at].length <= col) next[at].push('')
        next[at][col] = cell
      })
    })
    const w = ages.length
    emit({ origins, ages }, next.map(row => [...row, ...Array(Math.max(0, w - row.length)).fill('')]))
  }

  const switchMode = (m: TriangleMode) => {
    const cumulative = fromMode(display, mode)
    setMode(m)
    setDisplay(toMode(cumulative, m))
  }

  const addOrigin = () => emit({ origins: [...value.origins, String(Number(value.origins[value.origins.length - 1]) + 1 || value.origins.length + 1)] }, [...display, Array(width).fill('')])
  const addAge = () => emit({ ages: [...value.ages, (Number(value.ages[value.ages.length - 1]) || 0) + 12] }, display.map(row => [...row, '']))
  const dropOrigin = () => emit({ origins: value.origins.slice(0, -1) }, display.slice(0, -1))
  const dropAge = () => emit({ ages: value.ages.slice(0, -1) }, display.map(row => row.slice(0, width - 1)))

  return (
    <div className="space-y-1.5">
      <SegmentedControl
        size="sm"
        label="Triangle values"
        value={mode}
        onChange={switchMode}
        options={[
          { value: 'cumulative', label: 'Cumulative' },
          { value: 'incremental', label: 'Incremental' },
        ]}
      />
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th scope="col" className={cn('px-2 py-1.5 text-left font-medium', PIN_LEFT)}>Origin</th>
              {Array.from({ length: width }, (_, c) => (
                <th key={c} scope="col" className="p-0.5">
                  <input
                    aria-label={`Age ${c + 1}`}
                    inputMode="numeric"
                    value={asText(value.ages[c])}
                    onChange={e => emit({ ages: Object.assign([...value.ages], { [c]: e.target.value }) })}
                    className={cn(cellInput, 'text-right text-xs font-medium text-muted-foreground')}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {display.map((row, r) => (
              <tr key={r} className="border-b border-border/60 last:border-0">
                <td className={cn('p-0.5', PIN_LEFT)}>
                  <input
                    aria-label={`Origin ${r + 1}`}
                    value={asText(value.origins[r])}
                    onChange={e => emit({ origins: Object.assign([...value.origins], { [r]: e.target.value }) })}
                    className={cn(cellInput, 'min-w-[3.5rem] font-medium')}
                  />
                </td>
                {Array.from({ length: width }, (_, c) => (
                  <td key={c} className="p-0.5">
                    <input
                      aria-label={`Origin ${asText(value.origins[r])}, age ${asText(value.ages[c])}`}
                      inputMode="decimal"
                      value={asText(row[c])}
                      onChange={e => setCell(r, c, e.target.value)}
                      onPaste={paste(r, c)}
                      className={cn(cellInput, 'text-right')}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-1 text-muted-foreground">
        <GridButton label="Add an origin" onClick={addOrigin}>+ Row</GridButton>
        <GridButton label="Add an age" onClick={addAge}>+ Age</GridButton>
        {value.origins.length > 2 && <GridButton label="Remove the last origin" onClick={dropOrigin}>− Row</GridButton>}
        {width > 2 && <GridButton label="Remove the last age" onClick={dropAge}>− Age</GridButton>}
      </div>
    </div>
  )
}

function GridButton({ label, onClick, children }: { label: string; onClick: () => void; children: string }) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} className="h-8 rounded-md px-2 text-xs font-medium hover:bg-accent hover:text-foreground">
      {children}
    </button>
  )
}
