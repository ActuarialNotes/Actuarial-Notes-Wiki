import { describe, it, expect } from 'vitest'
import { normalizeVaultMath, promoteEscapedDollarMath } from './vaultMath'

describe('promoteEscapedDollarMath', () => {
  it('promotes a span that holds an escaped dollar', () => {
    expect(promoteEscapedDollarMath('the $\\$400$ minimum'))
      .toBe('the $$\\$400$$ minimum')
  })

  it('leaves ordinary inline math alone', () => {
    expect(promoteEscapedDollarMath('trend is $6\\%$ a year'))
      .toBe('trend is $6\\%$ a year')
  })

  it('reads a backslash-escaped dollar as a sign, not a delimiter', () => {
    // `\$$950$` is already the working spelling: a literal $ then inline math.
    expect(promoteEscapedDollarMath('price \\$$950$, duration $8.5$'))
      .toBe('price \\$$950$, duration $8.5$')
  })

  it('steps over an existing $$…$$ span', () => {
    expect(promoteEscapedDollarMath('$$a = \\$5$$ and $\\$6$'))
      .toBe('$$a = \\$5$$ and $$\\$6$$')
  })

  it('leaves an unclosed span as written', () => {
    expect(promoteEscapedDollarMath('costs $\\$400 each')).toBe('costs $\\$400 each')
  })
})

describe('normalizeVaultMath', () => {
  it('returns text with no math untouched', () => {
    const md = '# Heading\n\nSome prose.\n'
    expect(normalizeVaultMath(md)).toBe(md)
  })

  it('gives a multi-line block bare fence lines', () => {
    const md = [
      '> > $$\\begin{align*}',
      '> > a &= 1 \\\\',
      '> > b &= 2',
      '> > \\end{align*}$$',
    ].join('\n')
    expect(normalizeVaultMath(md)).toBe([
      '> > $$',
      '> > \\begin{align*}',
      '> > a &= 1 \\\\',
      '> > b &= 2',
      '> > \\end{align*}',
      '> > $$',
    ].join('\n'))
  })

  it('keeps the vault\'s one-line formula box on one line', () => {
    const md = '> $$\\text{Indicated Change} = \\frac{a}{b} - 1$$'
    expect(normalizeVaultMath(md)).toBe(md)
  })

  it('breaks a one-line display-only environment onto fence lines', () => {
    expect(normalizeVaultMath('> $$\\begin{align*} a &= 1 \\end{align*}$$'))
      .toBe('> $$\n> \\begin{align*} a &= 1 \\end{align*}\n> $$')
  })

  it('promotes escaped-dollar spans inside a table row', () => {
    const md = '| $2023$ | $\\$12{,}000$ | $1.085$ |'
    expect(normalizeVaultMath(md)).toBe('| $2023$ | $$\\$12{,}000$$ | $1.085$ |')
  })

  it('leaves the body of a display block alone', () => {
    const md = '$$\n2023: \\; 7{,}100 \\times 1.16 &= \\$10{,}790\n$$'
    expect(normalizeVaultMath(md)).toBe(md)
  })

  it('does not touch math inside a fenced code block', () => {
    const md = '```md\n$\\$400$\n```'
    expect(normalizeVaultMath(md)).toBe(md)
  })

  it('is idempotent', () => {
    const md = [
      'An insurer charges $\\$400$ minimum premium.',
      '',
      '> > $$\\begin{align*}',
      '> > a &= \\$1',
      '> > \\end{align*}$$',
    ].join('\n')
    const once = normalizeVaultMath(md)
    expect(normalizeVaultMath(once)).toBe(once)
  })
})
