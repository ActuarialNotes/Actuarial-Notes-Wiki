// One Actuarial Tool as one card (docs/actuarial-tools.md §6.3) — the
// distribution simulator's shape, for any tool spec: the title (which opens
// the method) and the notation, up to three answer tiles, one view, the
// inputs, and the working folded away. It is live: every change recomputes,
// and there is no Run button. Everything that isn't the answer or an input is
// behind the one ⋯ menu.
//
// The card runs the same engine the MCP connector does (`runTool`), on a
// draft that leaves out every judgment the reader hasn't touched — so the
// result's judgments say honestly which were left at their default (R3), in
// the card, the export and the "Copy for AI" call alike.

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowDownToLine, BadgeCheck, ListChecks, RotateCcw } from 'lucide-react'
import {
  ToolInputError,
  checksFor,
  formatValue,
  runPath,
  runTool,
  toolById,
  toolSlug,
  type ChoiceField,
  type DateField,
  type NumberField,
  type TableField,
  type TriangleField,
  type ToolInput,
  type ToolResult,
  type ToolSpec,
} from '@/lib/tools'
import { fillColumn, scalarSources, selectionsToFactors, type ColumnSource, type Selection } from '@/lib/toolColumns'
import { FactorSelection } from './FactorSelection'
import { lastRun, rememberRun } from '@/lib/toolRuns'
import { SourceSheet, type Sourcing } from './SourceSheet'
import { fromDisplay, toDisplay } from '@/lib/tools/format'
import { runToolCall, toolResultSheets } from '@/lib/toolExport'
import { fieldVisible, groupSources, initialDraft, type Draft } from '@/lib/toolDraft'
import { downloadWorkbook } from '@/lib/xlsx'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { EditableTable, ResultTableView, TriangleGrid, type DraftRow, type DraftTriangle } from './ToolGrid'
import { ToolMenu, type ToolMenuItem } from './ToolMenu'
import { PdfLinkButton } from '@/components/PdfLinkButton'
import { cn } from '@/lib/utils'

