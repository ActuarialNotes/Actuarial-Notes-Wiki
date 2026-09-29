import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Lock, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CONCEPT_TILE_GRID, ConceptTile, ConceptTileStatic } from '@/components/ConceptTile'
import { BattleActionBar } from '@/components/battle/BattleActionBar'
import { BattleTopRow } from '@/components/battle/BattleTopRow'
import { PlayerTile } from '@/components/battle/PlayerTile'
import type { PlayerStatus } from '@/components/battle/BattleScoreboard'
import { useBattleMusic, useNow } from '@/hooks/useBattle'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { SEATS, isFinalRound, otherSeat, type BattlePlayer, type Seat } from '@/lib/battle'
import {
  battleExamName,
  draftMusicIntensity,
  pickCountLine,
  playerAccent,
  playerAccentStyle,
  topicCredit,
} from '@/lib/battleDisplay'
import type { SessionSnapshot } from '@/lib/battleSession'
import {
  MAX_TOPICS,
  TOPIC_PICK_MS,
  TOPIC_REVEAL_MS,
  drawStartedAt,
  drawnSoFar,
  toggleTopic,
  topicPickers,
  type BattleDraft,
  type TopicGroup,
} from '@/lib/battleTopics'
import { latestMasteryStates, type MasteryState } from '@/lib/mastery'
import { playSound } from '@/lib/soundEngine'
import { cn } from '@/lib/utils'

// **Quiz Battle, before the first question** — the topic pick and the draw
// (lib/battleTopics.ts). Each player picks up to three topics on cards drawn
// exactly as the flashcard picker draws them — the foil edge is the player's
// own level on that concept — and neither sees the other's until both are in.
// Then both picks are laid out and the questions are dealt from them, one card
// at a time, before the count-in.

interface Levels {
  levelOf: (name: string) => MasteryState
  isCollected: (name: string) => boolean
}

/** This player's level on each concept and whether they've collected its card — what a tile's edge says. */
function useConceptLevels(): Levels {
  const { records } = useConceptMastery()
  const cards = useCollectedCards(s => s.cards)
  return useMemo(() => {
    const states = latestMasteryStates(records, new Date())
    const collected = new Set(cards.map(c => c.name.toLowerCase()))
    return {
      levelOf: name => states.get(name.toLowerCase()) ?? 'new',
      isCollected: name => collected.has(name.toLowerCase()),
    }
  }, [records, cards])
}

/** The pick or the draw, whichever the room is at. */
export function BattleDraftScreen({
  snapshot,
  catalogue,
  onChoose,
  onLock,
  onLeave,
}: {
  snapshot: SessionSnapshot
  /** The topics this battle's exam offers, grouped. */
  catalogue: readonly TopicGroup[]
  onChoose: (topics: string[]) => void
  onLock: () => void
  onLeave: () => void
}) {
  const draft = snapshot.draft!
  const levels = useConceptLevels()

  // The pick and the draw each start at the top of the page, not wherever the
  // topic list was left.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [draft.phase, draft.game])

  return (
    <div style={{ paddingBottom: 'calc(var(--action-bar-height, 7rem) + 1.5rem)' }}>
      <DraftMusic draft={draft} />
      <BattleTopRow onLeave={onLeave} leaveLabel="Leave">
        <span className="truncate">{battleExamName(snapshot.config.exam)} · room {snapshot.code}</span>
      </BattleTopRow>
      {draft.phase === 'picking' ? (
        <TopicPicker snapshot={snapshot} draft={draft} catalogue={catalogue} levels={levels} onChoose={onChoose} onLock={onLock} />
      ) : (
        <TopicDraw snapshot={snapshot} draft={draft} levels={levels} />
      )}
    </div>
  )
}

/**
 * The music under the pick and the draw. Its own component, so the clock it
 * reads twice a second redraws nothing else — least of all a grid of tiles.
 */
function DraftMusic({ draft }: { draft: BattleDraft }) {
  const now = useNow(true, 500)
  useBattleMusic(draftMusicIntensity(draft, now))
  return null
}

// ── The pick ────────────────────────────────────────────────────────────────

