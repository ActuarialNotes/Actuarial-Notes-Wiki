import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { Components } from 'react-markdown'
import { calloutComponents } from '@/components/MarkdownCallout'
import { hrefToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
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

export interface WikiArticleProps {
  markdown: string
  // Called for every internal wiki link click — return true to suppress the
  // default React Router navigation (e.g. the popup swaps its body instead).
  onWikiLink?: (ref: WikiEntryRef, event: React.MouseEvent<HTMLAnchorElement>) => boolean | void
  // Repo path of the file this article was built from. When the concept popup
  // is open with a matching `sourcePath`, the active wikilink on this page is
  // highlighted and scrolled into view.
  sourcePath?: string
  className?: string
}

function refKey(ref: WikiEntryRef): string {
  return `${ref.kind}:${ref.name.toLowerCase()}`
}

export function WikiArticle({ markdown, onWikiLink, sourcePath, className }: WikiArticleProps) {
  const navigate = useNavigate()
  const articleRef = useRef<HTMLDivElement | null>(null)
  const processed = useMemo(() => rewriteWikilinks(stripFrontmatter(markdown)), [markdown])

  const popupOpen = useConceptPopup(s => s.open)
  const popupIndex = useConceptPopup(s => s.index)
  const popupSource = useConceptPopup(s => s.sourcePath)
  const popupCurrent = useConceptPopup(s => s.list[s.index])

  const components = useMemo<Components>(() => ({
    ...calloutComponents,
    a({ href, children, ...rest }) {
      if (!href) return <a {...rest}>{children}</a>
      const ref = hrefToEntryRef(href)
      if (!ref) {
        return (
          <a href={href} target="_blank" rel="noreferrer" {...rest}>
            {children}
          </a>
        )
      }
      const route = wikiRoute(ref)
      return (
        <a
          href={route}
          data-wikiref={refKey(ref)}
          {...rest}
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
  }), [navigate, onWikiLink])

  // Active-concept highlight: when the popup is open and its sourcePath
  // matches this article's sourcePath, find the matching wikilink in this
  // article's DOM, flag it with .wiki-link--active, and scroll it into view.
  useEffect(() => {
    const root = articleRef.current
    if (!root) return
    root.querySelectorAll('.wiki-link--active').forEach(el => el.classList.remove('wiki-link--active'))
    if (!popupOpen || !popupCurrent) return
    if (sourcePath && popupSource && sourcePath !== popupSource) return
    const target = root.querySelector<HTMLElement>(`[data-wikiref="${CSS.escape(refKey(popupCurrent))}"]`)
    if (!target) return
    target.classList.add('wiki-link--active')
    const rect = target.getBoundingClientRect()
    const inView = rect.top >= 0 && rect.bottom <= window.innerHeight
    if (!inView) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [popupOpen, popupIndex, popupSource, popupCurrent, sourcePath])

  return (
    <div
      ref={articleRef}
      data-source-page={sourcePath}
      className={
        'prose dark:prose-invert max-w-none ' +
        'prose-headings:mt-6 prose-headings:mb-2 prose-p:my-3 ' +
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline ' +
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
