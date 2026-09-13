import { useEffect, useState } from 'react'
import type { MasteryState } from '@/lib/mastery'
import { isKeystone } from '@/lib/keystone'
import { flashcardFoilClass } from '@/lib/flashcardFoil'
import { KeystoneIcon } from '@/components/KeystoneName'

// A flat flashcard showing a concept name, styled identically to a collected
// tile in the Flashcards gallery (the same .flashcard-collected foil ladder,
// via `lib/flashcardFoil.ts`) — no 3D perspective or tilt. A correct
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
  // A locked card always shows the top of the ladder — the still-sealed pack
  // should look like the prize. Otherwise it wears its concept's real level.
  const foilState: MasteryState = locked ? 'level3' : mastery ?? 'new'
  const keystone = isKeystone(name)
  const [side, setSide] = useState<'front' | 'back'>('front')

  // A new concept always opens showing its front, and so does a card that stops
  // being flippable — the collect ceremony switches flipping off, which unmounts
  // the back pane, so a card left flipped would spin and dissolve completely
  // blank. The derived side below is what covers the frame the ceremony starts
  // on (this effect only runs after it); the reset keeps the state honest if
  // flipping is switched back on.
  useEffect(() => { setSide('front') }, [name, flippable])

  // Never rest on a back that isn't rendered.
  const shownSide = flippable ? side : 'front'

  const dims = size === 'lg' ? 'w-52 h-72 sm:w-60 sm:h-80' : 'w-36 h-48'
  // While the collection celebration is running, the accelerating snake ring
  // below carries the "rainbow border" effect on its own — the resting foil
  // sheen is dropped so the two don't visually compete.
  const sheenClass = phase === 'spin' ? '' : flashcardFoilClass(true, foilState)
  const phaseClass = phase === 'won' ? 'collect-card-won' : ''

  // A control rendered inside the card — the back's "Read the concept" button —
  // is its own action: a click, or an Enter/Space on it while focused, must not
  // also flip the card out from under what it opened.
  function fromInnerControl(e: React.SyntheticEvent): boolean {
    const el = e.target as HTMLElement | null
    return !!el?.closest('button, a, input, select, textarea')
  }

  function toggleSide() {
    if (!flippable) return
    setSide(s => (s === 'front' ? 'back' : 'front'))
  }

  return (
    <div
      className={`relative shrink-0 rounded-xl bg-card text-card-foreground ${dims} ${sheenClass} ${phaseClass} ${className} ${flippable ? 'cursor-pointer' : ''}`}
      onClick={e => { if (!fromInnerControl(e)) toggleSide() }}
      role={flippable ? 'button' : undefined}
      tabIndex={flippable ? 0 : undefined}
      aria-label={flippable ? `${name} flashcard, tap to flip` : undefined}
      aria-hidden={flippable ? undefined : true}
      onKeyDown={flippable ? e => {
        if (fromInnerControl(e)) return
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSide() }
      } : undefined}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        {/* Front — concept name, styled like the gallery tile */}
        <div
          data-card-face="front"
          aria-hidden={shownSide === 'back' || undefined}
          className={`collect-card-pane absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center ${shownSide === 'back' ? 'collect-card-pane--hidden opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          {/* Keystone cards are worth more than the card you're collecting —
              say so on the card itself. The chip is the whole signal: no gold
              border (the edge already belongs to the foil/rarity material) and
              no gold wash across the face, which tinted the card's own colour
              gold and left the concept name reading as a label on brass. */}
          {keystone && (
            <span className="keystone-ring inline-flex items-center gap-1 rounded-full px-2 py-0.5">
              <KeystoneIcon className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-200">
                Keystone
              </span>
            </span>
          )}
          <span className="text-xl sm:text-2xl font-bold leading-tight text-card-foreground">
            {name}
          </span>
        </div>
        {/* Back — the concept's definition, revealed by tapping */}
        {flippable && (
          <div
            data-card-face="back"
            aria-hidden={shownSide === 'front' || undefined}
            className={`collect-card-pane collect-card-back-scroll absolute inset-0 overflow-y-auto px-4 py-5 pointer-events-auto ${shownSide === 'front' ? 'collect-card-pane--hidden opacity-0 pointer-events-none' : 'opacity-100'}`}
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
