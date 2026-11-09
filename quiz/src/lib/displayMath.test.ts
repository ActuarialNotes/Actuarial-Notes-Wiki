import { describe, expect, it } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import { DISPLAY_STYLE, remarkDisplayFormulaBoxes } from './displayMath'

/** Every math span's LaTeX after the plugin, in document order. */
function mathValues(markdown: string): string[] {
  const processor = unified().use(remarkParse).use(remarkMath).use(remarkDisplayFormulaBoxes)
  const tree = processor.runSync(processor.parse(markdown), markdown)
  const found: string[] = []
  const visit = (node: { type: string; value?: string; children?: unknown[] }) => {
    if (node.type === 'inlineMath' || node.type === 'math') found.push(node.value ?? '')
    for (const child of node.children ?? []) visit(child as typeof node)
  }
  visit(tree as never)
  return found
}

describe('remarkDisplayFormulaBoxes', () => {
  it('typesets a one-line formula box in display style', () => {
    const [value] = mathValues('> $$E[X^n] = \\int_{-\\infty}^{\\infty} x^n f(x)\\,dx$$\n')
    expect(value.startsWith(DISPLAY_STYLE)).toBe(true)
  })

  it('does the same for a bare $$…$$ paragraph', () => {
    expect(mathValues('$$\\sum_{i=1}^n x_i$$\n')[0].startsWith(DISPLAY_STYLE)).toBe(true)
  })

  it('leaves math in running text inline', () => {
    const values = mathValues('A premium of $$\\$400$$ and $x$ here.\n')
    expect(values.every(v => !v.startsWith(DISPLAY_STYLE))).toBe(true)
  })

  it('leaves a single-dollar span alone on its line', () => {
    expect(mathValues('$x$\n')[0]).toBe('x')
  })

  it('leaves list items and their answer options alone', () => {
    expect(mathValues('- $$\\frac{1}{2}$$\n')[0]).toBe('\\frac{1}{2}')
  })

  it('does not stack a second \\displaystyle', () => {
    expect(mathValues('> $$\\displaystyle \\int f$$\n')[0]).toBe('\\displaystyle \\int f')
  })

  it('reaches the HTML rehype-katex writes', () => {
    const md = '> $$\\int_0^1 f$$\n'
    const processor = unified().use(remarkParse).use(remarkMath).use(remarkDisplayFormulaBoxes).use(remarkRehype).use(rehypeKatex)
    const html = JSON.stringify(processor.runSync(processor.parse(md), md))
    // KaTeX draws a display-size integral with the large-operator glyph.
    expect(html).toContain('large-op')
    expect(html).not.toContain('katex-display')
  })
})

describe('formula lines inside a paragraph', () => {
  function paragraphKids(markdown: string): string[] {
    const processor = unified().use(remarkParse).use(remarkMath).use(remarkDisplayFormulaBoxes)
    const tree = processor.runSync(processor.parse(markdown), markdown) as unknown as {
      children: { type: string; children: { type: string; children?: { type: string }[] }[] }[]
    }
    const first = tree.children[0]
    const paragraph = first.type === 'blockquote' ? first.children[0] : first
    return (paragraph.children ?? []).map(child => child.type)
  }

  it('puts a formula written under a line of prose on its own line', () => {
    const md = 'The cash flows are the same:\n$$d_1 = d_0 - 1$$\n'
    expect(paragraphKids(md)).toEqual(['text', 'break', 'inlineMath'])
    expect(mathValues(md)[0].startsWith(DISPLAY_STYLE)).toBe(true)
  })

  it('keeps stacked lines of working one per line', () => {
    const md = '> $$AV = 500(1.05)^4$$\n> $$= 607.75$$\n> Done.\n'
    expect(paragraphKids(md)).toEqual(['inlineMath', 'break', 'text', 'inlineMath', 'break', 'text'])
    expect(mathValues(md).every(v => v.startsWith(DISPLAY_STYLE))).toBe(true)
  })

  it('leaves a formula that shares its line with prose inline', () => {
    const md = 'So $$x = 1$$ follows.\n'
    expect(paragraphKids(md)).toEqual(['text', 'inlineMath', 'text'])
    expect(mathValues(md)[0]).toBe('x = 1')
  })
})
