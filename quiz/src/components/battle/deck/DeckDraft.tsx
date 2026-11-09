import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { Search, X } from 'lucide-react'
import { ConceptTile } from '@/components/ConceptTile'
import { DeckPrimaryButton, DeckTable, LeaveButton, StepHeader } from '@/components/battle/deck/DeckParts'
import { useBattleMusic, useNow } from '@/hooks/useBattle'
import { useConceptLevels, type ConceptLevels } from '@/hooks/useConceptLevels'
import { otherSeat, type Seat } from '@/lib/battle'
import { battleExamName, draftMusicIntensity, playerAccentStyle } from '@/lib/battleDisplay'
import { cardLevelTag, levelTag } from '@/lib/battleDeck'
import {
  DEAL_MS,
  HAND_SIZE,
  cardLevel,
  dealStartedAt,
  dealtOrder,
  handCountLine,
  pairLine,
  strikeLine,
  toggleCard,
  type BattleDraft,
} from '@/lib/battleDraft'
import type { SessionSnapshot } from '@/lib/battleSession'
import type { TopicGroup } from '@/lib/battleTopics'
import { formatClock } from '@/lib/quizTiming'
import { playSound } from '@/lib/soundEngine'
import { cn } from '@/lib/utils'

// **The draft, in the deck look** (docs/quiz-battle-redesign.md §3.6–3.8 and
// §4): draw four topics, strike one of the other player's, and the deal —
// the grid of how closely the notes tie each of your cards to each of theirs,
// the three pairs lighting up, and each pair drawn out of its cell as the
// card its round is played on. The rules are lib/battleDraft.ts's; the host
// runs them (lib/battleSession.ts). Monte Carlo Station draws the same screens,
// inside the Deck's scope.

const DRAFT_STEPS = ['Draw', 'Strike', 'Deal'] as const

export function DeckDraftScreen({
  snapshot,
  catalogue,
  onChoose,
  onLock,
  onStrike,
  onLeave,
}: {
  snapshot: SessionSnapshot
  catalogue: readonly TopicGroup[]
  onChoose: (topics: string[]) => void
  onLock: () => void
  onStrike: (topic: string) => void
  onLeave: () => void
}) {
  const draft = snapshot.draft!
  const levels = useConceptLevels()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [draft.phase, draft.game])
  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col gap-4 px-5 pb-6 pt-4 lg:min-h-screen">
      <DraftMusic draft={draft} />
      {draft.phase === 'draw' ? (
        <DrawStep snapshot={snapshot} draft={draft} catalogue={catalogue} levels={levels} onChoose={onChoose} onLock={onLock} onLeave={onLeave} />
      ) : draft.phase === 'strike' ? (
        <StrikeStep snapshot={snapshot} draft={draft} onStrike={onStrike} onLeave={onLeave} />
      ) : (
        <DeckDeal snapshot={snapshot} draft={draft} onLeave={onLeave} />
      )}
    </div>
  )
}

function DraftMusic({ draft }: { draft: BattleDraft }) {
  const now = useNow(true, 500)
  useBattleMusic(draftMusicIntensity(draft, now))
  return null
}

/** A step's clock, top right: 0:24, amber in the last ten, ticking in the last five. */
function StepClock({ deadline, ticking, what }: { deadline: number; ticking: boolean; what: string }) {
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
      aria-label={`${seconds} seconds left to ${what}`}
      className={cn('deck-display text-[22px] tabular-nums', seconds <= 10 && 'text-amber-400')}
      data-testid="battle-topic-clock"
    >
      {formatClock(seconds)}
    </span>
  )
}

/** The names a screen tells the players by. */
function namesOf(snapshot: SessionSnapshot): [string, string] {
  return [snapshot.players[0]?.name ?? 'Player 1', snapshot.players[1]?.name ?? 'Player 2']
}

// ── 1 · Draw 4 ──────────────────────────────────────────────────────────────

