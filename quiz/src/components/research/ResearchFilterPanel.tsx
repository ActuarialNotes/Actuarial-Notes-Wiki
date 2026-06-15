import { X } from 'lucide-react'
import { useResearchStore } from '@/stores/researchStore'
import { allAgents, allLinesOfBusiness } from '@/lib/researchOntology'

// Jurisdictions that appear in the seeded agents' coverage (researchOntology.ts),
// plus 'ATL' for the Atlantic-grouped multi-provincial filings. Includes
// federally-regulated filings (no province) via the "All" option.
const JURISDICTIONS = ['ON', 'AB', 'QC', 'BC', 'ATL', 'NB', 'NL', 'NS', 'PE']

const DATE_PRESETS = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
] as const

function daysAgoISO(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

function chipClass(active: boolean): string {
  return `rounded-full border px-2.5 py-1 text-xs transition-colors ${
    active
      ? 'border-primary bg-primary/10 text-primary'
      : 'border-input text-muted-foreground hover:text-foreground hover:bg-accent/60'
  }`
}

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

// Filter chip groups (Source, Jurisdiction, Line of business, Published) for the
// Research tab. Embedded directly in the search bar's expanded dropdown
// (ResearchTopSearch) — the search bar owns visibility/toggling, this component
// just renders the chip groups against the shared researchStore filters.
export function ResearchFilterPanel() {
  const filters = useResearchStore(s => s.filters)
  const toggleAgent = useResearchStore(s => s.toggleAgent)
  const toggleProvince = useResearchStore(s => s.toggleProvince)
  const clearProvinces = useResearchStore(s => s.clearProvinces)
  const toggleLineOfBusiness = useResearchStore(s => s.toggleLineOfBusiness)
  const clearLinesOfBusiness = useResearchStore(s => s.clearLinesOfBusiness)
  const setDateRange = useResearchStore(s => s.setDateRange)
  const resetFilters = useResearchStore(s => s.resetFilters)

  const activeCount = useActiveFilterCount()

  function handleDatePreset(days: number) {
    const from = daysAgoISO(days)
    setDateRange(filters.dateFrom === from ? null : from, null)
  }

  return (
    <div className="space-y-3">
      {activeCount > 0 && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" aria-hidden /> Clear filters
          </button>
        </div>
      )}

      <div>
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Source</p>
        <div className="flex flex-wrap gap-1.5">
          {allAgents().map(agent => (
            <button
              key={agent.id}
              type="button"
              onClick={() => toggleAgent(agent.id)}
              className={chipClass(filters.agentIds.includes(agent.id))}
            >
              {agent.shortName}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Jurisdiction</p>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={clearProvinces} className={chipClass(filters.provinces.length === 0)}>
            All
          </button>
          {JURISDICTIONS.map(jurisdiction => (
            <button
              key={jurisdiction}
              type="button"
              onClick={() => toggleProvince(jurisdiction)}
              className={chipClass(filters.provinces.includes(jurisdiction))}
            >
              {jurisdiction}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Line of business</p>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={clearLinesOfBusiness} className={chipClass(filters.linesOfBusiness.length === 0)}>
            All
          </button>
          {allLinesOfBusiness().map(lob => (
            <button
              key={lob.slug}
              type="button"
              onClick={() => toggleLineOfBusiness(lob.slug)}
              className={chipClass(filters.linesOfBusiness.includes(lob.slug))}
            >
              {lob.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Published</p>
        <div className="flex flex-wrap gap-1.5">
          {DATE_PRESETS.map(({ label, days }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleDatePreset(days)}
              className={chipClass(filters.dateFrom === daysAgoISO(days))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
