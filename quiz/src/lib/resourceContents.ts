import type { Element, ElementContent, Root, RootContent } from 'hast'

/**
 * A resource page's **Contents**: the document's own divisions, folded when
 * there are many of them (docs/resource-page-v2.md, phase 1).
 *
 * A resource page is a lead, then one `##` per division of the document, then
 * `## Related readings` and `## Sources`. On a textbook the divisions are its
 * table of contents, often a hundred rows, so a reader looking for what the
 * book is and how to get it scrolled past all of it. This rehype plugin
 * gathers the divisions into one `<section class="resource-contents">` and,
 * when the outline is long, makes each chapter a `<details>` that opens on its
 * own. A short one (an ASOP's six sections) is left open.
 *
 * It only regroups what the page holds: every heading, row and link is still in
 * the tree, in the same order, so search, the heading anchors
 * (`[[Page#Heading]]`), the Listen view (which reads the markdown) and the
 * static SEO page (which never runs this) see the whole outline.
 *
 * One more fold: on a book whose chapters are numbered, a heading with nothing
 * under it before the first chapter or after the last that names front or back
 * matter (Preface, Index, Answers to Selected Problems — `isMatterHeading`)
 * becomes part of one line, "Also included: …". An empty heading between two numbered
 * ones, or on a page whose sections aren't numbered (an appendix label doesn't
 * count), is a division of the document in its own right and stays a row.
 */

/** More rows than this and the chapters start folded (decision D-RP1). */
export const CONTENTS_FOLD_AT = 12

/** The sections after the document's own divisions. */
const TAIL_HEADINGS = new Set(['related readings', 'sources'])

// "1 Combinatorial Analysis", "A.2 …", "B. …", "Chapter 3 …", "Part II …", "Section 4.1 …".
// A lone capital is a word ("A Note on …"), not a label, unless punctuated.
const NUMBERED_RE = /^(?:(?:[Cc]hapter|[Pp]art|[Ss]ection|[Aa]ppendix|[Mm]odule|[Uu]nit)\s+)?(?:\d{1,3}(?:\.\d+)*[.:)]?|[IVXLC]+[.:)]?|[A-Z](?:\.\d+)+[.:)]?|[A-Z][.:)])\s+\S/

export const CONTENTS_CLASS = 'resource-contents'
export const CHAPTER_CLASS = 'resource-chapter'
export const MATTER_CLASS = 'resource-matter'
export const CONTENTS_TITLE_ID = 'contents'

export interface ContentsDivision {
  heading: Element
  body: ElementContent[]
}

export interface ContentsPlan {
  /** Index of the first division's heading among the root's children. */
  start: number
  /** Index after the last division (where the tail, or the end, begins). */
  end: number
  divisions: ContentsDivision[]
  /** Headings folded into "Also included". */
  matter: string[]
  /** How many rows the outline holds: list items, paragraphs, empty headings. */
  rows: number
  folded: boolean
  numbered: boolean
}

export function textOf(node: RootContent | ElementContent): string {
  if (node.type === 'text') return node.value
  if (node.type === 'element') return node.children.map(textOf).join('')
  return ''
}

function isH2(node: RootContent): node is Element {
  return node.type === 'element' && node.tagName === 'h2'
}

function isBlank(node: ElementContent): boolean {
  return node.type === 'text' ? node.value.trim() === '' : node.type === 'comment'
}

function countRows(nodes: ElementContent[]): number {
  let n = 0
  const walk = (node: ElementContent) => {
    if (node.type !== 'element') return
    if (node.tagName === 'li' || node.tagName === 'p') n++
    node.children.forEach(walk)
  }
  nodes.forEach(walk)
  return n
}

/** Whether a heading's text numbers itself ("1 Combinatorial Analysis"). */
export function isNumberedHeading(text: string): boolean {
  return NUMBERED_RE.test(text.trim())
}

// Front and back matter by name. A list, not a rule, because an empty
// unnumbered heading is as often a real division ("Executive Summary",
// "Appendix D The Marriage of ERM and DFA") as it is a book's preface.
const MATTER_RE = /^(?:preface\b.*|foreword|prologue|epilogue|postface|(?:subject |author )?index|index of notation|notation|references|bibliography|endnotes|acknowledge?ments|glossary(?: of terms)?|list of (?:figures|tables|acronyms|abbreviations)|about (?:the|this) (?:authors?|editors?|book)|answers to (?:the )?(?:selected problems|text exercises)|solutions to self-test problems and exercises)$/i

/** Whether a heading names a book's front or back matter (Preface, Index, …). */
export function isMatterHeading(text: string): boolean {
  return MATTER_RE.test(text.trim())
}

/** A numbered chapter, not an appendix: what makes a page a numbered book. */
export function isChapterHeading(text: string): boolean {
  return isNumberedHeading(text) && !/^appendix\b/i.test(text.trim())
}

