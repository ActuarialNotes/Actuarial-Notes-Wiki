// A concept's "more" button (docs/redesign-spec.md §7.2): Add to Flashcards and
// Fact Check, and the rows the surface adds about how it is read (Listen).
// The menu is `ConceptActionMenu` in its `more` form, so the rows are the same
// ones every other surface opens.

import { useRef, useState, type ReactNode } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { ACTION_MENU_ROW_CLASS, ConceptActionMenu } from '@/components/ConceptActionMenu'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'

export function ConceptMoreButton({
  entry,
  content,
  rows,
  className,
}: {
  entry: WikiEntryRef
  content?: string | null
  /** The surface's own rows, above the shared ones. Given a way to close the menu. */
  rows?: (close: () => void) => ReactNode
  className?: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
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
      <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>
      <span className="flex-1 whitespace-nowrap text-left">{children}</span>
    </button>
  )
}
