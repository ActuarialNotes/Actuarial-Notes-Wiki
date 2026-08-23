import { useState } from 'react'
import { ShieldCheck, ShieldAlert, ShieldQuestion, RefreshCw, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VERIFICATION_UI_ENABLED } from '@/lib/featureFlags'
import { verificationBadge, type Verification, type VerificationTone } from '@/lib/verification'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { ValidationLogPanel } from '@/components/ValidationLogPanel'

/**
 * The one badge that says what has been checked about a page.
 *
 * It is a trust signal, and a trust signal that can only be good is worth
 * nothing — so this shows "Unverified" as readily as it shows "Verified", and
 * tapping any state opens the page's validation log. Showing the work is the
 * point (docs/verification.md).
 */

const TONE_CLASSES: Record<VerificationTone, string> = {
  // §4.2 of the style guide: light tinted background, dark tinted text, inverted
  // in dark mode.
  green: 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
  amber: 'bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100',
  red: 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
  grey: 'bg-muted text-muted-foreground',
}

const TONE_ICONS: Record<VerificationTone, typeof ShieldCheck> = {
  green: ShieldCheck,
  amber: RefreshCw,
  red: ShieldAlert,
  grey: ShieldQuestion,
}

interface VerificationBadgeProps {
  verification: Verification | null | undefined
  /** Repo-relative path of the page, e.g. `Concepts/Convexity.md`. */
  contentPath: string
  /** Human-readable page name, for the log panel's header. */
  contentName?: string
  className?: string
  /** Hide the label and show only the icon — for dense rows. */
  compact?: boolean
}

export function VerificationBadge({
  verification,
  contentPath,
  contentName,
  className,
  compact = false,
}: VerificationBadgeProps) {
  const [open, setOpen] = useState(false)
  if (!VERIFICATION_UI_ENABLED) return null

  const badge = verificationBadge(verification)
  const Icon = TONE_ICONS[badge.tone]

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-sound="tap"
        title={`${badge.label} — ${badge.detail} Tap to see the validation log.`}
        aria-label={`Validation status: ${badge.label}. ${badge.detail}`}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
          'transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring',
          TONE_CLASSES[badge.tone],
          className,
        )}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {!compact && <span className="truncate">{badge.label}</span>}
      </button>

      {open && (
        <OverlayPortal>
          <div
            className="fixed inset-0 z-[130] flex items-end justify-center bg-black/40 sm:items-center"
            onClick={() => setOpen(false)}
            role="presentation"
          >
            <div
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-background p-5 shadow-xl sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Validation log for ${contentName ?? contentPath}`}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-base font-semibold">Validation log</h2>
                  <p className="truncate text-xs text-muted-foreground">
                    {contentName ?? contentPath}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  data-sound="tap"
                  className="rounded-full p-1 text-muted-foreground hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ValidationLogPanel
                verification={verification}
                contentPath={contentPath}
                contentName={contentName}
              />
            </div>
          </div>
        </OverlayPortal>
      )}
    </>
  )
}
