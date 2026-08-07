import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowUp, LayoutDashboard, X, XCircle } from 'lucide-react'
import { useQuizStore, readLastSession, syncPendingSessionToCloud } from '@/stores/quizStore'
import type { CompletedSession, MasteryTransition } from '@/stores/quizStore'
import { useAuth } from '@/hooks/useAuth'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { loadCachedStudyPlan, todayISO } from '@/lib/studyPlan'
import { QuestionCard } from '@/components/QuestionCard'
import { ConceptCoverageSection, effectiveOutcome, formatScore, scoreColorClass } from '@/components/ConceptCoverageSection'
import { questionCredit } from '@/lib/parser'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Loader2 } from 'lucide-react'
import type { MasteryState } from '@/lib/mastery'
import { buildMasteryLookup, resolveConceptState, slugForLink } from '@/lib/conceptMatch'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { QuestCompleteOverlay } from '@/components/QuestCompleteOverlay'
import { StreakCompleteOverlay } from '@/components/StreakCompleteOverlay'
import { StudyPlanCompleteOverlay } from '@/components/StudyPlanCompleteOverlay'
import { ConceptLevelUpCeremony } from '@/components/ConceptLevelUpCeremony'
import { PostQuizCollectGate } from '@/components/collect/PostQuizCollectGate'
import { QUESTS_ENABLED, STREAK_ENABLED } from '@/lib/featureFlags'
import { readJustCompletedQuests } from '@/lib/questStore'
import { EXAM_LABEL_TO_ID } from '@/lib/examIds'
import { getDailyGems } from '@/lib/dailyProgressStore'
import { useGems } from '@/hooks/useGems'

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
function PostQuizCelebrations({ streakEligible }: { streakEligible: boolean }) {
  const [streakDone, setStreakDone] = useState(!streakEligible)
  return (
    <>
      {streakEligible && !streakDone && (
        <StreakCompleteOverlay onResolved={() => setStreakDone(true)} />
      )}
      {QUESTS_ENABLED && streakDone && <QuestCompleteOverlay />}
    </>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Review() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { balance: gemBalance, loading: gemsLoading } = useGems()
  const { resetQuiz } = useQuizStore()
  const [session, setSession] = useState<CompletedSession | null>(null)
  // Gates the streak/quest/plan celebrations until the level-up ceremony (if any)
  // has been dismissed, so they play one after another rather than stacking.
  const [levelUpsDone, setLevelUpsDone] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const [showIncorrectOnly, setShowIncorrectOnly] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [actionsPinned, setActionsPinned] = useState(false)
  const questionReviewRef = useRef<HTMLDivElement>(null)
  const actionsRowRef = useRef<HTMLDivElement>(null)
  const pinnedHeaderRef = useRef<HTMLDivElement>(null)
  const syncingRef = useRef(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reveal the pinned header once the full-size actions row (Go to Dashboard /
  // Review Incorrect) has scrolled up behind the sticky line — same measurement
  // the Dashboard uses for its compact actions. The threshold comes from the
  // pinned header's own wrapper, which is zero-height and always mounted, so it
  // reads the real sticky offset at every breakpoint and the bar fading in
  // can't move the threshold and make the state flicker.
  useEffect(() => {
    let raf = 0
    const measure = () => {
      raf = 0
      const actions = actionsRowRef.current
      const anchor = pinnedHeaderRef.current
      if (!actions || !anchor) {
        setActionsPinned(false)
        return
      }
      setActionsPinned(actions.getBoundingClientRect().bottom < anchor.getBoundingClientRect().top)
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(measure) }
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [session])

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

  // Level-ups banked by the post-quiz collect gate, after the quiz was scored.
  // Kept beside the session's own transitions (rather than folded into it) so
  // they show up in the results card without re-triggering the level-up
  // ceremony, which has already played by the time the gate is on screen.
  const [gateTransitions, setGateTransitions] = useState<MasteryTransition[]>([])

  const newlyCompletedSlugs = useMemo(() => {
    const slugs = new Set<string>()
    for (const t of [...(session?.masteryTransitions ?? []), ...gateTransitions]) {
      if (t.to === 'level1' || t.to === 'level2' || t.to === 'level3') {
        slugs.add(t.conceptSlug.toLowerCase())
      }
    }
    return slugs
  }, [session, gateTransitions])

  // Concepts this quiz answered correctly but that stayed New because they
  // weren't collected yet (see docs/flashcard-collection.md) — collecting them
  // now still banks the level-up via PostQuizCollectGate / promoteMissedLevelUp.
  // Computed once and frozen (like planBonusHandledRef below): PostQuizCollectGate
  // itself tracks which of these get collected, so this list must not shrink out
  // from under it the instant a concept is collected (masteryRecords/collectedCards
  // would otherwise flip it out of "New" mid-gate and collapse the screen).
  const [missedLevelUpConcepts, setMissedLevelUpConcepts] = useState<string[]>([])
  const missedConceptsComputedRef = useRef(false)

  useEffect(() => {
    if (missedConceptsComputedRef.current || !session || !progressKey || masteryLoading) return
    missedConceptsComputedRef.current = true
    const lookup = buildMasteryLookup(masteryRecords.filter(r => r.exam_id === progressKey))
    const now = new Date()
    const seen = new Set<string>()
    const result: string[] = []
    for (const q of session.questions) {
      if (!effectiveOutcome(q, session.responses[q.id]?.chosen, session.manualGrades ?? {})) continue
      for (const link of q.wiki_link) {
        const slug = slugForLink(link)
        if (!slug) continue
        const key = slug.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)
        if (resolveConceptState(lookup, { name: slug }, now) !== 'new') continue
        result.push(slug)
      }
    }
    setMissedLevelUpConcepts(result)
  }, [session, progressKey, masteryLoading, masteryRecords])

  const [missedGateDone, setMissedGateDone] = useState(false)

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

  // When user clicks a radial segment, select it and scroll to the question review
  function handleQuestionSelect(idx: number | null) {
    setSelectedQuestion(idx)
    if (idx !== null) {
      setShowIncorrectOnly(false)
      // Small delay so React can render before scrolling
      setTimeout(() => {
        questionReviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }

  function handleReviewIncorrect() {
    setSelectedQuestion(null)
    setShowIncorrectOnly(true)
    setTimeout(() => {
      questionReviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const { correctCount, totalQuestions, timeTakenSeconds } = session
  // Score with partial credit: a partially-right question (e.g. a multi-part
  // where only some graded parts landed) contributes its fraction, rather than
  // counting as a full miss. correctCount stays the whole-question count that
  // drives gems/streak; scoredPoints is what the results screen displays.
  const scoredPoints = session.questions.reduce(
    (sum, q) => sum + questionCredit(q, session.responses[q.id]?.chosen, session.manualGrades ?? {}),
    0,
  )
  const percentage = totalQuestions > 0 ? Math.round((scoredPoints / totalQuestions) * 100) : 0

  // Level-ups the quiz itself produced. These drive the ceremony; the results
  // card below lists these *plus* anything the collect gate banked afterwards.
  const quizTransitions = session.masteryTransitions?.filter(
    t => t.to === 'level1' || t.to === 'level2' || t.to === 'level3'
  ) ?? []
  const quizTransitionSlugs = new Set(quizTransitions.map(t => t.conceptSlug.toLowerCase()))
  const upwardTransitions = [
    ...quizTransitions,
    ...gateTransitions.filter(t => !quizTransitionSlugs.has(t.conceptSlug.toLowerCase())),
  ]

  // Which questions to show in the review list
  const outcomes = session.questions.map(q =>
    effectiveOutcome(q, session.responses[q.id]?.chosen, session.manualGrades ?? {})
  )
  const visibleQuestions = selectedQuestion !== null
    ? session.questions.filter((_, i) => i === selectedQuestion)
    : showIncorrectOnly
    ? session.questions.filter((_, i) => !outcomes[i])
    : session.questions

  // What "Try Again" re-quizzes: only the questions this session didn't get full
  // credit on. A partial (e.g. a multi-part with some parts missed) counts as
  // missed, and so does a question left unanswered. Nothing missed → nothing to
  // retry, so the button drops out and only "New Quiz" remains.
  const retryIds = session.questions.filter((_, i) => !outcomes[i]).map(q => q.id)
  const retryMode = session.mode

  function handleTryAgain() {
    if (retryIds.length === 0) return
    try {
      sessionStorage.setItem(SELECTED_IDS_KEY, JSON.stringify(retryIds))
    } catch {
      /* ignore quota/private-mode errors */
    }
    // Build the params from scratch rather than reusing this page's: the original
    // topic/concept/count filters would be dead weight (an ids selection wins in
    // filterQuestions) and a stale `count` could truncate the retry set.
    const params = new URLSearchParams({
      selection: 'stored',
      mode: retryMode,
      reveal: searchParams.get('reveal') ?? 'during',
      count: String(retryIds.length),
    })
    const from = searchParams.get('from')
    if (from) params.set('from', from)
    resetQuiz()
    navigate(`/quiz?${params.toString()}`)
  }

  // Full-screen ceremony for concepts levelled up by this quiz — plays first,
  // then hands off to the streak/quest/plan celebrations. For signed-in users we
  // wait for the gem balance to load so the running tally lands on the right
  // total; guests earn no gems so there's nothing to wait on.
  // Driven by the quiz's own level-ups only: a level-up banked later by the
  // collect gate must not re-open the ceremony on top of that gate.
  const hasLevelUps = quizTransitions.length > 0
  const levelUpCeremonyReady = !user || !gemsLoading
  const showLevelUpCeremony = hasLevelUps && !levelUpsDone && levelUpCeremonyReady
  const levelUpsReady = !hasLevelUps || levelUpsDone

  // Collect gate for concepts this quiz got right but that stayed New (uncollected)
  // — shown right after the level-up ceremony, before the streak/quest/plan chain.
  const hasMissedLevelUps = missedLevelUpConcepts.length > 0
  const showMissedLevelUpGate = levelUpsReady && hasMissedLevelUps && !missedGateDone
  const celebrationsReady = levelUpsReady && (!hasMissedLevelUps || missedGateDone)

  return (
    <>
    {/* Ceremony for each concept levelled up by this quiz. */}
    {showLevelUpCeremony && (
      <ConceptLevelUpCeremony
        transitions={quizTransitions}
        gemsEarned={user ? correctCount : 0}
        totalGems={gemBalance}
        onResolved={() => setLevelUpsDone(true)}
      />
    )}
    {/* Concepts answered correctly but still New because they weren't collected —
        collecting here still banks the level-up. */}
    {showMissedLevelUpGate && progressKey && (
      <PostQuizCollectGate
        examId={progressKey}
        userId={user?.id ?? null}
        concepts={missedLevelUpConcepts}
        onPromoted={t => setGateTransitions(prev =>
          prev.some(p => p.conceptSlug.toLowerCase() === t.conceptSlug.toLowerCase()) ? prev : [...prev, t]
        )}
        onDone={() => setMissedGateDone(true)}
      />
    )}
    {/* Streak flame (if today's streak grew) then quests cleared by this quiz —
        shown in that order, after the level-up ceremony and before the review
        content below. */}
    {celebrationsReady && (
      <PostQuizCelebrations streakEligible={STREAK_ENABLED && correctCount > 0} />
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

    {/* ── Pinned score header ───────────────────────────────────────
        Mirrors the Dashboard's pinned row: once the score card's actions have
        scrolled past, the score and icon-only copies of those actions stay at
        the top of the viewport. The wrapper is `h-0` on purpose so the bar
        floats over the review content instead of reserving space for itself —
        and so mounting it costs no layout shift at the top of the page. Sticky
        offsets match the nav chrome (mobile bottom-nav, md top bar, lg sidebar). */}
    <div ref={pinnedHeaderRef} className="sticky top-0 md:top-14 lg:top-0 z-20 h-0">
      <div
        aria-hidden={!actionsPinned}
        className={`border-b border-border/60 bg-background/95 backdrop-blur-md transition-all duration-200 ${
          actionsPinned ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="container max-w-2xl mx-auto px-4 py-2 flex items-center gap-3">
          <span className={`text-xl font-black tabular-nums leading-none ${scoreColorClass(percentage)}`}>
            {percentage}%
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            {formatScore(scoredPoints)}/{totalQuestions}
          </span>
          <div className="flex-1" />
          {user && (
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              aria-label="Go to Dashboard"
              title="Go to Dashboard"
              tabIndex={actionsPinned ? 0 : -1}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <LayoutDashboard className="h-5 w-5" />
            </button>
          )}
          {retryIds.length > 0 && (
            <div className="relative">
              <button
                type="button"
                onClick={handleReviewIncorrect}
                aria-label={`Review ${retryIds.length} incorrect`}
                title="Review Incorrect"
                tabIndex={actionsPinned ? 0 : -1}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 active:bg-primary/80 active:scale-[0.97]"
              >
                <XCircle className="h-5 w-5" />
              </button>
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-bold leading-none text-white shadow ring-2 ring-background tabular-nums">
                {retryIds.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>

    <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">

      {/* ── First card: score header + concept coverage ──────────── */}
      <ConceptCoverageSection
        questions={session.questions}
        responses={session.responses}
        score={{
          mode: session.mode,
          percentage,
          correctCount,
          scoredPoints,
          totalQuestions,
          timeTakenSeconds,
          conceptsLevelledUp: upwardTransitions.length,
          isLoggedIn: !!user,
          onSignIn: () => navigate('/auth', { state: { from: '/review' } }),
        }}
        selectedQuestion={selectedQuestion}
        onQuestionSelect={handleQuestionSelect}
        manualGrades={session.manualGrades}
        onReviewIncorrect={handleReviewIncorrect}
        levelUpTransitions={upwardTransitions}
        actionsRef={actionsRowRef}
      />

      {/* ── Question review ─────────────────────────────────────── */}
      {/* Scroll margin clears the pinned header (its own height plus the sticky
          offset at that breakpoint) so "Review Incorrect" doesn't park this
          heading underneath the bar it was pressed from. */}
      <div ref={questionReviewRef} className="space-y-2 scroll-mt-16 md:scroll-mt-28 lg:scroll-mt-16">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Question Review</h2>
          {selectedQuestion !== null && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              Q{selectedQuestion + 1}
              <button
                type="button"
                onClick={() => setSelectedQuestion(null)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Clear filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedQuestion === null && showIncorrectOnly && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              Incorrect only
              <button
                type="button"
                onClick={() => setShowIncorrectOnly(false)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Clear filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
        <Separator />
      </div>

      <div className="space-y-4">
        {visibleQuestions.map((question) => {
          const idx = session.questions.indexOf(question)
          const chosen = session.responses[question.id]?.chosen ?? null
          const manualGrades = session.manualGrades ?? {}
          // Per-part grades keyed by label — covers both graded free-entry parts
          // (partManualGrades) and answerless essay parts (essaySelfGrades), which
          // the card reads from separate props but are stored under the same key.
          const partGrades = question.type === 'multi-part' ? Object.fromEntries(
            Object.entries(manualGrades)
              .filter(([k]) => k.startsWith(`${question.id}__`))
              .map(([k, v]) => [k.slice(question.id.length + 2), v])
          ) : undefined
          return (
            <div key={question.id} className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Question {idx + 1}</p>
              <QuestionCard
                question={question}
                selectedAnswer={chosen}
                onAnswer={() => {/* read-only in review */}}
                showExplanation={true}
                showMeta={true}
                isLocked={true}
                selfGrade={question.type === 'free-entry' ? manualGrades[question.id] : undefined}
                partManualGrades={partGrades}
                essaySelfGrades={partGrades}
              />
            </div>
          )
        })}
      </div>

      {/* ── Actions ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 pb-8">
        {retryIds.length > 0 && (
          <Button variant="outline" onClick={handleTryAgain} className="flex-1">
            Try Again ({retryIds.length} missed)
          </Button>
        )}
        <Button onClick={() => { resetQuiz(); navigate('/') }} className="flex-1">
          New Quiz
        </Button>
      </div>
    </div>

      {/* ── Back to top ─────────────────────────────────────────── */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </>
  )
}
