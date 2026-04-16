import { cn } from '@/lib/utils'
import { LatexText } from '@/components/LatexText'

interface AnswerOptionProps {
  optionKey: string    // "A", "B", "C", "D"
  text: string
  isSelected: boolean
  isCorrect: boolean   // is this option the correct answer?
  isDisabled: boolean  // true after any answer is chosen
  onClick: (key: string) => void
}

export function AnswerOption({
  optionKey,
  text,
  isSelected,
  isCorrect,
  isDisabled,
  onClick,
}: AnswerOptionProps) {
  const baseClasses =
    'w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex items-start gap-3'

  const stateClasses = cn({
    // Not yet answered — hoverable
    'border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer':
      !isDisabled,

    // Selected and correct
    'border-green-500 bg-green-50 text-green-900 cursor-default':
      isDisabled && isSelected && isCorrect,

    // Selected but wrong
    'border-red-500 bg-red-50 text-red-900 cursor-default':
      isDisabled && isSelected && !isCorrect,

    // Not selected, but this is the correct answer being revealed
    'border-green-400 bg-green-50/50 text-green-800 cursor-default':
      isDisabled && !isSelected && isCorrect,

    // Not selected, not correct, disabled — muted
    'border-input bg-muted/40 text-muted-foreground opacity-60 cursor-default':
      isDisabled && !isSelected && !isCorrect,
  })

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => !isDisabled && onClick(optionKey)}
      className={cn(baseClasses, stateClasses)}
    >
      <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
        {optionKey}
      </span>
      <span className="flex-1"><LatexText>{text}</LatexText></span>
    </button>
  )
}
