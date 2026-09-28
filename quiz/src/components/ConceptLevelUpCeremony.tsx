import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, Gem, Sparkles } from 'lucide-react'
import { CollectCard3D } from '@/components/collect/CollectCard3D'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import type { MasteryState } from '@/lib/mastery'
import { SINGLE, SPIN_MS, gridCardSize, gridTimeline } from '@/lib/levelUpCeremony'
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

// The ceremony has two shapes, by how many concepts moved (the clock for both
// is lib/levelUpCeremony.ts):
//
// - **One concept**: its card spins (rainbow snake ring) and blooms into a
//   flash of light. A level-up that collected the concept's flashcard (its
//   first New → Level 1, `MasteryTransition.collected` — see
//   docs/flashcard-collection.md) plays the collect animation instead: the
//   sealed card spins under "Collecting…", the bloom lands on the `collect`
//   chime, and the card settles back in on a "Collected!" beat.
// - **Several**: every card pops into one grid, a beat apart, each spinning and
//   then landing in place with its new level (or "Collected!") under it, on a
//   climbing `levelUpStep` note.
//
// Either way it ends on a summary "post" screen that recaps every level-up and
// tallies the gems earned into the running balance.
type Phase = 'grid' | 'spin' | 'flash' | 'collected' | 'summary'

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

  const [phase, setPhase] = useState<Phase>(reduce ? 'summary' : multiple ? 'grid' : 'spin')
  const skip = () => { if (phase !== 'summary') setPhase('summary') }

  // Running gem counter shown on the summary screen — starts at the pre-quiz
  // balance and ticks up to the current total by the amount just earned.
  const startBalance = Math.max(0, totalGems - gemsEarned)
  const [displayGems, setDisplayGems] = useState(startBalance)

  // ── One concept: spin → flash (→ collected) → summary ───────────────────
  const current = transitions[0]
  const collecting = !!current?.collected

  // Each phase schedules exactly one timeout and clears it on cleanup, so it
  // stays correct under StrictMode.
  useEffect(() => {
    if (phase !== 'spin' && phase !== 'flash' && phase !== 'collected') return
    let id: number
    if (phase === 'spin') {
      // A collection's one chime is `collect`, on the bloom — the card landing
      // — so its spin stays quiet, as it always did in the collect flow.
      if (!collecting) play('levelUp')
      id = window.setTimeout(() => setPhase('flash'), SPIN_MS)
    } else if (phase === 'flash') {
      if (collecting) play('collect')
      // The card finishes dissolving (.collect-card-absorb) before it unmounts.
      id = window.setTimeout(() => setPhase(collecting ? 'collected' : 'summary'), SINGLE.absorbMs)
    } else {
      id = window.setTimeout(() => setPhase('summary'), SINGLE.collectedHoldMs)
    }
    return () => window.clearTimeout(id)
  }, [phase, collecting, play])

  // ── Several concepts: one grid, each card popping in a beat after the last ─
  const timeline = useMemo(() => gridTimeline(transitions.length), [transitions.length])
  const cardSize = gridCardSize(transitions.length)
  // How many cards have popped into the grid, and how many of those have landed.
  const [shown, setShown] = useState(0)
  const [landed, setLanded] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)
  const cellRefs = useRef<(HTMLDivElement | null)[]>([])

  // The whole grid is scheduled up front and torn down on cleanup — a skip to
  // the summary cancels whatever hasn't fired yet, and StrictMode's second run
  // starts from a clean slate. Every landing is a rung of the `levelUpStep`
  // climb, collected or not: the climb is the ceremony, and a `collect` chime
  // per card on top of it would be a second cue for the same event. A grid that
  // lands faster than the cue's throttle has it sound every other card or so —
  // thinned, never bunched.
  useEffect(() => {
    if (phase !== 'grid') return
    const ids: number[] = []
    timeline.appearAt.forEach((at, i) => {
      ids.push(window.setTimeout(() => setShown(s => Math.max(s, i + 1)), at))
    })
    timeline.landAt.forEach((at, i) => {
      ids.push(window.setTimeout(() => {
        setLanded(l => Math.max(l, i + 1))
        play('levelUpStep')
      }, at))
    })
    ids.push(window.setTimeout(() => setPhase('summary'), timeline.doneAt))
    return () => ids.forEach(id => window.clearTimeout(id))
  }, [phase, timeline, play])

  // A run too long for the screen scrolls to keep the newest card in view.
  useEffect(() => {
    if (phase !== 'grid' || shown === 0) return
    const box = gridRef.current
    const cell = cellRefs.current[shown - 1]
    if (!box || !cell) return
    const bottom = cell.offsetTop + cell.offsetHeight + 12 - box.clientHeight
    if (bottom > box.scrollTop) box.scrollTo({ top: bottom, behavior: 'smooth' })
  }, [phase, shown])

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
        onClick={skip}
      />

      {/* Radial bloom during the flash between cards. */}
      {inBloom && <div className="collect-bloom pointer-events-none absolute inset-0" />}

      {/* ── One card: spin / flash / collected ─────────────────────────── */}
      {(phase === 'spin' || phase === 'flash' || phase === 'collected') && current && (
        <div
          key={phase === 'collected' ? 'collected' : 'card'}
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
        </div>
      )}

      {/* ── Several cards: one grid ───────────────────────────────────────── */}
      {phase === 'grid' && (
        <div className="relative z-[121] flex w-full max-w-3xl flex-col items-center gap-3 text-center" onClick={skip}>
          <span className="text-sm font-medium text-white/70">Leveling up…</span>
          <div
            ref={gridRef}
            className="relative flex max-h-[70vh] w-full flex-wrap content-start justify-center gap-3 overflow-y-auto overscroll-contain p-2 sm:gap-4"
          >
            {transitions.slice(0, shown).map((t, i) => {
              const hasLanded = i < landed
              return (
                <div
                  key={`${t.conceptSlug}-${i}`}
                  ref={el => { cellRefs.current[i] = el }}
                  className="collect-grid-in flex flex-col items-center gap-1.5"
                >
                  <CollectCard3D
                    name={formatSlug(t.conceptSlug)}
                    phase={hasLanded ? 'idle' : 'spin'}
                    size={cardSize}
                    mastery={t.to}
                    locked={!!t.collected && !hasLanded}
                    className={hasLanded ? 'collect-card-land' : ''}
                  />
                  {/* Reserves its line before the card lands, so nothing shifts. */}
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      hasLanded ? (t.collected ? 'text-primary' : 'text-white') : 'invisible'
                    }`}
                  >
                    {t.collected ? <><Sparkles className="h-3.5 w-3.5" /> Collected!</> : LEVEL_LABEL[t.to]}
                  </span>
                </div>
              )
            })}
          </div>
          <span className="text-xs font-medium tabular-nums text-white/50">
            {landed} / {transitions.length}
          </span>
        </div>
      )}

      {/* ── Summary "post" screen ─────────────────────────────────────── */}
      {phase === 'summary' && (
        <div className="collect-done-pop relative z-[121] flex w-full max-w-sm flex-col items-center gap-5 text-center">
          <span className="inline-flex items-center gap-2 text-xl font-black tracking-tight text-primary">
            <Sparkles className="h-6 w-6" />
            {transitions.length === 1 ? 'Concept Leveled Up!' : `${transitions.length} Concepts Leveled Up!`}
          </span>

          {/* Recap every concept that advanced, with its from → to jump. A card
              collected at Level 1 says only that — collecting *is* New → Level 1,
              and the ladder beside it would only squeeze the name. A long run
              scrolls inside the card so Continue stays on screen. */}
          <div className="w-full space-y-1.5 rounded-xl bg-card p-4 shadow-2xl">
            <div className="max-h-[50vh] space-y-1.5 overflow-y-auto overscroll-contain">
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
                  {!(t.collected && t.to === 'level1') && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {LEVEL_LABEL[t.from]}
                      <ArrowRight className="h-3 w-3" />
                      {LEVEL_LABEL[t.to]}
                    </span>
                  )}
                </div>
              ))}
            </div>

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
