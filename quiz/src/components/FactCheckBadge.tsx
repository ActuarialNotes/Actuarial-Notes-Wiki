import { useState } from 'react'
import { AlertTriangle, Check, CheckCheck, RefreshCw, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FACT_CHECK_UI_ENABLED } from '@/lib/featureFlags'
import { factCheckBadge, type Verification, type FactCheckTone } from '@/lib/verification'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { FactCheckPanel } from '@/components/FactCheckPanel'

/**
 * **Fact Check** — the one badge that says what has been checked about a page.
 *
 * It is a trust signal, and a trust signal that can only be good is worth
 * nothing — so this shows "Not fact checked" as readily as it shows "Fact
 * checked", and tapping any state opens the page's fact-check record. Showing
 * the work is the point (docs/verification.md).
 *
 * The dialog half is exported on its own as `FactCheckDialog`, because on a
 * concept or resource page the way in is the **Fact Check** row of the action
 * menu rather than a badge in the title row.
 */

export const FACT_CHECK_TONE_CLASSES: Record<FactCheckTone, string> = {
  // §4.2 of the style guide: light tinted background, dark tinted text, inverted
  // in dark mode.
  green: 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
  amber: 'bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100',
  red: 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
  grey: 'bg-muted text-muted-foreground',
}

/**
 * A check mark is the feature's mark, so every state that is *about* checking
 * wears one: the double check for a page checked against a source, the single
 * check for one nobody has got to yet. The two states that are not about
 * checking — a page that changed underneath its pass, and one with something
 * known wrong on it — say that instead.
 */
export const FACT_CHECK_TONE_ICONS: Record<FactCheckTone, typeof Check> = {
  green: CheckCheck,
  amber: RefreshCw,
  red: AlertTriangle,
  grey: Check,
}

interface FactCheckBadgeProps {
  verification: Verification | null | undefined
  /** Repo-relative path of the page, e.g. `Concepts/Convexity.md`. */
  contentPath: string
  /** Human-readable page name, for the log panel's header. */
  contentName?: string
  className?: string
  /** Hide the label and show only the icon — for dense rows. */
  compact?: boolean
}

export function FactCheckBadge({
  verification,
  contentPath,
  contentName,
  className,
  compact = false,
}: FactCheckBadgeProps) {
  const [open, setOpen] = useState(false)
  if (!FACT_CHECK_UI_ENABLED) return null

  const badge = factCheckBadge(verification)
  const Icon = FACT_CHECK_TONE_ICONS[badge.tone]

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-sound="tap"
        title={`${badge.label} — ${badge.detail} Tap to see the fact check.`}
        aria-label={`Fact check: ${badge.label}. ${badge.detail}`}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
          'transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring',
          FACT_CHECK_TONE_CLASSES[badge.tone],
          className,
        )}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {!compact && <span className="truncate">{badge.label}</span>}
      </button>

      <FactCheckDialog
        open={open}
        onClose={() => setOpen(false)}
        verification={verification}
        contentPath={contentPath}
        contentName={contentName}
      />
    </>
  )
}

interface FactCheckDialogProps {
  open: boolean
  onClose: () => void
  verification: Verification | null | undefined
  contentPath: string
  contentName?: string
}

/** The fact-check record for one page, in the sheet every surface opens it in. */
export function FactCheckDialog({
  open,
  onClose,
  verification,
  contentPath,
  contentName,
}: FactCheckDialogProps) {
  if (!open || !FACT_CHECK_UI_ENABLED) return null

  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-[130] flex items-end justify-center bg-black/40 sm:items-center"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-background p-5 shadow-xl sm:rounded-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`Fact check for ${contentName ?? contentPath}`}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-base font-semibold">Fact check</h2>
              <p className="truncate text-xs text-muted-foreground">
                {contentName ?? contentPath}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-sound="tap"
              className="rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <FactCheckPanel
            verification={verification}
            contentPath={contentPath}
            contentName={contentName}
          />
        </div>
      </div>
    </OverlayPortal>
  )
}
