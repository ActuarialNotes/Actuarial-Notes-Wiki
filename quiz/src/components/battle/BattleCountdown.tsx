import { useEffect, useRef } from 'react'
import { useNow } from '@/hooks/useBattle'
import { playSound } from '@/lib/soundEngine'
import { currentRound, isFinalRound, type BattleState } from '@/lib/battle'
import { battleExamName, roundLabel } from '@/lib/battleDisplay'

/**
 * The "3, 2, 1" before a question — which question it is, and on the last one
 * that it counts double. The question itself isn't on screen yet: nobody gets
 * a head start reading it.
 */
export function BattleCountdown({ battle }: { battle: BattleState }) {
  const round = currentRound(battle)
  const now = useNow(true, 100)
  const n = Math.max(1, Math.ceil((round.opensAt - now) / 1000))
  const final = isFinalRound(battle, round.index)

  // A woodblock on each number — the count, heard; `go` answers it an octave
  // up when the question lands.
  const last = useRef<number | null>(null)
  useEffect(() => {
    if (last.current === n) return
    last.current = n
    playSound('countIn')
  }, [n])

  return (
    <div
      className="flex min-h-[45vh] flex-col items-center justify-center gap-4 text-center"
      data-testid="battle-countdown"
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {roundLabel(battle)} · {battleExamName(battle.config.exam)}
      </p>
      <span key={n} className="battle-count-pop text-8xl font-bold tabular-nums leading-none" aria-live="assertive">
        {n}
      </span>
      {final && (
        <span className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
          Double points
        </span>
      )}
    </div>
  )
}
