// **Quiz Battle's draft** — what an online battle is played on
// (docs/quiz-battle-redesign.md §4).
//
// Before the first question each player **draws** a hand of four topics from
// the exam (`HAND_SIZE`, in `TOPIC_PICK_MS`), hidden from the other until both are
// in; then each **strikes** one of the other's four (`STRIKE_MS`), the strikes
// hidden until both are in; then the six cards left are **dealt to pairs**,
// one from each hand, and each pair is a round. A pair some question tests
// both halves of plays that question; a pair no question covers is settled by
// a **coin** when its round comes up, and the round is on the topic it lands on.
//
// This module is that as data: the rules a hand and a strike are held to, the
// pairing and the order, the questions a round draws, the draft as it travels
// (redacted per seat) and the clocks both devices draw it to. The host runs it
// (lib/battleSession.ts); the room carries it (lib/battleRoom.ts). Pure and
// tested; `battleDraftVault.test.ts` plays it on every raceable exam.

import { otherSeat, type BattleConfig, type BattleQuestionKey, type BattleState, type Seat } from './battle'
import { drawByDifficulty, type DifficultyTarget } from './quizDifficulty'
import { questionTopics } from './battleTopics'
export { TOPIC_PICK_MS } from './battleTopics'
import { readPair, type GraphQuestion } from './conceptGraph'
import type { Question } from './parser'

// ── The rules, as numbers ───────────────────────────────────────────────────

/** A hand is exactly this many topics. */
export const HAND_SIZE = 4
/** What each player keeps once the other has struck one. */
export const KEPT = HAND_SIZE - 1
/** How long each has to strike one of the other's cards. */
export const STRIKE_MS = 15_000
/** The deal on screen before the count-in to the first question. */
export const DEAL_MS = 7000
/** A coin round's toss, before its count-in. */
export const COIN_MS = 2600

// ── A hand ──────────────────────────────────────────────────────────────────

/**
 * A hand as the host takes it: only topics the exam offers, in their own
 * spelling, each once, at most `HAND_SIZE`, in the order drawn. What arrives
 * from the other device is whatever it sent, so nothing is assumed.
 */
export function cleanHand(raw: readonly unknown[], offered: readonly string[]): string[] {
  const byKey = new Map(offered.map(name => [name.toLowerCase(), name]))
  const out: string[] = []
  for (const value of raw) {
    if (typeof value !== 'string') continue
    const name = byKey.get(value.trim().toLowerCase())
    if (name && !out.includes(name)) out.push(name)
    if (out.length === HAND_SIZE) break
  }
  return out
}

/** A hand with `topic` drawn or put back — never past `HAND_SIZE`. */
export function toggleCard(hand: readonly string[], topic: string): string[] {
  const at = hand.findIndex(t => t.toLowerCase() === topic.toLowerCase())
  if (at >= 0) return hand.filter((_, i) => i !== at)
  return hand.length >= HAND_SIZE ? [...hand] : [...hand, topic]
}

/**
 * A short hand topped up to `HAND_SIZE` at random from the topics the player
 * hasn't drawn — what the clock running out leaves them holding.
 */
export function topUpHand(hand: readonly string[], offered: readonly string[], random: () => number = Math.random): string[] {
  const out = [...hand]
  const left = offered.filter(t => !out.some(h => h.toLowerCase() === t.toLowerCase()))
  while (out.length < HAND_SIZE && left.length > 0) {
    out.push(left.splice(Math.floor(random() * left.length), 1)[0])
  }
  return out
}

/** A player's level on a concept, 0 (New) to 3 — what a card's foil shows. */
export function cleanLevel(x: unknown): number {
  return typeof x === 'number' && Number.isInteger(x) && x >= 0 && x <= 3 ? x : 0
}

// ── A strike ────────────────────────────────────────────────────────────────

/**
 * The strike made for a player whose clock ran out (open question O3): the
 * other player's highest-levelled card, ties broken at random.
 */
