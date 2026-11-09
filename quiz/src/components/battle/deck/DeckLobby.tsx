import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import { Music, WifiOff } from 'lucide-react'
import { ConceptTile } from '@/components/ConceptTile'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { DeckBackButton, DeckIconButton, DeckSecondaryButton, DeckTable, ExamDeckIcon, PlayerCard } from '@/components/battle/deck/DeckParts'
import { useBattleMusic, useMusicSwitch, useNow } from '@/hooks/useBattle'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { refKey, useConceptHighlight } from '@/hooks/useConceptHighlight'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { ANY_EXAM, MATCH_ROUNDS, compatible } from '@/lib/battleLobby'
import { MatchmakingSession, type LobbySnapshot } from '@/lib/battleMatchmaking'
import { lobbyOwnerKey, waitedClock } from '@/lib/battleQueue'
import { battleExamName, playerAccentStyle } from '@/lib/battleDisplay'
import { levelTag } from '@/lib/battleDeck'
import { tabClientId } from '@/lib/battleSession'
import { lobbyTransport } from '@/lib/battleTransport'
import { catalogueTopics, type TopicGroup } from '@/lib/battleTopics'
import type { BattlePlayer } from '@/lib/battle'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { useBattleQueueStore } from '@/stores/battleQueueStore'
import { cn } from '@/lib/utils'

// **The lobby, as a table** (docs/quiz-battle-redesign.md §3.3): your card
// against a face-down one shuffling until someone is found, and the exam's
// concept cards to read while you wait. The queue is the lobby's as ever
// (lib/battleLobby.ts, lib/battleQueue.ts, stores/battleQueueStore.ts): this
// screen only asks the store for the session and sits the player in the
// queue on the way in — *Find an opponent* is the Ready. A concept read here
// opens in the concept popup above the lobby, which stays mounted under it,
// so nothing about browsing touches the queue or its heartbeat. A match
// unmounts this screen, and the popup closes with it.

const noSubscribe = () => () => {}
const noSnapshot = () => null

/** The popup's source for a walk opened from the lobby's cards. */
const LOBBY_SOURCE = 'battle:lobby-browse'
/** Cards in the row before *See all*. */
const ROW_CARDS = 8

