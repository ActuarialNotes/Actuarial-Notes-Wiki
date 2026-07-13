import { describe, it, expect } from 'vitest'
import { rewriteWikilinks } from './WikiArticle'

// rewriteWikilinks marks the 2nd+ mention of a concept *within the same
// [!example] learning-objective callout* with a `#repeat` href fragment, which
// the renderer uses to dim the link. These tests lock in that scoping.

describe('rewriteWikilinks repeated-mention dimming', () => {
  it('adds #repeat to the second mention within one learning objective', () => {
    const md = [
      '> [!example]- Loans {15-25%}',
      '> 1. Define [[Outstanding Balance]] and [[Principal]].',
      '> 2. Calculate the [[Outstanding Balance|outstanding balance]] over time.',
    ].join('\n')
    const out = rewriteWikilinks(md)
    // First mention: clean route, no fragment.
    expect(out).toContain('[Outstanding Balance](/wiki/concept/Outstanding+Balance)')
    // Second mention: same route + #repeat.
    expect(out).toContain('[outstanding balance](/wiki/concept/Outstanding+Balance#repeat)')
    // Principal appears once → never dimmed.
    expect(out).not.toContain('Principal#repeat')
    expect(out).not.toContain('/wiki/concept/Principal#repeat')
  })

  it('treats a concept re-used in a different objective as primary again', () => {
    const md = [
      '> [!example]- Time Value of Money {5-15%}',
      '> 1. Define [[Interest Rate]].',
      '> 2. Given the [[Interest Rate|interest rate]], solve.',
      '',
      '> [!example]- Annuities {20-30%}',
      '> 1. Given the [[Interest Rate|interest rate]], calculate.',
    ].join('\n')
    const out = rewriteWikilinks(md)
    // Exactly one #repeat overall: the 2nd mention in the first objective.
    const repeats = out.match(/Interest\+Rate#repeat/g) ?? []
    expect(repeats).toHaveLength(1)
  })

  it('never dims links outside an [!example] callout', () => {
    const md = [
      'Prose mentioning [[Interest Rate]] and again [[Interest Rate|interest rate]].',
      '',
      '> [!answer]- Source Material',
      '> - [[Interest Rate]] and [[Interest Rate]] again.',
    ].join('\n')
    const out = rewriteWikilinks(md)
    expect(out).not.toContain('#repeat')
  })
})
