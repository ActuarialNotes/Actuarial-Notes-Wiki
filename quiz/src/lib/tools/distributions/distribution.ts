import { DISTRIBUTIONS, type DistParams, type DistributionKey } from '../../distributions'
import { formatValue } from '../format'
import { bisect } from '../numeric'
import { ToolInputError, type NumberField, type ToolInput, type ToolSpec } from '../types'

/**
 * The simulators' own catalogue (`lib/distributions.ts`), with its exam
 * parameterisations, as one tool: a probability, a quantile and the moments.
 * Each parameter field is drawn only for the families that take it.
 */
const KEYS = Object.keys(DISTRIBUTIONS) as DistributionKey[]
const takes = (param: string) => KEYS.filter(k => DISTRIBUTIONS[k].params.some(p => p.key === param))

const param = (key: string, f: Omit<NumberField, 'kind' | 'key' | 'showWhen'>): NumberField => ({ kind: 'number', key, showWhen: { field: 'family', in: takes(key) }, ...f })

const PARAMS: NumberField[] = [
  param('mu', { label: 'Mean', symbol: 'μ', unit: 'plain', min: -1e12, max: 1e12, sliderMin: -10, sliderMax: 10, step: 0.1, default: 0, description: 'μ: the normal mean; for the lognormal, the mean of ln X.' }),
  param('sigma', { label: 'Standard deviation', symbol: 'σ', unit: 'plain', min: 1e-9, max: 1e12, sliderMax: 5, step: 0.1, default: 1, description: 'σ: the normal standard deviation; for the lognormal, that of ln X.' }),
  param('theta', { label: 'Scale', symbol: 'θ', unit: 'plain', min: 1e-9, max: 1e12, sliderMax: 10, step: 0.1, default: 1, description: 'θ: the scale (an exponential\'s mean; a gamma\'s mean is αθ).' }),
  param('alpha', { label: 'Shape', symbol: 'α', unit: 'plain', min: 1e-6, max: 1e6, sliderMax: 20, step: 0.1, default: 2, description: 'α: the gamma or beta shape.' }),
  param('beta', { label: 'Second shape', symbol: 'β', unit: 'plain', min: 1e-6, max: 1e6, sliderMax: 10, step: 0.1, default: 5, description: 'β: the beta\'s second shape.' }),
  param('lambda', { label: 'Mean count', symbol: 'λ', unit: 'plain', min: 1e-9, max: 1e5, sliderMax: 30, step: 0.1, default: 4, description: 'λ: the Poisson mean.' }),
  param('n', { label: 'Trials, or sample size', symbol: 'n', unit: 'count', integer: true, min: 1, max: 100000, sliderMax: 100, step: 1, default: 10, description: 'n: the binomial\'s trials, or the hypergeometric\'s sample size.' }),
  param('p', { label: 'Success probability', symbol: 'p', unit: 'plain', min: 1e-9, max: 1, sliderMax: 1, step: 0.01, default: 0.5, description: 'p: the chance of a success on each trial.' }),
  param('r', { label: 'Successes required', symbol: 'r', unit: 'count', integer: true, min: 1, max: 100000, sliderMax: 20, step: 1, default: 3, description: 'r: the negative binomial\'s successes (it counts total trials to the r-th).' }),
  param('N', { label: 'Population size', symbol: 'N', unit: 'count', integer: true, min: 1, max: 100000, sliderMax: 200, step: 1, default: 50, description: 'N: the hypergeometric population.' }),
  param('K', { label: 'Successes in population', symbol: 'K', unit: 'count', integer: true, min: 0, max: 100000, sliderMax: 50, step: 1, default: 15, description: 'K: the hypergeometric population\'s successes.' }),
]

function params(input: ToolInput, key: DistributionKey): DistParams {
  const spec = DISTRIBUTIONS[key]
  const p: DistParams = Object.fromEntries(spec.params.map(q => [q.key, Number(input[q.key])]))
  if (key === 'hypergeometric' && (p.K > p.N || p.n > p.N)) throw new ToolInputError('N', 'The population N must hold at least K successes and the sample of n.')
  if (key === 'binomial' && p.p > 1) throw new ToolInputError('p', 'p is a probability: at most 1.')
  return p
}

