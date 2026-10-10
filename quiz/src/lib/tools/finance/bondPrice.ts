import { formatValue } from '../format'
import type { ToolSpec } from '../types'
import { COUPON, FACE, FREQUENCY, REDEMPTION, YEARS, YIELD, bondPriceAt, bondTerms } from './bondTerms'

export const bondPrice: ToolSpec = {
  id: 'finance.bond_price',
  version: '1.0.0',
  name: 'Bond Price',
  area: 'finance',
  answers: "What's this bond worth at this yield?",
  fields: [FACE, COUPON, REDEMPTION, YEARS, FREQUENCY, YIELD],
  notation: () => 'P = Fr/m · a⌉N + C · vᴺ,  at j = i⁽ᵐ⁾/m',
  view: 'none',
  compute: input => {
    const t = bondTerms(input)
    const j = Number(input.yield) / t.m
    const P = bondPriceAt(t, j)
    const premium = P - t.C
    const pvCoupons = P - t.C * (1 + j) ** -t.N
    return {
      tiles: [
        { symbol: 'P', label: 'Price', value: P, unit: 'money' },
        { symbol: premium >= 0 ? 'P − C' : 'C − P', label: premium >= 0 ? 'Premium' : 'Discount', value: Math.abs(premium), unit: 'money' },
        { symbol: 'j', label: 'Yield per coupon', value: j, unit: 'percent' },
      ],
      trace: [
        { label: 'Coupon', formula: `${t.F} × ${t.r} / ${t.m}`, result: t.coupon, unit: 'money' },
        { label: 'Yield per coupon period', formula: `j = ${Number(input.yield)} / ${t.m}`, result: j, unit: 'percent' },
        { label: 'Present value of the coupons', formula: `${formatValue(t.coupon, 'money')} × a⌉${t.N} at j`, result: pvCoupons, unit: 'money' },
        { label: 'Present value of the redemption', formula: `${t.C} × v^${t.N}`, result: t.C * (1 + j) ** -t.N, unit: 'money' },
        { label: 'Price', formula: 'sum of the two', result: P, unit: 'money' },
      ],
      warnings: [],
      values: { price: P, premium, coupon: t.coupon, periods: t.N, yield_per_period: j, effective_yield: (1 + j) ** t.m - 1 },
      summary: `Price ${formatValue(P, 'money')}, a ${premium >= 0 ? 'premium' : 'discount'} of ${formatValue(Math.abs(premium), 'money')} to the redemption value, at ${formatValue(j, 'percent')} per coupon period.`,
    }
  },
  method: { concepts: ['Bond Price', 'Bonds'], readings: [] },
  next: [
    { tool: 'finance.bond_amortization', label: 'Bond Amortization', build: input => ({ face: input.face, coupon: input.coupon, redemption: input.redemption, years: input.years, m: input.m, yield: input.yield }) },
    {
      tool: 'finance.duration_convexity',
      label: 'Duration & Convexity',
      build: input => {
        const t = bondTerms(input)
        const j = Number(input.yield) / t.m
        return {
          i: (1 + j) ** t.m - 1,
          flows: Array.from({ length: t.N }, (_, k) => ({ time: (k + 1) / t.m, amount: t.coupon + (k === t.N - 1 ? t.C : 0) })),
        }
      },
    },
  ],
}
