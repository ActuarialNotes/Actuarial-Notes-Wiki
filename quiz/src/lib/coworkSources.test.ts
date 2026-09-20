import { describe, it, expect } from 'vitest'
import {
  EMPTY_LIBRARY,
  addEntity,
  addResource,
  formatPublished,
  groupSources,
  hasEntity,
  hasResource,
  libraryEntities,
  libraryResources,
  removeEntity,
  removeResource,
  resourceEntryRef,
  sortResourcesByDate,
  type SourceEntity,
  type SourceResource,
} from './coworkSources'

const OSFI: SourceEntity = {
  id: 'osfi',
  name: 'Office of the Superintendent of Financial Institutions',
  short: 'OSFI',
  category: 'regulator',
  jurisdiction: 'Canada (federal)',
  about: 'Prudential supervisor of federally regulated insurers.',
  practiceAreas: ['pc', 'life'],
}

const CU: SourceEntity = {
  id: 'cu',
  name: 'Canadian Underwriter',
  short: 'CU',
  category: 'media',
  jurisdiction: 'Canada',
  about: 'The Canadian P&C trade paper.',
  practiceAreas: ['pc'],
}

function resource(over: Partial<SourceResource> & Pick<SourceResource, 'id' | 'entityId'>): SourceResource {
  return {
    title: 'A document',
    kind: 'guideline',
    published: '2024',
    summary: 'Something.',
    practiceAreas: ['pc'],
    functions: ['capital'],
    ...over,
  }
}

const MCT = resource({
  id: 'mct',
  entityId: 'osfi',
  title: 'Minimum Capital Test (MCT) guideline',
  summary: 'The risk-based capital test.',
  published: '2024',
  wikiRef: { kind: 'resource', name: 'OSFI MCT' },
})
const ORSA = resource({ id: 'orsa', entityId: 'osfi', title: 'ORSA guideline', published: null })
const NEWS = resource({
  id: 'news',
  entityId: 'cu',
  title: 'Auto reform coverage',
  kind: 'news',
  published: '2025-03-01',
  docPath: 'Cowork/Sources/cu/auto.md',
  sample: true,
})

const ENTITIES = [OSFI, CU]
const RESOURCES = [MCT, ORSA, NEWS]

describe('resourceEntryRef', () => {
  it('opens a vault-backed resource as its wiki page', () => {
    expect(resourceEntryRef(MCT)).toEqual({ kind: 'resource', name: 'OSFI MCT' })
  })

  it('opens a Cowork document at its virtual vault path', () => {
    expect(resourceEntryRef(NEWS)).toEqual({
      kind: 'resource',
      name: 'Auto reform coverage',
      path: 'Cowork/Sources/cu/auto.md',
    })
  })

  it('returns null for a resource with nothing to open', () => {
    expect(resourceEntryRef(resource({ id: 'x', entityId: 'osfi' }))).toBeNull()
  })
})

describe('sortResourcesByDate', () => {
  it('puts the newest first and the undated last', () => {
    const sorted = sortResourcesByDate([ORSA, MCT, NEWS])
    expect(sorted.map(r => r.id)).toEqual(['news', 'mct', 'orsa'])
  })

  it('sorts a bare year behind a dated document in the same year', () => {
    const bare = resource({ id: 'bare', entityId: 'osfi', published: '2025' })
    const dated = resource({ id: 'dated', entityId: 'osfi', published: '2025-06-01' })
    expect(sortResourcesByDate([bare, dated]).map(r => r.id)).toEqual(['dated', 'bare'])
  })

  it('does not mutate its input', () => {
    const input = [ORSA, MCT]
    sortResourcesByDate(input)
    expect(input.map(r => r.id)).toEqual(['orsa', 'mct'])
  })
})

describe('formatPublished', () => {
  it('says so when a document is undated, rather than guessing', () => {
    expect(formatPublished(null)).toBe('Undated')
  })

  it('leaves a bare year as the year', () => {
    expect(formatPublished('2024')).toBe('2024')
  })

  it('renders a full date readably', () => {
    expect(formatPublished('2025-06-17')).toMatch(/2025/)
    expect(formatPublished('2025-06-17')).toMatch(/17/)
  })
})

