import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { useWikiPage } from '@/hooks/useWikiPage'
import { StudyGuidesPageRow } from '@/components/wiki/StudyGuidesPageRow'
import { variantExamName } from '@/lib/examVariants'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useExamProgress } from '@/contexts/examProgress'
import { ExamPill, MetaPill, PdfPill } from '@/components/wiki/ResourcePills'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useFlipList } from '@/hooks/useFlipList'
import { buildWikiIndex, bundledWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { RESOURCES_ROUTE, examDisplayName, type WikiEntryRef } from '@/lib/wikiRoutes'
import { splitAuthors } from '@/lib/authorNames'
import {
  RESOURCE_FACETS,
  RESOURCE_FACET_LABEL,
  ALL_EXAMS,
  emptyResourceFacets,
  filterResources,
  resourceFacetOptions,
  resourceFacetsFromParams,
  resourceFacetsToParams,
  shelfExams,
  toggleResourceFacet,
  type ResourceFacet,
} from '@/lib/resourceFilters'
import {
  vintageFromParams,
  vintageShelf,
  vintageToParams,
  vintageView,
  withCurrentExams,
  VINTAGE_CHANGE_RING,
  type VintageChange,
  type VintageShelfEntry,
} from '@/lib/resourceVintages'
import { syllabusEditions } from '@/data/syllabusVintages'
import { cn } from '@/lib/utils'
import { AddedCount, ChangePill, DroppedToggle } from '@/components/wiki/VintageChanges'
import { usePagedList } from '@/hooks/usePagedList'
import { ShowMore } from '@/components/ShowMore'

// The Exam filter is the strip of exam logos; the rest are dropdowns.
const DROPDOWN_FACETS = RESOURCE_FACETS.filter(facet => facet !== 'exam')

const EMPTY_TITLE: Record<ResourceFacet, string> = {
  exam: 'None of these resources is a syllabus reading',
  publisher: 'None of these resources names its publisher',
  year: 'None of these resources names its year',
}

/**
 * One syllabus reading on the shelf: its cover, its title, and the pills —
 * the exams it is a reading for first, since that is what the shelf is
 * scanned for, then whether it can be read here, then its bibliographic facts.
 * On a vintage's shelf, a reading the edition added leads its pills with that,
 * and — while dropped readings are shown — a dropped one is struck through and
 * dimmed: it is on the shelf to be seen, not because the edition assigns it.
 */
function ResourceShelfCard({
  book,
  change,
  edition,
  onOpen,
}: {
  book: WikiIndexItem
  change: VintageChange | null
  edition: string | null
  /** Absent for a reading the vault has no page for. */
  onOpen?: () => void
}) {
  const dropped = change === 'dropped'
  const card = (
    <Card
      className={cn(
        'h-full overflow-hidden flex flex-row items-stretch transition-all duration-150',
        onOpen && 'hover:bg-accent/40',
        change && VINTAGE_CHANGE_RING[change],
      )}
    >
      {book.coverImage && (
        <div className={cn('flex-shrink-0 p-2 pt-4 flex items-start', dropped && 'opacity-50')}>
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
        <p
          className={cn(
            'text-sm font-semibold leading-snug',
            dropped && 'text-muted-foreground line-through decoration-red-500/60',
          )}
        >
          {book.title ?? book.name}
        </p>
        {(change || book.exams?.length || book.pdf || book.author || book.year || book.edition || book.publisher) && (
          <div className="flex flex-wrap gap-1">
            {change && edition && <ChangePill change={change} edition={edition} />}
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
  )
  if (!onOpen) return <div className="h-full">{card}</div>
  return (
    <button type="button" onClick={onOpen} className="w-full text-left appearance-none bg-transparent p-0">
      {card}
    </button>
  )
}

/**
 * The Study Guides tab's **Resources** page (`/wiki/resources`): every
 * `Resources/Books` page — the syllabus readings and the documents beside
 * them — as one shelf, filtered by Exam, Publisher and Year
 * (`lib/resourceFilters.ts`), and by **Vintage** — which edition of one exam's
 * syllabus — with what that edition added marked, and what it dropped on request
 * (`lib/resourceVintages.ts`). It used to be a section at the foot of the exam
 * ladder; it is a page of its own in Learn, a row of Study Guides' home.
 *
 * The filters ride the URL, so a filtered shelf survives the browser's Back,
 * Learn's return to it from another place and a reload. A card opens its resource in
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
  // The shelf opens on the exam in focus; its address can name another exam,
  // or every exam (lib/resourceFilters.ts, `shelfExams`).
  const { focusId, setFocusId } = useExamProgress()
  const { active, exams: myExams, loading: examsLoading } = useExamInFocus()

  useEffect(() => {
    setPageRefs([])
    setExamId(null)
  }, [setPageRefs, setExamId])

  useEffect(() => {
    buildWikiIndex().then(setIndex).catch(() => setIndex([]))
  }, [])

  // Where the shelf was left is kept by the router (lib/routeScrollMemory.ts),
  // which brings a resource page's "All resources" link and Back here to it.

  // A retired reading an exam page keeps for the record is no longer that
  // exam's reading, so its card isn't tagged or counted as one.
  const books = useMemo(
    () => withCurrentExams(index.filter(i => i.category === 'document'), syllabusEditions),
    [index],
  )
  // The address, as written: what a filter change is merged into.
  const urlSelection = useMemo(() => resourceFacetsFromParams(searchParams), [searchParams])
  const focusLabel = active?.fileName ? examDisplayName(active.fileName) : null
  const shelf = useMemo(() => shelfExams(urlSelection.exam, focusLabel), [urlSelection.exam, focusLabel])
  // The shelf, as shown: the address's filters, on the exams the shelf is showing.
  const selection = useMemo(() => ({ ...urlSelection, exam: shelf.exams }), [urlSelection, shelf.exams])
  const chosenExam = shelf.exams.size > 0 ? [...shelf.exams][0] : null
  // With every exam showing, the exam the switch goes back to: the exam in focus.
  const lastExam = shelf.all ? focusLabel : null
  // An address naming several pages is an exam's regions together: "Exam 6".
  const chosenName = chosenExam ? (shelf.exams.size > 1 ? variantExamName(chosenExam) : chosenExam) : null
  // An address that names one of the reader's exams puts it in focus.
  const namedId = !shelf.fromFocus && shelf.exams.size === 1
    ? myExams.find(e => e.fileName && examDisplayName(e.fileName) === chosenExam)?.examId ?? null
    : null
  useEffect(() => {
    if (!examsLoading && namedId && focusId !== namedId) setFocusId(namedId)
  }, [examsLoading, namedId, focusId, setFocusId])
  const { label: vintageLabel, showDropped } = useMemo(() => vintageFromParams(searchParams), [searchParams])
  // One exam with its syllabus editions on file: the shelf is one edition's
  // reading list, and the Exam filter's work is done by that list.
  const vintage = useMemo(
    () => vintageView(books, selection.exam, vintageLabel, syllabusEditions),
    [books, selection.exam, vintageLabel],
  )
  const entries = useMemo<VintageShelfEntry[]>(
    () => vintage
      ? vintageShelf(books, vintage, showDropped)
      : books.map(item => ({ item, change: null, stub: false })),
    [books, vintage, showDropped],
  )
  const pool = useMemo(() => entries.map(e => e.item), [entries])
  const facetSelection = useMemo(
    () => (vintage ? { ...selection, exam: new Set<string>() } : selection),
    [vintage, selection],
  )
  const filtered = useMemo(() => {
    const kept = new Set(filterResources(pool, facetSelection))
    return entries.filter(e => kept.has(e.item))
  }, [entries, pool, facetSelection])
  // A page of the shelf at a time; the body and the filters make it a different shelf.
  const paged = usePagedList(filtered, `resources:${[...shelf.exams].join('|')}:${searchParams.toString()}`)
  // A filter rearranges the shelf: the cards that stay slide to their new places.
  const shelfRef = useFlipList<HTMLDivElement>(`${[...shelf.exams].join('|')}:${searchParams.toString()}`)
  const options = useMemo(
    () => Object.fromEntries(DROPDOWN_FACETS.map(facet => [
      facet,
      resourceFacetOptions(pool, facet, facetSelection),
    ])),
    [pool, facetSelection],
  ) as Record<ResourceFacet, ReturnType<typeof resourceFacetOptions>>

  const vintageOptions = useMemo(
    () => (vintage?.editions ?? []).map((edition, i) => ({
      value: edition.label,
      label: edition.label,
      hint: edition.source.title,
      count: vintage!.counts[i],
    })),
    [vintage],
  )

  // The popup walks what is on screen — the shelf as filtered, less the
  // readings the vault has no page for.
  const opened = useMemo(() => filtered.filter(e => !e.stub), [filtered])
  const refs = useMemo<WikiEntryRef[]>(
    () => opened.map(e => ({ kind: 'resource', name: e.item.name })),
    [opened],
  )

  // A filter is the same page showing something else, so it replaces the
  // history entry rather than stacking one per tick.
  function toggle(facet: ResourceFacet, value: string) {
    setSearchParams(resourceFacetsToParams(toggleResourceFacet(urlSelection, facet, value), searchParams), { replace: true })
  }

  // This exam, or every exam. The exam in focus needs no name in the address;
  // an exam the address named stays named. A vintage is an edition of one
  // exam's syllabus, so the change starts at the newest.
  function showAll(all: boolean) {
    const exam = new Set(all ? [ALL_EXAMS] : [])
    const next = resourceFacetsToParams({ ...urlSelection, exam }, searchParams)
    setSearchParams(vintageToParams(null, showDropped, next), { replace: true })
  }

  function chooseVintage(label: string) {
    // The newest edition is the default, so it leaves the URL clean.
    const value = vintage?.editions[0]?.label === label ? null : label
    setSearchParams(vintageToParams(value, showDropped, searchParams), { replace: true })
  }

  function toggleDropped() {
    setSearchParams(vintageToParams(vintageLabel, !showDropped, searchParams), { replace: true })
  }

  function clearFilters() {
    setSearchParams(
      vintageToParams(null, false, resourceFacetsToParams({ ...emptyResourceFacets(), exam: urlSelection.exam }, searchParams)),
      { replace: true },
    )
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-2">
        <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">Resources</h1>
        {/* The exam in focus, or the one the address names, against every exam. */}
        {(chosenName || lastExam) && (
          <SegmentedControl
            label="Exams shown"
            size="lg"
            pill
            fit
            value={shelf.all ? 'all' : 'exam'}
            onChange={value => showAll(value === 'all')}
            options={[
              { value: 'exam', label: chosenName ?? lastExam ?? '' },
              { value: 'all', label: 'All exams' },
            ]}
            className="shrink-0"
          />
        )}
      </header>

      <div className="-mt-3 flex flex-wrap items-center gap-2">
        {DROPDOWN_FACETS.map(facet => {
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
            />
          )
        })}
        <MultiSelectDropdown
          label="Syllabus edition"
          options={vintageOptions}
          selected={new Set(vintage ? [vintage.edition.label] : [])}
          onToggle={chooseVintage}
          getCount={value => vintageOptions.find(o => o.value === value)?.count ?? 0}
          emptyTitle={
            selection.exam.size === 1
              ? 'No earlier edition of this exam’s syllabus is on file'
              : 'Open one exam to see its syllabus by edition'
          }
          single
        />
      </div>

      {vintage?.previous && (
        <div className="-mt-3 flex flex-wrap items-center gap-2" data-testid="vintage-changes">
          <span className="text-sm text-muted-foreground">
            Since {vintage.previous.label}
          </span>
          <AddedCount count={vintage.added.length} />
          <DroppedToggle
            count={vintage.dropped.length}
            active={showDropped}
            onToggle={toggleDropped}
          />
        </div>
      )}

      {/* The way back across to the tab's other page, the exam ladder — the
          row the ladder carries to here, pointing the other way. Half the
          width from sm up, as it is in the ladder's guide row. Gone once an
          exam is chosen: the shelf is then that exam's, not the tab's. */}
      {!chosenExam && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <StudyGuidesPageRow page="exams" />
        </div>
      )}

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
        <>
        <div ref={shelfRef} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {paged.shown.map(entry => {
            const at = opened.indexOf(entry)
            const key = entry.stub ? `stub:${entry.item.name}` : entry.item.path
            return (
              <div key={key} data-flip={key} className="grid">
              <ResourceShelfCard
                book={entry.item}
                change={entry.change}
                edition={vintage?.edition.label ?? null}
                onOpen={entry.stub ? undefined : () => openAt(refs, at, RESOURCES_ROUTE)}
              />
              </div>
            )
          })}
        </div>
        <ShowMore nextSize={paged.nextSize} remaining={paged.remaining} noun="resources" onShowMore={paged.showMore} />
        </>
      )}
    </div>
  )
}
