import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ResourceMetaCard } from './ResourceMetaCard'
import { extractImages } from './WikiArticle'
import { parseResourceMeta, preprocessResourceMarkdown } from '@/lib/resourceMeta'

const HOGG = `---
Title: Introduction to Mathematical Statistics
Authors: "Hogg, R.V., McKean, J.W., and Craig, A.T."
Year: "2018"
Edition: 8e
Publisher: Pearson
ISBN: 978-0134686998
---
![[Introduction to Mathematical Statistics (Hogg et al. - 2018) - Cover.svg]]

The statistics reference on the MAS-I syllabus.
`

const ASOP = `---
Title: "ASOP No. 43 — Property/Casualty Unpaid Claim Estimates"
Author: Actuarial Standards Board
Year: "2007"
Publisher: Actuarial Standards Board
Type: Actuarial Standard of Practice
Code: ASOP No. 43
Available from: "[actuarialstandardsboard.org](https://www.actuarialstandardsboard.org/x.pdf)"
---
![[ASOP 43 - Cover.svg]]

The standard governing unpaid claims.
`

function render(raw: string, compact = false): string {
  return renderToStaticMarkup(<ResourceMetaCard meta={parseResourceMeta(raw)} compact={compact} />)
}

describe('ResourceMetaCard', () => {
  // The popup header shows the vault's filename ("… (Hogg et al. - 2018)"), which
  // is not the authored title — the card carries the title on both surfaces.
  it('names the resource on the page and in the popup alike', () => {
    expect(render(HOGG)).toContain('Introduction to Mathematical Statistics')
    expect(render(HOGG, true)).toContain('Introduction to Mathematical Statistics')
  })

  it('prints the author and the bibliographic facts', () => {
    const html = render(HOGG)
    expect(html).toContain('Hogg, R.V., McKean, J.W., and Craig, A.T.')
    expect(html).toContain('8e ed.')
    expect(html).toContain('2018')
    expect(html).toContain('Pearson')
    expect(html).toContain('ISBN 978-0134686998')
  })

  it('leads a standard with its kind and carries its code as a fact', () => {
    const html = render(ASOP)
    expect(html).toContain('Actuarial Standard of Practice')
    expect(html).toContain('ASOP No. 43')
  })

  // A standard names the same body as author and publisher — say it once.
  it('does not repeat the publisher when it is also the author', () => {
    const html = render(ASOP)
    expect(html.match(/Actuarial Standards Board/g)).toHaveLength(1)
  })

  it('offers the source document as a control, not a bare link', () => {
    expect(render(ASOP)).toContain('Read PDF')
    // Nothing to get hold of → no action at all.
    expect(render(HOGG)).not.toContain('Get a copy')
  })
})

describe('a resource cover is not one of the page figures', () => {
  // The jacket is already the card's cover image, so counting it as a figure gave
  // the concept popup a "Show figure" strip that revealed the cover a second time.
  it('leaves a cover-only page with no figures', () => {
    expect(extractImages(HOGG)).toHaveLength(1)
    expect(extractImages(preprocessResourceMarkdown(HOGG))).toEqual([])
  })

  it('still counts the figures a page carries below its cover', () => {
    const withFigure = `${HOGG}\n![[Media/Binomial_distribution_pmf.svg|500]]\n`
    const figures = extractImages(preprocessResourceMarkdown(withFigure))
    expect(figures).toHaveLength(1)
    expect(figures[0].src).toContain('Binomial_distribution_pmf.svg')
  })
})
