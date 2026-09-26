import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, Eye, FileImage, ListTree, Paperclip, PenLine, Printer, Table2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { CodeEditor } from './CodeEditor'
import { ProjectDialog } from './shared'
import { ReportDocument } from './reportDocument'
import { reportHtml } from './projectFiles'
import { APPENDIX_LIMIT, type ProjectCase } from '@/data/pcpaProjects'
import { usePcpaAttempts } from '@/hooks/usePcpaAttempts'
import { usePcpaWorkspace } from '@/hooks/usePcpaWorkspace'
import { useIsMobile } from '@/hooks/useIsMobile'
import { appendixKind, countBodyImages, type Appendix } from '@/lib/pcpaReport'
import { useWordTally } from './useWordTally'
import type { ProjectAttempt } from '@/lib/pcpaAttempt'
import { cn } from '@/lib/utils'

/**
 * The technical report: Markdown on the left, the report as it will read on
 * the right, and above both the one number that can fail a submission on its
 * own — words, *inclusive of appendices*, against the 1,250 limit.
 *
 * Appendices are files the code produced (`output/*.png`, `output/*.csv`),
 * attached with a caption. A table's cells count as words, the way they would
 * in the document a grader receives.
 */

function outline(projectCase: ProjectCase): string {
  return [
    `# ${projectCase.title}: technical report`,
    '',
    '## Summary for the decision-makers',
    '',
    '## Data',
    '',
    '## Model',
    '',
    '## Validation',
    '',
    '## Results',
    '',
    '## Recommendation and limitations',
    '',
  ].join('\n')
}


export function WordCounter({ attempt, className }: { attempt: ProjectAttempt; className?: string }) {
  const { tally } = useWordTally(attempt)
  const near = tally.total > tally.limit * 0.92
  return (
    <div className={cn('flex items-baseline gap-2 text-sm', className)} aria-live="polite">
      <span className={cn('font-semibold tabular-nums', tally.over ? 'text-red-700 dark:text-red-300' : near ? 'text-amber-700 dark:text-amber-300' : '')}>
        {tally.total.toLocaleString('en-US')} / {tally.limit.toLocaleString('en-US')} words
      </span>
      <span className="text-xs text-muted-foreground">
        body {tally.body.toLocaleString('en-US')} · appendices {tally.appendices.toLocaleString('en-US')}
      </span>
    </div>
  )
}

