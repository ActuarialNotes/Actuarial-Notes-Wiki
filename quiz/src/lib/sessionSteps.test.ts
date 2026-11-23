import { describe, expect, it } from 'vitest'
import { orderBySteps, sessionQuizSteps, stepsFromStored } from './sessionSteps'

const cover = [
  { id: 'r1', wiki_link: ['Concepts/Variance'] },
  { id: 'l1', wiki_link: ['Concepts/Bayes+Theorem'] },
  { id: 'r2', wiki_link: ['Concepts/Covariance'] },
]

describe('sessionQuizSteps', () => {
  it('orders Fix, Learn, Review and names each question\'s step', () => {
    const { ids, steps } = sessionQuizSteps(['f1', 'f2'], cover, ['Bayes Theorem'])
    expect(ids).toEqual(['f1', 'f2', 'l1', 'r1', 'r2'])
    expect(steps).toEqual({ f1: 'fix', f2: 'fix', l1: 'learn', r1: 'review', r2: 'review' })
  })

  it('keeps a question in the first step that claims it', () => {
    const { ids, steps } = sessionQuizSteps(['l1'], cover, ['bayes theorem'])
    expect(steps.l1).toBe('fix')
    expect(ids).toEqual(['l1', 'r1', 'r2'])
  })
})

describe('orderBySteps', () => {
  const steps = { f1: 'fix', l1: 'learn', r1: 'review', r2: 'review' } as const

  it('puts a shuffled draw in step order, keeping the draw\'s order inside a step', () => {
    const drawn = [{ id: 'r2' }, { id: 'l1' }, { id: 'r1' }, { id: 'f1' }]
    const out = orderBySteps(drawn, { ...steps })
    expect(out?.questions.map(q => q.id)).toEqual(['f1', 'l1', 'r2', 'r1'])
    expect(out?.steps).toEqual(['fix', 'learn', 'review', 'review'])
  })

  it('applies only when the map names exactly these questions', () => {
    expect(orderBySteps([{ id: 'f1' }], { ...steps })).toBeNull()
    expect(orderBySteps([{ id: 'f1' }, { id: 'l1' }, { id: 'r1' }, { id: 'zz' }], { ...steps })).toBeNull()
    expect(orderBySteps([{ id: 'f1' }], null)).toBeNull()
    expect(orderBySteps([], {})).toBeNull()
  })
})

describe('stepsFromStored', () => {
  it('reads a stored map and refuses anything else', () => {
    expect(stepsFromStored('{"a":"fix","b":"review"}')).toEqual({ a: 'fix', b: 'review' })
    expect(stepsFromStored(null)).toBeNull()
    expect(stepsFromStored('nope')).toBeNull()
    expect(stepsFromStored('{}')).toBeNull()
    expect(stepsFromStored('{"a":"later"}')).toBeNull()
    expect(stepsFromStored('["fix"]')).toBeNull()
  })
})
