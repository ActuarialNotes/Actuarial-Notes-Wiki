import { formatValue } from '../format'
import { bisect } from '../numeric'
import { ToolInputError, type ChoiceField, type NumberField, type ToolInput, type ToolSpec } from '../types'
import { COUPON, FACE, FREQUENCY, REDEMPTION, YEARS, YIELD, bondPriceAt, type BondTerms } from './bondTerms'

/**
 * Bond Price, solved for any one of its unknowns (docs/tool-template-v3.md §3):
 * the price at a yield, the yield a price gives, the coupon rate a price and
 * yield need, or the term. One equation, P = Fr/m · a⌉N + C vᴺ at j = i⁽ᵐ⁾/m;
 * the reader picks which of its letters is the answer.
 */
type Unknown = 'price' | 'yield' | 'coupon' | 'term'

const SOLVE: ChoiceField = {
  kind: 'choice',
  key: 'solve',
  label: 'Solve for',
  description: 'Which quantity is the answer: the price (the default), the yield, the coupon rate or the term. The field for the chosen quantity is not read; every other one is.',
  options: [
    { value: 'price', label: 'Price' },
    { value: 'yield', label: 'Yield' },
    { value: 'coupon', label: 'Coupon' },
    { value: 'term', label: 'Term' },
  ],
  default: 'price',
}

const unless = (u: Unknown) => ({ field: 'solve', in: (['price', 'yield', 'coupon', 'term'] as Unknown[]).filter(x => x !== u) })

const PRICE: NumberField = {
  kind: 'number', key: 'price', label: 'Price', symbol: 'P', unit: 'money', min: 0.01, max: 1e12, sliderMax: 2000, step: 1, default: 1050,
  description: 'The price paid, on a coupon date. Read only when solving for the yield, the coupon rate or the term.',
  showWhen: unless('price'),
}

/** The term as a count of coupons, which a solved term needn't be a whole number of. */
function termsOf(input: ToolInput, N: number): BondTerms {
  const F = Number(input.face)
  const r = Number(input.coupon)
  const m = Number(input.m)
  return { F, r, C: Number(input.redemption), m, N, coupon: (F * r) / m }
}

function wholeCoupons(input: ToolInput): number {
  const m = Number(input.m)
  const years = Number(input.years)
  const N = Math.round(years * m)
  if (Math.abs(years * m - N) > 1e-9 || N < 1) {
    throw new ToolInputError('years', `${years} years at ${m} coupon${m === 1 ? '' : 's'} a year isn't a whole number of coupons.`)
  }
  return N
}

/** The yield per period at which the bond is worth P: the price falls as the yield rises, so one root is bracketed. */
function yieldFor(t: BondTerms, P: number): number {
  const f = (j: number) => bondPriceAt(t, j) - P
  if (f(-0.99) < 0) throw new ToolInputError('price', `No yield gives a price of ${formatValue(P, 'money')}: it's more than the coupons and the redemption would be worth even at −99%.`)
  let hi = 1
  while (f(hi) > 0 && hi < 1e6) hi *= 2
  if (f(hi) > 0) throw new ToolInputError('price', 'The price is too low for any yield to give it.')
  return bisect(f, -0.99, hi)
}

const annuity = (j: number, N: number) => (j === 0 ? N : (1 - (1 + j) ** -N) / j)

