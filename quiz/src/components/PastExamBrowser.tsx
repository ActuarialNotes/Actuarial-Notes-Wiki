import { useEffect, useRef } from 'react'
import { ExternalLink, Shuffle } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { cn } from '@/lib/utils'
import { formatPassRate, hasPublishedStats, type PastExamRow } from '@/lib/pastExams'
import { usePdfReader } from '@/hooks/usePdfReader'
import { PdfLinkButton } from '@/components/PdfLinkButton'

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
   * in-app PDF viewer, on the selected row.
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
 * A row's radio: the label column, with an ::after stretched over the whole
 * row so a tap anywhere on it (bar the PDF buttons above the overlay) selects.
 */
const ROW_TARGET_CLASS =
  'flex min-w-0 flex-1 flex-col gap-0.5 text-left focus-visible:outline-none ' +
  'after:absolute after:inset-0 after:content-[""] ' +
  'focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring'

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

  // A document is read in the app's reader (`hooks/usePdfReader.ts`) rather
  // than in a new tab, so a candidate can check what the examiners said about a
  // question and still be one tap from starting the paper.
  const closePdfIf = usePdfReader(state => state.closePdfIf)
  const selectedRow = rows.find(
    r => r.year === selected?.year && (r.session ?? undefined) === (selected?.session ?? undefined),
  )
  const reportSubtitle = selectedRow ? `${examLabel} · ${selectedRow.label}` : examLabel
  // The reader shows *the current selection's* papers, so the shelf closes the
  // document it put up when the new selection doesn't carry it, rather than
  // leaving the previous sitting's report over a different paper. Only a
  // document this shelf opened is its to close — the ref is what keeps it off
  // one something else is showing.
  const openedHere = useRef(new Set<string>())
  const documentKey = documents.map(d => d.url).join(' ')
  useEffect(() => {
    for (const url of openedHere.current) {
      if (!documentKey.includes(url)) closePdfIf(url)
    }
  }, [documentKey, closePdfIf])

  // The selected row carries its papers, so the report sits beside the paper
  // it is about rather than above the whole shelf. On a phone there is no room
  // beside the label, so they drop to a line of their own inside the row.
  const documentButtons = documents.length > 0 && (
    <span className="relative z-10 order-last flex w-full flex-wrap items-center gap-2 sm:order-none sm:w-auto sm:shrink-0 sm:justify-end">
      {documents.map(doc => (
        <PdfLinkButton
          key={doc.url}
          url={doc.url}
          label={doc.label}
          subtitle={reportSubtitle}
          onOpen={() => openedHere.current.add(doc.url)}
        />
      ))}
    </span>
  )

  return (
    <div className="space-y-2">
      {/* The exam's pass-rate table to look up, above the shelf. Thumb-sized
          rather than fine print — it sits between two much larger targets on
          a phone. */}
      {lookup && (
        <div className="flex flex-wrap items-center justify-end gap-2 px-1">
          <a
            href={lookup.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Pass rates
            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          </a>
        </div>
      )}

      {/* A bounded scroller rather than a long page: the shelf is something you
          flick through, and the action bar below stays reachable.

          Each row is a radio whose ::after stretches over the whole row, so the
          row is one target — and the selected row's PDF buttons, which a radio
          can't contain, sit above that overlay as siblings. */}
      <div
        role="radiogroup"
        aria-label={`${examLabel} exams`}
        className="max-h-72 divide-y divide-border overflow-y-auto overscroll-contain rounded-lg bg-muted/30"
      >
        <div
          className={cn(
            'relative flex flex-wrap items-center gap-3 px-3 py-3 transition-colors',
            selected === null ? 'bg-primary/10' : 'hover:bg-accent/40',
          )}
        >
          <Shuffle className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <button
            type="button"
            role="radio"
            aria-checked={selected === null}
            data-sound="tick"
            onClick={() => onSelect(null)}
            className={ROW_TARGET_CLASS}
          >
            <span className="text-sm font-medium">Mix</span>
            <span className="text-xs text-muted-foreground">
              {mixCount} question{mixCount === 1 ? '' : 's'} across all topics
            </span>
          </button>
          {selected === null && documentButtons}
          {selected === null && <CheckMark className="h-4 w-4 shrink-0" />}
        </div>

        {rows.map(row => {
          const isSelected =
            selected?.year === row.year &&
            (selected?.session ?? undefined) === (row.session ?? undefined)
          return (
            <div
              key={row.key}
              className={cn(
                'relative flex flex-wrap items-center gap-3 px-3 py-3 transition-colors',
                !row.available
                  ? 'cursor-not-allowed opacity-50'
                  : isSelected
                  ? 'bg-primary/10'
                  : 'hover:bg-accent/40',
              )}
            >
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={!row.available}
                data-sound={row.available ? 'tick' : 'none'}
                onClick={() => onSelect({ year: row.year, session: row.session })}
                className={cn(ROW_TARGET_CLASS, !row.available && 'cursor-not-allowed')}
              >
                <span className="text-sm font-medium">{row.label}</span>
                <span className="text-xs text-muted-foreground">
                  {row.available
                    ? `${row.bankCount} question${row.bankCount === 1 ? '' : 's'}`
                    : row.officialQuestionCount
                    ? `${row.officialQuestionCount} questions · not added yet`
                    : 'Not added yet'}
                </span>
              </button>
              {isSelected && documentButtons}
              {showStats && <StatCell row={row} effectiveColumn={effectiveColumn} />}
              {isSelected && <CheckMark className="h-4 w-4 shrink-0" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
