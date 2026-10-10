import { useEffect, useRef, type ReactNode } from 'react'
import { ArrowRight, BookOpen, Link2, Trash2, X } from 'lucide-react'
import { ToolCard } from '@/components/tools/ToolCard'
import type { ToolResult } from '@/lib/tools'
import {
  CUSTOM_DATA,
  EDGE_LABEL,
  KIND_LABEL,
  edgeKind,
  stepName,
  stepOwnInput,
  stepTool,
  type StepRun,
  type Workflow,
  type WorkflowEdge,
  type WorkflowNode,
} from '@/lib/workflow'
import { cn } from '@/lib/utils'

export type PanelLayout = 'drawer' | 'sheet'

/**
 * The Workflow Builder's panels (docs/workflow-builder.md) — Concept Craft's
 * connection card in shape: a drawer on the right of a wide board, a sheet
 * over the bottom of a phone's, opened by tapping a step or a connection.
 */
function PanelShell({
  label,
  layout,
  kicker,
  title,
  onClose,
  children,
  testId,
  wide = false,
}: {
  label: string
  layout: PanelLayout
  kicker: ReactNode
  title: ReactNode
  onClose: () => void
  children: ReactNode
  testId: string
  /** Room for a tool's card. */
  wide?: boolean
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
  }, [])
  return (
    <aside
      aria-label={label}
      className={cn(
        'flex flex-col bg-card text-card-foreground shadow-2xl',
        layout === 'drawer'
          ? cn('craft-drawer-in h-full rounded-xl', wide ? 'w-[30rem] max-w-[calc(100vw-1.5rem)]' : 'w-[22rem]')
          : 'craft-sheet-in max-h-[75dvh] w-full rounded-t-2xl',
      )}
      data-testid={testId}
    >
      <div className="flex items-start gap-2 px-4 pb-2 pt-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{kicker}</p>
          <h2 className="text-lg font-semibold leading-snug">{title}</h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-1 -mt-1 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-4 [scrollbar-width:thin]" data-math-scope="">
        {children}
      </div>
    </aside>
  )
}

const textArea =
  'w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
const fieldLabel = 'block text-xs font-semibold text-muted-foreground'
const secondaryButton =
  'inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

