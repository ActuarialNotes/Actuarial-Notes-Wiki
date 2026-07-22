import { useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ChevronRight, X } from 'lucide-react'

/**
 * Shared shell for the two compact dashboard "insight" cards (Fading Concepts /
 * Recent Mistakes). Each is a flip card: the front shows the title plus a single
 * top item; tapping it flips to reveal a primary action ("Review" / "Try Again",
 * which quizzes just that one item) and a "See all …" button that opens a browser
 * modal listing everything. Designed to sit two-up in a grid, so it keeps a fixed
 * height and lets both faces share the same footprint.
 */
interface FlipInsightCardProps {
  icon: ReactNode
  title: string
  count: number
  /** Preview of the single top item, shown on the front face. */
  front: ReactNode
  primaryLabel: string
  onPrimary: () => void
  seeAllLabel: string
  onSeeAll: () => void
}

export function FlipInsightCard({
  icon,
  title,
  count,
  front,
  primaryLabel,
  onPrimary,
  seeAllLabel,
  onSeeAll,
}: FlipInsightCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="h-44 [perspective:1000px]">
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front face — title + one item, tap to flip */}
        <button
          type="button"
          onClick={() => setFlipped(true)}
          aria-hidden={flipped}
          tabIndex={flipped ? -1 : 0}
          className="absolute inset-0 flex flex-col rounded-lg bg-card p-4 text-left text-card-foreground shadow-[var(--shadow-card)] [backface-visibility:hidden] transition-colors hover:bg-muted/40"
        >
          <div className="flex items-center gap-1.5">
            {icon}
            <h2 className="truncate text-sm font-bold tracking-tight">{title}</h2>
            <span className="text-xs font-medium tabular-nums text-muted-foreground">{count}</span>
            <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
          <div className="mt-3 min-w-0 flex-1">{front}</div>
        </button>

        {/* Back face — primary action + see-all */}
        <div
          aria-hidden={!flipped}
          className="absolute inset-0 flex flex-col rounded-lg bg-card p-4 text-card-foreground shadow-[var(--shadow-card)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <button
            type="button"
            onClick={() => setFlipped(false)}
            tabIndex={flipped ? 0 : -1}
            className="flex items-center gap-1.5 text-left text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="truncate text-sm font-bold tracking-tight">{title}</span>
          </button>

          <div className="mt-auto space-y-2">
            <button
              type="button"
              onClick={onPrimary}
              tabIndex={flipped ? 0 : -1}
              className="w-full rounded-full bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {primaryLabel}
            </button>
            <button
              type="button"
              onClick={onSeeAll}
              tabIndex={flipped ? 0 : -1}
              className="w-full rounded-full border px-3 py-2 text-xs font-semibold transition-colors hover:bg-muted"
            >
              {seeAllLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * "See all" browser modal — a simple portal-rendered overlay listing every item
 * behind a card, with an optional bulk action in the header (e.g. "Review all").
 */
interface InsightBrowserModalProps {
  title: string
  icon: ReactNode
  onClose: () => void
  actionLabel?: string
  onAction?: () => void
  children: ReactNode
}

export function InsightBrowserModal({
  title,
  icon,
  onClose,
  actionLabel,
  onAction,
  children,
}: InsightBrowserModalProps) {
  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-[121] flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-card text-card-foreground shadow-2xl sm:rounded-2xl">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          {icon}
          <h2 className="text-sm font-bold tracking-tight">{title}</h2>
          {actionLabel && onAction && (
            <button
              type="button"
              onClick={onAction}
              className="ml-auto rounded-full border px-3 py-1 text-xs font-semibold transition-colors hover:bg-muted"
            >
              {actionLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className={`${actionLabel && onAction ? 'ml-2' : 'ml-auto'} p-1 -mr-1 text-muted-foreground hover:text-foreground`}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
