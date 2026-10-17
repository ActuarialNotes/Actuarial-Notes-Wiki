// Golden vectors for the two places this app's logic is copied rather than
// imported (roadmap E6):
//
//   • lib/dailyEmail.ts ↔ supabase/functions/daily-plan-email/index.ts — the
//     edge function runs in Deno and can't import from quiz/src, so its helpers
//     are a verbatim mirror. Here the mirror's own source is cut out of that
//     file, transpiled and *run* against the same vectors as the original.
//   • lib/leagues.ts ↔ league_rollover_if_due() in the leagues migration — the
//     week-end promotion/demotion maths, in SQL. Postgres doesn't run in this
//     suite (supabase/tests/ does, by hand), so the SQL's constants are read
//     off its latest definition and its CASE is evaluated with them here.
//
// Either test failing means the copy drifted: fix the copy, never the vectors
// to match it. The pattern is passRates', whose parser has one implementation
// exercised from both sides.

import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import ts from 'typescript'
import {
  MAX_EMAIL_CONCEPTS,
  deriveTodaysConcepts,
  describePacing,
  localDateHour,
  type EmailPlanSnapshot,
} from './dailyEmail'
import { COHORT_CAP, LEAGUE_TIERS, TOP_TIER_INDEX, demoteCount, promoteCount, zoneForRank } from './leagues'

const REPO = resolve(__dirname, '../../..')

/** The source text of `function <name>(…) { … }` in `source`, braces matched. */
function functionSource(source: string, name: string): string {
  const start = source.search(new RegExp(`(^|\\n)(export )?function ${name}\\(`))
  if (start < 0) throw new Error(`function ${name} not found`)
  const open = source.indexOf('{', source.indexOf(')', start))
  // A return-type annotation can be braces too (`): { date: string } {`), so
  // walk balanced groups until one isn't followed straight away by another —
  // that last one is the body.
  let i = open
  for (;;) {
    let depth = 0
    let j = i
    for (; j < source.length; j++) {
      if (source[j] === '{') depth++
      else if (source[j] === '}' && --depth === 0) break
    }
    const after = source.slice(j + 1).match(/^\s*(\S)/)?.[1]
    if (after === '{') { i = source.indexOf('{', j + 1); continue }
    return source.slice(start, j + 1).trim()
  }
}

// ── The daily email ─────────────────────────────────────────────────────────

const EDGE = readFileSync(resolve(REPO, 'supabase/functions/daily-plan-email/index.ts'), 'utf8')

interface EmailMirror {
  deriveTodaysConcepts: typeof deriveTodaysConcepts
  describePacing: typeof describePacing
  localDateHour: typeof localDateHour
  MAX_EMAIL_CONCEPTS: number
}

