import { describe, expect, it } from 'vitest'
import type { Question } from './parser'
import {
  DRAW_HOLD_MS,
  DRAW_STEP_MS,
  MAX_TOPICS,
  TOPIC_REVEAL_MS,
  catalogueTopics,
  cleanTopicPick,
  drawDurationMs,
  drawFromTopics,
  drawStartedAt,
  drawnSoFar,
  questionTopics,
  redactDraft,
  shiftDraftClock,
  toggleTopic,
  topicCatalogue,
  topicPickers,
  type BattleDraft,
} from './battleTopics'

function q(id: string, concepts: string[], partial: Partial<Question> = {}): Question {
  return {
    id, exam: 'Probability', topic: '', learning_objective: 'General Probability', difficulty: 'medium',
    type: 'multiple-choice', wiki_link: concepts.map(c => `Concepts/${c.replace(/ /g, '+')}`),
    answer: 'A', explanation: '', points: 1, stem: '',
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }],
    ...partial,
  }
}

/** A seeded generator, so a draw can be asserted on. */
function seeded(seed = 1): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
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

describe('a pick', () => {
  const offered = ['Bayes Theorem', 'Independent Events', 'Poisson Distribution', 'Expected Value']

  it('holds to the topics offered, in their spelling, each once, at most three', () => {
    expect(cleanTopicPick(['bayes theorem', 'Nope', 'Bayes Theorem', 42, 'Expected Value', 'Independent Events', 'Poisson Distribution'], offered))
      .toEqual(['Bayes Theorem', 'Expected Value', 'Independent Events'])
    expect(cleanTopicPick([], offered)).toEqual([])
  })

  it('toggles a topic on and off, never past the limit', () => {
    let chosen: string[] = []
    for (const t of offered) chosen = toggleTopic(chosen, t)
    expect(chosen).toEqual(offered.slice(0, MAX_TOPICS))
    expect(toggleTopic(chosen, 'bayes theorem')).toEqual(['Independent Events', 'Poisson Distribution'])
  })

  it('says who picked a topic', () => {
    const picks: [string[], string[]] = [['Bayes Theorem', 'Expected Value'], ['Expected Value']]
    expect(topicPickers(picks, 'Bayes Theorem')).toEqual([0])
    expect(topicPickers(picks, 'expected value')).toEqual([0, 1])
    expect(topicPickers(picks, null)).toEqual([])
    expect(topicPickers([null, ['Bayes Theorem']], 'Bayes Theorem')).toEqual([1])
  })
})

