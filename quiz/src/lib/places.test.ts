import { describe, it, expect } from 'vitest'
import { hidesBottomBar, pageOf, placeOf, placePages, PLACES } from './places'
import { deskPlace } from './viewTransition'

describe('PLACES', () => {
  it('lists the four places in the order of the path', () => {
    expect(PLACES.map(p => p.label)).toEqual(['Today', 'Learn', 'Practice', 'Apply'])
  })
})

describe('placeOf', () => {
  it('puts every page of the path in its place', () => {
    expect(placeOf('/dashboard')).toBe('today')
    expect(placeOf('/wiki')).toBe('learn')
    expect(placeOf('/wiki/exam/Exam P-1 (SOA)')).toBe('learn')
    expect(placeOf('/wiki/resources?exam=P-1')).toBe('learn')
    expect(placeOf('/')).toBe('practice')
    expect(placeOf('/?topic=Exam+P')).toBe('practice')
    expect(placeOf('/quiz?exam=P')).toBe('practice')
    expect(placeOf('/review')).toBe('practice')
    expect(placeOf('/flashcards')).toBe('practice')
    expect(placeOf('/games')).toBe('practice')
    expect(placeOf('/craft/exam-p-general-probability')).toBe('practice')
    expect(placeOf('/tools/chain-ladder')).toBe('apply')
    expect(placeOf('/data-sources/osfi')).toBe('apply')
    expect(placeOf('/project/pcpa/p-1')).toBe('apply')
    expect(placeOf('/workflows')).toBe('apply')
  })

  it('leaves what is behind the avatar in no place', () => {
    for (const path of ['/store', '/store/gems', '/community', '/settings', '/upgrade', '/auth', '/search']) {
      expect(placeOf(path)).toBeNull()
    }
  })

  it('does not match a path that merely starts like a place', () => {
    expect(placeOf('/dashboards')).toBeNull()
    expect(placeOf('/toolshed')).toBeNull()
    expect(placeOf('/wikipedia')).toBeNull()
  })
})

describe('pageOf', () => {
  it('files a resource page under Resources and the rest of the wiki under Exams', () => {
    expect(pageOf('/wiki/resource/Basic Ratemaking')).toBe('resources')
    expect(pageOf('/wiki/resources')).toBe('resources')
    expect(pageOf('/wiki/concept/Bayes Theorem')).toBe('exams')
    expect(pageOf('/wiki/question/p-12')).toBe('exams')
  })

  it('files a quiz and its results under Quiz, and the games under Games', () => {
    expect(pageOf('/quiz')).toBe('quiz')
    expect(pageOf('/review')).toBe('quiz')
    expect(pageOf('/battle')).toBe('games')
    expect(pageOf('/craft')).toBe('games')
  })
})

describe('placePages', () => {
  it('lists Today as one page', () => {
    expect(placePages('today')).toEqual([])
  })

  it('lists only what the reader can open', () => {
    expect(placePages('learn').map(p => p.id)).toEqual(['exams', 'resources'])
    expect(placePages('learn', { research: true }).map(p => p.id)).toEqual(['exams', 'resources', 'research'])
    expect(placePages('practice').map(p => p.id)).toEqual(['quiz', 'flashcards'])
    expect(placePages('practice', { games: true }).map(p => p.id)).toEqual(['quiz', 'flashcards', 'games'])
    expect(placePages('apply').map(p => p.id)).toEqual(['projects'])
    expect(placePages('apply', { tools: true, workflows: true }).map(p => p.id))
      .toEqual(['tools', 'data-sources', 'projects', 'workflows'])
  })

  it('files every page it lists under the place that lists it', () => {
    const all = { research: true, games: true, tools: true, workflows: true }
    for (const place of PLACES) {
      for (const page of placePages(place.id, all)) {
        expect(placeOf(page.to)).toBe(place.id)
        expect(pageOf(page.to)).toBe(page.id)
      }
    }
  })

  it('lies on the desk in the order it is listed', () => {
    const all = { research: true, tools: true, workflows: true }
    const tabs = ['/dashboard', ...PLACES.flatMap(p => placePages(p.id, all).map(page => page.to))]
      .map(path => deskPlace(path).tab)
    expect([...tabs].sort((a, b) => a - b)).toEqual(tabs)
  })
})

describe('hidesBottomBar', () => {
  it('puts the bar away where the screen is the work', () => {
    for (const path of ['/quiz', '/quiz?exam=P', '/battle', '/craft', '/craft/topic', '/workflows/wf-1', '/project/pcpa/p-1', '/auth', '/auth/callback']) {
      expect(hidesBottomBar(path)).toBe(true)
    }
  })

  it('keeps it on every list and reading page', () => {
    for (const path of ['/', '/dashboard', '/wiki/exam/Exam 5 (CAS)', '/review', '/flashcards', '/games', '/tools/annuity', '/workflows', '/project', '/store', '/settings']) {
      expect(hidesBottomBar(path)).toBe(false)
    }
  })
})
