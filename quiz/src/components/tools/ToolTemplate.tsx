// The **tool template** (docs/actuarial-tools.md §19): one tool on its own
// page, drawn the way the app's info popups are — and the shape every tool
// moves to once it has been checked on a phone (`TEMPLATE_TOOLS`).
//
//   the answer card   tinted in the exam that first teaches the method: the
//                     exam's logo, the tool's name (which opens the method),
//                     the question it answers, the answer — one big figure,
//                     the rest beside it — and the live figure under it.
//                     Scrolled away, the answer rides in the page's title strip.
//   your judgments    the inputs the run reports as chosen or left at their
//                     default (R3), first and apart
//   the grid          numbered as a published exhibit, each input column
//                     tagged with where its values came from, each computed
//                     column's formula under it in the column numbers
//   the inputs        a row each: label, value pill, source tag. Three
//                     scalar inputs or fewer keep a slider on the row; more,
//                     and a row opens the edit sheet, which has the slider
//   the working, then where the result can go next, then the fine print
//
// Every value pill opens the edit sheet (`ValueSheet`): the slider, the
// published figures the Assumptions Bank holds for the field, the tools it can
// be taken from, the app's own keypad, and the way back to the default.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BookOpen, Calculator, ChevronRight, RotateCcw, Undo2 } from 'lucide-react'
import {
  AREAS,
  checksFor,
  figuresFor,
  formatValue,
  type ChoiceField,
  type DateField,
  type NumberField,
  type NumberUnit,
  type ToolResult,
  type ToolSpec,
} from '@/lib/tools'
import { examAccentStyle } from '@/lib/examColors'
import {
  columnSource,
  inputGroups,
  readingLabel,
  scalarSource,
  slidersInline,
  type ScalarField,
  type ValueSource,
} from '@/lib/toolTemplate'
import { ExamLogo } from '@/components/ExamLogo'
import { EXAM_BANNER, NEUTRAL_BANNER } from '@/components/ui/InfoSheet'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { cn } from '@/lib/utils'
import { FactorSelection } from './FactorSelection'
import { ToolFigure } from './ToolFigure'
import { SourceSheet } from './SourceSheet'
import { EditableTable, ResultTableView, TriangleGrid, type DraftRow, type DraftTriangle } from './ToolGrid'
import { ToolMenu } from './ToolMenu'
import { MenuHeader, Sym } from './ToolCard'
import { openResourcePage } from './openResource'
import { SourceTag } from './SourceTag'
import { ChoiceSheet, NumberSheet, Symbol } from './ValueSheet'
import { useToolCard, type ToolCardModel } from './useToolCard'

/** What the page's title strip shows once the answer card has scrolled away. */
export interface PinnedAnswer {
  symbol: string
  value: string
}

/** A value as an input shows it: an amount without the cents it doesn't have. */
function inputText(value: number, unit: NumberUnit): string {
  if (unit === 'money') return value.toLocaleString('en-US', { maximumFractionDigits: 2 })
  return formatValue(value, unit)
}

/** A choice short enough to sit beside its label as a segmented control. */
const segmented = (f: ChoiceField) => f.options.length <= 3 && f.options.reduce((n, o) => n + o.label.length, 0) <= 20

