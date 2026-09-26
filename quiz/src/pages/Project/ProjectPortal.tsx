import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FlaskConical, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { ProjectDialog } from '@/components/project/shared'
import { ProjectTopBar, WindowPill } from '@/components/project/ProjectTopBar'
import {
  APPENDIX_LIMIT,
  CANDIDATE_AGREEMENT,
  CONTENT_OUTLINE_URL,
  ESTIMATED_HOURS,
  PROJECT_CASES,
  PROJECT_WINDOWS,
  WINDOW_DAYS,
  WORD_LIMIT,
  projectCase as findCase,
} from '@/data/pcpaProjects'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { drawCase, nextRealWindow, type Language, type Timing } from '@/lib/pcpaAttempt'
import { wikiRoute } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'

/**
 * The PCPA project's front door: what the project is, when the real windows
 * run, the candidate's attempts, and the one action — start a project. Like
 * the real one, a new attempt is *assigned* a case from the pool rather than
 * choosing one, and opens on the candidate agreement.
 */

const PCPA_EXAM_PAGE = wikiRoute({ kind: 'exam', name: 'Exam PCPA (CAS)' })

const FACTS = [
  { label: 'Window', value: `${WINDOW_DAYS} days` },
  { label: 'Report', value: `≤ ${WORD_LIMIT.toLocaleString('en-US')} words, appendices included` },
  { label: 'Appendices', value: `≤ ${APPENDIX_LIMIT} tables or graphics` },
  { label: 'Code', value: 'R, Python or SAS — submitted, not scored' },
  { label: 'Effort', value: `about ${ESTIMATED_HOURS} hours (CAS estimate)` },
  { label: 'Grading', value: 'pass/fail against a published rubric' },
]

