import { describe, expect, it } from 'vitest'
import { groupSections } from './articleSections'

const el = (tagName: string, text = '') => ({ type: 'element', tagName, children: [{ type: 'text', value: text }] })

describe('groupSections', () => {
  it('wraps each h2 and what follows it up to the next h2', () => {
    const tree = { type: 'root', children: [el('p', 'lead'), el('h2', 'A'), el('p', 'a'), el('h3', 'a1'), el('h2', 'B'), el('p', 'b')] }
    const out = groupSections(tree)
    expect(out.children.map(c => c.tagName)).toEqual(['p', 'section', 'section'])
    const [, a, b] = out.children as Array<{ children: Array<{ tagName: string }> }>
    expect(a.children.map(c => c.tagName)).toEqual(['h2', 'p', 'h3'])
    expect(b.children.map(c => c.tagName)).toEqual(['h2', 'p'])
  })

  it('leaves a page with no h2 alone', () => {
    const tree = { type: 'root', children: [el('p'), el('h3')] }
    expect(groupSections(tree).children.map(c => c.tagName)).toEqual(['p', 'h3'])
  })

  it('does not reach into nested blocks', () => {
    const quote = { type: 'element', tagName: 'blockquote', children: [el('h2', 'inner')] }
    const tree = { type: 'root', children: [quote, el('p')] }
    expect(groupSections(tree).children).toEqual([quote, el('p')])
  })
})
