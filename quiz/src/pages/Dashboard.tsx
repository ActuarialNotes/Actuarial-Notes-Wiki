import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { Loader2 } from 'lucide-react'
import { ActiveExamCard, ActiveExamCardLoading, ActiveExamCardEmpty } from '@/components/ActiveExamCard'
import { TopicProgressSection } from '@/components/TopicProgressSection'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useExamProgress } from '@/hooks/useExamProgress'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { sessions, loading: sessionsLoading } = useProgress()
  const { syllabi, loading: syllabusLoading } = useWikiSyllabus()
  const { progress: examProgress, targetDates, updateTargetDate } = useExamProgress()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()

  const [activeExamIdx, setActiveExamIdx] = useState(0)

  // Hard redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { state: { from: '/dashboard' }, replace: true })
    }
  }, [user, authLoading, navigate])

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

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  const displayName = (user.user_metadata?.display_name as string | undefined)
    ?? user.email?.split('@')[0]
    ?? 'You'

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">{displayName}'s Actuarial Notes</h1>

      {/* Active exam card */}
      {syllabusLoading || sessionsLoading ? (
        <ActiveExamCardLoading />
      ) : !activeSyllabus ? (
        <ActiveExamCardEmpty />
      ) : (
        <ActiveExamCard
          syllabus={activeSyllabus}
          sessions={sessions}
          hasPrev={inProgressSyllabi.length > 1}
          hasNext={inProgressSyllabi.length > 1}
          onPrev={handlePrev}
          onNext={handleNext}
          examIndex={clampedIdx}
          totalExams={inProgressSyllabi.length}
          targetDate={activeTargetDate}
          onTargetDateChange={handleTargetDateChange}
        />
      )}

      {/* Per-topic concept breakdown for the active exam */}
      {syllabusLoading || masteryLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : activeSyllabus ? (
        <TopicProgressSection
          key={activeSyllabus.examTopic}
          syllabus={activeSyllabus}
          masteryRecords={masteryRecords}
        />
      ) : null}
    </div>
  )
}
