// Daily-quest engine — pure, deterministic, and fully testable (roadmap P1.4).
//
// This is the single source of truth for quest mechanics: how a day's quest
// board is generated, how a completed quiz advances it, and how cleared quests
// are claimed. Like lib/streak.ts and lib/xp.ts it has no I/O and no React —
// callers (the questStore sync layer, the useQuests hook, and vitest) feed it a
// QuestsState + the user's *local* calendar day and get a new state (or a
// derived view) back. The quests themselves are authored in data/quests.ts.
//
// Design notes:
//   • The board is *personalized*, so it can't be a pure function of the date:
//     a revive quest only appears when the student actually has concepts
//     decayed to Forgotten (sized to how many), and a study-plan focus quest
//     ("answer 2 questions on Sample Space") only when today's plan has
//     concepts. The generated board is therefore frozen into QuestsState on
//     first touch of the day and persisted, so every surface — and every later
//     quiz, which may not have plan context — sees the same quests.
//   • Rewards are claimed, not auto-paid: reaching a target marks a quest
//     completed (claimable); the student collects it explicitly, which is when
//     the payout fires. A quest id enters `claimed` exactly once per day.
//   • Day boundaries reuse the same local-day keys as the streak/XP systems, so
//     a stale board from yesterday is regenerated on first touch today.

import {
  CORE_QUESTS,
  DAILY_QUEST_COUNT,
  PERFECT_QUIZ_MIN,
  REVIVE_QUESTS,
  SPECIAL_QUESTS,
  makeConceptQuest,
  type QuestDef,
  type QuestKind,
} from '@/data/quests'
import type { XpAnswer } from './xp'

/** The authored pools a day's board draws from (swappable in tests). */
export interface QuestPools {
  /** Always-achievable volume quests — exactly one is live per day. */
  core: readonly QuestDef[]
  /** Revive ladder — eligible only when forgotten concepts are due. */
  revive: readonly QuestDef[]
  /** Generic retention quests that fill the remaining slots. */
  special: readonly QuestDef[]
}

export const DEFAULT_POOLS: QuestPools = {
  core: CORE_QUESTS,
  revive: REVIVE_QUESTS,
  special: SPECIAL_QUESTS,
}

/**
 * What the board generator knows about the student's day. Supplied by the
 * Dashboard (which has mastery records + the study plan); everything degrades
 * gracefully to a generic board when absent.
 */
export interface QuestContext {
  /** Concepts currently decayed to Forgotten (i.e. due for revival). */
  forgottenDue: number
  /** Concept names in today's study plan (focus-quest candidates). */
  planConcepts: readonly string[]
}

