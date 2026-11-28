import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronRight, Loader2, X } from 'lucide-react'
import { useBack } from '@/hooks/useBack'
import { useQuizStore, readLastSession, syncPendingSessionToCloud } from '@/stores/quizStore'
import type { CompletedSession } from '@/stores/quizStore'
import { useAuth } from '@/hooks/useAuth'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { loadCachedStudyPlan, todayISO } from '@/lib/studyPlan'
import { QuestionCard } from '@/components/QuestionCard'
import { AnswerDot } from '@/components/AnswerDot'
import { LevelSquare } from '@/components/LevelSquare'
import { ResultsBar } from '@/components/session/SessionProgress'
import { GainMark, SyllabusBar } from '@/components/today/TodayTiles'
import { GROUND } from '@/components/ui/OutlineCard'
import { formatScore, quizPoints, scoredQuestions } from '@/lib/quizScore'
import { Button } from '@/components/ui/button'
import type { MasteryState } from '@/lib/mastery'
import { buildMasteryLookup, resolveConceptState, slugForLink } from '@/lib/conceptMatch'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { QuestCompleteOverlay } from '@/components/QuestCompleteOverlay'
import { StreakCompleteOverlay } from '@/components/StreakCompleteOverlay'
import { StudyPlanCompleteOverlay } from '@/components/StudyPlanCompleteOverlay'
import { ConceptLevelUpCeremony } from '@/components/ConceptLevelUpCeremony'
import { QUESTS_ENABLED, STREAK_ENABLED } from '@/lib/featureFlags'
import { readJustCompletedQuests } from '@/lib/questStore'
import { EXAM_LABEL_TO_ID } from '@/lib/examIds'
import { getDailyGems } from '@/lib/dailyProgressStore'
import { useGems } from '@/hooks/useGems'
import { useSubscription } from '@/hooks/useSubscription'
import { PracticeExamDebrief } from '@/components/session/PracticeExamDebrief'
import { GuestSavePrompt } from '@/components/GuestSavePrompt'
import { markGuestSavePromptAsked, readGuestSavePromptAsked, shouldAskGuestToSave } from '@/lib/guestSavePrompt'
import { ANSWER_LABEL } from '@/lib/answerState'
import { MASTERY_LABEL } from '@/lib/masteryBadge'
import { syllabusForBank } from '@/lib/practiceExam'
import { computeExamReadiness } from '@/lib/readiness'
import { answerCounts, countsLabel, finalSegments, partGradesOf, segmentGroups } from '@/lib/sessionProgress'
import {
  ceremonyMoves,
  conceptName,
  levelledUp,
  recordsBefore,
  resultRows,
  syllabusGain,
  timeTaken,
  toFix,
  type FixRow,
} from '@/lib/sessionResults'
import type { Question } from '@/lib/parser'
import { wikiRoute } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'

// Shared "quiz these exact questions" seam (same key RecentMistakesCard and
// MasteryAnalyticsCard write) — keeps the retry URL small for a long miss list.
const SELECTED_IDS_KEY = 'actuarial_selected_ids'

// Mirrors the target-state progression used by TodayCard/ReadinessCard to
// decide whether a concept has reached today's assigned goal.
const NEXT_STATE: Partial<Record<MasteryState, MasteryState>> = {
  new: 'level1', forgotten: 'level1', level1: 'level2', level2: 'level3',
}
const STATE_ORDER: Record<MasteryState, number> = {
  new: 0, forgotten: 0, level1: 1, level2: 2, level3: 3,
}

// ─── Post-quiz celebrations ───────────────────────────────────────────────────

