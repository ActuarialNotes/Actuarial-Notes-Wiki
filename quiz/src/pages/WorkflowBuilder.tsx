// Workflows (docs/workflows.md): documents from Data Sources, data,
// calculations and concepts as steps locked on a grid, joined by directed
// connections, run live on the Actuarial Tools engine — and handed to Claude
// as a brief for the Actuarial Notes connector. Concept Craft's board, with
// the physics taken out.
//
//   /workflows       the library — every workflow the reader has built, as a
//                    grid of cards, with New and the templates first
//                    (`components/workflow/WorkflowLibrary.tsx`)
//   /workflows/:id   one workflow's board; Back returns to where it was opened
//                    from — the library, or the workflow it is a step of

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ClipboardCopy, Copy, Maximize, Plus, Trash2, ZoomIn, ZoomOut } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
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
import { useWorkflowResolver, useWorkflows } from '@/hooks/useWorkflows'
import { backLabel, useBack, usePageLabel } from '@/hooks/useBack'
import { WorkflowLibrary } from '@/components/workflow/WorkflowLibrary'
import { subWorkflowChoices } from '@/lib/workflowLibrary'
import { useCoworkLibrary } from '@/hooks/useCoworkLibrary'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { entityById, resourceEntryRef, type SourceResource } from '@/lib/coworkSources'
import { craftTopics } from '@/lib/conceptCraft'
import { installWikiBundle } from '@/lib/wikiBundle'
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
} from '@/lib/workflow'
import type { Cell } from '@/lib/workflowGrid'
import { cn } from '@/lib/utils'

