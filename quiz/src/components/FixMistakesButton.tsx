import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { RotateCcw } from 'lucide-react'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { mistakeConcepts } from '@/lib/recentMistakes'
import { useRecentMistakes } from '@/hooks/useRecentMistakes'
import { ConceptDetailModal } from '@/components/ConceptDetailModal'

// How many uncorrected misses feed the browser. Generous — the button promises
// everything you haven't fixed yet — but still bounded.
const MISTAKE_LIMIT = 100

interface Props {
  /** Mastery records already filtered to the active exam. */
  masteryRecords: ConceptMasteryRecord[]
  /** Active exam label (q.exam) — scopes mistakes to this exam. */
  examTopic: string
  /** Active exam syllabus — powers the browser's Syllabus tab. */
  syllabus?: WikiExamSyllabus
  /**
   * Sticky-header slot (a `display: contents` div in the pinned actions row).
   * When present, a compact copy of the button is portaled into it so the action
   * stays reachable once the full-size row has scrolled away. One component owns
   * both copies so the mistake query and the popup state aren't duplicated.
   */
  compactSlot?: HTMLElement | null
}

/**
 * Fix-mistakes action. Deliberately wordless: a label and an orange count of
 * what's still outstanding, styled as a light-red sibling of the Read concepts /
 * Start Quiz buttons it sits under. Tapping it opens the regular concept popup
 * (ConceptDetailModal) on its Questions tab, scoped to the concepts you've been
 * getting wrong — so the questions, quiz launch, and Previous/Next paging are the
 * same ones used everywhere else rather than a bespoke swipeable reader.
 *
 * Hides itself entirely when there's nothing outstanding to review.
 */
export function FixMistakesButton({ masteryRecords, examTopic, syllabus, compactSlot }: Props) {
  const { mistakes, loading } = useRecentMistakes(masteryRecords, examTopic, MISTAKE_LIMIT)
  const [open, setOpen] = useState(false)

  const concepts = useMemo(() => mistakeConcepts(mistakes), [mistakes])

  if (loading || concepts.length === 0) return null

  const top = concepts[0]!
  const outstandingLabel = `${mistakes.length} question${mistakes.length === 1 ? '' : 's'} still to fix`

  // Orange, matching the streak flame and the today's-quiz count: this is a
  // "still owed" number, not a neutral stat.
  const badge = (
    <span
      className="inline-flex items-center rounded-full bg-orange-500 px-1.5 py-0.5 text-[11px] font-bold leading-none text-white tabular-nums"
      aria-hidden="true"
    >
      {mistakes.length}
    </span>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Fix mistakes — ${outstandingLabel}`}
        className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-red-50 px-4 py-4 text-base font-semibold text-red-900 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-red-950 dark:text-red-100 dark:hover:bg-red-900/70"
      >
        <RotateCcw className="h-5 w-5 shrink-0" />
        Fix Mistakes
        {badge}
      </button>

      {/* Compact copy for the pinned exam-header row */}
      {compactSlot && createPortal(
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Fix mistakes — ${outstandingLabel}`}
          title={`Fix Mistakes — ${outstandingLabel}`}
          className="flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-red-50 px-3 text-sm font-semibold text-red-900 transition-colors hover:bg-red-100 dark:bg-red-950 dark:text-red-100 dark:hover:bg-red-900/70"
        >
          <RotateCcw className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Fix</span>
          {badge}
        </button>,
        compactSlot,
      )}

      {open && (
        <ConceptDetailModal
          conceptName={top.name}
          masteryState={top.state}
          onClose={() => setOpen(false)}
          syllabus={syllabus}
          allConcepts={concepts}
          conceptListLabel="Mistakes"
          initialTab="questions"
          initialQuestionFilter="attempted"
          quizFrom="dashboard"
        />
      )}
    </>
  )
}
