import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Bot, Check, ClipboardCopy, KeyRound, Loader2, Rocket, Square, Wrench, X } from 'lucide-react'
import { MarkdownText } from '@/components/MarkdownText'
import { readApiKey, saveApiKey } from '@/hooks/useWorkflows'
import { connectorUrl } from '@/lib/aiConnector'
import type { StepRun, Workflow } from '@/lib/workflow'
import {
  WORKFLOW_MODEL,
  deployWorkflow,
  describeWorkflow,
  type AgentMessage,
  type AgentParams,
  type DeployEvent,
} from '@/lib/workflowAgent'
import { cn } from '@/lib/utils'
import type { PanelLayout } from './WorkflowPanels'

type Phase = 'idle' | 'running' | 'done' | 'error'

const DONE_TEXT: Record<Extract<DeployEvent, { type: 'done' }>['reason'], string | null> = {
  finished: null,
  stopped: 'Stopped.',
  max_tokens: 'The answer ran past its length limit and was cut off.',
  max_turns: 'Stopped after the most steps one deployment may take. Simplify the workflow, or run it again.',
  refusal: 'Claude declined to continue with this workflow.',
}

/**
 * **Deploy with AI** (docs/workflow-builder.md) — the workflow run by Claude
 * on the reader's own Anthropic API key, its tool calls answered here in the
 * browser by the same engine as the cards (`lib/workflowAgent.ts`). The key is
 * kept in this browser and sent only to Anthropic; a reader without one can
 * copy the workflow as a brief for Claude with the Actuarial Notes connector.
 */
export function WorkflowDeployPanel({
  workflow,
  runs,
  layout,
  readConcept,
  onGoal,
  onActive,
  onClose,
}: {
  workflow: Workflow
  runs: Map<string, StepRun>
  layout: PanelLayout
  readConcept: (name: string) => string | undefined
  onGoal: (goal: string) => void
  /** The steps the deployment is working on — the board lights them. */
  onActive: (ids: string[]) => void
  onClose: () => void
}) {
  const [key, setKey] = useState(readApiKey)
  const [draftKey, setDraftKey] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const [events, setEvents] = useState<DeployEvent[]>([])
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const abort = useRef<AbortController | null>(null)
  const logEnd = useRef<HTMLDivElement>(null)

  // Leaving the panel stops a deployment and lets the board go dark.
  useEffect(() => () => {
    abort.current?.abort()
    onActive([])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    logEnd.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [events.length])

  const steps = workflow.nodes.length

  const deploy = async () => {
    if (!key || !steps) return
    const controller = new AbortController()
    abort.current = controller
    setPhase('running')
    setEvents([])
    setError(null)
    // The SDK is fetched on the first deployment, not with the board.
    let Anthropic: typeof import('@anthropic-ai/sdk').default | null = null
    try {
      Anthropic = (await import('@anthropic-ai/sdk')).default
      const client = new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true, maxRetries: 2 })
      const send = (params: AgentParams, signal?: AbortSignal): Promise<AgentMessage> =>
        client.beta.messages.create(params, { signal })
      await deployWorkflow({
        workflow,
        runs,
        send,
        readConcept,
        signal: controller.signal,
        onEvent: event => {
          setEvents(list => [...list, event])
          if (event.type === 'tool') onActive(event.stepIds)
        },
      })
      setPhase('done')
    } catch (err) {
      if (controller.signal.aborted || (Anthropic && err instanceof Anthropic.APIUserAbortError)) {
        setEvents(list => [...list, { type: 'done', reason: 'stopped' }])
        setPhase('done')
      } else {
        setError(deployError(Anthropic, err))
        setPhase('error')
      }
    } finally {
      abort.current = null
      onActive([])
    }
  }

  const stop = () => abort.current?.abort()

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(describeWorkflow(workflow, runs, 'connector'))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch { /* no clipboard: nothing to say */ }
  }

  const textArea =
    'w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <aside
      aria-label="Deploy with AI"
      className={cn(
        'flex flex-col bg-card text-card-foreground shadow-2xl',
        layout === 'drawer' ? 'craft-drawer-in h-full w-[26rem] max-w-[calc(100vw-1.5rem)] rounded-xl' : 'craft-sheet-in max-h-[80dvh] w-full rounded-t-2xl',
      )}
      data-testid="workflow-deploy-panel"
    >
      <div className="flex items-start gap-2 px-4 pb-2 pt-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Deploy with AI</p>
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
            disabled={phase === 'running'}
            placeholder="What should the workflow answer? e.g. Estimate unpaid claims by accident year and compare the two methods."
            className={textArea}
            data-testid="workflow-goal"
          />
        </label>

        {key ? (
          <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
            <KeyRound className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="min-w-0 flex-1">API key saved in this browser · ends {key.slice(-4)}</span>
            <button
              type="button"
              disabled={phase === 'running'}
              onClick={() => {
                saveApiKey('')
                setKey('')
              }}
              className="font-medium text-foreground underline-offset-2 hover:underline disabled:opacity-50"
              data-testid="workflow-forget-key"
            >
              Forget
            </button>
          </div>
        ) : (
          <form
            className="space-y-2"
            onSubmit={e => {
              e.preventDefault()
              const k = draftKey.trim()
              if (!k) return
              saveApiKey(k)
              setKey(k)
              setDraftKey('')
            }}
          >
            <label className="block space-y-1.5">
              <span className="block text-xs font-semibold text-muted-foreground">Your Anthropic API key</span>
              <input
                type="password"
                value={draftKey}
                onChange={e => setDraftKey(e.target.value)}
                placeholder="sk-ant-…"
                autoComplete="off"
                spellCheck={false}
                className={textArea}
                data-testid="workflow-key-input"
              />
            </label>
            <p className="text-xs text-muted-foreground">
              Kept in this browser only and sent only to Anthropic. A deployment is billed to your account.
            </p>
            <button
              type="submit"
              disabled={!draftKey.trim()}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
              data-testid="workflow-save-key"
            >
              <KeyRound className="h-4 w-4" aria-hidden />
              Save key
            </button>
          </form>
        )}

        {phase === 'running' ? (
          <button
            type="button"
            onClick={stop}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-base font-semibold transition-colors hover:bg-accent"
            data-testid="workflow-stop"
          >
            <Square className="h-4 w-4" aria-hidden />
            Stop
          </button>
        ) : (
          <button
            type="button"
            onClick={deploy}
            disabled={!key || !steps}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-[filter] hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100"
            data-testid="workflow-deploy"
          >
            <Rocket className="h-5 w-5" aria-hidden />
            {phase === 'idle' ? 'Deploy' : 'Deploy again'}
          </button>
        )}
        <p className="-mt-2 text-center text-[11px] text-muted-foreground">
          {steps ? `${WORKFLOW_MODEL} works the ${steps} ${steps === 1 ? 'step' : 'steps'} with the calculators here` : 'Add a step to deploy'}
        </p>

        {(events.length > 0 || phase === 'running' || error) && (
          <ol className="space-y-2" aria-live="polite" data-testid="workflow-deploy-log">
            {events.map((event, i) => <LogEntry key={i} event={event} />)}
            {phase === 'running' && (
              <li className="flex items-center gap-2 text-xs text-muted-foreground" role="status">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                Working…
              </li>
            )}
            {error && (
              <li className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {error}
              </li>
            )}
            <div ref={logEnd} />
          </ol>
        )}

        <div className="space-y-2 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            No API key? Copy the workflow as a brief and paste it into Claude or ChatGPT with the Actuarial Notes connector
            ({connectorUrl()}) added — set it up in <Link to="/settings#ai" className="underline underline-offset-2">Settings</Link>.
          </p>
          <button
            type="button"
            onClick={copyBrief}
            disabled={!steps}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
            data-testid="workflow-copy-brief"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" aria-hidden /> : <ClipboardCopy className="h-4 w-4" aria-hidden />}
            {copied ? 'Copied' : 'Copy for Claude'}
          </button>
        </div>
      </div>
    </aside>
  )
}

