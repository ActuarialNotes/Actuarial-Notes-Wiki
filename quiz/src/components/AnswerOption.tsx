import { useRef, type HTMLAttributes } from 'react'
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
  onNext?: () => void  // when locked, clicking any option advances to next question
  keyHint?: string     // keyboard shortcut hint, e.g. "1"
}

export function AnswerOption({
  optionKey,
  text,
  isSelected,
  isCorrect,
  isDisabled,
  revealAnswer,
  onClick,
  onNext,
  keyHint,
}: AnswerOptionProps) {
  // Prevent accidental selection when the user is scrolling over an option.
  // We track vertical movement: if the pointer/touch moves more than 8px
  // between pointerdown and click, we treat it as a scroll gesture and ignore it.
  const touchStartY = useRef<number | null>(null)
  const scrolling = useRef(false)

  // The options are a ruled list on the page, not tiles on a card: each row is
  // bare, a hairline under it (AnswerList draws the one above the first), and
  // only a row that means something gets a fill — the chosen one goes solid in
  // the pick (Ink, style guide §7.0), and once the answer is revealed the right
  // and wrong rows take their state tints. A filled row is rounded and its
  // hairline goes transparent, so the fill reads as a pill lying over the rules.
  // AnswerList pulls the run out a little either side (`-mx-3`) and each row
  // pads back in, so the letters stay on the stem's left edge while a fill
  // reaches a little past it.
  const baseClasses =
    'w-full text-left px-3 py-3.5 min-h-[56px] text-base font-medium transition-colors flex items-start gap-4 border-b'

  const isNavigable = isDisabled && !!onNext

  const revealedRight = isDisabled && revealAnswer && isCorrect
  const revealedWrong = isDisabled && revealAnswer && isSelected && !isCorrect
  // Chosen and not (yet) marked: before Confirm, or confirmed with the answers
  // held back for the end.
  const picked = isSelected && !(isDisabled && revealAnswer)
  const filled = picked || revealedRight || revealedWrong

  const stateClasses = cn(filled ? 'rounded-xl border-transparent' : 'border-border', {
    'bg-pick text-pick-foreground': picked,

    // Unselected and available — hoverable
    'hover:bg-accent/60 cursor-pointer': !isDisabled && !isSelected,

    // Confirmed correct
    'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100':
      revealedRight && isSelected,

    // Not selected, but correct (revealed)
    'bg-green-50/50 text-green-800 dark:bg-green-950/50 dark:text-green-300':
      revealedRight && !isSelected,

    // Confirmed wrong
    'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100': revealedWrong,

    // Not selected, disabled — muted
    'text-muted-foreground opacity-60':
      isDisabled && !isSelected && (!isCorrect || !revealAnswer),

    // Cursor: pointer when interactive
    'cursor-pointer': !isDisabled || isNavigable,
    'cursor-default': isDisabled && !isNavigable,

    // Subtle hover/active feedback when locked but clickable to navigate
    'hover:opacity-80 active:opacity-60': isNavigable,
  })

  // The letter: a ring at rest, a solid disc on the chosen row (the pick's
  // colours swapped, so it reads on the pill), the row's own colour once marked.
  const letterClasses = cn(
    'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-semibold',
    picked
      ? 'bg-pick-foreground text-pick'
      : filled
        ? 'border-[1.5px] border-current'
        : 'border-[1.5px] border-muted-foreground/50 text-muted-foreground',
  )

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
    if (scrolling.current) return
    if (isDisabled) {
      onNext?.()
      return
    }
    onClick(optionKey)
  }

  return (
    // div+role instead of button so block-level markdown (tables, paragraphs) is valid HTML
    <div
      role="button"
      tabIndex={isDisabled && !isNavigable ? -1 : 0}
      aria-disabled={isDisabled && !isNavigable}
      aria-label={`Option ${optionKey}`}
      data-sound="select"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (isDisabled) {
            onNext?.()
          } else {
            onClick(optionKey)
          }
        }
      }}
      className={cn(baseClasses, stateClasses)}
    >
      <span aria-hidden="true" className={letterClasses}>
        {optionKey}
      </span>
      <MarkdownText
        inline
        className="flex-1 pt-0.5 [&_p]:my-0 [&_table]:text-sm [&_th]:text-left [&_td]:pr-3"
      >
        {text}
      </MarkdownText>
      {keyHint && !isDisabled && (
        <kbd
          aria-hidden="true"
          className="hidden sm:flex self-start mt-1 shrink-0 h-5 min-w-[1.25rem] items-center justify-center rounded border border-border bg-muted/70 text-[10px] font-mono font-semibold text-muted-foreground/70 px-1"
        >
          {keyHint}
        </kbd>
      )}
    </div>
  )
}

/**
 * The run of answer options: a ruled list, the hairline over the first row
 * drawn here so every row only owns the one beneath it.
 */
export function AnswerList({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={cn('-mx-3 border-t border-border', rest.className)}>
      {children}
    </div>
  )
}
