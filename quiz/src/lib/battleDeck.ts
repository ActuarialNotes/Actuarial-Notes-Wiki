// **Quiz Battle as a deck of cards** — the pure half of the redesign's look
// and flow (docs/quiz-battle-redesign.md, phase 1). No rule here changes the
// game: these are the facts the deck screens draw — how the hand of modes is
// laid out, how a setting steps on, what each round of a finished battle was
// worth to each player, and which lost round the results offer as practice.

import { SEATS, isFinalRound, type BattleState, type Seat } from './battle'
import type { MasteryState } from './mastery'
import { quizLaunchUrl } from './quizBuilder'

// ── The start screen's hand ─────────────────────────────────────────────────

/** The three ways in, as the start screen's hand of cards. */
export type DeckMode = 'local' | 'lobby' | 'friend'

/** The hand at rest, left to right: Random opponent raised in the middle. */
export const DECK_MODES: readonly DeckMode[] = ['local', 'lobby', 'friend']

/**
 * Where each card lies once `raised` is raised: it takes the middle, and the
 * other two keep their order either side of it — so tapping a side card swaps
 * it with the middle one and nothing else moves.
 */
export function handLayout(raised: DeckMode): { left: DeckMode; middle: DeckMode; right: DeckMode } {
  const rest = DECK_MODES.filter(m => m !== raised)
  return { left: rest[0], middle: raised, right: rest[1] }
}

/** The next value of a setting a tap steps through (questions, time each), wrapping. */
export function nextInCycle<T>(list: readonly T[], current: T): T {
  const i = list.indexOf(current)
  return list[(i + 1) % list.length] ?? list[0]
}

// ── The results ─────────────────────────────────────────────────────────────

export interface DeckRoundRow {
  index: number
  /** What the round was on: its pair when a question tested both, the coin's topic, or nothing (the whole exam). */
  topics: string[]
  /** The final round, which counts double. */
  final: boolean
  /** What each seat took from it, every part of every answer included. */
  points: [number, number]
}

/** Each round played, with what it was worth to each player. */
export function roundRows(battle: BattleState, topicsOf: (index: number) => readonly string[]): DeckRoundRow[] {
  const played = battle.rounds.filter(r => r.phase === 'revealed')
  return played.map(round => ({
    index: round.index,
    topics: [...topicsOf(round.index)],
    final: isFinalRound(battle, round.index),
    points: SEATS.map(seat =>
      round.answers.filter(a => a.seat === seat).reduce((n, a) => n + a.points.total, 0),
    ) as [number, number],
  }))
}

/** The rounds this seat didn't get right: a miss, no answer, or a round nobody got. */
export function lostRounds(battle: BattleState, seat: Seat): number[] {
  return battle.rounds
    .filter(r => r.phase === 'revealed' && !r.answers.some(a => a.seat === seat && a.correct))
    .map(r => r.index)
}

const LEVEL_RANK: Record<MasteryState, number> = { new: 0, forgotten: 1, level1: 2, level2: 3, level3: 4 }

/**
 * The topic the results offer as practice: of the topics of the rounds this
 * seat lost (a paired round has two), the one they hold at the lowest level —
 * the earliest when two tie. Null when they lost none, or none had a topic.
 */
export function weakestLostTopic(
  battle: BattleState,
  seat: Seat,
  topicsOf: (index: number) => readonly string[],
  levelOf: (topic: string) => MasteryState,
): string | null {
  let best: { topic: string; rank: number } | null = null
  for (const index of lostRounds(battle, seat)) {
    for (const topic of topicsOf(index)) {
      const rank = LEVEL_RANK[levelOf(topic)] ?? 0
      if (!best || rank < best.rank) best = { topic, rank }
    }
  }
  return best?.topic ?? null
}

/** The quiz a lost round's Practice opens: the quiz builder's concept launch. */
export function practicePath(topic: string): string {
  return quizLaunchUrl({ kind: 'concept', concept: topic, levels: null }, { mode: 'quiz', reveal: 'during', links: '1', timed: false })
}

/** The round's name on a card: "Round 2 of 3", or "Final ×2". */
export function deckRoundLabel(battle: Pick<BattleState, 'config'>, index: number): string {
  return isFinalRound(battle, index) ? 'Final ×2' : `Round ${index + 1} of ${battle.config.rounds}`
}

/** A concept's level as its card prints it: New, L1, L2, L3 — a lapsed one is New again. */
export function levelTag(state: MasteryState): string {
  return cardLevelTag(levelNumber(state))
}

/** A level as the draft carries it, 0 (New) to 3 — a lapsed concept is New again. */
export function levelNumber(state: MasteryState): number {
  return state === 'level1' ? 1 : state === 'level2' ? 2 : state === 'level3' ? 3 : 0
}

/** A level the draft carries, as a card prints it. */
export function cardLevelTag(level: number): string {
  return level === 1 ? 'L1' : level === 2 ? 'L2' : level === 3 ? 'L3' : 'New'
}
