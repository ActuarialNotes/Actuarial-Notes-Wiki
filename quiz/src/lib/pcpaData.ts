/**
 * The data behind the PCPA project simulator (`docs/pcpa-project.md`).
 *
 * The CAS hands each project candidate "one or two data sets" drawn for a
 * business problem from a pool of comparable projects. The real ones are
 * proprietary, so the simulator draws its own — and drawing them, rather than
 * shipping a fixed file, is what makes the simulator worth more than a practice
 * data set:
 *
 * - **Every attempt is a new sample.** The seed is the attempt's, so a second
 *   attempt at the same case is new data, the way a second project window is a
 *   new project.
 * - **The truth is known.** Each case is generated from an explicit model — a
 *   GLM-shaped structure plus the frictions real data has (latent risk,
 *   total-loss caps, large losses) — so after submission the examiner's notes
 *   can say what the effects really were, and a model can be scored on fresh
 *   data against the best model possible (`generateAssessment`).
 * - **The data is realistically dirty.** Every problem the content outline's
 *   Domain A names — variables to transform, outliers, data errors, missing
 *   data — is planted on purpose and *counted*, so the notes can tell the
 *   candidate exactly what was there to find (`GeneratedCase.issues`).
 *
 * Pure and deterministic: the same case and seed give byte-identical tables.
 */

import {
  createRng,
  openUnit,
  regularizedGammaP,
  sampleGamma,
  samplePoisson,
  sampleStandardNormal,
  type Rng,
} from './distributionMath'
import type { CsvValue } from './csv'

export type CaseId = 'bop-frequency' | 'auto-severity' | 'ho-water'

export const CASE_IDS: CaseId[] = ['bop-frequency', 'auto-severity', 'ho-water']

export interface DataTable {
  /** File name, as it lands in the workspace's `data/` folder. */
  file: string
  columns: string[]
  rows: CsvValue[][]
}

/** A problem planted in the data, and how a careful candidate would handle it. */
export interface PlantedIssue {
  id: string
  /** The data set it is in. */
  file: string
  title: string
  handling: string
  /** How many rows (or levels) it touches in *this* sample. */
  count: number
}

/** One true effect of the data-generating model, as a multiplicative relativity. */
export interface TrueEffect {
  variable: string
  level: string
  relativity: number
  note?: string
}

export interface GeneratedCase {
  caseId: CaseId
  seed: number
  tables: DataTable[]
  issues: PlantedIssue[]
  effects: TrueEffect[]
  /** Headline facts about this sample, for the examiner's notes. */
  facts: { label: string; value: string }[]
}

/**
 * Fresh rows from the same model, for scoring a finished model the way the
 * rubric's "performs reasonably well on an assessment data set" asks. The
 * candidate sees `table` only after submitting; `actual` and `expected` never
 * leave the app.
 */
export interface AssessmentData {
  table: DataTable
  idColumn: string
  /** The simulated outcome for each row, in table order. */
  actual: number[]
  /** The generating model's expectation for each row — the best any model can do. */
  expected: number[]
  /** Exposure weight per row: policy years, or 1 per claim. */
  weight: number[]
  /** What one prediction is, in words. */
  predictionMeaning: string
}

// ─── Sampling helpers ────────────────────────────────────────────────────────

class Draw {
  constructor(readonly rng: Rng) {}
  u(): number { return this.rng() }
  bern(p: number): boolean { return this.rng() < p }
  int(lo: number, hi: number): number { return lo + Math.floor(this.rng() * (hi - lo + 1)) }
  uniform(lo: number, hi: number): number { return lo + this.rng() * (hi - lo) }
  normal(mean = 0, sd = 1): number { return mean + sd * sampleStandardNormal(this.rng) }
  /** Lognormal with the given *median*. */
  lognormal(median: number, sigma: number): number { return median * Math.exp(sigma * sampleStandardNormal(this.rng)) }
  gamma(shape: number, scale: number): number { return sampleGamma(shape, scale, this.rng) }
  poisson(lambda: number): number { return lambda <= 0 ? 0 : samplePoisson(lambda, this.rng) }
  pick<T>(items: readonly T[], weights: readonly number[]): T {
    let total = 0
    for (const w of weights) total += w
    let r = this.rng() * total
    for (let i = 0; i < items.length; i++) {
      r -= weights[i]
      if (r < 0) return items[i]
    }
    return items[items.length - 1]
  }
  /** Pareto (Lomax) multiplier with tail index α: mean 1/(α − 1). */
  lomax(alpha: number): number { return Math.pow(openUnit(this.rng), -1 / alpha) - 1 }
}

const round = (x: number, digits = 0): number => {
  const f = 10 ** digits
  return Math.round(x * f) / f
}

const roundTo = (x: number, step: number): number => Math.round(x / step) * step

function isoDate(year: number, dayOfYear: number): string {
  const d = new Date(Date.UTC(year, 0, 1) + Math.floor(dayOfYear) * 86_400_000)
  return d.toISOString().slice(0, 10)
}

function addDays(iso: string, days: number): string {
  const d = new Date(Date.parse(`${iso}T00:00:00Z`) + Math.floor(days) * 86_400_000)
  return d.toISOString().slice(0, 10)
}

/**
 * Appends exact copies of a sample of rows at random positions — the classic
 * system-migration duplicate. Returns how many were added.
 */
function plantDuplicates(rows: CsvValue[][], share: number, draw: Draw): number {
  const count = Math.max(1, Math.round(rows.length * share))
  for (let i = 0; i < count; i++) {
    const source = rows[draw.int(0, rows.length - 1)]
    rows.splice(draw.int(0, rows.length), 0, [...source])
  }
  return count
}

/** Levels of a categorical column with fewer than `min` rows. */
function thinLevels(values: CsvValue[], min: number): number {
  const counts = new Map<CsvValue, number>()
  for (const v of values) if (v !== null && v !== '') counts.set(v, (counts.get(v) ?? 0) + 1)
  let thin = 0
  for (const c of counts.values()) if (c < min) thin++
  return thin
}

/** Deterministic sub-stream, so the assessment draw never disturbs the training one. */
function streamSeed(seed: number, salt: number): number {
  return (Math.imul(seed ^ salt, 0x9e3779b1) ^ (seed >>> 7)) >>> 0
}

// ─── Case 1: small-commercial BOP claim frequency ───────────────────────────

interface Sector { name: string; effect: number; wage: number }

/** 2-digit NAICS sectors (ranges as the census publishes them). */
const BOP_SECTORS: Record<string, Sector> = {
  '23': { name: 'Construction', effect: 0.35, wage: 62_000 },
  '31-33': { name: 'Manufacturing', effect: 0.2, wage: 58_000 },
  '42': { name: 'Wholesale Trade', effect: 0, wage: 66_000 },
  '44-45': { name: 'Retail Trade', effect: 0.1, wage: 36_000 },
  '48-49': { name: 'Transportation and Warehousing', effect: 0.3, wage: 52_000 },
  '53': { name: 'Real Estate and Rental and Leasing', effect: -0.15, wage: 55_000 },
  '54': { name: 'Professional, Scientific, and Technical Services', effect: -0.4, wage: 85_000 },
  '56': { name: 'Administrative and Support and Waste Management and Remediation Services', effect: 0.15, wage: 38_000 },
  '62': { name: 'Health Care and Social Assistance', effect: -0.2, wage: 60_000 },
  '72': { name: 'Accommodation and Food Services', effect: 0.45, wage: 26_000 },
  '81': { name: 'Other Services (except Public Administration)', effect: 0.1, wage: 34_000 },
}

export function naicsSector(code: number): string {
  const two = String(code).slice(0, 2)
  if (two === '31' || two === '32' || two === '33') return '31-33'
  if (two === '44' || two === '45') return '44-45'
  if (two === '48' || two === '49') return '48-49'
  return two
}

