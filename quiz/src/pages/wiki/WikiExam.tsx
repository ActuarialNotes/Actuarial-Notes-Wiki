import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { fromSlug, examIdFromFile, type WikiEntryRef } from '@/lib/wikiRoutes'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { WikiArticle } from '@/components/wiki/WikiArticle'

export default function WikiExam() {
  const { slug = '' } = useParams()
  const [searchParams] = useSearchParams()
  const conceptParam = searchParams.get('concept')
  const examFileName = fromSlug(slug)
  const { setPageRefs, setExamId } = useWikiPage()
  const openAt = useConceptPopup(s => s.openAt)
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const popupOpenedRef = useRef(false)

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
  }, [pageRefs, examFileName, setExamId, setPageRefs])

  const onWikiLink = useCallback((ref: WikiEntryRef, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ref.kind !== 'concept') return false
    if (/ \([^)]*\d{4}\)$/.test(ref.name)) {
      e.preventDefault()
      openAt([{ kind: 'resource', name: ref.name }], 0, undefined)
      return true
    }
    e.preventDefault()
    const conceptList = pageRefs
      .filter(r => r.kind === 'concept')
      .filter(r => !/ \([^)]*\d{4}\)$/.test(r.name))
    const idx = conceptList.findIndex(r => r.name.toLowerCase() === ref.name.toLowerCase())
    openAt(
      conceptList.length > 0 ? conceptList : [ref],
      idx >= 0 ? idx : 0,
      `${examFileName}.md`,
    )
    return true
  }, [pageRefs, examFileName, openAt])

  // Reset the opened flag whenever the exam or the requested concept changes.
  useEffect(() => {
    popupOpenedRef.current = false
  }, [examFileName, conceptParam])

  // When arriving from search with ?concept=, open the popup once pageRefs load.
  useEffect(() => {
    if (!conceptParam || pageRefs.length === 0 || popupOpenedRef.current) return
    popupOpenedRef.current = true
    const conceptList = pageRefs
      .filter(r => r.kind === 'concept')
      .filter(r => !/ \([^)]*\d{4}\)$/.test(r.name))
    const idx = conceptList.findIndex(
      r => r.name.toLowerCase() === conceptParam.toLowerCase(),
    )
    const openList = idx >= 0 ? conceptList : [{ kind: 'concept' as const, name: conceptParam }]
    openAt(openList, idx >= 0 ? idx : 0, `${examFileName}.md`)
  }, [conceptParam, pageRefs, examFileName, openAt])

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
          onWikiLink={onWikiLink}
        />
      )}
    </div>
  )
}
