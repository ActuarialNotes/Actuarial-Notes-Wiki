import { useCallback, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import {
  ENTITY_CATEGORIES,
  groupSources,
  type EntityCategory,
  type SourceFilters,
} from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { EntityCard } from '@/components/cowork/EntityCard'
import { CoworkPageRow } from '@/components/cowork/CoworkPageRow'
import { LibraryPill } from '@/components/cowork/LibraryPill'
import { cn } from '@/lib/utils'

/**
 * The **Sources** shelf (`/cowork`): every publisher Cowork follows, as a grid
 * of cards each opening that publisher's own page
 * (`components/cowork/EntityCard.tsx`).
 *
 * What they publish is the other shelf, **Resources** (`ResourcesView.tsx`,
 * `/cowork/resources`). The two used to be one page with a Sources / Documents
 * toggle; they are two pages now, each carrying a row to the other — the way
 * the Study Guides tab's exam ladder and Resources shelf do — because a
 * publisher and a document are different questions with different filters.
 *
 * The filter row is led by **My Library** (the publishers the reader follows),
 * then what kind of organisation publishes.
 */
export default function SourcesView() {
  const [categories, setCategories] = useState<EntityCategory[]>([])
  const [libraryOnly, setLibraryOnly] = useState(false)
  const library = useCoworkLibrary()

  const filters = useMemo<SourceFilters>(
    () => ({ categories, ...(libraryOnly ? { entityIds: library.entityIds } : {}) }),
    [categories, libraryOnly, library.entityIds],
  )

  const groups = useMemo(() => groupSources(COWORK_ENTITIES, COWORK_RESOURCES, filters), [filters])

  const libraryCount = library.entityIds.length

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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-1.5">
        <LibraryPill
          active={libraryOnly}
          count={libraryCount}
          title="Only the sources you follow"
          onToggle={() => setLibraryOnly(v => !v)}
        />

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

      {/* The way across to the other shelf. Half the width from sm up, as the
          Study Guides tab's row is. */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <CoworkPageRow page="resources" count={COWORK_RESOURCES.length} />
      </div>

      {groups.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
          {libraryOnly && libraryCount === 0
            ? 'You are not following any sources yet. Turn My Library off to browse the catalogue.'
            : 'Nothing matches those filters.'}
        </p>
      ) : (
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
      )}
    </div>
  )
}
