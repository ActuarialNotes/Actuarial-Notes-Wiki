import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
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
import { lossModel } from './distributions/lossModels'
import { dateOfYear, decimalYear, parseDate } from './dates'
import { standardNormalCdf } from '../distributionMath'

const VAULT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')

const tool = (id: string): ToolSpec => {
  const spec = toolById(id)
  if (!spec) throw new Error(`no tool ${id}`)
  return spec
}
const run = (id: string, input: unknown = {}) => runTool(tool(id), input)

/** Every combination of a tool's choice fields' values (each choice's options, crossed). */
function choiceSettings(spec: ToolSpec): Record<string, string>[] {
  let settings: Record<string, string>[] = [{}]
  for (const f of spec.fields) {
    if (f.kind !== 'choice') continue
    settings = settings.flatMap(s => f.options.map(o => ({ ...s, [f.key]: o.value })))
  }
  return settings
}

describe('the registry holds every tool to one job (R9)', () => {
  it.each(TOOLS.map(t => [t.id, t] as const))('%s', (_id, spec) => {
    expect(spec.id).toMatch(/^[a-z]+\.[a-z_]+$/)
    expect(AREAS.map(a => a.id)).toContain(spec.area)
    // One question, asked as a question.
    expect(spec.answers.trim().endsWith('?')).toBe(true)
    // At most six scalar inputs on the card at once — whichever choices are
    // made, counting a field only while its `showWhen` draws it — and at most
    // three headline results.
    for (const setting of choiceSettings(spec)) {
      const shown = spec.fields.filter(f => (f.kind === 'number' || f.kind === 'choice' || f.kind === 'date') && (!f.showWhen || f.showWhen.in.includes(setting[f.showWhen.field])))
      expect(shown.length, JSON.stringify(setting)).toBeLessThanOrEqual(6)
    }
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

  it('names concept pages and readings the vault has', () => {
    for (const t of TOOLS) {
      for (const c of t.method.concepts) expect(existsSync(path.join(VAULT, 'Concepts', `${c}.md`)), `${t.id}: Concepts/${c}.md`).toBe(true)
      for (const r of t.method.readings) expect(existsSync(path.join(VAULT, 'Resources/Books', `${r.resource}.md`)), `${t.id}: ${r.resource}`).toBe(true)
    }
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
    expect(left.judgments).toEqual([
      expect.objectContaining({ field: 'average', default: true, value: 'volume' }),
      expect.objectContaining({ field: 'latest', default: true, value: 0 }),
    ])
    const chosen = run('reserving.age_to_age_factors', { average: 'simple' })
    expect(chosen.judgments[0]).toMatchObject({ default: false, value: 'simple' })
    expect(chosen.judgments[1]).toMatchObject({ default: true })
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

describe('Internal Rate of Return', () => {
  it('finds the rate that zeroes the flows, and inverts Present Value', () => {
    const flows = [{ time: 0, amount: -1000 }, { time: 1, amount: 300 }, { time: 2, amount: 400 }, { time: 3, amount: 500 }]
    const irr = run('finance.internal_rate_of_return', { flows }).values.irr as number
    const pv = run('finance.present_value', { i: irr, flows: flows.slice(1) }).values.present_value as number
    expect(pv).toBeCloseTo(1000, 8)
  })

  it('names every root when there is more than one', () => {
    // −100, +230, −132: NPV = 0 at 10% and at 20%.
    const out = run('finance.internal_rate_of_return', { flows: [{ time: 0, amount: -100 }, { time: 1, amount: 230 }, { time: 2, amount: -132 }] })
    expect((out.values.rates as number[]).map(r => Number(r.toFixed(10)))).toEqual([0.1, 0.2])
    expect(out.warnings[0]).toMatch(/2 rates/)
  })

  it('refuses flows all one way', () => {
    expect(() => run('finance.internal_rate_of_return', { flows: [{ time: 0, amount: 100 }, { time: 1, amount: 100 }] })).toThrow(/at least one payment out/)
  })
})

describe('Loan Schedule', () => {
  it('repays a level loan to exactly zero, the principal summing to the loan', () => {
    const out = run('finance.loan_schedule', { amount: 10000, i: 0.05, n: 10 })
    expect(out.values.payment as number).toBeCloseTo(10000 / ((1 - 1.05 ** -10) / 0.05), 9)
    expect((out.values.balance as number[])[9]).toBe(0)
    expect((out.values.principal as number[]).reduce((s, p) => s + p, 0)).toBeCloseTo(10000, 8)
  })

  it('ends a given payment with a drop payment, and refuses one below the interest', () => {
    const out = run('finance.loan_schedule', { amount: 1000, i: 0.1, payment: 300, n: 0 })
    expect(out.values.final_payment as number).toBeLessThan(300)
    expect(() => run('finance.loan_schedule', { amount: 1000, i: 0.1, payment: 100, n: 0 })).toThrow(/never repaid/)
  })
})

describe('Bonds', () => {
  const terms = { face: 1000, coupon: 0.06, redemption: 1000, years: 10, m: 2 }

  it('prices a bond at par when it yields its coupon rate', () => {
    expect(run('finance.bond_price', { ...terms, yield: 0.06 }).values.price as number).toBeCloseTo(1000, 9)
  })

  it('finds the yield a price gives, inverting Bond Price', () => {
    const price = run('finance.bond_price', { ...terms, yield: 0.0725 }).values.price as number
    expect(run('finance.bond_yield', { ...terms, price }).values.nominal_yield as number).toBeCloseTo(0.0725, 10)
  })

  it('amortizes the book value from the price to the redemption value', () => {
    const out = run('finance.bond_amortization', { ...terms, yield: 0.05 })
    const book = out.values.book_value as number[]
    expect(book[book.length - 1]).toBe(1000)
    expect(out.values.price as number).toBeCloseTo(run('finance.bond_price', { ...terms, yield: 0.05 }).values.price as number, 9)
  })

  it('refuses a term that is not a whole number of coupons', () => {
    expect(() => run('finance.bond_price', { ...terms, years: 10.25 })).toThrow(/whole number of coupons/)
  })
})

describe('Duration & Convexity, and Redington Immunization', () => {
  it('gives a zero-coupon bond its maturity as duration', () => {
    const out = run('finance.duration_convexity', { i: 0.05, flows: [{ time: 7, amount: 100 }] })
    expect(out.values.macaulay as number).toBeCloseTo(7, 12)
    expect(out.values.modified as number).toBeCloseTo(7 / 1.05, 12)
    expect(out.values.convexity as number).toBeCloseTo((7 * 8) / 1.05 ** 2, 12)
  })

  it('finds the default portfolio immunized, and says which condition fails when it is not', () => {
    expect(run('finance.redington_immunization').values.immunized).toBe(true)
    const off = run('finance.redington_immunization', { flows: [{ time: 2, asset: 10000, liability: 10000 }] })
    expect(off.values.immunized).toBe(false)
    expect(off.warnings[0]).toMatch(/convexity/)
  })
})

describe('Loss distributions', () => {
  /** ∫₀ᵘ S(x) dx by composite Simpson: the definition the closed forms must agree with. */
  const integrate = (S: (x: number) => number, u: number, n = 20000) => {
    const h = u / n
    let sum = S(0) + S(u)
    for (let k = 1; k < n; k++) sum += S(k * h) * (k % 2 ? 4 : 2)
    return (sum * h) / 3
  }
  const models: Record<string, Record<string, number | string>> = {
    exponential: { family: 'exponential', theta: 1000 },
    uniform: { family: 'uniform', a: 200, b: 1800 },
    pareto: { family: 'pareto', alpha: 3, theta: 2000 },
    single_pareto: { family: 'single_pareto', alpha: 2.5, theta: 300 },
    gamma: { family: 'gamma', alpha: 2.5, theta: 400 },
    lognormal: { family: 'lognormal', mu: 6.5, sigma: 0.8 },
    weibull: { family: 'weibull', tau: 1.7, theta: 900 },
  }

  it.each(Object.entries(models))('holds the %s limited expected value to ∫ S(x) dx', (_name, params) => {
    const spec = tool('distributions.limited_expected_value')
    const model = lossModel(normalizeInput(spec, params).input)
    for (const u of [150, 700, 2500]) {
      expect(run('distributions.limited_expected_value', { ...params, u }).values.lev as number).toBeCloseTo(integrate(model.survival, u), 2)
    }
  })

  it('pays a franchise deductible back on every paid loss', () => {
    const base = { family: 'exponential', theta: 1000, deductible: 500 }
    const ordinary = run('distributions.expected_payment', base).values
    const franchise = run('distributions.expected_payment', { ...base, type: 'franchise' }).values
    expect(franchise.per_loss as number).toBeCloseTo((ordinary.per_loss as number) + 500 * Math.exp(-0.5), 9)
    // Memoryless: the ordinary per-payment mean is the mean itself.
    expect(ordinary.per_payment as number).toBeCloseTo(1000, 9)
  })

  it('caps the payment at the maximum covered loss, and refuses one below the deductible', () => {
    const capped = run('distributions.expected_payment', { family: 'uniform', a: 0, b: 1000, deductible: 200, limit: 600 }).values
    // ∫₂₀₀⁶⁰⁰ (1000 − x)/1000 dx = 400 − (600² − 200²)/2000 = 240.
    expect(capped.per_loss as number).toBeCloseTo(240, 9)
    expect(() => run('distributions.expected_payment', { deductible: 500, limit: 400 })).toThrow(/above the deductible/)
  })

  it('inverts the distribution function for its quantile', () => {
    for (const input of [{ family: 'normal', mu: 3, sigma: 2 }, { family: 'gamma', alpha: 3, theta: 2 }, { family: 'lognormal', mu: 0, sigma: 1 }]) {
      const q = run('distributions.distribution', { ...input, q: 0.9 }).values.quantile as number
      expect(run('distributions.distribution', { ...input, x: q }).values.cdf as number).toBeCloseTo(0.9, 9)
    }
    // A count's quantile is the smallest k with F(k) ≥ q.
    expect(run('distributions.distribution', { family: 'binomial', n: 2, p: 0.5, q: 0.75 }).values.quantile).toBe(1)
  })
})

describe('Bühlmann Credibility', () => {
  it('weights the risk by n / (n + EPV / VHM)', () => {
    const out = run('credibility.buhlmann_credibility', { epv: 100, vhm: 25, exposure: 4, observed: 80, prior: 50 }).values
    expect(out.k).toBe(4)
    expect(out.z).toBe(0.5)
    expect(out.estimate).toBe(65)
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
    expect(averageFactor(pairs, 'volume')).toBeCloseTo(3200 / 2100, 12)
    expect(averageFactor(pairs, 'simple')).toBeCloseTo((1.5 + 1700 / 1100) / 2, 12)
    expect(averageFactor(pairs, 'geometric')).toBeCloseTo(Math.sqrt(1.5 * (1700 / 1100)), 12)
    // Latest n takes the most recent origins; asking for more than there are takes them all.
    expect(averageFactor(pairs, 'volume', 1)).toBeCloseTo(1700 / 1100, 12)
    expect(averageFactor(pairs, 'volume', 9)).toBeCloseTo(3200 / 2100, 12)
    const five = [1.1, 1.3, 1.2, 1.5, 1.0].map(f => ({ factor: f, from: 100, to: 100 * f }))
    // Medial: drop the highest and lowest of the latest five.
    expect(averageFactor(five, 'medial', 5)).toBeCloseTo((1.1 + 1.3 + 1.2) / 3, 12)
    expect(averageFactor(five, 'simple', 3)).toBeCloseTo((1.2 + 1.5 + 1.0) / 3, 12)
    // Medial over two factors is their simple mean (Friedland, Chapter 7, Exhibit I's footnote).
    expect(averageFactor(five, 'medial', 2)).toBeCloseTo((1.5 + 1.0) / 2, 12)
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

describe('Benktander, Cape Cod and Ratio Triangle', () => {
  const rows = [
    { origin: '2021', latest: 1650, cdf: 1, expected: 1700, premium: 2500 },
    { origin: '2022', latest: 1700, cdf: 1.1, expected: 1850, premium: 2600 },
    { origin: '2023', latest: 1200, cdf: 1.6, expected: 1950, premium: 2700 },
  ]

  it('is the B-F after one iteration, and approaches the chain ladder after many', () => {
    const bf = run('reserving.bornhuetter_ferguson', { rows }).values.ultimate as number[]
    const one = run('reserving.benktander', { rows, iterations: 1 }).values.ultimate as number[]
    one.forEach((u, k) => expect(u).toBeCloseTo(bf[k], 9))
    const cl = run('reserving.chain_ladder', { rows }).values.ultimate as number[]
    const many = run('reserving.benktander', { rows, iterations: 100 }).values.ultimate as number[]
    many.forEach((u, k) => expect(u).toBeCloseTo(cl[k], 6))
  })

  it('takes its claim ratio from the data: latest claims over used-up premium', () => {
    const out = run('reserving.cape_cod', { rows }).values
    const elr = (1650 + 1700 + 1200) / (2500 + 2600 / 1.1 + 2700 / 1.6)
    expect(out.elr as number).toBeCloseTo(elr, 12)
    expect((out.ultimate as number[])[2]).toBeCloseTo(1200 + elr * 2700 * (1 - 1 / 1.6), 9)
  })

  it('divides two triangles of one shape cell by cell, and refuses two of different shapes', () => {
    const out = run('reserving.ratio_triangle')
    expect((out.values.ratios as (number | null)[][])[0][0]).toBeCloseTo(0.4, 12)
    expect((out.values.ratios as (number | null)[][])[2][1]).toBeNull()
    expect(() => run('reserving.ratio_triangle', { numerator: [[1, 2], [3, null]], denominator: [[1, 2, 3], [4, 5, null], [6, null, null]] })).toThrow(/same shape/)
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

describe('dates', () => {
  it('reads ISO, US and the texts\' two-digit years, and refuses what is not a date', () => {
    expect(parseDate('2017-01-01')).toEqual({ y: 2017, m: 1, d: 1 })
    expect(parseDate('04/01/2011')).toEqual({ y: 2011, m: 4, d: 1 })
    expect(parseDate('10/01/10')).toEqual({ y: 2010, m: 10, d: 1 })
    expect(parseDate('02/30/2016')).toBeNull()
    expect(parseDate('soon')).toBeNull()
  })

  it('measures time in months, as the ratemaking texts do', () => {
    expect(decimalYear(parseDate('2011-04-01')!)).toBe(2011.25)
    expect(decimalYear(parseDate('2015-07-01')!)).toBe(2015.5)
    expect(dateOfYear(2017.75)).toBe('2017-10-01')
  })
})

describe('Ratemaking', () => {
  it('earns a calendar year\'s premium by the parallelogram', () => {
    // A 5% change on 1 April, annual policies: 0.75² / 2 of the year's premium earns at the new rate.
    const out = run('ratemaking.on_level_factors', { changes: [{ date: '2023-04-01', change: 0.05 }], term: 12, first: 2023, last: 2024 }).values
    expect((out.portions as number[][])[0][1]).toBeCloseTo(0.75 ** 2 / 2, 12)
    expect((out.factors as number[])[0]).toBeCloseTo(1.05 / (1 - 0.75 ** 2 / 2 + 1.05 * (0.75 ** 2 / 2)), 12)
    // By policy year the change is in for the policies written after it: three-quarters of the year.
    const py = run('ratemaking.on_level_factors', { changes: [{ date: '2023-04-01', change: 0.05 }], basis: 'policy', first: 2023, last: 2023 }).values
    expect((py.portions as number[][])[0][1]).toBeCloseTo(0.75, 12)
  })

  it('splits written premium into earned and unearned, year by year', () => {
    const out = run('ratemaking.earned_premium', { term: 12, policies: [{ policy: 'A', effective: '2023-07-01', amount: 1200 }] }).values
    expect(out.years).toEqual([2023, 2024])
    expect(out.earned).toEqual([600, 600])
    expect(out.unearned).toEqual([600, 0])
  })

  it('fits an exponential trend exactly to a series growing at a constant rate', () => {
    const points = Array.from({ length: 8 }, (_, k) => ({ period: `Q${k}`, value: 100 * 1.04 ** (k / 4) }))
    const out = run('ratemaking.trend_fit', { points }).values
    expect(out.trend as number).toBeCloseTo(0.04, 12)
    expect(out.r2 as number).toBeCloseTo(1, 12)
    expect(run('ratemaking.trend_fit', { points, latest: 4 }).values.points).toBe(4)
  })

  it('trends from the experience period\'s average accident date to the future one', () => {
    const ay = run('ratemaking.trend_factor', { trend: 0.05, year: 2023, effective: '2025-01-01', in_effect: 12, term: 12 }).values
    expect(ay.period).toBeCloseTo(2.5, 12)
    expect(ay.factor as number).toBeCloseTo(1.05 ** 2.5, 12)
    // A policy year's losses happen half a term later than the year's middle.
    expect(run('ratemaking.trend_factor', { trend: 0.05, basis: 'policy', year: 2023, effective: '2025-01-01', in_effect: 12, term: 12 }).values.period).toBeCloseTo(2, 12)
  })

  it('splits each expense type into its fixed and variable provisions', () => {
    const out = run('ratemaking.expense_ratios', { rows: [{ type: 'a', expenses: 10, premium: 100, fixed_share: 0.75 }, { type: 'b', expenses: 5, premium: 50, fixed_share: 0 }] }).values
    expect(out.fixed_provision as number).toBeCloseTo(0.075, 12)
    expect(out.variable_provision as number).toBeCloseTo(0.125, 12)
  })

  it('agrees with the Loss Ratio Method on the permissible loss ratio, and prices by the pure premium', () => {
    const plr = run('ratemaking.permissible_loss_ratio', { fixed: 0.05, variable: 0.2, profit: 0.05 }).values
    expect(plr.variable_permissible_loss_ratio).toBeCloseTo(run('ratemaking.loss_ratio_method', { variable: 0.2, profit: 0.05 }).values.variable_permissible_loss_ratio as number, 12)
    expect(plr.permissible_loss_ratio as number).toBeCloseTo(0.7, 12)
    const pp = run('ratemaking.pure_premium_method', { pure_premium: 300, fixed: 50, variable: 0.2, profit: 0.05, current: 400 }).values
    expect(pp.indicated_rate as number).toBeCloseTo(350 / 0.75, 12)
    expect(pp.indicated_change as number).toBeCloseTo(350 / 0.75 / 400 - 1, 12)
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

describe('arithmetic in a cell (§6.6)', () => {
  it('reads sums, products, powers, brackets and percents', async () => {
    const { readNumber, evaluateArithmetic } = await import('./input')
    expect(readNumber('1700*1.05', false)).toBeCloseTo(1785)
    expect(readNumber('=1850/1.1', false)).toBeCloseTo(1681.818181)
    expect(readNumber('1,000 + 250', false)).toBe(1250)
    expect(readNumber('(1+5%)^2', false)).toBeCloseTo(1.1025)
    expect(readNumber('2×3−1', false)).toBe(5)
    expect(readNumber('-2^2', false)).toBe(-4)
    expect(readNumber('5%', true)).toBe(0.05)
    expect(evaluateArithmetic('1/0')).toBeNull()
    expect(evaluateArithmetic('lots')).toBeNull()
    expect(evaluateArithmetic('1+')).toBeNull()
    expect(evaluateArithmetic('(1+2')).toBeNull()
    expect(evaluateArithmetic('alert(1)')).toBeNull()
  })
})
