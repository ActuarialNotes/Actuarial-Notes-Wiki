import { describe, it, expect } from 'vitest'
import { pageHostsNavButton } from './mobileNavHost'

describe('pageHostsNavButton', () => {
  it('claims the routes whose own top bar carries the button', () => {
    expect(pageHostsNavButton('/')).toBe(true)
    expect(pageHostsNavButton('/wiki')).toBe(true)
    expect(pageHostsNavButton('/wiki/exam/Exam P-1 (SOA)')).toBe(true)
    expect(pageHostsNavButton('/wiki/concept/Bayes Theorem')).toBe(true)
    expect(pageHostsNavButton('/research')).toBe(true)
    expect(pageHostsNavButton('/research/projects')).toBe(true)
    expect(pageHostsNavButton('/project/pcpa')).toBe(true)
    expect(pageHostsNavButton('/project/pcpa/p-1')).toBe(true)
    expect(pageHostsNavButton('/dashboard')).toBe(true)
    expect(pageHostsNavButton('/flashcards')).toBe(true)
  })

  it('leaves every other route to the app header', () => {
    for (const path of ['/search', '/settings', '/store', '/upgrade', '/quiz', '/review', '/auth']) {
      expect(pageHostsNavButton(path)).toBe(false)
    }
  })

  it('does not match a route that merely starts with a hosting one', () => {
    // `/quiz` is the quiz runner, not the `/` builder; `/wikipedia` is nobody.
    expect(pageHostsNavButton('/quiz')).toBe(false)
    expect(pageHostsNavButton('/wikipedia')).toBe(false)
    expect(pageHostsNavButton('/researching')).toBe(false)
    expect(pageHostsNavButton('/dashboards')).toBe(false)
    expect(pageHostsNavButton('/flashcards/deck')).toBe(false)
  })
})
