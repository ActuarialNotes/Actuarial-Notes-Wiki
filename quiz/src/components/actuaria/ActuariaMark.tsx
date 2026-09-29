// The **Actuaria mark** — a planet with a tilted orbit ring and a satellite,
// an echo of the round Actuarial Notes logo (docs/actuaria-online.md §4.4).
//
// The geometry is exact and authored, not tuned by eye here: the back of the
// ring, the planet, a surface-coloured gap that lifts the front of the ring off
// the planet, the front of the ring, and the satellite. At 32px and under the
// satellite goes and the strokes thicken, so the mark still reads as a planet
// and a ring at sidebar size. Decorative: whatever carries it names it.

import { cn } from '@/lib/utils'

const SIGNAL = 'hsl(var(--actuaria-signal))'
const FOREGROUND = 'hsl(var(--foreground))'

/** The smallest the mark may be drawn. */
export const ACTUARIA_MARK_MIN = 24
/** At or under this edge the small variant is drawn. */
const SMALL_EDGE = 32

export type ActuariaMarkSurface = 'background' | 'card'

export function ActuariaMark({
  size = 48,
  tone = 'default',
  surface = 'background',
  className,
}: {
  /** Edge length in px. Never below `ACTUARIA_MARK_MIN`. */
  size?: number
  /** `mono` draws everything in the foreground — one colour, for a stamp or a print. */
  tone?: 'default' | 'mono'
  /** What the mark sits on — the gap is painted in it. */
  surface?: ActuariaMarkSurface
  className?: string
}) {
  const edge = Math.max(ACTUARIA_MARK_MIN, size)
  const small = edge <= SMALL_EDGE
  const ring = tone === 'mono' ? FOREGROUND : SIGNAL
  const gap = `hsl(var(--${surface}))`
  const ringWidth = small ? 4 : 2.5

  return (
    <svg
      viewBox="0 0 64 64"
      width={edge}
      height={edge}
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      <ellipse cx="32" cy="32" rx="29" ry="9" transform="rotate(-18 32 32)" fill="none" stroke={ring} strokeWidth={ringWidth} />
      <circle cx="32" cy="32" r={small ? 15 : 14} fill={FOREGROUND} />
      <path d="M6.89 36.5 A29 9 0 0 0 57.11 36.5" transform="rotate(-18 32 32)" fill="none" stroke={gap} strokeWidth={small ? 9 : 7} />
      <path d="M3 32 A29 9 0 0 0 61 32" transform="rotate(-18 32 32)" fill="none" stroke={ring} strokeWidth={ringWidth} />
      {!small && <circle cx="58.9" cy="26.5" r="3.6" fill={ring} stroke={gap} strokeWidth="2" />}
    </svg>
  )
}

/**
 * "ACTUARIA" over "ONLINE": the display face over the mono stack, split by a
 * signal rule. `markSize` adds the mark beside it — the horizontal lockup, a
 * gap of about a third of the mark between them.
 */
export function ActuariaWordmark({
  markSize,
  size = 'md',
  surface = 'background',
  className,
}: {
  markSize?: number
  size?: 'sm' | 'md' | 'lg'
  surface?: ActuariaMarkSurface
  className?: string
}) {
  const type = {
    sm: { word: 'text-base', online: 'text-[0.5rem]', rule: 'h-px' },
    md: { word: 'text-2xl', online: 'text-[0.625rem]', rule: 'h-px' },
    lg: { word: 'text-5xl sm:text-6xl', online: 'text-xs sm:text-sm', rule: 'h-0.5' },
  }[size]

  return (
    <span
      className={cn('inline-flex items-center', className)}
      style={markSize ? { gap: Math.round(markSize * 0.35) } : undefined}
    >
      {markSize ? <ActuariaMark size={markSize} surface={surface} /> : null}
      <span className="inline-flex flex-col items-stretch leading-none">
        <span className={cn('font-actuaria font-bold uppercase tracking-[0.05em]', type.word)}>Actuaria</span>
        <span aria-hidden="true" className={cn('my-1 w-full bg-actuaria-signal', type.rule)} />
        <span className={cn('font-mono uppercase tracking-[0.7em] text-actuaria-signal', type.online)}>Online</span>
      </span>
    </span>
  )
}
