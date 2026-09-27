import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ExternalLink, PenLine, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { WINDOW_DAYS, type ProjectCase } from '@/data/pcpaProjects'
import { PROJECT_PROGRAMMES, type ProjectProgramme } from '@/data/projects'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { examAccentStyle } from '@/lib/examColors'
import { attemptRoute, type AttemptMode, type Language, type ProjectAttempt } from '@/lib/pcpaAttempt'
import { wikiRoute } from '@/lib/wikiRoutes'
import { BriefTile } from './BriefTile'
import { ChoiceCards, Pill, ProjectDialog } from './shared'

/**
 * Starting a project, from the Projects tab's **+** button: one sheet, two
 * steps (`docs/pcpa-project.md`).
 *
 * 1. **Which brief.** Every brief the app has, grouped under the exam it is a
 *    project for, with that exam's published rules above them. Each group
 *    wears its exam's colour (`lib/examColors.ts`) — the logo, the brief tiles
 *    and the hover wash — so a brief is recognisably that exam's project. A
 *    brief is chosen, not assigned: the real PCPA project hands each candidate
 *    one case from a pool, but someone *practising* for it wants the case that
 *    exercises what they are weak at.
 * 2. **How to work it.** Only what changes the attempt:
 *    - the mode — a rehearsal is the real conditions (the window, and feedback
 *      held back until submission); practice has no deadline and checks the
 *      report as it is written. The window follows from this rather than being
 *      asked on its own: nobody wants a deadline for its own sake;
 *    - the language, which writes the starter script;
 *    - the data, only for a brief attempted before: a fresh draw, or the same
 *      sample again to redo the analysis and compare.
 *
 * Both steps are one dialog rather than a dialog opening a dialog, so Back is a
 * step and not a second scrim.
 */

/** `Sep 15 – 30`, or `Dec 16 – Jan 2` across a month end. */
function formatSpan(from: Date, to: Date) {
  const day = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return from.getMonth() === to.getMonth() ? `${day(from)} – ${to.getDate()}` : `${day(from)} – ${day(to)}`
}

function BriefOption({ brief, attempts, onSelect }: { brief: ProjectCase; attempts: ProjectAttempt[]; onSelect: () => void }) {
  const submitted = attempts.some(a => a.submittedAt !== null)
  const inProgress = attempts.some(a => a.submittedAt === null)
  const files = brief.dictionary.length
  return (
    <button
      type="button"
      onClick={onSelect}
      data-sound="select"
      className="group flex w-full items-start gap-3 rounded-xl border border-border bg-card p-3 text-left transition-colors hover:border-[var(--exam-accent-muted)] hover:bg-[var(--exam-accent-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--exam-accent)]"
    >
      <BriefTile caseId={brief.id} size="md" className="mt-0.5" />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">{brief.title}</span>
          {submitted && <CheckMark className="h-4 w-4 shrink-0 text-emerald-500" label="Submitted" />}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{brief.company}</span>
        <span className="mt-2 flex flex-wrap gap-1.5">
          <Pill>{brief.line}</Pill>
          <Pill>{files === 1 ? '1 data set' : `${files} data sets`}</Pill>
          {inProgress && <Pill tone="info">In progress</Pill>}
        </span>
      </span>
      <ChevronRight className="mt-2.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
    </button>
  )
}

