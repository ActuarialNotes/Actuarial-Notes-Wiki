import { formatValue } from '../format'
import { ToolInputError, type TableRow, type ToolSpec } from '../types'
import { flowMeasures } from './durationConvexity'

/** How near two present values or durations must be to count as equal: a hundredth of a percent. */
const MATCH = 1e-4

export const redingtonImmunization: ToolSpec = {
  id: 'finance.redington_immunization',
  version: '1.0.0',
  name: 'Redington Immunization',
  area: 'finance',
  answers: 'Are these assets Redington-immunized against these liabilities?',
  aka: ['immunization', 'ALM', 'asset liability matching'],
  fields: [
    { kind: 'number', key: 'i', label: 'Annual effective rate', symbol: 'i', unit: 'percent', min: -0.5, max: 2, sliderMax: 0.2, step: 0.0025, default: 0.05, description: 'The flat annual effective rate both sides are valued at. Times are in years.' },
    {
      kind: 'table', key: 'flows', label: 'Cash flows', minRows: 1, maxRows: 1200,
      description: 'Each time in years with the asset cash flow and the liability cash flow due then (0 where there is none).',
      columns: [
        { key: 'time', label: 'Time t', kind: 'number', unit: 'years' },
        { key: 'asset', label: 'Asset', kind: 'number', unit: 'money' },
        { key: 'liability', label: 'Liability', kind: 'number', unit: 'money' },
      ],
      default: [
        // At 5%, assets matching the liability's value and duration: 10,000v − 5,250v² at 1, and 5,250 at 3.
        { time: 1, asset: 4761.9, liability: 0 },
        { time: 2, asset: 0, liability: 10000 },
        { time: 3, asset: 5250, liability: 0 },
      ],
    },
  ],
  notation: () => 'P_A = P_L,  D_A = D_L,  C_A > C_L',
  view: 'table',
  grid: 'flows',
  compute: input => {
    const i = Number(input.i)
    const flows = input.flows as TableRow[]
    const A = flowMeasures(flows, i, 'asset')
    const L = flowMeasures(flows, i, 'liability')
    if (!(A.pv > 0) || !(L.pv > 0)) throw new ToolInputError('flows', 'Both the assets and the liabilities need a positive present value.')
    const v = 1 / (1 + i)
    const rows = flows.map(r => Object.assign({}, r, {
      pv_asset: Number(r.asset) * v ** Number(r.time),
      pv_liability: Number(r.liability) * v ** Number(r.time),
    }))
    const pvMatch = Math.abs(A.pv - L.pv) <= MATCH * L.pv
    const durationMatch = Math.abs(A.modified - L.modified) <= MATCH * Math.max(L.modified, 1)
    const convexityHolds = A.convexity > L.convexity
    const immunized = pvMatch && durationMatch && convexityHolds
    const failed = [
      !pvMatch && `present values differ (${formatValue(A.pv, 'money')} against ${formatValue(L.pv, 'money')})`,
      !durationMatch && `modified durations differ (${formatValue(A.modified, 'years')} against ${formatValue(L.modified, 'years')})`,
      !convexityHolds && `the assets' convexity (${formatValue(A.convexity, 'plain')}) doesn't exceed the liabilities' (${formatValue(L.convexity, 'plain')})`,
    ].filter(Boolean) as string[]
    return {
      tiles: [
        { symbol: 'P_A − P_L', label: 'Surplus', value: A.pv - L.pv, unit: 'money' },
        { symbol: 'D_A − D_L', label: 'Duration gap', value: A.modified - L.modified, unit: 'years' },
        { symbol: 'C_A − C_L', label: 'Convexity gap', value: A.convexity - L.convexity, unit: 'plain' },
      ],
      table: {
        columns: [
          { key: 'time', label: 'Time t', kind: 'number', unit: 'years' },
          { key: 'asset', label: 'Asset', kind: 'number', unit: 'money' },
          { key: 'liability', label: 'Liability', kind: 'number', unit: 'money' },
          { key: 'pv_asset', label: 'PV asset', kind: 'number', unit: 'money', computed: true },
          { key: 'pv_liability', label: 'PV liability', kind: 'number', unit: 'money', computed: true },
        ],
        rows,
        footer: { time: 'Total', asset: null, liability: null, pv_asset: A.pv, pv_liability: L.pv },
      },
      trace: [
        { label: 'PV of assets', formula: 'Σ Aₜ vᵗ', result: A.pv, unit: 'money' },
        { label: 'PV of liabilities', formula: 'Σ Lₜ vᵗ', result: L.pv, unit: 'money' },
        { label: 'Macaulay duration, assets', formula: 'Σ t Aₜ vᵗ / P_A', result: A.macaulay, unit: 'years' },
        { label: 'Macaulay duration, liabilities', formula: 'Σ t Lₜ vᵗ / P_L', result: L.macaulay, unit: 'years' },
        { label: 'Modified duration, assets', formula: 'D_A · v', result: A.modified, unit: 'years' },
        { label: 'Modified duration, liabilities', formula: 'D_L · v', result: L.modified, unit: 'years' },
        { label: 'Convexity, assets', formula: 'Σ t(t + 1) Aₜ v^(t+2) / P_A', result: A.convexity, unit: 'plain' },
        { label: 'Convexity, liabilities', formula: 'Σ t(t + 1) Lₜ v^(t+2) / P_L', result: L.convexity, unit: 'plain' },
      ],
      warnings: immunized ? [] : [`Not Redington-immunized: ${failed.join('; ')}.`],
      values: {
        immunized,
        pv_assets: A.pv,
        pv_liabilities: L.pv,
        macaulay_assets: A.macaulay,
        macaulay_liabilities: L.macaulay,
        modified_assets: A.modified,
        modified_liabilities: L.modified,
        convexity_assets: A.convexity,
        convexity_liabilities: L.convexity,
      },
      summary: immunized
        ? `Redington-immunized at ${formatValue(i, 'percent')}: present values and durations match, and the assets are more convex.`
        : `Not Redington-immunized at ${formatValue(i, 'percent')}: ${failed.join('; ')}.`,
    }
  },
  method: { concepts: ['Redington Immunization', 'Immunization'], readings: [] },
}
