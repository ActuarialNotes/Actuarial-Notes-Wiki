import { describe, expect, it } from 'vitest'
import { conceptKey, pickSimilarQuestion } from './similarQuestion'
import { mc } from './sessionFixtures.testutil'
import type { Verification } from './verification'

const missed = mc('m', { wiki_link: ['Concepts/Bayes+Theorem', 'Concepts/Conditional+Probability'] })

describe('pickSimilarQuestion', () => {
  it('returns null when no other question shares a concept', () => {
    expect(pickSimilarQuestion(missed, [missed])).toBeNull()
    expect(pickSimilarQuestion(missed, [mc('x', { wiki_link: ['Concepts/Variance'] })])).toBeNull()
    expect(pickSimilarQuestion(mc('none', { wiki_link: [] }), [mc('x')])).toBeNull()
  })

  it('never offers the question itself or one already in the quiz', () => {
    const pool = [missed, mc('a'), mc('b')]
    expect(pickSimilarQuestion(missed, pool, { excludeIds: ['a'] })?.id).toBe('b')
    expect(pickSimilarQuestion(missed, pool, { excludeIds: ['a', 'b'] })).toBeNull()
  })

  it('stays inside the exam', () => {
    expect(pickSimilarQuestion(missed, [mc('fm', { exam: 'Exam FM' })])).toBeNull()
  })

  it('leaves out an off-syllabus question and one withheld for a critical finding', () => {
    const critical = { openCritical: 1, status: 'unverified' } as unknown as Verification
    const pool = [mc('off', { off_syllabus: true }), mc('bad', { verification: critical })]
    expect(pickSimilarQuestion(missed, pool)).toBeNull()
    expect(pickSimilarQuestion(missed, pool, { includeFlagged: true })?.id).toBe('bad')
  })

  it('prefers the first concept over a later one', () => {
    const pool = [
      mc('later', { wiki_link: ['Concepts/Conditional+Probability'] }),
      mc('first', { wiki_link: ['Concepts/Bayes+Theorem'] }),
    ]
    expect(pickSimilarQuestion(missed, pool)?.id).toBe('first')
  })

  it('then the most concepts shared, the same type, an unseen one, the closest difficulty, the fewest other concepts', () => {
    const both = mc('both', { wiki_link: ['Concepts/Bayes+Theorem', 'Concepts/Conditional+Probability'] })
    expect(pickSimilarQuestion(missed, [mc('one'), both])?.id).toBe('both')

    const free = mc('free', { type: 'free-entry' })
    expect(pickSimilarQuestion(missed, [free, mc('same')])?.id).toBe('same')

    expect(pickSimilarQuestion(missed, [mc('a-seen'), mc('b-new')], { seenIds: new Set(['a-seen']) })?.id).toBe('b-new')

    expect(pickSimilarQuestion(missed, [mc('a-hard', { difficulty: 'hard' }), mc('b-medium')])?.id).toBe('b-medium')

    const wide = mc('a-wide', { wiki_link: ['Concepts/Bayes+Theorem', 'Concepts/Variance'] })
    expect(pickSimilarQuestion(missed, [wide, mc('b-narrow')])?.id).toBe('b-narrow')
  })

  it('breaks a tie by id, so the same miss offers the same question', () => {
    expect(pickSimilarQuestion(missed, [mc('p-20'), mc('p-10')])?.id).toBe('p-10')
    expect(pickSimilarQuestion(missed, [mc('p-10'), mc('p-20')])?.id).toBe('p-10')
  })

  it('matches concepts whatever the spelling of the link', () => {
    expect(conceptKey('Concepts/Bayes+Theorem')).toBe('bayes theorem')
    expect(conceptKey('Concepts/Bayes Theorem.md')).toBe('bayes theorem')
    expect(pickSimilarQuestion(missed, [mc('x', { wiki_link: ['Concepts/bayes theorem'] })])?.id).toBe('x')
  })
})
