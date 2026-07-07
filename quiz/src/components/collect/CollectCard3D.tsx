import { useEffect, useState } from 'react'
import type { MasteryState } from '@/lib/mastery'

// A 3D-looking flashcard showing a concept name. Pure CSS — no WebGL — so it
// stays light and renders crisply everywhere. The card surface matches the
// Flashcards-gallery tile (plain themed card, not a coloured gradient); the
// collectible "shine" comes from a travelling foil border + holographic sheen,
// and — while still locked — a glossy "wrapped in plastic" overlay.

interface CollectCard3DProps {
  name: string
  // 'idle' tilts gently on hover; 'spin' accelerates into a fast spin used by
  // the collection animation; 'won' settles flat and glowing.
  phase?: 'idle' | 'spin' | 'won'
  size?: 'md' | 'lg'
  className?: string
  // When set, the card can be flipped by clicking/tapping it to reveal `back`.
  flippable?: boolean
  back?: React.ReactNode
  // Not yet collected — renders the front sealed under a "wrapped in plastic"
  // sheen with the vivid, travelling rainbow foil border, so the yet-to-be-
  // opened card reads as an exciting, unopened pack.
  locked?: boolean
  // Once collected, mirrors the Flashcards-tab foil-ring treatment so this
  // card matches the same concept's tile in the gallery (level2 gets a calm
  // static foil ring, level3 the vivid travelling one). Ignored when `locked`.
  mastery?: MasteryState
}

export function CollectCard3D({ name, phase = 'idle', size = 'lg', className = '', flippable = false, back, locked = false, mastery }: CollectCard3DProps) {
  const foilLevel = locked ? 'locked' : mastery === 'level3' ? 'l3' : mastery === 'level2' ? 'l2' : null
  const [side, setSide] = useState<'front' | 'back'>('front')
  const [flipping, setFlipping] = useState(false)
  // Once the card has been flipped, drop back to a static front resting state
  // so a flip-back doesn't replay the "won" entrance pop-in animation below.
  const [everFlipped, setEverFlipped] = useState(false)

  // A new concept always opens showing its front.
  useEffect(() => { setSide('front'); setFlipping(false); setEverFlipped(false) }, [name])

  const dims = size === 'lg' ? 'w-52 h-72 sm:w-60 sm:h-80' : 'w-36 h-48'
  const restClass = phase === 'spin'
    ? 'collect-card-spin'
    : phase === 'won'
      ? (everFlipped ? 'collect-card-won-front' : 'collect-card-won')
      : 'collect-card-idle'
  const restClassBack = phase === 'won' ? 'collect-card-won-back' : 'collect-card-idle-back'
  const flipClass = flipping
    ? (side === 'front' ? 'collect-card-flip-fwd' : 'collect-card-flip-rev')
    : (side === 'front' ? restClass : restClassBack)

  function handleClick() {
    if (!flippable || flipping || phase === 'spin') return
    setFlipping(true)
  }

  function handleAnimationEnd() {
    if (!flipping) return
    setSide(s => (s === 'front' ? 'back' : 'front'))
    setFlipping(false)
    setEverFlipped(true)
  }

  return (
    <div
      className={`collect-card-scene shrink-0 ${dims} ${className} ${flippable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      role={flippable ? 'button' : undefined}
      tabIndex={flippable ? 0 : undefined}
      aria-label={flippable ? `${name} flashcard, tap to flip` : undefined}
      aria-hidden={flippable ? undefined : true}
      onKeyDown={flippable ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } } : undefined}
    >
      <div className={`collect-card-3d ${flipClass}`} onAnimationEnd={handleAnimationEnd}>
        <div className="collect-card-face">
          <div className="collect-card-face-inner collect-card-surface">
            {/* Concept name — styled like the gallery tile (themed foreground on
                the plain card surface, not white-on-gradient) */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
              <span className="text-xl sm:text-2xl font-bold leading-tight text-card-foreground">
                {name}
              </span>
            </div>
            {/* Holographic rainbow sheen, matching the Flashcards-tab collected
                tile so the card reads as a "shiny" collectible */}
            {foilLevel && <span className="collect-card-holo" />}
            {/* Foil border ring, matching the Flashcards-tab treatment for this
                mastery level (or the vivid "locked" rainbow for an unopened pack) */}
            {foilLevel && <span className={`collect-card-foil-ring collect-card-foil-${foilLevel}`} />}
            {/* Sealed-in-plastic sheen, only before the card has been collected */}
            {locked && <span className="collect-card-plastic" />}
          </div>
        </div>
        {flippable && (
          <div className="collect-card-face collect-card-face-back">
            <div className="collect-card-face-inner collect-card-surface">
              {foilLevel && <span className={`collect-card-foil-ring collect-card-foil-${foilLevel}`} />}
              {/* Scroll container owns the overflow; the inner min-h-full flex
                  centres short definitions but grows (and scrolls) for long
                  ones. Centring directly on a scroll container would clip and
                  strand the top of overflowing content. */}
              <div className="collect-card-back-scroll relative z-10 h-full overflow-y-auto px-4 py-5 pointer-events-auto">
                <div className="flex min-h-full flex-col items-center justify-center text-center">
                  {back}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
