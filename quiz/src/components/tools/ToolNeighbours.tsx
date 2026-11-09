// **Takes from** and **Gives to** (docs/tool-template-v2.md §3.3): the tools in
// front of this one and after it, read off every tool's hand-offs in both
// directions. Takes from sits above the answer card, Gives to below the
// inputs; either is hidden when it has no tools. One tool is named with a way
// to open it; several name the first and "+ N more", and the line opens a
// list. Gives to's list shows the values each tool would receive, so the
// reader knows what moves before leaving.

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatValue, runTool, toolSlug, type NumberField, type ToolInput } from '@/lib/tools'
import { carried, type Neighbour } from '@/lib/toolTemplate'
import { fieldQuantities, figureFor, quantityStep, stepBackground } from '@/lib/toolFigures'
import { cn } from '@/lib/utils'

const LINE = 'flex w-full items-center gap-2 rounded-xl bg-card px-3.5 py-2.5 text-left text-sm'

function Swatch({ step }: { step: ReturnType<typeof quantityStep> | null }) {
  if (!step) return <span className="h-2.5 w-2.5 shrink-0" aria-hidden />
  return <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: stepBackground(step) }} aria-hidden />
}

export function TakesFrom({ neighbours, linked }: {
  neighbours: Neighbour[]
  /** The tool a link was made from: once there is one, the line names only it. */
  linked?: string | null
}) {
  const [open, setOpen] = useState(false)
  const shown = linked ? neighbours.filter(n => n.tool.id === linked) : neighbours
  const list = shown.length ? shown : neighbours
  if (!list.length) return null
  if (list.length === 1) {
    const t = list[0].tool
    return (
      <Link to={`/tools/${toolSlug(t)}`} className={cn(LINE, 'transition-colors hover:bg-muted/60')} data-testid="tool-takes-from">
        <span className="text-muted-foreground">Takes from</span>
        <b className="min-w-0 flex-1 truncate font-semibold">{t.name}</b>
        <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <span className="text-muted-foreground">open</span>
      </Link>
    )
  }
  return (
    <div className="overflow-hidden rounded-xl bg-card" data-testid="tool-takes-from">
      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} className={cn(LINE, 'rounded-none hover:bg-muted/60')}>
        <span className="text-muted-foreground">Takes from</span>
        <span className="min-w-0 flex-1 truncate">
          <b className="font-semibold">{list[0].tool.name}</b> <span className="text-muted-foreground">+ {list.length - 1} more</span>
        </span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open && (
        <ul className="divide-y divide-border/60 border-t border-border/60">
          {list.map(n => (
            <li key={n.tool.id}>
              <Link to={`/tools/${toolSlug(n.tool)}`} className="flex items-center gap-2 px-3.5 py-2.5 text-sm transition-colors hover:bg-muted/60">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{n.tool.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{n.tool.answers}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/** One value a hand-off would carry, as Gives to's list prints it: "F 11.0% → Fixed expense ratio". */
interface CarriedRow {
  key: string
  text: string
  label: string
  step: ReturnType<typeof quantityStep> | null
}

function carriedRows(n: Neighbour, built: Partial<ToolInput> | null): CarriedRow[] {
  if (!built) return []
  // The arriving tool's own figure says which quantity each field is.
  let quantities = new Map<string, Parameters<typeof quantityStep>[0]>()
  try {
    quantities = fieldQuantities(figureFor(runTool(n.tool, built)))
  } catch {
    // A value the arriving tool would refuse: no swatches, the values still listed.
  }
  return carried(n.tool, built).map(({ field, value }) => {
    const shown = field.kind === 'number' && typeof value === 'number'
      ? formatValue(value, (field as NumberField).unit)
      : Array.isArray(value) ? `${value.length} rows` : String(value)
    const q = quantities.get(field.key)
    return {
      key: field.key,
      text: [field.symbol, shown].filter(Boolean).join(' '),
      label: field.label,
      step: q ? quantityStep(q) : null,
    }
  })
}

export function GivesTo({ neighbours, build, onSend }: {
  neighbours: Neighbour[]
  /** What each hand-off would carry from the current result; null while there is none to send. */
  build: (n: Neighbour) => Partial<ToolInput> | null
  onSend: (n: Neighbour) => void
}) {
  const [open, setOpen] = useState(false)
  const rows = useMemo(() => new Map(neighbours.map(n => [n.tool.id, open ? carriedRows(n, build(n)) : []])), [neighbours, build, open])
  if (!neighbours.length) return null
  if (neighbours.length === 1) {
    const n = neighbours[0]
    const ready = build(n) !== null
    return (
      <button type="button" onClick={() => onSend(n)} disabled={!ready} className={cn(LINE, 'transition-colors hover:bg-muted/60 disabled:opacity-50')} data-testid="tool-gives-to">
        <span className="text-muted-foreground">Gives to</span>
        <b className="min-w-0 flex-1 truncate font-semibold">{n.tool.name}</b>
        <span className="text-muted-foreground">open</span>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      </button>
    )
  }
  return (
    <div className="overflow-hidden rounded-xl bg-card" data-testid="tool-gives-to">
      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} className={cn(LINE, 'rounded-none hover:bg-muted/60')}>
        <span className="text-muted-foreground">Gives to</span>
        <b className="min-w-0 flex-1 truncate font-semibold">{neighbours.length} tools</b>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open && (
        <>
          <ul className="divide-y divide-border/60 border-t border-border/60">
            {neighbours.map(n => {
              const ready = build(n) !== null
              return (
                <li key={n.tool.id}>
                  <button
                    type="button"
                    onClick={() => onSend(n)}
                    disabled={!ready}
                    aria-label={`Open ${n.tool.name}`}
                    className="block w-full px-3.5 py-2.5 text-left transition-colors hover:bg-muted/60 disabled:opacity-50"
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <b className="min-w-0 flex-1 font-semibold">{n.tool.name}</b>
                      <span className="text-muted-foreground">open</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    </span>
                    {(rows.get(n.tool.id) ?? []).map(r => (
                      <span key={r.key} className="mt-1 flex items-center gap-2 text-xs" data-testid="carried-value">
                        <Swatch step={r.step} />
                        <span className="tabular-nums">{r.text}</span>
                        <span className="text-muted-foreground">→ {r.label}</span>
                      </span>
                    ))}
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="border-t border-border/60 px-3.5 py-2 text-xs text-muted-foreground">Opening one carries its values. {neighbours.length === 2 ? 'The other is left as it is.' : 'The others are left as they are.'}</p>
        </>
      )}
    </div>
  )
}