export function ToolTemplate({
  spec,
  initialInput,
  onOpenMethod,
  persist = false,
  examKey,
  onPinAnswer,
}: {
  spec: ToolSpec
  initialInput?: unknown
  onOpenMethod?: () => void
  persist?: boolean
  /** The exam that first teaches the method (`lib/toolExam.ts`), whose colour the card takes; null draws it neutral. */
  examKey: string | null
  /** Told the answer while its card is scrolled out of view, and null once it is back. */
  onPinAnswer?: (answer: PinnedAnswer | null) => void
}) {
  const m = useToolCard({ spec, initialInput, onOpenMethod, persist })
  const accent = examKey ? examAccentStyle(examKey) : undefined
  const [editing, setEditing] = useState<string | null>(null)
  const inline = slidersInline(m.scalars)
  const { judgments, inputs } = inputGroups(m.scalars)
  const grids = m.triangles.length + m.tables.length + (m.grid ? 1 : 0) > 0
  const lead = m.result?.tiles[0]

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
      published: fig ? { label: `${fig.edition} · ${fig.locator}`, checked: fig.verdict === 'verified' } : null,
      origin: m.origins[f.key],
      value: m.draft[f.key],
    })
  }

  const row = (f: ScalarField) => (
    <InputRow key={f.key} model={m} field={f} inline={inline} source={sourceOf(f)} onEdit={() => setEditing(f.key)} />
  )
  const editField = editing ? m.scalars.find(f => f.key === editing) : undefined
  const area = AREAS.find(a => a.id === spec.area)?.label
  const reading = readingLabel(spec.method.readings)
  const tested = checksFor(spec.id).length

  return (
    <div className="space-y-4" style={accent} data-testid="tool-card" data-template>
      <section className={cn('overflow-hidden rounded-2xl', examKey ? EXAM_BANNER : NEUTRAL_BANNER)} data-testid="tool-answer">
        <header className="flex items-start gap-3 px-3.5 pt-3.5">
          {examKey ? (
            <ExamLogo examKey={examKey} size="md" />
          ) : (
            <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-background/50" aria-hidden>
              <Calculator className="h-4 w-4" />
            </span>
          )}
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
            <p className="text-xs text-foreground/75">
              <Sym className="font-semibold text-foreground">{lead.symbol}</Sym> {lead.label === 'Total' ? '' : lead.label}
            </p>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p className="text-[34px] font-bold leading-tight tracking-tight tabular-nums" data-testid="tool-tile">{formatValue(lead.value, lead.unit)}</p>
              {m.result.tiles.slice(1).map(t => (
                <p key={t.symbol + t.label} className="text-sm text-foreground/75" title={`${t.symbol} ${t.label}`}>
                  <Sym>{t.symbol}</Sym>{' '}
                  <b className="font-semibold tabular-nums text-foreground" data-testid="tool-tile">{formatValue(t.value, t.unit)}</b>
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
      </section>

      {m.looseError && <p role="alert" className="px-1 text-sm text-destructive">{m.looseError}</p>}
      {!m.stale && m.result?.warnings.filter(w => !m.shownUnderField.has(w)).map(w => (
        <p key={w} className="px-1 text-sm text-amber-700 dark:text-amber-400">{w}</p>
      ))}

      {judgments.length > 0 && <Group label="Your judgments">{judgments.map(row)}</Group>}

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
            headerNote={key => <SourceTag className="max-w-[7rem]" source={columnSource(m.draft[t.key] as DraftRow[] | undefined, t.default, key, m.origins[`${t.key}.${key}`])} />}
          />
          {m.errorAt(t.key) && <p role="alert" className="text-sm text-destructive">{m.errorAt(t.key)}</p>}
        </section>
      ))}
      {m.grid && (
        <section className="space-y-1.5" aria-label={m.grid.label} data-field={m.grid.key}>
          {m.labelled && <GroupLabel>{m.grid.label}</GroupLabel>}
          <div className={cn(m.errorAt(m.grid.key) && 'rounded-lg ring-2 ring-destructive/70')}>
            <EditableTable
              field={m.grid}
              rows={m.valueOf(m.grid) as DraftRow[]}
              result={m.stale ? undefined : m.result?.table}
              onChange={rows => m.set(m.grid!.key, rows)}
              toolId={spec.id}
              onFillFrom={(key, source) => m.fillFrom(m.grid!, key, source)}
              numbered
              headerNote={key => (
                <SourceTag className="max-w-[7rem]" source={columnSource(m.draft[m.grid!.key] as DraftRow[] | undefined, m.grid!.default, key, m.origins[`${m.grid!.key}.${key}`])} />
              )}
            />
          </div>
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

      {inputs.length > 0 && <Group label={judgments.length || grids ? 'Inputs' : undefined}>{inputs.map(row)}</Group>}

      <div className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card">
        {m.result && m.result.trace.length > 0 && <Working result={m.result} notation={spec.notation(m.result.input ?? (m.draft as never))} />}
        {m.sends.map(s => (
          <ActionRow key={s.key} onClick={s.run}>{s.label}</ActionRow>
        ))}
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
          sources={m.sourcesFor(editField)}
          error={m.errorAt(editField.key)}
          onChange={v => m.set(editField.key, v)}
          onPickFigure={id => m.set(editField.key, { assumption: id })}
          onDefault={() => m.unset(editField.key)}
          onOpenSource={name => void openResourcePage(name)}
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

function Working({ result, notation }: { result: ToolResult; notation: string }) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 text-sm font-semibold hover:bg-muted/60 [&::-webkit-details-marker]:hidden">
        Show working
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
      </summary>
      <div className="space-y-1.5 px-3.5 pb-3" data-math-scope>
        <p className="font-mono text-xs text-muted-foreground">{notation}</p>
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

/** The value pill: what a row's value is drawn as, and the way into its edit sheet. */
function ValuePill({ children, onClick, label }: { children: ReactNode; onClick?: () => void; label?: string }) {
  const cls = 'inline-flex h-8 shrink-0 items-center rounded-full bg-muted px-3 text-sm font-bold tabular-nums'
  if (!onClick) return <span className={cls}>{children}</span>
  return (
    <button type="button" onClick={onClick} aria-label={label} className={cn(cls, 'transition-colors hover:bg-muted-foreground/20')} data-testid="tool-value">
      {children}
    </button>
  )
}

function InputRow({ model: m, field: f, inline, source, onEdit }: {
  model: ToolCardModel
  field: ScalarField
  inline: boolean
  source: ValueSource
  onEdit: () => void
}) {
  const error = m.errorAt(f.key)
  const errorLine = error && <p role="alert" className="mt-1 text-sm text-destructive">{error}</p>

  if (f.kind === 'date') return <DateRow model={m} field={f} source={source} error={errorLine} />

  if (f.kind === 'choice') {
    const value = String(m.valueOf(f))
    if (segmented(f)) {
      return (
        <div className="flex items-center gap-3 px-3.5 py-2.5" data-field={f.key}>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{f.label}</p>
            {f.judgment && <SourceTag source={source} className="mt-1" />}
          </div>
          <SegmentedControl size="sm" label={f.label} value={value} onChange={v => m.set(f.key, v)} options={f.options.map(o => ({ value: o.value, label: o.label }))} />
        </div>
      )
    }
    const label = f.options.find(o => o.value === value)?.label ?? value
    return (
      <button type="button" onClick={onEdit} className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-muted/60" data-field={f.key} aria-label={`${f.label}: ${label}`}>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">{f.label}</span>
          <SourceTag source={source} className="mt-1" />
        </span>
        <span className="truncate text-sm font-semibold">{label}</span>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      </button>
    )
  }

  const value = m.numberOf(f)
  const shown = f.zeroLabel && value === 0 ? f.zeroLabel : inputText(value, f.unit)
  if (!inline) {
    return (
      <div data-field={f.key}>
        <button type="button" onClick={onEdit} className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-muted/60" aria-label={`${f.label}: ${shown}`}>
          {f.symbol && <Symbol>{f.symbol}</Symbol>}
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">{f.label}</span>
            <SourceTag source={source} className="mt-1" />
          </span>
          <ValuePill>{shown}</ValuePill>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        </button>
        {error && <div className="px-3.5 pb-2">{errorLine}</div>}
      </div>
    )
  }
  return (
    <InlineNumberRow model={m} field={f} value={value} shown={shown} source={source} onEdit={onEdit} error={errorLine} />
  )
}

function InlineNumberRow({ model: m, field: f, value, shown, source, onEdit, error }: {
  model: ToolCardModel
  field: NumberField
  value: number
  shown: string
  source: ValueSource
  onEdit: () => void
  error: ReactNode
}) {
  const sliderMax = Math.max(f.sliderMax ?? f.max, Math.min(value, f.max))
  const sliderMin = Math.min(f.sliderMin ?? f.min, Math.max(value, f.min))
  return (
    <div className="px-3.5 pb-2.5 pt-2.5" data-field={f.key}>
      <div className="flex items-center gap-3">
        {f.symbol && <Symbol>{f.symbol}</Symbol>}
        <label htmlFor={`tool-${f.key}`} className="min-w-0 flex-1 text-sm font-semibold">{f.label}</label>
        <ValuePill onClick={onEdit} label={`${f.label} value`}>{shown}</ValuePill>
      </div>
      <input
        id={`tool-${f.key}`}
        type="range"
        min={sliderMin}
        max={sliderMax}
        step={f.step}
        value={value}
        onChange={e => m.set(f.key, Number(e.target.value))}
        className="sim-slider"
      />
      <SourceTag source={source} />
      {error}
    </div>
  )
}

function DateRow({ model: m, field: f, source, error }: { model: ToolCardModel; field: DateField; source: ValueSource; error: ReactNode }) {
  const id = `tool-${f.key}`
  return (
    <div className="px-3.5 py-2.5" data-field={f.key}>
      <div className="flex items-center gap-3">
        {f.symbol && <Symbol>{f.symbol}</Symbol>}
        <label htmlFor={id} className="min-w-0 flex-1 text-sm font-semibold">{f.label}</label>
        <input
          id={id}
          type="date"
          value={String(m.valueOf(f))}
          onChange={e => { if (e.target.value) m.set(f.key, e.target.value) }}
          className="h-8 rounded-full bg-muted px-3 text-sm font-semibold tabular-nums"
        />
      </div>
      <SourceTag source={source} className="mt-1" />
      {error}
    </div>
  )
}
