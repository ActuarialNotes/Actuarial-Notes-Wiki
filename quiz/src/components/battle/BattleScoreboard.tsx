import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Crown, Flame } from 'lucide-react'
import { PlayerTile } from '@/components/battle/PlayerTile'
import { useNow } from '@/hooks/useBattle'
import { useBattleSkin } from '@/hooks/useBattleSkin'
import {
  ANSWER_WINDOW_MS,
  ON_FIRE_STREAK,
  currentRound,
  isFinalRound,
  momentum,
  roundMs,
  type BattleState,
  type Seat,
} from '@/lib/battle'
import { playerAccentStyle, signedPoints } from '@/lib/battleDisplay'
import type { ShownReaction } from '@/lib/battleSession'
import { formatClock } from '@/lib/quizTiming'
import { playSound } from '@/lib/soundEngine'
import { cn } from '@/lib/utils'

export interface PlayerStatus {
  text: ReactNode
  /** `player` paints it in the player's colour — a buzz, a lock-in. */
  tone?: 'player' | 'muted' | 'caution'
}

const REDUCED_MOTION = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** A number that runs up (or down) to its new value rather than jumping. */
function useCountUp(target: number, durationMs = 650): number {
  const [shown, setShown] = useState(target)
  const from = useRef(target)
  useEffect(() => {
    if (REDUCED_MOTION || typeof requestAnimationFrame !== 'function') {
      setShown(target)
      from.current = target
      return
    }
    const start = performance.now()
    const origin = from.current
    let frame = 0
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs)
      const eased = 1 - Math.pow(1 - p, 3)
      const value = Math.round(origin + (target - origin) * eased)
      setShown(value)
      from.current = value
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, durationMs])
  return shown
}

/** Points just won or lost, floating up off the score — keyed so each change plays once. */
function usePointsBurst(score: number): { value: number; key: number } | null {
  const previous = useRef(score)
  const [burst, setBurst] = useState<{ value: number; key: number } | null>(null)
  useEffect(() => {
    const diff = score - previous.current
    previous.current = score
    if (diff === 0) return
    setBurst(b => ({ value: diff, key: (b?.key ?? 0) + 1 }))
    const id = window.setTimeout(() => setBurst(null), 1400)
    return () => window.clearTimeout(id)
  }, [score])
  return burst
}

function PlayerPanel({
  battle,
  seat,
  isMe,
  status,
  reactions,
}: {
  battle: BattleState
  seat: Seat
  isMe: boolean
  status: PlayerStatus | null
  reactions: ShownReaction[]
}) {
  const player = battle.players[seat]
  const score = battle.scores[seat]
  const shown = useCountUp(score)
  const burst = usePointsBurst(score)
  const streak = battle.streaks[seat]
  const round = currentRound(battle)
  // Ahead, and ahead of nothing doesn't count: no crown for 0 against −50.
  const leads = score > 0 && score > battle.scores[seat === 0 ? 1 : 0]
  const holdsFloor = round.phase === 'buzzed' && round.floor?.seat === seat
  // A wrong buzz shakes the panel once — keyed on how many misses the player
  // has had, so the next one shakes it again.
  const misses = battle.rounds.reduce((n, r) => n + r.answers.filter(a => a.seat === seat && !a.correct && battle.config.rules === 'buzzer').length, 0)
  const mirrored = seat === 1

  return (
    <div
      style={playerAccentStyle(seat)}
      className={cn(
        'relative flex min-w-0 items-center gap-2.5 rounded-xl bg-card px-2.5 py-2 ring-2 transition-[box-shadow,background-color] duration-200 sm:px-3',
        holdsFloor ? 'bg-[var(--player-soft)] ring-[var(--player)]' : 'ring-transparent',
        mirrored && 'flex-row-reverse text-right',
      )}
      data-testid={`battle-player-${seat}`}
    >
      <span key={`shake-${misses}`} className={cn('shrink-0', misses > 0 && 'battle-shake')}>
        <PlayerTile seat={seat} player={player} size={34} />
      </span>
      <div className="min-w-0 flex-1">
        <div className={cn('flex min-w-0 items-center gap-1', mirrored && 'flex-row-reverse')}>
          {/* "(you)" rides inside the name so it reads after it on either side
              of the board, and is what truncates first. */}
          <span className="truncate text-sm font-medium">
            {player.name}
            {isMe && <span className="text-xs font-normal text-muted-foreground"> (you)</span>}
          </span>
          {leads && (
            <Crown className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-label="In the lead" />
          )}
        </div>
        <div className={cn('flex items-baseline gap-1.5', mirrored && 'flex-row-reverse')}>
          <span className="text-xl font-bold tabular-nums leading-tight sm:text-2xl" data-testid={`battle-score-${seat}`}>
            {shown.toLocaleString('en-US')}
          </span>
          {streak >= 2 && (
            <span
              className="inline-flex items-center gap-0.5 text-xs font-semibold text-orange-600 dark:text-orange-400"
              aria-label={`${streak} right in a row`}
            >
              <Flame className={cn('h-3.5 w-3.5', streak >= ON_FIRE_STREAK && 'streak-flame-pulse')} aria-hidden />
              {streak}
            </span>
          )}
        </div>
        <div
          className={cn(
            'h-4 truncate text-xs',
            status?.tone === 'player' ? 'font-medium text-[var(--player)]'
              : status?.tone === 'caution' ? 'text-amber-600 dark:text-amber-400'
              : 'text-muted-foreground',
          )}
          aria-live="polite"
        >
          {status?.text}
        </div>
      </div>

      {burst && (
        <span
          key={burst.key}
          aria-hidden
          className={cn(
            'battle-burst pointer-events-none absolute -top-2 text-sm font-bold tabular-nums',
            mirrored ? 'left-3' : 'right-3',
            burst.value > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
          )}
        >
          {signedPoints(burst.value)}
        </span>
      )}

      {reactions.map(r => (
        <span
          key={r.id}
          aria-hidden
          className={cn('battle-reaction pointer-events-none absolute top-0 text-2xl', mirrored ? 'left-8' : 'right-8')}
        >
          {r.emoji}
        </span>
      ))}
    </div>
  )
}

