import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { ArrowRight, BookOpen, FileUp, LogIn, Trash2, X } from 'lucide-react'
import { ToolCard } from '@/components/tools/ToolCard'
import { formatValue, type ToolResult, type ToolSpec } from '@/lib/tools'
import {
  CSV_DATA,
  CUSTOM_DATA,
  KIND_LABEL,
  TEMPLATE_PREFIX,
  edgeKind,
  edgeLabel,
  runOrder,
  stepName,
  stepOwnInput,
  stepTool,
  type StepRun,
  type Workflow,
  type WorkflowEdge,
  type WorkflowNode,
  type WorkflowResolver,
} from '@/lib/workflow'
import {
  columnKind,
  mappableFields,
  readCsvFile,
  triangleShaped,
  type CsvMapping,
  type CsvTable,
  type FieldMap,
} from '@/lib/workflowCsv'
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
  resolve,
  onSelectEdge,
}: {
  workflow: Workflow
  edges: WorkflowEdge[]
  direction: 'in' | 'out'
  resolve?: WorkflowResolver
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
                <span className="shrink-0 text-xs text-muted-foreground">{edgeLabel(edgeKind(workflow, e, resolve))}</span>
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
  onSelectStep,
  resolve,
  onOpenWorkflow,
  onNotice,
}: {
  workflow: Workflow
  node: WorkflowNode
  run: StepRun | undefined
  layout: PanelLayout
  onClose: () => void
  onUpdate: (patch: Partial<Pick<WorkflowNode, 'note' | 'input' | 'label' | 'data' | 'csv'>>) => void
  onRemove: () => void
  onRead: (concept: string) => void
  onConnectFrom: () => void
  onSelectEdge: (e: WorkflowEdge) => void
  /** Open another step's panel — the step a linked value comes from. */
  onSelectStep: (id: string) => void
  resolve?: WorkflowResolver
  /** Go into a sub-workflow: open it on the board (a template, as a copy of the reader's own). */
  onOpenWorkflow: (node: WorkflowNode) => void
  /** Say something in the board's notice line — a file that couldn't be read. */
  onNotice: (text: string) => void
}) {
  const spec = stepTool(node)
  const name = stepName(node)
  const piped = run?.piped.flatMap(p => p.fields) ?? []
  const pipedKey = JSON.stringify(run?.piped.map(p => [p.from, p.fields]) ?? [])
  // The card restarts when what its connections carry changes, so it shows the new values.
  const carried = JSON.stringify(piped.map(f => run?.input?.[f]))

  const linkedFields = useMemo(() => new Set(piped), [piped.join(',')]) // eslint-disable-line react-hooks/exhaustive-deps
  const cardRef = useRef<HTMLDivElement>(null)
  // A linked field named in the note: bring it into view on the card, and into the hand.
  const showField = (key: string) => {
    const el = cardRef.current?.querySelector<HTMLElement>(`[data-field="${key}"]`)
    if (!el) return
    el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    el.querySelector<HTMLElement>('input, select, button')?.focus({ preventScroll: true })
  }

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
      wide={!!spec || node.ref === CSV_DATA}
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

      {node.kind === 'workflow' && (
        <SubWorkflowView node={node} run={run} workflow={workflow} resolve={resolve} onOpen={() => onOpenWorkflow(node)} onSelectStep={onSelectStep} />
      )}

      {node.ref === CSV_DATA && node.csv && (
        <CsvView
          table={node.csv}
          onReplace={table => onUpdate({ csv: table })}
          onNotice={onNotice}
        />
      )}

      {spec && (
        <div ref={cardRef} className="space-y-2">
          {run?.piped.map(p => {
            const from = workflow.nodes.find(n => n.id === p.from)
            return from ? (
              <LinkNote key={p.from} spec={spec} fields={p.fields} from={from} onField={showField} onStep={onSelectStep} />
            ) : null
          })}
          <ToolCard
            key={`${node.id}:${pipedKey}:${carried}`}
            spec={spec}
            initialInput={run?.input ?? node.input}
            onResult={onResult}
            embedded
            linked={linkedFields}
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

      <ConnectionList workflow={workflow} edges={workflow.edges.filter(e => e.to === node.id)} direction="in" resolve={resolve} onSelectEdge={onSelectEdge} />
      <ConnectionList workflow={workflow} edges={workflow.edges.filter(e => e.from === node.id)} direction="out" resolve={resolve} onSelectEdge={onSelectEdge} />

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

/**
 * A linked field, said in one line: "**Annual trend** linked to **Trend
 * Fit**" — the field brings itself into view on the card below, the step
 * opens its own panel. On a tint of the primary colour, because colour is
 * what a link is: the field's value on the card wears the full colour.
 */
function LinkNote({
  spec,
  fields,
  from,
  onField,
  onStep,
}: {
  spec: ToolSpec
  fields: string[]
  from: WorkflowNode
  onField: (key: string) => void
  onStep: (id: string) => void
}) {
  const link = 'font-semibold underline decoration-primary/50 underline-offset-2 hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm'
  return (
    <p className="rounded-lg bg-primary/10 px-3 py-2 text-sm ring-1 ring-primary/20" data-testid="workflow-link-note">
      {fields.map((key, i) => (
        <span key={key}>
          {i > 0 && (i === fields.length - 1 ? ' and ' : ', ')}
          <button type="button" onClick={() => onField(key)} className={link} data-testid="workflow-link-field">
            {spec.fields.find(f => f.key === key)?.label ?? key}
          </button>
        </span>
      ))}
      {' linked to '}
      <button type="button" onClick={() => onStep(from.id)} className={link} data-testid="workflow-link-step">
        {stepName(from)}
      </button>
    </p>
  )
}

/**
 * A sub-workflow, at one remove: what it is for, each of its steps in run
 * order with the figure it gave, what links into it, and the way in — **Open**
 * puts it on the board to work on at full detail (a template opens as a copy
 * of the reader's own, saved to their library, and this step then points at
 * the copy).
 */
function SubWorkflowView({
  node,
  run,
  workflow,
  resolve,
  onOpen,
  onSelectStep,
}: {
  node: WorkflowNode
  run: StepRun | undefined
  workflow: Workflow
  resolve?: WorkflowResolver
  onOpen: () => void
  onSelectStep: (id: string) => void
}) {
  const inner = resolve?.(node.ref)
  const template = node.ref.startsWith(TEMPLATE_PREFIX)
  if (!inner) {
    return <p className="rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-600 dark:text-amber-400">{run?.error ?? 'This workflow is no longer in your library.'}</p>
  }
  const link = 'font-semibold underline decoration-primary/50 underline-offset-2 hover:decoration-primary rounded-sm'
  return (
    <div className="space-y-3">
      {inner.goal && <p className="text-sm text-muted-foreground">{inner.goal}</p>}
      {run?.piped.map(p => {
        const from = workflow.nodes.find(n => n.id === p.from)
        return from ? (
          <p key={p.from} className="rounded-lg bg-primary/10 px-3 py-2 text-sm ring-1 ring-primary/20" data-testid="workflow-link-note">
            <span className="font-semibold">{p.fields.join(', ')}</span>
            {' linked to '}
            <button type="button" onClick={() => onSelectStep(from.id)} className={link}>{stepName(from)}</button>
          </p>
        ) : null
      })}
      <ol className="space-y-1" data-testid="workflow-inner-steps">
        {runOrder(inner).map((n, i) => {
          const r = run?.inner?.runs.get(n.id)
          const tile = r?.exits[0]?.tiles[0]
          return (
            <li key={n.id} className="flex items-baseline gap-2 rounded-lg bg-muted/60 px-3 py-1.5 text-sm">
              <span className="w-4 shrink-0 text-xs tabular-nums text-muted-foreground">{i + 1}</span>
              <span className="min-w-0 flex-1 truncate">{stepName(n)}</span>
              {r?.error ? (
                <span className="shrink-0 text-xs text-amber-500">Needs input</span>
              ) : tile ? (
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {tile.symbol} = <span className="font-semibold text-foreground">{formatValue(tile.value, tile.unit)}</span>
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-testid="workflow-open-sub"
      >
        <LogIn className="h-5 w-5" aria-hidden />
        {template ? 'Open a copy to edit' : 'Open this workflow'}
      </button>
    </div>
  )
}

const KIND_HINT = { date: 'dates', number: 'values', text: 'text' } as const

/** An uploaded CSV: its columns, with what each holds, and its first rows. */
function CsvView({ table, onReplace, onNotice }: { table: CsvTable; onReplace: (t: CsvTable) => void; onNotice: (text: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const shown = table.rows.slice(0, 8)
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        {table.rows.length} {table.rows.length === 1 ? 'row' : 'rows'} · {table.columns.length} columns. Connect it to a calculation, then choose which columns fill
        which inputs on the connection.
      </p>
      <div className="overflow-x-auto rounded-lg border border-border" data-testid="workflow-csv-preview">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-border">
              {table.columns.map((c, j) => (
                <th key={j} scope="col" className="whitespace-nowrap px-2 py-1.5 text-left font-semibold">
                  {c}
                  <span className="block font-normal text-muted-foreground">{KIND_HINT[columnKind(table, j)]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r, i) => (
              <tr key={i} className="border-b border-border/60 last:border-0">
                {r.map((c, j) => <td key={j} className="whitespace-nowrap px-2 py-1 tabular-nums">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.rows.length > shown.length && <p className="text-xs text-muted-foreground">and {table.rows.length - shown.length} more rows</p>}
      <button type="button" onClick={() => fileRef.current?.click()} className={secondaryButton}>
        <FileUp className="h-4 w-4" aria-hidden />
        Replace the file
      </button>
      <input
        ref={fileRef}
        type="file"
        accept=".csv,.tsv,.txt,text/csv,text/plain"
        className="hidden"
        onChange={async e => {
          const file = e.target.files?.[0]
          e.target.value = ''
          if (!file) return
          const read = await readCsvFile(file)
          if (read.ok) onReplace(read.table)
          else onNotice(read.error)
        }}
      />
    </div>
  )
}

const selectClass = 'h-8 min-w-0 max-w-full rounded-md border border-border bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

/**
 * Which of a CSV's columns fill which of a tool's inputs: for a table, a
 * column per table column; for a triangle, the whole file; for a date or a
 * number, one cell — a column and its first, last or n-th row. Starts from
 * `guessMapping`'s guess, for the reader to check; nothing is guessed for a
 * single cell.
 */
function CsvMapEditor({ table, spec, map, onChange }: { table: CsvTable; spec: ToolSpec; map: CsvMapping; onChange: (map: CsvMapping) => void }) {
  const set = (key: string, value: FieldMap | null) => {
    const next = { ...map }
    if (value) next[key] = value
    else delete next[key]
    onChange(next)
  }
  const columnOptions = (
    <>
      <option value="-1">—</option>
      {table.columns.map((c, j) => <option key={j} value={j}>{c} ({KIND_HINT[columnKind(table, j)]})</option>)}
    </>
  )
  return (
    <div className="space-y-3" data-testid="workflow-csv-map">
      <p className={fieldLabel}>Columns into {spec.name}</p>
      {mappableFields(spec).map(field => {
        const current = map[field.key]
        if (field.kind === 'table') {
          const cols = current?.kind === 'columns' ? current.columns : {}
          return (
            <fieldset key={field.key} className={cn('space-y-1.5 rounded-lg px-3 py-2', current ? 'bg-primary/10 ring-1 ring-primary/20' : 'bg-muted/60')}>
              <legend className="sr-only">{field.label}</legend>
              <p className="text-sm font-medium">{field.label}</p>
              {field.columns.map(c => (
                <label key={c.key} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-muted-foreground">{c.label}{c.optional ? ' (optional)' : ''}</span>
                  <select
                    value={cols[c.key] ?? -1}
                    onChange={e => {
                      const j = Number(e.target.value)
                      const next = { ...cols }
                      if (j < 0) delete next[c.key]
                      else next[c.key] = j
                      set(field.key, Object.keys(next).length ? { kind: 'columns', columns: next } : null)
                    }}
                    className={selectClass}
                    data-testid={`workflow-map-${field.key}-${c.key}`}
                  >
                    {columnOptions}
                  </select>
                </label>
              ))}
            </fieldset>
          )
        }
        if (field.kind === 'triangle') {
          const shaped = triangleShaped(table)
          return (
            <label key={field.key} className={cn('flex items-start gap-2 rounded-lg px-3 py-2 text-sm', current ? 'bg-primary/10 ring-1 ring-primary/20' : 'bg-muted/60', !shaped && 'opacity-60')}>
              <input
                type="checkbox"
                className="mt-0.5"
                checked={!!current}
                disabled={!shaped}
                onChange={e => set(field.key, e.target.checked ? { kind: 'triangle' } : null)}
                data-testid={`workflow-map-${field.key}`}
              />
              <span>
                <span className="font-medium">{field.label}</span>
                <span className="block text-xs text-muted-foreground">
                  {shaped ? 'The whole file: origins down the first column, ages across the header.' : 'Needs origins down the first column and ages (numbers) across the header.'}
                </span>
              </span>
            </label>
          )
        }
        const cell = current?.kind === 'cell' ? current : null
        return (
          <div key={field.key} className={cn('flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm', cell ? 'bg-primary/10 ring-1 ring-primary/20' : 'bg-muted/60')}>
            <span className="text-muted-foreground">{field.label}</span>
            <span className="flex min-w-0 items-center gap-1.5">
              <select
                value={cell?.column ?? -1}
                onChange={e => {
                  const j = Number(e.target.value)
                  set(field.key, j < 0 ? null : { kind: 'cell', column: j, row: cell?.row ?? -1 })
                }}
                className={selectClass}
                aria-label={`${field.label}: column`}
                data-testid={`workflow-map-${field.key}`}
              >
                {columnOptions}
              </select>
              {cell && (
                <select
                  value={cell.row}
                  onChange={e => set(field.key, { ...cell, row: Number(e.target.value) })}
                  className={selectClass}
                  aria-label={`${field.label}: row`}
                >
                  <option value={-1}>Last row</option>
                  <option value={0}>First row</option>
                  {table.rows.slice(1, 200).map((_, i) => <option key={i + 1} value={i + 1}>Row {i + 2}</option>)}
                </select>
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function EdgePanel({
  workflow,
  edge,
  runs,
  layout,
  onClose,
  onUpdate,
  onUpdateMap,
  onRemove,
  onSelectStep,
  resolve,
}: {
  workflow: Workflow
  edge: WorkflowEdge
  runs: Map<string, StepRun>
  layout: PanelLayout
  onClose: () => void
  onUpdate: (note: string) => void
  /** A CSV connection's mapping, changed. */
  onUpdateMap: (map: CsvMapping) => void
  onRemove: () => void
  onSelectStep: (id: string) => void
  resolve?: WorkflowResolver
}) {
  const from = workflow.nodes.find(n => n.id === edge.from)
  const to = workflow.nodes.find(n => n.id === edge.to)
  if (!from || !to) return null
  const kind = edgeKind(workflow, edge, resolve)
  const target = stepTool(to)
  const mapping = from.ref === CSV_DATA && from.csv && target ? { table: from.csv, spec: target } : null
  const fields = runs.get(to.id)?.piped.find(p => p.from === from.id)?.fields ?? []
  const a = stepName(from)
  const b = stepName(to)
  const says = {
    handoff: fields.length
      ? `${b} is linked to ${a}, which fills its ${fields.map(f => target?.fields.find(x => x.key === f)?.label.toLowerCase() ?? f).join(', ')}; it runs live.`
      : `${b} is linked to ${a}, once ${a} runs cleanly.`,
    feeds: mapping
      ? `Choose which of ${a}’s columns fill ${b}’s inputs, and the two are linked.`
      : `${b} uses what ${a} gives. No tool wires these two together, so say what passes along it: Claude carries it across when you run the workflow.`,
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
      kicker={edgeLabel(kind) ? `Connection · ${edgeLabel(kind)}` : kind === 'handoff' ? 'Link' : 'Connection'}
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
      {mapping && <CsvMapEditor table={mapping.table} spec={mapping.spec} map={edge.map ?? {}} onChange={onUpdateMap} />}
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
