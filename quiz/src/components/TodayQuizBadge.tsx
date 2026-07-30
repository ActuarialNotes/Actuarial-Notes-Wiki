// Shared visual language for the "questions left in today's study plan" badge.
//
// The badge answers one question — "how many questions until today's plan is
// done?" — so it has to look the same everywhere a quiz that would accomplish
// those questions can be started: the Quiz nav tab (BottomNav), the Sidebar's
// Quiz row and per-exam pill menu, the Quiz tab's exam cards and Start button,
// and the Dashboard's "Start Today's Quiz". The count itself comes from
// hooks/useTodayQuizCount.ts (total, or per exam via `byExam`).
//
// Orange, matching the streak flame's urgency colour and distinct from the
// primary-coloured Flashcards count.

import { cn } from '@/lib/utils'

const CORNER_SIZES = {
  /** Nav-tab / icon overlay. */
  sm: 'h-3.5 min-w-[0.875rem] px-[3px] text-[9px]',
  /** Card corner. */
  md: 'h-5 min-w-[1.25rem] px-1 text-[11px] shadow ring-2 ring-background',
  /** Full-width primary button corner. */
  lg: 'h-6 min-w-[1.5rem] px-1.5 text-xs shadow ring-2 ring-background',
} as const

export function todayQuizBadgeLabel(count: number): string {
  return `${count} question${count === 1 ? '' : 's'} left in today's study plan`
}

/**
 * Corner overlay variant — absolutely positioned, so the parent needs
 * `relative`. Pass the offsets through `className` (e.g. `-top-1 -right-2`);
 * defaults to the card/button corner used by the Dashboard button.
 * Renders nothing at zero so surfaces stay clean when there's nothing left.
 */
export function TodayQuizCornerBadge({
  count,
  size = 'md',
  className,
}: {
  count: number
  size?: keyof typeof CORNER_SIZES
  className?: string
}) {
  if (count <= 0) return null
  const label = todayQuizBadgeLabel(count)
  return (
    <span
      className={cn(
        'absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full bg-orange-500 font-bold leading-none text-white tabular-nums',
        CORNER_SIZES[size],
        className,
      )}
      aria-label={label}
      title={label}
    >
      {count}
    </span>
  )
}

/**
 * Inline variant — a compact pill for a nav row's badge slot or beside a menu
 * item's label, where there's no icon to overlay.
 */
export function TodayQuizNavBadge({ count, className }: { count: number; className?: string }) {
  if (count <= 0) return null
  const label = todayQuizBadgeLabel(count)
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white tabular-nums',
        className,
      )}
      aria-label={label}
      title={label}
    >
      {count}
    </span>
  )
}
