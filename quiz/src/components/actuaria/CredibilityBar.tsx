// **Credibility**, drawn: a bar (or a ring) filled by the mastery ladder's own
// colours, with its Z as a mono readout (docs/actuaria-online.md §4.5).
//
// The fill is never the Actuaria signal: Credibility *is* mastery, so it keeps
// mastery's green ladder — gold for a keystone — from `lib/masteryFill.ts`
// (style guide §4.1, §4.4). A Credibility bar measures something earned, so it
// is a readout and never takes a scrub handler (style guide §7.5).

import { masteryFill } from '@/lib/masteryFill'
import type { MasteryState } from '@/lib/mastery'
import { SECTOR_FILL, formatZ } from '@/lib/actuaria/credibility'
import { cn } from '@/lib/utils'

export function CredibilityBar({
  z,
  label,
  state,
  keystone = false,
  fill,
  size = 'md',
  showLabel = true,
  className,
  ariaLabel,
}: {
  /** 0–1. */
  z: number
  /** The readout, when it isn't `formatZ(z)` (a sector prints its rounded %). */
  label?: string
  /** A landmark's mastery state — picks the fill off the ladder. */
  state?: MasteryState
  keystone?: boolean
  /** An explicit fill, for a sector. Defaults to the ladder's (state) or green. */
  fill?: string
  size?: 'sm' | 'md'
  showLabel?: boolean
  className?: string
  /** What the bar measures, for assistive tech — "Sector P Credibility". */
  ariaLabel?: string
}) {
  const value = Math.max(0, Math.min(1, z))
  const readout = label ?? formatZ(value)
  const color = fill ?? (state ? masteryFill(state, keystone) : SECTOR_FILL)

  return (
    <div className={cn('flex min-w-0 items-center gap-2', className)}>
      <div
        role="progressbar"
        aria-label={ariaLabel ?? 'Credibility'}
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={Number(readout)}
        aria-valuetext={`Z ${readout}`}
        className={cn('relative min-w-0 flex-1 overflow-hidden rounded-full bg-muted', size === 'md' ? 'h-2' : 'h-1.5')}
      >
        <div className="h-full rounded-full" style={{ width: `${value * 100}%`, background: color }} />
      </div>
      {showLabel && (
        <span className={cn('shrink-0 font-mono tabular-nums', size === 'md' ? 'text-xs' : 'text-[11px]', 'text-muted-foreground')}>
          Z <span className="text-foreground">{readout}</span>
        </span>
      )}
    </div>
  )
}

/** The same readout as a ring, for a tile or a player card. */
export function CredibilityRing({
  z,
  label,
  size = 44,
  stroke = 4,
  fill = SECTOR_FILL,
  className,
  ariaLabel,
}: {
  z: number
  label?: string
  size?: number
  stroke?: number
  fill?: string
  className?: string
  ariaLabel?: string
}) {
  const value = Math.max(0, Math.min(1, z))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const readout = label ?? formatZ(value)
  return (
    <span
      role="img"
      aria-label={`${ariaLabel ?? 'Credibility'}: Z ${readout}`}
      className={cn('relative inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={fill}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * value} ${c}`}
        />
      </svg>
      <span aria-hidden="true" className="absolute font-mono text-[10px] tabular-nums">{readout}</span>
    </span>
  )
}
