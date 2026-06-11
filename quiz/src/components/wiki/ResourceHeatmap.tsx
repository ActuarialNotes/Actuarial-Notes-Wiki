import { useEffect, useMemo, useRef } from 'react'
import {
  type TimelineEntry,
  buildMonthCounts,
  monthKey,
  TIMELINE_MIN_YEAR,
} from '@/lib/resourceTimeline'

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const CELL = 15 // px — square side
const GAP = 3 // px — gap between cells/columns

// Shade of blue scales with how many resources/events/regulation land in a month.
function cellColor(count: number): string | undefined {
  if (count <= 0) return undefined
  const op = count >= 4 ? 1 : 0.3 + 0.7 * ((count - 1) / 3)
  return `rgba(59, 130, 246, ${op.toFixed(2)})`
}

interface Props {
  entries: TimelineEntry[]
  selected: { year: number; month: number } | null
  onSelectMonth: (year: number, month: number) => void
}

export function ResourceHeatmap({ entries, selected, onSelectMonth }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const maxYear = useMemo(
    () => Math.max(new Date().getFullYear(), ...entries.map(e => e.year)),
    [entries],
  )
  const years = useMemo(
    () => Array.from({ length: maxYear - TIMELINE_MIN_YEAR + 1 }, (_, i) => TIMELINE_MIN_YEAR + i),
    [maxYear],
  )
  const counts = useMemo(() => buildMonthCounts(entries), [entries])

  // Start scrolled to the present — the dense, interesting end of the range.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [years.length])

  return (
    <div className="rounded-xl border bg-card p-3 sm:p-4">
      <div className="flex items-stretch gap-[3px]">
        {/* Fixed month-label column */}
        <div className="flex flex-col gap-[3px] shrink-0 pt-[18px] pr-1">
          {MONTH_ABBR.map((m, i) => (
            <div
              key={m}
              className="flex items-center justify-end text-[9px] leading-none text-muted-foreground select-none"
              style={{ height: CELL }}
            >
              {i % 2 === 0 ? m : ''}
            </div>
          ))}
        </div>

        {/* Horizontally scrollable grid */}
        <div ref={scrollRef} className="overflow-x-auto flex-1 pb-1">
          <div style={{ minWidth: years.length * (CELL + GAP) }}>
            {/* Year labels (decade marks) */}
            <div className="flex gap-[3px]" style={{ height: 16 }}>
              {years.map(year => (
                <div key={year} className="relative shrink-0" style={{ width: CELL }}>
                  {year % 10 === 0 && (
                    <span className="absolute bottom-0 left-0 text-[9px] leading-none text-muted-foreground whitespace-nowrap select-none">
                      {year}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Month rows × year columns */}
            <div className="flex gap-[3px]">
              {years.map(year => (
                <div key={year} className="flex flex-col gap-[3px] shrink-0" style={{ width: CELL }}>
                  {MONTH_ABBR.map((_, month) => {
                    const count = counts.get(monthKey(year, month)) ?? 0
                    const isSelected = selected?.year === year && selected?.month === month
                    const clickable = count > 0
                    const label = `${MONTH_ABBR[month]} ${year} — ${count === 0 ? 'nothing' : `${count} item${count === 1 ? '' : 's'}`}`
                    return (
                      <div
                        key={month}
                        title={label}
                        role={clickable ? 'button' : undefined}
                        aria-label={clickable ? label : undefined}
                        tabIndex={clickable ? 0 : undefined}
                        onClick={clickable ? () => onSelectMonth(year, month) : undefined}
                        onKeyDown={clickable ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectMonth(year, month) }
                        } : undefined}
                        style={{ height: CELL, backgroundColor: cellColor(count) }}
                        className={`w-full rounded-[3px] transition-shadow ${
                          count > 0 ? '' : 'bg-muted/30'
                        }${clickable ? ' cursor-pointer hover:ring-2 hover:ring-blue-400/60' : ''}${
                          isSelected ? ' ring-2 ring-foreground dark:ring-white' : ''
                        }`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-between gap-3 pl-[34px]">
        <p className="text-[11px] text-muted-foreground">
          Each square is one month, 1700 → today. Scroll to explore.
        </p>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] text-muted-foreground">Fewer</span>
          {[0, 1, 2, 4].map(c => (
            <span
              key={c}
              className={`rounded-[3px] ${c === 0 ? 'bg-muted/30' : ''}`}
              style={{ width: 11, height: 11, backgroundColor: cellColor(c) }}
            />
          ))}
          <span className="text-[10px] text-muted-foreground">More</span>
        </div>
      </div>
    </div>
  )
}
