import { useEffect, useRef, useState } from 'react'
import { Loader2, UserPlus, Users, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PlayerTile } from '@/components/battle/PlayerTile'
import { MusicToggle } from '@/components/battle/BattleTopRow'
import { useBattleMusic, useLobbySession, useNow } from '@/hooks/useBattle'
import { playSound } from '@/lib/soundEngine'
import { ANY_EXAM, MATCH_ROUNDS, compatible, type LobbyEntry } from '@/lib/battleLobby'
import { MatchmakingSession, type MatchFound } from '@/lib/battleMatchmaking'
import { battleExamName, playerAccentStyle } from '@/lib/battleDisplay'
import { tabClientId } from '@/lib/battleSession'
import { lobbyTransport } from '@/lib/battleTransport'
import type { BattlePlayer } from '@/lib/battle'
import { formatClock } from '@/lib/quizTiming'
import { cn } from '@/lib/utils'

/** "0:42" since a moment, on this device's clock. */
function waited(since: number, now: number): string {
  return formatClock(Math.max(0, Math.floor((now - since) / 1000)))
}

function ExamChip({ exam }: { exam: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
      {exam === ANY_EXAM ? 'Any exam' : battleExamName(exam)}
    </span>
  )
}

/** One player waiting in the lobby — and, when they want a different exam, a way to meet them there. */
function LobbyRow({
  entry,
  me,
  now,
  onSwitch,
}: {
  entry: LobbyEntry
  me: LobbyEntry | null
  now: number
  onSwitch: (exam: string) => void
}) {
  const fits = !me || compatible(me, entry)
  return (
    <li className="flex items-center gap-3 rounded-lg bg-card px-3 py-2.5" data-testid="battle-lobby-player">
      <PlayerTile seat={1} player={entry} size={30} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{entry.name}</p>
        <p className="text-xs tabular-nums text-muted-foreground">waiting {waited(entry.since, now)}</p>
      </div>
      <ExamChip exam={entry.exam} />
      {!fits && (
        <Button size="sm" variant="outline" onClick={() => onSwitch(entry.exam)} className="shrink-0">
          Play {battleExamName(entry.exam)}
        </Button>
      )}
    </li>
  )
}

/**
 * The matchmaking lobby (lib/battleMatchmaking.ts): this player joins it on
 * mount, sees who else is waiting — or that nobody is — and is paired with the
 * first compatible player to arrive. The exam can be changed while waiting,
 * without losing the place in the queue.
 */
export function Matchmaking({
  player,
  exam,
  exams,
  onExamChange,
  onMatched,
  onPlayFriend,
}: {
  player: BattlePlayer
  /** The exam asked for, or `ANY_EXAM`. */
  exam: string
  exams: readonly { exam: string; count: number }[]
  onExamChange: (exam: string) => void
  onMatched: (match: MatchFound) => void
  /** Nobody here: make a room for a friend instead. */
  onPlayFriend: () => void
}) {
  const [id] = useState(() => tabClientId(null))
  const examIds = exams.map(e => e.exam)
  const { session, snapshot } = useLobbySession(
    () => new MatchmakingSession({
      transport: lobbyTransport(id),
      exams: examIds,
      player: { id, name: player.name, ...(player.avatarUrl ? { avatarUrl: player.avatarUrl } : {}) },
      exam,
    }),
    id,
  )
  useBattleMusic(0)
  const now = useNow(true, 1000)

  // Matched: the chime, and on to the room.
  const handled = useRef(false)
  useEffect(() => {
    if (!snapshot?.match || handled.current) return
    handled.current = true
    playSound('matchFound')
    onMatched(snapshot.match)
  }, [snapshot?.match, onMatched])

  function choose(next: string) {
    onExamChange(next)
    session?.setExam(next)
  }

  const me = snapshot?.me ?? null
  const others = snapshot?.others ?? []
  const connecting = !snapshot || snapshot.status === 'connecting'
  const trouble = snapshot?.connection === 'error'
  const current = me?.exam ?? exam

  return (
    <div className="space-y-6" data-testid="battle-matchmaking">
      <div className="space-y-5 rounded-xl bg-card p-5">
        <div className="flex items-center gap-4">
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center" style={playerAccentStyle(0)} aria-hidden>
            {!connecting && <span className="battle-radar absolute inset-0 rounded-full" />}
            {!connecting && <span className="battle-radar battle-radar-late absolute inset-0 rounded-full" />}
            <PlayerTile seat={0} player={player} size={44} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold" aria-live="polite">
              {connecting ? 'Connecting to the lobby…' : 'Looking for an opponent…'}
            </p>
            <p className="text-sm text-muted-foreground">
              {current === ANY_EXAM ? 'Any exam' : battleExamName(current)} · {MATCH_ROUNDS} questions · 2:00 each
            </p>
            {me && (
              <p className="text-xs tabular-nums text-muted-foreground">Waiting {waited(me.since, now)}</p>
            )}
          </div>
          <MusicToggle />
        </div>

        <div role="radiogroup" aria-label="Exam to play" className="flex flex-wrap gap-2">
          {[ANY_EXAM, ...examIds].map(option => {
            const selected = current === option
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => choose(option)}
                data-testid={`battle-lobby-exam-${option}`}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  selected ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {option === ANY_EXAM ? 'Any exam' : battleExamName(option)}
              </button>
            )
          })}
        </div>

        {trouble && (
          <p className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <WifiOff className="h-4 w-4" aria-hidden /> Trouble reaching the lobby — retrying…
          </p>
        )}
      </div>

      <section className="space-y-2" aria-live="polite">
        <h2 className="flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          In the lobby
          <span className="rounded-full bg-muted px-1.5 py-0.5 tabular-nums" data-testid="battle-lobby-count">{others.length}</span>
        </h2>
        {connecting ? (
          <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Checking who’s here…
          </div>
        ) : others.length === 0 ? (
          <div className="space-y-3 rounded-xl border border-dashed border-border px-5 py-8 text-center" data-testid="battle-lobby-empty">
            <Users className="mx-auto h-7 w-7 text-muted-foreground" aria-hidden />
            <div className="space-y-1">
              <p className="font-medium">No one else is in the lobby right now.</p>
              <p className="text-sm text-muted-foreground">
                Stay on this page and you’ll be matched the moment someone joins — or battle a friend instead.
              </p>
            </div>
            <Button variant="outline" onClick={onPlayFriend} className="gap-2">
              <UserPlus className="h-4 w-4" aria-hidden />
              Create a room for a friend
            </Button>
          </div>
        ) : (
          <>
            <ul className="space-y-1.5">
              {others.map(entry => (
                <LobbyRow key={entry.id} entry={entry} me={me} now={now} onSwitch={choose} />
              ))}
            </ul>
            {me && !others.some(o => compatible(me, o)) && (
              <p className="px-1 text-sm text-muted-foreground">
                Nobody here wants {current === ANY_EXAM ? 'to play' : battleExamName(current)} yet — join one of them, or keep waiting.
              </p>
            )}
          </>
        )}
      </section>
    </div>
  )
}
