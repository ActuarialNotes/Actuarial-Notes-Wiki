import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { calloutComponents } from './calloutComponents'
import { remarkDisplayFormulaBoxes } from '@/lib/displayMath'

const MD = [
  '> [!example]- Time Value of Money {5-15%}',
  '> Understand and be able to perform calculations relating to Present Value.',
].join('\n')

function render(components: Components): string {
  return renderToStaticMarkup(
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {MD}
    </ReactMarkdown>,
  )
}

describe('callout blockquotes', () => {
  it('renders an [!example] callout instead of a plain blockquote', () => {
    const html = render({ ...calloutComponents })
    expect(html).not.toContain('[!example]')
    expect(html).toContain('Time Value of Money')
    expect(html).toContain('data-callout-toggle')
  })

  // WikiArticle overrides `components.p` (to unwrap distribution simulators),
  // which makes react-markdown hand the blockquote a custom component element
  // rather than an intrinsic `<p>`. The header must still be found.
  it('still matches the header when the consumer overrides components.p', () => {
    const html = render({
      ...calloutComponents,
      p({ children }) {
        return <p>{children}</p>
      },
    })
    expect(html).not.toContain('[!example]')
    expect(html).toContain('Time Value of Money')
    expect(html).toContain('data-callout-toggle')
  })
})

describe('note cards', () => {
  function renderMd(md: string): string {
    return renderToStaticMarkup(
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={calloutComponents}>
        {md}
      </ReactMarkdown>,
    )
  }

  it('draws [!idea] as an always-open violet card, even when written foldable', () => {
    const html = renderMd(['> [!idea]- The idea', '> Take what has emerged at face value.'].join('\n'))
    expect(html).not.toContain('[!idea]')
    expect(html).toContain('aria-label="The idea"')
    expect(html).toContain('bg-violet-50')
    expect(html).toContain('Take what has emerged at face value.')
    expect(html).not.toContain('data-callout-toggle')
    expect(html).not.toContain('data-callout-body')
  })

  it('draws [!trap] as an amber card titled by its type when untitled', () => {
    const html = renderMd(['> [!trap]', '> Immediate is not due.'].join('\n'))
    expect(html).toContain('aria-label="Trap"')
    expect(html).toContain('bg-amber-50')
    expect(html).toContain('Immediate is not due.')
  })
})

describe('titles with math, and worked examples', () => {
  function renderMath(md: string): string {
    return renderToStaticMarkup(
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} components={calloutComponents}>
        {md}
      </ReactMarkdown>,
    )
  }

  // The header button holds the whole title line; the body is what follows it.
  function header(html: string): string {
    return html.slice(html.indexOf('data-callout-toggle'), html.indexOf('data-callout-body'))
  }

  it('keeps the whole title line in the header when it holds inline math', () => {
    const html = renderMath(
      [
        '> [!example]- A die is rolled. Let $E$ be "even" and $F$ be "at least 4". What is $E \\cap F$? {Example}',
        '> - $E \\cap F = \\{4, 6\\}$.',
      ].join('\n'),
    )
    const head = header(html)
    expect(head).toContain('What is ')
    expect(head).toContain('be &quot;at least 4&quot;')
    expect(head).not.toContain('{Example}')
    expect(html.slice(html.indexOf('data-callout-body'))).not.toContain('What is')
  })

  it('carries on the body after a title that ends in math', () => {
    const html = renderMath(['> [!example]- What is $P(E)$? {Example}', '> The sample space has 6 outcomes.'].join('\n'))
    expect(header(html)).toContain('?')
    expect(html.slice(html.indexOf('data-callout-body'))).toContain('The sample space has 6 outcomes.')
  })

  it('draws an {Example} callout as a folded green card with an Example pill', () => {
    const html = renderMath(['> [!example]- How many committees of 3 from 8? {Example}', '> - 56.'].join('\n'))
    expect(html).toContain('bg-emerald-50')
    expect(html).toContain('>Example</span>')
    expect(html).toContain('aria-expanded="false"')
    expect(html).toContain('hidden=""')
  })

  it('leaves a learning objective (no {Example} tag) in its own style', () => {
    const html = renderMath(['> [!example]- General Probability {23-30%}', '> Understand probability.'].join('\n'))
    expect(html).not.toContain('bg-emerald-50')
    expect(html).not.toContain('>Example</span>')
  })

  it('keeps math in a note card title', () => {
    const html = renderMath(['> [!trap] $\\le$ or $<$ at a jump', '> Read the inequality.'].join('\n'))
    const title = html.slice(0, html.indexOf('Read the inequality.'))
    expect(title).toContain(' at a jump')
  })

  it('underlines a folding title, but not a worked example, which gets no stray "Example" before its math', () => {
    const md = (src: string) =>
      renderToStaticMarkup(
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} components={calloutComponents}>
          {src}
        </ReactMarkdown>,
      )
    const underlined = /[ "]underline[ "]/
    expect(md('> [!question]- Exam format\n> Three hours.')).toMatch(underlined)
    const example = md('> [!example]- $X$ and $Y$ are each 0 or 1. {Example}\n> Answer.')
    expect(example).not.toMatch(underlined)
    expect(example.match(/Example/g)).toHaveLength(1)
  })
})

describe('a formula under a callout header', () => {
  function renderMd(md: string): string {
    return renderToStaticMarkup(
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath, remarkDisplayFormulaBoxes]} components={calloutComponents}>
        {md}
      </ReactMarkdown>,
    )
  }

  it('opens the body on the formula, not on an empty line', () => {
    const html = renderMd('> [!example]- Find the mean {Example}\n> $$E[X] = \\int_0^1 x\\,dx$$\n')
    expect(html).toContain('Find the mean')
    expect(html).not.toMatch(/<p><br\/?>/)
    expect(html).toContain('\\displaystyle')
  })

  it('keeps the formula out of a title that ends in math', () => {
    const html = renderMd('> [!example]- Find $a$\n> $$a = 1$$\n')
    const title = html.slice(0, html.indexOf('data-callout-body'))
    expect(title).not.toContain('a = 1')
  })
})
