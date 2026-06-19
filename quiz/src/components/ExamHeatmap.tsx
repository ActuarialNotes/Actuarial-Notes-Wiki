import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, ChevronDown, ChevronUp, X } from 'lucide-react'
import type { QuizSession } from '@/lib/supabase'
import { ExamSittingsList } from '@/components/ExamSittingsList'

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const STRIP_GAP = 6 // px gap between cells

function cellStyle(pct: number | null): { backgroundColor: string } | undefined {
  if (pct === null) return undefined
  const opacity = +(0.2 + 0.8 * (pct / 100)).toFixed(2)
  return { backgroundColor: `rgba(34, 197, 94, ${opacity})` }
}

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
  /** No longer restricts to mobile — kept for API compatibility */
  mobileMonthOnly?: boolean
  highlightedDay?: string | null
}

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
}: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [editingReady, setEditingReady] = useState(false)
  const [draftReady, setDraftReady] = useState('')
  const [showFullTimeline, setShowFullTimeline] = useState(() => {
    try {
      const stored = localStorage.getItem('actuarial_heatmap_timeline')
      return stored !== null ? stored === '1' : false
    } catch {
      return false
    }
  })

  // Scroll strip state
  const scrollRef = useRef<HTMLDivElement>(null)

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

  function toggleTimeline(next: boolean) {
    setShowFullTimeline(next)
    try { localStorage.setItem('actuarial_heatmap_timeline', next ? '1' : '0') } catch {}
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

  // All individual days in the timeline range (for the scrollable strip)
  const allDays = useMemo(() => {
    const todayKey = isoKey(today)
    const days: Array<{
      key: string
      d: Date
      isFuture: boolean
      isToday: boolean
      isExamDay: boolean
      isReadyDay: boolean
      data: DayData | null
    }> = []
    let cur = new Date(gridStart)
    const end = new Date(gridEnd)
    while (cur <= end) {
      const key = isoKey(cur)
      days.push({
        key,
        d: new Date(cur),
        isFuture: cur > today,
        isToday: key === todayKey,
        isExamDay: !!targetDate && key === targetDate,
        isReadyDay: !!targetReadyDate && key === targetReadyDate,
        data: scoreByDay.get(key) ?? null,
      })
      cur = addDays(cur, 1)
    }
    return days
  }, [gridStart, gridEnd, today, scoreByDay, targetDate, targetReadyDate])

  // Scroll to today once when the strip first mounts
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const cellW = (el.clientWidth - 6 * STRIP_GAP) / 7
    const todayIdx = allDays.findIndex(d => d.isToday)
    if (todayIdx >= 0) {
      el.scrollLeft = Math.max(0, todayIdx * (cellW + STRIP_GAP) - el.clientWidth / 2 + cellW / 2)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally only on mount — highlightedDay effect handles subsequent scrolls

  // Track whether today's cell is visible in the scroll strip
  const [showTodayButton, setShowTodayButton] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el || showFullTimeline) { setShowTodayButton(false); return }

    function checkTodayVisible() {
      if (!el) return
      const cellW = (el.clientWidth - 6 * STRIP_GAP) / 7
      const todayIdx = allDays.findIndex(d => d.isToday)
      if (todayIdx < 0) { setShowTodayButton(false); return }
      const todayLeft = todayIdx * (cellW + STRIP_GAP)
      const todayRight = todayLeft + cellW
      const visible = todayLeft >= el.scrollLeft - 1 && todayRight <= el.scrollLeft + el.clientWidth + 1
      setShowTodayButton(!visible)
    }

    checkTodayVisible()
    el.addEventListener('scroll', checkTodayVisible, { passive: true })
    return () => el.removeEventListener('scroll', checkTodayVisible)
  }, [allDays, showFullTimeline])

  function scrollToToday() {
    const el = scrollRef.current
    if (!el) return
    const cellW = (el.clientWidth - 6 * STRIP_GAP) / 7
    const todayIdx = allDays.findIndex(d => d.isToday)
    if (todayIdx >= 0) {
      el.scrollTo({ left: Math.max(0, todayIdx * (cellW + STRIP_GAP) - el.clientWidth / 2 + cellW / 2), behavior: 'smooth' })
    }
  }

  // Smooth-scroll to center highlighted day when it changes
  useEffect(() => {
    if (!highlightedDay || !scrollRef.current) return
    const el = scrollRef.current
    const idx = allDays.findIndex(d => d.key === highlightedDay)
    if (idx < 0) return
    const cellW = (el.clientWidth - 6 * STRIP_GAP) / 7
    el.scrollTo({ left: Math.max(0, idx * (cellW + STRIP_GAP) - el.clientWidth / 2 + cellW / 2), behavior: 'smooth' })
  }, [highlightedDay, allDays])

  // Full-grid memos (only used when showFullTimeline)
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

  void examProgressKey

  // Shared date rows
  const dateRows = (
    <div className="flex flex-col gap-1 pt-0.5">
      <div className="flex items-center gap-1.5">
        {!editing || onOpenStudyPlan ? (
          <button
            type="button"
            onClick={() => onOpenStudyPlan ? onOpenStudyPlan() : (setDraft(targetDate ?? ''), setEditing(true))}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {examDateLabel ? (
              <>
                <span className="font-medium">Exam: {examDateLabel}</span>
                {daysLeft !== null && daysLeft <= 0 && <span className="opacity-60">passed</span>}
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
              onClick={() => onOpenStudyPlan ? onOpenStudyPlan(2) : (setDraftReady(targetReadyDate ?? ''), setEditingReady(true))}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Calendar className="h-3.5 w-3.5 shrink-0 text-amber-500" />
              {readyDateLabel ? (
                <>
                  <span className="font-medium">Target ready: {readyDateLabel}</span>
                  {readyDaysLeft !== null && readyDaysLeft <= 0 && <span className="opacity-60">passed</span>}
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
      {!showFullTimeline ? (
        /* ── Scrollable day strip (default) — max-w constrains to 7 cells ── */
        <div className="max-w-[400px] w-full mx-auto flex flex-col gap-3">
          <div
            ref={scrollRef}
            className="overflow-x-auto pt-0.5 pb-2 min-h-[44px] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="flex" style={{ gap: STRIP_GAP }}>
              {allDays.map(cell => {
                const pct = !cell.isFuture ? resolvedPct(cell.key, cell.data, dayPlanPct) : null
                const isClickable = !!onDayClick
                const dow = cell.d.getDay()
                const isoIndex = (dow + 6) % 7
                const dayLabel = DAY_LABELS[isoIndex]
                const bgStyle = pct !== null ? cellStyle(pct) : undefined

                let cls = 'flex-shrink-0 aspect-square flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all select-none'
                if (cell.isFuture) {
                  if (cell.isExamDay) cls += ' bg-primary/30 ring-1 ring-inset ring-primary'
                  else if (cell.isReadyDay) cls += ' bg-amber-400/30 ring-1 ring-inset ring-amber-400'
                  else cls += ' bg-muted/20'
                } else if (pct === null) {
                  cls += ' bg-muted/30'
                }
                if (cell.key === highlightedDay) cls += ' ring-2 ring-white/90'
                else if (cell.isToday) cls += ' ring-2 ring-inset ring-foreground/70 dark:ring-white/80'
                if (isClickable) cls += ' cursor-pointer hover:opacity-75 active:opacity-60'

                return (
                  <div
                    key={cell.key}
                    role={isClickable ? 'button' : undefined}
                    onClick={isClickable ? () => onDayClick!(cell.key) : undefined}
                    style={{ width: `calc((100% - ${6 * STRIP_GAP}px) / 7)`, ...bgStyle }}
                    className={cls}
                    title={cell.key}
                  >
                    <span className="text-[10px] leading-none text-muted-foreground">{dayLabel}</span>
                    <span className={`text-base font-bold leading-none mt-0.5${cell.isFuture && !cell.isExamDay && !cell.isReadyDay ? ' text-muted-foreground/60' : ''}`}>
                      {cell.d.getDate()}
                    </span>
                    {cell.isExamDay && (
                      <span className="text-[8px] leading-none text-primary font-medium mt-0.5">Exam</span>
                    )}
                    {!cell.isExamDay && cell.isReadyDay && (
                      <span className="text-[8px] leading-none text-amber-500 font-medium mt-0.5">Ready</span>
                    )}
                    {cell.d.getDate() === 1 && !cell.isExamDay && !cell.isReadyDay && (
                      <span className="text-[8px] leading-none text-muted-foreground mt-0.5">{MONTH_ABBR[cell.d.getMonth()]}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Expand chevron + Today button */}
          <div className="relative flex items-center justify-center py-0.5">
            <button
              type="button"
              onClick={() => toggleTimeline(true)}
              className="flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground transition-colors"
              aria-label="Expand to full timeline"
              title="Expand to full timeline"
            >
              <ChevronDown className="h-7 w-7" strokeWidth={1.5} />
            </button>
            {showTodayButton && (
              <button
                type="button"
                onClick={scrollToToday}
                className="absolute right-0 text-[11px] font-medium px-2 py-0.5 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Scroll to today"
              >
                Today
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ── Full timeline grid ── */
        <>
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

          {/* Day rows × week columns */}
          <div className="flex items-stretch gap-[2px]">
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
                    return (
                      <div
                        key={cell.key}
                        title={cell.title}
                        role={isClickable ? 'button' : undefined}
                        aria-label={isClickable ? `View sessions for ${cell.key}` : undefined}
                        onClick={isClickable ? () => onDayClick!(cell.key) : undefined}
                        style={!cell.isFuture ? cellStyle(resolvedPct(cell.key, cell.data, dayPlanPct)) : undefined}
                        className={`w-full rounded-[2px] ${
                          cell.isFuture
                            ? cell.isExamDay ? 'bg-primary/30 h-[14px] ring-1 ring-inset ring-primary'
                              : cell.isReadyDay ? 'bg-amber-400/30 h-[14px] ring-1 ring-inset ring-amber-400'
                              : col.isExamWeek ? 'bg-primary/10 h-[14px]'
                              : col.isTargetReadyWeek ? 'bg-amber-400/10 h-[14px]'
                              : 'h-[14px] bg-muted/20'
                            : `h-[14px] ${cell.data === null ? 'bg-muted/30' : ''}${isClickable ? ' cursor-pointer hover:opacity-80' : ''}`
                        }${cell.key === highlightedDay ? ' ring-2 ring-white/90' : cell.isToday ? ' ring-1 ring-inset ring-foreground/70 dark:ring-white/80' : ''}`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Collapse chevron */}
          <button
            type="button"
            onClick={() => toggleTimeline(false)}
            className="w-full flex items-center justify-center py-0.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            aria-label="Collapse to week strip"
            title="Collapse to week strip"
          >
            <ChevronUp className="h-7 w-7" strokeWidth={1.5} />
          </button>
        </>
      )}

      {dateRows}
    </div>
  )
}
