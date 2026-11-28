// Your exams or All exams: the switch at the top of Learn's and Practice's
// homes. Your exams is the reader's own (the exam in focus and the way to the
// others, or Add an exam for a reader with none); All exams is every exam, each
// opened without adding it (lib/examFocus.ts: an address that names an exam is
// a visit). The choice rides the address as `?exams=all`, so Back keeps it.
//
// Kept apart from the list itself (AllExamsList.tsx), which reads the sitting
// tables and stays out of the pages' first chunk.

import { Plus } from 'lucide-react'
import { LogoTile } from '@/components/LogoTile'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { cn } from '@/lib/utils'
import { useExamSwitcher } from '@/stores/examSwitcher'

export type ExamScope = 'yours' | 'all'

/** The address's scope: `?exams=all` is every exam, anything else the reader's. */
export function examScopeFrom(params: URLSearchParams): ExamScope {
  return params.get('exams') === 'all' ? 'all' : 'yours'
}

const SCOPES: readonly { value: ExamScope; label: string }[] = [
  { value: 'yours', label: 'Your exams' },
  { value: 'all', label: 'All exams' },
]

export function ExamScopeSwitch({
  value, onChange, className,
}: {
  value: ExamScope
  onChange: (next: ExamScope) => void
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label="Exams"
      data-testid="exam-scope"
      className={cn('grid grid-cols-2 gap-1 rounded-3xl border border-border p-1', className)}
    >
      {SCOPES.map(s => (
        <button
          key={s.value}
          type="button"
          aria-pressed={s.value === value}
          onClick={() => onChange(s.value)}
          className={cn(
            'h-10 rounded-[20px] text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            s.value === value ? 'bg-foreground font-bold text-background' : 'font-semibold',
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}

/** The one row a reader with no exams sees: Add an exam, opening the switcher on it. */
export function AddExamPanel({ testId = 'add-exam-row' }: { testId?: string }) {
  const openAddExam = useExamSwitcher(s => s.openAdd)
  return (
    <ListPanel>
      <ListRow
        onClick={() => openAddExam()}
        data-testid={testId}
        leading={<LogoTile size="lg" className="border border-dashed border-foreground"><Plus className="h-6 w-6" /></LogoTile>}
        title="Add an exam"
        meta={<span>Every SOA, CAS and CIA exam</span>}
      />
    </ListPanel>
  )
}
