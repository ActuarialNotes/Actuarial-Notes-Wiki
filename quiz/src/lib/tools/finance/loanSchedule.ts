import { formatValue } from '../format'
import { ToolInputError, type ToolSpec } from '../types'

const MAX_PAYMENTS = 1200

export const loanSchedule: ToolSpec = {
  id: 'finance.loan_schedule',
  version: '1.0.0',
  name: 'Loan Schedule',
  area: 'finance',
  answers: 'How is this loan repaid, payment by payment?',
  aka: ['amortization', 'outstanding balance', 'mortgage'],
  fields: [
    { kind: 'number', key: 'amount', label: 'Amount borrowed', symbol: 'L', unit: 'money', min: 0.01, max: 1e12, sliderMax: 100000, step: 100, default: 10000, description: 'The loan amount at time 0.' },
    { kind: 'number', key: 'i', label: 'Rate per period', symbol: 'i', unit: 'percent', min: 0, max: 1, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The effective rate per payment period, as a decimal (a quarterly loan at 16% convertible quarterly is 0.04).' },
    {
      kind: 'number', key: 'payment', label: 'Payment', symbol: 'P', unit: 'money', min: 0, max: 1e12, sliderMax: 10000, step: 10, default: 0, zeroLabel: 'Level',
      description: 'The payment each period. 0 means the level payment that repays the loan in n payments; any other amount is paid as given.',
    },
    {
      kind: 'number', key: 'n', label: 'Payments', symbol: 'n', unit: 'count', integer: true, min: 0, max: MAX_PAYMENTS, sliderMax: 60, step: 1, default: 10, zeroLabel: 'As needed',
      description: `How many payments. With a payment given, 0 means as many as it takes, the last a smaller drop payment; at most ${MAX_PAYMENTS}.`,
    },
  ],
  notation: input => (Number(input.payment) === 0 ? 'P = L / a⌉n,  Bₖ = Bₖ₋₁(1 + i) − P' : 'Bₖ = Bₖ₋₁(1 + i) − P'),
  view: 'table',
  compute: input => {
    const L = Number(input.amount)
    const i = Number(input.i)
    const given = Number(input.payment)
    const n = Number(input.n)
    const level = given === 0
    if (level && n === 0) throw new ToolInputError('n', 'Give the number of payments, or a payment: with neither there is no schedule.')
    if (!level && n === 0 && given <= L * i) {
      throw new ToolInputError('payment', `A payment of ${formatValue(given, 'money')} doesn't cover the first period's interest of ${formatValue(L * i, 'money')}, so the loan is never repaid.`)
    }
    const an = i === 0 ? n : (1 - (1 + i) ** -n) / i
    const P = level ? L / an : given
    const rows: { k: number; payment: number; interest: number; principal: number; balance: number }[] = []
    let balance = L
    for (let k = 1; k <= (n || MAX_PAYMENTS); k++) {
      const interest = balance * i
      // Paid as needed, the last payment is whatever clears the balance (a drop payment).
      const payment = !level && n === 0 && balance + interest <= P ? balance + interest : P
      balance = balance + interest - payment
      // A level schedule ends at exactly zero; float noise shouldn't print as −0.00.
      if (level && k === n) balance = 0
      rows.push({ k, payment, interest, principal: payment - interest, balance })
      if (!level && n === 0 && balance <= 1e-9) {
        balance = 0
        break
      }
    }
    if (!level && n === 0 && balance > 0) throw new ToolInputError('payment', `The loan isn't repaid within ${MAX_PAYMENTS} payments.`)
    const totalPaid = rows.reduce((s, r) => s + r.payment, 0)
    const totalInterest = rows.reduce((s, r) => s + r.interest, 0)
    const last = rows[rows.length - 1]
    const warnings = !level && n > 0 && balance < -1e-9 ? [`The payments overpay the loan: the balance after payment ${n} is negative.`] : []
    return {
      tiles: [
        level
          ? { symbol: 'P', label: 'Level payment', value: P, unit: 'money' }
          : n === 0
            ? { symbol: 'Pₙ', label: `Final (no. ${last.k})`, value: last.payment, unit: 'money' }
            : { symbol: `B${n}`, label: `Balance after ${n}`, value: balance, unit: 'money' },
        { symbol: 'ΣI', label: 'Total interest', value: totalInterest, unit: 'money' },
        { symbol: 'ΣP', label: 'Total paid', value: totalPaid, unit: 'money' },
      ],
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
        ...(level ? [{ label: 'Annuity factor', formula: `a⌉${n} at ${i}`, result: an, unit: 'factor' as const }, { label: 'Level payment', formula: `${L} / a⌉${n}`, result: P, unit: 'money' as const }] : []),
        { label: 'Interest in payment 1', formula: `${L} × ${i}`, result: rows[0].interest, unit: 'money' },
        { label: 'Principal in payment 1', formula: 'P − I₁', result: rows[0].principal, unit: 'money' },
        { label: `Balance after payment ${last.k}`, formula: 'Bₖ = Bₖ₋₁(1 + i) − Pₖ', result: balance, unit: 'money' },
      ],
      warnings,
      values: {
        payment: P,
        payments: rows.map(r => r.payment),
        interest: rows.map(r => r.interest),
        principal: rows.map(r => r.principal),
        balance: rows.map(r => r.balance),
        final_payment: last.payment,
        count: rows.length,
        total_interest: totalInterest,
      },
      summary: level
        ? `Level payment ${formatValue(P, 'money')} for ${n} periods; total interest ${formatValue(totalInterest, 'money')}.`
        : `${rows.length} payments, the last ${formatValue(last.payment, 'money')}; balance after them ${formatValue(balance, 'money')}; total interest ${formatValue(totalInterest, 'money')}.`,
    }
  },
  method: { concepts: ['Loan Amortization', 'Amortization Schedule', 'Outstanding Balance'], readings: [] },
}
