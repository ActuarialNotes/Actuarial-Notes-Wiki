import { useEffect, useRef, useState } from 'react'
import { Flame, Loader2, WifiOff } from 'lucide-react'
import { DeckPrimaryButton, LeaveButton, PlayerCard } from '@/components/battle/deck/DeckParts'
import { DeckCountdown, DeckQuestionCard, PairChips } from '@/components/battle/deck/DeckQuestionCard'
import { DeckCoinFlip } from '@/components/battle/deck/DeckCoinFlip'
import { DeckDeal } from '@/components/battle/deck/DeckDraft'
import { DeckMusicButton } from '@/components/battle/deck/DeckLobby'
import { ReactionRow, RoundResult } from '@/components/battle/BattleActionBar'
import { AbilityTray } from '@/components/battle/AbilityTray'
import { useBattleMusic, useNow } from '@/hooks/useBattle'
import { usePageKeyboard } from '@/hooks/useKeyboard'
import { playSound, resetSoundCombo } from '@/lib/soundEngine'
import {
  ON_FIRE_STREAK,
  currentRound,
  isFinalRound,
  otherSeat,
  type AbilityId,
  type Seat,
} from '@/lib/battle'
import { answerFor, battleExamName, battleMusicIntensity, playerAccentStyle } from '@/lib/battleDisplay'
import { deckRoundLabel } from '@/lib/battleDeck'
import { displayPhase, type HostSession, type SessionSnapshot } from '@/lib/battleSession'
import { isCoinRound, roundChips } from '@/lib/battleDraft'
import type { Question } from '@/lib/parser'
import { cn } from '@/lib/utils'

// **An online round, as a card** (docs/quiz-battle-redesign.md §3.9): the
// rival's strip at the top, the question card, and this player's strip at the
// foot with the lock-in. The round is the simultaneous round it has always
// been (lib/battle.ts): an option is chosen, then locked in, and neither player
// sees the other's until the reveal.

/** A player's strip: card, name, score, and what they're doing. */
function Strip({ seat, name, score, streak, status, mine, reaction }: {
  seat: Seat
  name: string
  score: number
  streak: number
  status: string | null
  mine: boolean
  reaction: { id: string; emoji: string } | null
}) {
  return (
    <div
      style={playerAccentStyle(seat)}
      className={cn(
        'relative flex items-center justify-between gap-3 rounded-2xl border py-2 pl-2 pr-3',
        'border-[var(--player-muted)] bg-[color-mix(in_srgb,var(--player-vivid)_14%,var(--deck-ground))]',
      )}
      data-testid={`battle-player-${seat}`}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <PlayerCard seat={seat} player={{ name }} size="xs" />
        <span className="flex min-w-0 flex-col">
          <span className="flex items-center gap-1 truncate text-[13px] font-bold">
            {mine ? 'You' : name}
            {streak >= ON_FIRE_STREAK && <Flame className="h-3.5 w-3.5 text-orange-400" aria-label={`${streak} in a row`} />}
          </span>
          <span className="deck-display text-xl leading-none tabular-nums" data-testid={`battle-score-${seat}`}>{score.toLocaleString('en-US')}</span>
        </span>
      </span>
      {status && (
        <span className="flex shrink-0 items-center gap-2 text-[13px] font-semibold text-[color-mix(in_srgb,var(--player)_45%,white)]" aria-live="polite">
          {status === 'Locked in' && !mine && (
            <span aria-hidden className="h-[30px] w-[22px] rotate-[8deg] rounded border-[1.5px] border-[var(--player)] bg-[var(--player-muted)]" />
          )}
          {status}
        </span>
      )}
      {reaction && (
        <span key={reaction.id} aria-hidden className="battle-reaction pointer-events-none absolute -top-2 right-6 text-2xl">{reaction.emoji}</span>
      )}
    </div>
  )
}

