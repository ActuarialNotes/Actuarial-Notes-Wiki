/**
 * Sticky section headings for a concept page.
 *
 * Markdown renders a page flat: every `##` heading is a sibling of the
 * paragraphs under it. A sticky heading sticks for as long as its parent
 * lasts, so in a flat page the first `##` would stay pinned to the end of
 * the article, with each later one sliding over it. This rehype plugin wraps
 * each `##` and everything up to the next `##` in a `<section>`, so a
 * heading is pinned only while its own section is on screen and is pushed
 * off by the next one. Anything before the first `##` (the opening
 * definition, the formula, its bullets) stays where it is.
 *
 * Only the article's top level is grouped: a heading inside a callout or a
 * list belongs to that block, not to the page's outline.
 */

interface HastNode {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

export const ARTICLE_SECTION_CLASS = 'article-section'

export function groupSections<T extends HastNode>(tree: T): T {
  const children = tree.children ?? []
  if (!children.some(isH2)) return tree
  const out: HastNode[] = []
  let section: HastNode | null = null
  for (const child of children) {
    if (isH2(child)) {
      section = { type: 'element', tagName: 'section', properties: { className: [ARTICLE_SECTION_CLASS] }, children: [child] }
      out.push(section)
    } else if (section) {
      section.children!.push(child)
    } else {
      out.push(child)
    }
  }
  tree.children = out
  return tree
}

function isH2(node: HastNode): boolean {
  return node.type === 'element' && node.tagName === 'h2'
}

/** The rehype plugin: `rehypePlugins={[…, rehypeArticleSections]}`. */
export function rehypeArticleSections() {
  return (tree: HastNode) => { groupSections(tree) }
}
