import { useResearchStore, type ResearchTab } from '@/stores/researchStore'
import { allAgents } from '@/lib/researchOntology'
import MonitorView from './MonitorView'
import ResearchView from './ResearchView'
import BenchmarkView from './BenchmarkView'

const TABS: { id: ResearchTab; label: string }[] = [
  { id: 'monitor', label: 'Monitor' },
  { id: 'ask', label: 'Ask' },
  { id: 'benchmarks', label: 'Benchmarks' },
]

// Provinces that appear in the seeded agents' jurisdictions (researchOntology.ts),
// plus 'ATL' for the Atlantic-grouped multi-provincial filings.
const PROVINCES = ['ON', 'AB', 'QC', 'BC', 'ATL', 'NB', 'NL', 'NS', 'PE']

function chipClass(active: boolean): string {
  return `rounded-full border px-2.5 py-1 text-xs transition-colors ${
    active
      ? 'border-primary bg-primary/10 text-primary'
      : 'border-input text-muted-foreground hover:text-foreground hover:bg-accent/60'
  }`
}

function FilterBar() {
  const filters = useResearchStore(s => s.filters)
  const toggleAgent = useResearchStore(s => s.toggleAgent)
  const toggleProvince = useResearchStore(s => s.toggleProvince)
  const resetFilters = useResearchStore(s => s.resetFilters)
  const hasFilters = filters.agentIds.length > 0 || filters.provinces.length > 0

  return (
    <div className="space-y-2.5">
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
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-muted-foreground mr-1">Province</span>
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
        {hasFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-muted-foreground hover:text-foreground underline ml-1"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

export default function Research() {
  const tab = useResearchStore(s => s.tab)
  const setTab = useResearchStore(s => s.setTab)

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Research</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track Canadian P&amp;C insurance regulatory and financial filings, and ask grounded
          questions over the corpus — every claim cites a document and page.
        </p>
      </div>

      <div className="flex border-b">
        {TABS.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === t.id
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <FilterBar />

      {tab === 'monitor' && <MonitorView />}
      {tab === 'ask' && <ResearchView />}
      {tab === 'benchmarks' && <BenchmarkView />}
    </div>
  )
}
