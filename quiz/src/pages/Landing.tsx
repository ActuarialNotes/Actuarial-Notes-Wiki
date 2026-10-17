import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { usePageLabel } from '@/hooks/useBack'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { QuizFloatingSearch } from '@/components/QuizFloatingSearch'
import { ExamStatusBanner } from '@/components/FloatingSearchBar'
import { examAccentStyle } from '@/lib/examColors'
import { useTodayQuizCounts } from '@/hooks/useTodayQuizCount'
import { badgeCountFor } from '@/lib/todayPlanCount'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useConcepts } from '@/hooks/useConcepts'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useDashboardAutostart } from '@/hooks/useDashboardAutostart'
import { selectQuestionsForCoverage, minQuestionsToCoverConcepts } from '@/lib/studyPlan'
import { useSubscription } from '@/hooks/useSubscription'
import { filterQuestions } from '@/lib/parser'
import type { QuizMode } from '@/lib/parser'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useActionBarHeight } from '@/hooks/useActionBarHeight'
import { useQuestionAttempts } from '@/hooks/useQuestionAttempts'
import { cn } from '@/lib/utils'
import { buildPastExamRows, examSourceLabel, practiceExamQuestions } from '@/lib/pastExams'
import { applyPassRates } from '@/lib/passRates'
import { useExamPassRates } from '@/hooks/useExamPassRates'
import { examStatus } from '@/lib/examStatus'
import { difficultyLevelsToParam, inDifficultyLevels, shuffle } from '@/lib/quizDifficulty'
import { formatPace, paceForExam } from '@/lib/quizTiming'
import { defaultBody, loadBody, saveBody, type ExamBody } from '@/lib/bodyFilter'
import {
  conceptLevels,
  drawSignature,
  groupConceptsBySyllabus,
  loadSavedConcepts,
  orderConceptsBySyllabus,
  quizExamFor,
  quizLaunchUrl,
  quizQuestionCount as quizQuestionCountFor,
  quizSearchFilter,
  saveConcepts,
  selectGroup,
  storeSelectedIds,
  takeConceptOverride,
  toggleConcept as toggleConceptIn,
  type LaunchSettings,
  type QuizSitting,
  type QuizSource,
} from '@/lib/quizBuilder'
import { useQuizBuilderSettings } from '@/hooks/useQuizBuilderSettings'
import { useQuizExamScreen } from '@/hooks/useQuizExamScreen'
import { useShuffledDraw } from '@/hooks/useShuffledDraw'
import { useBuilderPool } from '@/hooks/useBuilderPool'
import { useTodaysPlanQuiz } from '@/hooks/useTodaysPlanQuiz'
import { ConceptGroupList } from '@/components/landing/ConceptGroupList'
import { QuizActionBar } from '@/components/landing/QuizActionBar'
import { QuizExamLadder } from '@/components/landing/QuizExamLadder'
import { QuizGamesPanel } from '@/components/landing/QuizGamesPanel'
import { PastPaperShelf } from '@/components/landing/PastPaperShelf'
import { QuizTitleRow } from '@/components/landing/QuizTitleRow'
import { TodaysPlanPanel } from '@/components/landing/TodaysPlanPanel'
import { useQuizExamStrip } from '@/components/landing/useQuizExamStrip'
import { countOptions as buildCountOptions, sourceOptions as buildSourceOptions } from '@/components/landing/builderOptions'

