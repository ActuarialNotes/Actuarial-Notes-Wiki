// The **tool template** (docs/actuarial-tools.md §19, and its second pass,
// docs/tool-template-v2.md): one tool on its own page, drawn the way the app's
// info popups are — and the shape every tool moves to once it has been checked
// on a phone. Every tool's page draws it; `ToolCard` remains for the cards
// embedded in a workflow step and a source sheet.
//
//   Takes from        the tools in front of this one (hidden when none)
//   the answer card   tinted in the exam that first teaches the method (no
//                     logo: the tint says it): the area and reading, the
//                     tool's name (which opens the method), the answer — one
//                     big figure, the rest beside it — the formula in mono,
//                     the live figure, each quantity in its own swatch, and
//                     any published figure that matches the answer, for
//                     comparison. Scrolled away, the answer rides in the
//                     page's title strip.
//   your judgments    past three inputs, the inputs the run reports as chosen
//                     or left at their default (R3) lead; at three or fewer
//                     every input keeps the formula's order, judgments ◆
//   the grid          numbered as a published exhibit, each computed column's
//                     formula under it in the column numbers
//   the inputs        a row each: swatch, symbol, label, value pill, and the
//                     "from" chip that says where the value came from — on a
//                     judgment and on any changed input; the rest share one
//                     "All ● Default" line. A published figure or a link opens
//                     its explanation in place, under the row
//   Gives to          the tools after this one, with what each would receive
//   the working, Download .xlsx, then the fine print
//
// Every value pill opens the edit sheet (`ValueSheet`).

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, ChevronDown, ChevronRight, RotateCcw, Undo2 } from 'lucide-react'
import {
  AREAS,
  checksFor,
  figuresFitting,
  figuresFor,
  formatValue,
  toolSlug,
  type BankFigure,
  type ChoiceField,
  type DateField,
  type NumberField,
  type ToolResult,
  type ToolSpec,
} from '@/lib/tools'
import { examAccentStyle } from '@/lib/examColors'
import {
  columnSource,
  fills,
  handoffValue,
  inputGroups,
  ownChip,
  publishedLabel,
  readingLabel,
  scalarSource,
  sharedDefaultLabel,
  fieldText,
  slidersInline,
  tilesInOrder,
  type Neighbour,
  type ScalarField,
  type ValueSource,
} from '@/lib/toolTemplate'
import { fieldQuantities, quantityStep, stepBackground, type QuantityStep } from '@/lib/toolFigures'
import { pendingFiguresFor } from '@/lib/toolBank'
import { lastRun } from '@/lib/toolRuns'
import { EXAM_BANNER, NEUTRAL_BANNER } from '@/components/ui/InfoSheet'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { cn } from '@/lib/utils'
import { FactorSelection } from './FactorSelection'
import { FigureDetails, FigureLine, LinkDetails } from './FigureNote'
import { ToolFigure } from './ToolFigure'
import { SourceSheet } from './SourceSheet'
import { EditableTable, ResultTableView, TriangleGrid, type DraftRow, type DraftTriangle } from './ToolGrid'
import { ToolMenu } from './ToolMenu'
import { MenuHeader, Sym } from './ToolCard'
import { SourceTag } from './SourceTag'
import { GivesTo, TakesFrom } from './ToolNeighbours'
import { ChoiceSheet, NumberSheet, Symbol } from './ValueSheet'
import { useToolCard, type ToolCardModel } from './useToolCard'

/** What the page's title strip shows once the answer card has scrolled away. */
export interface PinnedAnswer {
  symbol: string
  value: string
}

/**
 * The words over the answer, where they add something: not the tool's own name
 * again ("Trend factor" under Trend Factor), and not "Total" or a fragment of
 * the name ("Permissible").
 */
function leadLabel(name: string, lead: { label: string }): string | null {
  const label = lead.label.trim().toLowerCase()
  if (!label || label === 'total' || name.toLowerCase().includes(label)) return null
  return lead.label
}

/** A choice short enough to sit beside its label as a segmented control. */
const segmented = (f: ChoiceField) => f.options.length <= 3 && f.options.reduce((n, o) => n + o.label.length, 0) <= 20

