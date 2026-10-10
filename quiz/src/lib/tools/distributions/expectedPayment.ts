import { formatValue } from '../format'
import { ToolInputError, type ToolSpec } from '../types'
import { FAMILY, PARAMETERS, lossModel } from './lossModels'

export const expectedPayment: ToolSpec = {
  id: 'distributions.expected_payment',
  version: '1.0.0',
  name: 'Expected Payment',
  area: 'distributions',
  answers: 'What does the insurer expect to pay, per loss and per payment?',
  aka: ['deductible', 'per payment', 'per loss', 'coinsurance', 'franchise deductible'],
  fields: [
    FAMILY,
    ...PARAMETERS,
    { kind: 'number', key: 'deductible', label: 'Deductible', symbol: 'd', unit: 'money', min: 0, max: 1e12, sliderMax: 5000, step: 10, default: 500, description: 'The deductible per loss.' },
    { kind: 'number', key: 'limit', label: 'Maximum covered loss', symbol: 'u', unit: 'money', min: 0, max: 1e12, sliderMax: 20000, step: 100, default: 0, zeroLabel: 'None', description: 'The loss above which nothing more is paid (0 for none): with an ordinary deductible the most paid is u − d. For coinsurance c, multiply both expected payments by c.' },
    {
      kind: 'choice', key: 'type', label: 'Deductible', description: 'Ordinary: pays the loss less d. Franchise: pays the whole loss once it exceeds d.',
      options: [{ value: 'ordinary', label: 'Ordinary' }, { value: 'franchise', label: 'Franchise' }], default: 'ordinary',
    },
  ],
  notation: input => (input.type === 'franchise' ? 'E[Y_L] = E[X∧u] − E[X∧d] + d·S(d)' : 'E[Y_L] = E[X∧u] − E[X∧d]') + ',  E[Y_P] = E[Y_L] / S(d)',
  view: 'none',
  compute: input => {
    const model = lossModel(input)
    const d = Number(input.deductible)
    const u = Number(input.limit) === 0 ? Infinity : Number(input.limit)
    if (u <= d) throw new ToolInputError('limit', 'The maximum covered loss must be above the deductible (or 0 for none).')
    const franchise = input.type === 'franchise'
    const top = Number.isFinite(u) ? model.lev(u) : model.mean
    const sd = model.survival(d)
    const perLoss = top - model.lev(d) + (franchise ? d * sd : 0)
    const perPayment = sd > 0 ? perLoss / sd : NaN
    const warnings = [
      ...(Number.isFinite(top) ? [] : ['With no limit the expected payment is infinite: this model has no finite mean (α ≤ 1).']),
      ...(sd > 0 ? [] : ['No loss exceeds the deductible, so nothing is ever paid.']),
    ]
    return {
      tiles: [
        { symbol: 'E[Y_L]', label: 'Per loss', value: perLoss, unit: 'money' },
        { symbol: 'E[Y_P]', label: 'Per payment', value: perPayment, unit: 'money' },
        { symbol: 'S(d)', label: 'Paid', value: sd, unit: 'percent' },
      ],
      trace: [
        { label: Number.isFinite(u) ? 'Limited expected value at u' : 'Mean loss', formula: Number.isFinite(u) ? `E[X ∧ ${u}]` : 'E[X]', result: top, unit: 'money' },
        { label: 'Limited expected value at d', formula: `E[X ∧ ${d}]`, result: model.lev(d), unit: 'money' },
        ...(franchise ? [{ label: 'Deductible given back on paid losses', formula: `${d} × S(${d})`, result: d * sd, unit: 'money' as const }] : []),
        { label: 'Expected payment per loss', formula: franchise ? 'E[X∧u] − E[X∧d] + d·S(d)' : 'E[X∧u] − E[X∧d]', result: perLoss, unit: 'money' },
        { label: 'Probability a loss is paid', formula: `S(${d})`, result: sd, unit: 'percent' },
        { label: 'Expected payment per payment', formula: 'E[Y_L] / S(d)', result: perPayment, unit: 'money' },
      ],
      warnings,
      values: { per_loss: perLoss, per_payment: perPayment, survival: sd, lev_d: model.lev(d), lev_u: top },
      summary: `Expected payment ${formatValue(perLoss, 'money')} per loss and ${formatValue(perPayment, 'money')} per payment, with a${franchise ? ' franchise' : 'n ordinary'} deductible of ${formatValue(d, 'money')}${Number.isFinite(u) ? ` and losses covered to ${formatValue(u, 'money')}` : ''}, for X ~ ${model.notation}.`,
    }
  },
  method: { concepts: ['Deductible', 'Limited Expected Value'], readings: [] },
}
