import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Calendar, X } from 'lucide-react'
import type { QuizSession } from '@/lib/supabase'
import { ExamSittingsList } from '@/components/ExamSittingsList'
import { LOCALIZED_EXAMS } from '@/data/examSittings'

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function cellStyle(pct: number | null): { backgroundColor: string } | undefined {
  if (pct === null) return undefined
  const opacity = +(0.2 + 0.8 * (pct / 100)).toFixed(2)
  return { backgroundColor: `rgba(34, 197, 94, ${opacity})` }
}

/**
 * How green a past day's cell is, 0–100.
 *
 * With a study plan, `dayPlanPct` carries how much of that day's plan was
 * completed (see `buildDayPlanPct` in lib/planCompletion) — a finished day is
 * 100 and reads at full brightness. Days it leaves out moved no plan concept,
 * so a day that was studied anyway gets a faint "showed up" shade. Without a
 * plan there's nothing to measure against and any active day is fully green.
 */
function resolvedPct(
  key: string,
  data: DayData | null,
  dayPlanPct: Map<string, number> | undefined,
): number | null {
  if (dayPlanPct !== undefined) {
    if (dayPlanPct.has(key)) return dayPlanPct.get(key)!
    return data !== null ? 15 : null
  }
  return data !== null ? 100 : null
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
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
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
  sessions: QuizSession[]
  examProgressKey: string
  targetDate: string | null
  onTargetDateChange: (date: string | null) => void
  targetReadyDate?: string | null
  onTargetReadyDateChange?: (date: string | null) => void
  onDayClick?: (date: string) => void
  onOpenStudyPlan?: (step?: 1 | 2 | 3) => void
  dayPlanPct?: Map<string, number>
  highlightedDay?: string | null
  /**
   * Day the "schedule forming" playback is currently on. The whole timeline is
   * on screen at once, so the sweep needs nothing scrolled into view: the day
   * it names lights up in place and the one it just left fades out behind it,
   * which is what makes the highlight read as moving along the schedule.
   */
  playbackDay?: string | null
  /** How long each day stays lit — the beat the flare and its fade are timed to. */
  playbackStepMs?: number
}

/**
 * Floor on the lit cell's flare, so a fast sweep reads as one travelling
 * highlight rather than a strobe. A beat shorter than this releases the cell
 * mid-flare, and the release transition carries it out — which is exactly the
 * trail the sweep should leave behind it.
 */
const MIN_FLARE_MS = 150

/**
 * The Study Schedule timeline: one square per day, weeks as columns, from a
 * fortnight before the first session to a fortnight past exam day. It is the
 * card's only view — every day between today and the exam is on screen at
 * once, so the schedule-forming sweep plays out right here.
 */