/** What is open in place under a row: its figure's or link's details, or the list of figures it could take. */
type Note = { key: string; kind: 'figure' | 'link' | 'list' } | null

/** The words a figure that matches the answer gives for having no Use button. */
const COMPARISON_ONLY = 'For comparison only: no input of this tool takes it.'

export function ToolTemplate({
  spec,
  initialInput,
  sender,
  onOpenMethod,
  persist = false,
  examKey,
  onPinAnswer,
}: {
  spec: ToolSpec
  initialInput?: unknown
  /** The slug of the tool that sent this run, whose values arrive linked. */
  sender?: string | null
  onOpenMethod?: () => void
  persist?: boolean
  /** The exam that first teaches the method (`lib/toolExam.ts`), whose colour the card takes; null draws it neutral. */
  examKey: string | null
  /** Told the answer while its card is scrolled out of view, and null once it is back. */
  onPinAnswer?: (answer: PinnedAnswer | null) => void
}) {
  const m = useToolCard({ spec, initialInput, onOpenMethod, persist, sender })
  const navigate = useNavigate()
  const accent = examKey ? examAccentStyle(examKey) : undefined
  const [editing, setEditing] = useState<string | null>(null)
  const [note, setNote] = useState<Note>(null)
  // Past three inputs, the one row whose slider is open in place.
  const [sliding, setSliding] = useState<string | null>(null)
  const toggle = (key: string, kind: NonNullable<Note>['kind']) => setNote(n => (n?.key === key && n.kind === kind ? null : { key, kind }))
  const inline = slidersInline(m.scalars)
  const { judgments, inputs } = inputGroups(m.scalars)
  const grids = m.triangles.length + m.tables.length + (m.grid ? 1 : 0) > 0
  const tiles = m.result ? tilesInOrder(spec.id, m.result.tiles) : []
  const lead = tiles[0]
  const quantities = useMemo(() => fieldQuantities(m.figure), [m.figure])
  const fitting = figuresFitting(spec.id)

  // The answer rides in the title strip while its card is off screen.
  const answerRef = useRef<HTMLDivElement>(null)
  const [answerHidden, setAnswerHidden] = useState(false)
  useEffect(() => {
    const el = answerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    // The page's sticky search bar covers the top of the window, so the
    // answer counts as gone once it slides under the bar, not off the screen.
    const bar = document.querySelector<HTMLElement>('[data-floating-search]')
    const top = Math.round(bar?.getBoundingClientRect().height ?? 0)
    const io = new IntersectionObserver(
      ([e]) => setAnswerHidden(!e.isIntersecting && e.boundingClientRect.top < top),
      { rootMargin: `-${top}px 0px 0px 0px` },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const pinned = answerHidden && lead ? `${lead.symbol}\u0000${formatValue(lead.value, lead.unit)}` : null
  useEffect(() => {
    if (!onPinAnswer) return
    if (!pinned) onPinAnswer(null)
    else {
      const [symbol, value] = pinned.split('\u0000')
      onPinAnswer({ symbol, value })
    }
  }, [pinned, onPinAnswer])
  useEffect(() => () => onPinAnswer?.(null), [onPinAnswer])

  const sourceOf = (f: ScalarField): ValueSource => {
    const fig = f.kind === 'number' ? m.drawnFigure(f) : null
    return scalarSource({
      touched: m.touched(f),
      published: fig ? { label: publishedLabel(fig), checked: fig.verdict === 'verified', figure: fig.id } : null,
      origin: m.origins[f.key],
      value: m.draft[f.key],
    })
  }

  const openTool = (n: Neighbour) => navigate(`/tools/${toolSlug(n.tool)}`)
  const rowFor = (f: ScalarField) => (
    <InputRow
      key={f.key}
      model={m}
      field={f}
      inline={inline}
      open={sliding === f.key}
      onSlide={() => setSliding(k => (k === f.key ? null : f.key))}
      source={sourceOf(f)}
      step={quantities.has(f.key) ? quantityStep(quantities.get(f.key)!) : null}
      note={note?.key === f.key ? note.kind : null}
      onToggle={kind => toggle(f.key, kind)}
      onEdit={() => setEditing(f.key)}
      onOpenTool={openTool}
    />
  )
  const group = (fields: ScalarField[], label?: string) => {
    const shared = sharedDefaultLabel(fields.map(f => ({ judgment: f.judgment, source: sourceOf(f) })))
    return (
      <Group label={label}>
        {fields.map(rowFor)}
        {shared && <SharedDefault label={shared} />}
      </Group>
    )
  }
  const editField = editing ? m.scalars.find(f => f.key === editing) : undefined
  const area = AREAS.find(a => a.id === spec.area)?.label
  const reading = readingLabel(spec.method.readings)
  const tested = checksFor(spec.id).length
  const notation = m.result ? spec.notation(m.result.input) : null

  /** A grid column's chip: only for a column not at its default; the rest share the line under the grid. */
  const columnChip = (rows: DraftRow[] | undefined, defaults: DraftRow[], tableKey: string, key: string) => {
    const source = columnSource(rows, defaults, key, m.origins[`${tableKey}.${key}`])
    return source.kind === 'default' ? null : <SourceTag className="max-w-[7rem]" source={source} />
  }
  const sharedColumns = (field: { key: string; columns: { key: string; kind: string }[]; default: DraftRow[] }) => {
    const cols = field.columns.filter(c => c.kind === 'number')
    const defaults = cols.filter(c => columnSource(m.draft[field.key] as DraftRow[] | undefined, field.default, c.key, m.origins[`${field.key}.${c.key}`]).kind === 'default')
    if (!defaults.length) return null
    return <SharedDefault label={defaults.length === cols.length ? 'All' : 'The rest'} bare />
  }

  return (
    <div className="space-y-3" style={accent} data-testid="tool-card" data-template>
      {/* One tool in front is named above the card; several are alternatives for one
          value, so they are offered on the input they fill instead (TakeFrom). */}
      {(m.neighbours.before.length === 1 || m.linkedTool) && <TakesFrom neighbours={m.neighbours.before} linked={m.linkedTool} />}

      <section className={cn('overflow-hidden rounded-2xl', examKey ? EXAM_BANNER : NEUTRAL_BANNER)} data-testid="tool-answer">
        <header className="flex items-start gap-3 px-3.5 pt-3.5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-foreground/75" data-testid="tool-eyebrow">
              {[area, reading].filter(Boolean).join(' · ')}
            </p>
            {onOpenMethod ? (
              <button
                type="button"
                onClick={onOpenMethod}
                className="group block text-left text-[17px] font-bold leading-tight underline-offset-4 hover:underline"
                title="Read about the method"
              >
                {/* The book keeps to the last word, never to a line of its own. */}
                {spec.name.split(' ').slice(0, -1).join(' ')}{spec.name.includes(' ') ? ' ' : ''}
                <span className="whitespace-nowrap">
                  {spec.name.split(' ').pop()}
                  <BookOpen className="ml-1.5 inline h-3.5 w-3.5 align-[-1px] text-foreground/60 group-hover:text-foreground" aria-hidden />
                </span>
              </button>
            ) : (
              <h2 className="text-[17px] font-bold leading-tight">{spec.name}</h2>
            )}
          </div>
          <div className="-mr-1 flex shrink-0 items-center gap-1">
            {m.undo ? (
              <button
                type="button"
                onClick={m.undoReset}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-background/50 px-3 text-sm font-medium hover:bg-background/80"
                data-testid="tool-undo-reset"
              >
                <Undo2 className="h-4 w-4" aria-hidden /> Undo
              </button>
            ) : (
              <button
                type="button"
                onClick={m.reset}
                aria-label="Reset to the example"
                title="Reset to the example"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 hover:bg-background/50 hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
              </button>
            )}
            <ToolMenu items={m.menu} header={close => <MenuHeader spec={spec} onRead={close} />} />
          </div>
        </header>

        {m.result && lead && (
          <div ref={answerRef} className={cn('px-3.5 pb-1 pt-3', m.stale && 'opacity-50')}>
            {leadLabel(spec.name, lead) && (
              <p className="text-xs text-foreground/75">
                <Sym className="font-semibold text-foreground">{lead.symbol}</Sym> {leadLabel(spec.name, lead)}
              </p>
            )}
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p className="text-[34px] font-bold leading-tight tracking-tight tabular-nums" data-testid="tool-tile">{formatValue(lead.value, lead.unit)}</p>
              {/* A span's length is drawn by the figure under it; it isn't said twice. */}
              {tiles.slice(1).filter(t => !(t.unit === 'years' && m.figure?.kind === 'span')).map(t => (
                <p key={t.symbol + t.label} className="text-sm text-foreground/75" title={`${t.symbol} ${t.label}`}>
                  {t.unit === 'years' ? (
                    // A span says how long it is in words, not by a symbol.
                    <>over <b className="font-semibold tabular-nums text-foreground" data-testid="tool-tile">{formatValue(t.value, t.unit)}</b> years</>
                  ) : (
                    <>
                      <Sym>{t.symbol}</Sym>{' '}
                      <b className="font-semibold tabular-nums text-foreground" data-testid="tool-tile">{formatValue(t.value, t.unit)}</b>
                    </>
                  )}
                </p>
              ))}
            </div>
          </div>
        )}
        {m.figure ? (
          <div className={cn('px-2.5 pb-3 pt-1', m.stale && 'opacity-50')}>
            <ToolFigure figure={m.figure} onDrag={m.dragTo} height={inline ? 96 : 72} />
          </div>
        ) : (
          <div className="h-3" />
        )}
        {fitting.length > 0 && (
          <div className="border-t border-foreground/10 px-3.5 pb-2 pt-1" data-testid="tool-comparison">
            {fitting.map(f => (
              <div key={f.id}>
                <FigureLine figure={f} open={note?.key === `fit:${f.id}`} onToggle={() => toggle(`fit:${f.id}`, 'figure')} />
                {note?.key === `fit:${f.id}` && <FigureDetails figure={f} noUse={COMPARISON_ONLY} />}
              </div>
            ))}
          </div>
        )}
      </section>

      {m.looseError && <p role="alert" className="px-1 text-sm text-destructive">{m.looseError}</p>}
      {!m.stale && m.result?.warnings.filter(w => !m.shownUnderField.has(w)).map(w => (
        <p key={w} className="px-1 text-sm text-amber-700 dark:text-amber-400">{w}</p>
      ))}

      {judgments.length > 0 && group(judgments, 'Your judgments')}

      {m.triangles.map(t => (
        <section key={t.key} className="space-y-1.5" aria-label={t.label} data-field={t.key}>
          {m.labelled ? null : <GroupLabel>{t.label}</GroupLabel>}
          <div className={cn(m.errorAt(t.key) && 'rounded-lg ring-2 ring-destructive/70')}>
            <TriangleGrid
              value={m.valueOf(t) as DraftTriangle}
              onChange={v => m.set(t.key, v)}
              title={m.labelled ? <span className="text-sm font-semibold">{t.label}</span> : null}
            />
          </div>
          <SourceTag source={m.touched(t) ? { kind: 'yours' } : { kind: 'default' }} />
          {m.errorAt(t.key) && <p role="alert" className="text-sm text-destructive">{m.errorAt(t.key)}</p>}
        </section>
      ))}
      {m.tables.map(t => (
        <section key={t.key} className="space-y-1.5" aria-label={t.label} data-field={t.key}>
          <GroupLabel>{t.label}</GroupLabel>
          <EditableTable
            field={t}
            rows={m.valueOf(t) as DraftRow[]}
            onChange={rows => m.set(t.key, rows)}
            headerNote={key => columnChip(m.draft[t.key] as DraftRow[] | undefined, t.default, t.key, key)}
          />
          {sharedColumns(t)}
          {m.errorAt(t.key) && <p role="alert" className="text-sm text-destructive">{m.errorAt(t.key)}</p>}
        </section>
      ))}
      {m.grid && (
        <section className="space-y-1.5" aria-label={m.grid.label} data-field={m.grid.key}>
          {(m.labelled || !m.scalars.length) && <GroupLabel>{m.grid.label}</GroupLabel>}
          <div className={cn(m.errorAt(m.grid.key) && 'rounded-lg ring-2 ring-destructive/70')}>
            <EditableTable
              field={m.grid}
              rows={m.valueOf(m.grid) as DraftRow[]}
              result={m.stale ? undefined : m.result?.table}
              onChange={rows => m.set(m.grid!.key, rows)}
              toolId={spec.id}
              onFillFrom={(key, source) => m.fillFrom(m.grid!, key, source)}
              numbered
              headerNote={key => columnChip(m.draft[m.grid!.key] as DraftRow[] | undefined, m.grid!.default, m.grid!.key, key)}
            />
          </div>
          {sharedColumns(m.grid)}
          {m.errorAt(m.grid.key) && <p role="alert" className="text-sm text-destructive">{m.errorAt(m.grid.key)}</p>}
        </section>
      )}
      {!m.grid && spec.view === 'table' && m.result?.table && (
        <section className={cn('space-y-1.5', m.stale && 'opacity-50')} aria-label={spec.resultLabel ?? 'Result'}>
          <GroupLabel>{spec.resultLabel ?? 'Result'}</GroupLabel>
          <ResultTableView table={m.result.table} />
        </section>
      )}
      {m.selecting && m.result && !m.stale && (
        <FactorSelection
          input={m.result.input}
          intervals={m.result.values.intervals as string[]}
          averages={m.result.values.averages as (number | null)[]}
          selections={m.selections}
          onSelect={m.setSelections}
        />
      )}

      {inputs.length > 0 && group(inputs, judgments.length || grids ? 'Inputs' : undefined)}

      <GivesTo neighbours={m.neighbours.after} build={n => m.buildFor(n.handoff)} onSend={m.sendTo} />

      <div className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card">
        {m.result && m.result.trace.length > 0 && <Working result={m.result} notation={notation} />}
        <ActionRow onClick={m.download} disabled={!m.result || m.stale}>Download .xlsx</ActionRow>
      </div>

      {tested > 0 && (
        <p className="px-1 text-xs text-muted-foreground" data-testid="tool-fine-print">
          Tested against {tested === 1 ? 'a published example' : `${tested} published examples`}
        </p>
      )}

      {editField?.kind === 'number' && (
        <NumberSheet
          field={editField}
          value={m.numberOf(editField)}
          source={sourceOf(editField)}
          figure={m.drawnFigure(editField)}
          figures={figuresFor(editField)}
          pending={pendingFiguresFor(editField)}
          error={m.errorAt(editField.key)}
          format={v => fieldText(v, editField)}
          onChange={v => m.set(editField.key, v)}
          onPickFigure={id => m.set(editField.key, { assumption: id })}
          onDefault={() => m.unset(editField.key)}
          onClose={() => setEditing(null)}
          style={accent}
        />
      )}
      {editField?.kind === 'choice' && (
        <ChoiceSheet
          field={editField}
          value={String(m.valueOf(editField))}
          onChange={v => m.set(editField.key, v)}
          onClose={() => setEditing(null)}
          style={accent}
        />
      )}
      {m.sourcing && <SourceSheet sourcing={m.sourcing} onClose={() => m.setSourcing(null)} />}
    </div>
  )
}

function GroupLabel({ children }: { children: ReactNode }) {
  return <h3 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{children}</h3>
}

function Group({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <section className="space-y-1.5" aria-label={label}>
      {label && <GroupLabel>{label}</GroupLabel>}
      <div className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card">{children}</div>
    </section>
  )
}

/** The one line the rows still at their default share, under their group: "All ● Default". */
function SharedDefault({ label, bare = false }: { label: string; bare?: boolean }) {
  return (
    <p className={cn('flex items-center gap-2 text-xs text-muted-foreground', bare ? 'px-1' : 'px-3.5 py-2')} data-testid="shared-default">
      {label} <SourceTag source={{ kind: 'default' }} />
    </p>
  )
}

function ActionRow({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left text-sm font-semibold transition-colors hover:bg-muted/60 disabled:opacity-40"
    >
      {children}
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
    </button>
  )
}

function Working({ result, notation }: { result: ToolResult; notation: string | null }) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 text-sm font-semibold hover:bg-muted/60 [&::-webkit-details-marker]:hidden">
        Show working
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
      </summary>
      <div className="space-y-1.5 px-3.5 pb-3" data-math-scope>
        {notation && <p className="font-mono text-xs text-muted-foreground" data-testid="tool-notation">{notation}</p>}
        <ol className="space-y-1.5">
          {result.trace.map((step, k) => (
            <li key={k} className="flex items-baseline justify-between gap-3 border-b border-border/50 pb-1.5 text-sm last:border-0">
              <span className="min-w-0">
                <span className="block">{step.label}</span>
                <span className="block truncate font-mono text-xs text-muted-foreground">{step.formula}</span>
              </span>
              <span className="shrink-0 font-semibold tabular-nums">{formatValue(step.result, step.unit)}</span>
            </li>
          ))}
        </ol>
      </div>
    </details>
  )
}

/** The value pill: what a row's value is drawn as, and the way into its edit sheet. Outlined while linked. */
function ValuePill({ children, onClick, label, linked }: { children: ReactNode; onClick?: () => void; label?: string; linked?: boolean }) {
  const cls = cn('inline-flex h-8 shrink-0 items-center rounded-full bg-muted px-3 text-sm font-bold tabular-nums', linked && 'ring-1 ring-inset ring-[var(--exam-accent,hsl(var(--foreground)/0.5))]')
  if (!onClick) return <span className={cls}>{children}</span>
  return (
    <button type="button" onClick={onClick} aria-label={label} className={cn(cls, 'transition-colors hover:bg-muted-foreground/20')} data-testid="tool-value" data-linked={linked || undefined}>
      {children}
    </button>
  )
}

/** A quantity's swatch, the same one its segment wears in the figure. */
function Swatch({ step }: { step: QuantityStep | null }) {
  if (!step) return null
  return <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: stepBackground(step) }} data-testid="input-swatch" aria-hidden />
}

