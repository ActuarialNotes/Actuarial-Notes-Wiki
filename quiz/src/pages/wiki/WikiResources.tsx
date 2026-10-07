import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { StudyGuidesPageRow } from '@/components/wiki/StudyGuidesPageRow'
import { ExamStrip } from '@/components/ExamStrip'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { defaultBody, loadBody, saveBody, type ExamBody } from '@/lib/bodyFilter'
import { ExamPill, MetaPill, PdfPill } from '@/components/wiki/ResourcePills'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { buildWikiIndex, bundledWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { RESOURCES_ROUTE, type WikiEntryRef } from '@/lib/wikiRoutes'
import { splitAuthors } from '@/lib/authorNames'
import {
  RESOURCE_FACETS,
  RESOURCE_FACET_LABEL,
  bodyForExam,
  emptyResourceFacets,
  filterResources,
  resourceFacetOptions,
  resourceFacetsFromParams,
  resourceFacetsToParams,
  resourceStripExams,
  resourcesForBody,
  toggleResourceFacet,
  type ResourceFacet,
} from '@/lib/resourceFilters'
import {
  vintageFromParams,
  vintageShelf,
  vintageToParams,
  vintageView,
  withCurrentExams,
  type VintageChange,
  type VintageShelfEntry,
} from '@/lib/resourceVintages'
import { syllabusEditions } from '@/data/syllabusVintages'
import { cn } from '@/lib/utils'

// The Exam filter is the strip of exam logos; the rest are dropdowns.
const DROPDOWN_FACETS = RESOURCE_FACETS.filter(facet => facet !== 'exam')

const EMPTY_TITLE: Record<ResourceFacet, string> = {
  exam: 'None of these resources is a syllabus reading',
  publisher: 'None of these resources names its publisher',
  year: 'None of these resources names its year',
}

// A changed reading wears the diff's own colours (docs/style-guide.md §4.1):
// green for what an edition added, red for what it dropped.
const CHANGE_RING: Record<VintageChange, string> = {
  added: 'ring-2 ring-green-500/60',
  dropped: 'ring-2 ring-red-500/50',
}

function ChangePill({ change, edition }: { change: VintageChange; edition: string }) {
  const Icon = change === 'added' ? Plus : Minus
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold',
        change === 'added'
          ? 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100'
          : 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
      )}
    >
      <Icon className="h-3 w-3 shrink-0" aria-hidden />
      {change === 'added' ? `New in ${edition}` : `Dropped in ${edition}`}
    </span>
  )
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
        change && CHANGE_RING[change],
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
 * What an edition added, with how many — a fact about the edition, not a
 * switch: the added readings are on its shelf and marked either way, so it
 * wears the green its cards wear and can't be pressed. (It was a toggle; turning
 * it off left the additions leading the grid with nothing saying why.)
 */
function AddedCount({ count }: { count: number }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium',
        count > 0
          ? 'border-green-500/40 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100'
          : 'bg-card opacity-40',
      )}
    >
      <Plus className="h-3.5 w-3.5 shrink-0" aria-hidden />
      Added
      <span className="text-xs tabular-nums opacity-70">{count}</span>
    </span>
  )
}

/**
 * The changes row's one toggle: put what the edition dropped back on the
 * shelf, struck through, with how many. Pressed, it wears the red the cards
 * it brings back wear.
 */
function DroppedToggle({
  count,
  active,
  onToggle,
}: {
  count: number
  active: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      disabled={count === 0}
      data-sound="select"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40',
        active
          ? 'border-red-500/40 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100'
          : 'bg-card enabled:hover:bg-accent',
      )}
    >
      <Minus className="h-3.5 w-3.5 shrink-0" aria-hidden />
      Dropped
      <span className="text-xs tabular-nums opacity-70">{count}</span>
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
  const { selectedTrack } = useExamProgress()
  // The SOA/CAS picker the Study Guides page carries, the same stored choice
  // (`lib/bodyFilter.ts`): it picks whose exams the strip offers, and with no
  // exam chosen, whose readings the shelf holds.
  const [bodyOverride, setBodyOverride] = useState<ExamBody | null>(loadBody)

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
  const examPages = useMemo(() => index.filter(i => i.category === 'exam').map(i => i.name), [index])
  const examCount = examPages.length
  const selection = useMemo(() => resourceFacetsFromParams(searchParams), [searchParams])
  const strips = useMemo(
    () => ({ SOA: resourceStripExams(examPages, 'SOA'), CAS: resourceStripExams(examPages, 'CAS') }),
    [examPages],
  )
  // The strip picks one exam at a time; an older link naming several shows the first.
  const chosenExam = selection.exam.size > 0 ? [...selection.exam][0] : null
  const body = bodyForExam(chosenExam, bodyOverride ?? defaultBody(selectedTrack), strips)
  const strip = strips[body]
  const bodyBooks = useMemo(() => resourcesForBody(books, strip), [books, strip])
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
      : (selection.exam.size > 0 ? books : bodyBooks).map(item => ({ item, change: null, stub: false })),
    [books, bodyBooks, selection.exam, vintage, showDropped],
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
    setSearchParams(resourceFacetsToParams(toggleResourceFacet(selection, facet, value), searchParams), { replace: true })
  }

  // One exam at a time, or none. A vintage is an edition of one exam's
  // syllabus, so another exam starts at its own newest.
  function chooseExam(label: string | null) {
    const exam = new Set(label ? [label] : [])
    const next = resourceFacetsToParams({ ...selection, exam }, searchParams)
    setSearchParams(vintageToParams(null, showDropped, next), { replace: true })
  }

  // The other body's ladder doesn't hold the chosen exam, so the choice goes.
  function chooseBody(next: ExamBody) {
    saveBody(next)
    setBodyOverride(next)
    if (next !== body && chosenExam) chooseExam(null)
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
      vintageToParams(null, false, resourceFacetsToParams(emptyResourceFacets(), searchParams)),
      { replace: true },
    )
  }

  return (
    <div className="space-y-6">
      {/* The same title row as the Study Guides page, picker and all: the
          two are one tab's two pages, and the body is one choice across them. */}
      <header className="flex items-center gap-2">
        <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">Resources</h1>
        <SegmentedControl
          label="Examining body"
          size="lg"
          pill
          value={body}
          onChange={chooseBody}
          options={[
            { value: 'SOA', label: 'SOA' },
            { value: 'CAS', label: 'CAS' },
          ]}
          className="shrink-0"
        />
      </header>

      <ExamStrip
        exams={strip.map(e => ({ value: e.label, name: e.label, logoKey: e.key }))}
        value={chosenExam}
        onChange={chooseExam}
        className="sm:-mx-6 sm:px-6"
      />

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
              surface="card"
            />
          )
        })}
        <MultiSelectDropdown
          label="Vintage"
          options={vintageOptions}
          selected={new Set(vintage ? [vintage.edition.label] : [])}
          onToggle={chooseVintage}
          getCount={value => vintageOptions.find(o => o.value === value)?.count ?? 0}
          emptyTitle={
            selection.exam.size === 1
              ? 'No earlier edition of this exam’s syllabus is on file'
              : 'Choose one exam to see its syllabus by edition'
          }
          surface="card"
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
          <StudyGuidesPageRow page="exams" count={examCount} />
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(entry => {
            const at = opened.indexOf(entry)
            return (
              <ResourceShelfCard
                key={entry.stub ? `stub:${entry.item.name}` : entry.item.path}
                book={entry.item}
                change={entry.change}
                edition={vintage?.edition.label ?? null}
                onOpen={entry.stub ? undefined : () => openAt(refs, at, RESOURCES_ROUTE)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
