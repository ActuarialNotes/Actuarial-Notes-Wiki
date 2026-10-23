import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { calloutComponents } from './calloutComponents'

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
