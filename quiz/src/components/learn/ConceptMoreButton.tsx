// A concept's "more" button (docs/redesign-spec.md §7.2): Add to Flashcards and
// Fact Check, and the rows the surface adds about how it is read (Listen).
// The menu is `ConceptActionMenu` in its `more` form, so the rows are the same
// ones every other surface opens.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { ACTION_MENU_ROW_CLASS, ConceptActionMenu } from '@/components/ConceptActionMenu'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'

export function ConceptMoreButton({
  entry,
  content,
  rows,
  levelRow,
  className,
}: {
  entry: WikiEntryRef
  content?: string | null
  /** The surface's own rows, above the shared ones. Given a way to close the menu. */
  rows?: (close: () => void) => ReactNode
  /** Lead the menu with the reader's level (a header with no level button). */
  levelRow?: boolean
  className?: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  // Escape closes the menu and hands focus back to the button.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      setOpen(false)
      ref.current?.focus()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open])
  return (
    <>
      <button
        ref={ref}
        type="button"
        data-play-menu-trigger
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`More for ${entry.name}`}
        title="More"
        className={cn(
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
      >
        <MoreHorizontal className="h-[22px] w-[22px]" aria-hidden="true" />
      </button>
      <ConceptActionMenu
        entry={entry}
        open={open}
        onClose={close}
        anchorRef={ref}
        content={content}
        rows="more"
        levelRow={levelRow}
        leading={rows?.(close)}
      />
    </>
  )
}

/** A row a surface adds to the more menu. */
export function MoreRow({
  icon,
  onClick,
  pressed,
  children,
}: {
  icon: ReactNode
  onClick: () => void
  pressed?: boolean
  children: ReactNode
}) {
  return (
    <button type="button" role="menuitem" aria-pressed={pressed} onClick={onClick} className={ACTION_MENU_ROW_CLASS}>
      <span className="flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <span className="flex-1 whitespace-nowrap text-left">{children}</span>
    </button>
  )
}