/** The other player's hand: face-down pips, filled as they draw, never what is on them. */
function TheirPips({ seat, name, drawn, locked, present }: { seat: Seat; name: string; drawn: number; locked: boolean; present: boolean }) {
  const filled = locked ? HAND_SIZE : Math.min(drawn, HAND_SIZE)
  const status = !present ? 'Reconnecting…' : locked ? 'Locked in' : 'Choosing…'
  return (
    <span
      style={playerAccentStyle(seat)}
      className="flex shrink-0 items-center gap-[5px] text-xs text-[color-mix(in_srgb,var(--player)_40%,white)]"
      aria-label={`${name} has drawn ${filled} of ${HAND_SIZE}`}
      data-testid={`battle-player-${seat}`}
      data-drawn={filled}
    >
      <span className="max-w-[7rem] truncate" aria-hidden>{name}</span>
      {Array.from({ length: HAND_SIZE }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            'h-5 w-3.5 rounded-[3px]',
            i < filled ? 'bg-[color-mix(in_srgb,var(--player-vivid)_70%,black)]' : 'border-[1.5px] border-dashed border-[var(--player-muted)]',
            i === filled && !locked && 'deck-blink',
          )}
        />
      ))}
      <span className="sr-only" aria-live="polite">{status}</span>
    </span>
  )
}

function DrawStep({ snapshot, draft, catalogue, levels, onChoose, onLock, onLeave }: {
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
  const locked = draft.hands[me] !== null
  const oppLocked = draft.hands[opp] !== null
  const hand = locked ? draft.hands[me]! : snapshot.topicChoice
  const full = hand.length >= HAND_SIZE
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

  const inHand = (name: string) => hand.some(t => t.toLowerCase() === name.toLowerCase())
  function toggle(name: string) {
    if (locked) return
    const next = toggleCard(hand, name)
    if (next.length === hand.length) return
    playSound(next.length > hand.length ? 'deal' : 'tick')
    onChoose(next)
  }
  function lock() {
    if (locked || !full) return
    playSound('lockIn')
    onLock()
  }

  return (
    <div className="flex flex-1 flex-col gap-4" data-testid="battle-topic-picker">
      <StepHeader steps={DRAFT_STEPS} current={0} aside={<span className="flex items-center gap-3"><StepClock deadline={draft.deadline} ticking={!locked} what="draw" /><LeaveButton onLeave={onLeave} /></span>} />

      <div className="flex items-center justify-between gap-3">
        <h1 className="deck-display text-[28px] leading-tight">Draw 4 topics</h1>
        <TheirPips seat={opp} name={oppName} drawn={draft.counts[opp]} locked={oppLocked} present={snapshot.opponentPresent} />
      </div>

      <div className="flex flex-col gap-2" style={playerAccentStyle(me)}>
        <span className="deck-label !text-[color-mix(in_srgb,var(--player)_40%,white)]">
          Your hand · <span data-testid="battle-topic-count">{handCountLine(hand.length)}</span>
        </span>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: HAND_SIZE }, (_, i) => {
            const name = hand[i]
            return name ? (
              <button
                key={name}
                type="button"
                onClick={() => toggle(name)}
                disabled={locked}
                className="deck-deal deck-display h-[62px] rounded-xl border-2 border-[var(--player)] bg-[var(--player-vivid)] p-1.5 text-left text-xs leading-[1.1] disabled:cursor-default"
                aria-label={`${name}, in your hand`}
                data-testid="battle-hand-card"
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
                const selected = inHand(topic.name)
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
            Locked in. Waiting for {oppName}…
          </p>
        ) : (
          <DeckPrimaryButton onClick={lock} disabled={!full} data-sound="none" data-testid="battle-topics-lock">Lock in my hand</DeckPrimaryButton>
        )}
      </div>
    </div>
  )
}

// ── 2 · Strike one ──────────────────────────────────────────────────────────