function DraftPlayer({ seat, player, isMe, status }: {
  seat: Seat
  player: BattlePlayer | null
  isMe: boolean
  status: PlayerStatus
}) {
  const mirrored = seat === 1
  return (
    <div
      style={playerAccentStyle(seat)}
      className={cn('flex min-w-0 items-center gap-2.5 rounded-xl bg-card px-2.5 py-2 sm:px-3', mirrored && 'flex-row-reverse text-right')}
      data-testid={`battle-player-${seat}`}
    >
      <PlayerTile seat={seat} player={player} size={34} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {player?.name ?? '…'}
          {isMe && <span className="text-xs font-normal text-muted-foreground"> (you)</span>}
        </p>
        <p
          className={cn(
            'h-4 truncate text-xs',
            status.tone === 'player' ? 'font-medium text-[var(--player)]'
              : status.tone === 'caution' ? 'text-amber-600 dark:text-amber-400'
              : 'text-muted-foreground',
          )}
          aria-live="polite"
        >
          {status.text}
        </p>
      </div>
    </div>
  )
}

/**
 * The pick's clock: the round clock's ring, emptying over the thirty seconds,
 * amber in the last ten. It keeps its own time, so the tiles aren't redrawn
 * with every step of it.
 */
function PickClock({ deadline, ticking }: { deadline: number; ticking: boolean }) {
  const now = useNow(true, 200)
  const msLeft = Math.max(0, deadline - now)
  const seconds = Math.ceil(msLeft / 1000)
  const low = seconds <= 10

  // Heard in its last five seconds, while this player still has a pick to make.
  const lastTick = useRef<number | null>(null)
  useEffect(() => {
    if (!ticking || seconds > 5 || seconds <= 0) {
      lastTick.current = null
      return
    }
    if (lastTick.current === seconds) return
    lastTick.current = seconds
    playSound('clockTick')
  }, [ticking, seconds])

  const r = 22
  const circumference = 2 * Math.PI * r
  return (
    <div className="flex shrink-0 flex-col items-center gap-0.5" data-testid="battle-topic-clock">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Topics</span>
      <div className="relative h-14 w-14" role="timer" aria-label={`${seconds} seconds left to pick`}>
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
            strokeDashoffset={circumference * (1 - Math.max(0, Math.min(1, msLeft / TOPIC_PICK_MS)))}
            className={cn('transition-[stroke-dashoffset] duration-200 ease-linear', low ? 'stroke-amber-500' : 'stroke-foreground')}
          />
        </svg>
        <span className={cn('absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums', low && 'text-amber-600 dark:text-amber-400')}>
          {seconds}
        </span>
      </div>
    </div>
  )
}

