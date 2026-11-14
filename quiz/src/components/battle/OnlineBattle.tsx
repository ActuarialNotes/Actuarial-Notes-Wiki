import { useEffect, useRef, useState } from 'react'
import { AlertCircle, Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeckDraftScreen } from '@/components/battle/deck/DeckDraft'
import { DeckRound } from '@/components/battle/deck/DeckRound'
import { DeckResults } from '@/components/battle/deck/DeckResults'
import { DeckGuestRoom, DeckHostRoom, DeckMatchIntro } from '@/components/battle/deck/DeckRoom'
import { useBattleSession } from '@/hooks/useBattle'
import { otherSeat, type BattleConfig, type BattlePlayer } from '@/lib/battle'
import { roundTopics } from '@/lib/battleDraft'
import { generateRoomCode } from '@/lib/battleRoom'
import {
  GuestSession,
  HostSession,
  tabClientId,
  type SessionProblem,
  type DraftSource,
  type SessionSnapshot,
} from '@/lib/battleSession'
import { questionTopics, type TopicGroup } from '@/lib/battleTopics'
import type { BattleSetup } from '@/lib/battleSetup'
import { battleTransport } from '@/lib/battleTransport'
import type { Question } from '@/lib/parser'

// ── The room, before and after ──────────────────────────────────────────────

const PROBLEM_TEXT: Record<SessionProblem, { title: string; body: string }> = {
  'not-found': { title: 'No battle found', body: 'Nobody is hosting a room with that code. Check it with the host and try again.' },
  full: { title: 'That room is full', body: 'Two players are already in it.' },
  version: { title: 'Different versions', body: 'Your app and the host’s are on different versions. Reload the page on both devices, then try again.' },
  'host-left': { title: 'The host left', body: 'The room has closed.' },
  connection: { title: 'Couldn’t connect', body: 'The battle server couldn’t be reached. Check your connection and try again.' },
}

function Problem({ problem, onRetry, onExit, onFindAnother }: {
  problem: SessionProblem
  onRetry?: () => void
  onExit: () => void
  /** A matched battle: back to the lobby for someone else. */
  onFindAnother?: () => void
}) {
  const { title, body } = onFindAnother && problem !== 'version'
    ? { title: 'Your opponent’s room closed', body: 'They left before the battle could start.' }
    : PROBLEM_TEXT[problem]
  return (
    <div className="mx-auto max-w-md space-y-4 py-12 text-center" data-testid="battle-problem">
      <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{body}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {onFindAnother ? (
          <FindAnotherButton onClick={onFindAnother} solid />
        ) : onRetry && <Button onClick={onRetry}>Try again</Button>}
        <Button variant="outline" onClick={onExit}>Back</Button>
      </div>
    </div>
  )
}

function FindAnotherButton({ onClick, solid }: { onClick: () => void; solid?: boolean }) {
  return (
    <Button
      variant={solid ? 'default' : 'outline'}
      size={solid ? 'default' : 'lg'}
      onClick={onClick}
      className={solid ? 'gap-2' : 'h-12 gap-2 rounded-xl'}
      data-testid="battle-find-another"
    >
      <Shuffle className="h-4 w-4" aria-hidden />
      Find a new opponent
    </Button>
  )
}

function Results({
  snapshot,
  questionsById,
  onRematch,
  onLeave,
  onFindAnother,
}: {
  snapshot: SessionSnapshot
  questionsById: ReadonlyMap<string, Question>
  onRematch: () => void
  onLeave: () => void
  /** A matched battle: back to the lobby for someone else. */
  onFindAnother?: () => void
}) {
  const battle = snapshot.battle!
  const opp = otherSeat(snapshot.me)
  const oppName = snapshot.players[opp]?.name ?? 'The other player'
  const iAsked = snapshot.rematch[snapshot.me]
  const theyAsked = snapshot.rematch[opp]
  const host = snapshot.role === 'host'
  const gone = !snapshot.opponentPresent || battle.forfeit !== null
  const note = gone ? null
    : host && theyAsked ? `${oppName} wants a rematch!`
    : !host && iAsked ? `Waiting for ${oppName} to start it…`
    : !host ? `${oppName} starts the rematch.`
    : null

  // What the round was on: the deal's pair or coin, else the question's own first topic.
  const topicsOf = (index: number): string[] => {
    const dealt = roundTopics(snapshot.draft, index)
    if (dealt.length > 0) return dealt
    const round = battle.rounds[index]
    const q = round ? questionsById.get(round.questionId) : undefined
    const first = q ? questionTopics(q)[0] : undefined
    return first ? [first] : []
  }
  return (
    <DeckResults
      battle={battle}
      questionsById={questionsById}
      me={snapshot.me}
      topicsOf={topicsOf}
      primary={gone ? null : {
        label: !host && iAsked ? 'Rematch asked for' : `Rematch ${oppName}`,
        onClick: onRematch,
        disabled: !host && iAsked,
        testid: 'battle-rematch',
      }}
      secondary={onFindAnother
        ? { label: 'New opponent', onClick: onFindAnother, testid: 'battle-find-another' }
        : { label: 'Leave room', onClick: onLeave, testid: 'battle-leave-room' }}
      note={note}
      onLeave={onLeave}
    />
  )
}

