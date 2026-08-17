import { describe, it, expect } from 'vitest'
import { orderConceptsForPlan, SUPPORTERS_PER_ROUND, type OrderableConcept } from './studyPlanOrder'
import { keystonesForExam } from './keystone'
import { KEYSTONE_LINKS, type ConceptLinkMap } from '@/data/keystoneLinks'
import { KEYSTONE_EXAMS } from '@/data/keystoneConcepts'

// The catalogue is authored data, so the tests name the exam and read the
// keystones back rather than hard-coding concept names that an edit could move.
const P_KEYSTONES = keystonesForExam('P').map(k => k.name)

function concept(name: string, numericWeight = 10): OrderableConcept & { name: string } {
  return { name, target: name, numericWeight }
}

describe('orderConceptsForPlan — strong_all', () => {
  it('keeps syllabus order, whatever the names are alphabetically', () => {
    const concepts = [concept('Zeta'), concept('Alpha'), concept('Mu')]
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_all', examId: 'P', links: {} })
    expect(ordered.map(c => c.name)).toEqual(['Zeta', 'Alpha', 'Mu'])
  })

  it('ignores topic weight — a light topic taught first is still taught first', () => {
    const concepts = [concept('First', 5), concept('Second', 50)]
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_all', examId: 'P', links: {} })
    expect(ordered.map(c => c.name)).toEqual(['First', 'Second'])
  })

  it('returns a copy, leaving the caller\'s array untouched', () => {
    const concepts = [concept('A'), concept('B')]
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_all', examId: 'P', links: {} })
    expect(ordered).not.toBe(concepts)
    expect(ordered).toEqual(concepts)
  })
})