export function DeckRound({
  snapshot,
  questionsById,
  onAnswer,
  onReady,
  onReact,
  onLeave,
  onEndForAbsent,
  onPower,
}: {
  snapshot: SessionSnapshot
  questionsById: ReadonlyMap<string, Question>
  onAnswer: (choice: string) => void
  onReady: () => void
  onReact: (emoji: Parameters<HostSession['react']>[0]) => void
  onLeave: () => void
  onEndForAbsent?: () => void
  /**
   * Abilities are Monte Carlo Station's; the Deck never turns them on, but a
   * station's room can be joined from here, and its tray comes with it.
   */
  onPower?: (ability: AbilityId) => void
}) {
  const battle = snapshot.battle!
  const me = snapshot.me
  const opp = otherSeat(me)
  const round = currentRound(battle)
  const now = useNow(!battle.finished, 250)
  const phase = displayPhase(battle, now)

  const myLock = round.locks[me]
  const pending = snapshot.pendingAnswer?.round === round.index ? snapshot.pendingAnswer : null
  const lockedChoice = pending?.choice ?? myLock?.choice ?? null
  const canPick = phase === 'open' && !lockedChoice
  const oppLocked = !!round.locks[opp]
  const [selected, setSelected] = useState<string | null>(null)
  useEffect(() => { setSelected(null) }, [round.index])

  useBattleMusic(battleMusicIntensity(battle, now, phase))

  // The cues, as they always were: the first question lands with `launch`,
  // each after with `go`; the other's lock-in is two soft knocks; the climb on
  // a right answer of this player's own, and silence on a miss.
  const heard = useRef({ index: -1, opened: false, revealed: false, oppIn: false })
  useEffect(() => {
    if (heard.current.index !== round.index) heard.current = { index: round.index, opened: false, revealed: false, oppIn: false }
    const cur = heard.current
    if (phase === 'open' && !cur.opened) { cur.opened = true; playSound(round.index === 0 ? 'launch' : 'go') }
    if (oppLocked && !cur.oppIn && phase !== 'revealed') { cur.oppIn = true; playSound('opponentIn') }
    if (phase === 'revealed' && !cur.revealed) {
      cur.revealed = true
      if (answerFor(round, me)?.correct) playSound('correct')
      else resetSoundCombo('correct')
    }
  }, [phase, round, me, oppLocked])

  const heardReactions = useRef(new Set<string>())
  useEffect(() => {
    for (const r of snapshot.reactions) {
      if (heardReactions.current.has(r.id)) continue
      heardReactions.current.add(r.id)
      if (r.seat === opp) playSound('reaction')
    }
  }, [snapshot.reactions, opp])

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [round.index])

  function lockIn(choice: string | null) {
    if (!canPick || !choice) return
    playSound('lockIn')
    onAnswer(choice)
  }

  const optionAt = (i: number) => () => {
    const option = battle.questions[round.index].options[i]
    if (option && canPick && round.struck[me] !== option) setSelected(option)
  }
  usePageKeyboard({
    '1': optionAt(0), '2': optionAt(1), '3': optionAt(2), '4': optionAt(3), '5': optionAt(4),
    Enter: () => {
      if (canPick && selected) lockIn(selected)
      else if (phase === 'revealed' && !round.ready.includes(me)) onReady()
    },
  }, !battle.finished)

  const question = questionsById.get(round.questionId)
  const names = [battle.players[0].name, battle.players[1].name] as const
  const draft = snapshot.draft
  const chips = roundChips(draft, round.index, me)
  const topicChip = chips ? <PairChips chips={chips} /> : null
  const coin = phase === 'countdown' && isCoinRound(draft, round.index)
  // The first question's count-in is the deal's last frame, counting down.
  const dealHeld = phase === 'countdown' && round.index === 0 && !coin && draft?.phase === 'deal'
  const final = isFinalRound(battle, round.index)
  const label = deckRoundLabel(battle, round.index)

  const statusOf = (seat: Seat): string | null => {
    if (seat === opp && !snapshot.opponentPresent) return 'Reconnecting…'
    if (phase === 'countdown') return null
    if (phase === 'revealed') {
      if (round.ready.includes(seat)) return 'Ready'
      const a = answerFor(round, seat)
      if (!a) return 'No answer'
      return a.correct ? (a.fastest ? 'Fastest!' : 'Got it') : 'Missed'
    }
    const inAlready = seat === me ? !!lockedChoice : !!round.locks[seat]
    if (inAlready) return 'Locked in'
    if (phase === 'closing') return "Time's up"
    return seat === me ? null : 'Thinking…'
  }
  const lastReaction = (seat: Seat) => {
    const r = [...snapshot.reactions].reverse().find(x => x.seat === seat)
    return r ? { id: r.id, emoji: r.emoji } : null
  }

  const isLast = round.index + 1 >= battle.config.rounds
  const waiting = round.ready.includes(me) ? `Waiting for ${names[opp]}…` : null

  if (dealHeld && draft) {
    return (
      <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col gap-4 px-5 pb-6 pt-4 lg:min-h-screen">
        <DeckDeal snapshot={snapshot} draft={draft} onLeave={onLeave} opensAt={round.opensAt} />
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col gap-3 px-5 pb-6 pt-3 lg:min-h-screen">
      <div className="flex items-center justify-between gap-2">
        <LeaveButton onLeave={onLeave} />
        <span className="min-w-0 truncate text-xs font-semibold text-[var(--deck-label)]">{battleExamName(battle.config.exam)} · room {snapshot.code}</span>
        <DeckMusicButton />
      </div>

      <Strip seat={opp} name={names[opp]} score={battle.scores[opp]} streak={battle.streaks[opp]} status={statusOf(opp)} mine={false} reaction={lastReaction(opp)} />

      {!snapshot.opponentPresent && snapshot.role === 'host' && onEndForAbsent && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-amber-950 px-4 py-3 text-sm text-amber-100">
          <span className="flex items-center gap-2">
            <WifiOff className="h-4 w-4 shrink-0" aria-hidden />
            {names[opp]} has dropped out. Wait for them, or end the battle.
          </span>
          <button type="button" onClick={onEndForAbsent} className="h-9 rounded-xl border border-amber-200/40 px-3 font-semibold">End battle</button>
        </div>
      )}

      <div className="flex-1">
        {coin && draft ? (
          <DeckCoinFlip battle={battle} draft={draft} index={round.index} me={me} opensAt={round.opensAt} />
        ) : phase === 'countdown' ? (
          <DeckCountdown
            label={label}
            final={final}
            opensAt={round.opensAt}
            topic={topicChip ? <span className="flex justify-center" data-testid="battle-countdown-topic">{topicChip}</span> : null}
          />
        ) : question ? (
          <div className="paper-sheet">
            <DeckQuestionCard
              key={question.id}
              question={question}
              players={battle.players}
              label={label}
              final={final}
              topic={topicChip}
              clock={phase === 'open' ? { opensAt: round.opensAt, deadline: round.deadline, running: true } : null}
              picker={canPick ? me : null}
              selected={selected}
              locked={lockedChoice ? { seat: me, choice: lockedChoice } : null}
              onPick={setSelected}
              pickSound="select"
              picks={phase === 'revealed' ? round.answers.map(a => ({ seat: a.seat, choice: a.choice, correct: a.correct })) : []}
              revealed={phase === 'revealed'}
              struck={round.struck[me]}
            />
          </div>
        ) : null}
      </div>

      {phase === 'revealed' && (
        <div className="rounded-2xl border border-[var(--deck-table-edge)] bg-[var(--deck-table)] p-3">
          <RoundResult battle={battle} action={null} />
          <div className="mt-2"><ReactionRow onReact={onReact} /></div>
        </div>
      )}

      {battle.config.abilities && onPower && (
        <AbilityTray battle={battle} me={me} pending={snapshot.pendingPower?.ability ?? null} onUse={a => { playSound('power'); onPower?.(a) }} />
      )}

      {/* This player's strip and the lock-in stay in reach under a long question. */}
      <div className="sticky bottom-0 -mx-5 flex items-center gap-3 bg-[var(--deck-ground)] px-5 pb-1 pt-2">
        <Strip seat={me} name={names[me]} score={battle.scores[me]} streak={battle.streaks[me]} status={null} mine reaction={lastReaction(me)} />
        {phase === 'revealed' ? (
          <DeckPrimaryButton onClick={onReady} disabled={!!waiting} className="flex-1" data-testid="battle-next">
            {waiting ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden />{waiting}</>
              : isLast ? 'See results' : isFinalRound(battle, round.index + 1) ? 'Final question' : 'Next question'}
          </DeckPrimaryButton>
        ) : canPick ? (
          <DeckPrimaryButton onClick={() => lockIn(selected)} disabled={!selected} className="flex-1" data-sound="none" data-testid="battle-lock-in">
            {selected ? `Lock in ${selected}` : 'Pick an answer'}
          </DeckPrimaryButton>
        ) : (
          <p className="flex-1 text-center text-sm text-[var(--deck-soft)]" aria-live="polite">
            {coin ? ''
              : phase === 'countdown' ? 'Get ready…'
              : phase === 'closing' ? 'Time’s up — revealing…'
              : lockedChoice ? (oppLocked ? 'Both in — revealing…' : `Locked in ${lockedChoice}. Waiting for ${names[opp]}…`)
              : 'Waiting…'}
          </p>
        )}
      </div>
    </div>
  )
}
