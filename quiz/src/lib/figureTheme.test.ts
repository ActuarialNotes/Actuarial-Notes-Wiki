import { describe, it, expect } from 'vitest'
import { isThemedFigure, themedFigureSrc } from './figureTheme'

const RAW = 'https://raw.githubusercontent.com/acme/wiki/main'

describe('isThemedFigure', () => {
  it('matches a generated concept figure', () => {
    expect(isThemedFigure(`${RAW}/Media/Figures/Exposure_Base.svg`)).toBe(true)
  })

  it('leaves the rest of the vault alone', () => {
    // A book jacket, a distribution snapshot and a question's own diagram are
    // artwork with their own colours — they carry no second palette to pick.
    expect(isThemedFigure(`${RAW}/Media/Attachments/Werner%20%26%20Modlin%20-%20Cover.svg`)).toBe(false)
    expect(isThemedFigure(`${RAW}/Media/Normal_distribution_pdf.svg`)).toBe(false)
    expect(isThemedFigure(`${RAW}/Media/Attachments/exam-5-q14.png`)).toBe(false)
  })

  it('is not fooled by a figure name appearing mid-path', () => {
    expect(isThemedFigure(`${RAW}/Media/Figures/nested/Thing.svg`)).toBe(false)
    expect(isThemedFigure(`${RAW}/Media/Figures/Thing.svg.png`)).toBe(false)
  })

  it('ignores an existing fragment or query when deciding', () => {
    expect(isThemedFigure(`${RAW}/Media/Figures/Exposure_Base.svg#dark`)).toBe(true)
    expect(isThemedFigure(`${RAW}/Media/Figures/Exposure_Base.svg?token=abc`)).toBe(true)
  })
})

describe('themedFigureSrc', () => {
  it('names the theme on a figure', () => {
    expect(themedFigureSrc(`${RAW}/Media/Figures/Exposure_Base.svg`, 'dark'))
      .toBe(`${RAW}/Media/Figures/Exposure_Base.svg#dark`)
    expect(themedFigureSrc(`${RAW}/Media/Figures/Exposure_Base.svg`, 'light'))
      .toBe(`${RAW}/Media/Figures/Exposure_Base.svg#light`)
  })

  it('replaces rather than stacks, so re-theming is idempotent', () => {
    const once = themedFigureSrc(`${RAW}/Media/Figures/Bayes_Theorem.svg`, 'dark')!
    expect(themedFigureSrc(once, 'light')).toBe(`${RAW}/Media/Figures/Bayes_Theorem.svg#light`)
    expect(themedFigureSrc(once, 'dark')).toBe(once)
  })

  it('passes everything else through untouched', () => {
    const cover = `${RAW}/Media/Attachments/A%20First%20Course%20-%20Cover.svg`
    expect(themedFigureSrc(cover, 'dark')).toBe(cover)
    expect(themedFigureSrc(undefined, 'dark')).toBeUndefined()
    expect(themedFigureSrc('', 'dark')).toBe('')
  })
})
