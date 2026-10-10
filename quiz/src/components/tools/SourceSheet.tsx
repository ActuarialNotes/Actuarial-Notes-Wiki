import { useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import type { ToolInput, ToolResult, ToolSpec } from '@/lib/tools'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { ToolCard } from './ToolCard'

/** What a source sheet is filling, and how it reads the source's result back. */
export interface Sourcing {
  title: string
  /** How the values are matched to the card's rows, in one line. */
  how: string
  tool: ToolSpec
  initial?: ToolInput
  apply: (result: ToolResult) => void
}

/**
 * The sheet a column's (or a scalar's) **From a tool** opens
 * (docs/actuarial-tools.md §6.6): the source tool's own card, live, filled
 * from the card being worked where it can be, over that card — Send to… run
 * backwards, so a chain can start from the tool the reader is in. **Use
 * these** reads the source's result into the column and closes.
 */
export function SourceSheet({ sourcing, onClose }: { sourcing: Sourcing; onClose: () => void }) {
  const [result, setResult] = useState<ToolResult | null>(null)
  const onResult = useCallback((r: ToolResult | null) => setResult(r), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-background/80 p-0 backdrop-blur-sm paper-scrim sm:items-start sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={sourcing.title}
        data-testid="source-sheet"
      >
        <div className="w-full max-w-2xl space-y-3 rounded-t-xl bg-background p-3 shadow-lg sm:rounded-xl sm:p-4" onClick={e => e.stopPropagation()}>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="text-base font-semibold">{sourcing.title}</h2>
              <p className="text-sm text-muted-foreground">{sourcing.how}</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <ToolCard spec={sourcing.tool} initialInput={sourcing.initial} onResult={onResult} embedded />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="h-10 rounded-lg border border-border px-4 text-sm font-medium hover:bg-accent">Cancel</button>
            <button
              type="button"
              disabled={!result}
              onClick={() => {
                if (!result) return
                sourcing.apply(result)
                onClose()
              }}
              className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
            >
              Use these
            </button>
          </div>
        </div>
      </div>
    </OverlayPortal>
  )
}
