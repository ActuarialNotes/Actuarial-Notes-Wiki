// The list of questions behind the exam-history graph: every question the
// learner has actually attempted for this concept, newest attempt first, each
// row carrying its own attempt tally. Clicking a dot on the graph filters this
// list down to the single question that attempt answered.

import { useMemo } from 'react'
import { X } from 'lucide-react'
import type { Question } from '@/lib/parser'
import type { AttemptedQuestionSummary } from '@/lib/learningHistory'
import { QuestionSearchRow } from '@/components/QuestionSearchRow'

interface AttemptedQuestionsListProps {
  /** Every question linked to the concept — the pool the attempts resolve against. */
  questions: Question[]
  /** Per-question attempt tallies, already ordered newest attempt first. */
  summaries: AttemptedQuestionSummary[]
  /** Question the graph selection has narrowed the list to, if any. */
  selectedQuestionId: string | null
  onClearSelection: () => void
}

export function AttemptedQuestionsList({
  questions,
  summaries,
  selectedQuestionId,
  onClearSelection,
}: AttemptedQuestionsListProps) {
  const questionById = useMemo(
    () => new Map(questions.map(q => [q.id, q])),
    [questions],
  )

  // A response can outlive its question (a question renamed or dropped from the
  // bank), so rows are only built for attempts we can still resolve.
  const rows = useMemo(
    () =>
      summaries
        .map(summary => ({ summary, question: questionById.get(summary.questionId) }))
        .filter((row): row is { summary: AttemptedQuestionSummary; question: Question } => !!row.question),
    [summaries, questionById],
  )

  if (rows.length === 0) return null

  const visibleRows = selectedQuestionId
    ? rows.filter(r => r.summary.questionId === selectedQuestionId)
    : rows

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold">Attempted questions</h3>
        <span className="text-xs text-muted-foreground tabular-nums">
          {selectedQuestionId ? `${visibleRows.length} of ${rows.length}` : rows.length}
        </span>
        {selectedQuestionId && (
          <button
            type="button"
            onClick={onClearSelection}
            className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-muted transition-colors"
          >
            <X className="h-3 w-3" />
            Clear filter
          </button>
        )}
      </div>

      {visibleRows.length === 0 ? (
        <p className="text-xs text-muted-foreground py-2">
          That attempt's question is no longer in the question bank.
        </p>
      ) : (
        <div className="rounded-lg bg-muted/30 divide-y divide-border/60">
          {visibleRows.map(({ question, summary }) => (
            <QuestionSearchRow
              key={question.id}
              question={question}
              query=""
              attemptSummary={summary}
              attemptsTracked
            />
          ))}
        </div>
      )}

      {!selectedQuestionId && (
        <p className="text-xs text-muted-foreground text-center">
          Click a dot on the graph to see just that question
        </p>
      )}
    </div>
  )
}
