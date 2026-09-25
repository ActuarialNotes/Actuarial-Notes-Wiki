import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, Gem, Sparkles } from 'lucide-react'
import { CollectCard3D } from '@/components/collect/CollectCard3D'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import type { MasteryState } from '@/lib/mastery'
import type { MasteryTransition } from '@/stores/quizStore'

const LEVEL_LABEL: Record<MasteryState, string> = {
  new: 'New',
  level1: 'Level 1',
  level2: 'Level 2',
  level3: 'Level 3',
  forgotten: 'Forgotten',
}

function formatSlug(slug: string): string {
  return slug.split('-').map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w)).join(' ')
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

// Per-card ceremony: the card spins (rainbow snake ring), blooms into a flash of
// light, then the next concept's card takes its place. After the last card, a
// summary "post" screen recaps every level-up and tallies the gems earned into
// the running balance.
//
// A level-up that collected the concept's flashcard (its first New → Level 1,
// `MasteryTransition.collected` — see docs/flashcard-collection.md) plays the
// collect animation instead: the sealed card spins under "Collecting…", the
// bloom lands on the `collect` chime, and the card settles back in on a
// "Collected!" beat before the next one takes its place.
type Phase = 'spin' | 'flash' | 'collected' | 'summary'

// How long the "Collected!" beat holds before the ceremony moves on.
const COLLECTED_HOLD_MS = 1400

interface Props {
  /** Upward mastery transitions from the just-completed quiz (New/L1/L2 → L1/L2/L3). */
  transitions: MasteryTransition[]
  /** Gems banked by this quiz (1 per correct answer); 0 for guests. */
  gemsEarned: number
  /** Current total gem balance *after* this quiz's gems were awarded. */
  totalGems: number
  /** Called once the player dismisses the summary — hands off to the next celebration. */
  onResolved: () => void
}

