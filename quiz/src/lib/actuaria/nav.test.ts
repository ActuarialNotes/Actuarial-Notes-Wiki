import { describe, expect, it } from 'vitest'
import { deskPlace, paperMove } from '@/lib/viewTransition'
import { ACTUARIA_TABS, actuariaTabFor, visibleTabs } from './nav'
import { lossTriangleCells, starfield } from './scene'

describe('Actuaria’s tabs', () => {
  it('lists Map, Battle, Daily, Cohort, Hangar — Cohort only once cohorts are live', () => {
    expect(ACTUARIA_TABS.map(t => t.label)).toEqual(['Map', 'Battle', 'Daily', 'Cohort', 'Hangar'])
    expect(visibleTabs(false).map(t => t.id)).toEqual(['map', 'battle', 'daily', 'hangar'])
    expect(visibleTabs(true)).toHaveLength(5)
  })

  it('knows which tab a path is under, sheets included', () => {
    expect(actuariaTabFor('/actuaria/map')).toBe('map')
    expect(actuariaTabFor('/actuaria/sector/CAS-5')).toBe('map')
    expect(actuariaTabFor('/actuaria/battle')).toBe('battle')
    expect(actuariaTabFor('/actuaria/simulation')).toBe('battle')
    expect(actuariaTabFor('/actuaria/raid')).toBe('cohort')
    expect(actuariaTabFor('/actuaria/daily/')).toBe('daily')
    expect(actuariaTabFor('/actuaria')).toBeNull()
  })

  it('lies on the desk in tab order, between Projects and Search, with its own tabs (§5)', () => {
    const places = ACTUARIA_TABS.map(t => deskPlace(t.path).tab)
    expect([...places].sort((a, b) => a - b)).toEqual(places)
    expect(new Set(places).size).toBe(places.length)
    expect(places[0]).toBeGreaterThan(deskPlace('/project').tab)
    expect(places.at(-1)!).toBeLessThan(deskPlace('/search').tab)
    // In-world moves never borrow the Quiz tab's motion — /actuaria/battle is not /battle.
    expect(deskPlace('/actuaria/battle').tab).not.toBe(deskPlace('/battle').tab)
    expect(deskPlace('/actuaria')).toEqual(deskPlace('/actuaria/map'))
  })

  it('lays a sector over the map and slides between in-world tabs', () => {
    expect(paperMove('/actuaria/map', '/actuaria/sector/P', 'PUSH')).toBe('push')
    expect(paperMove('/actuaria/sector/P', '/actuaria/map', 'PUSH')).toBe('pop')
    expect(paperMove('/actuaria/map', '/actuaria/daily', 'PUSH')).toBe('next')
    expect(paperMove('/actuaria/hangar', '/actuaria/daily', 'PUSH')).toBe('prev')
  })
})

describe('the scenery', () => {
  it('is the same sky every time', () => {
    expect(starfield(20, 100, 100)).toEqual(starfield(20, 100, 100))
    const stars = starfield(200, 1000, 500)
    expect(stars.every(s => s.x >= 0 && s.x <= 1000 && s.y >= 0 && s.y <= 500)).toBe(true)
  })

  it('draws a development triangle — each row one period shorter', () => {
    expect(lossTriangleCells(0, 0, 4, 6)).toHaveLength(4 + 3 + 2 + 1)
  })
})
