import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { FolderPlus, Plus, Check, Loader2, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useResearchStore } from '@/stores/researchStore'

interface ProjectOption {
  id: string
  name: string
}

// Width of the portaled submenu (matches w-52) and the gap from the action menu.
const SUBMENU_WIDTH = 208
const SUBMENU_GAP = 4

// "Add to Project" action for the concept/resource popup menu. Mirrors
// AddToProjectButton (components/research/AddToProjectButton.tsx) but opens
// as a flyout submenu beside the action menu (styled to match it) rather than
// its own popover, and saves into research_project_wiki_items (kind+name)
// instead of research_project_documents (document_id) — see
// 20260619_research_project_wiki_items.sql.
//
// The submenu is rendered via a portal into document.body and positioned with
// `position: fixed`, so it floats in its own layer rather than as an absolute
// child of the action menu — keeping it out of the action menu's
// overflow-y-auto container (which would otherwise gain a horizontal scrollbar
// from the submenu's overflow).
export function AddToProjectMenuItem({ item, onNavigate }: { item: WikiEntryRef; onNavigate?: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null)
  const [projects, setProjects] = useState<ProjectOption[] | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [busyId, setBusyId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const closePopup = useConceptPopup(s => s.close)
  const setResearchTab = useResearchStore(s => s.setTab)
  const setOpenProject = useResearchStore(s => s.setOpenProject)

  async function load() {
    const [projectsRes, savedRes] = await Promise.all([
      supabase.from('research_projects').select('id, name').order('updated_at', { ascending: false }),
      supabase.from('research_project_wiki_items').select('project_id').eq('kind', item.kind).eq('name', item.name),
    ])
    setProjects((projectsRes.data as ProjectOption[]) ?? [])
    const savedRows = (savedRes.data as { project_id: string }[]) ?? []
    setSavedIds(new Set(savedRows.map(r => r.project_id)))
  }

  // Position the portaled submenu against the button's viewport rect. Prefers
  // opening to the right; flips left when there isn't room. Both axes are
  // clamped to keep the menu fully on-screen (important on narrow mobile
  // viewports where the action menu can sit close to either edge).
  useLayoutEffect(() => {
    if (!expanded || !btnRef.current) { setMenuPos(null); return }
    const rect = btnRef.current.getBoundingClientRect()
    const hasRoomRight = window.innerWidth - rect.right >= SUBMENU_WIDTH + SUBMENU_GAP
    const rawLeft = hasRoomRight
      ? rect.right + SUBMENU_GAP
      : rect.left - SUBMENU_WIDTH - SUBMENU_GAP
    const left = Math.max(SUBMENU_GAP, Math.min(window.innerWidth - SUBMENU_WIDTH - SUBMENU_GAP, rawLeft))
    // max-h-72 = 288px; clamp top so the menu doesn't spill below the viewport.
    const top = Math.min(rect.top, Math.max(SUBMENU_GAP, window.innerHeight - 288 - SUBMENU_GAP))
    setMenuPos({ top, left })
  }, [expanded])

  function toggleExpanded() {
    const next = !expanded
    setExpanded(next)
    if (next && projects === null) load()
  }

  // Jump to the saved project — directly into it if there's exactly one,
  // otherwise to the projects list to pick.
  function handleView() {
    const ids = [...savedIds]
    setResearchTab('projects')
    setOpenProject(ids.length === 1 ? ids[0] : null)
    onNavigate?.()
    closePopup()
    navigate('/research')
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
      <div className={`flex items-center transition-colors ${expanded ? 'bg-accent' : 'hover:bg-accent'}`}>
        <button
          ref={btnRef}
          type="button"
          onClick={toggleExpanded}
          aria-expanded={expanded}
          aria-haspopup="menu"
          className="flex-1 flex items-center gap-2 px-3 py-2 text-sm text-left min-w-0"
        >
          <FolderPlus className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 text-left truncate">Add to Project</span>
          {savedIds.size > 0 && (
            <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground tabular-nums">
              {savedIds.size}
            </span>
          )}
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </button>
        {savedIds.size > 0 && (
          <button
            type="button"
            onClick={handleView}
            className="text-xs text-primary hover:underline pr-3 shrink-0"
          >
            view
          </button>
        )}
      </div>

      {expanded && menuPos && createPortal(
        <div
          role="menu"
          data-add-to-project-menu
          style={{ position: 'fixed', top: menuPos.top, left: menuPos.left, width: SUBMENU_WIDTH }}
          className="rounded-md border bg-popover text-popover-foreground shadow-md z-50 py-1 max-h-72 overflow-y-auto"
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
        </div>,
        document.body
      )}
    </div>
  )
}