export function autoStrike(hand: readonly string[], levels: readonly number[] | null, random: () => number = Math.random): string {
  const level = (i: number) => cleanLevel(levels?.[i])
  const best = Math.max(...hand.map((_, i) => level(i)))
  const top = hand.filter((_, i) => level(i) === best)
  return top[Math.floor(random() * top.length)]
}

/** The three cards a hand keeps once `struck` is out of it (the first copy, if there are two). */
export function keptCards(hand: readonly string[], struck: string | null): string[] {
  if (struck === null) return [...hand]
  const at = hand.findIndex(t => t.toLowerCase() === struck.toLowerCase())
  return at < 0 ? [...hand] : hand.filter((_, i) => i !== at)
}

// ── Pairing ─────────────────────────────────────────────────────────────────

/** What the notes say about one cross pair: how closely they connect, and which questions test both. */
export interface PairReading {
  /** 0–100, Concept Craft's strength (lib/conceptGraph.ts `readPair`). */
  strength: number
  /** Battle questions tagged with both, by id. */
  shared: readonly string[]
}

export type ReadPair = (a: string, b: string) => PairReading

export interface DealtPair {
  /** Seat 0's card and seat 1's. */
  cards: [string, string]
  strength: number
  /** How many battle questions test both — none means the round is a coin flip. */
  shared: number
  /** Its cell in the grid: seat 0's card's row, seat 1's card's column. */
  cell: [number, number]
}

/** The deal: the grid of strengths, and the pairs in the order they're played (the final last). */
export interface Deal {
  /** `grid[r][c]`: seat 0's `r`th kept card against seat 1's `c`th. */
  grid: number[][]
  pairs: DealtPair[]
}

function permutations(n: number): number[][] {
  if (n <= 1) return [[...Array(n).keys()]]
  const out: number[][] = []
  for (const rest of permutations(n - 1)) {
    for (let at = 0; at <= rest.length; at++) out.push([...rest.slice(0, at), n - 1, ...rest.slice(at)])
  }
  return out
}

/**
 * The three cross pairs a deal plays. Of the ways to match the two hands one
 * to one (six, for three cards each), the one with **the most pairs some
 * question tests both halves of**, then **the highest total strength**; ties
 * go to a coin. Then the order: the **final** (×2) is the strongest pair with
 * a shared question (O1) — the strongest pair of all when none has one — and
 * the others play first, strongest first.
 */
export function dealPairs(rows: readonly string[], cols: readonly string[], read: ReadPair, random: () => number = Math.random): Deal {
  const readings = rows.map(r => cols.map(c => read(r, c)))
  const grid = readings.map(row => row.map(cell => cell.strength))
  const n = Math.min(rows.length, cols.length)
  let best: { pairs: DealtPair[]; covered: number; total: number }[] = []
  for (const perm of permutations(cols.length)) {
    const pairs = perm.slice(0, n).map((c, r) => ({
      cards: [rows[r], cols[c]] as [string, string],
      strength: readings[r][c].strength,
      shared: readings[r][c].shared.length,
      cell: [r, c] as [number, number],
    }))
    const covered = pairs.filter(p => p.shared > 0).length
    const total = pairs.reduce((s, p) => s + p.strength, 0)
    const top = best[0]
    if (!top || covered > top.covered || (covered === top.covered && total > top.total)) best = [{ pairs, covered, total }]
    else if (covered === top.covered && total === top.total) best.push({ pairs, covered, total })
  }
  const chosen = best.length > 1 ? best[Math.floor(random() * best.length)] : best[0]
  return { grid, pairs: orderPairs(chosen?.pairs ?? []) }
}

/** The pairs in play order: the strongest with a shared question last, the rest strongest first. */
export function orderPairs(pairs: readonly DealtPair[]): DealtPair[] {
  const byStrength = [...pairs].sort((a, b) => b.strength - a.strength || a.cell[0] - b.cell[0])
  const final = byStrength.find(p => p.shared > 0) ?? byStrength[0]
  return final ? [...byStrength.filter(p => p !== final), final] : []
}

