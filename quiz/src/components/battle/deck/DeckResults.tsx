import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ConceptTileStatic } from '@/components/ConceptTile'
import { Confetti, ReviewRow } from '@/components/battle/BattleResults'
import { DeckBackButton, DeckPrimaryButton, DeckSecondaryButton, DeckTable, PlayerCard } from '@/components/battle/deck/DeckParts'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { SEATS, summarizeBattle, type BattleState, type Seat } from '@/lib/battle'
import { playerAccentStyle, resultHeadline, shortTopic, signedPoints } from '@/lib/battleDisplay'
import { levelTag, practicePath, roundRows, weakestLostTopic } from '@/lib/battleDeck'
import type { Question } from '@/lib/parser'
import { cn } from '@/lib/utils'

// **The results** (docs/quiz-battle-redesign.md §3.11): the winner's card in
// foil, the score, what each round was worth to each player, then the round
// this player lost — on the weakest topic, when they lost more than one — with
// Practice, a quiz on it from the quiz builder. The battle still saves
// nothing; Practice is an ordinary quiz, and saves as one.

export interface DeckAction {
  label: string
  onClick: () => void
  disabled?: boolean
  testid?: string
}

function WinnerCard({ battle, seat }: { battle: BattleState; seat: Seat }) {
  const player = battle.players[seat]
  return (
    <div className="deck-tilt h-[218px] w-[156px] rounded-[22px] bg-[image:var(--deck-foil)] p-1 shadow-[0_30px_70px_rgba(232,121,249,.25)]">
      <div
        style={playerAccentStyle(seat)}
        className="relative flex h-full w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-[18px] bg-[var(--player-vivid)]"
      >
        <span aria-hidden className="deck-sheen absolute -top-10 left-0 h-[320px] w-11 bg-white/[.22]" />
        <PlayerInitial name={player.name} />
        <span className="max-w-full truncate px-2 text-[15px] font-bold">{player.name}</span>
        <span className="mt-2 rounded-full bg-[rgba(12,10,16,.75)] px-3 py-1 text-[11px] font-extrabold tracking-[.12em]">WINNER</span>
      </div>
    </div>
  )
}

function PlayerInitial({ name }: { name: string }) {
  return <span className="deck-display text-[66px] leading-none">{[...name.trim()][0]?.toUpperCase() ?? '?'}</span>
}