describe('orderConceptsForPlan — strong_key', () => {
  const [k1, k2] = P_KEYSTONES

  it('introduces a keystone then the concepts its own page links to', () => {
    const concepts = [
      concept('Unrelated One'),
      concept('Supporter A'),
      concept(k1),
      concept('Supporter B'),
    ]
    const links: ConceptLinkMap = { [k1]: ['Supporter A', 'Supporter B'] }
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key', examId: 'P', links })
    expect(ordered.map(c => c.name)).toEqual([k1, 'Supporter A', 'Supporter B', 'Unrelated One'])
  })

  it('follows the page\'s link order, not the syllabus order, inside a group', () => {
    const concepts = [concept(k1), concept('Second Link'), concept('First Link')]
    const links: ConceptLinkMap = { [k1]: ['First Link', 'Second Link'] }
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key', examId: 'P', links })
    expect(ordered.map(c => c.name)).toEqual([k1, 'First Link', 'Second Link'])
  })

  it('ignores links that land off the syllabus', () => {
    const concepts = [concept(k1), concept('On Syllabus')]
    const links: ConceptLinkMap = { [k1]: ['Not On This Exam', 'On Syllabus'] }
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key', examId: 'P', links })
    expect(ordered.map(c => c.name)).toEqual([k1, 'On Syllabus'])
  })

  it('interleaves the groups so every keystone is introduced in the first round', () => {
    const deepSupporters = Array.from({ length: SUPPORTERS_PER_ROUND + 2 }, (_, i) => `Deep ${i + 1}`)
    const concepts = [concept(k1), ...deepSupporters.map(n => concept(n)), concept(k2), concept('Later Support')]
    const links: ConceptLinkMap = { [k1]: deepSupporters, [k2]: ['Later Support'] }
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key', examId: 'P', links }).map(c => c.name)

    // Round 0: k1 + its first chunk, then k2 + its chunk. The overflow waits.
    expect(ordered.slice(0, SUPPORTERS_PER_ROUND + 1)).toEqual([k1, ...deepSupporters.slice(0, SUPPORTERS_PER_ROUND)])
    expect(ordered[SUPPORTERS_PER_ROUND + 1]).toBe(k2)
    expect(ordered.indexOf(k2)).toBeLessThan(ordered.indexOf(deepSupporters[SUPPORTERS_PER_ROUND]))
  })

  it('gives a keystone its own turn rather than burying it as another\'s supporter', () => {
    const concepts = [concept('Filler'), concept(k2), concept(k1)]
    // k1's page links to k2 — k2 leads its own group rather than trailing k1's.
    const links: ConceptLinkMap = { [k1]: [k2, 'Filler'] }
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key', examId: 'P', links }).map(c => c.name)
    expect(ordered).toEqual([k1, 'Filler', k2])
  })

  it('introduces a shared supporter once, under the first keystone that needs it', () => {
    const concepts = [concept(k1), concept(k2), concept('Shared')]
    const links: ConceptLinkMap = { [k1]: ['Shared'], [k2]: ['Shared'] }
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key', examId: 'P', links }).map(c => c.name)
    expect(ordered).toEqual([k1, 'Shared', k2])
  })

  it('resolves an aliased syllabus link by its target', () => {
    const concepts = [{ name: 'Alias', target: k1, numericWeight: 10 }, concept('Supporter')]
    const links: ConceptLinkMap = { [k1]: ['Supporter'] }
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key', examId: 'P', links })
    expect(ordered.map(c => c.name)).toEqual(['Alias', 'Supporter'])
  })

  it('orders whatever no keystone reached by topic weight, then syllabus order', () => {
    const concepts = [concept('Light', 5), concept('Heavy A', 50), concept('Heavy B', 50)]
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key', examId: 'P', links: {} })
    expect(ordered.map(c => c.name)).toEqual(['Heavy A', 'Heavy B', 'Light'])
  })

  it('falls back to weight alone for an exam with no keystone catalogue', () => {
    const concepts = [concept('Light', 5), concept('Heavy', 50)]
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key', examId: 'CAS-9', links: {} })
    expect(ordered.map(c => c.name)).toEqual(['Heavy', 'Light'])
  })

  it('returns every concept exactly once', () => {
    const concepts = [
      concept(k1), concept(k2), concept('S1'), concept('S2'), concept('S3'),
      concept('S4'), concept('Tail 1'), concept('Tail 2'),
    ]
    const links: ConceptLinkMap = { [k1]: ['S1', 'S2', 'S3', 'S4'], [k2]: ['S2', 'Tail 1'] }
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key', examId: 'P', links })
    expect(ordered).toHaveLength(concepts.length)
    expect(new Set(ordered.map(c => c.name)).size).toBe(concepts.length)
  })

  it('matches link map keys case-insensitively', () => {
    const concepts = [concept(k1), concept('Supporter')]
    const links: ConceptLinkMap = { [k1.toUpperCase()]: ['supporter'] }
    const ordered = orderConceptsForPlan(concepts, { strategy: 'strong_key', examId: 'P', links })
    expect(ordered.map(c => c.name)).toEqual([k1, 'Supporter'])
  })
})

// The map the app actually ships, built from Concepts/*.md by vite.config.ts.
describe('KEYSTONE_LINKS', () => {
  const keystones = KEYSTONE_EXAMS.flatMap(e => e.concepts.map(c => c.name))

  it('has an entry for every keystone page', () => {
    for (const name of keystones) {
      expect(KEYSTONE_LINKS[name], `no link entry for keystone "${name}"`).toBeDefined()
    }
  })

  it('gives most keystones something to lead into', () => {
    const withLinks = keystones.filter(n => (KEYSTONE_LINKS[n] ?? []).length > 0)
    expect(withLinks.length).toBeGreaterThan(keystones.length / 2)
  })

  it('links only to other concept pages, never to itself', () => {
    for (const [page, targets] of Object.entries(KEYSTONE_LINKS)) {
      expect(targets).not.toContain(page)
      expect(new Set(targets).size).toBe(targets.length)
      for (const target of targets) expect(target).not.toMatch(/\.(svg|png|jpe?g)$/i)
    }
  })
})
