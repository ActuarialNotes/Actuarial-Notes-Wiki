// The grids a tool card draws (docs/actuarial-tools.md §6.3).
//
// `EditableTable` is a table tool's grid, which is both its input and its
// output: the field's own columns are typed into, and the result's computed
// columns sit beside them, shaded. `TriangleGrid` is a development triangle,
// with the cumulative ↔ incremental switch every triangle carries. Both take a
// paste from Excel (tab-separated rows) into the cell it lands on and fill
// down and across from there — the way an actuary's data actually arrives.

import { useEffect, useRef, useState, type ClipboardEvent } from 'react'
import { Plus, X } from 'lucide-react'
import { formatValue, type ResultTable, type TableField } from '@/lib/tools'
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
}: {
  field: TableField
  rows: DraftRow[]
  result?: ResultTable
  onChange: (rows: DraftRow[]) => void
}) {
  const inputKeys = new Set(field.columns.map(c => c.key))
  const computed = (result?.columns ?? []).filter(c => c.computed && !inputKeys.has(c.key))

  const setCell = (r: number, key: string, value: string) =>
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

  return (
    <div className="space-y-1">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              {field.columns.map(c => (
                <th key={c.key} scope="col" className={cn('px-2 py-1.5 font-medium', c.kind === 'number' ? 'text-right' : 'text-left')}>
                  {c.label}
                </th>
              ))}
              {computed.map(c => (
                <th key={c.key} scope="col" className="bg-muted/50 px-2 py-1.5 text-right font-semibold text-foreground">
                  {c.label}
                </th>
              ))}
              <th className="w-8" aria-hidden />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-b border-border/60 last:border-0">
                {field.columns.map((c, ci) => (
                  <td key={c.key} className="p-0.5">
                    <input
                      aria-label={`${c.label}, row ${r + 1}`}
                      inputMode={c.kind === 'number' ? 'decimal' : 'text'}
                      value={asText(row[c.key])}
                      onChange={e => setCell(r, c.key, e.target.value)}
                      onPaste={paste(r, ci)}
                      className={cn(cellInput, c.kind === 'number' && 'text-right')}
                    />
                  </td>
                ))}
                {computed.map(c => {
                  const v = result?.rows[r]?.[c.key]
                  return (
                    <td key={c.key} className="bg-muted/50 px-2 py-1.5 text-right font-semibold tabular-nums">
                      {typeof v === 'number' ? formatValue(v, c.unit ?? 'plain') : ''}
                    </td>
                  )
                })}
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
              </tr>
            ))}
          </tbody>
          {result?.footer && (
            <tfoot>
              <tr className="border-t border-border font-semibold">
                {[...field.columns.map(c => ({ c, shaded: false })), ...computed.map(c => ({ c, shaded: true }))].map(({ c, shaded }) => {
                  const v = result.footer![c.key]
                  return (
                    <td key={c.key} className={cn('px-2 py-1.5 tabular-nums', c.kind === 'number' ? 'text-right' : 'text-left', shaded && 'bg-muted/50')}>
                      {typeof v === 'number' ? formatValue(v, c.unit ?? 'plain') : asText(v)}
                    </td>
                  )
                })}
                <td aria-hidden />
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
    </div>
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
              <th scope="col" className="px-2 py-1.5 text-left font-medium">Origin</th>
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
                <td className="p-0.5">
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