/** The smallest x with F(x) ≥ q: integers for a discrete family, bisected for a continuous one. */
function quantile(key: DistributionKey, p: DistParams, q: number): number {
  const spec = DISTRIBUTIONS[key]
  const [lo0, hi0] = spec.range(p)
  if (spec.kind === 'discrete') {
    let k = Math.max(0, Math.floor(lo0) - 1)
    while (spec.cdf(k, p) < q - 1e-12 && k < 1e7) k++
    return k
  }
  let lo = lo0
  let hi = hi0
  for (let n = 0; spec.cdf(lo, p) > q && n < 200; n++) lo -= Math.max(1, Math.abs(lo))
  for (let n = 0; spec.cdf(hi, p) < q && n < 200; n++) hi += Math.max(1, Math.abs(hi))
  return bisect(x => spec.cdf(x, p) - q, lo, hi)
}

export const distribution: ToolSpec = {
  id: 'distributions.distribution',
  version: '1.0.0',
  name: 'Distribution',
  area: 'distributions',
  answers: "What's the probability, quantile or moment?",
  aka: ['probability', 'quantile', 'percentile', 'PDF', 'moments'],
  fields: [
    {
      kind: 'choice', key: 'family', label: 'Distribution',
      description: 'The distribution, in the parameterisation of its concept page: exponential and gamma by scale θ, the geometric counting trials to the first success (k ≥ 1), the negative binomial total trials to the r-th.',
      options: KEYS.map(k => ({ value: k, label: DISTRIBUTIONS[k].name })),
      default: 'normal',
    },
    ...PARAMS,
    { kind: 'number', key: 'x', label: 'Value', symbol: 'x', unit: 'plain', min: -1e12, max: 1e12, sliderMin: -10, sliderMax: 10, step: 0.1, default: 1, description: 'The value x for P(X ≤ x) and P(X > x). For a count, P(X ≥ k) is P(X > k − 1).' },
    { kind: 'number', key: 'q', label: 'Quantile level', symbol: 'q', unit: 'percent', min: 1e-9, max: 0.999999999, sliderMax: 0.99, step: 0.01, default: 0.95, description: 'The level q for the quantile, the smallest x with F(x) ≥ q.' },
  ],
  notation: input => DISTRIBUTIONS[String(input.family) as DistributionKey].notation(params(input, String(input.family) as DistributionKey)),
  view: 'table',
  compute: input => {
    const key = String(input.family) as DistributionKey
    const spec = DISTRIBUTIONS[key]
    const p = params(input, key)
    const x = Number(input.x)
    const q = Number(input.q)
    const F = spec.cdf(x, p)
    const xq = quantile(key, p, q)
    const m = spec.moments(p)
    const rows = [
      { measure: 'Mean', value: m.mean },
      { measure: 'Variance', value: m.variance },
      { measure: 'Standard deviation', value: m.sd },
      ...(m.skewness === null ? [] : [{ measure: 'Skewness', value: m.skewness }]),
      ...(m.median === null ? [] : [{ measure: 'Median', value: m.median }]),
      ...(m.mode === null ? [] : [{ measure: 'Mode', value: m.mode }]),
    ]
    return {
      tiles: [
        { symbol: 'F(x)', label: 'P(X ≤ x)', value: F, unit: 'plain' },
        { symbol: 'S(x)', label: 'P(X > x)', value: 1 - F, unit: 'plain' },
        { symbol: 'x_q', label: `q = ${formatValue(q, 'percent')}`, value: xq, unit: 'plain' },
      ],
      table: {
        columns: [
          { key: 'measure', label: 'Moment', kind: 'text' },
          { key: 'value', label: '', kind: 'number', unit: 'plain', computed: true },
        ],
        rows,
      },
      trace: [
        { label: `${spec.kind === 'discrete' ? 'Mass' : 'Density'} at x`, formula: `${spec.kind === 'discrete' ? 'p' : 'f'}(${x})`, result: spec.density(x, p), unit: 'plain' },
        { label: 'Distribution function', formula: `F(${x}) = P(X ≤ ${x})`, result: F, unit: 'plain' },
        { label: 'Quantile', formula: `the smallest x with F(x) ≥ ${q}`, result: xq, unit: 'plain' },
      ],
      warnings: [],
      values: { cdf: F, survival: 1 - F, quantile: xq, density: spec.density(x, p), mean: m.mean, variance: m.variance, sd: m.sd, skewness: m.skewness, median: m.median, mode: m.mode },
      summary: `For ${spec.notation(p)}: P(X ≤ ${x}) = ${formatValue(F, 'plain')}, the ${formatValue(q, 'percent')} quantile is ${formatValue(xq, 'plain')}, and the mean is ${formatValue(m.mean, 'plain')}.`,
    }
  },
  method: { concepts: ['Continuous Univariate Distributions', 'Discrete Univariate Distributions'], readings: [] },
}
