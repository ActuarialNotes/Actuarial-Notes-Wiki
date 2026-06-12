import { useState } from 'react'
import { useResearchStore, type ResearchTab } from '@/stores/researchStore'
import { useResearchQuery } from '@/hooks/useResearchQuery'
import { useAddResourceByUrl } from '@/hooks/useAddResourceByUrl'
import { ResearchTopSearch } from '@/components/research/ResearchTopSearch'
import { AiAnswerPanel } from '@/components/research/AiAnswerPanel'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import ResourcesView from './ResourcesView'
import ProjectsView from './ProjectsView'

const TABS: { id: ResearchTab; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'resources', label: 'Resources' },
]

export default function Research() {
  const tab = useResearchStore(s => s.tab)
  const setTab = useResearchStore(s => s.setTab)

  // Page-level corpus search / AI assistant (not project-scoped). Rendered as a
  // sticky top bar, exactly like the exam study-guide search.
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
    <div>
      <ResearchTopSearch
        onAsk={q => ask(q)}
        asking={asking}
        onAddUrl={handleAddUrl}
        addingUrl={addUrl.loading}
        addError={addUrl.error}
        addNotice={addNotice}
        onActivate={() => setTab('resources')}
      />

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold">Research</h1>

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
        {/* Reader for timeline cards (books / events / regulation). */}
        <ConceptPopup />
      </div>
    </div>
  )
}
