import { useRef, useState } from 'react'
import { FolderPlus, Plus, Check, Loader2, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

interface ProjectOption {
  id: string
  name: string
}

// Minimum space (submenu width + gap) needed to open to the right before
// flipping to the left of the action menu instead.
const SUBMENU_SPACE = 224

// "Add to Project" action for the concept/resource popup menu. Mirrors
// AddToProjectButton (components/research/AddToProjectButton.tsx) but opens
// as a flyout submenu beside the action menu (styled to match it) rather than
// its own popover, and saves into research_project_wiki_items (kind+name)
// instead of research_project_documents (document_id) — see
// 20260619_research_project_wiki_items.sql.
export function AddToProjectMenuItem({ item }: { item: WikiEntryRef }) {
  const [expanded, setExpanded] = useState(false)
  const [alignLeft, setAlignLeft] = useState(false)
  const [projects, setProjects] = useState<ProjectOption[] | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [busyId, setBusyId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  async function load() {
    const [projectsRes, savedRes] = await Promise.all([
      supabase.from('research_projects').select('id, name').order('updated_at', { ascending: false }),
      supabase.from('research_project_wiki_items').select('project_id').eq('kind', item.kind).eq('name', item.name),
    ])
    setProjects((projectsRes.data as ProjectOption[]) ?? [])
    const savedRows = (savedRes.data as { project_id: string }[]) ?? []
    setSavedIds(new Set(savedRows.map(r => r.project_id)))
  }

  function toggleExpanded() {
    const next = !expanded
    if (next && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setAlignLeft(window.innerWidth - rect.right < SUBMENU_SPACE)
    }
    setExpanded(next)
    if (next && projects === null) load()
  }

  async function addToProject(projectId: string) {
    setBusyId(projectId)
    const { error } = await supabase
      .from('research_project_wiki_items')
      .upsert(
        { project_id: projectId, kind: item.kind, name: item.name, path: item.path ?? null },
        { onConflict: 'project_id,kind,name', ignoreDuplicates: true },
      )
    if (!error) setSavedIds(prev => new Set(prev).add(projectId))
    setBusyId(null)
  }

  async function createProject() {
    const name = window.prompt('Name your new project:')?.trim()
    if (!name) return
    setCreating(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('research_projects')
        .insert({ user_id: user.id, name })
        .select('id, name')
        .single()
      if (data) {
        const proj = data as ProjectOption
        setProjects(prev => [proj, ...(prev ?? [])])
        await addToProject(proj.id)
      }
    }
    setCreating(false)
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={toggleExpanded}
        aria-expanded={expanded}
        aria-haspopup="menu"
        className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${expanded ? 'bg-accent' : 'hover:bg-accent'}`}
      >
        <FolderPlus className="h-3.5 w-3.5 shrink-0" />
        <span className="flex-1 text-left">Add to Project</span>
        {savedIds.size > 0 && (
          <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground tabular-nums">
            {savedIds.size}
          </span>
        )}
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      </button>

      {expanded && (
        <div
          role="menu"
          className={`absolute top-0 w-52 rounded-md border bg-popover text-popover-foreground shadow-md z-50 py-1 max-h-72 overflow-y-auto ${alignLeft ? 'right-full mr-1' : 'left-full ml-1'}`}
        >
          {projects === null ? (
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" /> Loading projects…
            </div>
          ) : projects.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">No projects yet.</p>
          ) : (
            projects.map(p => {
              const saved = savedIds.has(p.id)
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => addToProject(p.id)}
                  disabled={saved || busyId === p.id}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-accent transition-colors disabled:opacity-60"
                >
                  {busyId === p.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
                  ) : saved ? (
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                  ) : (
                    <Plus className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  )}
                  <span className="flex-1 min-w-0 truncate">{p.name}</span>
                </button>
              )
            })
          )}
          <button
            type="button"
            onClick={createProject}
            disabled={creating}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors disabled:opacity-60 border-t"
          >
            {creating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
            ) : (
              <FolderPlus className="h-3.5 w-3.5 shrink-0" />
            )}
            <span className="flex-1 text-left">New Project</span>
          </button>
        </div>
      )}
    </div>
  )
}
