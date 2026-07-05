// Pre-quiz collection gate. Shown inside the Quiz page (the "quiz environment")
// before the questions when the session covers concepts that are still New and
// uncollected. Collecting a concept is the gate to advancing it from New → Level 1
// (see docs/flashcard-collection.md), so surfacing the collect prompt up front
// lets today's quiz actually level those concepts up rather than silently
// stalling them at New.

import { useMemo } from 'react'
import { Check, Lock, Play, Sparkles, X } from 'lucide-react'
import { useCollect } from '@/hooks/useCollect'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Props {
  /** New-state concept names in this quiz (slug form — matches the mastery key). */
  concepts: string[]
  /** Proceed into the questions. */
  onStart: () => void
  /** Leave the quiz entirely. */
  onQuit: () => void
}

export function PreQuizCollectGate({ concepts, onStart, onQuit }: Props) {
  const openCollect = useCollect(s => s.open)
  const collectedCards = useCollectedCards(s => s.cards)

  const collectedSet = useMemo(
    () => new Set(collectedCards.map(c => c.name.toLowerCase())),
    [collectedCards],
  )
  const remaining = concepts.filter(name => !collectedSet.has(name.toLowerCase())).length
  const allCollected = remaining === 0

  return (
    <div className="container max-w-lg mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onQuit}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Quit quiz
        </Button>
        <span className="text-xs text-muted-foreground tabular-nums">
          {concepts.length - remaining}/{concepts.length} collected
        </span>
      </div>

      <Card className="border-primary/30 ring-1 ring-primary/10 shadow-sm">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold leading-tight">Collect today's concepts</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Collect a flashcard to unlock leveling it up in this quiz.
              </p>
            </div>
          </div>

          <ul className="space-y-1.5">
            {concepts.map(name => {
              const isCollected = collectedSet.has(name.toLowerCase())
              return (
                <li key={name}>
                  <div className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5">
                    {isCollected ? (
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className={`text-sm flex-1 min-w-0 truncate ${isCollected ? 'text-muted-foreground' : 'font-medium'}`}>
                      {name}
                    </span>
                    {isCollected ? (
                      <span className="text-xs font-medium text-green-600 dark:text-green-400 shrink-0">
                        Collected
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openCollect({ kind: 'concept', name })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors shrink-0"
                      >
                        <Lock className="h-3.5 w-3.5" />
                        Collect
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="pt-1 space-y-2">
            <Button
              onClick={onStart}
              size="lg"
              className="w-full bg-foreground text-background hover:bg-foreground/90"
            >
              <Play className="h-4 w-4 mr-1.5" />
              Start Quiz
            </Button>
            {!allCollected && (
              <p className="text-center text-xs text-muted-foreground">
                You can still quiz uncollected concepts — they just won't level up past New until collected.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
