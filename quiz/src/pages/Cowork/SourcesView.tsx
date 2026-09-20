import { useCallback, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { ENTITY_CATEGORIES, groupSources, type EntityCategory, type SourceResource } from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { useCoworkCovers } from '@/hooks/useCoworkCovers'
import { resourceCover } from '@/lib/coworkCovers'
import { EntityCard } from '@/components/cowork/EntityCard'
import { ResourceCard, ResourceCardGrid } from '@/components/cowork/ResourceCard'
import { cn } from '@/lib/utils'

/**
 * The **Sources** shelf: every publisher Cowork follows, and what the reader
 * has taken from them.
 *
 * A publisher is a card and the card opens that publisher's own page — the
 * documents are there, not folded into the shelf (see
 * `components/cowork/EntityCard.tsx`).
 *
 * The library sits at the top rather than behind a drawer, because it is what a
 * deliverable draws from: a reader building one needs to see what they have
 * without leaving the page they are adding to.
 */

export interface SourcesViewProps {
  query: string
  onOpenResource: (resource: SourceResource) => void
}

export default function SourcesView({ query, onOpenResource }: SourcesViewProps) {
  const [categories, setCategories] = useState<EntityCategory[]>([])
  const library = useCoworkLibrary()
  const covers = useCoworkCovers()

  const groups = useMemo(
    () => groupSources(COWORK_ENTITIES, COWORK_RESOURCES, { query, categories }),
    [query, categories],
  )

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
        <section>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-foreground">
              Your library
              <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-semibold leading-none tabular-nums text-muted-foreground">
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
          <ResourceCardGrid>
            {takenResources.map(resource => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                cover={resourceCover(covers, resource)}
                inLibrary
                onToggleLibrary={library.toggleResource}
                onOpen={onOpenResource}
              />
            ))}
          </ResourceCardGrid>
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
        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(group => (
            <EntityCard
              key={group.entity.id}
              group={group}
              followed={library.entityIds.includes(group.entity.id)}
              onToggleFollow={toggleEntity}
              href={`/cowork/sources/${group.entity.id}${query.trim() ? `?q=${encodeURIComponent(query)}` : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