export function ReportView({
  attempt,
  projectCase,
  locked,
}: {
  attempt: ProjectAttempt
  projectCase: ProjectCase
  locked: boolean
}) {
  const update = usePcpaAttempts(s => s.update)
  const files = usePcpaWorkspace(s => s.files)
  const [body, setBody] = useState(attempt.report.body)
  const [picking, setPicking] = useState(false)
  const [mobileView, setMobileView] = useState<'write' | 'preview'>('write')
  const narrow = useIsMobile(1023)
  const preview = useRef<HTMLDivElement>(null)
  const { perAppendix } = useWordTally(attempt)

  // The editor writes locally and the attempt catches up a moment later —
  // or at once when the view closes, so switching tabs never loses a sentence.
  const latestBody = useRef(body)
  latestBody.current = body
  useEffect(() => {
    if (body === attempt.report.body) return
    const t = setTimeout(() => update(attempt.id, a => ({ report: { ...a.report, body } })), 400)
    return () => clearTimeout(t)
  }, [body, attempt.id, attempt.report.body, update])
  useEffect(() => () => {
    const current = usePcpaAttempts.getState().attempts.find(a => a.id === attempt.id)
    if (current && !current.submittedAt && current.report.body !== latestBody.current) {
      usePcpaAttempts.getState().update(attempt.id, a => ({ report: { ...a.report, body: latestBody.current } }))
    }
  }, [attempt.id])

  const appendices = attempt.report.appendices
  const setAppendices = (next: Appendix[]) => update(attempt.id, a => ({ report: { ...a.report, appendices: next } }))
  const candidates = Object.values(files)
    .filter(f => !f.path.startsWith('data/') && appendixKind(f.path) !== null)
    .sort((a, b) => a.path.localeCompare(b.path))
  const bodyImages = countBodyImages(body)

  function attach(path: string) {
    const kind = appendixKind(path)
    if (!kind || appendices.length >= APPENDIX_LIMIT) return
    setAppendices([...appendices, { id: `ap-${Date.now().toString(36)}`, path, kind, caption: '' }])
    setPicking(false)
  }

  function move(i: number, by: number) {
    const next = [...appendices]
    const [item] = next.splice(i, 1)
    next.splice(i + by, 0, item)
    setAppendices(next)
  }

  function print() {
    const html = preview.current?.innerHTML
    if (!html) return
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(reportHtml(`${projectCase.title} — technical report`, html))
    w.document.close()
    w.addEventListener('load', () => w.print())
  }

  const docView = (
    <div className="h-full overflow-y-auto bg-card px-6 py-5">
      <ReportDocument ref={preview} body={body} appendices={appendices} files={files} />
    </div>
  )

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border px-3 py-2">
        <WordCounter attempt={{ ...attempt, report: { ...attempt.report, body } }} className="min-w-0 flex-1" />
        {narrow && (
          <SegmentedControl<'write' | 'preview'>
            size="sm"
            label="Report view"
            value={mobileView}
            onChange={setMobileView}
            options={[
              { value: 'write', label: <PenLine className="h-4 w-4" />, ariaLabel: 'Write' },
              { value: 'preview', label: <Eye className="h-4 w-4" />, ariaLabel: 'Preview' },
            ]}
          />
        )}
        {!locked && !body.trim() && (
          <Button variant="outline" size="sm" onClick={() => setBody(outline(projectCase))} title="Insert section headings — a study aid; the CAS provides no template">
            <ListTree className="mr-1.5 h-4 w-4" /> Outline
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={print} title="Open the report in a print view — save it as PDF from there">
          <Printer className="mr-1.5 h-4 w-4" /> Print / PDF
        </Button>
      </div>
      {bodyImages > 0 && (
        <p className="shrink-0 border-b border-border bg-amber-50 px-3 py-1.5 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          The body embeds {bodyImages === 1 ? 'an image' : `${bodyImages} images`}. Attach graphics as appendices instead — they count toward the limit of {APPENDIX_LIMIT}.
        </p>
      )}
      <div className="flex min-h-0 flex-1">
        {(!narrow || mobileView === 'write') && (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col border-r border-border">
            <div className="min-h-0 flex-1">
              <CodeEditor
                key={`report-${attempt.id}-${locked}`}
                value={body}
                language="markdown"
                wrap
                readOnly={locked}
                onChange={setBody}
                placeholder="Write the report in Markdown: # headings, **bold**, - lists, | tables |, $math$."
                ariaLabel="Technical report"
              />
            </div>
            <div className="shrink-0 space-y-2 border-t border-border bg-card p-3">
              <div className="flex items-center gap-2">
                <p className="flex-1 text-sm font-semibold">Appendices <span className="font-normal text-muted-foreground">{appendices.length} / {APPENDIX_LIMIT}</span></p>
                {!locked && (
                  <Button variant="outline" size="sm" disabled={appendices.length >= APPENDIX_LIMIT} onClick={() => setPicking(true)}>
                    <Paperclip className="mr-1.5 h-4 w-4" /> Attach
                  </Button>
                )}
              </div>
              {appendices.length === 0 && (
                <p className="text-xs text-muted-foreground">Save plots and tables to <span className="font-mono">output/</span> from your code, then attach up to {APPENDIX_LIMIT} of them here.</p>
              )}
              {appendices.map((a, i) => (
                <div key={a.id} className="flex items-center gap-2">
                  <span className="w-6 shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">{i + 1}.</span>
                  {a.kind === 'image' ? <FileImage className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden /> : <Table2 className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />}
                  <Input
                    value={a.caption}
                    disabled={locked}
                    onChange={e => setAppendices(appendices.map(x => (x.id === a.id ? { ...x, caption: e.target.value } : x)))}
                    placeholder={`Caption for ${a.path.split('/').pop()}`}
                    aria-label={`Caption for appendix ${i + 1}`}
                    className="h-8 min-w-0 flex-1 text-sm"
                  />
                  <span className="w-12 shrink-0 text-right text-xs tabular-nums text-muted-foreground" title="Words this appendix adds">{perAppendix[i] ?? 0}w</span>
                  {!locked && (
                    <>
                      <button type="button" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                      <button type="button" aria-label="Move down" disabled={i === appendices.length - 1} onClick={() => move(i, 1)} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                      <button type="button" aria-label="Remove appendix" onClick={() => setAppendices(appendices.filter(x => x.id !== a.id))} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </>
                  )}
                </div>
              ))}
              <p className="text-xs text-muted-foreground">Text drawn inside a graphic isn't counted here; keep chart labels short.</p>
            </div>
          </div>
        )}
        {narrow ? (mobileView === 'preview' && <div className="min-h-0 min-w-0 flex-1">{docView}</div>) : <div className="min-h-0 min-w-0 flex-1">{docView}</div>}
      </div>

      {picking && (
        <ProjectDialog title="Attach an appendix" onClose={() => setPicking(false)} wide>
          {candidates.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No images or tables in the project yet. Save a plot from the Plots pane, or write one from code — e.g.
              <span className="font-mono"> ggsave("output/lift.png")</span>, <span className="font-mono">plt.savefig("output/lift.png")</span> or
              <span className="font-mono"> write.csv(coefs, "output/coefficients.csv")</span>.
            </p>
          ) : (
            <div className="max-h-80 space-y-1 overflow-y-auto">
              {candidates.map(f => {
                const used = appendices.some(a => a.path === f.path)
                return (
                  <button
                    key={f.path}
                    type="button"
                    disabled={used}
                    onClick={() => attach(f.path)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-accent disabled:opacity-40"
                  >
                    {appendixKind(f.path) === 'image' ? <FileImage className="h-4 w-4 text-muted-foreground" /> : <Table2 className="h-4 w-4 text-muted-foreground" />}
                    <span className="flex-1 truncate font-mono">{f.path}</span>
                    {used && <span className="text-xs text-muted-foreground">attached</span>}
                  </button>
                )
              })}
            </div>
          )}
        </ProjectDialog>
      )}
    </div>
  )
}
