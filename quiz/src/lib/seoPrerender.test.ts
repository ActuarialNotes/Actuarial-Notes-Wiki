import { describe, it, expect } from 'vitest'
import { conceptSeo, headTagsHtml, pageHead } from './seo'
import { markdownToHtml, renderStaticPage, staticBody, staticMarkdown } from './seoPrerender'

const known = new Map([
  ['/wiki/concept/tail+factor', '/wiki/concept/Tail+Factor'],
  ['/wiki/exam/exam+5+(cas)', '/wiki/exam/Exam+5+(CAS)'],
])
const resolve = (route: string) => known.get(route.toLowerCase())

describe('staticMarkdown', () => {
  it('links a wiki link to the canonical path of a page that exists, and leaves the rest as text', () => {
    expect(staticMarkdown('Chain with a [[tail factor|tail]] and a [[Missing Page]].', resolve))
      .toBe('Chain with a [tail](/wiki/concept/Tail+Factor) and a Missing Page.')
  })

  it("turns a callout's header into a bold line, keeping a learning objective's weight", () => {
    expect(staticMarkdown('> [!example]- Ratemaking {60–70%}\n> Body', resolve)).toBe('> **Ratemaking (60–70%)**\n> Body')
    expect(staticMarkdown('> [!example]- Worked Example {Example}\n> > [!answer]-\n> > 42', resolve))
      .toBe('> **Worked Example**\n> > **Answer**\n> > 42')
  })

  it('drops front matter, embeds, comments and inline footnotes', () => {
    expect(staticMarkdown('---\na: 1\n---\nText.^[a note] ![[Figure.svg|340]] %%hidden%%', resolve)).toBe('Text.  ')
  })
})

describe('markdownToHtml', () => {
  it('writes an article with only the tags and attributes it needs', () => {
    const html = markdownToHtml('## Head\n\nSee [x](/wiki/concept/X "t") and $E[X]$.\n\n- [ ] task\n\n![img](a.png)')
    expect(html).toContain('<h2>Head</h2>')
    expect(html).toContain('<a href="/wiki/concept/X" title="t">x</a>')
    expect(html).toContain('<code class="language-math math-inline">E[X]</code>')
    expect(html).not.toContain('<input')
    expect(html).not.toContain('<img')
  })

  it('escapes text and drops raw HTML', () => {
    const html = markdownToHtml('a < b & c\n\n<div onclick="x()">raw</div>')
    expect(html).toContain('a &lt; b &amp; c')
    expect(html).not.toContain('onclick')
  })
})

describe('staticBody', () => {
  const page = conceptSeo({
    name: 'Chain Ladder Method',
    markdown: '**Chain Ladder Method** projects each cohort to ultimate.',
    exams: [{ name: 'Exam 5', path: '/wiki/exam/Exam+5+(CAS)' }],
  })

  it('gives a concept its heading, breadcrumb and study-guide link', () => {
    const html = staticBody({ page, markdown: '**Chain Ladder Method** projects each cohort to ultimate.', resolve })
    expect(html.startsWith('<div id="prerender">')).toBe(true)
    expect(html).toContain('<a href="/wiki">Study Guides</a> › <a href="/wiki/exam/Exam+5+(CAS)">Exam 5</a> › <span>Chain Ladder Method</span>')
    expect(html).toContain('<h1>Chain Ladder Method</h1>')
    expect(html).toContain('Study guide: <a href="/wiki/exam/Exam+5+(CAS)">Exam 5</a>')
  })

  it('does not add a second heading to a page that has its own', () => {
    const html = staticBody({ page, markdown: '# Chain Ladder Method\nBody.', resolve })
    expect(html.match(/<h1>/g)).toHaveLength(1)
  })
})

describe('renderStaticPage', () => {
  const template = '<head>\n    <!-- page-head -->\n    <title>Site</title>\n    <!-- /page-head -->\n</head><body><div id="root"></div></body>'
  const head = pageHead(conceptSeo({ name: 'Chain Ladder Method', markdown: 'Body text that is long enough.', exams: [] }))

  it("swaps in the page's head and fills #root", () => {
    const html = renderStaticPage(template, head, '<div id="prerender">x</div>')
    expect(html).toContain(headTagsHtml(head))
    expect(html).not.toContain('<title>Site</title>')
    expect(html).toContain('<div id="root"><div id="prerender">x</div></div>')
  })

  it('refuses a template that has lost its markers', () => {
    expect(() => renderStaticPage('<head></head><div id="root"></div>', head, '')).toThrow(/page-head/)
    expect(() => renderStaticPage(template.replace('<div id="root"></div>', ''), head, '')).toThrow(/root/)
  })
})
