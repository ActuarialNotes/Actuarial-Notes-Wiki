import { useResearchStore, type ResearchTab } from '@/stores/researchStore'
import { CorpusScorecard } from '@/components/research/CorpusScorecard'
import { ResearchFilterPanel } from '@/components/research/ResearchFilterPanel'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import ResourcesView from './ResourcesView'
import BenchmarkView from './BenchmarkView'
import ProjectsView from './ProjectsView'

const TABS: { id: ResearchTab; label: string }[] = [
  { id: 'resources', label: 'Resources' },
  { id: 'benchmarks', label: 'Benchmarks' },
  { id: 'projects', label: 'Projects' },
]

export default function Research() {
  const tab = useResearchStore(s => s.tab)
  const setTab = useResearchStore(s => s.setTab)

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Research</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Search Canadian P&amp;C insurance bulletins, guidance, regulations, and financial filings,
          collect citeable sources into projects, and ask grounded questions — every claim cites a
          document and page.
        </p>
      </div>

      <CorpusScorecard />

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

      {tab === 'resources' && <ResourcesView />}
      {tab === 'benchmarks' && (
        <>
          <ResearchFilterPanel />
          <BenchmarkView />
        </>
      )}
      {tab === 'projects' && <ProjectsView />}

      {/* Reader for timeline cards (books / events / regulation). */}
      <ConceptPopup />
    </div>
  )
}
