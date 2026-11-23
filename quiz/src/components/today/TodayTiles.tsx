// The pieces of Today around the session card (docs/redesign-spec.md §4.1,
// §4.2): the days left, the week, the Syllabus and Analytics tiles, and the
// free plan's one row to Upgrade.

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Lock } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { ProBadge } from '@/components/ProBadge'
import { OUTLINE_TILE, OUTLINE_TILE_PRESSABLE } from '@/components/ui/OutlineCard'
import { weekSummary, type WeekDay } from '@/lib/todaySession'
import { cn } from '@/lib/utils'

// ── Days left ────────────────────────────────────────────────────────────────

/** One large figure and the reader's own exam date beside it; the date is the control that changes it. */
export function DaysLeft({
  days,
  dateLabel,
  onChangeDate,
  className,
}: {
  /** Days to the exam; null with no date set. */
  days: number | null
  /** "Thu, Jan 14"; null with no date set. */
  dateLabel: string | null
  onChangeDate: () => void
  className?: string
}) {
  return (
    <div className={cn('flex items-baseline justify-between gap-4', className)}>
      {days !== null && days >= 0 ? (
        <p className="flex items-baseline gap-2 lg:gap-2.5">
          <span className="text-[34px] font-bold leading-none tracking-tight tabular-nums lg:text-5xl">{days}</span>
          <span className="text-[17px] font-medium lg:text-xl">{days === 1 ? 'day' : 'days'}</span>
        </p>
      ) : <span />}
      <button
        type="button"
        onClick={onChangeDate}
        aria-label={dateLabel ? `Exam date, ${dateLabel}. Change` : 'Set your exam date'}
        className="-my-3 min-h-[44px] rounded-lg text-[15px] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:text-base"
      >
        {dateLabel ?? 'Set your exam date'}
      </button>
    </div>
  )
}

// ── The week ─────────────────────────────────────────────────────────────────

/** Seven circles, Monday to Sunday: studied (filled, checked), today (outlined), the rest in the line colour. */
export function WeekRow({ week, className }: { week: readonly WeekDay[]; className?: string }) {
  return (
    <div role="img" aria-label={weekSummary(week)} className={cn('flex justify-between lg:justify-start lg:gap-[18px]', className)}>
      {week.map(d => (
        <span key={d.day} className="flex flex-col items-center gap-1.5">
          {d.state === 'studied' ? (
            <CheckMark className="h-[30px] w-[30px] text-foreground lg:h-8 lg:w-8" strokeWidth={3} />
          ) : (
            <span
              className={cn(
                'box-border h-[30px] w-[30px] rounded-full border-2 lg:h-8 lg:w-8',
                d.state === 'today' ? 'border-foreground' : 'border-border',
              )}
            />
          )}
          <span className={cn('text-[13px]', d.isToday && 'font-bold')}>{d.letter}</span>
        </span>
      ))}
    </div>
  )
}

// ── The syllabus bar ─────────────────────────────────────────────────────────

/**
 * The one bar the syllabus percentage is drawn as. `gain` (today's movement,
 * in points) is drawn as a raised end; `tick` is where a paced plan expects
 * the reader to be today.
 */
export function SyllabusBar({
  pct,
  gain = 0,
  tick = null,
  thick = false,
  className,
}: {
  pct: number
  gain?: number
  tick?: number | null
  thick?: boolean
  className?: string
}) {
  const raised = Math.max(0, Math.min(gain, pct))
  const base = pct - raised
  return (
    <span aria-hidden="true" className={cn('relative block rounded-full bg-border', thick ? 'h-2.5' : 'h-2', className)}>
      <span
        className={cn('absolute inset-y-0 left-0 bg-foreground', raised > 0 ? 'rounded-l-full' : 'rounded-full')}
        style={{ width: `${base}%` }}
      />
      {raised > 0 && (
        <span
          className="absolute -inset-y-[3px] rounded-r bg-foreground"
          style={{ left: `calc(${base}% + ${base > 0 ? 2 : 0}px)`, width: `${raised}%`, minWidth: 4 }}
        />
      )}
      {tick !== null && (
        <span className="absolute -inset-y-1 w-0.5 bg-foreground" style={{ left: `min(${tick}%, calc(100% - 2px))` }} />
      )}
    </span>
  )
}