const HEAD = {
  title: 'Workflows | Actuarial Notes',
  description: 'Connect sources, data, calculations and concepts into an actuarial workflow, and run it in the app or in Claude.',
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
 * and its calculators open at once, and the notes follow. Cowork's own
 * documents are registered with them (`lib/coworkContent.ts`), so a source
 * step opens in the same reader as it does in Sources.
 */
function useNotes(): Notes | null {
  const [notes, setNotes] = useState<Notes | null>(notesRead)
  useEffect(() => {
    if (notesRead) return
    let live = true
    void Promise.all([import('virtual:wiki-content'), import('@/lib/coworkContent')]).then(([{ default: bundle }]) => {
      installWikiBundle(bundle)
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
  const { workflowId } = useParams()
  useEffect(() => () => useConceptPopup.getState().close(), [])
  return workflowId ? <BoardPage id={workflowId} /> : <WorkflowLibrary />
}

/** One workflow's board, at `/workflows/:id`. An id that names none goes back to the library. */
function BoardPage({ id }: { id: string }) {
  const workflow = useWorkflows(s => s.workflows.find(w => w.id === id) ?? null)
  const currentId = useWorkflows(s => s.currentId)
  const open = useWorkflows(s => s.open)
  // The store edits the open workflow; the address says which that is.
  useEffect(() => {
    if (workflow && currentId !== id) open(id)
  }, [workflow, currentId, id, open])
  usePageLabel(workflow?.title)
  if (!workflow) return <Navigate to="/workflows" replace />

  return (
    // Always dark, as Concept Craft's board is: a canvas the steps are laid
    // out on. It gives up the bottom of the screen to the concept popup.
    <div
      className="dark relative flex flex-col overflow-hidden bg-background text-foreground"
      style={{ colorScheme: 'dark', height: 'calc(100dvh - var(--concept-split-height, 0px))' }}
    >
      {currentId === id && <Builder key={id} workflow={workflow} />}
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
  const saveTemplate = useWorkflows(s => s.saveTemplate)
  const addToLibrary = useCoworkLibrary(s => s.addResource)
  const navigate = useNavigate()
  const allWorkflows = useWorkflows(s => s.workflows)
  const resolve = useWorkflowResolver()
  // Sub-workflows read under what they are called now.
  const workflow = useMemo(() => withResolvedLabels(stored, resolve), [stored, resolve])

  const boardRef = useRef<WorkflowBoardCommands>(null)
  const [panel, setPanel] = useState<Panel>(null)
  const [cursor, setCursor] = useState<string | null>(null)
  const [linking, setLinking] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [announce, setAnnounce] = useState('')

  // Every calculation, run live: what each card shows and each panel opens on.
  const runs = useMemo(() => evaluateWorkflow(workflow, resolve), [workflow, resolve])

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
    // A document worked from is one the reader has taken: it joins their
    // library in Sources (and its publisher, followed), as Add does there.
    if (step.kind === 'source') {
      const resource = COWORK_RESOURCES.find(r => r.id === step.ref)
      if (resource) addToLibrary(resource)
    }
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

  // ── Sub-workflows ────────────────────────────────────────────────────────
  const library = useMemo(() => subWorkflowChoices(allWorkflows, workflow.id), [allWorkflows, workflow.id])
  /**
   * Go into a sub-workflow, to work on it at full detail: its own board, at
   * its own address, so Back comes up again. A template is copied into the
   * library first, and the step pointed at the copy, so what is changed inside
   * is what the step runs.
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
    navigate(`/workflows/${ref}`)
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

  // ── Reading a source ─────────────────────────────────────────────────────
  // A walk of the workflow's documents, in the order the workflow runs — the
  // same reader Sources opens a document in.
  const readSource = useCallback((resource: SourceResource) => {
    const docs = runOrder(workflow)
      .filter(n => n.kind === 'source')
      .map(n => COWORK_RESOURCES.find(r => r.id === n.ref))
      .filter((r): r is SourceResource => !!r && resourceEntryRef(r) !== null)
    const index = Math.max(0, docs.findIndex(r => r.id === resource.id))
    if (isPhone) setPanel(null)
    useConceptPopup.getState().openAt(docs.map(r => resourceEntryRef(r)!), index, null, null, null, { walk: 'corpus' })
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

  // ── Layout ───────────────────────────────────────────────────────────────
  const openStep = panel?.kind === 'step' ? workflow.nodes.find(n => n.id === panel.id) ?? null : null
  const openEdge = panel?.kind === 'edge' ? workflow.edges.find(e => edgeKey(e) === panel.key) ?? null : null
  const forClaude = panel?.kind === 'claude'
  const panelOpen = !!openStep || !!openEdge || forClaude
  const panelRem = openStep ? (openStep.kind === 'tool' || (openStep.kind === 'data' && openStep.ref !== 'custom') || (openStep.kind === 'source' && openStep.csv) ? 30 : 22) : openEdge ? 26 : forClaude ? 26 : 22
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
  const usedSources = useMemo(() => new Set(workflow.nodes.filter(n => n.kind === 'source').map(n => n.ref)), [workflow.nodes])
  const openSource = useMemo(() => {
    if (openStep?.kind !== 'source') return null
    const resource = COWORK_RESOURCES.find(r => r.id === openStep.ref)
    return resource ? { resource, entity: entityById(COWORK_ENTITIES, resource.entityId) ?? undefined } : null
  }, [openStep])

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
      source={openSource}
      onReadSource={readSource}
      onSourcePage={id => navigate(`/data-sources/${id}`)}
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
        onDuplicated={() => say('Copied to your library')}
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
                <h2 className="text-lg font-semibold">Build a workflow</h2>
                <p className="text-sm text-muted-foreground">
                  Add documents from your sources, data, calculations and the concepts behind them, then drag from a
                  step&rsquo;s dot to the next to say what flows where. A calculation joined to one that takes its
                  result fills that one in as you go.
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
                usedSources={usedSources}
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
  onDuplicated,
}: {
  workflow: Workflow
  onClaude: () => void
  forClaude?: boolean
  onDuplicated: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  // Back to the page this board was opened from — the library, or the
  // workflow it is a step of — and up to the library for one who landed here.
  const back = useBack({ to: '/workflows', label: 'Workflows' })
  return (
    <header className="relative z-30 flex h-14 shrink-0 items-center gap-1.5 border-b border-border px-3">
      <MobileNavButton className="lg:hidden" />
      <button
        type="button"
        onClick={back.go}
        aria-label={backLabel(back)}
        title={backLabel(back)}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        data-testid="workflow-back"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <WorkflowLogo size="sm" className="hidden sm:flex" />
      <div className="relative min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setMenuOpen(v => !v)}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="flex max-w-full items-center gap-1 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-testid="workflow-title"
        >
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold leading-tight sm:text-base">{workflow.title}</span>
            <span className="block truncate text-xs tabular-nums text-muted-foreground" data-testid="workflow-tally">
              {workflow.nodes.length} {workflow.nodes.length === 1 ? 'step' : 'steps'} · {workflow.edges.length} {workflow.edges.length === 1 ? 'connection' : 'connections'}
            </span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        </button>
        {menuOpen && <WorkflowMenu workflow={workflow} onDuplicated={onDuplicated} onClose={() => setMenuOpen(false)} />}
      </div>
      <button
        type="button"
        onClick={onClaude}
        aria-pressed={forClaude}
        className={cn(
          'flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          forClaude ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground ring-1 ring-border hover:bg-accent',
        )}
        data-testid="workflow-open-claude"
        aria-label="Run in Claude or ChatGPT"
      >
        <ClipboardCopy className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">Run in Claude or ChatGPT</span>
      </button>
    </header>
  )
}

/** The workflow's own menu, off its title: rename it, copy it, delete it. */
function WorkflowMenu({ workflow, onDuplicated, onClose }: { workflow: Workflow; onDuplicated: () => void; onClose: () => void }) {
  const duplicate = useWorkflows(s => s.duplicate)
  const remove = useWorkflows(s => s.remove)
  const rename = useWorkflows(s => s.rename)
  const navigate = useNavigate()
  const [name, setName] = useState(workflow.title)
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

  const row = 'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none'
  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Workflow"
      className="paper-drop absolute left-0 top-full z-50 mt-2 flex w-[min(20rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-xl ring-1 ring-border"
      data-testid="workflow-menu"
    >
      <label className="block space-y-1 border-b border-border/60 px-4 py-3">
        <span className="block text-xs font-semibold text-muted-foreground">Name</span>
        <input
          value={name}
          onChange={e => {
            setName(e.target.value)
            if (e.target.value.trim()) rename(workflow.id, e.target.value)
          }}
          onBlur={e => { if (!e.target.value.trim()) { rename(workflow.id, ''); setName(useWorkflows.getState().workflows.find(w => w.id === workflow.id)?.title ?? '') } }}
          className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-testid="workflow-rename"
        />
      </label>
      <div className="space-y-0.5 p-2">
        <button
          type="button"
          onClick={() => {
            const copy = duplicate(workflow.id)
            onClose()
            if (copy) {
              onDuplicated()
              navigate(`/workflows/${copy}`)
            }
          }}
          className={row}
          data-testid="workflow-duplicate"
        >
          <Copy className="h-4 w-4 shrink-0" aria-hidden />
          Duplicate
        </button>
        <button
          type="button"
          onClick={() => {
            if (!confirming) {
              setConfirming(true)
              return
            }
            remove(workflow.id)
            onClose()
            navigate('/workflows', { replace: true })
          }}
          className={cn(row, confirming ? 'bg-destructive text-destructive-foreground hover:bg-destructive' : 'text-destructive hover:bg-destructive/10')}
          data-testid="workflow-delete"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
          {confirming ? 'Tap again to delete it' : 'Delete this workflow'}
        </button>
      </div>
    </div>
  )
}