/** 2017 NAICS codes on the book, with their share of policies. */
const BOP_NAICS: [code: number, weight: number][] = [
  [236118, 14], [236220, 5], [238160, 4], [238210, 12], [238220, 14], [238320, 8], [238350, 3], [238990, 6],
  [311811, 5], [312120, 1.2], [323111, 3], [332710, 4], [337110, 1.5],
  [423430, 2], [423840, 5], [424410, 2.5],
  [441310, 4], [444130, 5], [445120, 9], [446110, 3], [448140, 4], [451110, 2.5], [453110, 3], [453220, 3],
  [484110, 4], [484210, 1.5], [492210, 2], [493110, 2.5],
  [531110, 9], [531120, 12], [531130, 3], [531210, 7],
  [541110, 11], [541211, 10], [541310, 3], [541330, 5], [541511, 6], [541611, 5], [541810, 2.5], [541921, 1], [541940, 3],
  [561612, 1.3], [561720, 6], [561730, 7], [561740, 1.2],
  [621111, 8], [621210, 7], [621310, 3], [621340, 3], [624410, 3],
  [722320, 2], [722410, 5], [722511, 16], [722513, 12], [722515, 3],
  [811111, 7], [811121, 3], [811192, 1.4], [812111, 2], [812112, 7], [812320, 2.5], [812910, 1.6],
]

const BOP_STATES = ['IL', 'WI', 'IN', 'MI', 'OH', 'MN'] as const
const BOP_STATE_WEIGHTS = [0.3, 0.14, 0.12, 0.18, 0.16, 0.1]
const BOP_STATE_EFFECT: Record<string, number> = { IL: 0.05, WI: -0.08, IN: 0, MI: 0.1, OH: 0, MN: -0.05 }
const BOP_STATE_NAMES: Record<string, string> = { IL: 'Illinois', WI: 'Wisconsin', IN: 'Indiana', MI: 'Michigan', OH: 'Ohio', MN: 'Minnesota' }
const BOP_CONSTRUCTION = ['Frame', 'Joisted Masonry', 'Non-Combustible', 'Masonry Non-Combustible', 'Fire Resistive'] as const
const BOP_CONSTRUCTION_WEIGHTS = [0.38, 0.3, 0.14, 0.1, 0.08]
const BOP_CONSTRUCTION_EFFECT: Record<string, number> = {
  Frame: 0.1, 'Joisted Masonry': 0, 'Non-Combustible': -0.05, 'Masonry Non-Combustible': -0.08, 'Fire Resistive': -0.12,
}
const BOP_DEDUCTIBLES = [500, 1000, 2500, 5000] as const
const BOP_DEDUCTIBLE_WEIGHTS = [0.22, 0.43, 0.24, 0.11]
const BOP_DEDUCTIBLE_EFFECT: Record<number, number> = { 500: 0, 1000: -0.1, 2500: -0.22, 5000: -0.38 }
const BOP_CHANNELS = ['Independent Agent', 'Captive Agent', 'Direct'] as const
const BOP_BASE = -2.05
const BOP_EMPLOYEE_ELASTICITY = 0.3
const BOP_TENURE_SLOPE = -0.12
const BOP_SPRINKLER_EFFECT = -0.12
const BOP_TREND = 0.03
/** Shape of the latent risk multiplier: Var = 1/k. */
const BOP_LATENT_SHAPE = 2

interface BopRisk {
  policyYear: number
  state: string
  naics: number
  sector: string
  employees: number
  payroll: number
  revenue: number
  yearsInBusiness: number
  construction: string
  sprinklered: boolean
  deductible: number
  channel: string
  /** Annual claim frequency before the latent multiplier. */
  mu0: number
  priorClaims: number
  exposure: number
  latent: number
}

function drawBopRisk(draw: Draw, codeNoise: Map<number, number>): BopRisk {
  const policyYear = draw.pick([2021, 2022, 2023, 2024], [0.22, 0.24, 0.26, 0.28])
  const state = draw.pick(BOP_STATES, BOP_STATE_WEIGHTS)
  const naics = draw.pick(BOP_NAICS.map(n => n[0]), BOP_NAICS.map(n => n[1]))
  const sector = naicsSector(naics)
  const employees = Math.min(250, Math.max(1, Math.round(draw.lognormal(6, 0.95))))
  const payroll = roundTo(employees * BOP_SECTORS[sector].wage * draw.lognormal(1, 0.3), 100)
  const revenue = roundTo(payroll * draw.lognormal(3.2, 0.45), 1000)
  const yearsInBusiness = Math.floor(draw.gamma(1.3, 9))
  const construction = draw.pick(BOP_CONSTRUCTION, BOP_CONSTRUCTION_WEIGHTS)
  const sprinklered = draw.bern(construction === 'Frame' || construction === 'Joisted Masonry' ? 0.12 : 0.5)
  const deductible = draw.pick(BOP_DEDUCTIBLES, BOP_DEDUCTIBLE_WEIGHTS)
  const channel = draw.pick(BOP_CHANNELS, [0.62, 0.23, 0.15])
  const eta = BOP_BASE
    + BOP_SECTORS[sector].effect
    + (codeNoise.get(naics) ?? 0)
    + BOP_EMPLOYEE_ELASTICITY * Math.log(employees / 6)
    + BOP_TENURE_SLOPE * Math.log1p(yearsInBusiness)
    + BOP_CONSTRUCTION_EFFECT[construction]
    + (sprinklered ? BOP_SPRINKLER_EFFECT : 0)
    + BOP_DEDUCTIBLE_EFFECT[deductible]
    + BOP_STATE_EFFECT[state]
    + BOP_TREND * (policyYear - 2021)
  const mu0 = Math.exp(eta)
  const latent = draw.gamma(BOP_LATENT_SHAPE, 1 / BOP_LATENT_SHAPE)
  const priorClaims = draw.poisson(3 * mu0 * latent)
  const exposure = draw.bern(0.86) ? 1 : round(draw.uniform(0.08, 1), 3)
  return { policyYear, state, naics, sector, employees, payroll, revenue, yearsInBusiness, construction, sprinklered, deductible, channel, mu0, priorClaims, exposure, latent }
}

/** E[claims] given everything a pricing actuary could know, prior claims included. */
function bopExpected(r: BopRisk): number {
  const k = BOP_LATENT_SHAPE
  return r.exposure * r.mu0 * (k + r.priorClaims) / (k + 3 * r.mu0)
}

function bopCodeNoise(draw: Draw): Map<number, number> {
  return new Map(BOP_NAICS.map(([code]) => [code, draw.normal(0, 0.08)]))
}

/** A missing tenure is likelier for a young business — so a blank is itself a signal. */
function bopTenureMissing(draw: Draw, yearsInBusiness: number): boolean {
  return draw.bern(yearsInBusiness < 3 ? 0.15 : 0.03)
}

export const BOP_POLICY_COLUMNS = [
  'policy_id', 'policy_year', 'effective_date', 'state', 'naics_code', 'employees', 'annual_payroll',
  'annual_revenue', 'years_in_business', 'construction', 'sprinklered', 'deductible', 'prior_claims_3yr',
  'agent_channel', 'earned_exposure', 'renewal_status',
]

export const BOP_CLAIM_COLUMNS = [
  'claim_id', 'policy_id', 'loss_date', 'report_date', 'coverage', 'incurred_loss', 'claim_status',
]

