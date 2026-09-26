import { useMemo, useRef, useState } from 'react'
import { AlertTriangle, Download, Loader2, PlayCircle, Send, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckMark } from '@/components/CheckMark'
import { mimeOf, ProjectDialog, toBase64 } from './shared'
import { ReportDocument, reportHtml } from './reportDocument'
import { useWordTally } from './ReportView'
import { APPENDIX_LIMIT, ATTESTATION, type ProjectCase } from '@/data/pcpaProjects'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { fileBytes, fileText, usePcpaWorkspace, type WorkspaceFile } from '@/hooks/usePcpaWorkspace'
import { cleanRun } from '@/hooks/useProjectRuntime'
import { attemptPhase, fileKind, type ProjectAttempt } from '@/lib/pcpaAttempt'
import { countBodyImages, submissionIssues } from '@/lib/pcpaReport'
import type { ConsoleKind, RuntimeLanguage } from '@/lib/project/runtimeTypes'
import { buildZip, downloadBlob } from '@/lib/xlsx'
import { cn } from '@/lib/utils'

/**
 * Submission, as the CAS project portal runs it: the final checklist, the
 * questions asked "at the point of submission about the results of their
 * analysis and information in the summary report", the attestation — and then
 * it is final. The report locks and the code is snapshotted.
 *
 * One step the portal doesn't have and a grader does: "graders may run the code
 * submitted with the project to evaluate whether it produces the outputs
 * included in the summary report." The clean run here does exactly that, in a
 * fresh session holding nothing but the data and the code.
 */

const encoder = new TextEncoder()

export function codeFilesOf(files: Record<string, WorkspaceFile>): string[] {
  return Object.keys(files)
    .filter(p => !p.startsWith('submission/') && (['r', 'python'].includes(fileKind(p)) || p.toLowerCase().endsWith('.sas')))
    .sort()
}

interface CleanRunState {
  status: 'running' | 'done'
  lines: { kind: ConsoleKind; text: string }[]
  ok: boolean
  reproduced: string[]
  missing: string[]
}

