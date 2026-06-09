import { useState, type FormEvent } from 'react'
import { Loader2, FolderOpen, Plus, ChevronLeft, Trash2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useResearchStore } from '@/stores/researchStore'
import { useResearchProjects, useProjectDocuments } from '@/hooks/useResearchProjects'
import ResourcesView from './ResourcesView'

export default function ProjectsView() {
  const openProjectId = useResearchStore(s => s.openProjectId)
  return openProjectId ? <ProjectDetail projectId={openProjectId} /> : <ProjectList />
}

// ── Project list ──────────────────────────────────────────────────────────────

function ProjectList() {
  const { projects, loading, error, createProject, deleteProject } = useResearchProjects()
  const setOpenProject = useResearchStore(s => s.setOpenProject)
  const [name, setName] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || creating) return
    setCreating(true)
    const project = await createProject(name)
    setCreating(false)
    setName('')
    if (project) setOpenProject(project.id)
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-muted-foreground">
          Collect citeable sources into a working set, then search and ask grounded questions scoped to
          just that set.
        </p>
      </div>

      <form onSubmit={handleCreate} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="New project name…"
          maxLength={120}
          className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <Button type="submit" disabled={creating || !name.trim()} className="gap-1.5">
          {creating ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
          Create project
        </Button>
      </form>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading projects…
        </div>
      )}
      {error && <p className="py-12 text-center text-sm text-destructive">{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <p className="mx-auto max-w-md py-12 text-center text-sm text-muted-foreground">
          No projects yet. Create one above, then save documents to it from the Resources tab.
        </p>
      )}

      {projects.length > 0 && (
        <ul className="space-y-2">
          {projects.map(p => (
            <li
              key={p.id}
              className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:border-primary/40"
            >
              <button
                type="button"
                onClick={() => setOpenProject(p.id)}
                className="flex flex-1 items-center gap-3 text-left"
              >
                <FolderOpen className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{p.name}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <FileText className="h-3 w-3" aria-hidden />
                    {p.documentCount} document{p.documentCount !== 1 ? 's' : ''}
                    {p.description ? ` · ${p.description}` : ''}
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => { if (confirm(`Delete project “${p.name}”?`)) deleteProject(p.id) }}
                className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Delete ${p.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ── Project detail (scoped Resources view) ────────────────────────────────────

function ProjectDetail({ projectId }: { projectId: string }) {
  const setOpenProject = useResearchStore(s => s.setOpenProject)
  const { projects } = useResearchProjects()
  const [refreshKey, setRefreshKey] = useState(0)
  const { documentIds, loading } = useProjectDocuments(projectId, refreshKey)

  const project = projects.find(p => p.id === projectId)

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setOpenProject(null)}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden /> All projects
      </button>

      <div>
        <h2 className="text-lg font-semibold">{project?.name ?? 'Project'}</h2>
        {project?.description && <p className="text-sm text-muted-foreground">{project.description}</p>}
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading project…
        </div>
      ) : (
        <ResourcesView
          projectId={projectId}
          projectDocumentIds={documentIds}
          onProjectMutated={() => setRefreshKey(k => k + 1)}
        />
      )}
    </div>
  )
}
