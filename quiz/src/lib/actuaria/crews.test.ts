import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  CREW_MAX,
  CREW_MIN,
  challengeLive,
  guides,
  isInviteCode,
  normalizeInviteCode,
  parseCrew,
  parseThreads,
  poolActive,
  poolAward,
  poolThreshold,
  progressSnapshot,
} from './crews'

// The pool's formulas are duplicated in supabase/migrations/
// 20260930_actuaria_crews.sql (actuaria_pool_threshold / actuaria_pool_award /
// actuaria_pool_active) — a change here is a change there, and
// supabase/tests/actuaria_crews.sql checks the same numbers on the SQL side.

describe('the risk pool (§7.6)', () => {
  it('needs 75% of members, rounded up', () => {
    expect([3, 4, 5, 8, 12].map(poolThreshold)).toEqual([3, 3, 4, 6, 9])
  })

  it('is up only for a crew of three or more with that many covered today', () => {
    expect(poolActive(2, 2)).toBe(false) // a crew still forming has no pool
    expect(poolActive(3, 2)).toBe(false)
    expect(poolActive(3, 3)).toBe(true)
    expect(poolActive(4, 3)).toBe(true)
    expect(poolActive(12, 8)).toBe(false)
    expect(poolActive(12, 9)).toBe(true)
  })

  it('pays ×1.25, rounded half up — as award_gems does', () => {
    expect([1, 2, 4, 10, 20].map(poolAward)).toEqual([1, 3, 5, 13, 25])
  })

  it('bounds a crew at three to twelve', () => {
    expect([CREW_MIN, CREW_MAX]).toEqual([3, 12])
  })
})

describe('invite codes', () => {
  it('reads a code however it was typed', () => {
    expect(normalizeInviteCode(' ab2 c3d ')).toBe('AB2C3D')
    expect(isInviteCode('AB2C3D')).toBe(true)
    expect(isInviteCode('AB2C3')).toBe(false)
    expect(isInviteCode('AB2C3O')).toBe(false) // no O: it reads as a zero
  })
})

const CREW = {
  crew: { id: 'c1', name: 'The Bayesians', exam: 'P', sitting: 'January 2027', invite_code: 'AB2C3D', members: 3, cohort_z: 0.41 },
  me: { member_id: 'm1', role: 'member', last_loot: null, last_loot_week: null },
  pool: { members: 3, covered: 2, active: false },
  raid: { boss_max: 3000, boss_health: 2400, phase: 'open' },
  members: [
    { member_id: 'm1', name: 'Ada', avatar: '', role: 'member', sector_z: 0.62, covered_today: true, nudged_today: false, explanations: 0, is_self: true },
    { member_id: 'm2', name: 'Bo', avatar: '', role: 'guide', sector_z: '0.3', covered_today: false, nudged_today: true, explanations: 4, is_self: false },
    { member_id: 'm3', name: 'Cy', role: 'guide', sector_z: 7, explanations: 9 },
    { name: 'no handle' },
    'junk',
  ],
  nudges: [{ from: 'Bo' }, { from: 3 }],
  challenges: [{ from: 'Bo', code: 'AB23', at: '2026-09-30T10:00:00Z' }, { from: 'Cy' }],
}

describe('reading a crew (untrusted JSON, field by field)', () => {
  it('reads the crew, the pool and each member', () => {
    const view = parseCrew(CREW)!
    expect(view.crew).toMatchObject({ id: 'c1', name: 'The Bayesians', exam: 'P', inviteCode: 'AB2C3D', members: 3, cohortZ: 0.41 })
    expect(view.pool).toEqual({ members: 3, covered: 2, active: false })
    expect(view.raid).toEqual({ bossMax: 3000, bossHealth: 2400, phase: 'open' })
    expect(view.members.map(m => m.name)).toEqual(['Ada', 'Bo', 'Cy'])
    expect(view.members[1]).toMatchObject({ role: 'guide', sectorZ: 0.3, nudgedToday: true, explanations: 4, isSelf: false })
  })

  it('drops what it cannot read rather than guessing', () => {
    const view = parseCrew(CREW)!
    expect(view.members[2].sectorZ).toBeNull() // a Z of 7 is no Z
    expect(view.nudges).toEqual([{ from: 'Bo' }])
    expect(view.challenges).toEqual([{ from: 'Bo', code: 'AB23', at: '2026-09-30T10:00:00Z' }])
  })

  it('is null for no crew, or a crew it cannot name', () => {
    expect(parseCrew(null)).toBeNull()
    expect(parseCrew({ ...CREW, crew: { ...CREW.crew, id: 5 } })).toBeNull()
    expect(parseCrew({ ...CREW, me: null })).toBeNull()
  })

  it('carries no user id: a member is only ever their handle', () => {
    const view = parseCrew({ ...CREW, members: [{ ...CREW.members[0], user_id: 'u-secret' }] })!
    expect(JSON.stringify(view)).not.toContain('u-secret')
  })

  it('lists the guides, most explanations first', () => {
    expect(guides(parseCrew(CREW)!.members).map(m => m.name)).toEqual(['Cy', 'Bo'])
  })
})

describe('Ask the cohort', () => {
  it('reads threads and their replies', () => {
    const threads = parseThreads([
      { id: 't1', from: 'Ada', is_self: true, body: 'Why?', concept: 'Bayes Theorem', at: 'x', replies: [
        { id: 'r1', from: 'Bo', guide: true, body: 'Because.', accepted: true, at: 'y' },
        { id: 'r2' },
      ] },
      { id: 't2', body: '' },
    ])
    expect(threads).toHaveLength(1)
    expect(threads[0]).toMatchObject({ id: 't1', isSelf: true, concept: 'Bayes Theorem' })
    expect(threads[0].replies).toEqual([{ id: 'r1', from: 'Bo', guide: true, isSelf: false, body: 'Because.', accepted: true, at: 'y' }])
  })
})

describe('Cohort Clash', () => {
  it('keeps a challenge up for half an hour', () => {
    const now = new Date('2026-09-30T10:29:00Z')
    expect(challengeLive('2026-09-30T10:00:00Z', now)).toBe(true)
    expect(challengeLive('2026-09-30T09:59:00Z', now)).toBe(false)
    expect(challengeLive('not a date', now)).toBe(false)
  })
})

describe('what a member shares', () => {
  it('is their sector Z — readiness over 100 — and each landmark’s Z, once each', () => {
    expect(progressSnapshot(
      [{ name: 'Bayes Theorem', z: 0.67 }, { name: 'Variance', z: 0 }, { name: 'Bayes Theorem', z: 1 }, { name: 'Odd', z: 3 }],
      62.4,
    )).toEqual({ sectorZ: 0.624, conceptZ: { 'Bayes Theorem': 0.67, Variance: 0, Odd: 1 } })
  })
})

describe('the pool is paid by the server alone', () => {
  it('leaves every award_gems call in the app passing what was earned', () => {
    const src = fileURLToPath(new URL('../..', import.meta.url))
    const files: string[] = []
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) walk(path)
        else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.includes('.test.')) files.push(path)
      }
    }
    walk(src)
    const callers = files.filter(f => readFileSync(f, 'utf8').includes("rpc('award_gems'"))
    expect(callers.length).toBeGreaterThan(0)
    for (const f of callers) {
      const text = readFileSync(f, 'utf8')
      expect(text, f).not.toMatch(/poolAward|POOL_MULTIPLIER/)
    }
  })
})
