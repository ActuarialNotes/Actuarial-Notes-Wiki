import { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { DELIVERABLE_TYPES, type DeliverableType } from '@/lib/coworkDeliverables'
import { cn } from '@/lib/utils'

/**
 * The way a deliverable is started: one button, bottom right, always there.
 *
 * Creating a deliverable is the Deliverables tab's whole purpose, so it is the
 * one control that does not scroll away — a shelf of three explanatory type
 * cards pinned above the list said the same thing at the cost of the first
 * screenful, and stopped being an obvious action the moment a reader had
 * deliverables of their own.
 *
 * Pressing it opens the three types **in line**, above the button, nearest
 * first — the choice is made where the hand already is, and the button becomes
 * the dismiss. The type is all this control asks for: everything else about a
 * deliverable is the scoping flow's to ask, one question at a time, on the
 * page it opens.
 *
 * It floats above the popup viewer rather than under it (`z-[45]` over the
 * pane's `z-40`), and rides up on the split pane's height so an open document
 * never buries it.
 */

export interface NewDeliverableFabProps {
  onCreate: (type: DeliverableType) => void
}

export function NewDeliverableFab({ onCreate }: NewDeliverableFabProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function pick(type: DeliverableType) {
    setOpen(false)
    onCreate(type)
  }

  return (
    <div
      ref={rootRef}
      style={{ bottom: 'calc(var(--concept-split-height, 0px) + 1.5rem)' }}
      className="fixed right-4 z-[45] flex flex-col items-end gap-2 sm:right-6"
    >
      {open && (
        // Nearest first: the list is read upwards from the thumb, so the
        // reversed order puts the first type closest to the button.
        <ul className="flex flex-col-reverse items-end gap-2">
          {DELIVERABLE_TYPES.map(spec => (
            <li key={spec.id}>
              <button
                type="button"
                onClick={() => pick(spec.id)}
                data-sound="select"
                className="flex max-w-[16rem] items-center gap-2 rounded-full border bg-card py-2 pl-4 pr-3 text-left shadow-[var(--shadow-card)] transition-colors hover:bg-accent"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">{spec.label}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">{spec.tagline}</span>
                </span>
                <Plus className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close the new deliverable menu' : 'New deliverable'}
        data-sound="press"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Plus className={cn('h-6 w-6 transition-transform duration-150', open && 'rotate-45')} aria-hidden />
      </button>
    </div>
  )
}
