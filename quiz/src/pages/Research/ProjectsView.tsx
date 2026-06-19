import { useState } from 'react'
import { Loader2, FolderOpen, ChevronLeft, Trash2, FileText, FolderPlus, Sparkles, Settings2, BookOpen, ChevronRight, StickyNote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useResearchStore } from '@/stores/researchStore'
import { useResearchProjects, useProjectDocuments, useProjectWikiItems, type ResearchProject } from '@/hooks/useResearchProjects'
import { useProjectSections } from '@/hooks/useProjectSections'
import { AddSourcesMenu } from '@/components/research/AddSourcesMenu'
import { NewProjectDialog } from '@/components/research/NewProjectDialog'
import { EditProjectScopeDialog } from '@/components/research/EditProjectScopeDialog'
import { SuggestedResources } from '@/components/research/SuggestedResources'
import { ProjectFaq } from '@/components/research/ProjectFaq'
import { ModelOutputs } from '@/components/research/ModelOutputs'
import {
  projectTypeLabel,
  artifactTypeMeta,
  projectSections,
  countryMeta,
  regionLabel,
  departmentLabels,
} from '@/lib/researchProjectMeta'
import { lobMeta } from '@/lib/researchOntology'
import { RESEARCH_AI_ENABLED } from '@/lib/featureFlags'
import ResourcesView from './ResourcesView'
import ProjectSectionView from './ProjectSectionView'

export default function ProjectsView() {
  const openProjectId = useResearchStore(s => s.openProjectId)
  return openProjectId ? <ProjectDetail projectId={openProjectId} /> : <ProjectList />
}

// ── Project metadata badges ───────────────────────────────────────────────────

function MetaBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-300">
      {children}
    </span>
  )
}

function projectBadges(p: ResearchProject): string[] {
  const out: string[] = []
  const typeLabel = projectTypeLabel(p.documentType)
  if (typeLabel) out.push(typeLabel)
  const region = regionLabel(p.jurisdictionCountry, p.jurisdictionRegion)
  const country = countryMeta(p.jurisdictionCountry)?.label
  if (region) out.push(region)
  else if (country) out.push(country)
  const lob = p.lineOfBusiness ? lobMeta(p.lineOfBusiness)?.label : null
  if (lob) out.push(lob)
  return out
}

// ── Project list ──────────────────────────────────────────────────────────────

function ProjectList() {
  const { projects, loading, error, createProject, deleteProject } = useResearchProjects()
  const setOpenProject = useResearchStore(s => s.setOpenProject)
  const [showDialog, setShowDialog] = useState(false)

  const handleCreate = async (
    name: string,
    onboarding: Parameters<typeof createProject>[2],
  ) => {
    const project = await createProject(name, undefined, onboarding)
    setShowDialog(false)
    if (project) setOpenProject(project.id)
  }

  return (
    <div className="space-y-5">
      <Button onClick={() => setShowDialog(true)} size="lg" className="h-14 w-full gap-2 text-base">
        <FolderPlus className="h-5 w-5" aria-hidden /> New project
      </Button>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading projects…
        </div>
      )}
      {error && <p className="py-12 text-center text-sm text-destructive">{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <p className="mx-auto max-w-md py-8 text-center text-sm text-muted-foreground">
          No projects yet. Create one above to get a tailored set of sources and start your analysis.
        </p>
      )}

      {projects.length > 0 && (
        <ul className="space-y-2">
          {projects.map(p => {
            const badges = projectBadges(p)
            return (
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
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{p.name}</span>
                    <span className="mt-1 flex flex-wrap items-center gap-1.5">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <FileText className="h-3 w-3" aria-hidden />
                        {p.documentCount} doc{p.documentCount !== 1 ? 's' : ''}
                      </span>
                      {p.wikiItemCount > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3" aria-hidden />
                          {p.wikiItemCount} page{p.wikiItemCount !== 1 ? 's' : ''}
                        </span>
                      )}
                      {badges.map(b => <MetaBadge key={b}>{b}</MetaBadge>)}
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
            )
          })}
        </ul>
      )}

      {showDialog && (
        <NewProjectDialog onClose={() => setShowDialog(false)} onCreate={handleCreate} />
      )}
    </div>
  )
}

// ── Project detail (scoped Resources view) ────────────────────────────────────

function ProjectDetail({ projectId }: { projectId: string }) {
  const openSectionKey = useResearchStore(s => s.openSectionKey)
  const { projects } = useResearchProjects()
  const project = projects.find(p => p.id === projectId)

  // A section opens in its own page under the project.
  if (project && openSectionKey) {
    return <ProjectSectionView project={project} sectionKey={openSectionKey} />
  }
  return <ProjectOverview projectId={projectId} />
}

