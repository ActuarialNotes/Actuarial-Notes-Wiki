import { useEffect, useState } from 'react'
import { ShieldCheck, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FACT_CHECK_UI_ENABLED } from '@/lib/featureFlags'
import { factCheckBadge, type Verification } from '@/lib/verification'
import { FACT_CHECK_TONE_CLASSES, FACT_CHECK_TONE_ICONS } from '@/lib/factCheckTone'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
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
export function FactCheckDialog(props: FactCheckDialogProps) {
  if (!props.open || !FACT_CHECK_UI_ENABLED) return null
  return <FactCheckSheet {...props} />
}

/**
 * Mounted only while open, so the sound and the key handler belong to one
 * viewing rather than to the surface that owns the button.
 *
 * A bottom sheet on a phone and a centred dialog above `sm` — the same shape
 * the app's other record panels use (`docs/style-guide.md` §8.1), down to the
 * blurred scrim.
 */
function FactCheckSheet({
  onClose,
  verification,
  contentPath,
  contentName,
}: FactCheckDialogProps) {
  // Paper: the panel sliding in, the same cue as the question-info sheet.
  useSoundOnMount('open')
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-[130] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-card shadow-2xl sm:rounded-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`Fact check for ${contentName ?? contentPath}`}
        >
          <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex min-w-0 items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <div className="min-w-0">
                <h2 className="text-sm font-semibold leading-tight">Fact check</h2>
                <p className="truncate text-xs text-muted-foreground">
                  {contentName ?? contentPath}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-sound="tap"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            <FactCheckPanel
              verification={verification}
              contentPath={contentPath}
              contentName={contentName}
            />
          </div>
        </div>
      </div>
    </OverlayPortal>
  )
}
