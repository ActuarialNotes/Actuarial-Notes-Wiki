import { useEffect, useMemo, useState } from 'react'
import { History } from 'lucide-react'
import rawTimeline from 'virtual:resource-timeline'
import {
  toTimelineEntries,
  entriesForMonth,
  entriesNewestFirst,
  entryToRef,
} from '@/lib/resourceTimeline'
import { filterTimelineEntries } from '@/lib/resourceTimelineFilters'
import { ResourceHeatmap } from '@/components/wiki/ResourceHeatmap'
import { ResourceMonthCards } from '@/components/wiki/ResourceMonthCards'
import { ResearchFilterPanel } from '@/components/research/ResearchFilterPanel'
import { ResourceKindFilterPills } from '@/components/research/ResourceKindFilterPills'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useResearchStore } from '@/stores/researchStore'

export function ResourceTimelinePanel() {
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

  const openAt = useConceptPopup(s => s.openAt)
  const displayedEntries = useMemo(
    () => selected ? entriesForMonth(yearFilteredEntries, selected.year, selected.month) : entriesNewestFirst(yearFilteredEntries),
    [yearFilteredEntries, selected],
  )

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold flex items-center gap-2">
        <History className="h-4 w-4 text-muted-foreground" />
        Timeline
      </h2>

      {allEntries.length > 0 && (
        <>
          <ResourceKindFilterPills />

          <ResourceHeatmap
            entries={entries}
            selected={selected}
            onSelectMonth={(year, month) => setSelected({ year, month })}
            yearRange={yearRange}
            onYearRangeChange={setYearRange}
          />

          <ResearchFilterPanel />

          <ResourceMonthCards
            entries={displayedEntries}
            selected={selected}
            onClear={() => setSelected(null)}
            onOpenEntry={entry => openAt([entryToRef(entry)], 0, entry.path)}
          />
        </>
      )}
    </section>
  )
}
