// Learn's concept page (docs/redesign-spec.md §7.2): a top row (back to where
// the reader came from, the reader's level, more), the title as plain text,
// the article as it is, "Next in <objective>" at its end and a fixed foot,
// "Practice this".
//
// A concept's address shows the concept, to a reader following a pill from an
// exam page and to a visitor landing on it alike (docs/seo.md). Which exam it
// is being read for is `?from=`, else the first exam, in ladder order, whose
// syllabus names it.

import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Headphones, Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { resourceRepoPath } from '@/lib/resourceFolders'
import { examDisplayName, examIdFromFile, fromSlug, wikiRoute } from '@/lib/wikiRoutes'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { findSyllabiForConcept } from '@/lib/conceptMatch'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useWikiPage } from '@/hooks/useWikiPage'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { ListenView } from '@/components/wiki/ListenView'
import { LevelSquare } from '@/components/LevelSquare'
import { ConceptLevelButton, useConceptLevel } from '@/components/learn/ConceptLevelButton'
import { ConceptMoreButton, MoreRow } from '@/components/learn/ConceptMoreButton'
import { PracticeButton } from '@/components/learn/PracticeButton'
import { useWikiPageHead } from '@/hooks/useWikiPageHead'
import { useStandalonePage } from '@/hooks/useStandalonePage'
import { useActionBarHeight } from '@/hooks/useActionBarHeight'
import { backLabel, useBack, usePageLabel } from '@/hooks/useBack'
import { practiceSettings, useConceptQuestionCount } from '@/hooks/usePractice'
import { nextInObjective, parseExamPage, type ObjectivePill } from '@/lib/examPage'
import { conceptPracticeUrl, questionCountLabel } from '@/lib/practiceLaunch'
import { compareExamLabels } from '@/lib/resourceExams'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

/** "Next in General Probability": the next concept of the objective, with its level. */
function NextConcept({ objective, next, from }: { objective: string; next: ObjectivePill; from: string }) {
  const level = useConceptLevel(next.name)
  return (
    <Link
      to={`${wikiRoute(next.ref)}?from=${encodeURIComponent(from)}`}
      data-testid="concept-next"
      className="mt-7 flex min-h-16 items-center gap-3.5 border-t border-border py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm">Next in {objective}</span>
        <span className="flex items-center gap-2 text-[17px] font-semibold">
          <LevelSquare state={level} size="sm" />
          <span className="min-w-0">{next.name}</span>
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
    </Link>
  )
}

