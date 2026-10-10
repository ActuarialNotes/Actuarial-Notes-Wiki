import { formatValue } from '../format'
import type { ToolSpec } from '../types'
import { COUPON, FACE, FREQUENCY, REDEMPTION, YEARS, YIELD, bondPriceAt, bondTerms } from './bondTerms'

const MAX_ROWS = 2400

export const bondAmortization: ToolSpec = {
  id: 'finance.bond_amortization',
  version: '1.0.0',
  name: 'Bond Amortization',
  area: 'finance',
  answers: 'How does the book value move to redemption?',
  fields: [FACE, COUPON, REDEMPTION, YEARS, FREQUENCY, YIELD],
  notation: () => 'Iₖ = j · BVₖ₋₁,  BVₖ = BVₖ₋₁ − (Fr/m − Iₖ)',
  view: 'table',
  compute: input => {
    const t = bondTerms(input)
    const j = Number(input.yield) / t.m
    const price = bondPriceAt(t, j)
    let bv = price
    const rows = Array.from({ length: Math.min(t.N, MAX_ROWS) }, (_, n) => {
      const interest = bv * j
      const amortized = t.coupon - interest
      bv -= amortized
      // The last coupon date carries the bond to its redemption value; float noise shouldn't show.
      if (n === t.N - 1) bv = t.C
      return { k: n + 1, coupon: t.coupon, interest, amortized, book: bv }
    })
    const premium = price - t.C
    return {
      tiles: [
        { symbol: 'BV₀', label: 'Price', value: price, unit: 'money' },
        { symbol: 'ΣI', label: 'Interest earned', value: rows.reduce((s, r) => s + r.interest, 0), unit: 'money' },
        { symbol: premium >= 0 ? 'P − C' : 'C − P', label: premium >= 0 ? 'Premium written down' : 'Discount accumulated', value: Math.abs(premium), unit: 'money' },
      ],
      table: {
        columns: [
          { key: 'k', label: 'Coupon', kind: 'number', unit: 'count' },
          { key: 'coupon', label: 'Paid', kind: 'number', unit: 'money' },
          { key: 'interest', label: 'Interest', kind: 'number', unit: 'money', computed: true },
          { key: 'amortized', label: premium >= 0 ? 'Premium amortized' : 'Discount accumulated', kind: 'number', unit: 'money', computed: true },
          { key: 'book', label: 'Book value', kind: 'number', unit: 'money', computed: true },
        ],
        rows,
      },
      trace: [
        { label: 'Price (BV₀)', formula: `${formatValue(t.coupon, 'money')} × a⌉${t.N} + ${t.C} × v^${t.N} at j = ${j}`, result: price, unit: 'money' },
        { label: 'Interest in coupon 1', formula: `${formatValue(price, 'money')} × ${j}`, result: rows[0].interest, unit: 'money' },
        { label: 'Amortization in coupon 1', formula: `${formatValue(t.coupon, 'money')} − I₁`, result: rows[0].amortized, unit: 'money' },
      ],
      warnings: t.N > MAX_ROWS ? [`Only the first ${MAX_ROWS} coupons are scheduled.`] : [],
      values: {
        price,
        interest: rows.map(r => r.interest),
        amortized: rows.map(r => r.amortized),
        book_value: rows.map(r => r.book),
        yield_per_period: j,
      },
      summary: `Bought at ${formatValue(price, 'money')}, the book value moves to ${formatValue(t.C, 'money')} over ${t.N} coupons; the first coupon carries ${formatValue(rows[0].interest, 'money')} of interest.`,
    }
  },
  method: { concepts: ['Bond Amortization', 'Book Value', 'Amortization of Premium'], readings: [] },
}