export function ToolCard({
  spec,
  initialInput,
  onOpenMethod,
  onResult,
  embedded = false,
}: {
  spec: ToolSpec
  initialInput?: unknown
  onOpenMethod?: () => void
  /** Told each result as it changes (null while an input is unreadable) — the source sheet reads it. */
  onResult?: (result: ToolResult | null) => void
  /** Drawn inside another card's source sheet: no sources of its own, no Send to… */
  embedded?: boolean
}) {
  const navigate = useNavigate()
  const [draft, setDraft] = useState<Draft>(() => initialDraft(spec, initialInput))
  const lastGood = useRef<ToolResult | null>(null)
  const [sourcing, setSourcing] = useState<Sourcing | null>(null)
  // Age-to-Age Factors' selection exhibit (§6.6): the picks, one per interval.
  // A new triangle starts them over.
  const selecting = spec.id === SELECTING_TOOL
  const [selections, setSelections] = useState<(Selection | null)[]>([])
  useEffect(() => setSelections([]), [draft.triangle])

  const outcome = useMemo(() => {
    try {
      const result = runTool(spec, draft)
      lastGood.current = result
      return { result, error: null as string | null }
    } catch (err) {
      if (err instanceof ToolInputError) return { result: lastGood.current, error: err.message }
      throw err
    }
  }, [spec, draft])
  const result = outcome.result
  const stale = outcome.error !== null

  // The session remembers each tool's last good run, for the candidates a
  // cell's stepper offers elsewhere (§6.6); a source sheet is told each result.
  useEffect(() => {
    if (result && !stale) rememberRun(spec.id, result.input)
    onResult?.(stale ? null : result)
  }, [result, stale, spec.id, onResult])

  const set = (key: string, value: unknown) => setDraft(d => ({ ...d, [key]: value }))
  const valueOf = (f: ToolSpec['fields'][number]) => draft[f.key] ?? (f as { default: unknown }).default

  /** Open the tool a column's values come from, filled from this grid where it can be (§6.6). */
  const fillFrom = (field: TableField, key: string, source: ColumnSource) => {
    const tool = toolById(source.tool)
    if (!tool) return
    const column = field.columns.find(c => c.key === key)
    const rows = valueOf(field) as DraftRow[]
    setSourcing({
      title: `${column?.label ?? key} from ${tool.name}`,
      how: source.how,
      tool,
      initial: source.prefill?.(rows) ?? (lastRun(tool.id) as ToolInput | undefined),
      apply: r => set(field.key, fillColumn(valueOf(field) as DraftRow[], key, source.take(r, rows))),
    })
  }

  const slug = toolSlug(spec)
  const menu: ToolMenuItem[] = [
    { key: 'link', label: 'Copy link to this run', icon: 'link', run: () => `${window.location.origin}${runPath(slug, draft)}` },
    { key: 'ai', label: 'Copy for AI (run_tool call)', icon: 'ai', run: () => runToolCall(spec, draft) },
    { key: 'json', label: 'Copy result as JSON', icon: 'json', disabled: !result, run: () => JSON.stringify(result, null, 2) },
    {
      key: 'xlsx', label: 'Download .xlsx', icon: 'download', disabled: !result || stale,
      run: () => { if (result) downloadWorkbook(`${slug}.xlsx`, toolResultSheets(spec, result)) },
    },
    ...(embedded ? [] : spec.next ?? []).flatMap(next => {
      const target = toolById(next.tool)
      if (!target || !result || stale) return []
      const picked = selecting && selections.some(Boolean)
      return [{
        key: `next-${next.tool}`, label: `Send ${picked ? 'selections ' : ''}to ${next.label}`, icon: 'next' as const,
        run: () => {
          const built = picked
            ? selectionsToFactors(result.values.ages as number[], result.values.averages as (number | null)[], selections)
            : next.build(result.input, result)
          navigate(runPath(toolSlug(target), built))
        },
      }]
    }),
  ]

  const grid = spec.grid ? (spec.fields.find(f => f.key === spec.grid) as TableField) : null
  // Every grid-shaped input is drawn: a tool may take two triangles (a ratio) or
  // a table beside its result (rate changes beside the on-level factors).
  const triangles = spec.fields.filter((f): f is TriangleField => f.kind === 'triangle')
  const tables = spec.fields.filter((f): f is TableField => f.kind === 'table' && f.key !== spec.grid)
  const labelled = triangles.length + tables.length + (grid ? 1 : 0) > 1
  const scalars = spec.fields.filter(f => (f.kind === 'number' || f.kind === 'choice' || f.kind === 'date') && fieldVisible(spec, f, draft)) as (NumberField | ChoiceField | DateField)[]

  return (
    <div className="rounded-xl border border-border bg-card p-3 text-card-foreground space-y-3 sm:p-4" data-testid="tool-card">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <button
            type="button"
            onClick={onOpenMethod}
            className="text-left text-base font-semibold leading-tight underline-offset-4 hover:underline"
            title="Open the method"
          >
            {spec.name}
          </button>
          <p className="mt-0.5 min-h-[1.5em] text-sm leading-snug text-muted-foreground tabular-nums">{spec.notation(result?.input ?? (draft as never))}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setDraft(initialDraft(spec))}
            aria-label="Reset"
            title="Reset"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <RotateCcw className="h-5 w-5" aria-hidden />
          </button>
          <ToolMenu items={menu} header={close => <MenuHeader spec={spec} onRead={close} />} />
        </div>
      </div>

      {result && result.tiles.length > 0 && (
        <div className={cn('grid gap-2', result.tiles.length === 1 ? 'grid-cols-1' : result.tiles.length === 2 ? 'grid-cols-2' : 'grid-cols-3', stale && 'opacity-50')}>
          {result.tiles.map(t => (
            <div key={t.symbol + t.label} className="min-w-0 rounded-lg bg-muted/50 px-2.5 py-1.5">
              <p className="truncate text-xs leading-none text-muted-foreground">
                <span className="font-semibold text-foreground">{t.symbol}</span> {t.label === 'Total' ? '' : t.label}
              </p>
              <p className="mt-1 text-lg font-semibold leading-none tabular-nums" data-testid="tool-tile">{formatValue(t.value, t.unit)}</p>
            </div>
          ))}
        </div>
      )}

      {outcome.error && <p role="alert" className="text-sm text-destructive">{outcome.error}</p>}
      {!stale && result?.warnings.map(w => (
        <p key={w} className="text-sm text-amber-700 dark:text-amber-400">{w}</p>
      ))}

      {triangles.map(t => (
        <InputBlock key={t.key} label={labelled ? t.label : null}>
          <TriangleGrid value={valueOf(t) as DraftTriangle} onChange={v => set(t.key, v)} />
        </InputBlock>
      ))}
      {tables.map(t => (
        <InputBlock key={t.key} label={labelled ? t.label : null}>
          <EditableTable field={t} rows={valueOf(t) as DraftRow[]} onChange={rows => set(t.key, rows)} />
        </InputBlock>
      ))}
      {grid ? (
        <InputBlock label={labelled ? grid.label : null}>
          <EditableTable
            field={grid}
            rows={valueOf(grid) as DraftRow[]}
            result={stale ? undefined : result?.table}
            onChange={rows => set(grid.key, rows)}
            toolId={embedded ? undefined : spec.id}
            onFillFrom={(key, source) => fillFrom(grid, key, source)}
          />
        </InputBlock>
      ) : (
        spec.view === 'table' && result?.table && (
          <div className={cn(stale && 'opacity-50')}>
            <ResultTableView table={result.table} />
          </div>
        )
      )}
      {selecting && result && !stale && !embedded && (
        <FactorSelection
          input={result.input}
          intervals={result.values.intervals as string[]}
          averages={result.values.averages as (number | null)[]}
          selections={selections}
          onSelect={setSelections}
        />
      )}

      {scalars.length > 0 && (
        <div className="space-y-1">
          {scalars.map(f =>
            f.kind === 'number' ? (
              <NumberControl
                key={f.key}
                field={f}
                value={Number(valueOf(f))}
                chosen={draft[f.key] !== undefined}
                onChange={v => set(f.key, v)}
                sources={embedded ? [] : scalarSources(spec.id, f.key).map(source => ({
                  label: toolById(source.tool)?.name ?? source.tool,
                  open: () => {
                    const tool = toolById(source.tool)
                    if (!tool) return
                    setSourcing({
                      title: `${f.label} from ${tool.name}`,
                      how: source.how,
                      tool,
                      initial: lastRun(tool.id),
                      apply: r => {
                        const v = source.take(r)
                        if (v != null && Number.isFinite(v)) set(f.key, v)
                      },
                    })
                  },
                }))}
              />
            ) : f.kind === 'date' ? (
              <DateControl key={f.key} field={f} value={String(valueOf(f))} onChange={v => set(f.key, v)} />
            ) : (
              <ChoiceControl key={f.key} field={f} value={String(valueOf(f))} chosen={draft[f.key] !== undefined} onChange={v => set(f.key, v)} />
            ),
          )}
        </div>
      )}

      {result && result.trace.length > 0 && (
        <details className="group text-sm">
          <summary className="cursor-pointer select-none py-1 text-muted-foreground hover:text-foreground">Show working</summary>
          <ol className="mt-1 space-y-1.5" data-math-scope>
            {result.trace.map((step, k) => (
              <li key={k} className="flex items-baseline justify-between gap-3 border-b border-border/50 pb-1.5 last:border-0">
                <span className="min-w-0">
                  <span className="block text-foreground">{step.label}</span>
                  <span className="block truncate font-mono text-xs text-muted-foreground">{step.formula}</span>
                </span>
                <span className="shrink-0 font-semibold tabular-nums">{formatValue(step.result, step.unit)}</span>
              </li>
            ))}
          </ol>
        </details>
      )}
      {sourcing && <SourceSheet sourcing={sourcing} onClose={() => setSourcing(null)} />}
    </div>
  )
}

