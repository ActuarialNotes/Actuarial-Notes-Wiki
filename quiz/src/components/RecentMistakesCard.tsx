import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import type { Question } from '@/lib/parser'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import { useRecentMistakes } from '@/hooks/useRecentMistakes'
import type { ProblemConcept, RecentMistake } from '@/lib/recentMistakes'
import { FlipInsightCard, InsightBrowserModal } from '@/components/DashboardInsightCard'

const SELECTED_IDS_KEY = 'actuarial_selected_ids'

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

// Reduce a question stem to a single plain-text line for a compact label:
// drop images/wiki-links, LaTeX delimiters, and markdown emphasis, then collapse
// whitespace. Falls back to the topic when the stem is empty.
function questionLabel(q: Question): string {
  const text = (q.stem || q.topic || 'Question')
    .replace(/!?\[\[[^\]]*\]\]/g, ' ')      // ![[img]] / [[wiki links]]
    .replace(/\$\$?/g, ' ')                  // $ / $$ math delimiters
    .replace(/[#>*_`~]/g, ' ')               // markdown punctuation
    .replace(/\s+/g, ' ')
    .trim()
  return text || q.topic || 'Question'
}

interface Props {
  /** Mastery records already filtered to the active exam. */
  masteryRecords: ConceptMasteryRecord[]
  /** Active exam label (q.exam) — scopes mistakes to this exam. */
  examTopic: string
}

/**
 * Recent-mistakes card. A compact flip card: the front shows the single most
 * recent missed question; flipping it reveals "Try Again" (retries just that
 * question) and "See all recent mistakes" (opens a browser of every miss, each
 * tagged with the one or two concepts most likely to blame — see
 * lib/recentMistakes.ts). Hides itself entirely when there's nothing to review.
 */
export function RecentMistakesCard({ masteryRecords, examTopic }: Props) {
  const navigate = useNavigate()
  const { mistakes, loading } = useRecentMistakes(masteryRecords, examTopic, 30)
  const [browserOpen, setBrowserOpen] = useState(false)

  const allIds = useMemo(() => mistakes.map(m => m.question.id), [mistakes])

  if (loading || mistakes.length === 0) return null

  const top = mistakes[0]!
  const icon = <RotateCcw className="h-4 w-4 shrink-0 text-primary" />

  return (
    <>
      <FlipInsightCard
        icon={icon}
        title="Recent Mistakes"
        count={mistakes.length}
        front={
          <div className="min-w-0">
            <p className="line-clamp-2 text-sm font-semibold leading-snug">{questionLabel(top.question)}</p>
            <MistakeChips mistake={top} className="mt-1.5" />
          </div>
        }
        primaryLabel="Try Again"
        onPrimary={() => launchStoredQuiz(navigate, [top.question.id])}
        seeAllLabel="See all recent mistakes"
        onSeeAll={() => setBrowserOpen(true)}
      />

      {browserOpen && (
        <InsightBrowserModal
          title="Recent Mistakes"
          icon={icon}
          onClose={() => setBrowserOpen(false)}
          actionLabel={allIds.length > 1 ? `Retry all (${allIds.length})` : undefined}
          onAction={allIds.length > 1 ? () => launchStoredQuiz(navigate, allIds) : undefined}
        >
          <ul className="space-y-2.5">
            {mistakes.map(m => (
              <MistakeRow key={m.question.id} mistake={m} onRetry={() => launchStoredQuiz(navigate, [m.question.id])} />
            ))}
          </ul>
        </InsightBrowserModal>
      )}
    </>
  )
}

// The likely culprits for a miss: flagged concepts, or — if none cleared the bar —
// the single top-ranked concept. Cap at two chips to stay minimal.
function shownConcepts(mistake: RecentMistake): ProblemConcept[] {
  const flagged = mistake.problemConcepts.filter(c => c.isProblem)
  return (flagged.length > 0 ? flagged : mistake.problemConcepts.slice(0, 1)).slice(0, 2)
}

function MistakeChips({ mistake, className = '' }: { mistake: RecentMistake; className?: string }) {
  const shown = shownConcepts(mistake)
  if (shown.length === 0) return null
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {shown.map(c => (
        <ConceptChip key={c.slug} concept={c} />
      ))}
    </div>
  )
}

function MistakeRow({ mistake, onRetry }: { mistake: RecentMistake; onRetry: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onRetry}
        className="group flex w-full items-center gap-3 rounded-lg p-2 -mx-2 text-left transition-colors hover:bg-muted/50"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{questionLabel(mistake.question)}</p>
          <MistakeChips mistake={mistake} className="mt-1" />
        </div>
        <RotateCcw className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      </button>
    </li>
  )
}

function ConceptChip({ concept }: { concept: ProblemConcept }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
        concept.isProblem
          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
          : 'bg-muted text-muted-foreground'
      }`}
      title={weaknessTitle(concept.state)}
    >
      {concept.isProblem && <AlertTriangle className="h-3 w-3 shrink-0" />}
      <span className="truncate max-w-[10rem]">{concept.name}</span>
    </span>
  )
}

const STATE_LABEL: Record<MasteryState, string> = {
  new: 'New',
  level1: 'Level 1',
  level2: 'Level 2',
  level3: 'Level 3',
  forgotten: 'Forgotten',
}

function weaknessTitle(state: MasteryState): string {
  return `Mastery: ${STATE_LABEL[state]}`
}
