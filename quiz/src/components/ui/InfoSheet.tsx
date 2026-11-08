// The **info popup**: the shape every popup that reads out what something is
// shares — the question's Info, the quiz builder's bank info, Fact Check, the
// marks-lost breakdown, the level popup, Learning Progress and the keyboard
// shortcuts.
//
// A black sheet (`bg-background`) led by a **banner** — a tinted card holding
// the popup's own header (a tile, a small line over the title, a round close)
// and, along its foot, a **stat strip** of the few figures that matter — then
// grouped lists (`GroupedList`) for the rest, and last a line of **fine print**
// for what only a maintainer reads. The banner takes the exam's accent when an
// exam scopes the popup (`examAccentStyle` on the sheet), and a neutral wash
// otherwise. See `docs/style-guide.md` §7.2c.

import type { CSSProperties, ReactNode, Ref } from 'react'
import { X } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { cn } from '@/lib/utils'

/** The neutral wash, for a popup no exam scopes. */
export const NEUTRAL_BANNER = 'bg-foreground/[0.07]'
/** The exam's wash — `examAccentStyle` on the sheet or banner supplies it. */
export const EXAM_BANNER = 'bg-[var(--exam-accent-soft,hsl(var(--foreground)/0.07))]'

/**
 * The overlay and the sheet. Escape is the caller's: several of these hand the
 * key over to a dialog opened on top of them.
 */
export function InfoSheet({
  onClose,
  label,
  labelledBy,
  children,
  layer = 'z-[80]',
  style,
  className,
  dialogRef,
}: {
  onClose: () => void
  label?: string
  labelledBy?: string
  children: ReactNode
  /** The overlay's stacking layer (style guide §8.1). */
  layer?: string
  /** On the sheet — `examAccentStyle(key)` scopes the banner's accent. */
  style?: CSSProperties
  className?: string
  dialogRef?: Ref<HTMLDivElement>
}) {
  return (
    <OverlayPortal>
      <div
        ref={dialogRef}
        className={cn('fixed inset-0 flex justify-center overflow-y-auto p-4 paper-scrim', layer)}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-labelledby={labelledBy}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
        {/* `m-auto`, not `items-center`: a sheet taller than the screen then
            scrolls from its top instead of losing it. */}
        <div
          className={cn('relative z-10 m-auto flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-background p-3 shadow-2xl', className)}
          style={style}
        >
          {children}
        </div>
      </div>
    </OverlayPortal>
  )
}

/** The banner: header, anything between (a progress bar), and the strip. */
export function InfoBanner({
  tile,
  eyebrow,
  title,
  titleId,
  onClose,
  closeRef,
  tint = EXAM_BANNER,
  children,
  stats,
}: {
  /** The square at the left — an exam logo, a verdict mark, a level. */
  tile: ReactNode
  /** The small line over the title — what the title belongs to. */
  eyebrow?: ReactNode
  title: ReactNode
  titleId?: string
  onClose: () => void
  closeRef?: Ref<HTMLButtonElement>
  tint?: string
  children?: ReactNode
  /** `<Stat>`s, laid out as the strip along the banner's foot. */
  stats?: ReactNode[]
}) {
  const shown = (stats ?? []).filter(Boolean)
  return (
    <div className={cn('overflow-hidden rounded-xl', tint)}>
      <header className="flex items-center gap-3 px-3.5 pb-3 pt-3.5">
        {tile}
        <div className="min-w-0 flex-1">
          {eyebrow && <p className="mb-0.5 truncate text-xs text-foreground/75">{eyebrow}</p>}
          <h2 id={titleId} className="text-[17px] font-bold leading-tight">{title}</h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          data-sound="tap"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/40 text-foreground/80 transition-colors hover:bg-background/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </header>
      {children}
      {shown.length > 0 && (
        <div
          className="grid border-t border-foreground/10"
          style={{ gridTemplateColumns: `repeat(${shown.length}, minmax(0, 1fr))` }}
        >
          {shown}
        </div>
      )}
    </div>
  )
}

/** One figure of the strip: the number, and what it counts under it. */
export function Stat({
  value,
  label,
  accent,
  tone,
}: {
  value: ReactNode
  label?: ReactNode
  /** Draw the figure in the exam's accent — the one the popup is about. */
  accent?: boolean
  /** Or in a verdict's colour (a met goal), as a text class. */
  tone?: string
}) {
  return (
    <div className="min-w-0 border-l border-foreground/10 px-3 pb-3 pt-2.5 first:border-l-0">
      <p
        className={cn(
          'truncate text-lg font-bold leading-tight tabular-nums',
          accent && 'text-[var(--exam-accent,hsl(var(--foreground)))]',
          tone,
        )}
      >
        {value}
      </p>
      {label && <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{label}</p>}
    </div>
  )
}

/** The square a banner leads with when it isn't an exam logo. */
export function BannerTile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-foreground/10', className)} aria-hidden>
      {children}
    </span>
  )
}

/** The last line: an id, a link to the file, a secondary action. */
export function InfoFinePrint({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-1.5 pb-1 text-xs text-muted-foreground">
      {children}
    </div>
  )
}
