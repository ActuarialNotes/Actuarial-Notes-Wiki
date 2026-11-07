import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { extractImages, extractMathBlockquotes, splitDefinition, stripFrontmatter } from './wikiMarkdown'

const CONCEPTS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../Concepts')

// The shape concept pages are written in since 2026-11-06: figure first.
const PAGE = `---
verification:
  status: stale
---

![[Media/Figures/Axioms_of_Probability.svg|340]]

The **Axioms of Probability** are the three rules that every probability $P$
must satisfy.

The first axiom states that for every event $E$,

> $$P(E) \\geq 0$$

- The sequence may be finite.

> [!example]- What is $P(S)$? {Example}
> $$P(S) = 1$$
`

describe('splitDefinition', () => {
  it('skips the figure a concept page opens with', () => {
    const { paragraph, rest } = splitDefinition(PAGE)
    expect(paragraph).toBe(
      'The **Axioms of Probability** are the three rules that every probability $P$\nmust satisfy.',
    )
    expect(rest).toContain('The first axiom')
    expect(rest).not.toContain('Axioms_of_Probability.svg')
  })

  it('still reads a page with no figure', () => {
    expect(splitDefinition('A **Thing** is a thing.\n\n## More').paragraph).toBe('A **Thing** is a thing.')
  })

  it('skips a markdown image and an Obsidian comment', () => {
    expect(splitDefinition('![x](a.png)\n%%note%%\nA **Thing** is a thing.').paragraph).toBe('A **Thing** is a thing.')
  })

  it('never takes a figure-first page’s figure for its definition', () => {
    const bad: string[] = []
    for (const file of readdirSync(CONCEPTS).filter(f => f.endsWith('.md'))) {
      const md = readFileSync(path.join(CONCEPTS, file), 'utf8')
      if (!stripFrontmatter(md).trimStart().startsWith('![[')) continue
      const { paragraph } = splitDefinition(md)
      if (/^!\[/.test(paragraph)) bad.push(file)
    }
    expect(bad).toEqual([])
  })
})

describe('extractMathBlockquotes', () => {
  it('takes the formula boxes and leaves the worked example', () => {
    expect(extractMathBlockquotes(PAGE)).toEqual(['> $$P(E) \\geq 0$$'])
  })
})

describe('extractImages', () => {
  it('reads an embed with a display width, not taking the width for its alt', () => {
    const [img] = extractImages(PAGE)
    expect(img.src).toContain('Axioms_of_Probability.svg')
    expect(img.alt).toBe('Axioms_of_Probability.svg')
  })
})
