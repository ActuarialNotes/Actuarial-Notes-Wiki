import { useEffect, useState } from 'react'
import { Check, Shuffle } from 'lucide-react'

// The deck on the quiz setup screen: one large card standing in for the pool of
// questions the current selection can draw from. Tapping it re-draws which
// questions the quiz will pull, and confirms the shuffle in place.

interface QuestionDeckCardProps {
  /** Questions available under the current filters — the number on the card. */
  available: number
  /** Questions the configured quiz will actually pull. */
  selected: number
  onShuffle: () => void
  /** Bumped on every shuffle; replays the riffle even on back-to-back taps. */
  shuffleTick: number
  /** True for a beat after a shuffle, while the card confirms it happened. */
  justShuffled: boolean
  /** Nothing to draw from, or the draw is the whole pool and can't change. */
  disabled?: boolean
}

export function QuestionDeckCard({
  available,
  selected,
  onShuffle,
  shuffleTick,
  justShuffled,
  disabled = false,
}: QuestionDeckCardProps) {
  // Drop the animation class and re-add it next frame so a second tap restarts
  // the riffle instead of landing on an already-running animation.
  const [riffling, setRiffling] = useState(false)
  useEffect(() => {
    if (shuffleTick === 0) return
    setRiffling(false)
    const id = requestAnimationFrame(() => setRiffling(true))
    return () => cancelAnimationFrame(id)
  }, [shuffleTick])

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={onShuffle}
        disabled={disabled}
        onAnimationEnd={() => setRiffling(false)}
        aria-label={
          disabled
            ? `${available} question${available !== 1 ? 's' : ''} available`
            : `Shuffle the ${selected} question${selected !== 1 ? 's' : ''} drawn from ${available} available`
        }
        className={[
          'group relative flex w-full max-w-xs items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 text-left',
          'transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          disabled
            ? 'opacity-70'
            : 'shadow-sm hover:border-foreground/25 hover:shadow-md active:scale-[0.98] motion-reduce:active:scale-100',
          riffling ? 'deck-card-shuffle' : '',
        ].join(' ')}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold leading-none tabular-nums">{available}</span>
            <span className="text-sm text-muted-foreground">
              question{available !== 1 ? 's' : ''} available
            </span>
          </div>
          {/* The confirmation is text, not just motion, so a reduced-motion or
              screen-reader user still gets told the shuffle landed. */}
          <p className="mt-1 text-xs text-muted-foreground" aria-live="polite">
            {justShuffled ? (
              <span className="inline-flex items-center gap-1 font-medium text-green-600 dark:text-green-400">
                <Check className="h-3.5 w-3.5 shrink-0" />
                Shuffled — a new {selected} drawn
              </span>
            ) : disabled ? (
              <>Drawing all {selected}</>
            ) : (
              <>
                Drawing <span className="font-medium tabular-nums text-foreground">{selected}</span>
                {' · tap to shuffle'}
              </>
            )}
          </p>
        </div>

        <span
          aria-hidden
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors',
            justShuffled
              ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
              : 'bg-muted text-muted-foreground group-hover:text-foreground',
          ].join(' ')}
        >
          {justShuffled ? <Check className="h-4 w-4" /> : <Shuffle className="h-4 w-4" />}
        </span>
      </button>
    </div>
  )
}
