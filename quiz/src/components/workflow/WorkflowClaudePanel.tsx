import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ClipboardCopy, Copy, X } from 'lucide-react'
import { connectorUrl } from '@/lib/aiConnector'
import type { StepRun, Workflow, WorkflowResolver } from '@/lib/workflow'
import { describeWorkflow, type SourceLookup } from '@/lib/workflowBrief'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { cn } from '@/lib/utils'
import type { PanelLayout } from './WorkflowPanels'

/** A source step's document, from the catalogue, with its publisher's name. */
const lookupSource: SourceLookup = ref => {
  const resource = COWORK_RESOURCES.find(r => r.id === ref)
  if (!resource) return undefined
  return { resource, publisher: COWORK_ENTITIES.find(e => e.id === resource.entityId)?.name }
}

/**
 * **Run it in Claude** (docs/workflows.md) — the workflow as a brief
 * (`lib/workflowBrief.ts`) for Claude or ChatGPT with the Actuarial Notes
 * connector added. The app calls no model and holds no key: the reader's
 * assistant runs every calculation through the connector, on the same engine
 * as the cards.
 */
export function WorkflowClaudePanel({
  workflow,
  runs,
  layout,
  onGoal,
  onClose,
  resolve,
}: {
  workflow: Workflow
  runs: Map<string, StepRun>
  resolve?: WorkflowResolver
  layout: PanelLayout
  onGoal: (goal: string) => void
  onClose: () => void
}) {
  const [copied, setCopied] = useState<'brief' | 'url' | null>(null)
  const steps = workflow.nodes.length
  const brief = describeWorkflow(workflow, runs, resolve, lookupSource)
  const url = connectorUrl()

  const copy = async (what: 'brief' | 'url', text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(what)
      window.setTimeout(() => setCopied(c => (c === what ? null : c)), 1600)
    } catch { /* no clipboard: the brief is on screen below to select */ }
  }

  const textArea =
    'w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <aside
      aria-label="Run it in Claude"
      className={cn(
        'flex flex-col bg-card text-card-foreground shadow-2xl',
        layout === 'drawer' ? 'craft-drawer-in h-full w-[26rem] max-w-[calc(100vw-1.5rem)] rounded-xl' : 'craft-sheet-in max-h-[80dvh] w-full rounded-t-2xl',
      )}
      data-testid="workflow-claude-panel"
    >
      <div className="flex items-start gap-2 px-4 pb-2 pt-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Run it in Claude</p>
          <h2 className="truncate text-lg font-semibold leading-snug">{workflow.title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-1 -mt-1 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-4 [scrollbar-width:thin]">
        <label className="block space-y-1.5">
          <span className="block text-xs font-semibold text-muted-foreground">Goal</span>
          <textarea
            value={workflow.goal}
            onChange={e => onGoal(e.target.value)}
            rows={3}
            placeholder="What should the workflow answer? e.g. Estimate unpaid claims by accident year and compare the two methods."
            className={textArea}
            data-testid="workflow-goal"
          />
        </label>

        <button
          type="button"
          onClick={() => copy('brief', brief)}
          disabled={!steps}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-[filter] hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100"
          data-testid="workflow-copy-brief"
        >
          {copied === 'brief' ? <Check className="h-5 w-5" aria-hidden /> : <ClipboardCopy className="h-5 w-5" aria-hidden />}
          {copied === 'brief' ? 'Copied' : 'Copy for Claude'}
        </button>

        <ol className="space-y-3 text-sm">
          <li className="flex gap-3">
            <Num n={1} />
            <div className="min-w-0 flex-1 space-y-1.5">
              <p>Add the Actuarial Notes connector to Claude or ChatGPT, once.</p>
              <div className="flex items-center gap-1 rounded-lg bg-muted/60 py-1 pl-3 pr-1">
                <code className="min-w-0 flex-1 truncate text-xs">{url}</code>
                <button
                  type="button"
                  onClick={() => copy('url', url)}
                  aria-label="Copy the connector address"
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {copied === 'url' ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                How, step by step: <Link to="/settings#ai" className="underline underline-offset-2">Settings → AI assistants</Link>.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <Num n={2} />
            <p className="min-w-0 flex-1">
              Paste the workflow into a new chat. Claude runs each step with the same calculators, reads the concept pages, and
              writes up what it found.
            </p>
          </li>
        </ol>

        {steps > 0 && (
          <details className="group text-sm">
            <summary className="cursor-pointer select-none py-1 text-muted-foreground hover:text-foreground">What Claude is given</summary>
            <pre className="mt-1 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-muted/60 p-3 font-mono text-[11px] leading-relaxed" data-testid="workflow-brief">
              {brief}
            </pre>
          </details>
        )}
      </div>
    </aside>
  )
}

function Num({ n }: { n: number }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums" aria-hidden>
      {n}
    </span>
  )
}
