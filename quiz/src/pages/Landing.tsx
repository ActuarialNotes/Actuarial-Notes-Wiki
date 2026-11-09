import { lazy, Suspense, useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { usePageLabel } from '@/hooks/useBack'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { QuizFloatingSearch } from '@/components/QuizFloatingSearch'
import { ExamStatusBanner } from '@/components/FloatingSearchBar'
import { examAccentStyle } from '@/lib/examColors'
import { useTodayQuizCounts } from '@/hooks/useTodayQuizCount'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress } from '@/contexts/examProgress'
import { useConcepts } from '@/hooks/useConcepts'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useDashboardAutostart } from '@/hooks/useDashboardAutostart'
import { selectQuestionsForCoverage, minQuestionsToCoverConcepts } from '@/lib/studyPlan'
import { useSubscription } from '@/hooks/useSubscription'
import { filterQuestions } from '@/lib/parser'
import type { QuizMode } from '@/lib/parser'
import { useQuestionAttempts } from '@/hooks/useQuestionAttempts'
import { cn } from '@/lib/utils'
import { buildPastExamRows, examSourceLabel, PRACTICE_EXAM_LABEL, practiceExamQuestions, sittingLabel } from '@/lib/pastExams'
import { PUBLISHER_ORDER, questionPublisher } from '@/lib/questionPublisher'
import { applyPassRates } from '@/lib/passRates'
import { useExamPassRates } from '@/hooks/useExamPassRates'
import { examStatus } from '@/lib/examStatus'
import { difficultyLevelsToParam, inDifficultyLevels } from '@/lib/quizDifficulty'
import { formatPace, paceForExam } from '@/lib/quizTiming'
import { estimateSeconds, formatEstimate, questionsWord, topicPills } from '@/lib/quizSetup'
import { defaultBody, loadBody, saveBody, type ExamBody } from '@/lib/bodyFilter'
import {
  conceptLevels,
  groupConceptsBySyllabus,
  loadSavedConcepts,
  orderConceptsBySyllabus,
  quizExamFor,
  quizLaunchUrl,
  quizSearchFilter,
  saveConcepts,
  selectGroup,
  clearSessionMistakes,
  peekSessionMistakes,
  sessionQuizIds,
  storeSelectedIds,
  takeConceptOverride,
  toggleConcept as toggleConceptIn,
  type LaunchSettings,
  type QuizSitting,
} from '@/lib/quizBuilder'
import { useQuizBuilderSettings } from '@/hooks/useQuizBuilderSettings'
import { useQuizExamScreen } from '@/hooks/useQuizExamScreen'
import { useBuilderPool } from '@/hooks/useBuilderPool'
import { useTodaysPlanQuiz } from '@/hooks/useTodaysPlanQuiz'
import { ConceptGroupList } from '@/components/landing/ConceptGroupList'
import { QuizExamLadder } from '@/components/landing/QuizExamLadder'
import { QuizGamesPanel } from '@/components/landing/QuizGamesPanel'
import { GAMES_ENABLED } from '@/lib/featureFlags'
import { PastPaperShelf } from '@/components/landing/PastPaperShelf'
import { QuizTitleRow } from '@/components/landing/QuizTitleRow'
import { QuizHeroCard, type SetupSection } from '@/components/landing/QuizHeroCard'
import { PaperTiles, TodaysPlanTile } from '@/components/landing/QuizLaunchTiles'
import {
  CountChoice,
  DifficultyChoice,
  QuizSetupSheet,
  SheetSection,
  SittingChoices,
} from '@/components/landing/QuizSetupSheet'
import { useQuizExamStrip } from '@/components/landing/useQuizExamStrip'
import { countOptions as buildCountOptions } from '@/components/landing/builderOptions'
import type { Question } from '@/lib/parser'

