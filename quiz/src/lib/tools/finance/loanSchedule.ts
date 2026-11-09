import { formatValue } from '../format'
import { RATE_GRID, rootsOn } from '../numeric'
import { ToolInputError, type ChoiceField, type NumberField, type Tile, type ToolSpec } from '../types'

const MAX_PAYMENTS = 1200

/**
 * Loan Schedule, solved for any one of its unknowns (docs/tool-template-v3.md
 * §3): the level payment that repays a loan in n payments (the default), how
 * many payments of P it takes (the last a smaller drop payment), the amount n
 * payments of P repay, the rate they repay it at, or the balance left after n
 * payments of P. One schedule, Bₖ = Bₖ₋₁(1 + i) − P; the reader picks the
 * answer. These replace the 1.x switches (a payment of 0 meaning "level", a
 * count of 0 meaning "as many as needed"), which a slider stop hid.
 */
type Unknown = 'payment' | 'n' | 'amount' | 'i' | 'balance'
const UNKNOWNS: Unknown[] = ['payment', 'n', 'amount', 'i', 'balance']

const SOLVE: ChoiceField = {
  kind: 'choice',
  key: 'solve',
  label: 'Solve for',
  description: 'Which quantity is the answer: the level payment (the default), the number of payments of a given P (the last a smaller drop payment), the amount borrowed, the rate per period, or the balance left after n payments of P. The field for the chosen quantity is not read; every other one is.',
  options: [
    { value: 'payment', label: 'Payment' },
    { value: 'n', label: 'Term' },
    { value: 'amount', label: 'Amount' },
    { value: 'i', label: 'Rate' },
    { value: 'balance', label: 'Balance' },
  ],
  default: 'payment',
}

const unless = (...u: Unknown[]) => ({ field: 'solve', in: UNKNOWNS.filter(x => !u.includes(x)) })

