import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  FALLBACK_PACE_SECONDS,
  RAID_DRAW_SIZE as JS_DRAW_SIZE,
  drawRaidQuestions,
  isRaidQuestion,
  kbExamKey,
  raidPaceSeconds as jsPaceSeconds,
} from '../../../api/_raid/rules.js'
import { isBattleQuestion } from '@/lib/battle'
import { examKeyFromExamId } from '@/lib/knowledgeBase'
import type { Question } from '@/lib/parser'
import {
  RAID_DRAW_SIZE,
  STOP_LOSS_SHIELD,
  bossMax,
  hitEffect,
  lootSplit,
  parseRaid,
  raidPaceSeconds,
  raidPhase,
  raidTimeLeft,
} from './raid'

// The raid's formulas live three times: here (what the screen draws), in the
// database (actuaria_raid_phase / actuaria_raid_hit / the rollover's payout,
// under leagues' duplication contract — supabase/tests/actuaria_crews.sql
// checks the same numbers there), and in quiz/api/_raid/rules.js (what the
// function draws and how long a question gets). This file holds them together.

describe('the boss (§7.7)', () => {
  it('has 1000 health a member', () => {
    expect(bossMax(3)).toBe(3000)
    expect(bossMax(12)).toBe(12000)
  })

  it('turns Double or nothing at half and All in at a quarter', () => {
    expect(raidPhase(3000, 3000)).toBe('open')
    expect(raidPhase(1501, 3000)).toBe('open')
    expect(raidPhase(1500, 3000)).toBe('double')
    expect(raidPhase(751, 3000)).toBe('double')
    expect(raidPhase(750, 3000)).toBe('all_in')
    expect(raidPhase(1, 3000)).toBe('all_in')
    expect(raidPhase(0, 3000)).toBe('defeated')
  })
})

describe('a hit', () => {
  const base = { paceSeconds: 360, phase: 'open' as const, health: 3000, max: 3000 }

  it('deals Quiz Battle’s 100 + speed on the exam’s pace', () => {
    expect(hitEffect({ ...base, correct: true, elapsedMs: 0 }).damage).toBe(150)
    expect(hitEffect({ ...base, correct: true, elapsedMs: 180_000 }).damage).toBe(125)
    expect(hitEffect({ ...base, correct: true, elapsedMs: 999_000 }).damage).toBe(100)
  })

  it('doubles from half health, and a miss heals from then on', () => {
    const half = { ...base, phase: 'double' as const, health: 1400 }
    expect(hitEffect({ ...half, correct: true, elapsedMs: 0 })).toMatchObject({ damage: 300, health: 1100 })
    expect(hitEffect({ ...half, correct: false, elapsedMs: 0 })).toMatchObject({ healed: 50, health: 1450 })
    // Above half, a miss costs nothing.
    expect(hitEffect({ ...base, correct: false, elapsedMs: 0 })).toMatchObject({ damage: 0, healed: 0, health: 3000 })
  })

  it('never heals past full, and the killing blow counts what was left', () => {
    expect(hitEffect({ ...base, phase: 'double', health: 2990, correct: false, elapsedMs: 0 })).toMatchObject({ healed: 10, health: 3000 })
    expect(hitEffect({ ...base, phase: 'all_in', health: 60, correct: true, elapsedMs: 0 })).toMatchObject({ damage: 60, health: 0, phase: 'defeated' })
  })

  it('deals nothing for a question already hit this week, or to a defeated boss', () => {
    expect(hitEffect({ ...base, correct: true, elapsedMs: 0, repeat: true }).damage).toBe(0)
    expect(hitEffect({ ...base, phase: 'defeated', health: 0, correct: true, elapsedMs: 0 }).damage).toBe(0)
  })

  it('moves the boss into the next phase as it falls', () => {
    expect(hitEffect({ ...base, health: 1600, correct: true, elapsedMs: 0 }).phase).toBe('double')
  })
})

