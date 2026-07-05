import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { GraduationCap, Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { fromSlug, wikiRoute } from '@/lib/wikiRoutes'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { findSyllabiForConcept } from '@/lib/conceptMatch'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

// Picks the syllabus to redirect to when it's unambiguous. Returns null when
// the concept isn't in any syllabus (show the standalone page) or when it's
// referenced by more than one (the caller must ask the user which to open).
function resolveSyllabusForConcept(
  matches: WikiExamSyllabus[],
  preferredLabel?: string,
): WikiExamSyllabus | null {
  if (preferredLabel) {
    const exact = matches.find(s => s.examLabel.toLowerCase().includes(preferredLabel.toLowerCase()))
    if (exact) return exact
  }
  return matches.length === 1 ? matches[0]! : null
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

  // All syllabi that reference this concept — query param can disambiguate.
  const matchingSyllabi = useMemo(
    () => findSyllabiForConcept(syllabi, conceptName),
    [syllabi, conceptName],
  )
  const activeSyllabus = useMemo(
    () => resolveSyllabusForConcept(matchingSyllabi, fromExam ?? undefined),
    [matchingSyllabi, fromExam],
  )
  // Referenced by more than one exam's study guide and not disambiguated by
  // `?from=` — ask the user which one they meant instead of guessing.
  const isAmbiguous = !syllabiLoading && !activeSyllabus && matchingSyllabi.length > 1

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
  // exam to redirect to (i.e. the concept isn't in any syllabus) and it isn't
  // an ambiguous multi-exam concept awaiting a choice.
  const shouldShowConcept = !syllabiLoading && !activeSyllabus && !isAmbiguous

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

  if (isAmbiguous) {
    return (
      <div className="space-y-4 max-w-md">
        <h1 className="text-2xl font-bold tracking-tight">{conceptName}</h1>
        <p className="text-sm text-muted-foreground">
          This concept appears in multiple exam study guides. Which one would you like to open?
        </p>
        <div className="space-y-2">
          {matchingSyllabi.map(s => (
            <button
              key={s.examId}
              type="button"
              onClick={() => navigate(
                `${wikiRoute({ kind: 'exam', name: s.fileName ?? s.examLabel })}?concept=${encodeURIComponent(conceptName)}`,
              )}
              className="w-full flex items-center gap-2.5 rounded-lg border px-4 py-3 text-left hover:bg-accent transition-colors"
            >
              <GraduationCap className="h-4 w-4 shrink-0 text-teal-500" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium truncate">{s.examLabel}</span>
                <span className="block text-xs text-muted-foreground truncate">{s.examTopic}</span>
              </span>
            </button>
          ))}
        </div>
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
