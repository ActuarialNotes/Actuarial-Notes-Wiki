// Drives the "schedule forming" playback on the Dashboard's Study Schedule
// card: after a plan is locked in, the card rewinds through the schedule from
// exam day back to today, holding on each day long enough to read the concepts
// it schedules.
//
// The hook owns only the *day cursor*. The card reacts to it — ExamHeatmap
// glides its strip to the day, and the day panel below shows that day's plan —
// so the animation is the real card, not a stand-in for it.

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  buildFormingTimeline,
  buildPlanFormingDays,
  formingIndexAt,
  summarizeFormingDays,
  type PlanFormingSummary,
} from '@/lib/planForming'
import type { StudyPlan } from '@/lib/studyPlan'

/**
 * How long one day stays highlighted before the sweep moves on. The underlying
 * cursor crosses a day every ~14ms on a long plan; this is what makes the
 * schedule readable rather than a blur, and it's also the window the strip has
 * to glide to each new day.
 */
export const PLAYBACK_HOLD_MS = 190

/** How long the card rests on today before handing back to normal use. */
const SETTLE_MS = 1400

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export interface SchedulePlayback {
  /** True from the first frame until the card has settled back on today. */
  active: boolean
  /** The day the card is showing, or null when idle. */
  day: string | null
  /** True once the sweep has reached today and is holding there. */
  landed: boolean
  /** What the finished plan came to — shown in the card header on landing. */
  summary: PlanFormingSummary | null
  start: (plan: StudyPlan, examDate: string | null) => void
  stop: () => void
}

export function useSchedulePlayback(): SchedulePlayback {
  const [day, setDay] = useState<string | null>(null)
  const [active, setActive] = useState(false)
  const [landed, setLanded] = useState(false)
  const [summary, setSummary] = useState<PlanFormingSummary | null>(null)

  const rafRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    clearTimeout(timerRef.current)
    setActive(false)
    setLanded(false)
    setDay(null)
    setSummary(null)
  }, [])

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current)
    clearTimeout(timerRef.current)
  }, [])

  const start = useCallback((plan: StudyPlan, examDate: string | null) => {
    const days = buildPlanFormingDays({ plan, examDate })
    if (days.length < 2) return

    cancelAnimationFrame(rafRef.current)
    clearTimeout(timerRef.current)

    const timeline = buildFormingTimeline(days)
    setSummary(summarizeFormingDays(days))
    setActive(true)

    const settle = () => {
      timerRef.current = setTimeout(() => {
        setActive(false)
        setLanded(false)
        setDay(null)
      }, SETTLE_MS)
    }

    if (prefersReducedMotion()) {
      // The result is the point, not the rewind: land on today and report it.
      setDay(days[0].date)
      setLanded(true)
      settle()
      return
    }

    setLanded(false)
    setDay(days[days.length - 1].date)

    const start = performance.now()
    let shown = days.length - 1
    let shownAt = start

    const tick = (now: number) => {
      const elapsed = now - start
      const cursor = formingIndexAt(timeline, elapsed)
      if (cursor !== shown && now - shownAt >= PLAYBACK_HOLD_MS) {
        shown = cursor
        shownAt = now
        setDay(days[cursor].date)
      }
      if (elapsed < timeline.durationMs) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      // Land on today and hold there before releasing the card.
      setDay(days[0].date)
      setLanded(true)
      settle()
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  return { active, day, landed, summary, start, stop }
}
