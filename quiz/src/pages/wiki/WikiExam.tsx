import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { fromSlug, examIdFromFile } from '@/lib/wikiRoutes'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { WikiArticle } from '@/components/wiki/WikiArticle'

export default function WikiExam() {
  const { slug = '' } = useParams()
  const examFileName = fromSlug(slug)
  const { setPageRefs, setExamId } = useWikiPage()
  const { openAt } = useConceptPopup()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setContent(null)
    fetchWikiFile(`${examFileName}.md`)
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
  }, [examFileName])

  const pageRefs = useMemo(
    () => (content ? extractWikiLinksFromText(content) : []),
    [content],
  )

  useEffect(() => {
    setExamId(examIdFromFile(examFileName))
    setPageRefs(pageRefs)

    // When arriving from a search result, auto-open the requested concept in
    // the popup and then clean up the query param from the URL.
    const conceptToOpen = searchParams.get('openConcept')
    if (conceptToOpen && pageRefs.length > 0) {
      const conceptList = pageRefs
        .filter(r => r.kind === 'concept')
        .filter(r => !/ \([^)]*\d{4}\)$/.test(r.name))
      if (conceptList.length > 0) {
        const idx = conceptList.findIndex(
          r => r.name.toLowerCase() === conceptToOpen.toLowerCase(),
        )
        openAt(conceptList, idx >= 0 ? idx : 0, `${examFileName}.md`)
        navigate(location.pathname, { replace: true })
      }
    }
  }, [pageRefs, examFileName, setExamId, setPageRefs, searchParams, navigate, location.pathname, openAt])

  return (
    <div className="space-y-4">
      <Link to="/wiki" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> All exams
      </Link>

      {status === 'loading' && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading {examFileName}…
        </div>
      )}
      {status === 'error' && (
        <p className="text-sm text-muted-foreground">Couldn't load {examFileName}.</p>
      )}

      {content !== null && (
        <WikiArticle
          markdown={content}
          sourcePath={`${examFileName}.md`}
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
              `${examFileName}.md`,
            )
            return true
          }}
        />
      )}
    </div>
  )
}
