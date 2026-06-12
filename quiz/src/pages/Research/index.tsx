import { useState } from 'react'
import { FolderPlus, X } from 'lucide-react'
import { useResearchStore, type ResearchTab } from '@/stores/researchStore'
import { useResearchQuery } from '@/hooks/useResearchQuery'
import { useAddResourceByUrl } from '@/hooks/useAddResourceByUrl'
import { useResearchProjects, useProjectDocuments } from '@/hooks/useResearchProjects'
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
  const addSourcesProjectId = useResearchStore(s => s.addSourcesProjectId)
  const setAddSourcesProject = useResearchStore(s => s.setAddSourcesProject)

  // Page-level corpus search / AI assistant (not project-scoped). Rendered as a
  // sticky top bar, exactly like the exam study-guide search.
  const { loading: asking, error: askError, result, ask, reset } = useResearchQuery()
  const addUrl = useAddResourceByUrl()
  const [addNotice, setAddNotice] = useState<string | null>(null)
  const [refreshNonce, setRefreshNonce] = useState(0)

  // "Add Sources" flow: when set, the Resources tab adds results directly into
  // this project instead of showing the "Save to…" picker.
  const { projects, addDocument } = useResearchProjects()
  const [addRefreshKey, setAddRefreshKey] = useState(0)
  const { documentIds: addToProjectIds } = useProjectDocuments(addSourcesProjectId, addRefreshKey)
  const addSourcesProject = projects.find(p => p.id === addSourcesProjectId)

  const handleAddToProject = async (documentId: string) => {
    if (!addSourcesProjectId) return
    await addDocument(addSourcesProjectId, documentId)
    setAddRefreshKey(k => k + 1)
  }

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
            {addSourcesProject && (
              <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 w-fit">
                <FolderPlus className="h-3.5 w-3.5" aria-hidden />
                Adding sources to {addSourcesProject.name}
                <button
                  type="button"
                  onClick={() => setAddSourcesProject(null)}
                  className="text-blue-700/70 hover:text-blue-700 dark:text-blue-300/70 dark:hover:text-blue-300"
                  aria-label="Stop adding sources to this project"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            <AiAnswerPanel loading={asking} error={askError} result={result} onDismiss={reset} />
            <ResourcesView
              refreshNonce={refreshNonce}
              addToProjectId={addSourcesProjectId}
              addToProjectIds={addToProjectIds}
              onAddToProject={handleAddToProject}
            />
          </>
        )}
        {/* Reader for timeline cards (books / events / regulation). */}
        <ConceptPopup />
      </div>
    </div>
  )
}
