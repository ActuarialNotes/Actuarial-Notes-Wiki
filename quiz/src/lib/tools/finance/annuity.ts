import { formatValue } from '../format'
import { RATE_GRID, rootsOn } from '../numeric'
import { ToolInputError, type ChoiceField, type NumberField, type ToolSpec } from '../types'

/**
 * Annuity, solved for any one of its unknowns (docs/tool-template-v3.md §3):
 * the present value of n level payments (the default), the payment a present
 * value buys, the number of payments it takes, or the rate per period. One
 * equation, PV = P · a⌉n (or ä⌉n); the reader picks which letter is the answer.
 */
type Unknown = 'pv' | 'payment' | 'n' | 'i'
const UNKNOWNS: Unknown[] = ['pv', 'payment', 'n', 'i']

const SOLVE: ChoiceField = {
  kind: 'choice',
  key: 'solve',
  label: 'Solve for',
  description: 'Which quantity is the answer: the present value (the default), the payment, the number of payments or the rate per period. The field for the chosen quantity is not read; every other one is.',
  options: [
    { value: 'pv', label: 'PV' },
    { value: 'payment', label: 'Payment' },
    { value: 'n', label: 'Periods' },
    { value: 'i', label: 'Rate' },
  ],
  default: 'pv',
}

const unless = (u: Unknown) => ({ field: 'solve', in: UNKNOWNS.filter(x => x !== u) })

// The default is what the default payments are worth (100 a⌉10 at 5% = 772.1735), so switching the
// answer to another letter gives back that letter's own default.
const PV: NumberField = {
  kind: 'number', key: 'pv', label: 'Present value', symbol: 'PV', unit: 'money', min: 0.01, max: 1e12, sliderMax: 10000, step: 10, default: 772.1735,
  description: 'The present value of the payments. Read only when solving for the payment, the number of payments or the rate.',
  showWhen: unless('pv'),
}

/** a⌉n at i, or ä⌉n for an annuity-due. */
export function annuityFactor(i: number, n: number, due: boolean): number {
  const an = i === 0 ? n : (1 - (1 + i) ** -n) / i
  return due ? an * (1 + i) : an
}

