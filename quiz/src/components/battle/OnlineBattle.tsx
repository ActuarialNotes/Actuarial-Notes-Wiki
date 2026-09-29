import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AlertCircle, Check, Copy, Loader2, RotateCcw, Share2, Shuffle, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BattleScoreboard, type PlayerStatus } from '@/components/battle/BattleScoreboard'
import { BattleQuestionCard } from '@/components/battle/BattleQuestionCard'
import { BattleCountdown } from '@/components/battle/BattleCountdown'
import { AnswerPad, BattleActionBar, NextButton, ReactionRow, RoundResult } from '@/components/battle/BattleActionBar'
import { BattleResults } from '@/components/battle/BattleResults'
import { BattleTopRow, MusicToggle } from '@/components/battle/BattleTopRow'
import { PlayerTile } from '@/components/battle/PlayerTile'
import { useBattleMusic, useBattleSession, useNow } from '@/hooks/useBattle'
import { usePageKeyboard } from '@/hooks/useKeyboard'
import { playSound, resetSoundCombo } from '@/lib/soundEngine'
import {
  SEATS,
  currentRound,
  isFinalRound,
  otherSeat,
  type BattleConfig,
  type BattlePlayer,
  type BattleQuestionKey,
  type Seat,
} from '@/lib/battle'
import { answerFor, battleExamName, battleMusicIntensity } from '@/lib/battleDisplay'
import { generateRoomCode, joinPath } from '@/lib/battleRoom'
import {
  GuestSession,
  HostSession,
  displayPhase,
  tabClientId,
  type SessionProblem,
  type SessionSnapshot,
} from '@/lib/battleSession'
import { battleTransport } from '@/lib/battleTransport'
import type { Question } from '@/lib/parser'
import { formatClock } from '@/lib/quizTiming'

// ── The room, before and after ──────────────────────────────────────────────

/** The code, as tiles big enough to read across a table. */
function RoomCode({ code }: { code: string }) {
  return (
    <div className="flex justify-center gap-2" aria-label={`Room code ${code.split('').join(' ')}`} data-testid="battle-room-code">
      {code.split('').map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="flex h-16 w-14 items-center justify-center rounded-xl bg-card font-mono text-4xl font-bold shadow-sm"
        >
          {c}
        </span>
      ))}
    </div>
  )
}

function ShareButtons({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const link = `${window.location.origin}${joinPath(code)}`
  const canShare = typeof navigator.share === 'function'

  async function copy() {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch { /* the link is on screen to copy by hand */ }
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button variant="outline" onClick={copy} className="gap-2">
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        {copied ? 'Link copied' : 'Copy invite link'}
      </Button>
      {canShare && (
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => { navigator.share({ title: 'Quiz Battle', text: `Join my Quiz Battle — room ${code}`, url: link }).catch(() => {}) }}
        >
          <Share2 className="h-4 w-4" aria-hidden />
          Share
        </Button>
      )}
    </div>
  )
}

function ConfigSummary({ config }: { config: BattleConfig }) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {battleExamName(config.exam)} · {config.rounds} questions · {formatClock(config.roundSeconds)} each
    </p>
  )
}

/** Both players, face to face — or one, and an empty seat. */
function Versus({ players, me }: { players: SessionSnapshot['players']; me: Seat }) {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8">
      {SEATS.map(seat => {
        const player = players[seat]
        return (
          <div key={seat} className="flex w-28 flex-col items-center gap-2 text-center">
            {player ? (
              <PlayerTile seat={seat} player={player} size={56} className="battle-count-pop" />
            ) : (
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-border" aria-hidden>
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </span>
            )}
            <span className="w-full truncate text-sm font-medium">
              {player ? player.name : 'Waiting…'}
              {player && seat === me && <span className="text-muted-foreground"> (you)</span>}
            </span>
          </div>
        )
      }).reduce<ReactNode[]>((out, el, i) => (i === 0 ? [el] : [...out, <span key="vs" className="text-lg font-bold text-muted-foreground">vs</span>, el]), [])}
    </div>
  )
}

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
    ? { title: 'Your opponent’s room closed', body: 'They left before the battle could start. Find someone else?' }
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

/** Calm music under whatever screen mounts it — a room's lobby, the match intro. */
function CalmMusic() {
  useBattleMusic(0)
  return null
}

/**
 * The lobby paired two players: both of them, face to face, while the room
 * opens and the second player walks into it.
 */
