// An objective's concepts as level squares that can be used: pointing at one
// names its concept, and pressing it opens the concept in the reader. The
// drawing is `LevelSquare`; this adds the button and the name.

import { useCallback, useState } from 'react'
import { LevelSquare } from '@/components/LevelSquare'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { levelSquareLabel, type LevelSquareSize } from '@/lib/levelSquare'
import type { MasteryState } from '@/lib/mastery'
import { cn } from '@/lib/utils'

interface Tip {
  name: string
  /** Centre of the square, and its top edge, in the viewport. */
  x: number
  y: number
}

/** Keep the name on screen: it is centred on the square until an edge is near. */
const TIP_HALF = 120
const TIP_MARGIN = 8

export function ConceptSquares({
  names, states, today, current, onConcept, size = 'md', className,
}: {
  names: readonly string[]
  states: readonly MasteryState[]
  /** Indexes of the concepts in today's session. */
  today?: ReadonlySet<number>
  /** The concept the reader is open on, lower-cased. */
  current?: string | null
  onConcept: (name: string) => void
  size?: LevelSquareSize
  className?: string
}) {
  const [tip, setTip] = useState<Tip | null>(null)
  const show = useCallback((el: HTMLElement, name: string) => {
    const r = el.getBoundingClientRect()
    setTip({ name, x: r.left + r.width / 2, y: r.top })
  }, [])
  const hide = useCallback(() => setTip(null), [])

  return (
    <>
      <ul className={cn('flex flex-wrap', size === 'lg' ? 'gap-2' : 'gap-1', className)}>
        {names.map((name, i) => {
          const state = states[i]
          const inToday = today?.has(i) ?? false
          const reading = !!current && name.toLowerCase() === current
          return (
            <li key={`${name}:${i}`} className="flex">
              <button
                type="button"
                aria-label={`${name}, ${levelSquareLabel(state, inToday)}`}
                aria-current={reading || undefined}
                data-concept-square={name}
                onClick={e => { hide(); e.currentTarget.blur(); onConcept(name) }}
                // A finger has no hover: a tap opens the concept straight away.
                onPointerEnter={e => { if (e.pointerType === 'mouse') show(e.currentTarget, name) }}
                onPointerLeave={hide}
                onFocus={e => { if (e.currentTarget.matches(':focus-visible')) show(e.currentTarget, name) }}
                onBlur={hide}
                className={cn(
                  'flex rounded-[5px] transition-transform hover:scale-125 focus-visible:scale-125 focus-visible:outline-none',
                  reading && 'scale-125',
                )}
              >
                <LevelSquare
                  state={state}
                  size={size}
                  today={inToday}
                  decorative
                  className={cn(reading && 'ring-2 ring-foreground ring-offset-2 ring-offset-ground')}
                />
              </button>
            </li>
          )
        })}
      </ul>
      {tip && (
        <OverlayPortal>
          <span
            role="tooltip"
            className="pointer-events-none fixed z-[90] max-w-[240px] -translate-x-1/2 -translate-y-full rounded-lg border-[1.5px] border-foreground bg-ground px-2.5 py-1.5 text-center text-sm font-medium text-foreground"
            style={{
              left: Math.min(Math.max(tip.x, TIP_HALF + TIP_MARGIN), window.innerWidth - TIP_HALF - TIP_MARGIN),
              top: tip.y - 8,
            }}
          >
            {tip.name}
          </span>
        </OverlayPortal>
      )}
    </>
  )
}
