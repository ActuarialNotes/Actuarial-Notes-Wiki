import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { Calendar, X } from 'lucide-react'
import { dayCellAt, scheduleStripRange } from '@/lib/heatmapGrid'
import { examAccent } from '@/lib/examColors'
import type { QuizSession } from '@/lib/supabase'
import { ExamSittingsList } from '@/components/ExamSittingsList'
import { LOCALIZED_EXAMS, type ExamWindow } from '@/data/examSittings'

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
  /**
   * The published sitting window the exam date falls in (`examWindowFor`). The
   * linear strip shades it and runs a week past its last day; without one the
   * exam day is the whole window.
   */
  examWindow?: ExamWindow | null
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
  /**
   * `grid` — the calendar shape: weeks as columns, Monday→Sunday down each one.
   * `linear` — the same days on one line, oldest to newest, as a strip that
   * reads like a timeline. The Dashboard's readiness card uses the linear one:
   * it sits under the exam date and the countdown beside it, so the bar spans
   * exactly the stretch those two words describe.
   */
  layout?: 'grid' | 'linear'
  /**
   * Whether the exam-date row under the strip is drawn. The readiness card
   * prints that date above the strip already, so it turns this off and keeps
   * only the target-ready row.
   */
  showExamDateRow?: boolean
}

/**
 * Floor on the lit cell's flare, so a fast sweep reads as one travelling
 * highlight rather than a strobe. A beat shorter than this releases the cell
 * mid-flare, and the release transition carries it out — which is exactly the
 * trail the sweep should leave behind it.
 */
const MIN_FLARE_MS = 150

/** Cell gutter, in css px — must match the `gap-[3px]` on the grid below. */
const CELL_GAP = 3
/** Rows in a week column, Monday through Sunday. */
const ROWS = 7
/**
 * Ceiling on one day's square, in css px. Days are drawn square — a week column
 * is as wide as it is tall — by letting the columns share the card's width and
 * giving each cell `aspect-square`. On a wide desktop card a short schedule
 * would blow a day up to something the size of a button, so the grid stops
 * growing here and leaves the slack to its right instead.
 */
const MAX_CELL_PX = 40

/**
 * Fallback cell gutter for the linear strip, in css px. The strip's real gutter
 * is `--strip-gap` (1px on a phone, 2px from `sm` up) and a tap is resolved
 * against the measured `column-gap`; this is only what it reads if that fails.
 */
const LINEAR_GAP = 1
/** The strip's gutter from `sm` up — the widest it draws, for its width cap. */
const LINEAR_WIDE_GAP = 2
/**
 * Ceiling on one day's width in the linear strip — the strip's height, so a
 * short schedule's days come out as squares rather than stretching into wide
 * tiles. Past it the strip stops widening and leaves the slack to its right,
 * the way the grid does.
 */
const LINEAR_MAX_CELL_PX = 32
/** Floor on a day's width, so the marked days (today, exam day, target ready)
 *  stay findable on a phone where the run divides down to a couple of pixels —
 *  and wide enough that today's inset ring still reads as a ring rather than
 *  filling the bar and passing for a solid marker. */
const LINEAR_MARKED_MIN_PX = 4
/** Fewest days the strip's opening month needs on it to carry a label. */
const MIN_LABELLED_MONTH_DAYS = 7