function generateBop(seed: number): GeneratedCase {
  const draw = new Draw(createRng(seed))
  const codeNoise = bopCodeNoise(draw)
  const n = 16_000
  const policies: CsvValue[][] = []
  const claims: { policyId: string; lossDate: string; coverage: string; incurred: number; recent: boolean }[] = []
  let cwp = 0
  let tenureMissing = 0
  let employeeCodes = 0
  let stateTypos = 0
  let naicsBlank = 0
  let exposureErrors = 0
  let realClaims = 0
  let exposureTotal = 0
  let nonRenewed = 0
  const claimsByCode = new Map<number, number>()

  // For the prior-claims relativities in the notes: mean E[G | p] by p.
  const priorPosterior = new Map<number, { sum: number; n: number }>()

  for (let i = 0; i < n; i++) {
    const r = drawBopRisk(draw, codeNoise)
    const policyId = `BOP-${String(200_000 + i * 3 + draw.int(0, 2)).padStart(7, '0')}`
    const effDay = draw.int(0, 364)
    const effective = isoDate(r.policyYear, effDay)
    const count = draw.poisson(r.exposure * r.mu0 * r.latent)
    realClaims += count
    exposureTotal += r.exposure
    claimsByCode.set(r.naics, (claimsByCode.get(r.naics) ?? 0) + count)
    const pBucket = Math.min(r.priorClaims, 3)
    const post = priorPosterior.get(pBucket) ?? { sum: 0, n: 0 }
    post.sum += (BOP_LATENT_SHAPE + r.priorClaims) / (BOP_LATENT_SHAPE + 3 * r.mu0)
    post.n++
    priorPosterior.set(pBucket, post)

    for (let c = 0; c < count; c++) {
      const coverage = draw.bern(0.55) ? 'Property' : 'Liability'
      const incurred = coverage === 'Property' ? draw.lognormal(9_000, 1.3) : draw.lognormal(14_000, 1.5)
      claims.push({
        policyId,
        lossDate: addDays(effective, draw.uniform(0, 365 * r.exposure)),
        coverage,
        incurred: round(Math.max(50, incurred), 2),
        recent: r.policyYear === 2024,
      })
    }
    // Claims closed without payment: reported, investigated, nothing paid.
    const cwpCount = draw.poisson(0.25 * r.exposure * r.mu0 * r.latent + 0.004)
    for (let c = 0; c < cwpCount; c++) {
      claims.push({ policyId, lossDate: addDays(effective, draw.uniform(0, 365 * r.exposure)), coverage: draw.bern(0.5) ? 'Property' : 'Liability', incurred: 0, recent: r.policyYear === 2024 })
      cwp++
    }

    // Non-renewal is decided *after* the term — by the claims it produced.
    const renewed = !draw.bern(0.07 + 0.22 * Math.min(count, 2))
    if (!renewed) nonRenewed++

    let state: string = r.state
    if (draw.bern(0.003)) {
      state = draw.bern(0.5) ? r.state.toLowerCase() : BOP_STATE_NAMES[r.state]
      stateTypos++
    }
    let naics: CsvValue = r.naics
    if (draw.bern(0.006)) { naics = null; naicsBlank++ }
    let employees: number = r.employees
    if (draw.bern(0.005)) { employees = draw.bern(0.6) ? 0 : 9999; employeeCodes++ }
    let years: CsvValue = r.yearsInBusiness
    if (bopTenureMissing(draw, r.yearsInBusiness)) { years = null; tenureMissing++ }
    let exposure: number = r.exposure
    if (draw.bern(0.003)) { exposure = draw.pick([0, 1.25, 1.5, 2], [1, 1, 1, 1]); exposureErrors++ }

    policies.push([
      policyId, r.policyYear, effective, state, naics, employees, r.payroll, r.revenue, years,
      r.construction, r.sprinklered ? 'Y' : 'N', r.deductible, r.priorClaims, r.channel, exposure,
      r.policyYear === 2024 ? 'Pending' : renewed ? 'Renewed' : 'Non-Renewed',
    ])
  }

  const duplicatePolicies = plantDuplicates(policies, 0.0025, draw)

  // Orphans: claims keyed to policies from another line of business.
  const orphanCount = Math.round(claims.length * 0.004)
  for (let i = 0; i < orphanCount; i++) {
    const year = draw.int(2021, 2024)
    claims.push({
      policyId: `CPP-${String(draw.int(500_000, 899_999)).padStart(7, '0')}`,
      lossDate: isoDate(year, draw.int(0, 364)),
      coverage: draw.bern(0.5) ? 'Property' : 'Liability',
      incurred: round(draw.lognormal(10_000, 1.3), 2),
      recent: year === 2024,
    })
  }

  claims.sort((a, b) => (a.lossDate < b.lossDate ? -1 : a.lossDate > b.lossDate ? 1 : 0))
  const claimRows: CsvValue[][] = claims.map((c, i) => {
    const open = draw.bern(c.recent ? 0.35 : 0.08) && c.incurred > 0
    return [
      `CL-${String(10_000 + i).padStart(6, '0')}`,
      c.policyId,
      c.lossDate,
      addDays(c.lossDate, Math.floor(draw.gamma(0.9, 14))),
      c.coverage,
      c.incurred,
      open ? 'Open' : 'Closed',
    ]
  })
  const duplicateClaims = plantDuplicates(claimRows, 0.008, draw)

  // Credibility is about claims, not policies: a code with 60 policies at a
  // 10% frequency has six claims to estimate its coefficient from.
  let thinCodes = 0
  for (const [code] of BOP_NAICS) if ((claimsByCode.get(code) ?? 0) < 25) thinCodes++

  const base0 = priorPosterior.get(0)
  const priorRel = (p: number) => {
    const b = priorPosterior.get(p)
    return b && base0 ? (b.sum / b.n) / (base0.sum / base0.n) : 1
  }

  const effects: TrueEffect[] = [
    ...Object.entries(BOP_SECTORS).map(([code, s]) => ({
      variable: 'NAICS sector', level: `${code} ${s.name}`, relativity: Math.exp(s.effect - BOP_SECTORS['54'].effect),
      note: code === '54' ? 'base — the largest, lowest-frequency sector' : undefined,
    })),
    { variable: 'Employees', level: 'doubling the headcount', relativity: 2 ** BOP_EMPLOYEE_ELASTICITY, note: `log-linear: β = ${BOP_EMPLOYEE_ELASTICITY} on ln(employees)` },
    { variable: 'Years in business', level: '10 years vs 0', relativity: Math.exp(BOP_TENURE_SLOPE * Math.log(11)), note: `β = ${BOP_TENURE_SLOPE} on ln(1 + years)` },
    ...BOP_CONSTRUCTION.map(c => ({ variable: 'Construction', level: c, relativity: Math.exp(BOP_CONSTRUCTION_EFFECT[c]), note: c === 'Joisted Masonry' ? 'base' : undefined })),
    { variable: 'Sprinklered', level: 'Y vs N', relativity: Math.exp(BOP_SPRINKLER_EFFECT) },
    ...BOP_DEDUCTIBLES.map(d => ({ variable: 'Deductible', level: `$${d.toLocaleString('en-US')}`, relativity: Math.exp(BOP_DEDUCTIBLE_EFFECT[d]), note: d === 500 ? 'base' : undefined })),
    ...BOP_STATES.map(s => ({ variable: 'State', level: s, relativity: Math.exp(BOP_STATE_EFFECT[s]), note: s === 'IN' || s === 'OH' ? 'base (no effect)' : undefined })),
    { variable: 'Policy year', level: 'per year', relativity: Math.exp(BOP_TREND), note: 'frequency trend' },
    ...[1, 2, 3].map(p => ({ variable: 'Prior claims (3 yr)', level: p === 3 ? '3 or more vs 0' : `${p} vs 0`, relativity: priorRel(p), note: p === 1 ? 'not causal — prior claims reveal each insured\'s unobserved risk level' : undefined })),
    { variable: 'Agent channel', level: 'any', relativity: 1, note: 'no effect in the generating model' },
    { variable: 'Payroll / revenue', level: 'any', relativity: 1, note: 'no effect beyond employees — both are proxies for size' },
  ]

  const issues: PlantedIssue[] = [
    { id: 'duplicate-policies', file: 'bop_policies.csv', title: 'Duplicate policy records', handling: 'Exact duplicate rows (same policy_id). Left in, each doubles its policy\'s exposure and, after the join, its claims. Drop exact duplicates before joining.', count: duplicatePolicies },
    { id: 'duplicate-claims', file: 'bop_claims.csv', title: 'Duplicate claim records', handling: 'The same claim_id appears twice. Count distinct claims.', count: duplicateClaims },
    { id: 'cwp', file: 'bop_claims.csv', title: 'Claims closed without payment', handling: 'The scope defines a claim as one with incurred loss above zero; zero-incurred claims must be excluded from the counts.', count: cwp },
    { id: 'orphan-claims', file: 'bop_claims.csv', title: 'Claims with no matching policy', handling: 'policy_ids from another line (CPP-…) that match nothing in the policy file. They cannot be modelled; note and drop them.', count: orphanCount },
    { id: 'exposure', file: 'bop_policies.csv', title: 'Invalid earned exposure', handling: 'Zero or above one policy year for an annual term. Remove (or correct) them — a zero exposure makes the log offset undefined.', count: exposureErrors },
    { id: 'employees', file: 'bop_policies.csv', title: 'Placeholder employee counts', handling: '0 and 9999 are system defaults for "unknown", not headcounts. Treat as missing, or remove.', count: employeeCodes },
    { id: 'tenure-missing', file: 'bop_policies.csv', title: 'Missing years in business', handling: 'Blank far more often for young businesses, so the blank itself carries signal: an "unknown" level (or indicator) beats imputing the median.', count: tenureMissing },
    { id: 'state-typos', file: 'bop_policies.csv', title: 'Inconsistent state codes', handling: 'Lower-case codes and spelled-out names ("il", "Michigan"). Standardise to the two-letter code.', count: stateTypos },
    { id: 'naics-blank', file: 'bop_policies.csv', title: 'Missing NAICS codes', handling: 'Blank industry code. Small enough to drop, or group as unknown.', count: naicsBlank },
    { id: 'naics-thin', file: 'bop_policies.csv', title: 'Thin NAICS codes', handling: 'Many 6-digit codes carry too few claims (fewer than 25 here) for a credible coefficient. Group to the 2-digit sector (31–33, 44–45 and 48–49 are single sectors) or to a coarser custom grouping — the CAS post-project summary names fitting at the 6-digit level as a common mistake.', count: thinCodes },
    { id: 'size-collinear', file: 'bop_policies.csv', title: 'Collinear size measures', handling: 'employees, annual_payroll and annual_revenue all measure size (strongly correlated on the log scale). Use one, on the log scale; together they give unstable, even sign-flipped, coefficients.', count: 3 },
    { id: 'skewed-size', file: 'bop_policies.csv', title: 'Right-skewed size variables', handling: 'Headcount, payroll and revenue span orders of magnitude; enter the chosen one as ln(x) so a log-link GLM reads it as an elasticity.', count: 3 },
    { id: 'leakage', file: 'bop_policies.csv', title: 'renewal_status is decided after the term', handling: 'Non-renewal follows the claims the term produced, so it predicts them perfectly well and is useless for pricing a new term. Exclude it (the scope limits predictors to what is known at quote).', count: nonRenewed },
    { id: 'spurious', file: 'bop_policies.csv', title: 'agent_channel has no effect', handling: 'Any apparent effect is noise; a good model tests it and leaves it out.', count: 1 },
  ]

  const claimCountByYear = realClaims / exposureTotal
  const facts = [
    { label: 'Policy records', value: policies.length.toLocaleString('en-US') },
    { label: 'Claim records', value: claimRows.length.toLocaleString('en-US') },
    { label: 'Paid claims (incurred > 0) on valid policies', value: realClaims.toLocaleString('en-US') },
    { label: 'Book claim frequency', value: `${claimCountByYear.toFixed(4)} per policy year` },
    {
      label: 'Overdispersion',
      value: `a latent risk multiplier with variance ${(1 / BOP_LATENT_SHAPE).toFixed(2)}. At a frequency near ${claimCountByYear.toFixed(2)} that adds only about ${Math.round(100 * claimCountByYear / BOP_LATENT_SHAPE)}% to a policy's count variance, and prior claims absorb part of it — so a Poisson and a negative binomial fit almost equally. The rubric rewards the evidence (dispersion statistic, a likelihood-ratio test), not the choice.`,
    },
  ]

  return {
    caseId: 'bop-frequency',
    seed,
    tables: [
      { file: 'bop_policies.csv', columns: BOP_POLICY_COLUMNS, rows: policies },
      { file: 'bop_claims.csv', columns: BOP_CLAIM_COLUMNS, rows: claimRows },
    ],
    issues,
    effects,
    facts,
  }
}

