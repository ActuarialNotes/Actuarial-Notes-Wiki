// Apply's home (`/apply`, docs/redesign-spec.md §7c.1): the three places the
// notes are put to work, in this order (R19): Projects, Tools, Workflows.
// Each is a card whose heading is tapped into; under it, what the reader last
// touched there, a tap from being picked up again.
//
// What each card says is `lib/apply.ts`. Until the four-place navigation
// (Phase F) the page is reached from the sidebar's Projects row.

import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, FlaskConical, Workflow as WorkflowIcon, type LucideIcon } from 'lucide-react'
import { Chevron, StepBar } from '@/components/apply/ApplyParts'
import { LevelSquare } from '@/components/LevelSquare'
import { GROUND, OUTLINE_CARD } from '@/components/ui/OutlineCard'
import { PROJECT_PROGRAMMES } from '@/data/projects'
import { projectCase } from '@/data/pcpaProjects'
import { useAuth } from '@/hooks/useAuth'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { useProjectSync } from '@/hooks/useProjectSync'
import { useSubscription } from '@/hooks/useSubscription'
import { useTodayExam } from '@/hooks/useTodayExam'
import { useWorkflows } from '@/hooks/useWorkflows'
import { useWorkflowsAccess } from '@/hooks/useWorkflowsAccess'
import { openAttempts, projectsCount, recentTools, stepsLabel, toolsCount, workflowsCount } from '@/lib/apply'
import { attemptOverview, recordTally } from '@/lib/attemptOverview'
import { attemptRoute, visibleTo } from '@/lib/pcpaAttempt'
import { TOOLS_ENABLED } from '@/lib/featureFlags'
import { CATALOGUE_TOOLS } from '@/lib/toolCatalogue'
import { toolConcept, toolsForExam } from '@/lib/toolExam'
import { readRecent } from '@/lib/toolRecent'
import { toolBySlug, toolPath } from '@/lib/tools'
import { libraryWorkflows } from '@/lib/workflowLibrary'
import { cn } from '@/lib/utils'

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'

/** One of the three entries: a heading that is tapped into, and what was last touched under it. */
function ApplyCard({
  to,
  icon: Icon,
  title,
  count,
  testId,
  children,
}: {
  to: string
  icon: LucideIcon
  title: string
  count: string
  testId: string
  children?: ReactNode
}) {
  return (
    <section className={cn(OUTLINE_CARD, 'transition-colors hover:border-foreground')} data-testid={testId}>
      <Link to={to} className={cn('flex items-center gap-3.5 rounded-[22px] p-5', FOCUS)} data-testid={`${testId}-open`}>
        <Icon className="h-[26px] w-[26px] shrink-0" strokeWidth={2} aria-hidden />
        <h2 className="min-w-0 flex-1 truncate text-[22px] font-bold">{title}</h2>
        {count && <span className="shrink-0 text-[15px]" data-testid={`${testId}-count`}>{count}</span>}
        <Chevron />
      </Link>
      {children && <div className="mx-5 border-t border-border py-3.5">{children}</div>}
    </section>
  )
}

function ProjectsCard() {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const { isPro } = useSubscription()
  // An attempt started on another device shows here once the account has answered.
  useProjectSync(isPro ? userId : null)
  const attempts = usePcpaAttempts(s => s.attempts)
  // Attempts are Pro's: a reader without it has briefs to read, and nothing in progress.
  const open = useMemo(() => (isPro ? openAttempts(attempts.filter(a => visibleTo(a, userId))) : []), [attempts, userId, isPro])
  const briefs = PROJECT_PROGRAMMES.reduce((n, p) => n + p.briefs.length, 0)
  const latest = open[0]
  const brief = latest ? projectCase(latest.caseId) : undefined

  return (
    <ApplyCard to="/project" icon={FlaskConical} title="Projects" count={projectsCount(open.length, briefs)} testId="apply-projects">
      {latest && brief && (
        <Link to={attemptRoute(latest.id)} className={cn('flex flex-col gap-2.5 rounded-lg', FOCUS)} data-testid="apply-attempt">
          <span className="truncate text-base font-semibold">{brief.title}</span>
          <StepBar overview={attemptOverview(latest, brief.questions, recordTally(latest))} size="sm" />
        </Link>
      )}
    </ApplyCard>
  )
}

function ToolsCard() {
  const { active } = useTodayExam()
  const { levelOf } = useConceptLevels()
  const forExam = useMemo(() => (active ? toolsForExam(CATALOGUE_TOOLS, active).length : 0), [active])
  const [recent] = useState(() => recentTools(readRecent(), slug => {
    const spec = toolBySlug(slug)
    return spec && spec.area !== 'data' ? spec : undefined
  }))

  return (
    <ApplyCard to="/tools" icon={Calculator} title="Tools" count={toolsCount(forExam, CATALOGUE_TOOLS.length, active?.examLabel ?? null)} testId="apply-tools">
      {recent.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Recent tools">
          {recent.map(spec => {
            const concept = toolConcept(spec)
            return (
              <li key={spec.id} className="min-w-0">
                <Link
                  to={toolPath(spec)}
                  className={cn('flex h-10 min-w-0 items-center gap-2 rounded-full border border-border px-3.5 text-sm font-medium transition-colors hover:border-foreground', FOCUS)}
                  data-testid="apply-recent-tool"
                >
                  {concept && <LevelSquare state={levelOf(concept)} size="xs" />}
                  <span className="truncate">{spec.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </ApplyCard>
  )
}

function WorkflowsCard() {
  const workflows = useWorkflows(s => s.workflows)
  const saved = useMemo(() => libraryWorkflows(workflows), [workflows])
  const latest = saved[0]
  return (
    <ApplyCard to="/workflows" icon={WorkflowIcon} title="Workflows" count={workflowsCount(saved.length)} testId="apply-workflows">
      {latest && (
        <Link to={`/workflows/${latest.id}`} className={cn('flex flex-col gap-1 rounded-lg', FOCUS)} data-testid="apply-workflow">
          <span className="truncate text-base font-semibold">{latest.title}</span>
          <span className="text-sm">{stepsLabel(latest.nodes.length)}</span>
        </Link>
      )}
    </ApplyCard>
  )
}

export default function Apply() {
  const workflows = useWorkflowsAccess()
  return (
    <div className={cn(GROUND, 'min-h-dvh')}>
      <div className="mx-auto flex max-w-xl flex-col gap-2.5 px-3 pb-24 pt-6 sm:px-6 lg:pt-10">
        <h1 className="px-2 pb-3 text-[28px] font-bold tracking-tight">Apply</h1>
        <ProjectsCard />
        {TOOLS_ENABLED && <ToolsCard />}
        {workflows && <WorkflowsCard />}
      </div>
    </div>
  )
}
