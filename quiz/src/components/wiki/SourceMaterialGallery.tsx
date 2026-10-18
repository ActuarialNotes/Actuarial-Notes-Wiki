import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { buildWikiIndex, bundledWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { splitAuthors } from '@/lib/authorNames'
import { MetaPill, PdfPill } from '@/components/wiki/ResourcePills'
import { AddedCount, ChangePill, DroppedToggle } from '@/components/wiki/VintageChanges'
import {
  RESOURCE_FACET_LABEL,
  emptyResourceFacets,
  filterResources,
  resourceFacetOptions,
  toggleResourceFacet,
  type ResourceFacet,
  type ResourceFacetSelection,
} from '@/lib/resourceFilters'
import { VINTAGE_CHANGE_RING } from '@/lib/resourceVintages'
import { syllabusEditions } from '@/data/syllabusVintages'
import { cn } from '@/lib/utils'
import {
  filterSourcesByObjectives,
  objectiveFilterOptions,
  sourceEntryRef,
  sourceMaterialShelf,
  type SourceMaterialEntry,
  type SyllabusObjective,
} from '@/lib/sourceMaterial'

// The exam study guides' source-material list, rendered as the same shelf of
// resource cards the Resources page shows (cover, title, metadata pills)
// rather than a collapsed callout of bare links. Each card carries the reading
// assignment the syllabus gives for that source.
//
// Above the shelf sit the Resources page's own filters — **Publisher**,
// **Year** and **Vintage** (which edition of this exam's syllabus, with what it
// added marked and what it dropped put back on request, `sourceMaterialShelf`)
// — less the Exam strip, since the page is one exam. Beside them, a
// **Learning objective** filter narrows the shelf to the sources read for the
// objectives chosen (any of them) — on 6C, the readings for C2's IFRS 17
// valuation rather than all sixty-seven. The codes come off each reading
// assignment and the names off the page's own objectives
// (`objectiveFilterOptions`); a page whose two numberings don't agree gets no
// such filter rather than a half-named one.

export interface SourceMaterialGalleryProps {
  entries: SourceMaterialEntry[]
  /** The page's numbered learning objectives, which name the filter's choices. */
  objectives?: SyllabusObjective[]
  /** The exam the page is the study guide for, as a resource's `exams` name it (`Exam 6C`). */
  exam?: string | null
  /** Click handler shared with the article's wikilinks — see WikiArticle. */
  onOpen: (ref: WikiEntryRef, event: React.MouseEvent<HTMLAnchorElement>) => void
}

const NO_OBJECTIVES: SyllabusObjective[] = []
const DROPDOWN_FACETS: readonly ResourceFacet[] = ['publisher', 'year']

const EMPTY_TITLE: Partial<Record<ResourceFacet, string>> = {
  publisher: 'None of these resources names its publisher',
  year: 'None of these resources names its year',
}

interface ShelfChoice {
  codes: ReadonlySet<string>
  facets: ResourceFacetSelection
  vintage: string | null
  showDropped: boolean
}

function noChoice(): ShelfChoice {
  return { codes: new Set(), facets: emptyResourceFacets(), vintage: null, showDropped: false }
}

export function SourceMaterialGallery({ entries, objectives = NO_OBJECTIVES, exam = null, onOpen }: SourceMaterialGalleryProps) {
  // Seeded from the bundle, as the Resources page is, so the shelf's
  // filters are there on the first frame.
  const [index, setIndex] = useState<WikiIndexItem[]>(() => bundledWikiIndex() ?? [])
  // The choice belongs to the shelf it was made on: a page change that keeps
  // this component mounted hands it new entries, and A1 on one exam is not A1
  // on the next — so a choice made against other entries reads as none.
  const [made, setMade] = useState<{ entries: SourceMaterialEntry[]; choice: ShelfChoice }>(
    () => ({ entries, choice: noChoice() }),
  )
  const choice = made.entries === entries ? made.choice : NO_CHOICE
  const update = (next: Partial<ShelfChoice>) => setMade({ entries, choice: { ...choice, ...next } })

  useEffect(() => {
    let cancelled = false
    buildWikiIndex()
      .then(items => { if (!cancelled) setIndex(items) })
      .catch(() => { /* keep the bundled index */ })
    return () => { cancelled = true }
  }, [])

  const { shelf, vintage } = useMemo(
    () => sourceMaterialShelf(entries, index, exam, choice.vintage, choice.showDropped, syllabusEditions),
    [entries, index, exam, choice.vintage, choice.showDropped],
  )
  const pool = useMemo(() => shelf.map(e => e.item), [shelf])
  const facetOptions = useMemo(
    () => Object.fromEntries(DROPDOWN_FACETS.map(facet => [facet, resourceFacetOptions(pool, facet, choice.facets)])),
    [pool, choice.facets],
  ) as Record<ResourceFacet, ReturnType<typeof resourceFacetOptions>>
  const objectiveOptions = useMemo(() => objectiveFilterOptions(entries, objectives), [entries, objectives])
  const shown = useMemo(() => {
    const kept = new Set(filterResources(pool, choice.facets))
    const byObjective = new Set(filterSourcesByObjectives(entries, choice.codes))
    return shelf.filter(e => kept.has(e.item) && (choice.codes.size === 0 || (e.source && byObjective.has(e.source))))
  }, [shelf, pool, entries, choice.facets, choice.codes])

  const vintageOptions = useMemo(
    () => (vintage?.editions ?? []).map((edition, i) => ({
      value: edition.label,
      label: edition.label,
      hint: edition.source.title,
      count: vintage!.counts[i],
    })),
    [vintage],
  )

  if (entries.length === 0) return null

  const filtered = choice.codes.size > 0 || DROPDOWN_FACETS.some(f => choice.facets[f].size > 0)
    || choice.vintage !== null || choice.showDropped
  const objectiveCounts = new Map(objectiveOptions.map(o => [o.value, o.count]))

  function toggleCode(code: string) {
    const next = new Set(choice.codes)
    if (next.has(code)) next.delete(code)
    else next.add(code)
    update({ codes: next })
  }

  function chooseVintage(label: string) {
    // The newest edition is the default.
    update({ vintage: vintage?.editions[0]?.label === label ? null : label })
  }

  return (
    <div className="not-prose my-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {DROPDOWN_FACETS.map(facet => {
          const opts = facetOptions[facet]
          const counts = new Map(opts.map(o => [o.value, o.count]))
          return (
            <MultiSelectDropdown
              key={facet}
              label={RESOURCE_FACET_LABEL[facet]}
              options={opts}
              selected={choice.facets[facet]}
              onToggle={value => update({ facets: toggleResourceFacet(choice.facets, facet, value) })}
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
          emptyTitle="No earlier edition of this exam’s syllabus is on file"
          surface="card"
          single
        />
        {objectiveOptions.length > 0 && (
          <MultiSelectDropdown
            label="Learning objective"
            options={objectiveOptions}
            selected={choice.codes}
            onToggle={toggleCode}
            getCount={code => objectiveCounts.get(code) ?? 0}
            surface="card"
          />
        )}
        {filtered && (
          <button
            type="button"
            onClick={() => update(noChoice())}
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden />
            Clear
          </button>
        )}
      </div>
      {vintage?.previous && (
        <div className="mb-3 flex flex-wrap items-center gap-2" data-testid="vintage-changes">
          <span className="text-sm text-muted-foreground">Since {vintage.previous.label}</span>
          <AddedCount count={vintage.added.length} />
          <DroppedToggle
            count={vintage.dropped.length}
            active={choice.showDropped}
            onToggle={() => update({ showDropped: !choice.showDropped })}
          />
        </div>
      )}
      {shown.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-4 py-10 text-center">
          <p className="text-sm text-muted-foreground">No sources match these filters.</p>
          <button
            type="button"
            onClick={() => update(noChoice())}
            className="rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Clear filters
          </button>
        </div>
      )}
      {/* `items-start` is what keeps a card its own size: a grid track otherwise
          stretches every card to the tallest one in its row, and a source with two
          pills and a one-line reading ends up as a tall box of empty space next to
          a source with five pills and three. */}
      <div className="source-material-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-3">
        {shown.map(({ item, change, source }) => {
          const meta = item.path ? item : undefined
          const dropped = change === 'dropped'
          // A reading with a resource page opens that page, whatever its link
          // calls it — a bare `[[OSFI MCT]]` would otherwise look in Concepts/.
          // One only another edition assigns opens its resource page, if any.
          const ref: WikiEntryRef | null = source
            ? sourceEntryRef(source, meta?.path)
            : meta ? { kind: 'resource', name: item.name } : null
          const title = item.title ?? source?.label ?? item.name
          // Standards name the same body as author and publisher — say it once,
          // as the resource page's own card does.
          const publisher = meta?.publisher === meta?.author ? undefined : meta?.publisher
          const card = (
            <Card
              className={cn(
                'transition-all duration-150 overflow-hidden flex flex-row items-stretch',
                ref && 'hover:bg-accent/40',
                change && VINTAGE_CHANGE_RING[change],
              )}
            >
              {/* The cover sits at the top of the card, not its middle: the
                  title is what the card is scanned for, and a centred jacket
                  drifts down the card as the pills wrap onto more rows. `pt-4`
                  matches the text block's own top padding so the two start on
                  the same line. */}
              {meta?.coverImage && (
                <div className={cn('flex-shrink-0 p-2 pt-4 flex items-start', dropped && 'opacity-50')}>
                  <img
                    src={meta.coverImage}
                    alt={title}
                    className="w-16 sm:w-20 rounded-md object-contain max-h-28 bg-muted/20"
                    loading="lazy"
                    onError={e => {
                      const p = e.currentTarget.parentElement
                      if (p) p.style.display = 'none'
                    }}
                  />
                </div>
              )}
              <div className="p-4 flex flex-col gap-2 flex-1 min-w-0">
                <p
                  className={cn(
                    'text-sm font-semibold leading-snug',
                    dropped && 'text-muted-foreground line-through decoration-red-500/60',
                  )}
                >
                  {title}
                </p>
                {(change || meta?.pdf || meta?.author || meta?.year || meta?.edition || meta?.publisher) && (
                  <div className="flex flex-wrap gap-1">
                    {change && vintage && <ChangePill change={change} edition={vintage.edition.label} />}
                    {meta?.pdf && <PdfPill />}
                    {splitAuthors(meta?.author).map((author, i) => (
                      <MetaPill key={`author-${i}`}>{author}</MetaPill>
                    ))}
                    {meta?.year && <MetaPill>{meta.year}</MetaPill>}
                    {meta?.edition && <MetaPill>{meta.edition} ed.</MetaPill>}
                    {publisher && <MetaPill>{publisher}</MetaPill>}
                  </div>
                )}
                {source?.detail && (
                  <p
                    className="text-xs text-muted-foreground leading-relaxed line-clamp-3"
                    title={source.detail}
                  >
                    {source.detail}
                  </p>
                )}
              </div>
            </Card>
          )
          const key = `${item.path || 'stub'}:${item.name}`
          if (!ref) return <div key={key}>{card}</div>
          return (
            <a
              key={key}
              href={wikiRoute(ref)}
              data-wikiref={`${ref.kind}:${ref.name.toLowerCase()}`}
              className="source-card block no-underline text-inherit rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={e => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                onOpen(ref, e)
              }}
            >
              {card}
            </a>
          )
        })}
      </div>
    </div>
  )
}

const NO_CHOICE: ShelfChoice = noChoice()
