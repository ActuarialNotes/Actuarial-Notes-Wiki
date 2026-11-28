import { describe, expect, it } from 'vitest'
import { isClearColor, isOn, movedPicks } from './pickSlide'

describe('isOn', () => {
  it('reads the values that mean chosen', () => {
    expect(isOn('true')).toBe(true)
    expect(isOn('page')).toBe(true)
    expect(isOn('false')).toBe(false)
    expect(isOn(null)).toBe(false)
    expect(isOn('')).toBe(false)
  })
})

describe('movedPicks', () => {
  it('pairs the one that went off with the one that came on', () => {
    expect(movedPicks([
      { target: 'a', parent: 'tabs', on: false },
      { target: 'b', parent: 'tabs', on: true },
    ])).toEqual([{ from: 'a', to: 'b' }])
  })
  it('keeps each parent to itself', () => {
    expect(movedPicks([
      { target: 'a', parent: 'tabs', on: false },
      { target: 'x', parent: 'rail', on: true },
    ])).toEqual([])
  })
  it('leaves a lone change alone: a checkbox ticked', () => {
    expect(movedPicks([{ target: 'a', parent: 'list', on: true }])).toEqual([])
  })
  it('leaves several changing at once alone', () => {
    expect(movedPicks([
      { target: 'a', parent: 'list', on: false },
      { target: 'b', parent: 'list', on: true },
      { target: 'c', parent: 'list', on: true },
    ])).toEqual([])
  })
  it('takes the last word on an element flipped twice', () => {
    expect(movedPicks([
      { target: 'a', parent: 'tabs', on: true },
      { target: 'a', parent: 'tabs', on: false },
      { target: 'b', parent: 'tabs', on: true },
    ])).toEqual([{ from: 'a', to: 'b' }])
  })
  it('ignores an element with no parent', () => {
    expect(movedPicks([
      { target: 'a', parent: null, on: false },
      { target: 'b', parent: null, on: true },
    ])).toEqual([])
  })
})

describe('isClearColor', () => {
  it('knows a fill from none', () => {
    expect(isClearColor('rgba(0, 0, 0, 0)')).toBe(true)
    expect(isClearColor('transparent')).toBe(true)
    expect(isClearColor('rgb(0 0 0 / 0)')).toBe(true)
    expect(isClearColor('rgb(10, 10, 10)')).toBe(false)
    expect(isClearColor('rgba(10, 10, 10, 0.5)')).toBe(false)
    expect(isClearColor('oklch(0.2 0 0)')).toBe(false)
  })
})
