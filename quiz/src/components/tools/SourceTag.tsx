// The **from chip** every input of the tool template carries
// (docs/tool-template-v2.md §3.4): where its value came from, in one shape for
// every origin — `● Default`, `● Yours`, `▤ AIRB, Alberta` (with *Not fact
// checked* in amber beside it until it is) and `↳ Trend Fit`. Colour belongs
// to the exam a tool is in, so a chip is told by its mark and its words; only
// "Not fact checked" keeps its amber, because it is a warning.
//
// Given `onClick`, the chip is a button: a published or linked chip opens its
// explanation in place, Default and Yours open the edit sheet.

import { BookOpen, ChevronDown, CornerDownRight } from 'lucide-react'
import type { ValueSource } from '@/lib/toolTemplate'
import { cn } from '@/lib/utils'

const TAG = 'inline-flex max-w-full items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium leading-4 whitespace-nowrap'
const CHIP = `${TAG} ring-1 ring-inset ring-border`

function ChipFace({ source }: { source: ValueSource }) {
  switch (source.kind) {
    case 'default':
      return <><span className="h-1.5 w-1.5 shrink-0 rounded-full border border-current" aria-hidden />Default</>
    case 'yours':
      return <><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden />Yours</>
    case 'published':
      return <><BookOpen className="h-3 w-3 shrink-0" aria-hidden /><span className="truncate">{source.label}</span></>
    case 'linked':
      return <><CornerDownRight className="h-3 w-3 shrink-0" aria-hidden /><span className="truncate">{source.label}</span></>
  }
}

const TITLES: Record<ValueSource['kind'], string> = {
  default: "The example's value, not yet chosen",
  yours: 'Your own value',
  published: 'A published figure, from the Assumptions Bank',
  linked: 'Taken from another tool',
}

export function SourceTag({ source, className, onClick, open }: {
  source: ValueSource
  className?: string
  /** Makes the chip a button. */
  onClick?: () => void
  /** For a chip that opens its explanation in place: whether it is open. */
  open?: boolean
}) {
  const muted = source.kind === 'default'
  const cls = cn(CHIP, muted ? 'text-muted-foreground' : 'text-foreground', className)
  const chip = onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={cn(cls, 'transition-colors hover:bg-muted')}
      data-source={source.kind}
      title={TITLES[source.kind]}
      aria-expanded={open}
    >
      <ChipFace source={source} />
      {open !== undefined && <ChevronDown className={cn('h-3 w-3 shrink-0 transition-transform', open && 'rotate-180')} aria-hidden />}
    </button>
  ) : (
    <span className={cls} data-source={source.kind} title={TITLES[source.kind]}>
      <ChipFace source={source} />
    </span>
  )
  if (source.kind !== 'published' || source.checked) return chip
  return (
    <span className="inline-flex max-w-full flex-wrap items-center gap-1">
      {chip}
      <UncheckedTag />
    </span>
  )
}

export function UncheckedTag({ className }: { className?: string }) {
  return (
    <span className={cn(TAG, 'bg-amber-500/15 text-amber-700 dark:text-amber-400', className)} data-testid="tool-unchecked">
      Not fact checked
    </span>
  )
}
