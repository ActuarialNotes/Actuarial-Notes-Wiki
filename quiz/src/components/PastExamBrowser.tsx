import { useEffect, useState } from 'react'
import { Check, ExternalLink, FileText, Shuffle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPassRate, hasPublishedStats, type PastExamRow } from '@/lib/pastExams'
import { isSupportedPdfSource } from '@/lib/examPdf'
import { PdfViewerPanel } from '@/components/PdfViewerPanel'

// The mock-exam shelf: scroll through the exam's past sittings, see how big
// each paper is and how many candidates actually passed it, and sit one.
//
// Sittings the question bank doesn't hold yet are still listed — greyed out and
// unselectable — so the shelf reads as the exam's real history rather than as
// whatever happens to have been imported.

export interface SittingSelection {
  year: number
  session?: string
}

interface Props {
  rows: PastExamRow[]
  /** `null` = the generated mock ("Mix"), which is always the first row. */
  selected: SittingSelection | null
  onSelect: (sitting: SittingSelection | null) => void
  /** Questions the generated mock draws — the Mix row's count. */
  mixCount: number
  /** Exam display name, e.g. "Exam 5". */
  examLabel: string
  /** Where to look the exam's published pass ratios up, when there is somewhere. */
  lookup?: { url: string; label: string } | null
  /**
   * Examiner's report (or equivalent) for the current selection — opened in the
   * in-app PDF viewer beside the pass-rate lookup.
   */
  reportLink?: { url: string; label: string } | null
  /**
   * The worked solutions to that paper, where the body publishes them
   * separately (the SOA splits its P and FM sample sets into a questions PDF
   * and a solutions PDF). Sits beside the report as a second button.
   */
  solutionsLink?: { url: string; label: string } | null
}

/**
 * A sitting's pass ratio. The label follows the figure rather than the column:
 * the *effective* ratio is a CAS measure, so an SOA sitting only ever has a raw
 * pass rate and must not be labelled "eff. pass". A row with neither shows a
 * dash under whichever label the rest of the shelf is using.
 */
function StatCell({ row, effectiveColumn }: { row: PastExamRow; effectiveColumn: boolean }) {
  const isEffective = row.effectivePassRate !== undefined
  const formatted = formatPassRate(row.effectivePassRate ?? row.passRate)
  return (
    <span className="flex shrink-0 flex-col items-end">
      <span className="text-sm font-semibold tabular-nums">
        {formatted ?? <span className="text-muted-foreground">—</span>}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {isEffective || (formatted === null && effectiveColumn) ? 'eff. pass' : 'pass rate'}
      </span>
    </span>
  )
}

/**
 * One published document — the paper, its examiner's report, its solutions —
 * as a button that reads it in the in-app viewer.
 *
 * Still an anchor to the publisher underneath: a plain click reads it here, but
 * ⌘/ctrl-click, middle-click and long-press keep working the way a link does,
 * and the real URL stays visible. Only a source the proxy will serve opens in
 * the panel; anything else stays an ordinary out-link.
 */
function PdfLinkButton({
  link,
  onView,
}: {
  link: { url: string; label: string }
  onView: () => void
}) {
  const canView = isSupportedPdfSource(link.url)
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      aria-label={canView ? `View ${link.label} (PDF)` : `Open ${link.label} (PDF)`}
      onClick={e => {
        if (!canView || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        onView()
      }}
      className="inline-flex min-h-[36px] items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      {link.label}
      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        PDF
      </span>
    </a>
  )
}

