// XP + daily-goal engine — pure, deterministic, and fully testable (roadmap P1.2).
//
// This is the single source of truth for the XP math: how much a quiz answer is
// worth, how total XP maps onto a level curve, and how the configurable daily
// goal is scored. Like lib/streak.ts it has no I/O and no React — callers (the
// xpStore sync layer, the useXp hook, and vitest) feed it an XpState + the user's
// *local* calendar day and get a new XpState (or a derived view) back.
//
// Design notes:
//   • XP is weighted toward behaviour that improves retention, not raw volume:
//     harder questions pay more, and correctly *reviving* a decayed/forgotten
//     concept earns a bonus on top. This keeps the reward aligned with the
//     spaced-repetition learning model rather than fighting it.
//   • The daily goal is expressed as an XP target (a small set of presets), so a
//     single number — XP earned today — drives the progress ring. Day boundaries
//     reuse lib/streak.ts's localDayKey via the caller, so a stale counter from
//     yesterday reads as 0 today (see xpEarnedToday).

/** Question difficulty as authored in the question frontmatter. */
export type XpDifficulty = 'easy' | 'medium' | 'hard'

/** A single answered question, reduced to just what XP scoring needs. */
export interface XpAnswer {
  isCorrect: boolean
  difficulty: XpDifficulty
  /** A concept this question touches had decayed (Forgotten) before the answer. */
  reviving: boolean
}

/** XP for a correct answer, by difficulty — harder questions reward more. */
export const XP_CORRECT: Record<XpDifficulty, number> = { easy: 8, medium: 12, hard: 20 }

/** Consolation XP for an incorrect attempt (effort still counts, but little). */
export const XP_ATTEMPT = 2

/** Bonus for correctly answering a question on a decaying/forgotten concept. */
export const XP_REVIVE_BONUS = 8

/** XP earned for a single answer, weighted by difficulty and decay revival. */
export function xpForAnswer(a: XpAnswer): number {
  const base = a.isCorrect ? XP_CORRECT[a.difficulty] : XP_ATTEMPT
  const revive = a.isCorrect && a.reviving ? XP_REVIVE_BONUS : 0
  return base + revive
}

/** Total XP for a batch of answers (a completed quiz). */
export function xpForAnswers(answers: XpAnswer[]): number {
  return answers.reduce((sum, a) => sum + xpForAnswer(a), 0)
}

// ── Level curve ───────────────────────────────────────────────────────────────

/**
 * XP required to advance *from* `level` to the next. Grows linearly so higher
 * levels take longer without ever stalling: L1→L2 costs 100, and each subsequent
 * level costs 40 more than the last.
 */
export function xpForLevelUp(level: number): number {
  const l = Math.max(1, Math.floor(level))
  return 100 + (l - 1) * 40
}

/** Cumulative XP required to *reach* `level` (level 1 = 0). */
export function xpToReachLevel(level: number): number {
  const target = Math.max(1, Math.floor(level))
  let total = 0
  for (let l = 1; l < target; l++) total += xpForLevelUp(l)
  return total
}

export interface LevelProgress {
  /** Current level (1-indexed). */
  level: number
  /** XP accumulated within the current level. */
  xpIntoLevel: number
  /** XP span of the current level (xpIntoLevel / xpForLevel = progress bar). */
  xpForLevel: number
  /** All-time XP the level was derived from. */
  totalXp: number
}

/** Resolve a total-XP figure to a level and the progress within that level. */
export function levelFromXp(totalXp: number): LevelProgress {
  const xp = Math.max(0, Math.floor(totalXp))
  let level = 1
  while (xp >= xpToReachLevel(level + 1)) level++
  const floor = xpToReachLevel(level)
  return { level, xpIntoLevel: xp - floor, xpForLevel: xpForLevelUp(level), totalXp: xp }
}

// ── Daily goal ────────────────────────────────────────────────────────────────

export type DailyGoalId = 'casual' | 'regular' | 'serious' | 'intense'

export interface DailyGoalPreset {
  id: DailyGoalId
  label: string
  /** XP target for the day. */
  xp: number
  /** Short hint of the effort a goal implies. */
  hint: string
}

/** The selectable daily goals, easiest → hardest. */
export const DAILY_GOALS: readonly DailyGoalPreset[] = [
  { id: 'casual', label: 'Casual', xp: 50, hint: 'A few questions' },
  { id: 'regular', label: 'Regular', xp: 100, hint: 'A short session' },
  { id: 'serious', label: 'Serious', xp: 200, hint: 'A full session' },
  { id: 'intense', label: 'Intense', xp: 350, hint: 'A long grind' },
]

export const DEFAULT_GOAL_ID: DailyGoalId = 'regular'

/** Resolve a stored goal id (possibly null/unknown) to a preset, never failing. */
export function goalById(id: string | null | undefined): DailyGoalPreset {
  return (
    DAILY_GOALS.find(g => g.id === id) ??
    DAILY_GOALS.find(g => g.id === DEFAULT_GOAL_ID)!
  )
}

// ── Persisted state ───────────────────────────────────────────────────────────

/** Persisted XP state. `today` is a 'YYYY-MM-DD' key in the user's local tz. */
export interface XpState {
  /** All-time XP. */
  totalXp: number
  /** Selected daily-goal preset. */
  goalId: DailyGoalId
  /** Local day the `todayXp` counter belongs to, or null if never earned. */
  today: string | null
  /** XP earned on `today` (stale once the day rolls over — see xpEarnedToday). */
  todayXp: number
}

export function emptyXp(): XpState {
  return { totalXp: 0, goalId: DEFAULT_GOAL_ID, today: null, todayXp: 0 }
}

/**
 * Add earned XP, rolling the daily counter over at the local day boundary. A
 * gain of 0 on the current day is a no-op (returns the same reference), so
 * callers can invoke it freely. Negative amounts are ignored.
 */
export function addXp(state: XpState, amount: number, todayKey: string): XpState {
  const gain = Math.max(0, Math.floor(amount))
  const sameDay = state.today === todayKey
  if (gain === 0 && sameDay) return state
  const prevToday = sameDay ? state.todayXp : 0
  return {
    ...state,
    totalXp: state.totalXp + gain,
    today: todayKey,
    todayXp: prevToday + gain,
  }
}

/** Change the daily goal. No-op (same reference) when it's already selected. */
export function setGoal(state: XpState, goalId: DailyGoalId): XpState {
  return state.goalId === goalId ? state : { ...state, goalId }
}

/** XP earned *today*: the stored counter, or 0 once the day has rolled over. */
export function xpEarnedToday(state: XpState, todayKey: string): number {
  return state.today === todayKey ? state.todayXp : 0
}

export interface GoalProgress {
  goal: DailyGoalPreset
  /** XP earned today. */
  earned: number
  /** The goal's XP target. */
  target: number
  /** earned/target, clamped to [0, 1] — the ring fill. */
  ratio: number
  /** Whether today's goal has been met. */
  met: boolean
}

/** Today's standing against the selected daily goal. */
export function goalProgress(state: XpState, todayKey: string): GoalProgress {
  const goal = goalById(state.goalId)
  const earned = xpEarnedToday(state, todayKey)
  const target = goal.xp
  const ratio = target > 0 ? Math.min(1, earned / target) : 1
  return { goal, earned, target, ratio, met: earned >= target }
}
