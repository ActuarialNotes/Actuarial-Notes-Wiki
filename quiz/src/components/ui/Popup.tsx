// The redesign's popup (docs/redesign-spec.md §2.3, R14; style guide §13.5):
// the ground colour with a 1.5px edge in the text colour, over a page dimmed
// to about a third. Below `sm` it is a sheet rising from the foot of the
// screen with a grab handle; from `sm` it is a panel in the middle.
//
// The session length sheet and the exam switcher are built from it. An info
// popup (`InfoSheet`) draws the same shape and keeps its own keys.

import { useEffect, useRef, type ReactNode } from 'react'
import { useDragToClose } from '@/hooks/useDragToClose'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { cn } from '@/lib/utils'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Popup({
  onClose,
  label,
  labelledBy,
  children,
  layer = 'z-[80]',
  full = false,
  suspended = false,
  aboveReader = false,
  className,
}: {
  onClose: () => void
  label?: string
  labelledBy?: string
  children: ReactNode
  /** The overlay's stacking layer (style guide §8.2). */
  layer?: string
  /** Below `sm`, fill the screen instead of rising as a sheet: a screen of its own (Add an exam). */
  full?: boolean
  /**
   * Something opened from the popup has the keyboard (the PDF reader over a
   * past paper): Escape and Tab are left to it until it closes.
   */
  suspended?: boolean
  /**
   * The popup stays up while the concept reader is open and sits in the room
   * above the reader's pane. Esc and Tab are then the reader's: Esc closes
   * the reader first, and the popup on the next press.
   */
  aboveReader?: boolean
  className?: string
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  // Below `sm` the sheet is pulled down by its handle to close it.
  useDragToClose(panelRef, onClose, { backdrop: backdropRef, enabled: !full })
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const suspendedRef = useRef(suspended)
  suspendedRef.current = suspended

  // Focus moves into the popup, stays there, and goes back where it was.
  useEffect(() => {
    const before = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    panel?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (suspendedRef.current) return
      if (aboveReader && document.documentElement.dataset.conceptSplitOpen) return
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const stops = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (stops.length === 0) {
        e.preventDefault()
        return
      }
      const first = stops[0]
      const last = stops[stops.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      document.body.style.overflow = overflow
      before?.focus?.()
    }
  }, [aboveReader])

  return (
    <OverlayPortal>
      <div
        className={cn('fixed inset-0 flex items-end justify-center sm:items-center sm:p-4 paper-scrim', layer)}
        data-above-reader={aboveReader || undefined}
        style={aboveReader ? { bottom: 'var(--concept-split-height, 0px)' } : undefined}
      >
        {/* The page behind, dimmed to about 30%. No blur: it stays readable as a page. */}
        <div ref={backdropRef} className="absolute inset-0 bg-ground/70" onClick={onClose} aria-hidden="true" />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          aria-labelledby={labelledBy}
          tabIndex={-1}
          style={aboveReader ? { maxHeight: 'calc(92dvh - var(--concept-split-height, 0px))' } : undefined}
          className={cn(
            'relative z-10 flex max-h-[92dvh] w-full flex-col gap-[18px] overflow-y-auto bg-ground text-foreground outline-none',
            full
              ? 'h-dvh max-h-dvh px-5 pb-6 pt-3 sm:h-auto sm:max-h-[92dvh]'
              : 'rounded-t-[22px] border-[1.5px] border-b-0 border-foreground px-5 pb-7 pt-2.5',
            'sm:max-w-md sm:rounded-[22px] sm:border-[1.5px] sm:border-foreground sm:p-6',
            className,
          )}
        >
          {!full && (
            <span data-sheet-handle aria-hidden="true" className="-mx-5 -mb-2 -mt-2.5 flex shrink-0 touch-none justify-center pb-2 pt-2.5 sm:hidden">
              <span className="h-1 w-10 rounded-full bg-foreground" />
            </span>
          )}
          {children}
        </div>
      </div>
    </OverlayPortal>
  )
}

/** A popup's title: 22px, bold. Pass its `id` to the popup's `labelledBy`. */
export function PopupTitle({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={cn('text-[22px] font-bold leading-tight', className)}>
      {children}
    </h2>
  )
}
