import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FACT_CHECK_TONE_CLASSES } from '@/lib/factCheckTone'
import type { FactCheckTone } from '@/lib/verification'

/**
 * One part of a **Fact Check** record — Open, Fixed, Notes, Checked against — as
 * a card that folds.
 *
 * The record unfolds under the verdict tile, and it used to be four small-caps
 * headings with a chevron the size of the letters; a reader had to find the
 * control before they could use it, and the parts ran into one another. Each is
 * now a card in the verdict tile's own shape — a tinted mark, a name, and a
 * chevron as big as the tile's — so the record reads as a stack of the same
 * object, each one saying what it holds and how many before it is opened.
 *
 * The header is the whole target. The count sits beside the name rather than
 * under it, so a folded stack still reads as a summary: *Open 2, Fixed 11,
 * Notes 2*. `detail` is the one supporting line, and only for what the name and
 * count don't already say (the open findings' severities).
 */
interface FactCheckSectionProps {
  /** What the section holds — "Open", "Fixed", "Notes", "Checked against". */
  title: string
  count: number
  /** The mark in the tile, sized by the caller (`h-4 w-4`, or `h-5 w-5` for a CheckMark). */
  icon: ReactNode
  /** The tile's tint, on the feature's one palette. */
  tone: FactCheckTone
  detail?: string | null
  defaultOpen?: boolean
  children: ReactNode
}

export function FactCheckSection({
  title,
  count,
  icon,
  tone,
  detail,
  defaultOpen = false,
  children,
}: FactCheckSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  // A row of the record's one grouped surface (`FactCheckPanel`), the shape
  // every info popup's rows share (`InfoSheet`).
  return (
    <section>
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          data-sound="tap"
          className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm font-normal transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
        >
          <span
            className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-md [&>svg]:h-3.5 [&>svg]:w-3.5',
              FACT_CHECK_TONE_CLASSES[tone])}
          >
            {icon}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block leading-tight">{title}</span>
            {detail && <span className="mt-0.5 block text-xs text-muted-foreground">{detail}</span>}
          </span>
          <span className="shrink-0 tabular-nums text-muted-foreground">{count}</span>
          <ChevronDown
            className={cn('h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
            aria-hidden
          />
        </button>
      </h3>
      {open && <div className="border-t border-border/60">{children}</div>}
    </section>
  )
}
