import { useRef, useState } from 'react'
import { Loader2, Share, WifiOff } from 'lucide-react'
import { DeckBackButton, DeckPrimaryButton, DeckTable, ExamSheet, PlayerCard } from '@/components/battle/deck/DeckParts'
import { DeckMusicButton } from '@/components/battle/deck/DeckLobby'
import { useBattleMusic } from '@/hooks/useBattle'
import { useBattleSkin } from '@/hooks/useBattleSkin'
import { ROUND_COUNTS, ROUND_TIME_PRESETS, roundSecondsFor, type BattlePlayer, type Seat } from '@/lib/battle'
import { DEFAULT_PLAYER_NAMES, battleExamName } from '@/lib/battleDisplay'
import { nextInCycle } from '@/lib/battleDeck'
import { ROOM_CODE_LENGTH, isRoomCode, normalizeRoomCode } from '@/lib/battleRoom'
import { roomConfig, type BattleSetup } from '@/lib/battleSetup'
import { skinJoinPath } from '@/lib/battleSkin'
import type { HostSession, SessionSnapshot } from '@/lib/battleSession'
import { formatClock } from '@/lib/quizTiming'
import { cn } from '@/lib/utils'

// **The friend room** (docs/quiz-battle-redesign.md §3.4): *Host | Join*. The
// host sees the room code as four playing cards, *Send the code*, the two
// seats and the room's settings; *Join* is four empty card slots to type the
// code into. The room is the one it always was (lib/battleSession.ts) — the
// settings are the host's `setConfig`, open until the battle starts.

// Each card's lie on the table — `rotate` / `translate`, so the deal's own transform doesn't undo it.
const TILT: { rotate: string; translate: string }[] = [
  { rotate: '-5deg', translate: '0 0' },
  { rotate: '-1deg', translate: '0 -4px' },
  { rotate: '2deg', translate: '0 -4px' },
  { rotate: '6deg', translate: '0 0' },
]

/** The top bar: back, and the Host | Join switch. */
function RoomTabs({ tab, onBack, onHost, onJoin }: { tab: 'host' | 'join'; onBack: () => void; onHost?: () => void; onJoin?: () => void }) {
  const option = (id: 'host' | 'join', label: string, go?: () => void) => (
    <button
      type="button"
      aria-pressed={tab === id}
      onClick={() => { if (tab !== id) go?.() }}
      disabled={tab !== id && !go}
      className={cn(
        'h-9 rounded-[10px] px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-40',
        tab === id ? 'bg-white font-bold text-[var(--deck-ground)]' : 'font-semibold text-[var(--deck-soft)] hover:text-white',
      )}
      data-testid={`battle-room-${id}`}
    >
      {label}
    </button>
  )
  return (
    <div className="flex h-12 items-center justify-between">
      <DeckBackButton onClick={onBack} />
      <div role="group" aria-label="Host or join" className="flex rounded-[14px] border border-[var(--deck-card-edge)] bg-[var(--deck-card)] p-1">
        {option('host', 'Host', onHost)}
        {option('join', 'Join', onJoin)}
      </div>
      <DeckMusicButton />
    </div>
  )
}

/** The code, as four playing cards big enough to read across a table. */
function RoomCodeCards({ code }: { code: string }) {
  return (
    <div className="flex gap-2.5" aria-label={`Room code ${code.split('').join(' ')}`} data-testid="battle-room-code">
      {code.split('').map((c, i) => (
        <span
          key={i}
          aria-hidden
          style={TILT[i % TILT.length]}
          className="deck-deal deck-display flex h-[92px] w-[66px] items-center justify-center rounded-xl bg-[#F5F3F8] text-[44px] text-[var(--deck-ground)] shadow-[0_10px_20px_rgba(0,0,0,.4)]"
        >
          {c}
        </span>
      ))}
    </div>
  )
}

