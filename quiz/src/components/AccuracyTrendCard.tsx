import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUp, ChevronRight } from 'lucide-react'
import {
  ACCURACY_SPANS,
  DIFFICULTY_ORDER,
  RELIABLE_ANSWERS,
  ROLLING_DAYS,
  accuracyPercent,
  axisTicks,
  dayDiff,
  spanChange,
  weakestTopics,
  type AccuracySpan,
  type AccuracyTrend,
} from '@/lib/accuracyTrend'
import type { AccuracyTrends } from '@/hooks/useAccuracyTrend'
import type { Question } from '@/lib/parser'
import { DIFFICULTY_LABEL } from '@/lib/difficultyBreakdown'
import { addDays, todayISO } from '@/lib/studyPlan'
import { monthDay } from '@/lib/registrationNudge'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { AccuracyDayDialog } from '@/components/AccuracyDayDialog'
import { cn } from '@/lib/utils'

const SPAN_KEY = 'actuarial_accuracy_span'
const DEFAULT_SPAN: AccuracySpan = 30

function loadSpan(): AccuracySpan {
  try {
    const n = Number(localStorage.getItem(SPAN_KEY))
    return (ACCURACY_SPANS as readonly number[]).includes(n) ? (n as AccuracySpan) : DEFAULT_SPAN
  } catch {
    return DEFAULT_SPAN
  }
}

function saveSpan(span: AccuracySpan) {
  try { localStorage.setItem(SPAN_KEY, String(span)) } catch { /* ignore */ }
}