/** What the plugin would do to this tree, without doing it. Null: no divisions. */
export function planContents(tree: Root, foldAt = CONTENTS_FOLD_AT): ContentsPlan | null {
  const kids = tree.children
  const start = kids.findIndex(isH2)
  if (start < 0) return null
  let end = kids.length
  for (let i = start; i < kids.length; i++) {
    const k = kids[i]
    if (isH2(k) && TAIL_HEADINGS.has(textOf(k).trim().toLowerCase())) {
      end = i
      break
    }
  }
  if (end === start) return null

  const all: ContentsDivision[] = []
  for (let i = start; i < end; i++) {
    const k = kids[i]
    if (isH2(k)) all.push({ heading: k, body: [] })
    else all[all.length - 1].body.push(k as ElementContent)
  }

  // A book numbers its chapters; an appendix label alone ("Appendix 1: …" on a
  // paper whose sections are unnumbered) doesn't make the page a numbered one.
  const texts = all.map(d => textOf(d.heading).trim())
  const numbered = texts.some(isChapterHeading)
  const numberedAt = texts.map(isNumberedHeading)
  const first = numberedAt.indexOf(true)
  const last = numberedAt.lastIndexOf(true)
  const matter: string[] = []
  // Front and back matter: an empty, unnumbered heading before the first
  // numbered division or after the last. One in the middle of the run is a
  // division of the document and stays a row.
  const divisions = numbered
    ? all.filter((d, i) => {
        if (numberedAt[i] || (i > first && i < last) || !d.body.every(isBlank) || !isMatterHeading(texts[i])) return true
        matter.push(texts[i])
        return false
      })
    : all

  const rows = divisions.reduce((n, d) => n + (d.body.every(isBlank) ? 1 : countRows(d.body)), 0)
  return { start, end, divisions, matter, rows, folded: rows > foldAt, numbered }
}

function el(tagName: string, className: string | null, children: ElementContent[], props: Element['properties'] = {}): Element {
  return {
    type: 'element',
    tagName,
    properties: className ? { ...props, className: className.split(' ') } : props,
    children,
  }
}

function contentsSection(plan: ContentsPlan): Element {
  const noun = plan.numbered ? 'chapter' : 'section'
  // A book counts its chapters, not the appendices and tables beside them.
  const count = plan.numbered
    ? plan.divisions.filter(d => isChapterHeading(textOf(d.heading))).length
    : plan.divisions.length
  const title = el('p', `${CONTENTS_CLASS}-title`, [
    el('span', null, [{ type: 'text', value: 'Contents' }]),
    ...(plan.folded
      ? [el('span', `${CONTENTS_CLASS}-count`, [{ type: 'text', value: `${count} ${noun}${count === 1 ? '' : 's'}` }])]
      : []),
  ], { id: CONTENTS_TITLE_ID })

  const body: ElementContent[] = []
  for (const d of plan.divisions) {
    const empty = d.body.every(isBlank)
    if (!plan.folded) {
      body.push(d.heading, ...d.body)
    } else if (empty) {
      body.push(el('div', `${CHAPTER_CLASS} ${CHAPTER_CLASS}-empty`, [d.heading]))
    } else {
      body.push(el('details', CHAPTER_CLASS, [
        el('summary', null, [d.heading]),
        el('div', `${CHAPTER_CLASS}-body`, d.body),
      ]))
    }
  }
  if (plan.matter.length > 0) {
    body.push(el('p', MATTER_CLASS, [{ type: 'text', value: `Also included: ${plan.matter.join(', ')}` }]))
  }

  return el('section', plan.folded ? `${CONTENTS_CLASS} ${CONTENTS_CLASS}-folded` : CONTENTS_CLASS, [title, ...body], {
    ariaLabelledBy: CONTENTS_TITLE_ID,
  })
}

/** Regroup the tree in place. */
export function foldContents(tree: Root, foldAt = CONTENTS_FOLD_AT): void {
  const plan = planContents(tree, foldAt)
  if (!plan) return
  tree.children.splice(plan.start, plan.end - plan.start, contentsSection(plan))
}

/** The rehype plugin `WikiArticle` runs on resource pages. */
export function rehypeResourceContents() {
  return (tree: Root) => foldContents(tree)
}

/**
 * Open every folded chapter around an element, so a link to a heading (or a
 * highlighted mention) inside one is on screen before it is scrolled to.
 */
export function openAncestorDetails(el: Element | HTMLElement | null, stopAt?: HTMLElement | null): void {
  let node = (el as HTMLElement | null)?.parentElement ?? null
  while (node && node !== stopAt) {
    if (node.tagName === 'DETAILS' && !(node as HTMLDetailsElement).open) (node as HTMLDetailsElement).open = true
    node = node.parentElement
  }
}