export default function WikiConcept() {
  const navigate = useNavigate()
  const { slug = '' } = useParams()
  const [params] = useSearchParams()
  const fromExam = params.get('from')
  const conceptName = fromSlug(slug)

  const { setPageRefs, setExamId, setGround } = useWikiPage()
  const { syllabi } = useWikiSyllabus()
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [listen, setListen] = useState(false)
  useWikiPageHead('concept', conceptName, status === 'error')
  usePageLabel(conceptName)

  // The exams whose syllabus names this concept, in ladder order (Exam P
  // before Exam 7), and the one it is being read for.
  const studyGuides = useMemo(
    () => findSyllabiForConcept(syllabi, conceptName)
      .filter(s => s.fileName)
      .map(s => ({ syllabus: s, label: examDisplayName(s.fileName!), id: examIdFromFile(s.fileName!) }))
      .sort((a, b) => compareExamLabels(a.label, b.label)),
    [syllabi, conceptName],
  )
  const guide = useMemo(
    () => studyGuides.find(g => fromExam && g.id.toLowerCase() === fromExam.toLowerCase()) ?? studyGuides[0] ?? null,
    [studyGuides, fromExam],
  )
  const guideRoute = guide ? wikiRoute({ kind: 'exam', name: guide.syllabus.fileName! }) : '/wiki'

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setContent(null)
    setListen(false)
    fetchWikiFile(`Concepts/${conceptName}.md`)
      .then(raw => {
        if (cancelled) return
        setContent(raw)
        setStatus('ready')
      })
      .catch(async () => {
        // A syllabus reading reached at a concept URL — an old link from
        // before resources had a route of their own — is sent to its page.
        const resource = resourceRepoPath(conceptName)
        const isResource = await fetchWikiFile(resource).then(() => true, () => false)
        if (cancelled) return
        if (isResource) navigate(wikiRoute({ kind: 'resource', name: conceptName }), { replace: true })
        else setStatus('error')
      })
    return () => { cancelled = true }
  }, [conceptName, navigate])

  // The exam's own page, for what comes next in the objective.
  const [examPage, setExamPage] = useState<{ file: string; markdown: string } | null>(null)
  const guideFile = guide?.syllabus.fileName ?? null
  useEffect(() => {
    if (!guideFile) return
    let cancelled = false
    fetchWikiFile(`${guideFile}.md`)
      .then(markdown => { if (!cancelled) setExamPage({ file: guideFile, markdown }) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [guideFile])
  const next = useMemo(
    () => (examPage && examPage.file === guideFile
      ? nextInObjective(parseExamPage(examPage.markdown).objectives, conceptName)
      : null),
    [examPage, guideFile, conceptName],
  )

  const pageRefs = useMemo(
    () => (content ? extractWikiLinksFromText(content) : []),
    [content],
  )

  // A link in the article opens in the reader over the page.
  const conceptEntry = useMemo<WikiEntryRef>(() => ({ kind: 'concept', name: conceptName }), [conceptName])
  const standalonePage = useStandalonePage(conceptEntry, content, pageRefs, `Concepts/${conceptName}.md`)

  useEffect(() => {
    setExamId(fromExam)
    setPageRefs(pageRefs)
    setGround(true)
  }, [pageRefs, fromExam, setExamId, setPageRefs, setGround])

  // Back to the page the reader came from; from outside the app, up to the exam.
  const back = useBack({ to: guideRoute, label: guide?.label ?? 'Study Guides' })

  // The foot: a quiz on this concept, when the bank has questions on it.
  const questionCount = useConceptQuestionCount(status === 'ready' ? conceptName : null)
  const footRef = useRef<HTMLDivElement>(null)
  const hasFoot = !!questionCount
  useActionBarHeight(footRef, hasFoot)

  return (
    <div className="flex w-full max-w-2xl flex-col text-foreground" data-testid="concept-page">
      <div className="-mx-2 -mt-3 flex items-center gap-1">
        <Link
          to={back.to}
          state={RESTORE_SCROLL}
          onClick={back.onLinkClick}
          aria-label={backLabel(back)}
          className="inline-flex h-11 min-w-0 items-center gap-1 rounded-full pl-1 pr-2 text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="h-[22px] w-[22px] shrink-0" strokeWidth={2.5} aria-hidden="true" />
          <span className="truncate">{back.label}</span>
        </Link>
        <span className="flex-1" />
        {content !== null && (
          <>
            <ConceptLevelButton conceptName={conceptName} />
            <ConceptMoreButton
              entry={conceptEntry}
              content={content}
              rows={close => (
                <MoreRow icon={<Headphones />} pressed={listen} onClick={() => { setListen(v => !v); close() }}>
                  {listen ? 'Stop listening' : 'Listen'}
                </MoreRow>
              )}
            />
          </>
        )}
      </div>

      <h1 className="mt-[18px] text-[30px] font-bold leading-[1.15] tracking-tight">{conceptName}</h1>

      {/* A concept on more than one syllabus: which exam it is being read for. */}
      {studyGuides.length > 1 && (
        <nav aria-label="Exams" className="mt-3 flex flex-wrap gap-2">
          {studyGuides.map(g => (
            <Link
              key={g.id}
              to={`${wikiRoute(conceptEntry)}?from=${encodeURIComponent(g.id)}`}
              replace
              aria-current={g === guide ? 'true' : undefined}
              className={`inline-flex h-9 items-center rounded-full px-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                g === guide ? 'border-2 border-foreground' : 'border border-border hover:border-foreground'
              }`}
            >
              {g.label}
            </Link>
          ))}
        </nav>
      )}

      {status === 'loading' && (
        <div className="mt-5 flex items-center gap-2 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}
      {status === 'error' && <p className="mt-5 text-base">Couldn't load {conceptName}.</p>}

      {content !== null && (
        <div className="mt-4">
          {listen ? (
            <ListenView markdown={content} recordingFor={conceptName} />
          ) : (
            <WikiArticle
              markdown={content}
              sourcePath={`Concepts/${conceptName}.md`}
              // Section headings pin just under the floating search bar.
              stickyHeadings
              onWikiLink={standalonePage.onWikiLink}
              className="[--sticky-heading-bg:hsl(var(--ground))] [--sticky-heading-top:var(--floating-search-height,0px)]"
            />
          )}
        </div>
      )}

      {content !== null && next && guide && <NextConcept objective={next.objective} next={next.next} from={guide.id} />}

      {hasFoot && (
        <div
          ref={footRef}
          className="sticky bottom-0 z-30 -mx-4 -mb-8 mt-6 border-t border-border bg-ground px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:mx-0 sm:px-0"
        >
          <PracticeButton
            to={conceptPracticeUrl(conceptName, questionCount, practiceSettings())}
            aside={questionCountLabel(questionCount)}
          >
            Practice this
          </PracticeButton>
        </div>
      )}
    </div>
  )
}
