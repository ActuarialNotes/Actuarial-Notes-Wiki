// A **status chip** — the site's Beta-chip pattern (tinted fill, coloured
// text, sentence case) in the variants an in-world screen needs
// (docs/actuaria-online.md §4.5). Each variant keeps the hue its meaning has
// everywhere else in the app (style guide §4.1): green is cleared, amber is
// decaying, and only `live` — chrome, not a verdict — takes the signal.

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type StatusChipVariant = 'live' | 'cleared' | 'decaying' | 'locked' | 'beta'

const TONE: Record<StatusChipVariant, string> = {
  live: 'bg-actuaria-signal-soft text-actuaria-signal',
  cleared: 'bg-green-500/15 text-green-700 dark:text-green-400',
  decaying: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  locked: 'bg-muted text-muted-foreground',
  beta: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
}

export function StatusChip({
  variant,
  children,
  size = 'md',
  className,
  title,
}: {
  variant: StatusChipVariant
  children: ReactNode
  /** `sm` fits a sidebar row. */
  size?: 'sm' | 'md'
  className?: string
  title?: string
}) {
  return (
    <span
      title={title}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full font-medium leading-none',
        size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-1.5 py-0.5 text-[10px] font-semibold',
        TONE[variant],
        className,
      )}
    >
      {variant === 'live' && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-actuaria-signal" />}
      {children}
    </span>
  )
}
