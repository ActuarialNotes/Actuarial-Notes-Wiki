import { useCallback, useMemo, useState } from 'react'
import { Library, X } from 'lucide-react'
import { ENTITY_CATEGORIES, groupSources, type EntityCategory, type SourceResource } from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { EntityCard } from '@/components/cowork/EntityCard'
import { ResourceRow } from '@/components/cowork/ResourceRow'
import { cn } from '@/lib/utils'

/**
 * The **Sources** tab: every publisher Cowork follows, what they publish, and
 * what the reader has taken from them.
 *
 * The library is shown inline at the top rather than behind a drawer, because
 * it is the thing a deliverable draws from — a reader building one needs to see
 * what they have without leaving the page they are adding to.
 */

export interface SourcesViewProps {
  query: string
  onOpenResource: (resource: SourceResource) => void
}

export default function SourcesView({ query, onOpenResource }: SourcesViewProps) {
  const [categories, setCategories] = useState<EntityCategory[]>([])
  const library = useCoworkLibrary()

  const groups = useMemo(
    () => groupSources(COWORK_ENTITIES, COWORK_RESOURCES, { query, categories }),
    [query, categories],
  )

  const filtered = query.trim().length > 0 || categories.length > 0
  const takenResources = useMemo(
    () => COWORK_RESOURCES.filter(r => library.resourceIds.includes(r.id)),
    [library.resourceIds],
  )

  // The store holds ids only, so the cascade that drops a publisher's documents
  // is handed the catalogue here — see `hooks/useCoworkLibrary.ts`.
  const toggleEntity = useCallback(
    (entityId: string) => library.toggleEntity(entityId, COWORK_RESOURCES),
    [library],
  )

  function toggleCategory(id: EntityCategory) {
    setCategories(prev => (prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      {takenResources.length > 0 && (
        <section className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Library className="h-4 w-4 text-muted-foreground" aria-hidden />
              Your library
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-semibold leading-none tabular-nums text-muted-foreground">
                {takenResources.length}
              </span>
            </h2>
            <button
              type="button"
              onClick={() => library.clear()}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
              Clear
            </button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            The documents a deliverable can draw on. Following {library.entityIds.length}{' '}
            {library.entityIds.length === 1 ? 'source' : 'sources'}.
          </p>
          <div className="mt-2 -mx-2">
            {takenResources.map(resource => (
              <ResourceRow
                key={resource.id}
                resource={resource}
                inLibrary
                onToggleLibrary={library.toggleResource}
                onOpen={onOpenResource}
              />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-1.5">
        {ENTITY_CATEGORIES.map(category => {
          const active = categories.includes(category.id)
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              aria-pressed={active}
              title={category.description}
              data-sound="select"
              className={cn(
                'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                active
                  ? 'border-transparent bg-foreground text-background'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {category.label}
            </button>
          )
        })}
      </div>

      {groups.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
          No source matches that. Try a publisher’s name, a document title, or clear the filters.
        </p>
      ) : (
        <div className="space-y-3">
          {groups.map(group => (
            <EntityCard
              key={group.entity.id}
              group={group}
              followed={library.entityIds.includes(group.entity.id)}
              onToggleFollow={toggleEntity}
              inLibrary={id => library.resourceIds.includes(id)}
              onToggleResource={library.toggleResource}
              onOpenResource={onOpenResource}
              defaultOpen={filtered}
            />
          ))}
        </div>
      )}
    </div>
  )
}
