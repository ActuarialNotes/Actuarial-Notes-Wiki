import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import {
  coworkFacetItem,
  filterResources as filterCatalogue,
  type SourceResource,
} from '@/lib/coworkSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { useCoworkCovers } from '@/hooks/useCoworkCovers'
import { resourceCover } from '@/lib/coworkCovers'
import { buildWikiIndex, bundledWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import {
  RESOURCE_FACETS,
  RESOURCE_FACET_LABEL,
  emptyResourceFacets,
  filterResources,
  resourceFacetOptions,
  resourceFacetsFromParams,
  resourceFacetsToParams,
  toggleResourceFacet,
  type ResourceFacet,
} from '@/lib/resourceFilters'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { ResourceCard, ResourceCardGrid } from '@/components/cowork/ResourceCard'
import { CoworkPageRow } from '@/components/cowork/CoworkPageRow'
import { LibraryPill } from '@/components/cowork/LibraryPill'

const EMPTY_TITLE: Record<ResourceFacet, string> = {
  exam: 'None of these resources is a syllabus reading',
  publisher: 'None of these resources names its publisher',
  year: 'None of these resources names its year',
}

/**
 * The **Resources** shelf (`/cowork/resources`): everything Cowork's sources
 * publish, as document cards (`components/cowork/ResourceCard.tsx`), newest
 * first. Its other half is the **Sources** shelf (`SourcesView.tsx`), and each
 * carries a row leading to the other.
 *
 * The filters are the Study Guides tab's Resources page's — **Exam**,
 * **Publisher** and **Year**, OR within one and AND across them, each option
 * counting what choosing it would leave (`lib/resourceFilters.ts`, applied to
 * `coworkFacetItem`) — and they ride the URL the same way, so a filtered shelf
 * survives Back and a reload. The Exam filter is a dropdown here rather than
 * that page's strip of exam logos: few practice documents are an exam's
 * reading, and the strip would be a ladder of choices that empty the shelf.
 * The study page's Vintage filter is an edition of one exam's syllabus, so it
 * has nothing to say about a publisher's documents and isn't offered.
 *
 * **My Library** leads the row, as it does on Sources: here it is the
 * resources the reader has taken.
 */
export default function ResourcesView({ onOpenResource }: { onOpenResource: (resource: SourceResource) => void }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [libraryOnly, setLibraryOnly] = useState(false)
  const library = useCoworkLibrary()
  const covers = useCoworkCovers()
  const [index, setIndex] = useState<WikiIndexItem[]>(() => bundledWikiIndex() ?? [])

  useEffect(() => {
    buildWikiIndex().then(setIndex).catch(() => {})
  }, [])

  // The exams each vault page is a reading for, as the wiki index has them.
  const examsByPage = useMemo(
    () =>
      new Map(
        index
          .filter(i => i.category === 'document' && i.exams?.length)
          .map(i => [i.name.toLowerCase(), i.exams!] as const),
      ),
    [index],
  )

  const pool = useMemo(
    () =>
      filterCatalogue(
        COWORK_ENTITIES,
        COWORK_RESOURCES,
        libraryOnly ? { resourceIds: library.resourceIds } : {},
      ).map(r => coworkFacetItem(r, COWORK_ENTITIES, examsByPage)),
    [libraryOnly, library.resourceIds, examsByPage],
  )

  const selection = useMemo(() => resourceFacetsFromParams(searchParams), [searchParams])
  const shown = useMemo(() => filterResources(pool, selection), [pool, selection])
  const options = useMemo(
    () =>
      Object.fromEntries(RESOURCE_FACETS.map(facet => [facet, resourceFacetOptions(pool, facet, selection)])) as Record<
        ResourceFacet,
        ReturnType<typeof resourceFacetOptions>
      >,
    [pool, selection],
  )

  const libraryCount = library.resourceIds.length

  // A filter is the same page showing something else, so it replaces the
  // history entry rather than stacking one per tick.
  function toggle(facet: ResourceFacet, value: string) {
    setSearchParams(resourceFacetsToParams(toggleResourceFacet(selection, facet, value), searchParams), { replace: true })
  }

  function clearFilters() {
    setLibraryOnly(false)
    setSearchParams(resourceFacetsToParams(emptyResourceFacets(), searchParams), { replace: true })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <LibraryPill
          active={libraryOnly}
          count={libraryCount}
          title="Only the resources you have taken"
          onToggle={() => setLibraryOnly(v => !v)}
        />
        {RESOURCE_FACETS.map(facet => {
          const opts = options[facet]
          const counts = new Map(opts.map(o => [o.value, o.count]))
          return (
            <MultiSelectDropdown
              key={facet}
              label={RESOURCE_FACET_LABEL[facet]}
              options={opts}
              selected={selection[facet]}
              onToggle={value => toggle(facet, value)}
              getCount={value => counts.get(value) ?? 0}
              emptyTitle={EMPTY_TITLE[facet]}
              surface="card"
            />
          )
        })}

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

      {/* The way back across to the publishers — the row Sources carries to
          here, pointing the other way. */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <CoworkPageRow page="sources" count={COWORK_ENTITIES.length} />
      </div>

      {shown.length === 0 ? (
        libraryOnly && libraryCount === 0 ? (
          <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
            You have not taken any resources yet. Turn My Library off to browse the catalogue.
          </p>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-4 py-10 text-center">
            <p className="text-sm text-muted-foreground">No resources match these filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Clear filters
            </button>
          </div>
        )
      ) : (
        <ResourceCardGrid>
          {shown.map(({ resource }) => (
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
