import { describe, expect, it } from 'vitest'
import { crossCheckAnswers, giniIndex, liftTable, numbersIn, parsePredictions, scoreAssessment, scoreRubric } from './pcpaAssessment'
import { generateAssessment } from './pcpaData'
import { toCsv } from './csv'
import { RUBRIC } from '@/data/pcpaProjects'

describe('giniIndex', () => {
  it('is zero for a model that ranks nothing and positive for one that does', () => {
    const actual = [0, 0, 1, 0, 2, 3]
    const weight = [1, 1, 1, 1, 1, 1]
    expect(giniIndex(actual, [1, 1, 1, 1, 1, 1], weight)).toBeCloseTo(0, 10)
    expect(giniIndex(actual, [0.1, 0.2, 0.5, 0.3, 0.8, 0.9], weight)).toBeGreaterThan(0.4)
    expect(giniIndex(actual, [0.9, 0.8, 0.5, 0.7, 0.2, 0.1], weight)).toBeLessThan(0)
  })

  it('orders by rate, so exposure does not pass for risk', () => {
    // Same rate everywhere, very different exposures: no segmentation.
    expect(giniIndex([1, 2, 4], [0.5, 1, 2], [0.5, 1, 2])).toBeCloseTo(giniIndex([1, 2, 4], [1, 1, 1], [0.5, 1, 2]), 10)
  })
})

describe('liftTable', () => {
  it('cuts into equal-weight bins relative to the average', () => {
    const n = 100
    const pred = Array.from({ length: n }, (_, i) => i + 1)
    const lift = liftTable(pred, pred, Array(n).fill(1), 10)
    expect(lift).toHaveLength(10)
    expect(lift[0].actual).toBeLessThan(lift[9].actual)
    expect(lift.reduce((s, b) => s + b.weight, 0)).toBe(n)
  })
})

describe('parsePredictions and scoreAssessment', () => {
  const assessment = generateAssessment('bop-frequency', 21)

  it('matches predictions by id and scores the true model at its own ceiling', () => {
    const csv = toCsv(['row_id', 'prediction'], assessment.table.rows.map((r, i) => [r[0], assessment.expected[i]]))
    const parsed = parsePredictions(csv, assessment)
    expect(parsed.matched).toBe(assessment.table.rows.length)
    expect(parsed.errors).toEqual([])
    const score = scoreAssessment(assessment, parsed.values)!
    // The CSV carries six decimals, so the ranking can differ in the last ties.
    expect(score.gini).toBeCloseTo(score.oracleGini, 4)
    expect(score.captured).toBeCloseTo(1, 3)
    expect(score.verdict).toBe('strong')
  })

  it('reports missing and invalid rows', () => {
    const rows = assessment.table.rows.slice(0, 10).map((r, i) => [r[0], i === 0 ? 'abc' : 0.1])
    const parsed = parsePredictions(toCsv(['row_id', 'pred'], rows), assessment)
    expect(parsed.matched).toBe(9)
    expect(parsed.invalid).toBe(1)
    expect(parsed.errors.join(' ')).toMatch(/no prediction/)
  })

  it('rates a flat prediction as weak', () => {
    const score = scoreAssessment(assessment, assessment.weight.map(w => w * 0.1))!
    expect(score.verdict).toBe('weak')
    expect(Math.abs(score.gini)).toBeLessThan(0.05)
  })
})

describe('crossCheckAnswers', () => {
  it('finds the answer\'s numbers in the report', () => {
    const questions = [{ id: 'rows', crossCheck: true }, { id: 'metric', crossCheck: true }, { id: 'link' }]
    const checks = crossCheckAnswers(questions, { rows: '11,200', metric: 'Gini 0.27 on the 30% holdout', link: 'Log' }, 'We trained on 11200 policies and the holdout Gini was 0.31, from a 30% sample.')
    expect(checks.find(c => c.questionId === 'rows')).toMatchObject({ found: [11200], absent: [] })
    expect(checks.find(c => c.questionId === 'metric')).toMatchObject({ found: [30], absent: [0.27] })
    expect(checks.some(c => c.questionId === 'link')).toBe(false)
  })

  it('reads grouped thousands and decimals', () => {
    expect(numbersIn('16,040 rows, Gini 0.274, -3 and 1.5x')).toEqual([16040, 0.274, -3, 1.5])
  })
})

describe('scoreRubric', () => {
  it('weights the domains 30 / 30 / 40', () => {
    const allMet = Object.fromEntries(RUBRIC.map(c => [c.id, 'met' as const]))
    expect(scoreRubric(allMet)).toMatchObject({ total: 1, complete: true, likelyPass: true })
    const noC = Object.fromEntries(RUBRIC.map(c => [c.id, c.domain === 'C' ? 'not-met' as const : 'met' as const]))
    const score = scoreRubric(noC)
    expect(score.total).toBeCloseTo(0.6, 10)
    expect(score.likelyPass).toBe(false)
  })

  it('is incomplete until every criterion is rated', () => {
    expect(scoreRubric({ 'a3-transform': 'met' }).complete).toBe(false)
  })
})
