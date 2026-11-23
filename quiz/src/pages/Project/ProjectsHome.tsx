import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Cloud, HardDrive, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { Card } from '@/components/ui/card'
import { BriefTile } from '@/components/project/BriefTile'
import { NewProjectDialog, ProgrammeGroup } from '@/components/project/NewProjectDialog'
import { ProjectDialog } from '@/components/project/shared'
import { WindowPill } from '@/components/project/ProjectTopBar'
import { projectCase as findCase } from '@/data/pcpaProjects'
import { PROJECT_PROGRAMMES } from '@/data/projects'
import { ProBadge } from '@/components/ProBadge'
import { backLabel, useBack } from '@/hooks/useBack'
import { briefRoute } from '@/lib/attemptViews'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { useAuth } from '@/hooks/useAuth'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { attemptRoute, visibleTo, type ProjectAttempt } from '@/lib/pcpaAttempt'

/**
 * The **Projects** tab: the candidate's own projects, and the **+** that
 * starts a new one (`docs/pcpa-project.md`).
 *
 * The page is about the reader's work, not the catalogue. The briefs — every
 * one the app has, grouped by the exam it is a project for and coloured by
 * that exam — are the first step of the sheet the + opens
 * (`NewProjectDialog`), which is the only place they are chosen from. What
 * stays on the page is what a candidate comes back for: the attempts still
 * open, then the submitted ones, whose results are kept.
 *
 * A reader without Pro (`canStart` false) has no attempts to come back to, so
 * for them the page *is* the catalogue: every brief, each opening on its own
 * page to be read (`BriefPage`), where starting it leads to Upgrade.
 *
 * Where attempts are kept depends on who is reading. Signed in, they are saved
 * to the account and follow the candidate to any device; signed out, they live
 * in this browser alone, and the page says so, with the way to keep them.
 */

/** The one-line heading every group on the page carries — the Study Guides track heading's type. */
function GroupLabel({ children }: { children: ReactNode }) {
  return <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</h2>
}

function AttemptRow({ attempt, now, onDelete }: { attempt: ProjectAttempt; now: number; onDelete: () => void }) {
  const submitted = attempt.submittedAt !== null
  const c = findCase(attempt.caseId)
  return (
    <Card className="flex items-center gap-3 p-3 pr-2">
      <Link to={attemptRoute(attempt.id, submitted ? 'results' : undefined)} className="flex min-w-0 flex-1 items-center gap-3">
        <BriefTile caseId={attempt.caseId} size="md" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">{c?.title ?? attempt.caseId}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {new Date(attempt.submittedAt ?? attempt.startedAt).toLocaleDateString()} · {attempt.language === 'r' ? 'R' : 'Python'}
          </span>
        </span>
      </Link>
      {/* A submitted attempt is under its own heading; its pill would say it again. */}
      {!submitted && <WindowPill attempt={attempt} now={now} compact />}
      <button type="button" aria-label="Delete attempt" onClick={onDelete} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-destructive">
        <Trash2 className="h-4 w-4" />
      </button>
    </Card>
  )
}

/** Where the reader's attempts are kept — and, signed out, how to keep them for good. */
function StorageNote({ signedIn }: { signedIn: boolean }) {
  if (signedIn) {
    return (
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Cloud className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Saved to your account. Open your projects on any device you sign in on.
      </p>
    )
  }
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-dashed border-border p-3">
      <HardDrive className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      <p className="min-w-0 flex-1 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Saved in this browser only.</span>{' '}
        Clearing site data deletes them, and a private window or another device won't see them.
      </p>
      <Link to="/auth" state={{ from: '/project' }} className={buttonVariants({ variant: 'outline', size: 'sm', className: 'h-7 px-2.5 text-xs' })}>
        Sign in to keep them
      </Link>
    </div>
  )
}

/** The way back: to the page left, or up to Apply's home. */
function BackLink() {
  const back = useBack({ to: '/apply', label: 'Apply' })
  return (
    <Link
      to={back.to}
      state={RESTORE_SCROLL}
      onClick={back.onLinkClick}
      aria-label={backLabel(back)}
      title={backLabel(back)}
      className="-ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ChevronLeft className="h-5 w-5" strokeWidth={2.5} aria-hidden />
    </Link>
  )
}

/** The page for a reader without Pro: the briefs, each to be read. */
function BriefsCatalogue() {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 pb-24 sm:px-6" data-testid="briefs-catalogue">
      <div className="flex items-center gap-1">
        <BackLink />
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">Projects <ProBadge /></h1>
      </div>
      <p className="max-w-prose text-sm text-muted-foreground">
        Read any brief. Working one in R or Python, with its data and a graded report, is part of Pro.
      </p>
      {PROJECT_PROGRAMMES.map(p => (
        <ProgrammeGroup key={p.id} programme={p} attempts={[]} onSelect={brief => navigate(briefRoute(brief.id))} />
      ))}
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
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 pb-24 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-1">
          <BackLink />
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        </div>
        <Button size="sm" className="gap-1.5 rounded-full pl-2.5 pr-3.5" aria-label="New project" data-sound="press" onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">New project</span>
        </Button>
      </div>

      {attempts.length === 0 && (
        <button
          type="button"
          onClick={() => setCreating(true)}
          data-sound="press"
          className="flex w-full flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border px-6 py-12 text-center transition-colors hover:border-primary/40 hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <Plus className="h-6 w-6" aria-hidden />
          </span>
          <span className="text-base font-semibold">Start a project</span>
          <span className="max-w-sm text-sm text-muted-foreground">Pick a brief, then build and report on a GLM in R or Python.</span>
        </button>
      )}

      {open.length > 0 && (
        <section className="space-y-3">
          <GroupLabel>Continue</GroupLabel>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {open.map(a => <AttemptRow key={a.id} attempt={a} now={now} onDelete={() => setDeleting(a.id)} />)}
          </div>
        </section>
      )}

      {submitted.length > 0 && (
        <section className="space-y-3">
          <GroupLabel>Submitted</GroupLabel>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {submitted.map(a => <AttemptRow key={a.id} attempt={a} now={now} onDelete={() => setDeleting(a.id)} />)}
          </div>
        </section>
      )}

      <StorageNote signedIn={userId !== null} />

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
