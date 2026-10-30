import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { WEEKDAY_LABELS, addMonths, compareMonths, monthGrid, monthLabel, monthOf } from '@/lib/monthCalendar'

interface Props {
  /** ISO date picked, or '' */
  value: string
  /** Earliest ISO date that can be picked */
  min: string
  onSelect: (date: string) => void
}

/** A month at a time, for picking an exam day when the exam publishes no sittings to choose from. */
export function MonthCalendar({ value, min, onSelect }: Props) {
  const [shown, setShown] = useState(() => monthOf(value && value >= min ? value : min))
  const atStart = compareMonths(shown, monthOf(min)) <= 0

  return (
    <div className="select-none">
      <div className="flex items-center justify-between pb-2">
        <button
          type="button"
          onClick={() => setShown(m => addMonths(m, -1))}
          disabled={atStart}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-semibold" aria-live="polite">{monthLabel(shown)}</p>
        <button
          type="button"
          onClick={() => setShown(m => addMonths(m, 1))}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAY_LABELS.map(label => (
          <div key={label} className="h-6 flex items-center justify-center text-[10px] text-muted-foreground">
            {label}
          </div>
        ))}
        {monthGrid(shown).flat().map(cell => {
          if (!cell.inMonth) return <div key={cell.key} className="h-9" />
          const isSelected = cell.key === value
          const isPast = cell.key < min
          return (
            <button
              key={cell.key}
              type="button"
              onClick={() => onSelect(cell.key)}
              disabled={isPast}
              aria-pressed={isSelected}
              aria-label={cell.key}
              className={`h-9 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors duration-150 disabled:opacity-30 disabled:pointer-events-none ${
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/40 text-foreground hover:bg-accent'
              }`}
            >
              {cell.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
