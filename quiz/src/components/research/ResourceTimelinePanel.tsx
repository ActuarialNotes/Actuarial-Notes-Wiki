import { useEffect, useMemo, useState } from 'react'
import { Check, ChevronDown, ChevronUp, History, Loader2, Plus, X } from 'lucide-react'
import rawTimeline from 'virtual:resource-timeline'
import {
  toTimelineEntries,
  entriesForMonth,
  entriesNewestFirst,
  entryToRef,
  type TimelineEntry,
} from '@/lib/resourceTimeline'
import { filterTimelineEntries } from '@/lib/resourceTimelineFilters'
import { ResourceHeatmap } from '@/components/wiki/ResourceHeatmap'
import { ResourceMonthCards } from '@/components/wiki/ResourceMonthCards'
import { ResourceKindFilterPills } from '@/components/research/ResourceKindFilterPills'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useResearchStore } from '@/stores/researchStore'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

type SortKey = 'date' | 'title' | 'author'

// "Add to project" control for a timeline entry — saves it into
// research_project_wiki_items (the same table the wiki popup's "Add to
// Project" menu item writes to; see AddToProjectMenuItem.tsx).
export function AddEntryButton({
  entry,
  added,
  onAdd,
}: {
  entry: TimelineEntry
  added: boolean
  onAdd: (entry: TimelineEntry) => Promise<void>
}) {
  const [busy, setBusy] = useState(false)
  const handleClick = async () => {
    setBusy(true)
    await onAdd(entry)
    setBusy(false)
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={added || busy}
      className="flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground disabled:opacity-60"
    >
      {busy ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : added ? (
        <Check className="h-3.5 w-3.5 text-primary" />
      ) : (
        <Plus className="h-3.5 w-3.5" />
      )}
      {added ? 'Added' : 'Add'}
    </button>
  )
}

interface ResourceTimelinePanelProps {
  /** When set, renders an "Add to project" action on each entry, saving into this project's Saved Pages. */
  addToProjectId?: string | null
  /** Keys (`${WikiEntryRef.kind}:${WikiEntryRef.name}`) already saved to the active project. */
  addedWikiKeys?: Set<string>
  onAddEntry?: (ref: WikiEntryRef) => Promise<void>
}

export function ResourceTimelinePanel({ addToProjectId, addedWikiKeys, onAddEntry }: ResourceTimelinePanelProps) {
  const allEntries = useMemo(() => toTimelineEntries(rawTimeline), [])
  const filters = useResearchStore(s => s.filters)
  const entries = useMemo(() => filterTimelineEntries(allEntries, filters), [allEntries, filters])

  // Year range selected on the heatmap further narrows the entries shown below.
  const [yearRange, setYearRange] = useState<[number, number] | null>(null)
  const yearFilteredEntries = useMemo(() => {
    if (!yearRange) return entries
    const [start, end] = yearRange
    return entries.filter(e => e.year >= start && e.year <= end)
  }, [entries, yearRange])

  // No month selected → show all resources matching the active filters.
  const [selected, setSelected] = useState<{ year: number; month: number } | null>(null)

  // Re-anchor the selection when the filters narrow the entries (e.g. the
  // previously selected month no longer has anything in it).
  useEffect(() => {
    setSelected(prev => {
      if (prev && entriesForMonth(yearFilteredEntries, prev.year, prev.month).length > 0) return prev
      return null
    })
    // yearFilteredEntries already depends on filters/yearRange; re-run only when it changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearFilteredEntries])

  const [sortBy, setSortBy] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortDir(key === 'date' ? 'desc' : 'asc')
    }
  }

  const openAt = useConceptPopup(s => s.openAt)
  const displayedEntries = useMemo(
    () => selected ? entriesForMonth(yearFilteredEntries, selected.year, selected.month) : entriesNewestFirst(yearFilteredEntries),
    [yearFilteredEntries, selected],
  )

  const sortedEntries = useMemo(() => {
    return [...displayedEntries].sort((a, b) => {
      let cmp = 0
      if (sortBy === 'date') {
        cmp = a.date.localeCompare(b.date)
      } else if (sortBy === 'title') {
        cmp = a.title.localeCompare(b.title)
      } else {
        const aA = a.author ?? ''
        const bA = b.author ?? ''
        if (!aA && bA) return 1
        if (aA && !bA) return -1
        cmp = aA.localeCompare(bA)
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [displayedEntries, sortBy, sortDir])

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold flex items-center gap-2">
        <History className="h-4 w-4 text-muted-foreground" />
        Timeline
        {yearRange && (
          <>
            <span className="text-sm font-normal text-muted-foreground tabular-nums">
              {yearRange[0]}–{yearRange[1]}
            </span>
            <button
              type="button"
              onClick={() => setYearRange(null)}
              aria-label="Clear year range"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </h2>

      {allEntries.length > 0 && (
        <>
          <ResourceHeatmap
            entries={entries}
            selected={selected}
            onSelectMonth={(year, month) => setSelected({ year, month })}
            yearRange={yearRange}
            onYearRangeChange={setYearRange}
          />

          <ResourceKindFilterPills />

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground shrink-0">Sort:</span>
            {(['date', 'title', 'author'] as SortKey[]).map(key => {
              const active = sortBy === key
              const label = key === 'date' ? 'Date' : key === 'title' ? 'Title' : 'Author'
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSort(key)}
                  className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                    active
                      ? 'border-foreground/30 bg-foreground/10 text-foreground'
                      : 'border-border text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                  }`}
                >
                  {label}
                  {active && (sortDir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                </button>
              )
            })}
          </div>

          <ResourceMonthCards
            entries={sortedEntries}
            selected={selected}
            onClear={() => setSelected(null)}
            onOpenEntry={entry => openAt([entryToRef(entry)], 0, entry.path)}
            action={addToProjectId && onAddEntry ? entry => {
              const ref = entryToRef(entry)
              return (
                <AddEntryButton
                  entry={entry}
                  added={addedWikiKeys?.has(`${ref.kind}:${ref.name}`) ?? false}
                  onAdd={e => onAddEntry(entryToRef(e))}
                />
              )
            } : undefined}
          />
        </>
      )}
    </section>
  )
}
