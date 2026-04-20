import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { ChevronRight, Loader2, ExternalLink } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { buildWikiUrl } from '@/lib/wikiUrl'
import { calloutComponents } from '@/components/MarkdownCallout'

interface WikiContentProps {
  link: string
}

// Turn "Concepts/Force+of+Interest" → "Concepts/Force of Interest.md"
// and "/probability/bayes-theorem" → "probability/bayes-theorem.md".
function linkToRepoPath(link: string): string {
  const withoutLeadingSlash = link.replace(/^\/+/, '')
  const decoded = decodeURIComponent(withoutLeadingSlash.replace(/\+/g, ' '))
  return decoded.endsWith('.md') ? decoded : decoded + '.md'
}

function linkToTitle(link: string): string {
  const last = link.split('/').filter(Boolean).pop() ?? link
  return decodeURIComponent(last.replace(/\+/g, ' '))
}

export function WikiContent({ link }: WikiContentProps) {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const title = linkToTitle(link)

  async function handleToggle() {
    const nextOpen = !open
    setOpen(nextOpen)
    if (nextOpen && content === null && status === 'idle') {
      setStatus('loading')
      try {
        const raw = await fetchWikiFile(linkToRepoPath(link))
        // Strip YAML frontmatter if present
        const stripped = raw.replace(/^---\n[\s\S]*?\n---\n?/, '')
        setContent(stripped)
        setStatus('idle')
      } catch {
        setStatus('error')
      }
    }
  }

  return (
    <div className="rounded-md border bg-background/60">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm font-medium hover:bg-accent/40 transition-colors"
        aria-expanded={open}
      >
        <ChevronRight
          className={`h-4 w-4 transition-transform ${open ? 'rotate-90' : ''}`}
        />
        <span className="flex-1 truncate">{title}</span>
        {status === 'loading' && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
      </button>

      {open && (
        <div className="px-4 py-3 border-t text-sm">
          {status === 'loading' && (
            <p className="text-muted-foreground text-xs">Loading…</p>
          )}
          {status === 'error' && (
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs">
                Couldn't load this wiki page.
              </p>
              <a
                href={buildWikiUrl(link)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Open on wiki.actuarialnotes.com
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
          {content !== null && (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:mt-3 prose-headings:mb-1 prose-p:my-2">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={calloutComponents}
              >
                {content}
              </ReactMarkdown>
              <a
                href={buildWikiUrl(link)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline not-prose mt-2"
              >
                Open full page
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
