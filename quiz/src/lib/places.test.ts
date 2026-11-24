import { describe, it, expect } from 'vitest'
import { PLACES, drawsOwnTopRow, isSessionRoute, learnTarget, placeOf, showsPlaceBar } from './places'

describe('the four places', () => {
  it('are Today, Learn, Practice and Apply, in the order of the path', () => {
    expect(PLACES.map(p => p.label)).toEqual(['Today', 'Learn', 'Practice', 'Apply'])
    expect(PLACES.map(p => p.to)).toEqual(['/dashboard', '/wiki', '/', '/apply'])
  })

  it('each home is in its own place', () => {
    for (const place of PLACES) expect(placeOf(place.to)).toBe(place.id)
  })
})

describe('placeOf', () => {
  it('puts the study guides, their pages and the resources in Learn', () => {
    for (const path of ['/wiki', '/wiki/exam/Exam+P-1+(SOA)', '/wiki/concept/Bayes+Theorem', '/wiki/resources', '/research']) {
      expect(placeOf(path)).toBe('learn')
    }
  })

  it('puts the quiz, the past papers, the flashcards, the search and the games in Practice', () => {
    for (const path of ['/', '/quiz', '/review', '/papers', '/flashcards', '/search', '/games', '/battle', '/craft/exam-p']) {
      expect(placeOf(path)).toBe('practice')
    }
  })

  it('puts Projects, Tools, Workflows and Data Sources in Apply', () => {
    for (const path of ['/apply', '/project', '/project/pcpa/p-1', '/tools', '/tools/chain-ladder', '/workflows/w-1', '/data-sources/osfi']) {
      expect(placeOf(path)).toBe('apply')
    }
  })

  it('leaves You, and what is behind it, in no place', () => {
    for (const path of ['/you', '/you/league', '/settings', '/store', '/store/gems', '/community', '/upgrade', '/auth']) {
      expect(placeOf(path)).toBeNull()
    }
  })

  it('does not match a route that merely starts with a place\'s', () => {
    for (const path of ['/dashboards', '/wikipedia', '/toolshed', '/projects', '/quizzes', '/applying']) {
      expect(placeOf(path)).toBeNull()
    }
  })
})

describe('showsPlaceBar', () => {
  it('is drawn under each place\'s home and the pages a reader moves on from', () => {
    for (const path of ['/dashboard', '/wiki', '/wiki/exam/Exam+P-1+(SOA)', '/wiki/resources', '/', '/papers', '/games', '/apply', '/project', '/tools', '/workflows', '/data-sources', '/store', '/store/gems', '/community', '/upgrade']) {
      expect(showsPlaceBar(path)).toBe(true)
    }
  })

  it('is off the session, the games\' boards and signing in', () => {
    for (const path of ['/quiz', '/review', '/battle', '/craft', '/craft/exam-p', '/auth', '/auth/callback']) {
      expect(showsPlaceBar(path)).toBe(false)
    }
  })

  it('is off You\'s screens, which a cross or a back arrow leaves', () => {
    for (const path of ['/you', '/you/league', '/settings']) expect(showsPlaceBar(path)).toBe(false)
  })

  it('is off a screen whose foot is its own: a concept, a question, a tool, the flashcards, the search', () => {
    for (const path of ['/wiki/concept/Bayes+Theorem', '/wiki/question/p-006', '/tools/chain-ladder', '/flashcards', '/search']) {
      expect(showsPlaceBar(path)).toBe(false)
    }
  })

  it('is off a project being worked and a workflow\'s board', () => {
    for (const path of ['/project/pcpa/p-1', '/project/brief/collision', '/workflows/w-1']) {
      expect(showsPlaceBar(path)).toBe(false)
    }
  })
})

describe('drawsOwnTopRow', () => {
  it('claims the pages that open on a row of their own', () => {
    for (const path of ['/', '/dashboard', '/wiki', '/wiki/concept/Bayes+Theorem', '/research/projects', '/flashcards', '/papers', '/search', '/project/pcpa/p-1', '/craft', '/store', '/tools', '/tools/chain-ladder', '/workflows', '/data-sources', '/you', '/you/league', '/settings', '/quiz', '/review']) {
      expect(drawsOwnTopRow(path)).toBe(true)
    }
  })

  it('leaves every other page to the app\'s top row', () => {
    for (const path of ['/apply', '/project', '/games', '/battle', '/store/gems', '/community', '/upgrade', '/auth']) {
      expect(drawsOwnTopRow(path)).toBe(false)
    }
  })

  it('does not match a route that merely starts with a claimed one', () => {
    for (const path of ['/wikipedia', '/researching', '/dashboards', '/flashcards/deck', '/projects', '/toolshed']) {
      expect(drawsOwnTopRow(path)).toBe(false)
    }
  })
})

describe('isSessionRoute', () => {
  it('is the quiz and its results', () => {
    expect(isSessionRoute('/quiz')).toBe(true)
    expect(isSessionRoute('/review')).toBe(true)
    expect(isSessionRoute('/')).toBe(false)
    expect(isSessionRoute('/quizzes')).toBe(false)
  })
})

describe('learnTarget', () => {
  const home = '/wiki/exam/Exam+P-1+(SOA)'

  it('returns to the page last read in Learn from another place', () => {
    expect(learnTarget('/', '/wiki/concept/Bayes+Theorem', home)).toBe('/wiki/concept/Bayes+Theorem')
    expect(learnTarget('/dashboard', '/wiki/resources?exam=all', home)).toBe('/wiki/resources?exam=all')
  })

  it('opens the exam in focus\'s study guide with nothing read, or a stored value that is no Learn page', () => {
    expect(learnTarget('/', null, home)).toBe(home)
    expect(learnTarget('/apply', '/settings', home)).toBe(home)
  })

  it('opens Study Guides for a reader with no exam', () => {
    expect(learnTarget('/', null, null)).toBe('/wiki')
    expect(learnTarget('/wiki/concept/Bayes+Theorem', null, null)).toBe('/wiki')
  })

  it('leads home from inside Learn, so it is a way out of the page showing', () => {
    expect(learnTarget('/wiki/concept/Bayes+Theorem', '/wiki/concept/Bayes+Theorem', home)).toBe(home)
    expect(learnTarget('/wiki', null, home)).toBe(home)
    expect(learnTarget('/wiki/resources', null, home)).toBe(home)
  })

  it('leads up to Study Guides from the exam in focus\'s own guide', () => {
    expect(learnTarget(home, home, home)).toBe('/wiki')
    expect(learnTarget('/wiki/exam/Exam%20P-1%20(SOA)', null, '/wiki/exam/Exam P-1 (SOA)')).toBe('/wiki')
  })
})
