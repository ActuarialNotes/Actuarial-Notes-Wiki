// The Assumptions Bank's shelf (`/tools/assumptions`, docs/assumptions-bank.md
// §4.5): every set, newest first, filtered by kind, each figure with its links
// into the tools that take it. A link opens the tool with the figure already
// in, recorded as its source — the shelf is where a published number starts
// its way into a model.

import { Link, useSearchParams } from 'react-router-dom'
import bank from 'virtual:assumption-bank'
import { ArrowRight } from 'lucide-react'
import { ASSUMPTION_KINDS, kindLabel } from '@/lib/assumptionBank'
import { figureUses, kindsIn } from '@/lib/toolBank'
import { AssumptionSetCard } from './AssumptionSetCard'
import { inkChip } from '@/components/ui/ink'
import { cn } from '@/lib/utils'

export function AssumptionsShelf({ onReadSource }: { onReadSource: (resource: string) => void }) {
  const [params, setParams] = useSearchParams()
  // A fact never goes into a tool; the filter is for figures.
  const kinds = kindsIn(bank, Object.keys(ASSUMPTION_KINDS)).filter(k => k !== 'fact')
  const kind = kinds.includes(params.get('kind') ?? '') ? params.get('kind')! : null
  const choose = (k: string | null) => {
    const next = new URLSearchParams(params)
    if (k) next.set('kind', k)
    else next.delete('kind')
    setParams(next, { replace: true })
  }
  const sets = [...bank]
    .filter(s => !s.supersededBy && (!kind || s.rows.some(r => r.kind === kind)))
    .sort((a, b) => b.effective.localeCompare(a.effective) || a.title.localeCompare(b.title))
  const figures = bank.reduce((n, s) => n + s.rows.filter(r => r.decimal != null).length, 0)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {figures} published figures from {bank.length} documents, each with where it is printed. Take one into a tool and the run records its source.
      </p>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Kind">
        <button type="button" onClick={() => choose(null)} className={inkChip(kind === null)} aria-pressed={kind === null}>All</button>
        {kinds.map(k => (
          <button key={k} type="button" onClick={() => choose(k)} className={inkChip(kind === k)} aria-pressed={kind === k}>
            {kindLabel(k)}
          </button>
        ))}
      </div>
      {sets.map(set => (
        <AssumptionSetCard
          key={set.id}
          set={set}
          onReadSource={() => onReadSource(set.source)}
          rowAction={row => {
            const uses = figureUses(row)
            if (!uses.length) return null
            return (
              <details className="group mt-1" data-testid="assumption-uses">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-medium underline underline-offset-2 hover:no-underline [&::-webkit-details-marker]:hidden">
                  Use in a tool
                </summary>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                {uses.map(u => (
                  <Link
                    key={`${u.tool.id}:${u.field.key}`}
                    to={u.path}
                    aria-label={`Use ${row.label} as ${u.field.label} in ${u.tool.name}`}
                    className={cn('inline-flex h-7 items-center gap-1 rounded-full border border-border px-2.5 text-xs font-medium hover:bg-accent')}
                  >
                    {u.tool.name}
                    {uses.some(o => o.tool.id === u.tool.id && o !== u) && <span className="text-muted-foreground">· {u.field.label}</span>}
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </Link>
                ))}
                </div>
              </details>
            )
          }}
        />
      ))}
    </div>
  )
}
