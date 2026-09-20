// The app's one checkmark.
//
// A check means the same thing everywhere it is drawn — *this is done*, or
// *this is picked* — so it is one shape: a filled disc with the tick cut out
// of it. The tick is genuinely void, not a white glyph painted on top: the
// disc is masked, so whatever the badge sits on shows through the stroke. That
// is what lets the same mark ride a card, a tinted row, a photo or a coloured
// pill without carrying a background of its own, and it is why this is an
// inline SVG rather than lucide's `Check` / `CheckCircle2` (an outline mark
// whose tick is drawn, not subtracted).
//
// Colour comes from `currentColor`, so a surface sets it with a text class.
// The default is the semantic "done" green of docs/style-guide.md §4.1; the
// mark is deliberately *not* themed per surface beyond that, so a check never
// has to be decoded.
//
// Sizing is the caller's: pass `h-4 w-4` (row), `h-5 w-5` (group row) or
// `h-7 w-7` (card corner). See `CompletionCornerBadge` for the corner overlay.

import { useId } from 'react'
import { cn } from '@/lib/utils'

export interface CheckMarkProps {
  /** Size + colour classes. Colour defaults to the "done" green. */
  className?: string
  /** Thickness of the cut-out tick, in the 24-unit viewBox. */
  strokeWidth?: number
  /** Accessible name. Omitted — the default — renders the mark decorative. */
  label?: string
}

export function CheckMark({ className, strokeWidth = 2.75, label }: CheckMarkProps) {
  // One mask per instance: ids are document-global, and two marks with the
  // same id would share whichever definition rendered last.
  const maskId = `checkmark-void-${useId().replace(/:/g, '')}`
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('shrink-0 text-green-500', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        {/* White keeps the disc, black cuts the tick back out of it. */}
        <circle cx="12" cy="12" r="12" fill="white" />
        <path
          d="M6.6 12.4 L10.3 16.1 L17.4 8.5"
          fill="none"
          stroke="black"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <circle cx="12" cy="12" r="12" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}

const CORNER_SIZES = {
  /** Nav-tab / icon overlay. */
  sm: 'h-3.5 w-3.5',
  /** Card corner. */
  md: 'h-5 w-5',
  /** Full-width primary button corner. */
  lg: 'h-6 w-6',
} as const

export type CheckMarkCornerSize = keyof typeof CORNER_SIZES

/**
 * The corner overlay form — the mark a card, tile or button wears at its
 * top-right once the thing it stands for is finished. Absolutely positioned,
 * so the host needs `relative`; nudge it with `className` (e.g. `-top-1
 * -right-1.5`). The sizes are the same three `TodayQuizCornerBadge` uses, so
 * a count and a check occupy the same corner at the same weight.
 *
 * The ring is drawn on the wrapper rather than the mark, so it separates the
 * disc from the surface behind without filling the tick back in.
 */
export function CompletionCornerBadge({
  size = 'md',
  label,
  className,
}: {
  size?: CheckMarkCornerSize
  label: string
  className?: string
}) {
  return (
    <span
      className={cn('absolute -top-1.5 -right-1.5 inline-flex rounded-full ring-2 ring-background', className)}
      title={label}
    >
      <CheckMark className={cn(CORNER_SIZES[size], 'block')} label={label} />
    </span>
  )
}
