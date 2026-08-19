import { Check, Download, ExternalLink, Shuffle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPassRate, hasPublishedStats, type PastExamRow } from '@/lib/pastExams'

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
   * Examiner's report (or equivalent) for the current selection — offered as a
   * PDF download beside the pass-rate lookup.
   */
  reportLink?: { url: string; label: string } | null
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

export function PastExamBrowser({
  rows,
  selected,
  onSelect,
  mixCount,
  examLabel,
  lookup,
  reportLink,
}: Props) {
  // The pass-ratio column only earns its width once the sitting catalogue
  // carries published figures — a column of em-dashes reads as a broken
  // readout, so until then the header's lookup link is the honest answer.
  const showStats = hasPublishedStats(rows)
  // Whether this exam's figures are CAS effective ratios at all — decides what
  // an unfilled row's dash is labelled.
  const effectiveColumn = rows.some(r => r.effectivePassRate !== undefined)

  return (
    <div className="space-y-2">
      {/* Where to read *about* the papers, above the shelf you pick one from:
          the selected sitting's report to download, and the exam's pass-rate
          table to look up. Both are thumb-sized rather than fine print — they
          sit between two much larger targets on a phone. */}
      {(reportLink || lookup) && (
        <div className="flex flex-wrap items-center justify-end gap-2 px-1">
          {reportLink && (
            <a
              href={reportLink.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Download ${reportLink.label} (PDF)`}
              className="inline-flex min-h-[36px] items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Download className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              {reportLink.label}
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                PDF
              </span>
            </a>
          )}
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
    </div>
  )
}
