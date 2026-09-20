import { useMemo, useState } from 'react'
import { ArrowLeft, Pencil, Plus } from 'lucide-react'
import {
  STATUS_LABEL,
  deliverableStatus,
  deliverableTypeSpec,
  deriveAssumptions,
  deriveKeyDetails,
  facetsFromAnswers,
} from '@/lib/coworkDeliverables'
import { deliverableDisplayTitle, stepsFor } from '@/data/coworkDeliverables'
import { COWORK_RESOURCES, COWORK_ENTITIES } from '@/data/coworkSources'
import { libraryResources, type SourceResource } from '@/lib/coworkSources'
import { availableExports, type ExportContext } from '@/lib/coworkExport'
import { useCoworkDeliverables } from '@/hooks/useCoworkDeliverables'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { useCoworkCovers } from '@/hooks/useCoworkCovers'
import { resourceCover } from '@/lib/coworkCovers'
import { DeliverableWizard } from '@/components/cowork/DeliverableWizard'
import { AssumptionsTable, KeyDetailsTable } from '@/components/cowork/AssumptionsTable'
import { ExportPanel } from '@/components/cowork/ExportPanel'
import { FacetPills } from '@/components/cowork/FacetPills'
import { ResourceCard, ResourceCardGrid } from '@/components/cowork/ResourceCard'
import { cn } from '@/lib/utils'

/**
 * One deliverable, end to end — the scoping, the sources it draws on, what it
 * assumes, and the exports it has earned.
 *
 * The order down the page is the order of the loop, and it is the argument the
 * page is making: you scope it, you attach what it is built on, and *then* the
 * assumptions and the exhibits exist. A deliverable that has not been scoped
 * has nothing to populate, and the page shows exactly that rather than an empty
 * table with a spinner over it.
 */

export interface DeliverableDetailProps {
  deliverableId: string
  onBack: () => void
  onOpenResource: (resource: SourceResource) => void
  /** Sends the reader to the Sources tab to add something to their library. */
  onBrowseSources: () => void
}

export default function DeliverableDetail({
  deliverableId,
  onBack,
  onOpenResource,
  onBrowseSources,
}: DeliverableDetailProps) {
  const { deliverables, answer, unanswer, attach, detach, rename } = useCoworkDeliverables()
  const library = useCoworkLibrary()
  const covers = useCoworkCovers()
  const [editingTitle, setEditingTitle] = useState(false)

  const deliverable = deliverables.find(d => d.id === deliverableId)

  const steps = useMemo(() => (deliverable ? stepsFor(deliverable.type) : []), [deliverable])

  const attached = useMemo(
    () =>
      deliverable
        ? deliverable.resourceIds
            .map(id => COWORK_RESOURCES.find(r => r.id === id))
            .filter((r): r is SourceResource => r !== undefined)
        : [],
    [deliverable],
  )

  const available = useMemo(() => {
    if (!deliverable) return []
    const taken = new Set(deliverable.resourceIds)
    return libraryResources({ entityIds: library.entityIds, resourceIds: library.resourceIds }, COWORK_RESOURCES)
      .filter(r => !taken.has(r.id))
  }, [deliverable, library.entityIds, library.resourceIds])

  if (!deliverable) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Deliverables
        </button>
        <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
          That deliverable no longer exists.
        </p>
      </div>
    )
  }

  const facets = facetsFromAnswers(steps, deliverable.answers)
  const status = deliverableStatus(steps, deliverable.answers, deliverable.resourceIds)
  const assumptions = deriveAssumptions(steps, deliverable.answers, attached)
  const keyDetails = deriveKeyDetails(deliverable.type, steps, deliverable.answers, attached)
  const exports = availableExports(steps, deliverable.answers)
  const title = deliverableDisplayTitle(deliverable)

  const exportContext: ExportContext = {
    deliverable: { ...deliverable, title },
    steps,
    resources: attached,
    entities: COWORK_ENTITIES,
    asOf: new Date(),
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Deliverables
        </button>

        <div className="mt-2 flex items-start gap-2">
          {editingTitle ? (
            <input
              autoFocus
              defaultValue={deliverable.title || title}
              onBlur={e => {
                rename(deliverable.id, e.target.value.trim())
                setEditingTitle(false)
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
                if (e.key === 'Escape') setEditingTitle(false)
              }}
              aria-label="Deliverable title"
              className="h-9 min-w-0 flex-1 rounded-lg border bg-background px-3 text-lg font-bold outline-none focus:border-ring"
            />
          ) : (
            <>
              <h1 className="min-w-0 flex-1 text-xl font-bold leading-tight text-foreground">{title}</h1>
              <button
                type="button"
                onClick={() => setEditingTitle(true)}
                aria-label="Rename this deliverable"
                className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden />
              </button>
            </>
          )}
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">{deliverableTypeSpec(deliverable.type).label}</span>
          <span
            className={cn(
              'rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
              status === 'populated'
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                : status === 'scoped'
                ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300'
                : 'bg-muted text-muted-foreground',
            )}
          >
            {STATUS_LABEL[status]}
          </span>
        </div>
        <FacetPills facets={facets} className="mt-2" />
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-foreground">1 · Scope it</h2>
        <DeliverableWizard
          steps={steps}
          answers={deliverable.answers}
          onAnswer={(stepId, optionId) => answer(deliverable.id, steps, stepId, optionId)}
          onUnanswer={stepId => unanswer(deliverable.id, steps, stepId)}
        />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-foreground">2 · Attach sources</h2>
        {attached.length > 0 && (
          <div className="mb-3">
            <ResourceCardGrid>
              {attached.map(resource => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  cover={resourceCover(covers, resource)}
                  inLibrary
                  onToggleLibrary={() => detach(deliverable.id, resource.id)}
                  onOpen={onOpenResource}
                  attachLabel="Attach"
                />
              ))}
            </ResourceCardGrid>
          </div>
        )}

        {available.length > 0 ? (
          <details className="rounded-xl border bg-card">
            <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium text-foreground">
              <Plus className="h-4 w-4 text-muted-foreground" aria-hidden />
              Add from your library
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold leading-none tabular-nums text-muted-foreground">
                {available.length}
              </span>
            </summary>
            <div className="border-t p-3">
              <ResourceCardGrid>
                {available.map(resource => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    cover={resourceCover(covers, resource)}
                    inLibrary={false}
                    onToggleLibrary={() => attach(deliverable.id, resource.id)}
                    onOpen={onOpenResource}
                    attachLabel="Attach"
                  />
                ))}
              </ResourceCardGrid>
            </div>
          </details>
        ) : (
          attached.length === 0 && (
            <div className="rounded-lg border border-dashed px-4 py-8 text-center">
              <p className="text-sm text-muted-foreground">Your library is empty.</p>
              <button
                type="button"
                onClick={onBrowseSources}
                data-sound="press"
                className="mt-2 inline-flex h-8 items-center rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse sources
              </button>
            </div>
          )
        )}
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-foreground">3 · What it assumes</h2>
        <AssumptionsTable assumptions={assumptions} />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-foreground">Key details</h2>
        <KeyDetailsTable details={keyDetails} />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-foreground">4 · Export</h2>
        <ExportPanel exports={exports} context={exportContext} />
      </section>
    </div>
  )
}
