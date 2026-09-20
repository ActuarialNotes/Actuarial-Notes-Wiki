import { ChevronRight, Trash2 } from 'lucide-react'
import {
  STATUS_LABEL,
  deliverableStatus,
  deliverableTypeSpec,
  facetsFromAnswers,
  type DeliverableType,
} from '@/lib/coworkDeliverables'
import { deliverableDisplayTitle, stepsFor } from '@/data/coworkDeliverables'
import { useCoworkDeliverables } from '@/hooks/useCoworkDeliverables'
import { FacetPills } from '@/components/cowork/FacetPills'
import { NewDeliverableFab } from '@/components/cowork/NewDeliverableFab'
import { cn } from '@/lib/utils'

/**
 * The **Deliverables** tab: the ones this reader has started.
 *
 * Starting a new one is the floating button, not a shelf of type cards at the
 * top of the page — see `components/cowork/NewDeliverableFab.tsx`. Picking a
 * type there creates the deliverable and opens it straight into its scoping
 * flow, which is where the questions belong.
 *
 * The page lists them all: finding one by name is the top bar's job, and it
 * answers with a row that opens the deliverable rather than by thinning this
 * list (`components/cowork/CoworkTopBar.tsx`).
 */

const STATUS_TONE = {
  draft: 'bg-muted text-muted-foreground',
  scoped: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
  populated: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
} as const

export interface DeliverablesViewProps {
  onOpen: (id: string) => void
}

export default function DeliverablesView({ onOpen }: DeliverablesViewProps) {
  const { deliverables, create, remove } = useCoworkDeliverables()

  function start(type: DeliverableType) {
    onOpen(create(type).id)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-foreground">
        Your deliverables
        {deliverables.length > 0 && (
          <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-semibold leading-none tabular-nums text-muted-foreground">
            {deliverables.length}
          </span>
        )}
      </h2>

      {deliverables.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
          Nothing yet. Start an analysis, a report or a piece of documentation with the button below.
        </p>
      ) : (
        <ul className="space-y-2">
          {deliverables.map(deliverable => {
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

      <NewDeliverableFab onCreate={start} />
    </div>
  )
}
