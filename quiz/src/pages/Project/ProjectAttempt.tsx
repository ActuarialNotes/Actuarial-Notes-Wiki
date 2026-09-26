import { useCallback, useEffect, useState } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { Award, BookOpenText, Code2, FileText, Loader2, Send } from 'lucide-react'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { BriefView } from '@/components/project/BriefView'
import { WorkspaceView } from '@/components/project/WorkspaceView'
import { ReportView } from '@/components/project/ReportView'
import { SubmitView } from '@/components/project/SubmitView'
import { ResultsView } from '@/components/project/ResultsView'
import { ProjectTopBar, WindowPill } from '@/components/project/ProjectTopBar'
import { queueOpenFile } from '@/components/project/workspaceTabs'
import { projectCase as findCase } from '@/data/pcpaProjects'
import { useAttempt, usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { usePcpaWorkspace } from '@/hooks/usePcpaWorkspace'
import { useProjectRuntime } from '@/hooks/useProjectRuntime'
import { attemptPhase, starterScript, type ProjectAttempt } from '@/lib/pcpaAttempt'
import { generateCase } from '@/lib/pcpaData'
import { toCsv } from '@/lib/csv'

/**
 * One project attempt: the materials, the workspace, the report, submission
 * and — once submitted — the results. The five are views of one page (the
 * `view` search parameter), not five pages: switching between them is the
 * candidate moving between windows of one project, and a query-only change
 * doesn't slide the sheet (`lib/viewTransition.ts`).
 *
 * The page owns the attempt's session: it opens the workspace's files — drawing
 * the data sets the first time — and stops the R and Python sessions when the
 * candidate leaves.
 */

type View = 'brief' | 'workspace' | 'report' | 'submit' | 'results'

const VIEWS: View[] = ['brief', 'workspace', 'report', 'submit', 'results']

/** Minutes of inactivity after which the workspace stops counting time. */
const IDLE_MS = 2 * 60_000
const TICK_MS = 30_000

function seedFiles(attempt: ProjectAttempt) {
  const projectCase = findCase(attempt.caseId)
  const generated = generateCase(attempt.caseId, attempt.seed)
  const starter = projectCase ? [{ ...starterScript(attempt.language, projectCase), readOnly: false }] : []
  return [
    ...generated.tables.map(t => ({ path: `data/${t.file}`, text: toCsv(t.columns, t.rows), readOnly: true })),
    ...starter,
  ]
}

export default function ProjectAttemptPage() {
  const { attemptId } = useParams()
  const attempt = useAttempt(attemptId)
  const update = usePcpaAttempts(s => s.update)
  const openWorkspace = usePcpaWorkspace(s => s.open)
  const closeWorkspace = usePcpaWorkspace(s => s.close)
  const status = usePcpaWorkspace(s => s.status)
  const persistent = usePcpaWorkspace(s => s.persistent)
  const shutdown = useProjectRuntime(s => s.shutdown)
  const [params, setParams] = useSearchParams()
  const [now, setNow] = useState(() => Date.now())

  const phase = attempt ? attemptPhase(attempt, now) : 'open'
  const requested = params.get('view') as View | null
  const view: View = requested && VIEWS.includes(requested) && (requested !== 'results' || phase === 'submitted')
    ? requested
    : phase === 'submitted' ? 'results' : 'brief'

  const setView = useCallback((next: View) => {
    setParams(p => {
      const out = new URLSearchParams(p)
      out.set('view', next)
      return out
    }, { replace: true })
  }, [setParams])

  useEffect(() => {
    if (!attempt) return
    void openWorkspace(attempt.id, () => seedFiles(attempt))
    // Only the attempt's identity matters here; its record changes constantly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt?.id, openWorkspace])

  useEffect(() => () => {
    closeWorkspace()
    shutdown()
  }, [closeWorkspace, shutdown])

  // The clock the countdown reads, and the time spent working.
  useEffect(() => {
    if (!attempt) return
    let lastActivity = Date.now()
    const mark = () => { lastActivity = Date.now() }
    const events = ['keydown', 'pointerdown', 'wheel'] as const
    for (const e of events) window.addEventListener(e, mark, { passive: true })
    const id = window.setInterval(() => {
      const t = Date.now()
      setNow(t)
      const current = usePcpaAttempts.getState().attempts.find(a => a.id === attempt.id)
      if (current && attemptPhase(current, t) === 'open' && document.visibilityState === 'visible' && t - lastActivity < IDLE_MS) {
        update(attempt.id, a => ({ activeMs: a.activeMs + TICK_MS }))
      }
    }, TICK_MS)
    return () => {
      window.clearInterval(id)
      for (const e of events) window.removeEventListener(e, mark)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt?.id, update])

  if (!attempt) return <Navigate to="/project/pcpa" replace />
  const projectCase = findCase(attempt.caseId)
  if (!projectCase) return <Navigate to="/project/pcpa" replace />

  const locked = phase !== 'open'
  const fullHeight = view === 'workspace' || view === 'report'

  const tabs = [
    { value: 'brief' as const, label: <><BookOpenText className="h-4 w-4" /><span className="hidden sm:inline">Brief</span></>, ariaLabel: 'Brief' },
    { value: 'workspace' as const, label: <><Code2 className="h-4 w-4" /><span className="hidden sm:inline">Workspace</span></>, ariaLabel: 'Workspace' },
    { value: 'report' as const, label: <><FileText className="h-4 w-4" /><span className="hidden sm:inline">Report</span></>, ariaLabel: 'Report' },
    phase === 'submitted'
      ? { value: 'results' as const, label: <><Award className="h-4 w-4" /><span className="hidden sm:inline">Results</span></>, ariaLabel: 'Results' }
      : { value: 'submit' as const, label: <><Send className="h-4 w-4" /><span className="hidden sm:inline">Submit</span></>, ariaLabel: 'Submit' },
  ]

  return (
    <div className="flex h-[100dvh] flex-col">
      <ProjectTopBar
        backTo="/project/pcpa"
        backLabel="Back to your projects"
        title={projectCase.title}
        subtitle={`PCPA Project · ${projectCase.company}`}
        right={<WindowPill attempt={attempt} now={now} compact />}
      >
        <SegmentedControl<View>
          size="sm"
          pill
          label="Project view"
          value={view === 'submit' && phase === 'submitted' ? 'results' : view}
          onChange={setView}
          options={tabs}
          className="w-full max-w-md"
        />
      </ProjectTopBar>
      {!persistent && (
        <p className="shrink-0 bg-amber-50 px-4 py-1.5 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          This browser isn't letting the app store files, so the project's files last only while this tab is open.
        </p>
      )}
      <div className={fullHeight ? 'min-h-0 flex-1' : 'min-h-0 flex-1 overflow-y-auto'}>
        {status !== 'ready' ? (
          <div className="flex items-center gap-2 p-8 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Preparing the project files…
          </div>
        ) : view === 'brief' ? (
          <BriefView attempt={attempt} projectCase={projectCase} onOpenFile={path => { queueOpenFile(attempt.id, path); setView('workspace') }} />
        ) : view === 'workspace' ? (
          <WorkspaceView attempt={attempt} />
        ) : view === 'report' ? (
          <ReportView attempt={attempt} projectCase={projectCase} locked={locked} />
        ) : view === 'submit' ? (
          <SubmitView attempt={attempt} projectCase={projectCase} onSubmitted={() => setView('results')} />
        ) : (
          <ResultsView attempt={attempt} projectCase={projectCase} onOpenWorkspace={() => setView('workspace')} />
        )}
      </div>
    </div>
  )
}
