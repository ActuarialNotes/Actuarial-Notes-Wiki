// The concepts a question names in its own words, made tappable.
//
// A question is tagged with the concepts it tests (`wiki_link`), and its text
// often names them outright — "Describe the concept of materiality." This
// module finds those names in the rendered text and wraps each one in a button
// carrying the same `data-wikiref` a study guide's wiki link carries, so the
// quiz can open the concept in the popup and walk the mentions the way the
// study guide walks its links (hooks/useConceptHighlight.ts).
//
// Only names the question is tagged with are looked for, so nothing is linked
// that the question isn't about; and only words already on screen are marked,
// so no concept the text doesn't name is given away. Math, code and links are
// passed over. Pure, and free of React.

import type { Element, ElementContent, Root, RootContent, Text } from 'hast'
import { nameForms } from './conceptGraph'

export interface ConceptSpan {
  start: number
  end: number
  /** The concept's name as tagged — the popup opens this. */
  name: string
}

const WORD = /[\p{L}\p{N}]/u
const PLURAL = /^(es|s)(?![\p{L}\p{N}])/u

/**
 * Where `names` are written in `text`, as words of their own — any case, a
 * hyphen for a space, a plural ending allowed (the forms `nameForms` reads).
 * Longer names are read first, so "Loss Ratio Method" isn't also a mention of
 * "Loss Ratio"; spans never overlap, and come back in text order.
 */
export function findConceptMentions(text: string, names: readonly string[]): ConceptSpan[] {
  if (!text || names.length === 0) return []
  const lower = text.toLowerCase().replace(/-/g, ' ')
  const taken: boolean[] = new Array(text.length).fill(false)
  const out: ConceptSpan[] = []
  const ordered = [...new Set(names.filter(n => n.trim()))].sort((a, b) => b.length - a.length)
  for (const name of ordered) {
    for (const form of nameForms(name)) {
      // A one- or two-letter form ("A", "Mu") would light up half the prose.
      if (form.length < 3) continue
      let from = 0
      while (from <= lower.length - form.length) {
        const at = lower.indexOf(form, from)
        if (at < 0) break
        from = at + 1
        const tail = PLURAL.exec(text.slice(at + form.length, at + form.length + 3))
        const end = at + form.length + (tail?.[1].length ?? 0)
        if ((at > 0 && WORD.test(text[at - 1])) || (end < text.length && WORD.test(text[end]))) continue
        let free = true
        for (let k = at; k < end && free; k++) free = !taken[k]
        if (!free) continue
        for (let k = at; k < end; k++) taken[k] = true
        out.push({ start: at, end, name })
        from = end
      }
    }
  }
  return out.sort((x, y) => x.start - y.start)
}

/** The class a mention is drawn with (index.css, "Concept mentions"). */
export const CONCEPT_MENTION_CLASS = 'concept-mention'

/** Elements whose text is never a mention: formulas, code, existing links and controls. */
const SKIP_TAGS = new Set(['a', 'button', 'code', 'pre', 'kbd', 'script', 'style', 'svg', 'math', 'textarea', 'input'])

function isSkipped(el: Element): boolean {
  if (SKIP_TAGS.has(el.tagName)) return true
  const cls = el.properties?.className
  const list = Array.isArray(cls) ? cls.map(String) : typeof cls === 'string' ? cls.split(/\s+/) : []
  return list.some(c => c === 'katex' || c === 'katex-display' || c === 'math' || c.startsWith('math-'))
}

function mentionElement(text: string, name: string): Element {
  return {
    type: 'element',
    tagName: 'button',
    properties: {
      type: 'button',
      className: [CONCEPT_MENTION_CLASS],
      dataWikiref: `concept:${name.toLowerCase()}`,
      dataConceptMention: name,
      dataSound: 'tap',
      ariaLabel: `Read ${name}`,
    },
    children: [{ type: 'text', value: text }],
  }
}

function splitText(node: Text, names: readonly string[]): ElementContent[] | null {
  const spans = findConceptMentions(node.value, names)
  if (spans.length === 0) return null
  const out: ElementContent[] = []
  let at = 0
  for (const span of spans) {
    if (span.start > at) out.push({ type: 'text', value: node.value.slice(at, span.start) })
    out.push(mentionElement(node.value.slice(span.start, span.end), span.name))
    at = span.end
  }
  if (at < node.value.length) out.push({ type: 'text', value: node.value.slice(at) })
  return out
}

function walk(parent: Root | Element, names: readonly string[]): void {
  const next: (RootContent | ElementContent)[] = []
  let changed = false
  for (const child of parent.children) {
    if (child.type === 'text') {
      const split = splitText(child, names)
      if (split) {
        next.push(...split)
        changed = true
        continue
      }
    } else if (child.type === 'element' && !isSkipped(child)) {
      walk(child, names)
    }
    next.push(child)
  }
  if (changed) parent.children = next as typeof parent.children
}

/**
 * A rehype plugin wrapping every mention of `names` in a `button.concept-mention`
 * with `data-wikiref` and `data-concept-mention`. Run it after `rehype-katex`,
 * so a formula is already a `.katex` subtree it can step around.
 */
export function rehypeConceptMentions(names: readonly string[]) {
  return () => (tree: Root) => {
    if (names.length > 0) walk(tree, names)
  }
}

/**
 * The popup's walk over the mentions on screen, given each mention's concept
 * name in document order: the concepts once each, in the order first named,
 * and every mention as an occurrence — so Previous / Next stop on each one,
 * highlighting it in turn, the way the study guide walks its links.
 */
export function mentionWalk(names: readonly string[]): {
  list: { kind: 'concept'; name: string }[]
  occurrences: { name: string; occurrence: number }[]
} {
  const list: { kind: 'concept'; name: string }[] = []
  const seen = new Map<string, number>()
  const occurrences: { name: string; occurrence: number }[] = []
  for (const name of names) {
    if (!name) continue
    const key = name.toLowerCase()
    const count = seen.get(key)
    if (count === undefined) list.push({ kind: 'concept', name })
    occurrences.push({ name, occurrence: count ?? 0 })
    seen.set(key, (count ?? 0) + 1)
  }
  return { list, occurrences }
}
