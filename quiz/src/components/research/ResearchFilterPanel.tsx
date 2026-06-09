import { useState } from 'react'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'
import { useResearchStore } from '@/stores/researchStore'
import { allAgents, allLinesOfBusiness, agentMeta, lobMeta } from '@/lib/researchOntology'

// Provinces that appear in the seeded agents' jurisdictions (researchOntology.ts),
// plus 'ATL' for the Atlantic-grouped multi-provincial filings.
const PROVINCES = ['ON', 'AB', 'QC', 'BC', 'ATL', 'NB', 'NL', 'NS', 'PE']

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

// A short human summary of the active filters, shown on the collapsed header so
// users can see their scope without expanding the panel.
function activeFilterSummary(
  agentIds: string[],
  provinces: string[],
  lobs: string[],
  dateFrom: string | null,
): string[] {
  const parts: string[] = []
  if (agentIds.length > 0) {
    parts.push(agentIds.map(id => agentMeta(id)?.shortName ?? id).slice(0, 3).join(', ') + (agentIds.length > 3 ? ` +${agentIds.length - 3}` : ''))
  }
  if (provinces.length > 0) parts.push(provinces.join('/'))
  if (lobs.length > 0) parts.push(lobs.map(s => lobMeta(s)?.label ?? s).join(', '))
  if (dateFrom) {
    const preset = DATE_PRESETS.find(p => daysAgoISO(p.days) === dateFrom)
    parts.push(preset ? preset.label.toLowerCase() : `since ${dateFrom}`)
  }
  return parts
}

export function ResearchFilterPanel() {
  const filters = useResearchStore(s => s.filters)
  const toggleAgent = useResearchStore(s => s.toggleAgent)
  const toggleProvince = useResearchStore(s => s.toggleProvince)
  const clearProvinces = useResearchStore(s => s.clearProvinces)
  const toggleLineOfBusiness = useResearchStore(s => s.toggleLineOfBusiness)
  const clearLinesOfBusiness = useResearchStore(s => s.clearLinesOfBusiness)
  const setDateRange = useResearchStore(s => s.setDateRange)
  const resetFilters = useResearchStore(s => s.resetFilters)

  const [expanded, setExpanded] = useState(false)

  const activeCount =
    filters.agentIds.length +
    filters.provinces.length +
    filters.linesOfBusiness.length +
    (filters.dateFrom ? 1 : 0)
  const hasFilters = activeCount > 0
  const summary = activeFilterSummary(filters.agentIds, filters.provinces, filters.linesOfBusiness, filters.dateFrom)

  function handleDatePreset(days: number) {
    const from = daysAgoISO(days)
    setDateRange(filters.dateFrom === from ? null : from, null)
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          type="button"
          onClick={() => setExpanded(e => !e)}
          className="flex flex-1 items-center gap-2 text-sm font-medium text-foreground"
          aria-expanded={expanded}
        >
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden />
          Filters
          {hasFilters && (
            <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
              {activeCount}
            </span>
          )}
          {!expanded && summary.length > 0 && (
            <span className="truncate text-xs font-normal text-muted-foreground">· {summary.join(' · ')}</span>
          )}
          <ChevronDown
            className={`ml-auto h-4 w-4 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
        {hasFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" aria-hidden /> Clear
          </button>
        )}
      </div>

      {expanded && (
        <div className="space-y-3 border-t px-3 py-3">
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
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Province</p>
            <div className="flex flex-wrap gap-1.5">
              <button type="button" onClick={clearProvinces} className={chipClass(filters.provinces.length === 0)}>
                All
              </button>
              {PROVINCES.map(province => (
                <button
                  key={province}
                  type="button"
                  onClick={() => toggleProvince(province)}
                  className={chipClass(filters.provinces.includes(province))}
                >
                  {province}
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
      )}
    </div>
  )
}
