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
import { supabase } from '@/lib/supabase'
import type { QuizSession, QuestionResponse } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { Question } from '@/lib/parser'
import { ExamHeatmap } from '@/components/ExamHeatmap'

// ── Session list helpers ──────────────────────────────────────────────────────

interface SessionDetail {
  loading: boolean
  error: string | null
  items: Array<{ response: QuestionResponse; question: Question | null }>
}

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

function SessionRow({
  session,
  divider,
  expanded,
  detail,
  onToggle,
}: {
  session: QuizSession
  divider: boolean
  expanded: boolean
  detail: SessionDetail | undefined
  onToggle: () => void
}) {
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
            <button
              type="button"
              onClick={onToggle}
              className="p-0.5 hover:text-foreground transition-colors"
              aria-label={expanded ? 'Collapse session' : 'Expand session'}
            >
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>
        <ScoreBar session={session} />

        {expanded && (
          <div className="pt-1 space-y-1">
            {!detail || detail.loading ? (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground py-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Loading questions…</span>
              </div>
            ) : detail.error ? (
              <p className="text-xs text-destructive">{detail.error}</p>
            ) : detail.items.length === 0 ? (
              <p className="text-xs text-muted-foreground">No question data found.</p>
            ) : (
              detail.items.map(({ response, question }) => (
                <div key={response.id} className="flex items-start gap-2 text-xs">
                  <span className={`shrink-0 font-bold ${response.is_correct ? 'text-green-500' : 'text-red-500'}`}>
                    {response.is_correct ? '✓' : '✗'}
                  </span>
                  <div className="min-w-0">
                    <span className="text-foreground/80">
                      {question
                        ? question.stem.length > 80
                          ? question.stem.slice(0, 80) + '…'
                          : question.stem
                        : response.question_id}
                    </span>
                    {!response.is_correct && (
                      <div className="text-muted-foreground mt-0.5">
                        <span>Chose: {response.chosen_answer ?? '—'}</span>
                        <span className="ml-2">Correct: {response.correct_answer}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
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
  const { user } = useAuth()
  const { records } = useConceptMastery()
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const [historyFilter, setHistoryFilter] = useState<string | null>(null)
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set())
  const [sessionDetails, setSessionDetails] = useState<Map<string, SessionDetail>>(new Map())

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

  const displayedSessions = historyFilter
    ? examSessions.filter(s => s.completed_at.slice(0, 10) === historyFilter)
    : examSessions

  function handleDayClick(date: string) {
    setHistoryExpanded(true)
    setHistoryFilter(date)
  }

  async function handleSessionToggle(sessionId: string) {
    if (!user) return
    const isExpanding = !expandedSessions.has(sessionId)
    setExpandedSessions(prev => {
      const next = new Set(prev)
      isExpanding ? next.add(sessionId) : next.delete(sessionId)
      return next
    })
    if (!isExpanding || sessionDetails.has(sessionId)) return

    setSessionDetails(prev => new Map(prev).set(sessionId, { loading: true, error: null, items: [] }))
    try {
      const [responsesResult, rawFiles] = await Promise.all([
        supabase
          .from('question_responses')
          .select('*')
          .eq('session_id', sessionId)
          .eq('user_id', user.id)
          .order('answered_at', { ascending: true }),
        fetchAllQuestions(),
      ])
      if (responsesResult.error) throw new Error(responsesResult.error.message)
      const questionMap = new Map(parseAllQuestions(rawFiles).map(q => [q.id, q]))
      const items = (responsesResult.data ?? []).map((r: QuestionResponse) => ({
        response: r,
        question: questionMap.get(r.question_id) ?? null,
      }))
      setSessionDetails(prev => new Map(prev).set(sessionId, { loading: false, error: null, items }))
    } catch (err) {
      setSessionDetails(prev => new Map(prev).set(sessionId, {
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load session details',
        items: [],
      }))
    }
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
          onDayClick={handleDayClick}
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
            {historyExpanded && historyFilter && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground pb-1">
                <span>Filtering by {historyFilter}</span>
                <button
                  type="button"
                  onClick={() => setHistoryFilter(null)}
                  className="hover:text-foreground transition-colors"
                  aria-label="Clear filter"
                >
                  · Clear ×
                </button>
              </div>
            )}
            {historyExpanded && displayedSessions.map((session, idx) => (
              <SessionRow
                key={session.id}
                session={session}
                divider={idx > 0}
                expanded={expandedSessions.has(session.id)}
                detail={sessionDetails.get(session.id)}
                onToggle={() => handleSessionToggle(session.id)}
              />
            ))}
            <button
              type="button"
              onClick={() => {
                if (historyExpanded) setHistoryFilter(null)
                setHistoryExpanded(v => !v)
              }}
              className="mt-2 w-full flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5"
            >
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${historyExpanded ? 'rotate-180' : ''}`}
              />
              {historyExpanded
                ? 'Hide quiz history'
                : `Show quiz history (${examSessions.length})`}
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