/** *Send the code*: the share sheet where there is one, the invite link copied where there isn't. */
function SendCode({ code }: { code: string }) {
  const skin = useBattleSkin()
  const [copied, setCopied] = useState(false)
  const link = `${window.location.origin}${skinJoinPath(skin, code)}`
  async function send() {
    if (typeof navigator.share === 'function') {
      navigator.share({ title: skin.title, text: `${skin.invite} — room ${code}`, url: link }).catch(() => {})
      return
    }
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch { /* the code is on screen to read out */ }
  }
  return (
    <button
      type="button"
      onClick={send}
      className="flex h-11 items-center gap-2 rounded-xl border border-[var(--deck-raised-edge)] bg-[var(--deck-card)] px-[18px] text-sm font-semibold hover:bg-[var(--deck-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      data-testid="battle-send-code"
    >
      <Share className="h-4 w-4" aria-hidden />
      {copied ? 'Link copied' : 'Send the code'}
    </button>
  )
}

/** The two seats: the host, and the friend — or an empty seat, blinking. */
function Seats({ players, me }: { players: SessionSnapshot['players']; me: Seat }) {
  const seat = (s: Seat) => {
    const player = players[s]
    return player ? (
      <div className="flex flex-col items-center gap-2">
        <PlayerCard seat={s} player={player} size="sm" className="deck-deal" />
        <span className="max-w-[8rem] truncate text-[13px] font-bold">
          {player.name}{s === 0 ? ' · host' : ''}{s === me && s !== 0 ? ' (you)' : ''}
        </span>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-2">
        <span aria-hidden className="deck-blink deck-display flex h-[108px] w-[78px] items-center justify-center rounded-xl border-2 border-dashed border-[#86198F] text-[34px] text-[#F0ABFC]">?</span>
        <span className="text-[13px] text-[var(--deck-soft)]">Empty seat</span>
      </div>
    )
  }
  return (
    <DeckTable className="flex items-center justify-around rounded-3xl p-[18px]">
      {seat(0)}
      <span className="deck-display text-lg text-[var(--deck-dim)]">vs</span>
      {seat(1)}
    </DeckTable>
  )
}

function SettingTile({ value, label, onClick, testid }: { value: string; label: string; onClick?: () => void; testid?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="flex h-16 flex-col items-center justify-center gap-0.5 rounded-[14px] border border-[var(--deck-card-edge)] bg-[var(--deck-card)] hover:bg-[var(--deck-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:hover:bg-[var(--deck-card)]"
      data-testid={testid}
    >
      <span className="deck-display text-xl">{value}</span>
      <span className="text-xs text-[var(--deck-label)]">{label}</span>
    </button>
  )
}

function examShort(exam: string): string {
  return battleExamName(exam).replace(/^Exam\s+/, '')
}

/** The host's room: the code, the seats, the settings, and Start once a friend sits down. */
export function DeckHostRoom({
  snapshot,
  session,
  setup,
  exams,
  onSetup,
  onExit,
  onJoinTab,
}: {
  snapshot: SessionSnapshot
  session: HostSession
  setup: BattleSetup
  exams: readonly { exam: string; count: number }[]
  onSetup: (next: BattleSetup) => void
  onExit: () => void
  onJoinTab: () => void
}) {
  useBattleMusic(0)
  const [choosing, setChoosing] = useState(false)
  const guest = snapshot.players[1]
  const config = snapshot.config

  function change(next: BattleSetup) {
    onSetup(next)
    session.setConfig(roomConfig(next, false))
  }

  const timeLabel = ROUND_TIME_PRESETS.find(p => p.id === setup.time)
  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col gap-[22px] px-5 pb-7 pt-3 lg:min-h-screen" data-testid="battle-lobby">
      <RoomTabs tab="host" onBack={onExit} onJoin={onJoinTab} />
      <div className="flex flex-col items-center gap-3.5">
        <h1 className="deck-display text-[32px]">Your room code</h1>
        <RoomCodeCards code={snapshot.code} />
        <SendCode code={snapshot.code} />
      </div>
      <Seats players={snapshot.players} me={0} />
      <div className="flex flex-col gap-2.5">
        <span className="deck-label">Settings</span>
        <div className="grid grid-cols-3 gap-2" aria-label="Room settings">
          <SettingTile
            value={String(config.rounds)}
            label="questions"
            onClick={() => change({ ...setup, rounds: nextInCycle(ROUND_COUNTS, setup.rounds as (typeof ROUND_COUNTS)[number]) })}
            testid="battle-room-rounds"
          />
          <SettingTile
            value={formatClock(config.roundSeconds)}
            label="each"
            onClick={() => change({ ...setup, time: nextInCycle(ROUND_TIME_PRESETS.map(p => p.id), setup.time) })}
            testid="battle-room-time"
          />
          <SettingTile value={examShort(config.exam)} label="Exam" onClick={() => setChoosing(true)} testid="battle-room-exam" />
        </div>
        {timeLabel && <span className="sr-only">{timeLabel.label}: {formatClock(roundSecondsFor(setup.time, setup.exam))} each</span>}
      </div>
      {guest && (
        <p className="text-center text-sm text-[var(--deck-soft)]">{guest.name} is in. Start when you’re both ready — you’ll each pick your topics first.</p>
      )}
      {snapshot.connection === 'error' && (
        <p className="flex items-center justify-center gap-2 text-sm text-amber-400">
          <WifiOff className="h-4 w-4" aria-hidden /> Trouble reaching the battle server — retrying…
        </p>
      )}
      <DeckPrimaryButton
        className="mt-auto"
        disabled={!guest}
        onClick={() => session.openDraft()}
        data-sound="begin"
        data-testid="battle-start-online"
      >
        {guest ? 'Start battle' : 'Waiting for your friend'}
      </DeckPrimaryButton>
      {choosing && (
        <ExamSheet exams={exams} current={setup.exam} onPick={exam => change({ ...setup, exam })} onClose={() => setChoosing(false)} />
      )}
    </div>
  )
}

