import { Plus } from 'lucide-react'
import { useQuestionSheetStore } from '@/stores/questionSheetStore'
import { useQuizStore } from '@/stores/quizStore'

/**
 * **Insert H3** — drops the cell selected in the question's spreadsheet into
 * an answer box (docs/question-spreadsheet.md). It shows only while the sheet
 * is open on this question and the selected cell has something in it; the
 * spreadsheet isn't embedded in the answer, so this is the bridge between them.
 *
 * `onMouseDown` keeps the focus (and so the caret) in the answer box, which is
 * where the value goes.
 */
export function InsertCellButton({ questionId, onInsert }: { questionId: string; onInsert: (value: string) => void }) {
  const open = useQuizStore(s => s.sheetOpen)
  const selected = useQuestionSheetStore(s => s.selected)
  if (!open || !selected || selected.questionId !== questionId || selected.value === '') return null
  return (
    <button
      type="button"
      onMouseDown={e => e.preventDefault()}
      onClick={() => onInsert(selected.value)}
      className="inline-flex h-9 max-w-full items-center gap-1.5 rounded-full border border-border px-3 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Insert cell ${selected.address}, ${selected.value}, into your answer`}
    >
      <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>Insert {selected.address}</span>
      <span className="truncate font-normal text-muted-foreground tabular-nums">· {selected.value}</span>
    </button>
  )
}
