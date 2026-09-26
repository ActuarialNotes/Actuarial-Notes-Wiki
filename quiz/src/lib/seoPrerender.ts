// The crawlable copy of a page.
//
// Every exam, concept and resource URL gets its own static HTML file at build
// time (`seoPagesPlugin` in vite.config.ts). Its <head> is the page's own —
// title, description, canonical, JSON-LD, from `lib/seo.ts` — and inside
// `#root` sits the article as plain HTML: headings, paragraphs, lists, tables,
// and every wiki link as a real <a href>. That is what a crawler that runs no
// JavaScript reads (most AI crawlers, social previews, Bing's first pass), and
// what Google's HTML-only first pass indexes before it renders the app.
//
// No reader ever sees it: `index.html` hides `#prerender` the moment scripting
// is on, and React replaces the contents of `#root` when it mounts. It is the
// same article the app renders, so there is nothing a crawler reads that a
// reader doesn't.
//
// Build-time only — nothing in the app imports this, so unified and friends
// stay out of the bundle. Imports are relative, for the vite config's graph.

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import type { Nodes } from 'hast'
import { hrefToEntryRef, wikiRoute } from './wikiRoutes'
import { normalizeVaultMath } from './vaultMath'
import { escapeHtml, headTagsHtml, pageBody, SITE_NAME, type PageHead, type SeoCrumb, type SeoPage } from './seo'

/** A route → the canonical path of the page it names, or nothing when there is none to link. */
export type LinkResolver = (route: string) => string | undefined

const HEAD_MARKERS_RE = /<!-- page-head -->[\s\S]*?<!-- \/page-head -->/
const ROOT_TAG = '<div id="root"></div>'