/** "▲ 2": today's movement, up. A fall is shown by the bar alone. */
export function GainMark({ gain, className }: { gain: number; className?: string }) {
  if (gain <= 0) return null
  return (
    <span className={cn('flex items-center gap-[3px] font-bold tabular-nums', className)}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current"><path d="M12 4l9 15H3z" /></svg>
      {gain}
    </span>
  )
}

// ── Tiles ────────────────────────────────────────────────────────────────────

const TILE = cn(OUTLINE_TILE, OUTLINE_TILE_PRESSABLE, 'flex min-w-0 flex-col gap-2 px-4 py-3.5')

function TileHead({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <span className="flex items-center justify-between text-sm">
      {children}
      {aside ?? <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />}
    </span>
  )
}

export function SyllabusTile({
  to, pct, gain, tick,
}: {
  to: string
  pct: number
  gain: number
  tick: number | null
}) {
  const label = [
    `Syllabus: ${pct > 0 ? `${pct}% covered` : 'nothing covered yet'}`,
    gain > 0 ? `up ${gain} today` : null,
    tick !== null ? `plan target ${tick}%` : null,
  ].filter(Boolean).join(', ')
  return (
    <Link to={to} aria-label={label} data-testid="today-syllabus" className={TILE}>
      <TileHead>Syllabus</TileHead>
      <span className="flex items-baseline gap-2">
        <span className="text-2xl font-bold leading-none tabular-nums">{pct}%</span>
        <GainMark gain={gain} className="text-sm" />
      </span>
      <span className="flex h-4 items-center">
        <SyllabusBar pct={pct} gain={gain} tick={tick} className="flex-1" />
      </span>
    </Link>
  )
}

export function AnalyticsTile({
  to, accuracyPct, days, chart,
}: {
  to: string
  /** Accuracy over the span; null with no answers in it. */
  accuracyPct: number | null
  /** The span the figure covers, in days. */
  days: number
  /** The tile's small chart; drawn only when there are answers. */
  chart?: ReactNode
}) {
  return (
    <Link
      to={to}
      aria-label={accuracyPct !== null ? `Analytics: ${accuracyPct}% accuracy over ${days} days` : 'Analytics: no answers yet'}
      data-testid="today-analytics"
      className={TILE}
    >
      <TileHead>Analytics</TileHead>
      <span className="text-2xl font-bold leading-none tabular-nums">{accuracyPct !== null ? `${accuracyPct}%` : '–'}</span>
      {accuracyPct !== null && chart
        ? chart
        : <span aria-hidden="true" className="flex h-4 items-end"><span className="h-0.5 flex-1 bg-border" /></span>}
    </Link>
  )
}

/** Analytics for a reader without Pro: a lock and the Pro tag in place of the figure. */
export function AnalyticsLockedTile({ to }: { to: string }) {
  return (
    <Link to={to} aria-label="Analytics, a Pro feature" data-testid="today-analytics" className={TILE}>
      <TileHead aside={<ProBadge />}>Analytics</TileHead>
      <Lock className="h-6 w-6" aria-hidden="true" />
      <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
        {[6, 9, 7, 11, 10, 14, 16, 12, 8, 11].map((h, i) => (
          <span key={i} className="flex-1 rounded-sm bg-border" style={{ height: h }} />
        ))}
      </span>
    </Link>
  )
}

/** The free plan's one upsell: "Pace my plan to Jan 14" (R15). */
export function PaceMyPlanRow({ to, dateLabel, className }: { to: string; dateLabel: string | null; className?: string }) {
  return (
    <Link
      to={to}
      data-testid="today-pace"
      className={cn(
        'flex h-[52px] items-center gap-3 rounded-2xl border-[1.5px] border-border px-5 text-[15px] font-medium',
        OUTLINE_TILE_PRESSABLE,
        className,
      )}
    >
      <Lock className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate">{dateLabel ? `Pace my plan to ${dateLabel}` : 'Pace my plan to my exam date'}</span>
      <ProBadge />
    </Link>
  )
}

