import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChevronDown, Loader2 } from 'lucide-react'
import type { QuizSession } from '@/lib/supabase'
import { ActiveExamCard, ActiveExamCardLoading, ActiveExamCardEmpty } from '@/components/ActiveExamCard'
import { TopicProgressSection } from '@/components/TopicProgressSection'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useExamProgress } from '@/hooks/useExamProgress'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import type { ItemStatus } from '@/data/tracks'

// ── Session list helpers ──────────────────────────────────────────────────

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

// ── Dashboard ─────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, loading: authLoading, signOut } = useAuth()
  const { sessions, loading: sessionsLoading } = useProgress()
  const { syllabi, loading: syllabusLoading } = useWikiSyllabus()
  const examProgress = useExamProgress()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()

  const [activeExamIdx, setActiveExamIdx] = useState(0)
  const [historyExpanded, setHistoryExpanded] = useState(false)

  // Hard redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { state: { from: '/dashboard' }, replace: true })
    }
  }, [user, authLoading, navigate])

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  // All exams that are marked in_progress and have a known syllabus
  const inProgressSyllabi = syllabi.filter(
    s => examProgress[wikiExamIdToProgressKey(s.examId)] === 'in_progress',
  )

  // Clamp index in case exams are added/removed
  const clampedIdx = Math.min(activeExamIdx, Math.max(0, inProgressSyllabi.length - 1))
  const activeSyllabus = inProgressSyllabi[clampedIdx] ?? null

  const hiddenCount = sessions.length

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut}>
          Sign out
        </Button>
      </div>

      {/* Active exam card */}
      {syllabusLoading ? (
        <ActiveExamCardLoading />
      ) : !activeSyllabus ? (
        <ActiveExamCardEmpty />
      ) : (
        <ActiveExamCard
          syllabus={activeSyllabus}
          examStatus={(examProgress[wikiExamIdToProgressKey(activeSyllabus.examId)] as ItemStatus) ?? 'not_started'}
          sessions={sessions}
          hasPrev={clampedIdx > 0}
          hasNext={clampedIdx < inProgressSyllabi.length - 1}
          onPrev={() => setActiveExamIdx(i => Math.max(0, i - 1))}
          onNext={() => setActiveExamIdx(i => Math.min(inProgressSyllabi.length - 1, i + 1))}
          examIndex={clampedIdx}
          totalExams={inProgressSyllabi.length}
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

      {/* Session history */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>
            {sessions.length === 0
              ? 'No quiz sessions yet'
              : historyExpanded
                ? `Showing all ${sessions.length} session${sessions.length === 1 ? '' : 's'}`
                : `${sessions.length} session${sessions.length === 1 ? '' : 's'} total`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sessionsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <p className="text-muted-foreground">No sessions yet</p>
              <Button onClick={() => navigate('/')}>Start Your First Quiz</Button>
            </div>
          ) : (
            <div className="space-y-1">
              {historyExpanded && sessions.map((session, idx) => (
                <SessionRow key={session.id} session={session} divider={idx > 0} />
              ))}
              {hiddenCount > 0 && (
                <button
                  type="button"
                  onClick={() => setHistoryExpanded(v => !v)}
                  className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${historyExpanded ? 'rotate-180' : ''}`}
                  />
                  {historyExpanded ? 'Hide quiz history' : `Show quiz history (${hiddenCount} more)`}
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
