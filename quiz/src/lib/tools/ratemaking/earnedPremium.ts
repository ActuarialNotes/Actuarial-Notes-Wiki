import { decimalYear, parseDate } from '../dates'
import { formatValue } from '../format'
import { ToolInputError, type TableRow, type ToolSpec } from '../types'

export const earnedPremium: ToolSpec = {
  id: 'ratemaking.earned_premium',
  version: '1.0.0',
  name: 'Earned Premium',
  area: 'ratemaking',
  answers: 'How much of this premium is written, earned and unearned in each year?',
  fields: [
    {
      kind: 'table', key: 'policies', label: 'Policies', minRows: 1, maxRows: 2000,
      description: 'Each policy (or block written on one date): its effective date and its written premium or exposure. It earns evenly over its term.',
      columns: [
        { key: 'policy', label: 'Policy', kind: 'text' },
        { key: 'effective', label: 'Effective', kind: 'text' },
        { key: 'amount', label: 'Written', kind: 'number', unit: 'money' },
      ],
      default: [
        { policy: 'A', effective: '2023-10-01', amount: 1000 },
        { policy: 'B', effective: '2024-01-01', amount: 1000 },
        { policy: 'C', effective: '2024-04-01', amount: 1000 },
        { policy: 'D', effective: '2024-07-01', amount: 1000 },
      ],
    },
    { kind: 'number', key: 'term', label: 'Policy term (months)', symbol: 'T', unit: 'count', integer: true, min: 1, max: 120, sliderMax: 24, step: 1, default: 12, description: 'The policy term in months.' },
    {
      kind: 'choice', key: 'basis', label: 'Aggregation', description: 'Calendar year: what happens in the year. Policy year: everything about the policies written in the year.',
      options: [{ value: 'calendar', label: 'Calendar year' }, { value: 'policy', label: 'Policy year' }], default: 'calendar',
    },
    { kind: 'number', key: 'as_of', label: 'As of the end of', symbol: 'Y', unit: 'count', integer: true, min: 0, max: 2200, sliderMax: 2030, step: 1, default: 0, zeroLabel: 'All earned', description: 'The year whose 31 December the figures are valued at (0: once every policy has expired).' },
  ],
  notation: input => (input.basis === 'policy' ? 'PY earned = Σ W · min(1, (as-of − effective)/T)' : 'CY earned = Σ W · |year ∩ term| / T'),
  view: 'table',
  compute: input => {
    const T = Number(input.term) / 12
    const policies = (input.policies as TableRow[]).map((r, k) => {
      const parts = parseDate(r.effective)
      if (!parts) throw new ToolInputError('policies', `Policy ${r.policy || k + 1}'s effective date "${r.effective}" isn't a date: write 2016-01-01 or 01/01/2016.`)
      return { e: decimalYear(parts), w: Number(r.amount) }
    })
    const firstYear = Math.floor(Math.min(...policies.map(p => p.e)))
    const lastExpiry = Math.max(...policies.map(p => p.e + T))
    const asOfYear = Number(input.as_of) || Math.ceil(lastExpiry - 1e-9) - 1
    const asOf = asOfYear + 1
    if (asOfYear < firstYear) throw new ToolInputError('as_of', `Value as of a year on or after the first policy's, ${firstYear}.`)
    const policyYear = input.basis === 'policy'
    const years = Array.from({ length: asOfYear - firstYear + 1 }, (_, k) => firstYear + k)
    // Written once the policy is effective; earned evenly over its term, up to the valuation date.
    const earnedBy = (p: { e: number; w: number }, t: number) => p.w * Math.min(1, Math.max(0, (t - p.e) / T))
    const rows = years.map(y => {
      if (policyYear) {
        const inYear = policies.filter(p => Math.floor(p.e + 1e-9) === y && p.e < asOf)
        const written = inYear.reduce((s, p) => s + p.w, 0)
        const earned = inYear.reduce((s, p) => s + earnedBy(p, asOf), 0)
        return { year: String(y), written, earned, unearned: written - earned }
      }
      const written = policies.filter(p => Math.floor(p.e + 1e-9) === y).reduce((s, p) => s + p.w, 0)
      const earned = policies.reduce((s, p) => s + earnedBy(p, y + 1) - earnedBy(p, y), 0)
      // Unearned at the year's end: on everything written by then.
      const unearned = policies.filter(p => p.e < y + 1).reduce((s, p) => s + p.w - earnedBy(p, y + 1), 0)
      return { year: String(y), written, earned, unearned }
    })
    const total = (key: 'written' | 'earned') => rows.reduce((s, r) => s + r[key], 0)
    return {
      tiles: [
        { symbol: 'EP', label: `Earned, ${asOfYear}`, value: rows[rows.length - 1].earned, unit: 'money' },
        { symbol: 'WP', label: `Written, ${asOfYear}`, value: rows[rows.length - 1].written, unit: 'money' },
        { symbol: 'UEP', label: policyYear ? `Unearned a/o ${asOfYear}` : `Unearned at end ${asOfYear}`, value: rows[rows.length - 1].unearned, unit: 'money' },
      ],
      table: {
        columns: [
          { key: 'year', label: policyYear ? 'Policy year' : 'Calendar year', kind: 'text' },
          { key: 'written', label: 'Written', kind: 'number', unit: 'money', computed: true },
          { key: 'earned', label: 'Earned', kind: 'number', unit: 'money', computed: true },
          { key: 'unearned', label: policyYear ? 'Unearned' : 'Unearned at year end', kind: 'number', unit: 'money', computed: true },
        ],
        rows,
        footer: { year: 'Total', written: total('written'), earned: total('earned'), unearned: null },
      },
      trace: rows.map(r => ({ label: `Earned, ${r.year}`, formula: policyYear ? `policies written in ${r.year}, earned to 31 Dec ${asOfYear}` : `each policy's share of its term inside ${r.year}`, result: r.earned, unit: 'money' as const })),
      warnings: [],
      values: { years, written: rows.map(r => r.written), earned: rows.map(r => r.earned), unearned: rows.map(r => r.unearned) },
      summary: `${policyYear ? 'Policy' : 'Calendar'} year earned ${rows.map(r => `${r.year}: ${formatValue(r.earned, 'money')}`).join(', ')}, as of 31 December ${asOfYear}.`,
    }
  },
  method: {
    concepts: ['Earned Premium', 'Earned Exposure'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 4–5' }],
  },
}