/** The friend's view of the room they joined: the code, the seats, the settings, and the wait. */
export function DeckGuestRoom({ snapshot, onExit }: { snapshot: SessionSnapshot; onExit: () => void }) {
  useBattleMusic(0)
  const host = snapshot.players[0]
  const inRoom = snapshot.stage === 'lobby'
  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col gap-[22px] px-5 pb-7 pt-3 lg:min-h-screen" data-testid="battle-lobby">
      <RoomTabs tab="join" onBack={onExit} />
      <div className="flex flex-col items-center gap-3.5">
        <h1 className="deck-display text-[32px]">Room code</h1>
        <RoomCodeCards code={snapshot.code} />
      </div>
      <Seats players={snapshot.players} me={1} />
      {inRoom && (
        <div className="flex flex-col gap-2.5">
          <span className="deck-label">Settings</span>
          <div className="grid grid-cols-3 gap-2">
            <SettingTile value={String(snapshot.config.rounds)} label="questions" />
            <SettingTile value={formatClock(snapshot.config.roundSeconds)} label="each" />
            <SettingTile value={examShort(snapshot.config.exam)} label="Exam" />
          </div>
        </div>
      )}
      <p className="mt-auto flex items-center justify-center gap-2 text-sm text-[var(--deck-soft)]" aria-live="polite">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        {inRoom && host ? `Waiting for ${host.name} to start…` : 'Joining…'}
      </p>
    </div>
  )
}

