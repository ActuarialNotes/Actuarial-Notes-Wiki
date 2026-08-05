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
    expect(html).toContain('Interactive simulator')
    expect(html).toContain('Open the Normal Distribution simulator')
    // The parameter symbols name the knobs the simulator exposes.
    expect(html).toContain('μ and σ')
  })

  it('previews a discrete distribution as stems rather than a curve', () => {
    const html = render([img('Media/Binomial_distribution_pmf.svg')])
    expect(html).toContain('<line')
    expect(html).toContain('n and p')
  })
})
