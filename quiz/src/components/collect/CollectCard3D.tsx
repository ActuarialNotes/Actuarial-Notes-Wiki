import { useEffect, useState } from 'react'
import type { MasteryState } from '@/lib/mastery'

// A flat flashcard showing a concept name, styled identically to a collected
// tile in the Flashcards gallery (the same .flashcard-collected /
// .flashcard-sheen-l2/l3 treatment) — no 3D perspective or tilt. A correct
// answer triggers a rainbow "snake" that chases around the border, spinning
// faster and faster, before the card dissolves into the collect flash.

interface CollectCard3DProps {
  name: string
  // 'idle' rests flat; 'spin' shows the accelerating rainbow border used by
  // the collection animation; 'won' settles in with a quick pop-in.
  phase?: 'idle' | 'spin' | 'won'
  size?: 'md' | 'lg'
  className?: string
  // When set, the card can be flipped by clicking/tapping it to reveal `back`
  // — a cross-fade between panes, not a 3D flip.
  flippable?: boolean
  back?: React.ReactNode
  // Not yet collected — always shown with the vivid level-3 gallery
  // treatment, so the still-locked card reads as an exciting pack about to
  // open.
  locked?: boolean
  // Once collected, mirrors the Flashcards-tab foil-ring treatment for this
  // concept's real mastery level, so this card matches its gallery tile.
  // Ignored when `locked`.
  mastery?: MasteryState
}

export function CollectCard3D({ name, phase = 'idle', size = 'lg', className = '', flippable = false, back, locked = false, mastery }: CollectCard3DProps) {
  const foilLevel = locked ? 'l3' : mastery === 'level3' ? 'l3' : mastery === 'level2' ? 'l2' : null
  const [side, setSide] = useState<'front' | 'back'>('front')

  // A new concept always opens showing its front.
  useEffect(() => { setSide('front') }, [name])

  const dims = size === 'lg' ? 'w-52 h-72 sm:w-60 sm:h-80' : 'w-36 h-48'
  // While the collection celebration is running, the accelerating snake ring
  // below carries the "rainbow border" effect on its own — the resting foil
  // sheen is dropped so the two don't visually compete.
  const sheenClass = phase === 'spin' ? '' : foilLevel === 'l3' ? 'flashcard-collected flashcard-sheen-l3' : foilLevel === 'l2' ? 'flashcard-collected flashcard-sheen-l2' : ''
  const phaseClass = phase === 'won' ? 'collect-card-won' : ''

  function handleClick() {
    if (!flippable) return
    setSide(s => (s === 'front' ? 'back' : 'front'))
  }

  return (
    <div
      className={`relative shrink-0 rounded-xl bg-card text-card-foreground ${dims} ${sheenClass} ${phaseClass} ${className} ${flippable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      role={flippable ? 'button' : undefined}
      tabIndex={flippable ? 0 : undefined}
      aria-label={flippable ? `${name} flashcard, tap to flip` : undefined}
      aria-hidden={flippable ? undefined : true}
      onKeyDown={flippable ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } } : undefined}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        {/* Front — concept name, styled like the gallery tile */}
        <div
          className={`collect-card-pane absolute inset-0 flex flex-col items-center justify-center px-4 text-center ${side === 'back' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <span className="text-xl sm:text-2xl font-bold leading-tight text-card-foreground">
            {name}
          </span>
        </div>
        {/* Back — the concept's definition, revealed by tapping */}
        {flippable && (
          <div
            className={`collect-card-pane collect-card-back-scroll absolute inset-0 overflow-y-auto px-4 py-5 pointer-events-auto ${side === 'front' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <div className="flex min-h-full flex-col items-center justify-center text-center">
              {back}
            </div>
          </div>
        )}
      </div>
      {/* Rainbow border "snake" — only during the collection celebration */}
      {phase === 'spin' && <span className="collect-card-snake-ring" />}
    </div>
  )
}
