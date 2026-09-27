import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckMark } from '@/components/CheckMark'
import { BriefTile } from '@/components/project/BriefTile'
import { ProjectDialog } from '@/components/project/shared'
import { StartProjectDialog } from '@/components/project/StartProjectDialog'
import { WindowPill } from '@/components/project/ProjectTopBar'
import { projectCase as findCase, type ProjectCase } from '@/data/pcpaProjects'
import { PROJECT_PROGRAMMES, type ProjectProgramme } from '@/data/projects'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { attemptRoute, type ProjectAttempt } from '@/lib/pcpaAttempt'
import { wikiRoute } from '@/lib/wikiRoutes'

/**
 * The **Projects** tab: every brief the app has, grouped by the exam it is a
 * project for, and the candidate's attempts at them (`docs/pcpa-project.md`).
 *
 * A brief is chosen, not assigned. The real PCPA project hands each candidate
 * one case from a pool, but a candidate *practising* for it wants the one
 * that exercises what they are weak at — so every brief is a card, and the
 * card opens the start sheet (`StartProjectDialog`) for that brief.
 *
 * Attempts sit either side of the briefs: the ones still open above them,
 * because resuming is the likeliest reason to be here, and the submitted ones
 * below, where their results are kept.
 */

/** `Sep 15 – 30`, or `Dec 16 – Jan 2` across a month end. */
function formatSpan(from: Date, to: Date) {
  const day = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return from.getMonth() === to.getMonth() ? `${day(from)} – ${to.getDate()}` : `${day(from)} – ${day(to)}`
}

/** The one-line heading every group on the page carries — the Study Guides track heading's type. */
function GroupLabel({ children }: { children: ReactNode }) {
  return <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</h2>
}

function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'info' }) {
  return (
    <span className={tone === 'info'
      ? 'inline-flex items-center rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400'
      : 'inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground'}
    >
      {children}
    </span>
  )
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

function BriefCard({ brief, attempts, onSelect }: { brief: ProjectCase; attempts: ProjectAttempt[]; onSelect: () => void }) {
  const submitted = attempts.some(a => a.submittedAt !== null)
  const inProgress = attempts.some(a => a.submittedAt === null)
  const files = brief.dictionary.length
  return (
    <button type="button" onClick={onSelect} className="w-full appearance-none bg-transparent p-0 text-left">
      <Card className="transition-all duration-150 hover:bg-accent/30">
        <CardHeader className="flex-row items-start gap-3 space-y-0 p-4">
          <BriefTile caseId={brief.id} className="mt-0.5" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base leading-snug">{brief.title}</CardTitle>
              {submitted && <CheckMark className="h-4 w-4 shrink-0 text-emerald-500" label="Submitted" />}
            </div>
            <CardDescription className="mt-0.5">{brief.company}</CardDescription>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Pill>{brief.line}</Pill>
              <Pill>{files === 1 ? '1 data set' : `${files} data sets`}</Pill>
              {inProgress && <Pill tone="info">In progress</Pill>}
            </div>
          </div>
        </CardHeader>
      </Card>
    </button>
  )
}

function ProgrammeSection({
  programme,
  attempts,
  now,
  onSelect,
}: {
  programme: ProjectProgramme
  attempts: ProjectAttempt[]
  now: number
  onSelect: (brief: ProjectCase) => void
}) {
  const next = programme.nextWindow?.(new Date(now))
  return (
    <section className="space-y-3">
      {/* The Study Guides track heading, to the letter, and like it the way
          into the exam's own page. */}
      <GroupLabel>
        <Link to={wikiRoute({ kind: 'exam', name: programme.examPage })} className="underline-offset-4 transition-colors hover:text-foreground hover:underline">
          {programme.label} | {programme.name}
        </Link>
      </GroupLabel>
      <div className="flex flex-wrap items-center gap-1.5">
        {programme.facts.map(f => <Pill key={f}>{f}</Pill>)}
        {next && (
          <Pill tone="info">
            Next real window {formatSpan(next.opens, next.closes)}
          </Pill>
        )}
        <a
          href={programme.source.url}
          target="_blank"
          rel="noreferrer"
          title={programme.source.label}
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Source <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </div>
      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
        {programme.briefs.map(brief => (
          <BriefCard
            key={brief.id}
            brief={brief}
            attempts={attempts.filter(a => a.caseId === brief.id)}
            onSelect={() => onSelect(brief)}
          />
        ))}
      </div>
    </section>
  )
}

export default function ProjectsHome() {
  const attempts = usePcpaAttempts(s => s.attempts)
  const remove = usePcpaAttempts(s => s.remove)
  const [starting, setStarting] = useState<ProjectCase | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  const open = useMemo(() => attempts.filter(a => a.submittedAt === null), [attempts])
  const submitted = useMemo(
    () => attempts.filter(a => a.submittedAt !== null).sort((a, b) => (b.submittedAt ?? 0) - (a.submittedAt ?? 0)),
    [attempts],
  )

  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 pb-24 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight">Projects</h1>

      {open.length > 0 && (
        <section className="space-y-3">
          <GroupLabel>Continue</GroupLabel>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {open.map(a => <AttemptRow key={a.id} attempt={a} now={now} onDelete={() => setDeleting(a.id)} />)}
          </div>
        </section>
      )}

      {PROJECT_PROGRAMMES.map(p => (
        <ProgrammeSection key={p.id} programme={p} attempts={attempts} now={now} onSelect={setStarting} />
      ))}

      {submitted.length > 0 && (
        <section className="space-y-3">
          <GroupLabel>Submitted</GroupLabel>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {submitted.map(a => <AttemptRow key={a.id} attempt={a} now={now} onDelete={() => setDeleting(a.id)} />)}
          </div>
        </section>
      )}

      <p className="text-xs text-muted-foreground">Attempts and their files are saved in this browser, on this device.</p>

      {starting && (
        <StartProjectDialog
          projectCase={starting}
          // Attempts are kept newest first, so the first match is the latest.
          previous={attempts.find(a => a.caseId === starting.id)}
          defaultLanguage={attempts[0]?.language ?? 'r'}
          onClose={() => setStarting(null)}
        />
      )}

      {deleting && (
        <ProjectDialog
          title="Delete this attempt?"
          onClose={() => setDeleting(null)}
          footer={<>
            <Button variant="outline" size="sm" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={() => { void remove(deleting); setDeleting(null) }}>Delete</Button>
          </>}
        >
          <p className="text-sm text-muted-foreground">Its report, code and output files are removed from this browser. This can't be undone.</p>
        </ProjectDialog>
      )}
    </div>
  )
}
