import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CheckMark } from '@/components/CheckMark'
import { CRAFT_RELATIONS, NO_LINK, type RelationChoice, type RelationQuestion } from '@/lib/conceptCraft'
import { cn } from '@/lib/utils'

/**
 * **Mastery mode's prompt** — "How does A relate to B?" — asked of every pair
 * dropped together in Mastery mode, related or not (`relationQuestion` in
 * `lib/conceptCraft.ts` says why). A right answer crafts; a wrong one crafts
 * nothing and says only whether the two combine at all, never how — telling
 * the relation would turn the prompt into a free reveal on the next drop.
 */
export interface RelationPromptProps {
  a: string
  b: string
  question: RelationQuestion
  /** Called once, with the verdict, when a choice is made. */
  onAnswer: (right: boolean) => void
  /** Leave — after a verdict, or instead of answering. */
  onClose: () => void
}

export function RelationPrompt({ a, b, question, onAnswer, onClose }: RelationPromptProps) {
  const [picked, setPicked] = useState<RelationChoice['id'] | null>(null)
  const firstRef = useRef<HTMLButtonElement>(null)
  const right = picked !== null && picked === question.answer

  useEffect(() => { firstRef.current?.focus() }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const choose = (id: RelationChoice['id']) => {
    if (picked !== null) return
    setPicked(id)
    onAnswer(id === question.answer)
  }

  const related = question.answer !== NO_LINK
  const verdict = picked === null
    ? null
    : right
      ? related
        ? `Right — ${a} ${CRAFT_RELATIONS[question.answer as keyof typeof CRAFT_RELATIONS].label.toLowerCase()} ${b}.`
        : 'Right — these two don’t combine directly.'
      : related
        ? 'Not quite. These two do combine — read up on them and try the pair again.'
        : 'Not quite — these two don’t combine directly.'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm paper-scrim"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="craft-prompt-title"
        className="relative flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-card p-6 text-card-foreground shadow-2xl"
        data-testid="craft-prompt"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <h2 id="craft-prompt-title" className="pr-6 text-base font-semibold leading-snug">
          How does <span className="underline decoration-border underline-offset-4">{a}</span> relate to{' '}
          <span className="underline decoration-border underline-offset-4">{b}</span>?
        </h2>
        <div className="flex flex-col gap-2" role="group" aria-label="Relationships">
          {question.choices.map((choice, i) => {
            const isPicked = picked === choice.id
            const isAnswer = picked !== null && choice.id === question.answer && right
            return (
              <button
                key={choice.id}
                ref={i === 0 ? firstRef : undefined}
                type="button"
                disabled={picked !== null}
                onClick={() => choose(choice.id)}
                // The verdict has its own cue (or none, for a miss).
                data-sound="none"
                className={cn(
                  'flex min-h-11 items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  picked === null && 'bg-muted/60 hover:bg-accent',
                  isAnswer && 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
                  isPicked && !right && 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
                  picked !== null && !isPicked && !isAnswer && 'bg-muted/40 text-muted-foreground',
                  choice.id === NO_LINK && picked === null && 'italic',
                )}
                data-testid="craft-choice"
              >
                <span className="flex-1">{choice.label}</span>
                {isAnswer && <CheckMark className="h-4 w-4" />}
              </button>
            )
          })}
        </div>
        {verdict && (
          <p role="status" className={cn('text-sm', right ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground')}>
            {verdict}
          </p>
        )}
        {picked !== null && (
          <Button variant={right ? 'default' : 'outline'} onClick={onClose} autoFocus>
            {right && related ? 'See what it makes' : 'Back to the board'}
          </Button>
        )}
      </div>
    </div>
  )
}
