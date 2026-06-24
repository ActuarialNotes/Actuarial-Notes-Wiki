import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { fromSlug } from '@/lib/wikiRoutes'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { ResourceMetaCard } from '@/components/wiki/ResourceMetaCard'
import { parseResourceMeta, preprocessResourceMarkdown } from '@/lib/resourceMeta'

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
    return preprocessResourceMarkdown(content)
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
      <Link to="/wiki" state={{ fromResource: true }} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
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
