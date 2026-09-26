import { useState } from 'react'
import { ChevronDown, Download, ExternalLink, FolderOpen } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MarkdownText } from '@/components/MarkdownText'
import {
  APPENDIX_LIMIT,
  ATTESTATION,
  CONTENT_OUTLINE_URL,
  FINAL_CHECKLIST,
  WORD_LIMIT,
  type ProjectCase,
} from '@/data/pcpaProjects'
import { usePcpaWorkspace } from '@/hooks/usePcpaWorkspace'
import type { ProjectAttempt } from '@/lib/pcpaAttempt'
import { downloadWorkspaceFile } from './shared'
import { cn } from '@/lib/utils'

/**
 * The project materials, as the CAS project portal hands them out at the
 * start of the window: "a statement of the business problem, one or two data
 * sets, scope parameters for the project, and guidelines as to what should be
 * submitted" (Content Outline). Laid out as one document to read top to
 * bottom and come back to — a candidate re-reads the scope more than once.
 */

function Section({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

function formatDeadline(ms: number): string {
  return new Date(ms).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export function BriefView({
  attempt,
  projectCase,
  onOpenFile,
}: {
  attempt: ProjectAttempt
  projectCase: ProjectCase
  onOpenFile: (path: string) => void
}) {
  const files = usePcpaWorkspace(s => s.files)
  const [openDict, setOpenDict] = useState<string | null>(projectCase.dictionary[0]?.file ?? null)
  const { memo } = projectCase

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-6 pb-24">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">PCPA Project · {projectCase.line}</p>
        <h1 className="text-2xl font-semibold tracking-tight">{projectCase.title}</h1>
        <p className="text-sm text-muted-foreground">
          {projectCase.company}
          {attempt.deadline !== null ? <> · Submissions close {formatDeadline(attempt.deadline)}</> : ' · Untimed practice'}
        </p>
      </header>

      <Section title="Statement of the business problem">
        <Card className="space-y-4 p-5">
          <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1 text-sm">
            <dt className="text-muted-foreground">From</dt><dd>{memo.from}</dd>
            <dt className="text-muted-foreground">To</dt><dd>{memo.to}</dd>
            <dt className="text-muted-foreground">Subject</dt><dd className="font-medium">{memo.subject}</dd>
          </dl>
          <div className="border-t border-border pt-4">
            <MarkdownText className="prose prose-sm max-w-none dark:prose-invert">{memo.body}</MarkdownText>
          </div>
        </Card>
      </Section>

      <Section title="Information from stakeholders">
        <p className="text-sm text-muted-foreground">Notes gathered from colleagues. Weigh each for its relevance to the problem — not everything a stakeholder expects is true.</p>
        <div className="space-y-2">
          {projectCase.stakeholders.map((s, i) => (
            <Card key={i} className="p-4">
              <p className="text-sm">{s.note}</p>
              <p className="mt-2 text-xs text-muted-foreground">— {s.from}, {s.role}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Scope parameters">
        <ul className="list-disc space-y-1.5 pl-5 text-sm">
          {projectCase.scope.map(s => <li key={s}>{s}</li>)}
        </ul>
      </Section>

      <Section title="Data sets" id="data">
        <p className="text-sm text-muted-foreground">
          In the workspace's <span className="font-mono">data/</span> folder, read-only. Missing values are blank fields.
          The data are the property of the CAS: they are not submitted, and may not be shared.
        </p>
        <div className="space-y-2">
          {projectCase.dictionary.map(d => {
            const path = `data/${d.file}`
            const file = files[path]
            const expanded = openDict === d.file
            return (
              <Card key={d.file} className="overflow-hidden">
                <div className="flex flex-wrap items-center gap-2 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-medium">{d.file}</p>
                    <p className="text-xs text-muted-foreground">{d.description} {d.rows} rows, {d.entries.length} columns.</p>
                  </div>
                  <button type="button" onClick={() => onOpenFile(path)} className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium hover:bg-accent">
                    <FolderOpen className="h-3.5 w-3.5" /> Open
                  </button>
                  {file && (
                    <button type="button" onClick={() => downloadWorkspaceFile(file)} className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium hover:bg-accent">
                      <Download className="h-3.5 w-3.5" /> CSV
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpenDict(expanded ? null : d.file)}
                    aria-expanded={expanded}
                    className="flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-medium hover:bg-accent"
                  >
                    Dictionary <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-180')} />
                  </button>
                </div>
                {expanded && (
                  <div className="overflow-x-auto border-t border-border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/60 text-left text-xs">
                        <tr>
                          <th className="px-4 py-2 font-semibold">Column</th>
                          <th className="px-4 py-2 font-semibold">Type</th>
                          <th className="px-4 py-2 font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.entries.map(e => (
                          <tr key={e.column} className="border-t border-border/60 align-top">
                            <td className="whitespace-nowrap px-4 py-1.5 font-mono text-xs">{e.column}</td>
                            <td className="whitespace-nowrap px-4 py-1.5 text-xs text-muted-foreground">{e.type}</td>
                            <td className="px-4 py-1.5">{e.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </Section>

      <Section title="What to submit">
        <p className="text-sm">
          A brief technical report that describes how you explored the data and managed its problems, how you built,
          evaluated and improved a GLM to address the business problem, and what the model means — technically, and
          for the business decision to be made.
        </p>
        <Card className="p-4">
          <p className="mb-2 text-sm font-semibold">Final checklist</p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm">
            {FINAL_CHECKLIST.map(item => <li key={item}>{item}</li>)}
          </ul>
        </Card>
        <p className="text-xs text-muted-foreground">
          A report over {WORD_LIMIT.toLocaleString('en-US')} words, more than {APPENDIX_LIMIT} appendices, or files not in the required
          format is an automatic fail on the real project.
        </p>
      </Section>

      <Section title="Candidate attestation and AI use">
        <p className="text-sm">At submission you will affirm that:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm">
          {ATTESTATION.map(a => <li key={a}>{a}</li>)}
        </ul>
        <a href={CONTENT_OUTLINE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">
          The full policy, in the CAS PCPA Content Outline <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </Section>
    </div>
  )
}