/**
 * Which pair each of `rounds` rounds plays, by its index in the deal's order.
 * Three rounds play the three pairs; a longer room (O2) goes round the pairs
 * again, each time with a new question, timed so the last round is still the
 * final pair.
 */
export function roundPairs(pairCount: number, rounds: number): number[] {
  if (pairCount === 0) return []
  const shift = rounds - pairCount
  return Array.from({ length: rounds }, (_, i) => (((i - shift) % pairCount) + pairCount) % pairCount)
}

/**
 * How the battle reads a cross pair: the strength Concept Craft gives it
 * (`readPair` — what each concept's page says about the other, and the
 * questions tagged with both across the whole bank, as the board counts them)
 * and the battle questions that test both. A concept in both hands (O4) pairs
 * with itself: as strong as a pair can be, and every question on it tests both.
 */
export function battlePairReader<Q extends Pick<Question, 'id' | 'wiki_link'>>({ pool, graphQuestions, page }: {
  /** The battle's own pool — what a round can draw. */
  pool: readonly Q[]
  /** Every question in the bank, as the strength counts them. */
  graphQuestions: readonly GraphQuestion[]
  /** A concept's page, or undefined when it isn't to hand. */
  page: (name: string) => string | undefined
}): ReadPair {
  return (a, b) => {
    const shared = sharedQuestions(pool, a, b).map(q => q.id)
    if (a.toLowerCase() === b.toLowerCase()) return { strength: 100, shared }
    return { strength: readPair({ a, b, page, questions: graphQuestions }).strength, shared }
  }
}

// ── A round's question ──────────────────────────────────────────────────────

/** How a round came to be on what it's on. */
export type RoundBasis =
  /** A question that tests both cards. */
  | 'both'
  /** One card's topic — the coin's, or the other's when the coin's had nothing left. */
  | 'one'
  /** Neither card had a question left: the whole exam. */
  | 'any'

export interface RoundDraw<Q> {
  question: Q
  basis: RoundBasis
  /** The topic it was drawn on — for `both` the pair's first card, null for `any`. */
  topic: string | null
}

function tagged<Q extends Pick<Question, 'wiki_link'>>(q: Q): Set<string> {
  return new Set(questionTopics(q).map(t => t.toLowerCase()))
}

/** The battle questions tagged with both `a` and `b` (or with `a`, when the two are one concept — O4). */
export function sharedQuestions<Q extends Pick<Question, 'id' | 'wiki_link'>>(pool: readonly Q[], a: string, b: string): Q[] {
  const x = a.toLowerCase()
  const y = b.toLowerCase()
  return pool.filter(q => {
    const tags = tagged(q)
    return tags.has(x) && tags.has(y)
  })
}

/**
 * A round's question, never one in `used`, leaning toward `difficulty` as
 * every battle draw does. `on` says what the round is on: both cards (a pair
 * some question tests), or one (the coin's winner). A topic with nothing left
 * falls back to the other card's topic, then to the whole exam — a paired
 * round whose shared questions are spent tries its first card, then its
 * second, then the exam.
 */
export function drawRound<Q extends Pick<Question, 'id' | 'wiki_link' | 'difficulty'>>(
  pool: readonly Q[],
  cards: readonly [string, string],
  on: 'both' | string,
  used: ReadonlySet<string>,
  difficulty: DifficultyTarget,
  random: () => number = Math.random,
): RoundDraw<Q> | null {
  const open = pool.filter(q => !used.has(q.id))
  const pick = (candidates: Q[]): Q | null =>
    candidates.length === 0 ? null : drawByDifficulty(candidates, 1, difficulty, random)[0] ?? null
  const onTopic = (topic: string) => pick(open.filter(q => tagged(q).has(topic.toLowerCase())))

  if (on === 'both') {
    const both = pick(sharedQuestions(open, cards[0], cards[1]))
    if (both) return { question: both, basis: 'both', topic: cards[0] }
  }
  const first = on === 'both' || on.toLowerCase() === cards[0].toLowerCase() ? cards[0] : cards[1]
  const second = first === cards[0] ? cards[1] : cards[0]
  for (const topic of [first, second]) {
    const q = onTopic(topic)
    if (q) return { question: q, basis: 'one', topic }
  }
  const any = pick(open)
  return any ? { question: any, basis: 'any', topic: null } : null
}