function loadEmailMirror(): EmailMirror {
  const names = ['deriveTodaysConcepts', 'describePacing', 'localDateHour'] as const
  const max = EDGE.match(/const MAX_EMAIL_CONCEPTS = (\d+)/)
  if (!max) throw new Error('MAX_EMAIL_CONCEPTS not found in the edge function')
  const body = names.map(n => functionSource(EDGE, n)).join('\n\n')
  const js = ts.transpileModule(body, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText
  const exported = new Function(`${js}\nreturn { ${names.join(', ')} }`)() as Omit<EmailMirror, 'MAX_EMAIL_CONCEPTS'>
  return { ...exported, MAX_EMAIL_CONCEPTS: Number(max[1]) }
}

describe('daily email: the edge function mirrors lib/dailyEmail.ts', () => {
  const mirror = loadEmailMirror()

  const plan: EmailPlanSnapshot = {
    generatedDate: '2026-10-14',
    todaysConcepts: ['Generated Day Concept'],
    assignments: [
      { conceptName: 'Generated Day Concept', scheduledDate: '2026-10-14' },
      { conceptName: 'Skipped Day', scheduledDate: '2026-10-15' },
      { conceptName: 'Bayes Theorem', scheduledDate: '2026-10-16' },
      { conceptName: 'bayes theorem', scheduledDate: '2026-10-16' },
      { conceptName: 'Tomorrow', scheduledDate: '2026-10-18' },
      { scheduledDate: '2026-10-16' },
      { conceptName: 'No Date' },
    ],
  }
  const derivations: Array<[EmailPlanSnapshot, string, string[]]> = [
    [plan, '2026-10-14', ['Generated Day Concept']],
    [plan, '2026-10-17', ['Skipped Day', 'Bayes Theorem']],
    [plan, '2026-10-13', []],
    [{ ...plan, generatedDate: undefined }, '2026-10-17', []],
    [{ generatedDate: '2026-10-17', todaysConcepts: ['A', 7 as unknown as string, 'B'] }, '2026-10-17', ['A', 'B']],
    [{ generatedDate: '2026-10-10' }, '2026-10-17', []],
  ]

  it('deriveTodaysConcepts: the golden vectors hold for both', () => {
    for (const [p, today, expected] of derivations) {
      expect(deriveTodaysConcepts(p, today)).toEqual(expected)
      expect(mirror.deriveTodaysConcepts(p, today)).toEqual(expected)
    }
  })

  it('describePacing: every status reads the same', () => {
    for (const status of ['on_track', 'ahead', 'behind', 'review_mode', 'target_passed', 'unknown', undefined]) {
      expect(mirror.describePacing(status)).toBe(describePacing(status))
    }
    expect(describePacing('on_track')).toBe("You're on track")
  })

  it('localDateHour: the same local date and hour, bad zones falling back to UTC', () => {
    const vectors: Array<[string, string, { date: string; hour: number }]> = [
      ['UTC', '2026-10-17T00:30:00Z', { date: '2026-10-17', hour: 0 }],
      ['America/Toronto', '2026-10-17T03:30:00Z', { date: '2026-10-16', hour: 23 }],
      ['Asia/Kolkata', '2026-10-17T20:00:00Z', { date: '2026-10-18', hour: 1 }],
      ['Not/AZone', '2026-10-17T13:05:00Z', { date: '2026-10-17', hour: 13 }],
    ]
    for (const [zone, iso, expected] of vectors) {
      expect(localDateHour(zone, new Date(iso))).toEqual(expected)
      expect(mirror.localDateHour(zone, new Date(iso))).toEqual(expected)
    }
  })

  it('MAX_EMAIL_CONCEPTS agrees', () => {
    expect(mirror.MAX_EMAIL_CONCEPTS).toBe(MAX_EMAIL_CONCEPTS)
  })
})

// ── The leagues rollover ────────────────────────────────────────────────────

/** The newest migration's body of league_rollover_if_due(), and the cohort cap it assigns under. */
function latestLeagueSql(): { rollover: string; assign: string } {
  const dir = resolve(REPO, 'supabase/migrations')
  let rollover = ''
  let assign = ''
  for (const file of readdirSync(dir).filter(f => f.endsWith('.sql')).sort()) {
    const sql = readFileSync(resolve(dir, file), 'utf8')
    const r = sql.match(/CREATE OR REPLACE FUNCTION league_rollover_if_due\(\)[\s\S]*?\n\$\$;/)
    if (r) rollover = r[0]
    const a = sql.match(/CREATE OR REPLACE FUNCTION league_assign_member\([\s\S]*?\n\$\$;/)
    if (a) assign = a[0]
  }
  if (!rollover || !assign) throw new Error('league functions not found in supabase/migrations')
  return { rollover, assign }
}

interface SqlRollover {
  demoteCap: number
  demoteDivisor: number
  promoteCap: number
  promoteDivisor: number
  topTier: number
  cohortCap: number
}

function readSqlRollover(): SqlRollover {
  const { rollover, assign } = latestLeagueSql()
  const demote = rollover.match(/rnk > n - LEAST\((\d+), floor\(n \/ ([\d.]+)\)::int\)/)
  const promote = rollover.match(/rnk <= LEAST\((\d+), ceil\(n \/ ([\d.]+)\)::int\)/)
  const top = rollover.match(/LEAST\(tier \+ 1, (\d+)\)/)
  const cap = assign.match(/HAVING count\(m\.user_id\) < (\d+)/)
  if (!demote || !promote || !top || !cap) {
    throw new Error('the rollover SQL changed shape — update readSqlRollover with it')
  }
  return {
    demoteCap: Number(demote[1]),
    demoteDivisor: Number(demote[2]),
    promoteCap: Number(promote[1]),
    promoteDivisor: Number(promote[2]),
    topTier: Number(top[1]),
    cohortCap: Number(cap[1]),
  }
}

/** The SQL CASE, evaluated: the tier a member moves to at week end. */
function sqlNewTier(sql: SqlRollover, rank: number, n: number, tier: number, weeklyXp: number): number {
  if (weeklyXp === 0 || rank > n - Math.min(sql.demoteCap, Math.floor(n / sql.demoteDivisor))) {
    return Math.max(tier - 1, 0)
  }
  if (rank <= Math.min(sql.promoteCap, Math.ceil(n / sql.promoteDivisor))) return Math.min(tier + 1, sql.topTier)
  return tier
}

/** What the board (lib/leagues.ts) tells a member with XP their move will be. */
function libNewTier(rank: number, n: number, tier: number): number {
  const zone = zoneForRank(rank, n, tier)
  return zone === 'promotion' ? tier + 1 : zone === 'demotion' ? tier - 1 : tier
}

describe('leagues: league_rollover_if_due() mirrors lib/leagues.ts', () => {
  const sql = readSqlRollover()

  it('the ladder and the cohort cap agree', () => {
    expect(sql.topTier).toBe(TOP_TIER_INDEX)
    expect(LEAGUE_TIERS).toHaveLength(TOP_TIER_INDEX + 1)
    expect(sql.cohortCap).toBe(COHORT_CAP)
  })

  it('promotion and demotion counts agree for every cohort size', () => {
    for (let n = 1; n <= COHORT_CAP; n++) {
      expect(Math.min(sql.promoteCap, Math.ceil(n / sql.promoteDivisor))).toBe(promoteCount(n))
      expect(Math.min(sql.demoteCap, Math.floor(n / sql.demoteDivisor))).toBe(demoteCount(n))
    }
  })

  it('golden counts', () => {
    const sizes = [1, 2, 3, 5, 9, 10, 15, 25, 30]
    expect(sizes.map(promoteCount)).toEqual([1, 1, 1, 2, 3, 4, 5, 9, 10])
    expect(sizes.map(demoteCount)).toEqual([0, 0, 0, 1, 1, 2, 3, 5, 5])
  })

  it('every rank, size and tier moves where the board says it will', () => {
    for (let n = 1; n <= COHORT_CAP; n++) {
      for (let rank = 1; rank <= n; rank++) {
        for (let tier = 0; tier <= TOP_TIER_INDEX; tier++) {
          expect([n, rank, tier, sqlNewTier(sql, rank, n, tier, 100)]).toEqual([n, rank, tier, libNewTier(rank, n, tier)])
        }
      }
    }
  })

  it('a member with no XP relegates whatever the rank, as the board footnote says', () => {
    expect(sqlNewTier(sql, 1, 10, 2, 0)).toBe(1)
    expect(sqlNewTier(sql, 1, 10, 0, 0)).toBe(0)
  })
})
