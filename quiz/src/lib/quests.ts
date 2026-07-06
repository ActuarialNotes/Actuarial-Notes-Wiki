// Daily-quest engine — pure, deterministic, and fully testable (roadmap P1.4).
//
// This is the single source of truth for quest mechanics: which quests are live
// on a given day, how a completed quiz advances them, and when a completion pays
// out. Like lib/streak.ts and lib/xp.ts it has no I/O and no React — callers
// (the questStore sync layer, the useQuests hook, and vitest) feed it a
// QuestsState + the user's *local* calendar day and get a new state (or a
// derived view) back. The quests themselves are authored in data/quests.ts.
//
// Design notes:
//   • Rotation is a pure function of the local day key, so guests, signed-in
//     devices, and the server all agree on today's quests without persisting a
//     selection anywhere: one always-achievable quest from the core pool plus
//     two specials of distinct kinds.
//   • Rewards fire exactly once per quest per day: a quest id enters `rewarded`
//     the moment its tally reaches the target, and applyQuizEvent only reports
//     quests as newly completed when they weren't already in that list.
//   • Day boundaries reuse the same local-day keys as the streak/XP systems, so
//     stale progress from yesterday reads as 0 today (see questBoard).

import {
  CORE_QUESTS,
  DAILY_QUEST_COUNT,
  PERFECT_QUIZ_MIN,
  SPECIAL_QUESTS,
  type QuestDef,
  type QuestKind,
} from '@/data/quests'
import type { XpAnswer } from './xp'

/** The two authored pools the daily rotation draws from (swappable in tests). */
export interface QuestPools {
  /** Always-achievable volume quests — exactly one is live per day. */
  core: readonly QuestDef[]
  /** Retention-aligned quests — the rest of the day's slots, distinct kinds. */
  special: readonly QuestDef[]
}

export const DEFAULT_POOLS: QuestPools = { core: CORE_QUESTS, special: SPECIAL_QUESTS }

/** FNV-1a 32-bit — a tiny, stable string hash for the daily rotation. */
export function hashString(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/**
 * The quests that are live on `dayKey` ('YYYY-MM-DD', user-local). Deterministic:
 * one core quest, then specials of pairwise-distinct kinds scanned from a hashed
 * start index, up to DAILY_QUEST_COUNT total.
 */
export function pickDailyQuests(dayKey: string, pools: QuestPools = DEFAULT_POOLS): QuestDef[] {
  const picks: QuestDef[] = []
  if (pools.core.length > 0) {
    picks.push(pools.core[hashString(`${dayKey}:core`) % pools.core.length])
  }
  if (pools.special.length > 0) {
    const start = hashString(`${dayKey}:special`) % pools.special.length
    for (let i = 0; i < pools.special.length && picks.length < DAILY_QUEST_COUNT; i++) {
      const q = pools.special[(start + i) % pools.special.length]
      if (picks.some(p => p.id === q.id || p.kind === q.kind)) continue
      picks.push(q)
    }
  }
  return picks
}

// ── Evaluating a quiz ─────────────────────────────────────────────────────────

/** A completed quiz, reduced to just what quest evaluation needs. */
export interface QuestQuizEvent {
  /** The answered questions (same shape the XP engine consumes). */
  answers: XpAnswer[]
  /** Concepts this quiz moved *up* the mastery ladder. */
  levelUps: number
  /** Questions in the quiz, answered or not (perfect runs need all of them). */
  totalQuestions: number
}

/** How much a single quiz advances a quest of `kind`. */
export function tallyForKind(kind: QuestKind, ev: QuestQuizEvent): number {
  switch (kind) {
    case 'correct':
      return ev.answers.filter(a => a.isCorrect).length
    case 'hard_correct':
      return ev.answers.filter(a => a.isCorrect && a.difficulty === 'hard').length
    case 'revive':
      return ev.answers.filter(a => a.isCorrect && a.reviving).length
    case 'level_up':
      return Math.max(0, Math.floor(ev.levelUps))
    case 'perfect_quiz': {
      const correct = ev.answers.filter(a => a.isCorrect).length
      const perfect =
        ev.totalQuestions >= PERFECT_QUIZ_MIN &&
        ev.answers.length === ev.totalQuestions &&
        correct === ev.totalQuestions
      return perfect ? 1 : 0
    }
  }
}

// ── Persisted state ───────────────────────────────────────────────────────────

/** Persisted quest state. `day` is a 'YYYY-MM-DD' key in the user's local tz. */
export interface QuestsState {
  /** Local day the tallies belong to, or null before any progress. */
  day: string | null
  /** Quest id → tally accumulated on `day`. */
  progress: Record<string, number>
  /** Quest ids whose rewards were already paid on `day`. */
  rewarded: string[]
}

export function emptyQuests(): QuestsState {
  return { day: null, progress: {}, rewarded: [] }
}

/**
 * Advance today's quests with a completed quiz. Rolls stale progress over at the
 * local day boundary, accumulates tallies, and reports which quests crossed
 * their target *this call* (already-rewarded quests never repeat). A quiz that
 * advances nothing on the current day is a no-op (same state reference), so
 * callers can invoke it on every quiz completion.
 */
export function applyQuizEvent(
  state: QuestsState,
  ev: QuestQuizEvent,
  todayKey: string,
  quests: QuestDef[] = pickDailyQuests(todayKey),
): { next: QuestsState; completed: QuestDef[] } {
  const sameDay = state.day === todayKey
  const progress: Record<string, number> = sameDay ? { ...state.progress } : {}
  const rewarded = sameDay ? [...state.rewarded] : []
  let changed = !sameDay
  const completed: QuestDef[] = []

  for (const q of quests) {
    const inc = tallyForKind(q.kind, ev)
    if (inc > 0) {
      progress[q.id] = (progress[q.id] ?? 0) + inc
      changed = true
    }
    if ((progress[q.id] ?? 0) >= q.target && !rewarded.includes(q.id)) {
      rewarded.push(q.id)
      completed.push(q)
      changed = true
    }
  }

  if (!changed) return { next: state, completed }
  return { next: { day: todayKey, progress, rewarded }, completed }
}

/** Total payout for a batch of completed quests. */
export function questRewards(quests: QuestDef[]): { gems: number; xp: number } {
  return quests.reduce(
    (sum, q) => ({ gems: sum.gems + q.gems, xp: sum.xp + q.xp }),
    { gems: 0, xp: 0 },
  )
}

// ── Derived view ──────────────────────────────────────────────────────────────

export interface QuestProgressView {
  quest: QuestDef
  /** Today's tally, clamped to the target. */
  earned: number
  /** The quest's target (mirrored from the def for convenience). */
  target: number
  /** earned/target, clamped to [0, 1] — the progress bar fill. */
  ratio: number
  /** Whether the quest is cleared (reward paid or target reached). */
  done: boolean
}

/** Today's standing for each live quest. Stale (yesterday's) tallies read as 0. */
export function questBoard(
  state: QuestsState,
  todayKey: string,
  quests: QuestDef[] = pickDailyQuests(todayKey),
): QuestProgressView[] {
  const sameDay = state.day === todayKey
  return quests.map(q => {
    const raw = sameDay ? (state.progress[q.id] ?? 0) : 0
    const done = raw >= q.target || (sameDay && state.rewarded.includes(q.id))
    return {
      quest: q,
      earned: Math.min(q.target, raw),
      target: q.target,
      ratio: q.target > 0 ? Math.min(1, raw / q.target) : 1,
      done,
    }
  })
}
