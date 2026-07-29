import { describe, it, expect } from 'vitest'
import { isNumberedOutline, parseResourceMeta, preprocessResourceMarkdown } from './resourceMeta'

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
Title: Mathematics of Investment and Credit
Author: Samuel A. Broverman
Year: "2024"
Edition: 8th
Publisher: ACTEX Learning
ISBN: 979-8-8901-6016-4
Find at your local library at: "[worldcat.org](https://search.worldcat.org/title/x)"
---
Body`
    const meta = parseResourceMeta(md)
    expect(meta.title).toBe('Mathematics of Investment and Credit')
    expect(meta.author).toBe('Samuel A. Broverman')
    expect(meta.edition).toBe('8th')
    expect(meta.isbn).toBe('979-8-8901-6016-4')
    expect(meta.getCopyUrl).toBe('https://search.worldcat.org/title/x')
  })
})
