import { useCallback, useMemo } from 'react'
import { ArrowLeft, Check, ExternalLink, Plus } from 'lucide-react'
import { entityById, entityResources, type SourceResource } from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { useCoworkCovers } from '@/hooks/useCoworkCovers'
import { resourceCover } from '@/lib/coworkCovers'
import { EntityLogo } from '@/components/cowork/EntityLogo'
import { ResourceCard, ResourceCardGrid } from '@/components/cowork/ResourceCard'
import { cn } from '@/lib/utils'

/**
 * One **source**, as its own page — the publisher, and everything of theirs
 * Cowork carries.
 *
 * It is the shape an exam's study guide has: the thing itself gets a page with
 * its own address, its logo in the sticky header, and its contents below as
 * cards. A publisher's catalogue folded inside a card on a shelf could not be
 * linked to, could not be scrolled on its own, and put the documents at the
 * bottom of whatever else the shelf was showing.
 *
 * Searching does not thin this page: the bar's **This Source** scope asks the
 * query of this publisher's catalogue and answers with a list
 * (`components/cowork/CoworkTopBar.tsx`), so the page keeps showing everything
 * they publish while the reader looks for one of them.
 */

export interface SourcePageProps {
  entityId: string
  onOpenResource: (resource: SourceResource) => void
  onBack: () => void
}

export default function SourcePage({ entityId, onOpenResource, onBack }: SourcePageProps) {
  const library = useCoworkLibrary()
  const covers = useCoworkCovers()
  const entity = useMemo(() => entityById(COWORK_ENTITIES, entityId), [entityId])

  const resources = useMemo(() => entityResources(COWORK_RESOURCES, entityId), [entityId])

  // The store holds ids only, so the cascade that drops a publisher's documents
  // is handed the catalogue here — see `hooks/useCoworkLibrary.ts`.
  const toggleFollow = useCallback(
    () => library.toggleEntity(entityId, COWORK_RESOURCES),
    [library, entityId],
  )

  if (!entity) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Sources
        </button>
        <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
          That source is no longer in the catalogue.
        </p>
      </div>
    )
  }

  const followed = library.entityIds.includes(entity.id)

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-start gap-4">
          <EntityLogo entity={entity} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold leading-tight text-foreground sm:text-2xl">{entity.name}</h1>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{entity.jurisdiction}</p>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{entity.about}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleFollow}
            aria-pressed={followed}
            data-sound="press"
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors',
              followed
                ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-300'
                : 'border text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            {followed ? <Check className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
            {followed ? 'Following' : 'Follow source'}
          </button>

          {entity.site && (
            <a
              href={entity.site}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              Publisher’s site
            </a>
          )}
        </div>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Documents
          {resources.length > 0 && (
            <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-semibold leading-none tabular-nums text-muted-foreground">
              {resources.length}
            </span>
          )}
        </h2>

        {resources.length === 0 ? (
          <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
            Cowork carries nothing from this source yet.
          </p>
        ) : (
          <ResourceCardGrid>
            {resources.map(resource => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                cover={resourceCover(covers, resource)}
                inLibrary={library.resourceIds.includes(resource.id)}
                onToggleLibrary={library.toggleResource}
                onOpen={onOpenResource}
              />
            ))}
          </ResourceCardGrid>
        )}
      </section>
    </div>
  )
}
