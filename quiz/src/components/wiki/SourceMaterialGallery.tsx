import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { hrefToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { splitAuthors } from '@/lib/authorNames'
import { MetaPill, PdfPill } from '@/components/wiki/ResourcePills'
import {
  filterSourcesByObjectives,
  objectiveFilterOptions,
  type SourceMaterialEntry,
  type SyllabusObjective,
} from '@/lib/sourceMaterial'

// The exam study guides' source-material list, rendered as the same shelf of
// resource cards the Resources page shows (cover, title, metadata pills)
// rather than a collapsed callout of bare links. Each card carries the reading
// assignment the syllabus gives for that source.
//
// Above the shelf, a **Learning objective** filter narrows it to the sources
// read for the objectives chosen (any of them) — on 6C, the readings for C2's
// IFRS 17 valuation rather than all sixty-seven. The codes come off each reading
// assignment and the names off the page's own objectives
// (`objectiveFilterOptions`); a page whose two numberings don't agree gets no
// filter rather than a half-named one.

export interface SourceMaterialGalleryProps {
  entries: SourceMaterialEntry[]
  /** The page's numbered learning objectives, which name the filter's choices. */
  objectives?: SyllabusObjective[]
  /** Click handler shared with the article's wikilinks — see WikiArticle. */
  onOpen: (ref: WikiEntryRef, event: React.MouseEvent<HTMLAnchorElement>) => void
}

const NO_OBJECTIVES: SyllabusObjective[] = []

export function SourceMaterialGallery({ entries, objectives = NO_OBJECTIVES, onOpen }: SourceMaterialGalleryProps) {
  const [index, setIndex] = useState<WikiIndexItem[]>([])
  // The choice belongs to the shelf it was made on: a page change that keeps
  // this component mounted hands it new entries, and A1 on one exam is not A1
  // on the next — so a choice made against other entries reads as none.
  const [choice, setChoice] = useState<{ entries: SourceMaterialEntry[]; codes: ReadonlySet<string> }>(
    () => ({ entries, codes: new Set() }),
  )
  const selected = choice.entries === entries ? choice.codes : EMPTY_SELECTION
  const options = useMemo(() => objectiveFilterOptions(entries, objectives), [entries, objectives])
  const shown = useMemo(() => filterSourcesByObjectives(entries, selected), [entries, selected])

  function toggle(code: string) {
    const next = new Set(selected)
    if (next.has(code)) next.delete(code)
    else next.add(code)
    setChoice({ entries, codes: next })
  }

  useEffect(() => {
    let cancelled = false
    buildWikiIndex()
      .then(items => { if (!cancelled) setIndex(items) })
      .catch(() => { if (!cancelled) setIndex([]) })
    return () => { cancelled = true }
  }, [])

  // Resource pages, keyed by page name — how a [[wiki link]] addresses them.
  const documents = useMemo(() => {
    const map = new Map<string, WikiIndexItem>()
    for (const item of index) {
      if (item.category === 'document') map.set(item.name.toLowerCase(), item)
    }
    return map
  }, [index])

  if (entries.length === 0) return null

  const counts = new Map(options.map(o => [o.value, o.count]))

  return (
    <div className="not-prose my-4">
      {options.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <MultiSelectDropdown
            label="Learning objective"
            options={options}
            selected={selected}
            onToggle={toggle}
            getCount={code => counts.get(code) ?? 0}
          />
          {selected.size > 0 && (
            <button
              type="button"
              onClick={() => setChoice({ entries, codes: new Set() })}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden />
              Clear
            </button>
          )}
        </div>
      )}
      {/* `items-start` is what keeps a card its own size: a grid track otherwise
          stretches every card to the tallest one in its row, and a source with two
          pills and a one-line reading ends up as a tall box of empty space next to
          a source with five pills and three. */}
      <div className="source-material-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-3">
        {shown.map(entry => {
          const meta = documents.get(entry.name.toLowerCase())
          // Bare names resolve to kind 'concept', exactly as the same link does in
          // the article body, so the popup and the active-link highlight agree.
          const ref = hrefToEntryRef(entry.target) ?? { kind: 'concept' as const, name: entry.name }
          const title = meta?.title ?? entry.label
          // Standards name the same body as author and publisher — say it once,
          // as the resource page's own card does.
          const publisher = meta?.publisher === meta?.author ? undefined : meta?.publisher
          return (
            <a
              key={entry.name}
              href={wikiRoute(ref)}
              data-wikiref={`${ref.kind}:${ref.name.toLowerCase()}`}
              className="source-card block no-underline text-inherit rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={e => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                onOpen(ref, e)
              }}
            >
              <Card className="transition-all duration-150 hover:bg-accent/40 overflow-hidden flex flex-row items-stretch">
                {/* The cover sits at the top of the card, not its middle: the
                    title is what the card is scanned for, and a centred jacket
                    drifts down the card as the pills wrap onto more rows. `pt-4`
                    matches the text block's own top padding so the two start on
                    the same line. */}
                {meta?.coverImage && (
                  <div className="flex-shrink-0 p-2 pt-4 flex items-start">
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
                  <p className="text-sm font-semibold leading-snug">{title}</p>
                  {(meta?.pdf || meta?.author || meta?.year || meta?.edition || meta?.publisher) && (
                    <div className="flex flex-wrap gap-1">
                      {meta.pdf && <PdfPill />}
                      {splitAuthors(meta.author).map((author, i) => (
                        <MetaPill key={`author-${i}`}>{author}</MetaPill>
                      ))}
                      {meta.year && <MetaPill>{meta.year}</MetaPill>}
                      {meta.edition && <MetaPill>{meta.edition} ed.</MetaPill>}
                      {publisher && <MetaPill>{publisher}</MetaPill>}
                    </div>
                  )}
                  {entry.detail && (
                    <p
                      className="text-xs text-muted-foreground leading-relaxed line-clamp-3"
                      title={entry.detail}
                    >
                      {entry.detail}
                    </p>
                  )}
                </div>
              </Card>
            </a>
          )
        })}
      </div>
    </div>
  )
}

const EMPTY_SELECTION: ReadonlySet<string> = new Set()
