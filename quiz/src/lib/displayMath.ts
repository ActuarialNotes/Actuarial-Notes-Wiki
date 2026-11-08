/**
 * Typeset the vault's formula boxes at display size.
 *
 * The vault writes a boxed formula the Obsidian way, `> $$…$$` on one line.
 * Obsidian draws that as display math; remark-math reads it as *inline* math
 * (a fence is display math only when `$$` stands alone on its line), so KaTeX
 * typesets it in text style: an integral sign the height of a capital letter
 * with its limits squeezed beside it, a sum or product with its index beside
 * it instead of under it, every `\frac` and `\binom` shrunk to script size.
 * That is the formula every concept page leads with, drawn as if it were a
 * symbol in a sentence.
 *
 * This remark plugin finds every `$$`-delimited math span written on a line of
 * its own — at the top level of a page or in a blockquote, which is where a
 * formula box and a worked example's lines of working live — prefixes its
 * LaTeX with `\displaystyle`, and breaks the line either side of it when it
 * shares a paragraph with other lines. The formula is still an inline `.katex`,
 * so `[data-math-block]`, math focus and the scroll CSS behave exactly as
 * before; only the style KaTeX lays it out in changes.
 *
 * Deliberately left alone: a single-dollar span (`$x$` alone on a line is a
 * symbol, not a formula), a `$$…$$` span inside running text (vaultMath.ts
 * promotes `$\$400$` to `$$\$400$$`, which must stay inline), and anything in
 * a list item or table cell (answer options, table entries — display style
 * there would blow the row up).
 */

/** The prefix this plugin adds. Exported for the tests. */
export const DISPLAY_STYLE = '\\displaystyle '

interface Point { offset?: number }
interface MdNode {
  type: string
  value?: string
  children?: MdNode[]
  position?: { start: Point; end: Point }
  data?: { hChildren?: { type: string; value?: string }[] }
}

/** Containers a formula box can sit directly inside. */
const BOX_PARENTS = new Set(['root', 'blockquote'])

/** Was this math span written with `$$` fences (as opposed to `$`)? */
function writtenAsDisplay(node: MdNode, source: string): boolean {
  const start = node.position?.start.offset
  const end = node.position?.end.offset
  if (start === undefined || end === undefined) return false
  return source.startsWith('$$', start) && source.slice(end - 2, end) === '$$'
}

/** Does the sibling before a span end its line (or is there none)? */
function endsLine(node: MdNode | undefined): boolean {
  if (!node) return true
  if (node.type === 'break') return true
  return node.type === 'text' && /\n[ \t]*$/.test(node.value ?? '')
}

/** Does the sibling after a span start a new line (or is there none)? */
function startsLine(node: MdNode | undefined): boolean {
  if (!node) return true
  if (node.type === 'break') return true
  return node.type === 'text' && /^[ \t]*\n/.test(node.value ?? '')
}

/** A `$$` span written on a line of its own within its paragraph. */
function isFormulaLine(kids: MdNode[], i: number, source: string): boolean {
  const node = kids[i]
  return node.type === 'inlineMath' && writtenAsDisplay(node, source) && endsLine(kids[i - 1]) && startsLine(kids[i + 1])
}

/**
 * Typeset a paragraph's formula lines in display style, each on a line of its
 * own. Markdown reads a line break inside a paragraph as a space, so a formula
 * written under a line of prose — or under another formula, as worked examples
 * stack their lines of working — runs on from it; a hard break (`<br>`) either
 * side of the formula keeps it on the line its author gave it, without the gap
 * a paragraph of its own would open.
 */
function displayFormulaLines(paragraph: MdNode, source: string): void {
  const kids = paragraph.children ?? []
  const lines = kids.map((_, i) => isFormulaLine(kids, i, source))
  if (!lines.some(Boolean)) return
  const out: MdNode[] = []
  kids.forEach((child, i) => {
    if (!lines[i]) return void out.push(child)
    toDisplayStyle(child)
    // Between two formula lines there is only the newline, already followed
    // by a break: a second would open an empty line. The newline stays — the
    // callout parser reads a title line up to it.
    const prev = out.findLast(node => node.type !== 'text' || (node.value ?? '').trim() !== '')
    if (prev && prev.type !== 'break') out.push({ type: 'break' })
    out.push(child)
    const next = kids[i + 1]
    if (next && next.type !== 'break' && !lines[i + 1]) out.push({ type: 'break' })
  })
  paragraph.children = out
}

function toDisplayStyle(math: MdNode): void {
  const value = math.value ?? ''
  if (value.trimStart().startsWith('\\displaystyle')) return
  const next = DISPLAY_STYLE + value
  math.value = next
  // remark-math copies the value into the hast children rehype-katex reads.
  const text = math.data?.hChildren?.find(child => child.type === 'text')
  if (text) text.value = next
}

function walk(node: MdNode, source: string): void {
  for (const child of node.children ?? []) {
    if (child.type === 'paragraph') {
      if (BOX_PARENTS.has(node.type)) displayFormulaLines(child, source)
    } else walk(child, source)
  }
}

/** The remark plugin. Run it after `remark-math`. */
export function remarkDisplayFormulaBoxes() {
  return (tree: unknown, file: { value?: unknown }) => {
    walk(tree as MdNode, String(file.value ?? ''))
  }
}
