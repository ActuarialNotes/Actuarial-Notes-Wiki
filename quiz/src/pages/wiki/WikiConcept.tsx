import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { fromSlug, examIdFromFile } from '@/lib/wikiRoutes'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { ConceptNav } from '@/components/wiki/ConceptNav'
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
  return s.topics.some(t => t.concepts.some(c => c.name.toLowerCase() === needle))
}

export default function WikiConcept() {
  const { slug = '' } = useParams()
  const [params] = useSearchParams()
  const fromExam = params.get('from')
  const conceptName = fromSlug(slug)

  const { setPageRefs, setExamId } = useWikiPage()
  const { syllabi } = useWikiSyllabus()
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
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
    return () => {
      cancelled = true
    }
  }, [conceptName])

  const pageRefs = useMemo(
    () => (content ? extractWikiLinksFromText(content) : []),
    [content],
  )

  // Pick the exam this concept lives under — query param takes priority.
  const activeSyllabus = useMemo(
    () => findSyllabusForConcept(syllabi, conceptName, fromExam ?? undefined),
    [syllabi, conceptName, fromExam],
  )
  const examId = useMemo(() => {
    if (fromExam) return fromExam
    if (activeSyllabus) return examIdFromFile(activeSyllabus.examLabel)
    return null
  }, [fromExam, activeSyllabus])

  useEffect(() => {
    setExamId(examId)
    setPageRefs(pageRefs)
  }, [pageRefs, examId, setExamId, setPageRefs])

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{conceptName}</h1>
        {activeSyllabus && (
          <span className="text-xs text-muted-foreground">
            {activeSyllabus.examLabel}
          </span>
        )}
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

      {activeSyllabus ? (
        <ConceptNav
          conceptName={conceptName}
          syllabus={activeSyllabus}
          fromExamId={examId}
        />
      ) : (
        <nav
          className="sticky bottom-0 mt-8 -mx-4 sm:-mx-6 border-t bg-background/95 backdrop-blur px-3 sm:px-4 py-2"
          aria-label="Concept navigation"
        >
          <Link
            to="/wiki"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" /> Back to wiki
          </Link>
        </nav>
      )}
    </div>
  )
}