function formatDay(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

export default function ProjectPortal() {
  const attempts = usePcpaAttempts(s => s.attempts)
  const create = usePcpaAttempts(s => s.create)
  const remove = usePcpaAttempts(s => s.remove)
  const navigate = useNavigate()
  const [starting, setStarting] = useState(false)
  const [timing, setTiming] = useState<Timing>('window')
  const [language, setLanguage] = useState<Language>('r')
  const [agreed, setAgreed] = useState<boolean[]>(CANDIDATE_AGREEMENT.map(() => false))
  const [deleting, setDeleting] = useState<string | null>(null)
  const [now, setNow] = useState(() => Date.now())
  const next = nextRealWindow(new Date(now))

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  function start() {
    const caseId = drawCase(attempts.map(a => a.caseId), Math.random())
    const attempt = create({ caseId, timing, language })
    setStarting(false)
    navigate(`/project/pcpa/${attempt.id}`)
  }

  return (
    <div className="min-h-[100dvh]">
      <ProjectTopBar backTo={PCPA_EXAM_PAGE} backLabel="Back to the PCPA study guide" title="PCPA Project" subtitle="Property & Casualty Predictive Analytics" />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-8 pb-24">
        <section className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">The PCPA project, start to finish</h1>
          <p className="text-sm text-muted-foreground">
            A business problem, its data and a deadline. Explore and clean the data, build and validate a GLM in R or
            Python, write a technical report for a non-technical audience, and submit it with your code — in a
            workspace that runs R, Python and a spreadsheet in this browser. Each attempt draws its own data, so
            there is always a new one to try.
          </p>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {FACTS.map(f => (
              <div key={f.label} className="rounded-lg bg-card p-3 shadow-[var(--shadow-card)]">
                <dt className="text-xs text-muted-foreground">{f.label}</dt>
                <dd className="mt-0.5 text-sm font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
          <Button size="lg" onClick={() => { setAgreed(CANDIDATE_AGREEMENT.map(() => false)); setStarting(true) }}>
            <FlaskConical className="mr-2 h-5 w-5" /> Start a project
          </Button>
        </section>

        {attempts.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">Your attempts</h2>
            <div className="space-y-2">
              {attempts.map(a => {
                const c = findCase(a.caseId)
                return (
                  <Card key={a.id} className="flex flex-wrap items-center gap-3 p-4">
                    <Link to={`/project/pcpa/${a.id}${a.submittedAt ? '?view=results' : ''}`} className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{c?.title ?? a.caseId}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {c?.company} · started {new Date(a.startedAt).toLocaleDateString()} · {a.language === 'r' ? 'R' : 'Python'}
                      </p>
                    </Link>
                    <WindowPill attempt={a} now={now} />
                    <button type="button" aria-label="Delete attempt" onClick={() => setDeleting(a.id)} className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </Card>
                )
              })}
            </div>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">The real windows</h2>
          <p className="text-sm text-muted-foreground">
            Four a year. You register after passing the exam; the materials arrive in the project portal when the
            window opens. The next one runs {formatDay(next.opens)} – {formatDay(next.closes)}, {next.closes.getFullYear()}.
          </p>
          <Card className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left text-xs">
                <tr>
                  <th className="px-3 py-2 font-semibold">Pass the exam by</th>
                  <th className="px-3 py-2 font-semibold">Register by</th>
                  <th className="px-3 py-2 font-semibold">Window</th>
                  <th className="px-3 py-2 font-semibold">Results</th>
                </tr>
              </thead>
              <tbody>
                {PROJECT_WINDOWS.map(w => {
                  const isNext = formatDay(next.opens) === w.opens
                  return (
                    <tr key={w.opens} className={cn('border-t border-border/60', isNext && 'font-medium')}>
                      <td className="px-3 py-2">{w.examDeadline}</td>
                      <td className="px-3 py-2">{w.registrationDeadline}</td>
                      <td className="px-3 py-2">{w.opens} – {w.submissionDeadline}{isNext && <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">next</span>}</td>
                      <td className="px-3 py-2">{w.results}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Card>
          <a href={CONTENT_OUTLINE_URL} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
            Source: CAS PCPA Content Outline (v.8)
          </a>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">What's simulated</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            <li>A case drawn from a pool of {PROJECT_CASES.length}, each built to the CAS's framework: a business problem, stakeholder notes, scope, data, submission guidelines.</li>
            <li>Data drawn fresh for every attempt from a known model, with the problems real data has — errors, outliers, gaps, thin classes, collinear and leaking variables.</li>
            <li>R (webR) and Python (Pyodide with pandas, statsmodels and scikit-learn) running in the browser, and a spreadsheet — no installs. The first start of each downloads it (tens of MB), once.</li>
            <li>The {WINDOW_DAYS}-day window and the {WORD_LIMIT.toLocaleString('en-US')}-word and {APPENDIX_LIMIT}-appendix limits, enforced as the CAS enforces them.</li>
            <li>Submission with questions and an attestation, then grading tools: an assessment data set, a clean run of your code, the rubric, and the examiner's notes.</li>
          </ul>
          <p className="text-xs text-muted-foreground">Attempts and their files are saved in this browser, on this device.</p>
        </section>
      </div>

      {starting && (
        <ProjectDialog
          title="Start a project"
          wide
          onClose={() => setStarting(false)}
          footer={<>
            <Button variant="outline" size="sm" onClick={() => setStarting(false)}>Cancel</Button>
            <Button size="sm" disabled={!agreed.every(Boolean)} onClick={start}>Open the window</Button>
          </>}
        >
          <div className="space-y-2">
            <p className="text-sm font-medium">Timing</p>
            <SegmentedControl<Timing>
              size="sm"
              label="Timing"
              value={timing}
              onChange={setTiming}
              options={[{ value: 'window', label: `${WINDOW_DAYS}-day window` }, { value: 'untimed', label: 'Untimed' }]}
            />
            <p className="text-xs text-muted-foreground">
              {timing === 'window' ? 'The clock starts now; submission closes at the end of the last day, as on the real project.' : 'No deadline — for working through the project a piece at a time.'}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Language</p>
            <SegmentedControl<Language>
              size="sm"
              label="Language"
              value={language}
              onChange={setLanguage}
              options={[{ value: 'r', label: 'R' }, { value: 'python', label: 'Python' }]}
            />
            <p className="text-xs text-muted-foreground">Sets your starter script. Both are available in the workspace either way.</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Candidate agreement</p>
            {CANDIDATE_AGREEMENT.map((text, i) => (
              <label key={text} className="flex cursor-pointer items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0"
                  checked={agreed[i]}
                  onChange={e => setAgreed(a => a.map((v, j) => (j === i ? e.target.checked : v)))}
                />
                {text}
              </label>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">The case is assigned from the pool — like the real project, you don't choose it.</p>
        </ProjectDialog>
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