export function ConceptLevelUpCeremony({ transitions, gemsEarned, totalGems, onResolved }: Props) {
  const { play, resetCombo } = useSoundEffects()
  const reduce = useMemo(prefersReducedMotion, [])
  // A run of several concepts leveling up gets a rung-per-card climb instead
  // of the full fanfare repeated (see `levelUpStep` in soundConfig.ts) — reset
  // it once so a fresh ceremony always starts the climb at its root.
  const multiple = transitions.length > 1
  useEffect(() => {
    if (multiple) resetCombo('levelUpStep')
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only for the ceremony this component was mounted for
  }, [])

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>(reduce ? 'summary' : 'spin')

  // Running gem counter shown on the summary screen — starts at the pre-quiz
  // balance and ticks up to the current total by the amount just earned.
  const startBalance = Math.max(0, totalGems - gemsEarned)
  const [displayGems, setDisplayGems] = useState(startBalance)

  const current = transitions[index]

  const collecting = !!current?.collected

  // Drive the spin → flash (→ collected) → next-card sequence. Each phase
  // schedules exactly one timeout and clears it on cleanup, so it stays correct
  // under StrictMode.
  useEffect(() => {
    if (reduce || phase === 'summary') return
    const next = () => {
      if (index + 1 < transitions.length) {
        setIndex(i => i + 1)
        setPhase('spin')
      } else {
        setPhase('summary')
      }
    }
    let id: number
    if (phase === 'spin') {
      // A collection's one chime is `collect`, on the bloom — the card landing
      // — so its spin stays quiet, as it always did in the collect flow.
      if (!collecting) play(multiple ? 'levelUpStep' : 'levelUp')
      id = window.setTimeout(() => setPhase('flash'), 1100)
    } else if (phase === 'flash') {
      if (collecting) play('collect')
      // Matches the 560ms .collect-card-absorb duration so the card finishes
      // fading out before it unmounts.
      id = window.setTimeout(() => (collecting ? setPhase('collected') : next()), 560)
    } else {
      id = window.setTimeout(next, COLLECTED_HOLD_MS)
    }
    return () => window.clearTimeout(id)
  }, [phase, index, reduce, transitions.length, multiple, collecting, play])

  // Count the gems up once we land on the summary.
  useEffect(() => {
    if (phase !== 'summary') return
    play('complete')
    if (gemsEarned <= 0) {
      setDisplayGems(totalGems)
      return
    }
    const duration = 900
    const t0 = performance.now()
    let raf = 0
    // Land the gem chime on the counter, a beat after the completion chord.
    const chime = window.setTimeout(() => play('reward'), 320)
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplayGems(Math.round(startBalance + eased * gemsEarned))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.clearTimeout(chime) }
  }, [phase, gemsEarned, totalGems, startBalance, play])

  if (transitions.length === 0) return null

  const inBloom = phase === 'flash'
  const showGems = gemsEarned > 0

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Concepts leveled up"
    >
      {/* Backdrop — tap to skip straight to the summary. */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => phase !== 'summary' && setPhase('summary')}
      />

      {/* Radial bloom during the flash between cards. */}
      {inBloom && <div className="collect-bloom pointer-events-none absolute inset-0" />}

      {/* ── Per-card spin / flash / collected ─────────────────────────── */}
      {phase !== 'summary' && current && (
        <div
          key={phase === 'collected' ? `collected-${index}` : `card-${index}`}
          className={`relative z-[121] flex max-w-md flex-col items-center gap-5 text-center ${phase === 'collected' ? 'collect-done-pop' : ''}`}
        >
          <CollectCard3D
            name={formatSlug(current.conceptSlug)}
            phase={phase === 'collected' ? 'won' : 'spin'}
            size="lg"
            mastery={current.to}
            // A card being collected is still the sealed pack until it lands.
            locked={collecting && phase !== 'collected'}
            className={phase === 'flash' ? 'collect-card-absorb z-[122]' : ''}
          />
          <div className="flex flex-col items-center gap-1">
            {phase === 'collected' ? (
              <span className="inline-flex items-center gap-1.5 text-base font-bold text-primary">
                <Sparkles className="h-5 w-5" /> Collected!
              </span>
            ) : (
              <span className={`text-sm font-medium text-white/70 ${collecting ? 'animate-pulse' : ''}`}>
                {collecting ? 'Collecting…' : 'Leveling up…'}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-base font-bold text-white">
              {LEVEL_LABEL[current.from]}
              <ArrowRight className="h-4 w-4 opacity-80" />
              {LEVEL_LABEL[current.to]}
            </span>
          </div>
          {transitions.length > 1 && (
            <span className="text-xs font-medium tabular-nums text-white/50">
              {index + 1} / {transitions.length}
            </span>
          )}
        </div>
      )}

      {/* ── Summary "post" screen ─────────────────────────────────────── */}
      {phase === 'summary' && (
        <div className="collect-done-pop relative z-[121] flex w-full max-w-sm flex-col items-center gap-5 text-center">
          <span className="inline-flex items-center gap-2 text-xl font-black tracking-tight text-primary">
            <Sparkles className="h-6 w-6" />
            {transitions.length === 1 ? 'Concept Leveled Up!' : `${transitions.length} Concepts Leveled Up!`}
          </span>

          {/* Recap every concept that advanced, with its from → to jump. */}
          <div className="w-full space-y-1.5 rounded-xl bg-card p-4 shadow-2xl">
            {transitions.map((t, i) => (
              <div
                key={`${t.conceptSlug}-${i}`}
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5"
              >
                <span className="min-w-0 flex-1 truncate text-left text-sm font-medium text-foreground">
                  {formatSlug(t.conceptSlug)}
                </span>
                {t.collected && (
                  <span
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary"
                    title="Flashcard collected"
                  >
                    <Sparkles className="h-3 w-3" />
                    Collected
                  </span>
                )}
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {LEVEL_LABEL[t.from]}
                  <ArrowRight className="h-3 w-3" />
                  {LEVEL_LABEL[t.to]}
                </span>
              </div>
            ))}

            {/* Gems earned this quiz, ticking up into the running balance. */}
            {showGems && (
              <div className="mt-1.5 flex items-center justify-between gap-3 rounded-lg bg-emerald-500/10 px-3 py-2">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  <Gem className="h-4 w-4" />
                  Gems
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  <span className="tabular-nums">{displayGems.toLocaleString()}</span>
                  <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-xs tabular-nums">
                    +{gemsEarned}
                  </span>
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onResolved}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Continue
          </button>
        </div>
      )}
    </div>,
    document.body,
  )
}