function assessBop(seed: number): AssessmentData {
  const draw = new Draw(createRng(streamSeed(seed, 0xb0b)))
  const codeNoise = bopCodeNoise(new Draw(createRng(seed)))
  const columns = ['row_id', ...BOP_POLICY_COLUMNS.filter(c => c !== 'policy_id' && c !== 'renewal_status')]
  const rows: CsvValue[][] = []
  const actual: number[] = []
  const expected: number[] = []
  const weight: number[] = []
  for (let i = 0; i < 5_000; i++) {
    const r = drawBopRisk(draw, codeNoise)
    const effective = isoDate(r.policyYear, draw.int(0, 364))
    rows.push([
      `A${String(i + 1).padStart(5, '0')}`, r.policyYear, effective, r.state, r.naics, r.employees, r.payroll,
      r.revenue, bopTenureMissing(draw, r.yearsInBusiness) ? null : r.yearsInBusiness, r.construction,
      r.sprinklered ? 'Y' : 'N', r.deductible, r.priorClaims, r.channel, r.exposure,
    ])
    actual.push(draw.poisson(r.exposure * r.mu0 * r.latent))
    expected.push(bopExpected(r))
    weight.push(r.exposure)
  }
  return {
    table: { file: 'assessment_policies.csv', columns, rows },
    idColumn: 'row_id',
    actual,
    expected,
    weight,
    predictionMeaning: 'the expected number of claims (incurred > 0) for the row\'s earned exposure',
  }
}

// ─── Case 2: personal auto collision severity ───────────────────────────────

interface Make {
  name: string
  weight: number
  value: number
  premium: number
  luxury: boolean
  /** The body types the make sells; all of them when absent. */
  bodies?: string[]
}

const AUTO_MAKES: Make[] = [
  { name: 'Toyota', weight: 15, value: 1, premium: 0, luxury: false },
  { name: 'Ford', weight: 13, value: 1.05, premium: 0, luxury: false, bodies: ['Sedan', 'SUV', 'Pickup', 'Coupe'] },
  { name: 'Chevrolet', weight: 12, value: 1, premium: 0, luxury: false, bodies: ['Sedan', 'SUV', 'Pickup', 'Hatchback', 'Coupe'] },
  { name: 'Honda', weight: 10, value: 0.98, premium: 0, luxury: false },
  { name: 'Nissan', weight: 7, value: 0.9, premium: 0, luxury: false, bodies: ['Sedan', 'SUV', 'Pickup', 'Hatchback'] },
  { name: 'Hyundai', weight: 6, value: 0.88, premium: 0, luxury: false, bodies: ['Sedan', 'SUV', 'Hatchback'] },
  { name: 'Kia', weight: 5, value: 0.86, premium: 0, luxury: false, bodies: ['Sedan', 'SUV', 'Hatchback', 'Minivan'] },
  { name: 'Jeep', weight: 5, value: 1.08, premium: 0, luxury: false, bodies: ['SUV', 'Pickup'] },
  { name: 'Subaru', weight: 4, value: 1, premium: 0, luxury: false, bodies: ['Sedan', 'SUV', 'Hatchback'] },
  { name: 'Ram', weight: 4, value: 1.15, premium: 0, luxury: false, bodies: ['Pickup'] },
  { name: 'GMC', weight: 3, value: 1.2, premium: 0, luxury: false, bodies: ['SUV', 'Pickup'] },
  { name: 'Mazda', weight: 2.5, value: 0.95, premium: 0, luxury: false, bodies: ['Sedan', 'SUV', 'Hatchback', 'Coupe'] },
  { name: 'Volkswagen', weight: 2.5, value: 0.95, premium: 0, luxury: false, bodies: ['Sedan', 'SUV', 'Hatchback'] },
  { name: 'Dodge', weight: 2, value: 1, premium: 0, luxury: false, bodies: ['Sedan', 'SUV', 'Coupe', 'Minivan'] },
  { name: 'Buick', weight: 1.5, value: 1.05, premium: 0, luxury: false, bodies: ['Sedan', 'SUV'] },
  { name: 'BMW', weight: 2, value: 1.65, premium: 0.1, luxury: true, bodies: ['Sedan', 'SUV', 'Coupe'] },
  { name: 'Mercedes-Benz', weight: 2, value: 1.75, premium: 0.1, luxury: true, bodies: ['Sedan', 'SUV', 'Coupe'] },
  { name: 'Lexus', weight: 1.8, value: 1.5, premium: 0.1, luxury: true, bodies: ['Sedan', 'SUV'] },
  { name: 'Audi', weight: 1.3, value: 1.6, premium: 0.1, luxury: true, bodies: ['Sedan', 'SUV', 'Coupe'] },
  { name: 'Tesla', weight: 1.6, value: 1.55, premium: 0.18, luxury: true, bodies: ['Sedan', 'SUV'] },
  { name: 'Volvo', weight: 0.8, value: 1.45, premium: 0.1, luxury: true, bodies: ['Sedan', 'SUV'] },
  { name: 'Mitsubishi', weight: 0.3, value: 0.8, premium: 0, luxury: false, bodies: ['SUV', 'Hatchback'] },
  { name: 'Mini', weight: 0.25, value: 1.1, premium: 0.05, luxury: false, bodies: ['Hatchback', 'SUV'] },
  { name: 'Porsche', weight: 0.15, value: 2.6, premium: 0.15, luxury: true, bodies: ['Coupe', 'SUV'] },
]

