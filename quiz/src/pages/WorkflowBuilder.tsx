// The Workflow Builder (`/tools/workflow`, docs/workflow-builder.md): data,
// calculations and concepts as steps locked on a grid, joined by directed
// connections, run live on the Actuarial Tools engine — and handed to Claude
// as a brief for the Actuarial Notes connector. Concept Craft's board, with
// the physics taken out.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Bookmark, BookmarkCheck, ChevronDown, ChevronLeft, ClipboardCopy, Maximize, Plus, Trash2, Workflow as WorkflowIcon, ZoomIn, ZoomOut } from 'lucide-react'
import { backLabel, useBack } from '@/hooks/useBack'
import { ClearButton, ControlGroup, MapButton } from '@/components/craft/CraftControls'
import { WorkflowAddMenu, type ConceptShelf } from '@/components/workflow/WorkflowAddMenu'
import { WorkflowBoard, type WorkflowBoardCommands } from '@/components/workflow/WorkflowBoard'
import { WorkflowClaudePanel } from '@/components/workflow/WorkflowClaudePanel'
import { WorkflowLogo } from '@/components/workflow/WorkflowLogo'
import { EdgePanel, StepPanel, type PanelLayout } from '@/components/workflow/WorkflowPanels'
import { readCsvFile } from '@/lib/workflowCsv'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { MobileNavButton } from '@/components/MobileNavButton'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useIsMobile } from '@/hooks/useIsMobile'
import { usePageHead } from '@/hooks/usePageHead'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { useCurrentWorkflow, useWorkflowResolver, useWorkflows } from '@/hooks/useWorkflows'
import { craftTopics } from '@/lib/conceptCraft'
import { setWikiContentLookup } from '@/lib/github'
import { setWikiIndexBundle } from '@/lib/wikiIndex'
import { examDisplayName } from '@/lib/wikiRoutes'
import {
  CSV_DATA,
  REFUSAL_TEXT,
  TEMPLATES,
  TEMPLATE_PREFIX,
  addStep,
  canNest,
  carriedTile,
  connectReason,
  disconnect,
  edgeKey,
  evaluateWorkflow,
  link,
  moveStep,
  removeStep,
  runOrder,
  stepName,
  updateEdge,
  updateStep,
  withResolvedLabels,
  type NewStep,
  type WorkflowNode,
  type Workflow,
  type WorkflowEdge,
  type WorkflowTemplate,
} from '@/lib/workflow'
import type { Cell } from '@/lib/workflowGrid'
import { cn } from '@/lib/utils'

const HEAD = {
  title: 'Workflow Builder | Actuarial Notes',
  description: 'Chain data, calculations and concepts into an actuarial workflow, run it live, and run it in Claude.',
  noindex: true,
}

// ─── The notes ───────────────────────────────────────────────────────────────

interface Notes {
  shelves: ConceptShelf[]
  concepts: string[]
}

let notesRead: Notes | null = null

/**
 * The vault, read once a visit: the concept pages the **+** offers and the
 * popup shows. Fetched with the page rather than bundled into it — the board
 * and its calculators open at once, and the notes follow.
 */
function useNotes(): Notes | null {
  const [notes, setNotes] = useState<Notes | null>(notesRead)
  useEffect(() => {
    if (notesRead) return
    let live = true
    void import('virtual:wiki-content').then(({ default: bundle }) => {
      setWikiContentLookup((path: string) => bundle.files[path])
      setWikiIndexBundle(bundle.index)
      const pages = new Map(bundle.index.filter(i => i.category === 'concept').map(i => [i.name.toLowerCase(), i.name] as const))
      const examPages = Object.fromEntries(Object.entries(bundle.files).filter(([path]) => /^Exam\b[^/]*\.md$/i.test(path)))
      const shelves: ConceptShelf[] = []
      for (const topic of craftTopics(examPages, name => pages.get(name.toLowerCase()))) {
        const name = examDisplayName(topic.examPage).replace(/-\d+$/, '')
        const last = shelves[shelves.length - 1]
        const shelf = last && last.name === name ? last : { exam: topic.exam, name, sections: [] }
        if (shelf !== last) shelves.push(shelf)
        shelf.sections.push({ id: topic.id, title: topic.title, concepts: topic.concepts })
      }
      notesRead = { shelves, concepts: [...pages.values()].sort((a, b) => a.localeCompare(b)) }
      if (live) setNotes(notesRead)
    })
    return () => { live = false }
  }, [])
  return notes
}

