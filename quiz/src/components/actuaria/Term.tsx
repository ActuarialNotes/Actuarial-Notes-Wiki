// An **in-world word** that says what it means. The first time a term from the
// lexicon appears on a screen it carries the plain app term as its tooltip and
// its `aria-description` (docs/actuaria-online.md §3): a player who reads
// "Coverage" can find out it is their streak without leaving the screen.

import type { ReactNode } from 'react'
import { LEXICON, type LexiconId } from '@/lib/actuaria/lexicon'
import { cn } from '@/lib/utils'

export function Term({ id, children, className }: { id: LexiconId; children?: ReactNode; className?: string }) {
  const entry = LEXICON[id]
  return (
    <span title={entry.plain} aria-description={entry.plain} className={cn('cursor-help', className)}>
      {children ?? entry.term}
    </span>
  )
}
