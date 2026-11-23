// The exams the reader is studying, as a sheet from the exam at the head of
// Today: tap one to show it. The full switcher of docs/redesign-spec.md §6
// (days left, syllabus bar, Add an exam as its own screen) is Phase E; until
// then the last row opens the existing exams panel.

import { useId } from 'react'
import { Plus } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { wikiExamIdToProgressKey, type WikiExamSyllabus } from '@/lib/wikiParser'
import { cn } from '@/lib/utils'

const ROW = 'flex min-h-[60px] w-full items-center gap-3.5 rounded-[18px] px-4 text-left text-[17px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'

export function ExamSheet({
  exams, activeId, onPick, onManage, onClose,
}: {
  exams: readonly WikiExamSyllabus[]
  activeId: string | null
  onPick: (examId: string) => void
  onManage: () => void
  onClose: () => void
}) {
  const titleId = useId()
  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Your exams</PopupTitle>
      <ul className="flex flex-col gap-2.5">
        {exams.map(exam => {
          const on = exam.examId === activeId
          return (
            <li key={exam.examId}>
              <button
                type="button"
                aria-current={on || undefined}
                onClick={() => { onPick(exam.examId); onClose() }}
                className={cn(ROW, on ? 'border-2 border-foreground' : 'border-[1.5px] border-border hover:border-foreground')}
              >
                <ExamLogo examKey={wikiExamIdToProgressKey(exam.examId)} size="md" />
                <span className="min-w-0 flex-1 truncate">{exam.examLabel}</span>
                {on && <CheckMark className="h-7 w-7 text-foreground" label="Showing" />}
              </button>
            </li>
          )
        })}
        <li>
          <button
            type="button"
            onClick={() => { onClose(); onManage() }}
            className={cn(ROW, 'border-[1.5px] border-border hover:border-foreground')}
          >
            <span className="flex h-9 w-9 items-center justify-center"><Plus className="h-5 w-5" aria-hidden="true" /></span>
            Add or change exams
          </button>
        </li>
      </ul>
    </Popup>
  )
}
