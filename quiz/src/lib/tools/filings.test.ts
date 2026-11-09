import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  FILED_CHECKS,
  MCT_LINES,
  ToolInputError,
  checksFor,
  filedRefOf,
  filedValue,
  filersIn,
  filingPeriods,
  installFilings,
  isBranch,
  runTool,
  toolById,
  type FilingsFile,
  type ToolSpec,
} from './index'
import { MCT_CORRELATION, MCT_DIVISOR, MCT_TARGET } from './capital/mctRatio'

const VAULT = resolve(__dirname, '../../../..')
const FILE = JSON.parse(readFileSync(resolve(__dirname, 'data/filings/osfi-pc4-summary.json'), 'utf8')) as FilingsFile
const tool = (id: string) => toolById(id) as ToolSpec
const insurerReturn = tool('data.insurer_return')
const mct = tool('capital.mct_ratio')
const INTACT = '27906'

/** An insurer's quarter, handed from Insurer Return to MCT Ratio the way the card's "Gives to" does. */
function handed(period: string, id: string) {
  const ir = runTool(insurerReturn, { insurer: id, quarter: period })
  return runTool(mct, ir.values.handoff)
}

afterEach(() => installFilings(FILE))

describe("OSFI's filings, installed", () => {
  it('holds 14 IFRS 17 quarters with their hashes', () => {
    expect(filingPeriods()).toHaveLength(14)
    expect(filingPeriods().at(-1)).toBe('2023Q1')
    expect(filingPeriods()[0]).toBe('2026Q2')
    for (const p of FILE.periods) {
      expect(p.sha256).toMatch(/^sha256:[0-9a-f]{64}$/)
      expect(p.pc4_sha256).toMatch(/^sha256:[0-9a-f]{64}$/)
    }
  })

  it('labels every line only with OSFI’s words, both languages', () => {
    for (const l of FILE.lines) {
      expect(l.address).toMatch(/^P1000\d{5}$/)
      expect(l.en.length).toBeGreaterThan(3)
      expect(l.fr.length).toBeGreaterThan(3)
    }
    expect(FILE.lines.find(l => l.address === MCT_LINES.ratio)?.en).toBe('Ratio (Line 10 or line 25 as a % of line 130)')
  })

  it('carries no total row', () => {
    for (const i of Object.values(FILE.institutions)) expect(i.en.startsWith('Total ')).toBe(false)
  })

  it('names its licence and its page in the vault', () => {
    expect(FILE.licence.name).toBe('Open Government Licence – Canada')
    expect(FILE.licence.attribution).toBe('Contains information licensed under the Open Government Licence – Canada.')
    expect(readFileSync(resolve(VAULT, FILE.vault_page), 'utf8')).toContain('Open Government Licence')
  })
})

