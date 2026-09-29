import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ClipboardList, Trophy, Handshake } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useBattleSkin } from '@/hooks/useBattleSkin'
import { claimsReviewPath } from '@/lib/battleSkin'
import { PlayerTile } from '@/components/battle/PlayerTile'
import { BattleQuestionCard } from '@/components/battle/BattleQuestionCard'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import {
  SEATS,
  formatBattleTime,
  missedQuestionIds,
  roundTaker,
  summarizeBattle,
  type BattleState,
  type PlayerSummary,
  type Seat,
} from '@/lib/battle'
import { answerFor, battleExamName, playerAccentStyle, resultHeadline } from '@/lib/battleDisplay'
import { questionPreview } from '@/lib/questionPreview'
import { MarkdownText } from '@/components/MarkdownText'
import type { Question } from '@/lib/parser'
import { cn } from '@/lib/utils'

/** Paper confetti in the winner's colour and gold. Decorative; gone with reduced motion. */
function Confetti({ seat }: { seat: Seat }) {
  const pieces = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({
      left: (i * 37) % 100,
      delay: (i % 7) * 90,
      drift: ((i * 53) % 60) - 30,
      spin: ((i * 97) % 540) + 180,
      gold: i % 3 === 0,
      wide: i % 2 === 0,
    })),
    [],
  )
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-visible" style={playerAccentStyle(seat)}>
      {pieces.map((p, i) => (
        <span
          key={i}
          className={cn('battle-confetti absolute top-0 block rounded-[1px]', p.gold ? 'bg-amber-400' : 'bg-[var(--player)]')}
          style={{
            left: `${p.left}%`,
            width: p.wide ? 8 : 5,
            height: p.wide ? 5 : 9,
            animationDelay: `${p.delay}ms`,
            ['--drift' as string]: `${p.drift}px`,
            ['--spin' as string]: `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  )
}

function PlayerCard({
  battle,
  seat,
  summary,
  won,
  played,
}: {
  battle: BattleState
  seat: Seat
  summary: PlayerSummary
  won: boolean
  played: number
}) {
  const player = battle.players[seat]
  return (
    <div
      style={playerAccentStyle(seat)}
      className={cn(
        'relative rounded-xl bg-card p-4',
        // The winner wears the foil — earned, like a Level 3 card's.
        won && 'flashcard-collected flashcard-sheen-l3',
      )}
      data-testid={`battle-result-${seat}`}
    >
      <div className="flex items-center gap-3">
        <PlayerTile seat={seat} player={player} size={44} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{player.name}</p>
          <p className="text-3xl font-bold tabular-nums leading-tight text-[var(--player)]">
            {summary.score.toLocaleString('en-US')}
          </p>
        </div>
        {won && <Trophy className="h-6 w-6 shrink-0 text-amber-500" aria-label="Winner" />}
      </div>
      <dl className="mt-3 divide-y divide-border/60">
        <Stat label="Right answers" value={`${summary.correct} of ${played}`} />
        <Stat label="Fastest right answer" value={summary.fastestMs === null ? '—' : formatBattleTime(summary.fastestMs)} />
        <Stat label="Average right answer" value={summary.averageMs === null ? '—' : formatBattleTime(summary.averageMs)} />
        <Stat label="Best streak" value={summary.bestStreak} />
        {battle.config.rules === 'buzzer' && <Stat label="Steals" value={summary.steals} />}
      </dl>
    </div>
  )
}

/** One question of the battle, to look back over: who took it, and the question itself on a tap. */
function ReviewRow({ battle, index, question }: { battle: BattleState; index: number; question: Question | undefined }) {
  const [open, setOpen] = useState(false)
  const round = battle.rounds[index]
  const taker = roundTaker(round)
  const picks = SEATS.flatMap(seat => {
    const a = answerFor(round, seat)
    return a ? [{ seat, choice: a.choice, correct: a.correct }] : []
  })
  return (
    <li className="overflow-hidden rounded-lg bg-card">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <span className="w-6 shrink-0 text-center text-xs font-semibold tabular-nums text-muted-foreground">{index + 1}</span>
        {taker !== null ? (
          <PlayerTile seat={taker} player={battle.players[taker]} size={22} className="ring-offset-1" />
        ) : (
          <span className="h-[22px] w-[22px] shrink-0 rounded-full bg-muted" aria-hidden />
        )}
        <span className="min-w-0 flex-1 truncate text-sm">
          {question ? <MarkdownText inline>{questionPreview(question)}</MarkdownText> : round.questionId}
        </span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', !open && '-rotate-90')} aria-hidden />
      </button>
      {open && question && (
        <div className="px-1 pb-1">
          <BattleQuestionCard
            question={question}
            players={battle.players}
            picker={null}
            onPick={() => {}}
            picks={picks}
            revealed
          />
        </div>
      )}
    </li>
  )
}

export function BattleResults({
  battle,
  questionsById,
  me,
  actions,
  note,
}: {
  battle: BattleState
  questionsById: ReadonlyMap<string, Question>
  /**
   * The seat this device's own player sat in — online, this device's; on one
   * screen, the first (the account holder). Whose misses a claims review is of.
   */
  me?: Seat
  /** Rematch, settings, leave — whatever this way of playing offers. */
  actions: ReactNode
  /** A line under the actions — online, whether the other player wants a rematch. */
  note?: ReactNode
}) {
  const skin = useBattleSkin()
  const summary = summarizeBattle(battle)
  // Under the Actuaria skin a lost question is study: the ones this player got
  // wrong or left, as an ordinary quiz that saves as one (§6.9). The battle
  // itself still saves nothing.
  const misses = skin.reviewMisses && me !== undefined ? missedQuestionIds(battle, me) : []
  const names = [battle.players[0].name, battle.players[1].name] as const
  useSoundOnMount('complete')
  // The verdict is read from the top, whatever the last question left scrolled.
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  return (
    <div className="relative space-y-6 pb-8" data-testid="battle-results">
      {summary.winner !== null && <Confetti seat={summary.winner} />}

      <div className="battle-trophy flex flex-col items-center gap-2 pt-4 text-center">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15"
          aria-hidden
        >
          {summary.winner === null ? (
            <Handshake className="h-8 w-8 text-amber-500" />
          ) : (
            <Trophy className="h-8 w-8 text-amber-500" />
          )}
        </span>
        {skin.resultsLabel && <p className="actuaria-display text-[11px] text-muted-foreground">{skin.resultsLabel}</p>}
        <h2
          className="text-2xl font-bold tracking-tight"
          style={summary.winner !== null ? playerAccentStyle(summary.winner) : undefined}
          data-testid="battle-result-headline"
        >
          <span className={summary.winner !== null ? 'text-[var(--player)]' : undefined}>
            {resultHeadline(summary.winner, summary.forfeit, names)}
          </span>
        </h2>
        <p className="text-sm text-muted-foreground">
          {summary.forfeit !== null
            ? `${summary.played} of ${battle.config.rounds} questions played`
            : summary.winner === null
            ? `Level on ${battle.scores[0].toLocaleString('en-US')} after ${summary.played} questions`
            : `by ${summary.margin.toLocaleString('en-US')} points · ${battleExamName(battle.config.exam)}, ${summary.played} questions`}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {SEATS.map(seat => (
          <PlayerCard
            key={seat}
            battle={battle}
            seat={seat}
            summary={summary.players[seat]}
            won={summary.winner === seat}
            played={summary.played}
          />
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          {actions}
          {misses.length > 0 && (
            <Link
              to={claimsReviewPath(misses)}
              className={buttonVariants({ variant: 'outline', size: 'lg', className: 'h-12 gap-2 rounded-xl' })}
              data-testid="battle-review-misses"
            >
              <ClipboardList className="h-4 w-4" aria-hidden />
              Review my misses
            </Link>
          )}
        </div>
        {note && <p className="text-center text-sm text-muted-foreground">{note}</p>}
      </div>

      {summary.played > 0 && (
        <section className="space-y-2">
          <h3 className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{skin.review}</h3>
          <ol className="space-y-1.5">
            {battle.rounds.slice(0, summary.played).map(r => (
              <ReviewRow key={r.index} battle={battle} index={r.index} question={questionsById.get(r.questionId)} />
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}
