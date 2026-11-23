import { useRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { MarkdownText } from '@/components/MarkdownText'
import { ANSWER_SOLID } from '@/lib/answerState'

interface AnswerOptionProps {
  optionKey: string    // "A", "B", "C", "D"
  text: string
  isSelected: boolean
  isCorrect: boolean
  isDisabled: boolean  // true after answer is confirmed
  revealAnswer: boolean
  onClick: (key: string) => void
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
  keyHint,
}: AnswerOptionProps) {
  // Prevent accidental selection when the user is scrolling over an option.
  // We track movement either way: if the pointer/touch moves more than 8px
  // between pointerdown and click, we treat it as a scroll gesture and ignore it.
  // Sideways counts too, since a formula wider than the row scrolls inside it.
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const scrolling = useRef(false)

  // The options are outlined rows (docs/redesign-spec.md §5.1): a 1.5px edge
  // in the line colour, the letter at the left. The picked row is filled with
  // the text colour. Once the answer is revealed the right row is filled green
  // and the reader's wrong one is outlined red and struck through
  // (lib/answerState.ts); nothing else on a screen takes those colours.
  const baseClasses =
    'w-full text-left px-4 py-3 min-h-[54px] text-[17px] sm:text-lg transition-colors flex items-center gap-3.5 rounded-[14px] border-[1.5px]'

  const revealedRight = isDisabled && revealAnswer && isCorrect
  const revealedWrong = isDisabled && revealAnswer && isSelected && !isCorrect
  // Chosen and not (yet) marked: before Check, or locked in with the answers
  // held back for the end.
  const picked = isSelected && !(isDisabled && revealAnswer)

  const stateClasses = cn({
    'border-foreground bg-foreground font-semibold text-ground': picked,
    'border-border hover:border-foreground cursor-pointer': !isDisabled && !isSelected,
    [`border-transparent font-bold ${ANSWER_SOLID.correct}`]: revealedRight,
    'border-answer-incorrect': revealedWrong,
    'border-border': isDisabled && !picked && !revealedRight && !revealedWrong,
    'cursor-pointer': !isDisabled,
    'cursor-default': isDisabled,
  })

  const letterClasses = 'w-[26px] shrink-0 text-[15px] font-bold'

  function handlePointerDown(e: React.PointerEvent) {
    touchStart.current = { x: e.clientX, y: e.clientY }
    scrolling.current = false
  }

  function handlePointerMove(e: React.PointerEvent) {
    const start = touchStart.current
    if (start && Math.max(Math.abs(e.clientX - start.x), Math.abs(e.clientY - start.y)) > 8) {
      scrolling.current = true
    }
  }

  function handleClick() {
    if (scrolling.current || isDisabled) return
    onClick(optionKey)
  }

  return (
    // div+role instead of button so block-level markdown (tables, paragraphs) is valid HTML
    <div
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      aria-pressed={isSelected}
      aria-label={`Option ${optionKey}`}
      data-sound="select"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (!isDisabled) onClick(optionKey)
        }
      }}
      className={cn(baseClasses, stateClasses)}
    >
      <span aria-hidden="true" className={letterClasses}>
        {optionKey}
      </span>
      {/* min-w-0 lets the text shrink below its content's width, so a formula
          wider than the row (one KaTeX can't break, like a bracket raised to a
          power) scrolls inside the option instead of widening the page. */}
      <MarkdownText
        inline
        className={cn(
          'flex-1 min-w-0 overflow-x-auto overflow-y-hidden py-0.5 [&_p]:my-0 [&_table]:text-sm [&_th]:text-left [&_td]:pr-3',
          revealedWrong && 'line-through',
        )}
      >
        {text}
      </MarkdownText>
      {keyHint && !isDisabled && (
        <kbd
          aria-hidden="true"
          className="hidden sm:flex shrink-0 h-6 min-w-[1.5rem] items-center justify-center rounded-md border border-border text-[13px] font-semibold px-1"
        >
          {keyHint}
        </kbd>
      )}
    </div>
  )
}

/** The run of answer options: outlined rows, 8px apart. */
export function AnswerList({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={cn('flex flex-col gap-2', rest.className)}>
      {children}
    </div>
  )
}
