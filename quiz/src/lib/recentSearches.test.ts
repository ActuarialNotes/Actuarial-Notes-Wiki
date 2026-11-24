import { describe, expect, it } from 'vitest'
import { parseRecentSearches, withRecentSearch } from './recentSearches'

describe('withRecentSearch', () => {
  it('puts the term first, once, whatever its case', () => {
    expect(withRecentSearch(['poisson', 'bayes'], ' Bayes ')).toEqual(['Bayes', 'poisson'])
  })
  it('keeps so many and drops the oldest', () => {
    expect(withRecentSearch(['a1', 'b1', 'c1'], 'd1', 3)).toEqual(['d1', 'a1', 'b1'])
  })
  it('ignores a term too short to be a search', () => {
    expect(withRecentSearch(['poisson'], 'p')).toEqual(['poisson'])
  })
})

describe('parseRecentSearches', () => {
  it('reads a list of terms and nothing else', () => {
    expect(parseRecentSearches('["poisson", 3, "", "bayes"]')).toEqual(['poisson', 'bayes'])
    expect(parseRecentSearches('{"a":1}')).toEqual([])
    expect(parseRecentSearches('not json')).toEqual([])
    expect(parseRecentSearches(null)).toEqual([])
  })
})