// ── Hosting ─────────────────────────────────────────────────────────────────

/** How long a matched host waits for the other player to walk into the room. */
const ARRIVAL_TIMEOUT_MS = 15_000
/** How long the match intro shows both players before the count-in starts. */
const MATCH_INTRO_MS = 1800

export function OnlineHost({
  config,
  player,
  topics,
  catalogueFor,
  questionsById,
  onExit,
  code: givenCode,
  onFindAnother,
  opponent,
  onRoomOpen,
  room,
}: {
  config: BattleConfig
  player: BattlePlayer
  /**
   * The Deck's friend room: the setup its settings change, the exams the room
   * can be on, and the way over to its *Join* tab.
   */
  room?: {
    setup: BattleSetup
    exams: readonly { exam: string; count: number }[]
    onSetup: (next: BattleSetup) => void
    onJoinTab: () => void
  }
  /** Told the room's code once it is open (a private room only). */
  onRoomOpen?: (code: string) => void
  /** The draft's topics, pairs and questions — for the first battle and every rematch. */
  topics: DraftSource
  /** The topics an exam offers, grouped for the picker. */
  catalogueFor: (exam: string) => readonly TopicGroup[]
  questionsById: ReadonlyMap<string, Question>
  onExit: () => void
  /** Matchmaking picked the room: open this one, and start as soon as the other player is in. */
  code?: string
  /** Matched: back to the lobby for someone else. */
  onFindAnother?: () => void
  /** Matched: who the lobby paired this player with. */
  opponent?: BattlePlayer
}) {
  const matched = !!givenCode
  const [code] = useState(() => givenCode ?? generateRoomCode())
  const { session, snapshot } = useBattleSession(
    () => new HostSession({
      transport: battleTransport(code),
      code,
      host: player,
      config: { ...config, rules: 'simultaneous' },
      // A fresh id per room: two tabs of one browser can host and join.
      clientId: tabClientId(null),
      topics,
    }),
    code,
  )

  const guestIn = !!snapshot?.players[1]
  const inLobby = snapshot?.stage === 'lobby'

  // Once, when the room exists to be joined.
  const announced = useRef(false)
  useEffect(() => {
    if (matched || !session || announced.current) return
    announced.current = true
    onRoomOpen?.(code)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  // Matched: nobody presses Start — the intro plays, and the draft follows.
  const started = useRef(false)
  useEffect(() => {
    if (!matched || !session || !inLobby || !guestIn || started.current) return
    const id = window.setTimeout(() => {
      started.current = true
      session.openDraft()
    }, MATCH_INTRO_MS)
    return () => window.clearTimeout(id)
  }, [matched, session, inLobby, guestIn])

  // …and if the other player never arrives, say so rather than wait forever.
  const [late, setLate] = useState(false)
  useEffect(() => {
    if (!matched || guestIn) return
    const id = window.setTimeout(() => setLate(true), ARRIVAL_TIMEOUT_MS)
    return () => window.clearTimeout(id)
  }, [matched, guestIn])

  if (!session || !snapshot) return null

  if (snapshot.stage === 'drafting' && snapshot.draft) {
    return (
      <DeckDraftScreen
        snapshot={snapshot}
        catalogue={catalogueFor(snapshot.config.exam)}
        onChoose={t => session.chooseHand(t)}
        onLock={() => session.lockHand()}
        onStrike={t => session.strike(t)}
        onLeave={onExit}
      />
    )
  }

  if ((snapshot.stage === 'playing' || snapshot.stage === 'finished') && snapshot.battle) {
    return snapshot.stage === 'playing' && !snapshot.battle.finished ? (
      <DeckRound
        snapshot={snapshot}
        questionsById={questionsById}
        onAnswer={c => session.answer(c)}
        onReady={() => session.ready()}
        onReact={e => session.react(e)}
        onLeave={onExit}
        onEndForAbsent={() => session.endForAbsentGuest()}
      />
    ) : (
      <Results
        snapshot={snapshot}
        questionsById={questionsById}
        onRematch={() => session.openDraft()}
        onLeave={onExit}
        onFindAnother={onFindAnother}
      />
    )
  }

  if (matched) {
    if (late && !guestIn) {
      return (
        <div className="mx-auto max-w-md space-y-4 py-12 text-center" data-testid="battle-problem">
          <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Your opponent didn’t arrive</h2>
            <p className="text-sm text-muted-foreground">They may have closed the page.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {onFindAnother && <FindAnotherButton onClick={onFindAnother} solid />}
            <Button variant="outline" onClick={onExit}>Back</Button>
          </div>
        </div>
      )
    }
    return <DeckMatchIntro snapshot={snapshot} note={guestIn ? 'Starting…' : 'Opening the room…'} opponent={opponent} />
  }

  // Matched rooms never get here; a friend's room always brings its setup.
  if (!room) return null
  return (
    <DeckHostRoom
      snapshot={snapshot}
      session={session}
      setup={room.setup}
      exams={room.exams}
      onSetup={room.onSetup}
      onExit={onExit}
      onJoinTab={room.onJoinTab}
    />
  )
}

// ── Joining ─────────────────────────────────────────────────────────────────

export function OnlineGuest({
  code,
  player,
  catalogueFor,
  questionsById,
  onExit,
  matched = false,
  onFindAnother,
  opponent,
  level,
}: {
  code: string
  player: BattlePlayer
  /** This player's own level on a topic, 0–3, sent with their hand. */
  level?: (topic: string) => number
  /** The topics an exam offers, grouped for the picker. */
  catalogueFor: (exam: string) => readonly TopicGroup[]
  questionsById: ReadonlyMap<string, Question>
  onExit: () => void
  /** Matchmaking sent this player here: no lobby to wait in, the host starts it. */
  matched?: boolean
  /** Matched: back to the lobby for someone else. */
  onFindAnother?: () => void
  /** Matched: who the lobby paired this player with. */
  opponent?: BattlePlayer
}) {
  const [attempt, setAttempt] = useState(0)
  const { session, snapshot } = useBattleSession(
    () => new GuestSession({
      transport: battleTransport(code),
      code,
      me: player,
      clientId: tabClientId(typeof sessionStorage === 'undefined' ? null : sessionStorage),
      knows: id => questionsById.has(id),
      level,
    }),
    `${code}:${attempt}`,
  )

  if (!session || !snapshot) return null

  if (snapshot.stage === 'ended' && snapshot.problem) {
    const retry = snapshot.problem === 'not-found' || snapshot.problem === 'connection' ? () => setAttempt(a => a + 1) : undefined
    return (
      <Problem
        problem={snapshot.problem}
        onRetry={retry}
        onExit={onExit}
        onFindAnother={matched ? onFindAnother : undefined}
      />
    )
  }

  if (snapshot.stage === 'drafting' && snapshot.draft) {
    return (
      <DeckDraftScreen
        snapshot={snapshot}
        catalogue={catalogueFor(snapshot.config.exam)}
        onChoose={t => session.chooseHand(t)}
        onLock={() => session.lockHand()}
        onStrike={t => session.strike(t)}
        onLeave={onExit}
      />
    )
  }

  if ((snapshot.stage === 'playing' || snapshot.stage === 'finished') && snapshot.battle) {
    return snapshot.stage === 'playing' && !snapshot.battle.finished ? (
      <DeckRound
        snapshot={snapshot}
        questionsById={questionsById}
        onAnswer={c => session.answer(c)}
        onReady={() => session.ready()}
        onReact={e => session.react(e)}
        onLeave={onExit}
      />
    ) : (
      <Results
        snapshot={snapshot}
        questionsById={questionsById}
        onRematch={() => session.requestRematch()}
        onLeave={onExit}
        onFindAnother={matched ? onFindAnother : undefined}
      />
    )
  }

  if (matched) {
    return <DeckMatchIntro snapshot={snapshot} note={snapshot.stage === 'lobby' ? 'Starting…' : 'Joining the room…'} opponent={opponent} />
  }

  return <DeckGuestRoom snapshot={snapshot} onExit={onExit} />
}