export function DeckResults({
  battle,
  questionsById,
  me,
  topicsOf,
  primary,
  secondary,
  note,
  onLeave,
}: {
  battle: BattleState
  questionsById: ReadonlyMap<string, Question>
  /** This device's own seat — on one screen, the first (the account holder's). */
  me: Seat
  /** What a round was on: its pair, or the one topic a coin chose. */
  topicsOf: (index: number) => readonly string[]
  /** Rematch. */
  primary: DeckAction | null
  /** New opponent, Leave room, Change settings — whichever way on this battle has. */
  secondary: DeckAction | null
  note?: ReactNode
  onLeave: () => void
}) {
  const summary = summarizeBattle(battle)
  const levels = useConceptLevels()
  const names = [battle.players[0].name, battle.players[1].name] as const
  const rows = useMemo(() => roundRows(battle, topicsOf), [battle, topicsOf])
  const lost = weakestLostTopic(battle, me, topicsOf, levels.levelOf)
  const [reviewing, setReviewing] = useState(false)
  const reviewRef = useRef<HTMLElement>(null)
  useSoundOnMount('complete')
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  useEffect(() => { if (reviewing) reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [reviewing])

  const winner = summary.winner
  const order: Seat[] = winner === null ? [0, 1] : [winner, (1 - winner) as Seat]

  return (
    <div className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col items-center gap-3.5 px-5 pb-6 pt-3 lg:min-h-screen" data-testid="battle-results">
      {winner !== null && <Confetti seat={winner} />}
      <div className="flex w-full"><DeckBackButton onClick={onLeave} label="Leave" /></div>

      <h2 className="sr-only" data-testid="battle-result-headline">{resultHeadline(winner, summary.forfeit, names)}</h2>
      {winner !== null ? (
        <WinnerCard battle={battle} seat={winner} />
      ) : (
        <div className="flex items-center gap-4" aria-hidden>
          {SEATS.map(seat => <PlayerCard key={seat} seat={seat} player={battle.players[seat]} caption={battle.players[seat].name} />)}
        </div>
      )}
      {winner === null && <p className="deck-display text-2xl">It's a draw</p>}

      <div className="deck-display flex items-baseline gap-3.5">
        {order.map((seat, i) => (
          <span key={seat} className="flex items-baseline gap-3.5">
            {i === 1 && <span className="text-lg text-[var(--deck-dim)]">to</span>}
            <span style={playerAccentStyle(seat)} className="text-[42px] tabular-nums text-[color-mix(in_srgb,var(--player)_60%,white)]" data-testid={`battle-result-${seat}`}>
              {battle.scores[seat].toLocaleString('en-US')}
            </span>
          </span>
        ))}
      </div>
      {summary.forfeit !== null && (
        <p className="text-sm text-[var(--deck-label)]">{summary.played} of {battle.config.rounds} questions played</p>
      )}

      {rows.length > 0 && (
        <DeckTable className="w-full rounded-[18px] px-3.5 py-1">
          <table className="w-full text-sm" data-testid="battle-rounds">
            <thead>
              <tr className="h-[34px] border-b border-[var(--deck-table-edge)] text-xs font-bold">
                <th className="text-left font-normal"><span className="sr-only">Round</span></th>
                {SEATS.map(seat => (
                  <th key={seat} style={playerAccentStyle(seat)} className="w-[28%] truncate text-left text-[color-mix(in_srgb,var(--player)_60%,white)]">{names[seat]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.index} className={cn('h-[46px]', i < rows.length - 1 && 'border-b border-[var(--deck-table-edge)]')}>
                  <td className="py-1.5 pr-2">
                    <span className="flex flex-col text-[13px] text-[var(--deck-label)]">
                      {r.final ? 'Final ×2' : `Round ${r.index + 1}`}
                      {r.topics.length > 0 && <small className="truncate text-[11px] text-[var(--deck-dim)]" title={r.topics.join(' + ')}>{r.topics.map(shortTopic).join(' + ')}</small>}
                    </span>
                  </td>
                  {SEATS.map(seat => (
                    <td key={seat} className={r.points[seat] === 0 ? 'text-[var(--deck-dim)]' : 'font-bold'}>
                      {r.points[seat] === 0 ? '0' : signedPoints(r.points[seat])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </DeckTable>
      )}

      {lost && (
        <div className="flex w-full items-center gap-3 rounded-[18px] border border-[var(--deck-card-edge)] bg-[var(--deck-card)] p-3" data-testid="battle-lost-round">
          <ConceptTileStatic name={levelTag(levels.levelOf(lost))} state={levels.levelOf(lost)} collected={levels.isCollected(lost)} showLock={false} className="h-[60px] w-11 shrink-0 !aspect-auto" />
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-xs font-bold text-[var(--deck-label)]">The round you lost</span>
            <span className="deck-display truncate text-[17px]">{lost}</span>
          </span>
          <Link
            to={practicePath(lost)}
            className="flex h-11 shrink-0 items-center rounded-xl bg-white px-3.5 text-sm font-bold text-[var(--deck-ground)] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            data-testid="battle-practice"
          >
            Practice
          </Link>
        </div>
      )}

      <div className="mt-auto flex w-full flex-col gap-2.5 pt-4">
        {primary && (
          <DeckPrimaryButton onClick={primary.onClick} disabled={primary.disabled} data-testid={primary.testid}>{primary.label}</DeckPrimaryButton>
        )}
        <div className={cn('grid gap-2.5', secondary ? 'grid-cols-2' : 'grid-cols-1')}>
          {secondary && (
            <DeckSecondaryButton onClick={secondary.onClick} disabled={secondary.disabled} data-testid={secondary.testid}>{secondary.label}</DeckSecondaryButton>
          )}
          {summary.played > 0 && (
            <DeckSecondaryButton onClick={() => setReviewing(v => !v)} aria-expanded={reviewing} data-testid="battle-review">Review questions</DeckSecondaryButton>
          )}
        </div>
        {note && <p className="text-center text-sm text-[var(--deck-soft)]">{note}</p>}
      </div>

      {reviewing && (
        <section ref={reviewRef} className="w-full space-y-2" aria-label="Review questions">
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
