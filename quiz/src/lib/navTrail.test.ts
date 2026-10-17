import { describe, expect, it } from 'vitest'
import {
  backTarget,
  emptyTrail,
  entryLabel,
  labelEntry,
  loadTrail,
  placeLabel,
  recordArrival,
  saveTrail,
  type NavTrail,
  type TrailAction,
} from './navTrail'

/** Walk a trail through a run of moves, as the router reports them. */
function walk(moves: [number, string, string, TrailAction][], start: NavTrail = emptyTrail()): NavTrail {
  let trail = start
  for (const [index, key, path, action] of moves) trail = recordArrival(trail, index, { key, path }, action)
  return trail
}

describe('recordArrival', () => {
  it('lays a link down at the next index and drops what lay past it', () => {
    const trail = walk([
      [0, 'a', '/dashboard', 'POP'],
      [1, 'b', '/wiki', 'PUSH'],
      [2, 'c', '/wiki/exam/Exam+P-1+(SOA)', 'PUSH'],
      [1, 'b', '/wiki', 'POP'],
      [2, 'd', '/flashcards', 'PUSH'],
    ])
    expect(trail.index).toBe(2)
    expect(trail.entries.map(e => e?.path)).toEqual(['/dashboard', '/wiki', '/flashcards'])
  })

  it('overwrites the entry a redirect replaces, keeping what lies ahead', () => {
    const trail = walk([
      [0, 'a', '/dashboard', 'POP'],
      [1, 'b', '/wiki', 'PUSH'],
      [0, 'a', '/dashboard', 'POP'],
      [0, 'e', '/dashboard?tab=x', 'REPLACE'],
    ])
    expect(trail.entries.map(e => e?.key)).toEqual(['e', 'b'])
  })

  it('keeps a known entry’s name when Back returns to it', () => {
    let trail = walk([[0, 'a', '/', 'POP'], [1, 'b', '/?topic=Exam+P', 'PUSH']])
    trail = labelEntry(trail, 'b', 'Exam P-1 quiz')
    trail = walk([[2, 'c', '/quiz', 'PUSH'], [1, 'b', '/?topic=Exam+P', 'POP']], trail)
    expect(trail.entries[1]?.label).toBe('Exam P-1 quiz')
  })

  it('distrusts everything around an entry it never saw', () => {
    const trail = walk([
      [0, 'a', '/dashboard', 'POP'],
      [1, 'b', '/wiki', 'PUSH'],
      [1, 'zz', '/store', 'POP'],
    ])
    expect(trail.entries).toEqual([null, { key: 'zz', path: '/store' }])
    expect(backTarget(trail)).toBeNull()
  })

  it('starts afresh on a document opened from outside the app', () => {
    const before = walk([[0, 'a', '/dashboard', 'POP'], [1, 'b', '/wiki', 'PUSH']])
    const trail = recordArrival(before, 0, { key: 'default', path: '/store' }, 'POP', true)
    expect(trail.entries).toEqual([{ key: 'default', path: '/store' }])
  })
})

describe('backTarget', () => {
  it('is the page the reader came from', () => {
    const trail = walk([
      [0, 'a', '/dashboard', 'POP'],
      [1, 'b', '/wiki/exam/Exam+P-1+(SOA)', 'PUSH'],
    ])
    expect(backTarget(trail)).toEqual({ delta: -1, entry: { key: 'a', path: '/dashboard' } })
  })

  it('passes over the same page in another state — a popup, a filter', () => {
    const trail = walk([
      [0, 'a', '/search?q=bayes', 'POP'],
      [1, 'b', '/wiki/exam/Exam+P-1+(SOA)', 'PUSH'],
      [2, 'c', '/wiki/exam/Exam+P-1+(SOA)?concept=Bayes', 'PUSH'],
    ])
    expect(backTarget(trail)).toEqual({ delta: -2, entry: { key: 'a', path: '/search?q=bayes' } })
  })

  it('never leads back into the sign-in screens', () => {
    const trail = walk([
      [0, 'a', '/', 'POP'],
      [1, 'b', '/auth', 'PUSH'],
      [2, 'c', '/review', 'PUSH'],
    ])
    expect(backTarget(trail)?.entry.path).toBe('/')
  })

  it('skips what the page rules out', () => {
    const trail = walk([
      [0, 'a', '/craft', 'POP'],
      [1, 'b', '/quiz?selection=stored', 'PUSH'],
      [2, 'c', '/review', 'PUSH'],
    ])
    expect(backTarget(trail, { skip: path => path.startsWith('/quiz') })).toEqual({
      delta: -2,
      entry: { key: 'a', path: '/craft' },
    })
  })

  it('leads only where the page allows, else nowhere', () => {
    const onlyWiki = { only: (path: string) => path.split(/[?#]/)[0] === '/wiki' }
    const fromDashboard = walk([
      [0, 'a', '/dashboard', 'POP'],
      [1, 'b', '/wiki/exam/exam-p-1', 'PUSH'],
    ])
    expect(backTarget(fromDashboard, onlyWiki)).toBeNull()
    const fromList = walk([
      [0, 'a', '/wiki?body=cas', 'POP'],
      [1, 'b', '/wiki/exam/exam-p-1', 'PUSH'],
    ])
    expect(backTarget(fromList, onlyWiki)).toEqual({
      delta: -1,
      entry: { key: 'a', path: '/wiki?body=cas' },
    })
  })

  it('is nothing for a reader who came in from outside, or across a gap', () => {
    expect(backTarget(walk([[0, 'a', '/wiki/resources', 'POP']]))).toBeNull()
    expect(backTarget(walk([[3, 'a', '/wiki/resources', 'POP']]))).toBeNull()
    expect(backTarget(emptyTrail())).toBeNull()
  })
})

describe('placeLabel', () => {
  it('names the app’s places off their paths', () => {
    expect(placeLabel('/')).toBe('Quiz')
    expect(placeLabel('/dashboard')).toBe('Dashboard')
    expect(placeLabel('/wiki/')).toBe('Study Guides')
    expect(placeLabel('/search?q=x')).toBe('Search')
    expect(placeLabel('/store/gems')).toBe('Gem Shop')
    expect(placeLabel('/project/pcpa/p-1?view=report')).toBe('Project')
  })

  it('names a wiki page by its own name', () => {
    expect(placeLabel('/wiki/exam/Exam+P-1+(SOA)?concept=Bayes')).toBe('Exam P-1')
    expect(placeLabel('/wiki/concept/Pure+Premium')).toBe('Pure Premium')
  })

  it('prefers the name a page gave itself', () => {
    expect(entryLabel({ key: 'a', path: '/cowork/sources/osfi', label: 'OSFI' })).toBe('OSFI')
    expect(entryLabel({ key: 'a', path: '/cowork/sources/osfi' })).toBe('Source')
  })
})

describe('storage', () => {
  it('round-trips, and survives junk', () => {
    const store = new Map<string, string>()
    const storage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => { store.set(k, v) } }
    const trail = labelEntry(walk([[0, 'a', '/', 'POP'], [1, 'b', '/wiki', 'PUSH']]), 'b', 'Guides')
    saveTrail(storage, trail)
    expect(loadTrail(storage)).toEqual(trail)

    store.set('nav-trail', '{"entries":[{"key":1},null,{"key":"k","path":"/x"}],"index":-2}')
    expect(loadTrail(storage)).toEqual({ entries: [null, null, { key: 'k', path: '/x' }], index: 0 })
    store.set('nav-trail', 'not json')
    expect(loadTrail(storage)).toEqual(emptyTrail())
  })
})
