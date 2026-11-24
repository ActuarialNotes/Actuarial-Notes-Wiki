import { lazy, Suspense, useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { usePageLabel } from '@/hooks/useBack'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronRight, Loader2, Search } from 'lucide-react'
import { ExamStatusBanner } from '@/components/FloatingSearchBar'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress } from '@/contexts/examProgress'
import { ExamSwitcherButton } from '@/components/switcher/ExamSwitcherButton'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { wikiRoute } from '@/lib/wikiRoutes'
import { useConcepts } from '@/hooks/useConcepts'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useDashboardAutostart } from '@/hooks/useDashboardAutostart'
import { useFlashcards } from '@/hooks/useFlashcards'
import { selectQuestionsForCoverage, minQuestionsToCoverConcepts } from '@/lib/studyPlan'
import { useSubscription } from '@/hooks/useSubscription'
import { filterQuestions } from '@/lib/parser'
import type { QuizMode } from '@/lib/parser'
import { useQuestionAttempts } from '@/hooks/useQuestionAttempts'
import { cn } from '@/lib/utils'
import { buildPastExamRows, examSourceLabel, PRACTICE_EXAM_LABEL, practiceExamQuestions } from '@/lib/pastExams'
import { PUBLISHER_ORDER, questionPublisher } from '@/lib/questionPublisher'
import { examStatus } from '@/lib/examStatus'
import { difficultyLevelsToParam, inDifficultyLevels } from '@/lib/quizDifficulty'
import { formatPace, paceForExam } from '@/lib/quizTiming'
import { estimateSeconds, formatEstimate, topicPills } from '@/lib/quizSetup'
import {
  conceptLevels,
  groupConceptsBySyllabus,
  loadSavedConcepts,
  orderConceptsBySyllabus,
  quizExamFor,
  quizLaunchUrl,
  quizWikiExamId,
  saveConcepts,
  shelfPdfLinks,
  clearSessionMistakes,
  peekSessionMistakes,
  questionsOnConcepts,
  sessionQuizIds,
  storeSelectedIds,
  takeConceptOverride,
  type LaunchSettings,
} from '@/lib/quizBuilder'
import {
  papersCountDetail,
  practiceExamDetail,
  settingPills,
  toggleTopic,
  toggleTopicConcept,
  topicQuestionCounts,
  type PillSection,
} from '@/lib/practiceHome'
import { sessionQuizSteps, storeQuizSteps } from '@/lib/sessionSteps'
import { useQuizBuilderSettings } from '@/hooks/useQuizBuilderSettings'
import { useQuizExamScreen } from '@/hooks/useQuizExamScreen'
import { useBuilderPool } from '@/hooks/useBuilderPool'
import { useTodaysPlanQuiz } from '@/hooks/useTodaysPlanQuiz'
import { QuizGamesPanel } from '@/components/landing/QuizGamesPanel'
import { GAMES_ENABLED } from '@/lib/featureFlags'
import { MobileNavButton } from '@/components/MobileNavButton'
import { QuizExamInfoButton } from '@/components/QuizExamInfoButton'
import { GROUND } from '@/components/ui/OutlineCard'
import { QuizCard } from '@/components/practice/QuizCard'
import { PaperPopup } from '@/components/practice/PaperPopup'
import {
  DifficultyButtons,
  PopupSection,
  SittingSwitches,
  StartPopup,
  TopicChoices,
} from '@/components/practice/SetupSheet'
import { questionsWord } from '@/lib/quizSetup'
import type { Question } from '@/lib/parser'

// Practice's home (docs/redesign-spec.md §7a.1, canvas `Practice`): the exam
// in focus, a search row, the reader's own quiz as an outlined card, then rows
// for a Practice Exam, the exam's past papers and the flashcards. What the
// builder decides (the pools, the draw's size, each launch's address) is
// lib/quizBuilder.ts; what the card and rows say is lib/practiceHome.ts and
// lib/quizSetup.ts; this page holds the state that joins them.
//
// The day's session is on Today, so today's plan has no tile here; the page
// still launches the session Today's Start hands over (`autostart`). The exam
// switcher at the top (§6) is the way to another exam.

