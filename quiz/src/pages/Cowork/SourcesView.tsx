import { useCallback, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import {
  ENTITY_CATEGORIES,
  filterResources,
  groupSources,
  type EntityCategory,
  type SourceFilters,
  type SourceResource,
} from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { useCoworkCovers } from '@/hooks/useCoworkCovers'
import { resourceCover } from '@/lib/coworkCovers'
import { EntityCard } from '@/components/cowork/EntityCard'
import { ResourceCard, ResourceCardGrid } from '@/components/cowork/ResourceCard'
import { cn } from '@/lib/utils'

/**
 * The **Sources** shelf: every publisher Cowork follows, everything they
 * publish, and what the reader has taken from either.
 *
 * Two filters, and the difference between them is the page's whole structure.
 *
 * The **primary** one is *publishers or documents*, because those are two
 * different questions and the answer to each is a different kind of card. A
 * publisher is a card that opens that publisher's own page (see
 * `components/cowork/EntityCard.tsx`); a document is a card that opens the
 * document. Nothing else changes between the two views — the same query, the
 * same filters, the same library.
 *
 * The **secondary** row is the filters, and **My Library** is the first of
 * them. The library used to be its own section stacked above the shelf, which
 * made what a reader already had a different place from what they could have,
 * pushed the filters below the fold, and duplicated a card's two states on one
 * screen. As a filter it is what it actually is: a narrowing of the catalogue
 * to the part the reader has claimed. It leads the row because it is the one
 * filter a reader comes back to the page for.
 */

/** Publishers, or the documents they publish. */
type SourceView = 'sources' | 'documents'

const VIEWS: { id: SourceView; label: string }[] = [
  { id: 'sources', label: 'Sources' },
  { id: 'documents', label: 'Documents' },
]

export interface SourcesViewProps {
  onOpenResource: (resource: SourceResource) => void
}

export default function SourcesView({ onOpenResource }: SourcesViewProps) {
  const [view, setView] = useState<SourceView>('sources')
  const [categories, setCategories] = useState<EntityCategory[]>([])
  const [libraryOnly, setLibraryOnly] = useState(false)
  const library = useCoworkLibrary()
  const covers = useCoworkCovers()

  // The library narrows by publisher on the Sources view and by document on the
  // Documents view — "what I follow" and "what I am working from" are the two
  // separate claims the store keeps, and each view asks about its own.
  const filters = useMemo<SourceFilters>(
    () => ({
      categories,
      ...(libraryOnly
        ? view === 'sources'
          ? { entityIds: library.entityIds }
          : { resourceIds: library.resourceIds }
        : {}),
    }),
    [categories, libraryOnly, view, library.entityIds, library.resourceIds],
  )

  const groups = useMemo(
    () => (view === 'sources' ? groupSources(COWORK_ENTITIES, COWORK_RESOURCES, filters) : []),
    [view, filters],
  )

  const documents = useMemo(
    () => (view === 'documents' ? filterResources(COWORK_ENTITIES, COWORK_RESOURCES, filters) : []),
    [view, filters],
  )

  const libraryCount = view === 'sources' ? library.entityIds.length : library.resourceIds.length

  // The store holds ids only, so the cascade that drops a publisher's documents
  // is handed the catalogue here — see `hooks/useCoworkLibrary.ts`.
  const toggleEntity = useCallback(
    (entityId: string) => library.toggleEntity(entityId, COWORK_RESOURCES),
    [library],
  )

  function toggleCategory(id: EntityCategory) {
    setCategories(prev => (prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]))
  }

  const empty = view === 'sources' ? groups.length === 0 : documents.length === 0

  return (
    <div className="space-y-4">
      {/* Primary: publishers, or the documents they publish. */}
      <div role="tablist" aria-label="Browse" className="inline-flex rounded-lg border p-0.5">
        {VIEWS.map(v => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={view === v.id}
            onClick={() => setView(v.id)}
            data-sound="select"
            className={cn(
              'rounded-md px-3 py-1 text-xs font-medium transition-colors',
              view === v.id
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Secondary: the library, then what kind of organisation publishes it. */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => setLibraryOnly(v => !v)}
          aria-pressed={libraryOnly}
          title="Only what you follow and what you have taken"
          data-sound="select"
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
            libraryOnly
              ? 'border-transparent bg-foreground text-background'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground',
          )}
        >
          My Library
          <span
            className={cn(
              'rounded-full px-1.5 text-[10px] font-semibold leading-4 tabular-nums',
              libraryOnly ? 'bg-background/20' : 'bg-muted',
            )}
          >
            {libraryCount}
          </span>
        </button>

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

        {/* Emptying the library is destructive enough to need saying, so it only
            appears while the reader is looking at what it would empty. */}
        {libraryOnly && libraryCount > 0 && (
          <button
            type="button"
            onClick={() => library.clear()}
            className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            Clear
          </button>
        )}
      </div>

      {empty ? (
        <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
          {libraryOnly && libraryCount === 0
            ? view === 'sources'
              ? 'You are not following any sources yet. Turn My Library off to browse the catalogue.'
              : 'You have not taken any documents yet. Turn My Library off to browse the catalogue.'
            : 'Nothing matches those filters.'}
        </p>
      ) : view === 'sources' ? (
        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(group => (
            <EntityCard
              key={group.entity.id}
              group={group}
              followed={library.entityIds.includes(group.entity.id)}
              onToggleFollow={toggleEntity}
              href={`/cowork/sources/${group.entity.id}`}
            />
          ))}
        </div>
      ) : (
        <ResourceCardGrid>
          {documents.map(resource => (
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
    </div>
  )
}