function escapeMarkdownLabel(label: string): string {
  return label.replace(/[\\[\]()*_`{}]/g, '\\$&')
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

/**
 * Vault markdown made plain CommonMark: comments, embeds and inline footnotes
 * dropped; a callout's header turned into a bold line (a learning objective
 * keeps its weight — "**General Probability (23–30%)**"); every [[wiki link]]
 * turned into a link to the page it names, at that page's canonical path —
 * or into plain text when it names no page worth sending a crawler to
 * (`resolve` returns nothing), so no crawl is spent on a missing page or an
 * unwritten stub.
 */
export function staticMarkdown(markdown: string, resolve: LinkResolver): string {
  const md = pageBody(markdown)
    .replace(/%%[\s\S]*?%%/g, '')
    .replace(/!\[\[[^\]]*\]\]/g, '')
    .replace(/\s*\^\[(?:[^[\]]|\[[^\]]*\])*\]/g, '')
    .replace(/^((?:>\s?)+)\[!(\w+)\][+-]?[ \t]*(.*)$/gm, (_m, quote: string, type: string, rawTitle: string) => {
      const title = rawTitle
        .replace(/\{([^}]*)\}/g, (_w, inner: string) => (/%/.test(inner) ? `(${inner.trim()})` : ''))
        .trim()
      return `${quote}**${title || capitalize(type)}**`
    })
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target: string, display?: string) => {
      const t = target.trim()
      const label = (display ?? '').trim() || (t.includes('/') ? t.split('/').pop()! : t)
      const ref = hrefToEntryRef(t) ?? { kind: 'concept' as const, name: t }
      const path = resolve(wikiRoute(ref))
      return path ? `[${escapeMarkdownLabel(label)}](${path})` : escapeMarkdownLabel(label)
    })
  return normalizeVaultMath(md)
}

const VOID_TAGS = new Set(['br', 'hr'])
// Everything else — task-list checkboxes, images, raw HTML — is left out.
const DROPPED_TAGS = new Set(['input', 'img', 'script', 'style', 'iframe', 'svg'])
const KEPT_ATTRIBUTES: Record<string, Record<string, string>> = {
  a: { href: 'href', title: 'title' },
  code: { className: 'class' },
  td: { align: 'align' },
  th: { align: 'align' },
  ol: { start: 'start' },
}

function attributes(tag: string, properties: Record<string, unknown> | undefined): string {
  const kept = KEPT_ATTRIBUTES[tag]
  if (!kept || !properties) return ''
  let out = ''
  for (const [prop, name] of Object.entries(kept)) {
    const value = properties[prop]
    if (value == null || value === false) continue
    const text = Array.isArray(value) ? value.join(' ') : String(value)
    out += ` ${name}="${escapeHtml(text)}"`
  }
  return out
}

/** A hast tree as HTML — only the tags and attributes an article needs. */
export function hastToHtml(node: Nodes): string {
  switch (node.type) {
    case 'root':
      return node.children.map(hastToHtml).join('')
    case 'text':
      return escapeHtml(node.value)
    case 'element': {
      const tag = node.tagName
      if (DROPPED_TAGS.has(tag)) return ''
      const open = `<${tag}${attributes(tag, node.properties as Record<string, unknown>)}>`
      if (VOID_TAGS.has(tag)) return open
      return `${open}${node.children.map(hastToHtml).join('')}</${tag}>`
    }
    default:
      return ''
  }
}

export function markdownToHtml(markdown: string): string {
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath).use(remarkRehype)
  const tree = processor.runSync(processor.parse(markdown)) as Nodes
  return hastToHtml(tree)
}

function crumbLink(crumb: SeoCrumb): string {
  return `<a href="${escapeHtml(crumb.path)}">${escapeHtml(crumb.name)}</a>`
}

/** "By Sheldon Ross · Pearson · 2019" — a resource's facts, over its outline. */
function byline(page: SeoPage): string {
  const w = page.work
  if (!w) return ''
  const parts = [
    w.author ? `By ${w.author}` : '',
    w.publisher && w.publisher !== w.author ? w.publisher : '',
    w.year ?? '',
    w.code ?? '',
  ].filter(Boolean)
  return parts.length ? `<p>${escapeHtml(parts.join(' · '))}</p>` : ''
}

export interface StaticBodyInput {
  page: SeoPage
  /** The page's vault markdown; absent for the hub. */
  markdown?: string
  resolve: LinkResolver
  /** The hub's listing: sections of links. */
  sections?: { heading: string; links: SeoCrumb[] }[]
}

/** The `#prerender` article that goes inside `#root`. */
export function staticBody(input: StaticBodyInput): string {
  const { page, markdown, resolve, sections = [] } = input
  const guides = page.guides ?? (page.parent ? [page.parent] : [])
  const crumbs: SeoCrumb[] = [{ name: 'Study Guides', path: '/wiki' }, ...(page.parent ? [page.parent] : [])]
  const nav = page.kind === 'hub'
    ? ''
    : `<nav aria-label="Breadcrumb">${[...crumbs.map(crumbLink), `<span>${escapeHtml(page.name)}</span>`].join(' › ')}</nav>`
  const article = markdown ? markdownToHtml(staticMarkdown(markdown, resolve)) : ''
  const heading = /^\s*<h1>/.test(article) ? '' : `<h1>${escapeHtml(page.name)}</h1>`
  const guideLinks = guides.length && page.kind !== 'exam'
    ? `<p>Study guide${guides.length === 1 ? '' : 's'}: ${guides.map(crumbLink).join(', ')}</p>`
    : ''
  const listing = sections
    .filter(s => s.links.length)
    .map(s => `<h2>${escapeHtml(s.heading)}</h2><ul>${s.links.map(l => `<li>${crumbLink(l)}</li>`).join('')}</ul>`)
    .join('')
  return [
    '<div id="prerender">',
    `<header><a href="/">${SITE_NAME}</a></header>`,
    nav,
    `<main><article>${heading}${byline(page)}${guideLinks}${article}${listing}</article></main>`,
    '</div>',
  ].join('')
}

/**
 * The app's built `index.html`, made one page's own: its head between the
 * `page-head` markers, its article inside `#root`. Throws rather than ship a
 * page with the site's generic head — the markers are load-bearing.
 */
export function renderStaticPage(template: string, head: PageHead, body: string): string {
  if (!HEAD_MARKERS_RE.test(template)) throw new Error('index.html has lost its <!-- page-head --> markers')
  if (!template.includes(ROOT_TAG)) throw new Error(`index.html has lost its empty ${ROOT_TAG}`)
  return template
    .replace(HEAD_MARKERS_RE, () => `<!-- page-head -->\n    ${headTagsHtml(head)}\n    <!-- /page-head -->`)
    .replace(ROOT_TAG, () => `<div id="root">${body}</div>`)
}
