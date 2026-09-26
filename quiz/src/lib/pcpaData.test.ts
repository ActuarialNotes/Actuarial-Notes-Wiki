import { describe, expect, it } from 'vitest'
import { CASE_IDS, generateAssessment, generateCase, naicsSector } from './pcpaData'
import { toCsv } from './csv'
import { PROJECT_CASES } from '@/data/pcpaProjects'

function dedupe(rows: unknown[][]): unknown[][] {
  const seen = new Set<string>()
  return rows.filter(r => {
    const key = JSON.stringify(r)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const col = (columns: string[], name: string) => {
  const i = columns.indexOf(name)
  if (i < 0) throw new Error(`no column ${name}`)
  return i
}

describe('generateCase', () => {
  it.each(CASE_IDS)('%s is deterministic in its seed', id => {
    const a = generateCase(id, 42)
    const b = generateCase(id, 42)
    const c = generateCase(id, 43)
    const text = (g: typeof a) => g.tables.map(t => toCsv(t.columns, t.rows)).join('')
    expect(text(a)).toBe(text(b))
    expect(text(a)).not.toBe(text(c))
  })

  it('every generated column is in the case\'s data dictionary, and every dictionary entry is generated', () => {
    for (const projectCase of PROJECT_CASES) {
      const generated = generateCase(projectCase.id, 1)
      expect(generated.tables.map(t => t.file)).toEqual(projectCase.dictionary.map(d => d.file))
      for (const table of generated.tables) {
        const entry = projectCase.dictionary.find(d => d.file === table.file)!
        expect(table.columns).toEqual(entry.entries.map(e => e.column))
        for (const row of table.rows) expect(row).toHaveLength(table.columns.length)
      }
    }
  })

  it('the case pool and the generator cover the same cases', () => {
    expect(PROJECT_CASES.map(c => c.id).sort()).toEqual([...CASE_IDS].sort())
  })

  it('counts the BOP problems it plants', () => {
    const g = generateCase('bop-frequency', 7)
    const [policies, claims] = g.tables
    const count = (id: string) => g.issues.find(i => i.id === id)!.count
    expect(policies.rows.length - dedupe(policies.rows).length).toBe(count('duplicate-policies'))
    expect(claims.rows.length - dedupe(claims.rows).length).toBe(count('duplicate-claims'))
    const uniqueClaims = dedupe(claims.rows)
    expect(uniqueClaims.filter(r => r[col(claims.columns, 'incurred_loss')] === 0)).toHaveLength(count('cwp'))
    const uniquePolicies = dedupe(policies.rows)
    const exposure = col(policies.columns, 'earned_exposure')
    expect(uniquePolicies.filter(r => (r[exposure] as number) <= 0 || (r[exposure] as number) > 1)).toHaveLength(count('exposure'))
    const known = new Set(policies.rows.map(r => r[0]))
    expect(uniqueClaims.filter(r => !known.has(r[1]))).toHaveLength(count('orphan-claims'))
  })

  it('keeps model year, vehicle age and accident year exactly collinear in the auto case', () => {
    const { tables: [claims], issues } = generateCase('auto-severity', 9)
    const ay = col(claims.columns, 'accident_year')
    const my = col(claims.columns, 'model_year')
    const va = col(claims.columns, 'vehicle_age')
    for (const r of claims.rows) expect((r[my] as number) + (r[va] as number)).toBe(r[ay])
    const loss = col(claims.columns, 'gross_loss')
    const nonPositive = dedupe(claims.rows).filter(r => (r[loss] as number) <= 0).length
    expect(nonPositive).toBe(issues.find(i => i.id === 'nonpositive')!.count)
  })

  it('counts the negative homeowners losses it plants', () => {
    const { tables: [policies], issues } = generateCase('ho-water', 11)
    const loss = col(policies.columns, 'incurred_loss')
    expect(dedupe(policies.rows).filter(r => (r[loss] as number) < 0)).toHaveLength(issues.find(i => i.id === 'negative')!.count)
  })

  it('draws a realistic small-commercial frequency', () => {
    const fact = generateCase('bop-frequency', 3).facts.find(f => f.label === 'Book claim frequency')!
    const frequency = Number(fact.value.split(' ')[0])
    expect(frequency).toBeGreaterThan(0.06)
    expect(frequency).toBeLessThan(0.18)
  })
})

describe('naicsSector', () => {
  it('folds the census ranges into one sector', () => {
    expect(naicsSector(332710)).toBe('31-33')
    expect(naicsSector(445120)).toBe('44-45')
    expect(naicsSector(492210)).toBe('48-49')
    expect(naicsSector(722511)).toBe('72')
  })
})

describe('generateAssessment', () => {
  it.each(CASE_IDS)('%s hands out features only, and its true expectation matches the outcomes on average', id => {
    const a = generateAssessment(id, 5)
    const n = a.table.rows.length
    expect(a.actual).toHaveLength(n)
    expect(a.expected).toHaveLength(n)
    expect(a.weight).toHaveLength(n)
    expect(new Set(a.table.rows.map(r => r[0])).size).toBe(n)
    for (const leak of ['renewal_status', 'airbag_deployed', 'report_lag_days', 'gross_loss', 'incurred_loss', 'claim_count']) {
      expect(a.table.columns).not.toContain(leak)
    }
    const actual = a.actual.reduce((s, v) => s + v, 0)
    const expected = a.expected.reduce((s, v) => s + v, 0)
    // Heavy-tailed homeowners losses get the widest band.
    const tolerance = id === 'ho-water' ? 0.25 : 0.1
    expect(Math.abs(actual / expected - 1)).toBeLessThan(tolerance)
  })

  it('shares the training data\'s columns, less the target and anything decided after the fact', () => {
    const g = generateCase('bop-frequency', 5)
    const a = generateAssessment('bop-frequency', 5)
    expect(a.table.columns.slice(1)).toEqual(g.tables[0].columns.filter(c => c !== 'policy_id' && c !== 'renewal_status'))
  })
})
