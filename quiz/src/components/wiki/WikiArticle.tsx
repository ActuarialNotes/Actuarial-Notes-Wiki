import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { Components } from 'react-markdown'
import { calloutComponents } from '@/components/MarkdownCallout'
import { hrefToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { isInWikiIndex } from '@/lib/wikiIndex'
import { useConceptPopup } from '@/hooks/useConceptPopup'

const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO as string
const GITHUB_BRANCH = import.meta.env.VITE_GITHUB_BRANCH as string
const IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|avif)$/i

function rawGithubUrl(path: string): string {
  const clean = path.replace(/^\/+/, '')
  const encoded = clean.split('/').map(encodeURIComponent).join('/')
  return `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${encoded}`
}

function escapeMarkdownLabel(label: string): string {
  // Escape markdown-significant punctuation so labels like "Expected *Value*"
  // or "Std. (σ)" don't turn into emphasis/groups inside the generated link.
  return label.replace(/[\\\[\]()*_`{}]/g, '\\$&')
}

// CommonMark rule: ordered lists starting with N≠1 cannot interrupt a paragraph.
// Items like "8. Explain…" directly following a paragraph line get swallowed into
// that paragraph as plain text. Fix: insert a blank blockquote line (">") before
// any "> N. " item (N≠1) that immediately follows a non-blank, non-heading,
// non-list blockquote line.
export function ensureListSpacing(md: string): string {
  return md.replace(
    /^(> (?!#{1,6} )(?!\d+\. )(?![-*+] )[^\n]*\S[^\n]*)\n(> (?!1\. )\d+\. )/gm,
    '$1\n>\n$2',
  )
}

// Preprocess the markdown before react-markdown:
//   ![[Path/To/Image.png]]  → standard image with a raw.githubusercontent URL
//   ![[Some Note]]          → "📎 Some Note" link to the wiki route
//   [[Target|Display]]      → [Display](/wiki/concept/Target)
//   [[Target]]              → [Target](/wiki/concept/Target)
// Runs `!` (embeds) first so the inner [[...]] isn't consumed by the second pass.
export function rewriteWikilinks(md: string): string {
  const embedded = md.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_full, target: string, display?: string) => {
    const t = target.trim()
    const label = (display ?? '').trim() || (t.includes('/') ? t.split('/').pop()! : t)
    if (IMAGE_EXT_RE.test(t)) {
      const src = rawGithubUrl(t)
      return `![${escapeMarkdownLabel(label)}](${src})`
    }
    const ref = hrefToEntryRef(t) ?? { kind: 'concept' as const, name: t }
    return `[📎 ${escapeMarkdownLabel(label)}](${wikiRoute(ref)})`
  })

  return embedded.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_full, target: string, display?: string) => {
    const t = target.trim()
    const label = (display ?? '').trim() || (t.includes('/') ? t.split('/').pop()! : t)
    const ref = hrefToEntryRef(t) ?? { kind: 'concept' as const, name: t }
    return `[${escapeMarkdownLabel(label)}](${wikiRoute(ref)})`
  })
}

export function extractImages(markdown: string): Array<{ src: string; alt: string; caption: string }> {
  const raw = stripFrontmatter(markdown).replace(BREADCRUMB_RE, '')
  const lines = raw.split('\n')
  const re = /!\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\][ \t]*(.*)/
  const results: Array<{ src: string; alt: string; caption: string }> = []

  for (let i = 0; i < lines.length; i++) {
    const m = re.exec(lines[i])
    if (!m) continue
    const target = m[1].trim()
    if (!IMAGE_EXT_RE.test(target)) continue
    const display = m[2]?.trim() ?? ''
    const alt = display || (target.includes('/') ? target.split('/').pop()! : target)
    const src = rawGithubUrl(target)
    let caption = m[3].trim()
    // If no inline caption, check the very next line for plain-text caption
    if (!caption && i + 1 < lines.length) {
      const next = lines[i + 1].trim()
      if (
        next &&
        !next.startsWith('#') &&
        !next.startsWith('![[') &&
        !next.startsWith('[[') &&
        !next.startsWith('```') &&
        !next.startsWith('>') &&
        !next.startsWith('---') &&
        !/^[-*+] /.test(next) &&
        !/^\d+\. /.test(next)
      ) {
        // Strip surrounding emphasis markers commonly used for captions
        caption = next.replace(/^\*(.+)\*$/, '$1').replace(/^_(.+)_$/, '$1')
      }
    }
    results.push({ src, alt, caption })
  }

  return results
}