export function PastExamBrowser({
  rows,
  selected,
  onSelect,
  mixCount,
  examLabel,
  lookup,
  reportLink,
  solutionsLink,
}: Props) {
  // The pass-ratio column only earns its width once the sitting catalogue
  // carries published figures — a column of em-dashes reads as a broken
  // readout, so until then the header's lookup link is the honest answer.
  const showStats = hasPublishedStats(rows)
  // Whether this exam's figures are CAS effective ratios at all — decides what
  // an unfilled row's dash is labelled.
  const effectiveColumn = rows.some(r => r.effectivePassRate !== undefined)

  // The papers behind the current selection, in reading order: the questions
  // (or the report that carries them) first, its solutions second.
  const documents = [reportLink, solutionsLink].filter(
    (link): link is { url: string; label: string } => !!link,
  )

  // A document is read in a panel over the builder rather than in a new tab, so
  // a candidate can check what the examiners said about a question and still be
  // one tap from starting the paper. Only a source the proxy will serve opens
  // that way; anything else stays an ordinary out-link.
  const [viewingUrl, setViewingUrl] = useState<string | null>(null)
  const viewing = documents.find(d => d.url === viewingUrl) ?? null
  const selectedRow = rows.find(
    r => r.year === selected?.year && (r.session ?? undefined) === (selected?.session ?? undefined),
  )
  const reportSubtitle = selectedRow ? `${examLabel} · ${selectedRow.label}` : examLabel
  // The panel shows *the current selection's* papers, so it follows the shelf
  // while it's open — and forgets the document it was on when the new selection
  // doesn't carry it, rather than springing back open on the way past.
  const documentKey = documents.map(d => d.url).join(' ')
  useEffect(() => {
    setViewingUrl(url => (url && documentKey.includes(url) ? url : null))
  }, [documentKey])

  return (
    <div className="space-y-2">
      {/* Where to read *about* the papers, above the shelf you pick one from:
          the selected sitting's report to download, and the exam's pass-rate
          table to look up. Both are thumb-sized rather than fine print — they
          sit between two much larger targets on a phone. */}
      {(documents.length > 0 || lookup) && (
        <div className="flex flex-wrap items-center justify-end gap-2 px-1">
          {documents.map(doc => (
            <PdfLinkButton key={doc.url} link={doc} onView={() => setViewingUrl(doc.url)} />
          ))}
          {lookup && (
            <a
              href={lookup.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Pass rates
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            </a>
          )}
        </div>
      )}

      {/* A bounded scroller rather than a long page: the shelf is something you
          flick through, and the action bar below stays reachable. */}
      <div
        role="radiogroup"
        aria-label={`${examLabel} exams`}
        className="max-h-72 divide-y divide-border overflow-y-auto overscroll-contain rounded-lg bg-muted/30"
      >
        <button
          type="button"
          role="radio"
          aria-checked={selected === null}
          data-sound="tick"
          onClick={() => onSelect(null)}
          className={cn(
            'flex w-full items-center gap-3 px-3 py-3 text-left transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
            selected === null ? 'bg-primary/10' : 'hover:bg-accent/40',
          )}
        >
          <Shuffle className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-sm font-medium">Mix</span>
            <span className="text-xs text-muted-foreground">
              {mixCount} question{mixCount === 1 ? '' : 's'} across all topics
            </span>
          </span>
          {selected === null && <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />}
        </button>

        {rows.map(row => {
          const isSelected =
            selected?.year === row.year &&
            (selected?.session ?? undefined) === (row.session ?? undefined)
          return (
            <button
              key={row.key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={!row.available}
              data-sound={row.available ? 'tick' : 'none'}
              onClick={() => onSelect({ year: row.year, session: row.session })}
              className={cn(
                'flex w-full items-center gap-3 px-3 py-3 text-left transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                !row.available
                  ? 'cursor-not-allowed opacity-50'
                  : isSelected
                  ? 'bg-primary/10'
                  : 'hover:bg-accent/40',
              )}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-sm font-medium">{row.label}</span>
                <span className="text-xs text-muted-foreground">
                  {row.available
                    ? `${row.bankCount} question${row.bankCount === 1 ? '' : 's'}`
                    : row.officialQuestionCount
                    ? `${row.officialQuestionCount} questions · not added yet`
                    : 'Not added yet'}
                </span>
              </span>
              {showStats && <StatCell row={row} effectiveColumn={effectiveColumn} />}
              {isSelected && <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />}
            </button>
          )
        })}
      </div>

      {viewing && (
        <PdfViewerPanel
          url={viewing.url}
          title={viewing.label}
          subtitle={reportSubtitle}
          onClose={() => setViewingUrl(null)}
        />
      )}
    </div>
  )
}