/** A judgment's mark beside its label. */
function Judged({ on }: { on?: boolean }) {
  return on ? <span className="ml-1 text-muted-foreground" title="A judgment: yours to choose" aria-label="a judgment">◆</span> : null
}

function InputRow({ model: m, field: f, inline, open, onSlide, source, step, note, onToggle, onEdit, onOpenTool }: {
  model: ToolCardModel
  field: ScalarField
  inline: boolean
  /** Past three inputs: whether this row's slider is open in place. */
  open: boolean
  onSlide: () => void
  source: ValueSource
  step: QuantityStep | null
  note: NonNullable<Note>['kind'] | null
  onToggle: (kind: NonNullable<Note>['kind']) => void
  onEdit: () => void
  onOpenTool: (n: Neighbour) => void
}) {
  const error = m.errorAt(f.key)
  const errorLine = error && <p role="alert" className="mt-1 text-sm text-destructive">{error}</p>
  const chips = <ChipLine model={m} field={f} source={source} note={note} onToggle={onToggle} onEdit={onEdit} onOpenTool={onOpenTool} />

  if (f.kind === 'date') return <DateRow model={m} field={f} chips={chips} error={errorLine} />

  if (f.kind === 'choice') {
    const value = String(m.valueOf(f))
    if (segmented(f)) {
      return (
        <div className="px-3.5 py-2.5" data-field={f.key}>
          <div className="flex items-center gap-3">
            <p className="min-w-0 flex-1 text-sm font-semibold">{f.label}<Judged on={f.judgment} /></p>
            <SegmentedControl size="sm" label={f.label} value={value} onChange={v => m.set(f.key, v)} options={f.options.map(o => ({ value: o.value, label: o.label }))} />
          </div>
          {chips}
        </div>
      )
    }
    const label = f.options.find(o => o.value === value)?.label ?? value
    return (
      <div data-field={f.key}>
        <button type="button" onClick={onEdit} className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-muted/60" aria-label={`${f.label}: ${label}`}>
          <span className="min-w-0 flex-1 text-sm font-semibold">{f.label}<Judged on={f.judgment} /></span>
          <span className="truncate text-sm font-semibold">{label}</span>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        </button>
        <div className="px-3.5 pb-1 empty:hidden">{chips}</div>
      </div>
    )
  }

  const value = m.numberOf(f)
  const shown = f.zeroLabel && value === 0 ? f.zeroLabel : fieldText(value, f)
  const linked = source.kind === 'linked'
  // Three inputs or fewer keep the slider open; past that a row opens its own
  // slider in place when tapped. Tapping a row also lists the tools that can
  // supply its value. The number opens the keypad, nothing else does.
  const showSlider = (inline || open) && !linked
  const sliderMax = Math.max(f.sliderMax ?? f.max, Math.min(value, f.max))
  const sliderMin = Math.min(f.sliderMin ?? f.min, Math.max(value, f.min))
  const head = (
    <>
      <Swatch step={step} />
      {f.symbol && <Symbol>{f.symbol}</Symbol>}
      <span className="min-w-0 flex-1 text-sm font-semibold">{f.label}<Judged on={f.judgment} /></span>
    </>
  )
  return (
    <div className={cn('px-3.5', showSlider ? 'pb-2.5 pt-2.5' : 'py-1.5')} data-field={f.key}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onSlide}
          aria-expanded={open}
          aria-label={`${f.label}: ${shown}`}
          className="flex min-h-9 min-w-0 flex-1 items-center gap-3 text-left"
        >
          {head}
        </button>
        <ValuePill onClick={onEdit} label={`${f.label} value`} linked={linked}>{shown}</ValuePill>
      </div>
      {showSlider && (
        <input
          id={`tool-${f.key}`}
          type="range"
          aria-label={`${f.label} slider`}
          min={sliderMin}
          max={sliderMax}
          step={f.step}
          value={value}
          onChange={e => m.set(f.key, Number(e.target.value))}
          className="sim-slider"
        />
      )}
      {!showSlider && !linked && (
        // A closed row keeps a faint track where its slider is, so a reader can see
        // there is one to open; tapping the row opens it.
        <div className="pointer-events-none relative mx-0.5 mb-1 mt-0.5 h-0.5 rounded-full bg-foreground/10" aria-hidden data-testid="closed-track">
          <span
            className="absolute -top-[3px] h-2 w-2 rounded-full bg-foreground/30"
            style={{ left: `calc(${Math.max(0, Math.min(100, ((value - sliderMin) / Math.max(1e-12, sliderMax - sliderMin)) * 100))}% - 4px)` }}
          />
        </div>
      )}
      {open && <TakeFrom model={m} field={f} onOpenTool={onOpenTool} />}
      {chips}
      {errorLine}
    </div>
  )
}

