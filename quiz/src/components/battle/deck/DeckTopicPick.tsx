import { useEffect, useMemo, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { ConceptTile, ConceptTileStatic } from '@/components/ConceptTile'
import { DeckPrimaryButton, PlayerCard, StepHeader } from '@/components/battle/deck/DeckParts'
import { LeaveButton } from '@/components/battle/deck/DeckRound'
import { useBattleMusic, useNow } from '@/hooks/useBattle'
import { useConceptLevels, type ConceptLevels } from '@/hooks/useConceptLevels'
import { isFinalRound, otherSeat, type Seat } from '@/lib/battle'
import { battleExamName, draftMusicIntensity, pickCountLine, playerAccent, playerAccentStyle, topicCredit } from '@/lib/battleDisplay'
import { levelTag } from '@/lib/battleDeck'
import type { SessionSnapshot } from '@/lib/battleSession'
import {
  MAX_TOPICS,
  TOPIC_REVEAL_MS,
  drawStartedAt,
  drawnSoFar,
  toggleTopic,
  topicPickers,
  type BattleDraft,
  type TopicGroup,
} from '@/lib/battleTopics'
import { formatClock } from '@/lib/quizTiming'
import { playSound } from '@/lib/soundEngine'
import { cn } from '@/lib/utils'

// **Today's topic pick, in the deck look** (docs/quiz-battle-redesign.md §3.6
// and §6, phase 1). The rules are lib/battleTopics.ts's, unchanged: up to three
// topics each in thirty seconds, neither player seeing the other's until both
// are in, the questions drawn from both. Only the look is the Deck's — a hand
// along the top, the exam's topics as flashcard tiles below, and the step
// header with its one step, *Pick*. The draft that adds Strike and Deal is
// phase 2.

const STEPS = ['Pick'] as const

export function DeckDraftScreen({
  snapshot,
  catalogue,
  onChoose,
  onLock,
  onLeave,
}: {
  snapshot: SessionSnapshot
  catalogue: readonly TopicGroup[]
  onChoose: (topics: string[]) => void
  onLock: () => void
  onLeave: () => void
}) {
  const draft = snapshot.draft!
  const levels = useConceptLevels()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [draft.phase, draft.game])
  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col gap-4 px-5 pb-6 pt-4 lg:min-h-screen">
      <DraftMusic draft={draft} />
      {draft.phase === 'picking' ? (
        <Picker snapshot={snapshot} draft={draft} catalogue={catalogue} levels={levels} onChoose={onChoose} onLock={onLock} onLeave={onLeave} />
      ) : (
        <Draw snapshot={snapshot} draft={draft} levels={levels} onLeave={onLeave} />
      )}
    </div>
  )
}

function DraftMusic({ draft }: { draft: BattleDraft }) {
  const now = useNow(true, 500)
  useBattleMusic(draftMusicIntensity(draft, now))
  return null
}

/** The pick's clock, top right: 0:24, amber in the last ten. */
function PickClock({ deadline, ticking }: { deadline: number; ticking: boolean }) {
  const now = useNow(true, 200)
  const seconds = Math.ceil(Math.max(0, deadline - now) / 1000)
  const lastTick = useRef<number | null>(null)
  useEffect(() => {
    if (!ticking || seconds > 5 || seconds <= 0) { lastTick.current = null; return }
    if (lastTick.current === seconds) return
    lastTick.current = seconds
    playSound('clockTick')
  }, [ticking, seconds])
  return (
    <span
      role="timer"
      aria-label={`${seconds} seconds left to pick`}
      className={cn('deck-display text-[22px] tabular-nums', seconds <= 10 && 'text-amber-400')}
      data-testid="battle-topic-clock"
    >
      {formatClock(seconds)}
    </span>
  )
}

/** The other player's hand: face-down pips, never what is on them. */
function TheirHand({ seat, name, locked, present }: { seat: Seat; name: string; locked: boolean; present: boolean }) {
  const status = !present ? 'Reconnecting…' : locked ? 'Locked in' : 'Choosing…'
  return (
    <span style={playerAccentStyle(seat)} className="flex shrink-0 items-center gap-1.5 text-xs text-[color-mix(in_srgb,var(--player)_40%,white)]" data-testid={`battle-player-${seat}`}>
      <span className="max-w-[7rem] truncate">{name}</span>
      {Array.from({ length: MAX_TOPICS }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className={cn('h-5 w-3.5 rounded-[3px]', locked ? 'bg-[var(--player-vivid)]' : 'border-[1.5px] border-dashed border-[var(--player-muted)]', !locked && i === 0 && 'deck-blink')}
        />
      ))}
      <span className="sr-only" aria-live="polite">{status}</span>
    </span>
  )
}

