import { Download, FileSpreadsheet } from 'lucide-react'
import { buildExportCsvSheet, buildExportSheets, exportFilename, type ExportContext } from '@/lib/coworkExport'
import type { ExportFormat, ExportSpec } from '@/data/coworkDeliverables'
import { downloadCsvSheet, downloadWorkbook } from '@/lib/xlsx'

/**
 * The last step of the loop: pick an export, pick a format, get a file.
 *
 * Only the exports the scoping *earned* are offered — a pricing analysis is
 * never offered a development triangle — because an export a deliverable cannot
 * fill is worse than no export at all.
 *
 * The note under the list is not boilerplate. Cowork holds no experience data,
 * so the exhibits go out with their value cells empty and their columns,
 * periods, assumptions and sources filled. A reader who expects a completed
 * exhibit and gets a skeleton should learn that here, before they open the
 * file — not after.
 */

export interface ExportPanelProps {
  exports: ExportSpec[]
  context: ExportContext
}

export function ExportPanel({ exports, context }: ExportPanelProps) {
  function run(spec: ExportSpec, format: ExportFormat) {
    const filename = exportFilename(context.deliverable.title, spec, context.asOf, format)
    if (format === 'csv') {
      downloadCsvSheet(filename, buildExportCsvSheet(context, spec.id))
    } else {
      downloadWorkbook(filename, buildExportSheets(context, spec.id))
    }
  }

  if (!exports.length) {
    return (
      <p className="rounded-lg border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
        Finish the scoping and the exports it earns appear here.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      <ul className="divide-y rounded-xl border bg-card">
        {exports.map(spec => (
          <li key={spec.id} className="flex flex-wrap items-start gap-3 px-4 py-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">
              <FileSpreadsheet className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{spec.label}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{spec.description}</p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              {spec.formats.map(format => (
                <button
                  key={format}
                  type="button"
                  onClick={() => run(spec, format)}
                  data-sound="press"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden />.{format}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Exhibits export with their columns, periods, assumptions and sources filled in and their{' '}
        <strong className="font-medium text-foreground">value cells empty</strong>. Cowork does not hold your
        experience data, so a pre-filled exhibit would be filled with numbers nobody measured.
      </p>
    </div>
  )
}
