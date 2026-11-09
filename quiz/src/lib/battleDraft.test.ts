import { describe, expect, it } from 'vitest'
import type { Question } from './parser'
import {
  COIN_MS,
  DEAL_MS,
  HAND_SIZE,
  autoStrike,
  battlePairReader,
  cardLevel,
  cleanHand,
  coinShowing,
  dealPairs,
  dealStartedAt,
  dealtOrder,
  drawRound,
  emptyDraft,
  isCoinRound,
  keptCards,
  keptHand,
  orderPairs,
  redactDraft,
  roundChips,
  roundPairs,
  roundTopics,
  sharedQuestions,
  shiftDraftClock,
  toggleCard,
  topUpHand,
  type BattleDraft,
  type DealtPair,
  type ReadPair,
} from './battleDraft'

function q(id: string, concepts: string[], partial: Partial<Question> = {}): Question {
  return {
    id, exam: 'Probability', topic: '', learning_objective: 'General Probability', difficulty: 'medium',
    type: 'multiple-choice', wiki_link: concepts.map(c => `Concepts/${c.replace(/ /g, '+')}`),
    answer: 'A', explanation: '', points: 1, stem: '',
    options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }],
    ...partial,
  }
}

function seeded(seed = 1): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const OFFERED = ['Bayes Theorem', 'Variance', 'Expected Value', 'Poisson Distribution', 'Covariance', 'Median']

/** A pair reader off a table: strength by name pair, and how many questions share it. */
function table(rows: Record<string, [number, number]>): ReadPair {
  return (a, b) => {
    const hit = rows[`${a}|${b}`] ?? rows[`${b}|${a}`] ?? [0, 0]
    return { strength: hit[0], shared: Array.from({ length: hit[1] }, (_, i) => `${a}-${b}-${i}`) }
  }
}

describe('a hand', () => {
  it('holds to the topics offered, in their spelling, each once, at most four', () => {
    expect(cleanHand(['variance ', 'Variance', 'Nope', 7, 'bayes theorem', 'Median', 'Covariance', 'Expected Value'], OFFERED))
      .toEqual(['Variance', 'Bayes Theorem', 'Median', 'Covariance'])
  })

  it('draws and puts back a card, never past four', () => {
    expect(toggleCard(['A', 'B'], 'C')).toEqual(['A', 'B', 'C'])
    expect(toggleCard(['A', 'B', 'C'], 'b')).toEqual(['A', 'C'])
    expect(toggleCard(['A', 'B', 'C', 'D'], 'E')).toEqual(['A', 'B', 'C', 'D'])
  })

  it('is topped up at random from the topics not drawn when the clock runs out', () => {
    const hand = topUpHand(['Variance'], OFFERED, seeded(4))
    expect(hand).toHaveLength(HAND_SIZE)
    expect(hand[0]).toBe('Variance')
    expect(new Set(hand).size).toBe(HAND_SIZE)
    for (const t of hand) expect(OFFERED).toContain(t)
    // A full hand is left alone, and an exam with too few topics gives what it has.
    expect(topUpHand(OFFERED.slice(0, 4), OFFERED)).toEqual(OFFERED.slice(0, 4))
    expect(topUpHand([], ['A', 'B'])).toHaveLength(2)
  })
})

describe('a strike', () => {
  it('made for a player out of time takes the other’s highest-levelled card, a tie at random', () => {
    expect(autoStrike(['A', 'B', 'C', 'D'], [0, 3, 1, 2])).toBe('B')
    const tied = new Set(Array.from({ length: 40 }, (_, i) => autoStrike(['A', 'B', 'C', 'D'], [2, 0, 2, 1], seeded(i * 104_729 + 17))))
    expect(tied).toEqual(new Set(['A', 'C']))
    // No levels known: every card is New, and any may go.
    expect(['A', 'B', 'C', 'D']).toContain(autoStrike(['A', 'B', 'C', 'D'], null, seeded(2)))
  })

  it('takes one copy of a card out of a hand', () => {
    expect(keptCards(['A', 'B', 'C', 'D'], 'c')).toEqual(['A', 'B', 'D'])
    expect(keptCards(['A', 'B', 'B', 'D'], 'B')).toEqual(['A', 'B', 'D'])
    expect(keptCards(['A', 'B', 'C', 'D'], null)).toEqual(['A', 'B', 'C', 'D'])
  })
})