export interface WikiArticleProps {
  markdown: string
  // Called for every internal wiki link click — return true to suppress the
  // default React Router navigation (e.g. the popup swaps its body instead).
  onWikiLink?: (ref: WikiEntryRef, event: React.MouseEvent<HTMLAnchorElement>) => boolean | void
  // Repo path of the file this article was built from. When the concept popup
  // is open with a matching `sourcePath`, the active wikilink on this page is
  // highlighted and scrolled into view.
  sourcePath?: string
  // When true, images are not rendered inline (used when a gallery button is shown instead).
  hideImages?: boolean
  className?: string
  /** Optional node rendered inline after the H1 title (e.g. an exam status badge). */
  titleBadge?: React.ReactNode
}

function refKey(ref: WikiEntryRef): string {
  return `${ref.kind}:${ref.name.toLowerCase()}`
}

// Breadcrumb navigation lines written by Obsidian Publish (first line of every
// file): [[Actuarial Notes Wiki|Wiki]] / **Exam P-1 (SOA)**
// or [[Wiki]] / [[Concepts]] / **Concept Name**
// These are not wanted in the quiz app and add non-existent "concepts" to popup lists.
export const BREADCRUMB_RE = /^\[\[[^\]|]*(?:\|[^\]]+)?\]\][^\n]* \/ [^\n]*\n?/

// Insert a blank blockquote line before a numbered-list item that immediately
// follows a paragraph line in the same blockquote, so remark-gfm creates <ol>
// instead of treating the number as continuation text.
function fixBlockquoteOrderedLists(md: string): string {
  return md.replace(
    /^(> *(?!\d+\. )[^\n]+)\n(> *\d+\. )/gm,
    '$1\n>\n$2',
  )
}

// Strip block-level HTML divs that publish.js embeds for metadata / layout.
// react-markdown renders them as literal text without rehype-raw, so they must
// be removed before parsing.
function stripHtmlBlocks(md: string): string {
  return md
    // Multi-line block divs at line start (exam-nav, concept-nav, SVG wrappers …)
    .replace(/^<div\b[\s\S]*?<\/div> *\n?/gm, '')
    // Single-line divs inside blockquote lines (highlight-upcoming)
    .replace(/^> *<div\b.*?<\/div> *\n?/gm, '')
}

