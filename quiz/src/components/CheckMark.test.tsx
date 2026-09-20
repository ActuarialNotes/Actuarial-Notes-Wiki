import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { CheckMark, CompletionCornerBadge } from './CheckMark'
import { TodayQuizCornerBadge, TodayQuizNavBadge } from './TodayQuizBadge'

describe('CheckMark', () => {
  it('cuts the tick out of the disc rather than painting it on top', () => {
    const html = renderToStaticMarkup(<CheckMark />)
    // The one painted shape is a disc taking its colour from the surface…
    expect(html).toMatch(/<circle[^>]*fill="currentColor"[^>]*mask="url\(#/)
    // …and the tick only ever appears inside the mask, as the black that
    // subtracts it. Nothing paints a tick on top, which is what would stop the
    // void showing whatever the mark is sitting on.
    const mask = html.match(/<mask[\s\S]*?<\/mask>/)?.[0] ?? ''
    expect(mask).toContain('stroke="black"')
    expect(html.replace(mask, '')).not.toContain('<path')
  })

  it('gives every instance its own mask id', () => {
    const html = renderToStaticMarkup(
      <>
        <CheckMark />
        <CheckMark />
      </>,
    )
    const ids = [...html.matchAll(/<mask[^>]*id="([^"]+)"/g)].map(m => m[1])
    expect(ids).toHaveLength(2)
    expect(new Set(ids).size).toBe(2)
  })

  it('is the done green unless a surface says otherwise', () => {
    expect(renderToStaticMarkup(<CheckMark />)).toContain('text-green-500')
    expect(renderToStaticMarkup(<CheckMark className="text-orange-500" />)).toContain('text-orange-500')
  })

  it('is decorative without a label and named with one', () => {
    expect(renderToStaticMarkup(<CheckMark />)).toContain('aria-hidden="true"')
    const named = renderToStaticMarkup(<CheckMark label="Done" />)
    expect(named).toContain('aria-label="Done"')
    expect(named).not.toContain('aria-hidden')
  })
})

describe('CompletionCornerBadge', () => {
  it('rings the disc from the wrapper, so the ring never fills the tick back in', () => {
    const html = renderToStaticMarkup(<CompletionCornerBadge label="Done" />)
    expect(html).toContain('ring-2 ring-background')
    expect(html).not.toContain('bg-green')
  })
})

describe('TodayQuizCornerBadge', () => {
  it('counts down while there is work left', () => {
    const html = renderToStaticMarkup(<TodayQuizCornerBadge count={3} />)
    expect(html).toContain('3')
    expect(html).toContain('bg-orange-500')
  })

  it('renders nothing at zero when the plan was never finished', () => {
    expect(renderToStaticMarkup(<TodayQuizCornerBadge count={0} />)).toBe('')
  })

  it('becomes the checkmark once the plan is complete, whatever the count says', () => {
    const html = renderToStaticMarkup(<TodayQuizCornerBadge count={12} complete />)
    expect(html).not.toContain('bg-orange-500')
    expect(html).toContain('<svg')
    expect(html).toContain('study plan complete')
  })

  it('does the same inline', () => {
    expect(renderToStaticMarkup(<TodayQuizNavBadge count={0} />)).toBe('')
    const html = renderToStaticMarkup(<TodayQuizNavBadge count={0} complete />)
    expect(html).toContain('<svg')
    expect(html).toContain('study plan complete')
  })
})
