import { useMemo, useState } from 'react'
import { AlertTriangle, ChevronDown, ExternalLink, FolderOpen, Target, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckMark } from '@/components/CheckMark'
import { LiftChart } from './LiftChart'
import {
  COMMON_MISTAKES,
  DOMAINS,
  POST_PROJECT_SUMMARY_URL,
  RUBRIC,
  type Domain,
  type ProjectCase,
} from '@/data/pcpaProjects'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { fileText, usePcpaWorkspace } from '@/hooks/usePcpaWorkspace'
import { formatDuration, type ProjectAttempt } from '@/lib/pcpaAttempt'
import {
  crossCheckAnswers,
  parsePredictions,
  scoreAssessment,
  scoreRubric,
  type AssessmentScore,
  type Rating,
} from '@/lib/pcpaAssessment'
import { generateAssessment, generateCase } from '@/lib/pcpaData'
import { toCsv } from '@/lib/csv'
import { reviewReport, RUBRIC_EVIDENCE } from '@/lib/pcpaReport'
import { cn } from '@/lib/utils'

/**
 * After submission: what the graders would weigh, as far as a simulator can
 * weigh it, and then the answers.
 *
 * The real results take six to eight weeks and arrive as pass/fail from human
 * graders. Here the candidate gets the tools those graders use instead — a
 * model scored on data it never saw, the consistency of their answers with
 * their report, the report read against the published criteria and common
 * mistakes — and rates themselves on the rubric with that evidence beside each
 * criterion. The examiner's notes come last: what was planted in the data and
 * what the generating model really was.
 */

const RATINGS: { value: Rating; label: string }[] = [
  { value: 'met', label: 'Met' },
  { value: 'partial', label: 'Partly' },
  { value: 'not-met', label: 'Not met' },
]

function Section({ title, children, icon }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">{icon}{title}</h2>
      {children}
    </section>
  )
}

function Found({ ok }: { ok: boolean }) {
  return ok
    ? <CheckMark className="h-4 w-4" label="found" />
    : <XCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" aria-label="not found" />
}