export function SubmitView({
  attempt,
  projectCase,
  onSubmitted,
}: {
  attempt: ProjectAttempt
  projectCase: ProjectCase
  onSubmitted: () => void
}) {
  const update = usePcpaAttempts(s => s.update)
  const files = usePcpaWorkspace(s => s.files)
  const write = usePcpaWorkspace(s => s.write)
  const { tally } = useWordTally(attempt)
  const codeFiles = useMemo(() => codeFilesOf(files), [files])
  const [selected, setSelected] = useState<string[] | null>(null)
  const chosen = (selected ?? codeFiles).filter(p => files[p])
  const [confirming, setConfirming] = useState(false)
  const [check, setCheck] = useState<CleanRunState | null>(null)
  const preview = useRef<HTMLDivElement>(null)
  const phase = attemptPhase(attempt, Date.now())

  const unanswered = projectCase.questions.filter(q => q.id !== 'power' && !(attempt.answers[q.id] ?? '').trim()).map(q => q.id)
  const issues = submissionIssues({
    words: tally,
    appendixCount: attempt.report.appendices.length,
    codeFiles: chosen.filter(p => fileKind(p) === 'r' || fileKind(p) === 'python'),
    bodyImages: countBodyImages(attempt.report.body),
    attested: attempt.attested,
    unanswered,
  })
  const fatal = issues.filter(i => i.fatal)

  const checklist = [
    { label: `Report within ${tally.limit.toLocaleString('en-US')} words, appendices included`, ok: !tally.over && tally.body >= 150, detail: `${tally.total.toLocaleString('en-US')} words` },
    { label: `No more than ${APPENDIX_LIMIT} tables or graphics`, ok: attempt.report.appendices.length <= APPENDIX_LIMIT, detail: `${attempt.report.appendices.length} attached` },
    { label: 'Code included', ok: chosen.length > 0, detail: chosen.length ? `${chosen.length} file${chosen.length === 1 ? '' : 's'}` : 'none selected' },
    { label: 'Submission questions answered', ok: unanswered.length === 0, detail: unanswered.length ? `${unanswered.length} left` : 'all answered' },
    { label: 'Attestation confirmed', ok: attempt.attested, detail: attempt.attested ? 'confirmed' : 'not yet' },
  ]

  async function runCheck() {
    const scripts = chosen.filter(p => fileKind(p) === 'r' || fileKind(p) === 'python')
    if (scripts.length === 0) return
    const lines: CleanRunState['lines'] = []
    setCheck({ status: 'running', lines, ok: false, reproduced: [], missing: [] })
    const push = (line: { kind: ConsoleKind; text: string }) => {
      lines.push(line)
      setCheck(c => (c ? { ...c, lines: [...lines] } : c))
    }
    await usePcpaWorkspace.getState().flush()
    const data = Object.values(files).filter(f => f.readOnly).map(f => ({ path: f.path, data: fileBytes(f) }))
    let ok = true
    const outputs = new Set<string>()
    for (const language of ['r', 'python'] as RuntimeLanguage[]) {
      const mine = scripts.filter(p => fileKind(p) === language)
      if (mine.length === 0) continue
      push({ kind: 'info', text: `Fresh ${language === 'r' ? 'R' : 'Python'} session with the data and ${mine.length} script${mine.length === 1 ? '' : 's'}…` })
      try {
        const result = await cleanRun(
          language,
          [...data, ...chosen.map(p => ({ path: p, data: fileBytes(files[p]) }))],
          mine.map(p => ({ path: p, code: fileText(files[p]) })),
          push,
        )
        if (!result.ok) ok = false
        for (const o of result.outputs) outputs.add(o)
      } catch (e) {
        ok = false
        push({ kind: 'error', text: e instanceof Error ? e.message : String(e) })
      }
    }
    const appendixPaths = attempt.report.appendices.map(a => a.path)
    setCheck({
      status: 'done',
      lines: [...lines],
      ok,
      reproduced: appendixPaths.filter(p => outputs.has(p)),
      missing: appendixPaths.filter(p => !outputs.has(p)),
    })
  }

  function submit() {
    const now = Date.now()
    for (const p of chosen) write(`submission/${p}`, fileBytes(files[p]), { readOnly: true })
    update(attempt.id, { submittedAt: now, submittedCode: chosen })
    void usePcpaWorkspace.getState().flush()
    setConfirming(false)
    onSubmitted()
  }

  function downloadPackage() {
    // Images in the package are embedded, so the report opens anywhere.
    const doc = new DOMParser().parseFromString(preview.current?.innerHTML ?? '', 'text/html')
    doc.querySelectorAll('img[data-appendix-path]').forEach(img => {
      const path = img.getAttribute('data-appendix-path') ?? ''
      const file = files[path]
      if (file) img.setAttribute('src', `data:${mimeOf(path)};base64,${toBase64(fileBytes(file))}`)
    })
    const embedded = doc.body.innerHTML
    const entries = [
      { name: 'report.html', data: encoder.encode(reportHtml(`${projectCase.title} — technical report`, embedded)) },
      { name: 'report.md', data: encoder.encode(attempt.report.body) },
      ...attempt.report.appendices.filter(a => files[a.path]).map((a, i) => ({ name: `appendices/${i + 1}-${a.path.split('/').pop()}`, data: fileBytes(files[a.path]) })),
      ...chosen.map(p => ({ name: p, data: fileBytes(files[p]) })),
      {
        name: 'answers.txt',
        data: encoder.encode(projectCase.questions.map(q => `${q.prompt}\n${attempt.answers[q.id] ?? ''}\n`).join('\n')),
      },
      {
        name: 'attestation.txt',
        data: encoder.encode(`${attempt.attested ? 'Confirmed' : 'NOT confirmed'}${attempt.submittedAt ? ` on ${new Date(attempt.submittedAt).toISOString()}` : ''}:\n\n${ATTESTATION.map(a => `- ${a}`).join('\n')}\n`),
      },
    ]
    downloadBlob(`pcpa-project-${projectCase.id}.zip`, new Blob([buildZip(entries, new Date()).slice().buffer as ArrayBuffer], { type: 'application/zip' }))
  }

  const locked = phase !== 'open'

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-6 pb-24">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Submit</h1>
        <p className="text-sm text-muted-foreground">
          {phase === 'submitted' ? `Submitted ${new Date(attempt.submittedAt!).toLocaleString()}. Submissions are final.`
            : phase === 'closed' ? 'The window has closed. A project can no longer be submitted after its deadline.'
              : 'Everything below is checked before the portal will accept the submission. Once submitted, the report and code are final.'}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Final checklist</h2>
        <Card className="divide-y divide-border">
          {checklist.map(item => (
            <div key={item.label} className="flex items-center gap-3 px-4 py-2.5 text-sm">
              {item.ok ? <CheckMark className="h-5 w-5" /> : <XCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden />}
              <span className="flex-1">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.detail}</span>
            </div>
          ))}
        </Card>
        {issues.filter(i => !i.fatal).map(i => (
          <p key={i.id} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-200"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {i.message}</p>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Code</h2>
        {codeFiles.length === 0 ? (
          <p className="text-sm text-muted-foreground">No R or Python files in the project.</p>
        ) : (
          <Card className="divide-y divide-border">
            {codeFiles.map(p => (
              <label key={p} className="flex cursor-pointer items-center gap-3 px-4 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={chosen.includes(p)}
                  disabled={locked}
                  onChange={e => setSelected(e.target.checked ? [...chosen, p] : chosen.filter(x => x !== p))}
                  className="h-4 w-4 accent-current"
                />
                <span className="flex-1 font-mono">{p}</span>
                <span className="text-xs text-muted-foreground">{fileText(files[p]).split('\n').length} lines</span>
              </label>
            ))}
          </Card>
        )}
        <Card className="space-y-3 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Clean run</p>
              <p className="text-xs text-muted-foreground">Runs the selected scripts in a fresh session with only the data — as a grader would — and checks they rebuild your appendices.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => void runCheck()} disabled={check?.status === 'running' || chosen.length === 0}>
              {check?.status === 'running' ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <PlayCircle className="mr-1.5 h-4 w-4" />}
              {check?.status === 'running' ? 'Running…' : 'Run check'}
            </Button>
          </div>
          {check && (
            <>
              {check.status === 'done' && (
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    {check.ok ? <CheckMark className="h-4 w-4" /> : <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />}
                    {check.ok ? 'Every script ran to the end without an error.' : 'A script stopped with an error — a grader running it would see the same.'}
                  </p>
                  {check.reproduced.length > 0 && <p className="text-xs text-muted-foreground">Rebuilt: {check.reproduced.join(', ')}</p>}
                  {check.missing.length > 0 && (
                    <p className="text-xs text-amber-800 dark:text-amber-200">Not produced by the code: {check.missing.join(', ')}. An appendix should be something your submitted code creates.</p>
                  )}
                </div>
              )}
              <pre className="max-h-56 overflow-auto rounded-lg bg-muted p-3 font-mono text-xs">
                {check.lines.map((l, i) => (
                  <div key={i} className={cn(l.kind === 'error' && 'text-red-700 dark:text-red-300', l.kind === 'info' && 'italic text-muted-foreground')}>{l.text}</div>
                ))}
              </pre>
            </>
          )}
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Questions about your analysis</h2>
        <p className="text-sm text-muted-foreground">Answer from your final model. Your answers are compared with your report.</p>
        <div className="space-y-4">
          {projectCase.questions.map((q, i) => {
            const value = attempt.answers[q.id] ?? ''
            const set = (v: string) => update(attempt.id, a => ({ answers: { ...a.answers, [q.id]: v } }))
            return (
              <div key={q.id} className="space-y-2">
                <p className="text-sm font-medium">{i + 1}. {q.prompt}{q.id === 'power' && <span className="font-normal text-muted-foreground"> (optional)</span>}</p>
                {q.kind === 'choice' ? (
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={q.prompt}>
                    {q.options!.map(o => (
                      <button
                        key={o}
                        type="button"
                        role="radio"
                        aria-checked={value === o}
                        disabled={locked}
                        onClick={() => set(o)}
                        className={cn('rounded-full px-3 py-1.5 text-sm transition-colors', value === o ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent')}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                ) : q.kind === 'number' ? (
                  <Input value={value} disabled={locked} inputMode="decimal" onChange={e => set(e.target.value)} className="max-w-xs" aria-label={q.prompt} />
                ) : (
                  <textarea
                    value={value}
                    disabled={locked}
                    onChange={e => set(e.target.value)}
                    rows={2}
                    aria-label={q.prompt}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Attestation</h2>
        <Card className="space-y-3 p-4">
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            {ATTESTATION.map(a => <li key={a}>{a}</li>)}
          </ul>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={attempt.attested} disabled={locked} onChange={e => update(attempt.id, { attested: e.target.checked })} className="h-4 w-4" />
            I attest that the statements above are true of this submission.
          </label>
        </Card>
      </section>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        {phase === 'open' && (
          <Button onClick={() => setConfirming(true)} disabled={fatal.length > 0}>
            <Send className="mr-2 h-4 w-4" /> Submit project
          </Button>
        )}
        <Button variant="outline" onClick={downloadPackage}>
          <Download className="mr-2 h-4 w-4" /> Download package (.zip)
        </Button>
        {phase === 'open' && fatal.length > 0 && (
          <ul className="w-full space-y-1 text-sm text-red-700 dark:text-red-300">
            {fatal.map(i => <li key={i.id}>{i.message}</li>)}
          </ul>
        )}
      </div>

      {/* The rendered report, off screen: the source of the package's report.html. */}
      <div className="sr-only" aria-hidden>
        <ReportDocument ref={preview} body={attempt.report.body} appendices={attempt.report.appendices} files={files} />
      </div>

      {confirming && (
        <ProjectDialog
          title="Submit your project?"
          onClose={() => setConfirming(false)}
          footer={<>
            <Button variant="outline" size="sm" onClick={() => setConfirming(false)}>Keep working</Button>
            <Button size="sm" onClick={submit}>Submit</Button>
          </>}
        >
          <p className="text-sm text-muted-foreground">
            Submissions are final: the report locks and your code is saved as submitted. The CAS releases project
            results 6–8 weeks after the window closes; here, the results page opens now with the grading tools.
          </p>
        </ProjectDialog>
      )}
    </div>
  )
}