function MatchIntro({ snapshot, note, opponent }: { snapshot: SessionSnapshot; note: string; opponent?: BattlePlayer }) {
  // The lobby already said who the opponent is; show them before the room does.
  const opp = otherSeat(snapshot.me)
  const players = snapshot.players.map((p, seat) => p ?? (seat === opp ? opponent ?? null : null)) as SessionSnapshot['players']
  return (
    <div className="mx-auto max-w-lg space-y-8 py-10 text-center" data-testid="battle-match-intro">
      <CalmMusic />
      <div className="space-y-2">
        <p className="battle-count-pop text-3xl font-bold tracking-tight">Match found!</p>
        {snapshot.config.exam && <ConfigSummary config={snapshot.config} />}
      </div>
      <Versus players={players} me={snapshot.me} />
      <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground" aria-live="polite">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        {note}
      </p>
    </div>
  )
}

// ── The battle itself ───────────────────────────────────────────────────────

function OnlineMatch({
  snapshot,
  questionsById,
  onAnswer,
  onReady,
  onReact,
  onLeave,
  onEndForAbsent,
}: {
  snapshot: SessionSnapshot
  questionsById: ReadonlyMap<string, Question>
  onAnswer: (choice: string) => void
  onReady: () => void
  onReact: (emoji: Parameters<HostSession['react']>[0]) => void
  onLeave: () => void
  onEndForAbsent?: () => void
}) {
  const battle = snapshot.battle!
  const me = snapshot.me
  const opp = otherSeat(me)
  const round = currentRound(battle)
  // Redrawn four times a second: this device opens a question when its own
  // countdown is up, and closes it on its own clock (lib/battleSession.ts,
  // `displayPhase`). The question's text is memoised below this.
  const now = useNow(!battle.finished, 250)
  const phase = displayPhase(battle, now)

  const myLock = round.locks[me]
  const pending = snapshot.pendingAnswer?.round === round.index ? snapshot.pendingAnswer : null
  const lockedChoice = pending?.choice ?? myLock?.choice ?? null
  const canPick = phase === 'open' && !lockedChoice
  const oppLocked = !!round.locks[opp]

  useBattleMusic(battleMusicIntensity(battle, now, phase))

  // Sounds: the first question finishes the Start button's phrase and every
  // one after lands with `go`; the other player's lock-in is two soft knocks;
  // and at the reveal, the climb on a right answer of this player's own — a
  // miss only ends the climb.
  const heard = useRef({ index: -1, opened: false, revealed: false, oppIn: false })
  useEffect(() => {
    if (heard.current.index !== round.index) {
      heard.current = { index: round.index, opened: false, revealed: false, oppIn: false }
    }
    const cur = heard.current
    if (phase === 'open' && !cur.opened) {
      cur.opened = true
      playSound(round.index === 0 ? 'launch' : 'go')
    }
    if (oppLocked && !cur.oppIn && phase !== 'revealed') {
      cur.oppIn = true
      playSound('opponentIn')
    }
    if (phase === 'revealed' && !cur.revealed) {
      cur.revealed = true
      const mine = answerFor(round, me)
      if (mine?.correct) playSound('correct')
      else resetSoundCombo('correct')
    }
  }, [phase, round, me, oppLocked])

  // A reaction from the other player pops as it arrives.
  const heardReactions = useRef(new Set<string>())
  useEffect(() => {
    for (const r of snapshot.reactions) {
      if (heardReactions.current.has(r.id)) continue
      heardReactions.current.add(r.id)
      if (r.seat === opp) playSound('reaction')
    }
  }, [snapshot.reactions, opp])

  /** This player's answer, locked in — heard as a latch, not as a verdict. */
  function lockIn(choice: string) {
    if (!canPick) return
    playSound('lockIn')
    onAnswer(choice)
  }

  // Each question starts at the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [round.index])

  const optionAt = (i: number) => () => {
    const option = battle.questions[round.index].options[i]
    if (option) lockIn(option)
  }
  usePageKeyboard({
    '1': optionAt(0), '2': optionAt(1), '3': optionAt(2), '4': optionAt(3), '5': optionAt(4),
    Enter: () => { if (phase === 'revealed' && !round.ready.includes(me)) onReady() },
  }, !battle.finished)

  const question = questionsById.get(round.questionId)
  const names = [battle.players[0].name, battle.players[1].name] as const

  const status = SEATS.map((seat): PlayerStatus | null => {
    if (seat === opp && !snapshot.opponentPresent) return { text: 'Reconnecting…', tone: 'caution' }
    if (phase === 'countdown') return null
    if (phase === 'revealed') {
      if (round.ready.includes(seat)) return { text: 'Ready', tone: 'muted' }
      const a = answerFor(round, seat)
      if (!a) return { text: 'No answer', tone: 'muted' }
      return a.correct ? { text: a.fastest ? 'Fastest!' : 'Got it', tone: 'player' } : { text: 'Missed', tone: 'muted' }
    }
    const inAlready = seat === me ? !!lockedChoice : !!round.locks[seat]
    if (inAlready) return { text: 'Locked in', tone: 'player' }
    if (phase === 'closing') return { text: "Time's up", tone: 'muted' }
    return { text: 'Thinking…', tone: 'muted' }
  }) as [PlayerStatus | null, PlayerStatus | null]

  const isLast = round.index + 1 >= battle.config.rounds
  const waiting = round.ready.includes(me) ? `Waiting for ${names[opp]}…` : null

  return (
    <div style={{ paddingBottom: 'calc(var(--action-bar-height, 7rem) + 1.5rem)' }}>
      <BattleTopRow onLeave={onLeave} leaveLabel="Leave">
        <span className="truncate">{battleExamName(battle.config.exam)} · room {snapshot.code}</span>
      </BattleTopRow>
      <BattleScoreboard battle={battle} me={me} status={status} reactions={snapshot.reactions} closing={phase === 'closing'} />

      {!snapshot.opponentPresent && snapshot.role === 'host' && onEndForAbsent && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          <span className="flex items-center gap-2">
            <WifiOff className="h-4 w-4 shrink-0" aria-hidden />
            {names[opp]} has dropped out. Wait for them, or end the battle.
          </span>
          <Button size="sm" variant="outline" onClick={onEndForAbsent}>End battle</Button>
        </div>
      )}

      <div className="mt-4">
        {phase === 'countdown' ? (
          <BattleCountdown battle={battle} />
        ) : question ? (
          <div className="paper-sheet">
            <BattleQuestionCard
              key={question.id}
              question={question}
              players={battle.players}
              picker={canPick ? me : null}
              onPick={lockIn}
              pickSound="none"
              locked={lockedChoice ? { seat: me, choice: lockedChoice } : null}
              picks={phase === 'revealed' ? round.answers.map(a => ({ seat: a.seat, choice: a.choice, correct: a.correct })) : []}
              revealed={phase === 'revealed'}
            />
          </div>
        ) : null}
      </div>

      <BattleActionBar above={<ReactionRow onReact={onReact} />}>
        {phase === 'revealed' ? (
          <RoundResult
            battle={battle}
            action={
              <NextButton
                label={isLast ? 'See results' : isFinalRound(battle, round.index + 1) ? 'Final question' : 'Next question'}
                onClick={onReady}
                waiting={waiting}
              />
            }
          />
        ) : canPick ? (
          <div className="space-y-2">
            <p className="text-center text-xs text-muted-foreground">Tap to lock in — you can’t change it. First right answer scores most.</p>
            <AnswerPad seat={me} options={battle.questions[round.index].options} onPick={lockIn} label="Your answer" sound="none" />
          </div>
        ) : (
          <p className="py-2 text-center text-sm text-muted-foreground" aria-live="polite">
            {phase === 'countdown'
              ? 'Get ready…'
              : phase === 'closing'
              ? 'Time’s up — revealing…'
              : lockedChoice
              ? round.locks[opp] ? 'Both in — revealing…' : `Locked in ${lockedChoice}. Waiting for ${names[opp]}…`
              : 'Waiting…'}
          </p>
        )}
      </BattleActionBar>
    </div>
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

  return (
    <div className="pt-4">
      <BattleResults
        battle={battle}
        questionsById={questionsById}
        actions={
          <>
            {!gone && (
              <Button
                size="lg"
                onClick={onRematch}
                disabled={!host && iAsked}
                className="h-12 gap-2 rounded-xl"
                data-testid="battle-rematch"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                {host ? 'Rematch' : iAsked ? 'Rematch asked for' : 'Ask for a rematch'}
              </Button>
            )}
            {onFindAnother && <FindAnotherButton onClick={onFindAnother} />}
            <Button size="lg" variant="outline" onClick={onLeave} className="h-12 rounded-xl">
              Leave room
            </Button>
          </>
        }
        note={
          gone ? null
            : host && theyAsked ? `${oppName} wants a rematch!`
            : !host && iAsked ? `Waiting for ${oppName} to start it…`
            : !host ? `${oppName} starts the rematch.`
            : null
        }
      />
    </div>
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
  draw,
  questionsById,
  onExit,
  code: givenCode,
  onFindAnother,
  opponent,
}: {
  config: BattleConfig
  player: BattlePlayer
  /** A fresh set of questions — for the first battle and every rematch. */
  draw: () => BattleQuestionKey[]
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
    }),
    code,
  )

  const guestIn = !!snapshot?.players[1]
  const inLobby = snapshot?.stage === 'lobby'

  // Matched: nobody presses Start — the intro plays, and the count-in follows.
  const started = useRef(false)
  useEffect(() => {
    if (!matched || !session || !inLobby || !guestIn || started.current) return
    const id = window.setTimeout(() => {
      started.current = true
      session.start(draw())
    }, MATCH_INTRO_MS)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched, session, inLobby, guestIn])

  // …and if the other player never arrives, say so rather than wait forever.
  const [late, setLate] = useState(false)
  useEffect(() => {
    if (!matched || guestIn) return
    const id = window.setTimeout(() => setLate(true), ARRIVAL_TIMEOUT_MS)
    return () => window.clearTimeout(id)
  }, [matched, guestIn])

  if (!session || !snapshot) return null

  if ((snapshot.stage === 'playing' || snapshot.stage === 'finished') && snapshot.battle) {
    return snapshot.stage === 'playing' && !snapshot.battle.finished ? (
      <OnlineMatch
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
        onRematch={() => session.start(draw())}
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
            <p className="text-sm text-muted-foreground">They may have closed the page. Find someone else?</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {onFindAnother && <FindAnotherButton onClick={onFindAnother} solid />}
            <Button variant="outline" onClick={onExit}>Back</Button>
          </div>
        </div>
      )
    }
    return <MatchIntro snapshot={snapshot} note={guestIn ? 'Starting…' : 'Opening the room…'} opponent={opponent} />
  }

  const guest = snapshot.players[1]
  return (
    <div className="mx-auto max-w-lg space-y-8 py-8 text-center" data-testid="battle-lobby">
      <CalmMusic />
      <div className="flex justify-end"><MusicToggle /></div>
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Room code</p>
        <RoomCode code={code} />
        <ConfigSummary config={snapshot.config} />
      </div>
      <Versus players={snapshot.players} me={0} />
      {guest ? (
        <div className="space-y-2">
          <Button
            size="lg"
            onClick={() => session.start(draw())}
            className="h-14 w-full gap-3 rounded-xl text-base font-semibold"
            data-sound="begin"
            data-testid="battle-start-online"
          >
            Start battle
          </Button>
          <p className="text-sm text-muted-foreground">{guest.name} is in. Start when you’re both ready.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Send this code to a friend — they open <span className="font-medium text-foreground">Quiz Battle → Join with a code</span>.
          </p>
          <ShareButtons code={code} />
        </div>
      )}
      {snapshot.connection === 'error' && (
        <p className="flex items-center justify-center gap-2 text-sm text-amber-600 dark:text-amber-400">
          <WifiOff className="h-4 w-4" aria-hidden /> Trouble reaching the battle server — retrying…
        </p>
      )}
      <Button variant="ghost" onClick={onExit}>Close room</Button>
    </div>
  )
}