export function ResultsView({
  attempt,
  projectCase,
  onOpenWorkspace,
}: {
  attempt: ProjectAttempt
  projectCase: ProjectCase
  onOpenWorkspace: () => void
}) {
  const update = usePcpaAttempts(s => s.update)
  const files = usePcpaWorkspace(s => s.files)
  const write = usePcpaWorkspace(s => s.write)
  const assessment = useMemo(() => generateAssessment(attempt.caseId, attempt.seed), [attempt.caseId, attempt.seed])
  const generated = useMemo(() => generateCase(attempt.caseId, attempt.seed), [attempt.caseId, attempt.seed])
  const assessmentPath = `data/${assessment.table.file}`
  const hasAssessment = Boolean(files[assessmentPath])
  const predictionFiles = Object.keys(files).filter(p => p.startsWith('output/') && p.toLowerCase().endsWith('.csv')).sort()
  const [predictionPath, setPredictionPath] = useState<string>('')
  const [score, setScore] = useState<AssessmentScore | null>(null)
  const [scoreErrors, setScoreErrors] = useState<string[]>([])
  const [notesOpen, setNotesOpen] = useState(false)

  const checks = useMemo(() => reviewReport(attempt.caseId, attempt.report.body, attempt.report.appendices), [attempt])
  const checkById = useMemo(() => new Map(checks.map(c => [c.id, c])), [checks])
  const crossChecks = useMemo(() => crossCheckAnswers(projectCase.questions, attempt.answers, `${attempt.report.body} ${attempt.report.appendices.map(a => {
    const f = files[a.path]
    return `${a.caption} ${f && a.kind === 'table' ? fileText(f) : ''}`
  }).join(' ')}`), [projectCase.questions, attempt, files])
  const rubric = scoreRubric(attempt.ratings)

  function addAssessment() {
    write(assessmentPath, toCsv(assessment.table.columns, assessment.table.rows), { readOnly: true })
  }

  function runScore() {
    const file = files[predictionPath]
    if (!file) return
    const parsed = parsePredictions(fileText(file), assessment)
    const result = scoreAssessment(assessment, parsed.values)
    setScoreErrors(parsed.errors)
    setScore(result)
    if (result) {
      update(attempt.id, { assessment: { gini: result.gini, oracleGini: result.oracleGini, captured: result.captured, balance: result.balance, verdict: result.verdict } })
    }
  }

  const summary = score ?? attempt.assessment
  const idCol = assessment.idColumn

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-6 pb-24">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Results</h1>
        <p className="text-sm text-muted-foreground">
          Submitted {attempt.submittedAt ? new Date(attempt.submittedAt).toLocaleString() : ''}
          {attempt.activeMs > 0 && <> · {formatDuration(attempt.activeMs)} in the workspace (the CAS estimates about 20 hours)</>}.
          The real project is human-scored pass/fail against the rubric, with results six to eight weeks after the window.
          Here you grade yourself — with the evidence a grader would use.
        </p>
      </header>

      <Section title="Your model on the assessment data" icon={<Target className="h-5 w-5 text-muted-foreground" />}>
        <p className="text-sm">
          The rubric asks that the model "performs reasonably well on an assessment data set". This one is{' '}
          {assessment.table.rows.length.toLocaleString('en-US')} rows the model has never seen, drawn from the same process as your data.
        </p>
        {!hasAssessment ? (
          <Button onClick={addAssessment}><FolderOpen className="mr-2 h-4 w-4" /> Add the assessment data to the workspace</Button>
        ) : (
          <Card className="space-y-4 p-4">
            <ol className="list-decimal space-y-1.5 pl-5 text-sm">
              <li>In the workspace, read <span className="font-mono">{assessmentPath}</span>. It has the same columns as your data (without the target), already clean of errors — but with missing values, as live data has.</li>
              <li>Score every row with your final model: the prediction is {assessment.predictionMeaning}.</li>
              <li>Write a CSV with two columns, <span className="font-mono">{idCol}</span> and <span className="font-mono">prediction</span>, to <span className="font-mono">output/</span> — e.g.{' '}
                <span className="font-mono">write.csv(data.frame({idCol} = a${idCol}, prediction = predict(fit, a, type = "response")), "output/predictions.csv", row.names = FALSE)</span>.
              </li>
            </ol>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={predictionPath}
                onChange={e => setPredictionPath(e.target.value)}
                className="h-9 min-w-0 flex-1 rounded-md border border-input bg-background px-2 font-mono text-sm"
                aria-label="Predictions file"
              >
                <option value="">Choose the predictions file…</option>
                {predictionFiles.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <Button size="sm" disabled={!predictionPath} onClick={runScore}>Score</Button>
              <Button size="sm" variant="outline" onClick={onOpenWorkspace}>Open workspace</Button>
            </div>
            {scoreErrors.length > 0 && (
              <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-200">
                {scoreErrors.map(e => <li key={e} className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {e}</li>)}
              </ul>
            )}
            {predictionPath && score === null && scoreErrors.length > 0 && (
              <p className="text-sm text-destructive">Too few predictions matched the assessment rows to score.</p>
            )}
          </Card>
        )}
        {summary && (
          <Card className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Your Gini</p>
                <p className="text-2xl font-bold tabular-nums">{summary.gini.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">True model's Gini</p>
                <p className="text-2xl font-bold tabular-nums text-muted-foreground">{summary.oracleGini.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Segmentation captured</p>
                <p className="text-2xl font-bold tabular-nums">{Math.round(summary.captured * 100)}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Predicted ÷ actual</p>
                <p className="text-2xl font-bold tabular-nums">{summary.balance.toFixed(2)}</p>
              </div>
            </div>
            <p className={cn('text-sm font-medium', summary.verdict === 'weak' ? 'text-red-700 dark:text-red-300' : summary.verdict === 'reasonable' ? 'text-amber-700 dark:text-amber-300' : 'text-green-700 dark:text-green-300')}>
              {summary.verdict === 'strong' ? 'Strong: the model ranks risk nearly as well as the process that made the data.'
                : summary.verdict === 'reasonable' ? 'Reasonable: it finds most of the segmentation there is to find.'
                  : 'Weak: the model misses most of the segmentation in the data.'}
              {Math.abs(summary.balance - 1) > 0.15 && ' Its overall level is off, too — check the offset, the exposure, or a transformation of the target that wasn\'t reversed.'}
            </p>
            {score && <LiftChart lift={score.lift} oracle={score.oracleLift} />}
          </Card>
        )}
      </Section>

      <Section title="Your answers against your report">
        <p className="text-sm text-muted-foreground">A grader compares what you answered at submission with what the report says. A number you gave should be one the report contains.</p>
        <Card className="divide-y divide-border">
          {crossChecks.length === 0 && <p className="p-4 text-sm text-muted-foreground">No numeric answers to compare.</p>}
          {crossChecks.map(c => {
            const q = projectCase.questions.find(x => x.id === c.questionId)!
            const ok = c.absent.length === 0 && c.found.length > 0
            return (
              <div key={c.questionId} className="flex gap-3 p-4 text-sm">
                <Found ok={ok} />
                <div className="min-w-0 space-y-1">
                  <p className="text-muted-foreground">{q.prompt}</p>
                  <p className="font-medium">{c.answer}</p>
                  {c.absent.length > 0 && <p className="text-xs text-red-700 dark:text-red-300">Not in the report: {c.absent.join(', ')}</p>}
                  {c.found.length === 0 && c.absent.length === 0 && <p className="text-xs text-muted-foreground">No number to compare.</p>}
                </div>
              </div>
            )
          })}
        </Card>
      </Section>

      <Section title="Self-assessment against the rubric">
        <p className="text-sm text-muted-foreground">
          The criteria are the CAS's. Beside each is what a quick read of your report found — evidence, not a verdict. Rate each honestly.
        </p>
        {(Object.keys(DOMAINS) as Domain[]).map(domain => (
          <div key={domain} className="space-y-2">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold">{domain}. {DOMAINS[domain].name}</h3>
              <span className="text-xs text-muted-foreground">{Math.round(DOMAINS[domain].projectWeight * 100)}% of the project · {Math.round(rubric.byDomain[domain].score * 100)}%</span>
            </div>
            <Card className="divide-y divide-border">
              {RUBRIC.filter(c => c.domain === domain).map(criterion => {
                const evidence = (RUBRIC_EVIDENCE[criterion.id] ?? []).map(id => checkById.get(id)).filter((c): c is NonNullable<typeof c> => Boolean(c))
                const rating = attempt.ratings[criterion.id]
                return (
                  <div key={criterion.id} className="space-y-2 p-4">
                    <p className="text-sm"><span className="mr-1 text-xs font-semibold text-muted-foreground">{criterion.task}</span> {criterion.text}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {criterion.id === 'b1-performs' ? (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          {attempt.assessment ? <><Found ok={attempt.assessment.verdict !== 'weak'} /> Assessment data: {Math.round(attempt.assessment.captured * 100)}% of the achievable Gini</> : 'Score the assessment data above for evidence.'}
                        </span>
                      ) : evidence.map(e => (
                        <span key={e.id} className="flex items-center gap-1.5 text-xs text-muted-foreground" title={e.found ? '' : e.missing}>
                          <Found ok={e.found} /> {e.label}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-1" role="radiogroup" aria-label={`Rating: ${criterion.text}`}>
                      {RATINGS.map(r => (
                        <button
                          key={r.value}
                          type="button"
                          role="radio"
                          aria-checked={rating === r.value}
                          onClick={() => update(attempt.id, a => ({ ratings: { ...a.ratings, [criterion.id]: r.value } }))}
                          className={cn('rounded-full px-3 py-1 text-xs font-medium transition-colors', rating === r.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground')}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </Card>
          </div>
        ))}
        <Card className="flex flex-wrap items-center gap-4 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Weighted score</p>
            <p className="text-3xl font-bold tabular-nums">{Math.round(rubric.total * 100)}%</p>
          </div>
          <p className="min-w-0 flex-1 text-sm">
            {!rubric.complete ? `Rate all ${RUBRIC.length} criteria for a verdict.`
              : rubric.likelyPass ? 'Likely a pass, on your own ratings: 70% or more overall and no domain below half.'
                : 'Not yet a pass on your own ratings. The CAS publishes no pass mark; this simulator uses 70% overall with no domain below half.'}
          </p>
        </Card>
      </Section>

      <Section title="What the report is missing">
        <p className="text-sm text-muted-foreground">Checked against the mistakes the CAS's post-project summary lists most often.</p>
        {checks.filter(c => !c.found).length === 0 ? (
          <p className="flex items-center gap-2 text-sm"><CheckMark className="h-4 w-4" /> Nothing the checks look for is missing.</p>
        ) : (
          <ul className="space-y-2">
            {checks.filter(c => !c.found).map(c => (
              <li key={c.id} className="flex gap-2 text-sm">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" aria-hidden />
                <span><span className="font-medium">{c.label}.</span> <span className="text-muted-foreground">{c.missing}</span></span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <section className="space-y-3">
        <button
          type="button"
          onClick={() => setNotesOpen(o => !o)}
          aria-expanded={notesOpen}
          className="flex w-full items-center justify-between gap-2 rounded-lg bg-card p-4 text-left shadow-[var(--shadow-card)]"
        >
          <span>
            <span className="block text-lg font-semibold tracking-tight">Examiner's notes</span>
            <span className="block text-sm text-muted-foreground">What was planted in your data, and what the generating model was.</span>
          </span>
          <ChevronDown className={cn('h-5 w-5 shrink-0 transition-transform', notesOpen && 'rotate-180')} />
        </button>
        {notesOpen && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Your sample</h3>
              <dl className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[14rem_1fr]">
                {generated.facts.map(f => (
                  <div key={f.label} className="contents"><dt className="text-muted-foreground">{f.label}</dt><dd>{f.value}</dd></div>
                ))}
              </dl>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">What was in the data</h3>
              <Card className="divide-y divide-border">
                {generated.issues.map(i => (
                  <div key={i.id} className="space-y-1 p-3 text-sm">
                    <p className="flex items-baseline justify-between gap-2">
                      <span className="font-medium">{i.title}</span>
                      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{i.count.toLocaleString('en-US')} · {i.file}</span>
                    </p>
                    <p className="text-muted-foreground">{i.handling}</p>
                  </div>
                ))}
              </Card>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">The true effects</h3>
              <p className="text-xs text-muted-foreground">Multiplicative relativities of the model that generated the data. A fitted GLM lands near these, give or take sampling noise — closer for the large groups, farther for the thin ones.</p>
              <Card className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60 text-left text-xs">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Variable</th>
                      <th className="px-3 py-2 font-semibold">Level</th>
                      <th className="px-3 py-2 text-right font-semibold">Relativity</th>
                      <th className="px-3 py-2 font-semibold">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generated.effects.map((e, i) => (
                      <tr key={i} className="border-t border-border/60 align-top">
                        <td className="px-3 py-1.5">{e.variable}</td>
                        <td className="px-3 py-1.5">{e.level}</td>
                        <td className="px-3 py-1.5 text-right tabular-nums">{e.relativity.toFixed(3)}</td>
                        <td className="px-3 py-1.5 text-xs text-muted-foreground">{e.note ?? ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">What a passing report does on this case</h3>
              <ul className="list-disc space-y-1.5 pl-5 text-sm">
                {projectCase.strongReport.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Common mistakes, from the CAS</h3>
              <ul className="list-disc space-y-1.5 pl-5 text-sm">
                {COMMON_MISTAKES.map(m => <li key={m.text}><span className="text-xs font-semibold text-muted-foreground">{m.domain}</span> {m.text}</li>)}
              </ul>
              <a href={POST_PROJECT_SUMMARY_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">
                PCPA Post-Project Summary <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
