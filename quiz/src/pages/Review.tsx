import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowUp, X } from 'lucide-react'
import { useQuizStore, readLastSession, syncPendingSessionToCloud } from '@/stores/quizStore'
import type { CompletedSession } from '@/stores/quizStore'
import { useAuth } from '@/hooks/useAuth'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { loadCachedStudyPlan, todayISO } from '@/lib/studyPlan'
import { QuestionCard } from '@/components/QuestionCard'
import { ConceptCoverageSection, effectiveOutcome } from '@/components/ConceptCoverageSection'
import { questionCredit } from '@/lib/parser'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Loader2 } from 'lucide-react'
import type { MasteryState } from '@/lib/mastery'
import { buildMasteryLookup, resolveConceptState } from '@/lib/conceptMatch'
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
  const questionReviewRef = useRef<HTMLDivElement>(null)
  const syncingRef = useRef(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const upwardTransitions = session.masteryTransitions?.filter(
    t => t.to === 'level1' || t.to === 'level2' || t.to === 'level3'
  ) ?? []

  // Which questions to show in the review list
  const outcomes = session.questions.map(q =>
    effectiveOutcome(q, session.responses[q.id]?.chosen, session.manualGrades ?? {})
  )
  const visibleQuestions = selectedQuestion !== null
    ? session.questions.filter((_, i) => i === selectedQuestion)
    : showIncorrectOnly
    ? session.questions.filter((_, i) => !outcomes[i])
    : session.questions

  // Full-screen ceremony for concepts levelled up by this quiz — plays first,
  // then hands off to the streak/quest/plan celebrations. For signed-in users we
  // wait for the gem balance to load so the running tally lands on the right
  // total; guests earn no gems so there's nothing to wait on.
  const hasLevelUps = upwardTransitions.length > 0
  const levelUpCeremonyReady = !user || !gemsLoading
  const showLevelUpCeremony = hasLevelUps && !levelUpsDone && levelUpCeremonyReady
  const celebrationsReady = !hasLevelUps || levelUpsDone

  return (
    <>
    {/* Ceremony for each concept levelled up by this quiz. */}
    {showLevelUpCeremony && (
      <ConceptLevelUpCeremony
        transitions={upwardTransitions}
        gemsEarned={user ? correctCount : 0}
        totalGems={gemBalance}
        onResolved={() => setLevelUpsDone(true)}
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
      />

      {/* ── Question review ─────────────────────────────────────── */}
      <div ref={questionReviewRef} className="space-y-2 scroll-mt-6">
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
        <Button variant="outline" onClick={() => { resetQuiz(); navigate(`/quiz?${searchParams.toString()}`) }} className="flex-1">
          Try Again
        </Button>
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
