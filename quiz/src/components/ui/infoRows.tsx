// The rows of an info popup's grouped lists (`InfoSheet`), apart from the sheet
// itself so a control drawn as one of them (`PdfLinkButton`'s row) doesn't
// bring the sheet into every chunk that draws the control.

import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** The small mark at the start of a row — a document, a verdict, a book. */
export function RowTile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground', className)} aria-hidden>
      {children}
    </span>
  )
}

/** A publisher's initials, the chip a source row leads with. */
export function PublisherChip({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md bg-muted px-1 text-[9px] font-extrabold tracking-wide text-muted-foreground" aria-hidden>
      {children}
    </span>
  )
}

/** The classes of a row that is a button or a link inside a group. */
export const GROUP_ACTION_ROW =
  'flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none'

export function RowChevron({ className }: { className?: string }) {
  return <ChevronRight className={cn('h-3.5 w-3.5 shrink-0 text-muted-foreground', className)} aria-hidden />
}

