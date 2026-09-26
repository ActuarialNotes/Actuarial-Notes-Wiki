/**
 * Grading a PCPA project attempt after submission (`docs/pcpa-project.md`).
 *
 * Three things the real graders do, done here the only way a simulator can:
 *
 * - **"Performs reasonably well on an assessment data set"** (rubric B-1). The
 *   candidate's model scores fresh rows drawn from the same generating model
 *   (`lib/pcpaData.ts` `generateAssessment`), and the predictions are ranked
 *   against what actually happened — a Gini index and a lift table, the
 *   exhibits the post-project summary recommends — beside the Gini of the
 *   *true* model, which is the ceiling no model can pass on that sample.
 * - **The consistency check.** The CAS asks questions at the point of
 *   submission and compares the answers with the report. A number the
 *   candidate gives should be a number the report contains.
 * - **The rubric.** The candidate rates themselves on each published
 *   criterion; the domain weights turn that into a score.
 *
 * Pure and tested.
 */

import { DOMAINS, RUBRIC, type Domain } from '@/data/pcpaProjects'
import { csvNumber, parseCsv } from './csv'
import type { AssessmentData } from './pcpaData'

// ─── Predictions ─────────────────────────────────────────────────────────────

export interface ParsedPredictions {
  /** Prediction per assessment row, in the assessment's row order; null where missing. */
  values: (number | null)[]
  matched: number
  missing: number
  invalid: number
  errors: string[]
}

/**
 * Reads a predictions CSV: an id column matching the assessment's, and a
 * numeric prediction column. The id column is found by name (`row_id`, or the
 * first column); the prediction is the column named like one, or the last
 * numeric column.
 */
export function parsePredictions(csvText: string, assessment: AssessmentData): ParsedPredictions {
  const { columns, rows } = parseCsv(csvText)
  const errors: string[] = []
  const lower = columns.map(c => c.trim().toLowerCase())
  let idCol = lower.indexOf(assessment.idColumn.toLowerCase())
  if (idCol < 0) idCol = 0
  let predCol = lower.findIndex(c => /pred|fitted|expected|score|estimate/.test(c))
  if (predCol < 0 || predCol === idCol) {
    predCol = -1
    for (let c = columns.length - 1; c >= 0; c--) {
      if (c !== idCol && rows.some(r => csvNumber(r[c]) !== null)) { predCol = c; break }
    }
  }
  const values: (number | null)[] = new Array(assessment.table.rows.length).fill(null)
  if (predCol < 0) {
    errors.push('No numeric prediction column found.')
    return { values, matched: 0, missing: values.length, invalid: 0, errors }
  }

  const index = new Map<string, number>()
  assessment.table.rows.forEach((row, i) => index.set(String(row[0]), i))
  let invalid = 0
  let unknown = 0
  for (const row of rows) {
    const id = (row[idCol] ?? '').trim()
    const at = index.get(id)
    if (at === undefined) { if (id) unknown++; continue }
    const value = csvNumber(row[predCol])
    if (value === null || value < 0) { invalid++; continue }
    values[at] = value
  }
  const matched = values.filter(v => v !== null).length
  const missing = values.length - matched
  if (unknown > 0) errors.push(`${unknown} row id${unknown === 1 ? '' : 's'} not in the assessment data.`)
  if (invalid > 0) errors.push(`${invalid} prediction${invalid === 1 ? ' is' : 's are'} blank, non-numeric or negative.`)
  if (missing > 0) errors.push(`${missing} assessment row${missing === 1 ? ' has' : 's have'} no prediction.`)
  return { values, matched, missing, invalid, errors }
}

// ─── Ranking ─────────────────────────────────────────────────────────────────

export interface LorenzPoint { x: number; y: number }

/**
 * The Lorenz curve of actual outcomes, ordered by predicted *rate*
 * (prediction ÷ weight) from lowest to highest: cumulative share of weight
 * against cumulative share of the outcome.
 */
