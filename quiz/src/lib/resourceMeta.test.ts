import { describe, it, expect } from 'vitest'
import {
  isNumberedOutline,
  librarySearchUrl,
  parseResourceMeta,
  preprocessResourceMarkdown,
} from './resourceMeta'

const OUTLINE = `## 1 Interest Rate Measurement

- 1.1 Interest Accumulation and [[Effective Rate|Effective Rates of Interest]]
  - 1.1.1 [[Effective Rate|Effective Rates of Interest]]
  - 1.1.2 [[Compound Interest]]
- 1.2 [[Present Value]]
- 1.3 [[Equation of Value]]
`

const PROSE = `## Scope

- Applies whenever an actuary designs a risk classification system
- Does not apply where classes are prescribed by law
- Trending here means adjusting historical data for changes over time
`

describe('isNumberedOutline', () => {
  it('detects a table of contents whose items carry section numbers', () => {
    expect(isNumberedOutline(OUTLINE)).toBe(true)
  })

  it('leaves prose bullet lists alone', () => {
    expect(isNumberedOutline(PROSE)).toBe(false)
  })

  it('accepts lettered and zero-based section labels', () => {
    expect(isNumberedOutline('- 0.1 Basic Operations\n- 0.2 Time Value\n- A.1 Tables\n')).toBe(true)
  })

  it('ignores pages with only a stray item or two', () => {
    expect(isNumberedOutline('- 1.1 Introduction\n- 1.2 Counting\n')).toBe(false)
  })

  it('tolerates a minority of unnumbered entries', () => {
    const mixed = `- 1.1 Introduction
- 1.2 Counting
- 1.3 Permutations
- Appendix: tables of the normal distribution
`
    expect(isNumberedOutline(mixed)).toBe(true)
  })
})

describe('preprocessResourceMarkdown', () => {
  it('drops the cover embed and keeps bullets as bullets', () => {
    const md = `---
Title: Mathematics of Investment and Credit
---
![[Cover.png]]
${OUTLINE}`
    const out = preprocessResourceMarkdown(md)
    expect(out).not.toContain('Cover.png')
    expect(out).toContain('- 1.1 Interest Accumulation')
    expect(out).not.toMatch(/^\s*1\. 1\.1 /m)
  })
})

describe('parseResourceMeta', () => {
  it('reads bibliographic fields and the get-a-copy link', () => {
    const md = `---
Title: Basic Ratemaking
Author: Geoff Werner
Year: "2016"
Edition: 5th
Publisher: Casualty Actuarial Society
Available from: "[casact.org](https://www.casact.org/ratemaking.pdf)"
---
Body`
    const meta = parseResourceMeta(md)
    expect(meta.title).toBe('Basic Ratemaking')
    expect(meta.author).toBe('Geoff Werner')
    expect(meta.edition).toBe('5th')
    expect(meta.getCopyUrl).toBe('https://www.casact.org/ratemaking.pdf')
  })

  // A textbook that is simply for sale names no place to fetch it from, so the
  // card's one action has to be built from the ISBN. Before this, those pages
  // carried a hand-written WorldCat /title/<slug> link — a guess at a URL that
  // only takes OCLC control numbers, so every one of them 404'd.
  it('falls back to a library search built from the ISBN', () => {
    const md = `---
Title: Mathematics of Investment and Credit
Author: Samuel A. Broverman
Year: "2024"
Edition: 8th
Publisher: ACTEX Learning
ISBN: 979-8-8901-6016-4
---
Body`
    const meta = parseResourceMeta(md)
    expect(meta.isbn).toBe('979-8-8901-6016-4')
    expect(meta.getCopyUrl).toBe('https://search.worldcat.org/search?q=bn%3A9798890160164')
  })

  // An authored link is the real location of the source; the ISBN search is
  // only the fallback, so it must never displace one.
  it('prefers an authored source link over the ISBN search', () => {
    const md = `---
Title: Basic Ratemaking
ISBN: 978-0134753119
Available from: "[casact.org](https://www.casact.org/ratemaking.pdf)"
---
Body`
    expect(parseResourceMeta(md).getCopyUrl).toBe('https://www.casact.org/ratemaking.pdf')
  })

  it('offers no link for a page with neither a source nor an ISBN', () => {
    expect(parseResourceMeta('---\nTitle: Landmark Legal\n---\nBody').getCopyUrl).toBeUndefined()
  })
})

describe('librarySearchUrl', () => {
  it('strips the hyphens an ISBN is printed with', () => {
    expect(librarySearchUrl('978-0-9829174-7-3')).toBe(
      'https://search.worldcat.org/search?q=bn%3A9780982917473',
    )
  })

  it('accepts a 10-digit ISBN, check digit X included', () => {
    expect(librarySearchUrl('0-387-31073-X')).toBe(
      'https://search.worldcat.org/search?q=bn%3A038731073X',
    )
  })

  // A button onto an empty result page is worse than no button: the card drops
  // its one control rather than promise a copy it cannot lead to.
  it('returns nothing for anything that is not a well-formed ISBN', () => {
    expect(librarySearchUrl(undefined)).toBeUndefined()
    expect(librarySearchUrl('')).toBeUndefined()
    expect(librarySearchUrl('CAS Study Kit')).toBeUndefined()
    expect(librarySearchUrl('978-01347531')).toBeUndefined()
    expect(librarySearchUrl('97801347531199')).toBeUndefined()
  })

  // The generated covers (scripts/generate_resource_covers.py) are SVG, and a
  // bare filename is resolved against Media/Attachments the way Obsidian does.
  it('resolves a generated SVG cover embed to its attachment', () => {
    const md = `---
Title: Basic Ratemaking
---
![[Basic Ratemaking (Werner - 2016) - Cover.svg]]

Body`
    const meta = parseResourceMeta(md)
    expect(meta.coverImageUrl).toContain(
      'Media/Attachments/Basic%20Ratemaking%20(Werner%20-%202016)%20-%20Cover.svg',
    )
  })

  // A page may open with its cover and still embed sized figures further down;
  // only the cover is lifted out of the body.
  it('takes the cover from the first unsized embed, not a sized figure', () => {
    const md = `---
Title: Probability Distributions
---
![[Probability Distributions Reference - Cover.svg]]

![[Media/Binomial_distribution_pmf.svg|500]]`
    expect(parseResourceMeta(md).coverImageUrl).toContain(
      'Probability%20Distributions%20Reference%20-%20Cover.svg',
    )
    const body = preprocessResourceMarkdown(md)
    expect(body).not.toContain('Reference - Cover.svg')
    expect(body).toContain('![[Media/Binomial_distribution_pmf.svg|500]]')
  })
})
