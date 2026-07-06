import { useEffect, useMemo, useState } from 'react'
import type { MasteryState } from '@/lib/mastery'

// A flashy, colourful 3D-looking flashcard showing a concept name. Pure CSS —
// no WebGL — so it stays light and renders crisply everywhere. The colour
// gradient is derived deterministically from the concept name so the same
// concept always yields the same card.

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

// Pleasant, high-contrast gradient pairs (start, mid, end) — vivid enough to
// feel collectible without clashing with either theme.
const GRADIENTS: [string, string, string][] = [
  ['#6366f1', '#8b5cf6', '#ec4899'], // indigo → violet → pink
  ['#0ea5e9', '#3b82f6', '#6366f1'], // sky → blue → indigo
  ['#10b981', '#14b8a6', '#06b6d4'], // emerald → teal → cyan
  ['#f59e0b', '#f97316', '#ef4444'], // amber → orange → red
  ['#ec4899', '#d946ef', '#a855f7'], // pink → fuchsia → purple
  ['#14b8a6', '#22c55e', '#84cc16'], // teal → green → lime
  ['#f43f5e', '#fb7185', '#f59e0b'], // rose → coral → amber
  ['#8b5cf6', '#6366f1', '#0ea5e9'], // violet → indigo → sky
]

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function CollectCard3D({ name, phase = 'idle', size = 'lg', className = '', flippable = false, back, locked = false, mastery }: CollectCard3DProps) {
  const [c0, c1, c2] = useMemo(() => GRADIENTS[hashString(name) % GRADIENTS.length], [name])
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
          <div
            className="collect-card-face-inner"
            style={{ background: `linear-gradient(135deg, ${c0} 0%, ${c1} 50%, ${c2} 100%)` }}
          >
            {/* Glossy sheen sweep */}
            <span className="collect-card-sheen" />
            {/* Holographic frame */}
            <span className="collect-card-frame" />
            {/* Concept name */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
              <span className="text-xl sm:text-2xl font-extrabold leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                {name}
              </span>
            </div>
            {/* Foil border ring, matching the Flashcards-tab treatment for this
                mastery level (or the vivid "locked" rainbow for an unopened pack) */}
            {foilLevel && <span className={`collect-card-foil-ring collect-card-foil-${foilLevel}`} />}
            {/* Sealed-in-plastic sheen, only before the card has been collected */}
            {locked && <span className="collect-card-plastic" />}
          </div>
        </div>
        {flippable && (
          <div className="collect-card-face collect-card-face-back">
            <div
              className="collect-card-face-inner"
              style={{ background: `linear-gradient(135deg, ${c0} 0%, ${c1} 50%, ${c2} 100%)` }}
            >
              <span className="collect-card-frame" />
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
