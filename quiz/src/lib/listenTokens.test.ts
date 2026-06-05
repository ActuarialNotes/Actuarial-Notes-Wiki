import { describe, it, expect } from 'vitest'
import { buildListenContent, toSegments, segmentsToSsml } from './listenTokens'

const MACAULAY = `**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, where each cash flow is weighted by its [[Present Value]] as a fraction of total price:

> $$D_{Mac} = \\frac{\\sum_{t=1}^{n} t \\cdot C_t \\cdot v^t}{\\sum_{t=1}^{n} C_t \\cdot v^t}$$

- where $v = 1/(1+j)$ and $P$ is the bond price
- The relationship to [[Modified Duration]] is $D_{Mod} = D_{Mac}/(1+j)$
`

describe('buildListenContent', () => {
  it('produces ordered tokens with sequential indices', () => {
    const { tokens } = buildListenContent(MACAULAY)
    expect(tokens.length).toBeGreaterThan(0)
    tokens.forEach((t, i) => expect(t.index).toBe(i))
  })

  it('keeps wiki link display text and drops the brackets', () => {
    const { tokens } = buildListenContent(MACAULAY)
    const words = tokens.filter(t => t.type === 'word').map(t => t.text)
    expect(words).toContain('Present')
    expect(words).toContain('Value')
    expect(words.join(' ')).not.toContain('[[')
  })

  it('turns inline math into a spoken math token', () => {
    const { tokens } = buildListenContent('The mean is $\\mu = E[X]$ today.')
    const math = tokens.find(t => t.type === 'math')
    expect(math).toBeTruthy()
    expect(math!.type === 'math' && math!.speech).toBe('mu equals E X')
  })

  it('renders a standalone display equation as a centered math block', () => {
    const { blocks } = buildListenContent(MACAULAY)
    const mathBlock = blocks.find(b => b.kind === 'math')
    expect(mathBlock).toBeTruthy()
    expect(mathBlock!.tokens).toHaveLength(1)
    expect(mathBlock!.tokens[0].type).toBe('math')
  })

  it('builds segments whose char ranges align with the speech text', () => {
    const { blocks } = buildListenContent(MACAULAY)
    const segments = toSegments(blocks)
    expect(segments.length).toBeGreaterThan(0)
    for (const seg of segments) {
      for (const r of seg.ranges) {
        expect(r.end).toBeGreaterThan(r.start)
        expect(r.end).toBeLessThanOrEqual(seg.text.length)
      }
    }
  })

  it('emits SSML marks keyed by token index', () => {
    const { blocks } = buildListenContent('Hello $x^2$ world.')
    const ssml = segmentsToSsml(toSegments(blocks))
    expect(ssml).toMatch(/^<speak>/)
    expect(ssml).toContain('<mark name="t0"/>')
    expect(ssml).toContain('squared')
  })
})