// ── The draft, as it travels ────────────────────────────────────────────────

export type DraftPhase = 'draw' | 'strike' | 'deal'

/** One round of the battle the draft deals. */
export interface DraftRound {
  /** Which of `pairs` it plays. */
  pair: number
  /** Whether a question tests both cards — false is a coin round. */
  paired: boolean
  /** A coin round, once tossed: whose card it landed on. Null before (and for a paired round). */
  coin: Seat | null
  /** Once drawn: how the question came to be on what it's on, and the topic. */
  basis: RoundBasis | null
  topic: string | null
}

/**
 * The draw, the strikes and the deal, as the room carries them. The host
 * holds the true copy; each device sees it redacted (`redactDraft`) and on its
 * own clock (`shiftDraftClock`). Kept through the battle it dealt, for each
 * round's pair and coin.
 */
export interface BattleDraft {
  /** Which battle in the room this is — a hand or strike sent for an earlier one is stale. */
  game: number
  phase: DraftPhase
  /** Draw: when hands close. Strike: when strikes close. Deal: when the count-in to the first question starts. */
  deadline: number
  /** How many cards each player has drawn so far — the face-down pips the other sees. */
  counts: [number, number]
  /** Each player's hand, once locked in. */
  hands: [string[] | null, string[] | null]
  /** Each card's level for the player who holds it, beside `hands`. */
  levels: [number[] | null, number[] | null]
  /** `strikes[s]`: the card seat `s` struck from the other's hand. */
  strikes: [string | null, string | null]
  /** Deal: the grid — seat 0's kept cards down the side, seat 1's across the top. */
  rows: string[]
  cols: string[]
  grid: number[][]
  /** Deal: the pairs, in the order the deal plays them, the final last. */
  pairs: DealtPair[]
  /** Deal: every round, in order. */
  rounds: DraftRound[]
}

export function emptyDraft(game: number, deadline: number): BattleDraft {
  return {
    game, phase: 'draw', deadline,
    counts: [0, 0], hands: [null, null], levels: [null, null], strikes: [null, null],
    rows: [], cols: [], grid: [], pairs: [], rounds: [],
  }
}

/**
 * The draft as `viewer` may see it. While hands are open, the other's shows
 * only as locked in (an empty hand) — its count is the pips. While strikes are
 * open, the other's shows only as made (an empty name). Both are shown to both
 * at once when the phase closes.
 */
export function redactDraft(draft: BattleDraft, viewer: Seat): BattleDraft {
  const hidden = otherSeat(viewer)
  if (draft.phase === 'draw' && draft.hands[hidden] && draft.hands[hidden]!.length > 0) {
    const hands: BattleDraft['hands'] = [...draft.hands]
    const levels: BattleDraft['levels'] = [...draft.levels]
    hands[hidden] = []
    levels[hidden] = []
    return { ...draft, hands, levels }
  }
  if (draft.phase === 'strike' && draft.strikes[hidden]) {
    const strikes: BattleDraft['strikes'] = [...draft.strikes]
    strikes[hidden] = ''
    return { ...draft, strikes }
  }
  return draft
}

/** The same draft on another clock (see `shiftClock` in lib/battle.ts). */
export function shiftDraftClock(draft: BattleDraft, deltaMs: number): BattleDraft {
  return deltaMs === 0 ? draft : { ...draft, deadline: draft.deadline + deltaMs }
}

