import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { CHECKS, QUESTION_CHECKS, checkedValueCount, checksFor, verifyCheck, type QuestionCheck } from './checks'
import { runTool } from './run'
import { parseQuestion } from '../parser'
import { toolById } from './registry'
import friedland from './fixtures/friedland-2010.json'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')

// R6 (docs/actuarial-tools.md §9.1): every tool that says it was tested
// against a published example reproduces every value that example prints.
describe('published worked examples', () => {
  it.each(CHECKS.map(c => [`${c.tool} — ${c.source.locator}`, c] as const))('%s', (_name, check) => {
    expect(verifyCheck(check)).toEqual([])
    expect(check.cases.every(c => c.expect.length > 0)).toBe(true)
  })

  it('names tools that exist, and sources the vault has a page for', () => {
    for (const c of CHECKS) {
      expect(toolById(c.tool), c.tool).toBeTruthy()
      expect(c.source.resource).toBeTruthy()
      expect(() => readFileSync(path.join(ROOT, 'Resources/Books', `${c.source.resource}.md`))).not.toThrow()
    }
  })

  it('holds the reserving tools to every value in Friedland’s Chapter 7–9 exhibits', () => {
    for (const id of ['reserving.age_to_age_factors', 'reserving.development_to_ultimate', 'reserving.chain_ladder', 'reserving.expected_claims', 'reserving.bornhuetter_ferguson']) {
      expect(checksFor(id).length, id).toBeGreaterThan(0)
    }
    // 81 factors and 6 rows of 9 averages, 10 CDFs and 10 percentages, 20 ultimates,
    // 10 expected-claims amounts, and 60 B-F values.
    expect(checkedValueCount('reserving.age_to_age_factors')).toBe(45 + 54)
    expect(checkedValueCount('reserving.bornhuetter_ferguson')).toBe(60)
  })

  it('was read off the printing the extractor names, not typed in', () => {
    expect(friedland.generated_by).toBe('scripts/tool_fixtures.py')
    expect(friedland.source.sha256).toMatch(/^[0-9a-f]{64}$/)
  })

  it('catches a tool that drifts from the printed values', () => {
    const check = CHECKS.find(c => c.tool === 'reserving.chain_ladder')!
    const broken = { ...check, cases: [{ ...check.cases[0], input: { ...check.cases[0].input, rows: (check.cases[0].input.rows as Record<string, unknown>[]).map(r => ({ ...r, cdf: Number(r.cdf) + 0.01 })) } }] }
    expect(verifyCheck(broken).length).toBeGreaterThan(0)
  })
})

// §9.2: published exam questions a tool answers outright, marked against the
// official answer read from the bank — never copied into the check.
describe('published exam questions', () => {
  const read = (q: QuestionCheck) => {
    const parsed = parseQuestion(readFileSync(path.join(ROOT, 'questions', q.bank, `${q.question}.md`), 'utf8'))
    if (!parsed) throw new Error(`${q.question} does not parse`)
    return parsed
  }
  const numberOf = (text: string) => Number(text.replace(/[$,\s]/g, ''))

  it.each(QUESTION_CHECKS.map(q => [`${q.tool} — ${q.question}`, q] as const))('%s', (_name, q) => {
    const question = read(q)
    // Every input is quoted from the stem.
    for (const quote of q.quotes) expect(question.stem, `"${quote}" in ${q.question}`).toContain(quote)
    // The numeric options ("Cannot be determined" is no number to be near).
    const options = question.options.map(o => ({ key: o.key, value: numberOf(o.text) })).filter(o => Number.isFinite(o.value))
    const keyed = options.find(o => o.key === question.answer)
    expect(keyed, 'a numeric keyed answer').toBeTruthy()
    if (!keyed) return
    const actual = q.value(runTool(toolById(q.tool)!, q.input))
    expect(Math.abs(actual - keyed.value)).toBeLessThanOrEqual(q.tolerance)
    // And the tool picks the keyed answer: nearer it than any other option.
    const nearest = [...options].sort((a, b) => Math.abs(a.value - actual) - Math.abs(b.value - actual))[0]
    expect(nearest.key).toBe(question.answer)
  })

  it('names the SOA sample question each check reads, and no question with an open critical finding', () => {
    for (const q of QUESTION_CHECKS) {
      expect(q.label).toBe(`SOA Exam FM sample question ${Number(q.question.replace('fm-', ''))}`)
      expect(read(q).verification?.openCritical ?? 0).toBe(0)
      expect(checksFor(q.tool).some(s => s.question === q.question)).toBe(true)
    }
  })
})
