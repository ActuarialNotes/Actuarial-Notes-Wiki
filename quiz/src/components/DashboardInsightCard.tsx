import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ChevronRight, X } from 'lucide-react'

/**
 * Shared shell for the two compact dashboard "insight" cards (Fading Concepts /
 * Recent Mistakes). A flat, single-tap card sized to sit two-up in a grid:
 *
 *   • header  — icon + title + a count pill
 *   • item    — the single top item; the whole row is the primary action
 *               (quizzes just that one item), with the verb shown as a trailing
 *               pill ("Try Again" / "Review")
 *   • footer  — a full-bleed "See all …" strip that opens the browser modal,
 *               shown only when there's more than one item to browse
 *
 * Both faces used to share one footprint via a flip; that hid the content behind
 * an unlabeled gesture and buried the primary action, so the card is now flat and
 * everything is reachable in a single tap. Cards stretch to a shared min-height so
 * the two-up row stays aligned.
 */
interface InsightCardProps {
  icon: ReactNode
  title: string
  count: number
  /** Preview of the single top item. */
  front: ReactNode
  /** Verb for acting on the top item, shown as a trailing pill. */
  primaryLabel: string
  onPrimary: () => void
  seeAllLabel: string
  onSeeAll: () => void
}

export function InsightCard({
  icon,
  title,
  count,
  front,
  primaryLabel,
  onPrimary,
  seeAllLabel,
  onSeeAll,
}: InsightCardProps) {
  return (
    <div className="flex h-full min-h-44 flex-col rounded-lg bg-card p-4 text-card-foreground shadow-[var(--shadow-card)]">
      {/* Header — icon + title + count */}
      <div className="flex items-center gap-1.5">
        {icon}
        <h2 className="truncate text-sm font-semibold tracking-tight">{title}</h2>
        {count > 0 && (
          <span className="ml-0.5 rounded-full bg-muted px-1.5 py-0.5 text-xs font-semibold tabular-nums text-muted-foreground">
            {count}
          </span>
        )}
      </div>

      {/* Top item — the whole row acts on that one item */}
      <button
        type="button"
        onClick={onPrimary}
        className="group -mx-2 mt-2 flex flex-1 items-start gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="min-w-0 flex-1">{front}</div>
        <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
          {primaryLabel}
        </span>
      </button>

      {/* Footer — browse the rest (only worthwhile with more than one) */}
      {count > 1 && (
        <button
          type="button"
          onClick={onSeeAll}
          className="-mx-4 -mb-4 mt-2 flex items-center justify-between gap-2 rounded-b-lg border-t border-border px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <span className="truncate">{seeAllLabel}</span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>
      )}
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