describe('the loot', () => {
  it('splits 300 gems pro rata by damage', () => {
    const split = lootSplit([
      { key: 'a', damage: 600, firstAt: 1 },
      { key: 'b', damage: 300, firstAt: 2 },
      { key: 'c', damage: 100, firstAt: 3 },
    ])
    expect(Object.fromEntries(split)).toEqual({ a: 180, b: 90, c: 30 })
  })

  it('floors every share and gives the remainder to the top contributor — the earlier first hit on a tie', () => {
    const split = lootSplit([
      { key: 'late', damage: 100, firstAt: 9 },
      { key: 'early', damage: 100, firstAt: 1 },
      { key: 'c', damage: 100, firstAt: 5 },
    ], 100)
    expect(Object.fromEntries(split)).toEqual({ early: 34, c: 33, late: 33 })
    // 300 × 6/11 = 163.6 and 300 × 5/11 = 136.4: floored to 163 and 136, the one left over to the top.
    const uneven = lootSplit([{ key: 'b', damage: 5, firstAt: 1 }, { key: 'a', damage: 6, firstAt: 2 }])
    expect(Object.fromEntries(uneven)).toEqual({ a: 164, b: 136 })
  })

  it('pays nobody who dealt nothing, and nothing at all when nobody did', () => {
    expect(lootSplit([{ key: 'a', damage: 0, firstAt: 1 }]).size).toBe(0)
    expect([...lootSplit([{ key: 'a', damage: 7, firstAt: 1 }, { key: 'b', damage: 0, firstAt: 2 }]).keys()]).toEqual(['a'])
  })
})

describe('the clock', () => {
  it('says how long is left on the week', () => {
    const now = new Date('2026-10-02T09:30:00Z')
    expect(raidTimeLeft(new Date('2026-10-05T00:00:00Z'), now)).toBe('2d 14h')
    expect(raidTimeLeft(new Date('2026-10-02T14:50:00Z'), now)).toBe('5h 20m')
    expect(raidTimeLeft(new Date('2026-10-02T09:42:00Z'), now)).toBe('12m')
    expect(raidTimeLeft(new Date('2026-10-01T00:00:00Z'), now)).toBe('0m')
  })
})

describe('reading a raid', () => {
  it('reads a forming crew', () => {
    expect(parseRaid({ status: 'forming', exam: 'P', members: 2, needed: 1 })).toEqual({ status: 'forming', exam: 'P', members: 2, needed: 1 })
  })

  it('reads the boss, the board and the weak spots, dropping what it can’t read', () => {
    const view = parseRaid({
      status: 'active', exam: 'P', members: 3, loot_pool: 300,
      raid: { id: 'r1', ends_at: '2026-10-05T00:00:00+00:00', boss_max: 3000, boss_health: 9999, phase: 'double' },
      board: [{ name: 'Ada', damage: 450, share: 0.6, is_self: true }, { name: 'Bo' }],
      weak_spots: [{ concept: 'Bayes Theorem', z: 0.12 }, { concept: 'Variance', z: 4 }],
      answered: ['p-001', 7],
    })
    expect(view).toMatchObject({
      status: 'active',
      raid: { id: 'r1', bossMax: 3000, bossHealth: 3000, phase: 'double' },
      board: [{ name: 'Ada', damage: 450, share: 0.6, isSelf: true }],
      weakSpots: [{ concept: 'Bayes Theorem', z: 0.12 }],
      answered: ['p-001'],
    })
  })

  it('is null for anything else', () => {
    expect(parseRaid(null)).toBeNull()
    expect(parseRaid({ status: 'active' })).toBeNull()
    expect(parseRaid({ status: 'active', raid: { id: 'r', boss_max: 3000, boss_health: 10, phase: 'sideways' } })).toBeNull()
  })
})

// ── The function's half, held to the app's ───────────────────────────────────

const CATALOG = JSON.parse(readFileSync(fileURLToPath(new URL('../../../../scripts/exam_catalog.json', import.meta.url)), 'utf8')) as {
  exams: { exam_id: string; progress_key: string; bank: string | null }[]
}

