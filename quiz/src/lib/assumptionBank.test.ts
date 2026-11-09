import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import bank from 'virtual:assumption-bank'
import {
  ASSUMPTION_KINDS,
  BASES,
  assumptionById,
  figuresOfKind,
  formatAssumptionValue,
  inForce,
  parseAssumptionSet,
  setsForResource,
  type AssumptionSet,
} from './assumptionBank'
import { withBankAssumptions, type SourceResource } from './coworkSources'
import { AUTHORED_RESOURCES, COWORK_RESOURCES } from '@/data/coworkSources'

const ROOT = join(__dirname, '..', '..', '..')

const SET = `---
Title: "Benchmarks"
Source: "[[Some Report]]"
Publisher: "A Board"
Edition: "2026"
Effective: "2026-10-01"
Jurisdiction: "CA-AB"
Extraction: "transcribed"
Document: "https://example.org/r.pdf"
Source sha256: "${'a'.repeat(64)}"
Read: "2026-11-08"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:${'b'.repeat(64)}
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Assumptions/Benchmarks.md
---

The board's benchmarks.

| Assumption | Kind | Value | Unit | Locator |
|---|---|---|---|---|
| Total expenses | expense-ratio | 27.8 | % | p. 7 |
| ULAE | ulae-factor | 1.094 | factor | p. 7 |
| Loss trend | trend | | % | p. 5 |
| Basis | fact | IFRS 4 expense ratio | | p. 7 |
| Total expenses | expense-ratio | 28.0 | % | p. 8 |

## Sources
- [r](https://example.org/r.pdf) — all of it
`

function set(overrides: Partial<AssumptionSet> = {}): AssumptionSet {
  return { ...parseAssumptionSet('Assumptions/Benchmarks.md', SET), ...overrides }
}

describe('parseAssumptionSet', () => {
  const s = set()

  it('reads the frontmatter, lead and verification', () => {
    expect(s).toMatchObject({
      id: 'Benchmarks',
      source: 'Some Report',
      effective: '2026-10-01',
      jurisdiction: 'CA-AB',
      supersededBy: null,
      lead: "The board's benchmarks.",
    })
    expect(s.verification?.status).toBe('unverified')
  })

  it('keeps a figure as printed and as a tool takes it', () => {
    expect(s.rows[0]).toMatchObject({ number: 27.8, decimal: 0.278, unit: '%', id: 'Benchmarks#total-expenses' })
    expect(s.rows[1]).toMatchObject({ number: 1.094, decimal: 1.094, unit: 'factor' })
  })

  it('leaves a blank as blank and a fact as words', () => {
    expect(s.rows[2]).toMatchObject({ raw: '', number: null, decimal: null })
    expect(s.rows[3]).toMatchObject({ raw: 'IFRS 4 expense ratio', number: null, decimal: null })
  })

  it('gives a repeated label its own id', () => {
    expect(s.rows[4].id).toBe('Benchmarks#total-expenses-2')
  })

  it('reads the explained table: each row\'s basis, meaning and the answer it fits', () => {
    const text = SET
      .replace('Publisher: "A Board"', 'Publisher: "A Board"\nShort name: "AB"')
      .replace('Jurisdiction: "CA-AB"', 'Jurisdiction: "CA-AB"\nLine: "Private passenger vehicles"')
      .replace('Read: "2026-11-08"', 'Read: "2026-11-08"\nPage offset: "2"')
      .replace('| Assumption | Kind | Value | Unit | Locator |\n|---|---|---|---|---|', '| Assumption | Kind | Value | Unit | Locator | Basis | Meaning | Fits |\n|---|---|---|---|---|---|---|---|')
      .replace('| Total expenses | expense-ratio | 27.8 | % | p. 7 |', '| Total expenses | expense-ratio | 27.8 | % | p. 7 | selected | The board\'s selection. | ratemaking.expense_ratios#total |')
      .replace(/\| (p\. [578]) \|\n/g, '| $1 | | | |\n')
    const s = parseAssumptionSet('Assumptions/X.md', text)
    expect(s.shortName).toBe('AB')
    expect(s.line).toBe('Private passenger vehicles')
    expect(s.pageOffset).toBe(2)
    expect(s.rows[0]).toMatchObject({ basis: 'selected', meaning: 'The board\'s selection.', fits: 'ratemaking.expense_ratios#total' })
    expect(s.rows[1]).toMatchObject({ basis: '', meaning: '', fits: '' })
    expect(() => parseAssumptionSet('Assumptions/X.md', text.replace('| selected |', '| guessed |'))).toThrow(/unknown basis/)
    expect(() => parseAssumptionSet('Assumptions/X.md', text.replace('#total', ''))).toThrow(/tool id/)
  })

  it('refuses what a reader would misread', () => {
    expect(() => parseAssumptionSet('Assumptions/X.md', SET.replace('| 27.8 |', '| 27.8% |'))).toThrow(/plain number/)
    expect(() => parseAssumptionSet('Assumptions/X.md', SET.replace('ulae-factor', 'fudge'))).toThrow(/unknown kind/)
    expect(() => parseAssumptionSet('Assumptions/X.md', SET.replace('| Assumption | Kind |', '| Name | Kind |'))).toThrow(/header/)
  })
})

