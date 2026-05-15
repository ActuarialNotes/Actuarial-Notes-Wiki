import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, X } from 'lucide-react'
import type { QuizSession } from '@/lib/supabase'
import { ExamSittingsList } from '@/components/ExamSittingsList'

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function cellStyle(avgScore: number | null): { backgroundColor: string } | undefined {
  if (avgScore === null) return undefined
  const opacity = +(0.2 + 0.8 * (avgScore / 100)).toFixed(2)
  return { backgroundColor: `rgba(34, 197, 94, ${opacity})` }
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

function isoKey(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - now.getTime()) / 86400000)
}

interface DayData {
  avgScore: number
  count: number
}

interface Props {
  /** Sessions already filtered to this exam's topic */
  sessions: QuizSession[]
  /** e.g. "FM" or "P" — used as the localStorage key fallback */
  examProgressKey: string
  /** Controlled exam date (from Supabase target_date) */
  targetDate: string | null
  /** Called when user saves a new exam date */
  onTargetDateChange: (date: string | null) => void
  /** Target ready date from study plan config */
  targetReadyDate?: string | null
  /** Called when user saves a new target ready date */
  onTargetReadyDateChange?: (date: string | null) => void
  /** Called when a day cell with sessions is clicked */
  onDayClick?: (date: string) => void
}