/**
 * The Study Schedule timeline: one cell per day, every day between today and
 * the exam on screen at once — nothing scrolls — so the schedule-forming sweep
 * plays out right here. The grid runs from a fortnight before the first session
 * to a fortnight past exam day, in whole weeks; the linear strip is tighter —
 * a week before the first session to a week past the exam's sitting window
 * (`scheduleStripRange`), since on one line every extra day narrows the rest.
 *
 * Two layouts, one set of days:
 *
 *  - `grid` (the default) — weeks as columns, Monday→Sunday down each one, and
 *    a day really is a square: the columns split the available width and each
 *    cell takes its height from that width (`aspect-square`, capped by
 *    `MAX_CELL_PX`), so the strip reads as a calendar rather than a barcode and
 *    every day is a target a thumb can hit.
 *  - `linear` — the same days on one line, a thin bar each. This is the one the
 *    Dashboard's readiness card draws, under the exam date and the countdown
 *    beside it: on one line the strip spans exactly the stretch those two words
 *    name, so how much of it is green answers "and what have I done with it".
 *    A day divides down to a couple of css px on a phone, so the marked days
 *    carry a floor width (`LINEAR_MARKED_MIN_PX`) and a tap between two bars is
 *    resolved against the strip's geometry rather than swallowed. The exam's
 *    sitting window is shaded, so exam day reads as the end of a stretch.
 *
 * Both layouts build a day through the one `dayAt`, so the two can never
 * disagree about what a day holds or what colour it is.
 */
