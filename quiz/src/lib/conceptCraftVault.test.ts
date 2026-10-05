import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { challengeOrder, craftTopics, topicGraph } from './conceptCraft'
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

  it.each(graphs.map(([t, g]) => [t.id, t, g] as const))('%s connects nearly every concept, and can set a challenge', (_, topic, graph) => {
    const unconnected = topic.concepts.filter(c => !graph.neighbours.has(c.toLowerCase()))
    expect(unconnected.length, unconnected.join(', ')).toBeLessThanOrEqual(Math.ceil(topic.concepts.length / 10))
    expect(graph.connections.length).toBeGreaterThanOrEqual(topic.concepts.length)
    expect(challengeOrder(graph, topic.id, '2026-10-05').length).toBeGreaterThan(0)
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