/**
 * The tools that can supply this one value, each an alternative: only one is
 * used, so they are listed on the input they fill, never above the card as if
 * all three went in. A tool run this session gives its value at a tap; one
 * that hasn't been run opens.
 */
function TakeFrom({ model: m, field: f, onOpenTool }: { model: ToolCardModel; field: NumberField; onOpenTool: (n: Neighbour) => void }) {
  const handoffs = m.neighbours.before.filter(n => fills(n, f.key))
  const extra = m.sourcesFor(f).filter(s => !handoffs.some(n => n.tool.name === s.label))
  if (!handoffs.length && !extra.length) return null
  const chip = 'inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-border transition-colors hover:bg-muted'
  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-1.5" data-testid="take-from">
      <span className="text-xs text-muted-foreground">Or take it from</span>
      {handoffs.map(n => {
        const v = handoffValue(n, f.key, lastRun(n.tool.id))
        return v != null ? (
          <button key={n.tool.id} type="button" className={chip} onClick={() => m.takeFrom(f.key, v, n.tool)} aria-label={`${f.label} from ${n.tool.name}, ${fieldText(v, f)}`}>
            {n.tool.name} <b className="tabular-nums">{fieldText(v, f)}</b>
          </button>
        ) : (
          <button key={n.tool.id} type="button" className={chip} onClick={() => onOpenTool(n)} aria-label={`Open ${n.tool.name}`}>
            {n.tool.name} <ChevronRight className="h-3 w-3" aria-hidden />
          </button>
        )
      })}
      {extra.map(s => (
        <button key={s.label} type="button" className={chip} onClick={s.open} aria-label={`${f.label} from ${s.label}`}>
          {s.label} <ChevronRight className="h-3 w-3" aria-hidden />
        </button>
      ))}
    </div>
  )
}