function ProgrammeGroup({
  programme,
  attempts,
  onSelect,
}: {
  programme: ProjectProgramme
  attempts: ProjectAttempt[]
  onSelect: (brief: ProjectCase) => void
}) {
  const next = programme.nextWindow?.(new Date())
  return (
    <section style={examAccentStyle(programme.examKey)} className="space-y-3" aria-label={`${programme.label} projects`}>
      <div className="flex items-center gap-3">
        <ExamLogo examKey={programme.examKey} size="md" />
        <div className="min-w-0 flex-1">
          {/* The way into the exam's own page, as the Study Guides track heading is. */}
          <Link
            to={wikiRoute({ kind: 'exam', name: programme.examPage })}
            className="block text-sm font-semibold underline-offset-4 hover:underline"
          >
            {programme.label}
          </Link>
          <p className="truncate text-xs text-muted-foreground">{programme.name}</p>
        </div>
        <a
          href={programme.source.url}
          target="_blank"
          rel="noreferrer"
          title={programme.source.label}
          className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Source <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {programme.facts.map(f => <Pill key={f}>{f}</Pill>)}
        {next && <Pill tone="info">Next real window {formatSpan(next.opens, next.closes)}</Pill>}
      </div>
      <div className="space-y-2">
        {programme.briefs.map(brief => (
          <BriefOption
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

type DataChoice = 'fresh' | 'same'

function StartFields({
  projectCase,
  previous,
  mode,
  setMode,
  language,
  setLanguage,
  data,
  setData,
}: {
  projectCase: ProjectCase
  previous?: ProjectAttempt
  mode: AttemptMode
  setMode: (m: AttemptMode) => void
  language: Language
  setLanguage: (l: Language) => void
  data: DataChoice
  setData: (d: DataChoice) => void
}) {
  return (
    <>
      <div className="-mt-2 flex items-center gap-3">
        <BriefTile caseId={projectCase.id} size="md" />
        <p className="min-w-0 text-sm text-muted-foreground">{projectCase.company} · {projectCase.line}</p>
      </div>

      <ChoiceCards<AttemptMode>
        label="How to work it"
        value={mode}
        onChange={setMode}
        choices={[
          { value: 'rehearsal', label: 'Rehearsal', icon: <Timer className="h-4 w-4" />, detail: `The real conditions: ${WINDOW_DAYS} days from now, and feedback once you submit.` },
          { value: 'practice', label: 'Practice', icon: <PenLine className="h-4 w-4" />, detail: 'No deadline, and your report is checked as you write it.' },
        ]}
      />

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <p className="flex-1 text-sm font-medium">Language</p>
          <SegmentedControl<Language>
            size="sm"
            label="Language"
            value={language}
            onChange={setLanguage}
            options={[{ value: 'r', label: 'R' }, { value: 'python', label: 'Python' }]}
            className="w-44"
          />
        </div>
        {previous && (
          <div className="flex items-center gap-3">
            <p className="flex-1 text-sm font-medium">Data</p>
            <SegmentedControl<DataChoice>
              size="sm"
              label="Data"
              value={data}
              onChange={setData}
              options={[
                { value: 'fresh', label: 'New draw' },
                { value: 'same', label: 'Same as last', ariaLabel: `Same data as your attempt of ${new Date(previous.startedAt).toLocaleDateString()}` },
              ]}
              className="w-56"
            />
          </div>
        )}
      </div>
    </>
  )
}

export function NewProjectDialog({
  attempts,
  owner,
  onClose,
}: {
  /** The reader's attempts, newest first — which briefs are under way, and whose data can be drawn again. */
  attempts: ProjectAttempt[]
  /** The signed-in account the attempt is saved to; undefined keeps it in this browser. */
  owner?: string
  onClose: () => void
}) {
  const create = usePcpaAttempts(s => s.create)
  const navigate = useNavigate()
  const [brief, setBrief] = useState<ProjectCase | null>(null)
  const [mode, setMode] = useState<AttemptMode>('rehearsal')
  const [language, setLanguage] = useState<Language>(attempts[0]?.language ?? 'r')
  const [data, setData] = useState<DataChoice>('fresh')

  // Attempts are kept newest first, so the first match is the latest.
  const previous = brief ? attempts.find(a => a.caseId === brief.id) : undefined

  function choose(next: ProjectCase) {
    setBrief(next)
    setData('fresh')
  }

  function start() {
    if (!brief) return
    const attempt = create({
      caseId: brief.id,
      mode,
      language,
      seed: previous && data === 'same' ? previous.seed : undefined,
      owner,
    })
    onClose()
    navigate(attemptRoute(attempt.id))
  }

  if (!brief) {
    return (
      <ProjectDialog title="New project" wide onClose={onClose}>
        {PROJECT_PROGRAMMES.map(p => (
          <ProgrammeGroup key={p.id} programme={p} attempts={attempts} onSelect={choose} />
        ))}
      </ProjectDialog>
    )
  }

  return (
    <ProjectDialog
      title={brief.title}
      wide
      onClose={onClose}
      footer={<>
        <Button variant="ghost" size="sm" className="mr-auto gap-1 pl-2" onClick={() => setBrief(null)}>
          <ChevronLeft className="h-4 w-4" aria-hidden /> All projects
        </Button>
        <Button size="sm" onClick={start}>Start project</Button>
      </>}
    >
      <StartFields
        projectCase={brief}
        previous={previous}
        mode={mode}
        setMode={setMode}
        language={language}
        setLanguage={setLanguage}
        data={data}
        setData={setData}
      />
    </ProjectDialog>
  )
}
