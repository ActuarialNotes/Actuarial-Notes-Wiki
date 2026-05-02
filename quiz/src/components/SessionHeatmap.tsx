import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { QuizSession } from '@/lib/supabase'

// ─── helpers ───────────────────────────────────────────────────────────────

function toDateKey(iso: string): string {
  return iso.slice(0, 10) // "YYYY-MM-DD"
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function formatTime(seconds: number | null): string {
  if (seconds === null || seconds < 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

// Returns the Monday of the ISO week containing `d`.
function weekStart(d: Date): Date {
  const day = d.getDay() // 0=Sun
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

function isoKey(d: Date): string {
  return d.toISOString().slice(0, 10)
}

// Score → Tailwind background class.
function cellColor(avgScore: number | null): string {
  if (avgScore === null) return 'bg-muted/25'
  if (avgScore >= 85) return 'bg-green-400 dark:bg-green-500'
  if (avgScore >= 70) return 'bg-green-600 dark:bg-green-700'
  if (avgScore >= 60) return 'bg-amber-400 dark:bg-amber-500'
  if (avgScore >= 50) return 'bg-amber-600 dark:bg-amber-700'
  if (avgScore >= 30) return 'bg-red-500 dark:bg-red-600'
  return 'bg-red-800 dark:bg-red-900'
}

// Short month names for column labels.
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] // Mon–Sun

// ─── ScoreBar (reused in session list) ────────────────────────────────────

function ScoreBar({ session }: { session: QuizSession }) {
  const pct = session.total_questions > 0
    ? Math.round((session.correct_count / session.total_questions) * 100)
    : 0
  const color = pct >= 70 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-medium w-10 text-right">{pct}%</span>
    </div>
  )
}

function SessionRow({ session, divider }: { session: QuizSession; divider: boolean }) {
  return (
    <div>
      {divider && <div className="border-t my-3" />}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {session.topic && (
              <Badge variant="outline" className="text-xs">{session.topic}</Badge>
            )}
            <Badge variant="secondary" className="text-xs capitalize">{session.mode}</Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{session.correct_count}/{session.total_questions} correct</span>
            <span>{formatTime(session.time_taken_seconds)}</span>
            <span>{formatDate(session.completed_at)}</span>
          </div>
        </div>
        <ScoreBar session={session} />
      </div>
    </div>
  )
}

// ─── Heatmap grid ──────────────────────────────────────────────────────────

interface DayScore {
  avgScore: number | null
  count: number
  dateLabel: string // "Mon, Apr 28"
}

interface HeatmapGridProps {
  scoreByDay: Map<string, DayScore>
  weeks: number
}

function HeatmapGrid({ scoreByDay, weeks }: HeatmapGridProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const gridStart = addDays(weekStart(today), -(weeks - 1) * 7)

  // Build columns: each column is one week (7 days, Mon–Sun).
  const columns: { key: string; days: { key: string; data: DayScore | null; isFuture: boolean }[] }[] = []
  let monthMarks: { col: number; month: string }[] = []

  for (let w = 0; w < weeks; w++) {
    const colStart = addDays(gridStart, w * 7)
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = addDays(colStart, i)
      const key = isoKey(d)
      const isFuture = d > today
      return { key, data: scoreByDay.get(key) ?? null, isFuture }
    })
    // Mark month when first day of column is the 1st (or start of grid).
    const firstDay = addDays(colStart, 0)
    if (w === 0 || firstDay.getDate() <= 7) {
      const prevWeekFirstDay = w > 0 ? addDays(gridStart, (w - 1) * 7) : null
      if (w === 0 || (prevWeekFirstDay && prevWeekFirstDay.getMonth() !== firstDay.getMonth())) {
        monthMarks.push({ col: w, month: MONTH_ABBR[firstDay.getMonth()] })
      }
    }
    columns.push({ key: isoKey(colStart), days })
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* Month labels */}
        <div className="flex mb-1 ml-6">
          {columns.map((col, i) => {
            const mark = monthMarks.find(m => m.col === i)
            return (
              <div key={col.key} className="w-4 shrink-0 text-[9px] text-muted-foreground leading-none">
                {mark ? mark.month : ''}
              </div>
            )
          })}
        </div>

        {/* Grid rows (Mon–Sun) */}
        {DAY_LABELS.map((label, dayIdx) => (
          <div key={dayIdx} className="flex items-center gap-0 mb-0.5">
            <span className="w-5 text-[9px] text-muted-foreground text-right pr-1 shrink-0 leading-none select-none">
              {dayIdx % 2 === 0 ? label : ''}
            </span>
            {columns.map(col => {
              const cell = col.days[dayIdx]
              if (!cell) return <div key={col.key} className="w-4 h-3 shrink-0" />
              const { data, isFuture, key } = cell
              const bg = isFuture ? 'bg-transparent' : cellColor(data?.avgScore ?? null)
              const title = isFuture
                ? key
                : data
                  ? `${data.dateLabel}: avg ${Math.round(data.avgScore ?? 0)}% (${data.count} session${data.count !== 1 ? 's' : ''})`
                  : `${key}: no activity`
              return (
                <div
                  key={key}
                  title={title}
                  className={`w-3.5 h-3 rounded-sm shrink-0 mx-px ${bg}`}
                />
              )
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 ml-6">
          <span className="text-[9px] text-muted-foreground">Less</span>
          {[null, 20, 55, 65, 75, 90].map((score, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${cellColor(score)}`} />
          ))}
          <span className="text-[9px] text-muted-foreground">More</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────

interface Props {
  sessions: QuizSession[]
}

export function SessionHeatmap({ sessions }: Props) {
  const [expanded, setExpanded] = useState(false)

  // Exclude the single most recent session per spec.
  const historySessions = sessions.slice(1)

  const scoreByDay = useMemo(() => {
    const map = new Map<string, { total: number; count: number; dateLabel: string }>()
    for (const s of historySessions) {
      const key = toDateKey(s.completed_at)
      const pct = s.total_questions > 0
        ? (s.correct_count / s.total_questions) * 100
        : 0
      const existing = map.get(key)
      const dateLabel = new Date(s.completed_at).toLocaleDateString(undefined, {
        weekday: 'short', month: 'short', day: 'numeric',
      })
      if (existing) {
        existing.total += pct
        existing.count += 1
      } else {
        map.set(key, { total: pct, count: 1, dateLabel })
      }
    }
    const result = new Map<string, DayScore>()
    for (const [key, { total, count, dateLabel }] of map) {
      result.set(key, { avgScore: total / count, count, dateLabel })
    }
    return result
  }, [historySessions])

  if (sessions.length === 0) return null

  const hiddenCount = historySessions.length

  return (
    <div className="space-y-4">
      <HeatmapGrid scoreByDay={scoreByDay} weeks={16} />

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="w-full flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          {expanded ? 'Hide session list' : `Show all ${hiddenCount} session${hiddenCount !== 1 ? 's' : ''}`}
        </button>
      )}

      {expanded && (
        <div className="space-y-1 pt-1">
          {historySessions.map((session, idx) => (
            <SessionRow key={session.id} session={session} divider={idx > 0} />
          ))}
        </div>
      )}
    </div>
  )
}
