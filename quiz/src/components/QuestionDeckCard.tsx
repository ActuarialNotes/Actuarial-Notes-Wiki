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
  /** How many of `available` the learner has never attempted. */
  newCount?: number
  /**
   * Whether attempt history is known at all. Server-side only, so a signed-out
   * visitor gets no "new to you" line rather than a false "all new" — the same
   * rule `QuestionAttemptBadge` follows.
   */
  attemptsTracked?: boolean
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
  newCount,
  attemptsTracked = false,
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

  const subline: string[] = []
  if (attemptsTracked && newCount !== undefined) {
    subline.push(newCount === 0 ? 'all attempted before' : `${newCount} new to you`)
  }

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={onShuffle}
        disabled={disabled}
        data-sound="shuffle"
        onAnimationEnd={() => setRiffling(false)}
        aria-label={
          disabled
            ? `${available} question${available !== 1 ? 's' : ''} available`
            : `Shuffle the ${selected} question${selected !== 1 ? 's' : ''} drawn from ${available} available`
        }
        className={[
          // Full width, like every other control in the action bar it sits in —
          // a centred max-w-xs card left the bar looking misaligned.
          'group relative flex w-full items-center gap-3 rounded-xl bg-card px-4 py-3 text-left',
          'transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          disabled
            ? 'opacity-70'
            : 'shadow-sm hover:shadow-md active:scale-[0.98] motion-reduce:active:scale-100',
          riffling ? 'deck-card-shuffle' : '',
        ].join(' ')}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold leading-none tabular-nums">{available}</span>
            <span className="text-sm text-muted-foreground">
              question{available !== 1 ? 's' : ''}
            </span>
          </div>
          {/* What the big number doesn't say: how much of the pool is unseen —
              the number that decides whether the draw is worth taking. */}
          {subline.length > 0 && (
            <span className="text-xs text-muted-foreground">{subline.join(' · ')}</span>
          )}
        </div>

        {/* After a tap the shuffle icon gives way to a worded confirmation —
            text, not just motion, so a reduced-motion or screen-reader user
            still gets told the shuffle landed. The slot keeps the icon's
            height through the swap so the card can't change size. */}
        <span
          aria-live="polite"
          className="flex h-9 shrink-0 items-center"
        >
          {justShuffled ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
              Shuffled
              <Check className="h-3.5 w-3.5 shrink-0" />
            </span>
          ) : (
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:text-foreground"
            >
              <Shuffle className="h-4 w-4" />
            </span>
          )}
        </span>
      </button>
    </div>
  )
}
