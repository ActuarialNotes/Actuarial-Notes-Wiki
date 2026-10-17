import { useResearchStore } from '@/stores/researchStore'

/** Number of active filter selections, for badges on the search bar's Filters toggle. */
export function useActiveFilterCount(): number {
  const filters = useResearchStore(s => s.filters)
  return (
    filters.agentIds.length +
    filters.provinces.length +
    filters.linesOfBusiness.length +
    (filters.dateFrom ? 1 : 0)
  )
}
