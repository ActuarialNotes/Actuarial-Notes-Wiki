import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { Components } from 'react-markdown'
import { calloutComponents } from '@/components/MarkdownCallout'
import { hrefToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'

// Obsidian wikilinks come through react-markdown as plain text (`[[Name]]`).
// react-markdown won't turn them into links on its own, so we rewrite the
// markdown before rendering to proper `[Name](/wiki/concept/Name)` syntax.
// Aliased links (`[[Target|Display]]`) are preserved.
export function rewriteWikilinks(md: string): string {
  return md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_full, target: string, display?: string) => {
    const t = target.trim()
    const label = (display ?? '').trim() || (t.includes('/') ? t.split('/').pop()! : t)
    const ref = hrefToEntryRef(t) ?? { kind: 'concept' as const, name: t }
    const href = wikiRoute(ref)
    // Escape bracket/paren characters in the display label so markdown
    // doesn't mis-parse nested punctuation like "Independence|Independent".
    const safeLabel = label.replace(/[[\](\\)]/g, '\\$&')
    return `[${safeLabel}](${href})`
  })
}

export interface WikiArticleProps {
  markdown: string
  // Called for every internal wiki link click — return true to suppress the
  // default React Router navigation (e.g. the popup swaps its body instead).
  onWikiLink?: (ref: WikiEntryRef, event: React.MouseEvent<HTMLAnchorElement>) => boolean | void
  className?: string
}

export function WikiArticle({ markdown, onWikiLink, className }: WikiArticleProps) {
  const navigate = useNavigate()
  const processed = useMemo(() => rewriteWikilinks(stripFrontmatter(markdown)), [markdown])

  const components = useMemo<Components>(() => ({
    ...calloutComponents,
    a({ href, children, ...rest }) {
      if (!href) return <a {...rest}>{children}</a>
      const ref = hrefToEntryRef(href)
      if (!ref) {
        // External link — open in new tab.
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

  return (
    <div
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
