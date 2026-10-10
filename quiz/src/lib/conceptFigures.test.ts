import { describe, it, expect } from 'vitest'
import { figureLabel, pictureImages } from './conceptFigures'

const RAW = 'https://raw.githubusercontent.com/Owner/Repo/main'
const img = (src: string) => ({ src: `${RAW}/${src}` })

describe('pictureImages', () => {
  it('keeps generated figures and photographs', () => {
    const all = [img('Media/Figures/One.svg'), img('Media/Attachments/photo.png')]
    expect(pictureImages(all)).toEqual(all)
  })

  it('drops a distribution illustration, which is the simulator card', () => {
    const figure = img('Media/Figures/Poisson_Distribution.svg')
    expect(pictureImages([img('Media/Poisson_pmf.svg'), figure])).toEqual([figure])
  })

  it('is empty for a page whose only embed is a distribution illustration', () => {
    expect(pictureImages([img('Media/Normal_distribution_pdf.svg')])).toEqual([])
  })
})

describe('figureLabel', () => {
  it('names one figure and a set of them', () => {
    expect(figureLabel(1)).toBe('figure')
    expect(figureLabel(3)).toBe('3 figures')
  })
})
