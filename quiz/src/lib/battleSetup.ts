// A Quiz Battle's settings, as the setup form holds them and as the browser
// remembers them between battles — the rematch after next should open on the
// same exam and the same two names, not the defaults.

import {
  DEFAULT_ROUNDS,
  MAX_NAME_LENGTH,
  ROUND_COUNTS,
  roundSecondsFor,
  type BattleConfig,
  type BattleRules,
  type RoundTimePreset,
} from './battle'
import type { DifficultyTarget } from './quizDifficulty'
import { ANY_EXAM, MATCH_DIFFICULTY, MATCH_ROUNDS, MATCH_TIME } from './battleLobby'

export type BattleDifficulty = 'easy' | 'mixed' | 'hard'

export const BATTLE_DIFFICULTIES: readonly { id: BattleDifficulty; label: string; target: DifficultyTarget }[] = [
  { id: 'easy', label: 'Easy', target: 0 },
  { id: 'mixed', label: 'Mixed', target: 0.5 },
  { id: 'hard', label: 'Hard', target: 1 },
]

export interface BattleSetup {
  /** A question's `exam` field; empty until one is picked. */
  exam: string
  rounds: number
  time: RoundTimePreset
  difficulty: BattleDifficulty
  /** One screen: both players' names. Online: the first is this player's. */
  names: [string, string]
  /** What this player asks the matchmaking lobby for: an exam, or `ANY_EXAM`. */
  lobbyExam: string
}

export const DEFAULT_SETUP: BattleSetup = {
  exam: '',
  rounds: DEFAULT_ROUNDS,
  time: 'standard',
  difficulty: 'mixed',
  names: ['', ''],
  lobbyExam: ANY_EXAM,
}

export const SETUP_STORAGE_KEY = 'actuarial_battle_setup_v1'

/** Whatever of a stored setup is still valid, over the defaults. */
export function setupFromStored(raw: string | null): BattleSetup {
  if (!raw) return DEFAULT_SETUP
  try {
    const o = JSON.parse(raw) as Record<string, unknown>
    if (!o || typeof o !== 'object') return DEFAULT_SETUP
    const names = Array.isArray(o.names) ? o.names : []
    const name = (v: unknown) => (typeof v === 'string' ? v.slice(0, MAX_NAME_LENGTH) : '')
    return {
      exam: typeof o.exam === 'string' ? o.exam : DEFAULT_SETUP.exam,
      rounds: (ROUND_COUNTS as readonly unknown[]).includes(o.rounds) ? (o.rounds as number) : DEFAULT_SETUP.rounds,
      time: o.time === 'blitz' || o.time === 'standard' || o.time === 'exam' ? o.time : DEFAULT_SETUP.time,
      difficulty: o.difficulty === 'easy' || o.difficulty === 'mixed' || o.difficulty === 'hard' ? o.difficulty : DEFAULT_SETUP.difficulty,
      names: [name(names[0]), name(names[1])],
      lobbyExam: typeof o.lobbyExam === 'string' && o.lobbyExam.length <= 80 ? o.lobbyExam : DEFAULT_SETUP.lobbyExam,
    }
  } catch {
    return DEFAULT_SETUP
  }
}

export function loadBattleSetup(): BattleSetup {
  try {
    return setupFromStored(localStorage.getItem(SETUP_STORAGE_KEY))
  } catch {
    return DEFAULT_SETUP
  }
}

export function saveBattleSetup(setup: BattleSetup): void {
  try {
    localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(setup))
  } catch { /* private mode */ }
}

export function difficultyTarget(difficulty: BattleDifficulty): DifficultyTarget {
  return BATTLE_DIFFICULTIES.find(d => d.id === difficulty)?.target ?? 0.5
}

/** The engine's configuration for a setup, under a set of rules. */
export function configFromSetup(setup: BattleSetup, rules: BattleRules): BattleConfig {
  return {
    rules,
    exam: setup.exam,
    rounds: setup.rounds,
    roundSeconds: roundSecondsFor(setup.time, setup.exam),
  }
}

/**
 * The exam a setup should open on: the remembered one while it can still be
 * battled, else the first that can (the list comes in ladder order).
 */
export function pickExam(remembered: string, available: readonly string[]): string {
  if (available.includes(remembered)) return remembered
  return available[0] ?? ''
}

/**
 * A matched battle's settings (lib/battleLobby.ts): two strangers get the middle
 * of the road — five questions, two minutes each, a mixed draw — on the exam the
 * lobby matched them on.
 */
export function matchSettings(exam: string): { config: BattleConfig; difficulty: DifficultyTarget } {
  const setup: BattleSetup = { ...DEFAULT_SETUP, exam, rounds: MATCH_ROUNDS, time: MATCH_TIME, difficulty: MATCH_DIFFICULTY }
  return { config: configFromSetup(setup, 'simultaneous'), difficulty: difficultyTarget(setup.difficulty) }
}

/** The lobby exam a setup should open on: the remembered one while it can be battled, else any. */
export function pickLobbyExam(remembered: string, available: readonly string[]): string {
  return available.includes(remembered) ? remembered : ANY_EXAM
}
