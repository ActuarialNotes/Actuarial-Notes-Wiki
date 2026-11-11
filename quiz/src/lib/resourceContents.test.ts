import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Element, Root } from 'hast'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {
  CHAPTER_CLASS,
  CONTENTS_CLASS,
  CONTENTS_FOLD_AT,
  foldContents,
  isChapterHeading,
  isMatterHeading,
  isNumberedHeading,
  MATTER_CLASS,
  planContents,
  textOf,
} from './resourceContents'
import { preprocessResourceMarkdown } from './resourceMeta'
import { stripFrontmatter } from './wikiParser'

function hast(md: string): Root {
  const processor = unified().use(remarkParse).use(remarkRehype)
  return processor.runSync(processor.parse(md)) as Root
}

function classes(el: Element): string[] {
  const c = el.properties.className
  return Array.isArray(c) ? c.map(String) : typeof c === 'string' ? c.split(/\s+/) : []
}

function find(tree: Root | Element, pred: (el: Element) => boolean): Element[] {
  const out: Element[] = []
  const walk = (node: Root | Element) => {
    for (const child of node.children) {
      if (child.type !== 'element') continue
      if (pred(child)) out.push(child)
      walk(child)
    }
  }
  walk(tree)
  return out
}

/** Every word of the tree, text node by text node (adjacent blocks don't run together). */
function wordsOf(nodes: Root['children']): Set<string> {
  const out = new Set<string>()
  const walk = (n: Root['children'][number] | Element['children'][number]) => {
    if (n.type === 'text') n.value.split(/[\s,]+/).filter(Boolean).forEach(w => out.add(w))
    else if (n.type === 'element') n.children.forEach(walk)
  }
  nodes.forEach(walk)
  return out
}

const byClass = (tree: Root | Element, cls: string) => find(tree, el => classes(el).includes(cls))
const headings = (tree: Root | Element) => find(tree, el => el.tagName === 'h2').map(h => textOf(h).trim())

function book(chapters: number, rowsEach: number): string {
  const parts = ['The lead paragraph.', '', '## Preface', '']
  for (let c = 1; c <= chapters; c++) {
    parts.push(`## ${c} Chapter ${c}`, '')
    for (let r = 1; r <= rowsEach; r++) parts.push(`- ${c}.${r} Section ${r}`)
    parts.push('')
  }
  parts.push('## Index', '', '## Related readings', '', '- [[Something]]', '', '## Sources', '', '- A source', '')
  return parts.join('\n')
}

describe('isNumberedHeading', () => {
  it('knows a numbered division from a heading that opens with a word', () => {
    for (const h of ['1 Combinatorial Analysis', '10 Simulation', 'A.2 Tables', 'B. Glossary', 'Chapter 3 Trend', 'Part II Methods', 'Section 4.1 Scope', 'IV. Results']) {
      expect(isNumberedHeading(h), h).toBe(true)
    }
    for (const h of ['Preface', 'Index', 'A Note on Credibility', 'Answers to Selected Problems', 'Scope', 'I']) {
      expect(isNumberedHeading(h), h).toBe(false)
    }
    expect(isChapterHeading('Appendix 1: Methods')).toBe(false)
    expect(isMatterHeading('Answers to Selected Problems')).toBe(true)
    expect(isMatterHeading('Executive Summary')).toBe(false)
    expect(isChapterHeading('1 Combinatorial Analysis')).toBe(true)
  })
})