/** The tool whose card carries the LDF selection exhibit (§6.6). */
const SELECTING_TOOL = 'reserving.age_to_age_factors'

/**
 * The menu's head: the question the tool answers, then what it was tested
 * against (R6) — each source opening in the app's reader. Drawn only for a
 * check `lib/tools/checks.ts` runs, so the line can't claim one that isn't.
 */
function MenuHeader({ spec, onRead }: { spec: ToolSpec; onRead: () => void }) {
  const sources = checksFor(spec.id)
  return (
    <div className="space-y-2">
      <p>{spec.answers}</p>
      {sources.length > 0 && (
        <div className="space-y-1">
          <p className="flex items-center gap-1 font-medium text-foreground">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden /> Tested against
          </p>
          {groupSources(sources).map(s =>
            s.kind === 'questions' ? (
              // Published exam questions: open them, to work them beside the tool.
              <Link key={s.url} to={s.url} onClick={onRead} className="flex items-start gap-1.5 py-0.5 text-left hover:text-foreground hover:underline">
                <ListChecks className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden /> {s.label}
              </Link>
            ) : (
              <PdfLinkButton
                key={s.url}
                url={s.url}
                label={s.label}
                title={s.title}
                subtitle={s.subtitle}
                page={s.page}
                chip={false}
                onOpen={onRead}
                className="text-left text-xs"
              />
            ),
          )}
        </div>
      )}
    </div>
  )
}

