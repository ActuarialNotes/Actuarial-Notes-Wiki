import { formatValue } from '../format'
import { bisect } from '../numeric'
import { ToolInputError, type NumberField, type ToolSpec } from '../types'
import { COUPON, FACE, FREQUENCY, REDEMPTION, YEARS, bondPriceAt, bondTerms } from './bondTerms'

const PRICE: NumberField = { kind: 'number', key: 'price', label: 'Price', symbol: 'P', unit: 'money', min: 0.01, max: 1e12, sliderMax: 2000, step: 1, default: 950, description: 'The price paid for the bond, on a coupon date.' }

export const bondYield: ToolSpec = {
  id: 'finance.bond_yield',
  version: '1.0.0',
  name: 'Bond Yield',
  area: 'finance',
  answers: 'What yield does this price give?',
  fields: [FACE, COUPON, REDEMPTION, YEARS, FREQUENCY, PRICE],
  notation: () => 'P = Fr/m · a⌉N + C · vᴺ, solved for j',
  view: 'none',
  compute: input => {
    const t = bondTerms(input)
    const P = Number(input.price)
    // The price falls as the yield rises, so one root lies between a yield that prices above P and one below.
    const f = (j: number) => bondPriceAt(t, j) - P
    if (f(-0.99) < 0) throw new ToolInputError('price', `No yield gives a price of ${formatValue(P, 'money')}: it's more than every coupon and the redemption together, undiscounted, would be worth even at −99%.`)
    let hi = 1
    while (f(hi) > 0 && hi < 1e6) hi *= 2
    if (f(hi) > 0) throw new ToolInputError('price', 'The price is too low for any yield to give it.')
    const j = bisect(f, -0.99, hi)
    const nominal = j * t.m
    const effective = (1 + j) ** t.m - 1
    return {
      tiles: [
        { symbol: 'i⁽ᵐ⁾', label: 'Nominal yield', value: nominal, unit: 'percent' },
        { symbol: 'i', label: 'Effective yield', value: effective, unit: 'percent' },
        { symbol: 'j', label: 'Per coupon', value: j, unit: 'percent' },
      ],
      trace: [
        { label: 'Coupon', formula: `${t.F} × ${t.r} / ${t.m}`, result: t.coupon, unit: 'money' },
        { label: 'Yield per coupon period', formula: `the j where ${formatValue(t.coupon, 'money')} a⌉${t.N} + ${t.C} v^${t.N} = ${P}, by bisection`, result: j, unit: 'percent' },
        { label: 'Nominal yield', formula: `i⁽ᵐ⁾ = ${t.m} × j`, result: nominal, unit: 'percent' },
        { label: 'Effective annual yield', formula: `(1 + j)^${t.m} − 1`, result: effective, unit: 'percent' },
      ],
      warnings: [],
      values: { yield_per_period: j, nominal_yield: nominal, effective_yield: effective, periods: t.N },
      summary: `Yield ${formatValue(nominal, 'percent')} convertible ${t.m === 1 ? 'annually' : `${t.m} times a year`} (${formatValue(effective, 'percent')} effective).`,
    }
  },
  method: { concepts: ['Bond Price', 'Yield Rate'], readings: [] },
  next: [
    { tool: 'finance.bond_price', label: 'Bond Price', build: (input, output) => ({ face: input.face, coupon: input.coupon, redemption: input.redemption, years: input.years, m: input.m, yield: output.values.nominal_yield }) },
  ],
}