/** What went wrong, in a line the reader can act on. */
function deployError(Anthropic: typeof import('@anthropic-ai/sdk').default | null, err: unknown): string {
  if (!Anthropic) return 'Couldn’t load the Claude client. Check your connection and try again.'
  if (err instanceof Anthropic.AuthenticationError) return 'Anthropic refused that API key. Check it, or forget it and paste it again.'
  if (err instanceof Anthropic.PermissionDeniedError) return 'That API key isn’t allowed to use this model.'
  if (err instanceof Anthropic.RateLimitError) return 'Your API key hit its rate limit. Wait a moment and deploy again.'
  if (err instanceof Anthropic.APIConnectionError) return 'Couldn’t reach Anthropic. Check your connection and try again.'
  if (err instanceof Anthropic.APIError) return `Anthropic returned an error${err.status ? ` (${err.status})` : ''}: ${err.message}`
  return err instanceof Error ? err.message : String(err)
}

function LogEntry({ event }: { event: DeployEvent }) {
  if (event.type === 'text') {
    return (
      <li className="flex gap-2 text-sm">
        <Bot className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
        <MarkdownText className="prose-sm min-w-0 flex-1 [&_p]:my-1.5">{event.text}</MarkdownText>
      </li>
    )
  }
  if (event.type === 'tool') {
    const what = event.name === 'run_tool' ? 'Ran' : event.name === 'describe_tool' ? 'Read inputs' : 'Read'
    return (
      <li
        className={cn('flex items-start gap-2 rounded-lg px-3 py-2 text-xs', event.outcome.isError ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-muted/60 text-muted-foreground')}
        data-testid="workflow-deploy-tool"
      >
        <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="font-semibold text-foreground">{what}</span> {event.outcome.summary}
        </span>
      </li>
    )
  }
  const text = DONE_TEXT[event.reason]
  if (!text) return null
  return <li className="text-xs text-muted-foreground">{text}</li>
}