describe('the pairing', () => {
  it('matches the most pairs some question tests both of, before the most strength', () => {
    // The strongest matching (A–X, B–Y, C–Z = 270) has one shared question;
    // a weaker one covers all three, and wins.
    const read = table({
      'A|X': [90, 0], 'B|Y': [90, 0], 'C|Z': [90, 1],
      'A|Y': [20, 2], 'B|Z': [20, 3], 'C|X': [20, 1],
    })
    const { pairs, grid } = dealPairs(['A', 'B', 'C'], ['X', 'Y', 'Z'], read)
    expect(grid).toEqual([[90, 20, 0], [0, 90, 20], [20, 0, 90]])
    expect(pairs.map(p => p.cards.join('–')).sort()).toEqual(['A–Y', 'B–Z', 'C–X'])
    expect(pairs.every(p => p.shared > 0)).toBe(true)
  })

  it('among matchings that cover as many, takes the strongest', () => {
    const read = table({ 'A|X': [80, 1], 'B|Y': [70, 1], 'C|Z': [60, 0], 'A|Y': [10, 1], 'B|X': [10, 1], 'C|X': [5, 0] })
    const { pairs } = dealPairs(['A', 'B', 'C'], ['X', 'Y', 'Z'], read)
    expect(pairs.map(p => p.cards.join('–')).sort()).toEqual(['A–X', 'B–Y', 'C–Z'])
  })

  it('breaks a dead heat with the coin it is given', () => {
    const flat: ReadPair = () => ({ strength: 50, shared: [] })
    const seen = new Set(Array.from({ length: 30 }, (_, i) =>
      dealPairs(['A', 'B', 'C'], ['X', 'Y', 'Z'], flat, seeded(i * 104_729 + 17)).pairs.map(p => p.cards.join('')).sort().join(',')))
    expect(seen.size).toBeGreaterThan(1)
    for (const deal of seen) expect(new Set(deal.split(',').map(p => p[1])).size).toBe(3)
  })

  it('uses no card twice', () => {
    const read = table({ 'A|X': [99, 1], 'B|X': [98, 1], 'C|X': [97, 1] })
    const { pairs } = dealPairs(['A', 'B', 'C'], ['X', 'Y', 'Z'], read)
    expect(new Set(pairs.map(p => p.cards[0])).size).toBe(3)
    expect(new Set(pairs.map(p => p.cards[1])).size).toBe(3)
  })

  it('plays the strongest pair with a shared question last, the rest strongest first', () => {
    const pair = (strength: number, shared: number, r: number): DealtPair => ({ cards: [`r${r}`, `c${r}`], strength, shared, cell: [r, r] })
    // O1: the strongest of all (88) has no question; the final is the strongest that does.
    const ordered = orderPairs([pair(88, 0, 0), pair(61, 2, 1), pair(76, 1, 2)])
    expect(ordered.map(p => p.strength)).toEqual([88, 61, 76])
    // With no shared question anywhere, the strongest pair is the final.
    expect(orderPairs([pair(10, 0, 0), pair(50, 0, 1), pair(30, 0, 2)]).map(p => p.strength)).toEqual([30, 10, 50])
  })
})

describe('the rounds', () => {
  it('plays each pair once in three rounds, and goes round them again in a longer room, ending on the final', () => {
    expect(roundPairs(3, 3)).toEqual([0, 1, 2])
    for (const rounds of [5, 7, 10]) {
      const plan = roundPairs(3, rounds)
      expect(plan).toHaveLength(rounds)
      expect(plan[rounds - 1]).toBe(2)
      // Round after round, the pairs in their order — never the same one twice running.
      plan.slice(1).forEach((p, i) => expect(p).toBe((plan[i] + 1) % 3))
    }
    expect(roundPairs(0, 3)).toEqual([])
  })

  it('lays the dealt cards out by their first round, the final last', () => {
    const pairs = [0, 1, 2].map(i => ({ cards: [`a${i}`, `b${i}`] as [string, string], strength: 50, shared: 1, cell: [i, i] as [number, number] }))
    expect(dealtOrder({ pairs }, 3).map(d => d.label)).toEqual(['Round 1', 'Round 2', 'Final'])
    // Five rounds go 1, 2, 0, 1, 2: the second pair comes up first.
    expect(dealtOrder({ pairs }, 5).map(d => [d.index, d.label])).toEqual([[1, 'Round 1'], [0, 'Round 3'], [2, 'Final']])
  })
})