/** A topic card on the strike table, in its holder's colour, with their level. */
function TableCard({ seat, name, level, tilt, raised, struck, className, style, ...button }: {
  seat: Seat
  name: string
  level: number
  tilt: number
  raised?: boolean
  struck?: boolean
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'name'>) {
  return (
    <button
      type="button"
      {...button}
      style={{ ...playerAccentStyle(seat), ...style, '--tilt': `${tilt}deg` } as CSSProperties}
      className={cn(
        'deck-strike-card deck-display flex h-[110px] w-[78px] shrink-0 flex-col justify-between rounded-xl border-2 p-[7px] text-left text-xs leading-[1.1] text-white',
        'border-[var(--player)] bg-[var(--player-vivid)] shadow-[0_10px_20px_rgba(0,0,0,.45)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-default',
        raised && 'deck-strike-raised !border-white',
        struck && 'opacity-40 line-through',
        className,
      )}
    >
      <span className="font-sans text-[10px] font-bold">{cardLevelTag(level)}</span>
      <span className="line-clamp-4">{name}</span>
    </button>
  )
}

function StrikeStep({ snapshot, draft, onStrike, onLeave }: {
  snapshot: SessionSnapshot
  draft: BattleDraft
  onStrike: (topic: string) => void
  onLeave: () => void
}) {
  const me = snapshot.me
  const opp = otherSeat(me)
  const names = namesOf(snapshot)
  const theirs = draft.hands[opp] ?? []
  const mine = draft.hands[me] ?? []
  const myStrike = draft.strikes[me]
  const theyStruck = draft.strikes[opp] !== null
  const [chosen, setChosen] = useState<string | null>(null)
  const discardRef = useRef<HTMLButtonElement>(null)
  const [drag, setDrag] = useState<{ topic: string; dx: number; dy: number; x0: number; y0: number; over: boolean; moved: boolean } | null>(null)

  const heardOpp = useRef(theyStruck)
  useEffect(() => {
    if (theyStruck && !heardOpp.current) playSound('opponentIn')
    heardOpp.current = theyStruck
  }, [theyStruck])

  function commit(topic: string) {
    if (myStrike) return
    playSound('strike')
    setChosen(null)
    onStrike(topic)
  }

  const overDiscard = (x: number, y: number) => {
    const r = discardRef.current?.getBoundingClientRect()
    return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
  }
  function onDown(topic: string, e: ReactPointerEvent<HTMLButtonElement>) {
    if (myStrike || e.button !== 0) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setDrag({ topic, dx: 0, dy: 0, x0: e.clientX, y0: e.clientY, over: false, moved: false })
  }
  function onMove(e: ReactPointerEvent<HTMLButtonElement>) {
    if (!drag) return
    const dx = e.clientX - drag.x0
    const dy = e.clientY - drag.y0
    setDrag({ ...drag, dx, dy, over: overDiscard(e.clientX, e.clientY), moved: drag.moved || Math.hypot(dx, dy) > 6 })
  }
  function onUp(e: ReactPointerEvent<HTMLButtonElement>) {
    if (!drag) return
    const { topic, moved } = drag
    const over = overDiscard(e.clientX, e.clientY)
    setDrag(null)
    if (over) commit(topic)
    else if (!moved) setChosen(c => (c === topic ? null : topic))
  }

  const tilts = [-8, 0, 3, 8]
  const drop = [6, 0, 0, 6]

  return (
    <div className="flex flex-1 flex-col gap-3" data-testid="battle-strike">
      <StepHeader steps={DRAFT_STEPS} current={1} aside={<span className="flex items-center gap-3"><StepClock deadline={draft.deadline} ticking={!myStrike} what="strike" /><LeaveButton onLeave={onLeave} /></span>} />

      <DeckTable className="flex flex-1 flex-col items-center gap-3 rounded-[30px] px-2 py-5">
        <span style={playerAccentStyle(opp)} className="text-[13px] font-semibold text-[color-mix(in_srgb,var(--player)_40%,white)]">{names[opp]}’s hand</span>
        <div className="flex items-start justify-center gap-1.5" data-testid="battle-strike-theirs">
          {theirs.map((topic, i) => {
            const dragging = drag?.topic === topic
            const isStruck = myStrike?.toLowerCase() === topic.toLowerCase()
            return (
              <TableCard
                key={`${topic}-${i}`}
                seat={opp}
                name={topic}
                level={cardLevel(draft, opp, topic)}
                tilt={tilts[i] ?? 0}
                raised={chosen === topic || dragging}
                struck={isStruck}
                disabled={!!myStrike}
                aria-pressed={chosen === topic}
                aria-label={`${topic}, ${names[opp]}’s card`}
                data-testid="battle-strike-card"
                data-topic={topic}
                style={{
                  marginTop: drop[i] ?? 0,
                  zIndex: dragging ? 5 : undefined,
                  touchAction: 'none',
                  ...(dragging ? { transform: `translate(${drag!.dx}px, ${drag!.dy}px) rotate(-6deg)`, transition: 'none' } : {}),
                }}
                onPointerDown={e => onDown(topic, e)}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerCancel={() => setDrag(null)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setChosen(c => (c === topic ? null : topic)) } }}
              />
            )
          })}
        </div>

        <div className="mt-3 flex w-full items-center gap-4 px-4">
          <button
            ref={discardRef}
            type="button"
            onClick={() => chosen && commit(chosen)}
            disabled={!!myStrike || !chosen}
            aria-label={chosen ? `Discard ${chosen}` : 'Discard'}
            className={cn(
              'flex h-[124px] w-[92px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-[14px] border-2 border-dashed text-xs font-bold text-[var(--deck-soft)] transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-default',
              myStrike ? 'border-[var(--deck-raised-edge)]'
                : drag?.over || chosen ? 'border-white bg-white/5 text-white' : 'deck-discard-pulse border-[var(--deck-raised-edge)]',
            )}
            data-testid="battle-discard"
          >
            {myStrike ? (
              <span style={playerAccentStyle(opp)} className="deck-deal deck-display flex h-[100px] w-[72px] flex-col justify-end rounded-lg border-2 border-[var(--player)] bg-[var(--player-vivid)] p-1.5 text-left text-[11px] leading-[1.1] text-white opacity-60">
                <span className="line-clamp-4">{myStrike}</span>
              </span>
            ) : (
              <><X className="h-[22px] w-[22px]" strokeWidth={2.4} aria-hidden />Discard</>
            )}
          </button>
          <div className="flex min-w-0 flex-col gap-1.5">
            {myStrike ? (
              <span className="deck-display text-[22px] leading-[1.1]" aria-live="polite" data-testid="battle-strike-made">You struck {myStrike}.</span>
            ) : (
              <>
                <span className="deck-display text-[22px] leading-[1.1]">Drag one of {names[opp]}’s cards to the discard</span>
                <span className="text-[13px] text-[var(--deck-label)]">Or tap a card, then tap Discard.</span>
              </>
            )}
          </div>
        </div>

        <span style={playerAccentStyle(opp)} className="mt-3 flex items-center justify-center gap-2 text-[13px] font-semibold text-[color-mix(in_srgb,var(--player)_40%,white)]" aria-live="polite" data-testid="battle-strike-status">
          {!theyStruck && <span aria-hidden className="deck-blink h-2 w-2 rounded-full bg-[var(--player)]" />}
          {theyStruck ? `${names[opp]} has struck one of yours` : `${names[opp]} is picking one of yours to strike`}
        </span>

        <div className="mt-auto flex items-end justify-center gap-1.5 pt-6" aria-label="Your hand">
          {mine.map((topic, i) => (
            <TableCard
              key={`${topic}-${i}`}
              seat={me}
              name={topic}
              level={cardLevel(draft, me, topic)}
              tilt={-(tilts[i] ?? 0)}
              tabIndex={-1}
              disabled
              style={{ marginBottom: drop[i] ?? 0 }}
              aria-label={`${topic}, your card`}
            />
          ))}
        </div>
        <span style={playerAccentStyle(me)} className="text-[13px] font-semibold text-[color-mix(in_srgb,var(--player)_40%,white)]">Your hand</span>
      </DeckTable>

      <p className="flex h-[58px] items-center justify-center rounded-[18px] border border-[var(--deck-card-edge)] bg-[var(--deck-card)] px-3 text-center text-sm text-[var(--deck-soft)]">
        You’ll both see the strikes once both are in
      </p>
    </div>
  )
}

