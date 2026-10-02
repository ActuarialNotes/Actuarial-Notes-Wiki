import { describe, expect, it } from 'vitest'
import {
  arrivalScroll,
  emptyScrollMemory,
  loadScrollMemory,
  rememberScroll,
  RESTORE_SCROLL,
  saveScrollMemory,
} from './routeScrollMemory'

const home = { key: 'a1', pathname: '/wiki', hash: '', state: null }
const exam = { key: 'b2', pathname: '/wiki/exam/exam-9', hash: '', state: null }

describe('arrivalScroll', () => {
  it('returns Back to where the entry was left', () => {
    const memory = rememberScroll(emptyScrollMemory(), home, 1840)
    expect(arrivalScroll(memory, exam, home, 'POP')).toBe(1840)
  })

  it('opens a Back to an unrecorded entry at the top', () => {
    expect(arrivalScroll(emptyScrollMemory(), exam, home, 'POP')).toBe(0)
  })

  it('opens a new page at its top, even one left scrolled before', () => {
    const memory = rememberScroll(emptyScrollMemory(), home, 1840)
    expect(arrivalScroll(memory, exam, { ...home, key: 'c3' }, 'PUSH')).toBe(0)
  })

  it('brings an up-link back to where the page was last left', () => {
    const memory = rememberScroll(emptyScrollMemory(), home, 1840)
    expect(arrivalScroll(memory, exam, { ...home, key: 'c3', state: RESTORE_SCROLL }, 'PUSH')).toBe(1840)
    expect(arrivalScroll(emptyScrollMemory(), exam, { ...home, key: 'c3', state: RESTORE_SCROLL }, 'PUSH')).toBe(0)
  })

  it('leaves the window alone on the same page, a hash or a redirect', () => {
    const memory = rememberScroll(emptyScrollMemory(), home, 500)
    expect(arrivalScroll(memory, home, { ...home, key: 'd4' }, 'PUSH')).toBeNull()
    expect(arrivalScroll(memory, home, { ...home, key: 'd4' }, 'POP')).toBeNull()
    expect(arrivalScroll(memory, home, { ...exam, hash: '#scoring' }, 'PUSH')).toBeNull()
    expect(arrivalScroll(memory, home, exam, 'REPLACE')).toBeNull()
  })

  it('restores a reload of the same entry, and nothing else on a first render', () => {
    const memory = rememberScroll(emptyScrollMemory(), { key: 'default', pathname: '/wiki' }, 900)
    expect(arrivalScroll(memory, null, { ...home, key: 'default' }, 'POP')).toBe(900)
    // A different URL typed into the same tab is keyed `default` too.
    expect(arrivalScroll(memory, null, { ...exam, key: 'default' }, 'POP')).toBeNull()
  })
})

describe('storage', () => {
  it('round-trips and drops junk', () => {
    const store = new Map<string, string>()
    const storage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => { store.set(k, v) } }
    const memory = rememberScroll(emptyScrollMemory(), home, 321.6)
    saveScrollMemory(storage, memory)
    expect(loadScrollMemory(storage)).toEqual(memory)
    expect(loadScrollMemory(storage).byKey['a1 /wiki']).toBe(322)

    store.set('route-scroll-memory', JSON.stringify({ byKey: { x: 'nope', y: -4, z: 10 }, byPath: null }))
    expect(loadScrollMemory(storage)).toEqual({ byKey: { z: 10 }, byPath: {} })
    store.set('route-scroll-memory', '{not json')
    expect(loadScrollMemory(storage)).toEqual(emptyScrollMemory())
    expect(loadScrollMemory(undefined)).toEqual(emptyScrollMemory())
  })

  it('keeps only the most recently left entries', () => {
    let memory = emptyScrollMemory()
    for (let i = 0; i < 150; i++) memory = rememberScroll(memory, { key: `k${i}`, pathname: `/p${i}` }, i)
    expect(Object.keys(memory.byKey)).toHaveLength(100)
    expect(memory.byKey['k149 /p149']).toBe(149)
    expect(memory.byKey['k0 /p0']).toBeUndefined()
  })
})
