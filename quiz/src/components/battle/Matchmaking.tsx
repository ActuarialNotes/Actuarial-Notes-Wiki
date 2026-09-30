import { useEffect, useState, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import { Loader2, UserPlus, Users, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PlayerTile } from '@/components/battle/PlayerTile'
import { MusicToggle } from '@/components/battle/BattleTopRow'
import { useBattleMusic, useNow } from '@/hooks/useBattle'
import { ANY_EXAM, MATCH_ROUNDS, compatible, type LobbyEntry } from '@/lib/battleLobby'
import { MatchmakingSession, type LobbySnapshot } from '@/lib/battleMatchmaking'
import { lobbyOwnerKey, waitedClock } from '@/lib/battleQueue'
import { battleExamName, playerAccentStyle } from '@/lib/battleDisplay'
import { tabClientId } from '@/lib/battleSession'
import { lobbyTransport } from '@/lib/battleTransport'
import type { BattlePlayer } from '@/lib/battle'
import { useBattleQueueStore } from '@/stores/battleQueueStore'
import { cn } from '@/lib/utils'

const noSubscribe = () => () => {}
const noSnapshot = () => null

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
        <p className="text-xs tabular-nums text-muted-foreground">waiting {waitedClock(entry.since, now)}</p>
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
 * The matchmaking lobby (lib/battleMatchmaking.ts): this player walks in on
 * mount and sees who else is waiting — or that nobody is — but is only in the
 * queue once they press **Ready**; then they are paired with the first
 * compatible player to arrive, until they press Cancel. The exam can be
 * changed either way, without losing the place in the queue.
 *
 * The session is the queue store's, not this screen's
 * (stores/battleQueueStore.ts): a ready player can leave the page and keep
 * their place, and walking back in — from the pill, or from Find an opponent —
 * picks the same session up. A match, here or elsewhere, is found by the store
 * and picked up by the battle page.
 */
export function Matchmaking({
  player,
  exam,
  exams,
  onExamChange,
  onPlayFriend,
}: {
  player: BattlePlayer
  /** The exam asked for, or `ANY_EXAM`. */
  exam: string
  exams: readonly { exam: string; count: number }[]
  onExamChange: (exam: string) => void
  /** Nobody here: make a room for a friend instead. */
  onPlayFriend: () => void
}) {
  const { pathname } = useLocation()
  const examIds = exams.map(e => e.exam)
  const ownerKey = lobbyOwnerKey(player)
  const [session, setSession] = useState<MatchmakingSession | null>(null)
  useEffect(() => {
    const { openLobby, releaseLobby } = useBattleQueueStore.getState()
    const s = openLobby(ownerKey, pathname, ready => {
      const id = tabClientId(null)
      return new MatchmakingSession({
        transport: lobbyTransport(id),
        exams: examIds,
        player: { id, name: player.name, ...(player.avatarUrl ? { avatarUrl: player.avatarUrl } : {}) },
        exam,
        ready,
      })
    })
    setSession(s)
    return () => {
      releaseLobby(s)
      setSession(null)
    }
    // A new name or avatar is a new entry; everything else is read once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerKey])
  const snapshot: LobbySnapshot | null = useSyncExternalStore(
    session ? session.subscribe : noSubscribe,
    session ? session.getSnapshot : noSnapshot,
  )
  useBattleMusic(0)
  const now = useNow(true, 1000)

  function choose(next: string) {
    onExamChange(next)
    session?.setExam(next)
  }

  const me = snapshot?.me ?? null
  const others = snapshot?.others ?? []
  const connecting = !snapshot || snapshot.status === 'connecting'
  const trouble = snapshot?.connection === 'error'
  const current = me?.exam ?? exam
  const ready = !!snapshot?.ready
  const searching = ready && !connecting

  return (
    <div className="space-y-6" data-testid="battle-matchmaking">
      <div className="space-y-5 rounded-xl bg-card p-5">
        <div className="flex items-center gap-4">
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center" style={playerAccentStyle(0)} aria-hidden>
            {searching && <span className="battle-radar absolute inset-0 rounded-full" />}
            {searching && <span className="battle-radar battle-radar-late absolute inset-0 rounded-full" />}
            <PlayerTile seat={0} player={player} size={44} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold" aria-live="polite">
              {connecting ? 'Connecting to the lobby…' : ready ? 'Looking for an opponent…' : 'Ready when you are'}
            </p>
            <p className="text-sm text-muted-foreground">
              {current === ANY_EXAM ? 'Any exam' : battleExamName(current)} · {MATCH_ROUNDS} questions · 2:00 each
            </p>
            {me && searching && (
              <p className="text-xs tabular-nums text-muted-foreground">Waiting {waitedClock(me.since, now)}</p>
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

        <Button
          size="lg"
          variant={ready ? 'outline' : 'default'}
          className="h-12 w-full rounded-xl"
          onClick={() => session?.setReady(!ready)}
          disabled={connecting}
          aria-pressed={ready}
          data-testid="battle-lobby-ready"
        >
          {ready ? 'Cancel' : 'Ready'}
        </Button>

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
                {ready
                  ? 'You’ll be matched the moment someone joins, even if you leave this page — or battle a friend instead.'
                  : 'Press Ready and you’ll be matched the moment someone joins — or battle a friend instead.'}
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
