import { describe, expect, it } from 'vitest'
import { PAGE_SIZE, nextPageSize, nextShownCount, shownCount } from './paging'

describe('paging', () => {
  it('shows one page of a long list by default', () => {
    expect(shownCount(null, 808)).toBe(PAGE_SIZE)
    expect(shownCount(Number.NaN, 808)).toBe(PAGE_SIZE)
  })

  it('shows a short list whole', () => {
    expect(shownCount(null, 7)).toBe(7)
    expect(nextPageSize(7, 7)).toBe(0)
  })

  it('keeps a stored count, within one page and the list', () => {
    expect(shownCount(72, 808)).toBe(72)
    expect(shownCount(3, 808)).toBe(PAGE_SIZE)
    expect(shownCount(5000, 808)).toBe(808)
  })

  it('adds a page at a time, and the last page is what is left', () => {
    expect(nextShownCount(24, 808)).toBe(48)
    expect(nextPageSize(24, 808)).toBe(PAGE_SIZE)
    expect(nextShownCount(792, 808)).toBe(808)
    expect(nextPageSize(792, 808)).toBe(16)
  })
})