/** One of several grid inputs, named, so a card with two triangles says which is which. */
function InputBlock({ label, children }: { label: string | null; children: ReactNode }) {
  if (!label) return <>{children}</>
  return (
    <section className="space-y-1" aria-label={label}>
      <h3 className="text-sm text-muted-foreground">{label}</h3>
      {children}
    </section>
  )
}

/** A date input: the browser's own picker, holding the ISO date the engine reads. */
function DateControl({ field, value, onChange }: { field: DateField; value: string; onChange: (v: string) => void }) {
  const id = `tool-${field.key}`
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <label htmlFor={id} className="text-sm">
        {field.symbol && <span className="font-semibold">{field.symbol}</span>}
        <span className="text-muted-foreground">{field.symbol ? ' — ' : ''}{field.label}</span>
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={e => { if (e.target.value) onChange(e.target.value) }}
        className="h-9 rounded-lg border border-border bg-background px-2 text-sm tabular-nums"
      />
    </div>
  )
}

/** A judgment left at its default says so in place (R3): a small dot, named for screen readers. */
function DefaultDot({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/60 align-middle" title="Default — not yet chosen" aria-label="default, not yet chosen" />
  )
}

function NumberControl({
  field,
  value,
  chosen,
  onChange,
  sources = [],
}: {
  field: NumberField
  value: number
  chosen: boolean
  onChange: (v: number) => void
  /** The tools this value can be taken from (§6.6), each opening in the source sheet. */
  sources?: { label: string; open: () => void }[]
}) {
  const shown = toDisplay(value, field.unit)
  const [text, setText] = useState<string | null>(null)
  const sliderMax = Math.max(field.sliderMax ?? field.max, Math.min(value, field.max))
  const sliderMin = Math.min(field.sliderMin ?? field.min, Math.max(value, field.min))
  const id = `tool-${field.key}`
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm">
          {field.symbol && <span className="font-semibold">{field.symbol}</span>}
          <span className="text-muted-foreground">{field.symbol ? ' — ' : ''}{field.label}</span>
          {field.judgment && <DefaultDot show={!chosen} />}
        </label>
        <span className="flex items-center gap-1">
          {sources.map(s => (
            <button
              key={s.label}
              type="button"
              onClick={s.open}
              aria-label={`${field.label} from ${s.label}`}
              title={`From ${s.label}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <ArrowDownToLine className="h-4 w-4" aria-hidden />
            </button>
          ))}
          <input
            aria-label={`${field.label} value`}
            inputMode="decimal"
            value={text ?? (field.zeroLabel && value === 0 ? field.zeroLabel : String(shown))}
            onFocus={() => setText(String(shown))}
            onChange={e => {
              setText(e.target.value)
              const n = Number(e.target.value.replace(/[,$%\s]/g, ''))
              if (e.target.value.trim() !== '' && Number.isFinite(n)) onChange(fromDisplay(n, field.unit))
            }}
            onBlur={() => setText(null)}
            className="w-24 rounded-md border border-transparent bg-transparent px-1.5 py-0.5 text-right text-base font-semibold tabular-nums outline-none hover:border-border focus:border-border focus:bg-background"
          />
          {field.unit === 'percent' && <span className="text-sm text-muted-foreground">%</span>}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={sliderMin}
        max={sliderMax}
        step={field.step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="sim-slider"
      />
    </div>
  )
}

function ChoiceControl({ field, value, chosen, onChange }: { field: ChoiceField; value: string; chosen: boolean; onChange: (v: string) => void }) {
  const label = (
    <span className="text-sm text-muted-foreground">
      {field.label}
      {field.judgment && <DefaultDot show={!chosen} />}
    </span>
  )
  // A segmented control while the choices fit on one line beside the label;
  // a select once they would wrap.
  if (field.options.length <= 3 && field.options.reduce((n, o) => n + o.label.length, 0) <= 20) {
    return (
      <div className="flex items-center justify-between gap-3 py-1">
        {label}
        <SegmentedControl size="sm" label={field.label} value={value} onChange={onChange} options={field.options.map(o => ({ value: o.value, label: o.label }))} />
      </div>
    )
  }
  return (
    <label className="flex items-center justify-between gap-3 py-1">
      {label}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-9 max-w-[60%] rounded-lg border border-border bg-background px-2 text-sm"
      >
        {field.options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}
