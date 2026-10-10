import { ToolInputError, type ToolSpec } from '../types'

export const lossRatioMethod: ToolSpec = {
  id: 'ratemaking.loss_ratio_method',
  version: '1.0.0',
  name: 'Loss Ratio Method',
  area: 'ratemaking',
  answers: "What's the indicated rate change?",
  aka: ['indicated rate change', 'rate indication', 'LR method'],
  fields: [
    {
      kind: 'number', key: 'loss_ratio', label: 'Loss & LAE ratio', symbol: 'LR', unit: 'percent', min: 0, max: 5, sliderMax: 1.2, step: 0.005, default: 0.65,
      description: 'Projected ultimate loss and LAE over projected earned premium at current rates, as a decimal.',
    },
    { kind: 'number', key: 'fixed', label: 'Fixed expense ratio', symbol: 'F', unit: 'percent', min: 0, max: 1, sliderMax: 0.3, step: 0.0025, default: 0.05, description: 'Projected fixed expenses over projected premium at current rates.' },
    { kind: 'number', key: 'variable', label: 'Variable expense ratio', symbol: 'V', unit: 'percent', min: 0, max: 1, sliderMax: 0.5, step: 0.0025, default: 0.2, description: 'Variable expenses as a share of premium.' },
    { kind: 'number', key: 'profit', label: 'Profit & contingency', symbol: 'Q', unit: 'percent', judgment: true, min: -0.5, max: 1, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The target underwriting profit and contingency provision, as a share of premium.' },
  ],
  notation: () => 'ΔR = (LR + F) / (1 − V − Q) − 1',
  view: 'none',
  compute: input => {
    const LR = Number(input.loss_ratio)
    const F = Number(input.fixed)
    const V = Number(input.variable)
    const Q = Number(input.profit)
    const plr = 1 - V - Q
    if (plr <= 0) throw new ToolInputError('variable', 'V + Q must be below 100%: nothing would be left for losses and fixed expenses.')
    const change = (LR + F) / plr - 1
    return {
      tiles: [
        { symbol: 'ΔR', label: 'Indicated change', value: change, unit: 'percent' },
        { symbol: 'PLR', label: '1 − V − Q', value: plr, unit: 'percent' },
      ],
      trace: [
        { label: 'Variable permissible loss ratio', formula: `1 − ${V} − ${Q}`, result: plr, unit: 'percent' },
        { label: 'Indicated change', formula: `(${LR} + ${F}) / ${plr.toFixed(4)} − 1`, result: change, unit: 'percent' },
      ],
      warnings: [],
      values: { indicated_change: change, variable_permissible_loss_ratio: plr },
    }
  },
  method: {
    concepts: ['Loss Ratio Method', 'Permissible Loss Ratio'],
    readings: [{ resource: 'Basic Ratemaking (Werner - 2016)', locator: 'Ch. 8' }],
  },
}
