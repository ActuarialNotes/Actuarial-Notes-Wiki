import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ConceptImageBanner, type BannerImage } from './ConceptImageBanner'

const RAW = 'https://raw.githubusercontent.com/Owner/Repo/main'

function img(src: string, caption = ''): BannerImage {
  return { src: `${RAW}/${src}`, alt: 'figure', caption }
}

function render(images: BannerImage[]): string {
  return renderToStaticMarkup(<ConceptImageBanner images={images} onOpen={() => {}} />)
}

describe('ConceptImageBanner', () => {
  it('renders nothing when the concept has no figures', () => {
    expect(render([])).toBe('')
  })

  it('shows the first figure as a picture', () => {
    const html = render([img('Media/Figures/Real_Rate_of_Interest.svg')])
    expect(html).toContain(`${RAW}/Media/Figures/Real_Rate_of_Interest.svg`)
    expect(html).toContain('full screen')
  })

  it('shows only the first of several figures, with prev/next beneath', () => {
    const html = render([
      img('Media/Figures/One.svg'),
      img('Media/Figures/Two.svg'),
      img('Media/Figures/Three.svg'),
    ])
    expect(html).toContain('Media/Figures/One.svg')
    expect(html).not.toContain('Media/Figures/Two.svg')
    expect(html).toContain('Next figure')
    expect(html).toContain('1 / 3')
  })

  it('leaves prev/next off a single figure', () => {
    const html = render([img('Media/Figures/One.svg')])
    expect(html).not.toContain('Next figure')
  })

  it('renders a figure caption', () => {
    const html = render([img('Media/Figures/One.svg', 'Real rate after inflation')])
    expect(html).toContain('Real rate after inflation')
  })

  it('swaps a distribution illustration for a card that opens the simulator', () => {
    const html = render([img('Media/Normal_distribution_pdf.svg')])
    // The picture itself is never shown — the static SVG is a snapshot of the
    // live thing behind the card.
    expect(html).not.toContain('<img')
    expect(html).toContain('Open the Normal Distribution simulator')
    // The distribution's name is the card's whole label — no "Interactive
    // simulator" heading, and no sub-line naming the parameters.
    expect(html).toContain('Normal Distribution')
    expect(html).not.toContain('Interactive simulator')
    expect(html).not.toContain('then sample')
  })

  it('gives the simulator card the flashcard foil border', () => {
    const html = render([img('Media/Normal_distribution_pdf.svg')])
    expect(html).toContain('simulator-foil-ring')
    // The foil ring *is* the card's edge; a hairline underneath would double it.
    expect(html).not.toContain('border-border')
  })

  it('offers a collapse control on a picture', () => {
    const html = render([img('Media/Figures/One.svg')])
    expect(html).toContain('Hide figure')
  })

  it('names the whole set on the collapse control when there are several', () => {
    const html = render([img('Media/Figures/One.svg'), img('Media/Figures/Two.svg')])
    expect(html).toContain('Hide 2 figures')
  })

  it('shows the concept figure beneath the simulator card', () => {
    const html = render([
      img('Media/Poisson_pmf.svg'),
      img('Media/Figures/Poisson_Distribution.svg'),
    ])
    // The card leads, but it no longer stands in for the concept's figure —
    // the generated picture renders under it, as on every other concept.
    expect(html).toContain('Open the Poisson Distribution simulator')
    expect(html).toContain(`${RAW}/Media/Figures/Poisson_Distribution.svg`)
    // The illustration itself is still never drawn: it is the simulator.
    expect(html).not.toContain(`${RAW}/Media/Poisson_pmf.svg`)
  })

  it('counts only the pictures, not the simulator card, as figures', () => {
    const html = render([
      img('Media/Poisson_pmf.svg'),
      img('Media/Figures/Poisson_Distribution.svg'),
    ])
    expect(html).not.toContain('Next figure')
    expect(html).toContain('Hide figure')
  })

  it('leaves the simulator card uncollapsible', () => {
    const html = render([img('Media/Normal_distribution_pdf.svg')])
    expect(html).not.toContain('Hide figure')
  })

  it('previews a discrete distribution as stems rather than a curve', () => {
    const html = render([img('Media/Binomial_distribution_pmf.svg')])
    expect(html).toContain('<line')
    expect(html).toContain('Binomial Distribution')
    expect(html).not.toContain('n and p')
  })
})
