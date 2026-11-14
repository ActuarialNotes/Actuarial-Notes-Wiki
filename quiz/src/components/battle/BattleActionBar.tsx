import type { ReactNode } from 'react'
import { REACTIONS, type Reaction } from '@/lib/battleRoom'
import {
  SEATS,
  currentRound,
  type BattleState,
} from '@/lib/battle'
import { answerFor, playerAccentStyle, pointsChips, roundHeadline, signedPoints } from '@/lib/battleDisplay'
import { cn } from '@/lib/utils'

/** The round, told: who got it and what it was worth, and the way on. */
export function RoundResult({
  battle,
  action,
}: {
  battle: BattleState
  /** The button (or buttons) that move the battle on. */
  action: ReactNode
}) {
  const round = currentRound(battle)
  const names = [battle.players[0].name, battle.players[1].name] as const
  const answer = battle.questions[round.index].answer
  const lines = SEATS.map(seat => ({ seat, answer: answerFor(round, seat) })).filter(l => l.answer)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center" data-testid="battle-round-result">
      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold" aria-live="polite">
          {roundHeadline(round, names)}
          <span className="ml-2 text-sm font-normal text-muted-foreground">Answer {answer}</span>
        </p>
        {lines.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {SEATS.map(seat => {
              const mine = round.answers.filter(a => a.seat === seat)
              if (mine.length === 0) return null
              const total = mine.reduce((n, a) => n + a.points.total, 0)
              const right = mine.find(a => a.correct)
              // A miss says nothing more than its number.
              const chips = right ? pointsChips(right.points) : []
              const doubled = mine[0].points.multiplier > 1
              return (
                <span key={seat} style={playerAccentStyle(seat)} className="inline-flex flex-wrap items-baseline gap-x-1.5">
                  <span className="font-medium text-[var(--player)]">{names[seat]}</span>
                  <span
                    className={cn(
                      'font-semibold tabular-nums',
                      total > 0 ? 'text-green-600 dark:text-green-400' : total < 0 ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground',
                    )}
                  >
                    {signedPoints(total)}
                  </span>
                  {(chips.length > 0 || doubled) && (
                    <span className="text-xs text-muted-foreground">
                      {[...chips.map(c => `${c.label} ${signedPoints(c.value)}`), ...(doubled ? ['×2'] : [])].join(' · ')}
                    </span>
                  )}
                </span>
              )
            })}
          </div>
        )}
      </div>
      <div className="flex shrink-0 gap-2">{action}</div>
    </div>
  )
}

/** Online: a row of emoji to send the other player. */
export function ReactionRow({ onReact, disabled }: { onReact: (emoji: Reaction) => void; disabled?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1" role="group" aria-label="Send a reaction">
      {REACTIONS.map(emoji => (
        <button
          key={emoji}
          type="button"
          disabled={disabled}
          onClick={() => onReact(emoji)}
          aria-label={`Send ${emoji}`}
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-transform hover:scale-110 hover:bg-accent active:scale-95 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}
