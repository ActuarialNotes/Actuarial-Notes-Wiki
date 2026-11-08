import { Sheet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PICK } from '@/components/ui/ink'

/**
 * The question bar's **Spreadsheet** toggle, beside Flag and Info: opens the
 * question's spreadsheet (docs/question-spreadsheet.md). Shown only for an exam
 * sat with one. Solid while the sheet is open, the Ink pick.
 */
export function SpreadsheetButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={open}
      aria-label={open ? 'Close the spreadsheet' : 'Open in spreadsheet'}
      title={open ? 'Close the spreadsheet' : 'Open in spreadsheet'}
      className={cn(
        'flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors sm:px-3',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        open ? PICK : 'text-muted-foreground hover:bg-accent hover:text-foreground',
      )}
    >
      <Sheet className="h-[18px] w-[18px] sm:h-4 sm:w-4" aria-hidden="true" />
      <span className="sr-only sm:not-sr-only">Spreadsheet</span>
    </button>
  )
}
