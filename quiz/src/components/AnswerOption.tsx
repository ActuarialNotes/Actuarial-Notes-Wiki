import { cn } from '@/lib/utils'
import { MarkdownText } from '@/components/MarkdownText'

interface AnswerOptionProps {
  optionKey: string    // "A", "B", "C", "D"
  text: string
  isSelected: boolean
  isCorrect: boolean   // is this option the correct answer?
  isDisabled: boolean  // true after answer is confirmed
  revealAnswer: boolean  // true when correct/wrong should be shown (quiz+reveal=during only)
  onClick: (key: string) => void
}

export function AnswerOption({
  optionKey,
  text,
  isSelected,
  isCorrect,
  isDisabled,
  revealAnswer,
  onClick,
}: AnswerOptionProps) {
  const baseClasses =
    'w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex items-start gap-3'

  const stateClasses = cn({
    // Not yet answered — hoverable
    'border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer':
      !isDisabled,

    // Selected and correct (answer revealed)
    'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100 dark:border-green-500 cursor-default':
      isDisabled && isSelected && isCorrect && revealAnswer,

    // Selected but wrong (answer revealed)
    'border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100 dark:border-red-500 cursor-default':
      isDisabled && isSelected && !isCorrect && revealAnswer,

    // Selected, answer not yet revealed (mock exam / end-reveal) — neutral highlight
    'border-primary bg-primary/15 dark:bg-primary/25 cursor-default':
      isDisabled && isSelected && !revealAnswer,

    // Not selected, but this is the correct answer being revealed
    'border-green-400 bg-green-50/50 text-green-800 dark:bg-green-950/50 dark:text-green-300 dark:border-green-600 cursor-default':
      isDisabled && !isSelected && isCorrect && revealAnswer,

    // Not selected, disabled — muted (covers: wrong+disabled, or correct-but-not-revealed)
    'border-input bg-muted/40 text-muted-foreground opacity-60 cursor-default':
      isDisabled && !isSelected && (!isCorrect || !revealAnswer),
  })

  return (
    // div+role instead of button so block-level markdown (tables, paragraphs) is valid HTML
    <div
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      aria-label={`Option ${optionKey}`}
      onClick={() => !isDisabled && onClick(optionKey)}
      onKeyDown={e => {
        if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick(optionKey)
        }
      }}
      className={cn(baseClasses, stateClasses)}
    >
      <span aria-hidden="true" className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold mt-0.5">
        {optionKey}
      </span>
      <MarkdownText
        inline
        className="flex-1 [&_p]:my-0 [&_table]:text-xs [&_th]:text-left [&_td]:pr-3"
      >
        {text}
      </MarkdownText>
    </div>
  )
}