export const EMPTY_QUEST_CONTEXT: QuestContext = { forgottenDue: 0, planConcepts: [] }

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
 * Generate the quest board for `dayKey` ('YYYY-MM-DD', user-local).
 * Deterministic for a given (day, context): one core quest; then a revive quest
 * when forgotten concepts are due (the largest target those concepts cover, so
 * it's always genuinely achievable); then a focus quest on one of today's plan
 * concepts; then generic specials of pairwise-distinct kinds until the board
 * has DAILY_QUEST_COUNT quests.
 */
export function pickDailyQuests(
  dayKey: string,
  context: QuestContext = EMPTY_QUEST_CONTEXT,
  pools: QuestPools = DEFAULT_POOLS,
): QuestDef[] {
  const picks: QuestDef[] = []
  if (pools.core.length > 0) {
    picks.push(pools.core[hashString(`${dayKey}:core`) % pools.core.length])
  }

  if (context.forgottenDue > 0 && pools.revive.length > 0 && picks.length < DAILY_QUEST_COUNT) {
    const eligible = pools.revive.filter(q => q.target <= context.forgottenDue)
    const best = eligible.reduce(
      (a, b) => (b.target > a.target ? b : a),
      eligible[0] ?? pools.revive[0],
    )
    picks.push(best)
  }

  if (context.planConcepts.length > 0 && picks.length < DAILY_QUEST_COUNT) {
    const concept =
      context.planConcepts[hashString(`${dayKey}:concept`) % context.planConcepts.length]
    picks.push(makeConceptQuest(concept))
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

/** An answered question, as quest evaluation sees it (XP shape + its concepts). */
export interface QuestAnswer extends XpAnswer {
  /** Canonical concept names the question touches (for focus quests). */
  concepts: readonly string[]
}

/** A completed quiz, reduced to just what quest evaluation needs. */
export interface QuestQuizEvent {
  answers: QuestAnswer[]
  /** Concepts this quiz moved *up* the mastery ladder. */
  levelUps: number
  /** Questions in the quiz, answered or not (perfect runs need all of them). */
  totalQuestions: number
}

/** How much a single quiz advances a quest. */
export function tallyForQuest(quest: Pick<QuestDef, 'kind' | 'concept'>, ev: QuestQuizEvent): number {
  const kind: QuestKind = quest.kind
  switch (kind) {
    case 'correct':
      return ev.answers.filter(a => a.isCorrect).length
    case 'hard_correct':
      return ev.answers.filter(a => a.isCorrect && a.difficulty === 'hard').length
    case 'revive':
      return ev.answers.filter(a => a.isCorrect && a.reviving).length
    case 'level_up':
      return Math.max(0, Math.floor(ev.levelUps))
    case 'concept_correct': {
      const wanted = quest.concept?.toLowerCase()
      if (!wanted) return 0
      return ev.answers.filter(
        a => a.isCorrect && a.concepts.some(c => c.toLowerCase() === wanted),
      ).length
    }
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
  /** Local day the board belongs to, or null before any board exists. */
  day: string | null
  /** The day's quest board, frozen at generation (personalized quests included). */
  quests: QuestDef[]
  /** Quest id → tally accumulated on `day`. */
  progress: Record<string, number>
  /** Quest ids whose rewards were collected on `day`. */
  claimed: string[]
}

export function emptyQuests(): QuestsState {
  return { day: null, quests: [], progress: {}, claimed: [] }
}

/**
 * Ensure the state carries a board for `todayKey`, generating one when the day
 * rolled over (or none exists yet). An existing same-day board is never touched
 * — see reseedDailyQuests for deliberate re-personalization.
 */
export function rollDailyQuests(
  state: QuestsState,
  todayKey: string,
  context: QuestContext = EMPTY_QUEST_CONTEXT,
  pools: QuestPools = DEFAULT_POOLS,
): QuestsState {
  if (state.day === todayKey && state.quests.length > 0) return state
  return {
    day: todayKey,
    quests: pickDailyQuests(todayKey, context, pools),
    progress: {},
    claimed: [],
  }
}

/**
 * Re-personalize today's board from fresh context — but only while it is
 * untouched (no progress, nothing claimed), so a board the student has started
 * never shifts under them. Used when the Dashboard loads with real mastery/plan
 * context after a generic board was seeded (e.g. by an early-morning quiz), or
 * when the context itself changed (a concept decayed, the plan regenerated).
 */
export function reseedDailyQuests(
  state: QuestsState,
  todayKey: string,
  context: QuestContext,
  pools: QuestPools = DEFAULT_POOLS,
): QuestsState {
  const rolled = rollDailyQuests(state, todayKey, context, pools)
  if (rolled !== state) return rolled
  if (Object.keys(state.progress).length > 0 || state.claimed.length > 0) return state
  const fresh = pickDailyQuests(todayKey, context, pools)
  const same =
    fresh.length === state.quests.length && fresh.every((q, i) => q.id === state.quests[i].id)
  return same ? state : { ...state, quests: fresh }
}

/**
 * Advance today's board with a completed quiz. Rolls the day first (with a
 * generic board if none was seeded yet), accumulates tallies, and reports which
 * quests crossed their target *this call* — they become claimable, not paid; the
 * payout happens when the student collects them (see claimQuests). A quiz that
 * advances nothing on the current day is a no-op (same state reference).
 */
export function applyQuizEvent(
  state: QuestsState,
  ev: QuestQuizEvent,
  todayKey: string,
  context: QuestContext = EMPTY_QUEST_CONTEXT,
  pools: QuestPools = DEFAULT_POOLS,
): { next: QuestsState; completed: QuestDef[] } {
  const rolled = rollDailyQuests(state, todayKey, context, pools)
  const progress = { ...rolled.progress }
  let changed = rolled !== state
  const completed: QuestDef[] = []

  for (const q of rolled.quests) {
    const inc = tallyForQuest(q, ev)
    if (inc <= 0) continue
    const prev = progress[q.id] ?? 0
    progress[q.id] = prev + inc
    changed = true
    if (prev < q.target && prev + inc >= q.target) completed.push(q)
  }

  if (!changed) return { next: state, completed }
  return { next: { ...rolled, progress }, completed }
}

/**
 * Collect the rewards of completed-but-unclaimed quests (optionally only the
 * given ids). Returns the quests actually claimed this call — the caller pays
 * exactly those. Claims only apply to today's board; a stale day has nothing
 * claimable.
 */
export function claimQuests(
  state: QuestsState,
  todayKey: string,
  ids?: readonly string[],
): { next: QuestsState; claimed: QuestDef[] } {
  if (state.day !== todayKey) return { next: state, claimed: [] }
  const claimable = state.quests.filter(
    q =>
      (state.progress[q.id] ?? 0) >= q.target &&
      !state.claimed.includes(q.id) &&
      (!ids || ids.includes(q.id)),
  )
  if (claimable.length === 0) return { next: state, claimed: [] }
  return {
    next: { ...state, claimed: [...state.claimed, ...claimable.map(q => q.id)] },
    claimed: claimable,
  }
}

/** Total payout for a batch of quests. */
export function questRewards(quests: readonly QuestDef[]): { gems: number; xp: number } {
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
  /** Whether the target has been reached. */
  done: boolean
  /** Whether the reward was collected. */
  claimed: boolean
  /** done && !claimed — a Collect button should be showing. */
  claimable: boolean
}

/**
 * Today's standing for each quest on the board. Empty when the stored board
 * belongs to another day — callers seed today's board via the questStore
 * (ensureDailyQuests) before rendering.
 */
export function questBoard(state: QuestsState, todayKey: string): QuestProgressView[] {
  if (state.day !== todayKey) return []
  return state.quests.map(q => {
    const raw = state.progress[q.id] ?? 0
    const done = raw >= q.target
    const claimed = state.claimed.includes(q.id)
    return {
      quest: q,
      earned: Math.min(q.target, raw),
      target: q.target,
      ratio: q.target > 0 ? Math.min(1, raw / q.target) : 1,
      done,
      claimed,
      claimable: done && !claimed,
    }
  })
}
