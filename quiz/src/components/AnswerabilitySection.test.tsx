import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { AnswerabilityHistory } from './AnswerabilitySection'
import type { AnswerabilityEntry } from '@/lib/answerability'

const ENTRY: AnswerabilityEntry = {
  id: 'p-004',
  path: 'questions/exam-p/p-004.md',
  run: 'answerability-20261025-p',
  verdict: 'untagged',
  requirements: [
    { id: 'r1', kind: 'fact', statement: 'Independent events multiply.', concept: 'Independent Events',
      status: 'elsewhere', places: [{ page: 'Probability Multiplication Rule', quote: 'the rule simplifies' }] },
  ],
}

describe('AnswerabilityHistory', () => {
  it('folds to a card naming the verdict and the latest check', () => {
    const html = renderToStaticMarkup(<AnswerabilityHistory entry={ENTRY} />)
    expect(html).toContain('Answerability')
    expect(html).toContain('Out of reach · Latest 25 Oct 2026')
    // Folded: the history is one tap away.
    expect(html).not.toContain('Independent events multiply.')
  })
})