export function ExamHeatmap({
  sessions,
  examProgressKey,
  targetDate,
  onTargetDateChange,
  targetReadyDate,
  onTargetReadyDateChange,
  onDayClick,
  onOpenStudyPlan,
  dayPlanPct,
  highlightedDay,
  playbackDay,
  playbackStepMs = 60,
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

  const gridStart = useMemo(() => {
    if (sessions.length === 0) return mondayOf(addDays(today, -14))
    const earliest = sessions.reduce((min, s) =>
      s.completed_at < min ? s.completed_at : min, sessions[0].completed_at)
    const firstDay = new Date(earliest.slice(0, 10) + 'T00:00:00')
    firstDay.setHours(0, 0, 0, 0)
    return mondayOf(addDays(firstDay, -14))
  }, [sessions, today])

  const gridEnd = useMemo(() => {
    if (targetDate) {
      const examD = new Date(targetDate + 'T00:00:00')
      examD.setHours(0, 0, 0, 0)
      return mondayOf(addDays(examD, 14))
    }
    return mondayOf(addDays(today, 28))
  }, [targetDate, today])

  const scoreByDay = useMemo(() => {
    const map = new Map<string, { total: number; count: number }>()
    for (const s of sessions) {
      const d = new Date(s.completed_at)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
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

  const totalWeeks = useMemo(() => {
    const diff = gridEnd.getTime() - gridStart.getTime()
    return Math.max(4, Math.round(diff / (7 * 86400000)) + 1)
  }, [gridStart, gridEnd])

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

  // Step indices inside the Study Plan modal — mirrors its own `hasVariants`
  // math so the date buttons open straight to the step they edit.
  const hasVariants = (LOCALIZED_EXAMS[examProgressKey]?.length ?? 0) > 0
  const examDateStep: 1 | 2 = hasVariants ? 2 : 1
  const readyDateStep: 2 | 3 = hasVariants ? 3 : 2

  // Without a study-plan modal to open we fall back to the inline date inputs,
  // which sit in the date rows under the timeline.
  function openExamDateEditor() {
    if (onOpenStudyPlan) { onOpenStudyPlan(examDateStep); return }
    setDraft(targetDate ?? '')
    setEditing(true)
  }

  function openReadyDateEditor() {
    if (onOpenStudyPlan) { onOpenStudyPlan(readyDateStep); return }
    setDraftReady(targetReadyDate ?? '')
    setEditingReady(true)
  }

  const dateRows = (
    <div className="flex flex-col gap-1 pt-0.5">
      <div className="flex items-center gap-1.5">
        {!editing || onOpenStudyPlan ? (
          <button
            type="button"
            onClick={openExamDateEditor}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {examDateLabel ? (
              <>
                <span className="font-medium">Exam: {examDateLabel}</span>
                {daysLeft !== null && (daysLeft > 0
                  ? <span className="opacity-60">· {daysLeft} days</span>
                  : <span className="opacity-60">passed</span>)}
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
                onChange={e => { const v = e.target.value; setDraft(v); if (v) saveDate(v) }}
                onKeyDown={e => { if (e.key === 'Escape') setEditing(false) }}
                className="text-[16px] bg-background border rounded px-1 py-0.5 text-foreground"
              />
              <button type="button" onClick={() => setEditing(false)} className="text-muted-foreground hover:text-foreground p-0.5 transition-colors" aria-label="Cancel">
                <X className="h-3 w-3" />
              </button>
              {targetDate && (
                <button type="button" onClick={() => saveDate('')} className="text-[11px] text-muted-foreground hover:text-destructive transition-colors">Clear</button>
              )}
            </div>
            <ExamSittingsList examId={examProgressKey} selectedDate={draft} onSelect={d => { setDraft(d); saveDate(d) }} />
          </div>
        )}
      </div>

      {onTargetReadyDateChange !== undefined && (
        <div className="flex items-center gap-1.5">
          {!editingReady || onOpenStudyPlan ? (
            <button
              type="button"
              onClick={openReadyDateEditor}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Calendar className="h-3.5 w-3.5 shrink-0 text-amber-500" />
              {readyDateLabel ? (
                <>
                  <span className="font-medium">Target ready: {readyDateLabel}</span>
                  {readyDaysLeft !== null && (readyDaysLeft > 0
                    ? <span className="opacity-60">· {readyDaysLeft} days</span>
                    : <span className="opacity-60">passed</span>)}
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
                onChange={e => { const v = e.target.value; setDraftReady(v); if (v) saveReadyDate(v) }}
                onKeyDown={e => { if (e.key === 'Escape') setEditingReady(false) }}
                className="text-[16px] bg-background border rounded px-1 py-0.5 text-foreground"
              />
              <button type="button" onClick={() => setEditingReady(false)} className="text-muted-foreground hover:text-foreground p-0.5 transition-colors" aria-label="Cancel">
                <X className="h-3 w-3" />
              </button>
              {targetReadyDate && (
                <button type="button" onClick={() => saveReadyDate('')} className="text-[11px] text-muted-foreground hover:text-destructive transition-colors">Clear</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-3">
      {/* Month labels */}
      <div className="flex items-end gap-[2px]">
        <div className="shrink-0" style={{ width: 16 }} />
        <div className="flex-1 flex gap-[2px]" style={{ height: 12 }}>
          {columns.map(col => (
            <div key={col.key} className="flex-1 relative">
              {col.monthLabel && (
                <span className="absolute left-0 bottom-0 text-[10px] text-muted-foreground leading-none whitespace-nowrap">
                  {col.monthLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Day rows × week columns. While the schedule-forming sweep runs, the
          beat it moves on is published to the cells as `--playback-step` so the
          lit day's flare and the trailing fade stay in step with it. */}
      <div
        className="flex items-stretch gap-[2px]"
        style={playbackDay
          ? ({ '--playback-step': `${Math.max(playbackStepMs, MIN_FLARE_MS)}ms` } as CSSProperties)
          : undefined}
      >
        <div className="flex flex-col gap-[2px] shrink-0" style={{ width: 16 }}>
          {DAY_LABELS.map((label, i) => (
            <div key={i} className="h-[14px] flex items-center justify-end pr-0.5 text-[10px] text-muted-foreground leading-none select-none">
              {i % 2 === 0 ? label : ''}
            </div>
          ))}
        </div>
        <div className="flex-1 flex gap-[2px]">
          {columns.map(col => (
            <div
              key={col.key}
              className={`flex-1 flex flex-col gap-[2px] rounded-sm ${
                col.isExamWeek ? 'ring-1 ring-inset ring-primary/50'
                  : col.isTargetReadyWeek ? 'ring-1 ring-inset ring-amber-400/60' : ''
              }`}
            >
              {col.days.map(cell => {
                const isClickable = onDayClick !== undefined && (!cell.isFuture ? cell.data !== null : true)
                let cls = `w-full h-[14px] rounded-[2px] ${
                  cell.isFuture
                    ? cell.isExamDay ? 'bg-primary/30 ring-1 ring-inset ring-primary'
                      : cell.isReadyDay ? 'bg-amber-400/30 ring-1 ring-inset ring-amber-400'
                      : col.isExamWeek ? 'bg-primary/10'
                      : col.isTargetReadyWeek ? 'bg-amber-400/10'
                      : 'bg-muted/20'
                    : cell.data === null ? 'bg-muted/30' : ''
                }`
                if (!cell.isFuture && isClickable && !playbackDay) cls += ' cursor-pointer hover:opacity-80'
                // The trail: cells transition only while the sweep is running, so
                // the mark on the day it just left fades out behind it instead of
                // snapping off, and the whole run reads as one moving highlight.
                if (playbackDay) cls += ' transition-all'
                if (cell.key === playbackDay) cls += ' schedule-playback-day'
                else if (cell.key === highlightedDay) cls += ' ring-2 ring-white/90'
                else if (cell.isToday) cls += ' ring-1 ring-inset ring-foreground/70 dark:ring-white/80'
                return (
                  <div
                    key={cell.key}
                    title={cell.title}
                    role={isClickable ? 'button' : undefined}
                    aria-label={isClickable ? `View sessions for ${cell.key}` : undefined}
                    onClick={isClickable ? () => onDayClick!(cell.key) : undefined}
                    style={!cell.isFuture ? cellStyle(resolvedPct(cell.key, cell.data, dayPlanPct)) : undefined}
                    className={cls}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {dateRows}
    </div>
  )
}
