import { ToolInputError, type ToolInput, type ToolSpec } from '../types'
import { MCT_LINES } from '../filings'

/**
 * MCT Ratio (docs/osfi-tools-design.md): capital available over minimum
 * capital required, the way OSFI's Minimum Capital Test guideline builds it
 * (§1.1.1, §8.1). The risk margins are inputs, at target; the tool takes the
 * diversification credit between insurance risk and market plus credit risk,
 * the total at target, and the minimum (the total over 1.5).
 *
 * The guideline's two figures, the correlation R and the divisor, are carried
 * here, transcribed with their section (R2): the Assumptions Bank set
 * `OSFI MCT Capital Ratios (2024)` holds the same, and a test holds them equal.
 * They ride in the engine rather than being read from the bank because the
 * connector runs the engine without the bank installed.
 *
 * Tested against every MCT and BAAT ratio filed with OSFI on PC4 page 10.00,
 * Q1 2023 – Q2 2026 (`mct.test.ts`), and CAS Exam 6C Spring 2017 Q24.
 */

/** MCT guideline (2024), §8.1: the correlation between insurance risk and market plus credit risk. */
export const MCT_CORRELATION = 0.5
/** MCT guideline (2024), §1.1.1: requirements at target are divided by this to give the minimum. */
export const MCT_DIVISOR = 1.5
/** MCT guideline (2024), §1.2.1: the minimum ratio and OSFI's supervisory target. */
export const MCT_MINIMUM = 1
export const MCT_TARGET = 1.5

/** How many decimals a number was given to: 7063 → 0, 228.5 → 1. */
const places = (v: number) => {
  const s = String(v)
  return s.includes('e') ? 6 : s.includes('.') ? s.split('.')[1].length : 0
}
const half = (v: number) => (v ? 0.5 * 10 ** -places(v) : 0)

/**
 * How far a ratio recomputed from these inputs can sit from one an insurer
 * filed, given only the precision its lines were filed to: each risk margin
 * moves the total by up to twice its rounding (once itself, once through the
 * diversification credit), and the filed ratio carries its own.
 */
export function filedTolerance(input: ToolInput, filedRatio: number): number {
  const { capital, minimum } = mct(input)
  const total = 2 * (half(Number(input.insurance)) + half(Number(input.market)) + half(Number(input.credit))) + half(Number(input.operational))
  const e = half(Number(input.capital)) / minimum + (capital * total) / MCT_DIVISOR / minimum ** 2
  return e + 0.5 * 10 ** -places(filedRatio) / 100 + 5e-5
}

function mct(input: ToolInput) {
  const capital = Number(input.capital)
  const I = Number(input.insurance)
  const M = Number(input.market)
  const C = Number(input.credit)
  const O = Number(input.operational)
  const A = M + C
  const diversification = A + I - Math.sqrt(A * A + I * I + 2 * MCT_CORRELATION * A * I)
  const target = I + M + C + O - diversification
  const minimum = target / MCT_DIVISOR
  return { capital, I, M, C, O, A, diversification, target, minimum }
}

const amount = (key: string, label: string, symbol: string, filed: string[], dflt: number, description: string, min = 0) => ({
  kind: 'number' as const,
  key,
  label,
  symbol,
  unit: 'money' as const,
  min,
  sliderMin: 0,
  max: 1e12,
  sliderMax: Math.max(dflt * 3, 1000),
  step: 1,
  default: dflt,
  filed,
  description,
})