const AUTO_BODIES = ['Sedan', 'SUV', 'Pickup', 'Minivan', 'Hatchback', 'Coupe'] as const
const AUTO_BODY_WEIGHTS = [0.34, 0.31, 0.15, 0.06, 0.09, 0.05]
const AUTO_BODY_MSRP: Record<string, number> = { Sedan: 28_000, SUV: 36_000, Pickup: 45_000, Minivan: 38_000, Hatchback: 24_000, Coupe: 34_000 }
const AUTO_BODY_EFFECT: Record<string, number> = { Sedan: 0, SUV: 0.05, Pickup: 0.08, Minivan: 0.02, Hatchback: -0.04, Coupe: 0.06 }
const AUTO_TERRITORY = ['Urban', 'Suburban', 'Rural'] as const
const AUTO_TERRITORY_EFFECT: Record<string, number> = { Urban: 0.12, Suburban: 0, Rural: -0.1 }
const AUTO_VEHICLES_EFFECT: Record<string, number> = { '1': 0, '2': 0.08, '3+': 0.22 }
const AUTO_DEDUCTIBLES = [250, 500, 1000, 2000] as const
const AUTO_DEDUCTIBLE_EFFECT: Record<number, number> = { 250: 0, 500: 0.05, 1000: 0.12, 2000: 0.2 }
const AUTO_BASE = Math.log(5_200)
const AUTO_VALUE_ELASTICITY = 0.35
const AUTO_ADAS_EFFECT = 0.14
const AUTO_TREND = 0.06
const AUTO_SHAPE = 2
/** A repair estimate above this share of the ACV totals the car. */
const AUTO_TOTAL_LOSS_THRESHOLD = 0.75

interface AutoRisk {
  accidentYear: number
  driverAge: number
  yearsLicensed: number
  make: Make
  body: string
  vehicleAge: number
  acv: number
  territory: string
  vehicles: string
  adas: boolean
  deductible: number
  mean: number
}

function drawAutoRisk(draw: Draw): AutoRisk {
  const accidentYear = draw.pick([2022, 2023, 2024], [0.31, 0.34, 0.35])
  const band = draw.pick([[16, 20], [21, 24], [25, 34], [35, 49], [50, 64], [65, 79], [80, 90]] as const, [7, 8, 18, 27, 25, 12, 3])
  const driverAge = draw.int(band[0], band[1])
  const yearsLicensed = Math.max(0, driverAge - 16 - Math.floor(draw.gamma(1, 1.5)))
  const make = draw.pick(AUTO_MAKES, AUTO_MAKES.map(m => m.weight))
  const bodies = make.bodies ?? AUTO_BODIES
  const body = draw.pick(bodies, bodies.map(b => AUTO_BODY_WEIGHTS[AUTO_BODIES.indexOf(b as (typeof AUTO_BODIES)[number])]))
  const vehicleAge = Math.min(25, Math.floor(draw.gamma(2, 3.2)))
  const msrp = AUTO_BODY_MSRP[body] * make.value * draw.lognormal(1, 0.15)
  const acv = Math.max(1_500, roundTo(msrp * 0.85 * 0.88 ** vehicleAge, 100))
  const territory = draw.pick(AUTO_TERRITORY, [0.32, 0.46, 0.22])
  const vehicles = draw.pick(['1', '2', '3+'], [0.36, 0.54, 0.1])
  const adasP = (vehicleAge <= 2 ? 0.7 : vehicleAge <= 5 ? 0.45 : vehicleAge <= 8 ? 0.2 : 0.05) + (make.luxury ? 0.15 : 0)
  const adas = draw.bern(Math.min(0.95, adasP))
  const deductible = draw.pick(AUTO_DEDUCTIBLES, [0.12, 0.52, 0.3, 0.06])
  const ageEffect = driverAge < 25 ? 0.06 : driverAge >= 65 ? 0.04 : 0
  const eta = AUTO_BASE
    + AUTO_VALUE_ELASTICITY * Math.log(acv / 20_000)
    + AUTO_BODY_EFFECT[body]
    + make.premium
    + AUTO_TERRITORY_EFFECT[territory]
    + AUTO_VEHICLES_EFFECT[vehicles]
    + (adas ? AUTO_ADAS_EFFECT : 0)
    + AUTO_DEDUCTIBLE_EFFECT[deductible]
    + AUTO_TREND * (accidentYear - 2022)
    + ageEffect
  return { accidentYear, driverAge, yearsLicensed, make, body, vehicleAge, acv, territory, vehicles, adas, deductible, mean: Math.exp(eta) }
}

/** E[gross loss]: gamma damage, settled at the ACV once it passes the total-loss threshold. */
function autoExpected(r: AutoRisk): number {
  const theta = r.mean / AUTO_SHAPE
  const t = AUTO_TOTAL_LOSS_THRESHOLD * r.acv
  const below = r.mean * regularizedGammaP(AUTO_SHAPE + 1, t / theta)
  const totalLossProbability = 1 - regularizedGammaP(AUTO_SHAPE, t / theta)
  return below + r.acv * totalLossProbability
}

function autoLoss(draw: Draw, r: AutoRisk): { loss: number; damageRatio: number } {
  const damage = draw.gamma(AUTO_SHAPE, r.mean / AUTO_SHAPE)
  const loss = damage >= AUTO_TOTAL_LOSS_THRESHOLD * r.acv ? r.acv : damage
  return { loss: round(loss, 2), damageRatio: damage / r.mean }
}

function valueMissing(draw: Draw, vehicleAge: number): boolean {
  return draw.bern(0.02 + 0.006 * vehicleAge)
}

export const AUTO_COLUMNS = [
  'claim_id', 'accident_date', 'accident_year', 'report_lag_days', 'driver_age', 'years_licensed', 'vehicle_make',
  'vehicle_body', 'model_year', 'vehicle_age', 'vehicle_value', 'territory', 'vehicles_involved', 'adas_equipped',
  'deductible', 'airbag_deployed', 'gross_loss',
]

