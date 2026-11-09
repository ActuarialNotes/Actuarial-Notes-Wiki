// The **source tag** every input of the tool template carries
// (docs/actuarial-tools.md §19): where its value came from — the example's
// default, the reader's own, a published figure from the Assumptions Bank, or
// another tool, or a filing with OSFI. Colour belongs to the exam a tool is in, so a tag is told by
// its mark and its words; only "Not fact checked" keeps its amber, because
// it is a warning.

import { BookOpen, CornerDownRight, Landmark } from 'lucide-react'
import type { ValueSource } from '@/lib/toolTemplate'
import { cn } from '@/lib/utils'

const TAG = 'inline-flex max-w-full items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium leading-4 whitespace-nowrap'

export function SourceTag({ source, className }: { source: ValueSource; className?: string }) {
  switch (source.kind) {
    case 'default':
      return (
        <span className={cn(TAG, 'text-muted-foreground ring-1 ring-inset ring-border', className)} data-source="default" title="The example's value, not yet chosen">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-current" aria-hidden />
          Default
        </span>
      )
    case 'yours':
      return (
        <span className={cn(TAG, 'bg-muted text-foreground', className)} data-source="yours">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden />
          Yours
        </span>
      )
    case 'published':
      return (
        <span className="inline-flex max-w-full flex-wrap items-center gap-1">
          <span className={cn(TAG, 'bg-muted text-foreground', className)} data-source="published" title="A published figure, from the Assumptions Bank">
            <BookOpen className="h-3 w-3 shrink-0" aria-hidden />
            <span className="truncate">{source.label}</span>
          </span>
          {!source.checked && <UncheckedTag />}
        </span>
      )
    case 'filed':
      return (
        <span className={cn(TAG, 'bg-muted text-foreground', className)} data-source="filed" title={source.title}>
          <Landmark className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">{source.label}</span>
        </span>
      )
    case 'linked':
      return (
        <span className={cn(TAG, 'bg-muted text-foreground', className)} data-source="linked" title={`Taken from ${source.label}`}>
          <CornerDownRight className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">{source.label}</span>
        </span>
      )
  }
}

export function UncheckedTag({ className }: { className?: string }) {
  return (
    <span className={cn(TAG, 'bg-amber-500/15 text-amber-700 dark:text-amber-400', className)} data-testid="tool-unchecked">
      Not fact checked
    </span>
  )
}
