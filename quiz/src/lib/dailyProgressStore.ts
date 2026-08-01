// Daily level-up completions — stored per calendar day in localStorage.
// Written by quizStore on quiz completion; read by TodayCard for real-time display.

import type { MasteryState } from '@/lib/mastery'

export interface DailyLevelUp {
  conceptSlug: string
  from: MasteryState
  to: MasteryState
  at: string  // ISO timestamp
}

export const LEVELUP_EVENT = 'actuarial_levelup'

function todayKey(): string {
  return 'actuarial_daily_levelups_' + new Date().toISOString().slice(0, 10)
}

export function readTodayLevelUps(): DailyLevelUp[] {
  try {
    const raw = localStorage.getItem(todayKey())
    return raw ? (JSON.parse(raw) as DailyLevelUp[]) : []
  } catch {
    return []
  }
}

function todayGemsKey(): string {
  return 'actuarial_daily_gems_' + new Date().toISOString().slice(0, 10)
}

export function getDailyGems(): number {
  try {
    return parseInt(localStorage.getItem(todayGemsKey()) ?? '0', 10) || 0
  } catch { return 0 }
}

export function addDailyGems(amount: number): void {
  if (amount <= 0) return
  try {
    localStorage.setItem(todayGemsKey(), String(getDailyGems() + amount))
  } catch { /* quota exceeded */ }
}

// Daily quiz stats (correct / total) — device-local, reset per calendar day.
const DAILY_QUIZ_EVENT = 'actuarial_daily_quiz_stats'

interface DailyQuizStats {
  correct: number
  total: number
}

function todayQuizStatsKey(): string {
  return 'actuarial_daily_quiz_stats_' + new Date().toISOString().slice(0, 10)
}

export function getDailyQuizStats(): DailyQuizStats {
  try {
    const raw = localStorage.getItem(todayQuizStatsKey())
    return raw ? (JSON.parse(raw) as DailyQuizStats) : { correct: 0, total: 0 }
  } catch {
    return { correct: 0, total: 0 }
  }
}

export function addDailyQuizStats(correct: number, total: number): void {
  if (total <= 0) return
  try {
    const prev = getDailyQuizStats()
    const next = { correct: prev.correct + correct, total: prev.total + total }
    localStorage.setItem(todayQuizStatsKey(), JSON.stringify(next))
    window.dispatchEvent(new CustomEvent(DAILY_QUIZ_EVENT, { detail: next }))
  } catch { /* quota exceeded */ }
}

export { DAILY_QUIZ_EVENT }

// Questions served today (correct, wrong or skipped) — device-local, reset per
// calendar day. Written by quizStore on quiz completion; read when a Today's
// Plan quiz is built so a re-launch ("Continue Studying") draws questions the
// user hasn't already seen today instead of replaying the same set. Device-local
// like the rest of this module: a second device just starts from a clean slate,
// which only costs a possible repeat.
const ANSWERED_EVENT = 'actuarial_daily_answered'

// Plenty for a day of study, and keeps the entry small enough not to threaten
// the localStorage quota. Oldest IDs fall off first.
const ANSWERED_LIMIT = 1000

function todayAnsweredKey(): string {
  return 'actuarial_daily_answered_' + new Date().toISOString().slice(0, 10)
}

export function readTodayAnsweredIds(): string[] {
  try {
    const raw = localStorage.getItem(todayAnsweredKey())
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function appendTodayAnsweredIds(ids: string[]): void {
  if (ids.length === 0) return
  try {
    const merged = [...new Set([...readTodayAnsweredIds(), ...ids])]
    const trimmed = merged.length > ANSWERED_LIMIT ? merged.slice(-ANSWERED_LIMIT) : merged
    localStorage.setItem(todayAnsweredKey(), JSON.stringify(trimmed))
    window.dispatchEvent(new CustomEvent(ANSWERED_EVENT, { detail: trimmed }))
  } catch { /* quota exceeded */ }
}

export { ANSWERED_EVENT }

export function appendTodayLevelUps(levelUps: DailyLevelUp[]): void {
  if (levelUps.length === 0) return
  try {
    const existing = readTodayLevelUps()
    // De-duplicate: skip if same conceptSlug+to already present
    const seen = new Set(existing.map(e => `${e.conceptSlug}::${e.to}`))
    const fresh = levelUps.filter(lu => !seen.has(`${lu.conceptSlug}::${lu.to}`))
    if (fresh.length === 0) return
    const updated = [...existing, ...fresh]
    localStorage.setItem(todayKey(), JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent(LEVELUP_EVENT, { detail: updated }))
  } catch { /* quota exceeded */ }
}
