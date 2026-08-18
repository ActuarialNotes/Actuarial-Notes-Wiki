import { describe, it, expect } from 'vitest'
import { isZoomableSrc, toFocusImage, toFocusImages } from './imageFocus'

describe('isZoomableSrc', () => {
  it('accepts a real source', () => {
    expect(isZoomableSrc('https://example.com/diagram.png')).toBe(true)
  })

  it('rejects an image with nothing behind it', () => {
    // react-markdown hands `undefined` through for `![alt]()`.
    expect(isZoomableSrc(undefined)).toBe(false)
    expect(isZoomableSrc(null)).toBe(false)
    expect(isZoomableSrc('')).toBe(false)
    expect(isZoomableSrc('   ')).toBe(false)
  })
})

describe('toFocusImage', () => {
  it('captions from the markdown title, not the alt text', () => {
    // The question bank writes long screen-reader descriptions into `alt` —
    // printing one under the picture would bury it.
    expect(toFocusImage({
      src: 'https://example.com/plots.png',
      alt: 'Three plots side by side: Plot I Score Function U is a decreasing curve…',
      title: 'MLE diagnostics',
    })).toEqual({
      src: 'https://example.com/plots.png',
      alt: 'Three plots side by side: Plot I Score Function U is a decreasing curve…',
      caption: 'MLE diagnostics',
    })
  })

  it('leaves the caption empty when the markdown gives none', () => {
    expect(toFocusImage({ src: 'a.png', alt: 'A' }).caption).toBe('')
    expect(toFocusImage({ src: 'a.png', alt: 'A', title: '  ' }).caption).toBe('')
  })

  it('survives an image with no alt text', () => {
    expect(toFocusImage({ src: 'a.png' })).toEqual({ src: 'a.png', alt: '', caption: '' })
  })
})

describe('toFocusImages', () => {
  it('keeps the figures in reading order', () => {
    const images = toFocusImages([
      { src: 'one.png', alt: 'One' },
      { src: 'two.png', alt: 'Two' },
    ])
    expect(images.map(i => i.src)).toEqual(['one.png', 'two.png'])
  })

  it('drops entries with nothing to show, so the strip has no dead frames', () => {
    const images = toFocusImages([
      { src: 'one.png', alt: 'One' },
      { src: '', alt: 'Broken' },
      { src: 'two.png', alt: 'Two' },
    ])
    expect(images.map(i => i.src)).toEqual(['one.png', 'two.png'])
  })
})
