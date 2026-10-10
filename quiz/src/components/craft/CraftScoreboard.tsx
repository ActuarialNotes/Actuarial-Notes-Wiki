import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Medal } from 'lucide-react'
import type { MedalPlan, MedalProgress, MedalStanding } from '@/lib/craftMedals'
import { cn } from '@/lib/utils'

/**
 * **The board's scoreboard** — the right end of the Concept Craft header: the
 * medals (`lib/craftMedals.ts`) and the score. The score counts up to what a
 * find added, with the find's points flying off it; the medals say which one
 * is still in play and how far it is — and open the rules, each medal's target
 * and connections, and where the board stands against them.
 */

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/** A number that counts to its new value rather than jumping to it. */
function useCountUp(value: number, ms = 700): number {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const start = from.current
    from.current = value
    if (start === value) return
    // Counting down (a cleared board) is not an event; nor is anything under reduced motion.
    if (value < start || prefersReducedMotion()) {
      setShown(value)
      return
    }
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / ms)
      const e = 1 - Math.pow(1 - t, 3)
      setShown(Math.round(start + (value - start) * e))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      setShown(value)
    }
  }, [value, ms])
  return shown
}

/** Run a CSS animation class again from the start. */
function replay(el: HTMLElement | null, className: string) {
  if (!el) return
  el.classList.remove(className)
  void el.offsetWidth
  el.classList.add(className)
}

/** One medal as a disc in its colour: filled when won, a ring while in play, faint when missed. */
export function MedalDisc({ medal, size = 14 }: { medal: Pick<MedalProgress, 'color' | 'status' | 'label'>; size?: number }) {
  const won = medal.status === 'won'
  return (
    <span
      aria-hidden
      className={cn('inline-block shrink-0 rounded-full', medal.status === 'lost' && 'opacity-30')}
      style={{
        width: size,
        height: size,
        background: won ? medal.color : 'transparent',
        boxShadow: won
          ? `inset 0 0 0 ${Math.max(1.5, size / 7)}px rgb(255 255 255 / 0.35), 0 0 ${size / 2}px ${medal.color}80`
          : `inset 0 0 0 ${Math.max(1.5, size / 8)}px ${medal.color}`,
      }}
    />
  )
}

const count = (n: number, word: string) => `${n.toLocaleString()} ${word}${n === 1 ? '' : 's'}`

/** What a medal's row says about where the board stands. */
function standingLine(t: MedalProgress): string {
  if (t.status === 'won') return `Won with ${t.scored.toLocaleString()} in ${count(t.used, 'connection')}`
  if (t.status === 'lost') return `Missed: ${t.scored.toLocaleString()} in its ${count(t.budget, 'connection')}`
  return `${(t.target - t.scored).toLocaleString()} to go · ${count(t.budget - t.used, 'connection')} left`
}

