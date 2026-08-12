import { Check, ExternalLink, FileDown, Shuffle } from 'lucide-react'
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
  /** Examiner's report (or equivalent) for the current selection. */
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
  const selectedRow = selected
    ? rows.find(r => r.year === selected.year && (r.session ?? undefined) === (selected.session ?? undefined))
    : undefined

  // The pass-ratio column only earns its width once the sitting catalogue
  // carries published figures — a column of em-dashes reads as a broken
  // readout, so until then the header's lookup link is the honest answer.
  const showStats = hasPublishedStats(rows)
  // Whether this exam's figures are CAS effective ratios at all — decides what
  // an unfilled row's dash is labelled.
  const effectiveColumn = rows.some(r => r.effectivePassRate !== undefined)

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2 px-1">
        <p className="text-xs text-muted-foreground">
          {rows.length > 0
            ? `Past ${examLabel} papers — pick one, or take a generated mix.`
            : 'A generated exam, distributed across the syllabus.'}
        </p>
        {lookup && (
          <a
            href={lookup.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Pass rates
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        )}
      </div>

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

      {/* What sitting this actually launches, plus the paper it came from. */}
      <div className="space-y-1 px-1">
        <p className="text-xs text-muted-foreground">
          {selectedRow
            ? `All ${selectedRow.bankCount} question${selectedRow.bankCount === 1 ? '' : 's'} from the ${selectedRow.label} sitting.`
            : `Distributed across all ${examLabel} topics to mirror the real exam.`}
          {' '}Answers and explanations are revealed at the end.
        </p>
        {reportLink && (
          <a
            href={reportLink.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded text-xs text-primary transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FileDown className="h-3 w-3" aria-hidden />
            {reportLink.label}
          </a>
        )}
      </div>
    </div>
  )
}
