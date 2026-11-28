// The **info popup**: the shape every popup that reads out what something is
// shares: the question's Info, the quiz builder's bank info, Fact Check, the
// level popup, Learning Progress and the keyboard shortcuts.
//
// It is drawn as the redesign's popup (`components/ui/Popup.tsx`, style guide
// §13.5): the ground colour with a 1.5px edge in the text colour, over a page
// dimmed to about a third, a sheet from the foot of the screen below `sm` and
// a panel in the middle from there. It keeps its own shell because Escape is
// its caller's (several hand the key to a dialog opened on top of them).
//
// Inside: a **header** (a tile, a small line over the title, close) and under
// it a **stat strip** of the few figures that matter, outlined; then grouped
// lists (`GroupedList`) for the rest, and last a line of **fine print** for
// what only a maintainer reads. Nothing in it takes the exam's colour but the
// exam's own logo. See `docs/style-guide.md` §7.2c.

import { useRef, type CSSProperties, type ReactNode, type Ref } from 'react'
import { X } from 'lucide-react'
import { useDragToClose } from '@/hooks/useDragToClose'
import { SheetHandle } from '@/components/ui/SheetHandle'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { cn } from '@/lib/utils'

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
  /** On the sheet: custom properties its content reads. */
  style?: CSSProperties
  className?: string
  dialogRef?: Ref<HTMLDivElement>
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  // Below `sm` the sheet is resized by its handle, and pulled down to close it.
  useDragToClose(panelRef, onClose, { backdrop: backdropRef })
  return (
    <OverlayPortal>
      <div
        ref={dialogRef}
        className={cn('fixed inset-0 flex items-end justify-center sm:items-center sm:p-4 paper-scrim', layer)}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-labelledby={labelledBy}
      >
        {/* The page behind, dimmed to about 30%. No blur: it stays readable as a page. */}
        <div ref={backdropRef} className="absolute inset-0 bg-ground/70" onClick={onClose} aria-hidden="true" />
        <div
          ref={panelRef}
          className={cn(
            'relative z-10 flex max-h-[92dvh] w-full flex-col gap-4 overflow-y-auto bg-ground text-foreground',
            'rounded-t-[22px] border-[1.5px] border-b-0 border-foreground px-5 pb-7 pt-2.5',
            'sm:max-w-md sm:rounded-[22px] sm:border-b-[1.5px] sm:p-6',
            className,
          )}
          style={style}
        >
          <SheetHandle className="-mx-5 -mb-2 -mt-2.5 sm:hidden" />
          {children}
        </div>
      </div>
    </OverlayPortal>
  )
}

/** The header: tile, title and close, anything between (a progress bar), and the strip. */
export function InfoBanner({
  tile,
  eyebrow,
  title,
  titleId,
  onClose,
  closeRef,
  children,
  stats,
}: {
  /** The square at the left: an exam logo, a verdict mark, a level. */
  tile: ReactNode
  /** The small line over the title: what the title belongs to. */
  eyebrow?: ReactNode
  title: ReactNode
  titleId?: string
  onClose: () => void
  closeRef?: Ref<HTMLButtonElement>
  children?: ReactNode
  /** `<Stat>`s, laid out as the strip under the header. */
  stats?: ReactNode[]
}) {
  const shown = (stats ?? []).filter(Boolean)
  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center gap-3">
        {tile}
        <div className="min-w-0 flex-1">
          {eyebrow && <p className="truncate text-[13px] leading-tight">{eyebrow}</p>}
          <h2 id={titleId} className="text-[20px] font-bold leading-tight">{title}</h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          data-sound="tap"
          className={INFO_CLOSE}
        >
          <X className="h-5 w-5" />
        </button>
      </header>
      {children}
      {shown.length > 0 && (
        <div
          className="grid overflow-hidden rounded-[18px] border border-border"
          style={{ gridTemplateColumns: `repeat(${shown.length}, minmax(0, 1fr))` }}
        >
          {shown}
        </div>
      )}
    </div>
  )
}

/** An info popup's close: a 44px target with no surface of its own. */
export const INFO_CLOSE =
  '-mr-2.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

/** One figure of the strip: the number, and what it counts under it. */
export function Stat({
  value,
  label,
  tone,
}: {
  value: ReactNode
  label?: ReactNode
  /** A verdict's colour (a met goal), as a text class. */
  tone?: string
}) {
  return (
    <div className="min-w-0 border-l border-border px-3.5 py-3 first:border-l-0">
      <p className={cn('truncate text-[20px] font-bold leading-tight tabular-nums', tone)}>{value}</p>
      {label && <p className="mt-0.5 text-[13px] leading-tight">{label}</p>}
    </div>
  )
}

/** The square a header leads with when it isn't an exam logo. */
export function BannerTile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-border', className)} aria-hidden>
      {children}
    </span>
  )
}

/** The last line: an id, a link to the file, a secondary action. */
export function InfoFinePrint({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[13px]">
      {children}
    </div>
  )
}
