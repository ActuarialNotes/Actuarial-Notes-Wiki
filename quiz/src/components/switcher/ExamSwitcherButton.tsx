// The exam switcher's control (docs/redesign-spec.md §6): the exam's logo, its
// name and a chevron, at the top left of a place. Pressing it opens the sheet
// of the reader's exams (components/switcher/ExamSwitcherSheet.tsx).

import { ChevronDown } from 'lucide-react'
import { ExamLogo } from '@/components/ExamLogo'
import { useExamSwitcher } from '@/stores/examSwitcher'
import { cn } from '@/lib/utils'

export function ExamSwitcherButton({
  examKey, label, visiting = null, className, testId = 'exam-switcher',
}: {
  /** The exam_progress key, for the logo. */
  examKey: string
  /** The exam's name as the place shows it. */
  label: string
  /** The exam page's id, when this page is an exam the reader hasn't added. */
  visiting?: string | null
  className?: string
  testId?: string
}) {
  const open = useExamSwitcher(s => s.open)
  return (
    <button
      type="button"
      onClick={() => open(visiting)}
      aria-haspopup="dialog"
      aria-label={`Switch exam, ${label}`}
      data-testid={testId}
      className={cn(
        'flex h-11 min-w-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <ExamLogo examKey={examKey} size="md" />
      <span className="truncate text-[17px] font-semibold">{label}</span>
      <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
    </button>
  )
}