export const bondPrice: ToolSpec = {
  id: 'finance.bond_price',
  version: '1.1.0',
  name: 'Bond Price',
  area: 'finance',
  answers: "What's this bond worth at this yield?",
  aka: ['bond', 'price', 'coupon rate', 'term', 'solve'],
  fields: [
    SOLVE,
    FACE,
    { ...COUPON, showWhen: unless('coupon') },
    REDEMPTION,
    { ...YEARS, showWhen: unless('term') },
    FREQUENCY,
    { ...YIELD, showWhen: unless('yield') },
    PRICE,
  ],
  solveFor: 'solve',
  notation: input => {
    switch (String(input.solve ?? 'price') as Unknown) {
      case 'yield': return 'P = Fr/m · a⌉N + C · vᴺ, solved for j = i⁽ᵐ⁾/m'
      case 'coupon': return 'r = m · (P − C · vᴺ) / (F · a⌉N),  at j = i⁽ᵐ⁾/m'
      case 'term': return 'P = Fr/m · a⌉N + C · vᴺ, solved for N = T · m'
      default: return 'P = Fr/m · a⌉N + C · vᴺ,  at j = i⁽ᵐ⁾/m'
    }
  },
  view: 'none',
  compute: input => {
    const solve = String(input.solve ?? 'price') as Unknown
    const m = Number(input.m)
    const F = Number(input.face)
    const C = Number(input.redemption)
    let N: number
    let j: number
    let P: number
    let r = Number(input.coupon)
    const warnings: string[] = []
    const steps: { label: string; formula: string; result: number; unit: 'money' | 'percent' | 'count' | 'years' }[] = []

    if (solve === 'term') {
      j = Number(input.yield) / m
      P = Number(input.price)
      const c = (F * r) / m
      // P − C = (c − Cj) a⌉N, so a⌉N = (P − C)/(c − Cj), and vᴺ = 1 − j a⌉N.
      if (Math.abs(c - C * j) < 1e-12) throw new ToolInputError('price', 'The coupon equals the yield on the redemption value, so the price is C for every term: no one term gives it.')
      const a = (P - C) / (c - C * j)
      const vN = j === 0 ? NaN : 1 - j * a
      N = j === 0 ? a : -Math.log(vN) / Math.log(1 + j)
      if (!Number.isFinite(N) || N <= 0) throw new ToolInputError('price', `No term gives a price of ${formatValue(P, 'money')} at this coupon and yield.`)
      if (Math.abs(N - Math.round(N)) > 1e-6) warnings.push(`The term works out to ${N.toFixed(4)} coupons, not a whole number: a bond paying whole coupons can't have exactly this price.`)
      steps.push({ label: 'Coupons to maturity', formula: `N = −ln(1 − j · (P − C)/(Fr/m − Cj)) / ln(1 + j)`, result: N, unit: 'count' })
    } else {
      N = wholeCoupons(input)
      if (solve === 'yield') {
        P = Number(input.price)
        j = yieldFor(termsOf(input, N), P)
        steps.push({ label: 'Yield per coupon period', formula: `the j where the price is ${formatValue(P, 'money')}, by bisection`, result: j, unit: 'percent' })
      } else if (solve === 'coupon') {
        P = Number(input.price)
        j = Number(input.yield) / m
        const c = (P - C * (1 + j) ** -N) / annuity(j, N)
        if (c < 0) throw new ToolInputError('price', `A price of ${formatValue(P, 'money')} is below the redemption value alone at this yield, so no coupon gives it.`)
        r = (c * m) / F
        steps.push({ label: 'Coupon', formula: `(P − C · v^${N}) / a⌉${N}`, result: c, unit: 'money' })
      } else {
        j = Number(input.yield) / m
        P = bondPriceAt(termsOf(input, N), j)
      }
    }

    const t = termsOf({ ...input, coupon: r }, N)
    const premium = P - C
    const nominal = j * m
    const effective = (1 + j) ** m - 1
    const years = N / m
    const premiumTile = { symbol: premium >= 0 ? 'P − C' : 'C − P', label: premium >= 0 ? 'Premium' : 'Discount', value: Math.abs(premium), unit: 'money' as const }
    const tiles = solve === 'yield'
      ? [
          { symbol: 'i⁽ᵐ⁾', label: 'Nominal yield', value: nominal, unit: 'percent' as const },
          { symbol: 'i', label: 'Effective yield', value: effective, unit: 'percent' as const },
          { symbol: 'j', label: 'Yield per coupon', value: j, unit: 'percent' as const },
        ]
      : solve === 'coupon'
        ? [
            { symbol: 'r', label: 'Coupon rate', value: r, unit: 'percent' as const },
            { symbol: 'Fr/m', label: 'Coupon', value: t.coupon, unit: 'money' as const },
            premiumTile,
          ]
        : solve === 'term'
          ? [
              { symbol: 'T', label: 'Years to maturity', value: years, unit: 'years' as const },
              { symbol: 'N', label: 'Coupons', value: N, unit: 'count' as const },
              premiumTile,
            ]
          : [
              { symbol: 'P', label: 'Price', value: P, unit: 'money' as const },
              premiumTile,
              { symbol: 'j', label: 'Yield per coupon', value: j, unit: 'percent' as const },
            ]
    const pvCoupons = t.coupon * annuity(j, N)
    return {
      tiles,
      trace: [
        { label: 'Coupon', formula: `${F} × ${formatValue(r, 'percent')} / ${m}`, result: t.coupon, unit: 'money' },
        ...(solve === 'yield' ? [] : [{ label: 'Yield per coupon period', formula: `j = ${formatValue(nominal, 'percent')} / ${m}`, result: j, unit: 'percent' as const }]),
        ...steps,
        { label: 'Present value of the coupons', formula: `${formatValue(t.coupon, 'money')} × a⌉${Number(N.toFixed(4))} at j`, result: pvCoupons, unit: 'money' },
        { label: 'Present value of the redemption', formula: `${C} × v^${Number(N.toFixed(4))}`, result: C * (1 + j) ** -N, unit: 'money' },
        { label: 'Price', formula: 'sum of the two', result: P, unit: 'money' },
      ],
      warnings,
      values: {
        solve,
        price: P,
        premium,
        coupon: t.coupon,
        coupon_rate: r,
        periods: N,
        years,
        yield_per_period: j,
        nominal_yield: nominal,
        effective_yield: effective,
      },
      summary: solve === 'yield'
        ? `Yield ${formatValue(nominal, 'percent')} convertible ${m === 1 ? 'annually' : `${m} times a year`} (${formatValue(effective, 'percent')} effective) for a price of ${formatValue(P, 'money')}.`
        : solve === 'coupon'
          ? `A coupon rate of ${formatValue(r, 'percent')} (${formatValue(t.coupon, 'money')} a coupon) prices the bond at ${formatValue(P, 'money')} at ${formatValue(j, 'percent')} per coupon period.`
          : solve === 'term'
            ? `A term of ${Number(years.toFixed(4))} years (${Number(N.toFixed(4))} coupons) prices the bond at ${formatValue(P, 'money')} at ${formatValue(j, 'percent')} per coupon period.`
            : `Price ${formatValue(P, 'money')}, a ${premium >= 0 ? 'premium' : 'discount'} of ${formatValue(Math.abs(premium), 'money')} to the redemption value, at ${formatValue(j, 'percent')} per coupon period.`,
    }
  },
  method: { concepts: ['Bond Price', 'Bonds'], readings: [] },
  next: [
    {
      tool: 'finance.bond_amortization',
      label: 'Bond Amortization',
      build: (input, output) => ({ face: input.face, coupon: output.values.coupon_rate as number, redemption: input.redemption, years: output.values.years as number, m: input.m, yield: output.values.nominal_yield as number }),
    },
    {
      tool: 'finance.duration_convexity',
      label: 'Duration & Convexity',
      build: (input, output) => {
        const m = Number(input.m)
        const N = Math.round(Number(output.values.periods))
        const coupon = Number(output.values.coupon)
        const C = Number(input.redemption)
        return {
          i: Number(output.values.effective_yield),
          flows: Array.from({ length: N }, (_, k) => ({ time: (k + 1) / m, amount: coupon + (k === N - 1 ? C : 0) })),
        }
      },
    },
  ],
}
