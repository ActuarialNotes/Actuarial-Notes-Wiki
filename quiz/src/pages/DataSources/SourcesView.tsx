import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import {
  ENTITY_CATEGORIES,
  entityOffers,
  featuredResources,
  formatPublished,
  groupSources,
  resourceKindLabel,
  type EntityCategory,
  type SourceFilters,
  type SourceResource,
} from '@/lib/coworkSources'
import { publisherPath } from '@/lib/dataSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { EntityLogo } from '@/components/cowork/EntityLogo'
import { LibraryPill } from '@/components/cowork/LibraryPill'
import { OfferTags, ResourceOfferTags } from '@/components/cowork/OfferTags'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { cn } from '@/lib/utils'

/** How many of a source's documents its row shows when opened. */
const SHOWN = 3

/**
 * The **Sources** section of Data Sources (`/data-sources/sources`): every
 * publisher as one row, tagged with what its documents give (Data,
 * Assumptions). A row opens **in place** on the source's leading documents —
 * the ones that give data or figures first — so a document is one tap from
 * this list, and the source's own page (`SourcePage.tsx`) holds the rest.
 *
 * One filter, the kind of publisher, beside **My Library** (the sources the
 * reader follows).
 */
export default function SourcesView({ onOpenResource }: { onOpenResource: (resource: SourceResource) => void }) {
  const [categories, setCategories] = useState<EntityCategory[]>([])
  const [libraryOnly, setLibraryOnly] = useState(false)
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set())
  const library = useCoworkLibrary()

  const filters = useMemo<SourceFilters>(
    () => ({ categories, ...(libraryOnly ? { entityIds: library.entityIds } : {}) }),
    [categories, libraryOnly, library.entityIds],
  )
  const groups = useMemo(() => groupSources(COWORK_ENTITIES, COWORK_RESOURCES, filters), [filters])
  const libraryCount = library.entityIds.length

  const counts = useMemo(() => {
    const base = groupSources(COWORK_ENTITIES, COWORK_RESOURCES, { ...filters, categories: [] })
    return new Map(ENTITY_CATEGORIES.map(c => [c.id, base.filter(g => g.entity.category === c.id).length]))
  }, [filters])

  const toggleCategory = useCallback((id: string) => {
    const c = id as EntityCategory
    setCategories(prev => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]))
  }, [])

  const toggleOpen = useCallback((id: string) => {
    setOpen(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <LibraryPill
          active={libraryOnly}
          count={libraryCount}
          title="Only the sources you follow"
          onToggle={() => setLibraryOnly(v => !v)}
        />
        <MultiSelectDropdown
          label="Kind"
          options={ENTITY_CATEGORIES.map(c => ({ value: c.id, label: c.label, hint: c.description }))}
          selected={new Set(categories)}
          onToggle={toggleCategory}
          getCount={value => counts.get(value as EntityCategory) ?? 0}
        />
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

      {groups.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
          {libraryOnly && libraryCount === 0
            ? 'You are not following any sources yet. Turn My Library off to see them all.'
            : 'No sources match these filters.'}
        </p>
      ) : (
        <ul className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)]">
          {groups.map(group => {
            const { entity } = group
            const isOpen = open.has(entity.id)
            const docs = featuredResources(group.resources, entity.id)
            return (
              <li key={entity.id} data-testid="source-row">
                <button
                  type="button"
                  onClick={() => toggleOpen(entity.id)}
                  aria-expanded={isOpen}
                  data-sound="select"
                  className="flex w-full items-center gap-3 px-3.5 py-3 text-left transition-colors hover:bg-muted/60"
                >
                  <EntityLogo entity={entity} size="md" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-snug">{entity.name}</span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-xs text-muted-foreground">{entity.jurisdiction}</span>
                      <OfferTags offers={entityOffers(group.resources, entity.id)} />
                    </span>
                  </span>
                  <ChevronDown
                    className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180')}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <ul className="pb-1" data-testid="source-documents">
                    {docs.slice(0, SHOWN).map(r => (
                      <DocumentRow key={r.id} resource={r} onOpen={onOpenResource} />
                    ))}
                    <li>
                      <Link
                        to={publisherPath(entity.id)}
                        className="flex items-center justify-between gap-2 py-2.5 pl-[3.75rem] pr-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                      >
                        {docs.length > SHOWN ? `All ${docs.length} documents from ${entity.short}` : `${entity.short}’s page`}
                        <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/** One of a source's documents inside its opened row: opens in the reader; its tags open what it gives. */
function DocumentRow({ resource, onOpen }: { resource: SourceResource; onOpen: (resource: SourceResource) => void }) {
  return (
    <li className="relative pl-[3.75rem] pr-3.5 transition-colors hover:bg-muted/60">
      <button
        type="button"
        onClick={() => onOpen(resource)}
        aria-label={`Open ${resource.title}`}
        data-sound="open"
        className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      />
      <div className="pointer-events-none relative py-2">
        <p className="text-sm font-medium leading-snug">{resource.title}</p>
        <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <ResourceOfferTags resource={resource} />
          <span>
            {resourceKindLabel(resource.kind)}
            {resource.published ? ` · ${formatPublished(resource.published)}` : ''}
          </span>
        </p>
      </div>
    </li>
  )
}
