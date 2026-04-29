import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Loader2, Play, Timer } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress, EXAM_ID_TO_TOPIC } from '@/hooks/useExamProgress'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { aggregateForTopic, decayIfStale } from '@/lib/mastery'
import { supabase } from '@/lib/supabase'
import type { ItemStatus } from '@/data/tracks'

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

// Picks the best "active" exam: first in_progress one we have a syllabus for.
// Falls back to the first syllabus when none are in progress so the card still
// has something to show.
function pickActiveExamId(
  syllabusExamIds: string[],
  progress: Record<string, string>,
): string | null {
  for (const examId of syllabusExamIds) {
    const key = wikiExamIdToProgressKey(examId)
    if (progress[key] === 'in_progress') return examId
  }
  return syllabusExamIds[0] ?? null
}

export function ActiveExamCard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { syllabi, loading: syllabusLoading } = useWikiSyllabus()
  const examProgress = useExamProgress()
  const { records, refresh } = useConceptMastery()
  const [statusBusy, setStatusBusy] = useState(false)
  const [localStatus, setLocalStatus] = useState<Record<string, ItemStatus>>({})

  const activeExamId = useMemo(
    () => pickActiveExamId(syllabi.map(s => s.examId), examProgress),
    [syllabi, examProgress],
  )

  const syllabus = useMemo(
    () => syllabi.find(s => s.examId === activeExamId) ?? null,
    [syllabi, activeExamId],
  )

  const progressKey = activeExamId ? wikiExamIdToProgressKey(activeExamId) : null
  const status: ItemStatus = (
    progressKey
      ? (localStatus[progressKey] ?? (examProgress[progressKey] as ItemStatus | undefined) ?? 'not_started')
      : 'not_started'
  )

  // Aggregate Strong % and Forgotten count across all concepts in the active
  // exam (sum across topics so the headline numbers reflect the whole syllabus,
  // not a single topic).
  const aggregate = useMemo(() => {
    if (!syllabus) return null
    const examMastery = records.filter(r => r.exam_id === wikiExamIdToProgressKey(syllabus.examId))
    const allConceptSlugs = syllabus.topics.flatMap(t => t.concepts.map(c => c.name))
    const now = new Date()
    return aggregateForTopic(examMastery, allConceptSlugs, now)
  }, [syllabus, records])

  // Concepts whose state is currently 'forgotten' are surfaced as "due for review".
  const dueCount = useMemo(() => {
    if (!syllabus) return 0
    const examKey = wikiExamIdToProgressKey(syllabus.examId)
    const now = new Date()
    return records
      .filter(r => r.exam_id === examKey)
      .map(r => decayIfStale(r, now))
      .filter(r => r.state === 'forgotten').length
  }, [syllabus, records])

  async function cycleStatus() {
    if (!user || !progressKey || statusBusy) return
    const nextStatus = STATUS_CYCLE[status]
    setStatusBusy(true)
    setLocalStatus(prev => ({ ...prev, [progressKey]: nextStatus }))
    const { error } = await supabase
      .from('exam_progress')
      .upsert(
        { user_id: user.id, exam_id: progressKey, status: nextStatus, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,exam_id' },
      )
    if (error) {
      console.warn('failed to update exam_progress:', error.message)
      setLocalStatus(prev => {
        const next = { ...prev }
        delete next[progressKey]
        return next
      })
    } else {
      // Mirror to the journey localStorage so other surfaces refresh on next render.
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

  if (syllabusLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (!syllabus || !progressKey) {
    return (
      <Card>
        <CardContent className="py-8 text-center space-y-3">
          <p className="text-sm text-muted-foreground">No active exam yet.</p>
          <Button onClick={() => navigate('/settings#exams')}>Choose a Track</Button>
        </CardContent>
      </Card>
    )
  }

  const topic = EXAM_ID_TO_TOPIC[progressKey]
  const newQuizUrl = topic ? `/?topic=${encodeURIComponent(topic)}` : '/'
  const mockExamUrl = topic ? `/?topic=${encodeURIComponent(topic)}&mode=mock-exam` : '/?mode=mock-exam'
  const strongPct = aggregate?.strongPct ?? 0
  const conceptsTotal = aggregate?.total ?? 0
  const conceptsStrong = aggregate?.strong ?? 0

  return (
    <Card className="border-primary/40 ring-1 ring-primary/10 shadow-sm">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Active Exam
            </div>
            <h2 className="text-xl font-semibold truncate">{syllabus.examLabel}</h2>
          </div>
          <button
            type="button"
            onClick={cycleStatus}
            disabled={statusBusy || !user}
            className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors disabled:opacity-60 ${STATUS_BADGE[status]}`}
            title={user ? 'Click to change status' : 'Sign in to change status'}
          >
            {STATUS_LABEL[status]}
          </button>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Topics mastered</span>
            <span className="font-semibold">
              {conceptsStrong}<span className="text-muted-foreground font-normal">/{conceptsTotal}</span>
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

        {dueCount > 0 && (
          <Badge variant="outline" className="text-xs gap-1">
            <Timer className="h-3 w-3" />
            {dueCount} concept{dueCount === 1 ? '' : 's'} due for review
          </Badge>
        )}

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