/** When the deal began, on the draft's clock. */
export function dealStartedAt(draft: BattleDraft): number {
  return draft.deadline - DEAL_MS
}

/** The topic a round is on, for its chips: its pair's cards, and the one a coin chose. */
export function roundCards(draft: BattleDraft | null, index: number): { cards: [string, string]; round: DraftRound } | null {
  const round = draft?.rounds[index]
  const pair = round ? draft!.pairs[round.pair] : undefined
  return round && pair ? { cards: pair.cards, round } : null
}

/** Seat `s`'s three cards once the other has struck. */
export function keptHand(draft: BattleDraft, seat: Seat): string[] {
  return keptCards(draft.hands[seat] ?? [], draft.strikes[otherSeat(seat)])
}

/** The level `seat` holds `topic` at, from its hand. */
export function cardLevel(draft: BattleDraft, seat: Seat, topic: string): number {
  const at = (draft.hands[seat] ?? []).findIndex(t => t.toLowerCase() === topic.toLowerCase())
  return at < 0 ? 0 : cleanLevel(draft.levels[seat]?.[at])
}

/**
 * Whether a coin round's toss is on screen at `now`: from `COIN_MS` before
 * its count-in until the question opens.
 */
export function coinShowing(opensAt: number, countdownMs: number, now: number): boolean {
  return now < opensAt && now >= opensAt - countdownMs - COIN_MS
}

/**
 * What a round was on, for the results and its Practice: both cards when a
 * question tested both, the one topic a coin (or a fallback) settled on, or
 * nothing — a question from the whole exam, or a round not yet settled.
 */
export function roundTopics(draft: BattleDraft | null, index: number): string[] {
  const at = roundCards(draft, index)
  if (!at || !at.round.basis) return []
  if (at.round.basis === 'both') {
    return at.cards[0].toLowerCase() === at.cards[1].toLowerCase() ? [at.cards[0]] : [...at.cards]
  }
  return at.round.topic ? [at.round.topic] : []
}

/** One of a round's chips: a topic, in the colour of the player whose card it is (null: neither's). */
export interface RoundChip {
  name: string
  seat: Seat | null
}

/**
 * A round's chips, `viewer`'s first (docs/quiz-battle-redesign.md §3.9): the
 * pair as two chips when its question tests both, the one card a coin chose,
 * or *Any topic*. Null for a round with no draft behind it, or a coin round
 * whose coin is still in the air.
 */
export function roundChips(draft: BattleDraft | null, index: number, viewer: Seat): RoundChip[] | null {
  const at = roundCards(draft, index)
  if (!at || !at.round.basis) return null
  const { cards, round } = at
  if (round.basis === 'any') return [{ name: 'Any topic', seat: null }]
  if (round.basis === 'both') {
    if (cards[0].toLowerCase() === cards[1].toLowerCase()) return [{ name: cards[0], seat: null }]
    const order: Seat[] = viewer === 0 ? [0, 1] : [1, 0]
    return order.map(seat => ({ name: cards[seat], seat }))
  }
  const topic = round.topic ?? cards[0]
  const seat: Seat = cards[0].toLowerCase() === topic.toLowerCase() ? 0 : 1
  return [{ name: topic, seat }]
}

/** Whether round `index` opens on a coin: a pair no question covers, its coin tossed. */
export function isCoinRound(draft: BattleDraft | null, index: number): boolean {
  const round = draft?.rounds[index]
  return !!round && !round.paired && round.coin !== null
}

/**
 * The pairs as the deal lays them out, left to right: each pair once, in the
 * order its first round comes up, the final last — with that round's label
 * (*Round 1*, *Round 2*, *Final*).
 */
