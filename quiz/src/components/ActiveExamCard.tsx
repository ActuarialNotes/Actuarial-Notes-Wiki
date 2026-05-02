import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Loader2, Play, Timer } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { EXAM_ID_TO_TOPIC } from '@/hooks/useExamProgress'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { aggregateForTopic, decayIfStale } from '@/lib/mastery'
import { supabase } from '@/lib/supabase'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { QuizSession } from '@/lib/supabase'
import type { ItemStatus } from '@/data/tracks'
import { ExamHeatmap } from '@/components/ExamHeatmap'

const STATUS_CYCLE: Record<ItemStatus, ItemStatus> = {
  not_started: 'in_progress',
  in_progress: 'completed',
  completed: 'not_started',
}

const STATUS_LABEL: Record<ItemStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Completed',
}

const STATUS_BADGE: Record<ItemStatus, string> = {
  not_started: 'bg-muted text-muted-foreground',
  in_progress: 'bg-primary/15 text-primary',
  completed: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200',
}

interface Props {
  /** The currently selected exam syllabus to display. */
  syllabus: WikiExamSyllabus
  /** Current status of this exam (from exam_progress). */
  examStatus: ItemStatus
  /** All quiz sessions (will be filtered by exam topic internally). */
  sessions: QuizSession[]
  /** Navigation — only rendered when more than one in-progress exam exists. */
  hasPrev: boolean
  hasNext: boolean
  onPrev: () => void
  onNext: () => void
  examIndex: number
  totalExams: number
}

export function ActiveExamCard({
  syllabus,
  examStatus,
  sessions,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  examIndex,
  totalExams,
}: Props) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { records, refresh } = useConceptMastery()
  const [statusBusy, setStatusBusy] = useState(false)
  const [localStatus, setLocalStatus] = useState<ItemStatus | null>(null)

  const progressKey = wikiExamIdToProgressKey(syllabus.examId)
  const status: ItemStatus = localStatus ?? examStatus

  const aggregate = useMemo(() => {
    const examMastery = records.filter(r => r.exam_id === progressKey)
    const allConceptSlugs = syllabus.topics.flatMap(t => t.concepts.map(c => c.name))
    return aggregateForTopic(examMastery, allConceptSlugs, new Date())
  }, [syllabus, records, progressKey])

  const dueCount = useMemo(() => {
    const now = new Date()
    return records
      .filter(r => r.exam_id === progressKey)
      .map(r => decayIfStale(r, now))
      .filter(r => r.state === 'forgotten').length
  }, [records, progressKey])

  // Sessions filtered to this exam's topic for the heatmap
  const examSessions = useMemo(
    () => sessions.filter(s => s.topic === syllabus.examTopic),
    [sessions, syllabus.examTopic],
  )

  async function cycleStatus() {
    if (!user || statusBusy) return
    const nextStatus = STATUS_CYCLE[status]
    setStatusBusy(true)
    setLocalStatus(nextStatus)
    const { error } = await supabase
      .from('exam_progress')
      .upsert(
        { user_id: user.id, exam_id: progressKey, status: nextStatus, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,exam_id' },
      )
    if (error) {
      console.warn('failed to update exam_progress:', error.message)
      setLocalStatus(null)
    } else {
      try {
        const raw = localStorage.getItem('quiz-journey')
        const journey = raw ? JSON.parse(raw) : { selectedTrack: 'DEFAULT', progress: {} }
        if (!journey.progress) journey.progress = {}
        journey.progress[progressKey] = nextStatus
        localStorage.setItem('quiz-journey', JSON.stringify(journey))
      } catch { /* ignore */ }
      refresh()
    }
    setStatusBusy(false)
  }

  const topic = EXAM_ID_TO_TOPIC[progressKey]
  const newQuizUrl = topic ? `/?topic=${encodeURIComponent(topic)}` : '/'
  const mockExamUrl = topic ? `/?topic=${encodeURIComponent(topic)}&mode=mock-exam` : '/?mode=mock-exam'
  const strongPct = aggregate.strongPct
  const conceptsTotal = aggregate.total
  const conceptsStrong = aggregate.strong

  return (
    <Card className="border-primary/40 ring-1 ring-primary/10 shadow-sm">
      <CardContent className="p-5 space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            {/* Nav arrows — only shown when multiple active exams */}
            {totalExams > 1 && (
              <button
                type="button"
                onClick={onPrev}
                disabled={!hasPrev}
                className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
                aria-label="Previous exam"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            <div className="min-w-0">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Active Exam{totalExams > 1 ? ` · ${examIndex + 1} of ${totalExams}` : ''}
              </div>
              <h2 className="text-xl font-semibold truncate">{syllabus.examLabel}</h2>
            </div>
            {totalExams > 1 && (
              <button
                type="button"
                onClick={onNext}
                disabled={!hasNext}
                className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
                aria-label="Next exam"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={cycleStatus}
            disabled={statusBusy || !user}
            className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors disabled:opacity-60 shrink-0 ${STATUS_BADGE[status]}`}
            title={user ? 'Click to change status' : 'Sign in to change status'}
          >
            {STATUS_LABEL[status]}
          </button>
        </div>

        {/* Mastery progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Topics mastered</span>
            <span className="font-semibold">
              {conceptsStrong}
              <span className="text-muted-foreground font-normal">/{conceptsTotal}</span>
              <span className="text-muted-foreground font-normal ml-1.5">({strongPct}%)</span>
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${strongPct}%` }}
            />
          </div>
        </div>

        {/* Activity heatmap */}
        <ExamHeatmap sessions={examSessions} examProgressKey={progressKey} />

        {dueCount > 0 && (
          <Badge variant="outline" className="text-xs gap-1">
            <Timer className="h-3 w-3" />
            {dueCount} concept{dueCount === 1 ? '' : 's'} due for review
          </Badge>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button onClick={() => navigate(newQuizUrl)} className="gap-1">
            <Play className="h-4 w-4" />
            Start Quiz
          </Button>
          <Button variant="outline" onClick={() => navigate(mockExamUrl)} className="gap-1">
            Mock Exam
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ── No-exam / loading placeholders ────────────────────────────────────────

export function ActiveExamCardLoading() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-10">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </CardContent>
    </Card>
  )
}

export function ActiveExamCardEmpty() {
  const navigate = useNavigate()
  return (
    <Card>
      <CardContent className="py-8 text-center space-y-3">
        <p className="text-sm text-muted-foreground">No active exam yet.</p>
        <Button onClick={() => navigate('/settings#exams')}>Choose a Track</Button>
      </CardContent>
    </Card>
  )
}