// ── 3 · The deal ────────────────────────────────────────────────────────────

/** The deal's beats, as fractions of `DEAL_MS` (the canvas's timeline). */
const BEATS = { pairs: [0.13, 0.22, 0.31], strikes: 0.46, cards: [0.52, 0.55, 0.58], drops: [0.66, 0.69, 0.72], names: 0.8 } as const

/**
 * The deal (§3.8): about seven seconds, both screens drawn to one clock (the
 * draft's deadline), and skipped to its last frame with a tap. Held on that
 * frame through the first question's count-in, when `opensAt` is given.
 */
export function DeckDeal({ snapshot, draft, onLeave, opensAt }: {
  snapshot: SessionSnapshot
  draft: BattleDraft
  onLeave: () => void
  /** The first question's count-in: the deal stays up, counting it down. */
  opensAt?: number
}) {
  const me = snapshot.me
  const opp = otherSeat(me)
  const names = namesOf(snapshot)
  const now = useNow(true, 100)
  const startedAt = dealStartedAt(draft)
  // Where the deal stood when this screen mounted — the CSS runs from there.
  const [offset] = useState(() => Math.max(0, Math.min(DEAL_MS, Date.now() - startedAt)))
  const [skipped, setSkipped] = useState(() => opensAt !== undefined)
  const elapsed = skipped ? DEAL_MS : Math.max(0, now - startedAt)

  // The paper sounds, each beat once, from wherever the deal stood on arrival.
  const heard = useRef(new Set<string>())
  useEffect(() => {
    if (skipped) return
    const at = elapsed / DEAL_MS
    const beat = (key: string, when: number, cue: 'shuffle' | 'deal' | 'strike') => {
      if (heard.current.has(key) || at < when) return
      heard.current.add(key)
      if (at - when < 0.08) playSound(cue)
    }
    beat('grid', 0, 'shuffle')
    BEATS.cards.forEach((t, i) => beat(`card${i}`, t + 0.09, 'deal'))
    BEATS.drops.forEach((t, i) => beat(`drop${i}`, t + 0.07, 'deal'))
  }, [elapsed, skipped])

  // Mine down the side, theirs across the top, as the table is sat.
  const rows = me === 0 ? draft.rows : draft.cols
  const cols = me === 0 ? draft.cols : draft.rows
  const cell = (r: number, c: number) => (me === 0 ? draft.grid[r]?.[c] : draft.grid[c]?.[r]) ?? 0
  const laid = dealtOrder(draft, snapshot.battle?.config.rounds ?? snapshot.config.rounds)
  const badgeOf = (r: number, c: number) => {
    const at = laid.findIndex(d => (me === 0 ? d.pair.cell[0] === r && d.pair.cell[1] === c : d.pair.cell[0] === c && d.pair.cell[1] === r))
    return at < 0 ? null : { ...laid[at], beat: BEATS.pairs[at] ?? BEATS.pairs[2] }
  }
  const countIn = opensAt !== undefined ? Math.max(1, Math.ceil((opensAt - now) / 1000)) : null
  const lastCount = useRef<number | null>(null)
  useEffect(() => {
    if (countIn === null || lastCount.current === countIn) return
    lastCount.current = countIn
    playSound('countIn')
  }, [countIn])

  const style = { '--deal-offset': `-${offset}ms`, '--deal-ms': `${DEAL_MS}ms` } as CSSProperties
  return (
    <div
      className={cn('relative flex flex-1 flex-col gap-3', skipped && 'deck-deal-done')}
      style={style}
      onClick={() => { if (!skipped) setSkipped(true) }}
      data-testid="battle-deal"
      data-done={skipped || elapsed >= DEAL_MS || undefined}
    >
      <StepHeader
        steps={DRAFT_STEPS}
        current={2}
        aside={<span className="flex items-center gap-3"><span className="text-[13px] font-semibold text-[var(--deck-soft)]">{battleExamName(snapshot.config.exam)}</span><LeaveButton onLeave={onLeave} /></span>}
      />
      <div>
        <h1 className="deck-display text-[28px] leading-tight">The deal</h1>
        <div className="relative mt-2 min-h-[60px] text-sm leading-[1.4] text-[var(--deck-soft)]">
          <p className="deal-sub-a absolute inset-x-0 top-0">Each number is how closely the notes connect two of the cards. The three strongest pairs are dealt, and no card is used twice.</p>
          <p className="deal-sub-b absolute inset-x-0 top-0" data-testid="battle-deal-strikes">{strikeLine(draft.strikes, me, names)}</p>
        </div>
      </div>

      <div className="deal-grid flex origin-top flex-col gap-1.5" aria-label="How closely the notes connect each pair of cards" role="table" data-testid="battle-deal-grid">
        <div role="row" className="grid grid-cols-[92px_repeat(3,minmax(0,1fr))] gap-1.5">
          <span role="columnheader" className="flex items-end text-[11px] font-bold text-[var(--deck-label)]">You ↓ · {names[opp]} →</span>
          {cols.map((name, c) => (
            <span key={c} role="columnheader" style={playerAccentStyle(opp)} className="deck-display line-clamp-3 h-14 rounded-[10px] border-2 border-[var(--player)] bg-[var(--player-vivid)] p-[5px] text-[11px] leading-[1.1]">{name}</span>
          ))}
        </div>
        {rows.map((name, r) => (
          <div key={r} role="row" className="grid grid-cols-[92px_repeat(3,minmax(0,1fr))] gap-1.5">
            <span role="rowheader" style={playerAccentStyle(me)} className="deck-display line-clamp-4 h-16 rounded-[10px] border-2 border-[var(--player)] bg-[var(--player-vivid)] p-[5px] text-[11px] leading-[1.1]">{name}</span>
            {cols.map((_, c) => {
              const strength = cell(r, c)
              const badge = badgeOf(r, c)
              const coin = badge && badge.pair.shared === 0
              return (
                <span
                  key={c}
                  role="cell"
                  className={cn(
                    'deck-display relative flex h-16 items-center justify-center rounded-[10px] border-2 text-lg',
                    badge ? 'deal-pick' : 'border-[var(--deck-table-edge)]',
                    coin ? 'border-dashed font-sans text-xs font-bold text-[var(--deck-soft)]' : strength >= 50 ? 'text-white' : 'text-[var(--deck-soft)]',
                    badge?.final && 'deal-pick-final',
                  )}
                  style={{
                    background: coin ? undefined : `rgba(255,255,255,${(0.03 + 0.3 * strength / 100).toFixed(2)})`,
                    ...(badge ? { '--beat': `${badge.beat * DEAL_MS}ms` } as CSSProperties : {}),
                  }}
                  aria-label={`${name} and ${cols[c]}: ${strength}${badge ? `, ${badge.label}${coin ? ', coin flip' : ''}` : ''}`}
                >
                  {coin ? 'flip' : strength}
                  {badge && (
                    <span className={cn('deal-badge absolute -right-1.5 -top-2 flex h-5 items-center rounded-full px-1.5 font-sans text-[10px] font-extrabold text-[var(--deck-ground)]', badge.final ? 'bg-[var(--deck-gold)]' : 'bg-white')}>
                      {badge.final ? '×2' : badge.label.replace('Round ', 'R')}
                    </span>
                  )}
                </span>
              )
            })}
          </div>
        ))}
      </div>

      <ol className="deal-table relative mt-1 grid grid-cols-3 gap-3" aria-label="The rounds dealt" data-testid="battle-deal-cards">
        {laid.map((d, i) => {
          const coin = d.pair.shared === 0
          const mineCard = d.pair.cards[me]
          const theirCard = d.pair.cards[opp]
          const [top, bottom] = pairLine([mineCard, theirCard], !coin)
          const colOf = me === 0 ? d.pair.cell[1] : d.pair.cell[0]
          const fly = { '--fly-x': `${(colOf - i) * 72}px`, '--beat': `${(BEATS.cards[i] ?? 0.58) * DEAL_MS}ms` } as CSSProperties
          return (
            <li key={d.index} className="flex flex-col items-center gap-2" data-testid="battle-deal-card" data-coin={coin || undefined} data-final={d.final || undefined}>
              <div className="relative h-[176px] w-full max-w-[108px]">
                {coin ? (
                  <>
                    <span aria-hidden style={{ ...fly, ...playerAccentStyle(me), '--tilt': '-12deg' } as CSSProperties} className="deal-fly absolute left-0 top-0 h-24 w-[54%] rounded-[10px] border-2 border-[var(--player)] bg-[var(--player-vivid)]" />
                    <span aria-hidden style={{ ...fly, ...playerAccentStyle(opp), '--tilt': '12deg' } as CSSProperties} className="deal-fly absolute right-0 top-0 h-24 w-[54%] rounded-[10px] border-2 border-[var(--player)] bg-[var(--player-vivid)]" />
                  </>
                ) : (
                  <span
                    aria-hidden
                    style={{ ...fly, '--tilt': `${i === 0 ? -6 : 6}deg`, background: `linear-gradient(135deg, ${me === 0 ? '#0284C7' : '#A21CAF'} 0 50%, ${me === 0 ? '#A21CAF' : '#0284C7'} 50% 100%)` } as CSSProperties}
                    className={cn('deal-fly absolute left-[calc(50%-38px)] top-0 h-24 w-[76px] rounded-[10px] border-2', d.final ? 'border-[var(--deck-gold)]' : 'border-white')}
                  />
                )}
                <div
                  style={{ '--beat': `${(BEATS.drops[i] ?? 0.72) * DEAL_MS}ms` } as CSSProperties}
                  className={cn(
                    'deal-drop absolute inset-x-0 bottom-0 flex h-[148px] flex-col items-center justify-center gap-1 rounded-[14px] border-2 bg-[var(--deck-raised)] shadow-[0_14px_30px_rgba(0,0,0,.55)]',
                    d.final ? 'border-[var(--deck-gold)]' : 'border-[var(--deck-raised-edge)]',
                    coin && 'border-dashed',
                  )}
                >
                  <span className={cn('text-[11px] font-bold uppercase tracking-[.06em]', d.final ? 'text-[var(--deck-gold)]' : 'text-[var(--deck-label)]')}>{d.final ? 'Final' : 'Round'}</span>
                  <span className={cn('deck-display text-[34px] leading-none', d.final && 'text-[var(--deck-gold)]')}>{d.final ? '×2' : d.label.replace('Round ', '')}</span>
                  <span className="text-[11px] text-[var(--deck-soft)]">{coin ? 'coin flip' : 'tests both'}</span>
                </div>
              </div>
              <span className="deal-late flex w-full flex-col gap-1 text-xs font-semibold leading-[1.25]">
                <span style={playerAccentStyle(me)} className="text-[color-mix(in_srgb,var(--player)_55%,white)]">{top}</span>
                <span style={playerAccentStyle(opp)} className="text-[color-mix(in_srgb,var(--player)_55%,white)]">{bottom}</span>
              </span>
            </li>
          )
        })}
      </ol>

      <div className="mt-auto">
        {countIn !== null ? (
          <p className="flex h-[58px] items-center justify-center gap-2.5 rounded-[18px] border border-[var(--deck-card-edge)] bg-[var(--deck-card)]" aria-live="assertive" data-testid="battle-countdown">
            <span className="text-[15px] font-semibold text-[var(--deck-soft)]">Round 1 in</span>
            <span key={countIn} className="battle-count-pop deck-display text-[26px] tabular-nums">{countIn}</span>
          </p>
        ) : !skipped && elapsed < DEAL_MS ? (
          <p className="text-center text-xs text-[var(--deck-dim)]">Tap to skip</p>
        ) : null}
      </div>
    </div>
  )
}
