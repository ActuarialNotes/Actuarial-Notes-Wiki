/**
 * The loss models the deductible and limit tools price (Loss Models' and the
 * exam tables' parameterisations): each family's survival function, mean and
 * limited expected value E[X ∧ u], in closed form. Pure; the tools add the
 * fields and the card.
 */

import { gammaFn, regularizedGammaP, standardNormalCdf } from '../../distributionMath'
import { ToolInputError, type ChoiceField, type NumberField, type ToolInput } from '../types'

export type LossFamily = 'exponential' | 'uniform' | 'pareto' | 'single_pareto' | 'gamma' | 'lognormal' | 'weibull'

export interface LossModel {
  family: LossFamily
  label: string
  /** P(X > x). */
  survival: (x: number) => number
  /** E[X], Infinity where it doesn't exist. */
  mean: number
  /** E[X ∧ u]. */
  lev: (u: number) => number
  /** The model as the exam tables write it. */
  notation: string
}

export const FAMILY: ChoiceField = {
  kind: 'choice',
  key: 'family',
  label: 'Loss distribution',
  description: 'The ground-up loss distribution, in the exam tables\' parameterisation: Pareto is the two-parameter (Lomax) form on x > 0; the single-parameter Pareto lives on x > θ.',
  options: [
    { value: 'exponential', label: 'Exponential' },
    { value: 'uniform', label: 'Uniform' },
    { value: 'pareto', label: 'Pareto' },
    { value: 'single_pareto', label: 'Single-parameter Pareto' },
    { value: 'gamma', label: 'Gamma' },
    { value: 'lognormal', label: 'Lognormal' },
    { value: 'weibull', label: 'Weibull' },
  ],
  default: 'exponential',
}

const scaled = ['exponential', 'pareto', 'single_pareto', 'gamma', 'weibull']

/** Each family's parameters, drawn only while that family is chosen. */
export const PARAMETERS: NumberField[] = [
  { kind: 'number', key: 'theta', label: 'Scale', symbol: 'θ', unit: 'plain', min: 1e-9, max: 1e12, sliderMax: 10000, step: 10, default: 1000, description: 'The scale θ: the mean of an exponential; the lower bound of a single-parameter Pareto.', showWhen: { field: 'family', in: scaled } },
  { kind: 'number', key: 'alpha', label: 'Shape', symbol: 'α', unit: 'plain', min: 1e-6, max: 1e6, sliderMax: 10, step: 0.1, default: 3, description: 'The shape α of a Pareto, single-parameter Pareto or gamma.', showWhen: { field: 'family', in: ['pareto', 'single_pareto', 'gamma'] } },
  { kind: 'number', key: 'tau', label: 'Shape', symbol: 'τ', unit: 'plain', min: 1e-6, max: 1e6, sliderMax: 5, step: 0.05, default: 1.5, description: 'The Weibull shape τ.', showWhen: { field: 'family', in: ['weibull'] } },
  { kind: 'number', key: 'mu', label: 'Log-mean', symbol: 'μ', unit: 'plain', min: -1e3, max: 1e3, sliderMax: 15, step: 0.05, default: 7, description: 'The lognormal μ: the mean of ln X.', showWhen: { field: 'family', in: ['lognormal'] } },
  { kind: 'number', key: 'sigma', label: 'Log-sd', symbol: 'σ', unit: 'plain', min: 1e-9, max: 1e3, sliderMax: 3, step: 0.05, default: 1, description: 'The lognormal σ: the standard deviation of ln X.', showWhen: { field: 'family', in: ['lognormal'] } },
  { kind: 'number', key: 'a', label: 'From', symbol: 'a', unit: 'plain', min: 0, max: 1e12, sliderMax: 10000, step: 10, default: 0, description: 'The uniform\'s lower end (losses are never negative).', showWhen: { field: 'family', in: ['uniform'] } },
  { kind: 'number', key: 'b', label: 'To', symbol: 'b', unit: 'plain', min: 1e-9, max: 1e12, sliderMax: 10000, step: 10, default: 1000, description: 'The uniform\'s upper end.', showWhen: { field: 'family', in: ['uniform'] } },
]

const fmt = (x: number) => (Number.isInteger(x) ? String(x) : String(Number(x.toPrecision(6))))
const P = regularizedGammaP

