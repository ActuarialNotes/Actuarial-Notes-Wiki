// **The weekly raid** — Gambler's Ruin, a crew's shared boss
// (docs/actuaria-online.md §6.12, §7.7). Not a Quiz Battle: each member answers
// alone, and every right answer comes off one health bar.
//
// Pure. The rules are the database's (actuaria_raid_hit and the rollover in
// supabase/migrations/20260930_actuaria_crews.sql, under leagues' duplication
// contract) and the Vercel function's (quiz/api/_raid/rules.js, which draws
// and times); this side draws them, and raid.test.ts pins all three together.

import { BASE_POINTS, roundSecondsFor, speedBonus } from '@/lib/battle'
import { EXAM_ID_TO_LABEL } from '@/lib/examIds'
import { parsePhase, type RaidPhase } from './crews'

export const BOSS_PER_MEMBER = 1000
/** At or below half health: hits ×2, misses heal. */
export const DOUBLE_AT = 0.5
/** At or below a quarter: hard questions only. */
export const ALL_IN_AT = 0.25
export const DOUBLE_MULTIPLIER = 2
export const MISS_HEAL = 50
export const LOOT_POOL = 300
/** Questions a member is served per run at the boss. */
export const RAID_DRAW_SIZE = 5
/** The one gear a raid pays for the kill. */
export const STOP_LOSS_SHIELD = 'ship:decal:stop-loss-shield'

export const PHASE_LABEL: Record<RaidPhase, string> = {
  open: 'Open',
  double: 'Double or nothing',
  all_in: 'All in',
  defeated: 'Defeated',
}

/** SQL: 1000 × members, when the raid opens. */
export function bossMax(members: number): number {
  return BOSS_PER_MEMBER * members
}

/** The phase a boss is in at `health` of `max`. SQL: actuaria_raid_phase. */
export function raidPhase(health: number, max: number): RaidPhase {
  if (health <= 0) return 'defeated'
  if (health * 4 <= max) return 'all_in'
  if (health * 2 <= max) return 'double'
  return 'open'
}

/** The time a raid question gets: the exam's own pace, as Quiz Battle's *Exam pace*. */
export function raidPaceSeconds(examKey: string): number {
  return roundSecondsFor('exam', EXAM_ID_TO_LABEL[examKey] ?? examKey)
}

export interface HitInput {
  correct: boolean
  elapsedMs: number
  paceSeconds: number
  phase: RaidPhase
  /** The boss's health before the hit. */
  health: number
  max: number
  /** This member already hit this question this week. */
  repeat?: boolean
}

/**
 * What one answer does to the boss (§7.7): a right one deals 100 + speed —
 * Quiz Battle's base and speed on the exam's pace — ×2 from half health, never
 * more than is left; a miss costs nothing until half health, then heals 50.
 * SQL: actuaria_raid_hit.
 */
export function hitEffect(hit: HitInput): { damage: number; healed: number; health: number; phase: RaidPhase } {
  let damage = 0
  let healed = 0
  let health = hit.health
  const doubled = hit.phase === 'double' || hit.phase === 'all_in'
  if (hit.phase !== 'defeated') {
    if (hit.correct && !hit.repeat) {
      const raw = (BASE_POINTS + speedBonus(hit.elapsedMs, Math.max(1, hit.paceSeconds) * 1000)) * (doubled ? DOUBLE_MULTIPLIER : 1)
      health = Math.max(0, hit.health - raw)
      damage = hit.health - health
    } else if (!hit.correct && doubled) {
      health = Math.min(hit.max, hit.health + MISS_HEAL)
      healed = health - hit.health
    }
  }
  return { damage, healed, health, phase: raidPhase(health, hit.max) }
}

export interface Contribution {
  key: string
  damage: number
  /** When they first hit — breaks a tie for the remainder. */
  firstAt: number
}

/**
 * The week's loot, split pro rata by damage: each share floored, the remainder
 * to the top contributor (the earlier first hit breaking a tie). SQL: the
 * rollover's payout.
 */
