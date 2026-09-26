import { forwardRef, useMemo } from 'react'
import { MarkdownText } from '@/components/MarkdownText'
import { parseCsv } from '@/lib/csv'
import type { Appendix } from '@/lib/pcpaReport'
import { fileText, type WorkspaceFile } from '@/hooks/usePcpaWorkspace'
import { useFileUrl } from './projectFiles'

/**
 * The report as a reader sees it — the body, then its appendices, numbered —
 * shared by the editor's preview, the print view and the submission package so
 * the three can never differ.
 */

function AppendixTable({ file }: { file: WorkspaceFile }) {
  const { columns, rows } = useMemo(() => parseCsv(fileText(file)), [file])
  const shown = rows.slice(0, 200)
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>{columns.map((c, i) => <th key={i} className="border-b border-border px-2 py-1 text-left font-semibold">{c}</th>)}</tr>
        </thead>
        <tbody>
          {shown.map((r, i) => (
            <tr key={i}>{columns.map((_, j) => <td key={j} className="border-b border-border/50 px-2 py-1 tabular-nums">{r[j] ?? ''}</td>)}</tr>
          ))}
        </tbody>
      </table>
      {rows.length > shown.length && <p className="mt-1 text-xs text-muted-foreground">{rows.length - shown.length} more rows not shown.</p>}
    </div>
  )
}

function AppendixImage({ file, alt }: { file: WorkspaceFile; alt: string }) {
  const url = useFileUrl(file)
  return url ? <img src={url} alt={alt} data-appendix-path={file.path} className="max-w-full border border-border/60 bg-white" /> : null
}

export const ReportDocument = forwardRef<HTMLDivElement, {
  body: string
  appendices: Appendix[]
  files: Record<string, WorkspaceFile>
}>(function ReportDocument({ body, appendices, files }, ref) {
  return (
    <div ref={ref} className="report-document space-y-6">
      {body.trim() ? (
        <MarkdownText className="prose prose-sm max-w-none dark:prose-invert">{body}</MarkdownText>
      ) : (
        <p className="text-sm text-muted-foreground">The report is empty.</p>
      )}
      {appendices.map((a, i) => {
        const file = files[a.path]
        return (
          <section key={a.id} className="space-y-2 break-inside-avoid">
            <h3 className="text-sm font-semibold">Appendix {i + 1}. {a.caption || <span className="text-muted-foreground">(no caption)</span>}</h3>
            {!file ? (
              <p className="text-xs text-destructive">{a.path} is no longer in the project.</p>
            ) : a.kind === 'image' ? (
              <AppendixImage file={file} alt={a.caption || a.path} />
            ) : (
              <AppendixTable file={file} />
            )}
          </section>
        )
      })}
    </div>
  )
})
