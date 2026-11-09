import { Sheet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PICK } from '@/components/ui/ink'
import { useQuizStore } from '@/stores/quizStore'

/**
 * The question bar's **Spreadsheet** toggle, beside Flag and Info: opens the
 * question's spreadsheet (docs/question-spreadsheet.md). Shown only for an exam
 * sat with one. Outlined and labelled at rest so it reads as a tool, not a
 * stray icon; solid while the sheet is open, the Ink pick.
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
        'flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-2 text-sm font-semibold transition-colors sm:px-3',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        open ? cn(PICK, 'border-transparent') : 'border-foreground/40 text-foreground hover:bg-muted',
      )}
    >
      <Sheet className="h-[18px] w-[18px] sm:h-4 sm:w-4" aria-hidden="true" />
      <span className="sr-only sm:not-sr-only">Spreadsheet</span>
    </button>
  )
}

/**
 * The same toggle at a part that asks for numbers (`partWantsSheet` in
 * lib/questionSheet.ts) — "Construct a triangle", "Calculate the reserve" —
 * so the reader is shown where the spreadsheet is meant to be used, at the
 * point they need it.
 */
export function SpreadsheetPartButton() {
  const open = useQuizStore(s => s.sheetOpen)
  const setSheetOpen = useQuizStore(s => s.setSheetOpen)
  return (
    <button
      type="button"
      onClick={() => setSheetOpen(!open)}
      aria-pressed={open}
      title={open ? 'Close the spreadsheet' : 'Open in spreadsheet'}
      className={cn(
        'inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-sm font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        open ? cn(PICK, 'border-transparent') : 'border-foreground/40 text-foreground hover:bg-muted',
      )}
    >
      <Sheet className="h-4 w-4" aria-hidden="true" />
      Use spreadsheet
    </button>
  )
}
