import { useMemo, useState } from 'react'
import { CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { mistakeConcepts } from '@/lib/recentMistakes'
import { useRecentMistakes } from '@/hooks/useRecentMistakes'
import { ConceptDetailModal } from '@/components/ConceptDetailModal'

// How many uncorrected misses feed the browser. Generous — the card promises
// everything you haven't fixed yet — but still bounded.
const MISTAKE_LIMIT = 100

interface Props {
  /** Mastery records already filtered to the active exam. */
  masteryRecords: ConceptMasteryRecord[]
  /** Active exam label (q.exam) — scopes mistakes to this exam. */
  examTopic: string
  /** Active exam syllabus — powers the browser's Syllabus tab. */
  syllabus?: WikiExamSyllabus
}

/**
 * Fix-mistakes card. The face is deliberately near-wordless: a title, an orange
 * count of what's still outstanding, and the single concept behind your latest
 * miss. Tapping it opens the regular concept popup (ConceptDetailModal) on its
 * Questions tab, scoped to the concepts you've been getting wrong — so the
 * questions, quiz launch, and Previous/Next paging are the same ones used
 * everywhere else rather than a bespoke swipeable reader.
 *
 * Hides itself entirely when there's nothing outstanding to review.
 */
export function RecentMistakesCard({ masteryRecords, examTopic, syllabus }: Props) {
  const { mistakes, correctedCount, loading } = useRecentMistakes(masteryRecords, examTopic, MISTAKE_LIMIT)
  const [open, setOpen] = useState(false)

  const concepts = useMemo(() => mistakeConcepts(mistakes), [mistakes])

  if (loading || concepts.length === 0) return null

  const top = concepts[0]!
  const outstandingLabel = `${mistakes.length} question${mistakes.length === 1 ? '' : 's'} still to fix`

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-full min-h-44 w-full flex-col rounded-lg bg-card p-4 text-left text-card-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {/* Header — icon + title + outstanding count */}
        <div className="flex items-center gap-1.5">
          <RotateCcw className="h-4 w-4 shrink-0 text-primary" />
          <h2 className="truncate text-sm font-semibold tracking-tight">Fix Mistakes</h2>
          {/* Orange, matching the streak flame and the today's-quiz count: this
              is a "still owed" number, not a neutral stat. */}
          <span
            className="ml-0.5 inline-flex items-center rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white tabular-nums"
            aria-label={outstandingLabel}
            title={outstandingLabel}
          >
            {mistakes.length}
          </span>
        </div>

        {/* Face — just the concept behind the latest miss */}
        <div className="mt-2 flex-1">
          <p className="line-clamp-3 text-sm font-medium leading-snug">{top.name}</p>
        </div>

        {/* Footer — how many are already fixed, as a bare count */}
        <div className="-mx-4 -mb-4 mt-2 flex items-center justify-between gap-2 rounded-b-lg border-t border-border px-4 py-2.5 text-xs font-medium text-muted-foreground">
          <span
            className="flex min-w-0 items-center gap-1.5"
            aria-label={`${correctedCount} corrected`}
            title={`${correctedCount} corrected`}
          >
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span className="tabular-nums">{correctedCount}</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </div>
      </button>

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