/** The model a tool's input names. */
export function lossModel(input: ToolInput): LossModel {
  const family = String(input.family) as LossFamily
  const theta = Number(input.theta)
  const alpha = Number(input.alpha)
  switch (family) {
    case 'exponential':
      return {
        family, label: 'Exponential', notation: `Exp(θ = ${fmt(theta)})`,
        survival: x => (x <= 0 ? 1 : Math.exp(-x / theta)),
        mean: theta,
        lev: u => (u <= 0 ? 0 : theta * (1 - Math.exp(-u / theta))),
      }
    case 'uniform': {
      const a = Number(input.a)
      const b = Number(input.b)
      if (!(b > a)) throw new ToolInputError('b', 'The uniform\'s upper end must be above its lower end.')
      return {
        family, label: 'Uniform', notation: `U(${fmt(a)}, ${fmt(b)})`,
        survival: x => (x <= a ? 1 : x >= b ? 0 : (b - x) / (b - a)),
        mean: (a + b) / 2,
        lev: u => (u <= 0 ? 0 : u <= a ? u : u >= b ? (a + b) / 2 : a + ((b - a) ** 2 - (b - u) ** 2) / (2 * (b - a))),
      }
    }
    case 'pareto':
      return {
        family, label: 'Pareto', notation: `Pareto(α = ${fmt(alpha)}, θ = ${fmt(theta)})`,
        survival: x => (x <= 0 ? 1 : (theta / (x + theta)) ** alpha),
        mean: alpha > 1 ? theta / (alpha - 1) : Infinity,
        lev: u => {
          if (u <= 0) return 0
          if (alpha === 1) return theta * Math.log((u + theta) / theta)
          return (theta / (alpha - 1)) * (1 - (theta / (u + theta)) ** (alpha - 1))
        },
      }
    case 'single_pareto':
      return {
        family, label: 'Single-parameter Pareto', notation: `Single Pareto(α = ${fmt(alpha)}, θ = ${fmt(theta)})`,
        survival: x => (x <= theta ? 1 : (theta / x) ** alpha),
        mean: alpha > 1 ? (alpha * theta) / (alpha - 1) : Infinity,
        lev: u => {
          if (u <= theta) return Math.max(u, 0)
          if (alpha === 1) return theta * (1 + Math.log(u / theta))
          return (alpha * theta) / (alpha - 1) - theta ** alpha / ((alpha - 1) * u ** (alpha - 1))
        },
      }
    case 'gamma':
      return {
        family, label: 'Gamma', notation: `Gamma(α = ${fmt(alpha)}, θ = ${fmt(theta)})`,
        survival: x => (x <= 0 ? 1 : 1 - P(alpha, x / theta)),
        mean: alpha * theta,
        lev: u => (u <= 0 ? 0 : alpha * theta * P(alpha + 1, u / theta) + u * (1 - P(alpha, u / theta))),
      }
    case 'lognormal': {
      const mu = Number(input.mu)
      const sigma = Number(input.sigma)
      return {
        family, label: 'Lognormal', notation: `Lognormal(μ = ${fmt(mu)}, σ = ${fmt(sigma)})`,
        survival: x => (x <= 0 ? 1 : 1 - standardNormalCdf((Math.log(x) - mu) / sigma)),
        mean: Math.exp(mu + sigma ** 2 / 2),
        lev: u => {
          if (u <= 0) return 0
          const z = (Math.log(u) - mu) / sigma
          return Math.exp(mu + sigma ** 2 / 2) * standardNormalCdf(z - sigma) + u * (1 - standardNormalCdf(z))
        },
      }
    }
    case 'weibull': {
      const tau = Number(input.tau)
      const g = gammaFn(1 + 1 / tau)
      return {
        family, label: 'Weibull', notation: `Weibull(τ = ${fmt(tau)}, θ = ${fmt(theta)})`,
        survival: x => (x <= 0 ? 1 : Math.exp(-((x / theta) ** tau))),
        mean: theta * g,
        lev: u => (u <= 0 ? 0 : theta * g * P(1 + 1 / tau, (u / theta) ** tau) + u * Math.exp(-((u / theta) ** tau))),
      }
    }
    default:
      throw new ToolInputError('family', `Unknown loss distribution "${family}".`)
  }
}
