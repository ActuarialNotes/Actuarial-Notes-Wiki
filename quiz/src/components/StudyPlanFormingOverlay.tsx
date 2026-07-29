// The "schedule forming" animation played when a study plan is locked in.
//
// The plan is built backwards from the finish line, so the animation shows it
// that way: every day between today and exam day is drawn as a cell in a
// week-column grid (the same shape as the Study Schedule timeline), and the
// cells fill in from exam day back to today. A hero card above the grid tracks
// the wave, flashing each day's date and the concepts that day's plan
// schedules, before the whole thing settles on today.
//
// The wave itself is pure CSS (one `animation-delay` per cell, set once) so a
// 400-cell grid costs no re-renders; React only tracks which day the hero card
// is showing, which it samples a few times a second so the concepts stay
// readable however fast the cells are filling.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CalendarCheck, Loader2, X } from 'lucide-react'
import {
  buildFormingTimeline,
  buildPlanFormingDays,
  peakDailyLoad,
  summarizeFormingDays,
  type PlanFormingDay,
} from '@/lib/planForming'
import type { StudyPlan } from '@/lib/studyPlan'
import { useSoundEffects } from '@/hooks/useSoundEffects'

// How long the hero card holds one day before moving to the next. The wave can
// cross a day every 14ms; anything under ~150ms here is unreadable.
const HERO_HOLD_MS = 170
// How long the finished schedule stays on screen before the overlay dismisses.
const SETTLE_MS = 1700
// Give up and just close if the regenerated plan never arrives.
const WAIT_TIMEOUT_MS = 2500

const MAX_HERO_CONCEPTS = 4

type Phase = 'waiting' | 'forming' | 'settled'

interface Props {
  /** The regenerated plan. Null while it's still landing — the overlay waits. */
  plan: StudyPlan | null
  examDate: string | null
  onDone: () => void
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/** Monday-first weekday index, so the grid columns line up with the timeline. */
function weekdayIndex(dateISO: string): number {
  return (new Date(dateISO + 'T12:00:00').getDay() + 6) % 7
}

function dayOfMonth(dateISO: string): number {
  return new Date(dateISO + 'T12:00:00').getDate()
}

function formatWeekday(dateISO: string): string {
  return new Date(dateISO + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short' })
}

function formatMonthDay(dateISO: string): string {
  return new Date(dateISO + 'T12:00:00').toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
}

/** What the hero card says about a day with nothing scheduled. */
function emptyDayNote(day: PlanFormingDay): string {
  if (day.isExamDay) return 'Exam day'
  if (day.isBuffer) return 'Review and rest'
  return 'No new concepts'
}

export function StudyPlanFormingOverlay({ plan, examDate, onDone }: Props) {
  const { play } = useSoundEffects()
  const reduced = useMemo(prefersReducedMotion, [])

  const days = useMemo(
    () => (plan ? buildPlanFormingDays({ plan, examDate }) : []),
    [plan, examDate],
  )
  const timeline = useMemo(() => buildFormingTimeline(days), [days])
  const summary = useMemo(() => summarizeFormingDays(days), [days])
  const peakLoad = useMemo(() => peakDailyLoad(days), [days])

  const [phase, setPhase] = useState<Phase>('waiting')
  // Index into `days` of the cell the wave is currently on; the hero card
  // follows it. Starts at the far end (exam day) and walks back to today.
  const [heroIndex, setHeroIndex] = useState(0)

  // One-shot guard: onDone can fire from a timer, a click and a keypress.
  const finished = useRef(false)
  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    onDone()
  }, [onDone])

  // Nothing to animate — close rather than sit on an empty overlay.
  useEffect(() => {
    if (plan || phase !== 'waiting') return
    const t = setTimeout(finish, WAIT_TIMEOUT_MS)
    return () => clearTimeout(t)
  }, [plan, phase, finish])

  // Drive the hero card across the wave, then settle.
  useEffect(() => {
    if (days.length === 0 || phase === 'settled') return

    if (reduced) {
      // The formed schedule is the payload — show it, skip the wave.
      setPhase('settled')
      setHeroIndex(0)
      return
    }

    setPhase('forming')
    setHeroIndex(days.length - 1)
    play('page')

    const { delays, durationMs } = timeline
    const start = performance.now()
    let raf = 0
    let lastShownAt = start
    // The wave runs backwards through the strip, so the cursor counts down.
    let cursor = days.length - 1
    let shown = cursor

    const tick = (now: number) => {
      const elapsed = now - start
      while (cursor > 0 && delays[cursor - 1] <= elapsed) cursor--
      if (cursor !== shown && (now - lastShownAt >= HERO_HOLD_MS || cursor === 0)) {
        shown = cursor
        lastShownAt = now
        setHeroIndex(cursor)
      }
      if (elapsed < durationMs) {
        raf = requestAnimationFrame(tick)
      } else {
        setHeroIndex(0)
        setPhase('settled')
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once per plan; phase is driven from inside
  }, [days, timeline, reduced])

  // Land the schedule, then get out of the way.
  useEffect(() => {
    if (phase !== 'settled') return
    play('complete')
    const t = setTimeout(finish, reduced ? SETTLE_MS * 0.7 : SETTLE_MS)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps -- fires once on the entering edge of `settled`
  }, [phase])

  // Esc skips, like every other overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') finish() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finish])

  const heroDay: PlanFormingDay | null = days[heroIndex] ?? null

  // Week columns, Monday-first, with the days before today left as blanks so
  // the first column still lines up with the weekday rows.
  const columns = useMemo(() => {
    if (days.length === 0) return []
    const cells: ({ day: PlanFormingDay; index: number } | null)[] = [
      ...Array<null>(weekdayIndex(days[0].date)).fill(null),
      ...days.map((day, index) => ({ day, index })),
    ]
    const out: typeof cells[] = []
    for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7))
    const last = out[out.length - 1]
    while (last.length < 7) last.push(null)
    return out
  }, [days])

