import { cn } from '@/lib/utils'
import type { MasteryState } from '@/lib/mastery'
import {
  MASTERY_BADGE_SIZE,
  MASTERY_LABEL,
  MASTERY_SHORT_LABEL,
  MASTERY_TINT,
  type MasteryBadgeSize,
} from '@/lib/masteryBadge'

interface MasteryBadgeProps {
  state: MasteryState
  size?: MasteryBadgeSize
  /** Show the level number alone ("1", "F") instead of the full label. */
  compact?: boolean
  className?: string
}

/**
 * The chip that prints a concept's mastery state. This is the single badge for
 * every surface that lists concepts — add it to a new list rather than writing
 * another local palette (see `lib/masteryBadge.ts` for why).
 *
 * A compact badge is a bare number on screen but keeps the full label as its
 * accessible name, so "1" is never what a screen reader reads out.
 */
export function MasteryBadge({ state, size = 'xs', compact = false, className }: MasteryBadgeProps) {
  const label = MASTERY_LABEL[state]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full font-semibold tabular-nums',
        MASTERY_BADGE_SIZE[size],
        MASTERY_TINT[state],
        className,
      )}
      title={compact ? label : undefined}
      aria-label={compact ? label : undefined}
    >
      {compact ? MASTERY_SHORT_LABEL[state] : label}
    </span>
  )
}