// The Quiz tab: the exam list, and one exam's quiz builder laid over it. What
// the builder decides — the exams, the syllabus order, today's plan's pool,
// the draw's size and each launch's address — is lib/quizBuilder.ts; what it
// draws is components/landing/. This page holds the state that joins them.

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
  // Attempt history, for the "new to you" read on the question deck.
  const { byQuestionId: attemptsByQuestionId, tracked: attemptsTracked } = useQuestionAttempts()

  const initialMode = (searchParams.get('mode') as QuizMode | null) ?? 'quiz'
  const initialConcept = searchParams.get('concept') ?? ''

  // Shared with the Study Guides tab — same key, same fallback. This page used
  // to derive its own, from the other direction ("is this an SOA track"), so a
  // reader on the DEFAULT track (neither body's) opened this tab on CAS and
  // that one on SOA, and switching tabs looked like the picker changing itself.
  // See lib/bodyFilter.ts.
  const [filterOverride, setFilterOverride] = useState<ExamBody | null>(loadBody)
  const activeFilter = filterOverride ?? defaultBody(selectedTrack)

  function handleSetFilter(f: ExamBody) {
    saveBody(f)
    setFilterOverride(f)
  }

  // The exam list or one exam's builder, and the moves between them.
  const { topic, openExam, closeExam } = useQuizExamScreen()

  const [selectedConcept, setSelectedConcept] = useState(initialConcept)

  // What the quiz draws from: today's plan, a hand-picked set of topics, or the
  // exam's past papers. `conceptMode` below is a read-only view of it, kept so
  // the plan code reads unchanged.
  const [source, setSource] = useState<QuizSource>(initialMode === 'mock-exam' ? 'papers' : 'custom')
  const conceptMode: 'today' | 'custom' = source === 'today' ? 'today' : 'custom'
  // How it is sat — the format, chosen beside Start and independent of the
  // source. A quiz is a short set you size and filter; a practice exam is sat
  // the way a paper is, full length and every difficulty. (A link with
  // `mode=mock-exam` — the old Past Papers tab's — opens on both.)
  const [format, setFormat] = useState<QuizMode>(initialMode === 'mock-exam' ? 'mock-exam' : 'quiz')
  const mode: QuizMode = format

  // Quiz-specific options
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([])
  const [isAdaptive, setIsAdaptive] = useState(false)
  const [count, setCount] = useState<number>(3)

  // The settings menu's choices — reveal, timing and concept links remembered
  // per mode, the difficulty levels one choice for every quiz.
  const settings = useQuizBuilderSettings(mode)
  const { reveal, timed, conceptLinks, difficulties } = settings
  const linksParam = conceptLinks ? '1' : '0'

  // Which difficulty levels a quiz draws from (lib/quizDifficulty.ts) — a
  // filter, so every count on the page below reads through `inLevels`. A
  // practice exam ignores it, since it is sat as the paper sets it.
  const levelsParam = mode === 'quiz' ? difficultyLevelsToParam(difficulties) : null
  const inLevels = useMemo(() => inDifficultyLevels(mode, difficulties), [mode, difficulties])

  // Set once the user picks a specific question count, so the auto-sizing effect
  // (which defaults Today's Quiz to the whole-plan coverage count) stops overriding
  // their choice. Reset whenever the exam/mode changes.
  const userPickedCountRef = useRef(false)

  // Mock exam sitting selection (null = random mix across all years)
  const [selectedSitting, setSelectedSitting] = useState<QuizSitting>(null)

  // Concept override passed from dashboard when user deselects some plan concepts
  const conceptOverrideRef = useRef<string[] | null>(null)
  const didApplyOverrideRef = useRef(false)
  if (!didApplyOverrideRef.current && conceptOverrideRef.current === null) {
    conceptOverrideRef.current = takeConceptOverride()
  }

  // Reset state and restore saved topic selections when the exam changes. The
  // format is not a reason to: switching Quiz ↔ Practice Exam keeps the topics
  // and the paper picked.
  useEffect(() => {
    setIsAdaptive(false)
    setSource(prev => (prev === 'papers' ? prev : 'custom'))
    setSelectedSitting(null)
    userPickedCountRef.current = false
    setSelectedConcepts(topic ? loadSavedConcepts(topic) : [])
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
    todayConceptNames,
    planConceptCount,
    todayAvailableCount,
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

  // For Pro users: map each concept name to its mastery level
  const conceptLevelMap = useMemo(
    () => conceptLevels(examIdForPlan, masteryRecords, orderedConcepts, new Date()),
    [examIdForPlan, masteryRecords, orderedConcepts],
  )

  // Derived: whether today's plan is the active filter
  const useTodaysPlan = examInProgress && conceptMode === 'today' && isPro && !!plan && planConceptCount > 0

  // True once the async data that decides the initial Today's Plan vs. By Topic
  // mode (mastery, concepts, study plan, subscription) has settled, so the
  // segmented control can render its resolved state directly instead of
  // painting the 'custom' default first and flashing to 'today' once the
  // auto-activate effect above fires.
  const quizModeResolved = !user || !examInProgress || (!masteryLoading && !conceptsLoading && !planLoading && !subLoading)

  // What every launch carries from the settings menu.
  const launchSettings: LaunchSettings = { mode, reveal, links: linksParam, timed }

  // Store the coverage-optimal question set and jump straight into the quiz.
  // `desiredCount` caps the questions (used when the user picks a smaller count);
  // the fewest-questions greedy cover keeps it on today's concepts either way.
  // `replace` when launched by a Dashboard autostart: the address that asked for
  // it would only launch another quiz, so Back from the quiz goes to the
  // Dashboard instead.
  const launchTodaysPlan = useCallback((desiredCount: number, replace = false): boolean => {
    const sel = buildTodaysPlanSelection()
    if (!sel) return false
    const selected = selectQuestionsForCoverage(sel.todayQs, sel.concepts, desiredCount, { seenIds: todayAnsweredIds })
    if (selected.length === 0) return false
    storeSelectedIds(selected.map(q => q.id))
    navigate(
      quizLaunchUrl({ kind: 'plan', count: selected.length }, { mode, reveal, links: linksParam, timed }),
      { replace },
    )
    return true
  }, [buildTodaysPlanSelection, navigate, todayAnsweredIds, mode, reveal, timed, linksParam])

  // Auto-activate today's study plan for Pro users when it has concepts.
  // If the dashboard passed a custom concept selection (some deselected), apply that instead.
  useEffect(() => {
    if (!user || masteryLoading || conceptsLoading || planLoading || subLoading || source === 'papers' || !topic) return

    if (!didApplyOverrideRef.current && conceptOverrideRef.current) {
      didApplyOverrideRef.current = true
      setSelectedConcepts(conceptOverrideRef.current)
      conceptOverrideRef.current = null
      setSource('custom')
      setIsAdaptive(false)
      return
    }

    if (!didApplyOverrideRef.current && examInProgress && isPro && plan && planConceptCount > 0) {
      setSource('today')
      setSelectedConcepts([])
      setIsAdaptive(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, user?.id, masteryLoading, conceptsLoading, planLoading, subLoading, isPro, planConceptCount, examInProgress])

  // Auto-size Today's Quiz to cover the entire (remaining) plan, until the user
  // picks a specific count. This is what makes "Start Today's Quiz" pull exactly
  // the number of questions needed to complete the day's plan.
  useEffect(() => {
    if (useTodaysPlan && !userPickedCountRef.current && todaysPlanFullCount > 0) {
      setCount(todaysPlanFullCount)
    }
  }, [useTodaysPlan, todaysPlanFullCount])

  // One-click launch from the dashboard, sized to complete today's plan; a
  // quiet loading state stands in for the builder until it lands or can't.
  const autostartLaunch = useCallback(() => {
    const sel = buildTodaysPlanSelection()
    if (!sel) return false
    launchTodaysPlan(minQuestionsToCoverConcepts(sel.todayQs, sel.concepts, { seenIds: todayAnsweredIds }), true)
    return true
  }, [buildTodaysPlanSelection, launchTodaysPlan, todayAnsweredIds])
  const isAutostarting = useDashboardAutostart({
    signedIn: !!user,
    isQuiz: mode === 'quiz',
    topic,
    loading: masteryLoading || conceptsLoading || planLoading || subLoading,
    eligible: examInProgress && isPro && !!plan && planConceptCount > 0 && allQuestions.length > 0,
    launch: autostartLaunch,
  })

  // Persist manual concept selections to localStorage
  useEffect(() => {
    if (!topic || isAdaptive || conceptMode === 'today') return
    saveConcepts(topic, selectedConcepts)
  }, [selectedConcepts, topic, isAdaptive, conceptMode])

  const conceptAvailableCount = useMemo(() => {
    if (!selectedConcept) return 0
    return filterQuestions(allQuestions, { concept: selectedConcept }).filter(inLevels).length
  }, [allQuestions, selectedConcept, inLevels])

  function toggleConcept(concept: string) {
    setIsAdaptive(false)
    setSource('custom')
    setSelectedConcepts(prev => toggleConceptIn(prev, concept))
  }

  function selectAllInGroup(group: { subtopics: string[] }, e: React.MouseEvent) {
    e.stopPropagation()
    setIsAdaptive(false)
    setSource('custom')
    const allSelected = group.subtopics.every(s => selectedConcepts.includes(s))
    setSelectedConcepts(prev => selectGroup(prev, group.subtopics, !allSelected))
  }

  // The exam's past sittings — the authored catalogue merged with whatever the
  // question bank holds, so papers that exist but haven't been imported still
  // appear (greyed out) in the browser. Published pass ratios, fetched live
  // through `api/pass-rates.js`, are laid over the authored figures; when the
  // source is unconfigured or unreachable the catalogue stands on its own.
  // Read this far up the render because the source tab is named after it: an
  // exam with released papers offers "Past Papers", one without a "Practice Exam".
  const livePassRates = useExamPassRates(topic)
  const pastExamRows = useMemo(
    () => (topic ? applyPassRates(buildPastExamRows(allQuestions, topic), livePassRates) : []),
    [allQuestions, topic, livePassRates],
  )
  const examSourceName = examSourceLabel(pastExamRows)

  // The one control that says what this quiz is drawn from (builderOptions.tsx).
  const showTodayOption = !!user && examInProgress
  const sourceOptions = useMemo(
    () => buildSourceOptions({
      showToday: showTodayOption,
      isPro,
      planConceptCount,
      selectedCount: selectedConcepts.length,
      papersLabel: examSourceName,
    }),
    [showTodayOption, isPro, planConceptCount, selectedConcepts.length, examSourceName],
  )

  function handleSourceChange(next: QuizSource) {
    setSource(next)
    if (next === 'today' && isPro) {
      setSelectedConcepts([])
      setIsAdaptive(false)
    }
    // A paper picked on the shelf is only meant while the shelf is the source.
    if (next !== 'papers') setSelectedSitting(null)
  }

  const mockExamCount = practiceExamQuestions(topic)
  const currentExam = quizExamFor(topic)
  const examLabel = currentExam?.label ?? topic
  // An exam's builder names its entry, for the way back from what it opens.
  usePageLabel(topic ? `${examLabel} quiz` : undefined)

  // The real paper's pace, said beside the Timed choice. `topic` is the same
  // exam name a question carries, so it is what the pace table is keyed by.
  const topicPace = paceForExam(topic)
  const timedPace = topicPace ? formatPace(topicPace) : undefined

  // The questions the configuration draws from — today's plan's, at every
  // level, when the plan is the source.
  const todaysPlanPool = useMemo(
    () => (useTodaysPlan ? buildTodaysPlanSelection(true)?.todayQs ?? [] : null),
    [useTodaysPlan, buildTodaysPlanSelection],
  )
  const { pool: currentPool, difficultyCounts, newCount: poolNewCount } = useBuilderPool({
    questions: allQuestions,
    topic,
    source,
    sitting: selectedSitting,
    concept: selectedConcept,
    concepts: selectedConcepts,
    todaysPlanPool,
    inLevels,
    attempted: attemptsByQuestionId,
  })

  // How many the pool holds, and how many of those the quiz will pull.
  const poolCount = currentPool.length

  // What the count choices are measured against: the pool — except on today's
  // plan, whose count options size against every concept the plan names, not
  // only those still to do.
  const effectiveAvailableCount = useTodaysPlan && !selectedConcept ? todayAvailableCount : poolCount

  // Clamp count when available pool shrinks
  useEffect(() => {
    if (effectiveAvailableCount > 0 && count > effectiveAvailableCount) {
      setCount(effectiveAvailableCount)
    }
  }, [effectiveAvailableCount, count])

  // A practice exam is the paper's length — a sitting whole — and a quiz the
  // count picked, either capped at what the source holds.
  const quizQuestionCount = quizQuestionCountFor({
    mode, source, sitting: selectedSitting, poolCount, practiceExamCount: mockExamCount, count,
  })

  // ── Shuffling the draw ────────────────────────────────────────────────────
  // Tapping the deck card fixes a specific set of questions for the next quiz,
  // cleared whenever anything the draw depends on changes (useShuffledDraw).
  const { drawnIds, shuffleTick, justShuffled, keepDraw } = useShuffledDraw(drawSignature({
    mode,
    source,
    topic,
    concept: selectedConcept,
    conceptMode,
    count,
    sitting: selectedSitting,
    concepts: selectedConcepts,
    levelsParam,
  }))

  function handleShuffle() {
    if (quizQuestionCount <= 0) return
    // Today's Plan keeps its coverage guarantee: the greedy cover takes the
    // first best-covering question, so running it over a freshly ordered pool
    // yields a different set that still covers the day's concepts.
    const planConcepts = useTodaysPlan ? buildTodaysPlanSelection()?.concepts : undefined
    const draw = planConcepts
      ? selectQuestionsForCoverage(shuffle(currentPool), planConcepts, quizQuestionCount, { seenIds: todayAnsweredIds })
      : shuffle(currentPool).slice(0, quizQuestionCount)
    keepDraw(draw.map(q => q.id))
  }

  function handleStart() {
    // A shuffled draw pins the exact question set, whichever mode produced it.
    if (drawnIds && drawnIds.length > 0) {
      storeSelectedIds(drawnIds)
      navigate(quizLaunchUrl({ kind: 'draw', count: drawnIds.length }, launchSettings))
      return
    }

    if (selectedConcept && source !== 'papers') {
      navigate(quizLaunchUrl({
        kind: 'concept',
        concept: selectedConcept,
        levels: levelsParam,
        count: quizQuestionCount < conceptAvailableCount ? quizQuestionCount : undefined,
      }, launchSettings))
      return
    }

    // Today's study plan mode: greedily cover as many of today's (still-incomplete)
    // concepts as possible with the fewest questions, capped at the chosen count
    // — or, sat as a practice exam, at the exam's length.
    if (useTodaysPlan && plan) {
      if (launchTodaysPlan(mode === 'mock-exam' ? quizQuestionCount : count)) return
    }

    // Everything else is the source's filter plus the format's size: a quiz
    // takes the count and difficulties picked, a practice exam the paper's
    // length (a sitting whole) and every difficulty (`levelsParam` is null).
    navigate(quizLaunchUrl({
      kind: 'exam',
      exam: topic,
      ...(source === 'papers' ? { sitting: selectedSitting } : { concepts: selectedConcepts }),
      levels: levelsParam,
      count: quizQuestionCount,
    }, launchSettings))
  }

  // Nothing a shuffle could change: an empty pool, or a draw that already takes
  // every question available.
  const shuffleDisabled = poolCount === 0 || quizQuestionCount >= poolCount
  const hasTopic = topic !== ''
  const hasSelection = hasTopic || selectedConcept !== ''

  // The bottom action bar's real height, published as `--action-bar-height` so
  // the page below reserves exactly that much and the onboarding launcher can
  // ride above it instead of landing on the Start button.
  const actionBarRef = useRef<HTMLDivElement>(null)
  useActionBarHeight(actionBarRef, hasSelection)

  // The exam being configured, named in the search bar's strip.
  const examStrip = useQuizExamStrip(currentExam, allQuestions, closeExam)

  // ── Question count ────────────────────────────────────────────────────────
  // "Full plan" carries its own value (builderOptions.tsx), so it never lights
  // alongside the number it happens to equal.
  const countOptions = useMemo(
    () => buildCountOptions({
      fullPlanCount: useTodaysPlan ? todaysPlanFullCount : 0,
      available: effectiveAvailableCount,
    }),
    [useTodaysPlan, todaysPlanFullCount, effectiveAvailableCount],
  )

  const countValue = useTodaysPlan && count === todaysPlanFullCount ? 'full' : String(count)

  function handleCountChange(next: string) {
    userPickedCountRef.current = true
    if (next === 'full') {
      setCount(todaysPlanFullCount)
      return
    }
    const n = Number(next)
    setCount(Math.min(n, effectiveAvailableCount > 0 ? effectiveAvailableCount : n))
  }

  // Filter reflecting the current quiz configuration — passed to the search
  // bar, which opens on it: the exam (and paper) as its Exam / Sitting
  // choices, ticked, and the concepts as the pool.
  const searchFilter = useMemo(
    () => quizSearchFilter({
      topic,
      source,
      sitting: selectedSitting,
      concept: selectedConcept,
      concepts: selectedConcepts,
      todaysPlan: useTodaysPlan ? plan : null,
    }),
    [topic, source, selectedSitting, selectedConcept, selectedConcepts, useTodaysPlan, plan],
  )

  // Active filter chips shown in the search dropdown so the user can see and
  // remove concept filters without leaving the search panel. The exam and the
  // picked paper need none: the panel's Exam and Sitting filters open on them.
  const filterPills = useMemo(() => {
    const pills: { label: string; onRemove: () => void }[] = []
    if (selectedConcept) {
      pills.push({ label: selectedConcept, onRemove: () => setSelectedConcept('') })
    }
    selectedConcepts.forEach(c => {
      pills.push({ label: c, onRemove: () => toggleConcept(c) })
    })
    return pills
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConcept, selectedConcepts])

  // Dashboard launch is still resolving — hold a quiet loading state rather than
  // flashing the quiz config screen on the way into the quiz.
  if (isAutostarting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Getting today's quiz ready…</p>
      </div>
    )
  }

  return (
    <>
    <QuizFloatingSearch
      filter={searchFilter}
      filterPills={filterPills}
      strip={examStrip}
      banner={hasTopic ? <ExamStatusBanner status={examStatus(currentExam?.progressKey, currentExam?.examId)} /> : undefined}
    />
    {/* The exam list is the Study Guides home page's shell, to the pixel:
        the same container (`px-4 sm:px-6 py-8 max-w-4xl`), the same `space-y-8`
        and the same title row. The two tabs open on the same thing — a ladder
        of exam cards under a body picker — and switching between them used to
        shift every one of them by a few pixels, which reads as the page
        twitching rather than as the tab changing. Picking an exam is a
        different screen, and keeps its own compact sticky header.

        Bottom padding tracks the action bar's measured height rather than a
        fixed guess — the bar grows and shrinks with the deck card and the
        sitting selector, and the old `pb-72` both clipped and over-reserved. */}
    <div
      className={cn(
        'max-w-4xl mx-auto w-full px-4 sm:px-6',
        hasTopic ? 'pt-4 space-y-6' : 'py-8 space-y-8',
      )}
      // Inside an exam the builder is scoped to its colour, which the learning
      // objectives' weight bars fill in — as on the exam's study guide.
      style={{
        ...(hasTopic ? examAccentStyle(currentExam?.progressKey ?? '') : undefined),
        ...(hasSelection ? { paddingBottom: 'calc(var(--action-bar-height, 16rem) + 1.5rem)' } : undefined),
      }}
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

      {!hasTopic && <QuizGamesPanel />}

      <div className="space-y-6">
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
            <>
              {/* ── What the quiz draws from ───────────────────────────── */}
              <div className="space-y-3">
                {!quizModeResolved ? (
                  <div className="h-11 rounded-lg border border-border bg-muted/50 animate-pulse" />
                ) : (
                  <SegmentedControl
                    label="What to quiz on"
                    value={source}
                    onChange={handleSourceChange}
                    options={sourceOptions}
                  />
                )}

                {/* Today's Plan content */}
                {quizModeResolved && source === 'today' && (
                  <TodaysPlanPanel isPro={isPro} concepts={todayConceptNames} />
                )}

                {/* By Topic concept groups */}
                {quizModeResolved && source === 'custom' && (
                  <ConceptGroupList
                    loading={conceptsLoading && orderedConcepts.length === 0}
                    groups={groupedConcepts}
                    selected={selectedConcepts}
                    today={todayConcepts}
                    onToggle={toggleConcept}
                    onSelectAll={selectAllInGroup}
                    levels={conceptLevelMap}
                    isPro={isPro}
                  />
                )}

                {/* The past-paper shelf */}
                {quizModeResolved && source === 'papers' && (
                  <PastPaperShelf
                    topic={topic}
                    examLabel={examLabel}
                    questions={allQuestions}
                    rows={pastExamRows}
                    selected={selectedSitting}
                    onSelect={setSelectedSitting}
                    mode={mode}
                    count={count}
                  />
                )}
              </div>

            </>
          )}
      </div>

    </div>

    {hasSelection && (
      <QuizActionBar
        barRef={actionBarRef}
        format={format}
        onFormatChange={setFormat}
        deck={poolCount > 0 ? {
          available: poolCount,
          selected: quizQuestionCount,
          newCount: poolNewCount,
          attemptsTracked,
          onShuffle: handleShuffle,
          shuffleTick,
          justShuffled,
          disabled: shuffleDisabled,
        } : null}
        // A practice exam is sat whole, as the paper sets it, so it carries no
        // count and no difficulty.
        settings={{
          countOptions: mode === 'quiz' ? countOptions : undefined,
          countValue: mode === 'quiz' ? countValue : undefined,
          onCountChange: mode === 'quiz' ? handleCountChange : undefined,
          difficulties: mode === 'quiz' ? difficulties : undefined,
          onDifficultiesChange: mode === 'quiz' ? settings.onDifficultiesChange : undefined,
          difficultyCounts: mode === 'quiz' ? difficultyCounts : undefined,
          reveal,
          onRevealChange: settings.onRevealChange,
          timed,
          onTimedChange: settings.onTimedChange,
          timedPace,
          conceptLinks,
          onConceptLinksChange: settings.onConceptLinksChange,
        }}
        questionCount={quizQuestionCount}
        onStart={handleStart}
        todayBadge={mode === 'quiz' && useTodaysPlan && count === todaysPlanFullCount ? {
          count: badgeCountFor(todayQuizByExam[examIdForPlan ?? '']),
          complete: todayQuizByExam[examIdForPlan ?? '']?.complete ?? false,
        } : null}
      />
    )}

    </>
  )
}