/**
 * The round's clock: a ring that empties as the question's time runs out —
 * amber in its last ten seconds, and in a player's colour while they hold the
 * floor, when it counts their answer window instead.
 */
function RoundClock({ battle, closing }: { battle: BattleState; closing: boolean }) {
  const round = currentRound(battle)
  const live = round.phase !== 'revealed' && !battle.finished
  const now = useNow(live, 100)
  const total = roundMs(battle.config)

  let fraction = 1
  let seconds: number | null = null
  let floorSeat: Seat | null = null
  if (round.phase === 'countdown' && now < round.opensAt) {
    fraction = 1
    seconds = Math.ceil(total / 1000)
  } else if (round.phase === 'buzzed' && round.floor) {
    floorSeat = round.floor.seat
    const left = Math.max(0, round.deadline - now)
    fraction = left / ANSWER_WINDOW_MS
    seconds = Math.ceil(left / 1000)
  } else if (round.phase === 'open' || round.phase === 'countdown') {
    const left = closing ? 0 : Math.max(0, round.deadline - now)
    fraction = left / total
    seconds = Math.ceil(left / 1000)
  } else {
    fraction = 0
  }

  const low = floorSeat === null && seconds !== null && seconds <= 10 && round.phase !== 'countdown'

  // The clock heard in its last five seconds — the round's, or the answer
  // window's — once a second, and not at all once the time is up.
  const ticking = (round.phase === 'open' && !closing && now >= round.opensAt) || round.phase === 'buzzed'
  const lastTick = useRef<number | null>(null)
  useEffect(() => {
    if (!ticking || seconds === null || seconds > 5 || seconds <= 0) {
      lastTick.current = null
      return
    }
    if (lastTick.current === seconds) return
    lastTick.current = seconds
    playSound('clockTick')
  }, [ticking, seconds])
  const r = 22
  const circumference = 2 * Math.PI * r
  const label = isFinalRound(battle, round.index) ? 'Final' : `${round.index + 1}/${battle.config.rounds}`

  return (
    <div className="flex shrink-0 flex-col items-center gap-0.5" data-testid="battle-clock">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div
        className="relative h-14 w-14"
        style={floorSeat !== null ? playerAccentStyle(floorSeat) : undefined}
        role="timer"
        aria-label={seconds === null ? 'Round over' : `${seconds} seconds left`}
      >
        <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90">
          <circle cx="28" cy="28" r={r} fill="none" strokeWidth="4" className="stroke-muted" />
          <circle
            cx="28"
            cy="28"
            r={r}
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - Math.max(0, Math.min(1, fraction)))}
            className={cn(
              'transition-[stroke-dashoffset] duration-100 ease-linear',
              floorSeat !== null ? 'stroke-[var(--player)]' : low ? 'stroke-amber-500' : 'stroke-foreground',
            )}
          />
        </svg>
        <span
          className={cn(
            'absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums',
            low && 'text-amber-600 dark:text-amber-400',
            floorSeat !== null && 'text-[var(--player)]',
          )}
        >
          {seconds === null ? '—' : seconds >= 60 ? formatClock(seconds) : seconds}
        </span>
      </div>
    </div>
  )
}

/** The tug of war: each player's share of the points, meeting where the lead is. */
function MomentumBar({ scores }: { scores: readonly [number, number] }) {
  const share = momentum(scores)
  return (
    <div
      className="relative mt-2.5 flex h-1.5 overflow-hidden rounded-full bg-muted"
      role="img"
      aria-label={share === 0.5 ? 'Level' : `${Math.round(share * 100)}% of the points to player one`}
    >
      <div
        style={{ ...playerAccentStyle(0), width: `${share * 100}%` }}
        className="h-full bg-[var(--player)] transition-[width] duration-700 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
      />
      <div style={playerAccentStyle(1)} className="h-full flex-1 bg-[var(--player)]" />
    </div>
  )
}

export function BattleScoreboard({
  battle,
  me,
  status,
  reactions = [],
  closing = false,
}: {
  battle: BattleState
  /** Online, the seat this device plays — marked "(you)". */
  me?: Seat
  status: [PlayerStatus | null, PlayerStatus | null]
  reactions?: ShownReaction[]
  /** Online, a question whose time is up here and whose reveal is on its way. */
  closing?: boolean
}) {
  // Under the app header, or under Actuaria's HUD row — the skin knows which.
  const { scoreboardTop } = useBattleSkin()
  return (
    <div className={cn('sticky z-20 -mx-4 bg-background/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6', scoreboardTop)}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-4">
        <PlayerPanel battle={battle} seat={0} isMe={me === 0} status={status[0]} reactions={reactions.filter(r => r.seat === 0)} />
        <RoundClock battle={battle} closing={closing} />
        <PlayerPanel battle={battle} seat={1} isMe={me === 1} status={status[1]} reactions={reactions.filter(r => r.seat === 1)} />
      </div>
      <MomentumBar scores={battle.scores} />
    </div>
  )
}