export function DeckLobby({
  player,
  exam,
  deckExam,
  exams,
  catalogueFor,
  signedIn,
  onExamChange,
  onLeave,
}: {
  player: BattlePlayer
  /** The exam asked for, or `ANY_EXAM`. */
  exam: string
  /** The start screen's deck — the exam the Deck row offers beside *Any exam*. */
  deckExam: string
  exams: readonly { exam: string; count: number }[]
  catalogueFor: (exam: string) => readonly TopicGroup[]
  /** Signed out, the cards show no levels (open question O8). */
  signedIn: boolean
  onExamChange: (exam: string) => void
  onLeave: () => void
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
  // Walking in from *Find an opponent* is pressing Ready: into the queue.
  useEffect(() => {
    if (session && !session.getSnapshot().ready) session.setReady(true)
  }, [session])

  useBattleMusic(0)
  const now = useNow(true, 1000)

  // The popup is this screen's: it must not outlive it — a match closes it.
  useEffect(() => () => useConceptPopup.getState().close(), [])

  function choose(next: string) {
    onExamChange(next)
    session?.setExam(next)
  }
  function leave() {
    session?.setReady(false)
    onLeave()
  }

  const me = snapshot?.me ?? null
  const others = snapshot?.others ?? []
  const connecting = !snapshot || snapshot.status === 'connecting'
  const trouble = snapshot?.connection === 'error'
  const current = me?.exam ?? exam
  const elsewhere = me ? others.filter(o => !compatible(me, o)) : []
  const popupOpen = useConceptPopup(s => s.open)

  return (
    <div
      className="flex min-h-[calc(100dvh-3.5rem)] flex-col pb-7 pt-3 lg:min-h-screen"
      // Below lg the popup docks as a bottom sheet: keep the table scrollable out from under it.
      style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.75rem)' } : undefined}
      data-testid="battle-matchmaking"
    >
      <div className="flex h-12 items-center justify-between gap-2 px-5">
        <DeckBackButton onClick={leave} label="Leave the lobby" />
        <span className="flex min-w-0 items-center gap-2 text-sm font-semibold tabular-nums" aria-live="polite" data-testid="battle-lobby-state">
          <span aria-hidden style={playerAccentStyle(1)} className="deck-blink h-2 w-2 shrink-0 rounded-full bg-[var(--player)]" />
          <span className="truncate">
            {connecting || !me ? 'Connecting to the lobby…' : `Finding an opponent · ${waitedClock(me.since, now)}`}
          </span>
        </span>
        <DeckMusicButton />
      </div>

      <DeckTable className="mx-4 mt-4 h-[232px]">
        <PlayerCard seat={0} player={player} caption={player.name} className="absolute left-11 top-[26px] rotate-[-4deg]" />
        <span className="deck-display absolute inset-x-0 top-[78px] text-center text-xl text-[var(--deck-dim)]">vs</span>
        <div className="absolute right-11 top-[26px] h-[134px] w-24" aria-hidden>
          <div className="deck-shuffle absolute inset-0 rounded-[14px] border-2 border-[#6B2177] bg-[#3B0A45]" />
          <div className="deck-shuffle-2 absolute inset-0 flex items-center justify-center overflow-hidden rounded-[14px] border-2 border-[#86198F] bg-[#4A0D56]">
            <span className="deck-sheen absolute -top-5 left-0 h-[200px] w-[30px] bg-white/[.12]" />
            <span className="deck-display text-[46px] text-[#F0ABFC]">?</span>
          </div>
        </div>
        <p className="absolute inset-x-0 bottom-[22px] text-center text-[13px] text-[var(--deck-label)]">
          {current === ANY_EXAM ? 'Any exam' : battleExamName(current)} · {MATCH_ROUNDS} questions · 2:00 each
        </p>
      </DeckTable>

      <Browse
        exam={current === ANY_EXAM ? deckExam : current}
        catalogueFor={catalogueFor}
        signedIn={signedIn}
      />

      <div className="mt-6 flex flex-wrap items-center gap-3 px-6" role="radiogroup" aria-label="Exam to play">
        <span className="text-[13px] font-bold text-[var(--deck-label)]">Deck</span>
        {deckExam && (
          <button
            type="button"
            role="radio"
            aria-checked={current === deckExam}
            onClick={() => choose(deckExam)}
            data-testid={`battle-lobby-exam-${deckExam}`}
            className={cn(
              'flex h-10 items-center gap-2 rounded-xl border pl-1.5 pr-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
              current === deckExam ? 'border-white bg-[var(--deck-card)] text-white' : 'border-[var(--deck-card-edge)] text-[var(--deck-soft)]',
            )}
          >
            <ExamDeckIcon exam={deckExam} small />
            {battleExamName(deckExam)}
          </button>
        )}
        <button
          type="button"
          role="radio"
          aria-checked={current === ANY_EXAM}
          onClick={() => choose(ANY_EXAM)}
          data-testid={`battle-lobby-exam-${ANY_EXAM}`}
          className={cn(
            'h-10 rounded-xl border px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
            current === ANY_EXAM ? 'border-white bg-[var(--deck-card)] text-white' : 'border-[var(--deck-card-edge)] text-[var(--deck-soft)]',
          )}
        >
          Any exam
        </button>
      </div>

      {elsewhere.length > 0 && (
        <ul className="mt-4 space-y-2 px-6" data-testid="battle-lobby-elsewhere">
          {elsewhere.map(o => (
            <li key={o.id} className="flex items-center gap-3 text-[13px] text-[var(--deck-soft)]" data-testid="battle-lobby-player">
              <span className="min-w-0 flex-1 truncate">{o.name} is waiting for {o.exam === ANY_EXAM ? 'any exam' : battleExamName(o.exam)}</span>
              {o.exam !== ANY_EXAM && (
                <button
                  type="button"
                  onClick={() => choose(o.exam)}
                  className="h-9 shrink-0 rounded-xl border border-[var(--deck-raised-edge)] px-3 text-sm font-semibold text-white hover:bg-[var(--deck-card)]"
                >
                  Play {battleExamName(o.exam)}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {trouble && (
        <p className="mt-4 flex items-center gap-2 px-6 text-sm text-amber-400">
          <WifiOff className="h-4 w-4" aria-hidden /> Trouble reaching the lobby — retrying…
        </p>
      )}

      <div className="mt-auto px-5 pt-8">
        <DeckSecondaryButton onClick={leave} data-testid="battle-lobby-leave">Leave the lobby</DeckSecondaryButton>
      </div>
      <ConceptPopup />
    </div>
  )
}

/** The music's switch, as the lobby's top-right card: white while it plays. */
export function DeckMusicButton() {
  const { on, toggle } = useMusicSwitch()
  const { enabled } = useSoundEffects()
  const playing = on && enabled
  return (
    <DeckIconButton
      label={on ? 'Turn music off' : 'Turn music on'}
      aria-pressed={on}
      onClick={toggle}
      data-testid="battle-music"
      className={playing ? 'bg-white text-[var(--deck-ground)] hover:bg-white/90' : 'text-[var(--deck-dim)]'}
    >
      <Music className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
    </DeckIconButton>
  )
}

/**
 * *Browse while you wait*: the exam's concept cards, the player's own level on
 * each (the flashcard tile's foil edge), each opening in the concept popup.
 */
function Browse({ exam, catalogueFor, signedIn }: {
  exam: string
  catalogueFor: (exam: string) => readonly TopicGroup[]
  signedIn: boolean
}) {
  const levels = useConceptLevels()
  const openAt = useConceptPopup(s => s.openAt)
  const [all, setAll] = useState(false)
  const cards = useMemo(() => {
    if (!exam) return []
    return catalogueFor(exam).flatMap(g => g.topics.map(t => ({ name: t.name, section: g.title })))
  }, [exam, catalogueFor])
  const total = useMemo(() => (exam ? catalogueTopics(catalogueFor(exam)).length : 0), [exam, catalogueFor])
  const shown = all ? cards : cards.slice(0, ROW_CARDS)
  const refs: WikiEntryRef[] = shown.map(c => ({ kind: 'concept' as const, name: c.name }))
  const listRef = useRef<HTMLDivElement>(null)
  useConceptHighlight(listRef as React.RefObject<HTMLElement>, LOBBY_SOURCE)

  if (cards.length === 0) return null
  return (
    <section className="mt-6 flex flex-col gap-3" aria-labelledby="battle-browse" data-testid="battle-browse">
      <div className="flex items-baseline justify-between px-6">
        <h2 id="battle-browse" className="deck-display text-xl">Browse while you wait</h2>
        {total > ROW_CARDS && (
          <button
            type="button"
            onClick={() => setAll(v => !v)}
            aria-expanded={all}
            className="text-[13px] font-semibold text-[var(--deck-soft)] underline-offset-4 hover:underline"
          >
            See all
          </button>
        )}
      </div>
      <div
        ref={listRef}
        className={cn('px-6', all ? 'grid grid-cols-3 gap-3' : '-mb-2 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]')}
      >
        {shown.map((c, i) => {
          const state = levels.levelOf(c.name)
          return (
            <div key={c.name} className={cn('relative', !all && 'w-[132px] shrink-0')}>
              <ConceptTile
                name={c.name}
                state={signedIn ? state : 'new'}
                collected={signedIn && levels.isCollected(c.name)}
                showLock={false}
                onClick={() => openAt(refs, i, LOBBY_SOURCE)}
                data-wikiref={refKey(refs[i])}
                data-testid="battle-browse-card"
                aria-label={`Read ${c.name}`}
                className={cn('concept-row deck-tile w-full !rounded-2xl !bg-[var(--deck-card)] px-3 pt-8', all ? '!aspect-[3/4]' : 'h-[184px] !aspect-auto')}
              />
              <span aria-hidden className="pointer-events-none absolute inset-x-3 top-3 flex justify-between gap-1 text-[11px] font-bold">
                <span className="text-[var(--deck-soft)]">{signedIn ? levelTag(state) : ''}</span>
                <span className="truncate font-semibold text-[var(--deck-label)]">{c.section}</span>
              </span>
            </div>
          )
        })}
      </div>
      <p className="px-6 text-[13px] text-[var(--deck-label)]">Tap a card to read it. If someone joins, you'll go straight back to the table.</p>
    </section>
  )
}