describe('foldContents', () => {
  it('folds a long outline into one row per chapter, leaving the lead and the tail', () => {
    const tree = hast(book(4, 5))
    foldContents(tree)
    const [section] = byClass(tree, CONTENTS_CLASS)
    expect(section).toBeDefined()
    expect(classes(section)).toContain(`${CONTENTS_CLASS}-folded`)
    const chapters = find(section, el => el.tagName === 'details')
    expect(chapters.map(c => textOf(find(c, e => e.tagName === 'summary')[0]).trim())).toEqual([
      '1 Chapter 1', '2 Chapter 2', '3 Chapter 3', '4 Chapter 4',
    ])
    expect(chapters.every(c => classes(c).includes(CHAPTER_CLASS))).toBe(true)
    // The tail stays outside the contents, in its place.
    expect(headings(tree).slice(-2)).toEqual(['Related readings', 'Sources'])
    expect(headings(section)).not.toContain('Sources')
    // The lead is still first.
    expect(textOf(tree.children[0]).trim()).toBe('The lead paragraph.')
  })

  it('folds the front and back matter of a numbered book into one line', () => {
    const tree = hast(book(2, 7))
    foldContents(tree)
    const [matter] = byClass(tree, MATTER_CLASS)
    expect(textOf(matter)).toBe('Also included: Preface, Index')
    expect(headings(tree)).not.toContain('Preface')
  })

  it('leaves a short outline open, with no chapter rows', () => {
    const tree = hast(book(2, 3))
    const plan = planContents(tree)!
    expect(plan.rows).toBeLessThanOrEqual(CONTENTS_FOLD_AT)
    foldContents(tree)
    const [section] = byClass(tree, CONTENTS_CLASS)
    expect(classes(section)).not.toContain(`${CONTENTS_CLASS}-folded`)
    expect(find(section, el => el.tagName === 'details')).toHaveLength(0)
    expect(headings(section)).toEqual(['1 Chapter 1', '2 Chapter 2'])
  })

  it('keeps an empty heading as a division when the page numbers none', () => {
    const tree = hast('Lead.\n\n## Purpose\n\n## Scope\n\nText.\n\n## Sources\n\n- x\n')
    foldContents(tree)
    expect(byClass(tree, MATTER_CLASS)).toHaveLength(0)
    expect(headings(byClass(tree, CONTENTS_CLASS)[0])).toEqual(['Purpose', 'Scope'])
  })

  it('folds no matter on a paper whose only numbers are its appendices', () => {
    const md = 'Lead.\n\n## Key Points\n\n## Introduction\n\n## Conclusion\n\n## Appendix 1: Methods\n\n- one\n\n## Sources\n\n- x\n'
    const tree = hast(md)
    expect(planContents(tree)!.matter).toEqual([])
    foldContents(tree)
    expect(headings(byClass(tree, CONTENTS_CLASS)[0])).toEqual(['Key Points', 'Introduction', 'Conclusion', 'Appendix 1: Methods'])
  })

  it('keeps an empty unnumbered heading between two chapters', () => {
    const md = 'Lead.\n\n## Preface\n\n## 1 One\n\n- 1.1 a\n\n## Glossary\n\n## 2 Two\n\n- 2.1 b\n\n## Index\n\n## Sources\n\n- x\n'
    expect(planContents(hast(md))!.matter).toEqual(['Preface', 'Index'])
  })

  it('keeps an empty heading that names a division, not front or back matter', () => {
    const md = 'Lead.\n\n## Executive Summary\n\n## 1 One\n\n- 1.1 a\n\n## Appendix D The Marriage of ERM and DFA\n\n## Sources\n\n- x\n'
    expect(planContents(hast(md))!.matter).toEqual([])
  })

  it('does nothing to a page with no divisions', () => {
    const tree = hast('Lead only.\n\n## Sources\n\n- x\n')
    const before = JSON.stringify(tree)
    foldContents(tree)
    expect(JSON.stringify(tree)).toBe(before)
  })
})

// Every resource page in the vault, through the same preprocessing the app uses.
const here = path.dirname(fileURLToPath(import.meta.url))
const RESOURCES = path.resolve(here, '../../../Resources')

function resourcePages(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name)
    if (statSync(p).isDirectory()) out.push(...resourcePages(p))
    else if (name.endsWith('.md')) {
      const raw = readFileSync(p, 'utf8')
      if (/^Title:/m.test(raw)) out.push(p)
    }
  }
  return out
}

describe('foldContents over the vault', () => {
  const pages = resourcePages(RESOURCES)

  it('finds the resource pages', () => {
    expect(pages.length).toBeGreaterThan(500)
  })

  it('loses no heading and moves no text on any page', () => {
    for (const p of pages) {
      const tree = hast(stripFrontmatter(preprocessResourceMarkdown(readFileSync(p, 'utf8'))))
      const plan = planContents(tree)
      const beforeWords = wordsOf(tree.children)
      const beforeHeadings = headings(tree)
      foldContents(tree)
      const afterHeadings = headings(tree)
      const matter = plan?.matter ?? []
      // Every heading is still a heading, in order, except the matter folded into one line.
      expect(afterHeadings, p).toEqual(beforeHeadings.filter(h => !matter.includes(h.trim())))
      // And no words were lost: every word of the page is still there.
      const afterWords = wordsOf(tree.children)
      const missing = [...beforeWords].filter(w => !afterWords.has(w))
      expect(missing, p).toEqual([])
    }
  }, 60_000)

  it('folds the Ross outline and keeps its numbered chapters', () => {
    const ross = pages.find(p => p.endsWith('A First Course in Probability (Ross - 2019).md'))!
    const tree = hast(stripFrontmatter(preprocessResourceMarkdown(readFileSync(ross, 'utf8'))))
    const plan = planContents(tree)!
    expect(plan.folded).toBe(true)
    expect(plan.matter).toContain('Preface')
    expect(plan.matter).toContain('Index')
    expect(plan.divisions.map(d => textOf(d.heading).trim())[0]).toBe('1 Combinatorial Analysis')
    // The endpaper tables aren't on the front-and-back-matter list, so they stay rows.
    expect(plan.divisions.map(d => textOf(d.heading).trim()).slice(-2)).toEqual([
      'Common Discrete Distributions', 'Common Continuous Distributions',
    ])
  })
})
