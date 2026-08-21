import { useState } from 'react'
import { FileText } from 'lucide-react'
import { getSyllabusPdfLink } from '@/data/examPdfLinks'
import { isSupportedPdfSource } from '@/lib/examPdf'
import { PdfViewerPanel } from '@/components/PdfViewerPanel'

/**
 * The publisher's syllabus for this exam, beside the study guide's title.
 *
 * The page below it is *our* reading of the syllabus — a candidate should be
 * able to check it against the examining body's own document without leaving
 * for a browser tab and finding their way back, so it opens in the same
 * slide-up reader the mock-exam shelf's papers use (`PdfViewerPanel`), with the
 * publisher's copy and a download still one tap away inside it.
 *
 * An exam whose syllabus isn't in `data/examPdfLinks.ts` renders nothing —
 * `getSyllabusPdfLink` returning null is the honest answer, where a guessed URL
 * is a 404 the candidate discovers for themselves.
 */
export function ExamSyllabusButton({ examId, examLabel }: { examId: string; examLabel: string }) {
  const [viewing, setViewing] = useState(false)
  const link = getSyllabusPdfLink(examId)
  if (!link) return null

  // Only a source the proxy will serve opens in the panel; anything else stays
  // an ordinary out-link rather than a viewer that can't load.
  const canView = isSupportedPdfSource(link.url)

  return (
    <>
      {/* Still an anchor to the publisher underneath: a plain click reads it
          here, but ⌘/ctrl-click, middle-click and long-press keep working the
          way a link does, and the real URL stays visible. */}
      <a
        href={link.url}
        target="_blank"
        rel="noreferrer"
        title={`${examLabel} — the published syllabus (PDF)`}
        aria-label={canView ? `View syllabus: ${link.label} (PDF)` : `Open syllabus: ${link.label} (PDF)`}
        onClick={e => {
          if (!canView || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
          e.preventDefault()
          setViewing(true)
        }}
        className="not-prose inline-flex min-h-[36px] shrink-0 items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground no-underline shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        {link.label}
        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          PDF
        </span>
      </a>

      {viewing && canView && (
        <PdfViewerPanel
          url={link.url}
          title={link.label}
          subtitle={examLabel}
          onClose={() => setViewing(false)}
        />
      )}
    </>
  )
}