describe('a round’s question', () => {
  const pool = [
    q('both-1', ['Bayes Theorem', 'Variance'], { difficulty: 'easy' }),
    q('both-2', ['Bayes Theorem', 'Variance'], { difficulty: 'hard' }),
    q('bayes', ['Bayes Theorem']),
    q('var', ['Variance']),
    q('other', ['Median']),
  ]

  it('finds the questions that test both cards — and, for one concept in both hands, every question on it', () => {
    expect(sharedQuestions(pool, 'Variance', 'bayes theorem').map(x => x.id)).toEqual(['both-1', 'both-2'])
    expect(sharedQuestions(pool, 'Variance', 'Variance').map(x => x.id)).toEqual(['both-1', 'both-2', 'var'])
  })

  it('draws a paired round from the questions that test both, leaning toward the difficulty', () => {
    const drawn = drawRound(pool, ['Bayes Theorem', 'Variance'], 'both', new Set(), 1, seeded(3))
    expect(drawn).toMatchObject({ question: { id: 'both-2' }, basis: 'both', topic: 'Bayes Theorem' })
  })

  it('draws a coin round on the coin’s card, then the other, then the whole exam — never a repeat', () => {
    const cards: [string, string] = ['Bayes Theorem', 'Variance']
    expect(drawRound(pool, cards, 'Variance', new Set(['both-1', 'both-2']), 0.5)).toMatchObject({ question: { id: 'var' }, basis: 'one', topic: 'Variance' })
    expect(drawRound(pool, cards, 'Variance', new Set(['both-1', 'both-2', 'var']), 0.5)).toMatchObject({ question: { id: 'bayes' }, basis: 'one', topic: 'Bayes Theorem' })
    expect(drawRound(pool, cards, 'Variance', new Set(['both-1', 'both-2', 'var', 'bayes']), 0.5)).toMatchObject({ question: { id: 'other' }, basis: 'any', topic: null })
    expect(drawRound(pool, cards, 'Variance', new Set(pool.map(x => x.id)), 0.5)).toBeNull()
  })

  it('falls back from a paired round whose shared questions are spent', () => {
    const drawn = drawRound(pool, ['Bayes Theorem', 'Variance'], 'both', new Set(['both-1', 'both-2']), 0.5)
    expect(drawn).toMatchObject({ question: { id: 'bayes' }, basis: 'one', topic: 'Bayes Theorem' })
  })
})

describe('the pair reader', () => {
  const pool = [q('p1', ['Bayes Theorem', 'Variance']), q('p2', ['Variance'])]
  const read = battlePairReader({
    pool,
    graphQuestions: pool.map(x => ({ id: x.id, links: x.wiki_link })),
    page: name => (name === 'Bayes Theorem' ? 'Bayes Theorem updates a prior, as [[Variance]] measures spread.' : undefined),
  })

  it('reads Concept Craft’s strength and the battle questions that test both', () => {
    const pair = read('Bayes Theorem', 'Variance')
    expect(pair.shared).toEqual(['p1'])
    expect(pair.strength).toBeGreaterThan(0)
    expect(pair.strength).toBeLessThanOrEqual(100)
    expect(read('Bayes Theorem', 'Median')).toEqual({ strength: 0, shared: [] })
  })

  it('pairs a concept with itself as strongly as can be', () => {
    expect(read('Variance', 'variance')).toEqual({ strength: 100, shared: ['p1', 'p2'] })
  })
})

