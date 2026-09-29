// **Cohorts** — Actuaria's study groups: one exam and one sitting, three to
// twelve members, joined by invite code (docs/actuaria-online.md §6.11, §7.6).
// A cohort on screen is a *crew* in code, because leagues already use
// "cohort" for their groups of 30.
//
// Pure: the rules the screen draws, and the parsing that turns what the RPCs
// return — untrusted JSON, read field by field — into something to draw. Every
// rule here is enforced by the database (supabase/migrations/
// 20260930_actuaria_crews.sql), which duplicates the formulas under leagues'
// duplication contract: they are one-liners, this side is locked by
// crews.test.ts, and a change to one is a change to both.

/** A crew opens its risk pool and its raid at three members. */
export const CREW_MIN = 3
export const CREW_MAX = 12

/** Risk pool: this share of members, rounded up, covered today… */
export const POOL_SHARE = 0.75
/** …multiplies every gem award that day, server-side (award_gems). */
export const POOL_MULTIPLIER = 1.25

/** An accepted explanation pays a guide this much, up to the daily cap. */
export const GUIDE_PAY = 5
export const GUIDE_DAILY_CAP = 25

/** How long a Cohort Clash challenge stays up, in minutes. */
export const CHALLENGE_MINUTES = 30

export const INVITE_CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
export const INVITE_CODE_LENGTH = 6

/** Members who must be covered today for the pool: `ceil(0.75 × n)`. SQL: actuaria_pool_threshold. */
export function poolThreshold(members: number): number {
  return Math.ceil(members * POOL_SHARE)
}

/** Whether the pool is up. SQL: actuaria_pool_active. */
export function poolActive(members: number, covered: number): boolean {
  return members >= CREW_MIN && covered >= poolThreshold(members)
}

/** A gem award with the pool up — what the server pays, for display. SQL: actuaria_pool_award. */
export function poolAward(amount: number): number {
  return Math.round(amount * POOL_MULTIPLIER)
}