function TopicPicker({
  snapshot,
  draft,
  catalogue,
  levels,
  onChoose,
  onLock,
}: {
  snapshot: SessionSnapshot
  draft: BattleDraft
  catalogue: readonly TopicGroup[]
  levels: Levels
  onChoose: (topics: string[]) => void
  onLock: () => void
}) {
  const me = snapshot.me
  const opp = otherSeat(me)
  const locked = draft.picks[me] !== null
  const oppLocked = draft.picks[opp] !== null
  const chosen = locked ? draft.picks[me]! : snapshot.topicChoice
  const full = chosen.length >= MAX_TOPICS
  const oppName = snapshot.players[opp]?.name ?? 'your opponent'
  const [query, setQuery] = useState('')

  // The other player locking in is two soft knocks, as it is on a question.
  const heardOpp = useRef(oppLocked)
  useEffect(() => {
    if (oppLocked && !heardOpp.current) playSound('opponentIn')
    heardOpp.current = oppLocked
  }, [oppLocked])

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return catalogue
    return catalogue
      .map(g => ({ ...g, topics: g.topics.filter(t => t.name.toLowerCase().includes(q)) }))
      .filter(g => g.topics.length > 0)
  }, [catalogue, query])

  const isChosen = (name: string) => chosen.some(t => t.toLowerCase() === name.toLowerCase())

  function toggle(name: string) {
    if (locked) return
    const next = toggleTopic(chosen, name)
    if (next.length === chosen.length) return
    playSound('tick')
    onChoose(next)
  }

  function lock() {
    if (locked) return
    playSound('lockIn')
    onLock()
  }

  const status = (seat: Seat): PlayerStatus => {
    if (seat === opp && !snapshot.opponentPresent) return { text: 'Reconnecting…', tone: 'caution' }
    return draft.picks[seat] !== null ? { text: 'Locked in', tone: 'player' } : { text: 'Choosing…', tone: 'muted' }
  }

  return (
    <div data-testid="battle-topic-picker">
      <div className="sticky top-14 z-20 -mx-4 bg-background/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:top-0">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-4">
          <DraftPlayer seat={0} player={snapshot.players[0]} isMe={me === 0} status={status(0)} />
          <PickClock deadline={draft.deadline} ticking={!locked} />
          <DraftPlayer seat={1} player={snapshot.players[1]} isMe={me === 1} status={status(1)} />
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h1 className="text-xl font-bold tracking-tight">Pick your topics</h1>
        <p className="text-sm text-muted-foreground">
          Up to {MAX_TOPICS}. The questions are drawn from both players’ picks — and {oppName} won’t see yours until you’re both locked in.
        </p>
      </div>

      <div className="relative mt-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search topics"
          aria-label="Search topics"
          autoComplete="off"
          className="h-10 pl-9 text-[16px] sm:text-sm"
          data-testid="battle-topic-search"
        />
      </div>

      <div className="mt-4 space-y-5">
        {groups.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">No topic matches “{query.trim()}”.</p>
        ) : groups.map(group => (
          <section key={group.title} className="space-y-2">
            <h3 className="text-sm font-semibold leading-tight">{group.title}</h3>
            <div className={CONCEPT_TILE_GRID}>
              {group.topics.map(topic => {
                const selected = isChosen(topic.name)
                const collected = levels.isCollected(topic.name)
                return (
                  <ConceptTile
                    key={topic.name}
                    name={topic.name}
                    state={levels.levelOf(topic.name)}
                    collected={collected}
                    selected={selected}
                    disabled={!selected && (locked || full)}
                    aria-disabled={locked || undefined}
                    aria-pressed={selected}
                    onClick={() => toggle(topic.name)}
                    data-sound="none"
                    data-testid="battle-topic"
                    data-topic={topic.name}
                    title={`${topic.name} — ${topic.questions} ${topic.questions === 1 ? 'question' : 'questions'}${collected ? '' : ' · not collected yet'}`}
                    aria-label={`${topic.name}, ${topic.questions} ${topic.questions === 1 ? 'question' : 'questions'}`}
                  />
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <BattleActionBar>
        {locked ? (
          <p className="py-2 text-center text-sm text-muted-foreground" aria-live="polite" data-testid="battle-topics-locked">
            {oppLocked ? 'Both in — drawing the questions…' : `Locked in. Waiting for ${oppName}…`}
          </p>
        ) : (
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium tabular-nums" data-testid="battle-topic-count">{pickCountLine(chosen.length, MAX_TOPICS)}</p>
              <p className="truncate text-xs text-muted-foreground">
                {chosen.length > 0 ? chosen.join(' · ') : 'None picked: any topic'}
              </p>
            </div>
            <Button size="lg" onClick={lock} className="h-12 shrink-0 gap-2 rounded-xl" data-sound="none" data-testid="battle-topics-lock">
              <Lock className="h-4 w-4" aria-hidden />
              Lock in
            </Button>
          </div>
        )}
      </BattleActionBar>
    </div>
  )
}

// ── The draw ────────────────────────────────────────────────────────────────

/** One player's picks, face up, in their colour. */
function PickPanel({ seat, player, isMe, picks, levels }: {
  seat: Seat
  player: BattlePlayer | null
  isMe: boolean
  picks: string[] | null
  levels: Levels
}) {
  return (
    <div
      style={playerAccentStyle(seat)}
      className="battle-pick-in space-y-3 rounded-xl p-3 ring-2 ring-inset ring-[var(--player-muted)]"
      data-testid={`battle-picks-${seat}`}
    >
      <div className="flex items-center gap-2">
        <PlayerTile seat={seat} player={player} size={26} />
        <p className="min-w-0 truncate text-sm font-medium">
          {isMe ? 'Your topics' : `${player?.name ?? 'Their'}’s topics`}
        </p>
      </div>
      {picks && picks.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {picks.map(name => (
            <ConceptTileStatic
              key={name}
              name={name}
              state={levels.levelOf(name)}
              collected={levels.isCollected(name)}
              className="w-20"
            />
          ))}
        </div>
      ) : (
        <p className="py-2 text-sm text-muted-foreground">No topics — any question from the exam.</p>
      )}
    </div>
  )
}

/** The stripe under a drawn card: whose topic it was, in their colour — both, where both picked it. */
function pickerStripe(pickers: Seat[]): CSSProperties | undefined {
  if (pickers.length === 2) return { background: `linear-gradient(to right, ${playerAccent(0)}, ${playerAccent(1)})` }
  if (pickers.length === 1) return { background: playerAccent(pickers[0]) }
  return undefined
}

function TopicDraw({ snapshot, draft, levels }: { snapshot: SessionSnapshot; draft: BattleDraft; levels: Levels }) {
  const me = snapshot.me
  const now = useNow(true, 100)
  const count = draft.drawn.length
  const elapsed = now - drawStartedAt(draft)
  const shown = drawnSoFar(count, elapsed)
  const names: [string, string] = [snapshot.players[0]?.name ?? 'Player 1', snapshot.players[1]?.name ?? 'Player 2']

  // The deck is riffled as the picks go up, and each question lands as a card
  // turning over.
  const heard = useRef<number | null>(null)
  useEffect(() => {
    if (heard.current === null) {
      heard.current = shown
      if (shown === 0 && elapsed < TOPIC_REVEAL_MS) playSound('shuffle')
      return
    }
    if (shown > heard.current) playSound('page')
    heard.current = shown
  }, [shown, elapsed])

  return (
    <div className="space-y-6 pt-4" data-testid="battle-topic-draw">
      <div className="space-y-1 text-center">
        <p className="battle-count-pop text-2xl font-bold tracking-tight">The draw</p>
        <p className="text-sm text-muted-foreground">{count} {count === 1 ? 'question' : 'questions'} from your topics</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {SEATS.map(seat => (
          <PickPanel
            key={seat}
            seat={seat}
            player={snapshot.players[seat]}
            isMe={seat === me}
            picks={draft.picks[seat]}
            levels={levels}
          />
        ))}
      </div>

      <ol className="flex flex-wrap justify-center gap-3" aria-label="The questions drawn">
        {draft.drawn.map((d, i) => {
          const final = isFinalRound({ config: { ...snapshot.config, rounds: count } }, i)
          const pickers = topicPickers(draft.picks, d.topic)
          const label = final ? 'Final ×2' : `Q${i + 1}`
          const up = i < shown
          return (
            <li key={`${d.id}-${i}`} className="flex w-20 flex-col items-center gap-1.5" data-testid="battle-drawn" data-drawn={up || undefined}>
              {up ? (
                <div className="battle-draw-card w-full" title={`${d.topic ?? 'Any topic'} — ${topicCredit(draft.picks, d.topic, names)}`}>
                  {d.topic ? (
                    <ConceptTileStatic name={d.topic} state={levels.levelOf(d.topic)} collected={levels.isCollected(d.topic)} />
                  ) : (
                    <div className="flex aspect-[4/5] items-center justify-center rounded-md bg-card p-1.5 text-center text-[10px] font-medium text-muted-foreground">
                      Any topic
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center rounded-md border border-dashed border-border bg-muted/40" aria-hidden>
                  <span className="text-lg font-bold text-muted-foreground/50">?</span>
                </div>
              )}
              <span
                aria-hidden
                className={cn('h-1 w-10 rounded-full transition-opacity duration-300', pickers.length === 0 && 'bg-muted', !up && 'opacity-0')}
                style={up ? pickerStripe(pickers) : undefined}
              />
              <span className={cn('text-[11px] font-semibold uppercase tracking-wider', final ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground')}>
                {label}
              </span>
              <span className="sr-only">{up ? `${d.topic ?? 'Any topic'}, ${topicCredit(draft.picks, d.topic, names)}` : 'Not drawn yet'}</span>
            </li>
          )
        })}
      </ol>

      <p className="text-center text-sm text-muted-foreground" aria-live="polite">
        {shown < count ? 'Drawing…' : 'Get ready…'}
      </p>
    </div>
  )
}