export function CraftScoreboard({
  score,
  plan,
  standing,
  gained,
}: {
  score: number
  plan: MedalPlan
  standing: MedalStanding
  /** The last find's points, with an id that changes on every find — what flies off the score. */
  gained: { points: number; id: number } | null
}) {
  const shown = useCountUp(score)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const bumpRef = useRef<HTMLParagraphElement>(null)
  const flyRef = useRef<HTMLSpanElement>(null)

  // Every find replays the bump and the fly-off, a find in quick succession included.
  // Before paint, so the points never show standing still.
  const gainedId = gained?.id
  useLayoutEffect(() => {
    if (gainedId === undefined) return
    replay(bumpRef.current, 'craft-score-bump')
    replay(flyRef.current, 'craft-score-fly')
  }, [gainedId])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    // Captured, so the board's own Esc (a held card, a connection's card) waits its turn.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey, true)
    }
  }, [open])

  const { medal, chasing, tiers } = standing
  const lead = chasing ?? medal
  let top: string
  let bottom: string
  if (chasing) {
    top = `${(chasing.target - chasing.scored).toLocaleString()} to go`
    bottom = `in ${chasing.budget - chasing.used} for ${chasing.label}`
  } else if (medal) {
    top = medal.label
    bottom = 'medal won'
  } else {
    top = 'No medal'
    bottom = 'clear to try again'
  }
  const summary = chasing
    ? `${chasing.label} medal: ${(chasing.target - chasing.scored).toLocaleString()} points to go in ${count(chasing.budget - chasing.used, 'connection')}${medal ? `. ${medal.label} won` : ''}`
    : medal ? `${medal.label} medal won` : 'No medal on this board'

  return (
    <div ref={ref} className="relative flex shrink-0 items-center gap-1 sm:gap-2">
      {tiers.length > 0 && (
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={`${summary}. Show the medals`}
          title="Medals"
          data-testid="craft-medals"
          data-medal={medal?.id}
          className="flex items-center gap-2 rounded-lg px-1.5 py-1 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex items-center gap-0.5">
            {tiers.map(t => (
              <span key={t.id} className={cn(t.id === lead?.id && t.status === 'open' && 'scale-125', 'transition-transform')}>
                <MedalDisc medal={t} size={12} />
              </span>
            ))}
          </span>
          <span className="block leading-none">
            <span className="block text-xs font-semibold tabular-nums" style={{ color: lead?.color }}>{top}</span>
            <span className="mt-0.5 block whitespace-nowrap text-[11px] tabular-nums text-muted-foreground">{bottom}</span>
          </span>
        </button>
      )}

      <div className="relative text-right" data-testid="craft-score" data-score={score}>
        <p ref={bumpRef} className="text-lg font-bold tabular-nums leading-none sm:text-xl" data-testid="craft-score-value">
          {shown.toLocaleString()}
        </p>
        <p className="text-[11px] text-muted-foreground">Score</p>
        {gained && (
          <span
            ref={flyRef}
            aria-hidden
            className="pointer-events-none absolute right-0 top-full mt-0.5 whitespace-nowrap rounded-full px-1.5 py-0.5 text-xs font-bold tabular-nums text-white"
            style={{ background: 'var(--exam-accent-vivid, hsl(var(--primary)))' }}
          >
            +{gained.points}
          </span>
        )}
      </div>

      {open && (
        <div
          role="dialog"
          aria-label="Medals"
          data-testid="craft-medals-panel"
          className="paper-drop absolute right-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-1.5rem))] rounded-xl bg-popover p-4 text-popover-foreground shadow-xl ring-1 ring-border"
        >
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Medal className="h-4 w-4" aria-hidden />
            Most of the score is in a few connections
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            The {count(plan.concepts, 'concept')} here make {count(plan.pairs, 'pair')}, worth {plan.total.toLocaleString()} together.
            Find the best of them first.
          </p>
          <ul className="mt-3 space-y-3">
            {tiers.map(t => (
              <li key={t.id} className={cn('flex gap-3', t.status === 'lost' && 'opacity-60')} data-testid="craft-medal-tier" data-status={t.status}>
                <MedalDisc medal={t} size={20} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">
                    {t.label}
                    <span className="ml-1.5 font-normal text-muted-foreground">
                      {Math.round(t.score * 100)}% in {Math.round(t.connections * 100)}%
                    </span>
                  </p>
                  <p className="text-xs tabular-nums text-muted-foreground">
                    {t.target.toLocaleString()} in your first {count(t.budget, 'connection')}
                    {t.capped ? ' — the most any play can reach' : ''}
                  </p>
                  {/* How far the first `budget` connections have got toward the target. */}
                  <div className="mt-1.5 h-1 rounded-full bg-muted" role="img" aria-label={`${t.scored} of ${t.target}`}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.min(100, (t.scored / t.target) * 100)}%`, background: t.color }}
                    />
                  </div>
                  <p className="mt-1 text-xs tabular-nums">{standingLine(t)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