/** *Join*: four empty card slots to type the code into, and the name to sit down under. */
export function DeckJoin({
  code: initialCode,
  name: initialName,
  loading,
  onBack,
  onHost,
  onJoin,
}: {
  code: string
  name: string
  loading: boolean
  onBack: () => void
  onHost: () => void
  onJoin: (code: string, name: string) => void
}) {
  const [code, setCode] = useState(initialCode)
  const [name, setName] = useState(initialName)
  const input = useRef<HTMLInputElement>(null)
  const valid = isRoomCode(code)
  const chars = code.padEnd(ROOM_CODE_LENGTH, ' ').slice(0, ROOM_CODE_LENGTH).split('')
  return (
    <form
      className="flex min-h-[calc(100dvh-3.5rem)] flex-col gap-[22px] px-5 pb-7 pt-3 lg:min-h-screen"
      onSubmit={e => {
        e.preventDefault()
        if (valid && !loading) onJoin(code, name)
      }}
    >
      <RoomTabs tab="join" onBack={onBack} onHost={onHost} />
      <div className="flex flex-col items-center gap-3.5">
        <h1 className="deck-display text-[32px]"><label htmlFor="battle-code">Room code</label></h1>
        <div className="relative" onClick={() => input.current?.focus()}>
          <div className="flex gap-2.5" aria-hidden>
            {chars.map((c, i) => (
              <span
                key={i}
                style={TILT[i % TILT.length]}
                className={cn(
                  'deck-display flex h-[92px] w-[66px] items-center justify-center rounded-xl text-[44px]',
                  c.trim()
                    ? 'bg-[#F5F3F8] text-[var(--deck-ground)] shadow-[0_10px_20px_rgba(0,0,0,.4)]'
                    : cn('border-2 border-dashed text-[var(--deck-dim)]', i === code.length ? 'border-white/70' : 'border-[var(--deck-raised-edge)]'),
                )}
              >
                {c.trim()}
              </span>
            ))}
          </div>
          <input
            ref={input}
            id="battle-code"
            value={code}
            onChange={e => setCode(normalizeRoomCode(e.target.value).slice(0, ROOM_CODE_LENGTH))}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            autoFocus={!initialCode}
            className="absolute inset-0 h-full w-full cursor-text bg-transparent text-transparent caret-transparent outline-none"
            data-testid="battle-join-code"
          />
        </div>
        {code.length === ROOM_CODE_LENGTH && !valid && (
          <p className="text-sm text-red-300">That isn’t a room code. Codes use letters and the digits 2–9.</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="battle-join-name" className="deck-label">Your name</label>
        <input
          id="battle-join-name"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={20}
          placeholder={DEFAULT_PLAYER_NAMES[1]}
          autoComplete="off"
          autoFocus={!!initialCode}
          className="h-11 rounded-xl border border-[var(--deck-card-edge)] bg-[var(--deck-card)] px-3 text-[16px] font-semibold text-white placeholder:text-[var(--deck-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          data-testid="battle-join-name"
        />
      </div>
      <DeckPrimaryButton type="submit" className="mt-auto" disabled={!valid || loading} data-testid="battle-join">
        {loading && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
        Join
      </DeckPrimaryButton>
    </form>
  )
}

/**
 * The lobby paired two players: both cards face up on the table while the
 * room opens and the second player walks into it.
 */
export function DeckMatchIntro({ snapshot, note, opponent }: { snapshot: SessionSnapshot; note: string; opponent?: BattlePlayer }) {
  useBattleMusic(0)
  const opp = (1 - snapshot.me) as Seat
  const players = snapshot.players.map((p, seat) => p ?? (seat === opp ? opponent ?? null : null)) as SessionSnapshot['players']
  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center gap-6 px-4 pb-7 pt-12 lg:min-h-screen" data-testid="battle-match-intro">
      <p className="battle-count-pop deck-display text-[32px]">Match found!</p>
      <DeckTable className="h-[232px] w-full">
        {([0, 1] as const).map(seat => (
          players[seat] ? (
            <PlayerCard
              key={seat}
              seat={seat}
              player={players[seat]}
              caption={players[seat]!.name}
              className={cn('deck-deal absolute top-[26px]', seat === 0 ? 'left-11 [rotate:-4deg]' : 'right-11 [rotate:5deg]')}
            />
          ) : (
            <span key={seat} aria-hidden className={cn('deck-blink absolute top-[26px] h-[134px] w-24 rounded-[14px] border-2 border-dashed border-[var(--deck-raised-edge)]', seat === 0 ? 'left-11' : 'right-11')} />
          )
        ))}
        <span className="deck-display absolute inset-x-0 top-[78px] text-center text-xl text-[var(--deck-dim)]">vs</span>
        {snapshot.config.exam && (
          <p className="absolute inset-x-0 bottom-[22px] text-center text-[13px] text-[var(--deck-label)]">
            {battleExamName(snapshot.config.exam)} · {snapshot.config.rounds} questions · {formatClock(snapshot.config.roundSeconds)} each
          </p>
        )}
      </DeckTable>
      <p className="flex items-center gap-2 text-sm text-[var(--deck-soft)]" aria-live="polite">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        {note}
      </p>
    </div>
  )
}
