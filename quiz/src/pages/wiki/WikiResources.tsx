import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { ExamPill, MetaPill, PdfPill } from '@/components/wiki/ResourcePills'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { buildWikiIndex, bundledWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { RESOURCES_ROUTE, type WikiEntryRef } from '@/lib/wikiRoutes'
import { splitAuthors } from '@/lib/authorNames'
import {
  RESOURCE_FACETS,
  RESOURCE_FACET_LABEL,
  emptyResourceFacets,
  filterResources,
  hasResourceFilters,
  resourceFacetOptions,
  resourceFacetsFromParams,
  resourceFacetsToParams,
  toggleResourceFacet,
  type ResourceFacet,
} from '@/lib/resourceFilters'

const EMPTY_TITLE: Record<ResourceFacet, string> = {
  exam: 'None of these resources is a syllabus reading',
  publisher: 'None of these resources names its publisher',
  year: 'None of these resources names its year',
}

/**
 * One syllabus reading on the shelf: its cover, its title, and the pills —
 * the exams it is a reading for first, since that is what the shelf is
 * scanned for, then whether it can be read here, then its bibliographic facts.
 */
function ResourceShelfCard({ book, onOpen }: { book: WikiIndexItem; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="w-full text-left appearance-none bg-transparent p-0">
      <Card className="h-full transition-all duration-150 hover:bg-accent/40 overflow-hidden flex flex-row items-stretch">
        {book.coverImage && (
          <div className="flex-shrink-0 p-2 pt-4 flex items-start">
            <img
              src={book.coverImage}
              alt={book.title ?? book.name}
              className="w-16 sm:w-20 rounded-md object-contain max-h-28 bg-muted/20"
              loading="lazy"
              onError={(e) => {
                const p = e.currentTarget.parentElement
                if (p) p.style.display = 'none'
              }}
            />
          </div>
        )}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <p className="text-sm font-semibold leading-snug">{book.title ?? book.name}</p>
          {(book.exams?.length || book.pdf || book.author || book.year || book.edition || book.publisher) && (
            <div className="flex flex-wrap gap-1">
              {book.exams?.map(exam => (
                <ExamPill key={`exam-${exam}`}>{exam}</ExamPill>
              ))}
              {book.pdf && <PdfPill />}
              {splitAuthors(book.author).map((author, i) => (
                <MetaPill key={`author-${i}`}>{author}</MetaPill>
              ))}
              {book.year && <MetaPill>{book.year}</MetaPill>}
              {book.edition && <MetaPill>{book.edition} ed.</MetaPill>}
              {book.publisher && book.publisher !== book.author && (
                <MetaPill>{book.publisher}</MetaPill>
              )}
            </div>
          )}
        </div>
      </Card>
    </button>
  )
}

/**
 * The Study Guides tab's **Resources** page (`/wiki/resources`): every
 * `Resources/Books` page — the syllabus readings and the documents beside
 * them — as one shelf, filtered by Exam, Publisher and Year
 * (`lib/resourceFilters.ts`). It used to be a section at the foot of the exam
 * ladder; it is a page of its own, listed under Study Guides in the sidebar
 * the way an open project's views are listed under Projects.
 *
 * The filters ride the URL, so a filtered shelf survives the browser's Back,
 * the sidebar's return to the tab and a reload. A card opens its resource in
 * the concept popup, and the popup's Previous / Next walk the shelf as it is
 * filtered.
 */
export default function WikiResources() {
  const { setPageRefs, setExamId } = useWikiPage()
  const openAt = useConceptPopup(s => s.openAt)
  // Seeded from the bundle, as the exam ladder is, so the shelf is there on the
  // first frame rather than one "Loading…" later.
  const [index, setIndex] = useState<WikiIndexItem[]>(() => bundledWikiIndex() ?? [])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setPageRefs([])
    setExamId(null)
  }, [setPageRefs, setExamId])

  useEffect(() => {
    buildWikiIndex().then(setIndex).catch(() => setIndex([]))
  }, [])

  // Where the shelf was left is kept by the router (lib/routeScrollMemory.ts),
  // which brings a resource page's "All resources" link and Back here to it.

  const books = useMemo(() => index.filter(i => i.category === 'document'), [index])
  const selection = useMemo(() => resourceFacetsFromParams(searchParams), [searchParams])
  const filtered = useMemo(() => filterResources(books, selection), [books, selection])
  const filtering = hasResourceFilters(selection)
  const options = useMemo(
    () => Object.fromEntries(RESOURCE_FACETS.map(facet => [facet, resourceFacetOptions(books, facet, selection)])),
    [books, selection],
  ) as Record<ResourceFacet, ReturnType<typeof resourceFacetOptions>>

  // The popup walks what is on screen — the shelf as filtered.
  const refs = useMemo<WikiEntryRef[]>(
    () => filtered.map(book => ({ kind: 'resource', name: book.name })),
    [filtered],
  )

  // A filter is the same page showing something else, so it replaces the
  // history entry rather than stacking one per tick.
  function toggle(facet: ResourceFacet, value: string) {
    setSearchParams(resourceFacetsToParams(toggleResourceFacet(selection, facet, value), searchParams), { replace: true })
  }

  function clearFilters() {
    setSearchParams(resourceFacetsToParams(emptyResourceFacets(), searchParams), { replace: true })
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="min-w-0 truncate text-2xl font-bold tracking-tight">Resources</h1>
      </header>

      <div className="flex flex-wrap items-center gap-2">
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
        {filtering && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden />
            Clear
          </button>
        )}
      </div>

      {books.length === 0 ? (
        <p className="text-sm text-muted-foreground">Loading resources…</p>
      ) : filtered.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((book, i) => (
            <ResourceShelfCard key={book.path} book={book} onOpen={() => openAt(refs, i, RESOURCES_ROUTE)} />
          ))}
        </div>
      )}
    </div>
  )
}
