import { ToolInputError, type ToolSpec } from '../types'

export const permissibleLossRatio: ToolSpec = {
  id: 'ratemaking.permissible_loss_ratio',
  version: '1.0.0',
  name: 'Permissible Loss Ratio',
  area: 'ratemaking',
  answers: 'What loss ratio do the rates allow?',
  fields: [
    { kind: 'number', key: 'fixed', label: 'Fixed expense ratio', symbol: 'F', unit: 'percent', min: 0, max: 1, sliderMax: 0.3, step: 0.0025, default: 0, description: 'Fixed expenses as a share of premium (0 when every expense is treated as variable).' },
    { kind: 'number', key: 'variable', label: 'Variable expense ratio', symbol: 'V', unit: 'percent', min: 0, max: 1, sliderMax: 0.5, step: 0.0025, default: 0.25, description: 'Variable expenses as a share of premium.' },
    { kind: 'number', key: 'profit', label: 'Profit & contingency', symbol: 'Q', unit: 'percent', judgment: true, min: -0.5, max: 1, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The target underwriting profit and contingency provision, as a share of premium.' },
  ],
  notation: () => 'PLR = 1 − F − V − Q,  VPLR = 1 − V − Q',
  view: 'none',
  compute: input => {
    const F = Number(input.fixed)
    const V = Number(input.variable)
    const Q = Number(input.profit)
    const vplr = 1 - V - Q
    const plr = vplr - F
    if (vplr <= 0) throw new ToolInputError('variable', 'V + Q must be below 100%.')
    return {
      tiles: [
        { symbol: 'PLR', label: 'Permissible', value: plr, unit: 'percent' },
        { symbol: 'VPLR', label: 'Variable permissible', value: vplr, unit: 'percent' },
      ],
      trace: [
        { label: 'Variable permissible loss ratio', formula: `1 − ${V} − ${Q}`, result: vplr, unit: 'percent' },
        { label: 'Permissible loss ratio', formula: `1 − ${F} − ${V} − ${Q}`, result: plr, unit: 'percent' },
      ],
      warnings: plr <= 0 ? ['Expenses and profit take the whole premium: no loss ratio is permissible.'] : [],
      values: { permissible_loss_ratio: plr, variable_permissible_loss_ratio: vplr },
    }
  },
  method: {
    concepts: ['Permissible Loss Ratio'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 7' }],
  },
  next: [
    { tool: 'ratemaking.loss_ratio_method', label: 'Loss Ratio Method', build: input => ({ fixed: input.fixed, variable: input.variable, profit: input.profit }) },
  ],
}
