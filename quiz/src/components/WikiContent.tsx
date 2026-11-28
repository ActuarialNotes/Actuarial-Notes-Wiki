import { useState, type MouseEvent } from 'react'
import { openConceptOverlay } from '@/hooks/useConceptPopup'
import { Link } from 'react-router-dom'
import { ChevronRight, Loader2, ExternalLink } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { hrefToEntryRef, wikiRoute } from '@/lib/wikiRoutes'
import { WikiArticle } from '@/components/wiki/WikiArticle'

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
  const entry = hrefToEntryRef(link) ?? { kind: 'concept' as const, name: title }
  const fullPageRoute = wikiRoute(entry)
  // A concept's whole page is read in the reader, over this one.
  function readHere(e: MouseEvent<HTMLAnchorElement>) {
    if (entry.kind !== 'concept') return
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    openConceptOverlay([entry.name], 0, { raised: true })
  }

  async function handleToggle() {
    const nextOpen = !open
    setOpen(nextOpen)
    if (nextOpen && content === null && status === 'idle') {
      setStatus('loading')
      try {
        const raw = await fetchWikiFile(linkToRepoPath(link))
        setContent(raw)
        setStatus('idle')
      } catch {
        setStatus('error')
      }
    }
  }

  return (
    <div className="rounded-md bg-background/60">
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
        <div className="px-4 py-3 text-sm">
          {status === 'loading' && (
            <p className="text-muted-foreground text-xs">Loading…</p>
          )}
          {status === 'error' && (
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs">
                Couldn't load this wiki page.
              </p>
              <Link
                to={fullPageRoute}
                onClick={readHere}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Open in wiki
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          )}
          {content !== null && (
            <>
              <WikiArticle markdown={content} className="prose-sm prose-headings:mt-3 prose-headings:mb-1 prose-p:my-2" />
              <Link
                to={fullPageRoute}
                onClick={readHere}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
              >
                Open full page
                <ExternalLink className="h-3 w-3" />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
