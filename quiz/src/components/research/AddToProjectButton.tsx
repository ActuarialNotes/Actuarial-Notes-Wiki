import { useEffect, useRef, useState } from 'react'
import { FolderPlus, Plus, Check, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface ProjectOption {
  id: string
  name: string
}

// Per-card "save to a project" control. Loads the user's projects lazily (only
// when the menu opens, so a list of cards doesn't fire N queries on mount), and
// can create a new project inline. RLS scopes everything to the current user.
export function AddToProjectButton({ documentId }: { documentId: string }) {
  const [open, setOpen] = useState(false)
  const [projects, setProjects] = useState<ProjectOption[] | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [busyId, setBusyId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  async function loadProjects() {
    const { data } = await supabase
      .from('research_projects')
      .select('id, name')
      .order('updated_at', { ascending: false })
    setProjects((data as ProjectOption[]) ?? [])
  }

  function handleToggleOpen() {
    const next = !open
    setOpen(next)
    if (next && projects === null) loadProjects()
  }

  async function addToProject(projectId: string) {
    setBusyId(projectId)
    const { error } = await supabase
      .from('research_project_documents')
      .upsert({ project_id: projectId, document_id: documentId }, { onConflict: 'project_id,document_id', ignoreDuplicates: true })
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
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={handleToggleOpen}
        className="flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
        aria-label="Save to project"
      >
        <FolderPlus className="h-3.5 w-3.5" aria-hidden /> Save
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-1 w-56 rounded-md border bg-popover p-1 shadow-md">
          <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Save to project
          </p>

          {projects === null ? (
            <div className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading…
            </div>
          ) : projects.length === 0 ? (
            <p className="px-2 py-1 text-xs text-muted-foreground">No projects yet — create one below.</p>
          ) : (
            <ul className="max-h-48 overflow-y-auto">
              {projects.map(p => {
                const saved = savedIds.has(p.id)
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => addToProject(p.id)}
                      disabled={saved || busyId === p.id}
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-accent/60 disabled:opacity-60"
                    >
                      {busyId === p.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : saved ? (
                        <Check className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span className="truncate">{p.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          <div className="mt-1 border-t pt-1">
            <div className="flex items-center gap-1 px-1">
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
                className="rounded p-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
                aria-label="Create project and save"
              >
                {creating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
