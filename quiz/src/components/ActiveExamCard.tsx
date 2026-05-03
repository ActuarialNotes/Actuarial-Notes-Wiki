import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, Loader2, Play, Timer } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { EXAM_ID_TO_TOPIC } from '@/hooks/useExamProgress'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { aggregateForTopic, decayIfStale } from '@/lib/mastery'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { QuizSession } from '@/lib/supabase'
import { ExamHeatmap } from '@/components/ExamHeatmap'

// ── Session list helpers ──────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function formatTime(seconds: number | null): string {
  if (seconds === null || seconds < 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

function ScoreBar({ session }: { session: QuizSession }) {
  const pct = session.total_questions > 0
    ? Math.round((session.correct_count / session.total_questions) * 100)
    : 0
  const color = pct >= 70 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-medium w-10 text-right">{pct}%</span>
    </div>
  )
}

function SessionRow({ session, divider }: { session: QuizSession; divider: boolean }) {
  return (
    <div>
      {divider && <Separator className="my-3" />}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {session.topic && (
              <Badge variant="outline" className="text-xs">{session.topic}</Badge>
            )}
            <Badge variant="secondary" className="text-xs capitalize">{session.mode}</Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{session.correct_count}/{session.total_questions} correct</span>
            <span>{formatTime(session.time_taken_seconds)}</span>
            <span>{formatDate(session.completed_at)}</span>
          </div>
        </div>
        <ScoreBar session={session} />
      </div>
    </div>
  )
}

// ── Main card ─────────────────────────────────────────────────────────────────

interface Props {
  /** The currently selected exam syllabus to display. */
  syllabus: WikiExamSyllabus
  /** All quiz sessions (will be filtered by exam topic internally). */
  sessions: QuizSession[]
  /** Navigation — only rendered when more than one in-progress exam exists. */
  hasPrev: boolean
  hasNext: boolean
  onPrev: () => void
  onNext: () => void
  examIndex: number
  totalExams: number
  /** Controlled exam target date from Supabase (null if unset). */
  targetDate: string | null
  /** Called when the user saves a new exam date from the heatmap picker. */
  onTargetDateChange: (date: string | null) => void
}

export function ActiveExamCard({
  syllabus,
  sessions,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  examIndex,
  totalExams,
  targetDate,
  onTargetDateChange,
}: Props) {
  const navigate = useNavigate()
  const { records } = useConceptMastery()
  const [historyExpanded, setHistoryExpanded] = useState(false)

  const progressKey = wikiExamIdToProgressKey(syllabus.examId)

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

  // Sessions filtered to this exam's topic
  const examSessions = useMemo(
    () => sessions.filter(s => s.topic === syllabus.examTopic),
    [sessions, syllabus.examTopic],
  )

  const hiddenCount = Math.max(0, examSessions.length - 1)

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
        <ExamHeatmap
          sessions={examSessions}
          examProgressKey={progressKey}
          targetDate={targetDate}
          onTargetDateChange={onTargetDateChange}
        />

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

        {/* Quiz history */}
        {examSessions.length > 0 && (
          <div className="border-t pt-3 space-y-1">
            {!historyExpanded && examSessions[0] && (
              <SessionRow session={examSessions[0]} divider={false} />
            )}
            {historyExpanded && examSessions.map((session, idx) => (
              <SessionRow key={session.id} session={session} divider={idx > 0} />
            ))}
            <button
              type="button"
              onClick={() => setHistoryExpanded(v => !v)}
              className="mt-2 w-full flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5"
            >
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${historyExpanded ? 'rotate-180' : ''}`}
              />
              {historyExpanded
                ? 'Hide quiz history'
                : hiddenCount > 0
                  ? `Show quiz history (${hiddenCount} more)`
                  : 'Show quiz history'}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ── No-exam / loading placeholders ────────────────────────────────────────────

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