export function dealtOrder(draft: Pick<BattleDraft, 'pairs'>, rounds: number): { pair: DealtPair; index: number; label: string; final: boolean }[] {
  const plan = roundPairs(draft.pairs.length, rounds)
  const finalPair = draft.pairs.length - 1
  return draft.pairs
    .map((pair, index) => ({ pair, index, first: plan.indexOf(index) }))
    .sort((a, b) => (a.index === finalPair ? 1 : b.index === finalPair ? -1 : a.first - b.first))
    .map(({ pair, index, first }) => ({
      pair,
      index,
      final: index === finalPair,
      label: index === finalPair ? 'Final' : `Round ${first + 1}`,
    }))
}

// ── Running the draft ───────────────────────────────────────────────────────
// What happens to the draft, as plain functions: the host's session runs them
// online (lib/battleSession.ts), and a same-screen battle runs them on the one
// device it is passed around (components/battle/deck/DeckLocal.tsx).

/** A draft with `seat`'s hand locked in. */
export function withHand(draft: BattleDraft, seat: Seat, hand: string[], levels: number[]): BattleDraft {
  const hands: BattleDraft['hands'] = [...draft.hands]
  const levelPair: BattleDraft['levels'] = [...draft.levels]
  const counts: BattleDraft['counts'] = [...draft.counts]
  hands[seat] = hand
  levelPair[seat] = levels
  counts[seat] = hand.length
  return { ...draft, hands, levels: levelPair, counts }
}

/** A draft with `seat`'s count of cards drawn so far. */
export function withCount(draft: BattleDraft, seat: Seat, count: number): BattleDraft {
  if (draft.counts[seat] === count) return draft
  const counts: BattleDraft['counts'] = [...draft.counts]
  counts[seat] = count
  return { ...draft, counts }
}

/** A draft with `seat`'s strike made. */
export function withStrike(draft: BattleDraft, seat: Seat, topic: string): BattleDraft {
  const strikes: BattleDraft['strikes'] = [...draft.strikes]
  strikes[seat] = topic
  return { ...draft, strikes }
}

/** One round's question, never one in `used`: on both cards, or on one (see `drawRound`). */
export type DraftDraw = (cards: readonly [string, string], on: 'both' | string, used: ReadonlySet<string>) =>
  { key: BattleQuestionKey; basis: RoundBasis; topic: string | null } | null

/**
 * The deal, once both strikes are in: the six cards left dealt to pairs, each
 * paired round's question drawn, and a stand-in for each coin round until its
 * coin is tossed (`settleCoinRound`). The draft comes back in its deal phase,
 * `DEAL_MS` from `now`, with the battle's questions; null when the bank has
 * nothing to play on.
 */
export function dealDraft(draft: BattleDraft, { rounds: count, read, draw, random, now }: {
  rounds: number
  read: ReadPair
  draw: DraftDraw
  random: () => number
  now: number
}): { draft: BattleDraft; keys: BattleQuestionKey[] } | null {
  const rows = keptHand(draft, 0)
  const cols = keptHand(draft, 1)
  const { grid, pairs } = dealPairs(rows, cols, read, random)
  const used = new Set<string>()
  const keys: BattleQuestionKey[] = []
  const rounds: DraftRound[] = []
  const plan = roundPairs(pairs.length, count)
  // Paired rounds first, so no coin round's stand-in can take their question.
  const paired = new Map<number, NonNullable<ReturnType<DraftDraw>>>()
  plan.forEach((p, i) => {
    if (pairs[p].shared === 0) return
    const drawn = draw(pairs[p].cards, 'both', used)
    if (!drawn) return
    used.add(drawn.key.id)
    paired.set(i, drawn)
  })
  for (let i = 0; i < plan.length; i++) {
    const pair = pairs[plan[i]]
    const drawn = paired.get(i)
    if (drawn) {
      keys.push(drawn.key)
      rounds.push({ pair: plan[i], paired: true, coin: null, basis: drawn.basis, topic: drawn.topic })
      continue
    }
    // A coin round: a stand-in from the pool until the coin is tossed.
    const standIn = draw(pair.cards, pair.cards[0], new Set())
    if (!standIn) break
    keys.push(standIn.key)
    rounds.push({ pair: plan[i], paired: false, coin: null, basis: null, topic: null })
  }
  if (keys.length === 0) return null
  return { draft: { ...draft, phase: 'deal', deadline: now + DEAL_MS, rows, cols, grid, pairs, rounds }, keys }
}

