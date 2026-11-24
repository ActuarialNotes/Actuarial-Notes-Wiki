import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, Plus, Trash2 } from 'lucide-react'
import { Chevron, StepBar } from '@/components/apply/ApplyParts'
import { ExamLogo } from '@/components/ExamLogo'
import { Button } from '@/components/ui/button'
import { GROUND, OUTLINE_ROW_RULE, OUTLINE_TILE } from '@/components/ui/OutlineCard'
import { NewProjectDialog } from '@/components/project/NewProjectDialog'
import { ProjectDialog } from '@/components/project/shared'
import { projectCase as findCase } from '@/data/pcpaProjects'
import { PROJECT_PROGRAMMES, type ProjectProgramme } from '@/data/projects'
import { useAuth } from '@/hooks/useAuth'
import { backLabel, useBack } from '@/hooks/useBack'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { attemptOverview, recordTally } from '@/lib/attemptOverview'
import { briefRoute } from '@/lib/attemptViews'
import { attemptPhase, attemptRoute, timeLeft, visibleTo, type ProjectAttempt } from '@/lib/pcpaAttempt'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { cn } from '@/lib/utils'
import { wikiRoute } from '@/lib/wikiRoutes'

/**
 * The **Projects** page (`docs/pcpa-project.md`, `docs/redesign-spec.md` §7c),
 * drawn to the redesign's rules: one ground, outlined tiles, one text colour,
 * the exam's colour on its logo alone, one filled button.
 *
 * With Pro (`canStart`) it is the candidate's own work: the attempts still
 * open, each with its four steps, then the submitted ones, and **New project**,
 * which opens the sheet the briefs are chosen from (`NewProjectDialog`).
 *
 * Without Pro there are no attempts to come back to, so the page is the
 * catalogue: every brief, each opening on its own page to be read
 * (`BriefPage`), where starting it leads to Upgrade.
 *
 * Signed in, attempts are saved to the account and follow the candidate to
 * any device; signed out they live in this browser alone, and the page says so.
 */

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'

/** The page's top row: the way back (to the page left, or up to Apply), its name, and a tag or a button. */
function PageHeader({ children }: { children?: ReactNode }) {
  const back = useBack({ to: '/apply', label: 'Apply' })
  return (
    <header className="-ml-3 flex items-center gap-1">
      <Link
        to={back.to}
        state={RESTORE_SCROLL}
        onClick={back.onLinkClick}
        aria-label={backLabel(back)}
        title={backLabel(back)}
        className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full', FOCUS)}
      >
        <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.5} aria-hidden />
      </Link>
      <h1 className="min-w-0 flex-1 text-[22px] font-bold">Projects</h1>
      {children}
    </header>
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="pb-1.5 text-[15px] font-bold">{children}</h2>
}

/** `Sep 15 – 30`, or `Dec 16 – Jan 2` across a month end. */
function formatSpan(from: Date, to: Date) {
  const day = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return from.getMonth() === to.getMonth() ? `${day(from)} – ${to.getDate()}` : `${day(from)} – ${day(to)}`
}

