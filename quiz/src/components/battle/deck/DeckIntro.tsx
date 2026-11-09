import { useEffect } from 'react'
import { Swords } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { PlayerCard } from '@/components/battle/deck/DeckParts'
import type { BattlePlayer } from '@/lib/battle'

/** How long the intro runs: the deck's fan, the two cards' clash, the title. */
export const INTRO_MS = 3100
/** Under reduced motion it is a short fade of the title instead. */
export const INTRO_REDUCED_MS = 900

const FAN = [-28, -14, 0, 14, 28]

function reducedMotion(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * The full-screen intro (docs/quiz-battle-redesign.md §3.1): a deck drops in
 * and fans out, two cards fly up and flip — yours and the rival's — clash, and
 * the title comes up. It runs once and ends on the start screen; a tap ends it
 * early.
 */
export function DeckIntro({ me, onDone }: { me: Pick<BattlePlayer, 'name'>; onDone: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(onDone, reducedMotion() ? INTRO_REDUCED_MS : INTRO_MS)
    return () => window.clearTimeout(id)
  }, [onDone])

  return (
    <OverlayPortal>
      <div className="battle-css" style={{ display: 'contents' }}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Skip the intro"
        onClick={onDone}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') onDone() }}
        className="battle-deck dark fixed inset-0 z-[90] cursor-pointer overflow-hidden"
        data-sound="none"
        data-testid="battle-intro"
      >
        <div className="absolute left-1/2 top-[33%] h-[168px] w-[120px] -translate-x-1/2">
          {FAN.map((r, i) => (
            <div
              key={r}
              className="deck-intro-run deck-intro-fan absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-[var(--deck-card-edge)] bg-[var(--deck-card)] shadow-[0_12px_30px_rgba(0,0,0,.5)]"
              style={{ ['--r' as string]: `${r}deg`, transformOrigin: '50% 140%', animationDelay: `${i * 40}ms` }}
            >
              <Swords className="h-10 w-10 text-[#4B4258]" aria-hidden />
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 top-[33%] h-[168px] w-[120px] -translate-x-1/2" style={{ perspective: 900 }}>
          <div className="deck-intro-run deck-intro-a absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            <PlayerCard seat={0} player={me} size="lg" caption={<span className="tracking-[.12em] uppercase">You</span>} className="deck-face absolute inset-0" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="deck-intro-run deck-intro-b absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            <PlayerCard seat={1} player={null} size="lg" caption={<span className="tracking-[.12em] uppercase">Rival</span>} className="deck-face absolute inset-0" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        <div className="deck-intro-run deck-intro-spark absolute left-1/2 top-[calc(33%+20px)] -ml-10 h-20 w-20 rounded-full border-4 border-white shadow-[0_0_30px_10px_rgba(255,255,255,.5)]" aria-hidden />

        <div className="deck-intro-run deck-intro-title absolute inset-x-0 top-[62%] flex flex-col items-center gap-2 px-5 text-center">
          <span className="deck-display text-[52px] leading-none tracking-[-.02em]">Quiz Battle</span>
          <span className="text-[15px] text-[#C4BCD0]">Draw four topics and strike one of theirs.</span>
        </div>
      </div>
      </div>
    </OverlayPortal>
  )
}