function ConnectionList({
  workflow,
  edges,
  direction,
  onSelectEdge,
}: {
  workflow: Workflow
  edges: WorkflowEdge[]
  direction: 'in' | 'out'
  onSelectEdge: (e: WorkflowEdge) => void
}) {
  if (!edges.length) return null
  return (
    <div className="space-y-1.5">
      <p className={fieldLabel}>{direction === 'in' ? 'Comes after' : 'Leads to'}</p>
      <ul className="space-y-1">
        {edges.map(e => {
          const other = workflow.nodes.find(n => n.id === (direction === 'in' ? e.from : e.to))
          if (!other) return null
          return (
            <li key={`${e.from}>${e.to}`}>
              <button
                type="button"
                onClick={() => onSelectEdge(e)}
                className="flex w-full items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
              >
                <span className="min-w-0 flex-1 truncate">{stepName(other)}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{EDGE_LABEL[edgeKind(workflow, e)]}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function StepPanel({
  workflow,
  node,
  run,
  layout,
  onClose,
  onUpdate,
  onRemove,
  onRead,
  onConnectFrom,
  onSelectEdge,
}: {
  workflow: Workflow
  node: WorkflowNode
  run: StepRun | undefined
  layout: PanelLayout
  onClose: () => void
  onUpdate: (patch: Partial<Pick<WorkflowNode, 'note' | 'input' | 'label' | 'data'>>) => void
  onRemove: () => void
  onRead: (concept: string) => void
  onConnectFrom: () => void
  onSelectEdge: (e: WorkflowEdge) => void
}) {
  const spec = stepTool(node)
  const name = stepName(node)
  const piped = run?.piped.flatMap(p => p.fields) ?? []
  const pipedKey = JSON.stringify(run?.piped.map(p => [p.from, p.fields]) ?? [])
  // The card restarts when what its connections carry changes, so it shows the new values.
  const carried = JSON.stringify(piped.map(f => run?.input?.[f]))

  const latest = useRef({ node, onUpdate, piped })
  latest.current = { node, onUpdate, piped }
  const onResult = (result: ToolResult | null) => {
    if (!result || !spec) return
    const { node: current, onUpdate: update, piped: fields } = latest.current
    const own = stepOwnInput(spec, result.input, fields)
    if (JSON.stringify(own) !== JSON.stringify(current.input ?? {})) update({ input: own })
  }

  return (
    <PanelShell
      label={`${KIND_LABEL[node.kind]}: ${name}`}
      layout={layout}
      kicker={KIND_LABEL[node.kind]}
      title={name}
      onClose={onClose}
      testId="workflow-step-panel"
      wide={!!spec}
    >
      {spec && <p className="text-sm text-muted-foreground">{spec.answers}</p>}

      {node.kind === 'concept' && (
        <button
          type="button"
          onClick={() => onRead(node.ref)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-testid="workflow-read-concept"
        >
          <BookOpen className="h-5 w-5" aria-hidden />
          Read the page
        </button>
      )}

      {node.ref === CUSTOM_DATA && (
        <div className="space-y-3">
          <label className="block space-y-1.5">
            <span className={fieldLabel}>Name</span>
            <input
              value={node.label ?? ''}
              onChange={e => onUpdate({ label: e.target.value })}
              placeholder="Your data"
              className={textArea}
              data-testid="workflow-data-label"
            />
          </label>
          <label className="block space-y-1.5">
            <span className={fieldLabel}>What it holds</span>
            <textarea
              value={node.data ?? ''}
              onChange={e => onUpdate({ data: e.target.value })}
              rows={6}
              placeholder="Describe the data, or paste the figures — a triangle, a premium history, a table of claims."
              className={cn(textArea, 'font-mono text-xs')}
              data-testid="workflow-data-text"
            />
          </label>
        </div>
      )}

      {spec && (
        <div className="space-y-2">
          {run?.piped.length ? (
            <p className="flex items-start gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs text-foreground" data-testid="workflow-piped">
              <Link2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>
                {run.piped.map((p, i) => {
                  const from = workflow.nodes.find(n => n.id === p.from)
                  return (
                    <span key={p.from}>
                      {i > 0 && '; '}
                      <strong>{p.fields.join(', ')}</strong> from {from ? stepName(from) : p.from}
                    </span>
                  )
                })}
                {' '}— set by the connection, so a change here gives way to it.
              </span>
            </p>
          ) : null}
          <ToolCard
            key={`${node.id}:${pipedKey}:${carried}`}
            spec={spec}
            initialInput={run?.input ?? node.input}
            onResult={onResult}
            embedded
          />
        </div>
      )}

      <label className="block space-y-1.5">
        <span className={fieldLabel}>What this step is for</span>
        <textarea
          value={node.note ?? ''}
          onChange={e => onUpdate({ note: e.target.value })}
          rows={2}
          placeholder={node.kind === 'concept' ? 'What it settles — a method, a definition, a judgment.' : 'Why it is here, and what to take from it.'}
          className={textArea}
          data-testid="workflow-step-note"
        />
      </label>

      <ConnectionList workflow={workflow} edges={workflow.edges.filter(e => e.to === node.id)} direction="in" onSelectEdge={onSelectEdge} />
      <ConnectionList workflow={workflow} edges={workflow.edges.filter(e => e.from === node.id)} direction="out" onSelectEdge={onSelectEdge} />

      <div className="flex flex-wrap gap-2 pt-1">
        <button type="button" onClick={onConnectFrom} className={secondaryButton} data-testid="workflow-connect-from">
          <ArrowRight className="h-4 w-4" aria-hidden />
          Connect to…
        </button>
        <button
          type="button"
          onClick={onRemove}
          className={cn(secondaryButton, 'text-destructive hover:bg-destructive/10')}
          data-testid="workflow-remove-step"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
          Remove
        </button>
      </div>
    </PanelShell>
  )
}

export function EdgePanel({
  workflow,
  edge,
  runs,
  layout,
  onClose,
  onUpdate,
  onRemove,
  onSelectStep,
}: {
  workflow: Workflow
  edge: WorkflowEdge
  runs: Map<string, StepRun>
  layout: PanelLayout
  onClose: () => void
  onUpdate: (note: string) => void
  onRemove: () => void
  onSelectStep: (id: string) => void
}) {
  const from = workflow.nodes.find(n => n.id === edge.from)
  const to = workflow.nodes.find(n => n.id === edge.to)
  if (!from || !to) return null
  const kind = edgeKind(workflow, edge)
  const fields = runs.get(to.id)?.piped.find(p => p.from === from.id)?.fields ?? []
  const a = stepName(from)
  const b = stepName(to)
  const says = {
    handoff: fields.length
      ? `The engine hands ${fields.join(', ')} from ${a} to ${b}, which fills itself in and runs live.`
      : `${a} hands its result to ${b} — once ${a} runs cleanly.`,
    feeds: `${b} uses what ${a} gives. No tool wires these two together, so say what passes along it: an AI deploying the workflow carries it across.`,
    informs: `${a} is the method or idea ${b} rests on.`,
    applies: `${a} is a worked instance of ${b}.`,
  }[kind]
  const stepButton = (id: string, label: string) => (
    <button type="button" onClick={() => onSelectStep(id)} className="action-title-underline text-left">
      {label}
    </button>
  )
  return (
    <PanelShell
      label={`Connection from ${a} to ${b}`}
      layout={layout}
      kicker={`Connection · ${EDGE_LABEL[kind]}`}
      title={(
        <span>
          {stepButton(from.id, a)}
          <ArrowRight className="mx-1.5 inline h-4 w-4 text-muted-foreground" aria-label="to" />
          {stepButton(to.id, b)}
        </span>
      )}
      onClose={onClose}
      testId="workflow-edge-panel"
    >
      <p className="text-sm text-muted-foreground" data-testid="workflow-edge-says">{says}</p>
      <label className="block space-y-1.5">
        <span className={fieldLabel}>What passes along it</span>
        <textarea
          value={edge.note ?? ''}
          onChange={e => onUpdate(e.target.value)}
          rows={2}
          placeholder={kind === 'feeds' ? 'e.g. the selected ultimate losses, by accident year' : 'Optional'}
          className={textArea}
          data-testid="workflow-edge-note"
        />
      </label>
      <button
        type="button"
        onClick={onRemove}
        className={cn(secondaryButton, 'text-destructive hover:bg-destructive/10')}
        data-testid="workflow-remove-edge"
      >
        <Trash2 className="h-4 w-4" aria-hidden />
        Remove connection
      </button>
    </PanelShell>
  )
}