function ProjectOverview({ projectId }: { projectId: string }) {
  const setOpenProject = useResearchStore(s => s.setOpenProject)
  const setOpenSection = useResearchStore(s => s.setOpenSection)
  const setTab = useResearchStore(s => s.setTab)
  const setAddSourcesProject = useResearchStore(s => s.setAddSourcesProject)
  const { projects, addDocument, removeWikiItem, updateProjectOnboarding, updateModelOutputs } = useResearchProjects()
  const [refreshKey, setRefreshKey] = useState(0)
  const [showEditScope, setShowEditScope] = useState(false)
  const { documents, documentIds, loading: docsLoading } = useProjectDocuments(projectId, refreshKey)
  const { items: wikiItems, loading: wikiLoading } = useProjectWikiItems(projectId, refreshKey)
  const { resources: sectionResources, notes: sectionNotes } = useProjectSections(projectId)
  const loading = docsLoading || wikiLoading

  const project = projects.find(p => p.id === projectId)
  const badges = project ? projectBadges(project) : []
  const agents = departmentLabels(project?.departments)
  const sections = projectSections(project?.artifactType, project?.documentType)
  const isModel = project?.artifactType === 'model'
  const ArtifactIcon = artifactTypeMeta(project?.artifactType)?.icon ?? FolderOpen

  const handleAdd = async (documentId: string) => {
    await addDocument(projectId, documentId)
    setRefreshKey(k => k + 1)
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setOpenProject(null)}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden /> All projects
      </button>

      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <ArtifactIcon className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
          {project?.name ?? 'Project'}
        </h2>
        {project?.description && <p className="text-sm text-muted-foreground">{project.description}</p>}
        <div className="flex flex-wrap items-center gap-1.5">
          {badges.map(b => <MetaBadge key={b}>{b}</MetaBadge>)}
          {/* "Review agents" badge — an AI-only concept, gated off with the
              assistant (see lib/featureFlags.ts). */}
          {RESEARCH_AI_ENABLED && agents.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
              <Sparkles className="h-3 w-3" aria-hidden /> {agents.join(' · ')}
            </span>
          )}
          {project && (
            <button
              type="button"
              onClick={() => setShowEditScope(true)}
              className="inline-flex items-center gap-1 rounded-full border border-input px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              <Settings2 className="h-3 w-3" aria-hidden /> Edit scope
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading project…
        </div>
      ) : (
        <div className="space-y-4">
          {/* AI "Ask" surface, gated off via RESEARCH_AI_ENABLED. */}
          {RESEARCH_AI_ENABLED && project && (
            <ProjectFaq project={project} onDocumentsAdded={() => setRefreshKey(k => k + 1)} />
          )}

          {/* Section structure — a Document's outline, or a Model's workflow.
              Each section opens in its own page. */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {isModel ? 'Model workflow' : 'Sections'}
            </h3>
            <ol className="space-y-2">
              {sections.map((s, i) => {
                const resCount = sectionResources.filter(r => r.sectionKey === s.key).length
                const noteCount = sectionNotes.filter(n => n.sectionKey === s.key).length
                return (
                  <li key={s.key}>
                    <button
                      type="button"
                      onClick={() => setOpenSection(s.key)}
                      className="flex w-full items-center gap-3 rounded-lg border bg-card p-3 text-left transition-colors hover:border-primary/40"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-muted-foreground">
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{s.title}</span>
                        <span className="block truncate text-xs text-muted-foreground">{s.hint}</span>
                      </span>
                      {(resCount > 0 || noteCount > 0) && (
                        <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                          {resCount > 0 && <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{resCount}</span>}
                          {noteCount > 0 && <span className="flex items-center gap-1"><StickyNote className="h-3 w-3" />{noteCount}</span>}
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* Model outputs — Documentation / Code (R, Python, Excel). */}
          {isModel && project && (
            <ModelOutputs
              outputs={project.modelOutputs}
              codeLanguage={project.modelCodeLanguage}
              onSave={(outputs, lang) => updateModelOutputs(project.id, outputs, lang)}
            />
          )}

          {/* The project's resource library — the pool sections draw from. */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground">Resources</h3>
              <AddSourcesMenu
                projectId={projectId}
                onBrowseResources={() => { setAddSourcesProject(projectId); setTab('resources') }}
                onSourceAdded={() => setRefreshKey(k => k + 1)}
              />
            </div>
            {documents.length === 0 && wikiItems.length === 0 && (
              <SuggestedResources project={project} existingIds={documentIds} onAdd={handleAdd} />
            )}
            <ResourcesView
              projectId={projectId}
              projectDocumentIds={documentIds}
              projectWikiItems={wikiItems}
              onProjectMutated={() => setRefreshKey(k => k + 1)}
              onRemoveWikiItem={async (kind, name) => {
                await removeWikiItem(projectId, kind, name)
                setRefreshKey(k => k + 1)
              }}
            />
          </div>
        </div>
      )}

      {showEditScope && project && (
        <EditProjectScopeDialog
          project={project}
          onClose={() => setShowEditScope(false)}
          onSave={onboarding => updateProjectOnboarding(project.id, onboarding)}
        />
      )}
    </div>
  )
}