// The Quiz tab: the exam list, and one exam's quiz setup screen laid over it.
// What the builder decides — the exams, the syllabus order, today's plan's
// pool, the draw's size and each launch's address — is lib/quizBuilder.ts;
// what the card says is lib/quizSetup.ts; what it draws is
// components/landing/. This page holds the state that joins them.
//
// The setup screen is a card and three tiles. The card is the reader's own
// quiz — its count, how long it should take, a pill for each topic, its
// settings as icons, and Start; each opens the setup sheet at its own section
// (the count at How many), where the topics, count, levels and how it's sat
// are changed. Under it, today's plan (Pro's;
// shown locked to anyone else, so the plan never stands above building your
// own), then a practice exam drawn to the paper's shape and the exam's past
// papers, each opening the sheet in its own form.

// Lazy: it reads the Store's registration tables, which stay out of first paint.
const RegistrationNudge = lazy(() => import('@/components/RegistrationNudge'))

/** Which form of the setup sheet is open. */
type Sheet = 'quiz' | 'practice' | 'papers'

/** Who wrote an exam's questions, for a bank with no past papers: "SOA sample questions", "Actuarial Notes questions". */
function sourceDetail(questions: readonly Question[]): string {
  const found = new Set(questions.map(q => questionPublisher(q)).filter(p => p !== null))
  const names = PUBLISHER_ORDER.filter(p => found.has(p))
  if (names.length === 0) return 'No past papers'
  return names.map(p => (p === 'Actuarial Notes' ? 'Actuarial Notes questions' : `${p} sample questions`)).join(' · ')
}

