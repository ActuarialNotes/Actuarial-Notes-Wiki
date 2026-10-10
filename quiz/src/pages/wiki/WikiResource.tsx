import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { fromSlug, RESOURCES_ROUTE, wikiRoute } from '@/lib/wikiRoutes'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { useWikiPageHead } from '@/hooks/useWikiPageHead'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { FactCheckBadge } from '@/components/FactCheckBadge'
import { parseVerification } from '@/lib/verification'
import { ResourceMetaCard } from '@/components/wiki/ResourceMetaCard'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { backLabel, useBack } from '@/hooks/useBack'
import { extractSyllabusAssignments, isNumberedOutline, OUTLINE_ARTICLE_CLASS, parseResourceMeta, preprocessResourceMarkdown } from '@/lib/resourceMeta'
import { ResourceSyllabusCard } from '@/components/wiki/ResourceSyllabusCard'

export default function WikiResource() {
  const { slug = '' } = useParams()
  const resourceName = fromSlug(slug)
  const { setPageRefs, setExamId } = useWikiPage()
  const { openAt } = useConceptPopup()
  const navigate = useNavigate()
  const back = useBack({ to: RESOURCES_ROUTE, label: 'All resources' })
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  useWikiPageHead('resource', resourceName, status === 'error')

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

  const syllabusAssignments = useMemo(
    () => (content ? extractSyllabusAssignments(content).assignments : []),
    [content],
  )

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
      {/* Back to the page this reading was opened from — an exam's Source
          Material, a search — or up to the shelf for a reader who landed here. */}
      <Link to={back.to} state={RESTORE_SCROLL} onClick={back.onLinkClick} aria-label={backLabel(back)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> {back.label}
      </Link>

      {status === 'loading' && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}
      {status === 'error' && (
        <p className="text-sm text-muted-foreground">Couldn't load {resourceName}.</p>
      )}

      {/* The citation block: the metadata card, and under it the exams it is
          a reading for — one column, one width. */}
      {meta && (
        <div className="flex w-fit max-w-full flex-col gap-3">
          <ResourceMetaCard meta={meta} className="mb-0 w-full" />
          <ResourceSyllabusCard
            assignments={syllabusAssignments}
            onOpen={ref => navigate(wikiRoute(ref))}
            className="mb-0"
          />
        </div>
      )}

      {processedContent !== null && (
        <WikiArticle
          markdown={processedContent}
          className={isNumberedOutline(processedContent) ? OUTLINE_ARTICLE_CLASS : undefined}
          sourcePath={`Resources/Books/${resourceName}.md`}
          titleBadge={
            content && (
              <FactCheckBadge
                verification={parseVerification(content)}
                contentPath={`Resources/Books/${resourceName}.md`}
                contentName={resourceName}
              />
            )
          }
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