describe('Insurer Return', () => {
  it('reads a line as filed, with its label and quarter', () => {
    const r = runTool(insurerReturn, { insurer: INTACT, quarter: '2026Q2', line: MCT_LINES.ratio })
    expect(r.tiles[0].value).toBeCloseTo(1.9175, 6)
    expect(r.values.label).toBe('Ratio (Line 10 or line 25 as a % of line 130)')
    expect(r.summary).toContain('Intact Insurance Company')
    expect(r.summary).toContain('Contains information licensed under the Open Government Licence – Canada.')
    expect((r.values.history as number[]).length).toBe(14)
  })

  it('gives an amount in $000 with the ratio beside it', () => {
    const r = runTool(insurerReturn, { insurer: INTACT, quarter: '2026Q2', line: MCT_LINES.insurance })
    expect(r.tiles[0].value).toBe(2252592.68)
    expect(r.tiles[1].symbol).toBe('MCT')
  })

  it('takes the insurer by its name too', () => {
    const r = runTool(insurerReturn, { insurer: 'Intact Insurance Company', quarter: '2026Q2' })
    expect(r.values.institution).toBe(INTACT)
  })

  it('hands a branch on to the BAAT, on its net assets', () => {
    const branch = filersIn('2026Q2').find(isBranch)!
    const r = runTool(insurerReturn, { insurer: branch, quarter: '2026Q2' })
    const h = r.values.handoff as Record<string, unknown>
    expect(h.test).toBe('baat')
    expect(h.capital).toEqual({ filed: filedRefOf('2026Q2', branch, MCT_LINES.netAssets) })
  })

  it('says which quarters an insurer did file, for one it didn’t', () => {
    const late = Object.keys(FILE.institutions).find(id => filedValue('2023Q1', id, MCT_LINES.minimum) === null && filedValue('2026Q2', id, MCT_LINES.minimum) !== null)!
    expect(() => runTool(insurerReturn, { insurer: late, quarter: '2023Q1' })).toThrow(/filed no PC4 for Q1 2023\. It filed for/)
  })

  it('answers with an error, not a number, when the filings aren’t loaded', () => {
    installFilings(null)
    expect(() => runTool(insurerReturn, { insurer: INTACT, quarter: '2026Q2' })).toThrow(ToolInputError)
    expect(() => runTool(mct, { insurance: { filed: filedRefOf('2026Q2', INTACT, MCT_LINES.insurance) } })).toThrow(/aren't loaded/)
    // A run on typed-in figures needs no filings.
    expect(() => runTool(mct, {})).not.toThrow()
  })
})

describe('MCT Ratio', () => {
  it('reproduces CAS Exam 6C Spring 2017 Q24: 150% at the market risk its solution finds', () => {
    const stem = readFileSync(resolve(VAULT, 'questions/exam-6c/cas6c-2017s-q24.md'), 'utf8')
    // Every default is quoted from the question or its solution.
    for (const quote of ['| Total Capital Available | 53,000 |', '| Insurance Risk | 21,000 |', '| Credit Risk | 2,500 |', '= 24{,}470', '8.5\\% \\times M + 9{,}270', 'The correlation factor between the asset risk and the insurance risk is 50%']) {
      expect(stem).toContain(quote)
    }
    const r = runTool(mct, {})
    expect(r.tiles[0].value).toBeCloseTo(1.5, 4)
    expect(r.warnings).toEqual(["Below OSFI's supervisory target of 150% (MCT guideline, §1.2.1)."])
  })

  it('carries the guideline figures the Assumptions Bank holds', () => {
    const set = readFileSync(resolve(VAULT, 'Assumptions/OSFI MCT Capital Ratios (2024).md'), 'utf8')
    expect(set).toMatch(/\| Divisor from target-level to minimum capital required \| capital-factor \| 1\.5 \|/)
    expect(set).toMatch(/\| Supervisory target MCT ratio \| capital-ratio \| 150 \|/)
    expect(set).toMatch(/\| Correlation between insurance risk and market and credit risk \| capital-factor \| 50 \| % \|/)
    expect(MCT_DIVISOR).toBe(1.5)
    expect(MCT_TARGET).toBe(1.5)
    expect(MCT_CORRELATION).toBe(0.5)
  })

  it('records each filed input’s filing, and agrees with Intact’s own ratio', () => {
    const r = handed('2026Q2', INTACT)
    expect(r.tiles[0].value).toBeCloseTo(1.9175, 4)
    const filed = r.values.filed_answer as Record<string, unknown>
    expect(filed.agrees).toBe(true)
    expect(filed.value).toBeCloseTo(1.9175, 10)
    const capital = r.judgments.find(j => j.field === 'capital')!
    expect(capital.filed?.address).toBe(MCT_LINES.capital)
    expect(capital.filed?.label).toBe('Total Capital Available')
    expect(capital.default).toBe(false)
    expect(r.trace[0].label).toBe('Capital available: as filed with OSFI')
    expect(r.trace.some(t => t.label.startsWith('Filed with OSFI: Ratio'))).toBe(true)
    expect(r.warnings).toEqual([])
    // The filing is part of what was run: the same numbers typed in hash differently.
    const typed = runTool(mct, r.input)
    expect(typed.tiles[0].value).toBe(r.tiles[0].value)
    expect(typed.inputHash).not.toBe(r.inputHash)
  })

  it('reproduces every MCT and BAAT ratio filed, Q1 2023 to Q2 2026', () => {
    const claim = FILED_CHECKS.find(c => c.filings)!.filings!
    let n = 0
    const off: string[] = []
    for (const p of FILE.periods) {
      for (const id of Object.keys(p.values)) {
        if (filedValue(p.period, id, MCT_LINES.ratio) === 0) continue
        const r = handed(p.period, id)
        const filed = r.values.filed_answer as { agrees: boolean; value: number }
        n++
        if (!filed.agrees) off.push(`${p.period} ${id}: filed ${filed.value}, recomputed ${r.tiles[0].value}`)
        if (isBranch(id)) expect(r.tiles[0].symbol).toBe('BAAT')
      }
    }
    expect(off).toEqual([])
    expect(n).toBe(claim.count)
    expect([...filingPeriods()].reverse()[0]).toBe(claim.from)
    expect(filingPeriods()[0]).toBe(claim.to)
  })

  it('says so when a filed figure doesn’t match what its lines give', () => {
    const r = runTool(mct, { ...handed('2026Q2', INTACT).input, capital: { filed: filedRefOf('2026Q2', INTACT, MCT_LINES.capital) }, insurance: 1 })
    // One input typed over: still one filing, so the filed ratio is compared, and it no longer agrees.
    expect((r.values.filed_answer as { agrees: boolean }).agrees).toBe(false)
    expect(r.warnings[0]).toMatch(/^Intact Insurance Company filed 191\.75% for Q2 2026/)
  })

  it('warns when the filed inputs come from two filings', () => {
    const r = runTool(mct, {
      capital: { filed: filedRefOf('2026Q2', INTACT, MCT_LINES.capital) },
      insurance: { filed: filedRefOf('2026Q1', INTACT, MCT_LINES.insurance) },
    })
    expect(r.warnings).toContain('The filed values come from more than one filing, so they describe no one insurer at one date.')
    expect(r.values.filed_answer).toBeUndefined()
  })

  it('refuses a filed line the field doesn’t take, and a reference it can’t read', () => {
    expect(() => runTool(mct, { insurance: { filed: filedRefOf('2026Q2', INTACT, MCT_LINES.market) } })).toThrow(/takes line 50/)
    expect(() => runTool(mct, { insurance: { filed: 'osfi-pc:2026Q2:27906' } })).toThrow(/isn't a filed cell/)
    expect(() => runTool(mct, { insurance: { filed: filedRefOf('2019Q2', INTACT, MCT_LINES.insurance) } })).toThrow(/2019Q2 isn't one of them/)
  })

  it('says what it was tested against', () => {
    expect(checksFor('capital.mct_ratio').map(s => s.title)).toEqual([
      'Every MCT and BAAT ratio filed with OSFI, Q1 2023 to Q2 2026 (1,909 filings)',
      'CAS Exam 6C, Spring 2017, question 24',
    ])
  })
})
