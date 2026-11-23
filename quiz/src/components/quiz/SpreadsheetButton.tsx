import { Sheet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PICK } from '@/components/ui/ink'
import { useQuizStore } from '@/stores/quizStore'

/**
 * **Use spreadsheet**, at a part that asks for numbers (`partWantsSheet` in
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
