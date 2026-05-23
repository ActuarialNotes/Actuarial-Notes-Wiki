import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Loader2, Timer } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { decayIfStale } from '@/lib/mastery'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { supabase } from '@/lib/supabase'
import type { QuizSession, QuestionResponse } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import { ExamHeatmap } from '@/components/ExamHeatmap'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import { SessionRow, type SessionDetail } from '@/components/SessionRow'

// ── Main card ─────────────────────────────────────────────────────────────────

interface Props {
  /** The currently selected exam syllabus to display. */
  syllabus: WikiExamSyllabus
  /** All quiz sessions (will be filtered by exam topic internally). */
  sessions: QuizSession[]
  /** Controlled exam target date from Supabase (null if unset). */
  targetDate: string | null
  /** Called when the user saves a new exam date from the heatmap picker. */
  onTargetDateChange: (date: string | null) => void
  /** Mastery records passed down from Dashboard (avoids duplicate Supabase channel). */
  masteryRecords: ConceptMasteryRecord[]
}

export function ActiveExamCard({
  syllabus,
  sessions,
  targetDate,
  onTargetDateChange,
  masteryRecords,
}: Props) {
  const { user } = useAuth()
  const records = masteryRecords
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const [historyFilter, setHistoryFilter] = useState<string | null>(null)
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set())
  const [sessionDetails, setSessionDetails] = useState<Map<string, SessionDetail>>(new Map())

  const progressKey = wikiExamIdToProgressKey(syllabus.examId)

  const dueCount = useMemo(() => {
    const now = new Date()
    return records
      .filter(r => r.exam_id === progressKey)
      .map(r => decayIfStale(r, now))
      .filter(r => r.state === 'forgotten').length
  }, [records, progressKey])

  // Sessions filtered to this exam's topic
  const examSessions = useMemo(
    () => sessions.filter(s => s.exam === syllabus.examTopic),
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

  return (
    <Card className="border-primary/40 ring-1 ring-primary/10 shadow-sm">
      <CardContent className="p-5 space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold truncate">{syllabus.examLabel}</h2>
        </div>

        {/* Quiz History heatmap */}
        <p className="text-sm font-medium text-muted-foreground">Quiz History</p>
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

export function ActiveExamCardEmpty({ onChooseExam }: { onChooseExam?: () => void }) {
  const navigate = useNavigate()
  return (
    <Card>
      <CardContent className="py-8 text-center space-y-3">
        <p className="text-sm text-muted-foreground">No active exam yet.</p>
        <Button onClick={() => onChooseExam ? onChooseExam() : navigate('/settings#exams')}>
          Choose an Exam
        </Button>
      </CardContent>
    </Card>
  )
}
