import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MarkdownText } from './MarkdownText'

// The shape that broke: an R model summary in a MAS-II question stem. Its
// columns only line up while the block refuses to wrap, so it has to scroll.
const CONSOLE_OUTPUT = [
  'The model output is given below:',
  '',
  '```',
  '## Fixed effects: height ~ treatment + mass + numseeds',
  '##               Value   Std.Error   DF',
  '## (Intercept)  10.118      0.7067  294',
  '```',
].join('\n')

const INLINE_CODE = 'Group the losses by the `territory` column.'

describe('fenced code blocks', () => {
  const html = renderToStaticMarkup(<MarkdownText>{CONSOLE_OUTPUT}</MarkdownText>)

  it('scrolls sideways rather than spilling out of the card', () => {
    expect(html).toMatch(/<pre[^>]*class="[^"]*overflow-x-auto/)
  })

  it('sits on its own panel', () => {
    // The panel wraps the scroller so the fade mask can dim the columns
    // without eating the border.
    expect(html).toMatch(/<div class="[^"]*bg-muted[^"]*"><pre/)
    expect(html).toMatch(/<div class="[^"]*border-border[^"]*"><pre/)
    expect(html).toMatch(/<div class="[^"]*rounded-lg[^"]*"><pre/)
  })

  it('opts out of prose so the panel is the same on the wiki', () => {
    expect(html).toMatch(/<div class="[^"]*not-prose[^"]*"><pre/)
  })

  it('is reachable from the keyboard, since it is a scroll container', () => {
    expect(html).toMatch(/<pre [^>]*tabindex="0"/)
  })

  it('drops the inline-code chip for the <code> inside the fence', () => {
    // renderToStaticMarkup escapes the `&>` of the `[&>code]:…` variant.
    expect(html).toContain('code]:bg-transparent')
  })

  it('keeps the output verbatim', () => {
    expect(html).toContain('(Intercept)')
    expect(html).toContain('Std.Error')
  })
})

describe('inline code', () => {
  it('renders as a chip in running text', () => {
    const html = renderToStaticMarkup(<MarkdownText>{INLINE_CODE}</MarkdownText>)
    expect(html).toMatch(/<code class="[^"]*bg-muted[^"]*">territory<\/code>/)
  })
})

describe('inline mode', () => {
  // Inline callers (answer options, search rows) wrap markdown in a <span>,
  // where a <pre> would be invalid nesting.
  it('never emits a <pre>', () => {
    const html = renderToStaticMarkup(<MarkdownText inline>{CONSOLE_OUTPUT}</MarkdownText>)
    expect(html).not.toContain('<pre')
    expect(html).toContain('(Intercept)')
  })
})
