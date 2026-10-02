// The **coverage calendar** — a month of the streak, one cell a day
// (docs/actuaria-online.md §6.6). A studied day is filled in the streak's
// orange (style guide §4.1); today is ringed; a day a freeze bridged is not
// drawn at all, because nothing records which day that was (D5). The grid is
// `lib/actuaria/coverage.ts`'s.

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { coverageMonth } from '@/lib/actuaria/coverage'
import { cn } from '@/lib/utils'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function CoverageCalendar({
  month,
  today,
  studied,
  onMonth,
  canGoForward,
}: {
  month: string
  today: string
  studied: ReadonlySet<string>
  onMonth: (delta: number) => void
  canGoForward: boolean
}) {
  const weeks = coverageMonth(month, today, studied)
  const title = new Date(`${month}-01T12:00:00Z`).toLocaleDateString(undefined, { month: 'long', year: 'numeric', timeZone: 'UTC' })

  return (
    <div className="space-y-2" data-testid="actuaria-coverage-calendar">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onMonth(-1)}
          aria-label="Previous month"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="flex-1 text-center text-sm font-medium" aria-live="polite">{title}</p>
        <button
          type="button"
          onClick={() => onMonth(1)}
          disabled={!canGoForward}
          aria-label="Next month"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <table className="w-full table-fixed border-separate border-spacing-1 text-center text-xs">
        <thead>
          <tr>
            {WEEKDAYS.map((d, i) => (
              <th key={i} scope="col" className="font-normal text-muted-foreground">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map(week => (
            <tr key={week[0].key}>
              {week.map(day => (
                <td key={day.key} className="p-0">
                  {day.inMonth ? (
                    <span
                      className={cn(
                        'mx-auto flex aspect-square max-w-9 items-center justify-center rounded-md font-mono tabular-nums',
                        day.studied ? 'bg-orange-500/80 font-semibold text-white' : day.future ? 'text-muted-foreground/40' : 'bg-muted/50 text-muted-foreground',
                        day.today && 'ring-2 ring-foreground',
                      )}
                      aria-label={`${day.key}${day.studied ? ', covered' : ''}${day.today ? ', today' : ''}`}
                    >
                      {day.day}
                    </span>
                  ) : (
                    <span aria-hidden className="block aspect-square" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