/**
 * Round `index` has come up: if no question covers its pair, toss the coin
 * between its two cards, draw the question on the winner, and hold the
 * count-in back `COIN_MS` so the toss can be watched. Null when there is
 * nothing to settle (a paired round, or a coin already tossed).
 */
export function settleCoinRound(
  battle: BattleState,
  draft: BattleDraft,
  index: number,
  draw: (config: BattleConfig, cards: readonly [string, string], on: string, used: ReadonlySet<string>) => ReturnType<DraftDraw>,
  random: () => number,
): { battle: BattleState; draft: BattleDraft } | null {
  const round = draft.rounds[index]
  if (!round || round.paired || round.coin !== null) return null
  const pair = draft.pairs[round.pair]
  const coin: Seat = random() < 0.5 ? 0 : 1
  // Every question already played, and every paired round's still to come.
  const used = new Set(battle.questions.filter((_, i) => i < index || draft.rounds[i]?.paired).map(q => q.id))
  const drawn = draw({ ...battle.config }, pair.cards, pair.cards[coin], used)
  const key = drawn?.key ?? battle.questions[index]
  const questions = battle.questions.map((q, i) => (i === index ? key : q))
  const live = battle.rounds[index]
  const rounds = live
    ? battle.rounds.map((r, i) => (i === index ? { ...r, questionId: key.id, opensAt: r.opensAt + COIN_MS, deadline: r.deadline + COIN_MS } : r))
    : battle.rounds
  const settled: DraftRound = { ...round, coin, basis: drawn?.basis ?? 'any', topic: drawn ? drawn.topic : null }
  return {
    battle: { ...battle, questions, rounds },
    draft: { ...draft, rounds: draft.rounds.map((r, i) => (i === index ? settled : r)) },
  }
}

// ── Telling the draft ───────────────────────────────────────────────────────

/** "0 of 4", "3 of 4" — a hand as it is drawn. */
export function handCountLine(drawn: number): string {
  return `${Math.min(drawn, HAND_SIZE)} of ${HAND_SIZE}`
}

/**
 * A topic as short as a chip or a card's name line can take it: a trailing
 * *Method* says nothing a pair of method names doesn't (*Bornhuetter-Ferguson*
 * against *Chain Ladder*).
 */
export function shortTopic(name: string): string {
  const short = name.replace(/\s+Method$/i, '')
  return short.length > 0 ? short : name
}

/**
 * Who struck what, from `viewer`'s seat, the other player first: "Sam struck
 * Pure Premium. You struck Cape Cod Method."
 */
export function strikeLine(strikes: BattleDraft['strikes'], viewer: Seat | null, names: readonly [string, string]): string {
  // On one screen there is no "you": both players read it, so each is named.
  const other: Seat = viewer === 0 ? 1 : 0
  const self: Seat = other === 0 ? 1 : 0
  const parts: string[] = []
  if (strikes[other]) parts.push(`${names[other]} struck ${strikes[other]}.`)
  if (strikes[self]) parts.push(viewer === null ? `${names[self]} struck ${strikes[self]}.` : `You struck ${strikes[self]}.`)
  return parts.join(' ')
}

/** A dealt pair's names, under its card: "Benktander + Chain Ladder", or "… or …" for a coin round. */
export function pairLine(cards: readonly [string, string], paired: boolean): [string, string] {
  return [shortTopic(cards[0]), `${paired ? '+' : 'or'} ${shortTopic(cards[1])}`]
}
