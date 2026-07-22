import { useState } from 'react'
import { X, Download, Loader2 } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { RESETTABLE_EXAMS, EXAM_ID_TO_LABEL } from '@/lib/examIds'
import {
  fetchExportResponses,
  responsesToCsv,
  buildExportFilename,
  downloadCsv,
  exportScopeSlug,
} from '@/lib/exportData'
import { buildProgressReport, generateProgressReportPdf, buildPdfFilename } from '@/lib/exportPdf'

// The same data export offered in Settings (CSV spreadsheet or branded PDF
// progress report), surfaced from the Dashboard header via the download icon.
// Reuses the exact export pipeline in lib/exportData.ts + lib/exportPdf.ts.

interface Props {
  open: boolean
  onClose: () => void
  user: User
}

export function DashboardExportModal({ open, onClose, user }: Props) {
  const [scope, setScope] = useState<'all' | string>('all')
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv')
  const [exporting, setExporting] = useState(false)
  const [state, setState] = useState<{ error: string | null; success: string | null }>({ error: null, success: null })

  if (!open) return null

  const handleExport = async () => {
    const examId = scope === 'all' ? null : scope
    const scopeLabel = examId ? EXAM_ID_TO_LABEL[examId] ?? examId : 'all exams'
    setExporting(true)
    setState({ error: null, success: null })
    try {
      const rows = await fetchExportResponses(user.id, examId)
      if (rows.length === 0) {
        setState({ error: `No answered questions to export for ${scopeLabel}.`, success: null })
        return
      }
      if (format === 'pdf') {
        const report = buildProgressReport(rows)
        const owner =
          (user.user_metadata?.display_name as string | undefined)?.trim() ||
          user.email ||
          'You'
        const scopeTitle = examId ? EXAM_ID_TO_LABEL[examId] ?? examId : 'All exams'
        await generateProgressReportPdf(report, { scopeLabel: scopeTitle, owner }, buildPdfFilename(exportScopeSlug(examId)))
      } else {
        downloadCsv(buildExportFilename(examId), responsesToCsv(rows))
      }
      setState({
        error: null,
        success: `Exported ${rows.length} ${rows.length === 1 ? 'question' : 'questions'} for ${scopeLabel} as ${format.toUpperCase()}.`,
      })
    } catch (err) {
      setState({ error: err instanceof Error ? err.message : 'Failed to export data.', success: null })
    } finally {
      setExporting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Export performance data"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-lg bg-card rounded-xl shadow-2xl flex flex-col my-12">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 h-12 shrink-0">
          <Download className="h-4 w-4 text-primary shrink-0" />
          <span className="flex-1 font-semibold text-sm">Export performance data</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 transition-colors rounded-md hover:bg-muted/50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-muted-foreground">
            Download your answered questions as a <span className="font-medium text-foreground">CSV</span> spreadsheet
            (date, exam, topic, your answer, correct answer, result and time), or a branded{' '}
            <span className="font-medium text-foreground">PDF</span> progress report summarising your accuracy by exam and topic.
          </p>

          <div className="space-y-3">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium">Scope</span>
              <select
                value={scope}
                onChange={e => setScope(e.target.value)}
                className="text-sm border border-input rounded-md px-2 py-2 bg-background text-foreground cursor-pointer"
              >
                <option value="all">All exams</option>
                {RESETTABLE_EXAMS.map(({ id, label }) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium">Format</span>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as 'csv' | 'pdf')}
                className="text-sm border border-input rounded-md px-2 py-2 bg-background text-foreground cursor-pointer"
              >
                <option value="csv">CSV spreadsheet</option>
                <option value="pdf">PDF report</option>
              </select>
            </label>
          </div>

          {state.error && <p className="text-xs text-destructive">{state.error}</p>}
          {state.success && <p className="text-xs text-green-600 dark:text-green-400">{state.success}</p>}
        </div>

        <div className="px-5 pb-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-2 text-sm font-medium bg-muted/40 text-foreground hover:bg-muted transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {exporting ? <><Loader2 className="h-4 w-4 animate-spin" />Exporting…</> : <><Download className="h-4 w-4" />Export</>}
          </button>
        </div>
      </div>
    </div>
  )
}