export function lootSplit(contributions: readonly Contribution[], pool = LOOT_POOL): Map<string, number> {
  const dealt = contributions.filter(c => c.damage > 0)
  const total = dealt.reduce((sum, c) => sum + c.damage, 0)
  const shares = new Map<string, number>()
  if (total <= 0) return shares
  const ranked = [...dealt].sort((a, b) => b.damage - a.damage || a.firstAt - b.firstAt)
  let paid = 0
  for (const c of ranked) {
    const share = Math.floor((pool * c.damage) / total)
    shares.set(c.key, share)
    paid += share
  }
  shares.set(ranked[0].key, (shares.get(ranked[0].key) ?? 0) + (pool - paid))
  return shares
}

/** "2d 14h", "5h 20m", "12m" — the time left on the raid. */
export function raidTimeLeft(endsAt: Date, now: Date): string {
  const ms = Math.max(0, endsAt.getTime() - now.getTime())
  const minutes = Math.floor(ms / 60_000)
  const days = Math.floor(minutes / 1440)
  const hours = Math.floor((minutes % 1440) / 60)
  const mins = minutes % 60
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}

// ── What the raid RPC returns ────────────────────────────────────────────────

export interface RaidBoardRow {
  name: string
  damage: number
  share: number
  isSelf: boolean
}

export type RaidView =
  | { status: 'forming'; exam: string; members: number; needed: number }
  | {
      status: 'active' | 'defeated'
      exam: string
      members: number
      raid: { id: string; endsAt: string; bossMax: number; bossHealth: number; phase: RaidPhase }
      lootPool: number
      board: RaidBoardRow[]
      weakSpots: { concept: string; z: number }[]
      /** Questions this member has already hit this week. */
      answered: string[]
    }

type Obj = Record<string, unknown>
const isObj = (x: unknown): x is Obj => !!x && typeof x === 'object' && !Array.isArray(x)
const str = (x: unknown, max = 200): string | null => (typeof x === 'string' && x.length <= max ? x : null)
const num = (x: unknown): number | null => {
  const n = typeof x === 'string' ? Number(x) : x
  return typeof n === 'number' && Number.isFinite(n) ? n : null
}
const nonNeg = (x: unknown): number | null => {
  const n = num(x)
  return n !== null && n >= 0 ? n : null
}

/** `actuaria_get_raid`'s answer, field by field, or null. */
export function parseRaid(raw: unknown): RaidView | null {
  if (!isObj(raw)) return null
  const exam = str(raw.exam, 40) ?? ''
  const members = nonNeg(raw.members) ?? 0
  if (raw.status === 'forming') {
    return { status: 'forming', exam, members, needed: nonNeg(raw.needed) ?? 0 }
  }
  if ((raw.status !== 'active' && raw.status !== 'defeated') || !isObj(raw.raid)) return null
  const r = raw.raid
  const id = str(r.id, 64)
  const bossMax = nonNeg(r.boss_max)
  const bossHealth = nonNeg(r.boss_health)
  const phase = parsePhase(r.phase)
  if (!id || !bossMax || bossHealth === null || !phase) return null
  return {
    status: raw.status,
    exam,
    members,
    raid: { id, endsAt: str(r.ends_at, 40) ?? '', bossMax, bossHealth: Math.min(bossHealth, bossMax), phase },
    lootPool: nonNeg(raw.loot_pool) ?? LOOT_POOL,
    board: (Array.isArray(raw.board) ? raw.board.slice(0, 24) : []).flatMap(b => {
      if (!isObj(b)) return []
      const name = str(b.name, 80)
      const damage = nonNeg(b.damage)
      return name !== null && damage !== null ? [{ name, damage, share: Math.min(1, nonNeg(b.share) ?? 0), isSelf: b.is_self === true }] : []
    }),
    weakSpots: (Array.isArray(raw.weak_spots) ? raw.weak_spots.slice(0, 10) : []).flatMap(w => {
      if (!isObj(w)) return []
      const concept = str(w.concept, 120)
      const zv = nonNeg(w.z)
      return concept && zv !== null && zv <= 1 ? [{ concept, z: zv }] : []
    }),
    answered: (Array.isArray(raw.answered) ? raw.answered.slice(0, 500) : []).filter((q): q is string => typeof q === 'string' && q.length <= 80),
  }
}

/** Where the boss's health bar marks its phases, as fractions of full. */
export const PHASE_MARKS: readonly { at: number; phase: RaidPhase }[] = [
  { at: DOUBLE_AT, phase: 'double' },
  { at: ALL_IN_AT, phase: 'all_in' },
]