  const settled = phase === 'settled'

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 ceremony-overlay-in"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Building your study schedule"
      onClick={finish}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-background shadow-2xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={finish}
          aria-label="Skip"
          data-sound="none"
          className="absolute top-3 right-3 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {!heroDay ? (
          <div className="flex flex-col items-center gap-3 py-10" aria-live="polite">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Building your schedule…</p>
          </div>
        ) : (
          <>
            {/* Header — height reserved so settling doesn't jolt the panel */}
            <div className="mb-5 pr-6 min-h-[48px]" aria-live="polite">
              {settled ? (
                <div className="ceremony-celebration-in">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5 text-primary shrink-0" />
                    Schedule locked in
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    {summary.concepts} concept{summary.concepts === 1 ? '' : 's'} across{' '}
                    {summary.studyDays} study day{summary.studyDays === 1 ? '' : 's'}
                  </p>
                </div>
              ) : (
                <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Building your schedule…
                </h2>
              )}
            </div>

            {/* Hero day — flashes as the wave passes each date */}
            <div key={heroDay.date} className="plan-forming-day flex items-center gap-3">
              <div
                className={`h-14 w-14 shrink-0 rounded-2xl flex flex-col items-center justify-center ${
                  heroDay.isExamDay
                    ? 'bg-primary/20 ring-1 ring-primary'
                    : heroDay.isToday
                    ? 'bg-primary/15 ring-1 ring-primary/50'
                    : 'bg-muted/50 ring-1 ring-border'
                }`}
              >
                <span className="text-[10px] leading-none text-muted-foreground">
                  {formatWeekday(heroDay.date)}
                </span>
                <span className="text-xl font-bold leading-none mt-1 tabular-nums">
                  {dayOfMonth(heroDay.date)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {heroDay.isToday ? 'Today' : formatMonthDay(heroDay.date)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {heroDay.concepts.length > 0
                    ? `${heroDay.concepts.length} concept${heroDay.concepts.length === 1 ? '' : 's'}`
                    : emptyDayNote(heroDay)}
                </p>
              </div>
            </div>

            {/* That day's concepts — fixed height so the wave doesn't jitter the panel */}
            <ul className="mt-3 mb-5 min-h-[84px] space-y-1">
              {heroDay.concepts.slice(0, MAX_HERO_CONCEPTS).map((name, i) => (
                <li
                  key={`${heroDay.date}-${name}`}
                  style={{ animationDelay: `${i * 45}ms` }}
                  className="plan-forming-concept truncate rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  {name}
                </li>
              ))}
              {heroDay.concepts.length > MAX_HERO_CONCEPTS && (
                <li className="px-2.5 text-xs text-muted-foreground">
                  +{heroDay.concepts.length - MAX_HERO_CONCEPTS} more
                </li>
              )}
            </ul>

            {/* The schedule itself — one cell per day in week columns, filling in
                from exam day back to today. Columns share the width but cap out
                so a three-week plan doesn't stretch into wide bars. */}
            <div className="flex justify-center gap-[2px]" aria-hidden="true">
                {columns.map((col, ci) => (
                  <div key={ci} className="flex flex-1 max-w-[26px] flex-col gap-[2px] min-w-0">
                    {col.map((cell, ri) => {
                      if (!cell) return <div key={ri} className="w-full aspect-square max-h-[24px]" />
                      const { day, index } = cell
                      const load = peakLoad > 0 ? day.concepts.length / peakLoad : 0
                      const isHero = !settled && index === heroIndex
                      let cls = 'w-full aspect-square max-h-[24px] rounded-[2px] plan-forming-cell'
                      if (day.isExamDay) cls += ' bg-primary/40 ring-1 ring-inset ring-primary'
                      else if (day.isReadyDay) cls += ' bg-amber-400/30 ring-1 ring-inset ring-amber-400'
                      else if (day.concepts.length === 0) cls += ' bg-muted'
                      if (day.isToday) cls += ' ring-1 ring-inset ring-foreground/70 dark:ring-white/80'
                      if (isHero) cls += ' plan-forming-cell-active'
                      return (
                        <div
                          key={ri}
                          className={cls}
                          style={{
                            animationDelay: reduced ? undefined : `${timeline.delays[index]}ms`,
                            ...(day.concepts.length > 0 && !day.isExamDay && !day.isReadyDay
                              ? { backgroundColor: `hsl(var(--primary) / ${(0.28 + 0.52 * load).toFixed(2)})` }
                              : {}),
                          }}
                        />
                      )
                    })}
                  </div>
                ))}
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Today</span>
              <span>{examDate ? 'Exam day' : 'Ready date'}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
