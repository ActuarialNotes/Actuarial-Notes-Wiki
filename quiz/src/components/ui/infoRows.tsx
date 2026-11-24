// The rows of an info popup's grouped lists (`InfoSheet`), apart from the sheet
// itself so a control drawn as one of them (`PdfLinkButton`'s row) doesn't
// bring the sheet into every chunk that draws the control.

import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** The small mark at the start of a row — a document, a verdict, a book. */
export function RowTile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border', className)} aria-hidden>
      {children}
    </span>
  )
}

/** A publisher's initials, the chip a source row leads with. */
export function PublisherChip({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md border border-border px-1.5 text-[13px] font-bold" aria-hidden>
      {children}
    </span>
  )
}

/** The classes of a row that is a button or a link inside a group. */
export const GROUP_ACTION_ROW =
  'flex w-full items-center gap-3 px-3.5 py-3 text-left text-[15px] transition-colors hover:bg-foreground/10 focus-visible:bg-foreground/10 focus-visible:outline-none'

export function RowChevron({ className }: { className?: string }) {
  return <ChevronRight className={cn('h-4 w-4 shrink-0', className)} aria-hidden />
}

