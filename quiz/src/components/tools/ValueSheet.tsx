// The tool template's **edit sheet** (docs/actuarial-tools.md §19): what a
// value pill opens. For a number, everything a value can come from, in one
// place — the slider, the published figures the Assumptions Bank holds for
// the field, the tools it can be taken from, the reader's own value typed on
// the app's keypad (so the phone's keyboard never covers the sheet), and the
// way back to the default. For a choice, its options.
//
// A bottom sheet on a phone, a centred one from `sm` — the quiz setup sheet's
// frame. Every change applies as it is made; the card behind recomputes live.

import { useEffect, useId, useState, type CSSProperties, type ReactNode } from 'react'
import { ChevronRight, Delete, X } from 'lucide-react'
import { formatValue, printedFigure, type BankFigure, type ChoiceField, type NumberField } from '@/lib/tools'
import { fromDisplay } from '@/lib/tools/format'
import { keypadValue, pressKey, type KeypadKey, type ValueSource } from '@/lib/toolTemplate'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { CheckMark } from '@/components/CheckMark'
import { cn } from '@/lib/utils'
import { UncheckedTag } from './SourceTag'
import type { ScalarSourceLink } from './useToolCard'

export function BottomSheet({ title, symbol, value, onClose, style, children }: {
  title: string
  symbol?: string
  value?: ReactNode
  onClose: () => void
  style?: CSSProperties
  children: ReactNode
}) {
  const titleId = useId()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <OverlayPortal>
      <div
        className="paper-scrim fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
        style={style}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-background text-foreground shadow-2xl sm:max-w-sm sm:rounded-3xl"
          data-testid="value-sheet"
        >
          <div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-border sm:hidden" aria-hidden />
          <div className="flex shrink-0 items-center gap-3 px-4 pb-1 pt-3">
            {symbol && <Symbol>{symbol}</Symbol>}
            <h2 id={titleId} className="min-w-0 flex-1 truncate text-base font-semibold">{title}</h2>
            {value != null && <span className="shrink-0 text-2xl font-bold tabular-nums" data-testid="value-sheet-value">{value}</span>}
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
            {children}
          </div>
        </div>
      </div>
    </OverlayPortal>
  )
}

/** An input's symbol in its small square — the same square its row leads with. */
export function Symbol({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn('flex h-8 min-w-8 shrink-0 items-center justify-center rounded-lg bg-muted px-1 font-serif text-sm font-semibold italic', className)} aria-hidden>
      {children}
    </span>
  )
}

function SheetGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h3 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</h3>
      <div className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card">{children}</div>
    </section>
  )
}

/** One option of a sheet: the radio, what it is, and its value. */
function OptionRow({ on, onPick, label, detail, value, testId }: {
  on: boolean
  onPick: () => void
  label: ReactNode
  detail?: ReactNode
  value?: ReactNode
  testId?: string
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      onClick={onPick}
      className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-muted/60"
      data-testid={testId}
    >
      <span
        className={cn('h-[18px] w-[18px] shrink-0 rounded-full border-2', on ? 'border-[5px] border-pick' : 'border-muted-foreground/60')}
        aria-hidden
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>
        {detail && <span className="block text-xs text-muted-foreground">{detail}</span>}
      </span>
      {value != null && <span className="shrink-0 text-sm font-semibold tabular-nums">{value}</span>}
    </button>
  )
}

const KEYS: KeypadKey[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '⌫']