function Picker({ snapshot, draft, catalogue, levels, onChoose, onLock, onLeave }: {
  snapshot: SessionSnapshot
  draft: BattleDraft
  catalogue: readonly TopicGroup[]
  levels: ConceptLevels
  onChoose: (topics: string[]) => void
  onLock: () => void
  onLeave: () => void
}) {
  const me = snapshot.me
  const opp = otherSeat(me)
  const locked = draft.picks[me] !== null
  const oppLocked = draft.picks[opp] !== null
  const chosen = locked ? draft.picks[me]! : snapshot.topicChoice
  const full = chosen.length >= MAX_TOPICS
  const oppName = snapshot.players[opp]?.name ?? 'your opponent'
  const [query, setQuery] = useState('')

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

  return (
    <div className="flex flex-1 flex-col gap-4" data-testid="battle-topic-picker">
      <StepHeader steps={STEPS} current={0} aside={<span className="flex items-center gap-3"><PickClock deadline={draft.deadline} ticking={!locked} /><LeaveButton onLeave={onLeave} /></span>} />

      <div className="flex items-center justify-between gap-3">
        <h1 className="deck-display text-[28px] leading-tight">Pick your topics</h1>
        <TheirHand seat={opp} name={oppName} locked={oppLocked} present={snapshot.opponentPresent} />
      </div>

      <div className="flex flex-col gap-2" style={playerAccentStyle(me)}>
        <span className="deck-label !text-[color-mix(in_srgb,var(--player)_40%,white)]">
          Your hand · <span data-testid="battle-topic-count">{pickCountLine(chosen.length, MAX_TOPICS)}</span>
        </span>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: MAX_TOPICS }, (_, i) => {
            const name = chosen[i]
            return name ? (
              <button
                key={name}
                type="button"
                onClick={() => toggle(name)}
                disabled={locked}
                className="deck-deal deck-display h-[62px] rounded-xl border-2 border-[var(--player)] bg-[var(--player-vivid)] p-1.5 text-left text-xs leading-[1.1] disabled:cursor-default"
                aria-label={`${name}, in your hand`}
              >
                <span className="line-clamp-3">{name}</span>
              </button>
            ) : (
              <span key={`slot-${i}`} aria-hidden className="flex h-[62px] items-center justify-center rounded-xl border-2 border-dashed border-[var(--player-muted)] text-[22px] text-[var(--player)]">+</span>
            )
          })}
        </div>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--deck-dim)]" aria-hidden />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search topics"
          aria-label="Search topics"
          autoComplete="off"
          className="h-10 w-full rounded-xl border border-[var(--deck-card-edge)] bg-[var(--deck-card)] pl-9 pr-3 text-[16px] text-white placeholder:text-[var(--deck-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:text-sm"
          data-testid="battle-topic-search"
        />
      </div>

      <div className="flex flex-col gap-4">
        {groups.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--deck-label)]">No topic matches “{query.trim()}”.</p>
        ) : groups.map(group => (
          <section key={group.title} className="flex flex-col gap-2">
            <h3 className="deck-label">{group.title}</h3>
            <div className="grid grid-cols-3 gap-2">
              {group.topics.map(topic => {
                const selected = isChosen(topic.name)
                const collected = levels.isCollected(topic.name)
                const state = levels.levelOf(topic.name)
                return (
                  <div key={topic.name} className="relative">
                    <ConceptTile
                      name={topic.name}
                      state={state}
                      collected={collected}
                      selected={selected}
                      showLock={false}
                      disabled={!selected && (locked || full)}
                      aria-disabled={locked || undefined}
                      aria-pressed={selected}
                      onClick={() => toggle(topic.name)}
                      data-sound="none"
                      data-testid="battle-topic"
                      data-topic={topic.name}
                      title={`${topic.name} — ${topic.questions} ${topic.questions === 1 ? 'question' : 'questions'}${collected ? '' : ' · not collected yet'}`}
                      aria-label={`${topic.name}, ${topic.questions} ${topic.questions === 1 ? 'question' : 'questions'}`}
                      className="deck-tile deck-tile-sm w-full !aspect-auto min-h-[76px] !items-end !bg-[var(--deck-card)] pb-2 pt-6"
                    />
                    <span aria-hidden className="pointer-events-none absolute left-2 top-1.5 text-[10px] font-bold text-[var(--deck-soft)]">{levelTag(state)}</span>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="sticky bottom-4 mt-auto pt-2">
        {locked ? (
          <p className="rounded-[18px] bg-[var(--deck-table)] py-4 text-center text-sm text-[var(--deck-soft)]" aria-live="polite" data-testid="battle-topics-locked">
            {oppLocked ? 'Both in — drawing the questions…' : `Locked in. Waiting for ${oppName}…`}
          </p>
        ) : (
          <DeckPrimaryButton onClick={lock} data-sound="none" data-testid="battle-topics-lock">Lock in my hand</DeckPrimaryButton>
        )}
      </div>
    </div>
  )
}

/** The draw: both hands face up, then the questions dealt from them one card at a time. */
function Draw({ snapshot, draft, levels, onLeave }: { snapshot: SessionSnapshot; draft: BattleDraft; levels: ConceptLevels; onLeave: () => void }) {
  const me = snapshot.me
  const now = useNow(true, 100)
  const count = draft.drawn.length
  const elapsed = now - drawStartedAt(draft)
  const shown = drawnSoFar(count, elapsed)
  const names: [string, string] = [snapshot.players[0]?.name ?? 'Player 1', snapshot.players[1]?.name ?? 'Player 2']

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

  // Theirs along the top, yours along the bottom, as the table is sat.
  const seats: Seat[] = [otherSeat(me), me]
  return (
    <div className="flex flex-1 flex-col gap-4" data-testid="battle-topic-draw">
      <StepHeader steps={STEPS} current={STEPS.length} aside={<span className="flex items-center gap-3"><span className="text-sm font-semibold text-[var(--deck-soft)]">{battleExamName(snapshot.config.exam)}</span><LeaveButton onLeave={onLeave} /></span>} />
      <div>
        <h1 className="deck-display text-[28px] leading-tight">The draw</h1>
        <p className="text-sm text-[var(--deck-label)]">{count} {count === 1 ? 'question' : 'questions'} from your topics</p>
      </div>

      {seats.map(seat => {
        const picks = draft.picks[seat]
        return (
          <div key={seat} style={playerAccentStyle(seat)} className="flex flex-col gap-2" data-testid={`battle-picks-${seat}`}>
            <span className="flex items-center gap-2">
              <PlayerCard seat={seat} player={snapshot.players[seat]} size="xs" style={{ width: 22, height: 30, borderRadius: 5 }} />
              <span className="deck-label !text-[color-mix(in_srgb,var(--player)_40%,white)]">{seat === me ? 'Your topics' : `${names[seat]}’s topics`}</span>
            </span>
            {picks && picks.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {picks.map(name => (
                  <span key={name} className="battle-pick-in deck-display flex h-[62px] items-start rounded-xl border-2 border-[var(--player)] bg-[var(--player-vivid)] p-1.5 text-xs leading-[1.1]">
                    <span className="line-clamp-3">{name}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--deck-label)]">No topics — any question from the exam.</p>
            )}
          </div>
        )
      })}

      <ol className="mt-2 flex flex-wrap justify-center gap-3" aria-label="The questions drawn">
        {draft.drawn.map((d, i) => {
          const final = isFinalRound({ config: { ...snapshot.config, rounds: count } }, i)
          const pickers = topicPickers(draft.picks, d.topic)
          const up = i < shown
          const credit = topicCredit(draft.picks, d.topic, names)
          return (
            <li key={`${d.id}-${i}`} className="flex w-[84px] flex-col items-center gap-1.5" data-testid="battle-drawn" data-drawn={up || undefined}>
              {up ? (
                <div className="battle-draw-card relative w-full" title={`${d.topic ?? 'Any topic'} — ${credit}`}>
                  {d.topic ? (
                    <ConceptTileStatic name={d.topic} state={levels.levelOf(d.topic)} collected={levels.isCollected(d.topic)} className="!bg-[var(--deck-card)]" />
                  ) : (
                    <div className="flex aspect-[4/5] items-center justify-center rounded-md bg-[var(--deck-card)] p-1.5 text-center text-[10px] font-medium text-[var(--deck-label)]">Any topic</div>
                  )}
                  {pickers.length > 0 && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2 -bottom-1 h-1 rounded-full"
                      style={{ background: pickers.length === 2 ? `linear-gradient(to right, ${playerAccent(0)}, ${playerAccent(1)})` : playerAccent(pickers[0]) }}
                    />
                  )}
                </div>
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center rounded-md border-2 border-[var(--deck-card-edge)] bg-[var(--deck-card)]" aria-hidden>
                  <span className="deck-display text-lg text-[var(--deck-dim)]">?</span>
                </div>
              )}
              <span className={cn('text-[11px] font-bold uppercase tracking-wider', final ? 'text-[var(--deck-gold)]' : 'text-[var(--deck-label)]')}>
                {final ? 'Final ×2' : `Round ${i + 1}`}
              </span>
              <span className="sr-only">{up ? `${d.topic ?? 'Any topic'}, ${credit}` : 'Not drawn yet'}</span>
            </li>
          )
        })}
      </ol>
      <p className="text-center text-sm text-[var(--deck-label)]" aria-live="polite">{shown < count ? 'Drawing…' : 'Get ready…'}</p>
    </div>
  )
}