/** One exam's briefs: its logo and published rules, then a row per brief. */
function ProgrammeBriefs({ programme }: { programme: ProjectProgramme }) {
  const next = programme.nextWindow?.(new Date())
  return (
    <section aria-label={`${programme.label} projects`} className="flex flex-col gap-3.5">
      <div className="flex items-center gap-3">
        <ExamLogo examKey={programme.examKey} size="md" />
        <div className="min-w-0 flex-1">
          <Link to={wikiRoute({ kind: 'exam', name: programme.examPage })} className="block text-[17px] font-semibold underline-offset-4 hover:underline">
            {programme.label}
          </Link>
          <p className="truncate text-sm">{programme.name}</p>
        </div>
      </div>
      <p className="text-[15px] leading-relaxed">
        {programme.facts.join(' · ')}
        {next && <><br /><span className="font-semibold">Next CAS window {formatSpan(next.opens, next.closes)}</span></>}
        {' · '}
        <a href={programme.source.url} target="_blank" rel="noreferrer" title={programme.source.label} className="underline underline-offset-4">Source</a>
      </p>
      <div className={cn(OUTLINE_TILE, 'flex flex-col px-4')}>
        {programme.briefs.map(brief => {
          const files = brief.dictionary.length
          return (
            <Link key={brief.id} to={briefRoute(brief.id)} className={cn(OUTLINE_ROW_RULE, 'flex items-center gap-3 py-3.5', FOCUS)} data-testid="brief-row">
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] font-semibold leading-snug">{brief.title}</span>
                <span className="mt-0.5 block text-[15px]">{brief.company}</span>
                <span className="mt-0.5 block text-sm">{brief.line} · {files === 1 ? '1 data set' : `${files} data sets`}</span>
              </span>
              <Chevron />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

/** The page for a reader without Pro: the briefs, each to be read. */
function BriefsCatalogue() {
  return (
    <div className={cn(GROUND, 'min-h-dvh')} data-testid="briefs-catalogue">
      <div className="mx-auto flex max-w-xl flex-col gap-[22px] px-5 pb-24 pt-6 sm:px-6 lg:pt-10">
        <PageHeader>
          <span className="shrink-0 rounded-full border-[1.5px] border-foreground px-2.5 py-0.5 text-[13px] font-bold">Pro</span>
        </PageHeader>
        <p className="text-base leading-normal">
          Read any brief. Working one in R or Python, with its data and a graded report, is part of Pro.
        </p>
        {PROJECT_PROGRAMMES.map(p => <ProgrammeBriefs key={p.id} programme={p} />)}
      </div>
    </div>
  )
}

/** How an attempt stands, in a few words: its time left, that it is practice, or when it went in. */
function attemptStanding(attempt: ProjectAttempt, now: number): string {
  if (attempt.submittedAt !== null) return `Submitted ${new Date(attempt.submittedAt).toLocaleDateString()}`
  if (attempt.deadline === null) return 'Practice'
  return attemptPhase(attempt, now) === 'closed' ? 'Window closed' : timeLeft(attempt.deadline, now).label
}

function AttemptRow({ attempt, now, onDelete }: { attempt: ProjectAttempt; now: number; onDelete: () => void }) {
  const submitted = attempt.submittedAt !== null
  const c = findCase(attempt.caseId)
  return (
    <div className={cn(OUTLINE_ROW_RULE, 'relative py-3.5')}>
      <Link to={attemptRoute(attempt.id, submitted ? 'results' : undefined)} className={cn('flex flex-col gap-2.5 rounded-lg', FOCUS)}>
        {/* Room on the right for the delete button, which sits over this line. */}
        <span className="flex min-h-8 items-center gap-3 pr-10">
          <span className="min-w-0 flex-1 truncate text-[17px] font-semibold">{c?.title ?? attempt.caseId}</span>
          <span className="shrink-0 text-sm font-semibold tabular-nums">{attemptStanding(attempt, now)}</span>
        </span>
        {!submitted && c && <StepBar overview={attemptOverview(attempt, c.questions, recordTally(attempt))} size="sm" />}
      </Link>
      <button type="button" aria-label="Delete attempt" onClick={onDelete} className={cn('absolute right-0 top-3 flex h-9 w-9 items-center justify-end rounded-md', FOCUS)}>
        <Trash2 className="h-[18px] w-[18px]" aria-hidden />
      </button>
    </div>
  )
}

export default function ProjectsHome({ canStart }: { canStart: boolean }) {
  return canStart ? <AttemptsHome /> : <BriefsCatalogue />
}

function AttemptsHome() {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const allAttempts = usePcpaAttempts(s => s.attempts)
  const remove = usePcpaAttempts(s => s.remove)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  const attempts = useMemo(() => allAttempts.filter(a => visibleTo(a, userId)), [allAttempts, userId])
  const open = useMemo(() => attempts.filter(a => a.submittedAt === null), [attempts])
  const submitted = useMemo(
    () => attempts.filter(a => a.submittedAt !== null).sort((a, b) => (b.submittedAt ?? 0) - (a.submittedAt ?? 0)),
    [attempts],
  )

  return (
    <div className={cn(GROUND, 'flex min-h-dvh flex-col')}>
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-[22px] px-5 pb-8 pt-6 sm:px-6 lg:pt-10">
        <PageHeader />

        {attempts.length === 0 && (
          <p className="text-base leading-normal">Pick a brief, then build and report on a GLM in R or Python.</p>
        )}

        {open.length > 0 && (
          <section>
            <SectionHeading>In progress</SectionHeading>
            <div className={cn(OUTLINE_TILE, 'flex flex-col px-4')}>
              {open.map(a => <AttemptRow key={a.id} attempt={a} now={now} onDelete={() => setDeleting(a.id)} />)}
            </div>
          </section>
        )}

        {submitted.length > 0 && (
          <section>
            <SectionHeading>Submitted</SectionHeading>
            <div className={cn(OUTLINE_TILE, 'flex flex-col px-4')}>
              {submitted.map(a => <AttemptRow key={a.id} attempt={a} now={now} onDelete={() => setDeleting(a.id)} />)}
            </div>
          </section>
        )}

        {/* Where the attempts are kept and, signed out, how to keep them for good. */}
        {userId !== null ? (
          <p className="text-sm">Saved to your account. Open your projects on any device you sign in on.</p>
        ) : (
          <p className="text-sm">
            <span className="font-bold">Saved in this browser only.</span>{' '}
            Clearing site data deletes them, and a private window or another device won't see them.{' '}
            <Link to="/auth" state={{ from: '/project' }} className="font-semibold underline underline-offset-4">Sign in to keep them</Link>
          </p>
        )}
      </div>

      <div className="sticky bottom-[var(--place-bar-height,0px)] shrink-0 border-t border-border bg-ground px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
        <button
          type="button"
          onClick={() => setCreating(true)}
          data-sound="press"
          className={cn('mx-auto flex h-[58px] w-full max-w-xl items-center justify-center gap-2.5 rounded-full bg-primary px-6 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90', FOCUS)}
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden />
          New project
        </button>
      </div>

      {creating && <NewProjectDialog attempts={attempts} owner={userId ?? undefined} onClose={() => setCreating(false)} />}

      {deleting && (
        <ProjectDialog
          title="Delete this attempt?"
          onClose={() => setDeleting(null)}
          footer={<>
            <Button variant="outline" size="sm" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={() => { void remove(deleting); setDeleting(null) }}>Delete</Button>
          </>}
        >
          <p className="text-sm text-muted-foreground">
            Its report, code and output files are removed {userId ? 'from your account and every device' : 'from this browser'}. This can't be undone.
          </p>
        </ProjectDialog>
      )}
    </div>
  )
}
