import { useMemo } from 'react'
import { CalendarCheck } from 'lucide-react'
import { getSittingsForExam, formatSittingDate, type ExamSitting } from '@/data/examSittings'

interface Props {
  examId: string
  /** Currently selected exam date (ISO YYYY-MM-DD) — highlights matching sitting */
  selectedDate?: string
  /** Called with the end date (or start date for single-day sittings) when a row is clicked */
  onSelect: (date: string) => void
}

function isSelected(sitting: ExamSitting, selectedDate: string | undefined): boolean {
  if (!selectedDate) return false
  if (sitting.endDate) {
    return selectedDate >= sitting.startDate && selectedDate <= sitting.endDate
  }
  return selectedDate === sitting.startDate
}

export function ExamSittingsList({ examId, selectedDate, onSelect }: Props) {
  const sittings = useMemo(() => getSittingsForExam(examId), [examId])

  if (sittings.length === 0) return null

  return (
    <div className="space-y-1">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1">
        <CalendarCheck className="h-3 w-3" />
        Upcoming sittings
      </p>
      <div className="flex flex-col gap-1">
        {sittings.map((s, i) => {
          const active = isSelected(s, selectedDate)
          const selectDate = s.endDate ?? s.startDate
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(selectDate)}
              className={`w-full text-left rounded-md px-2.5 py-1.5 text-xs transition-colors border ${
                active
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border hover:border-primary/40 hover:bg-accent/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{formatSittingDate(s)}</span>
                <span className={`shrink-0 rounded px-1 py-px text-[10px] font-semibold tracking-wide ${
                  s.format === 'CBT'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                }`}>
                  {s.format}
                </span>
              </div>
              {s.registrationDeadline && (
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Reg. deadline: {formatSittingDate({ ...s, startDate: s.registrationDeadline, endDate: null })}
                </p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