export function ExamHeatmap({
  sessions,
  examProgressKey,
  targetDate,
  onTargetDateChange,
  targetReadyDate,
  onTargetReadyDateChange,
  examWindow = null,
  onDayClick,
  onOpenStudyPlan,
  dayPlanPct,
  highlightedDay,
  playbackDay,
  playbackStepMs = 60,
  layout = 'grid',
  showExamDateRow = true,
}: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [editingReady, setEditingReady] = useState(false)
  const [draftReady, setDraftReady] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const inputReadyRef = useRef<HTMLInputElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

  // One day, as both layouts draw it: what was done on it, which of the marked
  // days it is, and whether it falls in the exam's sitting window.
  const dayAt = useMemo(() => {
    const todayKey = isoKey(today)
    return (d: Date) => {
      const key = isoKey(d)
      const isFuture = d > today
      const isToday = key === todayKey
      const isExamDay = !!targetDate && key === targetDate
      const isReadyDay = !!targetReadyDate && key === targetReadyDate
      const inExamWindow = !!examWindow && key >= examWindow.start && key <= examWindow.end
      const data = scoreByDay.get(key) ?? null
      const title = (isFuture
        ? key
        : data
          ? `${key}: avg ${Math.round(data.avgScore)}% (${data.count} session${data.count !== 1 ? 's' : ''})`
          : `${key}: no activity`) + (inExamWindow && !isExamDay ? ' · exam window' : '')
      return { key, data, isFuture, isToday, isExamDay, isReadyDay, inExamWindow, title }
    }
  }, [today, targetDate, targetReadyDate, examWindow, scoreByDay])

  const columns = useMemo(() => {
    let prevMonth = -1
    return Array.from({ length: totalWeeks }, (_, w) => {
      const colStart = addDays(gridStart, w * 7)
      const month = colStart.getMonth()
      const monthLabel = month !== prevMonth ? MONTH_ABBR[month] : null
      prevMonth = month
      const days = Array.from({ length: 7 }, (_, i) => dayAt(addDays(colStart, i)))
      return {
        key: isoKey(colStart),
        monthLabel,
        isExamWeek: w === examDateWeekIdx,
        isTargetReadyWeek: w === targetReadyDateWeekIdx && w !== examDateWeekIdx,
        days,
      }
    })
  }, [gridStart, totalWeeks, dayAt, examDateWeekIdx, targetReadyDateWeekIdx])

  // The linear strip's days: a week before the first session through a week
  // past the exam window, every day on one line (`scheduleStripRange`). Unlike
  // the grid it isn't padded out to whole weeks — on one line every extra day
  // is width taken from the ones that matter.
  const linearDays = useMemo(() => {
    const firstSession = sessions.length === 0 ? null : isoKey(new Date(
      sessions.reduce((min, s) => (s.completed_at < min ? s.completed_at : min), sessions[0].completed_at),
    ))
    const { start, end } = scheduleStripRange({
      today: isoKey(today),
      firstSession,
      examDate: targetDate,
      examWindow,
      targetReadyDate,
    })
    const days: ReturnType<typeof dayAt>[] = []
    for (let d = new Date(start + 'T00:00:00'); isoKey(d) <= end; d = addDays(d, 1)) days.push(dayAt(d))
    return days
  }, [sessions, today, targetDate, examWindow, targetReadyDate, dayAt])

  // Where the exam window sits on the strip, as a run of day indices — the
  // band drawn behind those days. Null when there's no window on it.
  const windowSpan = useMemo(() => {
    const first = linearDays.findIndex(d => d.inExamWindow)
    if (first < 0) return null
    let last = first
    while (last + 1 < linearDays.length && linearDays[last + 1].inExamWindow) last++
    return { first, count: last - first + 1 }
  }, [linearDays])

  // Month ticks for the strip: the label goes on the first day of each month it
  // crosses, so the bar carries the same "Aug … Sep … Oct" run the grid does.
  // The strip opens on whatever day falls a week before the first session, so
  // its opening month can have only a few days on it — too few to hold a label
  // without running into the next one. Those days go unlabelled instead.
  const linearMonthLabels = useMemo(() => {
    let prevMonth = -1
    const labels = linearDays.map(day => {
      const month = Number(day.key.slice(5, 7)) - 1
      const label = month !== prevMonth ? MONTH_ABBR[month] : null
      prevMonth = month
      return label
    })
    const next = labels.findIndex((label, i) => i > 0 && label !== null)
    if (next > 0 && next < MIN_LABELLED_MONTH_DAYS) labels[0] = null
    return labels
  }, [linearDays])

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

  // A day is ~18×14 css px on a phone, with 2px gutters — small enough that a
  // finger regularly lands between two of them. A tap the cells themselves miss
  // is resolved here against the grid's own geometry, so the gutters belong to
  // their neighbours instead of swallowing the tap.
  function handleGridClick(e: MouseEvent<HTMLDivElement>) {
    if (!onDayClick || playbackDay) return
    if ((e.target as HTMLElement).closest('[data-heatmap-cell]')) return
    const grid = gridRef.current
    if (!grid) return
    const rect = grid.getBoundingClientRect()
    const isLinear = layout === 'linear'
    // The strip's gutter changes with the breakpoint, so read the one drawn.
    const linearGap = isLinear ? parseFloat(getComputedStyle(grid).columnGap) : NaN
    const hit = dayCellAt(
      isLinear
        ? { width: rect.width, height: rect.height, columns: linearDays.length, rows: 1, gap: Number.isFinite(linearGap) ? linearGap : LINEAR_GAP }
        : { width: rect.width, height: rect.height, columns: totalWeeks, rows: ROWS, gap: CELL_GAP },
      e.clientX - rect.left,
      e.clientY - rect.top,
    )
    if (!hit) return
    const day = isLinear ? linearDays[hit.col] : columns[hit.col]?.days[hit.row]
    if (day) onDayClick(day.key)
  }

  const dateRows = (
    <div className="flex flex-col gap-1 pt-0.5 empty:hidden">
      {showExamDateRow && (
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
      )}

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

  // Squares, not stripes: the columns share the width, each cell takes its
  // height from that width, and the whole grid stops widening once a day would
  // be bigger than `MAX_CELL_PX`. The month row is capped to the same width so
  // its labels stay over the weeks they name.
  const gridMaxWidth = totalWeeks * (MAX_CELL_PX + CELL_GAP) - CELL_GAP

  // ── Linear strip ────────────────────────────────────────────────────────────
  //
  // The run of days on one line: a week before the first session at the left,
  // a week past the exam window at the right, each day a 32px-tall cell shaded
  // by what was done on it — square once the run is short enough to allow it.
  // It lives under the exam date and the countdown on the readiness card, so
  // the bar is literally the stretch those two words name — how much of it is
  // green is the answer to "and what have I done with it".
  if (layout === 'linear') {
    const stripMaxWidth = linearDays.length * (LINEAR_MAX_CELL_PX + LINEAR_WIDE_GAP) - LINEAR_WIDE_GAP
    const dayCount = linearDays.length
    return (
      // `--strip-gap` is the gutter between days: a hairline on a phone, where
      // a season divides down to a few px a day, and 2px once there's room for
      // the days to read as squares. The month row, the strip, the window band
      // and the tap resolution all read it, so they stay over the same days.
      <div className="space-y-1.5 [--strip-gap:1px] sm:[--strip-gap:2px]">
        {/* Month ticks, over the days they name. */}
        <div className="flex gap-[var(--strip-gap)]" style={{ height: 11, maxWidth: stripMaxWidth }}>
          {linearMonthLabels.map((label, i) => (
            <div key={linearDays[i].key} className="flex-1 min-w-0 relative">
              {label && (
                <span className="absolute left-0 bottom-0 text-[10px] text-muted-foreground leading-none whitespace-nowrap">
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* The strip itself. Days share the width, so a season of them divides
            down to a few css px on a phone — the marked days (today, exam day,
            target ready) carry a floor width so they stay findable, and a tap
            that lands between two days is resolved against the strip's own
            geometry by `handleGridClick`. */}
        <div
          ref={gridRef}
          className="relative flex items-stretch gap-[var(--strip-gap)]"
          style={playbackDay
            ? ({ touchAction: 'manipulation', maxWidth: stripMaxWidth, '--playback-step': `${Math.max(playbackStepMs, MIN_FLARE_MS)}ms` } as CSSProperties)
            : { touchAction: 'manipulation', maxWidth: stripMaxWidth }}
          onClick={handleGridClick}
        >
          {/* The exam window: one faint wash of the exam's own colour behind
              its days, gutters and all, so the sitting reads as a stretch that
              exam day sits in. The days are translucent, so the wash shows
              through them too without any day changing colour. Placed on the
              strip's own pitch — n days and n−1 gutters span the width. */}
          {windowSpan && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-y-1 rounded-[5px] bg-[var(--window-tint)] dark:bg-[var(--window-tint-dark)]"
              style={{
                left: `calc((100% + var(--strip-gap)) * ${windowSpan.first / dayCount} - 3px)`,
                width: `calc((100% + var(--strip-gap)) * ${windowSpan.count / dayCount} - var(--strip-gap) + 6px)`,
                // A tint reads stronger on a light card than a dark one, so the
                // light theme gets the thinner wash.
                '--window-tint': examAccent(examProgressKey, 0.14) ?? 'hsl(var(--primary) / 0.06)',
                '--window-tint-dark': examAccent(examProgressKey, 0.22) ?? 'hsl(var(--primary) / 0.1)',
              } as CSSProperties}
            />
          )}
          {linearDays.map(cell => {
            const isClickable = onDayClick !== undefined
            const isMarked = cell.isExamDay || cell.isReadyDay || cell.isToday
              || cell.key === highlightedDay || cell.key === playbackDay
            // A day with nothing on it still has to be *there*: on one line the
            // empty days are the timeline itself, so the track carries real
            // contrast and the days still to come are the paler half of it —
            // which is what makes the bar read against the countdown above it.
            let cls = `relative h-8 flex-1 min-w-0 rounded-[3px] ${
              cell.isExamDay ? 'bg-primary'
                : cell.isReadyDay ? 'bg-amber-400'
                : cell.isFuture ? 'bg-muted-foreground/10'
                : cell.data === null ? 'bg-muted-foreground/35' : ''
            }`
            if (isClickable && !playbackDay) cls += ' cursor-pointer transition-[opacity,box-shadow] hover:z-[1] hover:opacity-90 hover:ring-2 hover:ring-foreground/70'
            if (playbackDay) cls += ' transition-all'
            if (cell.key === playbackDay) cls += ' schedule-playback-day'
            else if (cell.key === highlightedDay) cls += ' ring-2 ring-white/90'
            else if (cell.isToday) cls += ' ring-1 ring-inset ring-foreground/70 dark:ring-white/80'
            // A marked day that isn't the exam or the target keeps its own
            // shade; the two dated ones are drawn solid, so their colour has to
            // survive the `cellStyle` wash a studied past day would get.
            const style = !cell.isFuture && !cell.isExamDay && !cell.isReadyDay
              ? cellStyle(resolvedPct(cell.key, cell.data, dayPlanPct))
              : undefined
            return (
              <div
                key={cell.key}
                data-heatmap-cell
                title={cell.title}
                role={isClickable ? 'button' : undefined}
                aria-label={isClickable
                  ? (cell.isFuture ? `View what is planned for ${cell.key}` : `View sessions for ${cell.key}`)
                    + (cell.inExamWindow && !cell.isExamDay ? ' (exam window)' : '')
                  : undefined}
                onClick={isClickable ? () => onDayClick!(cell.key) : undefined}
                style={isMarked ? { minWidth: LINEAR_MARKED_MIN_PX, ...style } : style}
                className={cls}
              />
            )
          })}
        </div>

        {dateRows}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Month labels */}
      <div className="flex items-end gap-[3px]">
        <div className="shrink-0" style={{ width: 20 }} />
        <div className="flex-1 flex gap-[3px]" style={{ height: 12, maxWidth: gridMaxWidth }}>
          {columns.map(col => (
            <div key={col.key} className="flex-1 relative">
              {col.monthLabel && (
                <span className="absolute left-0 bottom-0 text-[11px] text-muted-foreground leading-none whitespace-nowrap">
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
        className="flex items-stretch gap-[3px]"
        style={playbackDay
          ? ({ '--playback-step': `${Math.max(playbackStepMs, MIN_FLARE_MS)}ms` } as CSSProperties)
          : undefined}
      >
        {/* Weekday gutter. Each label is `flex-1` rather than a fixed height so
            the column divides whatever height the squares come out at — the two
            can't drift apart the way a hard-coded row height would. */}
        <div className="flex flex-col gap-[3px] shrink-0" style={{ width: 20 }}>
          {DAY_LABELS.map((label, i) => (
            <div key={i} className="flex-1 flex items-center justify-end pr-1 text-[11px] text-muted-foreground leading-none select-none overflow-hidden">
              {label}
            </div>
          ))}
        </div>
        <div
          ref={gridRef}
          className="flex-1 flex gap-[3px]"
          style={{ touchAction: 'manipulation', maxWidth: gridMaxWidth }}
          onClick={handleGridClick}
        >
          {columns.map(col => (
            <div
              key={col.key}
              className={`flex-1 flex flex-col gap-[3px] rounded-sm ${
                col.isExamWeek ? 'ring-1 ring-inset ring-primary/50'
                  : col.isTargetReadyWeek ? 'ring-1 ring-inset ring-amber-400/60' : ''
              }`}
            >
              {col.days.map(cell => {
                // Every day opens the panel below — a past day with no quiz on
                // it still has its level-ups and its place in the schedule to
                // show, and gating on `cell.data` made the strip feel dead on
                // exactly the days a user taps to ask "what did I do here?".
                const isClickable = onDayClick !== undefined
                let cls = `w-full aspect-square rounded-[3px] ${
                  cell.isFuture
                    ? cell.isExamDay ? 'bg-primary/30 ring-1 ring-inset ring-primary'
                      : cell.isReadyDay ? 'bg-amber-400/30 ring-1 ring-inset ring-amber-400'
                      : col.isExamWeek ? 'bg-primary/10'
                      : col.isTargetReadyWeek ? 'bg-amber-400/10'
                      : 'bg-muted/20'
                    : cell.data === null ? 'bg-muted/30' : ''
                }`
                if (isClickable && !playbackDay) cls += ' cursor-pointer hover:opacity-80'
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
                    data-heatmap-cell
                    title={cell.title}
                    role={isClickable ? 'button' : undefined}
                    aria-label={isClickable
                      ? cell.isFuture ? `View what is planned for ${cell.key}` : `View sessions for ${cell.key}`
                      : undefined}
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