// Lazy: it reads the Store's registration tables, which stay out of first paint.
const AddExamFlow = lazy(() => import('@/components/switcher/AddExamFlow').then(m => ({ default: m.AddExamFlow })))
const RegistrationNudge = lazy(() => import('@/components/RegistrationNudge'))

/** Which popup is open. */
type Sheet = 'quiz' | 'practice' | 'samples'

/** Who published an exam's undated questions: "SOA", "SOA, Actuarial Notes". */
function sourceDetail(questions: readonly Question[]): string {
  const found = new Set(questions.map(q => questionPublisher(q)).filter(p => p !== null))
  return PUBLISHER_ORDER.filter(p => found.has(p)).join(', ')
}

const ROW =
  'flex min-h-[64px] w-full items-center gap-3.5 border-b border-border text-left last:border-b-0 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring'

function RowBody({ title, detail }: { title: string; detail?: string }) {
  return (
    <>
      <span className="min-w-0 flex-1 text-[17px] font-semibold">{title}</span>
      {detail && <span className="shrink-0 text-[15px] tabular-nums">{detail}</span>}
      <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
    </>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { progress: examProgress, targetDates } = useExamProgress()
  const { byExam: conceptsByExam, loading: conceptsLoading } = useConcepts()
  const { questions: allQuestions } = useAllQuestions()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { syllabi } = useWikiSyllabus()
  const { isPro, loading: subLoading } = useSubscription()
  // Attempt history, for the pools' counts of questions not yet tried.
  const { byQuestionId: attemptsByQuestionId } = useQuestionAttempts()

  // A link with `mode=mock-exam` (the old Past Papers tab's) goes on to the
  // Past papers screen.
  const initialMode = (searchParams.get('mode') as QuizMode | null) ?? 'quiz'
  const initialConcept = searchParams.get('concept') ?? ''

  // The exam the page is on: the address's, else the exam in focus.
  const { topic, visiting, focusWithoutBank, hasExams, focusLoading } = useQuizExamScreen()

  const [selectedConcept, setSelectedConcept] = useState(initialConcept)
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([])
  const [count, setCount] = useState<number>(3)
  const [sheet, setSheet] = useState<Sheet | null>(null)
  const closeSheet = useCallback(() => setSheet(null), [])
  // Where the quiz's popup opens: the section of the pill that was pressed.
  const [sheetFocus, setSheetFocus] = useState<PillSection | undefined>()
  const openQuizSheet = (section: PillSection) => {
    setSheetFocus(section)
    setSheet('quiz')
  }

  // The settings each format remembers apart: the card's quiz, and a whole
  // paper, which is sat as a Practice Exam.
  const quizSettings = useQuizBuilderSettings('quiz')
  const examSettings = useQuizBuilderSettings('mock-exam')
  const { difficulties } = quizSettings

  // Which difficulty levels the card's quiz draws from — a filter, so every
  // count below reads through `inLevels`. A whole paper ignores it.
  const levelsParam = difficultyLevelsToParam(difficulties)
  const inLevels = useMemo(() => inDifficultyLevels('quiz', difficulties), [difficulties])
  const everyLevel = useMemo(() => inDifficultyLevels('mock-exam', difficulties), [difficulties])

  // Concept override passed from the dashboard when the reader deselects some
  // plan concepts.
  const conceptOverrideRef = useRef<string[] | null>(null)
  const didApplyOverrideRef = useRef(false)
  if (!didApplyOverrideRef.current && conceptOverrideRef.current === null) {
    conceptOverrideRef.current = takeConceptOverride()
  }

  // Restore the exam's saved topics when the exam changes — then, once, the
  // dashboard's override over them.
  useEffect(() => {
    setSelectedConcepts(topic ? loadSavedConcepts(topic) : [])
  }, [topic])
  useEffect(() => {
    if (!topic || didApplyOverrideRef.current || !conceptOverrideRef.current) return
    didApplyOverrideRef.current = true
    setSelectedConcepts(conceptOverrideRef.current)
    conceptOverrideRef.current = null
  }, [topic])

  // --- Syllabus-derived data ---

  // Today's study plan for this exam, and the questions that finish it.
  const {
    syllabusForTopic,
    examIdForPlan,
    examInProgress,
    plan,
    planLoading,
    todayConcepts,
    planConceptCount,
    todayAnsweredIds,
    buildTodaysPlanSelection,
  } = useTodaysPlanQuiz({
    topic,
    syllabi,
    masteryRecords,
    masteryLoading,
    targetDates,
    examProgress,
    questions: allQuestions,
    inLevels,
  })

  // Concepts sorted by their position in the exam syllabus, then grouped under
  // their parent learning objectives.
  const orderedConcepts = useMemo(
    () => orderConceptsBySyllabus(conceptsByExam[topic] ?? [], syllabusForTopic),
    [conceptsByExam, topic, syllabusForTopic],
  )
  const groupedConcepts = useMemo(
    () => groupConceptsBySyllabus(orderedConcepts, syllabusForTopic),
    [syllabusForTopic, orderedConcepts],
  )

  // Each concept's mastery level, for the topic list's badges.
  const conceptLevelMap = useMemo(
    () => conceptLevels(examIdForPlan, masteryRecords, orderedConcepts, new Date()),
    [examIdForPlan, masteryRecords, orderedConcepts],
  )

  const planReady = examInProgress && isPro && !!plan && planConceptCount > 0

  const quizLaunch: LaunchSettings = {
    mode: 'quiz',
    reveal: quizSettings.reveal,
    links: quizSettings.conceptLinks ? '1' : '0',
    timed: quizSettings.timed,
  }
  const examLaunch: LaunchSettings = {
    mode: 'mock-exam',
    reveal: examSettings.reveal,
    links: examSettings.conceptLinks ? '1' : '0',
    timed: examSettings.timed,
  }

  // Store the coverage-optimal question set for today's plan and jump straight
  // into the quiz. `replace` when launched by a Dashboard autostart: the
  // address that asked for it would only launch another quiz, so Back from the
  // quiz goes to the Dashboard instead.
  const { reveal: quizReveal, conceptLinks: quizLinks, timed: quizTimed } = quizSettings
  // Launch a stored set of question ids as a quiz under the reader's settings.
  const launchIds = useCallback((ids: readonly string[], replace: boolean): boolean => {
    if (ids.length === 0) return false
    storeSelectedIds(ids)
    navigate(
      quizLaunchUrl(
        { kind: 'plan', count: ids.length },
        { mode: 'quiz', reveal: quizReveal, links: quizLinks ? '1' : '0', timed: quizTimed },
      ),
      { replace },
    )
    return true
  }, [navigate, quizReveal, quizLinks, quizTimed])

  const launchTodaysPlan = useCallback((desiredCount: number, replace = false, leadIds: readonly string[] = []): boolean => {
    const sel = buildTodaysPlanSelection()
    if (!sel) return false
    const selected = selectQuestionsForCoverage(sel.todayQs, sel.concepts, desiredCount, { seenIds: todayAnsweredIds })
    if (selected.length === 0) return false
    return launchIds(sessionQuizIds(leadIds, selected.map(q => q.id)), replace)
  }, [buildTodaysPlanSelection, todayAnsweredIds, launchIds])

  // One-click launch from the dashboard's Start session: one quiz holding the
  // missed questions it handed over (`storeSessionMistakes`) and the fewest
  // questions that complete today's plan. A quiet loading state stands in for
  // the builder until it lands or can't.
  const [sessionMistakes] = useState(peekSessionMistakes)
  const autostartLaunch = useCallback(() => {
    const known = new Set(allQuestions.map(q => q.id))
    const mistakeIds = (sessionMistakes?.ids ?? []).filter(id => known.has(id))
    const withPlan = sessionMistakes?.plan !== false && planReady
    clearSessionMistakes()
    // Today's session, sized by time: the fewest questions that cover the
    // concepts it named, after the misses it fixes. No plan is needed, so a
    // free reader's session launches the same way.
    const sessionConcepts = sessionMistakes?.concepts ?? []
    if (sessionConcepts.length > 0) {
      const pool = questionsOnConcepts(allQuestions, topic, sessionConcepts)
      const cover = pool.length > 0
        ? selectQuestionsForCoverage(
            pool, sessionConcepts,
            minQuestionsToCoverConcepts(pool, sessionConcepts, { seenIds: todayAnsweredIds }),
            { seenIds: todayAnsweredIds },
          )
        : []
      // In step order (Fix mistakes, Learn, Review), with each question's step
      // left for the quiz page: its progress bar is grouped by them.
      const { ids, steps } = sessionQuizSteps(mistakeIds, cover, sessionMistakes?.learn ?? [])
      const launched = launchIds(ids, true)
      if (launched) storeQuizSteps(steps)
      return launched
    }
    if (withPlan) {
      const sel = buildTodaysPlanSelection()
      if (sel && launchTodaysPlan(minQuestionsToCoverConcepts(sel.todayQs, sel.concepts, { seenIds: todayAnsweredIds }), true, mistakeIds)) {
        return true
      }
    }
    return launchIds(mistakeIds, true)
  }, [allQuestions, topic, sessionMistakes, planReady, buildTodaysPlanSelection, launchTodaysPlan, launchIds, todayAnsweredIds])
  const isAutostarting = useDashboardAutostart({
    signedIn: !!user,
    isQuiz: initialMode !== 'mock-exam',
    topic,
    loading: masteryLoading || conceptsLoading || planLoading || subLoading,
    eligible: allQuestions.length > 0 && (planReady || !!sessionMistakes),
    launch: autostartLaunch,
  })

  // Persist the picked topics to localStorage.
  useEffect(() => {
    if (!topic) return
    saveConcepts(topic, selectedConcepts)
  }, [selectedConcepts, topic])

  const conceptAvailableCount = useMemo(() => {
    if (!selectedConcept) return 0
    return filterQuestions(allQuestions, { concept: selectedConcept }).filter(inLevels).length
  }, [allQuestions, selectedConcept, inLevels])

  // A quiz opened on one concept (a `?concept=` link) becomes an ordinary
  // topic selection the moment the reader changes it in the popup.
  function changeTopics(next: (current: string[]) => string[]) {
    setSelectedConcepts(prev => next(selectedConcept ? [selectedConcept] : prev))
    if (selectedConcept) setSelectedConcept('')
  }

  // The exam's past sittings: the authored catalogue merged with whatever the
  // question bank holds (docs/mock-exam-browser.md). The row is named after
  // them: "Past papers", or "Sample questions" for an exam with none released.
  const pastExamRows = useMemo(
    () => (topic ? buildPastExamRows(allQuestions, topic) : []),
    [allQuestions, topic],
  )
  const examSourceName = examSourceLabel(pastExamRows)
  // An exam with no released sittings: the body's sample set, as its own PDFs.
  const sampleLinks = useMemo(() => {
    if (!topic || pastExamRows.length > 0) return []
    const { reportLink, solutionsLink } = shelfPdfLinks(topic, null, 0)
    return [reportLink, solutionsLink].filter((l): l is { url: string; label: string } => !!l)
  }, [topic, pastExamRows.length])

  const mockExamCount = practiceExamQuestions(topic)
  const currentExam = quizExamFor(topic)
  const examLabel = currentExam?.label ?? topic
  // The entry's name, for the way back from what it opens.
  usePageLabel(topic ? 'Practice' : undefined)

  // The real paper's pace, said beside the Timed switch.
  const topicPace = paceForExam(topic)
  const timedPace = topicPace ? formatPace(topicPace) : undefined

  // ── The three pools: the card's quiz, a practice exam, the past papers ──
  const { pool: quizPool, difficultyCounts } = useBuilderPool({
    questions: allQuestions,
    topic,
    source: 'custom',
    sitting: null,
    concept: selectedConcept,
    concepts: selectedConcepts,
    todaysPlanPool: null,
    inLevels,
    attempted: attemptsByQuestionId,
    mode: 'quiz',
  })
  const { pool: practicePool } = useBuilderPool({
    questions: allQuestions,
    topic,
    source: 'custom',
    sitting: null,
    concept: '',
    concepts: [],
    todaysPlanPool: null,
    inLevels: everyLevel,
    attempted: attemptsByQuestionId,
    mode: 'mock-exam',
  })
  // Clamp the count when the pool shrinks under it.
  useEffect(() => {
    if (quizPool.length > 0 && count > quizPool.length) setCount(quizPool.length)
  }, [quizPool.length, count])

  const quizCount = Math.min(count, quizPool.length)
  const practiceCount = Math.min(mockExamCount, practicePool.length)

  const estimateFor = (pool: typeof quizPool, n: number) => {
    const s = estimateSeconds(pool, n)
    return s === null ? null : formatEstimate(s)
  }
  const quizEstimate = estimateFor(quizPool, quizCount)
  const practiceSeconds = estimateSeconds(practicePool, practiceCount)

  // The card's four pills: each setting's current value.
  const pills = useMemo(
    () => settingPills({
      topics: selectedConcept
        ? { labels: [selectedConcept], more: 0 }
        : topicPills(groupedConcepts, selectedConcepts),
      levels: difficulties,
      timed: quizSettings.timed,
      revealDuring: quizSettings.reveal === 'during',
    }),
    [selectedConcept, groupedConcepts, selectedConcepts, difficulties, quizSettings.timed, quizSettings.reveal],
  )

  // Each topic's questions under the levels picked, for the popup's counts.
  const examPool = useMemo(
    () => (topic ? filterQuestions(allQuestions, { exam: topic }).filter(inLevels) : []),
    [allQuestions, topic, inLevels],
  )
  const topicCounts = useMemo(() => topicQuestionCounts(groupedConcepts, examPool), [groupedConcepts, examPool])

  function startQuiz() {
    if (selectedConcept) {
      navigate(quizLaunchUrl({
        kind: 'concept',
        concept: selectedConcept,
        levels: levelsParam,
        count: quizCount < conceptAvailableCount ? quizCount : undefined,
      }, quizLaunch))
      return
    }
    navigate(quizLaunchUrl({
      kind: 'exam',
      exam: topic,
      concepts: selectedConcepts,
      levels: levelsParam,
      count: quizCount,
    }, quizLaunch))
  }

  function startPractice() {
    navigate(quizLaunchUrl({ kind: 'exam', exam: topic, concepts: [], levels: null, count: practiceCount }, examLaunch))
  }

  const hasTopic = topic !== ''

  function handleCountChange(next: number) {
    setCount(Math.max(1, Math.min(next, quizPool.length > 0 ? quizPool.length : next)))
  }

  // The study guide page of the exam showing, for the switcher's "Add" row on a visit.
  const visitingPageId = useMemo(() => {
    const exam = quizExamFor(topic)
    if (!visiting || !exam) return null
    return syllabi.find(sy => wikiExamIdToProgressKey(sy.examId) === exam.progressKey
      && (!exam.examId || sy.examId === exam.examId))?.examId ?? null
  }, [visiting, topic, syllabi])

  const examBank = useMemo(
    () => (topic ? filterQuestions(allQuestions, { exam: topic, includeOffSyllabus: true }) : []),
    [allQuestions, topic],
  )
  const flashcardCount = useFlashcards(state => state.cards.length)
  const status = examStatus(currentExam?.progressKey, currentExam?.examId)

  if (hasTopic && initialMode === 'mock-exam' && !searchParams.get('autostart') && pastExamRows.length > 0) {
    return <Navigate to={`/papers?topic=${encodeURIComponent(topic)}`} replace />
  }

  // Dashboard launch is still resolving — hold a quiet loading state rather than
  // flashing the setup screen on the way into the quiz.
  if (isAutostarting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Getting today's quiz ready…</p>
      </div>
    )
  }

  // The reader's exams are still loading and nothing names an exam yet: wait
  // rather than flash the exam list.
  if (!hasTopic && focusLoading) {
    return <div className={cn(GROUND, 'min-h-[60vh]')} aria-busy="true" />
  }

  // ── Nothing to open: a reader with no exams adds one here (R11), and an
  // exam in focus with no question bank says so ──
  if (!hasTopic) {
    return (
      <div className={cn(GROUND, 'min-h-full')} data-testid="practice-empty">
        <div className="mx-auto flex w-full max-w-xl flex-col px-5 pb-10 pt-3 lg:pt-8">
          <div className="flex items-center gap-1">
            <MobileNavButton className="-ml-2 h-11 w-11 lg:hidden" />
            {focusWithoutBank && (
              <ExamSwitcherButton
                examKey={wikiExamIdToProgressKey(focusWithoutBank.examId)}
                label={focusWithoutBank.examLabel}
                testId="practice-exam"
              />
            )}
          </div>
          {focusWithoutBank ? (
            <div className="mt-6 flex flex-col items-start gap-4" data-testid="quiz-no-bank">
              <p className="text-[17px] leading-normal">{focusWithoutBank.examLabel} has no practice questions yet.</p>
              {focusWithoutBank.fileName && (
                <Link
                  to={wikiRoute({ kind: 'exam', name: focusWithoutBank.fileName })}
                  className="flex h-11 items-center rounded-full border-[1.5px] border-foreground px-5 text-[15px] font-semibold hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Open its study guide
                </Link>
              )}
            </div>
          ) : !hasExams ? (
            <div className="mt-2">
              <Suspense fallback={null}>
                <AddExamFlow to="/" />
              </Suspense>
            </div>
          ) : null}
          {GAMES_ENABLED && <div className="mt-8"><QuizGamesPanel /></div>}
        </div>
      </div>
    )
  }

  const sourceRowDetail = pastExamRows.length > 0
    ? papersCountDetail(pastExamRows)
    : sourceDetail(allQuestions.filter(q => q.exam === topic && !q.year))

  return (
    <>
      <div className={cn(GROUND, 'min-h-full')} data-testid="practice">
        <div className="mx-auto flex w-full max-w-xl flex-col px-5 pb-10 pt-3 lg:pt-8">
          {/* The exam showing. Below `lg` this row is the page's top chrome,
              so it carries the way into the navigation (lib/mobileNavHost.ts). */}
          <div className="flex items-center gap-1">
            <MobileNavButton className="-ml-2 h-11 w-11 lg:hidden" />
            <ExamSwitcherButton
              examKey={currentExam?.progressKey ?? ''}
              label={examLabel}
              visiting={visitingPageId}
              testId="practice-exam"
            />
            <span className="flex-1" />
            {currentExam && (
              <QuizExamInfoButton
                exam={currentExam.value}
                examLabel={currentExam.label}
                progressKey={currentExam.progressKey}
                wikiExamId={quizWikiExamId(currentExam)}
                questions={examBank}
              />
            )}
          </div>

          {status !== 'ready' && (
            <div className="mt-3 overflow-hidden rounded-xl"><ExamStatusBanner status={status} /></div>
          )}

          <Link
            to="/search"
            data-testid="practice-search"
            className="mt-5 flex h-12 items-center gap-3 rounded-full border border-border px-4 text-base transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground"
          >
            <Search className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} aria-hidden="true" />
            Search
          </Link>

          {currentExam?.progressKey && (
            <Suspense fallback={null}>
              <div className="mt-4 empty:hidden"><RegistrationNudge examKey={currentExam.progressKey} /></div>
            </Suspense>
          )}

          <div className="-mx-2 mt-[22px]">
            <QuizCard
              count={quizCount}
              maxCount={quizPool.length}
              estimate={quizEstimate}
              pills={pills}
              onCountChange={handleCountChange}
              onOpen={openQuizSheet}
              onStart={startQuiz}
              emptyNote={allQuestions.length > 0 ? 'No questions match.' : undefined}
            />
          </div>

          <div className="mt-[18px] flex flex-col">
            <button type="button" aria-haspopup="dialog" onClick={() => setSheet('practice')} className={ROW}>
              <RowBody title={PRACTICE_EXAM_LABEL} detail={practiceExamDetail(practiceCount, practiceSeconds)} />
            </button>
            {pastExamRows.length > 0 ? (
              <Link to={`/papers?topic=${encodeURIComponent(topic)}`} className={ROW}>
                <RowBody title={examSourceName} detail={sourceRowDetail} />
              </Link>
            ) : sampleLinks.length > 0 && (
              <button type="button" aria-haspopup="dialog" onClick={() => setSheet('samples')} className={ROW}>
                <RowBody title={examSourceName} detail={sourceRowDetail} />
              </button>
            )}
            <Link to="/flashcards" className={ROW}>
              <RowBody title="Flashcards" detail={String(flashcardCount)} />
            </Link>
          </div>
          {GAMES_ENABLED && <div className="-mx-2 mt-6"><QuizGamesPanel /></div>}
        </div>
      </div>

      {sheet === 'quiz' && (
        <StartPopup
          title="Your quiz"
          onClose={closeSheet}
          startLabel={`Start ${quizCount} ${questionsWord(quizCount)}`}
          startDisabled={quizCount === 0}
          emptyNote="No questions match. Pick other topics or levels."
          onStart={startQuiz}
          focus={sheetFocus}
        >
          <PopupSection
            section="topics"
            title="Topics"
            aside={(selectedConcept || selectedConcepts.length > 0) && (
              <button
                type="button"
                onClick={() => { setSelectedConcept(''); setSelectedConcepts([]) }}
                className="flex h-11 items-center font-semibold underline underline-offset-4"
              >
                All topics
              </button>
            )}
          >
            <TopicChoices
              loading={conceptsLoading && orderedConcepts.length === 0}
              groups={groupedConcepts}
              selected={selectedConcept ? [selectedConcept] : selectedConcepts}
              counts={topicCounts}
              levels={conceptLevelMap}
              today={todayConcepts}
              onToggleTopic={name => changeTopics(current => toggleTopic(groupedConcepts, current, name))}
              onToggleConcept={concept => changeTopics(current => toggleTopicConcept(groupedConcepts, current, concept))}
            />
          </PopupSection>
          <PopupSection section="difficulty" title="Difficulty">
            <DifficultyButtons levels={difficulties} counts={difficultyCounts} onChange={quizSettings.onDifficultiesChange} />
          </PopupSection>
          <SittingSwitches
            reveal={quizSettings.reveal}
            onRevealChange={quizSettings.onRevealChange}
            timed={quizSettings.timed}
            onTimedChange={quizSettings.onTimedChange}
            timedPace={timedPace}
            conceptLinks={quizSettings.conceptLinks}
            onConceptLinksChange={quizSettings.onConceptLinksChange}
          />
        </StartPopup>
      )}

      {sheet === 'practice' && (
        <PaperPopup
          title={PRACTICE_EXAM_LABEL}
          questionCount={practiceCount}
          duration={practiceSeconds === null ? null : formatEstimate(practiceSeconds).replace('~', '')}
          note={practiceCount > 0
            ? `Drawn from the whole ${examLabel} bank, in the real paper's shape and mix of difficulty.`
            : 'This exam has no questions to draw a Practice Exam from yet.'}
          settings={examSettings}
          timedPace={timedPace}
          canStart={practiceCount > 0}
          onStart={startPractice}
          onClose={closeSheet}
        />
      )}

      {sheet === 'samples' && (
        <PaperPopup
          title={examSourceName}
          questionCount={practiceCount}
          duration={practiceSeconds === null ? null : formatEstimate(practiceSeconds).replace('~', '')}
          note={`A Practice Exam drawn from the ${examLabel} bank. The published questions and solutions open here to read.`}
          documents={sampleLinks}
          documentSubtitle={examLabel}
          settings={examSettings}
          timedPace={timedPace}
          canStart={practiceCount > 0}
          onStart={startPractice}
          onClose={closeSheet}
        />
      )}

    </>
  )
}

