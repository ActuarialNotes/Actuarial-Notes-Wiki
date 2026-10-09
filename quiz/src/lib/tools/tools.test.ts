import { describe, it, expect } from 'vitest'
import {
  AREAS,
  TOOLS,
  ToolInputError,
  defaultInput,
  describeTool,
  normalizeInput,
  runTool,
  toolById,
  toolBySlug,
  toolSlug,
  type ToolSpec,
} from './index'
import { canonicalJson, sha256Hex } from './hash'
import { averageFactor, factorsAt } from './reserving/ageToAge'
import { inverseNormalCdf } from './numeric'
import { standardNormalCdf } from '../distributionMath'

const tool = (id: string): ToolSpec => {
  const spec = toolById(id)
  if (!spec) throw new Error(`no tool ${id}`)
  return spec
}
const run = (id: string, input: unknown = {}) => runTool(tool(id), input)

describe('the registry holds every tool to one job (R9)', () => {
  it.each(TOOLS.map(t => [t.id, t] as const))('%s', (_id, spec) => {
    expect(spec.id).toMatch(/^[a-z]+\.[a-z_]+$/)
    expect(AREAS.map(a => a.id)).toContain(spec.area)
    // One question, asked as a question.
    expect(spec.answers.trim().endsWith('?')).toBe(true)
    // At most six scalar inputs, at most three headline results.
    expect(spec.fields.filter(f => f.kind === 'number' || f.kind === 'choice').length).toBeLessThanOrEqual(6)
    const result = runTool(spec, {})
    expect(result.tiles.length).toBeLessThanOrEqual(3)
    // A grid tool's grid is one of its table fields.
    if (spec.grid) expect(spec.fields.find(f => f.key === spec.grid)?.kind).toBe('table')
    // Every handoff leads to a tool that exists, and builds an input it accepts.
    for (const next of spec.next ?? []) {
      const target = tool(next.tool)
      const output = spec.compute(defaultInput(spec))
      expect(() => normalizeInput(target, { ...defaultInput(target), ...next.build(defaultInput(spec), output) })).not.toThrow()
    }
    // The method names concept pages.
    expect(spec.method.concepts.length).toBeGreaterThan(0)
  })

  it('has unique ids and slugs that find their tool', () => {
    expect(new Set(TOOLS.map(t => t.id)).size).toBe(TOOLS.length)
    for (const t of TOOLS) expect(toolBySlug(toolSlug(t))).toBe(t)
    expect(toolSlug(tool('reserving.chain_ladder'))).toBe('chain-ladder')
  })

  it('describes every tool with a JSON schema whose defaults it accepts', () => {
    for (const t of TOOLS) {
      const d = describeTool(t)
      expect(d.input_schema.type).toBe('object')
      expect(Object.keys(d.input_schema.properties as object)).toEqual(t.fields.map(f => f.key))
      expect(() => runTool(t, defaultInput(t))).not.toThrow()
    }
  })
})

describe('the envelope', () => {
  it('hashes the normalised input, so key order and spelling do not change it', () => {
    const a = run('finance.annuity', { payment: 100, n: 10, i: 0.05, timing: 'immediate' })
    const b = run('finance.annuity', { timing: 'Immediate', i: '5%', n: '10', payment: '$100' })
    expect(a.inputHash).toBe(b.inputHash)
    expect(a.inputHash).toMatch(/^sha256:[0-9a-f]{64}$/)
    expect(run('finance.annuity', { payment: 101 }).inputHash).not.toBe(a.inputHash)
  })

  it('marks a judgment left at its default, and one that was chosen', () => {
    const left = run('reserving.age_to_age_factors')
    expect(left.judgments).toEqual([expect.objectContaining({ field: 'average', default: true, value: 'volume_all' })])
    const chosen = run('reserving.age_to_age_factors', { average: 'simple_all' })
    expect(chosen.judgments[0]).toMatchObject({ default: false, value: 'simple_all' })
  })

  it('names an unknown field rather than silently using it', () => {
    expect(run('finance.annuity', { rate: 0.05 }).warnings[0]).toMatch(/Ignored "rate"/)
  })

  it('answers a bad input with an error that says how to fix it', () => {
    expect(() => run('finance.annuity', { i: 5 })).toThrow(ToolInputError)
    expect(() => run('finance.annuity', { i: 5 })).toThrow(/write 0.05 or "5%"/)
    expect(() => run('finance.annuity', { n: 2.5 })).toThrow(/whole number/)
    expect(() => run('finance.annuity', { timing: 'sometimes' })).toThrow(/one of: immediate, due/)
    expect(() => run('reserving.chain_ladder', { rows: [{ origin: 'x', latest: 'lots', cdf: 1 }] })).toThrow(/"latest" must be a number/)
  })
})

