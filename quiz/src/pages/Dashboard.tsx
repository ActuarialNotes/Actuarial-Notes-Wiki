// **Today** (docs/redesign-spec.md §4): the exam, the days to it, the weeks,
// today's session with its one Start, and the Syllabus and Analytics, each of
// which opens as an overlay on this page. A day picked in the week row takes
// the session card's place with that day's plan.
// The route is still /dashboard and the sidebar row still says Dashboard until
// the navigation is rebuilt (the spec's Phase F).
//
// Everything on the screen is for the exam showing (`useTodayExam`), except
// the week, which is the account's.

import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronRight, GraduationCap, Loader2, LogIn, PlusCircle, X } from 'lucide-react'
import { ActiveExamCardEmpty, ActiveExamCardLoading } from '@/components/ActiveExamCard'
import { AvatarDisplay } from '@/components/AvatarDisplay'
import { ExamLogo } from '@/components/ExamLogo'
import ExamsPopout from '@/components/ExamsPopout'
import { LevelBadge } from '@/components/LevelBadge'
import { MobileNavButton } from '@/components/MobileNavButton'
import { YOU_PATH } from '@/lib/you'
import { StudyPlanConfigModal } from '@/components/StudyPlanConfigModal'
import { ExamSheet } from '@/components/today/ExamSheet'
import { DayNoteCard, SessionCard } from '@/components/today/SessionCard'
import { SessionLengthSheet } from '@/components/today/SessionLengthSheet'
import { SyllabusOverlay, SyllabusPanel, type SyllabusObjective } from '@/components/today/SyllabusPanel'
import {
  AnalyticsLockedTile,
  AnalyticsTile,
  DaysLeft,
  PaceMyPlanRow,
  SyllabusTile,
  WeekRow,
} from '@/components/today/TodayTiles'
import { GROUND, OUTLINE_CARD } from '@/components/ui/OutlineCard'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useExamProgress } from '@/contexts/examProgress'
import { LOCALIZED_EXAMS } from '@/data/examSittings'
import { EXAM_ID_TO_TRACK_NAME } from '@/data/tracks'
import { useAccuracyTrend } from '@/hooks/useAccuracyTrend'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useAuth } from '@/hooks/useAuth'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useDailyPlanBonus } from '@/hooks/useDailyPlanBonus'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useProgress } from '@/hooks/useProgress'
import { useReadinessDelta } from '@/hooks/useReadinessDelta'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { useSubscription } from '@/hooks/useSubscription'
import { useTodayAnsweredQuestions } from '@/hooks/useTodayAnsweredQuestions'
import { useTodayCompletions } from '@/hooks/useTodayCompletions'
import { useTodayExam } from '@/hooks/useTodayExam'
import { useTodaySession } from '@/hooks/useTodaySession'
import { accuracyPercent } from '@/lib/accuracyTrend'
import { LEVELUP_EVENT } from '@/lib/dailyProgressStore'
import { questionExamLabel } from '@/lib/examIds'
import { DAILY_PLAN_EMAIL_ENABLED, PODCAST_ENABLED, XP_ENABLED } from '@/lib/featureFlags'
import { decayIfStale } from '@/lib/mastery'
import { planConceptsToday, planDoneConceptSlugs } from '@/lib/planCompletion'
import { requestProCelebration } from '@/lib/proCelebration'
import type { QuestContext } from '@/lib/quests'
import { computeExamReadiness } from '@/lib/readiness'
import { localDayKey } from '@/lib/streak'
import { daysBetween, todayISO } from '@/lib/studyPlan'
import { supabase } from '@/lib/supabase'
import { syllabusObjectives } from '@/lib/syllabusObjectives'
import { dayNote, dayPractice, dayTitle, planDayView, planTickPct, sessionConceptKeys, sessionWalk, weeksAround } from '@/lib/todaySession'
import { cn } from '@/lib/utils'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { usePodcast } from '@/stores/podcastStore'

const WELCOME_DISMISSED_KEY = 'quiz.dashboard.welcomeDismissed'