// The default is CAS Exam 6C, Spring 2017, Q24 (questions/exam-6c/cas6c-2017s-q24.md), $000:
// capital available 53,000, insurance risk 21,000, credit risk 2,500, the market risk its
// solution finds (24,470), and the operational risk its own formula gives at that market
// risk, 8.5% × 47,970 + 9,270 = 11,349.95. The ratio comes to 150.00%.
export const mctRatio: ToolSpec = {
  id: 'capital.mct_ratio',
  version: '1.0.0',
  name: 'MCT Ratio',
  area: 'capital',
  answers: "What's the MCT ratio?",
  aka: ['MCT', 'Minimum Capital Test', 'BAAT', 'Branch Adequacy of Assets Test', 'capital ratio', 'diversification credit', 'OSFI capital'],
  fields: [
    {
      kind: 'choice', key: 'test', label: 'Test',
      options: [
        { value: 'mct', label: 'MCT' },
        { value: 'baat', label: 'BAAT' },
      ],
      default: 'mct',
      description: "Which test: the MCT for a Canadian insurer, or the BAAT for a foreign company's Canadian branch, which sets net assets available against the same margins.",
    },
    amount('capital', 'Capital available', 'CA', [MCT_LINES.capital, MCT_LINES.netAssets], 53000, 'Capital available (MCT line 10), or net assets available for a branch (line 25), in $000. It can be negative: a branch has filed net assets below zero.', -1e12),
    amount('insurance', 'Insurance risk', 'I', [MCT_LINES.insurance], 21000, 'The insurance risk margin at target (line 50), in $000.'),
    amount('market', 'Market risk', 'M', [MCT_LINES.market], 24470, 'The market risk margin at target (line 80), in $000.'),
    amount('credit', 'Credit risk', 'C', [MCT_LINES.credit], 2500, 'The credit risk margin at target (line 100), in $000.'),
    amount('operational', 'Operational risk', 'OR', [MCT_LINES.operational], 11349.95, 'The operational risk margin (line 105), in $000.'),
  ],
  notation: input => `${input.test === 'baat' ? 'BAAT' : 'MCT'} = CA / ((I + M + C + OR − DC) / 1.5),  DC = A + I − √(A² + I² + 2·R·A·I),  A = M + C,  R = 0.5`,
  view: 'none',
  compute: input => {
    const { capital, I, M, C, O, A, diversification, target, minimum } = mct(input)
    if (!(minimum > 0)) throw new ToolInputError('insurance', 'The margins add up to nothing, so there is no minimum to measure against.')
    const ratio = capital / minimum
    const test = input.test === 'baat' ? 'BAAT' : 'MCT'
    const warnings: string[] = []
    if (test === 'MCT' && ratio < MCT_MINIMUM) warnings.push('Below the 100% minimum the MCT guideline requires (§1.2.1).')
    else if (test === 'MCT' && ratio < MCT_TARGET) warnings.push("Below OSFI's supervisory target of 150% (MCT guideline, §1.2.1).")
    return {
      tiles: [
        { symbol: test, label: 'Total', value: ratio, unit: 'percent' },
        { symbol: 'MCR', label: 'Minimum required', value: minimum, unit: 'money' },
        { symbol: 'DC', label: 'Diversification credit', value: diversification, unit: 'money' },
      ],
      trace: [
        { label: 'Market and credit risk', formula: `A = ${M} + ${C}`, result: A, unit: 'money' },
        { label: 'Diversification credit (§8.1)', formula: `${A} + ${I} − √(${A}² + ${I}² + 2 × ${MCT_CORRELATION} × ${A} × ${I})`, result: diversification, unit: 'money' },
        { label: 'Total required at target', formula: `${I} + ${M} + ${C} + ${O} − ${diversification.toFixed(2)}`, result: target, unit: 'money' },
        { label: 'Minimum required (§1.1.1)', formula: `${target.toFixed(2)} / ${MCT_DIVISOR}`, result: minimum, unit: 'money' },
        { label: `${test} ratio`, formula: `${capital} / ${minimum.toFixed(2)}`, result: ratio, unit: 'percent' },
      ],
      warnings,
      values: {
        ratio,
        minimum,
        target,
        diversification,
        excess: capital - minimum,
        capital,
        margins: { insurance: I, market: M, credit: C, operational: O },
        test,
      },
    }
  },
  method: {
    concepts: ['MCT', 'Capital Available', 'Insurance Risk Margin', 'Market Risk Margin', 'Credit Risk Margin', 'Operational Risk Margin', 'Diversification Credit'],
    readings: [{ resource: 'OSFI MCT', locator: 'Ch. 1, 8' }],
  },
  filedAnswer: { tile: 0, address: MCT_LINES.ratio, scale: 0.01, tolerance: filedTolerance },
  compare: [
    { key: 'ratio', label: 'Ratio', unit: 'percent' },
    { key: 'minimum', label: 'Minimum required', unit: 'money' },
    { key: 'excess', label: 'Excess', unit: 'money' },
  ],
}