function generateAuto(seed: number): GeneratedCase {
  const draw = new Draw(createRng(seed))
  const n = 9_000
  const rows: CsvValue[][] = []
  let nonPositive = 0
  let decimalShift = 0
  let badAge = 0
  let valueBlank = 0
  let makeBlank = 0
  let totalLosses = 0
  let lossSum = 0

  for (let i = 0; i < n; i++) {
    const r = drawAutoRisk(draw)
    const { loss, damageRatio } = autoLoss(draw, r)
    if (loss === r.acv) totalLosses++
    lossSum += loss
    // Airbags deploy in the hardest hits — known only once the accident happened.
    const airbag = draw.bern(1 / (1 + Math.exp(-(-3 + 1.6 * Math.log(damageRatio + 0.05) + (r.vehicles === '3+' ? 0.6 : 0)))))
    const accidentDate = isoDate(r.accidentYear, draw.int(0, 364))

    let grossLoss: number = loss
    if (draw.bern(0.0035)) { grossLoss = draw.bern(0.6) ? 0 : -round(draw.uniform(150, 2_500), 2); nonPositive++ } else if (draw.bern(0.0012)) { grossLoss = round(loss * 100, 2); decimalShift++ }
    let driverAge: number = r.driverAge
    if (draw.bern(0.003)) { driverAge = draw.pick([0, 999, 12, 7], [3, 3, 1, 1]); badAge++ }
    let make: CsvValue = r.make.name
    if (draw.bern(0.005)) { make = null; makeBlank++ }
    let value: CsvValue = r.acv
    if (valueMissing(draw, r.vehicleAge)) { value = null; valueBlank++ }

    rows.push([
      `COL-${r.accidentYear}-${String(i + 1).padStart(5, '0')}`,
      accidentDate,
      r.accidentYear,
      Math.floor(draw.gamma(0.8, 6)),
      driverAge,
      r.yearsLicensed,
      make,
      r.body,
      r.accidentYear - r.vehicleAge,
      r.vehicleAge,
      value,
      r.territory,
      r.vehicles,
      r.adas ? 'Y' : 'N',
      r.deductible,
      airbag ? 'Y' : 'N',
      grossLoss,
    ])
  }
  rows.sort((a, b) => (String(a[1]) < String(b[1]) ? -1 : String(a[1]) > String(b[1]) ? 1 : 0))
  const duplicates = plantDuplicates(rows, 0.003, draw)
  const thinMakes = thinLevels(rows.map(r => r[6]), 30)

  const effects: TrueEffect[] = [
    { variable: 'Vehicle value (ACV)', level: 'doubling the value', relativity: 2 ** AUTO_VALUE_ELASTICITY, note: `log-linear: β = ${AUTO_VALUE_ELASTICITY} on ln(value)` },
    ...AUTO_BODIES.map(b => ({ variable: 'Body type', level: b, relativity: Math.exp(AUTO_BODY_EFFECT[b]), note: b === 'Sedan' ? 'base' : undefined })),
    { variable: 'Make', level: 'Tesla', relativity: Math.exp(0.18), note: 'repair-cost premium beyond value' },
    { variable: 'Make', level: 'Other luxury (BMW, Mercedes-Benz, Lexus, Audi, Volvo)', relativity: Math.exp(0.1) },
    { variable: 'Make', level: 'Porsche', relativity: Math.exp(0.15), note: 'too thin to estimate on its own' },
    ...AUTO_TERRITORY.map(t => ({ variable: 'Territory', level: t, relativity: Math.exp(AUTO_TERRITORY_EFFECT[t]), note: t === 'Suburban' ? 'base' : undefined })),
    ...Object.entries(AUTO_VEHICLES_EFFECT).map(([v, e]) => ({ variable: 'Vehicles involved', level: v, relativity: Math.exp(e), note: v === '1' ? 'base' : undefined })),
    { variable: 'ADAS equipped', level: 'Y vs N', relativity: Math.exp(AUTO_ADAS_EFFECT), note: 'sensor recalibration after a repair' },
    ...AUTO_DEDUCTIBLES.map(d => ({ variable: 'Deductible', level: `$${d.toLocaleString('en-US')}`, relativity: Math.exp(AUTO_DEDUCTIBLE_EFFECT[d]), note: d === 250 ? 'base — gross severity rises with the deductible because small losses go unreported' : undefined })),
    { variable: 'Accident year', level: 'per year', relativity: Math.exp(AUTO_TREND), note: 'severity trend' },
    { variable: 'Driver age', level: 'under 25', relativity: Math.exp(0.06) },
    { variable: 'Driver age', level: '65 and over', relativity: Math.exp(0.04) },
    { variable: 'Vehicle age', level: 'any', relativity: 1, note: 'acts only through the value it depreciates' },
  ]

  const issues: PlantedIssue[] = [
    { id: 'nonpositive', file: 'collision_claims.csv', title: 'Zero and negative gross losses', handling: 'A gamma (or any positive) severity model cannot take them, and a loss cannot be negative gross of recoveries. Remove them and say so.', count: nonPositive },
    { id: 'decimal-shift', file: 'collision_claims.csv', title: 'Decimal-shift outliers', handling: 'Losses 100× their true size (far above the car\'s value). Compare gross_loss with vehicle_value: they are errors, not large losses — remove or correct rather than cap.', count: decimalShift },
    { id: 'driver-age', file: 'collision_claims.csv', title: 'Impossible driver ages', handling: '0, 999 and ages under 16. Treat as missing or remove.', count: badAge },
    { id: 'value-missing', file: 'collision_claims.csv', title: 'Missing vehicle values', handling: 'Blank more often on older vehicles. Impute from body type and vehicle age, or keep an indicator — dropping the rows removes the oldest cars disproportionately.', count: valueBlank },
    { id: 'make-blank', file: 'collision_claims.csv', title: 'Missing make', handling: 'Blank make. Group as unknown or drop.', count: makeBlank },
    { id: 'thin-makes', file: 'collision_claims.csv', title: 'Thin makes', handling: 'Makes with too few claims for a credible coefficient. Group them (e.g. luxury / mainstream / Tesla), or leave make to vehicle_value.', count: thinMakes },
    { id: 'duplicates', file: 'collision_claims.csv', title: 'Duplicate claim records', handling: 'Exact duplicate rows. Drop them.', count: duplicates },
    { id: 'aliasing', file: 'collision_claims.csv', title: 'model_year = accident_year − vehicle_age exactly', handling: 'The three are perfectly collinear: fitting all three leaves one coefficient undefined (NA in R). Keep vehicle_age (or model_year) with accident_year, not all three.', count: 3 },
    { id: 'licensed-collinear', file: 'collision_claims.csv', title: 'years_licensed ≈ driver_age − 16', handling: 'Near-perfect correlation; use one.', count: 2 },
    { id: 'leakage', file: 'collision_claims.csv', title: 'Post-accident variables', handling: 'airbag_deployed and report_lag_days are only known once an accident has happened. The scope asks for rating factors known at policy inception, so both are excluded however predictive airbag_deployed looks.', count: 2 },
    { id: 'skewed-value', file: 'collision_claims.csv', title: 'Right-skewed vehicle value', handling: 'Enter ln(vehicle_value) so the log-link coefficient is an elasticity; the raw value gives an exponential curve the data does not have.', count: 1 },
    { id: 'total-loss', file: 'collision_claims.csv', title: 'Total losses settle at the vehicle value', handling: `About ${Math.round((100 * totalLosses) / n)}% of claims pay exactly the ACV, which piles mass at the top of each car's range. A reason to compare gamma, inverse Gaussian and lognormal fits on residuals rather than assume one.`, count: totalLosses },
  ]

  const facts = [
    { label: 'Claim records', value: rows.length.toLocaleString('en-US') },
    { label: 'Mean gross loss (valid claims)', value: `$${(lossSum / n).toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
    { label: 'Damage distribution', value: `gamma with shape ${AUTO_SHAPE} (CV ${(1 / Math.sqrt(AUTO_SHAPE)).toFixed(2)}), capped at the ACV on a total loss` },
  ]

  return { caseId: 'auto-severity', seed, tables: [{ file: 'collision_claims.csv', columns: AUTO_COLUMNS, rows }], issues, effects, facts }
}

function assessAuto(seed: number): AssessmentData {
  const draw = new Draw(createRng(streamSeed(seed, 0xa770)))
  const keep = AUTO_COLUMNS.filter(c => !['claim_id', 'report_lag_days', 'airbag_deployed', 'gross_loss'].includes(c))
  const columns = ['row_id', ...keep]
  const rows: CsvValue[][] = []
  const actual: number[] = []
  const expected: number[] = []
  const weight: number[] = []
  for (let i = 0; i < 3_000; i++) {
    const r = drawAutoRisk(draw)
    rows.push([
      `A${String(i + 1).padStart(5, '0')}`,
      isoDate(r.accidentYear, draw.int(0, 364)),
      r.accidentYear,
      r.driverAge,
      r.yearsLicensed,
      r.make.name,
      r.body,
      r.accidentYear - r.vehicleAge,
      r.vehicleAge,
      valueMissing(draw, r.vehicleAge) ? null : r.acv,
      r.territory,
      r.vehicles,
      r.adas ? 'Y' : 'N',
      r.deductible,
    ])
    actual.push(autoLoss(draw, r).loss)
    expected.push(autoExpected(r))
    weight.push(1)
  }
  return {
    table: { file: 'assessment_claims.csv', columns, rows },
    idColumn: 'row_id',
    actual,
    expected,
    weight,
    predictionMeaning: 'the expected gross loss of the claim',
  }
}

// ─── Case 3: homeowners non-weather water pure premium ──────────────────────

const HO_PLUMBING = ['Copper', 'PEX', 'CPVC', 'Galvanized', 'Polybutylene', 'Unknown'] as const
const HO_PLUMBING_EFFECT: Record<string, number> = { Copper: 0, PEX: -0.12, CPVC: 0.02, Galvanized: 0.3, Polybutylene: 0.45, Unknown: 0.12 }
const HO_REGIONS = ['Coastal', 'Metro', 'Inland'] as const
const HO_REGION_COST: Record<string, number> = { Coastal: 260, Metro: 230, Inland: 180 }
const HO_REGION_SEVERITY: Record<string, number> = { Coastal: 0.1, Metro: 0.08, Inland: 0 }
const HO_SCORE_EFFECT = [-0.25, -0.1, 0, 0.12, 0.3]
const HO_DEDUCTIBLES = [500, 1000, 2500, 5000] as const
const HO_DEDUCTIBLE_EFFECT: Record<number, number> = { 500: 0, 1000: -0.12, 2500: -0.32, 5000: -0.55 }
const HO_BASE_FREQUENCY = Math.log(0.02)
const HO_AGE_SLOPE = 0.015
const HO_AGE_CAP = 50
const HO_SQFT_ELASTICITY = 0.3
const HO_BATH_EFFECT = 0.08
const HO_SHUTOFF_FREQUENCY = -0.3
const HO_SHUTOFF_SEVERITY = -0.2
const HO_BASEMENT_FREQUENCY = 0.1
const HO_BASEMENT_SEVERITY = 0.25
const HO_SEVERITY_BASE = Math.log(11_500)
const HO_SEVERITY_TREND = 0.05
const HO_SEVERITY_SHAPE = 1.3
const HO_LARGE_SHARE = 0.02
const HO_LARGE_SCALE = 40_000
const HO_LARGE_ALPHA = 2.5
const HO_LATENT_SHAPE = 3

interface HoRisk {
  policyYear: number
  exposure: number
  yearBuilt: number
  plumbing: string
  sqft: number
  baths: number
  coverageA: number
  region: string
  protectionClass: number
  basement: boolean
  shutoff: boolean
  scoreTier: number
  deductible: number
  lambda0: number
  severityMean: number
  latent: number
  priorClaims: number
}

function drawHoRisk(draw: Draw): HoRisk {
  const policyYear = draw.pick([2020, 2021, 2022, 2023, 2024], [0.18, 0.19, 0.2, 0.21, 0.22])
  const exposure = draw.bern(0.87) ? 1 : round(draw.uniform(0.1, 1), 3)
  const era = draw.pick([[1900, 1949], [1950, 1969], [1970, 1989], [1990, 2009], [2010, 2023]] as const, [10, 18, 26, 30, 16])
  const yearBuilt = Math.min(policyYear, draw.int(era[0], era[1]))
  const plumbing = yearBuilt < 1950
    ? draw.pick(['Galvanized', 'Copper', 'Unknown'], [0.45, 0.4, 0.15])
    : yearBuilt < 1978
      ? draw.pick(['Copper', 'Galvanized', 'Unknown', 'CPVC'], [0.55, 0.25, 0.12, 0.08])
      : yearBuilt <= 1995
        ? draw.pick(['Polybutylene', 'Copper', 'CPVC', 'Unknown'], [0.22, 0.5, 0.18, 0.1])
        : yearBuilt <= 2005
          ? draw.pick(['Copper', 'CPVC', 'PEX', 'Unknown'], [0.45, 0.3, 0.15, 0.1])
          : draw.pick(['PEX', 'Copper', 'CPVC', 'Unknown'], [0.6, 0.25, 0.1, 0.05])
  const region = draw.pick(HO_REGIONS, [0.22, 0.45, 0.33])
  const sqft = Math.max(600, roundTo(draw.lognormal(yearBuilt >= 1990 ? 2_050 : 1_750, 0.33), 10))
  const baths = Math.min(5, Math.max(1, Math.round((Math.log(sqft / 1000) * 1.7 + 0.9 + draw.normal(0, 0.45)) * 2) / 2))
  const coverageA = roundTo(sqft * HO_REGION_COST[region] * draw.lognormal(1, 0.12), 1000)
  const protectionClass = region === 'Metro' ? draw.int(2, 5) : region === 'Coastal' ? draw.int(3, 7) : draw.int(5, 10)
  const basement = draw.bern(region === 'Inland' ? 0.45 : region === 'Metro' ? 0.3 : 0.08)
  const shutoff = draw.bern(0.06 + (yearBuilt > 2010 ? 0.12 : 0) + (sqft > 2_800 ? 0.08 : 0))
  const scoreTier = draw.pick([1, 2, 3, 4, 5], [0.18, 0.24, 0.26, 0.19, 0.13])
  const deductible = draw.pick(HO_DEDUCTIBLES, [0.15, 0.5, 0.28, 0.07])
  const age = policyYear - yearBuilt
  const lambda0 = Math.exp(
    HO_BASE_FREQUENCY
    + HO_AGE_SLOPE * Math.min(age, HO_AGE_CAP)
    + HO_PLUMBING_EFFECT[plumbing]
    + HO_SQFT_ELASTICITY * Math.log(sqft / 1_850)
    + HO_BATH_EFFECT * (baths - 2)
    + (shutoff ? HO_SHUTOFF_FREQUENCY : 0)
    + (basement ? HO_BASEMENT_FREQUENCY : 0)
    + HO_SCORE_EFFECT[scoreTier - 1]
    + HO_DEDUCTIBLE_EFFECT[deductible],
  )
  const severityMean = Math.exp(
    HO_SEVERITY_BASE
    + HO_SEVERITY_TREND * (policyYear - 2020)
    + HO_REGION_SEVERITY[region]
    + (shutoff ? HO_SHUTOFF_SEVERITY : 0)
    + (basement ? HO_BASEMENT_SEVERITY : 0)
    + 0.2 * Math.log(coverageA / 400_000),
  )
  const latent = draw.gamma(HO_LATENT_SHAPE, 1 / HO_LATENT_SHAPE)
  const priorClaims = draw.poisson(5 * lambda0 * latent)
  return { policyYear, exposure, yearBuilt, plumbing, sqft, baths, coverageA, region, protectionClass, basement, shutoff, scoreTier, deductible, lambda0, severityMean, latent, priorClaims }
}

const HO_LARGE_MEAN = HO_LARGE_SCALE * (1 + 1 / (HO_LARGE_ALPHA - 1))

function hoSeverity(draw: Draw, r: HoRisk): number {
  if (draw.bern(HO_LARGE_SHARE)) return HO_LARGE_SCALE * (1 + draw.lomax(HO_LARGE_ALPHA))
  return draw.gamma(HO_SEVERITY_SHAPE, r.severityMean / HO_SEVERITY_SHAPE)
}

function hoExpected(r: HoRisk): number {
  const k = HO_LATENT_SHAPE
  const frequency = r.lambda0 * (k + r.priorClaims) / (k + 5 * r.lambda0)
  const severity = (1 - HO_LARGE_SHARE) * r.severityMean + HO_LARGE_SHARE * HO_LARGE_MEAN
  return r.exposure * frequency * severity
}

function hoSquareFeetMissing(draw: Draw): boolean {
  return draw.bern(0.025)
}

export const HO_COLUMNS = [
  'policy_id', 'policy_year', 'earned_exposure', 'region', 'year_built', 'square_feet', 'bathrooms', 'coverage_a',
  'plumbing_material', 'finished_basement', 'water_shutoff_device', 'protection_class', 'insurance_score_tier',
  'aoi_deductible', 'prior_water_claims_5yr', 'claim_count', 'incurred_loss',
]

function generateHo(seed: number): GeneratedCase {
  const draw = new Draw(createRng(seed))
  const n = 30_000
  const rows: CsvValue[][] = []
  let badYear = 0
  let sqftBlank = 0
  let sqftZero = 0
  let negative = 0
  let inconsistent = 0
  let large = 0
  let zeroRows = 0
  let lossSum = 0
  let exposureSum = 0

  for (let i = 0; i < n; i++) {
    const r = drawHoRisk(draw)
    const count = draw.poisson(r.exposure * r.lambda0 * r.latent)
    let loss = 0
    for (let c = 0; c < count; c++) loss += hoSeverity(draw, r)
    loss = round(loss, 0)
    if (count === 0) zeroRows++
    if (loss > 100_000) large++
    lossSum += loss
    exposureSum += r.exposure

    let yearBuilt: number = r.yearBuilt
    if (draw.bern(0.004)) { yearBuilt = draw.pick([0, 9999, r.policyYear + draw.int(1, 3)], [2, 2, 1]); badYear++ }
    let sqft: CsvValue = r.sqft
    if (hoSquareFeetMissing(draw)) { sqft = null; sqftBlank++ } else if (draw.bern(0.002)) { sqft = 0; sqftZero++ }
    let claimCount: number = count
    let incurred: number = loss
    if (count === 0 && draw.bern(0.0012)) { incurred = -round(draw.uniform(200, 4_000), 0); negative++ } else if (count > 0 && draw.bern(0.01)) { claimCount = 0; inconsistent++ }

    rows.push([
      `HO-${String(700_000 + i * 2 + draw.int(0, 1)).padStart(7, '0')}`,
      r.policyYear,
      r.exposure,
      r.region,
      yearBuilt,
      sqft,
      r.baths,
      r.coverageA,
      r.plumbing,
      r.basement ? 'Y' : 'N',
      r.shutoff ? 'Y' : 'N',
      r.protectionClass,
      r.scoreTier,
      r.deductible,
      r.priorClaims,
      claimCount,
      incurred,
    ])
  }
  const duplicates = plantDuplicates(rows, 0.002, draw)

  const effects: TrueEffect[] = [
    { variable: 'Home age', level: 'per year, to 50 years', relativity: Math.exp(HO_AGE_SLOPE), note: `frequency; flat beyond ${HO_AGE_CAP} years — a straight line in age overstates the oldest homes` },
    ...HO_PLUMBING.map(p => ({ variable: 'Plumbing material', level: p, relativity: Math.exp(HO_PLUMBING_EFFECT[p]), note: p === 'Copper' ? 'base (frequency)' : undefined })),
    { variable: 'Square feet', level: 'doubling the size', relativity: 2 ** HO_SQFT_ELASTICITY, note: `frequency; β = ${HO_SQFT_ELASTICITY} on ln(sq ft)` },
    { variable: 'Bathrooms', level: 'per bathroom', relativity: Math.exp(HO_BATH_EFFECT), note: 'frequency' },
    { variable: 'Water shut-off device', level: 'Y vs N', relativity: Math.exp(HO_SHUTOFF_FREQUENCY + HO_SHUTOFF_SEVERITY), note: `pure premium (frequency ×${Math.exp(HO_SHUTOFF_FREQUENCY).toFixed(2)}, severity ×${Math.exp(HO_SHUTOFF_SEVERITY).toFixed(2)})` },
    { variable: 'Finished basement', level: 'Y vs N', relativity: Math.exp(HO_BASEMENT_FREQUENCY + HO_BASEMENT_SEVERITY), note: 'pure premium' },
    ...HO_SCORE_EFFECT.map((e, i) => ({ variable: 'Insurance score tier', level: String(i + 1), relativity: Math.exp(e), note: i === 2 ? 'base' : undefined })),
    ...HO_DEDUCTIBLES.map(d => ({ variable: 'AOI deductible', level: `$${d.toLocaleString('en-US')}`, relativity: Math.exp(HO_DEDUCTIBLE_EFFECT[d]), note: d === 500 ? 'base (frequency)' : undefined })),
    ...HO_REGIONS.map(g => ({ variable: 'Region', level: g, relativity: Math.exp(HO_REGION_SEVERITY[g]), note: g === 'Inland' ? 'base (severity only)' : undefined })),
    { variable: 'Coverage A', level: 'doubling the limit', relativity: 2 ** 0.2, note: 'severity only — and collinear with square feet' },
    { variable: 'Policy year', level: 'per year', relativity: Math.exp(HO_SEVERITY_TREND), note: 'severity trend' },
    { variable: 'Protection class', level: 'any', relativity: 1, note: 'a fire-protection grade: no effect on water losses beyond region' },
  ]

  const issues: PlantedIssue[] = [
    { id: 'year-built', file: 'ho_policies.csv', title: 'Invalid year built', handling: '0, 9999 and years after the policy year. Compute home age only from valid years; treat the rest as missing.', count: badYear },
    { id: 'sqft-missing', file: 'ho_policies.csv', title: 'Missing square footage', handling: 'Blank square_feet. Impute (from coverage A or bathrooms) or keep an indicator.', count: sqftBlank },
    { id: 'sqft-zero', file: 'ho_policies.csv', title: 'Zero square footage', handling: 'A home of 0 sq ft is a data error — ln(0) is undefined. Treat as missing.', count: sqftZero },
    { id: 'negative', file: 'ho_policies.csv', title: 'Negative incurred loss', handling: 'Recoveries booked against policy-years with no claim. A Tweedie response must be ≥ 0: remove them or set to zero, and say which.', count: negative },
    { id: 'inconsistent', file: 'ho_policies.csv', title: 'Loss with a zero claim count', handling: 'incurred_loss > 0 while claim_count = 0. Harmless for a pure-premium model on incurred_loss, fatal for a frequency model on claim_count — decide which field to trust and state it.', count: inconsistent },
    { id: 'large', file: 'ho_policies.csv', title: 'Large losses', handling: 'Policy-years above $100,000 incurred. A handful can dominate a Tweedie fit; consider capping and loading the excess, and justify the choice.', count: large },
    { id: 'duplicates', file: 'ho_policies.csv', title: 'Duplicate policy-year records', handling: 'Exact duplicate rows. Drop them.', count: duplicates },
    { id: 'collinear', file: 'ho_policies.csv', title: 'Collinear size measures', handling: 'square_feet, coverage_a and bathrooms move together (coverage A is essentially square feet × a regional building cost). Pick the one that answers the business question, or check VIFs before keeping several.', count: 3 },
    { id: 'age-nonlinear', file: 'ho_policies.csv', title: 'Home age levels off', handling: 'Water frequency climbs with age for about 50 years, then flattens. Bin age or cap it rather than forcing a straight line.', count: 1 },
    { id: 'spurious', file: 'ho_policies.csv', title: 'protection_class has no effect', handling: 'A fire-department grade. Any apparent effect is region showing through.', count: 1 },
    { id: 'zero-mass', file: 'ho_policies.csv', title: 'Mostly zero losses', handling: `${Math.round((100 * zeroRows) / n)}% of policy-years have no loss: the reason for a Tweedie (compound Poisson–gamma) or a separate frequency–severity pair rather than a gamma or normal model.`, count: zeroRows },
  ]

  const facts = [
    { label: 'Policy-year records', value: rows.length.toLocaleString('en-US') },
    { label: 'Book pure premium', value: `$${(lossSum / exposureSum).toFixed(2)} per policy year` },
    { label: 'Loss process', value: `Poisson frequency with a latent risk multiplier (variance ${(1 / HO_LATENT_SHAPE).toFixed(2)}), gamma severity (shape ${HO_SEVERITY_SHAPE}) with a ${(HO_LARGE_SHARE * 100).toFixed(1)}% Pareto large-loss component` },
  ]

  return { caseId: 'ho-water', seed, tables: [{ file: 'ho_policies.csv', columns: HO_COLUMNS, rows }], issues, effects, facts }
}

function assessHo(seed: number): AssessmentData {
  const draw = new Draw(createRng(streamSeed(seed, 0x4020)))
  const columns = ['row_id', ...HO_COLUMNS.filter(c => !['policy_id', 'claim_count', 'incurred_loss'].includes(c))]
  const rows: CsvValue[][] = []
  const actual: number[] = []
  const expected: number[] = []
  const weight: number[] = []
  for (let i = 0; i < 5_000; i++) {
    const r = drawHoRisk(draw)
    rows.push([
      `A${String(i + 1).padStart(5, '0')}`, r.policyYear, r.exposure, r.region, r.yearBuilt,
      hoSquareFeetMissing(draw) ? null : r.sqft, r.baths, r.coverageA, r.plumbing, r.basement ? 'Y' : 'N',
      r.shutoff ? 'Y' : 'N', r.protectionClass, r.scoreTier, r.deductible, r.priorClaims,
    ])
    const count = draw.poisson(r.exposure * r.lambda0 * r.latent)
    let loss = 0
    for (let c = 0; c < count; c++) loss += hoSeverity(draw, r)
    actual.push(round(loss, 0))
    expected.push(hoExpected(r))
    weight.push(r.exposure)
  }
  return {
    table: { file: 'assessment_policies.csv', columns, rows },
    idColumn: 'row_id',
    actual,
    expected,
    weight,
    predictionMeaning: 'the expected incurred loss for the row\'s earned exposure (pure premium × exposure)',
  }
}

// ─── Entry points ────────────────────────────────────────────────────────────

/** The data sets handed out for an attempt, with the notes on what is in them. */
export function generateCase(caseId: CaseId, seed: number): GeneratedCase {
  switch (caseId) {
    case 'bop-frequency': return generateBop(seed)
    case 'auto-severity': return generateAuto(seed)
    case 'ho-water': return generateHo(seed)
  }
}

/** Fresh rows from the same model, with their outcomes and true expectations. */
export function generateAssessment(caseId: CaseId, seed: number): AssessmentData {
  switch (caseId) {
    case 'bop-frequency': return assessBop(seed)
    case 'auto-severity': return assessAuto(seed)
    case 'ho-water': return assessHo(seed)
  }
}