describe('the draw', () => {
  const pool = [
    ...['a1', 'a2', 'a3'].map(id => q(id, ['Alpha'])),
    ...['b1', 'b2', 'b3'].map(id => q(id, ['Beta'])),
    ...['c1', 'c2'].map(id => q(id, ['Gamma'])),
    ...['z1', 'z2', 'z3', 'z4'].map(id => q(id, ['Zeta'])),
  ]

  it('takes turns between the players, each through their own topics in order', () => {
    const drawn = drawFromTopics(pool, [['Alpha', 'Gamma'], ['Beta']], 5, 0.5, seeded(3))
    const topics = drawn.map(d => d.topic)
    // Whoever the coin says goes first, the players alternate…
    const first = topics[0] === 'Beta' ? 1 : 0
    const mine = topics.filter((_, i) => i % 2 === (first === 0 ? 0 : 1))
    const theirs = topics.filter((_, i) => i % 2 === (first === 0 ? 1 : 0))
    expect(mine.every(t => t === 'Alpha' || t === 'Gamma')).toBe(true)
    expect(theirs.every(t => t === 'Beta')).toBe(true)
    // …and every pick is played before any is played twice.
    expect(mine.slice(0, 2)).toEqual(['Alpha', 'Gamma'])
  })

  it('never draws a question twice, and every one is on its topic', () => {
    for (let seed = 1; seed < 40; seed++) {
      const drawn = drawFromTopics(pool, [['Alpha'], ['Beta', 'Gamma']], 8, 0.5, seeded(seed))
      expect(drawn).toHaveLength(8)
      expect(new Set(drawn.map(d => d.question.id)).size).toBe(8)
      for (const d of drawn) {
        if (d.topic) expect(questionTopics(d.question)).toContain(d.topic)
      }
    }
  })

  it('hands a spent topic’s turn on — to the other player’s, then to the whole exam', () => {
    // Gamma has two questions; five rounds between two players who both picked only it.
    const drawn = drawFromTopics(pool, [['Gamma'], ['Gamma']], 5, 0.5, seeded(7))
    expect(drawn.map(d => d.topic)).toEqual(['Gamma', 'Gamma', null, null, null])
    // One player's topic runs dry: the other's carries on.
    const lopsided = drawFromTopics(pool, [['Gamma'], ['Zeta']], 6, 0.5, seeded(2))
    expect(lopsided.filter(d => d.topic === 'Gamma')).toHaveLength(2)
    expect(lopsided.filter(d => d.topic === 'Zeta')).toHaveLength(4)
  })

  it('draws from the whole exam when nobody picked anything', () => {
    const drawn = drawFromTopics(pool, [[], []], 3, 0.5, seeded(5))
    expect(drawn).toHaveLength(3)
    expect(drawn.every(d => d.topic === null)).toBe(true)
  })

  it('stops short when the exam runs out', () => {
    expect(drawFromTopics(pool.slice(0, 2), [['Alpha'], []], 5, 0.5, seeded(1))).toHaveLength(2)
  })

  it('leans toward the difficulty asked for', () => {
    const mixed = [
      ...Array.from({ length: 20 }, (_, i) => q(`e${i}`, ['Alpha'], { difficulty: 'easy' })),
      ...Array.from({ length: 20 }, (_, i) => q(`h${i}`, ['Alpha'], { difficulty: 'hard' })),
    ]
    let hard = 0
    for (let seed = 1; seed <= 50; seed++) {
      hard += drawFromTopics(mixed, [['Alpha'], []], 1, 1, seeded(seed)).filter(d => d.question.difficulty === 'hard').length
    }
    expect(hard).toBeGreaterThan(40)
  })
})

describe('the draw’s clock', () => {
  it('shows both picks, then deals a question a step, then holds', () => {
    expect(drawDurationMs(3)).toBe(TOPIC_REVEAL_MS + 3 * DRAW_STEP_MS + DRAW_HOLD_MS)
    expect(drawnSoFar(3, 0)).toBe(0)
    expect(drawnSoFar(3, TOPIC_REVEAL_MS - 1)).toBe(0)
    expect(drawnSoFar(3, TOPIC_REVEAL_MS)).toBe(1)
    expect(drawnSoFar(3, TOPIC_REVEAL_MS + DRAW_STEP_MS)).toBe(2)
    expect(drawnSoFar(3, drawDurationMs(3))).toBe(3)
  })
})

describe('the draft on the wire', () => {
  const picking: BattleDraft = { game: 1, phase: 'picking', deadline: 50_000, picks: [['Alpha'], ['Beta', 'Gamma']], drawn: [] }

  it('hides the other player’s pick while the picks are open — they may know it’s in, not what', () => {
    expect(redactDraft(picking, 0).picks).toEqual([['Alpha'], []])
    expect(redactDraft(picking, 1).picks).toEqual([[], ['Beta', 'Gamma']])
    expect(redactDraft({ ...picking, picks: [null, ['Beta']] }, 0).picks).toEqual([null, []])
    expect(redactDraft({ ...picking, picks: [['Alpha'], null] }, 0).picks).toEqual([['Alpha'], null])
  })

  it('shows both once the draw begins', () => {
    const drawing: BattleDraft = { ...picking, phase: 'drawing', drawn: [{ id: 'a1', topic: 'Alpha' }] }
    expect(redactDraft(drawing, 0)).toBe(drawing)
  })

  it('moves onto another clock, and knows when its draw began', () => {
    const drawing: BattleDraft = { ...picking, phase: 'drawing', deadline: 90_000, drawn: [{ id: 'a1', topic: 'Alpha' }, { id: 'b1', topic: 'Beta' }] }
    expect(shiftDraftClock(drawing, 250).deadline).toBe(90_250)
    expect(shiftDraftClock(drawing, 0)).toBe(drawing)
    expect(drawStartedAt(drawing)).toBe(90_000 - drawDurationMs(2))
  })
})
