import { useEffect, useMemo, useState } from 'react'
import { History } from 'lucide-react'
import rawTimeline from 'virtual:resource-timeline'
import {
  toTimelineEntries,
  entriesForMonth,
  latestPopulatedMonth,
  type TimelineEntry,
} from '@/lib/resourceTimeline'
import { filterTimelineEntries } from '@/lib/resourceTimelineFilters'
import { ResourceHeatmap } from '@/components/wiki/ResourceHeatmap'
import { ResourceMonthCards } from '@/components/wiki/ResourceMonthCards'
import { ResearchFilterPanel } from '@/components/research/ResearchFilterPanel'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useResearchStore } from '@/stores/researchStore'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

// Map a timeline entry to a popup-viewer ref. Books open as 'resource' (so the
// metadata card renders); events/regulation open via their explicit repo path,
// which also handles the `type: event` file that lives in Resources/Regulation/.
function entryToRef(entry: TimelineEntry): WikiEntryRef {
  const kind: WikiEntryRef['kind'] =
    entry.kind === 'book' || entry.kind === 'benchmark' ? 'resource'
    : entry.kind === 'regulation' ? 'regulation'
    : 'event'
  return { kind, name: entry.name, path: entry.path }
}

export function ResourceTimelinePanel() {
  const allEntries = useMemo(() => toTimelineEntries(rawTimeline), [])
  const filters = useResearchStore(s => s.filters)
  const entries = useMemo(() => filterTimelineEntries(allEntries, filters), [allEntries, filters])
  const [selected, setSelected] = useState<{ year: number; month: number } | null>(
    () => latestPopulatedMonth(entries),
  )

  // Re-anchor the selection when the filters narrow the entries (e.g. the
  // previously selected month no longer has anything in it).
  useEffect(() => {
    setSelected(prev => {
      if (prev && entriesForMonth(entries, prev.year, prev.month).length > 0) return prev
      return latestPopulatedMonth(entries)
    })
    // entries already depends on filters; re-run only when it changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries])

  const openAt = useConceptPopup(s => s.openAt)
  const monthEntries = useMemo(
    () => selected ? entriesForMonth(entries, selected.year, selected.month) : [],
    [entries, selected],
  )

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold flex items-center gap-2">
        <History className="h-4 w-4 text-muted-foreground" />
        Timeline
      </h2>

      <ResearchFilterPanel />

      {allEntries.length > 0 && (
        <>
          <ResourceHeatmap
            entries={entries}
            selected={selected}
            onSelectMonth={(year, month) => setSelected({ year, month })}
          />

          {selected && (
            <ResourceMonthCards
              entries={monthEntries}
              year={selected.year}
              month={selected.month}
              onClear={() => setSelected(null)}
              onOpenEntry={entry => openAt([entryToRef(entry)], 0, entry.path)}
            />
          )}
        </>
      )}
    </section>
  )
}