// Sequences the two post-quiz celebrations so the streak flame plays first and
// the quest collect prompt follows. The streak overlay resolves as soon as it's
// dismissed — or immediately when the streak didn't grow — flipping to the quest
// overlay. When a streak can't run (feature off, or no correct answer today), we
// start already resolved so quests appear right away.
// `onDone` fires once both have had their turn, for what plays after them.
function PostQuizCelebrations({ streakEligible, onDone }: { streakEligible: boolean; onDone: () => void }) {
  const [streakDone, setStreakDone] = useState(!streakEligible)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  useEffect(() => {
    if (streakDone && !QUESTS_ENABLED) onDoneRef.current()
  }, [streakDone])
  return (
    <>
      {streakEligible && !streakDone && (
        <StreakCompleteOverlay onResolved={() => setStreakDone(true)} />
      )}
      {QUESTS_ENABLED && streakDone && <QuestCompleteOverlay onResolved={() => onDoneRef.current()} />}
    </>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

// The results (docs/redesign-spec.md §5.3, canvas `Results`), top to bottom:
// the score as one figure and the time, the bar in its final colours with its
// counts, what to fix with the one filled button, what levelled up with the
// syllabus gain, the right answers folded, and the way back to Today.
export default function Review() {
  const navigate = useNavigate()
  const back = useBack({ to: '/', label: 'Quiz' }, { skip: path => path.split(/[?#]/)[0] === '/quiz' })
  const [searchParams] = useSearchParams()
  const { user, loading: authLoading } = useAuth()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { balance: gemBalance, loading: gemsLoading } = useGems()
  const { resetQuiz } = useQuizStore()
  const { isPro, loading: subscriptionLoading } = useSubscription()
  const { syllabi } = useWikiSyllabus()
  const openConceptAt = useConceptPopup(s => s.openAt)
  const [session, setSession] = useState<CompletedSession | null>(null)
  // Gates the streak/quest/plan celebrations until the level-up ceremony (if any)
  // has been dismissed, so they play one after another rather than stacking.
  const [levelUpsDone, setLevelUpsDone] = useState(false)
  // The row whose solution is open, by question id.
  const [openRow, setOpenRow] = useState<string | null>(null)
  // The questions answered right, unfolded.
  const [showRight, setShowRight] = useState(false)
  const syncingRef = useRef(false)
  // The guest save prompt — asked once, after the celebrations have played.
  const [celebrationsDone, setCelebrationsDone] = useState(false)
  const [guestSaveAsked, setGuestSaveAsked] = useState(() => readGuestSavePromptAsked())

  useEffect(() => {
    const last = readLastSession()
    if (last) {
      setSession(last)
    } else {
      console.warn('Review: no completed session in localStorage; redirecting to /')
      navigate('/', { replace: true })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // If this quiz was completed while signed out (session.needsCloudSync), and
  // the user has since signed in or created an account from this screen's
  // "Sign In" prompt, persist it to their account now — same DB writes as if
  // they'd been logged in when they finished the quiz.
  useEffect(() => {
    if (!user || !session?.needsCloudSync || masteryLoading || syncingRef.current) return
    syncingRef.current = true
    syncPendingSessionToCloud(user.id, masteryRecords)
      .then(synced => {
        if (synced) setSession(readLastSession())
      })
      .catch(err => console.error('Failed to sync pending quiz session:', err))
      .finally(() => { syncingRef.current = false })
  }, [user, session, masteryLoading, masteryRecords])

  const progressKey = useMemo(() => {
    if (!session) return null
    return EXAM_LABEL_TO_ID[session.questions[0]?.exam ?? ''] ?? null
  }, [session])

  const studyPlan = useMemo(() => {
    return progressKey ? loadCachedStudyPlan(progressKey) : null
  }, [progressKey])

  const newlyCompletedSlugs = useMemo(() => {
    const slugs = new Set<string>()
    for (const t of session?.masteryTransitions ?? []) {
      if (t.to === 'level1' || t.to === 'level2' || t.to === 'level3') {
        slugs.add(t.conceptSlug.toLowerCase())
      }
    }
    return slugs
  }, [session])

  // Today's Study Plan completion — mirrors ReadinessCard's "all concepts on
  // target" check, but scoped to what's needed here so we can surface the 2×
  // bonus unlock right after the quiz that finished it, instead of waiting for
  // the user to return to the Dashboard.
  const planJustCompleted = useMemo(() => {
    if (!progressKey || !studyPlan || masteryLoading) return false
    if (studyPlan.status === 'review_mode') return false
    const concepts = studyPlan.todaysConcepts
    if (concepts.length === 0) return false
    const lookup = buildMasteryLookup(masteryRecords.filter(r => r.exam_id === progressKey))
    const now = new Date()
    return concepts.every(name => {
      const current = resolveConceptState(lookup, { name }, now)
      const target: MasteryState = current === 'level3' ? 'level3' : (NEXT_STATE[current] ?? 'level1')
      const advancedToday = newlyCompletedSlugs.has(name.toLowerCase())
      return STATE_ORDER[current] >= STATE_ORDER[target] || advancedToday
    })
  }, [progressKey, studyPlan, masteryLoading, masteryRecords, newlyCompletedSlugs])

  const [showPlanBonus, setShowPlanBonus] = useState(false)
  const planBonusHandledRef = useRef(false)

  useEffect(() => {
    if (planBonusHandledRef.current || !planJustCompleted || !progressKey) return
    planBonusHandledRef.current = true
    // Let a quest celebration take priority if both landed on this quiz —
    // the Dashboard's own bonus indicator still claims it silently later.
    if (QUESTS_ENABLED && readJustCompletedQuests().length > 0) return
    try {
      const raw = localStorage.getItem(`actuarial_daily_bonus_${progressKey}_${todayISO()}`)
      const alreadyClaimed = raw ? !!(JSON.parse(raw) as { amount?: number }).amount : false
      if (!alreadyClaimed) setShowPlanBonus(true)
    } catch { /* ignore */ }
  }, [planJustCompleted, progressKey])

  // ── The syllabus, and how far this quiz moved it ──────────────────────────
  const syllabus = useMemo(() => {
    const exam = session?.questions[0]?.exam
    return exam ? syllabusForBank(syllabi, exam) : null
  }, [syllabi, session])
  const syllabusFigures = useMemo(() => {
    if (!syllabus || !progressKey || masteryLoading || !session) return null
    const now = new Date()
    const records = masteryRecords.filter(r => r.exam_id === progressKey)
    const after = computeExamReadiness(syllabus, records, now)
    if (after.counts.total === 0) return null
    const before = computeExamReadiness(
      syllabus,
      recordsBefore(records, session.masteryTransitions, now.toISOString()),
      now,
    )
    return syllabusGain(before.overallPct, after.overallPct)
  }, [syllabus, progressKey, masteryLoading, masteryRecords, session])

  if (!session) {
    return (
      <div className={cn(GROUND, 'flex min-h-dvh items-center justify-center')}>
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const { correctCount, timeTakenSeconds } = session
  const manualGrades = session.manualGrades ?? {}
  // Score by points with partial credit: each question earns its fraction of
  // what it is worth (a 2.5-point question counts five times a 0.5-point one).
  // correctCount stays the whole-question count that drives gems and the
  // streak; points is what the results screen prints.
  // A quiz finished early is scored on what was answered; its untried questions
  // are Unanswered, not wrong. A practice exam scores every question.
  const points = quizPoints(
    scoredQuestions(session.questions, session.responses, session.mode, manualGrades),
    session.responses,
    manualGrades,
  )

  // Every question's final colour, and the bar cut by step in today's session.
  const states = finalSegments(session.questions, session.responses, manualGrades)
  const counts = answerCounts(states)
  const groups = segmentGroups(session.questions.length, session.steps)
  const fixRows = resultRows(session.questions, states, toFix)
  const rightRows = resultRows(session.questions, states, state => state === 'correct')

  // Level-ups the quiz produced. Every one is a row under "Levelled up"; the
  // full-screen ceremony is kept for a card collected for the first time and
  // for a concept reaching Level 3 (lib/sessionResults.ts).
  const moves = levelledUp(session.masteryTransitions)
  const ceremony = ceremonyMoves(session.masteryTransitions)

  // What "Fix these N" re-quizzes: the questions this session didn't get full
  // credit on, a partial and an unanswered one included.
  const retryIds = fixRows.map(row => row.question.id)
  const retryMode = session.mode

  function handleTryAgain(ids: string[] = retryIds, mode: string = retryMode) {
    if (ids.length === 0) return
    try {
      sessionStorage.setItem(SELECTED_IDS_KEY, JSON.stringify(ids))
    } catch {
      /* ignore quota/private-mode errors */
    }
    // Build the params from scratch rather than reusing this page's: the original
    // topic/concept/count filters would be dead weight (an ids selection wins in
    // filterQuestions) and a stale `count` could truncate the retry set.
    const params = new URLSearchParams({
      selection: 'stored',
      mode,
      count: String(ids.length),
    })
    // Carry the reveal the finished session ran under; with none in the URL the
    // quiz falls back to the reader's saved choice for this mode, which is a
    // better guess than pinning the retry to 'during'.
    // A section practiced from a Practice Exam's debrief is a quiz, under the quiz's own choice.
    const reveal = mode === retryMode ? searchParams.get('reveal') : null
    if (reveal) params.set('reveal', reveal)
    const from = searchParams.get('from')
    if (from) params.set('from', from)
    resetQuiz()
    navigate(`/quiz?${params.toString()}`)
  }

  // The ceremony plays first, then hands off to the streak, quest and plan
  // celebrations. For signed-in users we wait for the gem balance to load so
  // the running tally lands on the right total; guests earn no gems so there's
  // nothing to wait on. With no ceremony the others start at once.
  const hasCeremony = ceremony.length > 0
  const levelUpCeremonyReady = !user || !gemsLoading
  const showLevelUpCeremony = hasCeremony && !levelUpsDone && levelUpCeremonyReady
  const celebrationsReady = !hasCeremony || levelUpsDone
  const showGuestSavePrompt = celebrationsReady && celebrationsDone && !showPlanBonus
    && shouldAskGuestToSave({
      authLoading,
      signedIn: !!user,
      finishedAsGuest: !!session.needsCloudSync,
      alreadyAsked: guestSaveAsked,
    })
  const closeGuestSavePrompt = () => {
    markGuestSavePromptAsked()
    setGuestSaveAsked(true)
  }

  // A concept row under a solution opens it in the reader, over the question's tags.
  function openConcept(question: Question, links: string[], index: number) {
    const refs = links.map(link => ({ kind: 'concept' as const, name: slugForLink(link) ?? link }))
    openConceptAt(refs, index, `review:${question.id}`, null, null, { walk: 'question' })
  }

  // Back to Today for an account; a visitor has no Today yet, so back to where
  // the quiz was started.
  function leave() {
    resetQuiz()
    if (user) navigate('/dashboard')
    else back.go()
  }
  const leaveLabel = user ? 'Back to Today' : `Back to ${back.label}`

  const time = timeTaken(timeTakenSeconds)
  const scoreUnit = points.unitPoints ? '' : ' points'

  const solution = (row: FixRow<Question>) => (
    <div className="pb-6 pt-2">
      <QuestionCard
        question={row.question}
        selectedAnswer={session.responses[row.question.id]?.chosen ?? null}
        onAnswer={() => {/* read-only on the results */}}
        showExplanation={true}
        isLocked={true}
        feedback
        onOpenConcept={(links, index) => openConcept(row.question, links, index)}
        selfGrade={row.question.type === 'free-entry' ? manualGrades[row.question.id] : undefined}
        partManualGrades={row.question.type === 'multi-part' ? partGradesOf(row.question.id, manualGrades) : undefined}
        essaySelfGrades={row.question.type === 'multi-part' ? partGradesOf(row.question.id, manualGrades) : undefined}
      />
    </div>
  )

  return (
    <>
    {/* The ceremony: a card collected for the first time, or a Level 3. */}
    {showLevelUpCeremony && (
      <ConceptLevelUpCeremony
        transitions={ceremony}
        gemsEarned={user ? correctCount : 0}
        totalGems={gemBalance}
        onResolved={() => setLevelUpsDone(true)}
      />
    )}
    {/* Streak flame (if today's streak grew) then quests cleared by this quiz,
        in that order, after the ceremony and over the results below. */}
    {celebrationsReady && (
      <PostQuizCelebrations
        streakEligible={STREAK_ENABLED && correctCount > 0}
        onDone={() => setCelebrationsDone(true)}
      />
    )}
    {/* A guest's first finished quiz: ask them to save it, once, last. */}
    {showGuestSavePrompt && (
      <GuestSavePrompt
        onCreateAccount={() => { closeGuestSavePrompt(); navigate('/auth', { state: { from: '/review', mode: 'signup' } }) }}
        onSignIn={() => { closeGuestSavePrompt(); navigate('/auth', { state: { from: '/review' } }) }}
        onClose={closeGuestSavePrompt}
      />
    )}
    {/* Today's Study Plan finished by this quiz — unlock the 2× gem bonus. */}
    {celebrationsReady && showPlanBonus && progressKey && (
      <StudyPlanCompleteOverlay
        progressKey={progressKey}
        gemsEarned={getDailyGems()}
        onClose={() => setShowPlanBonus(false)}
      />
    )}
    <ConceptPopup />

    <div className={cn(GROUND, 'min-h-dvh')}>
    <div className="mx-auto flex min-h-dvh w-full max-w-[680px] flex-col gap-6 px-5 pb-6 pt-3">

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={leave}
          aria-label={leaveLabel}
          className="-ml-3 flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X aria-hidden="true" strokeWidth={2.5} className="h-[22px] w-[22px]" />
        </button>
        {time && <span className="text-[15px] tabular-nums">{time}</span>}
      </div>

      {/* 1 and 2: the score as one figure, the bar, its counts. */}
      <section aria-label="Score" className="flex flex-col gap-4">
        <h1 className="flex items-baseline gap-2.5" aria-label={`${formatScore(points.earned)} of ${formatScore(points.possible)}${scoreUnit}`}>
          <span className="text-[64px] font-bold leading-none tracking-[-0.03em] tabular-nums">{formatScore(points.earned)}</span>
          <span className="text-[22px] font-medium">of {formatScore(points.possible)}{scoreUnit}</span>
        </h1>
        <ResultsBar states={states} groups={groups} label={countsLabel(counts)} />
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-[15px]">
          {(['correct', 'incorrect', 'partial', 'unanswered'] as const)
            .filter(state => counts[state] > 0 || state === 'correct')
            .map(state => (
              <li key={state} className="flex items-center gap-[7px]">
                <AnswerDot state={state} decorative />
                <span><strong className="tabular-nums">{counts[state]}</strong> {ANSWER_LABEL[state].toLowerCase()}</span>
              </li>
            ))}
        </ul>
      </section>

      {/* A Practice Exam's debrief: the estimated grade, and each section's points and time. */}
      {session.mode === 'mock-exam' && !subscriptionLoading && (
        <PracticeExamDebrief
          questions={session.questions}
          responses={session.responses}
          manualGrades={manualGrades}
          syllabus={syllabus}
          isPro={isPro}
          onPractice={ids => handleTryAgain(ids, 'quiz')}
        />
      )}

      {/* 3: what to fix, and the screen's one filled button. */}
      {fixRows.length > 0 && (
        <section aria-labelledby="results-to-fix" className="flex flex-col">
          <h2 id="results-to-fix" className="mb-1 text-lg font-bold">To fix</h2>
          <ul>
            {fixRows.map(row => (
              <ResultRow
                key={row.question.id}
                row={row}
                open={openRow === row.question.id}
                onToggle={() => setOpenRow(id => (id === row.question.id ? null : row.question.id))}
              >
                {solution(row)}
              </ResultRow>
            ))}
          </ul>
          <Button size="main" className="mt-2.5 w-full" onClick={() => handleTryAgain()}>
            Fix {retryIds.length === 1 ? 'this 1' : `these ${retryIds.length}`}
          </Button>
        </section>
      )}

      {/* 4: what levelled up, and the syllabus with the gain. */}
      {(moves.length > 0 || (syllabusFigures && fixRows.length === 0)) && (
        <section
          aria-labelledby="results-levelled-up"
          className={cn('flex flex-col', fixRows.length > 0 && 'border-t border-border pt-5')}
        >
          {moves.length > 0 && <h2 id="results-levelled-up" className="mb-1 text-lg font-bold">Levelled up</h2>}
          <ul>
            {moves.map(move => (
              <li key={`${move.examId ?? ''}:${move.conceptSlug}`} className="flex min-h-[42px] items-center gap-2.5">
                <span className="min-w-0 flex-1 text-base">{conceptName(move.conceptSlug)}</span>
                <LevelMove from={move.from} to={move.to} />
              </li>
            ))}
          </ul>
          {syllabusFigures && progressKey && (
            <button
              type="button"
              onClick={() => navigate(syllabus?.fileName ? wikiRoute({ kind: 'exam', name: syllabus.fileName }) : '/wiki')}
              aria-label={`Syllabus: ${syllabusFigures.pct}% covered${syllabusFigures.gain > 0 ? `, up ${syllabusFigures.gain}` : ''}`}
              className="mt-2 grid min-h-[44px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-[15px]">Syllabus</span>
              <SyllabusBar pct={syllabusFigures.pct} gain={syllabusFigures.gain} />
              <span className="flex items-baseline gap-2 text-base font-bold tabular-nums">
                {syllabusFigures.pct}%
                <GainMark gain={syllabusFigures.gain} className="text-sm" />
              </span>
            </button>
          )}
        </section>
      )}

      {/* 5: the questions answered right, folded under one row. */}
      {fixRows.length > 0 && rightRows.length > 0 && (
        <section aria-label="Answered correctly" className="border-t border-border">
          <button
            type="button"
            aria-expanded={showRight}
            onClick={() => setShowRight(v => !v)}
            className="flex h-[52px] w-full items-center gap-3 text-left text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            <AnswerDot state="correct" decorative />
            <span className="flex-1">{rightRows.length} correct</span>
            <ChevronDown aria-hidden="true" strokeWidth={2.5} className={cn('h-4 w-4 transition-transform', showRight && 'rotate-180')} />
          </button>
          {showRight && (
            <ul>
              {rightRows.map(row => (
                <ResultRow
                  key={row.question.id}
                  row={row}
                  open={openRow === row.question.id}
                  onToggle={() => setOpenRow(id => (id === row.question.id ? null : row.question.id))}
                >
                  {solution(row)}
                </ResultRow>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* 6: the way back. */}
      <Button variant="edge" className="mt-auto h-[52px] w-full text-base" onClick={leave}>
        {leaveLabel}
      </Button>
    </div>
    </div>
    </>
  )
}

/** One question on the results: its dot, its concept and one line of it; a tap opens the solution under it. */
function ResultRow({ row, open, onToggle, children }: {
  row: FixRow<Question>
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <li className="border-b border-border last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex min-h-[64px] w-full items-center gap-3 py-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <AnswerDot state={row.state} />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-semibold">{row.concept}</span>
          <span className="truncate text-[15px]">{row.line}</span>
        </span>
        <ChevronRight aria-hidden="true" strokeWidth={2.5} className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-90')} />
      </button>
      {open && children}
    </li>
  )
}

/** A concept's move up: its level before, an arrow, its level after. */
function LevelMove({ from, to }: { from: MasteryState; to: MasteryState }) {
  return (
    <span role="img" aria-label={`${MASTERY_LABEL[from]} to ${MASTERY_LABEL[to]}`} className="flex shrink-0 items-center gap-1.5">
      <LevelSquare state={from} size="md" decorative className="!h-[18px] !w-[18px] !rounded-[4px]" />
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      <LevelSquare state={to} size="md" decorative className="!h-[18px] !w-[18px] !rounded-[4px]" />
    </span>
  )
}
