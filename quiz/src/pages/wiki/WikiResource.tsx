import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ExternalLink, Loader2 } from 'lucide-react'
import fm from 'front-matter'
import { fetchWikiFile, rawGithubUrl } from '@/lib/github'
import { fromSlug } from '@/lib/wikiRoutes'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|avif)$/i

interface ResourceMeta {
  title?: string
  author?: string
  year?: string
  edition?: string
  publisher?: string
  isbn?: string
  type?: string
  code?: string
  coverImageUrl?: string
  getCopyUrl?: string
}

function extractUrl(value: string): string | undefined {
  const m = value.match(/\(([^)]+)\)/)
  return m ? m[1] : (value.startsWith('http') ? value : undefined)
}

function parseResourceMeta(raw: string): ResourceMeta {
  let attrs: Record<string, unknown> = {}
  try {
    attrs = fm<Record<string, unknown>>(raw).attributes ?? {}
  } catch {
    return {}
  }
  const str = (v: unknown) => (v != null ? String(v).trim() || undefined : undefined)

  const linkStr = str(attrs['Find at your local library at']) ?? str(attrs['Available from'])
  const getCopyUrl = linkStr ? extractUrl(linkStr) : undefined

  const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '')
  const imgMatch = /!\[\[([^\]|]+)\]\]/.exec(body)
  let coverImageUrl: string | undefined
  if (imgMatch) {
    const imgPath = imgMatch[1].trim()
    if (IMAGE_EXT_RE.test(imgPath)) {
      const resolved = imgPath.includes('/') ? imgPath : `Media/Attachments/${imgPath}`
      coverImageUrl = rawGithubUrl(resolved)
    }
  }

  return {
    title: str(attrs['Title']),
    author: str(attrs['Authors']) ?? str(attrs['Author']),
    year: str(attrs['Year']),
    edition: str(attrs['Edition']),
    publisher: str(attrs['Publisher']),
    isbn: str(attrs['ISBN']),
    type: str(attrs['Type']),
    code: str(attrs['Code']),
    coverImageUrl,
    getCopyUrl,
  }
}

// Remove the first cover image embed so it isn't duplicated below the card.
function stripFirstCoverImage(md: string): string {
  return md.replace(/!\[\[[^\]|]+\.(png|jpe?g|gif|svg|webp|avif)\]\][ \t]*\n?/i, '')
}

// Convert unordered list items (- …) to ordered list items (1. …) at every indent level.
function convertBulletsToOrdered(md: string): string {
  return md.replace(/^(\s*)-(\s)/gm, '$11.$2')
}

function ResourceMetaCard({ meta }: { meta: ResourceMeta }) {
  return (
    <div className="flex gap-4 rounded-lg border bg-card p-4 mb-4 not-prose">
      {meta.coverImageUrl && (
        <div className="flex-shrink-0 w-24 md:w-28">
          <img
            src={meta.coverImageUrl}
            alt={meta.title ?? 'Cover'}
            className="w-full rounded object-cover shadow-sm"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      )}
      <div className="flex flex-col gap-1.5 min-w-0">
        {meta.title && (
          <p className="text-base font-semibold leading-snug">{meta.title}</p>
        )}
        {meta.author && (
          <p className="text-sm text-muted-foreground leading-snug">{meta.author}</p>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-muted-foreground">
          {meta.year && <span>{meta.year}</span>}
          {meta.edition && <span>{meta.edition} ed.</span>}
          {meta.publisher && <span>{meta.publisher}</span>}
        </div>
        {meta.isbn && (
          <p className="text-xs text-muted-foreground">ISBN {meta.isbn}</p>
        )}
        {(meta.type || meta.code) && (
          <p className="text-xs text-muted-foreground">
            {[meta.type, meta.code].filter(Boolean).join(' · ')}
          </p>
        )}
        {meta.getCopyUrl && (
          <div className="mt-auto pt-1">
            <a
              href={meta.getCopyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              Get a Copy
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default function WikiResource() {
  const { slug = '' } = useParams()
  const resourceName = fromSlug(slug)
  const { setPageRefs, setExamId } = useWikiPage()
  const { openAt } = useConceptPopup()
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setContent(null)
    fetchWikiFile(`Resources/Books/${resourceName}.md`)
      .then(raw => {
        if (cancelled) return
        setContent(raw)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [resourceName])

  const meta = useMemo(() => (content ? parseResourceMeta(content) : null), [content])

  const processedContent = useMemo(() => {
    if (!content) return null
    return convertBulletsToOrdered(stripFirstCoverImage(content))
  }, [content])

  const pageRefs = useMemo(
    () => (content ? extractWikiLinksFromText(content) : []),
    [content],
  )

  useEffect(() => {
    setExamId(null)
    setPageRefs(pageRefs)
  }, [pageRefs, setExamId, setPageRefs])

  return (
    <div className="space-y-4">
      <Link to="/wiki" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> All resources
      </Link>

      {status === 'loading' && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}
      {status === 'error' && (
        <p className="text-sm text-muted-foreground">Couldn't load {resourceName}.</p>
      )}

      {meta && <ResourceMetaCard meta={meta} />}

      {processedContent !== null && (
        <WikiArticle
          markdown={processedContent}
          sourcePath={`Resources/Books/${resourceName}.md`}
          onWikiLink={(ref, e) => {
            if (ref.kind !== 'concept') return false
            e.preventDefault()
            const conceptList = pageRefs
              .filter(r => r.kind === 'concept')
              .filter(r => !/ \([^)]*\d{4}\)$/.test(r.name))
            const idx = conceptList.findIndex(
              r => r.name.toLowerCase() === ref.name.toLowerCase(),
            )
            openAt(
              conceptList.length > 0 ? conceptList : [ref],
              idx >= 0 ? idx : 0,
              `Resources/Books/${resourceName}.md`,
            )
            return true
          }}
        />
      )}
    </div>
  )
}
