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
//
// Easy to pick up cold: the card says under its name what it is for (the one
// question it answers), its title carries a book to say it opens the method,
// a reset can be undone for a few seconds, the tool page keeps the reader's
// inputs between visits (`persist`), and a problem with an input is said under
// that input, with the input ringed — not in a line at the top of the card.

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowDownToLine, BadgeCheck, BookOpen, Database, ListChecks, RotateCcw, Undo2 } from 'lucide-react'
import {
  ToolInputError,
  checksFor,
  datasetsFor,
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
import { ToolFigure } from './ToolFigure'
import { figureFor } from '@/lib/toolFigures'
import { lastRun, rememberRun } from '@/lib/toolRuns'
import { SourceSheet, type Sourcing } from './SourceSheet'
import { fromDisplay, toDisplay } from '@/lib/tools/format'
import { runToolCall, toolResultSheets } from '@/lib/toolExport'
import { draftFromStore, draftToStore, fieldVisible, groupSources, initialDraft, type Draft } from '@/lib/toolDraft'
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
  linked,
  persist = false,
}: {
  spec: ToolSpec
  initialInput?: unknown
  onOpenMethod?: () => void
  /** Told each result as it changes (null while an input is unreadable) — the source sheet reads it. */
  onResult?: (result: ToolResult | null) => void
  /** Drawn inside another card's source sheet: no sources of its own, no Send to… */
  embedded?: boolean
  /**
   * Fields another step fills (a workflow's links): their values are
   * drawn on the primary colour, the colour of a link (docs/workflows.md).
   */
  linked?: ReadonlySet<string>
  /**
   * Keep the reader's inputs on this device between visits (the tool's own
   * page): opened with no run of its own, the card starts from them.
   */
  persist?: boolean
}) {
  const navigate = useNavigate()
  const storeKey = `${DRAFT_STORE}${spec.id}`
  const [draft, setDraft] = useState<Draft>(() =>
    (persist && initialInput === undefined ? draftFromStore(spec, readStore(storeKey)) : null) ?? initialDraft(spec, initialInput),
  )
  useEffect(() => {
    if (persist) writeStore(storeKey, draftToStore(spec, draft))
  }, [persist, storeKey, spec, draft])
  // A reset can be taken back for a few seconds: one tap shouldn't cost a
  // reader the triangle they typed in.
  const [undo, setUndo] = useState<Draft | null>(null)
  useEffect(() => {
    if (!undo) return
    const t = window.setTimeout(() => setUndo(null), 8000)
    return () => window.clearTimeout(t)
  }, [undo])
  const reset = () => {
    if (draftToStore(spec, draft) !== null) setUndo(draft)
    setDraft(initialDraft(spec))
  }
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
      return { result, error: null as string | null, errorField: null as string | null }
    } catch (err) {
      if (err instanceof ToolInputError) return { result: lastGood.current, error: err.message, errorField: err.field }
      throw err
    }
  }, [spec, draft])
  const result = outcome.result
  const stale = outcome.error !== null
  // The figure (§6.7), from the same run as the tiles.
  const figure = useMemo(() => (result ? figureFor(result) : null), [result])
  /** A figure's dragged point sets its input, held to the field's step and bounds as a slider is. */
  const dragTo = (key: string, value: number) => {
    const f = spec.fields.find(x => x.key === key)
    if (!f || f.kind !== 'number') return
    const stepped = f.integer ? Math.round(value) : Math.round(value / f.step) * f.step
    set(key, Math.min(f.max, Math.max(f.min, Number(stepped.toFixed(10)))))
  }

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
    ...(onOpenMethod ? [{ key: 'method', label: 'Read about the method', icon: 'method' as const, run: onOpenMethod }] : []),
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
  // An input's problem is said where the input is; one the card draws nowhere is said under the tiles.
  const drawn = new Set([...triangles, ...tables, ...(grid ? [grid] : []), ...scalars].map(f => f.key))
  const errorAt = (key: string) => (outcome.errorField === key ? outcome.error : null)
  const looseError = outcome.error && !drawn.has(outcome.errorField ?? '') ? outcome.error : null

  return (
    <div className="rounded-xl border border-border bg-card p-3 text-card-foreground space-y-2.5 sm:space-y-3 sm:p-4" data-testid="tool-card">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {onOpenMethod ? (
            <button
              type="button"
              onClick={onOpenMethod}
              className="group inline-flex items-center gap-1.5 text-left text-base font-semibold leading-tight underline-offset-4 hover:underline"
              title="Read about the method"
            >
              {spec.name}
              <BookOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" aria-hidden />
            </button>
          ) : (
            <p className="text-base font-semibold leading-tight">{spec.name}</p>
          )}
          <Lead question={embedded ? null : spec.answers} notation={spec.notation(result?.input ?? (draft as never))} />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {undo ? (
            <button
              type="button"
              onClick={() => { setDraft(undo); setUndo(null) }}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:bg-accent"
              data-testid="tool-undo-reset"
            >
              <Undo2 className="h-4 w-4" aria-hidden /> Undo
            </button>
          ) : (
            <button
              type="button"
              onClick={reset}
              aria-label="Reset to the example"
              title="Reset to the example"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <RotateCcw className="h-5 w-5" aria-hidden />
            </button>
          )}
          <ToolMenu items={menu} header={close => <MenuHeader spec={spec} onRead={close} />} />
        </div>
      </div>

      {result && result.tiles.length > 0 && (
        <div className={cn('grid gap-2', result.tiles.length === 1 ? 'grid-cols-1' : result.tiles.length === 2 ? 'grid-cols-2' : 'grid-cols-3', stale && 'opacity-50')}>
          {result.tiles.map(t => (
            <div key={t.symbol + t.label} className="flex min-w-0 flex-col justify-between rounded-lg bg-muted/50 px-2.5 py-1.5" title={`${t.symbol} ${t.label}`}>
              {/* The label wraps rather than being cut: "e40 Life exp…" said nothing. */}
              <p className="line-clamp-2 text-[11px] leading-[13px] text-muted-foreground">
                <Sym className="font-semibold text-foreground">{t.symbol}</Sym> {t.label === 'Total' ? '' : t.label}
              </p>
              <p className="mt-1 truncate text-lg font-semibold leading-none tabular-nums" data-testid="tool-tile">{formatValue(t.value, t.unit)}</p>
            </div>
          ))}
        </div>
      )}

      {figure && (
        <div className={cn(stale && 'opacity-50')}>
          {/* A card with five or more inputs on screen draws a shorter figure, so it still fits one phone screen (R10). */}
          <ToolFigure figure={figure} onDrag={dragTo} height={scalars.length >= 6 ? 56 : scalars.length >= 5 ? 64 : scalars.length >= 4 ? 80 : 96} />
        </div>
      )}

      {looseError && <FieldError message={looseError} />}
      {!stale && result?.warnings.map(w => (
        <p key={w} className="text-sm text-amber-700 dark:text-amber-400">{w}</p>
      ))}

      {triangles.map(t => (
        // A triangle names itself on the line its cumulative ↔ incremental switch sits on.
        <InputBlock key={t.key} field={t.key} label={labelled ? t.label : null} error={errorAt(t.key)} inline>
          <TriangleGrid
            value={valueOf(t) as DraftTriangle}
            onChange={v => set(t.key, v)}
            linked={linked?.has(t.key)}
            title={labelled ? <FieldName symbol={t.symbol} label={t.label} /> : null}
          />
        </InputBlock>
      ))}
      {tables.map(t => (
        <InputBlock key={t.key} field={t.key} label={labelled ? t.label : null} symbol={t.symbol} error={errorAt(t.key)}>
          <EditableTable field={t} rows={valueOf(t) as DraftRow[]} onChange={rows => set(t.key, rows)} linked={linked?.has(t.key)} />
        </InputBlock>
      ))}
      {grid ? (
        <InputBlock field={grid.key} label={labelled ? grid.label : null} symbol={grid.symbol} error={errorAt(grid.key)}>
          <EditableTable
            field={grid}
            linked={linked?.has(grid.key)}
            rows={valueOf(grid) as DraftRow[]}
            result={stale ? undefined : result?.table}
            onChange={rows => set(grid.key, rows)}
            toolId={embedded ? undefined : spec.id}
            onFillFrom={(key, source) => fillFrom(grid, key, source)}
          />
        </InputBlock>
      ) : (
        spec.view === 'table' && result?.table && (
          // Under the grids it is drawn from, the result is named, so it isn't read as a third input.
          <section className={cn('space-y-1', stale && 'opacity-50')} aria-label={spec.resultLabel ?? 'Result'}>
            {triangles.length + tables.length > 0 && <h3 className="text-sm font-medium">{spec.resultLabel ?? 'Result'}</h3>}
            <ResultTableView table={result.table} />
          </section>
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
        <div className="space-y-0.5">
          {scalars.map(f => (
            <div key={f.key}>
              {f.kind === 'number' ? (
                <NumberControl
                  field={f}
                  value={Number(valueOf(f))}
                  chosen={draft[f.key] !== undefined}
                  linked={linked?.has(f.key)}
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
                <DateControl field={f} value={String(valueOf(f))} linked={linked?.has(f.key)} onChange={v => set(f.key, v)} />
              ) : (
                <ChoiceControl field={f} value={String(valueOf(f))} chosen={draft[f.key] !== undefined} linked={linked?.has(f.key)} onChange={v => set(f.key, v)} />
              )}
              {errorAt(f.key) && <FieldError message={errorAt(f.key)!} />}
            </div>
          ))}
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
  const datasets = datasetsFor(spec.id)
  return (
    <div className="space-y-2">
      <p>{spec.answers}</p>
      {datasets.length > 0 && (
        // A Data Source names what it reads (§4.11): the table, its edition, who publishes it, and the licence.
        <div className="space-y-1.5" data-testid="dataset-sources">
          <p className="flex items-center gap-1 font-medium text-foreground">
            <Database className="h-3.5 w-3.5" aria-hidden /> Reads
          </p>
          {datasets.map(ds => (
            <p key={ds.id} className="leading-snug">
              <a href={ds.report} target="_blank" rel="noreferrer" className="text-foreground hover:underline">{ds.title}</a>
              <span className="block text-xs">
                {ds.publisher} · edition {ds.edition} · read {ds.sources.map(s => s.read).sort().pop()} ·{' '}
                <a href={ds.licence.url} target="_blank" rel="noreferrer" className="hover:underline">{ds.licence.name}</a>
              </span>
            </p>
          ))}
        </div>
      )}
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

/**
 * Under the title: the question the tool answers, then its notation. On a
 * phone each is one line and a tap shows the rest — the figure needs the room
 * more than a long question's second line does (R10); from `sm` up both are
 * shown whole.
 */
function Lead({ question, notation }: { question: string | null; notation: string }) {
  const [open, setOpen] = useState(false)
  const clamp = !open && 'line-clamp-1 sm:line-clamp-none'
  return (
    <div onClick={() => setOpen(o => !o)} className="mt-0.5 cursor-default text-sm leading-snug text-muted-foreground" data-testid="tool-lead">
      {question && <p title={question} className={cn(clamp)}>{question}</p>}
      <p title={notation} className={cn('min-h-[1.5em] tabular-nums', question && 'text-xs leading-4', clamp)}>{notation}</p>
    </div>
  )
}

/**
 * One grid input. Named when the card has several, so two triangles say which
 * is which — by the symbol the notation uses too ("A — Numerator"), so the
 * formula under the title reads against them. `inline`: the grid draws the
 * name itself. A problem with the input is said under it, and the input ringed.
 */
function InputBlock({
  field,
  label,
  symbol,
  error,
  inline = false,
  children,
}: {
  field: string
  label: string | null
  symbol?: string
  error?: string | null
  inline?: boolean
  children: ReactNode
}) {
  const body = (
    <>
      {label && !inline && <h3 className="text-sm"><FieldName symbol={symbol} label={label} /></h3>}
      <div className={cn(error && 'rounded-lg ring-2 ring-destructive/70 ring-offset-2 ring-offset-card')}>{children}</div>
      {error && <FieldError message={error} />}
    </>
  )
  if (!label) return <div className="space-y-1" data-field={field}>{body}</div>
  return (
    <section className="space-y-1" aria-label={label} data-field={field}>
      {body}
    </section>
  )
}

/** An input's name, led by the symbol the notation uses for it. */
function FieldName({ symbol, label }: { symbol?: string; label: string }) {
  return (
    <>
      {symbol && <Sym className="font-semibold">{symbol}</Sym>}
      <span className="text-muted-foreground">{symbol ? ' — ' : ''}{label}</span>
    </>
  )
}

/** What's wrong with an input, said where the input is. */
function FieldError({ message }: { message: string }) {
  return <p role="alert" className="text-sm text-destructive">{message}</p>
}

/**
 * A symbol, with a bar drawn as a bar: "X̄" is X and a combining macron, which
 * many fonts set beside the letter or not at all — so "R̄" printed as a second
 * "R" beside the first tile's. Each barred letter is drawn with a rule over it
 * (a border, not an overline, which a clamped label's box clips away).
 */
function Sym({ children, className }: { children: string; className?: string }) {
  const parts = children.split(/(.[\u0304\u0305])/u).filter(Boolean)
  return (
    <span className={className}>
      {parts.map((p, k) => (/[\u0304\u0305]$/u.test(p) ? <span key={k} className="inline-block border-t-[1.5px] border-current pt-px leading-none">{p.slice(0, -1)}</span> : p))}
    </span>
  )
}

/** The key a tool page keeps its draft under (localStorage, this device only — R7). */
const DRAFT_STORE = 'actuarial_tool_draft:'

function readStore(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStore(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, value)
  } catch {
    // Storage blocked (a private window): the card works, it just won't remember.
  }
}

/** A date input: the browser's own picker, holding the ISO date the engine reads. */
/** A linked value's paint: the primary colour, which is what a link is (docs/workflows.md). */
const LINKED = 'border-primary bg-primary text-primary-foreground'

function DateControl({ field, value, linked = false, onChange }: { field: DateField; value: string; linked?: boolean; onChange: (v: string) => void }) {
  const id = `tool-${field.key}`
  return (
    <div className="flex items-center justify-between gap-3 py-1" data-field={field.key} data-linked={linked || undefined}>
      <label htmlFor={id} className="text-sm">
        <FieldName symbol={field.symbol} label={field.label} />
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={e => { if (e.target.value) onChange(e.target.value) }}
        className={cn('h-9 rounded-lg border border-border bg-background px-2 text-sm tabular-nums', linked && LINKED)}
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
  linked = false,
  onChange,
  sources = [],
}: {
  field: NumberField
  value: number
  chosen: boolean
  /** Filled by another step: the value is drawn on the primary colour. */
  linked?: boolean
  onChange: (v: number) => void
  /** The tools this value can be taken from (§6.6), each opening in the source sheet. */
  sources?: { label: string; open: () => void }[]
}) {
  const shown = toDisplay(value, field.unit)
  const [text, setText] = useState<string | null>(null)
  const [picking, setPicking] = useState(false)
  const sliderMax = Math.max(field.sliderMax ?? field.max, Math.min(value, field.max))
  const sliderMin = Math.min(field.sliderMin ?? field.min, Math.max(value, field.min))
  const id = `tool-${field.key}`
  return (
    <div data-field={field.key} data-linked={linked || undefined}>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="min-w-0 text-sm">
          <FieldName symbol={field.symbol} label={field.label} />
          {field.judgment && <DefaultDot show={!chosen} />}
        </label>
        <span className="flex shrink-0 items-center gap-1">
          {sources.length > 0 && (
            // One pill that says what it does (a bare arrow icon read as
            // "download"); with several sources it opens the choice of them.
            <button
              type="button"
              onClick={sources.length === 1 ? sources[0].open : () => setPicking(p => !p)}
              aria-label={sources.length === 1 ? `${field.label} from ${sources[0].label}` : `${field.label} from another tool`}
              aria-expanded={sources.length > 1 ? picking : undefined}
              title={sources.length === 1 ? `Take it from ${sources[0].label}` : 'Take it from another tool'}
              className="inline-flex h-7 items-center gap-1 rounded-full border border-border px-2.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" aria-hidden /> From…
            </button>
          )}
          <input
            aria-label={`${field.label} value`}
            inputMode="decimal"
            // A linked value arrives at the precision it was computed to: shown to
            // four places so it fits, and in full once it is being edited.
            value={text ?? (field.zeroLabel && value === 0 ? field.zeroLabel : String(linked ? Number(shown.toFixed(4)) : shown))}
            onFocus={() => setText(String(shown))}
            onChange={e => {
              setText(e.target.value)
              const n = Number(e.target.value.replace(/[,$%\s]/g, ''))
              if (e.target.value.trim() !== '' && Number.isFinite(n)) onChange(fromDisplay(n, field.unit))
            }}
            onBlur={() => setText(null)}
            className={cn(
              'h-7 w-20 rounded-md border border-border/60 bg-background/60 px-1.5 text-right text-base font-semibold tabular-nums outline-none hover:border-border focus:border-ring focus:bg-background',
              linked && cn(LINKED, 'focus:bg-primary'),
            )}
            data-testid={linked ? 'tool-linked-value' : undefined}
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
      {picking && sources.length > 1 && (
        <div className="flex flex-wrap items-center gap-1.5 pb-1" role="group" aria-label={`Take ${field.label} from`}>
          {sources.map(s => (
            <button
              key={s.label}
              type="button"
              onClick={() => { setPicking(false); s.open() }}
              aria-label={`${field.label} from ${s.label}`}
              className="inline-flex h-8 items-center gap-1 rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" aria-hidden /> {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ChoiceControl({ field, value, chosen, linked = false, onChange }: { field: ChoiceField; value: string; chosen: boolean; linked?: boolean; onChange: (v: string) => void }) {
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
      <div className={cn('flex items-center justify-between gap-3 py-1', linked && 'rounded-lg bg-primary/15 px-1.5')} data-field={field.key} data-linked={linked || undefined}>
        {label}
        <SegmentedControl size="sm" label={field.label} value={value} onChange={onChange} options={field.options.map(o => ({ value: o.value, label: o.label }))} />
      </div>
    )
  }
  return (
    <label className="flex items-center justify-between gap-3 py-1" data-field={field.key} data-linked={linked || undefined}>
      {label}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={cn('h-9 max-w-[72%] rounded-lg border border-border bg-background px-2 text-sm', linked && LINKED)}
      >
        {field.options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}
