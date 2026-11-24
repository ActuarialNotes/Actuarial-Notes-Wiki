// Learn's exam page (docs/redesign-spec.md §7.1): the header (subject and
// format, the syllabus bar, the official syllabus and the dates), each
// learning objective as a card, and the rows at the foot.
//
// What it draws is `lib/examPage.ts`: the page's own markdown, read. The
// figures are `lib/syllabusObjectives.ts`, the ones Today's Syllabus panel
// prints. A pill goes to the concept's page; a reading, and an old `?concept=`
// link, still open in the reader over this page.

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, ChevronUp, Loader2, Plus } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { fromSlug, examIdFromFile, examDisplayName, type WikiEntryRef } from '@/lib/wikiRoutes'
import { useWikiPage } from '@/hooks/useWikiPage'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useConceptHighlight } from '@/hooks/useConceptHighlight'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useSubscription } from '@/hooks/useSubscription'
import { storedSessionConcepts } from '@/hooks/useTodaySession'
import { countQuestions, practiceSettings, useQuestionBank } from '@/hooks/usePractice'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { SourceMaterialGallery } from '@/components/wiki/SourceMaterialGallery'
import { ExamSyllabusButton, LABELLED_HEADER_BUTTON } from '@/components/wiki/ExamSyllabusButton'
import { ExamSittingInfoButton } from '@/components/wiki/ExamSittingInfoButton'
import { FactCheckDialog } from '@/components/FactCheckBadge'
import { FloatingSearchBack } from '@/components/FloatingSearchBar'
import { ObjectiveCard, type PillState } from '@/components/learn/ObjectiveCard'
import { PracticeButton } from '@/components/learn/PracticeButton'
import { SyllabusBar } from '@/components/today/TodayTiles'
import { useExamProgress } from '@/contexts/examProgress'
import { useAuth } from '@/hooks/useAuth'
import { daysBetween, todayISO } from '@/lib/studyPlan'
import { examPageIdFromFile, examProgressKeyFromFile, examQuizTopic, todaysPlanConcepts } from '@/lib/examMenu'
import { examFootNotes, linesShown, objectiveOf, parseExamPage, type ObjectivePill } from '@/lib/examPage'
import { examStatus } from '@/lib/examStatus'
import { FACT_CHECK_UI_ENABLED } from '@/lib/featureFlags'
import { buildMasteryLookup, resolveConceptState } from '@/lib/conceptMatch'
import { objectivePracticeUrl } from '@/lib/practiceLaunch'
import { formatExamLength, formatExamUnits } from '@/lib/quizBankInfo'
import { paceForExam } from '@/lib/quizTiming'
import { computeExamReadiness } from '@/lib/readiness'
import { examPillLabel } from '@/lib/resourceExams'
import { buildObjectiveIndex, isSyllabusConcept } from '@/lib/syllabusChapters'
import { syllabusObjectives } from '@/lib/syllabusObjectives'
import { documentPathsByName, extractSourceMaterial, parseSyllabusObjectives, sourceEntryRef } from '@/lib/sourceMaterial'
import { planTickPct } from '@/lib/todaySession'
import { factCheckBadge, parseVerification } from '@/lib/verification'
import { buildWikiIndex, isInWikiIndex } from '@/lib/wikiIndex'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { ExamSwitcherButton } from '@/components/switcher/ExamSwitcherButton'
import { addressFocus } from '@/lib/examFocus'
import { useExamSwitcher } from '@/stores/examSwitcher'
import { useWikiPageHead } from '@/hooks/useWikiPageHead'
import { useBack, usePageLabel } from '@/hooks/useBack'
import type { BackOptions } from '@/lib/navTrail'
import { stripFrontmatter } from '@/lib/wikiMarkdown'
import { cn } from '@/lib/utils'

