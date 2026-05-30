import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { useSubscription } from '@/hooks/useSubscription'
import { supabase } from '@/lib/supabase'
import { GraduationCap, Loader2, LogIn, PlusCircle, Sparkles, X } from 'lucide-react'
import { ActiveExamCardLoading, ActiveExamCardEmpty } from '@/components/ActiveExamCard'
import { ReadinessCard } from '@/components/ReadinessCard'
import ExamsPopout from '@/components/ExamsPopout'
import { StudyPlanConfigModal } from '@/components/StudyPlanConfigModal'
import { MascotWidget } from '@/components/MascotWidget'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { AvatarDisplay } from '@/components/AvatarDisplay'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { decayIfStale } from '@/lib/mastery'
import type { MasteryState } from '@/lib/mastery'
import { buildMasteryLookup, resolveConceptState } from '@/lib/conceptMatch'
import { LEVELUP_EVENT } from '@/lib/dailyProgressStore'
import { computeReadiness } from '@/lib/readiness'
import { LOCALIZED_EXAMS } from '@/data/examSittings'

const ACTIVE_EXAM_KEY = 'quiz.dashboard.activeExamId'

// ── Welcome Modal ─────────────────────────────────────────────────────────────

function WelcomeModal({ onAddExam, onClose }: { onAddExam: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-card border rounded-2xl shadow-2xl max-w-sm w-full p-6 flex flex-col gap-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mx-auto">
          <GraduationCap className="h-7 w-7 text-primary" />
        </div>

        <div className="text-center space-y-1.5">
          <h2 className="text-xl font-bold tracking-tight">Welcome to Actuarial Notes!</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your account is confirmed. Start by adding the exam you&apos;re studying for — we&apos;ll build a personalized study plan around it.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddExam}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Add an exam
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          I&apos;ll do this later
        </button>
      </div>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function SignInOverlay({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto bg-card border rounded-2xl shadow-2xl px-8 py-7 flex flex-col items-center gap-3 max-w-xs w-full mx-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-1">
          <LogIn className="h-6 w-6 text-primary" />
        </div>
        <p className="text-base font-semibold text-foreground text-center">Sign in to view your dashboard</p>
        <p className="text-sm text-muted-foreground text-center">Track your progress, study plans, and exam readiness.</p>
        <button
          type="button"
          onClick={onSignIn}
          className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <LogIn className="h-4 w-4" />
          Sign In
        </button>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading: authLoading } = useAuth()
  const { sessions, loading: sessionsLoading } = useProgress()
  const { syllabi, loading: syllabusLoading } = useWikiSyllabus()
  const { progress: examProgress, targetDates, updateTargetDate, loadingExams } = useExamProgress()
  const { records: masteryRecords, loading: masteryLoading, refresh: refreshMastery } = useConceptMastery()
  const { isPremium } = useSubscription()

  const popupOpen = useConceptPopup(s => s.open)
  const closePopup = useConceptPopup(s => s.close)

  const [activeExamIdx, setActiveExamIdx] = useState(0)
  const [examsOpen, setExamsOpen] = useState(false)
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(
    () => sessionStorage.getItem('show_welcome') === '1',
  )
  const [onboardingStep, setOnboardingStep] = useState<1 | 2 | 3>(1)
  const [conceptsOpenCounter, setConceptsOpenCounter] = useState(0)
  const [startQuizCounter, setStartQuizCounter] = useState(0)
  const [showUpgradedBanner, setShowUpgradedBanner] = useState(
    () => new URLSearchParams(location.search).get('upgraded') === '1',
  )

  useEffect(() => {
    if (showWelcomeModal) sessionStorage.removeItem('show_welcome')
  // Only run once on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('upgraded') === '1') {
      const sessionId = params.get('session_id')
      if (sessionId) {
        // Fire-and-forget: sync subscription from Stripe. The useSubscription
        // real-time channel will pick up the DB update automatically.
        supabase.functions.invoke('stripe-sync-session', { body: { sessionId } })
      }
      navigate('/dashboard', { replace: true })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Close the concept popup when navigating away from the dashboard.
  useEffect(() => {
    return () => closePopup()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Close the concept popup when the user switches active exams.
  useEffect(() => {
    if (popupOpen) closePopup()
  // Only trigger on exam index change, not on every popupOpen toggle.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeExamIdx])

  // Re-fetch mastery after a quiz completes so masteryStateByName reflects
  // any level-ups immediately (e.g. the "0 / 5 Level 3" counter stays in sync
  // with the "Completed today" list).
  useEffect(() => {
    window.addEventListener(LEVELUP_EVENT, refreshMastery)
    return () => window.removeEventListener(LEVELUP_EVENT, refreshMastery)
  }, [refreshMastery])

  // All exams that are marked in_progress and have a known syllabus
  const inProgressSyllabi = useMemo(
    () => syllabi.filter(s => examProgress[wikiExamIdToProgressKey(s.examId)] === 'in_progress'),
    [syllabi, examProgress],
  )

  // Restore active exam from localStorage once syllabi are loaded
  const restoredRef = useRef(false)
  useEffect(() => {
    if (restoredRef.current || inProgressSyllabi.length === 0) return
    restoredRef.current = true
    try {
      const savedId = localStorage.getItem(ACTIVE_EXAM_KEY)
      if (savedId) {
        const idx = inProgressSyllabi.findIndex(s => s.examId === savedId)
        if (idx >= 0) setActiveExamIdx(idx)
      }
    } catch { /* ignore */ }
  }, [inProgressSyllabi])

  // Continuous (wrap-around) index
  const clampedIdx = inProgressSyllabi.length > 0
    ? ((activeExamIdx % inProgressSyllabi.length) + inProgressSyllabi.length) % inProgressSyllabi.length
    : 0
  const activeSyllabus = inProgressSyllabi[clampedIdx] ?? null
  const activeProgressKey = activeSyllabus ? wikiExamIdToProgressKey(activeSyllabus.examId) : null
  const activeTargetDate = activeProgressKey ? (targetDates[activeProgressKey] ?? null) : null

  const activeHasVariants = activeSyllabus ? (LOCALIZED_EXAMS[activeSyllabus.examId]?.length ?? 0) > 0 : false
  const examDateStep = activeHasVariants ? 2 : 1
  const readyDateStep = activeHasVariants ? 3 : 2

  // Persist active exam to localStorage when it changes
  useEffect(() => {
    if (!activeSyllabus) return
    try {
      localStorage.setItem(ACTIVE_EXAM_KEY, activeSyllabus.examId)
    } catch { /* ignore */ }
  }, [activeSyllabus])

  // Handle navigation state from header pill quick-actions
  useEffect(() => {
    const st = location.state as Record<string, unknown> | null
    if (!st?.openConceptsFor && !st?.autoStartQuiz) return
    if (st.openConceptsFor) {
      const key = st.openConceptsFor as string
      const idx = inProgressSyllabi.findIndex(s => wikiExamIdToProgressKey(s.examId) === key)
      if (idx >= 0) setActiveExamIdx(idx)
      setConceptsOpenCounter(c => c + 1)
    }
    if (st.autoStartQuiz) {
      const key = st.autoStartQuiz as string
      const idx = inProgressSyllabi.findIndex(s => wikiExamIdToProgressKey(s.examId) === key)
      if (idx >= 0) setActiveExamIdx(idx)
      setStartQuizCounter(c => c + 1)
    }
    navigate(location.pathname, { state: null, replace: true })
  }, [location.state, location.pathname, navigate, inProgressSyllabi])

  const handleTargetDateChange = useCallback((date: string | null) => {
    if (activeProgressKey) updateTargetDate(activeProgressKey, date)
  }, [activeProgressKey, updateTargetDate])

  // ── Study plan ─────────────────────────────────────────────────────────────
  const { plan: studyPlan, config: planConfig, loading: planLoading, updateConfig: updatePlanConfig, regenerate: regeneratePlan, replaceTodaysConcepts } =
    useStudyPlan(activeSyllabus, masteryRecords, activeTargetDate, masteryLoading)

  // Build a fast masteryState lookup (conceptName → MasteryState) for TodayCard chips
  const masteryStateByName = useMemo(() => {
    const now = new Date()
    const map = new Map<string, MasteryState>()
    if (!activeSyllabus || !activeProgressKey) return map
    const examRecords = masteryRecords.filter(r => r.exam_id === activeProgressKey)
    const lookup = buildMasteryLookup(examRecords)

    for (const topic of activeSyllabus.topics) {
      for (const c of topic.concepts) {
        map.set(c.name.toLowerCase(), resolveConceptState(lookup, c, now))
      }
    }
    return map
  }, [activeSyllabus, activeProgressKey, masteryRecords])

  // Mascot context — summarise mastery for the active exam
  const mascotContext = useMemo(() => {
    if (!activeSyllabus || !activeProgressKey) return {}
    const totalTopics = activeSyllabus.topics.reduce((n, t) => n + t.concepts.length, 0)
    const examRecords = masteryRecords.filter(r => r.exam_id === activeProgressKey)
    const topicsMastered = examRecords.filter(r =>
      r.state === 'level3' || r.state === 'level2'
    ).length
    const daysRemaining = studyPlan?.daysRemaining ?? null
    return { daysRemaining, topicsMastered, totalTopics }
  }, [activeSyllabus, activeProgressKey, masteryRecords, studyPlan])

  const overallPct = useMemo(() => {
    if (!activeSyllabus || !activeProgressKey) return null
    const examRecords = masteryRecords
      .filter(r => r.exam_id === activeProgressKey)
      .map(r => decayIfStale(r, new Date()))
    return Math.round(computeReadiness(activeSyllabus, examRecords, new Date()).overallPct)
  }, [activeSyllabus, activeProgressKey, masteryRecords])

  const daysUntilExam = useMemo(() => {
    if (!activeTargetDate) return null
    const now = new Date(); now.setHours(0, 0, 0, 0)
    return Math.max(0, Math.ceil(
      (new Date(activeTargetDate + 'T00:00:00').getTime() - now.getTime()) / 86400000
    ))
  }, [activeTargetDate])

  const daysToReady = useMemo(() => {
    if (!planConfig.targetReadyDate) return null
    const now = new Date(); now.setHours(0, 0, 0, 0)
    return Math.max(0, Math.ceil(
      (new Date(planConfig.targetReadyDate + 'T00:00:00').getTime() - now.getTime()) / 86400000
    ))
  }, [planConfig.targetReadyDate])

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const isGuest = !user
  const displayName = isGuest
    ? 'Actuarial Student'
    : (user.user_metadata?.display_name as string | undefined)
        ?? user.email?.split('@')[0]
        ?? 'You'

  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ?? ''
  const initials = displayName.slice(0, 2).toUpperCase()

  const multiExam = inProgressSyllabi.length > 1

  return (
    <>
    <div className="relative">
      {/* Blur overlay for logged-out users — covers only the dashboard content, not the nav */}
      {isGuest && (
        <SignInOverlay onSignIn={() => navigate('/auth', { state: { from: '/dashboard' } })} />
      )}
      <div
        className={isGuest ? 'pointer-events-none select-none blur-sm opacity-40' : undefined}
        aria-hidden={isGuest}
      >
    <div
      className="container max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6"
      style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Actuarial Notes</h1>
          {!isGuest && (
            <button
              type="button"
              onClick={() => setExamsOpen(true)}
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
              aria-label="Add or manage exams"
              title="Add or manage exams"
            >
              <PlusCircle className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          {!isGuest && (
            <MascotWidget compact avatarUrl={avatarUrl} initials={initials} context={mascotContext} />
          )}
          {isGuest && <AvatarDisplay avatarUrl={avatarUrl} initials={initials} size={36} />}
          <span className="text-sm font-semibold truncate min-w-0 flex-1">{displayName}</span>
          {overallPct !== null && activeSyllabus && (
            <div className="flex flex-col items-center px-2.5 py-1.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
              <span className="text-sm font-bold tabular-nums leading-none">{overallPct}%</span>
              <span className="text-[9px] text-muted-foreground mt-0.5">Readiness</span>
            </div>
          )}
          {daysToReady !== null && (
            <button
              type="button"
              onClick={() => { setOnboardingStep(readyDateStep as 1 | 2 | 3); setOnboardingOpen(true) }}
              className="flex flex-col items-center px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 shrink-0 hover:bg-amber-500/20 transition-colors"
              title="Edit target ready date"
            >
              <span className="text-sm font-bold tabular-nums leading-none text-amber-600 dark:text-amber-400">{daysToReady}</span>
              <span className="text-[9px] text-muted-foreground mt-0.5">to prepare</span>
            </button>
          )}
          {daysUntilExam !== null && (
            <button
              type="button"
              onClick={() => { setOnboardingStep(examDateStep as 1 | 2 | 3); setOnboardingOpen(true) }}
              className="flex flex-col items-center px-2.5 py-1.5 rounded-lg bg-card border shrink-0 hover:bg-muted transition-colors"
              title="Edit exam date"
            >
              <span className="text-sm font-bold tabular-nums leading-none">{daysUntilExam}</span>
              <span className="text-[9px] text-muted-foreground mt-0.5">until exam</span>
            </button>
          )}
        </div>
        {multiExam && (
          <div className="flex gap-1.5 flex-wrap">
            {inProgressSyllabi.map((s, i) => (
              <button
                key={s.examId}
                type="button"
                onClick={() => setActiveExamIdx(i)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                  i === clampedIdx
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                }`}
              >
                {s.examLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Congratulations banner — shown after returning from Stripe checkout */}
      {showUpgradedBanner && (
        <div className="rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            <Sparkles className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">Welcome to Premium!</p>
              <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">
                Your subscription is confirmed. Premium features are activating now.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowUpgradedBanner(false)}
            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 shrink-0 mt-0.5"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Readiness card — only shown when there is an active exam */}
      <div>
        {syllabusLoading || sessionsLoading || masteryLoading || loadingExams ? (
          <ActiveExamCardLoading />
        ) : !activeSyllabus ? (
          <ActiveExamCardEmpty onChooseExam={() => setExamsOpen(true)} />
        ) : (
          <ReadinessCard
            syllabus={activeSyllabus}
            masteryRecords={masteryRecords}
            sessions={sessions}
            plan={studyPlan}
            masteryStateByName={masteryStateByName}
            config={planConfig}
            loading={planLoading}
            examDate={activeTargetDate}
            onConfigChange={updatePlanConfig}
            onRegenerate={regeneratePlan}
            onReplaceConcepts={replaceTodaysConcepts}
            onExamDateChange={handleTargetDateChange}
            onOpenOnboarding={(step = 1) => { setOnboardingStep(step); setOnboardingOpen(true) }}
            openConceptsTrigger={conceptsOpenCounter}
            startQuizTrigger={startQuizCounter}
            isPremium={isPremium}
          />
        )}
      </div>

      {!isGuest && <ExamsPopout open={examsOpen} onClose={() => setExamsOpen(false)} />}
      {!isGuest && onboardingOpen && activeSyllabus && (
        <StudyPlanConfigModal
          config={planConfig}
          examDate={activeTargetDate}
          examLabel={activeSyllabus.examLabel}
          examId={activeSyllabus.examId}
          initialStep={onboardingStep}
          onSave={updatePlanConfig}
          onExamDateChange={handleTargetDateChange}
          onClose={() => setOnboardingOpen(false)}
        />
      )}
    </div>
    </div>
    </div>
    <ConceptPopup />
    {!isGuest && showWelcomeModal && (
      <WelcomeModal
        onAddExam={() => { setShowWelcomeModal(false); setExamsOpen(true) }}
        onClose={() => setShowWelcomeModal(false)}
      />
    )}
    </>
  )
}