export function lorenzCurve(actual: number[], predicted: number[], weight: number[]): LorenzPoint[] {
  const rate = (i: number) => predicted[i] / weight[i]
  const order = actual.map((_, i) => i).sort((a, b) => rate(a) - rate(b))
  const totalW = weight.reduce((s, w) => s + w, 0)
  const totalA = actual.reduce((s, a) => s + a, 0)
  const points: LorenzPoint[] = [{ x: 0, y: 0 }]
  let w = 0
  let a = 0
  // Rows the model can't tell apart are one step of the curve, not an order
  // the sort happened to leave them in — a flat prediction scores exactly 0.
  for (let k = 0; k < order.length; k++) {
    w += weight[order[k]]
    a += actual[order[k]]
    const tiedWithNext = k + 1 < order.length && rate(order[k + 1]) === rate(order[k])
    if (!tiedWithNext) points.push({ x: totalW ? w / totalW : 0, y: totalA ? a / totalA : 0 })
  }
  return points
}

/**
 * The Gini index: twice the area between the line of equality and the Lorenz
 * curve. Zero for a model that ranks nothing; higher is better segmentation.
 */
export function giniIndex(actual: number[], predicted: number[], weight: number[]): number {
  const pts = lorenzCurve(actual, predicted, weight)
  let area = 0
  for (let i = 1; i < pts.length; i++) area += (pts[i].x - pts[i - 1].x) * (pts[i].y + pts[i - 1].y) / 2
  return 1 - 2 * area
}

export interface LiftBin {
  bin: number
  /** Mean predicted rate in the bin, relative to the overall mean prediction. */
  predicted: number
  /** Mean actual rate in the bin, relative to the overall mean actual. */
  actual: number
  weight: number
}

/**
 * A lift (quantile) table: rows sorted by predicted rate, cut into `bins`
 * groups of equal weight, each showing its average prediction and average
 * outcome relative to the book. A model that segments well climbs steeply
 * from the first bin to the last, and its two lines stay together.
 */
export function liftTable(actual: number[], predicted: number[], weight: number[], bins = 10): LiftBin[] {
  const order = actual.map((_, i) => i).sort((a, b) => predicted[a] / weight[a] - predicted[b] / weight[b])
  const totalW = weight.reduce((s, w) => s + w, 0)
  const meanActual = actual.reduce((s, a) => s + a, 0) / totalW
  const meanPred = predicted.reduce((s, p) => s + p, 0) / totalW
  const out: LiftBin[] = Array.from({ length: bins }, (_, b) => ({ bin: b + 1, predicted: 0, actual: 0, weight: 0 }))
  let w = 0
  for (const i of order) {
    const b = Math.min(bins - 1, Math.floor((w / totalW) * bins))
    out[b].predicted += predicted[i]
    out[b].actual += actual[i]
    out[b].weight += weight[i]
    w += weight[i]
  }
  return out.map(b => ({
    ...b,
    predicted: b.weight && meanPred ? b.predicted / b.weight / meanPred : 0,
    actual: b.weight && meanActual ? b.actual / b.weight / meanActual : 0,
  }))
}

export interface AssessmentScore {
  gini: number
  /** The generating model's Gini on the same rows — the ceiling. */
  oracleGini: number
  /** gini ÷ oracleGini: the share of the achievable segmentation captured. */
  captured: number
  /** Total predicted ÷ total actual. */
  balance: number
  lift: LiftBin[]
  oracleLift: LiftBin[]
  verdict: 'strong' | 'reasonable' | 'weak'
}

