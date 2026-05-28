import { useState, useEffect, useCallback } from 'react'
import { Check, Circle, Gem, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { todayISO } from '@/lib/studyPlan'
import type { MasteryState } from '@/lib/mastery'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CeremonyConcept {
  name: string
  target: MasteryState
}

interface Props {
  concepts: CeremonyConcept[]
  gemsEarnedToday: number
  onClose: () => void
}

type Phase = 'ticking' | 'complete' | 'claiming' | 'claimed'

const STATE_LABEL: Record<MasteryState, string> = {
  new: 'New', level1: 'Level 1', level2: 'Level 2', level3: 'Level 3', forgotten: 'Forgotten',
}

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(from: number, to: number, durationMs: number, active: boolean): number {
  const [value, setValue] = useState(from)
  useEffect(() => {
    if (!active) { setValue(from); return }
    setValue(from)
    if (from === to) return
    let raf: number
    const startTime = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / durationMs, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setValue(Math.round(from + (to - from) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
  return value
}

// ── Component ─────────────────────────────────────────────────────────────────

export function StudyPlanCompletionCeremony({ concepts, gemsEarnedToday, onClose }: Props) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [phase, setPhase] = useState<Phase>('ticking')
  const bonusGems = gemsEarnedToday

  // Tick concepts in one by one, then transition to 'complete'
  useEffect(() => {
    if (visibleCount < concepts.length) {
      const delay = visibleCount === 0 ? 500 : 360
      const t = setTimeout(() => setVisibleCount(v => v + 1), delay)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase('complete'), 750)
    return () => clearTimeout(t)
  }, [visibleCount, concepts.length])

  // Animate gem count from gemsEarnedToday → gemsEarnedToday*2 in claimed phase
  const displayGems = useCountUp(
    bonusGems,
    bonusGems * 2,
    1400,
    phase === 'claimed',
  )

  const handleClaim = useCallback(async () => {
    setPhase('claiming')
    try {
      if (bonusGems > 0) {
        await supabase.rpc('award_gems', { p_amount: bonusGems })
        window.dispatchEvent(new CustomEvent('gems-awarded', { detail: { amount: bonusGems } }))
        try {
          localStorage.setItem(`actuarial_bonus_claimed_${todayISO()}`, '1')
        } catch { /* ignore */ }
      }
    } catch (e) {
      console.warn('bonus gem claim failed:', e)
    }
    setPhase('claimed')
  }, [bonusGems])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 ceremony-overlay-in"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}
    >
      <div className="relative bg-background rounded-2xl shadow-2xl border w-full max-w-sm overflow-hidden">

        {/* Close / skip button — hidden after claim */}
        {phase !== 'claimed' && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="p-6 pt-5">

          {/* Header */}
          <div className="text-center mb-4">
            {phase === 'claimed' ? (
              <h2 className="text-xl font-bold ceremony-celebration-in">Bonus claimed! 🎉</h2>
            ) : phase === 'complete' || phase === 'claiming' ? (
              <h2 className="text-xl font-bold ceremony-celebration-in">Plan complete! 🎉</h2>
            ) : (
              <h2 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                Completing today's plan…
              </h2>
            )}
          </div>

          {/* Concept tick-off list — visible in ticking + complete + claiming phases */}
          {phase !== 'claimed' && (
            <ul className="space-y-1.5 mb-5">
              {concepts.slice(0, visibleCount).map(c => (
                <li
                  key={c.name}
                  className="ceremony-concept-in flex items-center gap-2.5 px-3 py-2 rounded-xl bg-green-50 dark:bg-green-950/25 border border-green-200 dark:border-green-800"
                >
                  <span className="study-plan-check-in shrink-0" style={{ animationDelay: '100ms' }}>
                    <Check className="h-4 w-4 text-green-500" />
                  </span>
                  <span className="text-sm flex-1 min-w-0 truncate font-medium text-green-800 dark:text-green-200">
                    {c.name}
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400 shrink-0 font-medium">
                    {STATE_LABEL[c.target]}
                  </span>
                </li>
              ))}

              {/* Greyed-out pending concepts */}
              {concepts.slice(visibleCount).map(c => (
                <li
                  key={c.name}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-border opacity-25"
                >
                  <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm flex-1 min-w-0 truncate">{c.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    → {STATE_LABEL[c.target]}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* ── Complete phase: gem bonus CTA ─────────────────────── */}
          {phase === 'complete' && (
            <div className="text-center space-y-4 ceremony-celebration-in">
              {bonusGems > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    You earned{' '}
                    <span className="font-semibold text-foreground">{bonusGems} gems</span>{' '}
                    today — apply your 2× bonus!
                  </p>
                  <div className="flex items-center justify-center gap-3 py-1">
                    <div className="flex items-center gap-1.5">
                      <Gem className="h-5 w-5 text-muted-foreground" />
                      <span className="text-2xl font-bold tabular-nums">{bonusGems}</span>
                    </div>
                    <span className="text-xl text-muted-foreground font-light">→</span>
                    <div className="flex items-center gap-1.5 ceremony-gem-highlight">
                      <Gem className="h-5 w-5 text-emerald-500" />
                      <span className="text-2xl font-bold tabular-nums text-emerald-500">
                        {bonusGems * 2}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => { void handleClaim() }}
                    className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-base py-5"
                    size="lg"
                  >
                    <Gem className="h-4 w-4" />
                    Apply 2× Gem Bonus
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">Great work completing today's plan!</p>
                  <Button onClick={onClose} className="w-full" size="sm">Done</Button>
                </>
              )}
            </div>
          )}

          {/* ── Claiming phase: loading ───────────────────────────── */}
          {phase === 'claiming' && (
            <div className="text-center py-2">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-emerald-500" />
            </div>
          )}

          {/* ── Claimed phase: celebration ────────────────────────── */}
          {phase === 'claimed' && (
            <div className="text-center space-y-4">
              <div className="flex justify-center py-1">
                <Gem
                  key="gem-celebrate"
                  className="h-16 w-16 text-emerald-500 gem-celebrate"
                />
              </div>
              <div className="ceremony-bonus-count-in">
                <p className="text-4xl font-bold text-emerald-500 tabular-nums">
                  +{bonusGems}
                </p>
                <p className="text-sm text-muted-foreground mt-1">gems added to your balance</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-lg py-1">
                <Gem className="h-5 w-5 text-emerald-500" />
                <span className="text-xl font-bold tabular-nums">{displayGems}</span>
                <span className="text-sm text-muted-foreground">gems today</span>
              </div>
              <Button onClick={onClose} className="w-full" size="sm">
                Done
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