describe('sha256', () => {
  it('matches the published test vectors', () => {
    expect(sha256Hex('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
    expect(sha256Hex('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
    expect(sha256Hex('a'.repeat(1000))).toBe('41edece42d63e8d9bf515a9ba6932e1c20cbc9f5a5d134645adb5db1b9737ea3')
  })

  it('canonicalises object key order', () => {
    expect(canonicalJson({ b: 1, a: [1, { d: 2, c: 3 }] })).toBe('{"a":[1,{"c":3,"d":2}],"b":1}')
  })
})

describe('Interest Converter', () => {
  it('converts every form back to the same effective rate', () => {
    const base = run('finance.interest_converter', { form: 'effective_interest', rate: 0.06, m: 4 }).values
    for (const [form, rate] of [
      ['effective_discount', base.d],
      ['nominal_interest', base.nominal_interest],
      ['nominal_discount', base.nominal_discount],
      ['force', base.delta],
    ] as const) {
      const back = run('finance.interest_converter', { form, rate, m: 4 }).values
      expect(back.i as number).toBeCloseTo(0.06, 12)
    }
    expect(base.d as number).toBeCloseTo(0.06 / 1.06, 12)
    expect(base.delta as number).toBeCloseTo(Math.log(1.06), 12)
  })

  it('refuses a discount rate that leaves nothing', () => {
    expect(() => run('finance.interest_converter', { form: 'effective_discount', rate: 1 })).toThrow(/below 1/)
  })
})

describe('Annuity', () => {
  it('values an annuity-immediate and its due counterpart', () => {
    const imm = run('finance.annuity', { payment: 100, n: 10, i: 0.05 }).values
    expect(imm.annuity_factor as number).toBeCloseTo((1 - 1.05 ** -10) / 0.05, 12)
    expect(imm.present_value as number).toBeCloseTo(772.1735, 3)
    const due = run('finance.annuity', { payment: 100, n: 10, i: 0.05, timing: 'due' }).values
    expect(due.present_value as number).toBeCloseTo((imm.present_value as number) * 1.05, 9)
    // The accumulated value is the present value carried n periods forward.
    expect(imm.accumulated_value as number).toBeCloseTo((imm.present_value as number) * 1.05 ** 10, 9)
  })

  it('reduces to n payments at a zero rate', () => {
    expect(run('finance.annuity', { payment: 50, n: 4, i: 0 }).values.present_value).toBe(200)
  })
})

describe('Present Value', () => {
  it('agrees with an annuity on level flows', () => {
    const flows = Array.from({ length: 10 }, (_, k) => ({ time: k + 1, amount: 100 }))
    const pv = run('finance.present_value', { i: 0.05, flows }).values.present_value as number
    expect(pv).toBeCloseTo(run('finance.annuity', { payment: 100, n: 10, i: 0.05 }).values.present_value as number, 9)
  })
})

describe('Age-to-Age Factors', () => {
  const triangle = {
    origins: ['2021', '2022', '2023'],
    ages: [12, 24, 36],
    values: [[1000, 1500, 1650], [1100, 1700, null], [1200, null, null]],
  }

  it('takes each average the way it is defined', () => {
    const pairs = factorsAt({ ...triangle, values: triangle.values }, 0)
    expect(pairs.map(p => p.factor)).toEqual([1.5, 1700 / 1100])
    expect(averageFactor(pairs, 'volume_all')).toBeCloseTo(3200 / 2100, 12)
    expect(averageFactor(pairs, 'simple_all')).toBeCloseTo((1.5 + 1700 / 1100) / 2, 12)
    expect(averageFactor(pairs, 'geometric_all')).toBeCloseTo(Math.sqrt(1.5 * (1700 / 1100)), 12)
    const five = [1.1, 1.3, 1.2, 1.5, 1.0].map(f => ({ factor: f, from: 100, to: 100 * f }))
    // Medial: drop the highest and lowest of the latest five.
    expect(averageFactor(five, 'medial_5')).toBeCloseTo((1.1 + 1.3 + 1.2) / 3, 12)
    expect(averageFactor(five, 'simple_3')).toBeCloseTo((1.2 + 1.5 + 1.0) / 3, 12)
  })

  it('says when a factor rests on one origin', () => {
    const out = run('reserving.age_to_age_factors', { triangle })
    expect(out.values.averages).toEqual([3200 / 2100, 1.1])
    expect(out.warnings).toEqual(['The 24–36 factor rests on one origin.'])
  })

  it('reads a bare matrix, and refuses a triangle with a hole', () => {
    expect(() => run('reserving.age_to_age_factors', { triangle: triangle.values })).not.toThrow()
    expect(() => run('reserving.age_to_age_factors', { triangle: [[1, null, 3], [1, 2, null]] })).toThrow(/without gaps/)
  })

  it('hands its averages to Development to Ultimate', () => {
    const spec = tool('reserving.age_to_age_factors')
    const input = normalizeInput(spec, { triangle }).input
    const built = spec.next![0].build(input, spec.compute(input))
    const cdfs = run('reserving.development_to_ultimate', built).values.cdfs as number[]
    expect(cdfs[0]).toBeCloseTo((3200 / 2100) * 1.1, 12)
    expect(cdfs[2]).toBe(1)
  })
})

describe('Development to Ultimate', () => {
  it('multiplies the factors from each age, then the tail', () => {
    const out = run('reserving.development_to_ultimate', {
      tail: 1.05,
      factors: [{ age: 12, factor: 2 }, { age: 24, factor: 1.5 }, { age: 36, factor: null }],
    })
    expect(out.values.cdfs).toEqual([2 * 1.5 * 1.05, 1.5 * 1.05, 1.05])
    expect(out.judgments[0]).toMatchObject({ field: 'tail', default: false })
  })

  it('allows a blank factor only on the last age', () => {
    expect(() => run('reserving.development_to_ultimate', { factors: [{ age: 12, factor: null }, { age: 24, factor: 1.1 }] })).toThrow(/Only the last age/)
  })
})

describe('Chain Ladder, Expected Claims and Bornhuetter-Ferguson', () => {
  const rows = [
    { origin: '2021', latest: 1650, cdf: 1, expected: 1700 },
    { origin: '2022', latest: 1700, cdf: 1.1, expected: 1850 },
    { origin: '2023', latest: 1200, cdf: (3200 / 2100) * 1.1, expected: 1950 },
  ]

  it('develops the latest values to ultimate', () => {
    const out = run('reserving.chain_ladder', { rows })
    expect((out.values.ultimate as number[])[1]).toBeCloseTo(1870, 9)
    expect(out.values.reserve_label).toBe('IBNR')
    expect(run('reserving.chain_ladder', { rows, basis: 'paid' }).values.reserve_label).toBe('Unpaid')
  })

  it('reproduces the BF worked through in docs/actuarial-tools.md §7.3', () => {
    const out = run('reserving.bornhuetter_ferguson', { rows })
    expect(out.values.total_ultimate as number).toBeCloseTo(5504.83, 2)
    expect(out.values.total_reserve as number).toBeCloseTo(954.83, 2)
    expect((out.values.percent_unreported as number[])[2]).toBeCloseTo(0.4034, 4)
  })

  it('equals chain ladder when expected claims are the chain-ladder ultimate', () => {
    const cl = run('reserving.chain_ladder', { rows }).values.ultimate as number[]
    const bf = run('reserving.bornhuetter_ferguson', { rows: rows.map((r, k) => ({ ...r, expected: cl[k] })) }).values.ultimate as number[]
    bf.forEach((u, k) => expect(u).toBeCloseTo(cl[k], 9))
  })

  it('sets expected claims at the ELR times premium', () => {
    const out = run('reserving.expected_claims', { elr: 0.7, rows: [{ origin: 'a', premium: 1000 }] })
    expect(out.values.total_expected).toBeCloseTo(700, 12)
    expect(out.judgments[0]).toMatchObject({ field: 'elr', default: false })
  })
})

describe('Loss Ratio Method', () => {
  it('indicates the change from the loss, expense and profit ratios', () => {
    const out = run('ratemaking.loss_ratio_method', { loss_ratio: 0.65, fixed: 0.05, variable: 0.2, profit: 0.05 })
    expect(out.values.indicated_change as number).toBeCloseTo(0.7 / 0.75 - 1, 12)
    expect(out.values.variable_permissible_loss_ratio as number).toBeCloseTo(0.75, 12)
  })

  it('refuses expenses and profit that leave no room', () => {
    expect(() => run('ratemaking.loss_ratio_method', { variable: 0.6, profit: 0.4 })).toThrow(/below 100%/)
  })
})

describe('Credibility', () => {
  it('gives the classical 1,082-claim standard at p = 90%, k = 5%', () => {
    const out = run('credibility.full_credibility_standard', { p: 0.9, k: 0.05 })
    expect(out.values.z as number).toBeCloseTo(1.644854, 6)
    expect(out.values.standard as number).toBeCloseTo(1082.217, 3)
  })

  it('scales the standard for severity and pure premium', () => {
    const n0 = run('credibility.full_credibility_standard').values.n0 as number
    expect(run('credibility.full_credibility_standard', { basis: 'severity', cv: 2 }).values.standard as number).toBeCloseTo(n0 * 4, 9)
    expect(run('credibility.full_credibility_standard', { basis: 'pure_premium', cv: 2 }).values.standard as number).toBeCloseTo(n0 * 5, 9)
  })

  it('applies the square-root rule, capped at one', () => {
    expect(run('credibility.partial_credibility', { claims: 270.5, standard: 1082 }).values.z as number).toBeCloseTo(0.5, 12)
    expect(run('credibility.partial_credibility', { claims: 5000, standard: 1082 }).values.z).toBe(1)
  })

  it('inverts the normal CDF to machine precision', () => {
    for (const p of [1e-6, 0.01, 0.3, 0.5, 0.95, 0.999999]) expect(standardNormalCdf(inverseNormalCdf(p))).toBeCloseTo(p, 12)
  })
})

describe('run links', () => {
  it('round-trips an input through the URL fragment, unicode included', async () => {
    const { decodeRunInput, encodeRunInput, runPath } = await import('./share')
    const input = { rows: [{ origin: 'AY 2023 — Δ', latest: 1200.5, cdf: null }] }
    expect(decodeRunInput(`#input=${encodeRunInput(input)}`)).toEqual(input)
    expect(runPath('chain-ladder', input)).toMatch(/^\/tools\/chain-ladder#input=[A-Za-z0-9_-]+$/)
    expect(decodeRunInput('#input=!!')).toBeNull()
    expect(decodeRunInput('')).toBeNull()
  })
})
