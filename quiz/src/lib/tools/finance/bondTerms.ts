import { ToolInputError, type NumberField, type ToolInput } from '../types'

/** A level-coupon bond's terms, as the three bond tools take them. */
export const FACE: NumberField = { kind: 'number', key: 'face', label: 'Face amount', symbol: 'F', unit: 'money', min: 0.01, max: 1e12, sliderMax: 10000, step: 100, default: 1000, description: 'The face (par) amount coupons are paid on.' }
export const COUPON: NumberField = { kind: 'number', key: 'coupon', label: 'Coupon rate', symbol: 'r', unit: 'percent', min: 0, max: 1, sliderMax: 0.2, step: 0.0025, default: 0.06, description: 'The annual coupon rate, nominal: 0.08 with two coupons a year pays 4% of face each half-year.' }
export const REDEMPTION: NumberField = { kind: 'number', key: 'redemption', label: 'Redemption value', symbol: 'C', unit: 'money', min: 0, max: 1e12, sliderMax: 10000, step: 100, default: 1000, description: 'What the bond pays at maturity (the face amount, for a bond redeemable at par).' }
export const YEARS: NumberField = { kind: 'number', key: 'years', label: 'Years to maturity', symbol: 'T', unit: 'years', min: 0.01, max: 200, sliderMax: 40, step: 0.5, default: 10, description: 'The term in years; with m coupons a year, T × m must be a whole number of coupons.' }
export const FREQUENCY: NumberField = { kind: 'number', key: 'm', label: 'Coupons a year', symbol: 'm', unit: 'count', integer: true, min: 1, max: 12, sliderMax: 12, step: 1, default: 2, description: 'How many coupons a year (2 for semiannual).' }
export const YIELD: NumberField = {
  kind: 'number', key: 'yield', label: 'Yield, convertible m-thly', symbol: 'i⁽ᵐ⁾', unit: 'percent', min: -0.5, max: 2, sliderMax: 0.2, step: 0.0025, default: 0.05,
  description: 'The annual nominal yield, convertible as often as the coupons are paid: 0.10 with two coupons a year is 5% a half-year. For an annual effective yield i, give m[(1 + i)^(1/m) − 1].',
}

export interface BondTerms {
  F: number
  r: number
  C: number
  m: number
  /** Coupons to maturity. */
  N: number
  /** The coupon, Fr/m. */
  coupon: number
}

export function bondTerms(input: ToolInput): BondTerms {
  const F = Number(input.face)
  const r = Number(input.coupon)
  const m = Number(input.m)
  const years = Number(input.years)
  const N = Math.round(years * m)
  if (Math.abs(years * m - N) > 1e-9 || N < 1) {
    throw new ToolInputError('years', `${years} years at ${m} coupon${m === 1 ? '' : 's'} a year isn't a whole number of coupons.`)
  }
  return { F, r, C: Number(input.redemption), m, N, coupon: (F * r) / m }
}

/** The price at a yield per coupon period j: Fr/m · a⌉N + C vᴺ. */
export function bondPriceAt(t: BondTerms, j: number): number {
  const v = 1 / (1 + j)
  const a = j === 0 ? t.N : (1 - v ** t.N) / j
  return t.coupon * a + t.C * v ** t.N
}
