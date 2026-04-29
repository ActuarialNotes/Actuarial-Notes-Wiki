import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { MarkdownText } from '@/components/MarkdownText'

interface AnswerOptionProps {
  optionKey: string    // "A", "B", "C", "D"
  text: string
  isSelected: boolean
  isCorrect: boolean
  isDisabled: boolean  // true after answer is confirmed
  revealAnswer: boolean
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
  // Prevent accidental selection when the user is scrolling over an option.
  // We track vertical movement: if the pointer/touch moves more than 8px
  // between pointerdown and click, we treat it as a scroll gesture and ignore it.
  const touchStartY = useRef<number | null>(null)
  const scrolling = useRef(false)

  const baseClasses =
    'w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex items-start gap-3'

  const stateClasses = cn({
    // Pending selection (chosen but not yet confirmed) — clear highlight
    'border-primary bg-primary/15 dark:bg-primary/25 ring-2 ring-primary/40':
      !isDisabled && isSelected,

    // Unselected and available — hoverable
    'border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer':
      !isDisabled && !isSelected,

    // Confirmed correct
    'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100 dark:border-green-500 cursor-default':
      isDisabled && isSelected && isCorrect && revealAnswer,

    // Confirmed wrong
    'border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100 dark:border-red-500 cursor-default':
      isDisabled && isSelected && !isCorrect && revealAnswer,

    // Confirmed, answer not yet revealed (mock exam / end-reveal)
    'border-primary bg-primary/15 dark:bg-primary/25 cursor-default':
      isDisabled && isSelected && !revealAnswer,

    // Not selected, but correct (revealed)
    'border-green-400 bg-green-50/50 text-green-800 dark:bg-green-950/50 dark:text-green-300 dark:border-green-600 cursor-default':
      isDisabled && !isSelected && isCorrect && revealAnswer,

    // Not selected, disabled — muted
    'border-input bg-muted/40 text-muted-foreground opacity-60 cursor-default':
      isDisabled && !isSelected && (!isCorrect || !revealAnswer),
  })

  function handlePointerDown(e: React.PointerEvent) {
    touchStartY.current = e.clientY
    scrolling.current = false
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (touchStartY.current !== null && Math.abs(e.clientY - touchStartY.current) > 8) {
      scrolling.current = true
    }
  }

  function handleClick() {
    if (isDisabled || scrolling.current) return
    onClick(optionKey)
  }

  return (
    // div+role instead of button so block-level markdown (tables, paragraphs) is valid HTML
    <div
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      aria-label={`Option ${optionKey}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
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
