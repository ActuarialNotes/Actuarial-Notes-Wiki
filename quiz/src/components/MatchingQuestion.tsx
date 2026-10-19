import { MarkdownText, READING_MD_CLASS } from '@/components/MarkdownText'
import { ExaminerReportCard } from '@/components/AnswerReference'
import { cn } from '@/lib/utils'
import type { MatchingLayout } from '@/lib/questionLayout'

interface MatchingQuestionProps {
  layout: MatchingLayout
  /** The letter picked for each item, keyed by part label. */
  answers: Record<string, string>
  isLocked: boolean
  showExplanation: boolean
  onPick: (label: string, key: string) => void
  conceptNames?: readonly string[]
}

/**
 * A matching question: the option list once, then each item with a row of
 * letters to pick from. Each item is still a part of a multi-part question, so
 * the answer, the grading and the partial credit are the parts'.
 */
export function MatchingQuestion({ layout, answers, isLocked, showExplanation, onPick, conceptNames }: MatchingQuestionProps) {
  const { options, items } = layout

  return (
    <div className="space-y-4">
      <ul aria-label="Options" className="grid gap-2 sm:grid-cols-2">
        {options.map(option => (
          <li key={option.key} className="flex items-start gap-3 rounded-xl bg-muted/40 px-3 py-2.5">
            <span aria-hidden="true" className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
              {option.key}
            </span>
            <MarkdownText inline className="flex-1 pt-0.5 text-base [&_p]:my-0">{option.text}</MarkdownText>
          </li>
        ))}
      </ul>

      <ol className="space-y-3">
        {items.map((item, idx) => {
          const chosen = answers[item.label] ?? ''
          const answered = isLocked && chosen !== ''
          const revealed = showExplanation && isLocked
          const right = chosen === item.answer
          return (
            <li key={item.label} className="rounded-xl border border-border p-3 sm:p-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-muted-foreground">{idx + 1}.</span>
                <MarkdownText className={cn(READING_MD_CLASS, 'flex-1 text-base')} conceptNames={conceptNames}>
                  {item.stem}
                </MarkdownText>
                {revealed && (
                  <span className={cn(
                    'flex-shrink-0 text-sm font-medium',
                    answered && right ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
                  )}>
                    {answered && right ? '✓' : '✗'}
                  </span>
                )}
              </div>

              <div role="radiogroup" aria-label={`Match for item ${idx + 1}`} className="flex flex-wrap gap-2 pl-6">
                {options.map(option => {
                  const selected = chosen === option.key
                  const isKey = item.answer === option.key
                  return (
                    <button
                      key={option.key}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={`Option ${option.key}`}
                      data-sound="select"
                      disabled={isLocked}
                      onClick={() => onPick(item.label, option.key)}
                      className={cn(
                        'h-10 min-w-10 px-3 rounded-full text-sm font-bold transition-colors',
                        !isLocked && selected && 'bg-primary/15 dark:bg-primary/25 ring-2 ring-primary/40',
                        !isLocked && !selected && 'bg-muted/40 hover:bg-accent hover:text-accent-foreground',
                        isLocked && !revealed && selected && 'bg-primary/15 dark:bg-primary/25',
                        isLocked && revealed && selected && isKey && 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
                        isLocked && revealed && selected && !isKey && 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100',
                        isLocked && revealed && !selected && isKey && 'ring-2 ring-green-500/70 text-green-800 dark:text-green-300',
                        isLocked && !selected && !(revealed && isKey) && 'bg-muted/40 text-muted-foreground opacity-60',
                      )}
                    >
                      {option.key}
                    </button>
                  )
                })}
              </div>

              {revealed && (item.explanation || !right) && (
                <div className={cn(
                  'rounded-xl p-3 space-y-1 text-sm',
                  answered && right ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950',
                )}>
                  {!right && (
                    <p className="text-muted-foreground text-xs">
                      Correct match: <span className="font-semibold text-foreground">{item.answer}</span>
                    </p>
                  )}
                  {item.explanation && <MarkdownText className={READING_MD_CLASS}>{item.explanation}</MarkdownText>}
                </div>
              )}
              {revealed && item.examiner_report && <ExaminerReportCard markdown={item.examiner_report} />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