// ── Joining ─────────────────────────────────────────────────────────────────

export function OnlineGuest({
  code,
  player,
  questionsById,
  onExit,
  matched = false,
  onFindAnother,
  opponent,
}: {
  code: string
  player: BattlePlayer
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

  if ((snapshot.stage === 'playing' || snapshot.stage === 'finished') && snapshot.battle) {
    return snapshot.stage === 'playing' && !snapshot.battle.finished ? (
      <OnlineMatch
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
    return <MatchIntro snapshot={snapshot} note={snapshot.stage === 'lobby' ? 'Starting…' : 'Joining the room…'} opponent={opponent} />
  }

  const host = snapshot.players[0]
  return (
    <div className="mx-auto max-w-lg space-y-8 py-8 text-center" data-testid="battle-lobby">
      <CalmMusic />
      <div className="flex justify-end"><MusicToggle /></div>
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Room code</p>
        <RoomCode code={code} />
        {snapshot.stage === 'lobby' && <ConfigSummary config={snapshot.config} />}
      </div>
      <Versus players={snapshot.players} me={1} />
      <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground" aria-live="polite">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        {snapshot.stage === 'lobby' && host ? `Waiting for ${host.name} to start…` : 'Joining…'}
      </p>
      <Button variant="ghost" onClick={onExit}>Leave</Button>
    </div>
  )
}
