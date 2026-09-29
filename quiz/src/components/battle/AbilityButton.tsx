// An **ability** as a button — a glyph tile, its name and its one-line effect
// (docs/actuaria-online.md §4.5, §7.2). The Hangar draws it to equip, and a
// private room's ability tray draws it to use. Four states:
//
//   ready  — can be used (or equipped) now
//   armed  — in play this round (Reinsurance: waiting for the next claim)
//   used   — spent for this battle: dashed and quiet, on both screens
//   locked — its keystone isn't at the level it asks for
//
// In the Hangar a card is also *selected* while it's equipped — Actuaria's one
// selection treatment, the exam's soft wash and muted edge (§4.2), read off the
// `examAccentStyle` of whatever scopes it; the starter, of no exam, falls back
// to the neutral accent. A locked ability that is equipped can still be taken
// off, so it stays pressable there.
//
// Neutral by design: an ability is not a player's tile, buzzer, pad or score,
// so it wears neither a player's colour nor Actuaria's signal (G6).

import { ChevronsUp, Eraser, Hourglass, Lock, ShieldCheck, Umbrella, type LucideIcon } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { LogoTile } from '@/components/LogoTile'
import type { AbilityDef } from '@/data/actuariaAbilities'
import type { AbilityId } from '@/lib/battle'
import type { AbilityUiState } from '@/lib/battleDisplay'
import { cn } from '@/lib/utils'

const ICONS: Record<AbilityId, LucideIcon> = {
  'reinsurance': Umbrella,
  'bayesian-update': Eraser,
  'double-down': ChevronsUp,
  'time-value': Hourglass,
  'immunization': ShieldCheck,
}

export function AbilityButton({
  def,
  state,
  onClick,
  disabled,
  compact = false,
  label,
  selected = false,
  className,
}: {
  def: AbilityDef
  state: AbilityUiState
  onClick?: () => void
  disabled?: boolean
  /** The tray's form: the tile and the name, the effect as its tooltip. */
  compact?: boolean
  /** A word on the state, in place of the effect ("Equipped", "Armed"). */
  label?: string
  /** The Hangar: equipped. */
  selected?: boolean
  className?: string
}) {
  const Icon = state === 'locked' ? Lock : ICONS[def.id]
  const inert = disabled || !onClick || state === 'used' || (state === 'locked' && !selected)
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={inert}
      aria-pressed={state === 'armed' || selected}
      title={compact ? `${def.name} — ${def.effect}` : undefined}
      data-testid={`ability-${def.id}`}
      data-state={state}
      data-selected={selected || undefined}
      data-sound="none"
      className={cn(
        'flex min-w-0 items-center gap-2.5 rounded-xl text-left transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        compact ? 'px-2 py-1.5' : 'w-full p-3',
        state === 'ready' && 'bg-card ring-1 ring-border enabled:hover:bg-accent/40',
        state === 'armed' && 'bg-accent ring-2 ring-foreground',
        state === 'used' && 'border border-dashed border-muted-foreground/40 text-muted-foreground',
        state === 'locked' && 'bg-muted/40 text-muted-foreground',
        selected && 'bg-[var(--exam-accent-soft,hsl(var(--accent)))] ring-1 ring-[var(--exam-accent-muted,hsl(var(--border)))]',
        inert && state === 'ready' && 'opacity-50',
        className,
      )}
    >
      <LogoTile size="sm" className={cn('bg-muted', state === 'armed' && 'bg-foreground text-background')}>
        <Icon className="h-4 w-4" aria-hidden />
      </LogoTile>
      <span className="min-w-0 flex-1">
        <span className={cn('block font-medium', compact ? 'text-xs leading-tight' : 'truncate text-sm', state === 'used' && 'line-through')}>{def.name}</span>
        {!compact && <span className="block text-xs text-muted-foreground">{label ?? def.effect}</span>}
        {compact && label && <span className="block text-[10px] text-muted-foreground">{label}</span>}
      </span>
      {/* aria-pressed says it; the mark shows it. */}
      {selected && <CheckMark className="h-4 w-4" />}
    </button>
  )
}
