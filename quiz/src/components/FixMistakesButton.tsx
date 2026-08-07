import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { RotateCcw } from 'lucide-react'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { useRecentMistakes } from '@/hooks/useRecentMistakes'
import { MistakesReviewModal } from '@/components/MistakesReviewModal'

// How many uncorrected misses feed the browser. Generous — the button promises
// everything you haven't fixed yet — but still bounded.
const MISTAKE_LIMIT = 100

interface Props {
  /** Mastery records already filtered to the active exam. */
  masteryRecords: ConceptMasteryRecord[]
  /** Active exam label (q.exam) — scopes mistakes to this exam. */
  examTopic: string
  /**
   * Sticky-header slot (a `display: contents` div in the pinned actions row).
   * When present, a compact copy of the button is portaled into it so the action
   * stays reachable once the full-size row has scrolled away. One component owns
   * both copies so the mistake query and the popup state aren't duplicated.
   */
  compactSlot?: HTMLElement | null
}

/**
 * Fix-mistakes action. Deliberately wordless: an icon and an orange corner count
 * of what's still outstanding, styled as a light-red sibling of the Read
 * concepts / Start Quiz buttons it sits *between*. It's the narrow middle
 * column of that row — the smallest of the three, because it's the optional one.
 * Tapping it opens MistakesReviewModal — the missed questions themselves, one at
 * a time, answerable in place with Previous/Next between them, in the same
 * resizable bottom panel the concept popup uses.
 *
 * Hides itself entirely when there's nothing outstanding to review.
 */
export function FixMistakesButton({ masteryRecords, examTopic, compactSlot }: Props) {
  const { mistakes, loading } = useRecentMistakes(masteryRecords, examTopic, MISTAKE_LIMIT)
  const [open, setOpen] = useState(false)
  // Questions the open reviewer has already fixed. The reviewer banks its
  // answers on close, so until then the query above still counts them as
  // outstanding — subtracting them here is what makes the badge tick down as
  // the learner works instead of jumping only after the panel closes.
  const [fixedIds, setFixedIds] = useState<string[]>([])

  const handleFixedChange = useCallback((ids: string[]) => {
    // Same-value guard: the reviewer reports on every grade, and a fresh array
    // each render would otherwise re-render this whole row for nothing.
    setFixedIds(prev =>
      prev.length === ids.length && prev.every((id, i) => id === ids[i]) ? prev : ids,
    )
  }, [])

  const outstanding = useMemo(() => {
    if (fixedIds.length === 0) return mistakes
    const fixed = new Set(fixedIds)
    return mistakes.filter(m => !fixed.has(m.question.id))
  }, [mistakes, fixedIds])

  // Drop the local subtraction once the refetched list has caught up, so a
  // question missed again later isn't still being discounted as fixed.
  useEffect(() => {
    if (fixedIds.length === 0) return
    const fixed = new Set(fixedIds)
    if (!mistakes.some(m => fixed.has(m.question.id))) setFixedIds([])
  }, [mistakes, fixedIds])

  // Stay mounted while the reviewer is open even once nothing is outstanding —
  // this component owns the panel, and unmounting it mid-sitting would close it
  // (and trigger its save) the moment the learner fixed the last question.
  if (!open && (loading || mistakes.length === 0)) return null

  const count = outstanding.length
  const outstandingLabel = `${count} question${count === 1 ? '' : 's'} still to fix`

  // The reviewer snapshots the list on open, so its sitting starts with nothing
  // fixed — clear any leftovers from the previous one.
  function openReviewer() {
    setFixedIds([])
    setOpen(true)
  }

  return (
    <>
      {/* Stretches to the row's height; `shrink-0` + no `flex-1` keeps it
          narrower than the two full actions it sits between. */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={openReviewer}
          aria-label={`Fix mistakes — ${outstandingLabel}`}
          title={`Fix Mistakes — ${outstandingLabel}`}
          className="flex h-full items-center justify-center rounded-lg bg-red-50 px-3 sm:px-5 py-4 text-red-900 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-red-950 dark:text-red-100 dark:hover:bg-red-900/70"
        >
          <RotateCcw className="h-5 w-5 shrink-0" />
        </button>
        {/* Orange corner count, the same "still owed" badge Start Quiz wears.
            Disappears at zero rather than reading "0 still to fix". */}
        {count > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-orange-500 px-1.5 text-xs font-bold leading-none text-white tabular-nums shadow ring-2 ring-background"
            aria-hidden="true"
          >
            {count}
          </span>
        )}
      </div>

      {/* Compact copy for the pinned exam-header row. The count rides the
          top-right corner here too, matching the pinned Start Quiz badge
          rather than sitting inline inside the pill. */}
      {compactSlot && createPortal(
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={openReviewer}
            aria-label={`Fix mistakes — ${outstandingLabel}`}
            title={`Fix Mistakes — ${outstandingLabel}`}
            className="flex h-10 items-center gap-1.5 rounded-full bg-red-50 px-3 text-sm font-semibold text-red-900 transition-colors hover:bg-red-100 dark:bg-red-950 dark:text-red-100 dark:hover:bg-red-900/70"
          >
            <RotateCcw className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Fix</span>
          </button>
          {count > 0 && (
            <span
              className="absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold leading-none text-white tabular-nums shadow ring-2 ring-background"
              aria-hidden="true"
            >
              {count}
            </span>
          )}
        </div>,
        compactSlot,
      )}

      {open && (
        <MistakesReviewModal
          mistakes={mistakes}
          masteryRecords={masteryRecords}
          onFixedChange={handleFixedChange}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
