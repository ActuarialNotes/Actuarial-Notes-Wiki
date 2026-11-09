import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { battleExamCounts, battlePool } from './battle'
import { catalogueTopics, topicCatalogue } from './battleTopics'
import { HAND_SIZE, battlePairReader, dealPairs, drawRound, keptCards, roundPairs, topUpHand, type ReadPair } from './battleDraft'
import { filterQuestions, parseQuestion, type Question } from './parser'

// The draft played on the real bank (docs/quiz-battle-redesign.md §4): random
// hands, random strikes, the deal, and how many rounds a coin has to settle
// because no question tests both cards of their pair.

const VAULT = resolve(__dirname, '../../..')

const pages = new Map<string, string>()
for (const f of readdirSync(resolve(VAULT, 'Concepts'))) {
  if (f.endsWith('.md')) pages.set(f.replace(/\.md$/, '').toLowerCase(), readFileSync(resolve(VAULT, 'Concepts', f), 'utf8'))
}

const bank: Question[] = []
for (const dir of readdirSync(resolve(VAULT, 'questions'))) {
  for (const f of readdirSync(resolve(VAULT, 'questions', dir))) {
    if (!f.endsWith('.md')) continue
    const q = parseQuestion(readFileSync(resolve(VAULT, 'questions', dir, f), 'utf8'))
    if (q) bank.push(q)
  }
}
const graphQuestions = filterQuestions(bank, {}).map(q => ({ id: q.id, links: q.wiki_link }))

function seeded(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function cached(read: ReadPair): ReadPair {
  const memo = new Map<string, ReturnType<ReadPair>>()
  return (a, b) => {
    const key = `${a}\u0000${b}`
    let hit = memo.get(key)
    if (!hit) memo.set(key, (hit = read(a, b)))
    return hit
  }
}

const DRAFTS = 400

interface Measure {
  exam: string
  topics: number
  rounds: number
  coinRounds: number
  draftsWithCoin: number
  allCoin: number
}

/** A hand drawn the way a player who favours well-stocked topics would: each topic weighted by its questions. */
function weightedHand(topics: readonly { name: string; questions: number }[], random: () => number): string[] {
  const left = [...topics]
  const hand: string[] = []
  while (hand.length < HAND_SIZE && left.length > 0) {
    let r = random() * left.reduce((s, t) => s + t.questions, 0)
    let at = 0
    while (at < left.length - 1 && (r -= left[at].questions) > 0) at++
    hand.push(left.splice(at, 1)[0].name)
  }
  return hand
}

function measure(exam: string, weighted: boolean): Measure {
  const pool = battlePool(bank, exam)
  const catalogue = catalogueTopics(topicCatalogue(pool))
  const offered = catalogue.map(t => t.name)
  const read = cached(battlePairReader({ pool, graphQuestions, page: name => pages.get(name.toLowerCase()) }))
  const random = seeded(7)
  const out: Measure = { exam, topics: offered.length, rounds: 0, coinRounds: 0, draftsWithCoin: 0, allCoin: 0 }
  for (let d = 0; d < DRAFTS; d++) {
    const hands = weighted
      ? [weightedHand(catalogue, random), weightedHand(catalogue, random)]
      : [topUpHand([], offered, random), topUpHand([], offered, random)]
    const kept = hands.map(h => keptCards(h, h[Math.floor(random() * HAND_SIZE)]))
    const deal = dealPairs(kept[0], kept[1], read, random)
    const coins = deal.pairs.filter(p => p.shared === 0).length
    out.rounds += deal.pairs.length
    out.coinRounds += coins
    if (coins > 0) out.draftsWithCoin++
    if (coins === deal.pairs.length) out.allCoin++
  }
  return out
}

const raceable = [...battleExamCounts(bank).keys()].sort()

describe('the draft over the vault', () => {
  it('has the raceable exams the redesign names', () => {
    for (const exam of ['Probability', 'Financial Mathematics', 'Exam MAS-I', 'Exam MAS-II']) expect(raceable).toContain(exam)
  })

  it.each(raceable)('%s deals three rounds from every draft, never repeating a question', exam => {
    const pool = battlePool(bank, exam)
    const offered = catalogueTopics(topicCatalogue(pool)).map(t => t.name)
    const read = cached(battlePairReader({ pool, graphQuestions, page: name => pages.get(name.toLowerCase()) }))
    const random = seeded(3)
    for (let d = 0; d < 25; d++) {
      const hands = [topUpHand([], offered, random), topUpHand([], offered, random)]
      expect(hands.every(h => h.length === HAND_SIZE)).toBe(true)
      const deal = dealPairs(keptCards(hands[0], hands[0][0]), keptCards(hands[1], hands[1][1]), read, random)
      expect(deal.pairs).toHaveLength(3)
      const used = new Set<string>()
      for (const at of roundPairs(deal.pairs.length, 10)) {
        const pair = deal.pairs[at]
        const drawn = drawRound(pool, pair.cards, pair.shared > 0 ? 'both' : pair.cards[random() < 0.5 ? 0 : 1], used, 0.5, random)
        if (!drawn) break
        expect(used.has(drawn.question.id)).toBe(false)
        used.add(drawn.question.id)
      }
    }
  })

  // The measurement §4 asked for before the screens were built (recorded in
  // docs/quiz-battle-redesign.md §4). It prints the share of rounds a coin
  // settles, for random hands and for hands that favour well-stocked topics.
  // About a minute, so it runs on request:
  //   BATTLE_DRAFT_MEASURE=1 npx vitest run src/lib/battleDraftVault.test.ts
  it.skipIf(!process.env.BATTLE_DRAFT_MEASURE)('reports how often a round needs the coin', () => {
    for (const weighted of [false, true]) {
    const rows = raceable.map(exam => measure(exam, weighted))
    const lines = rows.map(m =>
      `${m.exam.padEnd(12)} ${String(m.topics).padStart(4)} topics  ` +
      `coin rounds ${(100 * m.coinRounds / m.rounds).toFixed(1).padStart(5)}%  ` +
      `drafts with a coin ${(100 * m.draftsWithCoin / DRAFTS).toFixed(1).padStart(5)}%  ` +
      `all three by coin ${(100 * m.allCoin / DRAFTS).toFixed(1).padStart(5)}%`,
    )
    process.stdout.write(`${weighted ? 'Hands weighted by questions' : 'Random hands'}, ${DRAFTS} drafts per exam:\n${lines.join('\n')}\n`)
    for (const m of rows) expect(m.rounds).toBe(DRAFTS * 3)
    }
  }, 120_000)
})
