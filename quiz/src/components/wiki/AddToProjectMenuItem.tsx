import { useState } from 'react'
import { FolderPlus, Plus, Check, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

interface ProjectOption {
  id: string
  name: string
}

// "Add to Project" action for the concept/resource popup menu. Mirrors
// AddToProjectButton (components/research/AddToProjectButton.tsx) but expands
// inline within the existing dropdown rather than opening its own popover,
// and saves into research_project_wiki_items (kind+name) instead of
// research_project_documents (document_id) — see
// 20260619_research_project_wiki_items.sql.
export function AddToProjectMenuItem({ item }: { item: WikiEntryRef }) {
  const [expanded, setExpanded] = useState(false)
  const [projects, setProjects] = useState<ProjectOption[] | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [busyId, setBusyId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')

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

  async function createAndAdd() {
    const name = newName.trim()
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
        setNewName('')
      }
    }
    setCreating(false)
  }

  return (
    <div>
      <button
        type="button"
        onClick={toggleExpanded}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
      >
        <FolderPlus className="h-3.5 w-3.5 shrink-0" />
        <span className="flex-1 text-left">Add to Project</span>
        {savedIds.size > 0 && (
          <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground tabular-nums">
            {savedIds.size}
          </span>
        )}
        {expanded ? (
          <ChevronUp className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="px-3 pb-2 space-y-1.5">
          {projects === null ? (
            <div className="flex items-center gap-2 px-1 py-1.5 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading projects…
            </div>
          ) : projects.length === 0 ? (
            <p className="px-1 py-1 text-xs text-muted-foreground">No projects yet — create one below.</p>
          ) : (
            <ul className="max-h-32 overflow-y-auto">
              {projects.map(p => {
                const saved = savedIds.has(p.id)
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => addToProject(p.id)}
                      disabled={saved || busyId === p.id}
                      className="flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-xs hover:bg-accent/60 disabled:opacity-60"
                    >
                      {busyId === p.id ? (
                        <Loader2 className="h-3 w-3 animate-spin shrink-0" />
                      ) : saved ? (
                        <Check className="h-3 w-3 text-primary shrink-0" />
                      ) : (
                        <Plus className="h-3 w-3 text-muted-foreground shrink-0" />
                      )}
                      <span className="truncate">{p.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          <div className="flex items-center gap-1">
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); createAndAdd() } }}
              placeholder="New project…"
              className="h-7 flex-1 rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              type="button"
              onClick={createAndAdd}
              disabled={creating || !newName.trim()}
              className="rounded p-1 text-muted-foreground hover:text-foreground disabled:opacity-50 shrink-0"
              aria-label="Create project and save"
            >
              {creating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