export function NumberSheet({
  field,
  value,
  source,
  figure,
  figures,
  sources,
  error,
  onChange,
  onPickFigure,
  onDefault,
  onOpenSource,
  onClose,
  style,
}: {
  field: NumberField
  value: number
  source: ValueSource
  /** The published figure the value is, when it is one. */
  figure: BankFigure | null
  /** The bank's figures this field takes. */
  figures: BankFigure[]
  /** The tools it can be taken from. */
  sources: ScalarSourceLink[]
  error: string | null
  onChange: (v: number) => void
  onPickFigure: (id: string) => void
  onDefault: () => void
  onOpenSource: (resource: string) => void
  onClose: () => void
  style?: CSSProperties
}) {
  // What has been typed, in the units shown (a percent as 5, not 0.05).
  const [text, setText] = useState('')
  const typing = text !== ''
  const press = (key: KeypadKey) => {
    const next = pressKey(text, key, { negative: field.min < 0, integer: field.integer })
    setText(next)
    const n = keypadValue(next)
    if (n !== null) onChange(fromDisplay(n, field.unit))
  }
  const sliderMax = Math.max(field.sliderMax ?? field.max, Math.min(value, field.max))
  const sliderMin = Math.min(field.sliderMin ?? field.min, Math.max(value, field.min))
  const suffix = field.unit === 'percent' ? '%' : ''
  const own = source.kind === 'yours' || source.kind === 'linked'

  return (
    <BottomSheet title={field.label} symbol={field.symbol} value={formatValue(value, field.unit)} onClose={onClose} style={style}>
      <input
        type="range"
        aria-label={`${field.label} slider`}
        min={sliderMin}
        max={sliderMax}
        step={field.step}
        value={value}
        onChange={e => { setText(''); onChange(Number(e.target.value)) }}
        className="sim-slider"
      />
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

      {figures.length > 0 && (
        <SheetGroup label="Published figures">
          <div role="radiogroup" aria-label={`${field.label} from the Assumptions Bank`} data-testid="tool-bank-figures">
            {figures.map(f => (
              <OptionRow
                key={f.id}
                on={figure?.id === f.id}
                onPick={() => { setText(''); onPickFigure(f.id) }}
                label={`${f.publisher}, ${f.edition}`}
                detail={
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span>{f.label} · {f.locator}</span>
                    {f.verdict !== 'verified' && <UncheckedTag />}
                  </span>
                }
                value={printedFigure(f)}
              />
            ))}
          </div>
          {figure && (
            <button
              type="button"
              onClick={() => onOpenSource(figure.resource)}
              className="flex w-full items-center justify-between px-3.5 py-2.5 text-sm font-medium hover:bg-muted/60"
            >
              Read the source <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
            </button>
          )}
        </SheetGroup>
      )}

      {sources.length > 0 && (
        <SheetGroup label="From a tool">
          {sources.map(s => (
            <button
              key={s.label}
              type="button"
              onClick={() => { onClose(); s.open() }}
              aria-label={`${field.label} from ${s.label}`}
              className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm font-medium hover:bg-muted/60"
            >
              {s.label} <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
            </button>
          ))}
        </SheetGroup>
      )}

      <SheetGroup label="Your own">
        <div role="radiogroup" aria-label={`${field.label}: yours or the default`}>
          <OptionRow
            on={own || typing}
            onPick={() => undefined}
            label="Type a value"
            value={
              <span className={cn('rounded-md bg-muted px-2 py-1', !typing && 'text-muted-foreground')} data-testid="keypad-entry">
                {typing ? text : formatValue(value, field.unit).replace(/[%$,]/g, '')}
                {suffix}
              </span>
            }
          />
          <OptionRow
            on={source.kind === 'default' && !typing}
            onPick={() => { setText(''); onDefault() }}
            label="Back to the default"
            value={formatValue(field.default, field.unit)}
          />
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-2" role="group" aria-label="Keypad">
          {KEYS.map(k => (
            <button
              key={k}
              type="button"
              onClick={() => press(k)}
              disabled={(k === '.' && field.integer) || false}
              aria-label={k === '⌫' ? 'Delete' : k === '.' ? 'Point' : k}
              className="flex h-11 items-center justify-center rounded-lg bg-muted text-lg font-semibold tabular-nums transition-colors active:bg-muted-foreground/20 disabled:opacity-30"
            >
              {k === '⌫' ? <Delete className="h-5 w-5" aria-hidden /> : k}
            </button>
          ))}
          {field.min < 0 && (
            <button
              type="button"
              onClick={() => press('±')}
              aria-label="Change sign"
              className="col-span-3 flex h-9 items-center justify-center rounded-lg bg-muted text-sm font-semibold"
            >
              ±
            </button>
          )}
        </div>
      </SheetGroup>

      <button
        type="button"
        onClick={onClose}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-primary text-base font-semibold text-primary-foreground"
      >
        Done
      </button>
    </BottomSheet>
  )
}

export function ChoiceSheet({ field, value, onChange, onClose, style }: {
  field: ChoiceField
  value: string
  onChange: (v: string) => void
  onClose: () => void
  style?: CSSProperties
}) {
  return (
    <BottomSheet title={field.label} onClose={onClose} style={style}>
      <div role="radiogroup" aria-label={field.label} className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card">
        {field.options.map(o => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={o.value === value}
            onClick={() => { onChange(o.value); onClose() }}
            className={cn('flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/60', o.value === value && 'bg-pick text-pick-foreground hover:bg-pick')}
          >
            {o.label}
            {o.value === value && <CheckMark className="h-4 w-4" />}
          </button>
        ))}
      </div>
    </BottomSheet>
  )
}