describe('the draft as it travels', () => {
  const HAND_A = ['Bayes Theorem', 'Variance', 'Expected Value', 'Poisson Distribution']
  const HAND_B = ['Covariance', 'Median', 'Variance', 'Mode']
  const draw: BattleDraft = { ...emptyDraft(1, 30_000), counts: [4, 4], hands: [HAND_A, HAND_B], levels: [[1, 0, 3, 2], [2, 2, 0, 1]] }

  it('hides the other player’s hand while hands are open — they may know it’s in, not what', () => {
    const seen = redactDraft(draw, 0)
    expect(seen.hands).toEqual([HAND_A, []])
    expect(seen.levels).toEqual([[1, 0, 3, 2], []])
    expect(seen.counts).toEqual([4, 4])
    expect(redactDraft({ ...draw, hands: [HAND_A, null] }, 0).hands).toEqual([HAND_A, null])
  })

  it('shows both hands for the strikes, hiding the other’s strike until both are in', () => {
    const strike: BattleDraft = { ...draw, phase: 'strike', strikes: ['Median', 'Variance'] }
    expect(redactDraft(strike, 0).hands).toEqual([HAND_A, HAND_B])
    expect(redactDraft(strike, 0).strikes).toEqual(['Median', ''])
    expect(redactDraft(strike, 1).strikes).toEqual(['', 'Variance'])
    const deal: BattleDraft = { ...strike, phase: 'deal' }
    expect(redactDraft(deal, 1)).toBe(deal)
  })

  it('keeps each player’s three, and each card’s level', () => {
    const deal: BattleDraft = { ...draw, phase: 'deal', strikes: ['Median', 'Variance'] }
    expect(keptHand(deal, 0)).toEqual(['Bayes Theorem', 'Expected Value', 'Poisson Distribution'])
    expect(keptHand(deal, 1)).toEqual(['Covariance', 'Variance', 'Mode'])
    expect(cardLevel(deal, 0, 'expected value')).toBe(3)
    expect(cardLevel(deal, 1, 'Nope')).toBe(0)
  })

  it('moves onto another clock, and knows when its deal began', () => {
    const deal: BattleDraft = { ...draw, phase: 'deal', deadline: 50_000 }
    expect(shiftDraftClock(deal, 250).deadline).toBe(50_250)
    expect(shiftDraftClock(deal, 0)).toBe(deal)
    expect(dealStartedAt(deal)).toBe(50_000 - DEAL_MS)
  })

  it('shows the coin from its toss to the question, and no longer', () => {
    expect(coinShowing(10_000, 3000, 10_000 - 3000 - COIN_MS - 1)).toBe(false)
    expect(coinShowing(10_000, 3000, 10_000 - 3000 - COIN_MS)).toBe(true)
    expect(coinShowing(10_000, 3000, 9999)).toBe(true)
    expect(coinShowing(10_000, 3000, 10_000)).toBe(false)
  })
})

describe('a round, told', () => {
  const deal: BattleDraft = {
    ...emptyDraft(1, 0),
    phase: 'deal',
    pairs: [
      { cards: ['Bornhuetter-Ferguson Method', 'Chain Ladder Method'], strength: 88, shared: 3, cell: [0, 0] },
      { cards: ['Benktander Method', 'Loss Ratio'], strength: 70, shared: 0, cell: [1, 1] },
      { cards: ['Pure Premium', 'Pure Premium'], strength: 100, shared: 9, cell: [2, 2] },
    ],
    rounds: [
      { pair: 0, paired: true, coin: null, basis: 'both', topic: 'Bornhuetter-Ferguson Method' },
      { pair: 1, paired: false, coin: 1, basis: 'one', topic: 'Loss Ratio' },
      { pair: 2, paired: true, coin: null, basis: 'both', topic: 'Pure Premium' },
      { pair: 1, paired: false, coin: null, basis: null, topic: null },
      { pair: 0, paired: true, coin: null, basis: 'any', topic: null },
    ],
  }

  it('shows a paired round as both cards, this player’s first', () => {
    expect(roundChips(deal, 0, 0)).toEqual([{ name: 'Bornhuetter-Ferguson Method', seat: 0 }, { name: 'Chain Ladder Method', seat: 1 }])
    expect(roundChips(deal, 0, 1)).toEqual([{ name: 'Chain Ladder Method', seat: 1 }, { name: 'Bornhuetter-Ferguson Method', seat: 0 }])
    expect(roundChips(deal, 2, 0)).toEqual([{ name: 'Pure Premium', seat: null }])
  })

  it('shows a coin round as the card it landed on, and nothing while it is in the air', () => {
    expect(roundChips(deal, 1, 0)).toEqual([{ name: 'Loss Ratio', seat: 1 }])
    expect(roundChips(deal, 3, 0)).toBeNull()
    expect(roundChips(deal, 4, 0)).toEqual([{ name: 'Any topic', seat: null }])
    expect(roundChips(null, 0, 0)).toBeNull()
    expect(isCoinRound(deal, 1)).toBe(true)
    expect(isCoinRound(deal, 0)).toBe(false)
    expect(isCoinRound(deal, 3)).toBe(false)
  })

  it('names what each round was on, for the results', () => {
    expect(roundTopics(deal, 0)).toEqual(['Bornhuetter-Ferguson Method', 'Chain Ladder Method'])
    expect(roundTopics(deal, 1)).toEqual(['Loss Ratio'])
    expect(roundTopics(deal, 2)).toEqual(['Pure Premium'])
    expect(roundTopics(deal, 3)).toEqual([])
    expect(roundTopics(deal, 4)).toEqual([])
  })
})
