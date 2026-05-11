import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { ChevronLeft, ChevronRight, Loader2, LogIn, PlusCircle } from 'lucide-react'
import { ActiveExamCard, ActiveExamCardLoading, ActiveExamCardEmpty } from '@/components/ActiveExamCard'
import { ReadinessCard } from '@/components/ReadinessCard'
import ExamsPopout from '@/components/ExamsPopout'
import { MascotWidget } from '@/components/MascotWidget'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { decayIfStale } from '@/lib/mastery'
import type { MasteryState } from '@/lib/mastery'
import { LEVELUP_EVENT } from '@/lib/dailyProgressStore'

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
  const { user, loading: authLoading } = useAuth()
  const { sessions, loading: sessionsLoading } = useProgress()
  const { syllabi, loading: syllabusLoading } = useWikiSyllabus()
  const { progress: examProgress, targetDates, updateTargetDate } = useExamProgress()
  const { records: masteryRecords, loading: masteryLoading, refresh: refreshMastery } = useConceptMastery()

  const [activeExamIdx, setActiveExamIdx] = useState(0)
  const [examsOpen, setExamsOpen] = useState(false)
  const touchStartX = useRef<number>(0)

  // Re-fetch mastery after a quiz completes so masteryStateByName reflects
  // any level-ups immediately (e.g. the "0 / 5 Level 3" counter stays in sync
  // with the "Completed today" list).
  useEffect(() => {
    window.addEventListener(LEVELUP_EVENT, refreshMastery)
    return () => window.removeEventListener(LEVELUP_EVENT, refreshMastery)
  }, [refreshMastery])

  // All exams that are marked in_progress and have a known syllabus
  const inProgressSyllabi = syllabi.filter(
    s => examProgress[wikiExamIdToProgressKey(s.examId)] === 'in_progress',
  )

  // Continuous (wrap-around) index
  const clampedIdx = inProgressSyllabi.length > 0
    ? ((activeExamIdx % inProgressSyllabi.length) + inProgressSyllabi.length) % inProgressSyllabi.length
    : 0
  const activeSyllabus = inProgressSyllabi[clampedIdx] ?? null
  const activeProgressKey = activeSyllabus ? wikiExamIdToProgressKey(activeSyllabus.examId) : null
  const activeTargetDate = activeProgressKey ? (targetDates[activeProgressKey] ?? null) : null

  const handleTargetDateChange = useCallback((date: string | null) => {
    if (activeProgressKey) updateTargetDate(activeProgressKey, date)
  }, [activeProgressKey, updateTargetDate])

  const handlePrev = useCallback(() => {
    setActiveExamIdx(i => ((i - 1) + inProgressSyllabi.length) % inProgressSyllabi.length)
  }, [inProgressSyllabi.length])

  const handleNext = useCallback(() => {
    setActiveExamIdx(i => (i + 1) % inProgressSyllabi.length)
  }, [inProgressSyllabi.length])

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev()
    }
  }

  // ── Study plan ─────────────────────────────────────────────────────────────
  const { plan: studyPlan, config: planConfig, loading: planLoading, updateConfig: updatePlanConfig, regenerate: regeneratePlan } =
    useStudyPlan(activeSyllabus, masteryRecords, activeTargetDate)

  // Build a fast masteryState lookup (conceptName → MasteryState) for TodayCard chips
  const masteryStateByName = useMemo(() => {
    const now = new Date()
    const map = new Map<string, MasteryState>()
    if (!activeSyllabus || !activeProgressKey) return map
    const examRecords = masteryRecords.filter(r => r.exam_id === activeProgressKey)
    const bySlug = new Map(examRecords.map(r => [r.concept_slug.toLowerCase(), r]))

    for (const topic of activeSyllabus.topics) {
      for (const c of topic.concepts) {
        const rec = bySlug.get(c.name.toLowerCase()) ?? bySlug.get(c.target?.toLowerCase() ?? '')
        const state: MasteryState = rec ? decayIfStale(rec, now).state : 'new'
        map.set(c.name.toLowerCase(), state)
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
    <div className="relative">
      {/* Blur overlay for logged-out users — covers only the dashboard content, not the nav */}
      {isGuest && (
        <SignInOverlay onSignIn={() => navigate('/auth', { state: { from: '/dashboard' } })} />
      )}
      <div
        className={isGuest ? 'pointer-events-none select-none blur-sm opacity-40' : undefined}
        aria-hidden={isGuest}
      >
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold flex-1">{displayName}'s Actuarial Notes</h1>
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

      {/* Mascot widget — only shown for logged-in users with an animal avatar */}
      {!isGuest && (
        <MascotWidget
          avatarUrl={avatarUrl}
          initials={initials}
          context={mascotContext}
        />
      )}

      {/* Exam navigation dots + arrows */}
      {multiExam && (
        <div className="flex items-center justify-center gap-2" aria-label="Exam navigation">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
            aria-label="Previous exam"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {inProgressSyllabi.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveExamIdx(i)}
              aria-label={`Exam ${i + 1} of ${inProgressSyllabi.length}`}
              aria-current={i === clampedIdx ? 'true' : undefined}
              className={`h-2 rounded-full transition-all ${
                i === clampedIdx
                  ? 'w-5 bg-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
              }`}
            />
          ))}
          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
            aria-label="Next exam"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Readiness card — only shown when there is an active exam */}
      {!syllabusLoading && !masteryLoading && activeSyllabus && (
        <ReadinessCard
          syllabus={activeSyllabus}
          masteryRecords={masteryRecords}
          plan={studyPlan}
          masteryStateByName={masteryStateByName}
          config={planConfig}
          loading={planLoading}
          examDate={activeTargetDate}
          onConfigChange={updatePlanConfig}
          onRegenerate={regeneratePlan}
          onExamDateChange={handleTargetDateChange}
        />
      )}

      {/* Active exam card */}
      <div
        onTouchStart={multiExam ? handleTouchStart : undefined}
        onTouchEnd={multiExam ? handleTouchEnd : undefined}
      >
        {syllabusLoading || sessionsLoading ? (
          <ActiveExamCardLoading />
        ) : !activeSyllabus ? (
          <ActiveExamCardEmpty onChooseExam={() => setExamsOpen(true)} />
        ) : (
          <ActiveExamCard
            syllabus={activeSyllabus}
            sessions={sessions}
            targetDate={activeTargetDate}
            onTargetDateChange={handleTargetDateChange}
            masteryRecords={masteryRecords}
          />
        )}
      </div>

      {!isGuest && <ExamsPopout open={examsOpen} onClose={() => setExamsOpen(false)} />}
    </div>
    </div>
    </div>
  )
}