describe('groupSources', () => {
  it('lists every entity with its whole catalogue when nothing is filtered', () => {
    const groups = groupSources(ENTITIES, RESOURCES)
    expect(groups.map(g => g.entity.id)).toEqual(['osfi', 'cu'])
    expect(groups[0].resources).toHaveLength(2)
    expect(groups[0].total).toBe(2)
  })

  it('keeps an entity whose own name matches, with all its resources', () => {
    const groups = groupSources(ENTITIES, RESOURCES, { query: 'superintendent' })
    expect(groups.map(g => g.entity.id)).toEqual(['osfi'])
    expect(groups[0].resources).toHaveLength(2)
  })

  it('surfaces the publisher of a matching document, with just that document', () => {
    const groups = groupSources(ENTITIES, RESOURCES, { query: 'capital test' })
    expect(groups).toHaveLength(1)
    expect(groups[0].entity.id).toBe('osfi')
    expect(groups[0].resources.map(r => r.id)).toEqual(['mct'])
    // The group still reports the catalogue it came from, so the row can say
    // what the filter is hiding.
    expect(groups[0].total).toBe(2)
  })

  it('requires every term of a multi-word query to appear somewhere', () => {
    expect(groupSources(ENTITIES, RESOURCES, { query: 'capital reform' })).toHaveLength(0)
  })

  it('filters by category', () => {
    const groups = groupSources(ENTITIES, RESOURCES, { categories: ['media'] })
    expect(groups.map(g => g.entity.id)).toEqual(['cu'])
  })

  it('filters by document kind, dropping an entity with none of that kind', () => {
    const groups = groupSources(ENTITIES, RESOURCES, { kinds: ['news'] })
    expect(groups).toHaveLength(1)
    expect(groups[0].resources.map(r => r.id)).toEqual(['news'])
  })

  it('does not let an entity match a kind filter on its own account', () => {
    // OSFI publishes no news, so a news filter must not surface it empty.
    const groups = groupSources(ENTITIES, RESOURCES, { kinds: ['news'], query: 'osfi' })
    expect(groups).toHaveLength(0)
  })
})

describe('library', () => {
  it('starts empty', () => {
    expect(EMPTY_LIBRARY.entityIds).toHaveLength(0)
    expect(EMPTY_LIBRARY.resourceIds).toHaveLength(0)
  })

  it('adds a publisher on its own', () => {
    const next = addEntity(EMPTY_LIBRARY, 'osfi')
    expect(hasEntity(next, 'osfi')).toBe(true)
    expect(next.resourceIds).toHaveLength(0)
  })

  it('is idempotent — adding twice does not duplicate', () => {
    const next = addEntity(addEntity(EMPTY_LIBRARY, 'osfi'), 'osfi')
    expect(next.entityIds).toEqual(['osfi'])
  })

  it('adding a document follows its publisher too', () => {
    const next = addResource(EMPTY_LIBRARY, MCT)
    expect(hasResource(next, 'mct')).toBe(true)
    expect(hasEntity(next, 'osfi')).toBe(true)
  })

  it('dropping a document leaves the publisher followed', () => {
    const next = removeResource(addResource(EMPTY_LIBRARY, MCT), 'mct')
    expect(hasResource(next, 'mct')).toBe(false)
    expect(hasEntity(next, 'osfi')).toBe(true)
  })

  it('dropping a publisher drops the documents taken from it', () => {
    let state = addResource(EMPTY_LIBRARY, MCT)
    state = addResource(state, NEWS)
    const next = removeEntity(state, 'osfi', RESOURCES)
    expect(hasEntity(next, 'osfi')).toBe(false)
    expect(hasResource(next, 'mct')).toBe(false)
    // …and leaves another publisher's documents alone.
    expect(hasResource(next, 'news')).toBe(true)
  })

  it('never mutates the state handed to it', () => {
    const before = addEntity(EMPTY_LIBRARY, 'osfi')
    addResource(before, NEWS)
    expect(before.entityIds).toEqual(['osfi'])
    expect(before.resourceIds).toEqual([])
  })

  it('reads back the library in catalogue order', () => {
    let state = addResource(EMPTY_LIBRARY, NEWS)
    state = addResource(state, MCT)
    expect(libraryResources(state, RESOURCES).map(r => r.id)).toEqual(['mct', 'news'])
    expect(libraryEntities(state, ENTITIES).map(e => e.id)).toEqual(['osfi', 'cu'])
  })
})
