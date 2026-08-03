// Post-quiz collection gate. Shown right after the level-up ceremony (if any)
// for concepts this quiz answered correctly but that stayed New because they
// weren't collected yet (see docs/flashcard-collection.md — collection gates
// New → Level 1). Collecting here banks that correct answer retroactively via
// promoteMissedLevelUp; skipping leaves the concept New and the answer
// uncredited, same as it would have been without this screen.

import { useEffect, useRef, useState } from 'react'
import { Check, Loader2, Lock, Sparkles } from 'lucide-react'
import { useCollect } from '@/hooks/useCollect'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { promoteMissedLevelUp } from '@/stores/quizStore'
import { LevelPill } from '@/components/wiki/LearningProgressModal'

interface Props {
  /** Exam id (progress key) the concepts belong to. */
  examId: string
  userId: string | null
  /** New-state concept names answered correctly this quiz but not collected. */
  concepts: string[]
  onDone: () => void
}

export function PostQuizCollectGate({ examId, userId, concepts, onDone }: Props) {
  const openCollect = useCollect(s => s.open)
  const collectedCards = useCollectedCards(s => s.cards)
  const [promoted, setPromoted] = useState<Set<string>>(new Set())
  const promotingRef = useRef<Set<string>>(new Set())

  const collectedSet = new Set(collectedCards.map(c => c.name.toLowerCase()))

  // The instant a listed concept flips to collected, bank the level-up it
  // already earned this quiz — no need to wait for another correct answer.
  useEffect(() => {
    for (const name of concepts) {
      const key = name.toLowerCase()
      if (!collectedSet.has(key) || promoted.has(key) || promotingRef.current.has(key)) continue
      promotingRef.current.add(key)
      promoteMissedLevelUp(userId, examId, name)
        .catch(err => console.error('promoteMissedLevelUp failed:', err))
        .finally(() => {
          promotingRef.current.delete(key)
          setPromoted(prev => new Set(prev).add(key))
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectedCards])

  const doneCount = concepts.filter(name => collectedSet.has(name.toLowerCase())).length

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Collect to level up"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-[101] w-full max-w-sm rounded-2xl bg-card p-5 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-base font-bold text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Collect to level up
          </span>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {doneCount}/{concepts.length}
          </span>
        </div>

        <ul className="mt-3 space-y-1.5 max-h-[50vh] overflow-y-auto -mx-1 px-1">
          {concepts.map(name => {
            const key = name.toLowerCase()
            const isPromoted = promoted.has(key)
            const isPending = collectedSet.has(key) && !isPromoted
            return (
              <li key={name}>
                <div className="flex items-center gap-2.5 rounded-lg bg-muted/30 px-3 py-2.5">
                  {isPromoted ? (
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  ) : isPending ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
                  ) : (
                    <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className={`min-w-0 flex-1 truncate text-sm ${isPromoted ? 'text-muted-foreground' : 'font-medium'}`}>
                    {name}
                  </span>
                  {isPromoted ? (
                    <LevelPill level="level1" size="sm" />
                  ) : !isPending ? (
                    <button
                      type="button"
                      onClick={() => openCollect({ kind: 'concept', name })}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      Collect
                    </button>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={onDone}
          className="mt-4 w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