/**
 * A row's "from" line: its chip (on a judgment and on any input not at its
 * default), the published figures it could take ("1 published ⌄"), and what
 * either opens in place under it.
 */
function ChipLine({ model: m, field: f, source, note, onToggle, onEdit, onOpenTool }: {
  model: ToolCardModel
  field: ScalarField
  source: ValueSource
  note: NonNullable<Note>['kind'] | null
  onToggle: (kind: NonNullable<Note>['kind']) => void
  onEdit: () => void
  onOpenTool: (n: Neighbour) => void
}) {
  const drawn: BankFigure | null = f.kind === 'number' ? m.drawnFigure(f) : null
  const others = f.kind === 'number' ? figuresFor(f).filter(x => x.id !== drawn?.id) : []
  const own = ownChip(f.judgment, source)
  if (!own && !others.length) return null
  const chipClick =
    source.kind === 'published' ? () => onToggle('figure')
      : source.kind === 'linked' ? () => onToggle('link')
        : onEdit
  const open = note === 'figure' && source.kind === 'published' ? true : note === 'link' && source.kind === 'linked' ? true : undefined
  const value = f.kind === 'number' ? m.numberOf(f) : null
  const shown = f.kind === 'number' && value !== null ? formatValue(value, f.unit) : ''
  const fromTool = source.kind === 'linked' && source.tool ? m.neighbours.before.find(n => n.tool.id === source.tool) : undefined
  return (
    <div className="mt-1 space-y-1.5" data-testid="chip-line">
      <div className="flex items-center gap-1.5 text-xs">
        {own && (
          <>
            <span className="text-muted-foreground">from</span>
            <SourceTag
              source={source}
              onClick={chipClick}
              open={source.kind === 'published' || source.kind === 'linked' ? !!open : undefined}
            />
          </>
        )}
        <span className="flex-1" />
        {others.length > 0 && (
          <button
            type="button"
            onClick={() => onToggle('list')}
            aria-expanded={note === 'list'}
            className="inline-flex items-center gap-0.5 rounded px-1 text-muted-foreground hover:text-foreground"
            data-testid="published-count"
          >
            {others.length} published
            <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', note === 'list' && 'rotate-180')} aria-hidden />
          </button>
        )}
      </div>
      {note === 'figure' && drawn && <FigureDetails figure={drawn} />}
      {note === 'link' && source.kind === 'linked' && (
        <LinkDetails
          tool={source.label}
          shown={shown}
          onOpen={fromTool ? () => onOpenTool(fromTool) : undefined}
          onUnlink={() => m.unlink(f.key)}
        />
      )}
      {note === 'list' && f.kind === 'number' && value !== null && (
        <PublishedList figures={others} yours={{ value, shown }} onUse={id => { m.set(f.key, { assumption: id }); onToggle('list') }} />
      )}
    </div>
  )
}

