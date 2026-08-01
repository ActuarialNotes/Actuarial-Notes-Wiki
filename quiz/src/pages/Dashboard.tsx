import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { useSubscription } from '@/hooks/useSubscription'
import { supabase } from '@/lib/supabase'
import { Bell, BookOpen, Download, Gem, GraduationCap, HelpCircle, Loader2, LogIn, LogOut, Play, PlusCircle, Settings2, ShoppingBag, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { questionsNeededForPlan } from '@/lib/todayPlanCount'
import { TodayQuizCornerBadge } from '@/components/TodayQuizBadge'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { todayISO } from '@/lib/studyPlan'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import type { QuestContext } from '@/lib/quests'
import { buildMasteryLookup, resolveConceptState } from '@/lib/conceptMatch'
import { LEVELUP_EVENT, readTodayLevelUps } from '@/lib/dailyProgressStore'
import { matchesSelectedVariant } from '@/data/examSittings'
import { useGems } from '@/hooks/useGems'
import { LevelBadge } from '@/components/LevelBadge'
import { MasteryAnalyticsCard } from '@/components/MasteryAnalyticsCard'
import { RecentMistakesCard } from '@/components/RecentMistakesCard'
import type { LeagueExamOption } from '@/components/LeaderboardPanel'
import { DashboardExportModal } from '@/components/DashboardExportModal'
import { DashboardRemindersModal } from '@/components/DashboardRemindersModal'
import { DashboardGuideModal } from '@/components/DashboardGuideModal'
import { DAILY_PLAN_EMAIL_ENABLED, MASTERY_ANALYTICS_ENABLED, MISTAKES_REVIEW_ENABLED, XP_ENABLED } from '@/lib/featureFlags'

const ACTIVE_EXAM_KEY = 'quiz.dashboard.activeExamId'

// ── Welcome Modal ─────────────────────────────────────────────────────────────

function WelcomeModal({ onAddExam, onClose }: { onAddExam: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-sm w-full p-6 flex flex-col gap-4">
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
      <div className="pointer-events-auto bg-card rounded-2xl shadow-2xl px-8 py-7 flex flex-col items-center gap-3 max-w-xs w-full mx-4">
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
  const { questions: allQuestions } = useAllQuestions()

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
  const [isLaunchingQuiz, setIsLaunchingQuiz] = useState(false)
  const [showUpgradedBanner, setShowUpgradedBanner] = useState(
    () => new URLSearchParams(location.search).get('upgraded') === '1',
  )
  const [planComplete, setPlanComplete] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [signOutConfirm, setSignOutConfirm] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [remindersOpen, setRemindersOpen] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  // ReadinessCard portals its Study Schedule card into this slot so it renders
  // at the top of the page, above the primary actions.
  const [studyScheduleSlotEl, setStudyScheduleSlotEl] = useState<HTMLDivElement | null>(null)

  // Sticky exam header: the exam switcher pins to the top of the viewport, and
  // once the full-size primary actions row has scrolled up behind it, compact
  // copies of those two buttons slide into the pinned row so "Read concepts"
  // and the quiz launch stay reachable from anywhere on the page.
  const examTabsRowRef = useRef<HTMLDivElement>(null)
  const examTabsScrollRef = useRef<HTMLDivElement>(null)
  const primaryActionsRef = useRef<HTMLDivElement>(null)
  const [actionsPinned, setActionsPinned] = useState(false)
  const [tabsOverflowRight, setTabsOverflowRight] = useState(false)

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
  // with the "Completed today" list). Also keeps todayLevelUps in sync so the
  // Start-Quiz badge count drops concepts already finished today.
  const [todayLevelUps, setTodayLevelUps] = useState(() => readTodayLevelUps())
  useEffect(() => {
    const refresh = () => setTodayLevelUps(readTodayLevelUps())
    window.addEventListener(LEVELUP_EVENT, refreshMastery)
    window.addEventListener(LEVELUP_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(LEVELUP_EVENT, refreshMastery)
      window.removeEventListener(LEVELUP_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
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

  // Active exams for the Leaderboard tab's exam selector (leagues are per-exam),
  // keyed by exam_progress key so they match what quizStore credits XP to.
  const leagueExams = useMemo<LeagueExamOption[]>(() => {
    const seen = new Set<string>()
    const out: LeagueExamOption[] = []
    for (const s of inProgressSyllabi) {
      const id = wikiExamIdToProgressKey(s.examId)
      if (seen.has(id)) continue
      seen.add(id)
      out.push({ id, label: s.examLabel })
    }
    return out
  }, [inProgressSyllabi])

  // Mastery records scoped to the active exam — feeds the mastery-analytics card (P2.5).
  const activeExamRecords = useMemo(
    () => (activeProgressKey ? masteryRecords.filter(r => r.exam_id === activeProgressKey) : []),
    [masteryRecords, activeProgressKey],
  )

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

  // Today's plan concepts — gates the "Continue Studying / Start Today's Quiz"
  // action (mirrors the same derivation in ReadinessCard).
  const displayConcepts = studyPlan?.status === 'review_mode'
    ? (studyPlan?.reviewConcepts ?? [])
    : (studyPlan?.todaysConcepts ?? [])

  // Questions answered today for the active exam — decides whether the primary
  // action reads "Continue Studying" (already started) or "Start Today's Quiz".
  const todayQuestionsAnswered = useMemo(() => {
    if (!activeSyllabus) return 0
    const today = todayISO()
    return sessions
      .filter(s => s.exam === activeSyllabus.examTopic && s.completed_at.slice(0, 10) === today)
      .reduce((sum, s) => sum + s.total_questions, 0)
  }, [sessions, activeSyllabus])

  // Fewest questions needed to complete today's plan — shown as a badge on the
  // "Start Today's Quiz" button (the exact size of the quiz that button
  // launches, scoped to the active exam) and hidden once the plan is complete.
  // The Quiz-tab nav badge sums this same per-exam count across every active
  // exam, so the two numbers stay consistent.
  const doneConceptSlugs = useMemo(
    () => new Set(todayLevelUps.map(l => l.conceptSlug.toLowerCase())),
    [todayLevelUps],
  )
  const todaysQuizBadgeCount = useMemo(() => {
    if (!activeSyllabus) return 0
    return questionsNeededForPlan(studyPlan, activeSyllabus.examTopic, allQuestions, doneConceptSlugs)
  }, [activeSyllabus, studyPlan, allQuestions, doneConceptSlugs])

  // Top-of-dashboard primary actions. "Read concepts" and the quiz launch reuse
  // the trigger props ReadinessCard already listens on (same path as the header
  // quick-actions), so the concept popup / quiz-launch cascade behave identically.
  const handleReadConcepts = useCallback(() => setConceptsOpenCounter(c => c + 1), [])
  const handleStartTodaysQuiz = useCallback(() => {
    if (isLaunchingQuiz) return
    setIsLaunchingQuiz(true)
    setStartQuizCounter(c => c + 1)
  }, [isLaunchingQuiz])

  // The tab strip's trailing edge only fades while there are more tabs to the
  // right of it — fading a tab that's already the last one just makes the active
  // pill look cut off.
  const measureTabsOverflow = useCallback(() => {
    const scroller = examTabsScrollRef.current
    if (!scroller) return
    setTabsOverflowRight(scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft > 1)
  }, [])

  // Swap in the compact header actions once the full-size actions row has
  // scrolled up behind the pinned exam tabs. Both rects come from the same
  // measurement, so the threshold follows the sticky offset (which differs per
  // breakpoint — the md top bar vs. the lg sidebar) with nothing hard-coded.
  // The pinned row's height is fixed (h-10 controls), so the compact buttons
  // appearing can't move the threshold and make the state flicker.
  useEffect(() => {
    if (!activeSyllabus) {
      setActionsPinned(false)
      return
    }
    let raf = 0
    const measure = () => {
      raf = 0
      const tabs = examTabsRowRef.current
      const actions = primaryActionsRef.current
      if (!tabs || !actions) return
      setActionsPinned(actions.getBoundingClientRect().bottom < tabs.getBoundingClientRect().bottom)
      measureTabsOverflow()
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
  }, [activeSyllabus, measureTabsOverflow])

  // Keep the selected exam visible in the tab strip — it scrolls horizontally
  // once the compact actions claim the right end of the pinned row.
  useEffect(() => {
    const scroller = examTabsScrollRef.current
    if (!scroller) return
    measureTabsOverflow()
    const active = scroller.querySelector<HTMLElement>('[data-exam-tab-active="true"]')
    if (!active) return
    const left = active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2
    scroller.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [clampedIdx, actionsPinned, inProgressSyllabi.length, measureTabsOverflow])

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

  // Personalization signals for the daily-quest board: how many concepts have
  // decayed to Forgotten (revive quests only appear when there's something to
  // revive) and today's study-plan concepts (focus-quest candidates). Left
  // undefined until mastery + plan have loaded so the board isn't seeded from
  // an empty context.
  const questContext = useMemo<QuestContext | undefined>(() => {
    if (masteryLoading || planLoading) return undefined
    const now = new Date()
    const forgottenDue = masteryRecords.filter(
      r => decayIfStale(r, now).state === 'forgotten',
    ).length
    const planConcepts = studyPlan?.status === 'review_mode'
      ? studyPlan.reviewConcepts
      : studyPlan?.todaysConcepts ?? []
    return { forgottenDue, planConcepts }
  }, [masteryLoading, planLoading, masteryRecords, studyPlan])

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
  const showLevelBadge = XP_ENABLED && !isGuest

  // Quiz-launch action, shared by the full-size actions row and its compact
  // copy in the pinned exam header (which only has room for a one-word label).
  const showQuizAction = isPremium && displayConcepts.length > 0
  const quizActionLabel = isLaunchingQuiz
    ? 'Get ready…'
    : (todayQuestionsAnswered > 0 ? 'Continue Studying' : "Start Today's Quiz")
  const compactQuizLabel = isLaunchingQuiz
    ? 'Wait…'
    : (todayQuestionsAnswered > 0 ? 'Continue' : 'Study')

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
      className="container max-w-4xl mx-auto px-5 sm:px-8 py-8 space-y-4"
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
              <LevelBadge
                avatarUrl={avatarUrl}
                size={36}
                questContext={questContext}
                leagueExams={leagueExams}
                activeExamId={activeProgressKey}
              />
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
                className="absolute top-full left-0 mt-1 z-50 min-w-[180px] rounded-md bg-popover shadow-md py-1"
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
                        className="flex-1 rounded-md bg-muted text-xs py-1.5 font-medium hover:bg-accent transition-colors"
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

          {!isGuest && (
            <div className="ml-auto flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setExportOpen(true)}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Export your data"
                title="Export your data (CSV or PDF)"
              >
                <Download className="h-5 w-5" />
              </button>
              {DAILY_PLAN_EMAIL_ENABLED && (
                <button
                  type="button"
                  onClick={() => setRemindersOpen(true)}
                  className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Daily reminder email settings"
                  title="Daily reminder email settings"
                >
                  <Bell className="h-5 w-5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setGuideOpen(true)}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Help"
                title="How the dashboard works"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        {/* Exam switcher — pinned to the top of the viewport so the active exam
            is always visible. Sticky offsets match the nav chrome: the mobile
            bottom-nav leaves the top free, the md top bar is 3.5rem tall, and
            the lg sidebar is beside the content. */}
        {hasActiveExams && (
          <div className="sticky top-0 md:top-14 lg:top-0 z-20 -mx-5 sm:-mx-8 px-5 sm:px-8 py-1.5 bg-background/95 backdrop-blur-sm">
            <div ref={examTabsRowRef} className="flex items-center gap-2">
              <div
                ref={examTabsScrollRef}
                onScroll={measureTabsOverflow}
                className={`exam-tab-strip flex flex-1 min-w-0 gap-1.5 overflow-x-auto${tabsOverflowRight ? ' exam-tab-strip--fade' : ''}`}
              >
                {inProgressSyllabi.map((s, i) => (
                  <button
                    key={s.examId}
                    type="button"
                    data-exam-tab-active={i === clampedIdx}
                    onClick={() => setActiveExamIdx(i)}
                    className={`shrink-0 h-10 px-4 rounded-full text-base font-semibold transition-colors ${
                      i === clampedIdx
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {s.examLabel}
                  </button>
                ))}
              </div>

              {/* Compact copies of the primary actions — only once the full-size
                  pair below has scrolled behind this row. Icon-only on phones,
                  icon + short label from sm up. */}
              {activeSyllabus && actionsPinned && (
                <div className="dashboard-pinned-actions flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleReadConcepts}
                    aria-label="Read concepts"
                    title="Read concepts"
                    className="flex h-10 items-center gap-1.5 rounded-full bg-secondary px-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <BookOpen className="h-4 w-4 shrink-0" />
                    <span className="hidden sm:inline">Read</span>
                  </button>
                  {showQuizAction && (
                    <div className="relative">
                      <button
                        type="button"
                        data-sound="begin"
                        onClick={handleStartTodaysQuiz}
                        disabled={isLaunchingQuiz}
                        aria-label={quizActionLabel}
                        title={quizActionLabel}
                        className="flex h-10 items-center gap-1.5 rounded-full bg-primary px-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:bg-primary/80 transition-all active:scale-[0.97] disabled:opacity-80 disabled:cursor-default"
                      >
                        <Play className={`h-4 w-4 shrink-0 ${isLaunchingQuiz ? 'animate-pulse' : ''}`} />
                        <span className="hidden sm:inline">{compactQuizLabel}</span>
                      </button>
                      {!planComplete && todaysQuizBadgeCount > 0 && (
                        <span
                          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-[10px] font-bold shadow ring-2 ring-background tabular-nums"
                          aria-label={`${todaysQuizBadgeCount} questions left in today's plan`}
                        >
                          {todaysQuizBadgeCount}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {/* Study Schedule card — portaled here by ReadinessCard (below) so it sits
            at the very top of the dashboard, above the primary actions. */}
        {activeSyllabus && <div ref={setStudyScheduleSlotEl} />}

        {/* Primary actions — Read concepts (left) + Start Today's Quiz (right).
            Sits directly below the study schedule card. */}
        {activeSyllabus && (
          <div ref={primaryActionsRef} className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleReadConcepts}
              className="flex-1 gap-2.5 text-base h-auto py-4"
            >
              <BookOpen className="h-5 w-5" />
              Read concepts
            </Button>
            {showQuizAction && (
              <div className="relative flex-1">
                <button
                  type="button"
                  data-sound="begin"
                  onClick={handleStartTodaysQuiz}
                  disabled={isLaunchingQuiz}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 text-base font-semibold transition-all active:scale-[0.97] disabled:opacity-80 disabled:cursor-default"
                >
                  <Play className={`h-5 w-5 shrink-0 ${isLaunchingQuiz ? 'animate-pulse' : ''}`} />
                  {quizActionLabel}
                </button>
                {!planComplete && <TodayQuizCornerBadge count={todaysQuizBadgeCount} size="lg" />}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Congratulations banner — shown after returning from Stripe checkout */}
      {showUpgradedBanner && (
        <div className="rounded-lg bg-green-500/10 px-4 py-3 flex items-start justify-between gap-3">
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
            onPlanCompletionChange={setPlanComplete}
            studyScheduleSlot={studyScheduleSlotEl}
          />
        )}
      </div>

      {/* Compact insight cards — two-up: fading concepts + recent mistakes */}
      {!isGuest && activeSyllabus && (MASTERY_ANALYTICS_ENABLED || MISTAKES_REVIEW_ENABLED) && (
        <div className="grid grid-cols-2 gap-4">
          {/* Mastery insights — richer learner analytics (roadmap P2.5) */}
          {MASTERY_ANALYTICS_ENABLED && (
            <MasteryAnalyticsCard
              syllabus={activeSyllabus}
              masteryRecords={activeExamRecords}
            />
          )}

          {/* Review mistakes — recently-missed questions + likely-problematic concepts */}
          {MISTAKES_REVIEW_ENABLED && (
            <RecentMistakesCard
              masteryRecords={activeExamRecords}
              examTopic={activeSyllabus.examTopic}
            />
          )}
        </div>
      )}



      {!isGuest && user && (
        <DashboardExportModal open={exportOpen} onClose={() => setExportOpen(false)} user={user} />
      )}
      {!isGuest && DAILY_PLAN_EMAIL_ENABLED && (
        <DashboardRemindersModal
          open={remindersOpen}
          onClose={() => setRemindersOpen(false)}
          email={user?.email ?? ''}
        />
      )}
      {!isGuest && (
        <DashboardGuideModal
          open={guideOpen}
          onClose={() => setGuideOpen(false)}
          syllabus={activeSyllabus}
          masteryRecords={activeExamRecords}
          examDate={activeTargetDate}
          plan={studyPlan}
        />
      )}
      {!isGuest && <ExamsPopout open={examsOpen} onClose={() => setExamsOpen(false)} />}
      {!isGuest && onboardingOpen && activeSyllabus && (
        <StudyPlanConfigModal
          config={planConfig}
          examDate={activeTargetDate}
          examLabel={activeSyllabus.examLabel}
          examId={activeProgressKey ?? undefined}
          initialStep={onboardingStep}
          isPremium={isPremium}
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
