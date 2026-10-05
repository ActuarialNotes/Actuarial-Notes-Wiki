import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { EMPTY_PROGRESS, boardState, craftTopics, madeBy, seedConcepts, topicGraph, withConnection, type CraftGraph, type CraftProgress } from './conceptCraft'
import { pageMentions } from './conceptGraph'
import { filterQuestions, parseQuestion, type Question } from './parser'
import { examPageIdFromFile } from './examMenu'
import { examStatus } from './examStatus'
import { wikiExamIdToProgressKey } from './wikiParser'

const VAULT = resolve(__dirname, '../../..')

const examPages: Record<string, string> = {}
for (const f of readdirSync(VAULT)) if (/^Exam .*\.md$/.test(f)) examPages[f] = readFileSync(resolve(VAULT, f), 'utf8')

const pages = new Map<string, { name: string; markdown: string }>()
for (const f of readdirSync(resolve(VAULT, 'Concepts'))) {
  if (!f.endsWith('.md')) continue
  const name = f.replace(/\.md$/, '')
  pages.set(name.toLowerCase(), { name, markdown: readFileSync(resolve(VAULT, 'Concepts', f), 'utf8') })
}

const bank: Question[] = []
for (const dir of readdirSync(resolve(VAULT, 'questions'))) {
  for (const f of readdirSync(resolve(VAULT, 'questions', dir))) {
    if (!f.endsWith('.md')) continue
    const q = parseQuestion(readFileSync(resolve(VAULT, 'questions', dir, f), 'utf8'))
    if (q) bank.push(q)
  }
}
const questions = filterQuestions(bank, {}).map(q => ({ id: q.id, links: q.wiki_link }))

const topics = craftTopics(examPages, name => pages.get(name.toLowerCase())?.name)
const graphs = topics.map(t => [t, topicGraph(t, name => pages.get(name.toLowerCase())?.markdown, questions)] as const)

/** Find every connection there is to find, as a reader who tried every pair would. */
function playEverything(graph: CraftGraph, seeds: string[]) {
  let progress: CraftProgress = EMPTY_PROGRESS
  let state = boardState(graph, seeds, progress)
  for (let grew = true; grew; ) {
    grew = false
    const inHand = new Set(state.held.map(n => n.toLowerCase()))
    for (const c of graph.connections) {
      if (progress.found.includes(c.key) || !inHand.has(c.a.toLowerCase()) || !inHand.has(c.b.toLowerCase())) continue
      progress = withConnection(progress, c)
      grew = true
    }
    state = boardState(graph, seeds, progress)
  }
  return state
}

/**
 * Concept Craft's topics and graphs, read off the real vault — the same
 * functions the board calls, over the pages it will be given.
 */
describe('Concept Craft over the vault', () => {
  it('gives every exam that can be studied a board', () => {
    const studiable = Object.keys(examPages)
      .map(f => ({ id: examPageIdFromFile(f), key: wikiExamIdToProgressKey(examPageIdFromFile(f)) }))
      .filter(e => examStatus(e.key, e.id) !== 'development')
    for (const e of studiable) expect(topics.some(t => t.exam === e.key), e.id).toBe(true)
  })

  it('has unique, url-safe topic ids', () => {
    const ids = topics.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it.each(graphs.map(([t, g]) => [t.id, t, g] as const))('%s connects nearly every concept, and can be made in full from its seeds', (_, topic, graph) => {
    const unconnected = topic.concepts.filter(c => !graph.neighbours.has(c.toLowerCase()))
    expect(unconnected.length, unconnected.join(', ')).toBeLessThanOrEqual(Math.ceil(topic.concepts.length / 10))
    expect(graph.connections.length).toBeGreaterThanOrEqual(topic.concepts.length)
    const seeds = seedConcepts(graph)
    // No seed the others can make: dealing one fewer would leave it out of reach.
    for (const seed of seeds) {
      const rest = seeds.filter(s => s !== seed)
      expect(playEverything(graph, rest).held, seed).not.toContain(seed)
    }
    // Finding every connection within reach, over and over, brings every
    // concept into hand and finds every connection.
    const state = playEverything(graph, seeds)
    expect(state.held.length).toBe(topic.concepts.length)
    expect(state.found.length).toBe(graph.connections.length)
  })

  it('makes most of every topic rather than dealing it', () => {
    const concepts = graphs.reduce((n, [t]) => n + t.concepts.length, 0)
    const dealt = graphs.reduce((n, [, g]) => n + seedConcepts(g).length, 0)
    expect(dealt / concepts).toBeLessThan(0.45)
  })

  // What a pair makes is what the made concept's own page builds from the two.
  // A page edit that breaks one of these is worth a look: either the page lost
  // its definition, or the rules lost their reading of it.
  it.each([
    ['exam-5-ratemaking', 'Frequency', 'Severity', 'Pure Premium'],
    ['exam-5-ratemaking', 'Written Premium', 'Earned Premium', 'Unearned Premium'],
    ['exam-5-ratemaking', 'On Level Premium', 'Rate Change', 'On-Leveling'],
    ['exam-5-estimating-claim-liabilities-reserving', 'Age to Age Factor', 'Tail Factor', 'Cumulative Development Factor'],
    ['exam-fm-general-cash-flows-portfolios-and-asset-liability-management', 'Spot Rate', 'Yield Rate', 'Yield Curve'],
    ['exam-fm-bonds', 'Face Value', 'Coupon Rate', 'Coupon'],
    ['exam-mas-ii-introduction-to-credibility', 'Limited Fluctuation Credibility', 'Full Credibility Standard', 'Partial Credibility'],
    ['exam-6c-canadian-financial-reporting-solvency-and-professional-responsibility', 'Liability for Incurred Claims', 'Liability for Remaining Coverage', 'Insurance Contract Liabilities'],
  ])('%s: %s and %s make %s', (id, a, b, made) => {
    const graph = graphs.find(([t]) => t.id === id)?.[1]
    expect(graph, id).toBeDefined()
    expect(madeBy(graph!, a, b)).toContain(made)
  })

  it('never makes a topic’s foundation from a passing mention', () => {
    // Frequency and severity are what statistics is *used* to model, not what it is.
    const statistics = graphs.find(([t]) => t.id === 'exam-mas-i-statistics')![1]
    expect(madeBy(statistics, 'Frequency', 'Severity')).not.toContain('Statistics')
    const ratemaking = graphs.find(([t]) => t.id === 'exam-5-ratemaking')![1]
    for (const list of ratemaking.makes.values()) expect(list.map(r => r.makes)).not.toContain('Ratemaking')
  })

  it('never cuts a formula in half when it quotes a page', () => {
    // A line whose dollars pair up must give sentences whose dollars pair up.
    // (A line with a stray one — "valuations ($000s)" — reads the same in the
    // quote as on the page, and is the page's to fix.)
    const balanced = (text: string) => (text.replace(/\\\$/g, '').split('$').length - 1) % 2 === 0
    for (const topic of topics) {
      for (const name of topic.concepts) {
        const page = pages.get(name.toLowerCase())
        if (!page) continue
        const clean = page.markdown.split('\n').filter(balanced).join('\n')
        for (const m of pageMentions(name, clean, topic.concepts)) {
          expect(balanced(m.text), `${topic.id}: ${m.from} → ${m.to}: ${m.text}`).toBe(true)
        }
      }
    }
  })
})