export default function Landing() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { progress: examProgress, targetDates, selectedTrack, examVariants } = useExamProgress()
  const { byExam: conceptsByExam, loading: conceptsLoading } = useConcepts()
  const { questions: allQuestions } = useAllQuestions()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { syllabi } = useWikiSyllabus()
  const { isPro, loading: subLoading } = useSubscription()
  // Per-exam "questions left in today's plan" — badges the exam cards, so the
  // count is visible before an exam is even picked.
  const { byExam: todayQuizByExam } = useTodayQuizCounts()
  // Attempt history, for the past-paper shelf's reads.
  const { byQuestionId: attemptsByQuestionId } = useQuestionAttempts()

  // A link with `mode=mock-exam` (the old Past Papers tab's) opens on the
  // past papers.
  const initialMode = (searchParams.get('mode') as QuizMode | null) ?? 'quiz'
  const initialConcept = searchParams.get('concept') ?? ''

  // Shared with the Study Guides tab — same key, same fallback. See
  // lib/bodyFilter.ts.
  const [filterOverride, setFilterOverride] = useState<ExamBody | null>(loadBody)
  const activeFilter = filterOverride ?? defaultBody(selectedTrack)

  function handleSetFilter(f: ExamBody) {
    saveBody(f)
    setFilterOverride(f)
  }

  // The exam list or one exam's setup screen, and the moves between them.
  const { topic, openExam, closeExam } = useQuizExamScreen()

  const [selectedConcept, setSelectedConcept] = useState(initialConcept)
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([])
  const [count, setCount] = useState<number>(3)
  // A past paper picked on the shelf (null = a mix across the sittings).
  const [selectedSitting, setSelectedSitting] = useState<QuizSitting>(null)
  const [sheet, setSheet] = useState<Sheet | null>(initialMode === 'mock-exam' ? 'papers' : null)
  const closeSheet = useCallback(() => setSheet(null), [])
  // Where the quiz's sheet opens — the part of the card that was tapped.
  const [sheetFocus, setSheetFocus] = useState<SetupSection | undefined>()
  const openQuizSheet = (section: SetupSection) => {
    setSheetFocus(section)
    setSheet('quiz')
  }

  // The settings each format remembers apart: the card's quiz, and the whole
  // papers (practice exam and past papers), which are sat as practice exams.
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
    setSelectedSitting(null)
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
    todaysPlanFullCount,
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
    if (withPlan) {
      const sel = buildTodaysPlanSelection()
      if (sel && launchTodaysPlan(minQuestionsToCoverConcepts(sel.todayQs, sel.concepts, { seenIds: todayAnsweredIds }), true, mistakeIds)) {
        return true
      }
    }
    return launchIds(mistakeIds, true)
  }, [allQuestions, sessionMistakes, planReady, buildTodaysPlanSelection, launchTodaysPlan, launchIds, todayAnsweredIds])
  const isAutostarting = useDashboardAutostart({
    signedIn: !!user,
    isQuiz: initialMode !== 'mock-exam',
    topic,
    loading: masteryLoading || conceptsLoading || planLoading || subLoading,
    eligible: allQuestions.length > 0 && (planReady || (sessionMistakes?.ids.length ?? 0) > 0),
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

  function toggleConcept(concept: string) {
    setSelectedConcepts(prev => toggleConceptIn(prev, concept))
  }

  function selectAllInGroup(group: { subtopics: string[] }, e: React.MouseEvent) {
    e.stopPropagation()
    const allSelected = group.subtopics.every(s => selectedConcepts.includes(s))
    setSelectedConcepts(prev => selectGroup(prev, group.subtopics, !allSelected))
  }

  // The exam's past sittings — the authored catalogue merged with whatever the
  // question bank holds, with published pass ratios laid over them
  // (docs/mock-exam-browser.md). The tile is named after the shelf: "Past
  // Papers", or "By Source" for an exam with no released sittings.
  const livePassRates = useExamPassRates(topic)
  const pastExamRows = useMemo(
    () => (topic ? applyPassRates(buildPastExamRows(allQuestions, topic), livePassRates) : []),
    [allQuestions, topic, livePassRates],
  )
  const examSourceName = examSourceLabel(pastExamRows)

  const mockExamCount = practiceExamQuestions(topic)
  const currentExam = quizExamFor(topic)
  const examLabel = currentExam?.label ?? topic
  // An exam's builder names its entry, for the way back from what it opens.
  usePageLabel(topic ? `${examLabel} quiz` : undefined)

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
  const { pool: papersPool } = useBuilderPool({
    questions: allQuestions,
    topic,
    source: 'papers',
    sitting: selectedSitting,
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
  const papersCount = selectedSitting ? papersPool.length : Math.min(mockExamCount, papersPool.length)

  const estimateFor = (pool: typeof quizPool, n: number) => {
    const s = estimateSeconds(pool, n)
    return s === null ? null : formatEstimate(s)
  }
  const quizEstimate = estimateFor(quizPool, quizCount)
  const practiceEstimate = estimateFor(practicePool, practiceCount)

  // The card's pills: the topics. The settings are the card's icons.
  const pills = useMemo(() => {
    if (selectedConcept) return [selectedConcept]
    const { labels, more } = topicPills(groupedConcepts, selectedConcepts)
    return [...labels, ...(more > 0 ? [`+${more} more`] : [])]
  }, [selectedConcept, groupedConcepts, selectedConcepts])

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

  function startPapers() {
    navigate(quizLaunchUrl({ kind: 'exam', exam: topic, sitting: selectedSitting, levels: null, count: papersCount }, examLaunch))
  }

  const hasTopic = topic !== ''

  // The exam being configured, named in the search bar's strip.
  const examStrip = useQuizExamStrip(currentExam, allQuestions, syllabi, closeExam)

  // ── Question count ─────────────────────────────────────────────────────
  const countOptions = useMemo(
    () => buildCountOptions({ fullPlanCount: 0, available: quizPool.length }),
    [quizPool.length],
  )
  function handleCountChange(next: string) {
    const n = Number(next)
    setCount(Math.min(n, quizPool.length > 0 ? quizPool.length : n))
  }

  // Filter reflecting the card's quiz — passed to the search bar, which opens
  // on it: the exam as its Exam choice and the topics as its Concepts choices.
  const searchFilter = useMemo(
    () => quizSearchFilter({
      topic,
      source: 'custom',
      sitting: null,
      concept: selectedConcept,
      concepts: selectedConcepts,
      todaysPlan: null,
    }),
    [topic, selectedConcept, selectedConcepts],
  )

  // Today's plan's tile: Pro's to start, everyone else's to see locked. A Pro
  // reader who isn't working toward this exam has no plan for it, so no tile.
  const planComplete = todayQuizByExam[examIdForPlan ?? '']?.complete ?? false
  const planTile: 'ready' | 'done' | 'empty' | 'locked' | null = subLoading
    ? null
    : !isPro
    ? 'locked'
    : !examInProgress || planLoading
    ? null
    : planReady
    ? (planComplete ? 'done' : 'ready')
    : 'empty'

  const papersDetail = pastExamRows.length > 0
    ? (() => {
        const years = pastExamRows.map(r => r.year)
        const lo = Math.min(...years)
        const hi = Math.max(...years)
        return `${pastExamRows.length} sitting${pastExamRows.length === 1 ? '' : 's'} · ${lo === hi ? lo : `${lo}–${hi}`}`
      })()
    : sourceDetail(allQuestions.filter(q => q.exam === topic))

  const accent = hasTopic ? examAccentStyle(currentExam?.progressKey ?? '') : undefined

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

  const sittingSettings = (s: typeof quizSettings) => (
    <SheetSection section="sitting" title="While you answer">
      <SittingChoices
        reveal={s.reveal}
        onRevealChange={s.onRevealChange}
        timed={s.timed}
        onTimedChange={s.onTimedChange}
        timedPace={timedPace}
        conceptLinks={s.conceptLinks}
        onConceptLinksChange={s.onConceptLinksChange}
      />
    </SheetSection>
  )

  return (
    <>
    <QuizFloatingSearch
      filter={searchFilter}
      strip={examStrip}
      banner={hasTopic ? <ExamStatusBanner status={examStatus(currentExam?.progressKey, currentExam?.examId)} /> : undefined}
    />
    {/* The exam list is the Study Guides home page's shell, to the pixel: the
        same container, the same `space-y-8` and the same title row, so
        switching tabs doesn't shift the ladder. Picking an exam is a different
        screen, and keeps its own compact sticky header. */}
    <div
      className={cn(
        'max-w-4xl mx-auto w-full px-4 sm:px-6',
        hasTopic ? 'pt-4 pb-10 space-y-4' : 'py-8 space-y-8',
      )}
      // Inside an exam the screen is scoped to its colour: the card, the
      // pick in the sheet, the learning objectives' weight bars.
      style={accent}
    >
      <QuizTitleRow
        hasTopic={hasTopic}
        signedIn={!!user}
        body={activeFilter}
        onBodyChange={handleSetFilter}
        concept={selectedConcept}
        conceptCount={conceptAvailableCount}
        onClearConcept={() => setSelectedConcept('')}
      />

      {GAMES_ENABLED && !hasTopic && <QuizGamesPanel />}

      {hasTopic && currentExam?.progressKey && (
        <Suspense fallback={null}>
          <RegistrationNudge examKey={currentExam.progressKey} />
        </Suspense>
      )}

      {!hasTopic && (
        <QuizExamLadder
          body={activeFilter}
          syllabi={syllabi}
          questions={allQuestions}
          examProgress={examProgress}
          examVariants={examVariants}
          targetDates={targetDates}
          todayQuizByExam={todayQuizByExam}
          onOpenExam={openExam}
        />
      )}

      {hasTopic && (
        <div className="mx-auto max-w-xl space-y-3">
          <QuizHeroCard
            count={quizCount}
            estimate={quizEstimate}
            pills={pills}
            levels={difficulties}
            timed={quizSettings.timed}
            revealDuring={quizSettings.reveal === 'during'}
            conceptLinks={quizSettings.conceptLinks}
            onChange={openQuizSheet}
            onStart={startQuiz}
          />
          {planTile && (
            <TodaysPlanTile
              state={planTile}
              conceptCount={planConceptCount}
              questionCount={todaysPlanFullCount}
              onStart={() => { launchTodaysPlan(todaysPlanFullCount) }}
            />
          )}
          <PaperTiles
            practiceDetail={`${practiceCount} ${questionsWord(practiceCount)}${practiceEstimate ? ` · ${practiceEstimate}` : ''}`}
            papersTitle={examSourceName}
            papersDetail={papersDetail}
            onPractice={() => setSheet('practice')}
            onPapers={() => setSheet('papers')}
          />
        </div>
      )}
    </div>

    {hasTopic && sheet === 'quiz' && (
      <QuizSetupSheet
        title="Your quiz"
        style={accent}
        onClose={closeSheet}
        startLabel={`Start ${quizCount} ${questionsWord(quizCount)}`}
        startDisabled={quizCount === 0}
        emptyNote="No questions match. Pick other topics or levels."
        onStart={startQuiz}
        focus={sheetFocus}
      >
        {!selectedConcept && (
          <SheetSection
            section="topics"
            title="Topics"
            aside={selectedConcepts.length > 0 ? (
              <button
                type="button"
                onClick={() => setSelectedConcepts([])}
                className="font-semibold text-foreground hover:underline"
              >
                Clear
              </button>
            ) : 'All topics'}
          >
            <ConceptGroupList
              loading={conceptsLoading && orderedConcepts.length === 0}
              groups={groupedConcepts}
              selected={selectedConcepts}
              today={todayConcepts}
              onToggle={toggleConcept}
              onSelectAll={selectAllInGroup}
              levels={conceptLevelMap}
            />
          </SheetSection>
        )}
        <SheetSection section="count" title="How many" aside={`${quizPool.length} available`}>
          <CountChoice options={countOptions} value={String(count)} onChange={handleCountChange} max={quizPool.length} />
        </SheetSection>
        <SheetSection section="difficulty" title="Difficulty">
          <DifficultyChoice
            levels={difficulties}
            onChange={quizSettings.onDifficultiesChange}
            counts={difficultyCounts}
          />
        </SheetSection>
        {sittingSettings(quizSettings)}
      </QuizSetupSheet>
    )}

    {hasTopic && sheet === 'practice' && (
      <QuizSetupSheet
        title={PRACTICE_EXAM_LABEL}
        style={accent}
        onClose={closeSheet}
        startLabel={`Start ${PRACTICE_EXAM_LABEL}`}
        startDisabled={practiceCount === 0}
        emptyNote="This exam has no questions to draw a Practice Exam from yet."
        onStart={startPractice}
      >
        <div className="flex items-center gap-4 rounded-2xl bg-card p-4">
          <span className="text-5xl font-bold leading-none tracking-tight tabular-nums">{practiceCount}</span>
          <span className="min-w-0 text-lg font-bold leading-tight">
            <span className="block">{questionsWord(practiceCount)}</span>
            {practiceEstimate && <span className="block text-muted-foreground">{practiceEstimate}</span>}
          </span>
        </div>
        <p className="text-[15px] text-muted-foreground">
          Drawn from the whole {examLabel} bank, in the real paper's shape and mix of difficulty.
        </p>
        {sittingSettings(examSettings)}
      </QuizSetupSheet>
    )}

    {hasTopic && sheet === 'papers' && (
      <QuizSetupSheet
        title={examSourceName}
        style={accent}
        onClose={closeSheet}
        startLabel={selectedSitting ? `Start ${sittingLabel(selectedSitting.year, selectedSitting.session)}` : `Start ${PRACTICE_EXAM_LABEL}`}
        startDisabled={papersCount === 0}
        emptyNote="This paper hasn't been added yet."
        onStart={startPapers}
      >
        <PastPaperShelf
          topic={topic}
          examLabel={examLabel}
          questions={allQuestions}
          rows={pastExamRows}
          selected={selectedSitting}
          onSelect={setSelectedSitting}
          mode="mock-exam"
          count={papersCount}
        />
        {sittingSettings(examSettings)}
      </QuizSetupSheet>
    )}
    </>
  )
}
