import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, Check, X } from 'lucide-react'
import type { QuizSession } from '@/lib/supabase'

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const WEEKS = 26

function cellBg(avgScore: number | null): string {
  if (avgScore === null) return 'bg-muted/30'
  if (avgScore >= 85) return 'bg-green-400 dark:bg-green-500'
  if (avgScore >= 70) return 'bg-green-600 dark:bg-green-700'
  if (avgScore >= 60) return 'bg-amber-400 dark:bg-amber-500'
  if (avgScore >= 50) return 'bg-amber-600 dark:bg-amber-700'
  if (avgScore >= 30) return 'bg-red-500 dark:bg-red-600'
  return 'bg-red-800 dark:bg-red-900'
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
  /** e.g. "FM" or "P" — used as the localStorage key for the exam date */
  examProgressKey: string
}

export function ExamHeatmap({ sessions, examProgressKey }: Props) {
  const storageKey = `exam-date-${examProgressKey}`
  const [examDate, setExamDate] = useState<string>(() => localStorage.getItem(storageKey) ?? '')
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  function saveDate(value: string) {
    if (value) {
      localStorage.setItem(storageKey, value)
      setExamDate(value)
    } else {
      localStorage.removeItem(storageKey)
      setExamDate('')
    }
    setEditing(false)
  }

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const gridStart = useMemo(() => addDays(mondayOf(today), -(WEEKS - 1) * 7), [today])

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
    if (!examDate) return -1
    const examD = new Date(examDate + 'T00:00:00')
    examD.setHours(0, 0, 0, 0)
    const diffMs = mondayOf(examD).getTime() - gridStart.getTime()
    const idx = Math.round(diffMs / (7 * 86400000))
    return idx >= 0 && idx < WEEKS ? idx : -1
  }, [examDate, gridStart])

  const columns = useMemo(() => {
    let prevMonth = -1
    return Array.from({ length: WEEKS }, (_, w) => {
      const colStart = addDays(gridStart, w * 7)
      const month = colStart.getMonth()
      const monthLabel = month !== prevMonth ? MONTH_ABBR[month] : null
      prevMonth = month

      const days = Array.from({ length: 7 }, (_, i) => {
        const d = addDays(colStart, i)
        const key = isoKey(d)
        const isFuture = d > today
        const data = scoreByDay.get(key) ?? null
        const title = isFuture
          ? key
          : data
            ? `${key}: avg ${Math.round(data.avgScore)}% (${data.count} session${data.count !== 1 ? 's' : ''})`
            : `${key}: no activity`
        return { key, data, isFuture, title }
      })

      return { key: isoKey(colStart), monthLabel, isExamWeek: w === examDateWeekIdx, days }
    })
  }, [gridStart, today, scoreByDay, examDateWeekIdx])

  const daysLeft = examDate ? daysUntil(examDate) : null
  const examDateLabel = examDate
    ? new Date(examDate + 'T00:00:00').toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric',
      })
    : null

  return (
    <div className="space-y-1.5">
      {/* Month labels */}
      <div className="flex items-end gap-px">
        <div className="shrink-0" style={{ width: 16 }} />
        <div className="flex-1 flex gap-px">
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
        <div className="flex-1 flex gap-px">
          {columns.map(col => (
            <div
              key={col.key}
              className={`flex-1 flex flex-col gap-px rounded-sm ${
                col.isExamWeek ? 'ring-1 ring-inset ring-primary/50' : ''
              }`}
            >
              {col.days.map(cell => (
                <div
                  key={cell.key}
                  title={cell.title}
                  className={`w-full rounded-[2px] ${
                    cell.isFuture
                      ? col.isExamWeek ? 'bg-primary/10 h-[10px]' : 'h-[10px]'
                      : `h-[10px] ${cellBg(cell.data?.avgScore ?? null)}`
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Exam date row */}
      <div className="flex items-center gap-1.5 pt-0.5">
        {!editing ? (
          <button
            type="button"
            onClick={() => { setDraft(examDate); setEditing(true) }}
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
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="date"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') saveDate(draft)
                if (e.key === 'Escape') setEditing(false)
              }}
              className="text-[11px] bg-background border rounded px-1 py-0.5 text-foreground"
            />
            <button
              type="button"
              onClick={() => saveDate(draft)}
              className="text-muted-foreground hover:text-foreground p-0.5 transition-colors"
              aria-label="Save"
            >
              <Check className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-muted-foreground hover:text-foreground p-0.5 transition-colors"
              aria-label="Cancel"
            >
              <X className="h-3 w-3" />
            </button>
            {examDate && (
              <button
                type="button"
                onClick={() => saveDate('')}
                className="text-[11px] text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