// Lazy: none of these is on Today's first paint.
const AnalyticsTilePeek = lazy(() => import('@/components/today/AnalyticsPeek').then(m => ({ default: m.AnalyticsTilePeek })))
const AnalyticsSummaryPeek = lazy(() => import('@/components/today/AnalyticsPeek').then(m => ({ default: m.AnalyticsSummaryPeek })))
const AnalyticsOverlay = lazy(() => import('@/components/today/AnalyticsScreen').then(m => ({ default: m.AnalyticsOverlay })))
const PodcastButton = lazy(() => import('@/components/podcast/PodcastButton').then(m => ({ default: m.PodcastButton })))
const DailyEmailSheet = lazy(() => import('@/components/you/DailyEmailSheet').then(m => ({ default: m.DailyEmailSheet })))

/** The span the Analytics tile's figure covers, in days. */
const TILE_SPAN = 30

function WelcomeModal({ onAddExam, onClose }: { onAddExam: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm paper-scrim">
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
          <h2 className="text-xl font-bold tracking-tight">Welcome to Actuarial Notes</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Start by adding the exam you&apos;re studying for. Your concepts, quizzes and progress
            all follow from it.
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

function SignInOverlay({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto bg-card rounded-2xl shadow-2xl px-8 py-7 flex flex-col items-center gap-3 max-w-xs w-full mx-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-1">
          <LogIn className="h-6 w-6 text-primary" />
        </div>
        <p className="text-base font-semibold text-foreground text-center">Sign in to see Today</p>
        <p className="text-sm text-muted-foreground text-center">Your daily session, your syllabus and the days left to your exam.</p>
        <button
          type="button"
          onClick={onSignIn}
          className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <LogIn className="h-4 w-4" />
          Sign in
        </button>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading: authLoading } = useAuth()
  const { sessions } = useProgress()
  const { targetDates, progress: examProgress, updateTargetDate } = useExamProgress()
  const { records: masteryRecords, loading: masteryLoading, refresh: refreshMastery } = useConceptMastery()
  const { isPro, loading: subscriptionLoading, refresh: refreshSubscription } = useSubscription()
  const { questions: allQuestions, loading: questionsLoading } = useAllQuestions()
  const exam = useTodayExam()
  const wide = !useIsMobile(1023)

  const popupOpen = useConceptPopup(s => s.open)
  const closePopup = useConceptPopup(s => s.close)
  const openDashboard = useConceptPopup(s => s.openDashboard)
  const popupConcept = useConceptPopup(s =>
    s.open && s.dashboardContext?.filter === 'study-plan' ? (s.list[s.index]?.name ?? null) : null)
  /** The concept the reader is open on, however it was opened: its square is marked. */
  const readingConcept = useConceptPopup(s => (s.open ? (s.list[s.index]?.name.toLowerCase() ?? null) : null))

  const [examSheetOpen, setExamSheetOpen] = useState(false)
  const [examsOpen, setExamsOpen] = useState(false)
  const [lengthOpen, setLengthOpen] = useState(false)
  const [overlay, setOverlay] = useState<'syllabus' | 'analytics' | null>(null)
  /** The day the session card shows: today, until a day in the week row is picked. */
  const [pickedDay, setPickedDay] = useState<string | null>(null)
  // /dashboard/analytics, the address Analytics had as a screen, lands here as
  // ?show=analytics: open the overlay, or send a free account to Upgrade.
  const [analyticsAsked, setAnalyticsAsked] = useState(
    () => new URLSearchParams(location.search).get('show') === 'analytics',
  )
  const [planConfigStep, setPlanConfigStep] = useState<1 | 2 | 3 | null>(null)
  const [showWelcomeModal, setShowWelcomeModal] = useState(() => sessionStorage.getItem('show_welcome') === '1')
  const [welcomeDismissed, setWelcomeDismissed] = useState(
    () => { try { return localStorage.getItem(WELCOME_DISMISSED_KEY) === '1' } catch { return false } },
  )
  // The daily email's footer links to /dashboard?reminders=1. The email's
  // settings live in Settings now; the link still opens them here.
  const [remindersOpen, setRemindersOpen] = useState(
    () => new URLSearchParams(location.search).get('reminders') === '1',
  )

  useEffect(() => {
    if (showWelcomeModal) sessionStorage.removeItem('show_welcome')
    const params = new URLSearchParams(location.search)
    if (params.get('reminders') === '1' || params.get('show')) navigate('/dashboard', { replace: true })
    if (params.get('upgraded') === '1') {
      const sessionId = params.get('session_id')
      navigate('/dashboard', { replace: true })
      // Back from Stripe: welcome them once the subscription reads Pro.
      requestProCelebration({ confirmed: false })
      if (sessionId) {
        supabase.functions
          .invoke('stripe-sync-session', { body: { sessionId } })
          .then(({ error }) => {
            if (error) console.error('stripe-sync-session failed:', error)
            refreshSubscription()
          })
      }
    }
    return () => closePopup()
  // Only run once on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dismissWelcome = useCallback(() => {
    setShowWelcomeModal(false)
    setWelcomeDismissed(true)
    try { localStorage.setItem(WELCOME_DISMISSED_KEY, '1') } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    if (!analyticsAsked || authLoading || subscriptionLoading) return
    setAnalyticsAsked(false)
    if (!user) return
    if (isPro) setOverlay('analytics')
    else navigate('/upgrade', { replace: true })
  }, [analyticsAsked, authLoading, subscriptionLoading, user, isPro, navigate])

  // A level-up re-reads mastery, so the session and the syllabus move at once.
  useEffect(() => {
    window.addEventListener(LEVELUP_EVENT, refreshMastery)
    return () => window.removeEventListener(LEVELUP_EVENT, refreshMastery)
  }, [refreshMastery])

  const activeSyllabus = exam.active
  const activeKey = exam.activeKey
  const examLabel = activeSyllabus ? questionExamLabel(activeSyllabus) : null
  const targetDate = activeKey ? (targetDates[activeKey] ?? null) : null

  // A different exam closes the reader: its walk was the other exam's session.
  useEffect(() => {
    setPickedDay(null)
    if (useConceptPopup.getState().open) closePopup()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey])

  // Keep the row the reader is open on in view, above the reader's pane. The
  // pane mounts and slides up after the store opens, so look again once it
  // has settled.
  useEffect(() => {
    if (!popupConcept) return
    const place = () => {
      const pane = document.querySelector<HTMLElement>('.concept-popup-aside')
      const row = document.querySelector<HTMLElement>('[data-study-concept][aria-current="true"]')
      if (!pane || !row) return
      const visible = pane.getBoundingClientRect().top
      const rect = row.getBoundingClientRect()
      if (rect.top < 72 || rect.bottom > visible - 24) {
        window.scrollBy({ top: rect.top - visible / 2 + rect.height / 2, behavior: 'smooth' })
      }
    }
    const ids = [120, 600].map(ms => window.setTimeout(place, ms))
    return () => ids.forEach(id => window.clearTimeout(id))
  }, [popupConcept])

  // The daily email's Listen button links to /dashboard?episode=<exam key>:
  // show that exam and ask for its episode (stores/podcastStore.ts).
  const episodeParamRef = useRef(new URLSearchParams(location.search).get('episode'))
  const { exams, selectByKey } = exam
  useEffect(() => {
    const key = episodeParamRef.current
    if (!key || exams.length === 0) return
    episodeParamRef.current = null
    selectByKey(key)
    usePodcast.getState().request(key)
    navigate('/dashboard', { replace: true })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exams])

  // ── The plan, the record, the session ─────────────────────────────────────
  const { plan: computedPlan, config: planConfig, loading: planLoading, updateConfig: updatePlanConfig, regenerate: regeneratePlan } =
    useStudyPlan(activeSyllabus, masteryRecords, targetDate, masteryLoading)
  // Pacing to the exam date is what Pro buys (R1). A free reader has a session
  // every day and no plan behind it.
  const plan = isPro ? computedPlan : null

  const examRecords = useMemo(
    () => (activeKey ? masteryRecords.filter(r => r.exam_id === activeKey) : []),
    [masteryRecords, activeKey],
  )
  const completedToday = useTodayCompletions(activeKey)
  const planDone = useMemo(
    () => planDoneConceptSlugs({
      plan, syllabus: activeSyllabus, masteryRecords, examProgressKey: activeKey, levelUps: completedToday, today: todayISO(),
    }),
    [plan, activeSyllabus, masteryRecords, activeKey, completedToday],
  )
  const todayAnsweredIds = useTodayAnsweredQuestions()

  const session = useTodaySession({
    userId: user?.id ?? null,
    accountMinutes: user?.user_metadata?.session_minutes,
    syllabus: activeSyllabus,
    examKey: activeKey,
    examLabel,
    examRecords,
    plan,
    planDone,
    questions: allQuestions,
    todayAnsweredIds,
    loading: masteryLoading || questionsLoading || subscriptionLoading || (isPro && planLoading),
  })

  // A link that asks the Dashboard for an exam's plan ("Today's Study Plan" on
  // an exam's menu) shows that exam; the session card is the plan now.
  useEffect(() => {
    const st = location.state as Record<string, unknown> | null
    const key = (st?.openConceptsFor ?? st?.autoStartQuiz) as string | undefined
    if (!key) return
    selectByKey(key)
    navigate(location.pathname, { state: null, replace: true })
  }, [location.state, location.pathname, navigate, selectByKey])

  // ── The syllabus ──────────────────────────────────────────────────────────
  const now = useMemo(() => new Date(), [])
  const readiness = useMemo(
    () => (activeSyllabus ? computeExamReadiness(activeSyllabus, examRecords, now) : null),
    [activeSyllabus, examRecords, now],
  )
  const syllabusPct = readiness && readiness.counts.total > 0 ? Math.round(readiness.overallPct) : 0
  const gain = Math.max(0, useReadinessDelta(
    user?.id ?? null,
    activeKey,
    readiness && !masteryLoading && readiness.counts.total > 0 ? readiness.overallPct : null,
  ))
  const tick = planTickPct(plan)
  const todayKeys = useMemo(() => sessionConceptKeys(session.view), [session.view])
  const objectives = useMemo<SyllabusObjective[]>(
    () => (activeSyllabus && readiness
      ? syllabusObjectives(activeSyllabus, readiness, examRecords, todayKeys, now).filter(o => o.states.length > 0)
      : []),
    [activeSyllabus, readiness, examRecords, todayKeys, now],
  )
  const syllabusRoute = activeSyllabus?.fileName ? wikiRoute({ kind: 'exam', name: activeSyllabus.fileName }) : '/wiki'

  // A square opens its concept in the reader, walking the whole syllabus; the
  // reader's own filter still narrows the walk to today's session.
  const openSyllabusConcept = useCallback((name: string) => {
    const refs = session.conceptRefs
    const idx = refs.findIndex(r => r.name.toLowerCase() === name.toLowerCase())
    if (idx === -1) return
    setOverlay(null)
    const walk: WikiEntryRef[] | null = session.view
      ? sessionWalk(session.view).map(n => ({ kind: 'concept' as const, name: n }))
      : null
    openDashboard(refs, walk && walk.length > 0 ? walk : null, 'entire-syllabus', idx, { studyPlanLabel: "Today's session" })
  }, [session.conceptRefs, session.view, openDashboard])

  // ── The weeks: the account's, whichever exam was studied ──────────────────
  const today = todayISO()
  const { weeks, current: currentWeek } = useMemo(() => {
    const studied = new Set<string>()
    for (const s of sessions) {
      if (s.correct_count > 0) studied.add(localDayKey(new Date(s.completed_at)))
    }
    return weeksAround(today, studied, targetDate)
  }, [sessions, today, targetDate])

  // ── Another day in the card ───────────────────────────────────────────────
  const shownDay = pickedDay ?? today
  const otherDay = shownDay !== today
  const dayView = useMemo(() => (otherDay && shownDay > today ? planDayView(plan, shownDay) : null), [otherDay, shownDay, today, plan])
  const selectDay = useCallback((day: string) => {
    if (useConceptPopup.getState().open) closePopup()
    setPickedDay(day === todayISO() ? null : day)
  }, [closePopup])
  const backToToday = useCallback(() => selectDay(todayISO()), [selectDay])
  const openDayConcept = useCallback((name: string) => {
    if (!dayView) return
    const walk: WikiEntryRef[] = sessionWalk(dayView).map(n => ({ kind: 'concept' as const, name: n }))
    const idx = walk.findIndex(r => r.name.toLowerCase() === name.toLowerCase())
    openDashboard(session.conceptRefs, walk, 'study-plan', Math.max(0, idx), { studyPlanLabel: dayTitle(shownDay) })
  }, [dayView, shownDay, session.conceptRefs, openDashboard])

  // ── Days left ─────────────────────────────────────────────────────────────
  const daysLeft = targetDate ? daysBetween(today, targetDate) : null
  const examDay = targetDate ? new Date(`${targetDate}T00:00:00`) : null
  const dateLabel = examDay ? examDay.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : null
  const shortDate = examDay ? examDay.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : null
  const examDateStep: 1 | 2 = activeKey && (LOCALIZED_EXAMS[activeKey]?.length ?? 0) > 0 ? 2 : 1

  // ── Analytics (Pro): no one else's answers are read for it ────────────────
  const { trends, rows: answerRows } = useAccuracyTrend(isPro ? examLabel : null, allQuestions)
  const accuracyPct = trends ? accuracyPercent(trends[TILE_SPAN].total) : null

  // ── What used to ride the plan card ───────────────────────────────────────
  const planConcepts = useMemo(() => planConceptsToday(plan), [plan])
  const gemsToday = useMemo(
    () => sessions
      .filter(s => s.exam === examLabel && localDayKey(new Date(s.completed_at)) === today)
      .reduce((n, s) => n + s.correct_count, 0),
    [sessions, examLabel, today],
  )
  useDailyPlanBonus({
    userId: user?.id ?? null,
    examKey: activeKey,
    planDone: planConcepts.length > 0 && planConcepts.every(c => planDone.has(c.toLowerCase())),
    gemsToday,
  })

  const questContext = useMemo<QuestContext | undefined>(() => {
    if (masteryLoading || planLoading) return undefined
    const forgottenDue = masteryRecords.filter(r => decayIfStale(r, new Date()).state === 'forgotten').length
    return { forgottenDue, planConcepts }
  }, [masteryLoading, planLoading, masteryRecords, planConcepts])

  const unsupportedActiveExams = useMemo(() => {
    if (exam.syllabi.length === 0) return []
    const covered = new Set(exam.syllabi.map(s => wikiExamIdToProgressKey(s.examId)))
    return Object.entries(examProgress)
      .filter(([key, status]) => status === 'in_progress' && !covered.has(key))
      .map(([key]) => EXAM_ID_TO_TRACK_NAME[key] ?? key)
  }, [exam.syllabi, examProgress])

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const isGuest = !user
  const displayName = isGuest
    ? 'Guest'
    : (user.user_metadata?.display_name as string | undefined) ?? user.email?.split('@')[0] ?? 'You'
  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ?? ''
  const hasExams = exam.exams.length > 0
  const showWelcome = !welcomeDismissed && (showWelcomeModal || (!exam.loading && !hasExams))
  // The reader is open on one of the session's concepts: the rest of Today steps back.
  const reading = popupConcept !== null
  const dim = cn('transition-opacity', reading && 'opacity-30')

  const sessionCard = otherDay && dayView ? (
    <SessionCard
      view={dayView}
      onLength={() => {}}
      onStart={() => {}}
      launching={false}
      onConcept={openDayConcept}
      currentConcept={popupConcept ? popupConcept.toLowerCase() : null}
      missedToday={0}
      onFixMissed={() => {}}
      onKeepGoing={() => {}}
      expanded={wide}
      otherDay={{ title: dayTitle(shownDay), onToday: backToToday }}
    />
  ) : otherDay ? (
    <DayNoteCard
      title={dayTitle(shownDay)}
      note={dayNote(
        shownDay,
        today,
        dayPractice(sessions, examLabel, shownDay, iso => localDayKey(new Date(iso))),
        activeSyllabus?.examLabel ?? 'this exam',
        isPro,
      )}
      onToday={backToToday}
    />
  ) : session.view ? (
    <SessionCard
      view={session.view}
      onLength={() => setLengthOpen(true)}
      onStart={session.start}
      launching={session.launching}
      onConcept={session.openConcept}
      currentConcept={popupConcept ? popupConcept.toLowerCase() : null}
      missedToday={session.missedToday.length}
      onFixMissed={session.fixMissed}
      onKeepGoing={session.keepGoing}
      expanded={wide}
    />
  ) : session.empty ? (
    <section aria-label="Today's session" className={cn(OUTLINE_CARD, 'flex flex-col gap-3 p-5 lg:rounded-3xl lg:p-7')}>
      <h1 className="text-xl font-bold lg:text-[26px]">Today</h1>
      <p className="text-[17px] leading-normal">Nothing is waiting: no mistakes to fix, and every concept is learned and fresh.</p>
    </section>
  ) : (
    <section aria-label="Today's session" aria-busy="true" className={cn(OUTLINE_CARD, 'flex min-h-[260px] items-center justify-center p-5 lg:rounded-3xl')}>
      <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
    </section>
  )

  const analyticsTile = !isPro ? (
    <AnalyticsLockedTile to="/upgrade" />
  ) : (
    <AnalyticsTile
      onOpen={() => setOverlay('analytics')}
      accuracyPct={accuracyPct}
      days={TILE_SPAN}
      chart={trends ? <Suspense fallback={<span className="h-4" />}><AnalyticsTilePeek trends={trends} /></Suspense> : undefined}
    />
  )

  // The daily podcast (Pro): today's plan read aloud, under the Today card.
  const podcast = PODCAST_ENABLED && isPro && activeSyllabus && activeKey && planConcepts.length > 0 ? (
    <Suspense fallback={null}>
      <PodcastButton plan={plan} examKey={activeKey} examLabel={activeSyllabus.examLabel} className={cn('mt-2.5', dim)} />
    </Suspense>
  ) : null

  return (
    <>
    <div className={cn(GROUND, 'relative min-h-dvh')}>
      {isGuest && <SignInOverlay onSignIn={() => navigate('/auth', { state: { from: '/dashboard' } })} />}
      <div
        className={cn(isGuest && 'pointer-events-none select-none blur-sm opacity-40')}
        aria-hidden={isGuest || undefined}
      >
        <div
          className="mx-auto w-full max-w-[460px] px-3 pb-6 pt-3 lg:max-w-[1104px] lg:px-8 lg:pb-14 lg:pt-10"
          style={popupOpen ? { paddingBottom: 'calc(var(--concept-split-height, 50vh) + 1.5rem)' } : undefined}
          data-testid="today"
        >
          {/* The exam showing, and the reader. */}
          {/* Below `lg` this row is the page's top chrome, so it carries the
              way into the navigation (lib/mobileNavHost.ts). */}
          <div className={cn('flex items-center gap-1 px-1 lg:mb-8 lg:px-0', dim, !(hasExams && activeSyllabus && activeKey) && 'lg:hidden')}>
            <MobileNavButton className="h-11 w-11" />
            {hasExams && activeSyllabus && activeKey && (
              <>
              <button
                type="button"
                onClick={() => setExamSheetOpen(true)}
                aria-haspopup="dialog"
                aria-label={`Switch exam, ${activeSyllabus.examLabel}`}
                data-testid="today-exam"
                className="flex h-11 min-w-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ExamLogo examKey={activeKey} size="md" />
                <span className="truncate text-[17px] font-semibold">{activeSyllabus.examLabel}</span>
                <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
              </button>
              <span className="ml-auto flex shrink-0 items-center">
                {!isGuest && (
                  XP_ENABLED ? (
                    <LevelBadge size={44} questContext={questContext} />
                  ) : (
                    <Link to={YOU_PATH} aria-label="You" data-testid="today-you" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <AvatarDisplay avatarUrl={avatarUrl} initials={displayName.slice(0, 2).toUpperCase()} size={44} />
                    </Link>
                  )
                )}
              </span>
              </>
            )}
          </div>

          {exam.loading ? (
            <ActiveExamCardLoading />
          ) : !activeSyllabus || !activeKey ? (
            <ActiveExamCardEmpty
              onChooseExam={() => setExamsOpen(true)}
              unsupportedExams={unsupportedActiveExams}
              loadError={exam.syllabi.length === 0 ? exam.syllabusError : null}
            />
          ) : wide ? (
            // Desktop: the session on the left with its concepts listed, where
            // the reader stands on the right.
            <div className="flex items-start gap-10">
              <div className="w-full max-w-[460px] flex-1 basis-[380px]">{sessionCard}{podcast}</div>
              <section aria-label="Where you stand" className={cn('flex min-w-0 flex-[999] basis-[420px] flex-col gap-8 pt-2', dim)}>
                <DaysLeft days={daysLeft} dateLabel={dateLabel} onChangeDate={() => setPlanConfigStep(examDateStep)} />
                <WeekRow weeks={weeks} current={currentWeek} selected={shownDay} onSelect={selectDay} />
                <div className="border-t border-border pt-7">
                  <SyllabusPanel
                    pct={syllabusPct}
                    gain={gain}
                    tick={tick}
                    objectives={objectives}
                    onConcept={openSyllabusConcept}
                    current={readingConcept}
                    onOpen={() => setOverlay('syllabus')}
                  />
                </div>
                {!isPro && !subscriptionLoading && (
                  <PaceMyPlanRow to="/upgrade" dateLabel={shortDate} />
                )}
                <div className="border-t border-border pt-7">
                  {isPro && trends && answerRows && accuracyPct !== null && examLabel ? (
                    <button
                      type="button"
                      onClick={() => setOverlay('analytics')}
                      aria-haspopup="dialog"
                      aria-label={`Analytics, last ${TILE_SPAN} days`}
                      data-testid="today-analytics"
                      className="flex w-full flex-wrap items-end gap-x-10 gap-y-4 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <h2 className="flex basis-full items-center gap-2 text-xl font-bold">
                        Analytics
                        <ChevronRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                      </h2>
                      <Suspense fallback={null}>
                        <AnalyticsSummaryPeek
                          trends={trends}
                          rows={answerRows}
                          examLabel={examLabel}
                          syllabus={activeSyllabus}
                          questions={allQuestions}
                          accuracyPct={accuracyPct}
                        />
                      </Suspense>
                    </button>
                  ) : (
                    <div className="max-w-[240px]">{subscriptionLoading ? null : analyticsTile}</div>
                  )}
                </div>
              </section>
            </div>
          ) : (
            // Phone: everything down to Start on the first screen.
            <>
              <DaysLeft days={daysLeft} dateLabel={dateLabel} onChangeDate={() => setPlanConfigStep(examDateStep)} className={cn('px-2 pt-5', dim)} />
              <WeekRow weeks={weeks} current={currentWeek} selected={shownDay} onSelect={selectDay} className={cn('-mx-0.5 pt-4', dim)} />
              <div className="pt-4">{sessionCard}{podcast}</div>
              {!isPro && !subscriptionLoading && (
                <PaceMyPlanRow to="/upgrade" dateLabel={shortDate} className={cn('mt-2.5', dim)} />
              )}
              <div className={cn('mt-2.5 grid grid-cols-2 gap-2.5', dim)}>
                <SyllabusTile onOpen={() => setOverlay('syllabus')} pct={syllabusPct} gain={gain} tick={tick} />
                {subscriptionLoading ? <span /> : analyticsTile}
              </div>
            </>
          )}

        </div>
      </div>
    </div>

    <ConceptPopup />

    {examSheetOpen && (
      <ExamSheet
        exams={exam.exams}
        activeId={activeSyllabus?.examId ?? null}
        onPick={exam.select}
        onManage={() => setExamsOpen(true)}
        onClose={() => setExamSheetOpen(false)}
      />
    )}
    {overlay === 'syllabus' && activeSyllabus && (
      <SyllabusOverlay
        pct={syllabusPct}
        gain={gain}
        tick={tick}
        objectives={objectives}
        onConcept={openSyllabusConcept}
        current={readingConcept}
        examLabel={activeSyllabus.examLabel}
        guideTo={syllabusRoute}
        onClose={() => setOverlay(null)}
      />
    )}
    {overlay === 'analytics' && isPro && activeSyllabus && activeKey && examLabel && (
      <Suspense fallback={null}>
        <AnalyticsOverlay
          trends={trends}
          rows={answerRows}
          examLabel={examLabel}
          examKey={activeKey}
          syllabus={activeSyllabus}
          questions={allQuestions}
          onClose={() => setOverlay(null)}
        />
      </Suspense>
    )}
    {lengthOpen && (
      <SessionLengthSheet
        minutes={session.minutes}
        countsByLength={session.countsByLength}
        onPick={session.setMinutes}
        onClose={() => setLengthOpen(false)}
      />
    )}
    {!isGuest && <ExamsPopout open={examsOpen} onClose={() => setExamsOpen(false)} />}
    {!isGuest && planConfigStep !== null && activeSyllabus && (
      <StudyPlanConfigModal
        config={planConfig}
        examDate={targetDate}
        examLabel={activeSyllabus.examLabel}
        examId={activeKey ?? undefined}
        initialStep={planConfigStep}
        isPro={isPro}
        onSave={next => { updatePlanConfig(next); regeneratePlan() }}
        onExamDateChange={date => { if (activeKey) updateTargetDate(activeKey, date) }}
        onClose={() => setPlanConfigStep(null)}
      />
    )}
    {!isGuest && DAILY_PLAN_EMAIL_ENABLED && remindersOpen && (
      <Suspense fallback={null}>
        <DailyEmailSheet
          email={user?.email ?? ''}
          isPro={isPro}
          subscriptionLoading={subscriptionLoading}
          onClose={() => setRemindersOpen(false)}
        />
      </Suspense>
    )}
    {!isGuest && showWelcome && (
      <WelcomeModal onAddExam={() => { dismissWelcome(); setExamsOpen(true) }} onClose={dismissWelcome} />
    )}
    </>
  )
}
