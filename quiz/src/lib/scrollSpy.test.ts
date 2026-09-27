import { describe, expect, it } from 'vitest'
import { activeSectionIndex } from './scrollSpy'

const page = { anchor: 80, clientHeight: 600, scrollHeight: 2000 }

describe('activeSectionIndex', () => {
  it('has no current section on a page with none', () => {
    expect(activeSectionIndex({ ...page, tops: [], scrollTop: 0 })).toBe(-1)
  })

  it('is the first section before any has reached the line', () => {
    expect(activeSectionIndex({ ...page, tops: [120, 400, 900], scrollTop: 0 })).toBe(0)
  })

  it('is the last section whose top has passed the line', () => {
    expect(activeSectionIndex({ ...page, tops: [-500, 40, 300], scrollTop: 700 })).toBe(1)
    expect(activeSectionIndex({ ...page, tops: [-500, -200, 80], scrollTop: 900 })).toBe(2)
  })

  it('is the last section once the page is scrolled to its end', () => {
    // The last section is too short to reach the line, but the reader is in it.
    expect(activeSectionIndex({ ...page, tops: [-900, -300, 250], scrollTop: 1400 })).toBe(2)
  })

  it('reads nothing into a page that fits on screen', () => {
    expect(activeSectionIndex({ tops: [0, 120, 240], anchor: 80, scrollTop: 0, clientHeight: 600, scrollHeight: 600 })).toBe(0)
  })
})
