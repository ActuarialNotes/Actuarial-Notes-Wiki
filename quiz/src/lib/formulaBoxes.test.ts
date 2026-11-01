import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { splitAlignedRows, splitEquations, splitFormulaBoxes } from './formulaBoxes'
import { normalizeVaultMath } from './vaultMath'

describe('splitEquations', () => {
  it('splits equations joined by a comma and spacing, or a bare \\qquad', () => {
    expect(splitEquations('a = 1,\\ b = 2')).toEqual(['a = 1', 'b = 2'])
    expect(splitEquations('a = 1 \\qquad b = 2')).toEqual(['a = 1', 'b = 2'])
    expect(splitEquations('a = 1; \\quad b = 2 \\\\ c = 3')).toEqual(['a = 1', 'b = 2', 'c = 3'])
  })

  it('never splits inside braces, brackets, parentheses or environments', () => {
    expect(splitEquations('P(X = 1, Y = 2) = p')).toEqual(['P(X = 1, Y = 2) = p'])
    expect(splitEquations('a_{i, j = 1} = 2')).toEqual(['a_{i, j = 1} = 2'])
    expect(splitEquations('f = \\left( x = 1, y = 2 \\right)')).toEqual(['f = \\left( x = 1, y = 2 \\right)'])
    const cases = 'F = \\begin{cases} 1 & x = 0 \\\\ 0 & x = 1 \\end{cases}'
    expect(splitEquations(cases)).toEqual([cases])
  })

  it('keeps a piece with no equals sign on the equation before it', () => {
    expect(splitEquations('f(x) = e^{-x}, \\quad x > 0')).toEqual(['f(x) = e^{-x}, \\quad x > 0'])
    expect(splitEquations('L = 1,000,000')).toEqual(['L = 1,000,000'])
    expect(splitEquations('Y \\sim \\text{dist}, \\qquad g(\\mu) = \\eta')).toEqual([
      'Y \\sim \\text{dist}, \\qquad g(\\mu) = \\eta',
    ])
  })

  it('keeps an index range with the equation it qualifies', () => {
    const md = 'p_k = c\\,p_{k-1}, \\quad k = 1, 2, 3, \\ldots'
    expect(splitEquations(md)).toEqual([md])
    expect(splitEquations('E = a, \\quad i = 1, \\dots, n, \\qquad V = b')).toEqual([
      'E = a, \\quad i = 1, \\dots, n',
      'V = b',
    ])
  })

  it('never splits a line with an implication', () => {
    const md = 'p \\ge n \\;\\Longrightarrow\\; \\text{RSS} = 0 \\ \\text{ and } \\ R^2 = 1'
    expect(splitEquations(md)).toEqual([md])
  })

  it('keeps a chain of equals signs as one equation', () => {
    expect(splitEquations('a = b = c')).toEqual(['a = b = c'])
  })

  it('drops the spacing left at the end of a piece', () => {
    expect(splitEquations('a = 1 \\ , \\ b = 2')).toEqual(['a = 1', 'b = 2'])
  })

  it('leaves an unbalanced body alone', () => {
    expect(splitEquations('a = [0, 1), b = 2')).toEqual(['a = [0, 1)', 'b = 2'])
    expect(splitEquations('a = (0, b = 2')).toEqual(['a = (0, b = 2'])
  })
})

describe('splitAlignedRows', () => {
  it('splits rows that each have a left-hand side', () => {
    expect(splitAlignedRows('\\begin{aligned} A &= 1 \\\\[4pt] B &= 2 \\end{aligned}')).toEqual(['A = 1', 'B = 2'])
  })

  it('keeps a derivation whole', () => {
    expect(splitAlignedRows('\\begin{aligned} A &= 1 \\\\ &= 2 \\end{aligned}')).toBeNull()
    expect(splitAlignedRows('\\begin{aligned} A &= 1 \\\\ &\\quad + 2 \\end{aligned}')).toBeNull()
  })
})

describe('splitFormulaBoxes', () => {
  it('gives every equation of the Ratemaking box a box of its own', () => {
    const md = [
      'Intro:',
      '',
      '> $$\\text{Rate} = \\frac{L}{1 - V}, \\qquad \\text{Change} = \\frac{R}{C} - 1$$',
      '>',
      '> $$\\bar{L} = \\text{pure premium},\\ V = \\text{variable expense \\%}$$',
      '',
      'After.',
    ].join('\n')
    expect(splitFormulaBoxes(md)).toBe(
      [
        'Intro:',
        '',
        '> $$\\text{Rate} = \\frac{L}{1 - V}$$',
        '',
        '> $$\\text{Change} = \\frac{R}{C} - 1$$',
        '',
        '> $$\\bar{L} = \\text{pure premium}$$',
        '',
        '> $$V = \\text{variable expense \\%}$$',
        '',
        'After.',
      ].join('\n'),
    )
  })

  it('leaves a one-equation box byte for byte', () => {
    const md = '> $$a = b$$'
    expect(splitFormulaBoxes(md)).toBe(md)
  })

  it('leaves callouts and quotes with prose alone', () => {
    const callout = '> [!note] Note\n> $$a = 1, \\quad b = 2$$'
    expect(splitFormulaBoxes(callout)).toBe(callout)
    const prose = '> Some text\n> $$a = 1, \\quad b = 2$$'
    expect(splitFormulaBoxes(prose)).toBe(prose)
  })

  it('does not touch code fences', () => {
    const md = '```\n> $$a = 1, \\quad b = 2$$\n```'
    expect(splitFormulaBoxes(md)).toBe(md)
  })

  it('is idempotent', () => {
    const md = '> $$a = 1, \\quad b = 2$$\n>\n> $$c = 3$$'
    const once = splitFormulaBoxes(md)
    expect(splitFormulaBoxes(once)).toBe(once)
  })
})

describe('formula boxes across the vault', () => {
  const root = join(__dirname, '../../..')
  const walk = (dir: string, acc: string[] = []): string[] => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name)
      if (statSync(path).isDirectory()) walk(path, acc)
      else if (path.endsWith('.md')) acc.push(path)
    }
    return acc
  }
  const files = [
    ...readdirSync(root).filter(f => f.startsWith('Exam ') && f.endsWith('.md')).map(f => join(root, f)),
    ...['Concepts', 'Resources', 'Guides', 'questions'].flatMap(dir => walk(join(root, dir))),
  ]
  // Every character but whitespace and `&`, so a split can be shown to have
  // removed separators only.
  const ink = (s: string) => s.replace(/[\s&>$]/g, '')

  it('only ever removes separators, and settles in one pass', () => {
    for (const file of files) {
      const md = readFileSync(file, 'utf8')
      if (!md.includes('$$')) continue
      const once = normalizeVaultMath(md)
      expect(normalizeVaultMath(once), file).toBe(once)
      const split = splitFormulaBoxes(md)
      if (split === md) continue
      // Walk the output's ink through the input's: it must be a subsequence.
      const src = ink(md)
      const out = ink(split)
      let k = 0
      let subsequence = true
      for (const ch of out) {
        while (k < src.length && src[k] !== ch) k++
        if (k++ >= src.length) { subsequence = false; break }
      }
      expect(subsequence, file).toBe(true)
    }
  }, 60_000)
})
