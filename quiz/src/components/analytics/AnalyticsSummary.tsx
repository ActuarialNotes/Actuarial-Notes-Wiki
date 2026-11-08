import { useState, type ReactNode } from 'react'
import { accuracyPercent, DIFFICULTY_ORDER, isThin, type AccuracySpan, type AccuracyTrend } from '@/lib/accuracyTrend'
import { DIFFICULTY_LABEL } from '@/lib/difficultyBreakdown'
import { clock, MIN_TIMED_ANSWERS, type PacingResult, type SectionLeak } from '@/lib/performanceAnalytics'
import { costliestSection, dailyColumns, formatMarks } from '@/lib/analyticsSummary'
import { todayISO } from '@/lib/studyPlan'
import { cn } from '@/lib/utils'
import { SectionLeaksDialog } from './SectionLeaksDialog'

function Tile({ label, value, note, tone, onOpen }: {
  label: string
  value: string
  note: ReactNode
  /** 'thin' steps a rate on too few answers back to grey; 'loss' is marks lost. */
  tone?: 'thin' | 'loss'
  /** The tile opens a popup with the detail behind it. */
  onOpen?: () => void
}) {
  const body = (
    <>
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span
        className={cn(
          'text-3xl font-extrabold leading-tight tracking-tight tabular-nums',
          tone === 'thin' && 'text-muted-foreground',
          tone === 'loss' && 'text-red-500 dark:text-red-400',
        )}
      >
        {value}
      </span>
      <span className="text-[13px] leading-snug text-muted-foreground">{note}</span>
    </>
  )
  const cls = 'flex min-h-[7rem] flex-col gap-1 rounded-2xl bg-muted/60 p-3.5 sm:p-4'
  return onOpen
    ? (
      <button type="button" onClick={onOpen} aria-haspopup="dialog" className={cn(cls, 'text-left transition-colors hover:bg-muted')}>
        {body}
      </button>
    )
    : <div className={cls}>{body}</div>
}

/**
 * The head of the Dashboard's Analytics section: four tiles — accuracy, the
 * marks the costliest section is losing, first tries, and pace — then the
 * span's answers day by day (right over missed) and accuracy by difficulty.
 * A rate on fewer than ten answers is stepped back to grey (`isThin`); a tile
 * with nothing to read says what it needs. *Marks at risk* opens every
 * section's marks lost in a popup (`SectionLeaksDialog`).
 */
export function AnalyticsSummary({ trend, span, leaks, pace, examLabel }: {
  trend: AccuracyTrend
  span: AccuracySpan
  leaks: SectionLeak[]
  pace: PacingResult | null
  examLabel: string
}) {
  const [leaksOpen, setLeaksOpen] = useState(false)
  const total = trend.total
  const accuracy = accuracyPercent(total)
  const leak = costliestSection(leaks)
  const first = trend.attempts?.first ?? null
  const retry = trend.attempts?.retry ?? null
  const firstPct = first ? accuracyPercent(first) : null

  const days = dailyColumns(trend, todayISO())
  const most = Math.max(1, ...days.map(d => d.answered))
  const week = span === 7

  const paceNote = !pace
    ? 'No pace on file for this exam'
    : pace.overall.median !== null
      ? `per ${pace.pace.per === 'point' ? 'point' : 'question'}, against the exam's ${clock(pace.allowed)}`
      : pace.overall.answered === 0
        ? 'Needs a timed quiz'
        : `${MIN_TIMED_ANSWERS - pace.overall.answered} more timed answers`

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2.5">
        <Tile
          label="Accuracy"
          value={accuracy === null ? '—' : `${accuracy}%`}
          note={total.answered > 0 ? `${total.correct} of ${total.answered} right` : 'No answers yet'}
          tone={accuracy !== null && isThin(total) ? 'thin' : undefined}
        />
        <Tile
          label="Marks at risk"
          value={leak ? `−${formatMarks(leak.marksLost!)}` : '—'}
          note={leak ? `of 100, in ${leak.name}` : 'Answer 3 questions in a section'}
          tone={leak ? 'loss' : undefined}
          onOpen={leaks.length > 0 ? () => setLeaksOpen(true) : undefined}
        />
        <Tile
          label="First try"
          value={firstPct === null ? '—' : `${firstPct}%`}
          note={first && first.answered > 0
            ? `right of ${first.answered} first ${first.answered === 1 ? 'try' : 'tries'}`
            : retry && retry.answered > 0 ? `All ${retry.answered} ${retry.answered === 1 ? 'answer was a retry' : 'answers were retries'}` : 'No first tries yet'}
          tone={first && firstPct !== null && isThin(first) ? 'thin' : undefined}
        />
        <Tile
          label="Pace"
          value={pace?.overall.median != null ? clock(pace.overall.median) : '—'}
          note={paceNote}
          tone={pace?.overall.median != null ? undefined : 'thin'}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm text-muted-foreground">Answers each day</h3>
          <span className="flex gap-3 text-xs text-muted-foreground" aria-hidden="true">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-green-500" />Right</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-500/40" />Missed</span>
          </span>
        </div>
        <div className={cn('flex h-20 items-end', week ? 'gap-1.5' : span === 30 ? 'gap-[3px]' : 'gap-px')}>
          {days.map(d => {
            const label = new Date(`${d.day}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
            return (
              <div
                key={d.day}
                role="img"
                aria-label={d.answered > 0 ? `${label}: ${d.correct} of ${d.answered} right` : `${label}: no answers`}
                className="flex h-full min-w-0 flex-1 flex-col justify-end"
              >
                {d.answered > 0 ? (
                  <div
                    className={cn('flex flex-col justify-end overflow-hidden bg-red-500/40', week ? 'rounded-md' : 'rounded-sm')}
                    style={{ height: `${(100 * d.answered) / most}%` }}
                  >
                    <div className="bg-green-500" style={{ height: `${(100 * d.correct) / d.answered}%` }} />
                  </div>
                ) : (
                  <div className="h-1 rounded-full bg-muted" />
                )}
              </div>
            )
          })}
        </div>
        {week ? (
          <div className="flex gap-1.5 text-center text-xs text-muted-foreground" aria-hidden="true">
            {days.map(d => (
              <span key={d.day} className="min-w-0 flex-1">
                {new Date(`${d.day}T12:00:00`).toLocaleDateString(undefined, { weekday: 'narrow' })}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex justify-between text-xs text-muted-foreground" aria-hidden="true">
            <span>{new Date(`${days[0].day}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            <span>Today</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm text-muted-foreground">By difficulty</h3>
        <ul className="space-y-2">
          {DIFFICULTY_ORDER.map(d => {
            const t = total.byDifficulty[d]
            const pct = accuracyPercent(t)
            const thin = isThin(t)
            return (
              <li key={d} className="grid grid-cols-[4.5rem_1fr_5rem] items-center gap-3 text-sm">
                <span>{DIFFICULTY_LABEL[d]}</span>
                <span className="h-2 rounded-full bg-muted" aria-hidden="true">
                  <span
                    className={cn('block h-full rounded-full', thin ? 'bg-muted-foreground/40' : 'bg-green-500')}
                    style={{ width: `${pct ?? 0}%` }}
                  />
                </span>
                <span className={cn('text-right tabular-nums', thin ? 'text-muted-foreground' : '')}>
                  {pct === null ? '—' : `${pct}% · ${t.answered}`}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      {leaksOpen && <SectionLeaksDialog leaks={leaks} examLabel={examLabel} span={span} onClose={() => setLeaksOpen(false)} />}
    </div>
  )
}
