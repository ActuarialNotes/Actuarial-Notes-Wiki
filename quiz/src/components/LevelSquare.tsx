import { cn } from '@/lib/utils'
import type { MasteryState } from '@/lib/mastery'
import {
  LEVEL_SQUARE_LOOK,
  LEVEL_SQUARE_ORDER,
  LEVEL_SQUARE_SIZE,
  LEVEL_SQUARE_TODAY,
  levelSquareLabel,
  levelSquaresSummary,
  type LevelSquareSize,
} from '@/lib/levelSquare'
import { MASTERY_LABEL, MASTERY_SHORT_LABEL } from '@/lib/masteryBadge'

interface LevelSquareProps {
  state: MasteryState
  size?: LevelSquareSize
  /** The concept is in today's session: a second outline, 2px off the square. */
  today?: boolean
  /**
   * Hide the square from a screen reader: beside the concept's name with its
   * level written out, or inside a grid that carries one summary.
   */
  decorative?: boolean
  className?: string
}

/**
 * The one drawing of a concept's level on a redesigned screen (style guide
 * §13.2). Use it wherever a level is shown; don't shade a square by hand.
 */
export function LevelSquare({ state, size = 'md', today = false, decorative = false, className }: LevelSquareProps) {
  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : levelSquareLabel(state, today)}
      aria-hidden={decorative || undefined}
      data-level={state}
      className={cn(
        'inline-block shrink-0 box-border',
        LEVEL_SQUARE_SIZE[size],
        LEVEL_SQUARE_LOOK[state],
        today && LEVEL_SQUARE_TODAY,
        className,
      )}
    />
  )
}

/**
 * A row of squares, read out as one sentence. `today` holds the indexes of the
 * concepts in today's session.
 */
export function LevelSquares({
  states,
  today,
  size = 'md',
  className,
}: {
  states: readonly MasteryState[]
  today?: ReadonlySet<number>
  size?: LevelSquareSize
  className?: string
}) {
  return (
    <span
      role="img"
      aria-label={levelSquaresSummary(states, today?.size ?? 0)}
      className={cn('flex flex-wrap gap-1.5', className)}
    >
      {states.map((state, i) => (
        <LevelSquare key={i} state={state} size={size} today={today?.has(i)} decorative />
      ))}
    </span>
  )
}

/** The key under a grid of squares: each state once, then today's outline. */
export function LevelSquareKey({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-4 gap-y-2.5 text-[13px] text-foreground', className)}>
      {LEVEL_SQUARE_ORDER.map((state, i) => (
        <li key={state} className="flex items-center gap-1.5">
          <LevelSquare state={state} size="sm" decorative />
          {/* "Level 1", then "2" and "3": the word is said once. */}
          <span aria-label={MASTERY_LABEL[state]}>
            {i >= 2 && state !== 'forgotten' ? MASTERY_SHORT_LABEL[state] : MASTERY_LABEL[state]}
          </span>
        </li>
      ))}
      <li className="ml-0.5 flex items-center gap-2">
        <LevelSquare state="level1" size="xs" today decorative />
        Today
      </li>
    </ul>
  )
}
