import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { useRecentMistakes } from '@/hooks/useRecentMistakes'
import { RecentMistakesModal } from '@/components/RecentMistakesModal'

const SELECTED_IDS_KEY = 'actuarial_selected_ids'

// How many uncorrected misses the reader can page through. Generous — the card
// promises "every question you haven't fixed yet" — but still bounded.
const MISTAKE_LIMIT = 100

// Concept names shown on the card face before collapsing into "+N more".
const MAX_FACE_CONCEPTS = 3

// Launch a quiz of specific question ids via the shared selection=stored seam
// (same as MasteryAnalyticsCard) — keeps the URL small for multi-question sets.
function launchStoredQuiz(navigate: ReturnType<typeof useNavigate>, ids: string[]) {
  if (ids.length === 0) return
  try {
    sessionStorage.setItem(SELECTED_IDS_KEY, JSON.stringify(ids))
  } catch {
    /* ignore quota/private-mode errors */
  }
  const params = new URLSearchParams({
    selection: 'stored',
    mode: 'quiz',
    reveal: 'during',
    count: String(ids.length),
    from: 'dashboard',
  })
  navigate(`/quiz?${params.toString()}`)
}

interface Props {
  /** Mastery records already filtered to the active exam. */
  masteryRecords: ConceptMasteryRecord[]
  /** Active exam label (q.exam) — scopes mistakes to this exam. */
  examTopic: string
}

/**
 * Recent-mistakes card. The face says one thing: the concept(s) behind the most
 * recent question you got wrong, plus how many you've since corrected. Tapping
 * anywhere opens the reader (RecentMistakesModal), where every still-uncorrected
 * miss can be paged through and retried one question at a time.
 *
 * It deliberately carries no in-card actions — the earlier version squeezed a
 * question stem, warning chips, a "Try Again" pill and a "See all" strip into a
 * half-width tile, which read as noise at that size. Hides itself entirely when
 * there's nothing outstanding to review.
 */
export function RecentMistakesCard({ masteryRecords, examTopic }: Props) {
  const navigate = useNavigate()
  const { mistakes, correctedCount, loading } = useRecentMistakes(masteryRecords, examTopic, MISTAKE_LIMIT)
  const [open, setOpen] = useState(false)

  if (loading || mistakes.length === 0) return null

  const latest = mistakes[0]!
  const concepts = latest.problemConcepts.map(c => c.name)
  const shown = concepts.slice(0, MAX_FACE_CONCEPTS)
  const hidden = concepts.length - shown.length

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
          {/* "Mistakes", not "Recent Mistakes": the longer title truncates next
              to the count pill at this card's half-width size. */}
          <h2 className="truncate text-sm font-semibold tracking-tight">Mistakes</h2>
          <span className="ml-0.5 rounded-full bg-muted px-1.5 py-0.5 text-xs font-semibold tabular-nums text-muted-foreground">
            {mistakes.length}
          </span>
        </div>

        {/* Face — just the concepts behind the latest miss */}
        <div className="mt-2 flex-1 space-y-1">
          {shown.map(name => (
            <p key={name} className="line-clamp-2 text-sm font-medium leading-snug">
              {name}
            </p>
          ))}
          {hidden > 0 && <p className="text-xs text-muted-foreground">+{hidden} more</p>}
        </div>

        {/* Footer — progress on the ones already fixed */}
        <div className="-mx-4 -mb-4 mt-2 flex items-center justify-between gap-2 rounded-b-lg border-t border-border px-4 py-2.5 text-xs font-medium text-muted-foreground">
          <span className="flex min-w-0 items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate tabular-nums">{correctedCount} corrected</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </div>
      </button>

      {open && (
        <RecentMistakesModal
          mistakes={mistakes}
          onClose={() => setOpen(false)}
          onRetry={id => launchStoredQuiz(navigate, [id])}
        />
      )}
    </>
  )
}
