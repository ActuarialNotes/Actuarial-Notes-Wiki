// How a Quiz Battle is *drawn*: the two players' colours, the words the
// scoreboard uses, and the lines a round's result is told in. Pure, and kept
// apart from lib/battle.ts so the rules never learn what anything looks like.

import type { CSSProperties } from 'react'
import { EXAM_LABEL_TO_ID } from './examIds'
import {
  currentRound,
  isFinalRound,
  type BattleState,
  type PointsBreakdown,
  type RoundAnswer,
  type RoundState,
  type Seat,
} from './battle'

// ── The players' colours ────────────────────────────────────────────────────
//
// Two players need two colours that say *who*, never *how it went*. So both
// stay off the meaning map (style guide §4.1): not green or red (right and
// wrong are what the options are painted in), not amber (caution) and not
// orange (the streak flame the scoreboard also shows). Sky and fuchsia sit
// well clear of all four — and are the two ends of the foil the winner wears.

export const PLAYER_HUES: readonly [number, number] = [199, 292]

const SATURATION = 85
const LIGHTNESS = 55
const VIVID_SATURATION = 90
const VIVID_LIGHTNESS = 44

export function playerAccent(seat: Seat, alpha = 1): string {
  const base = `${PLAYER_HUES[seat]} ${SATURATION}% ${LIGHTNESS}%`
  return alpha >= 1 ? `hsl(${base})` : `hsl(${base} / ${alpha})`
}

/**
 * The player's colour as custom properties, spread on whatever element is
 * that player's — the same four steps `examAccentStyle` hands an exam:
 * `--player` (text, a ring), `--player-muted` (a resting edge),
 * `--player-soft` (a wash) and `--player-vivid` (a fill carrying white text).
 */
export function playerAccentStyle(seat: Seat): CSSProperties {
  return {
    '--player': playerAccent(seat),
    '--player-muted': playerAccent(seat, 0.45),
    '--player-soft': playerAccent(seat, 0.14),
    '--player-vivid': `hsl(${PLAYER_HUES[seat]} ${VIVID_SATURATION}% ${VIVID_LIGHTNESS}%)`,
  } as CSSProperties
}

/** Up to two letters for a player's tile: "Ada Lovelace" → "AL", "bo" → "B". */
export function playerInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  const letters = words.length === 1 ? [...words[0]].slice(0, 1) : [[...words[0]][0], [...words[words.length - 1]][0]]
  return letters.join('').toUpperCase()
}

export const DEFAULT_PLAYER_NAMES: readonly [string, string] = ['Player 1', 'Player 2']

// ── Exams ───────────────────────────────────────────────────────────────────

const SHORT_EXAM_NAMES: Record<string, string> = {
  'Probability': 'Exam P',
  'Financial Mathematics': 'Exam FM',
}

/** An exam as a battle names it: "Exam P", "Exam MAS-I". */
export function battleExamName(exam: string): string {
  return SHORT_EXAM_NAMES[exam] ?? exam
}

/** The exam's progress key — what its logo and colour are keyed by — or null. */
export function battleExamKey(exam: string): string | null {
  return EXAM_LABEL_TO_ID[exam] ?? null
}

// ── Telling a round ─────────────────────────────────────────────────────────

export interface PointsChip {
  label: string
  value: number
}

/**
 * What a right answer's points were made of, as the chips beside its total —
 * only the parts it actually earned, and the doubling said once rather than
 * folded silently into every number.
 */
export function pointsChips(points: PointsBreakdown): PointsChip[] {
  const chips: PointsChip[] = []
  if (points.speed > 0) chips.push({ label: 'Speed', value: points.speed })
  if (points.streak > 0) chips.push({ label: 'Streak', value: points.streak })
  if (points.fastest > 0) chips.push({ label: 'Fastest', value: points.fastest })
  if (points.penalty < 0) chips.push({ label: 'Wrong buzz', value: points.penalty })
  return chips
}

/** "+135", "−50", "0". */
export function signedPoints(n: number): string {
  if (n > 0) return `+${n.toLocaleString('en-US')}`
  if (n < 0) return `−${Math.abs(n).toLocaleString('en-US')}`
  return '0'
}

/**
 * The round's result in one line, from the point of view of nobody in
 * particular: "Ada got it", "Steal! Bo got it", "Both got it — Ada was
 * faster", "Nobody got it", "Time's up".
 */
export function roundHeadline(round: RoundState, names: readonly [string, string]): string {
  const right = round.answers.filter(a => a.correct)
  if (right.length === 2) {
    const fastest = right.find(a => a.fastest) ?? right[0]
    return right.every(a => a.fastest) ? 'Both got it — a dead heat' : `Both got it — ${names[fastest.seat]} was faster`
  }
  if (right.length === 1) {
    const [a] = right
    return a.steal ? `Steal! ${names[a.seat]} got it` : `${names[a.seat]} got it`
  }
  if (round.outcome === 'timeout') return "Time's up"
  return 'Nobody got it'
}

/** A player's answer in a round, if they gave one. */
export function answerFor(round: RoundState, seat: Seat): RoundAnswer | undefined {
  // Buzzer rounds can hold a miss and then nothing else for a seat; the last
  // answer a seat gave is the one to tell.
  const mine = round.answers.filter(a => a.seat === seat)
  return mine[mine.length - 1]
}

/** "Question 3 of 5", "Final question". */
export function roundLabel(state: BattleState, index = currentRound(state).index): string {
  if (isFinalRound(state, index)) return 'Final question'
  return `Question ${index + 1} of ${state.config.rounds}`
}

/** A player's standing, for the results headline. */
export function resultHeadline(
  winner: Seat | null,
  forfeit: Seat | null,
  names: readonly [string, string],
): string {
  if (winner === null) return "It's a draw"
  if (forfeit !== null) return `${names[forfeit]} left — ${names[winner]} wins`
  return `${names[winner]} wins`
}
