import { useEffect, useRef, useState } from 'react'
import { Flame } from 'lucide-react'
import {
  consumeStreakCelebration,
  readStreakCelebration,
  STREAK_CELEBRATION_EVENT,
} from '@/lib/streakStore'

// Grace window for the fire-and-forget streak record to settle (it's still
// in flight for signed-in users when /review mounts) before we give up and hand
// off to the quest overlay, so a slow/failed streak write can never block it.
const SETTLE_TIMEOUT_MS = 4000

/**
 * Celebration interstitial shown right after a quiz whose correct answer(s)
 * extended today's daily streak: a bursting flame and the new day count, before
 * the quest overlay and the review screen. recordStreakActivity runs
 * fire-and-forget while the app navigates here, so this reads the day-keyed
 * celebration marker streakStore parks in localStorage (guests write it before
 * navigation, so an increase is visible on first render) and listens for
 * STREAK_CELEBRATION_EVENT (signed-in users settle it just after mount).
 *
 * `onResolved` fires exactly once — when the flame is dismissed, or as soon as
 * we know the streak didn't grow — so the parent can sequence the quest overlay
 * to appear next.
 */
export function StreakCompleteOverlay({ onResolved }: { onResolved: () => void }) {
  const initial = readStreakCelebration()
  const [streak, setStreak] = useState<number | null>(
    initial?.increased ? initial.streak : null,
  )
  // Already resolved when we know on first render there's nothing to celebrate
  // (a same-day repeat quiz wrote a not-increased marker before navigation).
  const [resolved, setResolved] = useState(() => !!initial && !initial.increased)

  // Fire onResolved exactly once, when we transition into the resolved state.
  const onResolvedRef = useRef(onResolved)
  onResolvedRef.current = onResolved
  useEffect(() => {
    if (resolved) onResolvedRef.current()
  }, [resolved])

  // Nothing to show yet and not resolved: wait for the streak record to settle
  // (signed-in in-flight case), with a timeout safety net so the quest overlay
  // is never blocked indefinitely.
  useEffect(() => {
    if (streak !== null || resolved) return
    const onCelebration = (e: Event) => {
      const detail = (e as CustomEvent<{ increased: boolean; streak: number }>).detail
      if (detail?.increased) setStreak(detail.streak)
      else setResolved(true)
    }
    window.addEventListener(STREAK_CELEBRATION_EVENT, onCelebration)
    const timer = window.setTimeout(() => setResolved(true), SETTLE_TIMEOUT_MS)
    return () => {
      window.removeEventListener(STREAK_CELEBRATION_EVENT, onCelebration)
      window.clearTimeout(timer)
    }
  }, [streak, resolved])

  if (streak === null) return null

  const dismiss = () => {
    consumeStreakCelebration()
    setStreak(null)
    setResolved(true)
  }

  return (
    <div
      className="streak-celebrate-overlay fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${streak} day streak`}
    >
      <div className="streak-celebrate-card w-full max-w-sm space-y-5 rounded-2xl bg-card p-6 text-center shadow-2xl">
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <span className="streak-celebrate-halo absolute inset-0 rounded-full bg-orange-500/15" />
            <Flame
              className="streak-celebrate-flame relative h-20 w-20 text-orange-500"
              fill="currentColor"
              strokeWidth={1.5}
            />
          </div>
          <div className="space-y-0.5">
            <p className="streak-celebrate-count text-5xl font-extrabold tabular-nums text-orange-500">
              {streak}
            </p>
            <p className="text-lg font-bold tracking-tight">
              day streak{streak === 1 ? '' : 's'}!
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {streak === 1
              ? 'You lit the flame — answer a question correctly tomorrow to keep it going.'
              : 'Nice work — answer a question correctly tomorrow to grow your streak.'}
          </p>
        </div>

        <button
          type="button"
          onClick={dismiss}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-600"
        >
          <Flame className="h-4 w-4" />
          Keep it going
        </button>
      </div>
    </div>
  )
}
