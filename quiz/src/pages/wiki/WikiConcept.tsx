import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { fromSlug, wikiRoute } from '@/lib/wikiRoutes'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

function findSyllabusForConcept(
  syllabi: WikiExamSyllabus[],
  conceptName: string,
  preferredLabel?: string,
): WikiExamSyllabus | null {
  if (preferredLabel) {
    const exact = syllabi.find(s =>
      s.examLabel.toLowerCase().includes(preferredLabel.toLowerCase()),
    )
    if (exact && syllabusContainsConcept(exact, conceptName)) return exact
  }
  return syllabi.find(s => syllabusContainsConcept(s, conceptName)) ?? null
}

function syllabusContainsConcept(s: WikiExamSyllabus, name: string): boolean {
  const needle = name.toLowerCase()
  return s.topics.some(t => t.concepts.some(c => {
    if (c.name.toLowerCase() === needle) return true
    // Also match by the wikilink target (handles [[target|display alias]] cases)
    const targetBase = c.target.split('/').pop()?.replace(/\.md$/i, '').toLowerCase()
    return targetBase === needle
  }))
}

export default function WikiConcept() {
  const navigate = useNavigate()
  const { slug = '' } = useParams()
  const [params] = useSearchParams()
  const fromExam = params.get('from')
  const conceptName = fromSlug(slug)

  const { setPageRefs, setExamId } = useWikiPage()
  const { syllabi, loading: syllabiLoading } = useWikiSyllabus()
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  // Pick the exam this concept lives under — query param takes priority.
  const activeSyllabus = useMemo(
    () => findSyllabusForConcept(syllabi, conceptName, fromExam ?? undefined),
    [syllabi, conceptName, fromExam],
  )

  // Redirect to the exam's study guide with the popup open.
  // We wait until syllabi are loaded so we know definitively whether to redirect.
  useEffect(() => {
    if (syllabiLoading || !activeSyllabus) return
    const examName = activeSyllabus.fileName ?? activeSyllabus.examLabel
    navigate(
      `${wikiRoute({ kind: 'exam', name: examName })}?concept=${encodeURIComponent(conceptName)}`,
      { replace: true },
    )
  }, [syllabiLoading, activeSyllabus, conceptName, navigate])

  // Only fetch and display the standalone concept page when we know there's no
  // exam to redirect to (i.e. the concept isn't in any syllabus).
  const shouldShowConcept = !syllabiLoading && !activeSyllabus

  useEffect(() => {
    if (!shouldShowConcept) return
    let cancelled = false
    setStatus('loading')
    setContent(null)
    fetchWikiFile(`Concepts/${conceptName}.md`)
      .then(raw => {
        if (cancelled) return
        setContent(raw)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => { cancelled = true }
  }, [conceptName, shouldShowConcept])

  const pageRefs = useMemo(
    () => (content ? extractWikiLinksFromText(content) : []),
    [content],
  )

  useEffect(() => {
    setExamId(fromExam)
    setPageRefs(pageRefs)
  }, [pageRefs, fromExam, setExamId, setPageRefs])

  // Show spinner while we decide whether to redirect.
  if (syllabiLoading || activeSyllabus) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </div>
    )
  }

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{conceptName}</h1>
      </div>

      {status === 'loading' && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading concept…
        </div>
      )}
      {status === 'error' && (
        <p className="text-sm text-muted-foreground">Couldn't load {conceptName}.</p>
      )}

      {content !== null && (
        <WikiArticle markdown={content} sourcePath={`Concepts/${conceptName}.md`} />
      )}
    </div>
  )
}
