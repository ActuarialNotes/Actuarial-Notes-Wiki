import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { ApplyRow, StepBar } from '@/components/apply/ApplyParts'
import { ExamLogo } from '@/components/ExamLogo'
import { MobileNavButton } from '@/components/MobileNavButton'
import { GROUND } from '@/components/ui/OutlineCard'
import type { ProjectCase } from '@/data/pcpaProjects'
import { programmeOf } from '@/data/projects'
import { backLabel, useBack, usePageLabel } from '@/hooks/useBack'
import { ATTEMPT_VIEW_LABEL, type AttemptView } from '@/lib/attemptViews'
import { attemptOverview, overviewAction, type ChecklistRow, type OverviewStep } from '@/lib/attemptOverview'
import { timeLeft, type AttemptPhase, type ProjectAttempt } from '@/lib/pcpaAttempt'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { cn } from '@/lib/utils'
import { useWordTally } from './useWordTally'

/**
 * The overview of one attempt (docs/redesign-spec.md §7c.4): the way into it.
 * The brief's title and company, how it is being worked, the four steps with
 * the current one marked, the submission checklist with its figures, and one
 * filled button that continues where the candidate is. What every row says is
 * `lib/attemptOverview.ts`.
 *
 * It is a view of the attempt's page like the four it leads to, so going into
 * one replaces the history entry and the browser's Back leaves the attempt.
 */

const stepLabel = (step: OverviewStep) => ATTEMPT_VIEW_LABEL[step]

function Tick({ done }: { done: boolean }) {
  return done ? (
    <span role="img" aria-label="Done" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-ground">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <path d="M5 12l5 5 9-10" />
      </svg>
    </span>
  ) : (
    <span role="img" aria-label="To do" className="box-border h-6 w-6 shrink-0 rounded-full border-[1.5px] border-foreground" />
  )
}

function Row({ row, onOpen }: { row: ChecklistRow; onOpen: () => void }) {
  return (
    <li className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onOpen}
        data-testid={`checklist-${row.id}`}
        data-done={row.done}
        className="grid w-full grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 py-[13px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Tick done={row.done} />
        <span className="text-base font-medium">{row.label}</span>
        <span className="text-[15px] font-bold tabular-nums">{row.value}</span>
        {row.progress !== undefined && (
          <span className="col-span-2 col-start-2 block h-1.5 rounded-full bg-border" aria-hidden="true">
            <span className="block h-1.5 rounded-full bg-foreground" style={{ width: `${Math.round(row.progress * 100)}%` }} />
          </span>
        )}
      </button>
    </li>
  )
}

export function AttemptOverviewView({
  attempt,
  projectCase,
  phase,
  now,
  onOpen,
}: {
  attempt: ProjectAttempt
  projectCase: ProjectCase
  phase: AttemptPhase
  now: number
  onOpen: (view: AttemptView) => void
}) {
  const back = useBack({ to: '/project', label: 'Projects' })
  usePageLabel(projectCase.title)
  const { tally } = useWordTally(attempt)
  const overview = attemptOverview(attempt, projectCase.questions, tally)
  const action = overviewAction(overview, phase, stepLabel)
  const programme = programmeOf(projectCase.id)
  const left = attempt.deadline !== null ? timeLeft(attempt.deadline, now) : null
  const mode = phase === 'closed' ? 'Window closed' : attempt.mode === 'rehearsal' ? 'Rehearsal' : 'Practice'

  return (
    <div className={cn(GROUND, 'flex min-h-full flex-col')} data-testid="attempt-overview">
      <header className="flex h-14 shrink-0 items-center gap-2 px-2 sm:px-3">
        <MobileNavButton />
        <Link
          to={back.to}
          state={RESTORE_SCROLL}
          onClick={back.onLinkClick}
          aria-label={backLabel(back)}
          title={backLabel(back)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.5} aria-hidden />
        </Link>
        {programme && <ExamLogo examKey={programme.examKey} size="md" />}
        <span className="min-w-0 flex-1 truncate text-[17px] font-semibold">{programme ? `${programme.label} project` : 'Project'}</span>
        <span className="shrink-0 rounded-full border-[1.5px] border-foreground px-2.5 py-0.5 text-[13px] font-bold" data-testid="attempt-mode">{mode}</span>
      </header>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-[22px] px-5 pb-6 pt-5">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[28px] font-bold leading-[1.15] tracking-tight">{projectCase.title}</h1>
          <p className="flex flex-wrap items-baseline justify-between gap-x-4 text-base">
            <span>{projectCase.company}</span>
            {left && phase === 'open' && <span className="font-bold tabular-nums">{left.label}</span>}
          </p>
        </div>

        <StepBar overview={overview} />

        <ul className="flex flex-col" aria-label="Submission checklist" data-testid="attempt-checklist">
          {overview.checklist.map(row => <Row key={row.id} row={row} onOpen={() => onOpen(row.view)} />)}
        </ul>

        {/* The brief is the filled button until it has been read; after that it is a row. */}
        {action.view !== 'brief' && <ApplyRow onClick={() => onOpen('brief')} label="Read the brief" testId="overview-brief" />}
      </div>

      <div className="sticky bottom-0 shrink-0 border-t border-border bg-ground px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
        <button
          type="button"
          onClick={() => onOpen(action.view)}
          data-testid="overview-continue"
          className="mx-auto flex h-[58px] w-full max-w-xl items-center justify-center rounded-full bg-primary px-6 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground"
        >
          {action.label}
        </button>
      </div>
    </div>
  )
}
