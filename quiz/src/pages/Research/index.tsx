import { useState } from 'react'
import { useResearchStore, type ResearchTab } from '@/stores/researchStore'
import { useResearchQuery } from '@/hooks/useResearchQuery'
import { useAddResourceByUrl } from '@/hooks/useAddResourceByUrl'
import { ResearchSearchBar } from '@/components/research/ResearchSearchBar'
import { AiAnswerPanel } from '@/components/research/AiAnswerPanel'
import { ResearchFilterPanel } from '@/components/research/ResearchFilterPanel'
import ResourcesView from './ResourcesView'
import BenchmarkView from './BenchmarkView'
import ProjectsView from './ProjectsView'

const TABS: { id: ResearchTab; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'resources', label: 'Resources' },
  { id: 'benchmarks', label: 'Benchmarks' },
]

export default function Research() {
  const tab = useResearchStore(s => s.tab)
  const setTab = useResearchStore(s => s.setTab)

  // Page-level corpus search / AI assistant (not project-scoped). Lives above
  // the tabs so search sits at the top of the page, like the other tabs' search.
  const { loading: asking, error: askError, result, ask, reset } = useResearchQuery()
  const addUrl = useAddResourceByUrl()
  const [addNotice, setAddNotice] = useState<string | null>(null)
  const [refreshNonce, setRefreshNonce] = useState(0)

  const handleAddUrl = async (url: string) => {
    setAddNotice(null)
    const res = await addUrl.add(url)
    if (res) {
      const verb = res.status === 'duplicate' ? 'Already in the corpus' : 'Added'
      const review = res.document.is_in_review ? ' (pending review)' : ''
      setAddNotice(`${verb}: ${res.document.title}${review}.`)
      setRefreshNonce(n => n + 1)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Research</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Search Canadian P&amp;C insurance bulletins, guidance, regulations, and financial filings,
          gather citeable sources into projects, and run the analysis with AI — every claim cites a
          document and page.
        </p>
      </div>

      <ResearchSearchBar
        onAsk={q => ask(q)}
        asking={asking}
        onAddUrl={handleAddUrl}
        addingUrl={addUrl.loading}
        addError={addUrl.error}
        addNotice={addNotice}
        onActivate={() => setTab('resources')}
      />

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

      {tab === 'projects' && <ProjectsView />}
      {tab === 'resources' && (
        <>
          <AiAnswerPanel loading={asking} error={askError} result={result} onDismiss={reset} />
          <ResourcesView refreshNonce={refreshNonce} />
        </>
      )}
      {tab === 'benchmarks' && (
        <>
          <ResearchFilterPanel />
          <BenchmarkView />
        </>
      )}
    </div>
  )
}
