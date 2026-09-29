import { useRef, type ReactNode } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useActionBarHeight } from '@/hooks/useActionBarHeight'
import { useNow } from '@/hooks/useBattle'
import { REACTIONS, type Reaction } from '@/lib/battleRoom'
import {
  ANSWER_WINDOW_MS,
  SEATS,
  currentRound,
  type BattleState,
  type Seat,
} from '@/lib/battle'
import { answerFor, playerAccentStyle, pointsChips, roundHeadline, signedPoints } from '@/lib/battleDisplay'
import { cn } from '@/lib/utils'

/**
 * The bar pinned to the foot of a battle — the buzzers while a question is
 * live, the round's result once it's over. Fixed, like the quiz builder's
 * action bar, so a long question never scrolls the buzzers out of reach; its
 * height is published as `--action-bar-height` for the page to clear.
 */
export function BattleActionBar({ children, above }: { children: ReactNode; above?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useActionBarHeight(ref, true)
  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-background/95 backdrop-blur-sm lg:left-[var(--sidebar-width)]"
    >
      <div className="mx-auto max-w-4xl space-y-2.5 px-4 pb-4 pt-3 sm:px-6">
        {above}
        {children}
      </div>
    </div>
  )
}

const BUZZ_KEYS: readonly [string, string] = ['A', 'L']

/**
 * One screen: a buzzer each, on the player's own side of the board. Once one
 * is pressed the bar becomes that player's answer pad (`FloorPad`).
 */
export function Buzzers({
  battle,
  onBuzz,
}: {
  battle: BattleState
  onBuzz: (seat: Seat) => void
}) {
  const round = currentRound(battle)
  return (
    <div className="grid grid-cols-2 gap-3">
      {SEATS.map(seat => {
        const player = battle.players[seat]
        const out = round.lockedOut.includes(seat)
        const enabled = round.phase === 'open' && !out
        return (
          <button
            key={seat}
            type="button"
            style={playerAccentStyle(seat)}
            disabled={!enabled}
            onClick={() => onBuzz(seat)}
            data-sound="none"
            data-testid={`battle-buzz-${seat}`}
            aria-label={`${player.name}: buzz in (${BUZZ_KEYS[seat]})`}
            className={cn(
              'relative flex h-16 flex-col items-center justify-center overflow-hidden rounded-xl text-white transition-[transform,opacity,background-color] duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              enabled ? 'bg-[var(--player-vivid)] shadow-md hover:brightness-110 active:scale-[0.97]' : 'bg-muted text-muted-foreground',
            )}
          >
            <span className="flex items-center gap-2 text-base font-bold uppercase tracking-wider">
              {out ? 'Missed' : round.phase === 'countdown' ? 'Get ready' : 'Buzz'}
              {enabled && (
                <kbd aria-hidden className="hidden rounded bg-white/20 px-1.5 font-mono text-xs sm:inline">{BUZZ_KEYS[seat]}</kbd>
              )}
            </span>
            <span className="max-w-full truncate px-2 text-xs opacity-90">{player.name}</span>
          </button>
        )
      })}
    </div>
  )
}

/**
 * The options as a row of letters, in the colour of the player picking — a
 * pad the thumb can reach while the question itself is scrolled out of view
 * above it. A phone shows a long stem and five options taller than its
 * screen, and a ten-second answer window is no time to scroll for option E.
 */
export function AnswerPad({
  seat,
  options,
  onPick,
  ruledOut = [],
  label,
  sound = 'select',
}: {
  seat: Seat
  options: readonly string[]
  onPick: (choice: string) => void
  /** Options already tried and wrong — struck off the pad. */
  ruledOut?: readonly string[]
  label: string
  /** The press cue; `none` when the handler plays its own (a lock-in). */
  sound?: 'select' | 'none'
}) {
  return (
    <div style={playerAccentStyle(seat)} role="group" aria-label={label} className="flex gap-2" data-testid="battle-pad">
      {options.map((key, i) => {
        const out = ruledOut.includes(key)
        return (
          <button
            key={key}
            type="button"
            disabled={out}
            onClick={() => onPick(key)}
            data-sound={sound}
            data-testid={`battle-pad-${key}`}
            aria-label={`Answer ${key}`}
            className={cn(
              'relative flex h-12 flex-1 items-center justify-center rounded-xl text-lg font-bold transition-[transform,background-color] duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              out
                ? 'bg-muted text-muted-foreground line-through opacity-50'
                : 'bg-[var(--player-soft)] text-[var(--player)] ring-1 ring-[var(--player-muted)] hover:bg-[var(--player-vivid)] hover:text-white active:scale-95',
            )}
          >
            {key}
            {!out && (
              <kbd aria-hidden className="absolute right-1.5 top-1 hidden font-mono text-[10px] font-semibold opacity-60 sm:block">{i + 1}</kbd>
            )}
          </button>
        )
      })}
    </div>
  )
}

/** One screen: whoever buzzed answers on the pad, against their window. */
export function FloorPad({ battle, onAnswer }: { battle: BattleState; onAnswer: (choice: string) => void }) {
  const round = currentRound(battle)
  const now = useNow(round.phase === 'buzzed', 100)
  if (round.phase !== 'buzzed' || !round.floor) return null
  const seat = round.floor.seat
  const left = Math.max(0, round.deadline - now)
  const ruledOut = round.answers.filter(a => !a.correct && a.choice).map(a => a.choice!)
  return (
    <div className="battle-buzz-flash space-y-2 rounded-xl" style={playerAccentStyle(seat)}>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="truncate font-semibold text-[var(--player)]">{battle.players[seat].name}, answer now</span>
        <span className="shrink-0 font-semibold tabular-nums text-[var(--player)]">{Math.ceil(left / 1000)}s</span>
      </div>
      <AnswerPad
        seat={seat}
        options={battle.questions[round.index].options}
        onPick={onAnswer}
        ruledOut={ruledOut}
        label={`${battle.players[seat].name}'s answer`}
      />
      <div className="h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
        <div
          className="h-full bg-[var(--player)] transition-[width] duration-100 ease-linear"
          style={{ width: `${(left / ANSWER_WINDOW_MS) * 100}%` }}
        />
      </div>
    </div>
  )
}

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

/** The button that moves a battle on, from the results of one question. */
export function NextButton({
  label,
  onClick,
  waiting,
  disabled,
}: {
  label: string
  onClick: () => void
  /** Online: this player is ready and the other isn't yet. */
  waiting?: string | null
  disabled?: boolean
}) {
  return (
    <Button
      size="lg"
      onClick={onClick}
      disabled={disabled || !!waiting}
      className="h-12 w-full gap-2 rounded-xl sm:w-auto"
      data-testid="battle-next"
    >
      {waiting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          {waiting}
        </>
      ) : (
        <>
          {label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </>
      )}
    </Button>
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