describe('api/_raid/rules.js', () => {
  const banked = CATALOG.exams.filter(e => e.bank)

  it('maps every banked exam to the key the vault export files its questions under', () => {
    for (const e of banked) expect(kbExamKey(e.progress_key), e.exam_id).toBe(examKeyFromExamId(e.exam_id))
  })

  it('gives a question the exam’s own pace, as Quiz Battle’s Exam pace does', () => {
    for (const e of banked) {
      const pace = jsPaceSeconds(kbExamKey(e.progress_key))
      if (e.progress_key === 'CAS-5') continue // a written paper is paced per point; no raid question is on it
      expect(pace, e.progress_key).toBe(raidPaceSeconds(e.progress_key))
    }
    expect(jsPaceSeconds('9')).toBe(FALLBACK_PACE_SECONDS)
  })

  it('draws a run of the same size', () => {
    expect(JS_DRAW_SIZE).toBe(RAID_DRAW_SIZE)
  })

  const q = (id: string, over: Record<string, unknown> = {}) => ({
    id,
    exam: 'P',
    type: 'multiple-choice',
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }],
    answer: 'A',
    concepts: ['Variance'],
    difficulty: 'medium',
    offSyllabus: false,
    ...over,
  })

  it('raids only what a click can mark, as a battle races', () => {
    for (const x of [q('a'), q('b', { type: 'multi-part' }), q('c', { options: [{ key: 'A', text: '1' }] }), q('d', { answer: 'E' })]) {
      expect(isRaidQuestion(x)).toBe(isBattleQuestion(x as unknown as Question))
    }
  })

  it('draws the weak spots first, never a question already hit, and hard ones only when All in', () => {
    const bank = [
      q('p-1', { concepts: ['Bayes Theorem'] }),
      q('p-2', { concepts: ['Bayes Theorem'], difficulty: 'hard' }),
      q('p-3'),
      q('p-4', { difficulty: 'hard' }),
      q('p-5', { exam: 'FM' }),
      q('p-6', { offSyllabus: true, concepts: ['Bayes Theorem'] }),
      q('p-7', { concepts: ['Bayes Theorem'] }),
    ]
    const ids = (opts: Parameters<typeof drawRaidQuestions>[1]) => drawRaidQuestions(bank, { random: () => 0.5, ...opts }).map(x => x.id)
    const run = ids({ exam: 'P', weakSpots: ['bayes theorem'], answered: ['P-7'] })
    expect(run.slice(0, 2).sort()).toEqual(['p-1', 'p-2'])
    expect(run.sort()).toEqual(['p-1', 'p-2', 'p-3', 'p-4'])
    expect(ids({ exam: 'P', phase: 'all_in' }).sort()).toEqual(['p-2', 'p-4'])
    expect(ids({ exam: 'P', size: 1, weakSpots: ['Bayes Theorem'] })).toHaveLength(1)
  })
})

// ── The database's half: the duplication contract, checked by reading it ────

const MIGRATION = readFileSync(
  fileURLToPath(new URL('../../../../supabase/migrations/20260930_actuaria_crews.sql', import.meta.url)),
  'utf8',
)

describe('supabase/migrations/20260930_actuaria_crews.sql', () => {
  it('writes the same formulas the screens draw', () => {
    expect(MIGRATION).toContain('ceil(p_members * 0.75)') // poolThreshold
    expect(MIGRATION).toContain('round(p_amount * 1.25)') // poolAward
    expect(MIGRATION).toContain('1000 * v_members') // bossMax
    expect(MIGRATION).toContain('WHEN p_health * 4 <= p_max THEN \'all_in\'') // raidPhase
    expect(MIGRATION).toContain('WHEN p_health * 2 <= p_max THEN \'double\'')
    expect(MIGRATION).toContain('boss_health + 50') // MISS_HEAL
    expect(MIGRATION).toContain('floor(300 * r.dmg / v_total)') // lootSplit
    expect(MIGRATION).toContain('round(50 * GREATEST(0, LEAST(1, 1 - p_elapsed_ms / p_total_ms)))') // speedBonus
    expect(MIGRATION).toContain(`'${STOP_LOSS_SHIELD}'`)
  })

  it('never lets a client call what moves the boss or mints gems', () => {
    for (const fn of ['actuaria_credit_gems(uuid, integer)', 'actuaria_raid_draw(uuid, uuid, text[])', 'actuaria_raid_hit(uuid, uuid, text, boolean, integer)']) {
      expect(MIGRATION).toContain(`REVOKE ALL ON FUNCTION ${fn} FROM public, anon, authenticated;`)
      expect(MIGRATION).not.toContain(`GRANT EXECUTE ON FUNCTION ${fn} TO authenticated`)
    }
  })
})
