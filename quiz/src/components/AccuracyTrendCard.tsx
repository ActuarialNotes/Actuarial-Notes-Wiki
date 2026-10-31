import { useState } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import {
  DIFFICULTY_ORDER,
  accuracyPercent,
  weeklyChange,
  type AccuracyTrend,
  type Tally,
} from '@/lib/accuracyTrend'
import { DIFFICULTY_LABEL } from '@/lib/difficultyBreakdown'
import { addDays, todayISO } from '@/lib/studyPlan'
import { monthDay } from '@/lib/registrationNudge'

const SPAN = 30

/**
 * The Dashboard's **accuracy** card: how often this exam's answers were right,
 * this week against last, by difficulty, and on each day studied in the last
 * 30 (`lib/accuracyTrend.ts`). One series, so no legend; each day's point
 * answers a hover or a tap with its count.
 */
export function AccuracyTrendCard({ trend }: { trend: AccuracyTrend }) {
  const [active, setActive] = useState<number | null>(null)
  const today = todayISO()
  const start = addDays(today, -(SPAN - 1))

  const month: Tally = trend.days.reduce((t, d) => ({ answered: t.answered + d.answered, correct: t.correct + d.correct }), { answered: 0, correct: 0 })
  const thisWeek = trend.recent.answered > 0
  const headline = accuracyPercent(thisWeek ? trend.recent : month)
  const change = weeklyChange(trend)
  const byDifficulty = thisWeek
    ? DIFFICULTY_ORDER.filter(d => trend.recent.byDifficulty[d].answered > 0)
    : []

  const points = trend.days.map(d => {
    const offset = SPAN - 1 - Math.round((Date.parse(today + 'T00:00:00Z') - Date.parse(d.day + 'T00:00:00Z')) / 86_400_000)
    return { ...d, x: (offset / (SPAN - 1)) * 100, y: 100 - (accuracyPercent(d) ?? 0) }
  })
  const line = points.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
  const shown = active !== null ? points[active] : null

  return (
    <section className="rounded-xl bg-card shadow-sm px-5 pt-5 pb-4" aria-labelledby="accuracy-heading">
      <h2 id="accuracy-heading" className="text-sm font-semibold text-muted-foreground">Accuracy</h2>

      <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2">
        <div>
          <span className="text-4xl font-black tabular-nums leading-none">{headline}%</span>
          <p className="mt-1 text-xs text-muted-foreground">
            {thisWeek
              ? `${trend.recent.correct} of ${trend.recent.answered} right, last 7 days`
              : `${month.correct} of ${month.answered} right, last 30 days`}
          </p>
        </div>
        {change !== null && change !== 0 && (
          <span
            className={
              'mb-5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold leading-none tabular-nums ' +
              (change > 0 ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400')
            }
            title={`${change > 0 ? 'Up' : 'Down'} ${Math.abs(change)} points on the week before (${accuracyPercent(trend.previous)}%)`}
          >
            {change > 0 ? <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /> : <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />}
            {Math.abs(change)} pts
            <span className="sr-only"> on the week before</span>
          </span>
        )}
        {byDifficulty.length > 0 && (
          <dl className="ml-auto flex gap-4 text-right">
            {byDifficulty.map(d => (
              <div key={d}>
                <dd className="text-lg font-bold tabular-nums leading-none">{accuracyPercent(trend.recent.byDifficulty[d])}%</dd>
                <dt className="mt-1 text-xs text-muted-foreground">{DIFFICULTY_LABEL[d]}</dt>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* Each studied day's rate. The line is drawn in a stretched SVG; the
          points are HTML placed by percentage so they stay round at any width. */}
      <div className="mt-4 flex gap-2">
      <div className="flex h-24 flex-col justify-between text-[10px] leading-none text-muted-foreground tabular-nums -my-[5px]" aria-hidden="true">
        <span>100%</span><span>50%</span><span>0%</span>
      </div>
      <div className="relative h-24 flex-1" aria-hidden="true" onPointerLeave={() => setActive(null)}>
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[0, 50, 100].map(y => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} className="stroke-border" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          {points.length > 1 && (
            <polyline points={line} fill="none" className="stroke-primary" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          )}
        </svg>
        {points.map((p, i) => (
          <button
            key={p.day}
            type="button"
            tabIndex={-1}
            data-sound="none"
            className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            onPointerEnter={() => setActive(i)}
            onClick={() => setActive(active === i ? null : i)}
          >
            <span className={'block rounded-full bg-primary ring-2 ring-card ' + (active === i ? 'h-3 w-3' : 'h-2 w-2')} />
          </button>
        ))}
        {shown && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md"
            style={{ left: `${Math.min(85, Math.max(15, shown.x))}%`, top: shown.y > 50 ? `calc(${shown.y}% - 2.5rem)` : `calc(${shown.y}% + 0.75rem)` }}
          >
            <span className="font-semibold">{monthDay(shown.day)}</span> · {shown.correct} of {shown.answered} right ({accuracyPercent(shown)}%)
          </div>
        )}
      </div>
      </div>
      <div className="mt-1 ml-9 flex justify-between text-xs text-muted-foreground">
        <span>{monthDay(start)}</span>
        <span>Today</span>
      </div>

      {/* The same numbers for a screen reader. */}
      <table className="sr-only">
        <caption>Accuracy on each day studied, last 30 days</caption>
        <thead><tr><th>Day</th><th>Right</th><th>Answered</th></tr></thead>
        <tbody>
          {trend.days.map(d => (
            <tr key={d.day}><td>{monthDay(d.day)}</td><td>{d.correct}</td><td>{d.answered}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