export const annuity: ToolSpec = {
  id: 'finance.annuity',
  version: '1.1.0',
  name: 'Annuity',
  area: 'finance',
  answers: "What's a level annuity worth today, and when it ends?",
  aka: ['annuity immediate', 'annuity due', 'perpetuity', 'payment', 'number of payments', 'solve'],
  fields: [
    SOLVE,
    {
      kind: 'choice', key: 'timing', label: 'Payments', description: 'Whether each payment is at the end of its period (immediate) or the start (due).',
      options: [{ value: 'immediate', label: 'Immediate' }, { value: 'due', label: 'Due' }], default: 'immediate',
    },
    { kind: 'number', key: 'payment', label: 'Payment', symbol: 'P', unit: 'money', min: 0, max: 1e12, sliderMax: 10000, step: 10, default: 100, description: 'The level payment each period. Not read when solving for it.', showWhen: unless('payment') },
    { kind: 'number', key: 'n', label: 'Periods', symbol: 'n', unit: 'count', integer: true, min: 1, max: 1200, sliderMax: 60, step: 1, default: 10, description: 'How many payments. Not read when solving for it.', showWhen: unless('n') },
    { kind: 'number', key: 'i', bank: ['discount-rate'], label: 'Rate per period', symbol: 'i', unit: 'percent', min: 0, max: 1, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The effective rate per payment period, as a decimal. Not read when solving for it.', showWhen: unless('i') },
    PV,
  ],
  solveFor: 'solve',
  notation: input => {
    const due = input.timing === 'due'
    const a = due ? 'ä⌉n' : 'a⌉n'
    switch (String(input.solve ?? 'pv') as Unknown) {
      case 'payment': return `P = PV / ${a}`
      case 'n': return due ? 'n = −ln(1 − d · PV/P) / ln(1 + i)' : 'n = −ln(1 − i · PV/P) / ln(1 + i)'
      case 'i': return `PV = P · ${a}, solved for i`
      default: return due ? 'PV = P · ä⌉n = P(1 − vⁿ)/d' : 'PV = P · a⌉n = P(1 − vⁿ)/i'
    }
  },
  view: 'none',
  compute: input => {
    const solve = String(input.solve ?? 'pv') as Unknown
    const due = input.timing === 'due'
    let P = Number(input.payment)
    let n = Number(input.n)
    let i = Number(input.i)
    const warnings: string[] = []
    const steps: { label: string; formula: string; result: number; unit: 'money' | 'percent' | 'count' }[] = []
    const a = due ? 'ä' : 'a'

    if (solve === 'payment') {
      const pv = Number(input.pv)
      P = pv / annuityFactor(i, n, due)
      steps.push({ label: 'Payment', formula: `${formatValue(pv, 'money')} / ${a}⌉${n}`, result: P, unit: 'money' })
    } else if (solve === 'n') {
      const pv = Number(input.pv)
      if (!(P > 0)) throw new ToolInputError('payment', 'Give a payment above zero: with none, no number of payments adds up to a present value.')
      // a⌉n = PV/P (÷ (1 + i) for a due), and vⁿ = 1 − i · a⌉n.
      const target = pv / P / (due ? 1 + i : 1)
      if (i === 0) {
        n = target
      } else {
        const vn = 1 - i * target
        if (vn <= 0) {
          const perpetuity = (P * (due ? 1 + i : 1)) / i
          throw new ToolInputError('pv', `A present value of ${formatValue(pv, 'money')} is at least what the payments are worth forever (${formatValue(perpetuity, 'money')}), so no number of them reaches it.`)
        }
        n = -Math.log(vn) / Math.log(1 + i)
      }
      if (Math.abs(n - Math.round(n)) > 1e-6) {
        warnings.push(`It takes ${n.toFixed(4)} payments, not a whole number: ${Math.floor(n)} full payments fall short of the present value and ${Math.ceil(n)} pass it.`)
      }
      steps.push({ label: 'Number of payments', formula: `−ln(1 − i · ${a}⌉n) / ln(1 + i), ${a}⌉n = ${formatValue(pv, 'money')} / ${formatValue(P, 'money')}`, result: n, unit: 'count' })
    } else if (solve === 'i') {
      const pv = Number(input.pv)
      if (!(P > 0)) throw new ToolInputError('payment', 'Give a payment above zero: with none, no rate makes the payments worth the present value.')
      const roots = rootsOn(r => P * annuityFactor(r, n, due) - pv, RATE_GRID)
      if (!roots.length) throw new ToolInputError('pv', `No rate between −99% and 1,000% makes ${n} payments of ${formatValue(P, 'money')} worth ${formatValue(pv, 'money')}.`)
      i = roots[0]
      if (i < 0) warnings.push(`The payments add up to less than the present value, so the rate is negative.`)
      steps.push({ label: 'Rate per period', formula: `the i where ${formatValue(P, 'money')} × ${a}⌉${n} = ${formatValue(pv, 'money')}, by bisection`, result: i, unit: 'percent' })
    }

    const v = 1 / (1 + i)
    const an = i === 0 ? n : (1 - v ** n) / i
    const sn = i === 0 ? n : ((1 + i) ** n - 1) / i
    const factor = due ? an * (1 + i) : an
    const accumulation = due ? sn * (1 + i) : sn
    const pv = P * factor
    const fv = P * accumulation
    const symbol = due ? 'ä' : 'a'
    const ssymbol = due ? 's̈' : 's'
    const pvTile = { symbol: 'PV', label: 'Present value', value: pv, unit: 'money' as const }
    const fvTile = { symbol: 'FV', label: 'Accumulated at n', value: fv, unit: 'money' as const }
    const factorTile = { symbol: `${symbol}⌉n`, label: 'Annuity factor', value: factor, unit: 'factor' as const }
    const tiles = solve === 'payment'
      ? [{ symbol: 'P', label: 'Payment', value: P, unit: 'money' as const }, fvTile, factorTile]
      : solve === 'n'
        ? [{ symbol: 'n', label: 'Periods', value: n, unit: 'plain' as const }, fvTile, factorTile]
        : solve === 'i'
          ? [{ symbol: 'i', label: 'Rate per period', value: i, unit: 'percent' as const }, fvTile, factorTile]
          : [pvTile, fvTile, factorTile]
    return {
      tiles,
      trace: [
        ...steps,
        { label: 'Discount factor', formula: `v = 1/(1 + ${Number(i.toFixed(8))})`, result: v, unit: 'factor' },
        { label: 'Annuity-immediate factor', formula: i === 0 ? 'a⌉n = n' : `a⌉n = (1 − v^${Number(n.toFixed(4))}) / ${Number(i.toFixed(8))}`, result: an, unit: 'factor' },
        ...(due ? [{ label: 'Annuity-due factor', formula: 'ä⌉n = a⌉n · (1 + i)', result: factor, unit: 'factor' as const }] : []),
        { label: 'Present value', formula: `PV = ${Number(P.toFixed(6))} × ${symbol}⌉n`, result: pv, unit: 'money' },
        { label: 'Accumulated value', formula: `FV = ${Number(P.toFixed(6))} × ${ssymbol}⌉n`, result: fv, unit: 'money' },
      ],
      warnings,
      values: {
        solve,
        payment: P,
        n,
        i,
        timing: due ? 'due' : 'immediate',
        present_value: pv,
        accumulated_value: fv,
        annuity_factor: factor,
        accumulation_factor: accumulation,
      },
      summary: solve === 'payment'
        ? `A payment of ${formatValue(P, 'money')} a period for ${n} periods (annuity-${due ? 'due' : 'immediate'}) is worth ${formatValue(pv, 'money')} at ${formatValue(i, 'percent')}.`
        : solve === 'n'
          ? `${Number(n.toFixed(4))} payments of ${formatValue(P, 'money')} (annuity-${due ? 'due' : 'immediate'}) are worth ${formatValue(pv, 'money')} at ${formatValue(i, 'percent')}.`
          : solve === 'i'
            ? `A rate of ${formatValue(i, 'percent')} a period makes ${n} payments of ${formatValue(P, 'money')} (annuity-${due ? 'due' : 'immediate'}) worth ${formatValue(pv, 'money')}.`
            : `Annuity-${due ? 'due' : 'immediate'}: present value ${formatValue(pv, 'money')}, accumulated value ${formatValue(fv, 'money')} at the end of period ${n} (factor ${formatValue(factor, 'factor')}).`,
    }
  },
  method: { concepts: ['Annuity Immediate', 'Annuity Due'], readings: [] },
  next: [
    {
      // The annuity as cash flows: the present value paid at 0, the payments received.
      tool: 'finance.internal_rate_of_return',
      label: 'Internal Rate of Return',
      build: (_input, output) => {
        const n = Math.round(Number(output.values.n))
        const P = Number(output.values.payment)
        const due = output.values.timing === 'due'
        if (!(n >= 1 && n <= 500)) return {}
        const flows = Array.from({ length: n }, (_, k) => ({ time: due ? k : k + 1, amount: P }))
        if (due) flows[0] = { time: 0, amount: P - Number(output.values.present_value) }
        else flows.unshift({ time: 0, amount: -Number(output.values.present_value) })
        return { flows }
      },
    },
  ],
}
