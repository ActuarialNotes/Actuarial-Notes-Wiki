import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { useSubscription } from '@/hooks/useSubscription'
import { supabase } from '@/lib/supabase'
import { Gem, GraduationCap, Loader2, LogIn, LogOut, PlusCircle, Settings2, ShoppingBag, Sparkles, X } from 'lucide-react'
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
import type { MasteryState } from '@/lib/mastery'
import { buildMasteryLookup, resolveConceptState } from '@/lib/conceptMatch'
import { LEVELUP_EVENT } from '@/lib/dailyProgressStore'
import { computeReadiness } from '@/lib/readiness'
import { LOCALIZED_EXAMS, matchesSelectedVariant } from '@/data/examSittings'
import { useGems } from '@/hooks/useGems'
import { StreakStat } from '@/components/StreakBadge'
import { LevelBadge } from '@/components/LevelBadge'
import { STREAK_ENABLED, XP_ENABLED } from '@/lib/featureFlags'

const ACTIVE_EXAM_KEY = 'quiz.dashboard.activeExamId'

// ── Mini readiness ring — small replica of the study-guide radial gauge ───────

function MiniReadinessRing({ pct }: { pct: number }) {
  const size = 64
  const stroke = 7
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - Math.min(100, Math.max(0, pct)) / 100)
  const cx = size / 2
  const cy = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={stroke} />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#22c55e"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dashoffset 300ms ease-out' }}
      />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize={16} fontWeight={800} fill="currentColor">
        {pct}%
      </text>
    </svg>
  )
}

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
  const { user, loading: authLoading, signOut } = useAuth()
  const { sessions, loading: sessionsLoading } = useProgress()
  const { syllabi, loading: syllabusLoading } = useWikiSyllabus()
  const { progress: examProgress, targetDates, examVariants, updateTargetDate, loadingExams } = useExamProgress()
  const { records: masteryRecords, loading: masteryLoading, refresh: refreshMastery } = useConceptMastery()
  const { isPremium, refresh: refreshSubscription } = useSubscription()
  const { balance: gemBalance } = useGems()

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
  const [scrollToRadialTrigger, setScrollToRadialTrigger] = useState(0)
  const [showUpgradedBanner, setShowUpgradedBanner] = useState(
    () => new URLSearchParams(location.search).get('upgraded') === '1',
  )
  const [profileOpen, setProfileOpen] = useState(false)
  const [signOutConfirm, setSignOutConfirm] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showWelcomeModal) sessionStorage.removeItem('show_welcome')
  // Only run once on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('upgraded') === '1') {
      const sessionId = params.get('session_id')
      navigate('/dashboard', { replace: true })
      if (sessionId) {
        supabase.functions
          .invoke('stripe-sync-session', { body: { sessionId } })
          .then(({ error }) => {
            if (error) {
              console.error('stripe-sync-session failed:', error)
            }
            // Refresh regardless — Realtime may have already updated state, but an
            // explicit re-fetch ensures the hook reflects the new tier immediately.
            refreshSubscription()
          })
      }
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

  useEffect(() => {
    if (!profileOpen) {
      setSignOutConfirm(false)
      return
    }
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [profileOpen])

  // All exams that are marked in_progress and have a known syllabus
  const inProgressSyllabi = useMemo(
    () => syllabi.filter(s => {
      const key = wikiExamIdToProgressKey(s.examId)
      return examProgress[key] === 'in_progress' && matchesSelectedVariant(key, s.examId, examVariants[key])
    }),
    [syllabi, examProgress, examVariants],
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
    const examRecords = masteryRecords.filter(r => r.exam_id === activeProgressKey)
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

  const hasActiveExams = inProgressSyllabi.length > 0
  const showStreakStat = STREAK_ENABLED && !isGuest
  const showLevelBadge = XP_ENABLED && !isGuest

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
      className="container max-w-4xl mx-auto px-5 sm:px-8 py-8 space-y-8"
      style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
    >
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Avatar + name — clicking opens the profile dropdown (same as desktop sidebar) */}
          <div
            ref={profileRef}
            className="relative flex items-center gap-2.5 min-w-0"
            onClick={() => !isGuest && setProfileOpen(v => !v)}
            style={{ cursor: isGuest ? 'default' : 'pointer' }}
          >
            {!isGuest && showLevelBadge && (
              <LevelBadge avatarUrl={avatarUrl} size={36} />
            )}
            {!isGuest && !showLevelBadge && (
              <MascotWidget compact avatarUrl={avatarUrl} initials={initials} context={mascotContext} />
            )}
            {isGuest && <AvatarDisplay avatarUrl={avatarUrl} initials={initials} size={36} />}
            <span className="text-sm font-semibold truncate min-w-0">{displayName}</span>
            {!isGuest && (
              <button
                type="button"
                onClick={e => { e.stopPropagation(); setExamsOpen(true) }}
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                aria-label="Add or manage exams"
                title="Add or manage exams"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            )}

            {/* Profile dropdown */}
            {profileOpen && !isGuest && (
              <div
                className="absolute top-full left-0 mt-1 z-50 min-w-[180px] rounded-md border bg-popover shadow-md py-1"
                onClick={e => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => { navigate('/store'); setProfileOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/60 transition-colors"
                >
                  <ShoppingBag className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-left">Store</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <Gem className="h-3 w-3" />
                    {gemBalance}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => { setExamsOpen(true); setProfileOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/60 transition-colors"
                >
                  <GraduationCap className="h-4 w-4 shrink-0" />
                  <span>Exams</span>
                </button>
                <button
                  type="button"
                  onClick={() => { navigate('/settings'); setProfileOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/60 transition-colors"
                >
                  <Settings2 className="h-4 w-4 shrink-0" />
                  <span>Settings</span>
                </button>
                {!isPremium && (
                  <button
                    type="button"
                    onClick={() => { navigate('/upgrade'); setProfileOpen(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors"
                  >
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Upgrade to Premium</span>
                  </button>
                )}
                {signOutConfirm ? (
                  <div className="px-3 py-2 space-y-2">
                    <p className="text-xs text-muted-foreground">Sign out?</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => { signOut(); setProfileOpen(false); setSignOutConfirm(false) }}
                        className="flex-1 rounded-md bg-destructive text-destructive-foreground text-xs py-1.5 font-medium hover:bg-destructive/90 transition-colors"
                      >
                        Sign out
                      </button>
                      <button
                        type="button"
                        onClick={() => setSignOutConfirm(false)}
                        className="flex-1 rounded-md border bg-background text-xs py-1.5 font-medium hover:bg-accent transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSignOutConfirm(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/60 transition-colors"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    <span>Sign out</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {hasActiveExams && (
          <div className="flex gap-1.5 flex-wrap">
            {inProgressSyllabi.map((s, i) => (
              <button
                key={s.examId}
                type="button"
                onClick={() => setActiveExamIdx(i)}
                className={`px-4 py-1.5 rounded-full text-base font-semibold transition-colors ${
                  i === clampedIdx
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {s.examLabel}
              </button>
            ))}
          </div>
        )}
        {(showStreakStat || overallPct !== null || daysToReady !== null || daysUntilExam !== null) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {showStreakStat && <StreakStat />}
            {overallPct !== null && activeSyllabus && (
              <button
                type="button"
                onClick={() => setScrollToRadialTrigger(v => v + 1)}
                className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors"
                title="Scroll to study guide"
              >
                <MiniReadinessRing pct={overallPct} />
                <span className="text-xs text-muted-foreground">Readiness</span>
              </button>
            )}
            {daysToReady !== null && (
              <button
                type="button"
                onClick={() => { setOnboardingStep(readyDateStep as 1 | 2 | 3); setOnboardingOpen(true) }}
                className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
                title="Edit target ready date"
              >
                <span className="text-3xl font-bold tabular-nums leading-none text-amber-600 dark:text-amber-400">{daysToReady} days</span>
                <span className="text-xs text-muted-foreground">to prepare</span>
              </button>
            )}
            {daysUntilExam !== null && (
              <button
                type="button"
                onClick={() => { setOnboardingStep(examDateStep as 1 | 2 | 3); setOnboardingOpen(true) }}
                className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl bg-card hover:bg-muted transition-colors"
                title="Edit exam date"
              >
                <span className="text-3xl font-bold tabular-nums leading-none">{daysUntilExam} days</span>
                <span className="text-xs text-muted-foreground">until exam</span>
              </button>
            )}
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
            scrollToRadialTrigger={scrollToRadialTrigger}
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
