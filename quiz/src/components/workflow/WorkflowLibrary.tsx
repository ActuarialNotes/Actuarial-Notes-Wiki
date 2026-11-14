import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Copy, MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { MobileNavButton } from '@/components/MobileNavButton'
import { useWorkflows } from '@/hooks/useWorkflows'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { TEMPLATES, fromTemplate, type Workflow, type WorkflowTemplate } from '@/lib/workflow'
import { editedLabel, libraryWorkflows, workflowThumbnail } from '@/lib/workflowLibrary'
import { KIND_TINT } from './kindTint'
import { cn } from '@/lib/utils'

/** Past this many workflows the library offers a search. */
const SEARCH_FROM = 8

/**
 * **The Workflows library** (`/workflows`, docs/workflows.md) — where
 * Workflows opens. **New workflow** and the templates come first, then every
 * workflow the reader has built as a card: a drawing of its board
 * (`workflowThumbnail`), its title, its size and when it was last edited,
 * newest first, with a ⋯ menu to rename, duplicate or delete it. A workflow
 * saves itself as it changes, so there is no Save: one with a step is in the
 * library, and one left empty is let go when the reader comes back here.
 */
export function WorkflowLibrary() {
  const workflows = useWorkflows(s => s.workflows)
  const create = useWorkflows(s => s.create)
  const remove = useWorkflows(s => s.remove)
  const navigate = useNavigate()
  const { play } = useSoundEffects()
  const [query, setQuery] = useState('')
  const [now] = useState(() => Date.now())

  // A workflow left empty is a New that was never used: let it go. Done on
  // arriving here (not on leaving a board), so a board is never pulled out
  // from under the reader.
  useEffect(() => {
    for (const w of useWorkflows.getState().workflows) if (w.nodes.length === 0) remove(w.id)
  }, [remove])

  const all = useMemo(() => libraryWorkflows(workflows), [workflows])
  const shown = useMemo(() => libraryWorkflows(workflows, query), [workflows, query])

  const start = (template?: WorkflowTemplate) => {
    const id = create(template)
    if (template) play('collect')
    navigate(`/workflows/${id}`)
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-4 sm:px-6 sm:py-6">
        <header className="flex items-center gap-2">
          <MobileNavButton className="-ml-1.5 lg:hidden" />
          <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">Workflows</h1>
          {all.length > SEARCH_FROM && (
            <label className="relative w-44 sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search workflows"
                aria-label="Search workflows"
                className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-testid="workflow-search"
              />
            </label>
          )}
        </header>

        {/* Start: a blank board, or one of the templates. */}
        <section className="space-y-3" aria-labelledby="workflows-start">
          <h2 id="workflows-start" className="px-1 text-sm font-semibold text-muted-foreground">Start a workflow</h2>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            <button
              type="button"
              onClick={() => start()}
              className="flex w-40 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-accent/50 sm:w-auto sm:min-h-[9.5rem]"
              data-testid="workflow-new"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Plus className="h-6 w-6" aria-hidden />
              </span>
              New workflow
            </button>
            {TEMPLATES.map(t => (
              <TemplateTile key={t.id} template={t} onStart={() => start(t)} />
            ))}
          </div>
        </section>

        <section className="space-y-3" aria-labelledby="workflows-yours">
          <h2 id="workflows-yours" className="px-1 text-sm font-semibold text-muted-foreground">Your workflows</h2>
          {all.length === 0 ? (
            <p className="rounded-2xl border border-dashed px-4 py-10 text-center text-sm text-muted-foreground" data-testid="workflow-library-empty">
              Workflows you build show up here.
            </p>
          ) : shown.length === 0 ? (
            <p className="px-1 text-sm text-muted-foreground">No workflows match “{query.trim()}”.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="workflow-library">
              {shown.map(w => (
                <WorkflowCard key={w.id} workflow={w} now={now} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

/** A board drawn small, on the board's own dark canvas. */
function Thumbnail({ workflow, className }: { workflow: Workflow; className?: string }) {
  const thumb = useMemo(() => workflowThumbnail(workflow), [workflow])
  const dots = `wf-dots-${useId().replace(/:/g, '')}`
  return (
    <div className={cn('dark overflow-hidden rounded-xl bg-background', className)} style={{ colorScheme: 'dark' }} aria-hidden>
      <svg viewBox={`0 0 ${thumb.width} ${thumb.height}`} className="block h-full w-full">
        <defs>
          <pattern id={dots} width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="hsl(var(--muted-foreground) / 0.25)" />
          </pattern>
        </defs>
        <rect width={thumb.width} height={thumb.height} fill={`url(#${dots})`} />
        {thumb.lines.map((l, i) => {
          const mid = (l.x1 + l.x2) / 2
          return (
            <path
              key={i}
              d={`M${l.x1} ${l.y1} C${mid} ${l.y1} ${mid} ${l.y2} ${l.x2} ${l.y2}`}
              fill="none"
              stroke="hsl(var(--muted-foreground) / 0.6)"
              strokeWidth={1.25}
            />
          )
        })}
        {thumb.cards.map(c => (
          <g key={c.id}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={Math.min(4, c.h / 4)} fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth={0.75} />
            <rect x={c.x} y={c.y} width={Math.max(1.5, c.w * 0.04)} height={c.h} rx={1} fill={KIND_TINT[c.kind]} />
          </g>
        ))}
      </svg>
    </div>
  )
}

/** A template to start from: its board, its title and what it is for. */
function TemplateTile({ template, onStart }: { template: WorkflowTemplate; onStart: () => void }) {
  const preview = useMemo(() => fromTemplate(template, template.id, 0), [template])
  return (
    <button
      type="button"
      onClick={onStart}
      className="flex w-56 shrink-0 flex-col gap-2 rounded-2xl bg-card p-2 text-left shadow-[var(--shadow-card)] ring-1 ring-border/60 transition-colors hover:bg-accent sm:w-auto"
      data-testid="workflow-template"
      data-template={template.id}
    >
      <Thumbnail workflow={preview} className="aspect-[16/9] w-full" />
      <span className="px-1 pb-1">
        <span className="block truncate text-sm font-semibold">{template.title}</span>
        <span className="line-clamp-2 text-xs text-muted-foreground">{template.goal}</span>
      </span>
    </button>
  )
}

/** One of the reader's workflows: open it, or rename, duplicate or delete it from its ⋯ menu. */
function WorkflowCard({ workflow, now }: { workflow: Workflow; now: number }) {
  const rename = useWorkflows(s => s.rename)
  const [menuOpen, setMenuOpen] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [name, setName] = useState(workflow.title)
  const steps = workflow.nodes.length

  const commitName = () => {
    rename(workflow.id, name)
    setName(useWorkflows.getState().workflows.find(w => w.id === workflow.id)?.title ?? name)
    setRenaming(false)
  }

  return (
    <div className="relative rounded-2xl bg-card p-2 shadow-[var(--shadow-card)] ring-1 ring-border/60" data-testid="workflow-card" data-workflow={workflow.id}>
      <Link to={`/workflows/${workflow.id}`} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Open ${workflow.title}`} data-testid="workflow-card-open">
        <Thumbnail workflow={workflow} className="aspect-[16/9] w-full" />
      </Link>
      <div className="flex items-start gap-2 px-1 pb-0.5 pt-2">
        <div className="min-w-0 flex-1">
          {renaming ? (
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={commitName}
              onKeyDown={e => {
                if (e.key === 'Enter') commitName()
                if (e.key === 'Escape') {
                  setName(workflow.title)
                  setRenaming(false)
                }
              }}
              aria-label="Workflow name"
              className="w-full rounded-md border border-border bg-background px-2 py-0.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid="workflow-card-rename"
            />
          ) : (
            <Link to={`/workflows/${workflow.id}`} className="block truncate text-sm font-semibold hover:underline" data-testid="workflow-card-title">
              {workflow.title}
            </Link>
          )}
          <p className="truncate text-xs text-muted-foreground">
            {steps} {steps === 1 ? 'step' : 'steps'} · {editedLabel(workflow.updatedAt, now)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={`More for ${workflow.title}`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="-mr-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          data-testid="workflow-card-menu"
        >
          <MoreHorizontal className="h-4 w-4" aria-hidden />
        </button>
      </div>
      {menuOpen && (
        <CardMenu
          workflow={workflow}
          onRename={() => {
            setName(workflow.title)
            setRenaming(true)
          }}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  )
}

function CardMenu({ workflow, onRename, onClose }: { workflow: Workflow; onRename: () => void; onClose: () => void }) {
  const duplicate = useWorkflows(s => s.duplicate)
  const remove = useWorkflows(s => s.remove)
  const [confirming, setConfirming] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element | null
      if (target?.closest('[data-testid="workflow-card-menu"]')) return
      if (ref.current && !ref.current.contains(target)) onClose()
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const row = 'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none'
  return (
    <div
      ref={ref}
      role="menu"
      aria-label={workflow.title}
      className="paper-drop absolute bottom-12 right-2 z-20 w-48 rounded-xl bg-popover p-1.5 text-popover-foreground shadow-xl ring-1 ring-border"
      data-testid="workflow-card-actions"
    >
      <button type="button" role="menuitem" className={row} onClick={() => { onClose(); onRename() }} data-testid="workflow-card-rename-action">
        <Pencil className="h-4 w-4 shrink-0" aria-hidden />
        Rename
      </button>
      <button type="button" role="menuitem" className={row} onClick={() => { duplicate(workflow.id); onClose() }} data-testid="workflow-card-duplicate">
        <Copy className="h-4 w-4 shrink-0" aria-hidden />
        Duplicate
      </button>
      <button
        type="button"
        role="menuitem"
        className={cn(row, confirming ? 'bg-destructive text-destructive-foreground hover:bg-destructive' : 'text-destructive hover:bg-destructive/10')}
        onClick={() => {
          if (!confirming) {
            setConfirming(true)
            return
          }
          remove(workflow.id)
          onClose()
        }}
        data-testid="workflow-card-delete"
      >
        <Trash2 className="h-4 w-4 shrink-0" aria-hidden />
        {confirming ? 'Tap again to delete' : 'Delete'}
      </button>
    </div>
  )
}