const EXAM_LIST_ONLY: BackOptions = { only: path => path.split(/[?#]/)[0] === '/wiki' }

/** Which objective was open on an exam's page, so Back from a concept returns to it. */
const OPEN_OBJECTIVE_KEY = 'wiki:exam-objective:'

function readOpenObjective(file: string): number | null {
  try {
    const raw = sessionStorage.getItem(OPEN_OBJECTIVE_KEY + file)
    return raw === null ? null : Number(raw)
  } catch { return null }
}

function saveOpenObjective(file: string, index: number | null) {
  try {
    if (index === null) sessionStorage.removeItem(OPEN_OBJECTIVE_KEY + file)
    else sessionStorage.setItem(OPEN_OBJECTIVE_KEY + file, String(index))
  } catch { /* private window */ }
}

/** A row at the foot of the page: a label that unfolds what it names, in place. */
function FootRow({
  label,
  aside,
  open,
  onToggle,
  children,
}: {
  label: string
  aside?: ReactNode
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  const Chevron = open ? ChevronUp : ChevronDown
  return (
    <div className="border-t border-border" data-foot-row={label}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-14 w-full items-center gap-3.5 text-left text-[17px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="min-w-0 flex-1">{label}</span>
        {aside}
        <Chevron className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      </button>
      {open && <div className="pb-6">{children}</div>}
    </div>
  )
}

const FOOT_LINK =
  'flex min-h-14 w-full items-center gap-3.5 border-t border-border text-left text-[17px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

export default function WikiExam() {
  const { slug = '' } = useParams()
  const [searchParams] = useSearchParams()
  const conceptParam = searchParams.get('concept')
  // A resource to open on arrival — the action menu's Open in Study Guide.
  const resourceParam = searchParams.get('resource')
  const examFileName = fromSlug(slug)
  const { setPageRefs, setExamId, setPageTitle, setPageIcon, setPageTitleBadge, setBackLink, setIsInDevelopment, setIsBeta, setGround } = useWikiPage()
  const openAt = useConceptPopup(s => s.openAt)
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  useWikiPageHead('exam', examFileName, status === 'error')
  const popupOpenedRef = useRef(false)
  // The scroll is the router's: a new visit opens at the top, Back returns to
  // where the page was left (lib/routeScrollMemory.ts).

  const progressKey = useMemo(() => examProgressKeyFromFile(examFileName), [examFileName])
  const { user } = useAuth()
  const { isPro } = useSubscription()
  const { examRows, progress, targetDates, focusId, setFocusId } = useExamProgress()
  const openAddExam = useExamSwitcher(s => s.openAdd)
  // The page's own id (`P-1`, `6C`). An address that names one of the reader's
  // exams puts it in focus; any other exam is a visit, and the focus stays
  // where it was (lib/examFocus.ts).
  const pageId = useMemo(() => examPageIdFromFile(examFileName), [examFileName])
  const { exams: myExams, loading: examsLoading } = useExamInFocus()
  const isMine = addressFocus(pageId, myExams) !== null
  useEffect(() => {
    if (!examsLoading && isMine && focusId !== pageId) setFocusId(pageId)
  }, [examsLoading, isMine, focusId, pageId, setFocusId])

  // The wiki exam id (`p-1`, `5-1`, `mas-i`) — how the syllabus link is keyed.
  const wikiExamId = useMemo(() => examIdFromFile(examFileName), [examFileName])

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

  const page = useMemo(() => (content ? parseExamPage(content) : null), [content])

  // The page's own `# ` heading, with the examining-body suffix the vault
  // filenames carry stripped off — "Exam MAS-I", never "Exam MAS-I (CAS)".
  const title = page?.title ? examDisplayName(page.title) : examDisplayName(examFileName)

  // ── The reader's standing ─────────────────────────────────────────────────
  const { syllabi } = useWikiSyllabus()
  const syllabus = useMemo(() => syllabi.find(s => s.fileName === examFileName) ?? null, [syllabi, examFileName])
  const { records: masteryRecords } = useConceptMastery()
  const examRecords = useMemo(
    () => masteryRecords.filter(r => r.exam_id === progressKey),
    [masteryRecords, progressKey],
  )
  const now = useMemo(() => new Date(), [])
  const today = todayISO()
  const readiness = useMemo(
    () => (syllabus ? computeExamReadiness(syllabus, examRecords, now) : null),
    [syllabus, examRecords, now],
  )
  const syllabusPct = readiness && readiness.counts.total > 0 ? Math.round(readiness.overallPct) : 0
  const todayKeys = useMemo(
    () => storedSessionConcepts(user?.id ?? null, progressKey, today),
    [user?.id, progressKey, today],
  )
  const figures = useMemo(
    () => (syllabus && readiness ? syllabusObjectives(syllabus, readiness, examRecords, todayKeys, now) : null),
    [syllabus, readiness, examRecords, todayKeys, now],
  )

  // A paced plan's place on the bar (Pro), from today's cached plan.
  const tick = useMemo(() => {
    const cache = examRows.find(r => r.exam_id === progressKey)?.study_plan_cache
    return isPro && cache && todaysPlanConcepts(cache, today) ? planTickPct(cache) : null
  }, [examRows, progressKey, isPro, today])

  const examState = progress[progressKey] ?? 'not_started'
  const examDate = examState === 'in_progress' ? targetDates[progressKey] : null
  const daysLeft = examDate ? daysBetween(today, examDate) : null

  // "Probability · 30 questions · 3 hours": the subject, and the paper's size
  // where the pace table holds it.
  const bankLabel = examQuizTopic(examFileName)
  const pace = paceForExam(bankLabel)
  const subjectLine = [
    syllabus?.examTopic,
    pace ? formatExamUnits(pace) : null,
    pace ? formatExamLength(pace.minutes) : null,
  ].filter(Boolean).join(' · ')

  // ── The objectives ────────────────────────────────────────────────────────
  const [openIndex, setOpenIndex] = useState<number | null>(() => readOpenObjective(examFileName))
  const [showAll, setShowAll] = useState<number | null>(null)
  useEffect(() => { setOpenIndex(readOpenObjective(examFileName)); setShowAll(null) }, [examFileName])
  const toggleObjective = useCallback((i: number) => {
    setOpenIndex(prev => {
      const next = prev === i ? null : i
      saveOpenObjective(examFileName, next)
      return next
    })
    setShowAll(null)
  }, [examFileName])

  const openObjective = page && openIndex !== null ? page.objectives[openIndex] ?? null : null
  // This entry of the history is named for what is open on it, so a concept's
  // back control says "General Probability".
  usePageLabel(openObjective?.name ?? title)

  // The resource pages by name, from the wiki index: what tells a reading
  // named `[[OSFI MCT]]` apart from a concept, and a written page from one
  // the syllabus names ahead of it.
  const [documentPaths, setDocumentPaths] = useState<Map<string, string>>(() => new Map())
  const [indexReady, setIndexReady] = useState(false)
  useEffect(() => {
    let cancelled = false
    buildWikiIndex()
      .then(items => {
        if (cancelled) return
        setDocumentPaths(documentPathsByName(items))
        setIndexReady(true)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const pillState = useMemo(() => {
    const lookup = buildMasteryLookup(examRecords)
    return (name: string): PillState => ({
      state: resolveConceptState(lookup, { name }, now),
      today: todayKeys.has(name.toLowerCase()),
      missing: indexReady && !isInWikiIndex('concept', name),
    })
  }, [examRecords, todayKeys, now, indexReady])

  // The bank, for the open objective's Practice button: fetched once an
  // objective is opened, never for a reader who only looks.
  const questions = useQuestionBank(openObjective !== null && !!bankLabel)
  const practice = useMemo(() => {
    if (!openObjective || !bankLabel) return null
    const concepts = openObjective.concepts.map(p => p.name)
    const available = countQuestions(questions, { exam: bankLabel, concepts })
    if (!available) return null
    return (
      <PracticeButton to={objectivePracticeUrl(bankLabel, concepts, available, practiceSettings())}>
        Practice {openObjective.name}
      </PracticeButton>
    )
  }, [openObjective, bankLabel, questions])

  // ── The reader over this page: readings, and old `?concept=` links ────────
  const pageRefs = useMemo(
    () => (content ? extractWikiLinksFromText(content) : []),
    [content],
  )
  const sourceMaterial = useMemo(
    () => (content ? extractSourceMaterial(stripFrontmatter(content)) : null),
    [content],
  )
  const conceptList = useMemo(
    () => (sourceMaterial ? extractWikiLinksFromText(sourceMaterial.markdown).filter(isSyllabusConcept) : []),
    [sourceMaterial],
  )
  const objectives = useMemo(
    () => (content ? buildObjectiveIndex(content) : null),
    [content],
  )
  // The shelf's Learning objective filter, named from the page's own numbered objectives.
  const shelfObjectives = useMemo(
    () => (sourceMaterial && sourceMaterial.entries.length > 0 && sourceMaterial.objectiveFilter
      ? parseSyllabusObjectives(sourceMaterial.markdown)
      : []),
    [sourceMaterial],
  )

  const resourceRefs = useMemo(() => {
    const seen = new Set<string>()
    const refs: WikiEntryRef[] = []
    // The shelf's readings first, in its order, each as the page its card opens.
    for (const entry of sourceMaterial?.entries ?? []) {
      const ref = sourceEntryRef(entry, documentPaths.get(entry.name.toLowerCase()))
      const key = ref.name.toLowerCase()
      if (ref.kind === 'concept' || seen.has(key)) continue
      seen.add(key)
      refs.push(ref)
    }
    for (const r of pageRefs) {
      if (r.kind === 'resource' || (r.kind === 'concept' && / \([^)]*\d{4}\)$/.test(r.name))) {
        const key = r.name.toLowerCase()
        if (!seen.has(key)) {
          seen.add(key)
          refs.push({ kind: 'resource', name: r.name })
        }
      }
    }
    return refs.length > 0 ? refs : null
  }, [pageRefs, sourceMaterial, documentPaths])

  // A reading opens in the reader on the Source Material walk.
  const openResource = useCallback((ref: WikiEntryRef) => {
    const listed = resourceRefs ?? []
    const at = listed.findIndex(r => r.name.toLowerCase() === ref.name.toLowerCase())
    const resList = at >= 0 ? listed : [{ ...ref, kind: ref.kind === 'concept' ? 'resource' as const : ref.kind }]
    openAt(resList, Math.max(at, 0), `${examFileName}.md`, null, resourceRefs, { initialFilter: 'source-material', fullList: conceptList, objectives })
  }, [conceptList, resourceRefs, examFileName, openAt, objectives])

  // A link in a foot row, or a card on the shelf: a reading opens in the
  // reader, a concept goes to its page.
  const onWikiLink = useCallback((ref: WikiEntryRef, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ref.kind === 'resource' || / \([^)]*\d{4}\)$/.test(ref.name)) {
      e.preventDefault()
      openResource(ref)
      return true
    }
    return false
  }, [openResource])

  const onOpenPill = useCallback((pill: ObjectivePill, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    if (pill.ref.kind === 'concept' && isSyllabusConcept(pill.ref)) return
    e.preventDefault()
    openResource(pill.ref)
  }, [openResource])

  // Reset the opened flag whenever the exam or the requested concept changes.
  useEffect(() => {
    popupOpenedRef.current = false
  }, [examFileName, conceptParam, resourceParam])

  // An old link with `?concept=`: its objective opens, and the concept opens
  // in the reader over the page.
  useEffect(() => {
    if (!conceptParam || !page || popupOpenedRef.current) return
    popupOpenedRef.current = true
    const at = objectiveOf(page.objectives, conceptParam)
    if (at >= 0) {
      setOpenIndex(at)
      saveOpenObjective(examFileName, at)
    }
    const idx = conceptList.findIndex(r => r.name.toLowerCase() === conceptParam.toLowerCase())
    const openList = idx >= 0 ? conceptList : [{ kind: 'concept' as const, name: conceptParam }]
    openAt(openList, idx >= 0 ? idx : 0, `${examFileName}.md`, null, resourceRefs, { objectives })
  }, [conceptParam, page, conceptList, examFileName, openAt, resourceRefs, objectives])

  // Likewise with `?resource=`: the reading opens in the reader over its study guide.
  useEffect(() => {
    if (!resourceParam || pageRefs.length === 0 || popupOpenedRef.current) return
    popupOpenedRef.current = true
    openResource({ kind: 'resource', name: resourceParam })
  }, [resourceParam, pageRefs, openResource])

  // ── The strip above the page ──────────────────────────────────────────────
  // The strip's icon is the exam switcher: this exam's logo and name, and the
  // way to the reader's others.
  const stripLabel = examDisplayName(examFileName)
  const pageIcon = useMemo(
    () => <ExamSwitcherButton examKey={progressKey} label={stripLabel} visiting={isMine ? null : pageId} />,
    [progressKey, stripLabel, isMine, pageId],
  )
  // Always back to the exam list: the browser's Back when the reader came
  // from it (its filters and scroll intact), and up to it from anywhere else.
  const back = useBack({ to: '/wiki', label: 'Study Guides' }, EXAM_LIST_ONLY)
  const backLink = useMemo(() => <FloatingSearchBack back={back} />, [back])
  // How far along this exam's material is. The page's own id, since 6C and 6U
  // share a progress key and not a status.
  const contentStatus = examStatus(progressKey, examPageIdFromFile(examFileName))

  useEffect(() => {
    setExamId(wikiExamId)
    setPageRefs(pageRefs)
  }, [pageRefs, wikiExamId, setExamId, setPageRefs])

  useEffect(() => {
    setPageTitle(page ? title : null)
    setIsInDevelopment(contentStatus === 'development')
    setIsBeta(contentStatus === 'beta')
    setGround(true)
  }, [page, title, contentStatus, setPageTitle, setIsInDevelopment, setIsBeta, setGround])

  useEffect(() => { setPageIcon(pageIcon) }, [pageIcon, setPageIcon])
  useEffect(() => { setPageTitleBadge(null) }, [setPageTitleBadge])
  useEffect(() => { setBackLink(backLink) }, [backLink, setBackLink])

  // ── The foot rows ─────────────────────────────────────────────────────────
  const [openRow, setOpenRow] = useState<string | null>(null)
  useEffect(() => { setOpenRow(resourceParam ? 'Readings' : null) }, [examFileName, resourceParam])
  const toggleRow = (label: string) => setOpenRow(prev => (prev === label ? null : label))
  const notes = useMemo(() => (page ? examFootNotes(page) : []), [page])
  const verification = useMemo(() => (content ? parseVerification(content) : null), [content])
  const [showFactCheck, setShowFactCheck] = useState(false)
  const shelfRef = useRef<HTMLDivElement>(null)
  useConceptHighlight(shelfRef, `${examFileName}.md`)

  const focus = conceptParam
  const partOf = (i: number) => page?.objectives[i]?.part ?? null

  return (
    <div className="flex w-full max-w-2xl flex-col text-foreground" data-testid="exam-page">
      {status === 'loading' && (
        <div className="flex items-center gap-2 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading {examDisplayName(examFileName)}…
        </div>
      )}
      {status === 'error' && <p className="text-sm">Couldn't load {examDisplayName(examFileName)}.</p>}

      {page && (
        <>
          <header className="flex flex-col gap-[18px] px-1">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-[30px] font-bold leading-tight tracking-tight">{title}</h1>
              {subjectLine && <p className="text-base">{subjectLine}</p>}
            </div>

            <div
              role="img"
              aria-label={[
                `${syllabusPct}% of the syllabus covered`,
                tick !== null ? `plan target ${tick}%` : null,
                examState === 'completed' ? 'passed' : daysLeft !== null && daysLeft >= 0 ? `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left` : null,
              ].filter(Boolean).join(', ')}
              data-testid="exam-syllabus"
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5"
            >
              <span className="text-2xl font-bold tabular-nums">{syllabusPct}%</span>
              <SyllabusBar pct={syllabusPct} tick={tick} thick />
              <span className="text-[15px] tabular-nums">
                {examState === 'completed'
                  ? 'Passed'
                  : daysLeft !== null && daysLeft >= 0
                    ? `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}`
                    : null}
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <ExamSyllabusButton examId={wikiExamId} examLabel={title} labelled />
              <ExamSittingInfoButton progressKey={progressKey} wikiExamId={wikiExamId} examLabel={title} labelled />
              {!examsLoading && !isMine && contentStatus !== 'development' && (
                <button type="button" onClick={() => openAddExam(pageId)} className={LABELLED_HEADER_BUTTON}>
                  <Plus aria-hidden="true" />
                  Add exam
                </button>
              )}
            </div>
          </header>

          <div className="-mx-1 mt-[26px] flex flex-col gap-2.5 sm:mx-0">
            {page.objectives.map((objective, i) => (
              <div key={`${objective.name}-${i}`} className="contents">
                {objective.part && objective.part !== partOf(i - 1) && (
                  <h2 className="px-2 pt-3 text-base font-bold">{objective.part}</h2>
                )}
                <ObjectiveCard
                  objective={objective}
                  figures={figures?.[i] ?? null}
                  open={openIndex === i}
                  onToggle={() => toggleObjective(i)}
                  shown={linesShown(objective, showAll === i, openIndex === i ? focus : null)}
                  onShowAll={() => setShowAll(i)}
                  pillState={pillState}
                  from={wikiExamId}
                  onOpenPill={onOpenPill}
                  practice={openIndex === i ? practice : null}
                />
              </div>
            ))}
          </div>

          <div className={cn('mt-4 flex flex-col px-1', page.objectives.length === 0 && 'mt-6')}>
            {sourceMaterial && sourceMaterial.entries.length > 0 && (
              <FootRow
                label="Readings"
                aside={<span className="font-bold tabular-nums">{sourceMaterial.entries.length}</span>}
                open={openRow === 'Readings'}
                onToggle={() => toggleRow('Readings')}
              >
                <div ref={shelfRef} data-source-page={`${examFileName}.md`}>
                  <SourceMaterialGallery
                    entries={sourceMaterial.entries}
                    objectives={shelfObjectives}
                    exam={examPillLabel(examFileName)}
                    onOpen={(ref, e) => {
                      e.preventDefault()
                      if (!onWikiLink(ref, e)) openResource(ref)
                    }}
                  />
                </div>
              </FootRow>
            )}
            {notes.map(note => (
              <FootRow key={note.title} label={note.title} open={openRow === note.title} onToggle={() => toggleRow(note.title)}>
                <WikiArticle markdown={note.markdown} onWikiLink={onWikiLink} className="text-foreground" />
              </FootRow>
            ))}
            {/* PCPA's second part: the project, which the syllabus page can't be. */}
            {progressKey === 'CAS-PCPA' && (
              <Link to="/project" className={FOOT_LINK}>
                <span className="min-w-0 flex-1">Project</span>
                <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
              </Link>
            )}
            {FACT_CHECK_UI_ENABLED && (
              <button type="button" onClick={() => setShowFactCheck(true)} aria-haspopup="dialog" className={FOOT_LINK}>
                <span className="min-w-0 flex-1">Fact Check</span>
                <span className="text-[15px] font-medium">{factCheckBadge(verification).label}</span>
                <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
              </button>
            )}
          </div>

          <FactCheckDialog
            open={showFactCheck}
            onClose={() => setShowFactCheck(false)}
            verification={verification}
            contentPath={`${examFileName}.md`}
            contentName={title}
          />
        </>
      )}
    </div>
  )
}
