// Drives the "schedule forming" playback on the Dashboard's Study Schedule
// card: after a plan is locked in, the card rewinds through the schedule from
// exam day back to today, stopping on every day along the way — briefly, but
// none of them skipped.
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

/** Beat assumed before a sweep has been timed — see `SchedulePlayback.stepMs`. */
export const DEFAULT_STEP_MS = 60

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
  /** The beat the current sweep moves on, so the card can animate in time with it. */
  stepMs: number
  start: (plan: StudyPlan, examDate: string | null) => void
  stop: () => void
}

export function useSchedulePlayback(): SchedulePlayback {
  const [day, setDay] = useState<string | null>(null)
  const [active, setActive] = useState(false)
  const [landed, setLanded] = useState(false)
  const [summary, setSummary] = useState<PlanFormingSummary | null>(null)
  const [stepMs, setStepMs] = useState(DEFAULT_STEP_MS)

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
    setStepMs(timeline.stepMs || DEFAULT_STEP_MS)
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

    const startedAt = performance.now()
    let shown = days.length - 1

    const tick = (now: number) => {
      // The timeline says which day the sweep is *due* on; the cursor only ever
      // steps one day toward it per frame. That's what makes the rewind show
      // the whole schedule: on a long plan the beat is shorter than a frame, so
      // jumping straight to the due day would skip most of the days it passed,
      // whereas walking gives every single day at least one frame on screen —
      // and a plan whose beats outrun the display simply plays at the display's
      // pace instead of flickering past.
      if (formingIndexAt(timeline, now - startedAt) < shown) {
        shown--
        setDay(days[shown].date)
      }
      if (shown > 0) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      // Landed on today — hold there before releasing the card.
      setLanded(true)
      settle()
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  return { active, day, landed, summary, stepMs, start, stop }
}
