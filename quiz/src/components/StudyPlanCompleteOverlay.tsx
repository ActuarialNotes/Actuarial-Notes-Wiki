import { useState } from 'react'
import { Gem, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSoundEffects, useSoundOnMount } from '@/hooks/useSoundEffects'
import { supabase } from '@/lib/supabase'
import { todayISO } from '@/lib/studyPlan'

interface Props {
  /** Progress key for the exam whose plan just completed (e.g. "P", "FM"). */
  progressKey: string
  /** Gems earned today — the bonus doubles this by awarding a matching amount. */
  gemsEarned: number
  onClose: () => void
}

/**
 * Celebration interstitial shown right after a quiz completes today's entire
 * Study Plan, before the student digs into the review screen: a button to
 * unlock the 2x gem bonus for the day. Mirrors QuestCompleteOverlay's
 * collect-now-or-later pattern. Claiming writes the same
 * `actuarial_daily_bonus_{progressKey}_{date}` localStorage flag ReadinessCard
 * reads, so the Dashboard's own bonus indicator/auto-claim stays in sync and
 * never double-awards.
 */
export function StudyPlanCompleteOverlay({ progressKey, gemsEarned, onClose }: Props) {
  const { user } = useAuth()
  const canCollect = !!user && gemsEarned > 0
  const [claiming, setClaiming] = useState(false)
  const { play } = useSoundEffects()
  useSoundOnMount('complete')

  const markClaimed = () => {
    try {
      localStorage.setItem(
        `actuarial_daily_bonus_${progressKey}_${todayISO()}`,
        JSON.stringify({ amount: gemsEarned }),
      )
    } catch { /* quota exceeded */ }
  }

  const claim = () => {
    if (claiming) return
    play('reward')
    setClaiming(true)
    if (gemsEarned > 0 && user) {
      supabase.rpc('award_gems', { p_amount: gemsEarned })
        .then(({ error }: { error: { message: string } | null }) => {
          if (!error) {
            window.dispatchEvent(new CustomEvent('gems-awarded', { detail: { amount: gemsEarned } }))
          }
        })
        .catch((e: unknown) => console.warn('study plan bonus claim failed:', e))
        .finally(() => {
          markClaimed()
          setClaiming(false)
          onClose()
        })
    } else {
      markClaimed()
      setClaiming(false)
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Today's Study Plan done"
    >
      <div className="w-full max-w-sm space-y-4 rounded-2xl bg-card p-6 shadow-2xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
            <Gem className="h-7 w-7 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Today's Study Plan is done</h2>
          <p className="text-sm text-muted-foreground">
            {canCollect
              ? "You finished every concept on today's study plan, which doubles the gems you earned today."
              : "You finished every concept on today's study plan."}
          </p>
          {!user && gemsEarned > 0 && (
            <p className="text-xs text-muted-foreground">
              Sign in to get bonus gems for finishing it.
            </p>
          )}
        </div>

        {canCollect ? (
          <>
            <button
              type="button"
              disabled={claiming}
              onClick={claim}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-60"
            >
              {claiming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gem className="h-4 w-4" />}
              Collect {gemsEarned} bonus gems
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Collect later
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={claim}
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
