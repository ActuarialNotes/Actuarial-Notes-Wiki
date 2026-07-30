import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronRight } from 'lucide-react'
import { useToast, TOAST_DURATION_MS } from '@/hooks/useToast'

const pillClass =
  'toast-pop-in flex items-center gap-2 rounded-full bg-green-600 dark:bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-lg'

/**
 * App-wide transient confirmation pill. Mounted once in `App`; anything that
 * needs to confirm an action calls `showToast` (or a helper like
 * `showAddedToDeck`) from `hooks/useToast`.
 *
 * A toast with a `to` route is tappable — it takes the user to where the thing
 * they just did landed (e.g. "Added to Deck" → My Deck) and dismisses itself.
 */
export default function Toast() {
  const toast = useToast(s => s.toast)
  const dismissToast = useToast(s => s.dismissToast)

  useEffect(() => {
    if (!toast) return
    const { id } = toast
    const timer = window.setTimeout(() => dismissToast(id), TOAST_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [toast, dismissToast])

  return (
    // The live region stays mounted so screen readers announce each message.
    // z-[80] clears the popup stack (z-[55]–z-[70]) — confirmations fired from
    // the concept popup's action menu must be visible above it — while staying
    // below the ceremony band. Bottom offset clears the mobile bottom nav.
    <div
      className="fixed bottom-20 md:bottom-6 left-0 lg:left-[var(--sidebar-width)] right-0 z-[80] flex justify-center px-4 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      {toast && (
        toast.to ? (
          // pointer-events-auto re-enables clicks the wrapper turns off, so only
          // the pill itself — never the strip beside it — intercepts taps.
          <Link
            key={toast.id}
            to={toast.to}
            onClick={() => dismissToast(toast.id)}
            className={`${pillClass} pointer-events-auto pr-3 hover:bg-green-700 dark:hover:bg-green-400 transition-colors`}
          >
            <Check className="h-4 w-4 shrink-0" />
            <span>{toast.message}</span>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-80" />
          </Link>
        ) : (
          <div key={toast.id} className={pillClass}>
            <Check className="h-4 w-4 shrink-0" />
            <span>{toast.message}</span>
          </div>
        )
      )}
    </div>
  )
}
