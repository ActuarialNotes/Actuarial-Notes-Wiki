import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { GraduationCap, Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { examDisplayName, fromSlug, wikiRoute } from '@/lib/wikiRoutes'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { findSyllabiForConcept } from '@/lib/conceptMatch'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { FactCheckBadge } from '@/components/FactCheckBadge'
import { parseVerification } from '@/lib/verification'
import { KeystoneName } from '@/components/KeystoneName'
import { useWikiPageHead } from '@/hooks/useWikiPageHead'
import { compareExamLabels } from '@/lib/resourceExams'
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

// The study guide a concept is read in, opened at that concept.
function studyGuideRoute(syllabus: WikiExamSyllabus, conceptName: string): string {
  return `${wikiRoute({ kind: 'exam', name: syllabus.fileName ?? syllabus.examLabel })}?concept=${encodeURIComponent(conceptName)}`
}

export default function WikiConcept() {
  const navigate = useNavigate()
  const location = useLocation()
  const { slug = '' } = useParams()
  const [params] = useSearchParams()
  const fromExam = params.get('from')
  const conceptName = fromSlug(slug)
  // Arrived on this URL rather than navigated to it inside the app — from a
  // search result, a shared link, a bookmark, or a crawler (the router keys
  // only the entry it started on 'default'). Such a visitor asked for this
  // page, so they are shown it; redirecting them into the study guide would
  // make every concept URL a redirect, and a redirect is never a search
  // result. Following a link *inside* the app still opens the concept in its
  // study guide, as it always has.
  const landed = location.key === 'default'

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
  // A landed visitor is shown the page — unless there is no page to show (a
  // syllabus names a concept that has no file of its own), when its study
  // guide is still the better place to arrive.
  const standalone = landed && status !== 'error'
  // In ladder order (Exam P before Exam 7), the order the breadcrumb takes its exam from.
  const studyGuides = useMemo(
    () => matchingSyllabi
      .map(s => ({ syllabus: s, label: s.fileName ? examDisplayName(s.fileName) : s.examLabel }))
      .sort((a, b) => compareExamLabels(a.label, b.label)),
    [matchingSyllabi],
  )
  const isAmbiguous = !standalone && !syllabiLoading && !activeSyllabus && matchingSyllabi.length > 1
  const redirecting = !standalone && (syllabiLoading || activeSyllabus !== null)

  // Redirect to the exam's study guide with the popup open.
  // We wait until syllabi are loaded so we know definitively whether to redirect.
  useEffect(() => {
    if (standalone || syllabiLoading || !activeSyllabus) return
    navigate(studyGuideRoute(activeSyllabus, conceptName), { replace: true })
  }, [standalone, syllabiLoading, activeSyllabus, conceptName, navigate])

  // Fetch and display the standalone concept page when the visitor landed
  // here, or when there's no exam to redirect to (the concept isn't in any
  // syllabus) and it isn't an ambiguous multi-exam concept awaiting a choice.
  const shouldShowConcept = landed || (!syllabiLoading && !activeSyllabus && !isAmbiguous)
  useWikiPageHead('concept', conceptName, status === 'error')

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
  if (redirecting) {
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
              onClick={() => navigate(studyGuideRoute(s, conceptName))}
              className="w-full flex items-center gap-2.5 rounded-lg bg-muted/40 px-4 py-3 text-left hover:bg-accent transition-colors"
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
      <h1 className="text-2xl font-bold tracking-tight">
        <KeystoneName name={conceptName} />
      </h1>

      {/* A visitor who landed here reads the concept on its own; these are the
          way into the study guide(s) it belongs to, opened at this concept. */}
      {studyGuides.length > 0 && (
        <nav aria-label="Study guides" className="flex flex-wrap gap-1.5">
          {studyGuides.map(({ syllabus, label }) => (
            <Link
              key={syllabus.examId}
              to={studyGuideRoute(syllabus, conceptName)}
              title={`Open in the ${label} study guide`}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
            >
              <GraduationCap className="h-3.5 w-3.5" aria-hidden />
              {label}
            </Link>
          ))}
        </nav>
      )}

      {status === 'loading' && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading concept…
        </div>
      )}
      {status === 'error' && (
        <p className="text-sm text-muted-foreground">Couldn't load {conceptName}.</p>
      )}

      {content !== null && (
        <WikiArticle
          markdown={content}
          sourcePath={`Concepts/${conceptName}.md`}
          titleBadge={
            <FactCheckBadge
              verification={parseVerification(content)}
              contentPath={`Concepts/${conceptName}.md`}
              contentName={conceptName}
            />
          }
        />
      )}
    </div>
  )
}
