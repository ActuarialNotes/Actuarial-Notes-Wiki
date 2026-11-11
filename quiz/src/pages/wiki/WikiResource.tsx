import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { resourceRepoPath } from '@/lib/resourceFolders'
import { fromSlug, RESOURCES_ROUTE, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { useWikiPage } from '@/hooks/useWikiPage'
import { useWikiPageHead } from '@/hooks/useWikiPageHead'
import { useStandalonePage } from '@/hooks/useStandalonePage'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { parseVerification } from '@/lib/verification'
import { ResourceReferenceCard } from '@/components/wiki/ResourceReferenceCard'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { backLabel, useBack } from '@/hooks/useBack'
import { extractSyllabusAssignments, parseResourceMeta, RESOURCE_ARTICLE_CLASS, preprocessResourceMarkdown } from '@/lib/resourceMeta'
import { ResourceAssumptionsCard } from '@/components/wiki/ResourceAssumptionsCard'

export default function WikiResource() {
  const { slug = '' } = useParams()
  const resourceName = fromSlug(slug)
  const { setPageRefs, setExamId } = useWikiPage()
  const navigate = useNavigate()
  const back = useBack({ to: RESOURCES_ROUTE, label: 'All resources' })
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  useWikiPageHead('resource', resourceName, status === 'error')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setContent(null)
    fetchWikiFile(resourceRepoPath(resourceName))
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

  // Read on its own, the page behaves as it does in the popup: the title opens
  // its action menu, and a link opens in the popup over the page.
  const resourceEntry = useMemo<WikiEntryRef>(() => ({ kind: 'resource', name: resourceName }), [resourceName])
  const standalonePage = useStandalonePage(resourceEntry, content, pageRefs, resourceRepoPath(resourceName))

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

      {/* The reference card: what the document is, how to get it, its Fact
          Check verdict, and the exams it is a reading for. */}
      {meta && (
        <>
          <ResourceReferenceCard
            meta={meta}
            assignments={syllabusAssignments}
            verification={content ? parseVerification(content) : null}
            contentPath={resourceRepoPath(resourceName)}
            contentName={resourceName}
            onOpen={ref => navigate(wikiRoute(ref))}
            titleAction={standalonePage.titleAction}
          >
            <ResourceAssumptionsCard resource={resourceName} />
          </ResourceReferenceCard>
          {standalonePage.menu}
        </>
      )}

      {processedContent !== null && (
        <WikiArticle
          markdown={processedContent}
          className={RESOURCE_ARTICLE_CLASS}
          outlineItems
          sourcePath={resourceRepoPath(resourceName)}
          onWikiLink={standalonePage.onWikiLink}
        />
      )}
    </div>
  )
}