describe('lookups', () => {
  const old = set({ id: 'Old', effective: '2025-10-01', supersededBy: 'Benchmarks' })
  const current = set()
  const sets = [old, current]

  it('formats a value for a reader', () => {
    expect(current.rows.map(formatAssumptionValue)).toEqual(['27.8%', '1.094', '', 'IFRS 4 expense ratio', '28.0%'])
    expect(formatAssumptionValue({ raw: '466', unit: 'CAD', kind: 'cat-load' })).toBe('CAD 466')
  })

  it('knows which edition is in force on a date', () => {
    expect(inForce(old, '2026-01-01', sets)).toBe(true)
    expect(inForce(old, '2026-10-01', sets)).toBe(false)
    expect(inForce(current, '2026-09-30', sets)).toBe(false)
    expect(inForce(current, '2026-10-01', sets)).toBe(true)
  })

  it('offers only figures of the kind, in force, in the place', () => {
    const now = figuresOfKind(sets, ['expense-ratio'], { asOf: '2026-11-01' })
    expect(now.map(m => `${m.set.id}:${m.row.raw}`)).toEqual(['Benchmarks:27.8', 'Benchmarks:28.0'])
    expect(figuresOfKind(sets, ['trend'], { asOf: '2026-11-01' })).toEqual([])
    expect(figuresOfKind(sets, ['expense-ratio'], { asOf: '2026-11-01', jurisdiction: 'CA-ON' })).toEqual([])
    expect(figuresOfKind(sets, ['ulae-factor'], { asOf: '2026-11-01', jurisdiction: 'CA-AB' })).toHaveLength(1)
  })

  it('finds a row by id and the sets of a resource', () => {
    expect(assumptionById(sets, 'Benchmarks#ulae')?.row.decimal).toBe(1.094)
    expect(assumptionById(sets, 'Benchmarks#nothing')).toBeNull()
    expect(setsForResource(sets, 'Some Report').map(s => s.id)).toEqual(['Benchmarks', 'Old'])
  })
})

describe('withBankAssumptions', () => {
  const resource: SourceResource = {
    id: 'r',
    entityId: 'e',
    title: 'Report',
    kind: 'report',
    published: '2026',
    summary: '',
    wikiRef: { kind: 'resource', name: 'Some Report', path: 'Resources/Reports/Some Report.md' },
    practiceAreas: ['pc'],
    functions: [],
  }

  it('reads the rows of the current set, with locators and bank ids', () => {
    const old = set({ id: 'Old', supersededBy: 'Benchmarks' })
    const rows = withBankAssumptions(resource, [old, set()]).assumptions!
    expect(rows).toHaveLength(5)
    expect(rows[0]).toEqual({ label: 'Total expenses', value: '27.8%', locator: 'p. 7', bankId: 'Benchmarks#total-expenses' })
    expect(rows[2]).toEqual({ label: 'Loss trend', locator: 'p. 5', bankId: 'Benchmarks#loss-trend' })
  })

  it('leaves a resource the bank has no set for alone', () => {
    const other = { ...resource, wikiRef: { kind: 'resource' as const, name: 'Elsewhere' } }
    expect(withBankAssumptions(other, [set()])).toBe(other)
  })
})

describe('the bank in the vault', () => {
  const files = readdirSync(join(ROOT, 'Assumptions')).filter(f => f.endsWith('.md')).sort()

  it('has the vocabulary the lint has', () => {
    const vocab = JSON.parse(readFileSync(join(ROOT, 'scripts', 'assumption_vocab.json'), 'utf-8'))
    expect(ASSUMPTION_KINDS).toEqual(vocab.kinds)
    expect([...BASES]).toEqual(vocab.bases)
  })

  it('bundles every set, parsed', () => {
    expect(bank.map(s => s.path)).toEqual(files.map(f => `Assumptions/${f}`))
    for (const s of bank) {
      expect(s.rows.length, s.id).toBeGreaterThan(0)
      expect(s.verification, s.id).not.toBeNull()
    }
  })

  it('reads every set from a resource page that exists', () => {
    const folders = readdirSync(join(ROOT, 'Resources'))
    for (const s of bank) {
      const found = folders.some(f => existsSync(join(ROOT, 'Resources', f, `${s.source}.md`)))
      expect(found, `${s.id} → [[${s.source}]]`).toBe(true)
    }
  })

  it('is what Cowork shows for each document it has a set for', () => {
    for (const s of bank) {
      const resource = COWORK_RESOURCES.find(r => r.wikiRef && (r.wikiRef.path?.endsWith(`/${s.source}.md`) || r.wikiRef.name === s.source))
      expect(resource, s.id).toBeDefined()
      expect(resource!.assumptions?.every(a => a.bankId), s.id).toBe(true)
      expect(resource!.assumptions?.map(a => a.bankId)).toEqual(expect.arrayContaining(s.rows.map(r => r.id)))
    }
  })

  it('leaves no authored rows on a document the bank holds', () => {
    const sources = new Set(bank.map(s => s.source))
    const doubled = AUTHORED_RESOURCES.filter(r => {
      const page = r.wikiRef?.path?.replace(/^.*\//, '').replace(/\.md$/, '') ?? r.wikiRef?.name
      return r.assumptions?.length && page && sources.has(page)
    })
    expect(doubled.map(r => r.id)).toEqual([])
  })
})
