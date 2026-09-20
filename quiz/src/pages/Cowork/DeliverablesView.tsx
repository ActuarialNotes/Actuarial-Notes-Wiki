import { useMemo } from 'react'
import { ChevronRight, Plus, Trash2 } from 'lucide-react'
import {
  DELIVERABLE_TYPES,
  STATUS_LABEL,
  deliverableStatus,
  deliverableTypeSpec,
  facetsFromAnswers,
  type DeliverableType,
} from '@/lib/coworkDeliverables'
import { deliverableDisplayTitle, stepsFor } from '@/data/coworkDeliverables'
import { useCoworkDeliverables } from '@/hooks/useCoworkDeliverables'
import { FacetPills } from '@/components/cowork/FacetPills'
import { cn } from '@/lib/utils'

/**
 * The **Deliverables** tab: the three things an actuary produces, and the ones
 * this reader has started.
 *
 * The three type cards are the page's primary action and stay at the top even
 * once there are deliverables below them — creating one is the tab's whole
 * purpose, and burying it under a list would make the empty state the only
 * place it is obvious.
 */

const STATUS_TONE = {
  draft: 'bg-muted text-muted-foreground',
  scoped: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
  populated: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
} as const

export interface DeliverablesViewProps {
  query: string
  onOpen: (id: string) => void
}

export default function DeliverablesView({ query, onOpen }: DeliverablesViewProps) {
  const { deliverables, create, remove } = useCoworkDeliverables()

  const matching = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return deliverables
    return deliverables.filter(d => {
      const haystack = [deliverableDisplayTitle(d), deliverableTypeSpec(d.type).label].join(' ').toLowerCase()
      return needle.split(/\s+/).every(term => haystack.includes(term))
    })
  }, [deliverables, query])

  function start(type: DeliverableType) {
    onOpen(create(type).id)
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold text-foreground">Start something</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Three fundamental types. The difference is what the deliverable is for, not how long it is.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {DELIVERABLE_TYPES.map(spec => (
            <button
              key={spec.id}
              type="button"
              onClick={() => start(spec.id)}
              data-sound="press"
              className="group rounded-xl border bg-card p-4 text-left transition-colors hover:border-ring hover:bg-accent/40"
            >
              <span className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{spec.label}</span>
                <Plus className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden />
              </span>
              <span className="mt-0.5 block text-xs font-medium text-muted-foreground">{spec.tagline}</span>
              <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">{spec.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-foreground">
          Your deliverables
          {deliverables.length > 0 && (
            <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-semibold leading-none tabular-nums text-muted-foreground">
              {deliverables.length}
            </span>
          )}
        </h2>

        {matching.length === 0 ? (
          <p className="mt-3 rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
            {deliverables.length === 0
              ? 'Nothing yet. Pick a type above and answer a few questions to scope it.'
              : 'No deliverable matches that search.'}
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {matching.map(deliverable => {
              const steps = stepsFor(deliverable.type)
              const status = deliverableStatus(steps, deliverable.answers, deliverable.resourceIds)
              const facets = facetsFromAnswers(steps, deliverable.answers)
              return (
                <li key={deliverable.id} className="flex items-stretch gap-1">
                  <button
                    type="button"
                    onClick={() => onOpen(deliverable.id)}
                    data-sound="open"
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left transition-colors hover:border-ring hover:bg-accent/40"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{deliverableDisplayTitle(deliverable)}</span>
                        <span
                          className={cn(
                            'rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
                            STATUS_TONE[status],
                          )}
                        >
                          {STATUS_LABEL[status]}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {deliverableTypeSpec(deliverable.type).label}
                        {deliverable.resourceIds.length > 0 &&
                          ` · ${deliverable.resourceIds.length} ${deliverable.resourceIds.length === 1 ? 'source' : 'sources'}`}
                      </span>
                      <FacetPills facets={facets} className="mt-1.5" />
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(deliverable.id)}
                    aria-label={`Delete ${deliverableDisplayTitle(deliverable)}`}
                    className="flex w-9 shrink-0 items-center justify-center rounded-xl border text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