// ─── The page ────────────────────────────────────────────────────────────────

type Panel = { kind: 'step'; id: string } | { kind: 'edge'; key: string } | { kind: 'claude' } | null

export default function WorkflowBuilder() {
  usePageHead(HEAD)
  const workflow = useCurrentWorkflow()
  const create = useWorkflows(s => s.create)
  // There is always a workflow open: the first visit starts an empty one.
  useEffect(() => {
    if (!workflow) create()
  }, [workflow, create])
  useEffect(() => () => useConceptPopup.getState().close(), [])

  return (
    // Always dark, as Concept Craft's board is: a canvas the steps are laid
    // out on. It gives up the bottom of the screen to the concept popup.
    <div
      className="dark relative flex flex-col overflow-hidden bg-background text-foreground"
      style={{ colorScheme: 'dark', height: 'calc(100dvh - var(--concept-split-height, 0px))' }}
    >
      {workflow ? <Builder workflow={workflow} /> : <Header workflow={null} onClaude={() => {}} />}
      <ConceptPopup />
    </div>
  )
}

function Builder({ workflow: stored }: { workflow: Workflow }) {
  const isPhone = useIsMobile(1023)
  const { play } = useSoundEffects()
  const levels = useConceptLevels()
  const notes = useNotes()
  const update = useWorkflows(s => s.update)
  const create = useWorkflows(s => s.create)
  const remove = useWorkflows(s => s.remove)
  const openWorkflowById = useWorkflows(s => s.open)
  const setSaved = useWorkflows(s => s.setSaved)
  const saveTemplate = useWorkflows(s => s.saveTemplate)
  const allWorkflows = useWorkflows(s => s.workflows)
  const resolve = useWorkflowResolver()
  // Sub-workflows read under what they are called now.
  const workflow = useMemo(() => withResolvedLabels(stored, resolve), [stored, resolve])
  // The sub-workflows gone into on the way down to this one — the way back up.
  // Each step names where it came from and where it went, so a workflow opened
  // any other way (the menu, a template) shows no way up it doesn't have.
  const [trail, setTrail] = useState<{ from: string; to: string }[]>([])

  const boardRef = useRef<WorkflowBoardCommands>(null)
  const [panel, setPanel] = useState<Panel>(null)
  const [cursor, setCursor] = useState<string | null>(null)
  const [linking, setLinking] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [announce, setAnnounce] = useState('')

  // Every calculation, run live: what each card shows and each panel opens on.
  const runs = useMemo(() => evaluateWorkflow(workflow, resolve), [workflow, resolve])

  // A workflow switched: nothing from the last one stays selected.
  useEffect(() => {
    setPanel(null)
    setCursor(null)
    setLinking(null)
  }, [workflow.id])

  useEffect(() => {
    if (!notice) return
    const t = window.setTimeout(() => setNotice(null), 2400)
    return () => window.clearTimeout(t)
  }, [notice])

  const say = (text: string) => {
    setNotice(text)
    setAnnounce(text)
  }
  const nameOf = useCallback((id: string) => {
    const n = workflow.nodes.find(m => m.id === id)
    return n ? stepName(n) : ''
  }, [workflow.nodes])

  // ── Adding, moving, connecting ───────────────────────────────────────────
  const after = cursor && workflow.nodes.some(n => n.id === cursor) ? cursor : null
  const add = (step: NewStep) => {
    if (step.kind === 'workflow' && !canNest(resolve, workflow.id, step.ref)) {
      say('That workflow holds this one already')
      return
    }
    let added = ''
    update((wf, now) => {
      const { workflow: next, id } = addStep(wf, step, now, after)
      added = id
      return next
    })
    setAddOpen(false)
    play('collect')
    if (!added) return
    setCursor(added)
    const name = stepName({ id: added, col: 0, row: 0, ...step })
    say(after ? `Added ${name} after ${nameOf(after)}` : `Added ${name}`)
    window.setTimeout(() => boardRef.current?.reveal(added), 60)
  }

  const uploadCsv = async (file: File) => {
    setAddOpen(false)
    const read = await readCsvFile(file)
    if (!read.ok) {
      say(read.error)
      return
    }
    add({ kind: 'data', ref: CSV_DATA, csv: read.table })
  }

  // ── Library and sub-workflows ────────────────────────────────────────────
  const library = useMemo(
    () => allWorkflows.filter(w => w.saved && w.id !== workflow.id).map(w => ({ id: w.id, title: w.title, steps: w.nodes.length })),
    [allWorkflows, workflow.id],
  )
  /** Open another workflow from the top: the library, the menu, a template. An empty draft is let go. */
  const openTop = (id: string) => {
    if (workflow.nodes.length === 0 && !workflow.saved && id !== workflow.id) remove(workflow.id)
    setTrail([])
    openWorkflowById(id)
    window.setTimeout(() => boardRef.current?.fit(), 60)
  }
  /**
   * Go into a sub-workflow, to work on it at full detail. A template is copied
   * into the library first, and the step pointed at the copy, so what is
   * changed inside is what the step runs.
   */
  const goInto = (node: WorkflowNode) => {
    let ref = node.ref
    if (ref.startsWith(TEMPLATE_PREFIX)) {
      const template = TEMPLATES.find(t => TEMPLATE_PREFIX + t.id === ref)
      if (!template) return
      ref = saveTemplate(template)
      update((wf, now) => ({ ...wf, updatedAt: now, nodes: wf.nodes.map(n => (n.id === node.id ? { ...n, ref } : n)) }))
      say(`Saved a copy of ${template.title} to your library`)
    } else if (!resolve(ref)) {
      say('That workflow is no longer in your library')
      return
    }
    setTrail(t => [...t, { from: workflow.id, to: ref }])
    openWorkflowById(ref)
    window.setTimeout(() => boardRef.current?.fit(), 60)
  }
  const step = trail[trail.length - 1]
  const parent = step && step.to === workflow.id ? resolve(step.from) : undefined
  const goUp = () => {
    if (!parent) return
    setTrail(t => t.slice(0, -1))
    openWorkflowById(parent.id)
    window.setTimeout(() => boardRef.current?.fit(), 60)
  }

  // A card goes wherever it is dropped — beside another, if dropped on one.
  const onMove = (id: string, to: Cell) => update((wf, now) => moveStep(wf, id, to, now))

  const onConnect = (from: string, to: string) => {
    setLinking(null)
    const refusal = connectReason(workflow, from, to)
    if (refusal) {
      say(REFUSAL_TEXT[refusal])
      return
    }
    update((wf, now) => link(wf, from, to, now))
    play('correct')
    say(`${nameOf(from)} → ${nameOf(to)}`)
  }

  const onLink = (id: string | null) => {
    setLinking(id)
    if (id) {
      play('select')
      if (isPhone) setPanel(null)
      say(`Now tap the step ${nameOf(id)} leads to`)
    }
  }

  const select = (id: string) => {
    setCursor(id)
    setPanel({ kind: 'step', id })
    if (isPhone) useConceptPopup.getState().close()
  }

  const selectEdge = (e: WorkflowEdge) => {
    setPanel({ kind: 'edge', key: edgeKey(e) })
    if (isPhone) useConceptPopup.getState().close()
  }

  const onBackground = () => {
    if (linking) {
      setLinking(null)
      return
    }
    setPanel(p => (p?.kind === 'claude' ? p : null))
    setCursor(null)
  }

  // ── Reading a concept ────────────────────────────────────────────────────
  const read = useCallback((name: string) => {
    // A walk of the workflow's concepts, in the order the workflow runs.
    const concepts = runOrder(workflow).filter(n => n.kind === 'concept').map(n => n.ref)
    const list = concepts.map(c => ({ kind: 'concept' as const, name: c }))
    const index = Math.max(0, concepts.findIndex(c => c.toLowerCase() === name.toLowerCase()))
    if (isPhone) setPanel(null)
    useConceptPopup.getState().openAt(list, index, null, null, null, { walk: 'corpus' })
  }, [workflow, isPhone])

  // Esc steps back one layer: a port armed, then the panel. The popup and the
  // + mind their own.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || useConceptPopup.getState().open || addOpen) return
      if (linking) setLinking(null)
      else if (panel) setPanel(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [linking, panel, addOpen])

  const startFrom = (t: WorkflowTemplate) => {
    // An empty workflow is replaced, not kept beside the template.
    if (workflow.nodes.length === 0 && !workflow.saved) remove(workflow.id)
    setTrail([])
    create(t)
    play('collect')
    window.setTimeout(() => boardRef.current?.fit(), 60)
  }

  // ── Layout ───────────────────────────────────────────────────────────────
  const openStep = panel?.kind === 'step' ? workflow.nodes.find(n => n.id === panel.id) ?? null : null
  const openEdge = panel?.kind === 'edge' ? workflow.edges.find(e => edgeKey(e) === panel.key) ?? null : null
  const forClaude = panel?.kind === 'claude'
  const panelOpen = !!openStep || !!openEdge || forClaude
  const panelRem = openStep ? (openStep.kind === 'tool' || (openStep.kind === 'data' && openStep.ref !== 'custom') ? 30 : 22) : openEdge ? 26 : forClaude ? 26 : 22
  // The open step's links: each step it is linked to, and the figure it carries — marked on that card.
  const marked = useMemo(() => {
    const out = new Map<string, number>()
    const run = openStep ? runs.get(openStep.id) : undefined
    if (!run?.input) return out
    for (const p of run.piped) {
      const upstream = runs.get(p.from)?.exits[0]
      out.set(p.from, upstream ? carriedTile(upstream, run.input, p.fields) : -1)
    }
    return out
  }, [openStep, runs])
  const insets = useMemo(
    () => (isPhone ? { top: 16, right: 0, bottom: 8, left: 0 } : { top: 16, right: panelOpen ? panelRem * 16 + 24 : 84, bottom: 8, left: 0 }),
    [isPhone, panelOpen, panelRem],
  )
  const layout: PanelLayout = isPhone ? 'sheet' : 'drawer'
  const empty = workflow.nodes.length === 0
  const usedTools = useMemo(() => {
    const m = new Map<string, number>()
    for (const n of workflow.nodes) if (n.kind === 'tool' || n.kind === 'data') m.set(n.ref, (m.get(n.ref) ?? 0) + 1)
    return m
  }, [workflow.nodes])
  const usedConcepts = useMemo(() => new Set(workflow.nodes.filter(n => n.kind === 'concept').map(n => n.ref.toLowerCase())), [workflow.nodes])

  const panelView = openStep ? (
    <StepPanel
      key={openStep.id}
      workflow={workflow}
      node={openStep}
      run={runs.get(openStep.id)}
      layout={layout}
      onClose={() => setPanel(null)}
      onUpdate={patch => update((wf, now) => updateStep(wf, openStep.id, patch, now))}
      onRemove={() => {
        update((wf, now) => removeStep(wf, openStep.id, now))
        setPanel(null)
        setCursor(null)
        say(`Removed ${stepName(openStep)}`)
      }}
      onRead={read}
      onConnectFrom={() => onLink(openStep.id)}
      onSelectEdge={selectEdge}
      onSelectStep={id => {
        select(id)
        boardRef.current?.reveal(id)
      }}
      resolve={resolve}
      onOpenWorkflow={goInto}
      onNotice={say}
    />
  ) : openEdge ? (
    <EdgePanel
      key={edgeKey(openEdge)}
      workflow={workflow}
      edge={openEdge}
      runs={runs}
      layout={layout}
      onClose={() => setPanel(null)}
      onUpdate={note => update((wf, now) => updateEdge(wf, openEdge.from, openEdge.to, { note }, now))}
      onUpdateMap={map => update((wf, now) => updateEdge(wf, openEdge.from, openEdge.to, { map }, now))}
      resolve={resolve}
      onRemove={() => {
        update((wf, now) => disconnect(wf, openEdge.from, openEdge.to, now))
        setPanel(null)
      }}
      onSelectStep={select}
    />
  ) : forClaude ? (
    <WorkflowClaudePanel
      workflow={workflow}
      runs={runs}
      layout={layout}
      onGoal={goal => update((wf, now) => ({ ...wf, goal, updatedAt: now }))}
      onClose={() => setPanel(null)}
      resolve={resolve}
    />
  ) : null

  return (
    <>
      <Header
        workflow={workflow}
        onClaude={() => {
          setPanel(p => (p?.kind === 'claude' ? null : { kind: 'claude' }))
          if (isPhone) useConceptPopup.getState().close()
        }}
        forClaude={forClaude}
        parent={parent?.title ?? null}
        onParent={goUp}
        onToggleSaved={() => {
          setSaved(workflow.id, !workflow.saved)
          say(workflow.saved ? 'Taken out of your library' : 'Saved to your library')
        }}
        onOpen={openTop}
        onTemplate={startFrom}
      />

      <div className="relative min-h-0 flex-1">
        <WorkflowBoard
          ref={boardRef}
          workflow={workflow}
          runs={runs}
          levels={levels}
          selected={openStep?.id ?? after}
          selectedEdge={openEdge ? edgeKey(openEdge) : null}
          linking={linking}
          marked={marked}
          resolve={resolve}
          insets={insets}
          onSelect={select}
          onSelectEdge={selectEdge}
          onMove={onMove}
          onConnect={onConnect}
          onLink={onLink}
          onBackground={onBackground}
        />

        {empty && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-6">
            <div className="pointer-events-auto flex w-full max-w-md flex-col items-center gap-4 text-center" data-testid="workflow-empty">
              <WorkflowLogo size="lg" />
              <div className="space-y-1.5">
                <h2 className="text-lg font-semibold">{parent ? 'An empty workflow' : 'Build a workflow'}</h2>
                <p className="text-sm text-muted-foreground">
                  Add data, calculations and the concepts behind them, then drag from a step&rsquo;s dot to the next to say
                  what flows where. Calculations the engine can chain fill each other in as you go.
                </p>
              </div>
              <button
                type="button"
                data-workflow-add
                onClick={() => setAddOpen(true)}
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Plus className="h-4 w-4" aria-hidden />
                Add a step
              </button>
              {library.length > 0 && (
                <div className="w-full space-y-2 pt-2 text-left" data-testid="workflow-library">
                  <p className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your library</p>
                  <div className="max-h-56 overflow-y-auto rounded-xl bg-card shadow-[var(--shadow-card)]">
                    {library.map((w, i) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => openTop(w.id)}
                        data-testid="workflow-library-item"
                        className={cn('flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent', i > 0 && 'border-t border-border/60')}
                      >
                        <WorkflowIcon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">{w.title}</span>
                        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{w.steps} {w.steps === 1 ? 'step' : 'steps'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="w-full space-y-2 pt-2 text-left">
                <p className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Templates</p>
                <div className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)]">
                  {TEMPLATES.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => startFrom(t)}
                      data-testid="workflow-template"
                      data-template={t.id}
                      className={cn('block w-full px-4 py-3 text-left transition-colors hover:bg-accent', i > 0 && 'border-t border-border/60')}
                    >
                      <span className="block text-sm font-medium">{t.title}</span>
                      <span className="line-clamp-2 text-xs text-muted-foreground">{t.goal}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* The controls, bottom right under the thumb, as on Concept Craft's
            board: the map's zoom and fit, clearing, and the + last and largest. */}
        <div
          className="pointer-events-none absolute bottom-3 top-3 z-20 flex flex-col flex-wrap-reverse content-start items-center justify-end gap-3 transition-[right] duration-200"
          style={{ right: !isPhone && panelOpen ? `${panelRem + 1.5}rem` : '0.75rem' }}
        >
          {!empty && (
            <ControlGroup>
              <MapButton label="Zoom in" onClick={() => boardRef.current?.zoom(1.25)}><ZoomIn className="h-6 w-6" /></MapButton>
              <MapButton label="Zoom out" onClick={() => boardRef.current?.zoom(0.8)}><ZoomOut className="h-6 w-6" /></MapButton>
              <MapButton label="Fit the workflow" onClick={() => boardRef.current?.fit()}><Maximize className="h-6 w-6" /></MapButton>
              <ClearButton
                label="Clear the workflow"
                data-testid="workflow-clear"
                onClear={() => {
                  update((wf, now) => ({ ...wf, nodes: [], edges: [], updatedAt: now }))
                  setPanel(null)
                  setCursor(null)
                }}
              />
            </ControlGroup>
          )}
          <div className="pointer-events-auto relative shrink-0">
            <button
              type="button"
              data-workflow-add
              onClick={() => setAddOpen(v => !v)}
              aria-label="Add a step"
              title="Add a step"
              aria-haspopup="menu"
              aria-expanded={addOpen}
              data-testid="workflow-add"
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                addOpen && 'rotate-45',
              )}
            >
              <Plus className="h-8 w-8" />
            </button>
            {addOpen && (
              <WorkflowAddMenu
                shelves={notes?.shelves ?? null}
                allConcepts={notes?.concepts ?? []}
                onAdd={add}
                onClose={() => setAddOpen(false)}
                usedTools={usedTools}
                usedConcepts={usedConcepts}
                after={after ? nameOf(after) : null}
                library={library}
                canNest={ref => canNest(resolve, workflow.id, ref)}
                onUploadCsv={uploadCsv}
              />
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex flex-col items-center gap-2 px-24">
          {notice && (
            <p role="status" className="toast-fade-in rounded-full bg-card px-4 py-2 text-sm text-muted-foreground shadow-lg" data-testid="workflow-notice">
              {notice}
            </p>
          )}
        </div>
        <p className="sr-only" role="status" aria-live="polite">{announce}</p>

        {!isPhone && panelView && <div className="absolute bottom-3 right-3 top-3 z-40">{panelView}</div>}
      </div>

      {isPhone && panelView && <div className="absolute inset-x-0 bottom-0 z-40 flex flex-col justify-end">{panelView}</div>}
    </>
  )
}

// ─── The header ──────────────────────────────────────────────────────────────

function Header({
  workflow,
  onClaude,
  forClaude = false,
  onTemplate,
  parent = null,
  onParent,
  onToggleSaved,
  onOpen,
}: {
  workflow: Workflow | null
  onClaude: () => void
  forClaude?: boolean
  onTemplate?: (t: WorkflowTemplate) => void
  /** The workflow this one was opened from, as a sub-workflow — the way back up. */
  parent?: string | null
  onParent?: () => void
  onToggleSaved?: () => void
  /** Open another workflow from the menu. */
  onOpen?: (id: string) => void
}) {
  const back = useBack({ to: '/tools', label: 'Tools' })
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="relative z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border px-3">
      <MobileNavButton className="lg:hidden" />
      <button
        type="button"
        onClick={back.go}
        aria-label={backLabel(back)}
        title={backLabel(back)}
        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <WorkflowLogo size="sm" className="hidden sm:flex" />
      {parent && onParent && (
        <button
          type="button"
          onClick={onParent}
          title={`Back up to ${parent}`}
          className="hidden max-w-[10rem] shrink-0 items-center gap-1 truncate rounded-md px-1.5 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:flex"
          data-testid="workflow-parent"
        >
          <span className="truncate">{parent}</span>
          <span aria-hidden>›</span>
        </button>
      )}
      <div className="relative min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setMenuOpen(v => !v)}
          disabled={!workflow}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="flex max-w-full items-center gap-1 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-testid="workflow-title"
        >
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold leading-tight sm:text-base">{workflow?.title ?? 'Workflow Builder'}</span>
            {workflow && (
              <span className="block truncate text-xs tabular-nums text-muted-foreground" data-testid="workflow-tally">
                {workflow.nodes.length} {workflow.nodes.length === 1 ? 'step' : 'steps'} · {workflow.edges.length} {workflow.edges.length === 1 ? 'connection' : 'connections'}
              </span>
            )}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        </button>
        {menuOpen && workflow && onTemplate && onOpen && (
          <WorkflowMenu workflow={workflow} onTemplate={onTemplate} onOpen={onOpen} onClose={() => setMenuOpen(false)} />
        )}
      </div>
      {parent && onParent && (
        <button
          type="button"
          onClick={onParent}
          aria-label={`Back up to ${parent}`}
          className="shrink-0 rounded-full px-3 py-2 text-xs font-semibold ring-1 ring-border transition-colors hover:bg-accent sm:hidden"
        >
          Up
        </button>
      )}
      {workflow && onToggleSaved && (
        <button
          type="button"
          onClick={onToggleSaved}
          aria-pressed={!!workflow.saved}
          aria-label={workflow.saved ? 'In your library — tap to take it out' : 'Save to your library'}
          title={workflow.saved ? 'In your library' : 'Save to your library'}
          className={cn(
            'flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            workflow.saved ? 'bg-primary/15 text-foreground ring-1 ring-primary/30' : 'bg-card text-foreground ring-1 ring-border hover:bg-accent',
          )}
          data-testid="workflow-save"
        >
          {workflow.saved ? <BookmarkCheck className="h-4 w-4" aria-hidden /> : <Bookmark className="h-4 w-4" aria-hidden />}
          <span className="hidden md:inline">{workflow.saved ? 'In library' : 'Save'}</span>
        </button>
      )}
      <button
        type="button"
        onClick={onClaude}
        disabled={!workflow}
        aria-pressed={forClaude}
        className={cn(
          'flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          forClaude ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground ring-1 ring-border hover:bg-accent',
        )}
        data-testid="workflow-open-claude"
        aria-label="Run in Claude"
      >
        <ClipboardCopy className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">Run in Claude</span>
      </button>
    </header>
  )
}

/** The workflow's own menu, off its title: rename it, open another, start one, delete it. */
function WorkflowMenu({ workflow, onTemplate, onOpen, onClose }: { workflow: Workflow; onTemplate: (t: WorkflowTemplate) => void; onOpen: (id: string) => void; onClose: () => void }) {
  const workflows = useWorkflows(s => s.workflows)
  const create = useWorkflows(s => s.create)
  const remove = useWorkflows(s => s.remove)
  const update = useWorkflows(s => s.update)
  const [confirming, setConfirming] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element | null
      if (target?.closest('[data-testid="workflow-title"]')) return
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

  const row = 'flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none'
  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Workflows"
      className="paper-drop absolute left-0 top-full z-50 mt-2 flex max-h-[min(70dvh,32rem)] w-[min(20rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-xl ring-1 ring-border"
      data-testid="workflow-menu"
    >
      <label className="block shrink-0 space-y-1 border-b border-border/60 px-4 py-3">
        <span className="block text-xs font-semibold text-muted-foreground">Name</span>
        <input
          value={workflow.title}
          onChange={e => update((wf, now) => ({ ...wf, title: e.target.value, updatedAt: now }))}
          onBlur={e => { if (!e.target.value.trim()) update((wf, now) => ({ ...wf, title: 'Untitled workflow', updatedAt: now })) }}
          className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-testid="workflow-rename"
        />
      </label>
      <div className="min-h-0 flex-1 overflow-y-auto py-1 [scrollbar-width:thin]">
        {[
          { title: 'Library', list: workflows.filter(w => w.saved) },
          { title: 'Drafts', list: workflows.filter(w => !w.saved && (w.nodes.length > 0 || w.id === workflow.id)) },
        ].map(group => group.list.length > 0 && (
          <div key={group.title}>
            <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group.title}</p>
            {group.list.map(w => (
              <button
                key={w.id}
                type="button"
                onClick={() => {
                  onOpen(w.id)
                  onClose()
                }}
                className={cn(row, w.id === workflow.id && 'font-semibold')}
                data-testid="workflow-menu-item"
              >
                <span className="min-w-0 flex-1 truncate">{w.title}</span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{w.nodes.length}</span>
              </button>
            ))}
          </div>
        ))}
        <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">New</p>
        <button
          type="button"
          onClick={() => {
            create()
            onClose()
          }}
          className={row}
          data-testid="workflow-new"
        >
          <Plus className="h-4 w-4 shrink-0" aria-hidden />
          Empty workflow
        </button>
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              onTemplate(t)
              onClose()
            }}
            className={row}
          >
            <span className="w-4 shrink-0" aria-hidden />
            <span className="min-w-0 flex-1 truncate">{t.title}</span>
          </button>
        ))}
      </div>
      <div className="shrink-0 border-t border-border/60 p-2">
        <button
          type="button"
          onClick={() => {
            if (!confirming) {
              setConfirming(true)
              return
            }
            remove(workflow.id)
            onClose()
          }}
          className={cn(
            'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
            confirming ? 'bg-destructive text-destructive-foreground' : 'text-destructive hover:bg-destructive/10',
          )}
          data-testid="workflow-delete"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
          {confirming ? 'Tap again to delete it' : 'Delete this workflow'}
        </button>
      </div>
    </div>
  )
}