export function ExamHeatmap({
  sessions,
  examProgressKey,
  targetDate,
  onTargetDateChange,
  targetReadyDate,
  onTargetReadyDateChange,
  onDayClick,
}: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [editingReady, setEditingReady] = useState(false)
  const [draftReady, setDraftReady] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const inputReadyRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  useEffect(() => {
    if (editingReady) inputReadyRef.current?.focus()
  }, [editingReady])

  function saveDate(value: string) {
    onTargetDateChange(value || null)
    setEditing(false)
  }

  function saveReadyDate(value: string) {
    if (onTargetReadyDateChange) onTargetReadyDateChange(value || null)
    setEditingReady(false)
  }

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  // Grid start: Monday of 2 weeks before the earliest session (or 2 weeks before today)
  const gridStart = useMemo(() => {
    if (sessions.length === 0) return mondayOf(addDays(today, -14))
    const earliest = sessions.reduce((min, s) =>
      s.completed_at < min ? s.completed_at : min, sessions[0].completed_at)
    const firstDay = new Date(earliest.slice(0, 10) + 'T00:00:00')
    firstDay.setHours(0, 0, 0, 0)
    return mondayOf(addDays(firstDay, -14))
  }, [sessions, today])

  // Grid end: Monday of 2 weeks after exam date (or 4 weeks from today if no exam date)
  const gridEnd = useMemo(() => {
    if (targetDate) {
      const examD = new Date(targetDate + 'T00:00:00')
      examD.setHours(0, 0, 0, 0)
      return mondayOf(addDays(examD, 14))
    }
    return mondayOf(addDays(today, 28))
  }, [targetDate, today])

  const totalWeeks = useMemo(() => {
    const diff = gridEnd.getTime() - gridStart.getTime()
    return Math.max(4, Math.round(diff / (7 * 86400000)) + 1)
  }, [gridStart, gridEnd])

  const scoreByDay = useMemo(() => {
    const map = new Map<string, { total: number; count: number }>()
    for (const s of sessions) {
      const key = s.completed_at.slice(0, 10)
      const pct = s.total_questions > 0 ? (s.correct_count / s.total_questions) * 100 : 0
      const existing = map.get(key)
      if (existing) { existing.total += pct; existing.count++ }
      else map.set(key, { total: pct, count: 1 })
    }
    const result = new Map<string, DayData>()
    for (const [k, { total, count }] of map) {
      result.set(k, { avgScore: total / count, count })
    }
    return result
  }, [sessions])

  const examDateWeekIdx = useMemo(() => {
    if (!targetDate) return -1
    const examD = new Date(targetDate + 'T00:00:00')
    examD.setHours(0, 0, 0, 0)
    const diffMs = mondayOf(examD).getTime() - gridStart.getTime()
    const idx = Math.round(diffMs / (7 * 86400000))
    return idx >= 0 && idx < totalWeeks ? idx : -1
  }, [targetDate, gridStart, totalWeeks])

  const targetReadyDateWeekIdx = useMemo(() => {
    if (!targetReadyDate) return -1
    const readyD = new Date(targetReadyDate + 'T00:00:00')
    readyD.setHours(0, 0, 0, 0)
    const diffMs = mondayOf(readyD).getTime() - gridStart.getTime()
    const idx = Math.round(diffMs / (7 * 86400000))
    return idx >= 0 && idx < totalWeeks ? idx : -1
  }, [targetReadyDate, gridStart, totalWeeks])

  const columns = useMemo(() => {
    let prevMonth = -1
    return Array.from({ length: totalWeeks }, (_, w) => {
      const colStart = addDays(gridStart, w * 7)
      const month = colStart.getMonth()
      const monthLabel = month !== prevMonth ? MONTH_ABBR[month] : null
      prevMonth = month

      const days = Array.from({ length: 7 }, (_, i) => {
        const d = addDays(colStart, i)
        const key = isoKey(d)
        const isFuture = d > today
        const isToday = key === isoKey(today)
        const isExamDay = !!targetDate && key === targetDate
        const isReadyDay = !!targetReadyDate && key === targetReadyDate
        const data = scoreByDay.get(key) ?? null
        const title = isFuture
          ? key
          : data
            ? `${key}: avg ${Math.round(data.avgScore)}% (${data.count} session${data.count !== 1 ? 's' : ''})`
            : `${key}: no activity`
        return { key, data, isFuture, isToday, isExamDay, isReadyDay, title }
      })

      return {
        key: isoKey(colStart),
        monthLabel,
        isExamWeek: w === examDateWeekIdx,
        isTargetReadyWeek: w === targetReadyDateWeekIdx && w !== examDateWeekIdx,
        days,
      }
    })
  }, [gridStart, totalWeeks, today, scoreByDay, examDateWeekIdx, targetReadyDateWeekIdx, targetDate, targetReadyDate])

  const daysLeft = targetDate ? daysUntil(targetDate) : null
  const examDateLabel = targetDate
    ? new Date(targetDate + 'T00:00:00').toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric',
      })
    : null

  const readyDaysLeft = targetReadyDate ? daysUntil(targetReadyDate) : null
  const readyDateLabel = targetReadyDate
    ? new Date(targetReadyDate + 'T00:00:00').toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric',
      })
    : null

  // Suppress unused-variable warning — examProgressKey reserved for future use
  void examProgressKey

  return (
    <div className="space-y-1.5">
      {/* Month labels */}
      <div className="flex items-end gap-px">
        <div className="shrink-0" style={{ width: 16 }} />
        <div className="flex-1 flex gap-px overflow-hidden">
          {columns.map(col => (
            <div key={col.key} className="flex-1 min-w-0 text-[8px] text-muted-foreground leading-none truncate">
              {col.monthLabel ?? ''}
            </div>
          ))}
        </div>
      </div>

      {/* Day rows × week columns */}
      <div className="flex items-stretch gap-px">
        {/* Day labels */}
        <div className="flex flex-col gap-px shrink-0" style={{ width: 16 }}>
          {DAY_LABELS.map((label, i) => (
            <div
              key={i}
              className="h-[10px] flex items-center justify-end pr-0.5 text-[8px] text-muted-foreground leading-none select-none"
            >
              {i % 2 === 0 ? label : ''}
            </div>
          ))}
        </div>

        {/* Week columns */}
        <div className="flex-1 flex gap-px overflow-hidden">
          {columns.map(col => (
            <div
              key={col.key}
              className={`flex-1 flex flex-col gap-px rounded-sm ${
                col.isExamWeek
                  ? 'ring-1 ring-inset ring-primary/50'
                  : col.isTargetReadyWeek
                    ? 'ring-1 ring-inset ring-amber-400/60'
                    : ''
              }`}
            >
              {col.days.map(cell => {
                const isClickable = !cell.isFuture && cell.data !== null && onDayClick !== undefined
                return (
                  <div
                    key={cell.key}
                    title={cell.title}
                    role={isClickable ? 'button' : undefined}
                    aria-label={isClickable ? `View sessions for ${cell.key}` : undefined}
                    onClick={isClickable ? () => onDayClick!(cell.key) : undefined}
                    style={!cell.isFuture ? cellStyle(cell.data?.avgScore ?? null) : undefined}
                    className={`w-full rounded-[2px] ${
                      cell.isFuture
                        ? cell.isExamDay
                          ? 'bg-primary/30 h-[10px] ring-1 ring-inset ring-primary'
                          : cell.isReadyDay
                            ? 'bg-amber-400/30 h-[10px] ring-1 ring-inset ring-amber-400'
                            : col.isExamWeek ? 'bg-primary/10 h-[10px]'
                            : col.isTargetReadyWeek ? 'bg-amber-400/10 h-[10px]'
                            : 'h-[10px]'
                        : `h-[10px] ${cell.data === null ? 'bg-muted/30' : ''}${isClickable ? ' cursor-pointer hover:opacity-80' : ''}`
                    }${cell.isToday ? ' ring-1 ring-inset ring-white/80' : ''}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Date rows */}
      <div className="flex flex-col gap-1 pt-0.5">
        {/* Exam date */}
        <div className="flex items-center gap-1.5">
          {!editing ? (
            <button
              type="button"
              onClick={() => { setDraft(targetDate ?? ''); setEditing(true) }}
              className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Calendar className="h-3 w-3 shrink-0" />
              {examDateLabel ? (
                <>
                  <span>Exam: {examDateLabel}</span>
                  {daysLeft !== null && daysLeft > 0 && (
                    <span className="opacity-60">{daysLeft}d away</span>
                  )}
                  {daysLeft !== null && daysLeft <= 0 && (
                    <span className="opacity-60">passed</span>
                  )}
                </>
              ) : (
                <span>Set exam date</span>
              )}
            </button>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="date"
                  value={draft}
                  onChange={e => {
                    const val = e.target.value
                    setDraft(val)
                    if (val) saveDate(val)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Escape') setEditing(false)
                  }}
                  className="text-[11px] bg-background border rounded px-1 py-0.5 text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="text-muted-foreground hover:text-foreground p-0.5 transition-colors"
                  aria-label="Cancel"
                >
                  <X className="h-3 w-3" />
                </button>
                {targetDate && (
                  <button
                    type="button"
                    onClick={() => saveDate('')}
                    className="text-[11px] text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <ExamSittingsList
                examId={examProgressKey}
                selectedDate={draft}
                onSelect={d => { setDraft(d); saveDate(d) }}
              />
            </div>
          )}
        </div>

        {/* Target ready date (only shown if callback provided) */}
        {onTargetReadyDateChange !== undefined && (
          <div className="flex items-center gap-1.5">
            {!editingReady ? (
              <button
                type="button"
                onClick={() => { setDraftReady(targetReadyDate ?? ''); setEditingReady(true) }}
                className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              >
                <Calendar className="h-3 w-3 shrink-0 text-amber-500" />
                {readyDateLabel ? (
                  <>
                    <span>Target ready: {readyDateLabel}</span>
                    {readyDaysLeft !== null && readyDaysLeft > 0 && (
                      <span className="opacity-60">{readyDaysLeft}d away</span>
                    )}
                    {readyDaysLeft !== null && readyDaysLeft <= 0 && (
                      <span className="opacity-60">passed</span>
                    )}
                  </>
                ) : (
                  <span>Set target ready date</span>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-amber-500 shrink-0" />
                <input
                  ref={inputReadyRef}
                  type="date"
                  value={draftReady}
                  max={targetDate ?? undefined}
                  onChange={e => {
                    const val = e.target.value
                    setDraftReady(val)
                    if (val) saveReadyDate(val)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Escape') setEditingReady(false)
                  }}
                  className="text-[11px] bg-background border rounded px-1 py-0.5 text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setEditingReady(false)}
                  className="text-muted-foreground hover:text-foreground p-0.5 transition-colors"
                  aria-label="Cancel"
                >
                  <X className="h-3 w-3" />
                </button>
                {targetReadyDate && (
                  <button
                    type="button"
                    onClick={() => saveReadyDate('')}
                    className="text-[11px] text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
