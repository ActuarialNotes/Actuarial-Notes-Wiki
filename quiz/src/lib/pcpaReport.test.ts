import { describe, expect, it } from 'vitest'
import {
  appendixKind, appendixWords, countBodyImages, countWords, reviewReport, submissionIssues, tallyWords,
  RUBRIC_EVIDENCE, type Appendix, type SubmissionState,
} from './pcpaReport'
import { RUBRIC } from '@/data/pcpaProjects'

describe('countWords', () => {
  it('counts the way a word processor does', () => {
    expect(countWords('The log-link GLM has a Gini of 0.27 — on the holdout.')).toBe(11)
  })

  it('ignores markdown syntax but keeps link and image text', () => {
    expect(countWords('## Data\n\n- **Duplicates** removed ([see](https://x.org/a))\n\n| a | b |\n|---|---|\n| 1 | 2 |')).toBe(8)
    expect(countWords('<!-- a note to self -->Only this counts')).toBe(3)
  })
})

describe('appendices', () => {
  it('knows which files can be an appendix', () => {
    expect(appendixKind('output/lift.png')).toBe('image')
    expect(appendixKind('output/coefficients.csv')).toBe('table')
    expect(appendixKind('code/analysis.R')).toBeNull()
  })

  it('counts a table\'s cells as well as its caption', () => {
    const table: Appendix = { id: '1', path: 'output/t.csv', kind: 'table', caption: 'Final model relativities' }
    expect(appendixWords(table, 'variable,relativity\nSector 72,1.57\n')).toBe(3 + 2 + 3)
    const image: Appendix = { id: '2', path: 'output/lift.png', kind: 'image', caption: 'Lift chart, holdout' }
    expect(appendixWords(image)).toBe(3)
  })

  it('holds the body and appendices to one limit', () => {
    expect(tallyWords('one two', [1_249])).toMatchObject({ total: 1_251, over: true })
    expect(tallyWords('one two', [1_248])).toMatchObject({ total: 1_250, over: false })
  })
})

describe('submissionIssues', () => {
  const ok: SubmissionState = {
    words: tallyWords(Array(400).fill('word').join(' '), []),
    appendixCount: 3,
    codeFiles: ['code/analysis.R'],
    bodyImages: 0,
    attested: true,
    unanswered: [],
  }

  it('passes a complete submission', () => {
    expect(submissionIssues(ok)).toEqual([])
  })

  it('fails the CAS\'s two automatic fails', () => {
    const ids = submissionIssues({ ...ok, words: tallyWords('x', [1_300]), appendixCount: 6 }).filter(i => i.fatal).map(i => i.id)
    expect(ids).toEqual(expect.arrayContaining(['words', 'appendices']))
  })

  it('requires code, answers and the attestation', () => {
    const ids = submissionIssues({ ...ok, codeFiles: [], unanswered: ['rows'], attested: false }).map(i => i.id)
    expect(ids).toEqual(expect.arrayContaining(['code', 'questions', 'attestation']))
  })

  it('warns, without failing, about images in the body', () => {
    expect(countBodyImages('text ![lift](output/lift.png) more')).toBe(1)
    const issue = submissionIssues({ ...ok, bodyImages: 1 }).find(i => i.id === 'body-images')
    expect(issue?.fatal).toBe(false)
  })
})

describe('reviewReport', () => {
  const found = (body: string, appendices: Appendix[] = []) =>
    Object.fromEntries(reviewReport('bop-frequency', body, appendices).map(c => [c.id, c.found]))

  it('finds a described holdout split', () => {
    const r = found('We fit on a 70/30 random split of the policies and validated on the holdout.')
    expect(r.validation).toBe(true)
    expect(r['split-described']).toBe(true)
    expect(found('We fit the model to all of the data.').validation).toBe(false)
  })

  it('wants two distributions compared', () => {
    expect(found('A Poisson GLM was fitted.').distributions).toBe(false)
    expect(found('A Poisson GLM fit as well as a negative binomial.').distributions).toBe(true)
  })

  it('needs each graphic to say which data it shows', () => {
    const lift: Appendix = { id: '1', path: 'output/lift.png', kind: 'image', caption: 'Lift chart' }
    expect(found('text', [lift])['exhibit-dataset']).toBe(false)
    expect(found('text', [{ ...lift, caption: 'Lift chart on the 30% holdout' }])['exhibit-dataset']).toBe(true)
  })

  it('runs the case\'s own checks', () => {
    expect(found('We grouped NAICS codes to the two-digit sector.')['industry-grouping']).toBe(true)
    expect(reviewReport('ho-water', 'A Tweedie model with p = 1.6.', []).find(c => c.id === 'tweedie-power')?.found).toBe(true)
  })

  it('maps evidence onto real rubric criteria and real checks', () => {
    const checkIds = new Set(['bop-frequency', 'auto-severity', 'ho-water'].flatMap(id => reviewReport(id as 'bop-frequency', '', []).map(c => c.id)))
    expect(Object.keys(RUBRIC_EVIDENCE).sort()).toEqual(RUBRIC.map(c => c.id).sort())
    for (const ids of Object.values(RUBRIC_EVIDENCE)) for (const id of ids) expect(checkIds.has(id)).toBe(true)
  })
})