/** The figures an input could take, each one line that opens to its details. */
function PublishedList({ figures, yours, onUse }: { figures: BankFigure[]; yours: { value: number; shown: string }; onUse: (id: string) => void }) {
  const [open, setOpen] = useState<string | null>(figures.length === 1 ? figures[0].id : null)
  return (
    <div data-testid="published-list">
      {figures.map(f => (
        <div key={f.id}>
          <FigureLine figure={f} open={open === f.id} onToggle={() => setOpen(o => (o === f.id ? null : f.id))} />
          {open === f.id && <FigureDetails figure={f} yours={yours} onUse={() => onUse(f.id)} />}
        </div>
      ))}
    </div>
  )
}

function DateRow({ model: m, field: f, chips, error }: { model: ToolCardModel; field: DateField; chips: ReactNode; error: ReactNode }) {
  const id = `tool-${f.key}`
  return (
    <div className="px-3.5 py-2.5" data-field={f.key}>
      <div className="flex items-center gap-3">
        {f.symbol && <Symbol>{f.symbol}</Symbol>}
        <label htmlFor={id} className="min-w-0 flex-1 text-sm font-semibold">{f.label}<Judged on={f.judgment} /></label>
        <input
          id={id}
          type="date"
          value={String(m.valueOf(f))}
          onChange={e => { if (e.target.value) m.set(f.key, e.target.value) }}
          className="h-8 rounded-full bg-muted px-3 text-sm font-semibold tabular-nums"
        />
      </div>
      {chips}
      {error}
    </div>
  )
}

