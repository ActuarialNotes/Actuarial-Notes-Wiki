import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import type { Question } from '@/lib/parser'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import { useRecentMistakes } from '@/hooks/useRecentMistakes'
import type { ProblemConcept, RecentMistake } from '@/lib/recentMistakes'

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
 * Recent-mistakes review card. Minimal by design: each row is a missed question
 * plus the one or two concepts most likely to blame (weighted by the learner's
 * miss-rate on that concept and its mastery level — see lib/recentMistakes.ts).
 * Tap a row to retry that question; "Retry all" launches a quiz of every listed
 * miss. Hides itself entirely when there's nothing to review.
 */
export function RecentMistakesCard({ masteryRecords, examTopic }: Props) {
  const navigate = useNavigate()
  const { mistakes, loading } = useRecentMistakes(masteryRecords, examTopic)

  const allIds = useMemo(() => mistakes.map(m => m.question.id), [mistakes])

  if (loading || mistakes.length === 0) return null

  return (
    <div className="rounded-lg bg-card text-card-foreground shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 p-5 pb-3">
        <RotateCcw className="h-4 w-4 shrink-0 text-primary" />
        <h2 className="text-sm font-bold tracking-tight">Review mistakes</h2>
        <span className="flex-1" />
        <button
          type="button"
          onClick={() => launchStoredQuiz(navigate, allIds)}
          className="shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors hover:bg-muted"
        >
          Retry all ({allIds.length})
        </button>
      </div>

      <ul className="px-5 pb-5 space-y-2.5">
        {mistakes.map(m => (
          <MistakeRow key={m.question.id} mistake={m} onRetry={() => launchStoredQuiz(navigate, [m.question.id])} />
        ))}
      </ul>
    </div>
  )
}

function MistakeRow({ mistake, onRetry }: { mistake: RecentMistake; onRetry: () => void }) {
  // Show the likely culprits: flagged concepts, or — if none cleared the bar —
  // the single top-ranked concept. Cap at two chips to stay minimal.
  const flagged = mistake.problemConcepts.filter(c => c.isProblem)
  const shown = (flagged.length > 0 ? flagged : mistake.problemConcepts.slice(0, 1)).slice(0, 2)

  return (
    <li>
      <button
        type="button"
        onClick={onRetry}
        className="group flex w-full items-center gap-3 rounded-lg p-2 -mx-2 text-left transition-colors hover:bg-muted/50"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{questionLabel(mistake.question)}</p>
          {shown.length > 0 && (
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              {shown.map(c => (
                <ConceptChip key={c.slug} concept={c} />
              ))}
            </div>
          )}
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