/** Scores complete predictions. Rows without a prediction are left out of both models' figures. */
export function scoreAssessment(assessment: AssessmentData, predictions: (number | null)[]): AssessmentScore | null {
  const idx = predictions.map((p, i) => (p === null ? -1 : i)).filter(i => i >= 0)
  if (idx.length < 50) return null
  const actual = idx.map(i => assessment.actual[i])
  const weight = idx.map(i => assessment.weight[i])
  const pred = idx.map(i => predictions[i] as number)
  const oracle = idx.map(i => assessment.expected[i])
  const gini = giniIndex(actual, pred, weight)
  const oracleGini = giniIndex(actual, oracle, weight)
  const captured = oracleGini > 0 ? gini / oracleGini : 0
  const balance = pred.reduce((s, p) => s + p, 0) / Math.max(1e-9, actual.reduce((s, a) => s + a, 0))
  return {
    gini,
    oracleGini,
    captured,
    balance,
    lift: liftTable(actual, pred, weight),
    oracleLift: liftTable(actual, oracle, weight),
    verdict: captured >= 0.85 ? 'strong' : captured >= 0.6 ? 'reasonable' : 'weak',
  }
}

// ─── Consistency with the report ─────────────────────────────────────────────

/** Numbers in a piece of text, normalised ("16,040" → 16040, "0.27" → 0.27). */
export function numbersIn(text: string): number[] {
  const out: number[] = []
  for (const m of text.matchAll(/-?\d{1,3}(?:,\d{3})+(?:\.\d+)?|-?\d*\.\d+|-?\d+/g)) {
    const n = Number(m[0].replace(/,/g, ''))
    if (Number.isFinite(n)) out.push(n)
  }
  return out
}

export interface CrossCheck {
  questionId: string
  answer: string
  /** Numbers in the answer that the report also contains. */
  found: number[]
  /** Numbers in the answer the report doesn't contain. */
  absent: number[]
}

/**
 * For each cross-checked answer, whether the numbers it gives appear in the
 * report. A number matches if the report has it to the precision the answer
 * gives (0.27 matches 0.2734 written as 0.27, not 0.3).
 */
export function crossCheckAnswers(
  questions: { id: string; crossCheck?: boolean }[],
  answers: Record<string, string>,
  reportText: string,
): CrossCheck[] {
  const inReport = numbersIn(reportText)
  const has = (n: number) => inReport.some(r => Math.abs(r - n) <= 1e-9 * Math.max(1, Math.abs(n)))
  return questions
    .filter(q => q.crossCheck && (answers[q.id] ?? '').trim())
    .map(q => {
      const answer = answers[q.id].trim()
      // Percent signs and ordinal "30%" style splits both land here as plain numbers.
      const nums = numbersIn(answer)
      return {
        questionId: q.id,
        answer,
        found: nums.filter(has),
        absent: nums.filter(n => !has(n)),
      }
    })
}

// ─── The rubric ──────────────────────────────────────────────────────────────

export type Rating = 'met' | 'partial' | 'not-met'

const RATING_CREDIT: Record<Rating, number> = { met: 1, partial: 0.5, 'not-met': 0 }

export interface RubricScore {
  byDomain: Record<Domain, { score: number; rated: number; total: number }>
  /** Weighted by the project's domain weights (30 / 30 / 40). */
  total: number
  complete: boolean
  /**
   * The simulator's rule of thumb — the CAS publishes no pass mark: 70% overall
   * with no domain below half.
   */
  likelyPass: boolean
}

export function scoreRubric(ratings: Record<string, Rating | undefined>): RubricScore {
  const byDomain = {} as RubricScore['byDomain']
  let total = 0
  let rated = 0
  for (const domain of Object.keys(DOMAINS) as Domain[]) {
    const criteria = RUBRIC.filter(c => c.domain === domain)
    let credit = 0
    let domainRated = 0
    for (const c of criteria) {
      const r = ratings[c.id]
      if (!r) continue
      credit += RATING_CREDIT[r]
      domainRated++
    }
    const score = criteria.length ? credit / criteria.length : 0
    byDomain[domain] = { score, rated: domainRated, total: criteria.length }
    total += DOMAINS[domain].projectWeight * score
    rated += domainRated
  }
  const complete = rated === RUBRIC.length
  const likelyPass = complete && total >= 0.7 && Object.values(byDomain).every(d => d.score >= 0.5)
  return { byDomain, total, complete, likelyPass }
}
