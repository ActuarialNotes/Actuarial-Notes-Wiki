import { describe, expect, it } from 'vitest'
import type { Element, Root } from 'hast'
import { findConceptMentions, mentionWalk, rehypeConceptMentions } from './conceptMentions'

const words = (text: string, names: string[]) =>
  findConceptMentions(text, names).map(s => [text.slice(s.start, s.end), s.name])

describe('findConceptMentions', () => {
  it('finds a tagged concept written in the sentence, in any case', () => {
    expect(words('Describe the concept of materiality.', ['Materiality'])).toEqual([['materiality', 'Materiality']])
  })

  it('reads plurals, singulars and hyphens the way the vault writes them', () => {
    expect(words('Two annuities and a loss-ratio.', ['Annuity', 'Loss Ratio'])).toEqual([
      ['annuities', 'Annuity'],
      ['loss-ratio', 'Loss Ratio'],
    ])
    expect(words('Explain the bond.', ['Bonds'])).toEqual([['bond', 'Bonds']])
  })

  it('takes the longer name first and never overlaps', () => {
    expect(words('Use the loss ratio method on the loss ratio.', ['Loss Ratio', 'Loss Ratio Method'])).toEqual([
      ['loss ratio method', 'Loss Ratio Method'],
      ['loss ratio', 'Loss Ratio'],
    ])
  })

  it('matches whole words only', () => {
    expect(words('Immateriality is not materiality.', ['Materiality'])).toEqual([['materiality', 'Materiality']])
  })

  it('marks every mention, in text order', () => {
    expect(words('Materiality: two considerations in the determination of materiality.', ['Materiality'])).toEqual([
      ['Materiality', 'Materiality'],
      ['materiality', 'Materiality'],
    ])
  })

  it('ignores names too short to be anything but noise', () => {
    expect(words('Find mu for the model.', ['Mu'])).toEqual([])
  })
})

function run(tree: Root, names: string[]): Root {
  rehypeConceptMentions(names)()(tree)
  return tree
}

const text = (value: string) => ({ type: 'text' as const, value })
const el = (tagName: string, children: Element['children'], className?: string[]): Element => ({
  type: 'element',
  tagName,
  properties: className ? { className } : {},
  children,
})

describe('rehypeConceptMentions', () => {
  it('wraps a mention in a button carrying the study guide link key', () => {
    const tree = run({ type: 'root', children: [el('p', [text('Describe materiality here.')])] }, ['Materiality'])
    const p = tree.children[0] as Element
    expect(p.children).toHaveLength(3)
    const button = p.children[1] as Element
    expect(button.tagName).toBe('button')
    expect(button.properties).toMatchObject({ dataWikiref: 'concept:materiality', dataConceptMention: 'Materiality' })
    expect((button.children[0] as { value: string }).value).toBe('materiality')
  })

  it('steps around formulas, code and links', () => {
    const tree = run({
      type: 'root',
      children: [
        el('span', [text('materiality')], ['katex']),
        el('code', [text('materiality')]),
        el('a', [text('materiality')]),
      ],
    }, ['Materiality'])
    for (const child of tree.children) {
      expect(((child as Element).children[0] as { type: string }).type).toBe('text')
    }
  })

  it('leaves the tree alone with no names', () => {
    const tree: Root = { type: 'root', children: [el('p', [text('materiality')])] }
    expect(run(tree, [])).toEqual({ type: 'root', children: [el('p', [text('materiality')])] })
  })
})

describe('mentionWalk', () => {
  it('lists each concept once and every mention as an occurrence', () => {
    expect(mentionWalk(['Materiality', 'Standards of Practice', 'materiality'])).toEqual({
      list: [
        { kind: 'concept', name: 'Materiality' },
        { kind: 'concept', name: 'Standards of Practice' },
      ],
      occurrences: [
        { name: 'Materiality', occurrence: 0 },
        { name: 'Standards of Practice', occurrence: 0 },
        { name: 'materiality', occurrence: 1 },
      ],
    })
  })
})