/** "Oct 3" — the axis has no room for the month written out. */
function shortDay(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** "Mon" — a week's axis names its days. */
function weekday(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' })
}

/** The diameter of a day's dot, by how many answers it rests on. */
function dotSize(answered: number, most: number): number {
  return 6 + 10 * Math.sqrt(answered / Math.max(1, most))
}

/**
 * The Dashboard's **accuracy** card: how often this exam's answers were right
 * over the last 7, 30 or 90 days (`lib/accuracyTrend.ts`). Every figure on it
 * covers the span picked. The line is the rolling 7-day rate; behind it each
 * studied day is a dot sized by how many answers it holds, so a day of one
 * answer can't shout. A dot answers a hover with its count and a tap with that
 * day's questions; under the chart, the weakest topics each start a quiz.
 */
export function AccuracyTrendCard({ trends, examLabel, questions }: {
  trends: AccuracyTrends
  examLabel: string
  questions: readonly Question[]
}) {
  const [span, setSpanState] = useState<AccuracySpan>(loadSpan)
  const setSpan = (s: AccuracySpan) => { setSpanState(s); saveSpan(s) }
  const [active, setActive] = useState<number | null>(null)
  const [openDay, setOpenDay] = useState<string | null>(null)
  const trend: AccuracyTrend = trends[span]
  const today = todayISO()

  const headline = accuracyPercent(trend.total)
  const change = spanChange(trend)
  const weak = weakestTopics(trend)
  const spanWords = `last ${span} days`

  const xOf = (day: string) => ((span - 1 - dayDiff(day, today)) / (span - 1)) * 100
  const most = Math.max(0, ...trend.days.map(d => d.answered))
  const points = trend.days.map(d => ({ ...d, x: xOf(d.day), y: 100 - (accuracyPercent(d) ?? 0) }))
  // The rolling line breaks where a week went unstudied rather than bridging it.
  const segments: string[] = []
  let run: string[] = []
  for (const p of trend.rolling) {
    if (p.percent === null) {
      if (run.length) segments.push(run.join(' '))
      run = []
    } else {
      run.push(`${xOf(p.day).toFixed(2)},${(100 - p.percent).toFixed(2)}`)
    }
  }
  if (run.length) segments.push(run.join(' '))
  const shown = active !== null ? points[active] : null

  const questionsById = useMemo(() => new Map(questions.map(q => [q.id, q])), [questions])
  const opened = openDay ? trend.days.find(d => d.day === openDay) ?? null : null

  return (
    <section className="rounded-xl bg-card shadow-sm px-5 pt-5 pb-4" aria-labelledby="accuracy-heading">
      <div className="flex items-center justify-between gap-3">
        <h2 id="accuracy-heading" className="text-sm font-semibold text-muted-foreground">Accuracy</h2>
        <SegmentedControl
          size="xs"
          pill
          label="Period"
          value={String(span) as `${AccuracySpan}`}
          onChange={v => { setSpan(Number(v) as AccuracySpan); setActive(null) }}
          options={ACCURACY_SPANS.map(s => ({ value: String(s) as `${AccuracySpan}`, label: `${s}D`, ariaLabel: `Last ${s} days` }))}
          className="w-36"
        />
      </div>

      <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-3">
        <div>
          <span className="text-4xl font-black tabular-nums leading-none">{headline === null ? '—' : `${headline}%`}</span>
          <p className="mt-1 text-xs text-muted-foreground">
            {trend.total.answered > 0
              ? `${trend.total.correct} of ${trend.total.answered} right, ${spanWords}`
              : `Nothing answered in the ${spanWords}`}
          </p>
        </div>
        {change !== null && change !== 0 && (
          <span
            className={
              'mb-5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold leading-none tabular-nums ' +
              (change > 0 ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400')
            }
            title={`${change > 0 ? 'Up' : 'Down'} ${Math.abs(change)} points on the ${span} days before (${accuracyPercent(trend.previous!)}%)`}
          >
            {change > 0 ? <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /> : <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />}
            {Math.abs(change)} pts
            <span className="sr-only"> on the {span} days before</span>
          </span>
        )}
        {trend.total.answered > 0 && (
          <dl className="ml-auto flex gap-4 text-right">
            {DIFFICULTY_ORDER.map(d => {
              const t = trend.total.byDifficulty[d]
              const pct = accuracyPercent(t)
              const thin = t.answered < RELIABLE_ANSWERS
              return (
                <div
                  key={d}
                  title={pct === null ? `No ${DIFFICULTY_LABEL[d].toLowerCase()} questions answered` : thin ? `Only ${t.answered} answered — too few to read much into yet` : undefined}
                >
                  <dd className={cn('text-lg font-bold tabular-nums leading-none', thin && 'text-muted-foreground')}>
                    {pct === null ? '—' : `${pct}%`}
                  </dd>
                  <dt className="mt-1 text-xs text-muted-foreground tabular-nums">
                    {DIFFICULTY_LABEL[d]} · {t.answered}
                  </dt>
                </div>
              )
            })}
          </dl>
        )}
      </div>

      {/* The chart. Lines are drawn in a stretched SVG; the dots are HTML placed
          by percentage so they stay round at any width. The plot is inset so a
          dot at either end sits whole inside the card. */}
      <div className="mt-5 flex gap-2">
        <div className="relative h-28 w-8 shrink-0 text-[10px] leading-none text-muted-foreground tabular-nums" aria-hidden="true">
          {[100, 50, 0].map(v => (
            <span key={v} className="absolute right-0 -translate-y-1/2" style={{ top: `${100 - v}%` }}>{v}%</span>
          ))}
        </div>
        <div className="relative h-28 flex-1" onPointerLeave={() => setActive(null)}>
          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {[0, 50, 100].map(y => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} className="stroke-border" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <div className="absolute inset-y-0 inset-x-2">
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {segments.map((s, i) => (
                <polyline key={i} points={s} fill="none" className="stroke-primary" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            {points.map((p, i) => {
              const size = dotSize(p.answered, most)
              return (
                <button
                  key={p.day}
                  type="button"
                  data-sound="none"
                  aria-label={`${monthDay(p.day)}: ${p.correct} of ${p.answered} right. Show the questions`}
                  className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setOpenDay(p.day)}
                >
                  <span
                    className={cn('block rounded-full bg-primary transition-opacity', active === i ? 'opacity-90' : 'opacity-35')}
                    style={{ width: size, height: size }}
                  />
                </button>
              )
            })}
            {shown && (
              <div
                className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md"
                style={{ left: `${Math.min(85, Math.max(15, shown.x))}%`, top: shown.y > 50 ? `calc(${shown.y}% - 2.75rem)` : `calc(${shown.y}% + 1rem)` }}
              >
                <span className="font-semibold">{monthDay(shown.day)}</span> · {shown.correct} of {shown.answered} right ({accuracyPercent(shown)}%)
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-1.5 flex gap-2" aria-hidden="true">
        <div className="w-8 shrink-0" />
        <div className="relative h-4 flex-1 mx-2 text-xs text-muted-foreground">
          {axisTicks(span).map((ago, i, all) => {
            const day = addDays(today, -ago)
            const x = ((span - 1 - ago) / (span - 1)) * 100
            const label = ago === 0 ? 'Today' : span <= 7 ? weekday(day) : shortDay(day)
            const edge = i === 0 && x < 8 ? 'translate-x-0' : i === all.length - 1 ? '-translate-x-full' : '-translate-x-1/2'
            return (
              <span key={ago} className={cn('absolute top-0 whitespace-nowrap', edge)} style={{ left: `${x}%` }}>{label}</span>
            )
          })}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground" aria-hidden="true">
        <span className="inline-flex items-center gap-1.5">
          <span className="block h-[2.5px] w-4 rounded-full bg-primary" />
          {ROLLING_DAYS}-day average
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-primary opacity-35" />
          One day — bigger, more answers
        </span>
      </div>

      {weak.length > 0 && (
        <div className="mt-4 border-t border-border pt-3">
          <h3 className="text-sm font-semibold text-muted-foreground">Weakest topics</h3>
          <ul className="mt-1 -mx-2">
            {weak.map(t => {
              const params = new URLSearchParams({ exam: examLabel, topics: t.topic, count: '10' })
              return (
                <li key={t.topic}>
                  <Link
                    to={`/quiz?${params.toString()}`}
                    className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent/40 active:bg-accent/60"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{t.topic}</span>
                      <span className="block text-xs text-muted-foreground tabular-nums">{t.correct} of {t.answered} right</span>
                    </span>
                    <span className="text-sm font-semibold tabular-nums">{accuracyPercent(t)}%</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    <span className="sr-only">Practise {t.topic}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* The same numbers for a screen reader. */}
      <table className="sr-only">
        <caption>Accuracy on each day studied, {spanWords}</caption>
        <thead><tr><th>Day</th><th>Right</th><th>Answered</th></tr></thead>
        <tbody>
          {trend.days.map(d => (
            <tr key={d.day}><td>{monthDay(d.day)}</td><td>{d.correct}</td><td>{d.answered}</td></tr>
          ))}
        </tbody>
      </table>

      {opened && <AccuracyDayDialog day={opened} questionsById={questionsById} onClose={() => setOpenDay(null)} />}
    </section>
  )
}
