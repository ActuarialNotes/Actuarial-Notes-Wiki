import { useState } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { MarkdownText } from '@/components/MarkdownText'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { initialOrder, moveItem, orderingLetters, type OrderingLayout } from '@/lib/questionLayout'

interface OrderingQuestionProps {
  layout: OrderingLayout
  /** The arrangement chosen so far, as the letter string the answer is graded on. */
  answer: string | null
  correctAnswer: string
  isLocked: boolean
  showExplanation: boolean
  onAnswer: (letters: string) => void
}

/**
 * An ordering question: the items as a list the reader rearranges, each move
 * sending the arrangement as the letters a typed answer would be. The parent
 * keys it on the question, so a new question starts from its own order.
 */
export function OrderingQuestion({ layout, answer, correctAnswer, isLocked, showExplanation, onAnswer }: OrderingQuestionProps) {
  const [draft, setDraft] = useState<string[]>(() => initialOrder(layout, answer))
  const order = isLocked ? initialOrder(layout, answer) : draft
  const textOf = new Map(layout.items.map(i => [i.key, i.text]))
  const correct = orderingLetters(correctAnswer)
  const revealed = isLocked && showExplanation && !!answer

  function move(from: number, to: number) {
    const next = moveItem(draft, from, to)
    setDraft(next)
    onAnswer(next.join(''))
  }

  return (
    <div className="space-y-3">
      <ol aria-label="Items to put in order" className="space-y-2">
        {order.map((key, idx) => {
          const inPlace = correct[idx] === key
          return (
            <li
              key={key}
              className={cn(
                'flex items-start gap-3 rounded-xl px-3 py-2.5',
                !revealed && 'bg-muted/40',
                revealed && inPlace && 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
                revealed && !inPlace && 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
              )}
            >
              <span className="flex-shrink-0 w-5 pt-1 text-sm font-semibold tabular-nums text-muted-foreground">{idx + 1}.</span>
              <span aria-hidden="true" className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                {key}
              </span>
              <MarkdownText inline className="flex-1 pt-0.5 text-base [&_p]:my-0">{textOf.get(key) ?? ''}</MarkdownText>
              {!isLocked && (
                <span className="flex flex-shrink-0 gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    aria-label={`Move ${key} up`}
                    disabled={idx === 0}
                    onClick={() => move(idx, idx - 1)}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    aria-label={`Move ${key} down`}
                    disabled={idx === order.length - 1}
                    onClick={() => move(idx, idx + 1)}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </span>
              )}
              {revealed && (
                <span className="flex-shrink-0 pt-1 text-sm font-medium">{inPlace ? '✓' : '✗'}</span>
              )}
            </li>
          )
        })}
      </ol>

      {/* Nothing sends an answer until an item moves, so a reader who thinks
          the list is already in order needs a way to say so. */}
      {!isLocked && !answer && (
        <Button type="button" variant="outline" size="sm" onClick={() => onAnswer(draft.join(''))}>
          Keep this order
        </Button>
      )}

      {revealed && orderingLetters(answer).join('') !== correct.join('') && (
        <p className="text-sm text-muted-foreground">
          Correct order: <span className="font-semibold text-foreground">{correct.join(' → ')}</span>
        </p>
      )}
    </div>
  )
}
