// One **landmark** in a list: its name (the in-world one over the concept's own,
// for the concepts that have one), its Credibility, and a chip when there is
// something to say — decayed, about to, or cleared (docs/actuaria-online.md
// §6.3–6.6). The name opens the concept in the popup, the same one the study
// guide reads it in; nothing about a concept is gated here (G9).

import type { ReactNode } from 'react'
import { StatusChip } from '@/components/actuaria/StatusChip'
import { formatZ, landmarkZ, type DecayStep } from '@/lib/actuaria/credibility'
import { landmarkChip } from '@/lib/actuaria/landmarks'
import type { MasteryState } from '@/lib/mastery'
import { MASTERY_LABEL, MASTERY_TEXT } from '@/lib/masteryBadge'
import { cn } from '@/lib/utils'

export function LandmarkRow({
  name,
  conceptName,
  state,
  decay,
  onOpen,
  trailing,
  className,
}: {
  /** What the row is titled — the in-world name when there is one. */
  name: string
  /** The concept's own name, shown under an in-world name. */
  conceptName?: string | null
  state: MasteryState
  decay: DecayStep | null
  onOpen: () => void
  trailing?: ReactNode
  className?: string
}) {
  const chip = landmarkChip({ state, decay })
  return (
    <li className={cn('flex min-w-0 items-center gap-3 py-2', className)}>
      <button
        type="button"
        onClick={onOpen}
        className="min-w-0 flex-1 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="block truncate text-sm font-medium">
          {name}
        </span>
        {conceptName && conceptName !== name && (
          <span className="block truncate text-xs text-muted-foreground">{conceptName}</span>
        )}
      </button>
      {chip && <StatusChip variant={chip.variant}>{chip.label}</StatusChip>}
      <span
        className={cn('w-12 shrink-0 text-right font-mono text-xs tabular-nums', MASTERY_TEXT[state])}
        title={`Credibility — ${MASTERY_LABEL[state]}`}
      >
        Z {formatZ(landmarkZ(state))}
      </span>
      {trailing}
    </li>
  )
}