const AMOUNT: NumberField = { kind: 'number', key: 'amount', label: 'Amount borrowed', symbol: 'L', unit: 'money', min: 0.01, max: 1e12, sliderMax: 100000, step: 100, default: 10000, description: 'The loan amount at time 0. Not read when solving for it.', showWhen: unless('amount') }
const RATE: NumberField = { kind: 'number', key: 'i', label: 'Rate per period', symbol: 'i', unit: 'percent', min: 0, max: 1, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The effective rate per payment period, as a decimal (a quarterly loan at 16% convertible quarterly is 0.04). Not read when solving for it.', showWhen: unless('i') }
// The default is the level payment on the default loan (10,000 / a⌉10 at 5% = 1,295.0457), so
// solving for the term, the amount, the rate or the balance gives back the other defaults.
const PAYMENT: NumberField = { kind: 'number', key: 'payment', label: 'Payment', symbol: 'P', unit: 'money', min: 0, max: 1e12, sliderMax: 10000, step: 10, default: 1295.0457, description: 'The payment each period. Not read when solving for it.', showWhen: unless('payment') }
const COUNT: NumberField = { kind: 'number', key: 'n', label: 'Payments', symbol: 'n', unit: 'count', integer: true, min: 1, max: MAX_PAYMENTS, sliderMax: 60, step: 1, default: 10, description: `How many payments, at most ${MAX_PAYMENTS}. Not read when solving for the number of payments.`, showWhen: unless('n') }

const factor = (i: number, n: number) => (i === 0 ? n : (1 - (1 + i) ** -n) / i)

type Row = { k: number; payment: number; interest: number; principal: number; balance: number }

/** The schedule: n payments of P, or (n absent) as many as clear the balance, the last a drop payment. */
function schedule(L: number, i: number, P: number, n: number | null, level: boolean): Row[] {
  const rows: Row[] = []
  let balance = L
  for (let k = 1; k <= (n ?? MAX_PAYMENTS); k++) {
    const interest = balance * i
    const payment = n === null && balance + interest <= P ? balance + interest : P
    balance = balance + interest - payment
    // A level schedule ends at exactly zero; float noise shouldn't print as −0.00.
    if (level && k === n) balance = 0
    rows.push({ k, payment, interest, principal: payment - interest, balance })
    if (n === null && balance <= 1e-9) {
      rows[rows.length - 1].balance = 0
      break
    }
  }
  return rows
}

export const loanSchedule: ToolSpec = {
  id: 'finance.loan_schedule',
  version: '2.0.0',
  name: 'Loan Schedule',
  area: 'finance',
  answers: 'How is this loan repaid, payment by payment?',
  aka: ['amortization', 'outstanding balance', 'mortgage', 'drop payment', 'level payment', 'solve'],
  fields: [SOLVE, AMOUNT, RATE, PAYMENT, COUNT],
  solveFor: 'solve',
  notation: input => {
    switch (String(input.solve ?? 'payment') as Unknown) {
      case 'n': return 'Bₖ = Bₖ₋₁(1 + i) − P, until it is repaid'
      case 'amount': return 'L = P · a⌉n'
      case 'i': return 'L = P · a⌉n, solved for i'
      case 'balance': return 'Bₙ = L(1 + i)ⁿ − P · s⌉n'
      default: return 'P = L / a⌉n,  Bₖ = Bₖ₋₁(1 + i) − P'
    }
  },
  view: 'table',
  compute: input => {
    const solve = String(input.solve ?? 'payment') as Unknown
    let L = Number(input.amount)
    let i = Number(input.i)
    let P = Number(input.payment)
    const n = Number(input.n)
    const warnings: string[] = []
    const steps: { label: string; formula: string; result: number; unit: 'money' | 'percent' | 'factor' }[] = []

    if (solve !== 'payment' && !(P > 0)) throw new ToolInputError('payment', 'Give a payment above zero.')
    if (solve === 'payment') {
      const an = factor(i, n)
      P = L / an
      steps.push({ label: 'Annuity factor', formula: `a⌉${n} at ${formatValue(i, 'percent')}`, result: an, unit: 'factor' }, { label: 'Level payment', formula: `${L} / a⌉${n}`, result: P, unit: 'money' })
    } else if (solve === 'amount') {
      const an = factor(i, n)
      L = P * an
      steps.push({ label: 'Annuity factor', formula: `a⌉${n} at ${formatValue(i, 'percent')}`, result: an, unit: 'factor' }, { label: 'Amount borrowed', formula: `${P} × a⌉${n}`, result: L, unit: 'money' })
    } else if (solve === 'i') {
      const roots = rootsOn(r => P * factor(r, n) - L, RATE_GRID)
      if (!roots.length) throw new ToolInputError('payment', `No rate between −99% and 1,000% has ${n} payments of ${formatValue(P, 'money')} repay ${formatValue(L, 'money')}.`)
      i = roots[0]
      if (i < 0) warnings.push('The payments add up to less than the amount borrowed, so the rate is negative.')
      steps.push({ label: 'Rate per period', formula: `the i where ${P} × a⌉${n} = ${L}, by bisection`, result: i, unit: 'percent' })
    } else if (solve === 'n' && P <= L * i) {
      throw new ToolInputError('payment', `A payment of ${formatValue(P, 'money')} doesn't cover the first period's interest of ${formatValue(L * i, 'money')}, so the loan is never repaid.`)
    }

    const level = solve === 'payment' || solve === 'amount' || solve === 'i'
    const rows = schedule(L, i, P, solve === 'n' ? null : n, level)
    const last = rows[rows.length - 1]
    // Under half a cent either way is the payment's rounding, not money owed or overpaid.
    if (Math.abs(last.balance) < 0.005) last.balance = 0
    if (solve === 'n' && last.balance > 0) throw new ToolInputError('payment', `The loan isn't repaid within ${MAX_PAYMENTS} payments.`)
    if (solve === 'balance' && last.balance < -1e-9) warnings.push(`The payments overpay the loan: the balance after payment ${n} is negative.`)
    const totalPaid = rows.reduce((s, r) => s + r.payment, 0)
    const totalInterest = rows.reduce((s, r) => s + r.interest, 0)
    const interestTile: Tile = { symbol: 'ΣI', label: 'Total interest', value: totalInterest, unit: 'money' }
    const paidTile: Tile = { symbol: 'ΣPₖ', label: 'Total paid', value: totalPaid, unit: 'money' }
    const tiles: Tile[] = solve === 'n'
      ? [
          { symbol: 'n', label: 'Payments', value: rows.length, unit: 'count' },
          { symbol: `P${subscript(last.k)}`, label: 'Drop payment', value: last.payment, unit: 'money' },
          interestTile,
        ]
      : [
          solve === 'amount'
            ? { symbol: 'L', label: 'Amount borrowed', value: L, unit: 'money' }
            : solve === 'i'
              ? { symbol: 'i', label: 'Rate per period', value: i, unit: 'percent' }
              : solve === 'balance'
                ? { symbol: `B${subscript(n)}`, label: `Balance after payment ${n}`, value: last.balance, unit: 'money' }
                : { symbol: 'P', label: 'Level payment', value: P, unit: 'money' },
          interestTile,
          paidTile,
        ]
    return {
      tiles,
      table: {
        columns: [
          { key: 'k', label: 'k', kind: 'number', unit: 'count' },
          { key: 'payment', label: 'Payment', kind: 'number', unit: 'money', computed: true },
          { key: 'interest', label: 'Interest', kind: 'number', unit: 'money', computed: true },
          { key: 'principal', label: 'Principal', kind: 'number', unit: 'money', computed: true },
          { key: 'balance', label: 'Balance', kind: 'number', unit: 'money', computed: true },
        ],
        rows,
        footer: { k: 'Total', payment: totalPaid, interest: totalInterest, principal: totalPaid - totalInterest, balance: null },
      },
      trace: [
        ...steps,
        { label: 'Interest in payment 1', formula: `${Number(L.toFixed(6))} × ${Number(i.toFixed(8))}`, result: rows[0].interest, unit: 'money' },
        { label: 'Principal in payment 1', formula: 'P − I₁', result: rows[0].principal, unit: 'money' },
        { label: `Balance after payment ${last.k}`, formula: 'Bₖ = Bₖ₋₁(1 + i) − Pₖ', result: last.balance, unit: 'money' },
      ],
      warnings,
      values: {
        solve,
        amount: L,
        i,
        payment: P,
        n: rows.length,
        payments: rows.map(r => r.payment),
        interest: rows.map(r => r.interest),
        principal: rows.map(r => r.principal),
        balance: rows.map(r => r.balance),
        final_payment: last.payment,
        count: rows.length,
        total_interest: totalInterest,
      },
      summary: solve === 'n'
        ? `${rows.length} payments, the last a drop payment of ${formatValue(last.payment, 'money')}; total interest ${formatValue(totalInterest, 'money')}.`
        : solve === 'balance'
          ? `After ${n} payments of ${formatValue(P, 'money')}, ${formatValue(last.balance, 'money')} is still owed; interest paid ${formatValue(totalInterest, 'money')}.`
          : solve === 'amount'
            ? `${n} payments of ${formatValue(P, 'money')} repay a loan of ${formatValue(L, 'money')} at ${formatValue(i, 'percent')}.`
            : solve === 'i'
              ? `${n} payments of ${formatValue(P, 'money')} repay ${formatValue(L, 'money')} at ${formatValue(i, 'percent')} a period.`
              : `Level payment ${formatValue(P, 'money')} for ${n} periods; total interest ${formatValue(totalInterest, 'money')}.`,
    }
  },
  method: { concepts: ['Loan Amortization', 'Amortization Schedule', 'Outstanding Balance'], readings: [] },
}

const SUB = '₀₁₂₃₄₅₆₇₈₉'
const subscript = (k: number) => String(k).replace(/\d/g, d => SUB[Number(d)])
