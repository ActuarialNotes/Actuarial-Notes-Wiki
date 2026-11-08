import type { ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'
import { FactCheckBadge } from '@/components/FactCheckBadge'
import { effectiveLabel, formatAssumptionValue, type AssumptionRow, type AssumptionSet } from '@/lib/assumptionBank'
import { cn } from '@/lib/utils'

/**
 * One assumption set (docs/assumptions-bank.md): what it is, whose and which
 * edition, its fact check, and its rows — each figure with where in the
 * document it is printed, a blank row saying it hasn't been read yet. Drawn
 * by the Assumptions Bank shelf (`/tools/assumptions`, with each figure's
 * "Use in" links as `rowAction`) and on the resource page it was read from.
 * The surface is `ResourceMetaCard`'s, so it reads as part of the citation.
 */
export function AssumptionSetCard({
  set,
  rowAction,
  onReadSource,
  compact = false,
  className,
}: {
  set: AssumptionSet
  /** Drawn under a row — the shelf's links into the tools that take it. */
  rowAction?: (row: AssumptionRow) => ReactNode
  /** Open the resource page of the document it was read from. */
  onReadSource?: () => void
  compact?: boolean
  className?: string
}) {
  const pad = compact ? 'px-3' : 'px-4'
  return (
    <section
      aria-label={set.title}
      id={`set-${set.id.replace(/[^A-Za-z0-9]+/g, '-')}`}
      className={cn('not-prose overflow-hidden rounded-lg border border-border bg-card', className)}
      data-testid="assumption-set"
    >
      <header className={cn(pad, 'space-y-1 pt-3 pb-2')}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-sm font-semibold leading-snug">{set.title}</h3>
          <FactCheckBadge verification={set.verification} contentPath={set.path} contentName={set.title} className="shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground">
          {set.publisher} · {set.edition} · from {effectiveLabel(set.effective)}
        </p>
      </header>
      <ul>
        {set.rows.map(row => {
          const value = formatAssumptionValue(row)
          const action = rowAction?.(row)
          return (
            <li key={row.id} className={cn(pad, 'border-t border-border/60 py-2')} data-testid="assumption-row">
              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 text-sm">{row.label}</span>
                <span
                  className={cn('shrink-0 text-right text-sm tabular-nums', value ? 'font-semibold' : 'text-muted-foreground')}
                  title={value ? undefined : 'Not read off the document yet'}
                >
                  {value || '—'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{row.locator}</p>
              {action}
            </li>
          )
        })}
      </ul>
      <footer className={cn(pad, 'flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/60 py-2 text-xs')}>
        {onReadSource && (
          <button type="button" onClick={onReadSource} className="font-medium underline underline-offset-2 hover:no-underline">
            Read the source
          </button>
        )}
        <a href={set.document} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground">
          The publisher’s copy <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </footer>
    </section>
  )
}
