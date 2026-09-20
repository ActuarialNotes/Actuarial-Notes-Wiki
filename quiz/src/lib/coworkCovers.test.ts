import { describe, it, expect } from 'vitest'
import { buildCoverLookup, resourceCover } from './coworkCovers'
import type { SourceResource } from './coworkSources'
import type { WikiIndexItem } from './wikiIndex'

const INDEX: WikiIndexItem[] = [
  {
    category: 'document',
    name: 'Basic Ratemaking (Werner - 2016)',
    path: 'Resources/Books/Basic Ratemaking (Werner - 2016).md',
    coverImage: 'https://example.test/werner.svg',
  },
  {
    category: 'document',
    name: 'OSFI MCT',
    path: 'Resources/Regulation/OSFI MCT.md',
  },
]

function resource(over: Partial<SourceResource>): SourceResource {
  return {
    id: 'r',
    entityId: 'e',
    title: 'A document',
    kind: 'guideline',
    published: '2024',
    summary: 'Something.',
    practiceAreas: ['pc'],
    functions: ['capital'],
    ...over,
  }
}

describe('resource covers', () => {
  it('finds the vault cover for a wiki-backed resource, however the name is cased', () => {
    const lookup = buildCoverLookup(INDEX)
    const werner = resource({ wikiRef: { kind: 'resource', name: 'basic ratemaking (werner - 2016)' } })
    expect(resourceCover(lookup, werner)).toBe('https://example.test/werner.svg')
  })

  it('has none for a page that carries no cover, and none is not a guess', () => {
    const lookup = buildCoverLookup(INDEX)
    const mct = resource({ wikiRef: { kind: 'resource', name: 'OSFI MCT' } })
    expect(resourceCover(lookup, mct)).toBeUndefined()
  })

  it("has none for Cowork's own documents — they are not vault pages", () => {
    const lookup = buildCoverLookup(INDEX)
    const sample = resource({ docPath: 'Cowork/Sources/cu/auto.md', sample: true })
    expect(resourceCover(lookup, sample)).toBeUndefined()
  })
})
