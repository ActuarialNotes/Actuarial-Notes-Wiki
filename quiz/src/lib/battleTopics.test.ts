import { describe, expect, it } from 'vitest'
import type { Question } from './parser'
import { catalogueTopics, questionTopics, topicCatalogue } from './battleTopics'

function q(id: string, concepts: string[], partial: Partial<Question> = {}): Question {
  return {
    id, exam: 'Probability', topic: '', learning_objective: 'General Probability', difficulty: 'medium',
    type: 'multiple-choice', wiki_link: concepts.map(c => `Concepts/${c.replace(/ /g, '+')}`),
    answer: 'A', explanation: '', points: 1, stem: '',
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }],
    ...partial,
  }
}

describe('the topics a question tests', () => {
  it('are its concepts, by the name their mastery is kept under, each once', () => {
    expect(questionTopics(q('a', ['Bayes Theorem', 'Conditional Probability', 'Bayes Theorem']))).toEqual([
      'Bayes Theorem',
      'Conditional Probability',
    ])
    expect(questionTopics({ wiki_link: ['/wiki/concept/Normal+Distribution', 'Concepts/Normal+Distribution.md'] })).toEqual([
      'Normal Distribution',
    ])
  })
})

describe('the catalogue', () => {
  const pool = [
    q('1', ['Bayes Theorem']),
    q('2', ['Bayes Theorem', 'Independent Events']),
    q('3', ['Poisson Distribution'], { learning_objective: 'Univariate Random Variables' }),
    q('4', ['Poisson Distribution', 'Expected Value'], { learning_objective: 'Univariate Random Variables' }),
    q('5', ['Expected Value'], { learning_objective: 'Univariate Random Variables' }),
    q('6', ['Expected Value'], { learning_objective: 'Multivariate Random Variables' }),
    q('7', ['Unlisted Thing'], { learning_objective: 'General Probability' }),
  ]

  it('follows the syllabus: its objectives in order, its concepts in order, the rest after them', () => {
    const syllabus = {
      topics: [
        { name: 'General Probability', concepts: [{ name: 'Independent Events' }, { name: 'Bayes Theorem' }] },
        { name: 'Univariate Random Variables', concepts: [{ name: 'Poisson Distribution' }] },
        { name: 'Multivariate Random Variables', concepts: [{ name: 'Expected Value' }] },
      ],
    }
    expect(topicCatalogue(pool, syllabus)).toEqual([
      {
        title: 'General Probability',
        topics: [
          { name: 'Independent Events', questions: 1 },
          { name: 'Bayes Theorem', questions: 2 },
          { name: 'Unlisted Thing', questions: 1 },
        ],
      },
      { title: 'Univariate Random Variables', topics: [{ name: 'Poisson Distribution', questions: 2 }] },
      // The syllabus lists it here, though most of its questions say otherwise.
      { title: 'Multivariate Random Variables', topics: [{ name: 'Expected Value', questions: 3 }] },
    ])
  })

  it('without a syllabus, groups by the objective most questions name, the best-stocked first', () => {
    const catalogue = topicCatalogue(pool)
    expect(catalogue.map(g => g.title)).toEqual(['Univariate Random Variables', 'General Probability'])
    expect(catalogue[0].topics.map(t => t.name)).toEqual(['Expected Value', 'Poisson Distribution'])
    expect(catalogue[1].topics.map(t => t.name)).toEqual(['Bayes Theorem', 'Independent Events', 'Unlisted Thing'])
    expect(catalogueTopics(catalogue)).toHaveLength(5)
  })

  it('matches a lettered CAS objective to the words a question names it by', () => {
    const cas = [q('1', ['GLMs'], { learning_objective: 'Extended Linear Models' })]
    const syllabus = { topics: [{ name: 'C. Extended Linear Models', concepts: [] }] }
    expect(topicCatalogue(cas, syllabus)).toEqual([{ title: 'C. Extended Linear Models', topics: [{ name: 'GLMs', questions: 1 }] }])
  })
})