export function WikiArticle({ markdown, onWikiLink, sourcePath, hideImages, className, titleBadge }: WikiArticleProps) {
  const navigate = useNavigate()
  const articleRef = useRef<HTMLDivElement | null>(null)
  const processed = useMemo(() => {
    const stripped = stripFrontmatter(markdown).replace(BREADCRUMB_RE, '')
    return stripHtmlBlocks(fixBlockquoteOrderedLists(rewriteWikilinks(stripped)))
  }, [markdown])

  const popupOpen = useConceptPopup(s => s.open)
  const popupIndex = useConceptPopup(s => s.index)
  const popupSource = useConceptPopup(s => s.sourcePath)
  const popupCurrent = useConceptPopup(s => s.list[s.index])

  const components = useMemo<Components>(() => ({
    ...calloutComponents,
    h1({ children, ...rest }) {
      if (!titleBadge) return <h1 {...rest}>{children}</h1>
      return (
        <h1 {...rest} className="flex items-center gap-2 flex-wrap">
          <span>{children}</span>
          {titleBadge}
        </h1>
      )
    },
    img({ src, alt }) {
      if (hideImages) return null
      return <img src={src} alt={alt ?? ''} className="max-w-full" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
    },
    a({ href, children, ...rest }) {
      if (!href) return <a {...rest}>{children}</a>
      const ref = hrefToEntryRef(href)
      if (!ref) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
            {children}
          </a>
        )
      }
      const route = wikiRoute(ref)
      const exists = isInWikiIndex(ref.kind, ref.name)
      return (
        <a
          href={route}
          data-wikiref={refKey(ref)}
          {...rest}
          style={exists ? undefined : { textDecorationLine: 'none' }}
          onClick={e => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
            e.preventDefault()
            const suppressed = onWikiLink?.(ref, e)
            if (suppressed === true) return
            navigate(route)
          }}
        >
          {children}
        </a>
      )
    },
  }), [navigate, onWikiLink, hideImages, titleBadge])

  // Active-concept highlight: when the popup is open and its sourcePath
  // matches this article's sourcePath, find the matching wikilink in this
  // article's DOM, flag it with .wiki-link--active, and scroll it into view.
  useEffect(() => {
    const root = articleRef.current
    if (!root) return
    root.querySelectorAll('.wiki-link--active').forEach(el => el.classList.remove('wiki-link--active'))
    root.classList.remove('concept-focus-mode')
    if (!popupOpen || !popupCurrent) return
    // Focus mode only applies when the popup was opened from a specific wiki
    // page (popupSource is set). If null (e.g. opened from Dashboard or
    // Flashcards), no article should receive concept-focus-mode.
    if (!popupSource) return
    if (sourcePath && sourcePath !== popupSource) return
    // Use getAttribute comparison instead of CSS.escape to avoid any selector
    // escaping edge-cases (colons, spaces, quotes in concept names).
    const key = refKey(popupCurrent)
    // Source-material links in exam markdown are parsed as 'concept' kind by
    // hrefToEntryRef (bare names default to concept), but the popup stores them
    // as 'resource'. Check both keys so the highlight still finds the DOM node.
    const altKey =
      popupCurrent.kind === 'resource'
        ? `concept:${popupCurrent.name.toLowerCase()}`
        : popupCurrent.kind === 'concept'
        ? `resource:${popupCurrent.name.toLowerCase()}`
        : null
    const target = Array.from(root.querySelectorAll<HTMLElement>('[data-wikiref]'))
      .find(el => {
        const attr = el.getAttribute('data-wikiref')
        return attr === key || (altKey !== null && attr === altKey)
      }) ?? null
    if (!target) return
    target.classList.add('wiki-link--active')
    root.classList.add('concept-focus-mode')

    // Expand any collapsed callout ancestors so the target becomes visible.
    let node: HTMLElement | null = target.parentElement
    while (node && node !== root) {
      if (node.dataset.calloutBody !== undefined && node.hidden) {
        const toggle = node.parentElement?.querySelector<HTMLButtonElement>('[data-callout-toggle]')
        toggle?.click()
      }
      node = node.parentElement
    }

    function doScroll() {
      // --concept-split-height is set by ConceptPopup.useEffect which runs in
      // the same commit. Read it here (inside rAF) so it's already applied.
      const splitHeightStr = getComputedStyle(document.documentElement)
        .getPropertyValue('--concept-split-height').trim()
      const splitHeight = parseFloat(splitHeightStr) || 0
      const effectiveBottom = window.innerHeight - splitHeight
      // Account for the sticky floating search bar (h-14 = 56px) so concepts
      // near the top of the page aren't treated as "in view" when hidden behind it.
      const stickyOffset = 56
      const rect = target!.getBoundingClientRect()
      const inView = rect.top >= stickyOffset && rect.bottom <= effectiveBottom
      if (!inView) {
        // Center within the visible area between the sticky bar and popup panel.
        const visibleHeight = effectiveBottom - stickyOffset
        const scrollBy = rect.top - stickyOffset - (visibleHeight / 2 - rect.height / 2)
        window.scrollBy({ top: scrollBy, behavior: 'smooth' })
      }
    }

    // Always defer via double rAF so that:
    // 1. ConceptPopup.useEffect has run and set --concept-split-height.
    // 2. Any callout re-renders have been committed and laid out.
    requestAnimationFrame(() => requestAnimationFrame(doScroll))
  }, [popupOpen, popupIndex, popupSource, popupCurrent, sourcePath])

  return (
    <div
      ref={articleRef}
      data-source-page={sourcePath}
      className={
        'prose dark:prose-invert max-w-none ' +
        'prose-headings:mt-6 prose-headings:mb-2 prose-headings:font-semibold ' +
        'prose-h3:text-base prose-h3:font-medium ' +
        'prose-p:my-2.5 prose-p:leading-relaxed ' +
        'prose-a:text-primary prose-a:underline ' +
        'prose-li:my-0.5 prose-ul:my-2 prose-ol:my-2 ' +
        'prose-strong:font-semibold ' +
        '[&_li::marker]:text-muted-foreground ' +
        (className ?? '')
      }
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {processed}
      </ReactMarkdown>
    </div>
  )
}

export function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\n[\s\S]*?\n---\n?/, '')
}

const CALLOUT_TYPE_RE = /^\s*\[!/

export function extractMathBlockquotes(raw: string): string[] {
  const md = stripFrontmatter(raw).replace(BREADCRUMB_RE, '')
  const lines = md.split('\n')
  const result: string[] = []
  let blockLines: string[] = []

  function flush() {
    if (blockLines.length === 0) return
    const stripped = blockLines.map(l => l.replace(/^>[ \t]?/, '')).join('\n')
    if (!CALLOUT_TYPE_RE.test(stripped) && stripped.includes('$$')) {
      result.push(blockLines.join('\n'))
    }
    blockLines = []
  }

  for (const line of lines) {
    if (line.startsWith('>')) {
      blockLines.push(line)
    } else {
      flush()
    }
  }
  flush()

  return result
}
