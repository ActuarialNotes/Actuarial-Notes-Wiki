// A published figure or a link, **explained in place** (docs/tool-template-v2.md
// §3.5–3.6): opened under the row it belongs to, never over the page, in two
// levels. Level 1 is one line — the value and where and on what basis it
// applies. Level 2 adds what the figure is, a short list of its facts, the
// fact-check warning, how the reader's value stands against it, and the
// buttons: Use and Read (or Open and Unlink, for a link).

import { ChevronDown } from 'lucide-react'
import { printedFigure, type BankFigure } from '@/lib/tools'
import { effectiveLabel } from '@/lib/assumptionBank'
import { BASIS_LABELS, comparison, contextLine, placeName } from '@/lib/toolTemplate'
import { cn } from '@/lib/utils'
import { readFigure, readLabel } from './figureRead'

const BUTTON = 'inline-flex h-9 flex-1 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors'
const SOLID = `${BUTTON} bg-foreground text-background hover:bg-foreground/85`
const GHOST = `${BUTTON} ring-1 ring-inset ring-border hover:bg-muted`

/** Level 1: the value and what it is, its context under it; a button that opens level 2. */
export function FigureLine({ figure, open, onToggle }: { figure: BankFigure; open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex w-full items-center gap-2 py-1.5 text-left"
      data-testid="figure-line"
    >
      <span className="min-w-0 flex-1 text-sm">
        <b className="font-bold tabular-nums">{printedFigure(figure)}</b> {figure.label}{' '}
        <span className="block text-xs text-muted-foreground">{contextLine(figure)}</span>
      </span>
      <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
    </button>
  )
}

/** Level 2 of a published figure. */
export function FigureDetails({
  figure,
  yours,
  onUse,
  noUse,
}: {
  figure: BankFigure
  /** The reader's own value for the field, to set against the figure. */
  yours?: { value: number; shown: string } | null
  /** Put the figure in the field; absent for a figure no input takes. */
  onUse?: () => void
  /** Why there is no Use button. */
  noUse?: string
}) {
  const where = [placeName(figure.jurisdiction), figure.line].filter(Boolean).join(', ')
  const basis = figure.basis ? BASIS_LABELS[figure.basis] ?? figure.basis : null
  const against = yours ? comparison(yours.value, figure.value, figure.basis, yours.shown) : null
  const unchecked = figure.verdict !== 'verified'
  return (
    <div className="space-y-2 border-l-2 border-[var(--exam-accent,hsl(var(--foreground)/0.4))] pb-1 pl-3" data-testid="figure-details">
      {(figure.meaning || figure.lead) && <p className="text-sm">{figure.meaning || figure.lead}</p>}
      <dl className="grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-0.5 text-xs">
        <dt className="text-muted-foreground">What it is</dt><dd>{figure.label}</dd>
        {where && <><dt className="text-muted-foreground">Where</dt><dd>{where}</dd></>}
        {basis && <><dt className="text-muted-foreground">Basis</dt><dd>{basis.charAt(0).toUpperCase() + basis.slice(1)}</dd></>}
        <dt className="text-muted-foreground">In force</dt><dd>From {effectiveLabel(figure.effective)}</dd>
        <dt className="text-muted-foreground">Source</dt>
        <dd>
          <button type="button" onClick={() => readFigure(figure)} className="text-left underline underline-offset-2 hover:no-underline">
            {figure.publisher}, {figure.edition}, {figure.locator}
          </button>
        </dd>
      </dl>
      {(unchecked || against || noUse) && (
        <p className="rounded-lg bg-amber-500/15 px-2.5 py-1.5 text-xs text-amber-800 dark:text-amber-300" data-testid="figure-warning">
          {[unchecked ? 'Not fact checked yet.' : null, noUse ?? null, against].filter(Boolean).join(' ')}
        </p>
      )}
      <div className="flex gap-2">
        {onUse && <button type="button" onClick={onUse} className={SOLID}>Use {printedFigure(figure)}</button>}
        <button type="button" onClick={() => readFigure(figure)} className={GHOST}>{readLabel(figure.locator)}</button>
      </div>
    </div>
  )
}

/** A linked input, explained in place: where its value came from, and the way to open or drop the link. */
export function LinkDetails({ tool, shown, onOpen, onUnlink }: {
  tool: string
  shown: string
  onOpen?: () => void
  onUnlink: () => void
}) {
  return (
    <div className="space-y-2 border-l-2 border-[var(--exam-accent,hsl(var(--foreground)/0.4))] pb-1 pl-3" data-testid="link-details">
      <p className="text-sm">Taken from <b className="font-semibold">{tool}</b>: {shown}.</p>
      <p className="text-xs text-muted-foreground">A change in {tool} doesn’t reach here. Change the value here and it becomes yours.</p>
      <div className="flex gap-2">
        {onOpen && <button type="button" onClick={onOpen} className={GHOST}>Open {tool}</button>}
        <button type="button" onClick={onUnlink} className={GHOST}>Unlink</button>
      </div>
    </div>
  )
}
