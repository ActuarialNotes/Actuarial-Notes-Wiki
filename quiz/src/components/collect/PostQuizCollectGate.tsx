// Post-quiz collection gate. Shown right after the level-up ceremony (if any)
// for concepts this quiz answered correctly but that stayed New because they
// weren't collected yet (see docs/flashcard-collection.md — collection gates
// New → Level 1). Collecting here banks that correct answer retroactively;
// dismissing the gate leaves the concept New — but no longer out of reach: the
// results screen behind it keeps a "Collect → Level 1" card for each one
// (components/collect/CollectLevelUpCard.tsx).
//
// The promotion itself is not run here. Review mounts
// hooks/useMissedLevelUpPromotion once for the whole screen and passes the
// result down, so this gate and the cards behind it can't both promote the same
// collection.

import { Check, Loader2, Lock, Sparkles } from 'lucide-react'
import { useCollect } from '@/hooks/useCollect'
import { CollectGateButton } from '@/components/collect/CollectGateButton'
import { LevelPill } from '@/components/wiki/LearningProgressModal'

interface Props {
  /** New-state concept names answered correctly this quiz but not collected. */
  concepts: string[]
  /** Lower-cased names whose level-up has been banked. */
  promoted: Set<string>
  /** Lower-cased names collected but whose promotion is still in flight. */
  pending: Set<string>
  onDone: () => void
}

export function PostQuizCollectGate({ concepts, promoted, pending, onDone }: Props) {
  const openCollect = useCollect(s => s.open)

  const doneCount = concepts.filter(name => {
    const key = name.toLowerCase()
    return promoted.has(key) || pending.has(key)
  }).length

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
            const isPending = pending.has(key)
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
                    <CollectGateButton
                      name={name}
                      onClick={() => openCollect({ kind: 'concept', name })}
                    />
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
