import { describe, expect, it } from 'vitest'
import { RECENT_MAX, parseRecent, withRecent } from './toolRecent'

describe('recent tools', () => {
  it('puts the latest at the head, once, and keeps a short list', () => {
    let list = withRecent([], { slug: 'a', value: '1', at: 1 })
    list = withRecent(list, { slug: 'b', value: '2', at: 2 })
    list = withRecent(list, { slug: 'a', value: '3', at: 3 })
    expect(list.map(r => `${r.slug}${r.value}`)).toEqual(['a3', 'b2'])
    for (let k = 0; k < 10; k++) list = withRecent(list, { slug: `t${k}`, value: '0', at: k })
    expect(list).toHaveLength(RECENT_MAX)
  })

  it('reads a malformed store as empty, and drops malformed entries', () => {
    expect(parseRecent(null)).toEqual([])
    expect(parseRecent('{')).toEqual([])
    expect(parseRecent('{"a":1}')).toEqual([])
    expect(parseRecent('[{"slug":"a","value":"1","at":1},{"slug":2}]')).toEqual([{ slug: 'a', value: '1', at: 1 }])
  })
})
