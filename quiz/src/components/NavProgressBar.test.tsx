import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { NavProgressBar } from './NavProgressBar'

const noop = () => {}

describe('NavProgressBar rendering', () => {
  it('is a plain readout with no scrub handler', () => {
    const html = renderToStaticMarkup(<NavProgressBar current={3} total={12} label="Card 3 of 12" />)
    expect(html).toContain('role="progressbar"')
    expect(html).not.toContain('role="slider"')
    // Nothing focusable, so a readout stays out of the tab order.
    expect(html).not.toContain('tabindex')
  })

  it('becomes a slider once a surface can be scrubbed', () => {
    const html = renderToStaticMarkup(
      <NavProgressBar current={212} total={423} label="Page 212 of 423" onScrub={noop} />,
    )
    expect(html).toContain('role="slider"')
    expect(html).toContain('tabindex="0"')
    // The range is the sequence itself, not a percentage — a screen reader
    // should say "page 212", not "50%".
    expect(html).toContain('aria-valuemin="1"')
    expect(html).toContain('aria-valuemax="423"')
    expect(html).toContain('aria-valuenow="212"')
    expect(html).toContain('aria-valuetext="212 of 423"')
  })

  it('stays a readout when there is nowhere to drag to', () => {
    const html = renderToStaticMarkup(<NavProgressBar current={1} total={1} onScrub={noop} />)
    expect(html).toContain('role="progressbar"')
    expect(html).not.toContain('role="slider"')
  })

  it('announces the value the bubble would show', () => {
    const html = renderToStaticMarkup(
      <NavProgressBar current={7} total={20} onScrub={noop} formatValue={n => `Page ${n} of 20`} />,
    )
    expect(html).toContain('aria-valuetext="Page 7 of 20"')
  })

  it('fills to the position in both modes', () => {
    const readout = renderToStaticMarkup(<NavProgressBar current={1} total={4} />)
    const slider = renderToStaticMarkup(<NavProgressBar current={1} total={4} onScrub={noop} />)
    expect(readout).toContain('width:25%')
    expect(slider).toContain('width:25%')
  })

  it('recovers from a position outside the sequence', () => {
    const html = renderToStaticMarkup(<NavProgressBar current={99} total={10} onScrub={noop} />)
    expect(html).toContain('aria-valuenow="10"')
  })

  it('cuts the track into the chapters it is given', () => {
    const html = renderToStaticMarkup(
      <NavProgressBar
        current={4}
        total={12}
        onScrub={noop}
        segments={[{ start: 1, label: 'Question 1' }, { start: 7, label: 'Question 2' }]}
      />,
    )
    // Two pieces of track, sized by how many pages each chapter runs for.
    expect(html).toContain('flex-grow:6')
    // The chapter you're in reaches a screen reader with the page.
    expect(html).toContain('aria-valuetext="4 of 12, Question 1"')
  })

  it('fills each chapter by how far into it the position is', () => {
    const html = renderToStaticMarkup(
      <NavProgressBar
        current={9}
        total={12}
        onScrub={noop}
        segments={[{ start: 1, label: 'Question 1' }, { start: 7, label: 'Question 2' }]}
      />,
    )
    // Chapter 1 is behind you and full; chapter 2 is three pages into its six.
    expect(html).toContain('width:100%')
    expect(html).toContain('width:50%')
  })

  it('stays a plain bar when the chapters say nothing', () => {
    // A document whose only bookmark is its first page has no structure to show.
    const html = renderToStaticMarkup(
      <NavProgressBar current={2} total={9} onScrub={noop} segments={[{ start: 1, label: 'All of it' }]} />,
    )
    expect(html).not.toContain('flex-grow')
    expect(html).toContain('aria-valuetext="2 of 9"')
  })

  it('stays silent under the delegated sound listener', () => {
    // Scrubbing is a drag, and a drag that made a cue per step would machine-gun.
    const html = renderToStaticMarkup(<NavProgressBar current={2} total={9} onScrub={noop} />)
    expect(html).toContain('data-sound="none"')
  })
})