/** An invite code as typed: upper case, no spaces. */
export function normalizeInviteCode(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

export function isInviteCode(code: string): boolean {
  return code.length === INVITE_CODE_LENGTH && [...code].every(c => INVITE_CODE_ALPHABET.includes(c))
}

// ── What the RPCs return ─────────────────────────────────────────────────────

export type CrewRole = 'member' | 'guide'
export type RaidPhase = 'open' | 'double' | 'all_in' | 'defeated'

export interface CrewMember {
  memberId: string
  name: string
  avatar: string
  role: CrewRole
  /** Their sector Z, shared on joining — null until they open the Cohort screen. */
  sectorZ: number | null
  coveredToday: boolean
  nudgedToday: boolean
  /** Accepted explanations, for a guide. */
  explanations: number
  isSelf: boolean
}

export interface CrewView {
  crew: {
    id: string
    name: string
    exam: string
    sitting: string
    inviteCode: string
    members: number
    /** The mean of members' sector Z. */
    cohortZ: number | null
  }
  me: { memberId: string; role: CrewRole; lastLoot: number | null; lastLootWeek: string | null }
  pool: { members: number; covered: number; active: boolean }
  raid: { bossMax: number; bossHealth: number; phase: RaidPhase } | null
  members: CrewMember[]
  nudges: { from: string }[]
  challenges: { from: string; code: string; at: string }[]
}

export interface ThreadReply {
  id: string
  from: string
  guide: boolean
  isSelf: boolean
  body: string
  accepted: boolean
  at: string
}

export interface Thread {
  id: string
  from: string
  isSelf: boolean
  body: string
  concept: string | null
  at: string
  replies: ThreadReply[]
}

type Obj = Record<string, unknown>
const isObj = (x: unknown): x is Obj => !!x && typeof x === 'object' && !Array.isArray(x)
const str = (x: unknown, max = 2000): string | null => (typeof x === 'string' && x.length <= max ? x : null)
const num = (x: unknown): number | null => {
  const n = typeof x === 'string' ? Number(x) : x
  return typeof n === 'number' && Number.isFinite(n) ? n : null
}
const int = (x: unknown): number | null => {
  const n = num(x)
  return n !== null && Number.isInteger(n) && n >= 0 ? n : null
}
const z = (x: unknown): number | null => {
  const n = num(x)
  return n !== null && n >= 0 && n <= 1 ? n : null
}
const bool = (x: unknown): boolean => x === true
const list = (x: unknown, max = 200): unknown[] => (Array.isArray(x) ? x.slice(0, max) : [])

export function parsePhase(x: unknown): RaidPhase | null {
  return x === 'open' || x === 'double' || x === 'all_in' || x === 'defeated' ? x : null
}

function parseMember(x: unknown): CrewMember | null {
  if (!isObj(x)) return null
  const memberId = str(x.member_id, 64)
  const name = str(x.name, 80)
  if (!memberId || name === null) return null
  return {
    memberId,
    name,
    avatar: str(x.avatar) ?? '',
    role: x.role === 'guide' ? 'guide' : 'member',
    sectorZ: z(x.sector_z),
    coveredToday: bool(x.covered_today),
    nudgedToday: bool(x.nudged_today),
    explanations: int(x.explanations) ?? 0,
    isSelf: bool(x.is_self),
  }
}

/** `actuaria_get_crew`'s answer, or null for none (or anything unreadable). */
export function parseCrew(raw: unknown): CrewView | null {
  if (!isObj(raw) || !isObj(raw.crew) || !isObj(raw.me) || !isObj(raw.pool)) return null
  const c = raw.crew
  const id = str(c.id, 64)
  const name = str(c.name, 80)
  const exam = str(c.exam, 40)
  const memberId = str(raw.me.member_id, 64)
  if (!id || name === null || !exam || !memberId) return null
  const members = list(raw.members, CREW_MAX * 2).map(parseMember).filter((m): m is CrewMember => !!m)
  const raid = isObj(raw.raid) ? {
    bossMax: int(raw.raid.boss_max) ?? 0,
    bossHealth: int(raw.raid.boss_health) ?? 0,
    phase: parsePhase(raw.raid.phase) ?? 'open',
  } : null
  return {
    crew: {
      id,
      name,
      exam,
      sitting: str(c.sitting, 80) ?? '',
      inviteCode: str(c.invite_code, 16) ?? '',
      members: int(c.members) ?? members.length,
      cohortZ: z(c.cohort_z),
    },
    me: {
      memberId,
      role: raw.me.role === 'guide' ? 'guide' : 'member',
      lastLoot: int(raw.me.last_loot),
      lastLootWeek: str(raw.me.last_loot_week, 20),
    },
    pool: {
      members: int(raw.pool.members) ?? members.length,
      covered: int(raw.pool.covered) ?? 0,
      active: bool(raw.pool.active),
    },
    raid: raid && raid.bossMax > 0 ? raid : null,
    members,
    nudges: list(raw.nudges, 20).flatMap(n => (isObj(n) && str(n.from, 80) !== null ? [{ from: str(n.from, 80)! }] : [])),
    challenges: list(raw.challenges, 20).flatMap(ch => {
      if (!isObj(ch)) return []
      const from = str(ch.from, 80)
      const code = str(ch.code, 8)
      const at = str(ch.at, 40)
      return from !== null && code && at ? [{ from, code, at }] : []
    }),
  }
}

/** `actuaria_get_threads`' answer. */
export function parseThreads(raw: unknown): Thread[] {
  return list(raw, 50).flatMap(t => {
    if (!isObj(t)) return []
    const id = str(t.id, 64)
    const body = str(t.body, 1000)
    if (!id || !body) return []
    return [{
      id,
      from: str(t.from, 80) ?? '',
      isSelf: bool(t.is_self),
      body,
      concept: str(t.concept, 120),
      at: str(t.at, 40) ?? '',
      replies: list(t.replies, 100).flatMap(r => {
        if (!isObj(r)) return []
        const rid = str(r.id, 64)
        const rbody = str(r.body, 2000)
        if (!rid || !rbody) return []
        return [{
          id: rid,
          from: str(r.from, 80) ?? '',
          guide: bool(r.guide),
          isSelf: bool(r.is_self),
          body: rbody,
          accepted: bool(r.accepted),
          at: str(r.at, 40) ?? '',
        }]
      }),
    }]
  })
}

/** The guides among the members, most explanations first. */
export function guides(members: readonly CrewMember[]): CrewMember[] {
  return members.filter(m => m.role === 'guide').sort((a, b) => b.explanations - a.explanations || a.name.localeCompare(b.name))
}

/** Whether a challenge is still up. */
export function challengeLive(at: string, now: Date): boolean {
  const t = Date.parse(at)
  return Number.isFinite(t) && now.getTime() - t < CHALLENGE_MINUTES * 60_000
}

/**
 * What a member shares of their progress on the crew's exam (§6.11): their
 * sector Z — the readiness score over 100, the one number (G2) — and each
 * landmark's Z, which is what the raid's weak spots are the crew's mean of.
 */
export function progressSnapshot(
  landmarks: readonly { name: string; z: number }[],
  readinessPct: number,
): { sectorZ: number; conceptZ: Record<string, number> } {
  const conceptZ: Record<string, number> = {}
  for (const l of landmarks) {
    if (l.name && !(l.name in conceptZ)) conceptZ[l.name] = Math.round(Math.min(1, Math.max(0, l.z)) * 100) / 100
  }
  return { sectorZ: Math.round(Math.min(100, Math.max(0, readinessPct)) * 10) / 1000, conceptZ }
}
