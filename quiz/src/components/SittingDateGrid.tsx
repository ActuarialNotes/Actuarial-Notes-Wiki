import { useMemo } from 'react'

// Same Mon→Sun, week-columns-left-to-right orientation as the dashboard heatmap (ExamHeatmap.tsx)
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function isoKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function mondayOf(d: Date): Date {
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  const r = new Date(d)
  r.setDate(r.getDate() + diff)
  r.setHours(0, 0, 0, 0)
  return r
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

interface Cell {
  key: string
  day: number
  inRange: boolean
}

interface Column {
  monthLabel: string | null
  cells: Cell[]
}

interface Props {
  /** ISO start date of the sitting window */
  startDate: string
  /** ISO end date of the sitting window (inclusive) */
  endDate: string
  selectedDate: string | null
  onSelect: (date: string) => void
}

export function SittingDateGrid({ startDate, endDate, selectedDate, onSelect }: Props) {
  const columns = useMemo<Column[]>(() => {
    const start = new Date(startDate + 'T00:00:00')
    const end = new Date(endDate + 'T00:00:00')
    const gridStart = mondayOf(start)
    const totalDays = Math.round((end.getTime() - gridStart.getTime()) / 86400000) + 1
    const totalWeeks = Math.ceil(totalDays / 7)

    let prevMonth = -1
    return Array.from({ length: totalWeeks }, (_, w) => {
      const colStart = addDays(gridStart, w * 7)
      const cells = Array.from({ length: 7 }, (_, i) => {
        const d = addDays(colStart, i)
        const key = isoKey(d)
        return { key, day: d.getDate(), inRange: key >= startDate && key <= endDate }
      })
      const firstInRange = cells.find(c => c.inRange)
      let monthLabel: string | null = null
      if (firstInRange) {
        const month = Number(firstInRange.key.slice(5, 7)) - 1
        if (month !== prevMonth) monthLabel = MONTH_ABBR[month]
        prevMonth = month
      }
      return { monthLabel, cells }
    })
  }, [startDate, endDate])

  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        Pick your exact day
      </p>
      <div className="flex items-start gap-1 overflow-x-auto pb-1">
        <div className="flex flex-col shrink-0">
          <div className="h-3.5" />
          <div className="flex flex-col gap-1 mt-1">
            {DAY_LABELS.map((label, i) => (
              <div key={i} className="h-8 w-4 flex items-center justify-center text-[9px] leading-none text-muted-foreground">
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-1">
          {columns.map((col, wi) => (
            <div key={wi} className="flex flex-col items-center">
              <div className="h-3.5 text-[9px] leading-none text-muted-foreground whitespace-nowrap">
                {col.monthLabel ?? ''}
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {col.cells.map(cell => {
                  const isSelected = cell.key === selectedDate
                  if (!cell.inRange) {
                    return <div key={cell.key} className="h-8 w-8" />
                  }
                  return (
                    <button
                      key={cell.key}
                      type="button"
                      onClick={() => onSelect(cell.key)}
                      aria-pressed={isSelected}
                      aria-label={cell.key}
                      className={`h-8 w-8 rounded-md flex items-center justify-center text-xs font-semibold transition-all duration-150 ${
                        isSelected
                          ? 'bg-primary text-primary-foreground ring-2 ring-primary/40 scale-105'
                          : 'bg-muted/40 border border-border text-foreground hover:bg-accent hover:border-primary/50'
                      }`}
                    >
                      {cell.day}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
