import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { CHECKS, checkedValueCount, checksFor, runQuestionCheck, verifyCheck } from './checks'
import { QUESTION_CHECKS, type QuestionCheck } from './questionChecks'
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

  it.each(QUESTION_CHECKS.map(q => [`${q.steps.map(s => s.tool).join(' → ')} — ${q.question}`, q] as const))('%s', (_name, q) => {
    const question = read(q)
    // Every input is quoted from the stem.
    for (const quote of q.quotes) expect(question.stem, `"${quote}" in ${q.question}`).toContain(quote)
    const options = question.options.map(o => ({ key: o.key, value: readOption(o.text) })).filter(o => o.value !== null)
    const keyed = options.find(o => o.key === question.answer)?.value
    expect(keyed, 'a numeric keyed answer').toBeTruthy()
    if (!keyed) return
    const actual = runQuestionCheck(q)
    if (keyed.kind === 'range') {
      // A range answer ("At least 21, but less than 23"): the tool lands inside it.
      expect(actual).toBeGreaterThanOrEqual(keyed.lo)
      expect(actual).toBeLessThan(keyed.hi)
      return
    }
    expect(Math.abs(actual - keyed.value)).toBeLessThanOrEqual(q.tolerance)
    // And the tool picks the keyed answer: nearer it than any other option.
    const nearest = options
      .flatMap(o => (o.value!.kind === 'number' ? [{ key: o.key, value: o.value!.value }] : []))
      .sort((a, b) => Math.abs(a.value - actual) - Math.abs(b.value - actual))[0]
    expect(nearest.key).toBe(question.answer)
  })

  it('names each question as its publisher numbers it, and none with an open critical finding', () => {
    for (const q of QUESTION_CHECKS) {
      expect(q.label).toBe(expectedLabel(q.question))
      expect(read(q).verification?.openCritical ?? 0).toBe(0)
      for (const step of q.steps) expect(checksFor(step.tool).some(s => s.question === q.question), `${step.tool} cites ${q.question}`).toBe(true)
    }
  })

  it('reads the options a question prints', () => {
    expect(readOption('10.25%')).toEqual({ kind: 'number', value: 0.1025 })
    expect(readOption('$-2.22\\%$')).toEqual({ kind: 'number', value: -0.0222 })
    expect(readOption('−2.47%')).toEqual({ kind: 'number', value: -0.0247 })
    expect(readOption('3.4 years')).toEqual({ kind: 'number', value: 3.4 })
    expect(readOption('$1{,}554$')).toEqual({ kind: 'number', value: 1554 })
    expect(readOption('At least 21, but less than 23')).toEqual({ kind: 'range', lo: 21, hi: 23 })
    expect(readOption('Less than -5%')).toEqual({ kind: 'range', lo: -Infinity, hi: -0.05 })
    expect(readOption('At least 0.35')).toEqual({ kind: 'range', lo: 0.35, hi: Infinity })
    expect(readOption('7th')).toBeNull()
    expect(readOption('There is insufficient information to calculate the Macaulay duration.')).toBeNull()
  })
})

type OptionValue = { kind: 'number'; value: number } | { kind: 'range'; lo: number; hi: number }

/** An option as printed: a number (5.56, 10.25%, "3.4 years") or a range ("At least 21, but less than 23"). */
function readOption(text: string): OptionValue | null {
  const clean = text.replace(/\$/g, '').replace(/\{,\}/g, ',').replace(/\\%/g, '%').replace(/[−–]/g, '-').trim()
  const num = (t: string) => {
    const m = /^(-?\s*[\d,]*\.?\d+)\s*(%?)$/.exec(t.trim())
    if (!m) return null
    const n = Number(m[1].replace(/[,\s]/g, ''))
    return m[2] ? Number((n / 100).toPrecision(12)) : n
  }
  const between = /^At least (.+), but less than (.+)$/i.exec(clean)
  if (between) {
    const lo = num(between[1])
    const hi = num(between[2])
    return lo === null || hi === null ? null : { kind: 'range', lo, hi }
  }
  const below = /^Less than (.+)$/i.exec(clean)
  if (below) {
    const hi = num(below[1])
    return hi === null ? null : { kind: 'range', lo: -Infinity, hi }
  }
  const above = /^At least (.+)$/i.exec(clean)
  if (above) {
    const lo = num(above[1])
    return lo === null ? null : { kind: 'range', lo, hi: Infinity }
  }
  const value = num(clean.replace(/\s+(years?|months?)$/i, ''))
  return value === null ? null : { kind: 'number', value }
}

/** How a bank's id reads as its publisher's name for the question. */
function expectedLabel(id: string): string {
  const soa = /^(fm|p)-(\d+)$/.exec(id)
  if (soa) return `SOA Exam ${soa[1].toUpperCase()} sample question ${Number(soa[2])}`
  const cas = /^(masi|masii)-(\d{4})([sf])-(\d+)$/.exec(id)
  if (cas) return `CAS Exam ${cas[1] === 'masi' ? 'MAS-I' : 'MAS-II'}, ${cas[3] === 's' ? 'Spring' : 'Fall'} ${cas[2]}, question ${Number(cas[4])}`
  throw new Error(`No label rule for ${id}`)
}
